import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const categories = [
  { id: 'marmara', name: 'Marmara', emoji: '🌊', color: '#3B82F6' },
  { id: 'ege', name: 'Ege', emoji: '🫒', color: '#10B981' },
  { id: 'akdeniz', name: 'Akdeniz', emoji: '🏖️', color: '#F59E0B' },
  { id: 'ic-anadolu', name: 'İç Anadolu', emoji: '🌾', color: '#EAB308' },
  { id: 'karadeniz', name: 'Karadeniz', emoji: '🌲', color: '#059669' },
  { id: 'dogu-anadolu', name: 'Doğu Anadolu', emoji: '⛰️', color: '#8B5CF6' },
  { id: 'guneydogu', name: 'G.Doğu Anadolu', emoji: '🏜️', color: '#DC2626' },
  { id: 'all', name: 'Tüm Şehirler', emoji: '🇹🇷', color: '#EF4444' },
];

const HomeScreen = ({ onStartGame, onBackToMain }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                console.log('Geri butonu tıklandı');
                onBackToMain();
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🗺️ Bölge Seç</Text>
            <Text style={styles.subtitle}>Hangi bölgeyi öğrenmek istersin?</Text>
          </View>

          {/* Menu Buttons - Yatay 4'lü gruplar */}
          <View style={styles.menuContainer}>
            <View style={styles.row}>
              {categories.slice(0, 4).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.menuButton, { backgroundColor: cat.color }]}
                  onPress={() => onStartGame(cat.id)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.icon}>{cat.emoji}</Text>
                  <Text style={styles.buttonTitle}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {categories.slice(4, 8).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.menuButton, { backgroundColor: cat.color }]}
                  onPress={() => onStartGame(cat.id)}
                  activeOpacity={0.9}
                >
                  <Text style={styles.icon}>{cat.emoji}</Text>
                  <Text style={styles.buttonTitle}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 20,
    paddingVertical: 8,
  },
  backText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94A3B8',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
    gap: 12,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1.2,
    maxWidth: 140,
    marginHorizontal: 6,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  icon: {
    fontSize: 40,
    marginBottom: 6,
  },
  buttonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
