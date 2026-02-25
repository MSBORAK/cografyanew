import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  useWindowDimensions,
  ScrollView,
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
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const shortSide = Math.min(winWidth, winHeight);
  const isMobile = shortSide < 600;

  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.floor(Math.random() * turkeyPaths.length)
  );
  const [showInfo, setShowInfo] = useState(false);
  const [currentFact, setCurrentFact] = useState(() => getRandomFact(turkeyPaths[0].name));

  const currentCity = turkeyPaths[currentIndex];
  const cityCenter = getCityCenter(currentCity.id);

  const mapWidth = isMobile ? winWidth * 0.92 : MAP_WIDTH;

  // Şehir değiştiğinde yeni rastgele bilgi seç (her il için birden fazla bilgi var)
  useEffect(() => {
    setCurrentFact(getRandomFact(currentCity.name));
  }, [currentIndex, currentCity.name]);

  useEffect(() => {
    if (isMobile) return;
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, [isMobile]);

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

  const headerBlock = (
    <View style={isMobile ? styles.headerMobile : styles.header}>
      <TouchableOpacity style={isMobile ? styles.backButtonMobile : styles.backButton} onPress={onBackToMenu}>
        <Home size={isMobile ? 20 : 24} color="#10B981" />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={isMobile ? styles.titleMobile : styles.title}>Türkiye Şehirleri</Text>
        <Text style={isMobile ? styles.subtitleMobile : styles.subtitle}>
          {currentIndex + 1} / {turkeyPaths.length}
        </Text>
      </View>
      <View style={styles.placeholder} />
    </View>
  );

  const mainContent = (
    <>
      <View style={[styles.cityCard, isMobile && styles.cityCardMobile]}>
        <Text style={[styles.cityName, isMobile && styles.cityNameMobile]}>{currentCity.name}</Text>
        <TouchableOpacity
          style={[styles.infoButton, isMobile && styles.infoButtonMobile]}
          onPress={() => setShowInfo(!showInfo)}
        >
          <Info size={isMobile ? 18 : 20} color="#10B981" />
          <Text style={[styles.infoButtonText, isMobile && styles.infoButtonTextMobile]}>
            {showInfo ? 'Bilgiyi Gizle' : 'İlginç Bilgi'}
          </Text>
        </TouchableOpacity>
        {showInfo && (
          <View style={styles.factBox}>
            <Text style={styles.factText}>{currentFact}</Text>
            <TouchableOpacity
              style={styles.anotherFactButton}
              onPress={() => {
                setCurrentFact('…');
                requestAnimationFrame(() => {
                  setCurrentFact(getRandomFact(currentCity.name));
                });
              }}
              delayPressIn={0}
              activeOpacity={0.6}
            >
              <Text style={styles.anotherFactButtonText}>Başka bilgi</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={[styles.mapContainer, isMobile && styles.mapContainerMobile]}>
        <Svg
          width={mapWidth}
          height={mapWidth * 0.52}
          viewBox="0 0 1007.478 527.323"
          style={styles.svg}
        >
          <G>
            {turkeyPaths.map((city) => (
              <Path
                key={city.id}
                d={city.d}
                fill={city.id === currentCity.id ? '#10B981' : '#475569'}
                stroke={city.id === currentCity.id ? '#059669' : '#64748B'}
                strokeWidth={city.id === currentCity.id ? '1.5' : '0.8'}
                opacity={city.id === currentCity.id ? 1 : 0.5}
              />
            ))}
            <Circle
              cx={cityCenter.x}
              cy={cityCenter.y}
              r="8"
              fill="#EF4444"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
            <SvgText
              x={cityCenter.x}
              y={cityCenter.y - 15}
              fontSize="12"
              fill="#F8FAFC"
              textAnchor="middle"
              fontWeight="700"
            >
              {currentCity.name}
            </SvgText>
          </G>
        </Svg>
      </View>

      <View style={[styles.navigation, isMobile && styles.navigationMobile]}>
        <TouchableOpacity
          style={[styles.navButton, isMobile && styles.navButtonMobile, currentIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} color={currentIndex === 0 ? '#9CA3AF' : '#FFFFFF'} />
          <Text style={[styles.navButtonText, currentIndex === 0 && styles.navButtonTextDisabled]}>
            Önceki
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, isMobile && styles.navButtonMobile, currentIndex === turkeyPaths.length - 1 && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={currentIndex === turkeyPaths.length - 1}
        >
          <Text style={[styles.navButtonText, currentIndex === turkeyPaths.length - 1 && styles.navButtonTextDisabled]}>
            Sonraki
          </Text>
          <ChevronRight size={24} color={currentIndex === turkeyPaths.length - 1 ? '#9CA3AF' : '#FFFFFF'} />
        </TouchableOpacity>
      </View>
    </>
  );

  if (isMobile) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.container}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <ScrollView
            style={styles.mobileScrollView}
            contentContainerStyle={styles.mobileScrollContent}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            {headerBlock}
            <View style={styles.contentMobile}>
              {mainContent}
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        {headerBlock}
        <View style={styles.content}>
          {mainContent}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 67,
    paddingBottom: 2,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  headerMobile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    padding: 8,
  },
  backButtonMobile: {
    padding: 6,
  },
  headerCenter: {
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  titleMobile: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  subtitleMobile: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 12,
    paddingBottom: 8,
  },
  contentMobile: {
    padding: 12,
    paddingBottom: 24,
  },
  mobileScrollView: {
    flex: 1,
  },
  mobileScrollContent: {
    paddingBottom: 24,
  },
  cityCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  cityCardMobile: {
    marginBottom: 12,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 8,
  },
  cityNameMobile: {
    fontSize: 20,
    marginBottom: 6,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
  },
  infoButtonMobile: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  infoButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6EE7B7',
  },
  infoButtonTextMobile: {
    fontSize: 13,
  },
  factBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  factText: {
    fontSize: 14,
    color: '#D1FAE5',
    lineHeight: 20,
  },
  anotherFactButton: {
    marginTop: 10,
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.25)',
    borderRadius: 8,
  },
  anotherFactButtonText: {
    fontSize: 13,
    color: '#6EE7B7',
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainerMobile: {
    flex: 0,
    marginBottom: 16,
    alignItems: 'center',
  },
  svg: {
    borderRadius: 12,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -50,
    marginBottom: 15,
    gap: 10,
  },
  navigationMobile: {
    marginTop: 12,
    marginBottom: 0,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
  },
  navButtonMobile: {
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  navButtonDisabled: {
    backgroundColor: '#475569',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  navButtonTextDisabled: {
    color: '#94A3B8',
  },
});

export default TurkeyLearningMode;
