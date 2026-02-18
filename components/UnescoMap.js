import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  PanResponder,
  Animated,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { RotateCcw, Home, Maximize2, Check, X } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { unescoSites } from '../constants/unescoSites';
import { getCityColor } from '../constants/cityColors';
import { getCityCenter } from '../constants/cityCenters';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.92;

// Individual City Component
const CityPath = ({ city, isSelected, isInRegion, isCorrect, isWrong, onPress, cityColor, showingCorrectFeedback }) => {
  // Renk belirleme
  let fillColor;
  if (showingCorrectFeedback && isCorrect) {
    fillColor = '#22C55E'; // Yeşil - Doğru (sadece feedback sırasında)
  } else if (isCorrect) {
    fillColor = '#E5E7EB'; // Gri - Doğru cevaplandı
  } else if (isWrong) {
    fillColor = '#1F2937'; // Siyah - Yanlış
  } else if (isInRegion) {
    fillColor = cityColor; // Bölge rengi
  } else {
    fillColor = '#E5E7EB'; // Gri - Diğer bölgeler
  }

  const strokeColor = isInRegion ? '#1F2937' : '#9CA3AF';
  const strokeWidth = isInRegion ? '1.2' : '0.8';

  return (
    <G onPress={isInRegion ? onPress : null} onPressIn={isInRegion ? onPress : null}>
      <Path
        d={city.d}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        opacity={isInRegion ? 1 : 0.6}
      />
    </G>
  );
};

// Main UNESCO Map Component
const UnescoMap = ({ onBackToMenu }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState([]);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showCross, setShowCross] = useState(false);

  // Pinch-to-zoom için
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  
  const gestureState = useRef({
    lastScale: 1,
    lastTranslateX: 0,
    lastTranslateY: 0,
    initialDistance: null
  });

  // Harita ekranı açıldığında yatay moda geç
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    loadSounds(); // Sesleri yükle
    
    // Ekran kapandığında dikey moda dön
    return () => {
      unloadSounds();
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  // UNESCO için - Sadece UNESCO şehirleri renkli
  const unescoSiteCityIds = unescoSites.map(site => site.cityId);
  const filteredCities = unescoSites;

  // PanResponder for pinch-to-zoom
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        gestureState.current.lastScale = scale._value;
        gestureState.current.lastTranslateX = translateX._value;
        gestureState.current.lastTranslateY = translateY._value;
      },
      onPanResponderMove: (evt, gestureStateEvent) => {
        // Pinch zoom detection
        if (evt.nativeEvent.touches.length === 2) {
          const touch1 = evt.nativeEvent.touches[0];
          const touch2 = evt.nativeEvent.touches[1];
          
          const distance = Math.sqrt(
            Math.pow(touch2.pageX - touch1.pageX, 2) +
            Math.pow(touch2.pageY - touch1.pageY, 2)
          );
          
          if (!gestureState.current.initialDistance) {
            gestureState.current.initialDistance = distance;
          } else {
            const newScale = (distance / gestureState.current.initialDistance) * gestureState.current.lastScale;
            const clampedScale = Math.max(1, Math.min(4, newScale));
            scale.setValue(clampedScale);
          }
        } else if (evt.nativeEvent.touches.length === 1 && gestureState.current.lastScale > 1) {
          // Pan when zoomed
          translateX.setValue(gestureState.current.lastTranslateX + gestureStateEvent.dx);
          translateY.setValue(gestureState.current.lastTranslateY + gestureStateEvent.dy);
        }
      },
      onPanResponderRelease: () => {
        gestureState.current.initialDistance = null;
        gestureState.current.lastScale = scale._value;
        gestureState.current.lastTranslateX = translateX._value;
        gestureState.current.lastTranslateY = translateY._value;
      },
    })
  ).current;

  // İlk soruyu oluştur
  useEffect(() => {
    if (filteredCities.length > 0 && !currentQuestion) {
      askNextQuestion();
    }
  }, [filteredCities]);

  const askNextQuestion = () => {
    // Henüz doğru cevaplanmamış UNESCO alanlarından birini seç
    const unansweredSites = filteredCities.filter(
      site => !correctAnswers.includes(site.id)
    );
    
    if (unansweredSites.length > 0) {
      const randomSite = unansweredSites[Math.floor(Math.random() * unansweredSites.length)];
      setCurrentQuestion(randomSite);
      setWrongAttempts([]);
    } else {
      setCurrentQuestion(null); // Tüm sorular bitti
    }
  };

  const isCityInRegion = (cityId) => {
    // Sadece UNESCO şehirleri renkli
    return unescoSites.some(site => site.cityId == cityId);
  };

  const handleCityPress = async (city) => {
    if (!currentQuestion) return;
    
    // Sadece UNESCO şehirlerine izin ver
    const isUnescoCity = unescoSites.some(site => site.cityId == city.id);
    if (!isUnescoCity) return;
    
    if (city.id == currentQuestion.cityId) {
      // Doğru cevap!
      await playCorrectSound();
      setCorrectAnswers([...correctAnswers, currentQuestion.id]);
      setShowCheckmark(true);
      
      setWrongAttempts(wrongAttempts.filter(id => id !== city.id));
      
      setTimeout(() => {
        askNextQuestion();
        setShowCheckmark(false);
      }, 1000);
    } else {
      // Yanlış cevap
      if (!wrongAttempts.includes(city.id)) {
        await playWrongSound();
        setWrongAttempts([...wrongAttempts, city.id]);
        setShowCross(true);
        
        setTimeout(() => {
          setShowCross(false);
          setWrongAttempts(prev => prev.filter(id => id !== city.id));
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCorrectAnswers([]);
    setWrongAttempts([]);
    setShowCheckmark(false);
    setShowCross(false);
    askNextQuestion();
    
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    gestureState.current.lastScale = 1;
    gestureState.current.lastTranslateX = 0;
    gestureState.current.lastTranslateY = 0;
  };

  const isCityCorrect = (cityId) => {
    const site = unescoSites.find(s => s.cityId == cityId);
    return site && correctAnswers.includes(site.id);
  };

  const isCityWrong = (cityId) => {
    return wrongAttempts.includes(cityId);
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
            <Home size={20} color="#E2E8F0" />
          </TouchableOpacity>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>UNESCO Dünya Mirası</Text>
            <Text style={styles.subtitle}>
              {correctAnswers.length} / {unescoSites.length} alan bulundu
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
        {currentQuestion && (
          <View style={[styles.questionOverlay, { width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{currentQuestion.name} hangi şehirde?</Text>
            </View>
          </View>
        )}
      </View>

      <View
        style={styles.mapContainer}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={[
            styles.mapWrapper,
            {
              transform: [
                { translateX },
                { translateY },
                { scale },
              ],
            },
          ]}
        >
          <View>
            <Svg
              width={MAP_WIDTH}
              height={MAP_WIDTH * 0.52}
              viewBox="0 0 1007.478 527.323"
              style={styles.svg}
            >
              <G>
                {turkeyPaths.map((city, index) => (
                  <CityPath
                    key={city.id}
                    city={city}
                    isInRegion={isCityInRegion(city.id)}
                    isCorrect={isCityCorrect(city.id)}
                    isWrong={isCityWrong(city.id)}
                    onPress={() => handleCityPress(city)}
                    cityColor={getCityColor(city.id, index)}
                    showingCorrectFeedback={showCheckmark}
                  />
                ))}
                
                {/* Doğru cevaplanan UNESCO şehirlerinin isimleri */}
                {unescoSites.map((site) => {
                  if (!correctAnswers.includes(site.id)) return null;
                  
                  const city = turkeyPaths.find(c => c.id == site.cityId);
                  if (!city) return null;
                  
                  const position = getCityCenter(city.id);
                  
                  return (
                    <G key={`text-${site.id}`}>
                      <SvgText
                        x={position.x}
                        y={position.y - 8}
                        fontSize="8"
                        fill="#1F2937"
                        textAnchor="middle"
                        fontWeight="700"
                      >
                        {site.name}
                      </SvgText>
                      <SvgText
                        x={position.x}
                        y={position.y + 2}
                        fontSize="7"
                        fill="#4B5563"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        ({city.name})
                      </SvgText>
                    </G>
                  );
                })}
                
                {/* Gri şehirlerin isimleri (UNESCO olmayan) */}
                {turkeyPaths.map((city) => {
                  const isUnescoCity = unescoSites.some(site => site.cityId == city.id);
                  if (isUnescoCity) return null; // UNESCO şehirlerini atla
                  
                  const position = getCityCenter(city.id);
                  
                  return (
                    <SvgText
                      key={`gray-text-${city.id}`}
                      x={position.x}
                      y={position.y}
                      fontSize="7"
                      fill="#6B7280"
                      textAnchor="middle"
                      fontWeight="500"
                      opacity={0.7}
                    >
                      {city.name}
                    </SvgText>
                  );
                })}
              </G>
            </Svg>
          </View>
        </Animated.View>

        {/* Doğru cevap - Yeşil tik */}
        {showCheckmark && (
          <View style={styles.feedbackOverlay}>
            <View style={styles.checkmarkCircle}>
              <Check size={60} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
        )}

        {/* Yanlış cevap - Kırmızı çarpı */}
        {showCross && (
          <View style={styles.feedbackOverlay}>
            <View style={styles.crossCircle}>
              <X size={60} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
        )}

        {!currentQuestion && correctAnswers.length === unescoSites.length && (
          <View style={styles.completionCard}>
            <Text style={styles.completionEmoji}>🎉</Text>
            <Text style={styles.completionTitle}>Tebrikler!</Text>
            <Text style={styles.completionText}>
              Tüm UNESCO alanlarını buldunuz!
            </Text>
          </View>
        )}
      </View>

      {/* Floating Buttons */}
      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity
          style={[styles.floatingButton, styles.resetFloatingButton]}
          onPress={handleReset}
        >
          <RotateCcw size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  questionBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  questionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#92400E',
  },
  subtitle: {
    fontSize: 10,
    color: '#94A3B8',
  },
  mapContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  mapContent: {
    padding: 16,
    alignItems: 'center',
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
  feedbackOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  checkmarkCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  crossCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  completionCard: {
    marginTop: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  completionEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  completionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 6,
  },
  completionText: {
    fontSize: 13,
    color: '#6B7280',
  },
  floatingButtonsContainer: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'column',
    gap: 8,
  },
  floatingButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  resetFloatingButton: {
    backgroundColor: '#EF4444',
  },
});

export default UnescoMap;
