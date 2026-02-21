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
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { Home, ChevronLeft, Check, X, RotateCcw, Settings } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';
import { massifs, getMassifColor } from '../constants/massifs';
import MassifsMapManualAdjust from './MassifsMapManualAdjust';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.92;

const MassifsMap = ({ onBackToMenu, onBackToMain }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [foundMassifs, setFoundMassifs] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [selectedMassif, setSelectedMassif] = useState(null);
  const [showAdjustMode, setShowAdjustMode] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

  const currentMassif = massifs[currentQuestionIndex];
  const isCompleted = foundMassifs.length === massifs.length;

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

  const handleMassifPress = (massif) => {
    if (isCompleted || feedback) return;
    
    if (massif.id === currentMassif.id) {
      setFeedback('correct');
      setSelectedMassif(massif.id);
      playCorrectSound();
      
      setTimeout(() => {
        setFoundMassifs([...foundMassifs, massif.id]);
        setFeedback(null);
        setSelectedMassif(null);
        
        if (currentQuestionIndex < massifs.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
      }, 1000);
    } else {
      setFeedback('wrong');
      setSelectedMassif(massif.id);
      playWrongSound();
      
      setTimeout(() => {
        setFeedback(null);
        setSelectedMassif(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setFoundMassifs([]);
    setFeedback(null);
    setSelectedMassif(null);
    resetZoom();
  };

  const resetZoom = () => {
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(translateX, { toValue: 0, duration: 300, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
    lastScale.current = 1;
    lastTranslateX.current = 0;
    lastTranslateY.current = 0;
  };

  if (showAdjustMode) {
    return <MassifsMapManualAdjust onBackToMenu={() => setShowAdjustMode(false)} />;
  }

  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }} style={styles.container} blurRadius={3}>
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
            <Text style={styles.title}>Masif Araziler Quiz</Text>
            {!isCompleted ? (
              <Text style={styles.progressText}>
                {foundMassifs.length} / {massifs.length} masif bulundu
              </Text>
            ) : (
              <Text style={styles.completedText}>🎉 Tüm masifleri buldunuz!</Text>
            )}
          </View>
          <View style={styles.headerSpacer} />
          <TouchableOpacity 
            style={styles.settingsButton} 
            onPress={() => setShowAdjustMode(true)}
          >
            <Settings size={20} color="#78716C" />
          </TouchableOpacity>
          {feedback && (
            <View style={[styles.feedbackIcon, feedback === 'correct' ? styles.correctIcon : styles.wrongIcon]}>
              {feedback === 'correct' ? <Check size={24} color="#FFFFFF" strokeWidth={3} /> : <X size={24} color="#FFFFFF" strokeWidth={3} />}
            </View>
          )}
        </View>
        {!isCompleted && currentMassif && (
          <View style={[styles.questionOverlay, { width: Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) }]} pointerEvents="box-none">
            <View style={styles.questionBadge}>
              <Text style={styles.questionText}>{currentMassif.name} nerede?</Text>
            </View>
          </View>
        )}
      </View>

      <View style={styles.mapContainer}>
        <Animated.View style={[styles.mapWrapper, { transform: [{ scale }, { translateX }, { translateY }] }]} {...panResponder.panHandlers}>
          <Svg width={MAP_WIDTH} height={MAP_WIDTH * 0.52} viewBox="0 0 1007.478 527.323" style={styles.svg}>
            <G>
              {turkeyPaths.map((city) => (
                <Path key={city.id} d={city.d} fill="#F3F4F6" stroke="#E5E7EB" strokeWidth="0.3" opacity={1} />
              ))}
            </G>
            <G>
              {massifs.map((massif, index) => {
                const isFound = foundMassifs.includes(massif.id);
                const isSelected = selectedMassif === massif.id;
                
                let fillColor = getMassifColor(index);
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
                  <G key={massif.id} onPress={() => handleMassifPress(massif)} onPressIn={() => handleMassifPress(massif)}>
                    <Circle cx={massif.x} cy={massif.y} r={massif.radius} fill={fillColor} stroke={strokeColor} strokeWidth="2" opacity={0.7} />
                    <SvgText x={massif.x} y={massif.y + 5} fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="600">{massif.icon}</SvgText>
                    {isFound && (
                      <SvgText x={massif.x} y={massif.y + massif.radius + 15} fontSize="9" fill="#374151" textAnchor="middle" fontWeight="600">{massif.name}</SvgText>
                    )}
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>
        <TouchableOpacity style={styles.zoomResetButton} onPress={resetZoom}>
          <RotateCcw size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {isCompleted && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Yeniden Başla</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { paddingTop: 48, paddingBottom: 2, paddingHorizontal: 12, backgroundColor: 'rgba(15, 23, 42, 0.92)', borderBottomWidth: 1, borderBottomColor: 'rgba(148, 163, 184, 0.2)', position: 'relative' },
  backButtonsColumn: { flexDirection: 'column', marginRight: 12 },
  headerContent: { flexDirection: 'row', alignItems: 'center' },
  backButton: {
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
  settingsButton: { padding: 6, marginLeft: 8 },
  headerLeft: { justifyContent: 'center' },
  headerSpacer: { flex: 1 },
  questionOverlay: { position: 'absolute', left: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 14, fontWeight: 'bold', color: '#F8FAFC', marginBottom: 4 },
  questionBadge: { backgroundColor: '#FCD34D', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, alignSelf: 'center', marginBottom: 3 },
  questionText: { fontSize: 11, fontWeight: '600', color: '#92400E' },
  progressText: { fontSize: 10, color: '#94A3B8' },
  completedText: { fontSize: 12, fontWeight: '600', color: '#10B981' },
  feedbackIcon: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginLeft: 6 },
  correctIcon: { backgroundColor: '#10B981' },
  wrongIcon: { backgroundColor: '#000000' },
  mapContainer: { flex: 1, overflow: 'hidden' },
  mapWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 4 },
  svg: { backgroundColor: 'transparent' },
  footer: { backgroundColor: 'rgba(15, 23, 42, 0.92)', paddingVertical: 8, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: 'rgba(148, 163, 184, 0.2)', alignItems: 'center' },
  resetButton: { backgroundColor: '#78716C', paddingVertical: 8, paddingHorizontal: 20, borderRadius: 8, alignItems: 'center' },
  resetButtonText: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  zoomResetButton: { position: 'absolute', bottom: 16, right: 16, width: 44, height: 44, borderRadius: 22, backgroundColor: '#78716C', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 4, elevation: 5 },
});

export default MassifsMap;
