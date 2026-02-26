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
import Svg, { G, Path } from 'react-native-svg';
import { Home, ChevronLeft, Check, X, ZoomOut, RefreshCw } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { worldPaths } from '../constants/worldPaths';
import { continents, getContinentByCountry, getContinentColor } from '../constants/continents';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const VIEWBOX_W = 1000;
const VIEWBOX_H = 482;
const MAP_ASPECT = VIEWBOX_W / VIEWBOX_H;

const ContinentsMap = ({ onBackToMenu, onBackToMain }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [layout, setLayout] = useState({ w: 0, h: 0 });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundContinents, setFoundContinents] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);

  const onMapLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 10 && height > 10) setLayout({ w: width, h: height });
  };
  const mapW = layout.w > 0 && layout.h > 0
    ? (layout.w / layout.h > MAP_ASPECT ? layout.h * MAP_ASPECT : layout.w)
    : 0;
  const mapH = mapW > 0 ? mapW / MAP_ASPECT : 0;
  const hasLayout = mapW > 0 && mapH > 0;

  // Zoom ve Pan: Animated + SVG içi transform (dokunma hassasiyeti için)
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);
  const [mapTransform, setMapTransform] = useState({ s: 1, tx: 0, ty: 0 });

  // Quiz için kıta listesi (Antarktika hariç)
  const quizContinents = Object.keys(continents).filter(key => key !== 'antarctica');
  const currentContinentKey = quizContinents[currentQuestionIndex];
  const currentContinent = continents[currentContinentKey];
  const isCompleted = foundContinents.length === quizContinents.length;

  // PanResponder oluştur
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt) => evt.nativeEvent.touches.length === 2,
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return evt.nativeEvent.touches.length === 2 || 
               (scale._value > 1 && (Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5));
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

  // Zoom/pan değerlerini state'e senkronize et – SVG içi transform ile dokunma doğru eşleşsin
  useEffect(() => {
    if (mapW <= 0 || mapH <= 0) return;
    const update = () => {
      const s = scale._value;
      const vx = translateX._value;
      const vy = translateY._value;
      const txVb = vx * (VIEWBOX_W / mapW);
      const tyVb = vy * (VIEWBOX_H / mapH);
      setMapTransform({ s, tx: txVb, ty: tyVb });
    };
    const id1 = scale.addListener(update);
    const id2 = translateX.addListener(update);
    const id3 = translateY.addListener(update);
    update();
    return () => {
      scale.removeListener(id1);
      translateX.removeListener(id2);
      translateY.removeListener(id3);
    };
  }, [mapW, mapH]);

  const handleCountryPress = (country) => {
    if (isCompleted || feedback) return;
    
    const continentKey = getContinentByCountry(country.id);
    
    if (continentKey === currentContinentKey) {
      // Doğru cevap
      setFeedback('correct');
      setSelectedContinent(continentKey);
      playCorrectSound();
      
      setTimeout(() => {
        setFoundContinents((prev) => [...prev, continentKey]);
        setFeedback(null);
        setSelectedContinent(null);
        setCurrentQuestionIndex((prev) =>
          prev < quizContinents.length - 1 ? prev + 1 : prev
        );
      }, 1000);
    } else {
      // Yanlış cevap
      setFeedback('wrong');
      setSelectedContinent(continentKey);
      playWrongSound();
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedContinent(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setFoundContinents([]);
    setFeedback(null);
    setSelectedContinent(null);
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
                <Home size={20} color="#E2E8F0" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <ChevronLeft size={20} color="#E2E8F0" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Kıtalar Quiz</Text>
            {!isCompleted ? (
              <Text style={styles.progressText}>
                {foundContinents.length} / {quizContinents.length} kıta bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm kıtaları buldunuz!
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
                <Check size={20} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <X size={20} color="#FFFFFF" strokeWidth={3} />
              )}
            </View>
          )}
        </View>
        {!isCompleted && currentContinent && (
          <View style={[styles.questionOverlay, { width: Math.max(screenWidth, screenHeight) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{currentContinent.name} nerede?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer} onLayout={onMapLayout}>
        <Animated.View 
          style={styles.mapWrapper}
          {...panResponder.panHandlers}
        >
          {hasLayout && (
          <Svg
            width={mapW}
            height={mapH}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMid meet"
            style={styles.svg}
          >
            {/* Zoom/pan SVG içinde – dokunma koordinatları doğru eşleşir */}
            <G
              transform={`translate(${VIEWBOX_W / 2},${VIEWBOX_H / 2}) scale(${mapTransform.s}) translate(${-VIEWBOX_W / 2},${-VIEWBOX_H / 2}) translate(${mapTransform.tx},${mapTransform.ty})`}
            >
            {/* Ülkeler - Kıtalara göre renklendir */}
            <G>
              {worldPaths
              .filter((country) => country.id !== 'ATA')
              .map((country) => {
                const continentKey = getContinentByCountry(country.id);
                const isFound = foundContinents.includes(continentKey);
                const isSelected = selectedContinent === continentKey;
                
                let fillColor = getContinentColor(continentKey);
                let strokeColor = '#FFFFFF';
                
                if (isSelected && feedback === 'correct') {
                  fillColor = '#10B981';
                  strokeColor = '#059669';
                } else if (isSelected && feedback === 'wrong') {
                  fillColor = '#000000';
                  strokeColor = '#374151';
                } else if (isFound) {
                  fillColor = '#9CA3AF';
                  strokeColor = '#6B7280';
                }
                
                return (
                  <G 
                    key={country.id}
                    onPress={() => handleCountryPress(country)}
                    onPressIn={() => handleCountryPress(country)}
                  >
                    <Path
                      d={country.d}
                      fill={fillColor}
                      fillOpacity={1}
                      stroke={strokeColor}
                      strokeWidth="0.5"
                      opacity={1}
                    />
                  </G>
                );
              })}
            </G>
            </G>
          </Svg>
          )}
        </Animated.View>

        {/* Sağ alt: zoom + yeniden başlat (diğer haritalarla aynı) */}
        <View style={styles.floatingButtonsContainer} pointerEvents="box-none">
          <TouchableOpacity
            style={styles.zoomResetButton}
            onPress={resetZoom}
            activeOpacity={0.8}
          >
            <ZoomOut size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.restartFloatingButton}
            onPress={handleReset}
            activeOpacity={0.8}
          >
            <RefreshCw size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {isCompleted && (
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Yeniden Başla</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 24,
    paddingBottom: 4,
    paddingHorizontal: 8,
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
    fontSize: 12,
    color: '#E2E8F0',
    fontWeight: '600',
  },
  headerLeft: { justifyContent: 'center' },
  headerSpacer: { flex: 1 },
  questionOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  questionBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 2,
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
    fontSize: 11,
    fontWeight: '600',
    color: '#34D399',
  },
  feedbackIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    backgroundColor: 'transparent',
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
    backgroundColor: 'transparent',
    paddingVertical: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#8B5CF6',
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

export default ContinentsMap;
