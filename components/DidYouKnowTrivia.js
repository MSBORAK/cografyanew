import { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { Home, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { buildTriviaList } from '../constants/cityFacts';

const DidYouKnowTrivia = ({ onBackToMenu, onBackToMain }) => {
  const triviaList = useMemo(() => buildTriviaList(50), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCity, setShowCity] = useState(false);

  const item = triviaList[currentIndex];
  const total = triviaList.length;

  const handleNext = () => {
    setShowCity(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setShowCity(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleReveal = () => {
    setShowCity((prev) => !prev);
  };

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
              <Home size={24} color="#EC4899" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#EC4899" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Nerede Olduğunu Biliyor muydunuz?</Text>
        <Text style={styles.subtitle}>
          {currentIndex + 1} / {total}
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.flashCard}
          onPress={handleReveal}
          activeOpacity={1}
        >
          <Text style={styles.cardLabel}>
            {showCity ? '📍 Şehir' : '💡 İlginç bilgi'}
          </Text>
          <Text style={styles.cardText}>
            {showCity ? item.city : item.fact}
          </Text>
          <Text style={styles.hintText}>
            {showCity ? 'Tekrar dokun = bilgiyi göster' : 'Dokun = şehri göster'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handlePrev}
          activeOpacity={0.8}
        >
          <ChevronLeft size={28} color="#EC4899" />
          <Text style={styles.navText}>Önceki</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleNext}
          activeOpacity={0.8}
        >
          <Text style={styles.navText}>Sonraki</Text>
          <ChevronRight size={28} color="#EC4899" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Önce bilgiyi oku, şehri tahmin et, sonra dokunarak kontrol et! 🗺️
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  header: {
    paddingTop: 62,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontSize: 16, color: '#EC4899', fontWeight: '600', marginLeft: 8 },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center' },
  cardContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashCard: {
    width: '100%',
    maxWidth: 400,
    minHeight: 180,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.3)',
    justifyContent: 'center',
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EC4899',
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
    paddingVertical: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(236, 72, 153, 0.2)',
    borderRadius: 12,
    gap: 8,
  },
  navText: { fontSize: 15, fontWeight: '600', color: '#EC4899' },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DidYouKnowTrivia;
