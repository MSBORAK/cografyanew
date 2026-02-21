import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Text as SvgText } from 'react-native-svg';
import { Home, ChevronLeft, Check, X } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { regions, regionColors } from '../constants/regions';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.92;

// Bölge merkez koordinatları (yaklaşık)
const regionCenters = {
  'marmara': { x: 200, y: 150 },
  'ege': { x: 150, y: 280 },
  'akdeniz': { x: 350, y: 380 },
  'ic-anadolu': { x: 450, y: 250 },
  'karadeniz': { x: 550, y: 120 },
  'dogu-anadolu': { x: 750, y: 200 },
  'guneydogu': { x: 700, y: 350 },
};

const RegionsMap = ({ onBackToMenu, onBackToMain }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundRegions, setFoundRegions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [flashingRegion, setFlashingRegion] = useState(null);

  // Bölge listesi (all hariç)
  const regionList = Object.keys(regions).filter(r => r !== 'all');
  const currentRegion = regionList[currentQuestionIndex];
  const isCompleted = foundRegions.length === regionList.length;

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

  const getRegionForCity = (cityId) => {
    for (const [regionId, regionData] of Object.entries(regions)) {
      if (regionId !== 'all' && regionData.cities.includes(cityId)) {
        return regionId;
      }
    }
    return null;
  };

  const handleCityPress = (cityId) => {
    if (isCompleted || feedback) return;

    const cityRegion = getRegionForCity(cityId);
    if (!cityRegion) return;
    
    if (cityRegion === currentRegion) {
      // Doğru cevap
      setFeedback('correct');
      setFlashingRegion(currentRegion);
      playCorrectSound();
      
      setTimeout(() => {
        setFoundRegions([...foundRegions, currentRegion]);
        setFeedback(null);
        setFlashingRegion(null);
        
        if (currentQuestionIndex < regionList.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1000);
    } else {
      // Yanlış cevap
      setFeedback('wrong');
      setFlashingRegion(cityRegion);
      playWrongSound();
      
      setTimeout(() => {
        setFeedback(null);
        setFlashingRegion(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setFoundRegions([]);
    setFeedback(null);
    setFlashingRegion(null);
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
            <Text style={styles.title}>Bölgeler Quiz</Text>
            {!isCompleted ? (
              <Text style={styles.progressText}>
                {foundRegions.length} / {regionList.length} bölge bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>
                🎉 Tüm bölgeleri buldunuz!
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
        {!isCompleted && currentRegion && (
          <View style={[styles.questionOverlay, { width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{regions[currentRegion].name} nerede?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <View style={styles.mapWrapper}>
          <View>
            <Svg
              width={MAP_WIDTH}
              height={MAP_WIDTH * 0.52}
              viewBox="0 0 1007.478 527.323"
              style={styles.svg}
            >
            <G>
              {turkeyPaths.map((city) => {
                const cityRegion = getRegionForCity(city.id);
                const isFound = foundRegions.includes(cityRegion);
                const isFlashing = flashingRegion === cityRegion;
                
                let fillColor = '#E5E7EB';
                let opacity = 0.6;
                
                if (isFlashing && feedback === 'correct') {
                  fillColor = '#10B981';
                  opacity = 1;
                } else if (isFlashing && feedback === 'wrong') {
                  fillColor = '#000000';
                  opacity = 1;
                } else if (isFound) {
                  fillColor = '#9CA3AF';
                  opacity = 0.6;
                } else if (cityRegion) {
                  fillColor = regionColors[cityRegion];
                  opacity = 0.8;
                }
                
                return (
                  <G 
                    key={city.id}
                    onPress={() => handleCityPress(city.id)}
                    onPressIn={() => handleCityPress(city.id)}
                  >
                    <Path
                      d={city.d}
                      fill={fillColor}
                      stroke="#FFFFFF"
                      strokeWidth="1"
                      opacity={opacity}
                    />
                  </G>
                );
              })}
            </G>
            
            {/* Bölge isimleri - bulunan bölgeler için */}
            <G>
              {regionList.map((regionId) => {
                if (foundRegions.includes(regionId)) {
                  const center = regionCenters[regionId];
                  const regionName = regions[regionId].name.replace(' Bölgesi', '');
                  
                  return (
                    <SvgText
                      key={`text-${regionId}`}
                      x={center.x}
                      y={center.y}
                      fontSize="14"
                      fill="#1F2937"
                      textAnchor="middle"
                      fontWeight="700"
                    >
                      {regionName}
                    </SvgText>
                  );
                }
                return null;
              })}
            </G>
          </Svg>
          </View>
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
    padding: 8,
    marginRight: 12,
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
    marginBottom: 6,
  },
  questionBadge: {
    backgroundColor: '#FCD34D',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'center',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400E',
  },
  progressText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  completedText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34D399',
  },
  feedbackIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
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
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(148, 163, 184, 0.2)',
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default RegionsMap;
