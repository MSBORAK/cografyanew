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
import { Home, Check, X, RotateCcw } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { worldPaths, countryNames } from '../constants/worldPaths';
import { getCountryColor } from '../constants/worldColors';
import { oceans, getOceanColor } from '../constants/oceans';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.92;

// Diziyi karıştıran fonksiyon
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const WorldMap = ({ onBackToMenu }) => {
  const [quizCountries, setQuizCountries] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundCountries, setFoundCountries] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Zoom ve Pan için state'ler
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  // İlk yüklemede soruları karıştır
  useEffect(() => {
    const shuffled = shuffleArray(worldPaths.slice(0, 20));
    setQuizCountries(shuffled);
  }, []);

  // Harita ekranı açıldığında yatay moda geç ve sesleri yükle
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    loadSounds(); // Sesleri yükle
    
    return () => {
      unloadSounds();
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  const currentCountry = quizCountries[currentQuestionIndex];
  const isCompleted = foundCountries.length === quizCountries.length;

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

  const handleCountryPress = async (country) => {
    if (isCompleted || feedback) return;
    
    if (country.id === currentCountry.id) {
      // Doğru cevap
      await playCorrectSound(); // Doğru ses çal
      setFeedback('correct');
      setSelectedCountry(country.id);
      
      setTimeout(() => {
        setFoundCountries([...foundCountries, country.id]);
        setFeedback(null);
        setSelectedCountry(null);
        
        if (currentQuestionIndex < quizCountries.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1000);
    } else {
      // Yanlış cevap
      await playWrongSound(); // Yanlış ses çal
      setFeedback('wrong');
      setSelectedCountry(country.id);
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedCountry(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    const shuffled = shuffleArray(worldPaths.slice(0, 20));
    setQuizCountries(shuffled);
    setCurrentQuestionIndex(0);
    setFoundCountries([]);
    setFeedback(null);
    setSelectedCountry(null);
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
          <TouchableOpacity 
            style={styles.backButton}
            onPress={onBackToMenu}
          >
            <Home size={24} color="#E2E8F0" />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>Dünya Haritası Quiz</Text>
            {!isCompleted ? (
              <Text style={styles.progressText}>
                {foundCountries.length} / {quizCountries.length} ülke bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm ülkeleri buldunuz!
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
        {!isCompleted && currentCountry && (
          <View style={[styles.questionOverlay, { width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{countryNames[currentCountry.id] || currentCountry.id} nerede?</Text>
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
          <Svg
            width={MAP_WIDTH}
            height={MAP_WIDTH * 0.507}
            viewBox="0 0 1000 507"
            style={styles.svg}
          >
            {/* Deniz arka planı */}
            <Path
              d="M0,0 L1000,0 L1000,507 L0,507 Z"
              fill="#A5D8FF"
              opacity={0.3}
            />

            {/* Okyanus isimleri */}
            <G>
              {oceans.map((ocean) => 
                ocean.regions.map((region, idx) => (
                  <SvgText
                    key={`${ocean.id}-${idx}`}
                    x={region.x}
                    y={region.y}
                    fontSize="14"
                    fontWeight="600"
                    fill={getOceanColor(ocean.id)}
                    textAnchor="middle"
                    opacity={0.7}
                  >
                    {ocean.name}
                  </SvgText>
                ))
              )}
            </G>

            {/* Ülkeler */}
            <G>
              {worldPaths.map((country, index) => {
                const isFound = foundCountries.includes(country.id);
                const isSelected = selectedCountry === country.id;
                
                // Her ülkeye farklı renk
                let fillColor = getCountryColor(index);
                let strokeColor = '#FFFFFF';
                
                if (isSelected && feedback === 'correct') {
                  fillColor = '#10B981';
                  strokeColor = '#059669';
                } else if (isSelected && feedback === 'wrong') {
                  fillColor = '#000000';
                  strokeColor = '#374151';
                } else if (isFound) {
                  fillColor = '#4B5563'; // Çok daha koyu gri
                  strokeColor = '#374151';
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
                      stroke={strokeColor}
                      strokeWidth="0.5"
                      opacity={isFound ? 0.9 : 0.9}
                    />
                  </G>
                );
              })}
            </G>

            {/* Ülke isimleri gösterilmiyor - karışıklığı önlemek için (soru üstte: "X nerede?") */}
          </Svg>
        </Animated.View>

        {/* Zoom Reset Butonu */}
        <TouchableOpacity 
          style={styles.zoomResetButton}
          onPress={resetZoom}
        >
          <RotateCcw size={20} color="#FFFFFF" />
        </TouchableOpacity>
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
  },
  header: {
    paddingTop: 36,
    paddingBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerLeft: { justifyContent: 'center' },
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
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'center',
    marginBottom: 3,
  },
  questionText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400E',
  },
  progressText: {
    fontSize: 10,
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
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
    backgroundColor: '#3B82F6',
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
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default WorldMap;
