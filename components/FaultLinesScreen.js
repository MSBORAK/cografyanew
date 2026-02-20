import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import Svg, { G, Path } from 'react-native-svg';
import { Home, ChevronLeft } from 'lucide-react-native';
import { FAULT_LINES } from '../constants/faultLines';
import { turkeyPaths } from '../constants/turkeyPaths';
import { FAULT_LINE_PATHS, TURKEY_VIEWBOX } from '../constants/faultLinePaths';

const VIEWBOX_WIDTH = 1007.478;
const VIEWBOX_HEIGHT = 527.323;
const MAP_ASPECT = VIEWBOX_WIDTH / VIEWBOX_HEIGHT;

export default function FaultLinesScreen({ onBackToMenu, onBackToMain }) {
  const { width: screenWidth } = useWindowDimensions();
  const mapWidth = screenWidth - 32;
  const mapHeight = mapWidth / MAP_ASPECT;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
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
              <Path
                key={fault.id}
                d={fault.d}
                fill="none"
                stroke={fault.color}
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#DC2626',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginTop: 4,
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
});
