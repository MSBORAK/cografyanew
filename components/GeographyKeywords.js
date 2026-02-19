import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { GEOGRAPHY_KEYWORDS } from '../constants/geographyKeywords';

const GeographyKeywords = ({ onBackToMenu }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);

  const item = GEOGRAPHY_KEYWORDS[currentIndex];
  const total = GEOGRAPHY_KEYWORDS.length;

  const handleNext = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setShowDefinition(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleFlip = () => {
    setShowDefinition((prev) => !prev);
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#F59E0B" />
          <Text style={styles.backText}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Coğrafya Anahtar Kelimeler</Text>
        <Text style={styles.subtitle}>
          {currentIndex + 1} / {total}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.flashCard}
          onPress={handleFlip}
          activeOpacity={1}
        >
          <Text style={styles.cardLabel}>
            {showDefinition ? 'Tanım' : 'Kavram'}
          </Text>
          <Text style={styles.cardText}>
            {showDefinition ? item.definition : item.term}
          </Text>
          <Text style={styles.hintText}>Dokun = çevir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrev}
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#F59E0B" />
          <Text style={styles.navText}>Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.navText}>Sonraki</Text>
          <ChevronRight size={28} color="#F59E0B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.listTitle}>Tüm Kavramlar</Text>
        {GEOGRAPHY_KEYWORDS.map((kw, index) => (
          <View key={index} style={styles.listCard}>
            <Text style={styles.listTerm}>{kw.term}</Text>
            <Text style={styles.listDef}>{kw.definition}</Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontSize: 16, color: '#F59E0B', fontWeight: '600', marginLeft: 8 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitle: { fontSize: 14, color: '#94A3B8' },
  cardContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashCard: {
    width: '100%',
    maxWidth: 400,
    minHeight: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    lineHeight: 26,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    gap: 8,
  },
  navText: { fontSize: 15, fontWeight: '600', color: '#F59E0B' },
  listContainer: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 40 },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  listTerm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FCD34D',
    marginBottom: 6,
  },
  listDef: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },
});

export default GeographyKeywords;
