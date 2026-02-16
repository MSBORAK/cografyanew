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
import Svg, { G, Path } from 'react-native-svg';
import { Home, Check, X, RotateCcw, Maximize2 } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { worldPaths } from '../constants/worldPaths';
import { getCountryColor } from '../constants/worldColors';
import { countryFlags } from '../constants/countryFlags';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.75;

const FlagsQuiz = ({ onBackToMenu }) => {
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

  const currentFlag = countryFlags[currentQuestionIndex];
  const isCompleted = foundCountries.length === countryFlags.length;

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

  // Harita ekranı açıldığında yatay moda geç ve sesleri yükle
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    loadSounds();
    
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      unloadSounds();
    };
  }, []);

  const handleCountryPress = (country) => {
    if (isCompleted || feedback) return;
    
    // Ülke adını normalize et (Türkiye için özel durum)
    const normalizeCountryName = (name) => {
      // worldPaths'deki 3 harfli kodları tam isimlere çevir
      const countryNameMap = {
        'TUR': 'Türkiye',
        'USA': 'Amerika Birleşik Devletleri',
        'DEU': 'Almanya',
        'FRA': 'Fransa',
        'GBR': 'İngiltere',
        'ITA': 'İtalya',
        'ESP': 'İspanya',
        'RUS': 'Rusya',
        'CHN': 'Çin',
        'JPN': 'Japonya',
        'KOR': 'Güney Kore',
        'IND': 'Hindistan',
        'BRA': 'Brezilya',
        'ARG': 'Arjantin',
        'MEX': 'Meksika',
        'CAN': 'Kanada',
        'AUS': 'Avustralya',
        'NZL': 'Yeni Zelanda',
        'ZAF': 'Güney Afrika',
        'EGY': 'Mısır',
        'SAU': 'Suudi Arabistan',
        'IRN': 'İran',
        'ISR': 'İsrail',
        'GRC': 'Yunanistan',
        'NLD': 'Hollanda',
        'BEL': 'Belçika',
        'CHE': 'İsviçre',
        'AUT': 'Avusturya',
        'POL': 'Polonya',
        'UKR': 'Ukrayna',
        'SWE': 'İsveç',
        'NOR': 'Norveç',
        'DNK': 'Danimarka',
        'FIN': 'Finlandiya',
        'PRT': 'Portekiz',
        'ROU': 'Romanya',
        'CZE': 'Çekya',
        'HUN': 'Macaristan',
        'THA': 'Tayland',
        'VNM': 'Vietnam',
        'IDN': 'Endonezya',
        'MYS': 'Malezya',
        'SGP': 'Singapur',
        'PHL': 'Filipinler',
        'PAK': 'Pakistan',
        'BGD': 'Bangladeş',
        'CHL': 'Şili',
        'COL': 'Kolombiya',
        'PER': 'Peru',
        'IRL': 'İrlanda',
      };
      
      return countryNameMap[name] || name;
    };
    
    const countryName = normalizeCountryName(country.name);
    
    if (countryName === currentFlag.name) {
      // Doğru cevap!
      setFeedback('correct');
      setSelectedCountry(country.id);
      playCorrectSound();
      
      setTimeout(() => {
        setFoundCountries([...foundCountries, country.id]);
        setFeedback(null);
        setSelectedCountry(null);
        
        if (currentQuestionIndex < countryFlags.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1000);
    } else {
      // Yanlış cevap
      setFeedback('wrong');
      setSelectedCountry(country.id);
      playWrongSound();
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedCountry(null);
      }, 1000);
    }
  };

  const handleReset = () => {
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
            <Home size={24} color="#2563EB" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Bayrak Bulma Quiz</Text>
            {!isCompleted ? (
              <>
                <View style={styles.questionBadge}>
                  <Text style={styles.flagEmoji}>{currentFlag?.flag}</Text>
                </View>
                <Text style={styles.progressText}>
                  {foundCountries.length} / {countryFlags.length} ülke bulundu
                </Text>
              </>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm ülkeleri buldunuz!
              </Text>
            )}
          </View>
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
            <G>
              {worldPaths.map((country, index) => {
                const isFound = foundCountries.includes(country.id);
                const isSelected = selectedCountry === country.id;
                
                let fillColor = getCountryColor(index);
                let strokeColor = '#FFFFFF';
                
                if (isSelected && feedback === 'correct') {
                  fillColor = '#10B981'; // Yeşil
                  strokeColor = '#059669';
                } else if (isSelected && feedback === 'wrong') {
                  fillColor = '#000000'; // Siyah
                  strokeColor = '#374151';
                } else if (isFound) {
                  fillColor = '#9CA3AF'; // Gri
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
                      stroke={strokeColor}
                      strokeWidth="0.5"
                      opacity={0.9}
                    />
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        {/* Zoom Reset Butonu */}
        <TouchableOpacity 
          style={styles.zoomResetButton}
          onPress={resetZoom}
        >
          <Maximize2 size={20} color="#FFFFFF" />
        </TouchableOpacity>

        {/* Oyunu Yeniden Başlat Butonu */}
        {!isCompleted && (
          <TouchableOpacity 
            style={styles.restartButton}
            onPress={handleReset}
          >
            <RotateCcw size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
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
    paddingTop: 6,
    paddingBottom: 6,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  questionBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: {
    fontSize: 32,
  },
  progressText: {
    fontSize: 10,
    color: '#6B7280',
  },
  completedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
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
    elevation: 5,
  },
  restartButton: {
    position: 'absolute',
    bottom: 16,
    right: 72,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default FlagsQuiz;
