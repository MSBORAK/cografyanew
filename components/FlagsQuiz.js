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
import { Home, ChevronLeft, Check, X, RotateCcw, Maximize2 } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { worldPaths } from '../constants/worldPaths';
import { getCountryColor } from '../constants/worldColors';
import { countryFlags } from '../constants/countryFlags';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const VIEWBOX_W = 1000;
const VIEWBOX_H = 507;
const MAP_ASPECT = VIEWBOX_W / VIEWBOX_H;

// Fisher-Yates karıştırma – her girişte farklı sıra
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FlagsQuiz = ({ onBackToMenu, onBackToMain }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const [layout, setLayout] = useState({ w: 0, h: 0 });
  // Her sayfa girişinde soru sırası karışsın
  const [quizFlags, setQuizFlags] = useState(() => shuffleArray(countryFlags));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundCountries, setFoundCountries] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const onMapLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 10 && height > 10) setLayout({ w: width, h: height });
  };
  const mapW = layout.w > 0 && layout.h > 0
    ? (layout.w / layout.h > MAP_ASPECT ? layout.h * MAP_ASPECT : layout.w)
    : 0;
  const mapH = mapW > 0 ? mapW / MAP_ASPECT : 0;
  const hasLayout = mapW > 0 && mapH > 0;

  // Zoom ve Pan için state'ler
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  const currentFlag = quizFlags[currentQuestionIndex];
  const isCompleted = foundCountries.length === quizFlags.length;

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
      unloadSounds();
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
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
        'ROM': 'Romanya', // worldPaths'ta ROM kullanılıyor
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
        setFoundCountries((prev) => [...prev, country.id]);
        setFeedback(null);
        setSelectedCountry(null);
        setCurrentQuestionIndex((prev) =>
          prev < quizFlags.length - 1 ? prev + 1 : prev
        );
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
    setQuizFlags(shuffleArray(countryFlags));
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
            <Text style={styles.title} numberOfLines={1}>Bayrak Bulma Quiz</Text>
            {!isCompleted ? (
              <Text style={styles.progressText} numberOfLines={1}>
                {foundCountries.length} / {quizFlags.length} ülke bulundu
              </Text>
            ) : (
              <Text style={styles.completedText} numberOfLines={1}>
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
                <Check size={20} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <X size={20} color="#FFFFFF" strokeWidth={3} />
              )}
            </View>
          )}
        </View>
        {!isCompleted && currentFlag && (
          <View style={[styles.questionOverlay, { width: Math.max(screenWidth, screenHeight) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.flagEmoji}>{currentFlag.flag}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer} onLayout={onMapLayout}>
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
          {hasLayout && (
          <Svg
            width={mapW}
            height={mapH}
            viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
            preserveAspectRatio="xMidYMid meet"
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
          )}
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
  headerLeft: { justifyContent: 'center', flex: 1, flexShrink: 1, minWidth: 0 },
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flagEmoji: {
    fontSize: 28,
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
    justifyContent: 'center',
    alignItems: 'center',
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
