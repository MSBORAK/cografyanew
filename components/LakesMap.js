import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
  PanResponder,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { Home, ChevronLeft, Check, X, ZoomOut, RefreshCw } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { getCityCenter } from '../constants/cityCenters';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';
import { getLakesByType, getLakeTypeName } from '../constants/lakeTypes';
import { saveWrongAnswer, removeWrongAnswer } from '../utils/practiceMode';
import { useTurkeyMapLayout } from '../utils/useTurkeyMapLayout';

const VIEWBOX_W = 1007.478;
const VIEWBOX_H = 527.323;

// Bazı göllerin işaretçi konumu kayıyor; gösterme anında düzeltme (viewBox birimi)
const LAKE_DISPLAY_OFFSET = {
  54: { dx: 28, dy: 0 },   // Meke Gölü (volkanik) — sağa
  53: { dx: 0, dy: 0 },   // Nemrut Krater
  55: { dx: 0, dy: 0 },   // Acıgöl (volkanik)
  56: { dx: 0, dy: 0 },   // Tortum (set)
  57: { dx: 0, dy: 0 },   // Abant (set)
  58: { dx: 0, dy: 0 },   // Yedigöller (set)
};

function getLakeDisplayPos(lake) {
  if (!lake) return { px: 0, py: 0 };
  if (lake.id === 54) { const pos = getCityCenter('42'); return { px: pos.x, py: pos.y }; }
  if (lake.id === 55) { const pos = getCityCenter('50'); return { px: pos.x, py: pos.y }; }
  const off = LAKE_DISPLAY_OFFSET[lake.id] || { dx: 0, dy: 0 };
  return { px: lake.x + off.dx, py: lake.y + off.dy };
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const LakesMap = ({ onBackToMenu, onBackToMain, lakeType = 'all', practiceIds = null }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const { mapW, mapH, hasLayout, onLayout } = useTurkeyMapLayout();
  const baseLakes = getLakesByType(lakeType);
  const lakeTypeName = getLakeTypeName(lakeType);
  const [quizOrder, setQuizOrder] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundLakes, setFoundLakes] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showCorrectLocation, setShowCorrectLocation] = useState(null);
  const [showCorrectCityId, setShowCorrectCityId] = useState(null);
  // Tüm göl tipleri (volkanik, karstik, set vb.) aynı geçiş mantığı: { delay, nextIndex, lakeId, isCorrect }
  const [scheduledAdvance, setScheduledAdvance] = useState(null);

  // Her girişte / tip veya pratik listesi değişince soru sırasını karıştır
  useEffect(() => {
    const list = practiceIds && practiceIds.length > 0
      ? baseLakes.filter((l) => practiceIds.includes(l.id))
      : baseLakes;
    setQuizOrder(shuffleArray(list));
    setCurrentQuestionIndex(0);
    setFoundLakes([]);
    setFeedback(null);
    setShowCorrectLocation(null);
    setShowCorrectCityId(null);
    setScheduledAdvance(null);
  }, [lakeType, practiceIds?.length]);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);
  const tapStart = useRef(null);
  const mapContainerRef = useRef(null);
  const pendingAnswerRef = useRef(false);
  const lastTapTimeRef = useRef(0);

  const currentLake = quizOrder[currentQuestionIndex];
  const isCompleted = quizOrder.length > 0 && foundLakes.length === quizOrder.length;
  const hasNoLakes = quizOrder.length === 0;

  // Tek parmak tap il seçimi için child (Path) alabilsin; iki parmak / pan için biz alalım
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) return true;
        if (scale._value > 1 && (Math.abs(gestureState.dx) > 15 || Math.abs(gestureState.dy) > 15)) return true;
        return false;
      },
      onPanResponderGrant: (evt) => {
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          lastScale.current = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          tapStart.current = null;
        } else if (evt.nativeEvent.touches.length === 1) {
          const t = evt.nativeEvent.touches[0];
          tapStart.current = { pageX: t.pageX, pageY: t.pageY };
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) + Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          if (lastScale.current > 0) {
            const scaleChange = distance / lastScale.current;
            const newScale = Math.max(1, Math.min(scale._value * scaleChange, 4));
            scale.setValue(newScale);
          }
          lastScale.current = distance;
        } else if (evt.nativeEvent.touches.length === 1 && scale._value > 1) {
          if (Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10) tapStart.current = null;
          const newX = lastTranslateX.current + gestureState.dx;
          const newY = lastTranslateY.current + gestureState.dy;
          translateX.setValue(newX);
          translateY.setValue(newY);
        }
      },
      onPanResponderRelease: () => {
        lastTranslateX.current = translateX._value;
        lastTranslateY.current = translateY._value;
        tapStart.current = null;
      },
    })
  ).current;

  // Harita ekranı açıldığında yatay moda geç ve sesleri yükle
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    loadSounds();
    
    return () => {
      unloadSounds();
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  // Cevap sonrası geçiş — volkanik/karstik/set vb. hepsi aynı: state'teki bilgiyle timeout
  useEffect(() => {
    if (scheduledAdvance == null) return;
    const { delay, nextIndex, lakeId, isCorrect } = scheduledAdvance;
    const timer = setTimeout(() => {
      setFoundLakes((prev) => (isCorrect && lakeId != null && !prev.includes(lakeId) ? [...prev, lakeId] : prev));
      setFeedback(null);
      setShowCorrectLocation(null);
      setShowCorrectCityId(null);
      setCurrentQuestionIndex(nextIndex);
      setScheduledAdvance(null);
      pendingAnswerRef.current = false;
    }, delay);
    return () => clearTimeout(timer);
  }, [scheduledAdvance]);

  // Yanlış cevap sonrası zamanlayıcı çalışmadıysa: tekrar tıklayınca geçiş (yedek)
  const applyPendingTransition = () => {
    if (scheduledAdvance == null) return;
    const { nextIndex } = scheduledAdvance;
    setFeedback(null);
    setShowCorrectLocation(null);
    setShowCorrectCityId(null);
    setCurrentQuestionIndex(nextIndex);
    setScheduledAdvance(null);
    pendingAnswerRef.current = false;
  };

  // İl tıklanınca: göl bu ilde mi? (Tüm göl tipleri aynı mantık)
  const handleCityTap = (cityId) => {
    if (isCompleted || !currentLake || !currentLake.cityId) return;
    if (feedback === 'wrong' && scheduledAdvance != null && Date.now() - lastTapTimeRef.current > 2000) {
      applyPendingTransition();
      return;
    }
    if (pendingAnswerRef.current) return;
    if (feedback) return;

    lastTapTimeRef.current = Date.now();
    const isCorrect = String(currentLake.cityId) === String(cityId);
    const lakeId = currentLake.id;
    const delay = isCorrect ? 1000 : 1800;
    const nextIndex =
      currentQuestionIndex < quizOrder.length - 1 ? currentQuestionIndex + 1 : currentQuestionIndex;

    pendingAnswerRef.current = true;

    if (isCorrect) {
      removeWrongAnswer('turkey_lakes', currentLake.id);
      setFeedback('correct');
      playCorrectSound();
    } else {
      saveWrongAnswer('turkey_lakes', currentLake.id, currentLake.name);
      setFeedback('wrong');
      setShowCorrectLocation(currentLake);
      setShowCorrectCityId(currentLake.cityId);
      playWrongSound();
    }
    setScheduledAdvance({ delay, nextIndex, lakeId, isCorrect });
  };



  const handleReset = () => {
    const list = practiceIds && practiceIds.length > 0
      ? baseLakes.filter((l) => practiceIds.includes(l.id))
      : baseLakes;
    setQuizOrder(shuffleArray(list));
    setCurrentQuestionIndex(0);
    setFoundLakes([]);
    setFeedback(null);
    setShowCorrectLocation(null);
    setShowCorrectCityId(null);
    setScheduledAdvance(null);
    pendingAnswerRef.current = false;
    resetZoom();
  };

  const resetZoom = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
    lastScale.current = 1;
    lastTranslateX.current = 0;
    lastTranslateY.current = 0;
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.backButtonsColumn}>
            {onBackToMain && (
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Home size={24} color="#E2E8F0" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <ChevronLeft size={24} color="#E2E8F0" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{lakeTypeName}</Text>
            {hasNoLakes ? (
              <Text style={styles.progressText}>Bu kategoride göl yok</Text>
            ) : !isCompleted ? (
              <Text style={styles.progressText}>
                {foundLakes.length} / {quizOrder.length} göl bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm gölleri buldunuz!
              </Text>
            )}
          </View>
          <View style={styles.headerSpacer} />
          {feedback && (
            <View style={[
              styles.feedbackIcon,
              feedback === 'correct' ? styles.correctIcon : styles.wrongIcon
            ]}>
              {feedback === 'correct' ? (
                <Check size={24} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <X size={24} color="#FFFFFF" strokeWidth={3} />
              )}
            </View>
          )}
        </View>
        {!hasNoLakes && !isCompleted && currentLake && (
          <View style={[styles.questionOverlay, { width: Math.max(screenWidth, screenHeight) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{currentLake.name} hangi ilde?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer} onLayout={onLayout}>
        {hasLayout && (
        <Animated.View
          ref={mapContainerRef}
          style={[
            styles.mapWrapper,
            {
              transform: [
                { scale: scale },
                { translateX: translateX },
                { translateY: translateY },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Svg
            width={mapW}
            height={mapH}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={styles.svg}
          >
            {/* Türkiye haritası – ile tıklayarak gölün bulunduğu ili seç; doğru bilinen göllerin ili yeşil kalır */}
            <G>
              {turkeyPaths.map((city) => {
                const isCorrectCity =
                  showCorrectCityId === city.id ||
                  baseLakes.some((l) => foundLakes.includes(l.id) && l.cityId === city.id);
                const fill = isCorrectCity ? '#22C55E' : '#E2E8F0';
                return (
                  <G key={city.id} onPress={() => handleCityTap(city.id)}>
                    <Path
                      d={city.d}
                      fill={fill}
                      stroke={isCorrectCity ? '#166534' : '#94A3B8'}
                      strokeWidth={isCorrectCity ? '1.2' : '0.8'}
                      opacity={1}
                    />
                  </G>
                );
              })}
            </G>
            {/* Yanlışta doğru il adını il merkezinde göster */}
            {showCorrectCityId && (() => {
              const city = turkeyPaths.find((c) => c.id === showCorrectCityId);
              if (!city) return null;
              const pos = getCityCenter(city.id);
              return (
                <SvgText
                  x={pos.x}
                  y={pos.y}
                  fontSize="12"
                  fill="#166534"
                  textAnchor="middle"
                  fontWeight="700"
                >
                  {city.name}
                </SvgText>
              );
            })()}
            {/* Yanlış cevapta doğru yeri göster */}
            {showCorrectLocation && (() => {
              const { px, py } = getLakeDisplayPos(showCorrectLocation);
              return (
                <G>
                  <Circle cx={px} cy={py} r={14} fill="#0EA5E9" opacity={0.9} stroke="#0369A1" strokeWidth="2" />
                  <SvgText x={px} y={py} fontSize="24" textAnchor="middle" alignmentBaseline="middle">🌊</SvgText>
                  <SvgText x={px} y={py + 28} fontSize="11" fill="#1E293B" textAnchor="middle" fontWeight="700">
                    {showCorrectLocation.name}
                  </SvgText>
                </G>
              );
            })()}
            {/* Doğru bilinen göller — emoji ve isim kalır, ili zaten yeşil */}
            {foundLakes.map((id) => {
              const lake = baseLakes.find((l) => l.id === id);
              if (!lake) return null;
              const { px, py } = getLakeDisplayPos(lake);
              return (
                <G key={lake.id}>
                  <Circle cx={px} cy={py} r={14} fill="#0EA5E9" opacity={0.9} stroke="#0369A1" strokeWidth="2" />
                  <SvgText x={px} y={py} fontSize="24" textAnchor="middle" alignmentBaseline="middle">🌊</SvgText>
                  <SvgText x={px} y={py + 28} fontSize="11" fill="#1E293B" textAnchor="middle" fontWeight="700">
                    {lake.name}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </Animated.View>
        )}

        {/* Sağ alt: üstte zoom, altta yeniden başlat (diğer haritalarla aynı) */}
        <View style={styles.floatingButtonsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.zoomResetButton}
            onPress={resetZoom}
            activeOpacity={0.8}
          >
            <ZoomOut size={22} color="#FFFFFF" />
          </TouchableOpacity>
          {!hasNoLakes && (
            <TouchableOpacity
              style={styles.restartFloatingButton}
              onPress={handleReset}
              activeOpacity={0.8}
            >
              <RefreshCw size={22} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {(isCompleted || hasNoLakes) && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={hasNoLakes ? onBackToMenu : handleReset}
          >
            <Text style={styles.resetButtonText}>{hasNoLakes ? 'Geri Dön' : 'Yeniden Başla'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 36,
    paddingBottom: 4,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
    position: 'relative',
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginRight: 6,
    gap: 4,
  },
  backText: {
    fontSize: 13,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  headerLeft: { justifyContent: 'center', marginLeft: 6 },
  headerSpacer: { flex: 1 },
  questionOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  questionBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 36,
    marginBottom: 3,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#92400E',
  },
  progressText: {
    fontSize: 9,
    color: '#94A3B8',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34D399',
  },
  feedbackIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  correctIcon: {
    backgroundColor: '#10B981',
  },
  wrongIcon: {
    backgroundColor: '#000000',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  mapWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  svg: {
    backgroundColor: 'transparent',
  },
  footer: {
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  floatingButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'column',
    gap: 10,
    zIndex: 100,
  },
  zoomResetButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  restartFloatingButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.4)',
  },
});

export default LakesMap;
