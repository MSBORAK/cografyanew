import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const categories = [
  { id: 'marmara', name: 'Marmara', emoji: '🌊', color: '#3B82F6' },
  { id: 'ege', name: 'Ege', emoji: '🫒', color: '#10B981' },
  { id: 'akdeniz', name: 'Akdeniz', emoji: '🏖️', color: '#F59E0B' },
  { id: 'ic-anadolu', name: 'İç Anadolu', emoji: '🌾', color: '#EAB308' },
  { id: 'karadeniz', name: 'Karadeniz', emoji: '🌲', color: '#059669' },
  { id: 'dogu-anadolu', name: 'Doğu Anadolu', emoji: '⛰️', color: '#8B5CF6' },
  { id: 'guneydogu', name: 'G.Doğu Anadolu', emoji: '🏜️', color: '#DC2626' },
];

const HomeScreen = ({ onStartGame, onBackToMain }) => {
  const { scale, moderateScale } = useScreenScale();
  const menuButtonStyle = {
    ...styles.menuButton,
    maxWidth: scale(180),
    marginHorizontal: scale(8),
    borderRadius: scale(20),
    padding: scale(18),
  };
  const rowStyle = {
    ...styles.row,
    marginBottom: scale(16),
    gap: scale(16),
  };
  const iconStyle = { ...styles.icon, fontSize: moderateScale(48), marginBottom: scale(8) };
  const buttonTitleStyle = { ...styles.buttonTitle, fontSize: moderateScale(16) };
  const menuContainerStyle = { ...styles.menuContainer, padding: scale(24) };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🗺️ Bölge Seç</Text>
            <Text style={styles.subtitle}>Hangi bölgeyi öğrenmek istersin?</Text>
          </View>

          <View style={menuContainerStyle}>
            <View style={rowStyle}>
              {categories.slice(0, 4).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[menuButtonStyle, { backgroundColor: cat.color }]}
                  onPress={() => onStartGame(cat.id)}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{cat.emoji}</Text>
                  <Text style={buttonTitleStyle}>{cat.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={rowStyle}>
              {categories.slice(4, 7).map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[menuButtonStyle, { backgroundColor: cat.color }]}
                  onPress={() => onStartGame(cat.id)}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{cat.emoji}</Text>
                  <Text style={buttonTitleStyle}>{cat.name}</Text>
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
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1.2,
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
    marginBottom: 6,
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default HomeScreen;
