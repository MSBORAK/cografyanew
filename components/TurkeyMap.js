import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  PanResponder,
  Animated,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { RotateCcw, Home, Maximize2, Check, X, ChevronLeft } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { regions, regionColors } from '../constants/regions';
import { getCityColor } from '../constants/cityColors';
import { regionViewBox } from '../constants/regionViewBox';
import { getCityCenter } from '../constants/cityCenters';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';
import { getRandomFact } from '../constants/cityFacts';
import { saveWrongAnswer, removeWrongAnswer } from '../utils/practiceMode';

const MAP_ASPECT_RATIO = 1007.478 / 527.323;

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

// Main Turkey Map Component
const TurkeyMap = ({ onBackToHome, onBackToMain, selectedRegion = 'all', learningMode = false, practiceCityIds = null }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [layout, setLayout] = useState({ w: screenWidth, h: Math.max(screenHeight - 50, 300) });
  const [selectedCities, setSelectedCities] = useState([]);

  const onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 10 && height > 10) setLayout({ w: width, h: height });
  };

  const mapW = layout.w / layout.h > MAP_ASPECT_RATIO ? layout.h * MAP_ASPECT_RATIO : layout.w;
  const mapH = mapW / MAP_ASPECT_RATIO;
  const [lastSelectedCity, setLastSelectedCity] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState([]);
  const [isZoomedToRegion, setIsZoomedToRegion] = useState(false);
  const [currentViewBox, setCurrentViewBox] = useState('0 0 1007.478 527.323');
  const [showCheckmark, setShowCheckmark] = useState(false);
  const [showCross, setShowCross] = useState(false);
  const [factMessage, setFactMessage] = useState(null);

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

  // Seçilen bölgeye göre veya pratik moduna göre şehirleri filtrele
  const regionCities = regions[selectedRegion]?.cities || [];
  const filteredCities = practiceCityIds?.length > 0
    ? turkeyPaths.filter(city => practiceCityIds.includes(city.id))
    : regionCities.length > 0
      ? turkeyPaths.filter(city => regionCities.includes(city.id))
      : turkeyPaths;

  const regionColor = regionColors[selectedRegion] || '#2563EB';
  const regionName = regions[selectedRegion]?.name || 'Tüm Şehirler';

  // İlk yüklemede tüm haritayı göster
  useEffect(() => {
    setCurrentViewBox('0 0 1007.478 527.323');
    setIsZoomedToRegion(false);
  }, []);

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
    // Henüz doğru cevaplanmamış şehirlerden birini seç
    const unansweredCities = filteredCities.filter(
      city => !correctAnswers.includes(city.id)
    );
    
    if (unansweredCities.length > 0) {
      const randomCity = unansweredCities[Math.floor(Math.random() * unansweredCities.length)];
      setCurrentQuestion(randomCity);
      setWrongAttempts([]);
    } else {
      setCurrentQuestion(null); // Tüm sorular bitti
    }
  };

  const isCityInRegion = (cityId) => {
    if (practiceCityIds?.length > 0) return true; // Pratik modunda tüm şehirler tıklanabilir
    if (regionCities.length === 0) return true;
    return regionCities.includes(cityId);
  };

  const handleCityPress = async (city) => {
    console.log('Şehir tıklandı:', city.name);
    
    // Quiz modunda
    if (currentQuestion) {
      if (city.id === currentQuestion.id) {
        // Doğru cevap!
        await playCorrectSound(); // Doğru ses çal
        removeWrongAnswer('turkey_cities', city.id); // Pratik listesinden çıkar
        setCorrectAnswers([...correctAnswers, city.id]);
        setLastSelectedCity(`${city.name} - Doğru!`);
        setShowCheckmark(true);
        
        // Öğrenme modunda ilginç bilgi göster
        if (learningMode) {
          const fact = getRandomFact(city.name);
          setFactMessage(fact);
        }
        
        // Yanlış denemelerden temizle
        setWrongAttempts(wrongAttempts.filter(id => id !== city.id));
        
        // Öğrenme modunda 3 saniye, normal modda 1 saniye bekle
        const delay = learningMode ? 3000 : 1000;
        setTimeout(() => {
          askNextQuestion();
          setLastSelectedCity(null);
          setShowCheckmark(false);
          setFactMessage(null);
        }, delay);
      } else {
        // Yanlış cevap - kaydet ve göster
        saveWrongAnswer('turkey_cities', currentQuestion.id, currentQuestion.name);
        if (!wrongAttempts.includes(city.id)) {
          await playWrongSound(); // Yanlış ses çal
          setWrongAttempts([...wrongAttempts, city.id]);
          setLastSelectedCity(`${city.name} - Yanlış!`);
          setShowCross(true);
          
          setTimeout(() => {
            setLastSelectedCity(null);
            setShowCross(false);
            setWrongAttempts(prev => prev.filter(id => id !== city.id));
          }, 1000);
        }
      }
      return;
    }

    // Normal mod (quiz olmadan)
    setSelectedCities((prev) => {
      const isAlreadySelected = prev.some((c) => c.id === city.id);
      
      if (isAlreadySelected) {
        setLastSelectedCity(null);
        return prev.filter((c) => c.id !== city.id);
      } else {
        setLastSelectedCity(city.name);
        return [...prev, city];
      }
    });
  };

  const handleReset = () => {
    setSelectedCities([]);
    setLastSelectedCity(null);
    setCorrectAnswers([]);
    setWrongAttempts([]);
    setShowCheckmark(false);
    setShowCross(false);
    askNextQuestion();
  };

  const isCitySelected = (cityId) => {
    return selectedCities.some((c) => c.id === cityId);
  };

  const isCityCorrect = (cityId) => {
    return correctAnswers.includes(cityId);
  };

  const isCityWrong = (cityId) => {
    return wrongAttempts.includes(cityId);
  };

  const toggleZoom = () => {
    if (isZoomedToRegion) {
      // Tüm Türkiye'yi göster
      setCurrentViewBox('0 0 1007.478 527.323');
      setIsZoomedToRegion(false);
    } else {
      // Bölgeye zoom yap
      setCurrentViewBox(regionViewBox[selectedRegion] || '0 0 1007.478 527.323');
      setIsZoomedToRegion(true);
    }
    // Zoom'u sıfırla
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
              <TouchableOpacity style={styles.mainMenuButton} onPress={onBackToMain}>
                <Home size={20} color="#E2E8F0" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToHome}>
              <ChevronLeft size={20} color="#E2E8F0" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>{regionName}</Text>
            <Text style={styles.subtitle}>
              {correctAnswers.length} / {filteredCities.length} şehir bulundu
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
        {currentQuestion && (
          <View style={[styles.questionOverlay, { width: Math.max(screenWidth, screenHeight) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>
                {currentQuestion.name} nerede?
              </Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer} onLayout={onLayout} {...panResponder.panHandlers}>
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
          <View style={styles.svgContainer}>
            <Svg
              width={mapW}
              height={mapH}
              viewBox={currentViewBox}
              preserveAspectRatio="xMidYMid meet"
              style={styles.svg}
            >
              <G>
                {turkeyPaths.map((city, index) => (
                  <CityPath
                    key={city.id}
                    city={city}
                    isSelected={isCitySelected(city.id)}
                    isInRegion={isCityInRegion(city.id)}
                    isCorrect={isCityCorrect(city.id)}
                    isWrong={isCityWrong(city.id)}
                    onPress={() => handleCityPress(city)}
                    cityColor={getCityColor(city.id, index)}
                    showingCorrectFeedback={showCheckmark}
                  />
                ))}
                
                {/* Doğru cevaplanan şehirlerin isimleri */}
                {turkeyPaths.map((city) => {
                  if (isCityCorrect(city.id)) {
                    const position = getCityCenter(city.id);
                    
                    return (
                      <SvgText
                        key={`text-${city.id}`}
                        x={position.x}
                        y={position.y}
                        fontSize="10"
                        fill="#1F2937"
                        textAnchor="middle"
                        fontWeight="700"
                      >
                        {city.name}
                      </SvgText>
                    );
                  }
                  return null;
                })}
                
                {/* Gri şehirlerin isimleri (bölge dışı) */}
                {turkeyPaths.map((city) => {
                  const isInRegion = isCityInRegion(city.id);
                  const isCorrect = isCityCorrect(city.id);
                  
                  // Sadece gri şehirleri göster (bölge dışı ve doğru cevaplanmamış)
                  if (isInRegion || isCorrect) return null;
                  
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

        {/* İlginç Bilgi Kartı */}
        {factMessage && (
          <View style={styles.factCard}>
            <Text style={styles.factTitle}>💡 Bunu biliyor muydunuz?</Text>
            <Text style={styles.factText}>{factMessage}</Text>
          </View>
        )}

        {lastSelectedCity && (
          <View style={[
            styles.toast,
            lastSelectedCity.includes('Doğru') && styles.toastSuccess,
            lastSelectedCity.includes('Yanlış') && styles.toastError
          ]}>
            <Text style={styles.toastText}>
              {lastSelectedCity}
            </Text>
          </View>
        )}

        {!currentQuestion && correctAnswers.length === filteredCities.length && (
          <View style={styles.completionCard}>
            <Text style={styles.completionEmoji}>🎉</Text>
            <Text style={styles.completionTitle}>Tebrikler!</Text>
            <Text style={styles.completionText}>
              Tüm şehirleri buldunuz!
            </Text>
          </View>
        )}
      </View>

      {/* Floating Buttons */}
      <View style={styles.floatingButtonsContainer}>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={toggleZoom}
        >
          <Maximize2 size={20} color="#FFFFFF" />
        </TouchableOpacity>
        
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
  },
  header: {
    paddingTop: 48,
    paddingBottom: 2,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
    position: 'relative',
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
  mainMenuButton: {
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
  headerLeft: { justifyContent: 'center', marginLeft: 8 },
  headerSpacer: { flex: 1 },
  questionOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  },
  svgContainer: {},
  svg: {
    flex: 1,
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
  factCard: {
    position: 'absolute',
    bottom: 80,
    left: 12,
    right: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  factTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 6,
  },
  factText: {
    fontSize: 11,
    color: '#111827',
    lineHeight: 16,
  },
  toast: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  toastSuccess: {
    backgroundColor: '#22C55E',
  },
  toastError: {
    backgroundColor: '#EF4444',
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
  toastText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
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

export default TurkeyMap;
