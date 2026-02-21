import { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  Modal,
  Pressable,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Home, ChevronLeft, X } from 'lucide-react-native';
import { FAULT_LINES } from '../constants/faultLines';
import { turkeyPaths } from '../constants/turkeyPaths';
import { FAULT_LINE_PATHS, TURKEY_VIEWBOX } from '../constants/faultLinePaths';

const VIEWBOX_WIDTH = 1007.478;
const VIEWBOX_HEIGHT = 527.323;
const MAP_ASPECT = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;
const HIT_SLOP = 28; // viewBox biriminde – çizgi etrafında tıklanabilir alan

const faultById = Object.fromEntries(FAULT_LINES.map((f) => [f.id, f]));
const colorById = Object.fromEntries(FAULT_LINE_PATHS.map((f) => [f.id, f.color]));

export default function FaultLinesScreen({ onBackToMenu, onBackToMain }) {
  const { width: screenWidth } = useWindowDimensions();
  const mapWidth = screenWidth - 32;
  const mapHeight = mapWidth / MAP_ASPECT;
  const [selectedFaultId, setSelectedFaultId] = useState(null);

  const handleFaultPress = useCallback((id) => {
    setSelectedFaultId(id);
  }, []);

  const selectedFault = selectedFaultId ? faultById[selectedFaultId] : null;
  const selectedColor = selectedFaultId ? colorById[selectedFaultId] : null;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <View style={styles.backButtonsColumn}>
          {onBackToMain && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <Home size={24} color="#DC2626" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#DC2626" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>⛰️ Fay Hatları</Text>
        <Text style={styles.subtitle}>Türkiye'deki başlıca fay hatları</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.mapWrapper}>
          <Svg
            width={mapWidth}
            height={mapHeight}
            viewBox={TURKEY_VIEWBOX}
          >
            <G>
              {turkeyPaths.map((city) => (
                <Path
                  key={city.id}
                  d={city.d}
                  fill="rgba(30, 41, 59, 0.85)"
                  stroke="rgba(148, 163, 184, 0.5)"
                  strokeWidth={0.8}
                />
              ))}
            </G>
            {FAULT_LINE_PATHS.map((fault) => (
              <G key={fault.id}>
                <Path
                  d={fault.d}
                  fill="none"
                  stroke={fault.color}
                  strokeWidth={4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <Path
                  d={fault.d}
                  fill="none"
                  stroke="rgba(0,0,0,0.01)"
                  strokeWidth={HIT_SLOP}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  onPress={() => handleFaultPress(fault.id)}
                />
              </G>
            ))}
          </Svg>
          <Text style={styles.mapCaption}>Türkiye haritası üzerinde fay hatları (şematik)</Text>
        </View>

        {FAULT_LINES.map((fault) => (
          <View key={fault.id} style={styles.card}>
            <Text style={styles.cardTitle}>{fault.name}</Text>
            <Text style={styles.cardRegion}>{fault.region}</Text>
            <Text style={styles.cardDescription}>{fault.description}</Text>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={!!selectedFault}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedFaultId(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setSelectedFaultId(null)}>
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={[styles.modalAccent, selectedColor && { backgroundColor: selectedColor }]} />
            <Text style={styles.modalTitle}>{selectedFault?.name}</Text>
            <Text style={styles.modalRegion}>{selectedFault?.region}</Text>
            <Text style={styles.modalDescription}>{selectedFault?.description}</Text>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setSelectedFaultId(null)}
            >
              <X size={22} color="#94A3B8" />
              <Text style={styles.modalCloseText}>Kapat</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 62,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  mapWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mapCaption: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 8,
    fontStyle: 'italic',
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#DC2626',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  cardRegion: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'rgba(30, 41, 59, 0.98)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  modalAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#DC2626',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 8,
    marginBottom: 4,
  },
  modalRegion: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
    marginBottom: 16,
  },
  modalClose: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  modalCloseText: {
    fontSize: 15,
    color: '#94A3B8',
    marginLeft: 6,
  },
});
