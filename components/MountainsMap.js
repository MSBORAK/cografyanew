import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { Home, ChevronLeft, Check, X, RotateCcw } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { getCityCenter } from '../constants/cityCenters';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';
import { getMountainsByType, getMountainTypeName } from '../constants/mountainTypes';
import { saveWrongAnswer, removeWrongAnswer } from '../utils/practiceMode';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.92;
const VIEWBOX_W = 1007.478;
const VIEWBOX_H = 527.323;

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MountainsMap = ({ onBackToMenu, onBackToMain, mountainType = 'all', practiceIds = null }) => {
  const mountainTypeName = getMountainTypeName(mountainType);
  const [mountains, setMountains] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundMountains, setFoundMountains] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [showCorrectLocation, setShowCorrectLocation] = useState(null);
  const [showCorrectCityId, setShowCorrectCityId] = useState(null);

  // Zoom ve Pan için state'ler
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  // Her açılışta dağ listesini karıştır
  useEffect(() => {
    const baseMountains = getMountainsByType(mountainType);
    const list = practiceIds && practiceIds.length > 0
      ? baseMountains.filter((m) => practiceIds.includes(m.id))
      : baseMountains;
    setMountains(shuffleArray(list));
    setCurrentQuestionIndex(0);
    setFoundMountains([]);
    setFeedback(null);
    setShowCorrectLocation(null);
    setShowCorrectCityId(null);
  }, [mountainType, practiceIds]);

  const currentMountain = mountains[currentQuestionIndex];
  const isCompleted = mountains.length > 0 && foundMountains.length === mountains.length;
  const hasNoMountains = mountains.length === 0;

  const mountainEmoji = mountainType === 'volcanic' ? '🌋' : mountainType === 'tectonic' ? '⛰️' : '🏔️';

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
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          lastScale.current = distance;
        }
      },
      onPanResponderMove: (evt, gestureState) => {
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          
          if (lastScale.current > 0) {
            const scaleChange = distance / lastScale.current;
            const currentScale = scale._value * scaleChange;
            const newScale = Math.max(1, Math.min(currentScale, 4));
            scale.setValue(newScale);
          }
          lastScale.current = distance;
        } else if (evt.nativeEvent.touches.length === 1 && scale._value > 1) {
          const newX = lastTranslateX.current + gestureState.dx;
          const newY = lastTranslateY.current + gestureState.dy;
          translateX.setValue(newX);
          translateY.setValue(newY);
        }
      },
      onPanResponderRelease: () => {
        lastTranslateX.current = translateX._value;
        lastTranslateY.current = translateY._value;
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

  // İl tıklanınca: dağ bu ilde mi kontrol et (dağ hangi ilde?)
  const handleCityTap = (cityId) => {
    if (isCompleted || feedback || !currentMountain || !currentMountain.cityId) return;
    const isCorrect = currentMountain.cityId === String(cityId);

    if (isCorrect) {
      removeWrongAnswer('turkey_mountains', currentMountain.id);
      setFeedback('correct');
      playCorrectSound();
      setTimeout(() => {
        setFoundMountains((prev) => [...prev, currentMountain.id]);
        setFeedback(null);
        setShowCorrectLocation(null);
        setShowCorrectCityId(null);
        if (currentQuestionIndex < mountains.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1000);
    } else {
      saveWrongAnswer('turkey_mountains', currentMountain.id, currentMountain.name);
      setFeedback('wrong');
      setShowCorrectLocation(currentMountain);
      setShowCorrectCityId(currentMountain.cityId);
      playWrongSound();
      setTimeout(() => {
        setFeedback(null);
        setShowCorrectLocation(null);
        setShowCorrectCityId(null);
        if (currentQuestionIndex < mountains.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1800);
    }
  };

  const handleReset = () => {
    const baseMountains = getMountainsByType(mountainType);
    const list = practiceIds && practiceIds.length > 0
      ? baseMountains.filter((m) => practiceIds.includes(m.id))
      : baseMountains;
    setMountains(shuffleArray(list));
    setCurrentQuestionIndex(0);
    setFoundMountains([]);
    setFeedback(null);
    setShowCorrectLocation(null);
    setShowCorrectCityId(null);
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
            <Text style={styles.title}>{mountainTypeName}</Text>
            {hasNoMountains ? (
              <Text style={styles.progressText}>Bu kategoride dağ yok</Text>
            ) : !isCompleted ? (
              <Text style={styles.progressText}>
                {foundMountains.length} / {mountains.length} dağ bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm dağları buldunuz!
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
        {!hasNoMountains && !isCompleted && currentMountain && (
          <View style={[styles.questionOverlay, { width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{currentMountain.name} hangi ilde?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <Animated.View 
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
          <View style={{ width: MAP_WIDTH, height: MAP_WIDTH * 0.52 }}>
            <Svg
              width={MAP_WIDTH}
              height={MAP_WIDTH * 0.52}
              viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
              style={styles.svg}
            >
            {/* Türkiye haritası – ile tıklayarak dağın bulunduğu ili seç */}
            <G>
              {turkeyPaths.map((city) => {
                const isCorrectCity = showCorrectCityId === city.id;
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
            {/* Yanlış cevapta doğru dağ konumunu göster */}
            {showCorrectLocation && (
              <G>
                <SvgText
                  x={showCorrectLocation.x}
                  y={showCorrectLocation.y}
                  fontSize="24"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {mountainEmoji}
                </SvgText>
                <SvgText
                  x={showCorrectLocation.x}
                  y={showCorrectLocation.y + 28}
                  fontSize="11"
                  fill="#1E293B"
                  textAnchor="middle"
                  fontWeight="700"
                >
                  {showCorrectLocation.name}
                </SvgText>
              </G>
            )}
            {/* Tamamlanınca bulunan dağları göster */}
            {isCompleted && mountains.map((mountain) => (
              <G key={mountain.id}>
                <SvgText
                  x={mountain.x}
                  y={mountain.y}
                  fontSize="22"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {mountainEmoji}
                </SvgText>
                <SvgText
                  x={mountain.x}
                  y={mountain.y + 28}
                  fontSize="11"
                  fill="#1E293B"
                  textAnchor="middle"
                  fontWeight="700"
                >
                  {mountain.name}
                </SvgText>
              </G>
            ))}
          </Svg>
          </View>
        </Animated.View>

        {/* Zoom Reset Butonu */}
        <TouchableOpacity 
          style={styles.zoomResetButton}
          onPress={resetZoom}
        >
          <RotateCcw size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {(isCompleted || hasNoMountains) && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={hasNoMountains ? onBackToMenu : handleReset}
          >
            <Text style={styles.resetButtonText}>{hasNoMountains ? 'Geri Dön' : 'Yeniden Başla'}</Text>
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
    paddingTop: 48,
    paddingBottom: 2,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    marginRight: 8,
    gap: 4,
  },
  backText: {
    fontSize: 14,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  headerLeft: { justifyContent: 'center' },
  headerSpacer: { flex: 1 },
  questionOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  questionBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    alignSelf: 'center',
    marginTop: 48,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#92400E',
  },
  progressText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
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
  zoomResetButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 10,
  },
});

export default MountainsMap;
