import { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Alert,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import Svg, { G, Path, Circle, Text as SvgText } from 'react-native-svg';
import { Home, Save, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { massifs } from '../constants/massifs';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.75;

const MassifsMapManualAdjust = ({ onBackToMenu }) => {
  const [massifsData, setMassifsData] = useState([...massifs]);
  const [selectedId, setSelectedId] = useState(null);
  const [savedMassifs, setSavedMassifs] = useState([]);
  
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

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
    return () => {
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  const moveMassif = (id, dx, dy) => {
    setMassifsData(prev => prev.map(m => 
      m.id === id ? { ...m, x: m.x + dx, y: m.y + dy } : m
    ));
  };

  const handleZoomIn = () => {
    const newScale = Math.min(scale._value + 0.5, 4);
    Animated.spring(scale, {
      toValue: newScale,
      useNativeDriver: true,
    }).start();
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale._value - 0.5, 1);
    Animated.spring(scale, {
      toValue: newScale,
      useNativeDriver: true,
    }).start();
    
    if (newScale === 1) {
      Animated.parallel([
        Animated.spring(translateX, { toValue: 0, useNativeDriver: true }),
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }),
      ]).start();
      lastTranslateX.current = 0;
      lastTranslateY.current = 0;
    }
  };

  const handleSaveCurrent = () => {
    if (!selectedId) {
      Alert.alert('Uyarı', 'Lütfen önce bir masif seçin!');
      return;
    }
    
    const massif = massifsData.find(m => m.id === selectedId);
    if (!massif) return;
    
    if (!savedMassifs.includes(selectedId)) {
      setSavedMassifs([...savedMassifs, selectedId]);
    }
    
    Alert.alert(
      'Kaydedildi',
      `${massif.name} koordinatları kaydedildi!\n(${massif.x}, ${massif.y})`,
      [{ text: 'Tamam' }]
    );
  };

  const handleSaveAll = () => {
    const output = `export const massifs = [\n${massifsData.map(m => 
      `  { id: ${m.id}, name: '${m.name}', x: ${m.x}, y: ${m.y}, radius: ${m.radius}, icon: '${m.icon}' },`
    ).join('\n')}\n];`;
    
    console.log('=== MASİFLER KOPYALA ===');
    console.log(output);
    
    Alert.alert(
      'Tüm Masifler Kaydedildi',
      'Konsola yazdırıldı. constants/massifs.js dosyasına kopyalayın.',
      [{ text: 'Tamam' }]
    );
  };

  const selectedMassif = massifsData.find(m => m.id === selectedId);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={20} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.title}>Masif Konumları Ayarla</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
            <ZoomOut size={18} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
            <ZoomIn size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.mapContainer} {...panResponder.panHandlers}>
          <Animated.View
            style={[
              styles.mapWrapper,
              {
                transform: [
                  { scale },
                  { translateX },
                  { translateY },
                ],
              },
            ]}
          >
            <Svg
              width={MAP_WIDTH}
              height={MAP_WIDTH * 0.52}
              viewBox="0 0 1007.478 527.323"
              style={styles.svg}
            >
              <G>
                {turkeyPaths.map((city) => (
                  <Path
                    key={city.id}
                    d={city.d}
                    fill="#E5E7EB"
                    stroke="#9CA3AF"
                    strokeWidth="0.8"
                    opacity={0.6}
                  />
                ))}
              </G>
              
              <G>
                {massifsData.map((massif) => {
                  const isSelected = massif.id === selectedId;
                  const isSaved = savedMassifs.includes(massif.id);
                  
                  return (
                    <G key={massif.id} onPress={() => setSelectedId(massif.id)}>
                      <Circle
                        cx={massif.x}
                        cy={massif.y}
                        r={massif.radius}
                        fill={isSelected ? '#F59E0B' : isSaved ? '#10B981' : '#78716C'}
                        stroke={isSelected ? '#D97706' : '#57534E'}
                        strokeWidth="2"
                        opacity={0.8}
                      />
                      <SvgText
                        x={massif.x}
                        y={massif.y + 5}
                        fontSize="14"
                        fill="#FFFFFF"
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {massif.icon}
                      </SvgText>
                      <SvgText
                        x={massif.x}
                        y={massif.y + massif.radius + 12}
                        fontSize="8"
                        fill={isSelected ? '#F59E0B' : '#374151'}
                        textAnchor="middle"
                        fontWeight="600"
                      >
                        {massif.name}
                      </SvgText>
                    </G>
                  );
                })}
              </G>
            </Svg>
          </Animated.View>
        </View>

        <View style={styles.controls}>
          <ScrollView style={styles.massifList}>
            {massifsData.map((massif) => (
              <TouchableOpacity
                key={massif.id}
                style={[
                  styles.massifItem,
                  selectedId === massif.id && styles.massifItemSelected,
                  savedMassifs.includes(massif.id) && styles.massifItemSaved,
                ]}
                onPress={() => setSelectedId(massif.id)}
              >
                <Text style={styles.massifIcon}>{massif.icon}</Text>
                <Text style={styles.massifName}>{massif.name}</Text>
                <Text style={styles.massifCoords}>
                  ({massif.x}, {massif.y})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {selectedMassif && (
            <View style={styles.controlPanel}>
              <Text style={styles.controlTitle}>
                {selectedMassif.icon} {selectedMassif.name}
              </Text>
              
              <View style={styles.arrowButtons}>
                <View style={styles.arrowRow}>
                  <View style={styles.arrowSpacer} />
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => moveMassif(selectedId, 0, -5)}
                  >
                    <ChevronUp size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowSpacer} />
                </View>
                
                <View style={styles.arrowRow}>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => moveMassif(selectedId, -5, 0)}
                  >
                    <ChevronLeft size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowCenter}>
                    <Text style={styles.arrowCenterText}>
                      {selectedMassif.x}, {selectedMassif.y}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => moveMassif(selectedId, 5, 0)}
                  >
                    <ChevronRight size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.arrowRow}>
                  <View style={styles.arrowSpacer} />
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => moveMassif(selectedId, 0, 5)}
                  >
                    <ChevronDown size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowSpacer} />
                </View>
              </View>

              <View style={styles.saveButtons}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveCurrent}
                >
                  <Save size={16} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Bu Masifi Kaydet</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.saveButton, styles.saveAllButton]}
                  onPress={handleSaveAll}
                >
                  <Save size={16} color="#FFFFFF" />
                  <Text style={styles.saveButtonText}>Tümünü Kaydet</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 6,
    marginRight: 8,
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  zoomButton: {
    backgroundColor: '#2563EB',
    padding: 6,
    borderRadius: 6,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  mapContainer: {
    flex: 2,
    overflow: 'hidden',
  },
  mapWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  svg: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  controls: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderLeftColor: '#E5E7EB',
  },
  massifList: {
    flex: 1,
    padding: 8,
  },
  massifItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 6,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  massifItemSelected: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  massifItemSaved: {
    backgroundColor: '#D1FAE5',
    borderColor: '#10B981',
  },
  massifIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  massifName: {
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  massifCoords: {
    fontSize: 9,
    color: '#6B7280',
  },
  controlPanel: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  controlTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  arrowButtons: {
    marginBottom: 12,
  },
  arrowRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 4,
  },
  arrowButton: {
    width: 44,
    height: 44,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowSpacer: {
    width: 44,
  },
  arrowCenter: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCenterText: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
  },
  saveButtons: {
    gap: 6,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#10B981',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  saveAllButton: {
    backgroundColor: '#F59E0B',
  },
  saveButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default MassifsMapManualAdjust;
