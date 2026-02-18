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
import Svg, { G, Path, Rect, Text as SvgText } from 'react-native-svg';
import { Home, Save, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyPaths } from '../constants/turkeyPaths';
import { allPlains } from '../constants/plainTypes';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_WIDTH = Math.max(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.75;
const MAP_HEIGHT = MAP_WIDTH * 0.52;

const PlainsMapManualAdjust = ({ onBackToMenu }) => {
  const [plains, setPlains] = useState([...allPlains]);
  const [selectedId, setSelectedId] = useState(null);
  const [savedPlains, setSavedPlains] = useState([]);
  
  // Zoom ve Pan için state'ler
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const lastScale = useRef(1);
  const lastTranslateX = useRef(0);
  const lastTranslateY = useRef(0);

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

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    return () => {
      ScreenOrientation.unlockAsync().then(() =>
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
      );
    };
  }, []);

  const movePlain = (id, dx, dy) => {
    setPlains(prev => prev.map(p => 
      p.id === id ? { ...p, x: p.x + dx, y: p.y + dy } : p
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
    
    // Zoom out yaparken pozisyonu sıfırla
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
      Alert.alert('Uyarı', 'Lütfen önce bir ova seçin!');
      return;
    }
    
    const plain = plains.find(p => p.id === selectedId);
    if (!plain) return;
    
    // Kaydedilenlere ekle
    if (!savedPlains.includes(selectedId)) {
      setSavedPlains([...savedPlains, selectedId]);
    }
    
    Alert.alert(
      'Kaydedildi',
      `${plain.name} koordinatları kaydedildi!\n(${plain.x}, ${plain.y})`,
      [{ text: 'Tamam' }]
    );
  };

  const handleSaveAll = () => {
    // Ovaları tiplere göre ayır
    const delta = plains.filter(p => p.type === 'delta');
    const other = plains.filter(p => p.type === 'other');
    
    const code = `// Delta Ovaları
export const deltaPlains = ${JSON.stringify(delta, null, 2)};

// Diğer Ovalar
export const otherPlains = ${JSON.stringify(other, null, 2)};`;
    
    Alert.alert(
      'Tüm Koordinatlar Kaydedildi',
      'Konsola yazdırıldı. constants/plainTypes.js dosyasını güncelleyin.',
      [{ text: 'Tamam' }]
    );
    
    console.log('=== YENİ OVA KOORDİNATLARI ===');
    console.log(code);
    console.log('=== KOPYALA VE YAPIŞTIR ===');
  };

  const selectedPlain = plains.find(p => p.id === selectedId);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={20} color="#2563EB" />
        </TouchableOpacity>
        <Text style={styles.title}>Ova Konumlarını Ayarla</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveCurrent}>
            <Save size={18} color="#10B981" />
            <Text style={styles.saveText}>Kaydet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveAllButton} onPress={handleSaveAll}>
            <Save size={18} color="#FFFFFF" />
            <Text style={styles.saveAllText}>Tümünü Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {/* Harita */}
        <View style={styles.mapSection}>
          <View style={styles.zoomControls}>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
              <ZoomIn size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
              <ZoomOut size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              transform: [
                { scale: scale },
                { translateX: translateX },
                { translateY: translateY },
              ],
            }}
          >
            <Svg
              width={MAP_WIDTH * 0.6}
              height={MAP_HEIGHT * 0.6}
              viewBox="0 0 1007.478 527.323"
              style={styles.svg}
            >
            <G>
              {turkeyPaths.map((city) => (
                <Path
                  key={city.id}
                  d={city.d}
                  fill="#F3F4F6"
                  stroke="#E5E7EB"
                  strokeWidth="0.5"
                />
              ))}
            </G>
            <G>
              {plains.map((plain) => {
                const isSelected = selectedId === plain.id;
                let fillColor = '#10B981'; // Yeşil - varsayılan
                let strokeColor = '#059669';
                
                if (plain.type === 'delta') {
                  fillColor = isSelected ? '#059669' : '#10B981'; // Yeşil
                  strokeColor = '#047857';
                } else if (plain.type === 'karstic') {
                  fillColor = isSelected ? '#D97706' : '#F59E0B'; // Sarı
                  strokeColor = '#B45309';
                } else if (plain.type === 'tectonic') {
                  fillColor = isSelected ? '#EA580C' : '#F97316'; // Turuncu
                  strokeColor = '#C2410C';
                } else if (plain.type === 'piedmont') {
                  fillColor = isSelected ? '#7C3AED' : '#8B5CF6'; // Mor
                  strokeColor = '#6D28D9';
                } else if (plain.type === 'volcanic') {
                  fillColor = isSelected ? '#DC2626' : '#EF4444'; // Kırmızı
                  strokeColor = '#B91C1C';
                } else if (plain.type === 'lacustrine') {
                  fillColor = isSelected ? '#2563EB' : '#3B82F6'; // Mavi
                  strokeColor = '#1D4ED8';
                }
                
                return (
                  <G key={plain.id}>
                    <Rect
                      x={plain.x}
                      y={plain.y}
                      width={plain.width}
                      height={plain.height}
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth="2"
                      opacity={0.6}
                    />
                    <SvgText
                      x={plain.x + plain.width / 2}
                      y={plain.y + plain.height / 2}
                      fontSize="8"
                      fill="#FFFFFF"
                      textAnchor="middle"
                      fontWeight="600"
                    >
                      {plain.name}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          </Svg>
          </Animated.View>
        </View>

        {/* Kontroller */}
        <View style={styles.controlSection}>
          <ScrollView style={styles.plainList}>
            {plains.map((plain) => {
              const isSelected = selectedId === plain.id;
              const isSaved = savedPlains.includes(plain.id);
              let typeEmoji = '🌾';
              let typeColor = '#10B981';
              
              if (plain.type === 'delta') {
                typeEmoji = '🌊';
                typeColor = '#10B981';
              } else if (plain.type === 'karstic') {
                typeEmoji = '🏜️';
                typeColor = '#F59E0B';
              } else if (plain.type === 'tectonic') {
                typeEmoji = '⚡';
                typeColor = '#F97316';
              } else if (plain.type === 'piedmont') {
                typeEmoji = '⛰️';
                typeColor = '#8B5CF6';
              } else if (plain.type === 'volcanic') {
                typeEmoji = '🌋';
                typeColor = '#EF4444';
              } else if (plain.type === 'lacustrine') {
                typeEmoji = '🏔️';
                typeColor = '#3B82F6';
              }
              
              return (
                <TouchableOpacity
                  key={plain.id}
                  style={[
                    styles.plainItem,
                    isSelected && styles.plainItemSelected,
                    isSelected && { borderColor: typeColor },
                    isSaved && styles.plainItemSaved
                  ]}
                  onPress={() => setSelectedId(plain.id)}
                >
                  <View style={styles.plainItemHeader}>
                    <Text style={styles.plainItemEmoji}>{typeEmoji}</Text>
                    <Text style={styles.plainItemText}>{plain.name}</Text>
                    {isSaved && <Text style={styles.savedBadge}>✓</Text>}
                  </View>
                  <Text style={styles.plainCoords}>
                    ({plain.x}, {plain.y})
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {selectedPlain && (
            <View style={styles.controls}>
              <Text style={styles.controlTitle}>
                {selectedPlain.name} - Hareket Ettir
              </Text>
              
              <View style={styles.arrowControls}>
                <View style={styles.arrowRow}>
                  <View style={styles.arrowSpacer} />
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => movePlain(selectedId, 0, -10)}
                  >
                    <ChevronUp size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowSpacer} />
                </View>
                
                <View style={styles.arrowRow}>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => movePlain(selectedId, -10, 0)}
                  >
                    <ChevronLeft size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowCenter}>
                    <Text style={styles.arrowCenterText}>10px</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => movePlain(selectedId, 10, 0)}
                  >
                    <ChevronRight size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.arrowRow}>
                  <View style={styles.arrowSpacer} />
                  <TouchableOpacity
                    style={styles.arrowButton}
                    onPress={() => movePlain(selectedId, 0, 10)}
                  >
                    <ChevronDown size={24} color="#FFFFFF" />
                  </TouchableOpacity>
                  <View style={styles.arrowSpacer} />
                </View>
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
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  saveAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#10B981',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  saveAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    gap: 12,
  },
  mapSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  zoomControls: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    gap: 8,
  },
  zoomButton: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  svg: {
    borderRadius: 8,
  },
  controlSection: {
    width: 280,
    gap: 12,
  },
  plainList: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
  },
  plainItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#F3F4F6',
  },
  plainItemSelected: {
    backgroundColor: '#FEE2E2',
    borderWidth: 2,
  },
  plainItemSaved: {
    backgroundColor: '#D1FAE5',
  },
  plainItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  plainItemEmoji: {
    fontSize: 16,
  },
  plainItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  savedBadge: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: 'bold',
  },
  plainCoords: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },
  controls: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
  },
  controlTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
    textAlign: 'center',
  },
  arrowControls: {
    gap: 8,
  },
  arrowRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  arrowButton: {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCenter: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowCenterText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  arrowSpacer: {
    width: 50,
  },
});

export default PlainsMapManualAdjust;
