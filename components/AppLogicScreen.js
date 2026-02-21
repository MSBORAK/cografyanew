import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground, Platform } from 'react-native';
import { Home, ChevronLeft, BookOpen, Map, Target, BookMarked, Lightbulb } from 'lucide-react-native';

const AppLogicScreen = ({ onBack }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.backButtonsColumn}>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <Home size={24} color="#10B981" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={24} color="#10B981" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Uygulama Mantığı</Text>
          <Text style={styles.subtitle}>Nereden ne yapacağını burada bulabilirsin</Text>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <BookOpen size={24} color="#10B981" />
              <Text style={styles.cardTitle}>Genel</Text>
            </View>
            <Text style={styles.cardText}>
              Ana menüden haritalar, quiz, öğrenme ve pratik modlarına giriyorsun. Her sayfada Ana Menü veya Geri ile dönüş var.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Map size={24} color="#F97316" />
              <Text style={styles.cardTitle}>Haritalar</Text>
            </View>
            <Text style={styles.cardText}>
              Türkiye: 81 il, bölgeler, dağlar, göller, ovalar, platolar gibi alt menüler. Dünya: kıtalar, ülkeler, bayrak ve başkent quiz’leri.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Target size={24} color="#10B981" />
              <Text style={styles.cardTitle}>Quiz</Text>
            </View>
            <Text style={styles.cardText}>
              Türkiye / Dünya / Karışık seçenekleri var. Zorluk seçiyorsun (Kolay’dan Ultra Zor’a). Günlük 20 soruluk quiz ana menüdeki karttan açılıyor.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <BookMarked size={24} color="#EC4899" />
              <Text style={styles.cardTitle}>Pratik</Text>
            </View>
            <Text style={styles.cardText}>
              Yanlış yaptığın sorular kaydediliyor. Pratik modunda sadece onları tekrar ediyorsun; doğru yaptıkça listeden düşüyor.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Lightbulb size={24} color="#059669" />
              <Text style={styles.cardTitle}>Öğrenme</Text>
            </View>
            <Text style={styles.cardText}>
              Türkiye şehirleri (il bilgileri), anahtar kelimeler (kavram kartları), dünya ülkeleri ve bayraklar. Rozetler ana menüde 🏅 ile görünüyor.
            </Text>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 52 : 44,
    paddingBottom: 2,
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
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 32 },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
  },
  cardText: {
    fontSize: 14,
    color: '#94A3B8',
    lineHeight: 22,
  },
});

export default AppLogicScreen;
