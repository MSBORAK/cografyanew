import { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppState } from 'react-native';
import { setupDailyReminder, rescheduleAndroidReminder } from './utils/notificationSetup';
import { StyleSheet, View, BackHandler } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import MainMenu from './components/MainMenu';
import DailyQuiz from './components/DailyQuiz';
import BadgeUnlockModal from './components/BadgeUnlockModal';
import TurkeyMenu from './components/TurkeyMenu';
import MountainTypesMenu from './components/MountainTypesMenu';
import PlainTypesMenu from './components/PlainTypesMenu';
import LakeMainMenu from './components/LakeMainMenu';
import LakeTypesMenu from './components/LakeTypesMenu';
import ArtificialLakeTypesMenu from './components/ArtificialLakeTypesMenu';
import WorldMenu from './components/WorldMenu';
import WorldMap from './components/WorldMap';
import ContinentsMap from './components/ContinentsMap';
import EuropeMap from './components/EuropeMap';
import AsiaMap from './components/AsiaMap';
import AfricaMap from './components/AfricaMap';
import AmericaMap from './components/AmericaMap';
import OceaniaMap from './components/OceaniaMap';
import AntarcticaMap from './components/AntarcticaMap';
import FlagsQuiz from './components/FlagsQuiz';
import HomeScreen from './components/HomeScreen';
import TurkeyMap from './components/TurkeyMap';
import RegionsMap from './components/RegionsMap';
import MountainsMap from './components/MountainsMap';
import PlainsMap from './components/PlainsMap';
import LakesMap from './components/LakesMap';
import UnescoMap from './components/UnescoMap';
import CoastsMap from './components/CoastsMap';
import MassifsMap from './components/MassifsMap';
import PlateausMap from './components/PlateausMap';
import NeighborsMap from './components/NeighborsMap';
import BorderGatesMap from './components/BorderGatesMap';
import FaultLinesScreen from './components/FaultLinesScreen';
import WorldFlagsQuiz from './components/WorldFlagsQuiz';
import CapitalsQuiz from './components/CapitalsQuiz';
import ExamCountdown from './components/ExamCountdown';
import QuizMenu from './components/QuizMenu';
import MixedQuiz from './components/MixedQuiz';
import TurkeyQuiz from './components/TurkeyQuiz';
import WorldQuiz from './components/WorldQuiz';
import PracticeModeMenu from './components/PracticeModeMenu';
import LearningModeMenu from './components/LearningModeMenu';
import { getWrongAnswers } from './utils/practiceMode';
import GeographyKeywords from './components/GeographyKeywords';
import DidYouKnowTrivia from './components/DidYouKnowTrivia';
import MountainsMapManualAdjust from './components/MountainsMapManualAdjust';
import LakesMapManualAdjust from './components/LakesMapManualAdjust';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('main'); // 'main', 'turkey-menu', 'mountain-types-menu', 'plain-types-menu', 'lake-main-menu', 'lake-types-menu', 'artificial-lake-types-menu', 'world-menu', 'world-map', 'continents', 'europe', 'asia', 'africa', 'america', 'oceania', 'flags', 'turkey-regions', 'turkey-map', 'regions-only', 'mountains', 'plains', 'lakes', 'unesco', 'coasts', 'massifs', 'plateaus', 'world-flags-quiz', 'quiz-menu', 'turkey-quiz', 'world-quiz', 'practice-mode', 'learning-mode', 'mountains-adjust', 'lakes-adjust'
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedMountainType, setSelectedMountainType] = useState(null);
  const [selectedPlainType, setSelectedPlainType] = useState(null);
  const [selectedLakeType, setSelectedLakeType] = useState(null);
  const [isLearningMode, setIsLearningMode] = useState(false);
  const [practiceIds, setPracticeIds] = useState(null);
  const [fromPracticeMode, setFromPracticeMode] = useState(false);
  const [newlyUnlockedBadgeIds, setNewlyUnlockedBadgeIds] = useState([]);

  const handleBadgesUnlocked = useCallback((badgeIds) => {
    if (badgeIds && badgeIds.length > 0) setNewlyUnlockedBadgeIds(badgeIds);
  }, []);

  // Android geri tuşu için BackHandler
  useEffect(() => {
    const backAction = () => {
      if (currentScreen === 'main') {
        // Ana menüdeyse uygulamadan çık
        return false;
      }
      
      // Diğer ekranlarda geri git
      handleBackPress();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [currentScreen, selectedRegion]);

  const handleBackPress = () => {
    // Her ekran için geri gitme mantığı
    if (currentScreen === 'turkey-menu') {
      if (isLearningMode) handleBackToLearningMode();
      else handleBackToMain();
    } else if (currentScreen === 'world-menu') {
      handleBackToMain();
    } else if (currentScreen === 'mountain-types-menu') {
      handleBackToTurkeyMenu();
    } else if (currentScreen === 'plains') {
      handleBackToTurkeyMenu();
    } else if (currentScreen === 'lake-main-menu') {
      handleBackToTurkeyMenu();
    } else if (currentScreen === 'lake-types-menu') {
      handleBackToLakeMainMenu();
    } else if (currentScreen === 'artificial-lake-types-menu') {
      handleBackToLakeMainMenu();
    } else if (currentScreen === 'turkey-regions') {
      handleBackToTurkeyMenu();
    } else if (currentScreen === 'turkey-map') {
      if (fromPracticeMode) {
        setFromPracticeMode(false);
        setPracticeIds(null);
        setCurrentScreen('practice-mode');
      } else if (isLearningMode) {
        handleBackToLearningMode();
      } else if (selectedRegion === 'all') {
        handleBackToTurkeyMenu();
      } else {
        handleBackToRegions();
      }
    } else if ((currentScreen === 'world-flags-quiz' || currentScreen === 'mountains' || currentScreen === 'lakes') && fromPracticeMode) {
      setFromPracticeMode(false);
      setPracticeIds(null);
      setCurrentScreen('practice-mode');
    } else if (currentScreen === 'daily-quiz') {
      handleBackToMain();
    } else if (currentScreen === 'regions-only' || currentScreen === 'unesco' ||
               currentScreen === 'coasts' || currentScreen === 'massifs' ||
               currentScreen === 'plateaus' || currentScreen === 'neighbors' ||
               currentScreen === 'border-gates' || currentScreen === 'fault-lines' ||
               currentScreen === 'world-flags-quiz' || currentScreen === 'capitals-quiz' ||
               currentScreen === 'exam-countdown' ||
               currentScreen === 'geography-keywords' ||
               currentScreen === 'did-you-know' ||
               currentScreen === 'quiz-menu' || currentScreen === 'practice-mode' ||
               currentScreen === 'learning-mode') {
      handleBackToMain();
    } else if (currentScreen === 'turkey-quiz' || currentScreen === 'world-quiz' || currentScreen === 'mixed-quiz') {
      handleBackToQuizMenu();
    } else if (currentScreen === 'mountains') {
      handleBackToMountainTypesMenu();
    } else if (currentScreen === 'mountains-adjust') {
      handleBackToMountainTypesMenu();
    } else if (currentScreen === 'plains') {
      handleBackToTurkeyMenu();
    } else if (currentScreen === 'lakes-adjust') {
      setCurrentScreen('lakes');
    } else if (currentScreen === 'lakes') {
      handleBackToLakeTypesMenu();
    } else if ((currentScreen === 'world-flags-quiz' || currentScreen === 'geography-keywords') && isLearningMode) {
      handleBackToLearningMode();
    } else if (currentScreen === 'world-map' || currentScreen === 'continents' ||
               currentScreen === 'europe' || currentScreen === 'asia' ||
               currentScreen === 'africa' || currentScreen === 'america' ||
               currentScreen === 'oceania' || currentScreen === 'antarctica' || currentScreen === 'flags') {
      if (fromPracticeMode && currentScreen === 'world-map') {
        setFromPracticeMode(false);
        setPracticeIds(null);
        setCurrentScreen('practice-mode');
      } else if (isLearningMode && currentScreen === 'world-map') {
        handleBackToLearningMode();
      } else {
        handleBackToWorldMenu();
      }
    }
  };

  // Uygulama açılışında ve her ekran değişiminde yatay mod (iOS için kritik)
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, []);

  useEffect(() => {
    setupDailyReminder().then(() => {
      rescheduleAndroidReminder();
    });
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') rescheduleAndroidReminder();
    });
    return () => sub.remove();
  }, []);
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  }, [currentScreen]);

  const handleSelectTurkey = () => {
    setCurrentScreen('turkey-menu');
  };

  const handleSelectCities = () => {
    // Tüm şehirler
    setSelectedRegion('all');
    setCurrentScreen('turkey-map');
  };

  const handleSelectRegions = () => {
    // Bölge seçim sayfası
    setCurrentScreen('turkey-regions');
  };

  const handleSelectRegionsOnly = () => {
    // Sadece bölgeler haritası
    setCurrentScreen('regions-only');
  };

  const handleSelectMountains = () => {
    // Dağ tipleri menüsüne git
    setCurrentScreen('mountain-types-menu');
  };

  const handleSelectMountainType = (type) => {
    // Seçilen dağ tipine göre haritayı göster
    setSelectedMountainType(type);
    setCurrentScreen('mountains');
  };

  const handleSelectMountainAdjust = () => {
    // Dağ konumlarını ayarlama ekranına git
    setCurrentScreen('mountains-adjust');
  };

  const handleBackToMountainTypesMenu = () => {
    setCurrentScreen('mountain-types-menu');
    setSelectedMountainType(null);
  };

  const handleSelectPlains = () => {
    // Tüm ovaları göster
    setCurrentScreen('plains');
  };

  const handleSelectPlainType = (type) => {
    // Seçilen ova tipine göre haritayı göster
    setSelectedPlainType(type);
    setCurrentScreen('plains');
  };

  const handleBackToPlainTypesMenu = () => {
    setCurrentScreen('plain-types-menu');
    setSelectedPlainType(null);
  };

  const handleSelectLakes = () => {
    // Göl ana menüsüne git (Doğal/Yapay seçimi)
    setCurrentScreen('lake-main-menu');
  };

  const handleSelectNaturalLakes = () => {
    // Doğal göl tipleri menüsüne git
    setCurrentScreen('lake-types-menu');
  };

  const handleSelectArtificialLakes = () => {
    // Yapay göl tipleri menüsüne git
    setCurrentScreen('artificial-lake-types-menu');
  };

  const handleSelectArtificialLakeType = (type) => {
    // Seçilen yapay göl tipine göre haritayı göster
    setSelectedLakeType(type);
    setCurrentScreen('lakes');
  };

  const handleSelectLakeType = (type) => {
    // Seçilen göl tipine göre haritayı göster
    setSelectedLakeType(type);
    setCurrentScreen('lakes');
  };

  const handleBackToLakeMainMenu = () => {
    setCurrentScreen('lake-main-menu');
    setSelectedLakeType(null);
  };

  const handleBackToLakeTypesMenu = () => {
    // Yapay gölse yapay menüye, doğal gölse doğal menüye dön
    if (selectedLakeType === 'artificial') {
      setCurrentScreen('artificial-lake-types-menu');
    } else {
      setCurrentScreen('lake-types-menu');
    }
    setSelectedLakeType(null);
  };

  const handleSelectUnesco = () => {
    // UNESCO Mirası haritası
    setCurrentScreen('unesco');
  };

  const handleSelectMassifs = () => {
    // Masif Araziler haritası
    setCurrentScreen('massifs');
  };

  const handleSelectCoasts = () => {
    // Kıyı Tipleri haritası
    setCurrentScreen('coasts');
  };

  const handleSelectPlateaus = () => {
    // Platolar haritası
    setCurrentScreen('plateaus');
  };

  const handleSelectNeighbors = () => {
    // Komşu ülkeler haritası
    setCurrentScreen('neighbors');
  };

  const handleSelectBorderGates = () => {
    // Sınır kapıları haritası
    setCurrentScreen('border-gates');
  };

  const handleSelectFaultLines = () => {
    setCurrentScreen('fault-lines');
  };

  const handleSelectWorldFlags = () => {
    // Dünya Bayrak Quiz
    setCurrentScreen('world-flags-quiz');
  };

  const handleSelectCapitalsQuiz = () => {
    // Başkentler Quiz
    setCurrentScreen('capitals-quiz');
  };

  const handleSelectExamCountdown = () => {
    // Sınav Sayaç
    setCurrentScreen('exam-countdown');
  };

  const handleSelectQuizMode = () => {
    // Quiz Menü
    setCurrentScreen('quiz-menu');
  };

  const handleSelectTurkeyQuiz = () => {
    // Türkiye Quiz
    setCurrentScreen('turkey-quiz');
  };

  const handleSelectPracticeMode = () => {
    setCurrentScreen('practice-mode');
  };

  const handleBackToPracticeMode = () => {
    setFromPracticeMode(false);
    setPracticeIds(null);
    setCurrentScreen('practice-mode');
  };

  const handleSelectPracticeCategory = async (category) => {
    const items = await getWrongAnswers(category);
    if (!items || items.length === 0) return;
    const ids = items.map((i) => i.id);
    setPracticeIds(ids);
    setFromPracticeMode(true);
    switch (category) {
      case 'turkey_cities':
        setSelectedRegion('all');
        setCurrentScreen('turkey-map');
        break;
      case 'world_countries':
        setCurrentScreen('world-map');
        break;
      case 'turkey_mountains':
        setCurrentScreen('mountains');
        break;
      case 'turkey_lakes':
        setCurrentScreen('lakes');
        break;
      case 'world_flags':
        setCurrentScreen('world-flags-quiz');
        break;
      default:
        setFromPracticeMode(false);
        setPracticeIds(null);
    }
  };

  const handleSelectLearningMode = () => {
    // Öğrenme Modu
    setCurrentScreen('learning-mode');
  };

  const handleSelectGeographyKeywords = () => {
    setCurrentScreen('geography-keywords');
  };

  const handleSelectDidYouKnow = () => {
    setCurrentScreen('did-you-know');
  };

  const handleSelectWorldQuiz = () => {
    setCurrentScreen('world-quiz');
  };

  const handleSelectMixedQuiz = () => {
    setCurrentScreen('mixed-quiz');
  };

  const handleBackToQuizMenu = () => {
    setCurrentScreen('quiz-menu');
  };

  const handleSelectWorld = () => {
    setCurrentScreen('world-menu');
  };

  const handleSelectWorldMap = () => {
    setCurrentScreen('world-map');
  };

  const handleSelectContinents = () => {
    setCurrentScreen('continents');
  };
  const handleSelectAntarctica = () => {
    setCurrentScreen('antarctica');
  };

  const handleSelectEurope = () => {
    setCurrentScreen('europe');
  };

  const handleSelectAsia = () => {
    setCurrentScreen('asia');
  };

  const handleSelectAfrica = () => {
    setCurrentScreen('africa');
  };

  const handleSelectAmerica = () => {
    setCurrentScreen('america');
  };

  const handleSelectOceania = () => {
    setCurrentScreen('oceania');
  };

  const handleSelectFlags = () => {
    setCurrentScreen('flags');
  };

  const handleStartGame = (regionId) => {
    setSelectedRegion(regionId);
    setCurrentScreen('turkey-map');
  };

  const handleBackToTurkeyMenu = () => {
    setCurrentScreen('turkey-menu');
    setSelectedRegion(null);
  };

  const handleBackToRegions = () => {
    setCurrentScreen('turkey-regions');
    setSelectedRegion(null);
  };

  const handleBackToMain = () => {
    setCurrentScreen('main');
    setSelectedRegion(null);
    setIsLearningMode(false); // Öğrenme modunu sıfırla
  };

  const handleBackToWorldMenu = () => {
    setCurrentScreen('world-menu');
  };

  const handleBackToLearningMode = () => {
    setCurrentScreen('learning-mode');
  };

  const handleSelectDailyQuiz = () => {
    setCurrentScreen('daily-quiz');
  };

  // Ana Menü
  if (currentScreen === 'main') {
    return (
      <View style={styles.container}>
        <MainMenu 
          onSelectTurkey={handleSelectTurkey}
          onSelectWorld={handleSelectWorld}
          onSelectWorldFlags={handleSelectWorldFlags}
          onSelectCapitalsQuiz={handleSelectCapitalsQuiz}
          onSelectQuizMode={handleSelectQuizMode}
          onSelectPracticeMode={handleSelectPracticeMode}
          onSelectLearningMode={handleSelectLearningMode}
          onSelectGeographyKeywords={handleSelectGeographyKeywords}
          onSelectDidYouKnow={handleSelectDidYouKnow}
          onSelectExamCountdown={handleSelectExamCountdown}
          onSelectDailyQuiz={handleSelectDailyQuiz}
          onBadgesUnlocked={handleBadgesUnlocked}
        />
        <BadgeUnlockModal badgeIds={newlyUnlockedBadgeIds} onClose={() => setNewlyUnlockedBadgeIds([])} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Günlük Quiz
  if (currentScreen === 'daily-quiz') {
    return (
      <View style={styles.container}>
        <DailyQuiz
          onBackToMenu={handleBackToMain}
          onBackToMain={handleBackToMain}
          onBadgesUnlocked={handleBadgesUnlocked}
        />
        <BadgeUnlockModal badgeIds={newlyUnlockedBadgeIds} onClose={() => setNewlyUnlockedBadgeIds([])} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Türkiye Menü (Şehirler / Bölgeler)
  if (currentScreen === 'turkey-menu') {
    return (
      <View style={styles.container}>
        <TurkeyMenu 
          onSelectCities={handleSelectCities}
          onSelectRegions={handleSelectRegions}
          onSelectRegionsOnly={handleSelectRegionsOnly}
          onSelectMountains={handleSelectMountains}
          onSelectPlains={handleSelectPlains}
          onSelectLakes={handleSelectLakes}
          onSelectUnesco={handleSelectUnesco}
          onSelectMassifs={handleSelectMassifs}
          onSelectCoasts={handleSelectCoasts}
          onSelectPlateaus={handleSelectPlateaus}
          onSelectNeighbors={handleSelectNeighbors}
          onSelectBorderGates={handleSelectBorderGates}
          onSelectFaultLines={handleSelectFaultLines}
          onBackToMain={isLearningMode ? handleBackToLearningMode : handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dağ Tipleri Menüsü
  if (currentScreen === 'mountain-types-menu') {
    return (
      <View style={styles.container}>
        <MountainTypesMenu
          onSelectType={handleSelectMountainType}
          onBackToTurkeyMenu={handleBackToTurkeyMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dağ Konumlarını Ayarlama
  if (currentScreen === 'mountains-adjust') {
    return (
      <View style={styles.container}>
        <MountainsMapManualAdjust 
          onBackToMenu={handleBackToMountainTypesMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Ova Tipleri Menüsü
  if (currentScreen === 'plain-types-menu') {
    return (
      <View style={styles.container}>
        <PlainTypesMenu 
          onSelectType={handleSelectPlainType}
          onBackToTurkeyMenu={handleBackToTurkeyMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Göl Konumlarını Ayarlama
  if (currentScreen === 'lakes-adjust') {
    return (
      <View style={styles.container}>
        <LakesMapManualAdjust 
          onBackToMenu={() => setCurrentScreen('lakes')}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Göl Tipleri Menüsü
  if (currentScreen === 'lake-types-menu') {
    return (
      <View style={styles.container}>
        <LakeTypesMenu 
          onSelectType={handleSelectLakeType}
          onBackToLakeMainMenu={handleBackToLakeMainMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Yapay Göl Tipleri Menüsü
  if (currentScreen === 'artificial-lake-types-menu') {
    return (
      <View style={styles.container}>
        <ArtificialLakeTypesMenu 
          onSelectType={handleSelectArtificialLakeType}
          onBackToLakeMainMenu={handleBackToLakeMainMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Göl Ana Menüsü (Doğal/Yapay)
  if (currentScreen === 'lake-main-menu') {
    return (
      <View style={styles.container}>
        <LakeMainMenu 
          onSelectNatural={handleSelectNaturalLakes}
          onSelectArtificial={handleSelectArtificialLakes}
          onBackToTurkeyMenu={handleBackToTurkeyMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Türkiye Bölgeler Sayfası
  if (currentScreen === 'turkey-regions') {
    return (
      <View style={styles.container}>
        <HomeScreen 
          onStartGame={handleStartGame}
          onBackToMain={handleBackToTurkeyMenu}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Türkiye Haritası
  if (currentScreen === 'turkey-map') {
    return (
      <View style={styles.container}>
        <TurkeyMap
          onBackToHome={fromPracticeMode ? handleBackToPracticeMode : (isLearningMode ? handleBackToLearningMode : (selectedRegion === 'all' ? handleBackToTurkeyMenu : handleBackToRegions))}
          onBackToMain={handleBackToMain}
          selectedRegion={selectedRegion}
          learningMode={isLearningMode}
          practiceCityIds={fromPracticeMode ? practiceIds : null}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Sadece Bölgeler Haritası
  if (currentScreen === 'regions-only') {
    return (
      <View style={styles.container}>
        <RegionsMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dağlar Haritası
  if (currentScreen === 'mountains') {
    return (
      <View style={styles.container}>
        <MountainsMap
          onBackToMenu={handleBackToMountainTypesMenu}
          onBackToMain={handleBackToMain}
          mountainType={selectedMountainType}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Ovalar Haritası
  if (currentScreen === 'plains') {
    return (
      <View style={styles.container}>
        <PlainsMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
          plainType="all"
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Göller Haritası
  if (currentScreen === 'lakes') {
    return (
      <View style={styles.container}>
        <LakesMap
          onBackToMenu={handleBackToLakeTypesMenu}
          onBackToMain={handleBackToMain}
          onAdjustPositions={() => setCurrentScreen('lakes-adjust')}
          lakeType={selectedLakeType}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // UNESCO Mirası Haritası
  if (currentScreen === 'unesco') {
    return (
      <View style={styles.container}>
        <UnescoMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Kıyı Tipleri Haritası
  if (currentScreen === 'coasts') {
    return (
      <View style={styles.container}>
        <CoastsMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Masif Araziler Haritası
  if (currentScreen === 'massifs') {
    return (
      <View style={styles.container}>
        <MassifsMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Platolar Haritası
  if (currentScreen === 'plateaus') {
    return (
      <View style={styles.container}>
        <PlateausMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Komşu Ülkeler Haritası
  if (currentScreen === 'neighbors') {
    return (
      <View style={styles.container}>
        <NeighborsMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Sınır Kapıları Haritası
  if (currentScreen === 'border-gates') {
    return (
      <View style={styles.container}>
        <BorderGatesMap
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Fay Hatları
  if (currentScreen === 'fault-lines') {
    return (
      <View style={styles.container}>
        <FaultLinesScreen
          onBackToMenu={handleBackToTurkeyMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dünya Bayrak Quiz
  if (currentScreen === 'world-flags-quiz') {
    return (
      <View style={styles.container}>
        <WorldFlagsQuiz
          onBackToMenu={isLearningMode ? handleBackToLearningMode : handleBackToMain}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Başkentler Quiz
  if (currentScreen === 'capitals-quiz') {
    return (
      <View style={styles.container}>
        <CapitalsQuiz
          onBackToMenu={handleBackToMain}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Sınav Sayaç
  if (currentScreen === 'exam-countdown') {
    return (
      <View style={styles.container}>
        <ExamCountdown
          onBackToMenu={handleBackToMain}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Quiz Menü
  if (currentScreen === 'quiz-menu') {
    return (
      <View style={styles.container}>
        <QuizMenu 
          onSelectTurkeyQuiz={handleSelectTurkeyQuiz}
          onSelectWorldQuiz={handleSelectWorldQuiz}
          onSelectMixedQuiz={handleSelectMixedQuiz}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Türkiye Quiz
  if (currentScreen === 'turkey-quiz') {
    return (
      <View style={styles.container}>
        <TurkeyQuiz
          onBackToMenu={handleBackToQuizMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dünya Quiz
  if (currentScreen === 'world-quiz') {
    return (
      <View style={styles.container}>
        <WorldQuiz
          onBackToMenu={handleBackToQuizMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  if (currentScreen === 'mixed-quiz') {
    return (
      <View style={styles.container}>
        <MixedQuiz
          onBackToMenu={handleBackToQuizMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Pratik Modu
  if (currentScreen === 'practice-mode') {
    return (
      <View style={styles.container}>
        <PracticeModeMenu
          onBackToMenu={handleBackToMain}
          onBackToMain={handleBackToMain}
          onSelectCategory={handleSelectPracticeCategory}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Nerede Olduğunu Biliyor muydunuz?
  if (currentScreen === 'did-you-know') {
    return (
      <View style={styles.container}>
        <DidYouKnowTrivia onBackToMenu={handleBackToMain} onBackToMain={handleBackToMain} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Coğrafya Anahtar Kelimeler
  if (currentScreen === 'geography-keywords') {
    return (
      <View style={styles.container}>
        <GeographyKeywords onBackToMenu={isLearningMode ? handleBackToLearningMode : handleBackToMain} onBackToMain={handleBackToMain} />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Öğrenme Modu
  if (currentScreen === 'learning-mode') {
    return (
      <View style={styles.container}>
        <LearningModeMenu
          onBackToMenu={handleBackToMain}
          onBackToMain={handleBackToMain}
          onSelectCategory={(category) => {
            console.log('Öğrenme kategori seçildi:', category);
            
            // Öğrenme modunu aktif et
            setIsLearningMode(true);
            
            // Kategoriye göre ilgili haritayı aç
            if (category === 'turkey_cities') {
              setSelectedRegion('all');
              setCurrentScreen('turkey-map');
            } else if (category === 'turkey_geography') {
              setCurrentScreen('turkey-menu');
            } else if (category === 'world_countries') {
              setCurrentScreen('world-map');
            } else if (category === 'world_flags') {
              setCurrentScreen('world-flags-quiz');
            } else if (category === 'geography_keywords') {
              setCurrentScreen('geography-keywords');
            }
          }}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dünya Menü
  if (currentScreen === 'world-menu') {
    return (
      <View style={styles.container}>
        <WorldMenu 
          onBackToMain={handleBackToMain}
          onSelectWorldMap={handleSelectWorldMap}
          onSelectContinents={handleSelectContinents}
          onSelectEurope={handleSelectEurope}
          onSelectAsia={handleSelectAsia}
          onSelectAfrica={handleSelectAfrica}
          onSelectAmerica={handleSelectAmerica}
          onSelectOceania={handleSelectOceania}
          onSelectAntarctica={handleSelectAntarctica}
          onSelectFlags={handleSelectFlags}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Dünya Haritası
  if (currentScreen === 'world-map') {
    return (
      <View style={styles.container}>
        <WorldMap
          onBackToMenu={isLearningMode ? handleBackToLearningMode : handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Kıtalar Haritası
  if (currentScreen === 'continents') {
    return (
      <View style={styles.container}>
        <ContinentsMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Avrupa Haritası
  if (currentScreen === 'europe') {
    return (
      <View style={styles.container}>
        <EuropeMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Asya Haritası
  if (currentScreen === 'asia') {
    return (
      <View style={styles.container}>
        <AsiaMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Afrika Haritası
  if (currentScreen === 'africa') {
    return (
      <View style={styles.container}>
        <AfricaMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Amerika Haritası
  if (currentScreen === 'america') {
    return (
      <View style={styles.container}>
        <AmericaMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Okyanusya Haritası
  if (currentScreen === 'oceania') {
    return (
      <View style={styles.container}>
        <OceaniaMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Antarktika Haritası
  if (currentScreen === 'antarctica') {
    return (
      <View style={styles.container}>
        <AntarcticaMap
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  // Bayrak Quiz
  if (currentScreen === 'flags') {
    return (
      <View style={styles.container}>
        <FlagsQuiz
          onBackToMenu={handleBackToWorldMenu}
          onBackToMain={handleBackToMain}
        />
        <StatusBar style="auto" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
