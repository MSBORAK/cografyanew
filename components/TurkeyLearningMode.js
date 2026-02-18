import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { Home, ChevronLeft, ChevronRight, Info } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { getCityColor } from '../constants/cityColors';
import { getCityCenter } from '../constants/cityCenters';
import { getRandomFact } from '../constants/cityFacts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.9;

const TurkeyLearningMode = ({ onBackToMenu }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const currentCity = turkeyPaths[currentIndex];
  const cityCenter = getCityCenter(currentCity.id);
  const fact = getRandomFact(currentCity.name);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  const handleNext = () => {
    setShowInfo(false);
    if (currentIndex < turkeyPaths.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    setShowInfo(false);
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#10B981" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Türkiye Şehirleri</Text>
          <Text style={styles.subtitle}>
            {currentIndex + 1} / {turkeyPaths.length}
          </Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.cityCard}>
          <Text style={styles.cityName}>{currentCity.name}</Text>
          <TouchableOpacity
            style={styles.infoButton}
            onPress={() => setShowInfo(!showInfo)}
          >
            <Info size={20} color="#10B981" />
            <Text style={styles.infoButtonText}>
              {showInfo ? 'Bilgiyi Gizle' : 'İlginç Bilgi'}
            </Text>
          </TouchableOpacity>
          {showInfo && (
            <View style={styles.factBox}>
              <Text style={styles.factText}>{fact}</Text>
            </View>
          )}
        </View>

        <View style={styles.mapContainer}>
          <Svg
            width={MAP_WIDTH}
            height={MAP_WIDTH * 0.52}
            viewBox="0 0 1007.478 527.323"
            style={styles.svg}
          >
            <G>
              {/* Tüm şehirler gri */}
              {turkeyPaths.map((city, index) => (
                <Path
                  key={city.id}
                  d={city.d}
                  fill={city.id === currentCity.id ? '#10B981' : '#E5E7EB'}
                  stroke={city.id === currentCity.id ? '#059669' : '#9CA3AF'}
                  strokeWidth={city.id === currentCity.id ? '1.5' : '0.8'}
                  opacity={city.id === currentCity.id ? 1 : 0.5}
                />
              ))}

              {/* Mevcut şehir işareti */}
              <Circle
                cx={cityCenter.x}
                cy={cityCenter.y}
                r="8"
                fill="#EF4444"
                stroke="#FFFFFF"
                strokeWidth="2"
              />

              {/* Şehir ismi */}
              <SvgText
                x={cityCenter.x}
                y={cityCenter.y - 15}
                fontSize="12"
                fill="#111827"
                textAnchor="middle"
                fontWeight="700"
              >
                {currentCity.name}
              </SvgText>
            </G>
          </Svg>
        </View>

        <View style={styles.navigation}>
          <TouchableOpacity
            style={[styles.navButton, currentIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft size={24} color={currentIndex === 0 ? '#9CA3AF' : '#FFFFFF'} />
            <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
              Önceki
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, currentIndex === turkeyPaths.length - 1 && styles.navButtonDisabled]}
            onPress={handleNext}
            disabled={currentIndex === turkeyPaths.length - 1}
          >
            <Text style={[styles.navButtonText, currentIndex === turkeyPaths.length - 1 && styles.navButtonTextDisabled]}>
              Sonraki
            </Text>
            <ChevronRight size={24} color={currentIndex === turkeyPaths.length - 1 ? '#9CA3AF' : '#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerCenter: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  cityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 12,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D1FAE5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
  },
  factBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  factText: {
    fontSize: 14,
    color: '#065F46',
    lineHeight: 20,
  },
  mapContainer: {
    flex: 1,
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
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  navButtonDisabled: {
    backgroundColor: '#E5E7EB',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  navButtonTextDisabled: {
    color: '#9CA3AF',
  },
});

export default TurkeyLearningMode;
