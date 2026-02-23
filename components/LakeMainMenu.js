import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const LakeMainMenu = ({ onSelectNatural, onSelectArtificial, onBackToTurkeyMenu }) => {
  const { scale, moderateScale } = useScreenScale();
  const menuButtonStyle = {
    ...styles.menuButton,
    maxWidth: scale(400),
    borderRadius: scale(22),
    padding: scale(28),
  };
  const menuContainerStyle = { ...styles.menuContainer, gap: scale(24), paddingHorizontal: scale(24) };
  const buttonTitleStyle = { ...styles.buttonTitle, fontSize: moderateScale(30), marginBottom: scale(8) };
  const buttonSubtitleStyle = { ...styles.buttonSubtitle, fontSize: moderateScale(16), lineHeight: scale(22) };
  const iconContainerStyle = { ...styles.iconContainer, width: scale(76), height: scale(76), borderRadius: scale(38) };
  const iconStyle = { ...styles.icon, fontSize: moderateScale(44) };
  const textContainerStyle = { ...styles.textContainer, paddingRight: scale(18) };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={onBackToTurkeyMenu}>
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Türkiye Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🌊 Göller</Text>
            <Text style={styles.subtitle}>Göl kategorisini seç</Text>
          </View>

          <View style={menuContainerStyle}>
            <TouchableOpacity style={[menuButtonStyle, styles.naturalButton]} onPress={onSelectNatural} activeOpacity={0.9}>
              <View style={styles.buttonContent}>
                <View style={textContainerStyle}>
                  <Text style={buttonTitleStyle}>Doğal Göller</Text>
                  <Text style={buttonSubtitleStyle}>Tektonik, Volkanik, Karstik göller</Text>
                </View>
                <View style={iconContainerStyle}>
                  <Text style={iconStyle}>🏞️</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={[menuButtonStyle, styles.artificialButton]} onPress={onSelectArtificial} activeOpacity={0.9}>
              <View style={styles.buttonContent}>
                <View style={textContainerStyle}>
                  <Text style={buttonTitleStyle}>Yapay Göller</Text>
                  <Text style={buttonSubtitleStyle}>Barajlar ve su hazneleri</Text>
                </View>
                <View style={iconContainerStyle}>
                  <Text style={iconStyle}>🏗️</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    paddingTop: 62,
    paddingBottom: 8,
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 20,
  },
  menuButton: {
    flex: 1,
    maxWidth: 360,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  naturalButton: {
    backgroundColor: '#06B6D4',
  },
  artificialButton: {
    backgroundColor: '#F97316',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
  },
});

export default LakeMainMenu;
