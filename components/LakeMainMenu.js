import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const LakeMainMenu = ({ onSelectNatural, onSelectArtificial, onBackToTurkeyMenu }) => {
  const { scale, moderateScale } = useScreenScale();
  const menuButtonStyle = {
    ...styles.menuButton,
    flex: 1,
    maxWidth: scale(160),
    marginHorizontal: scale(6),
    borderRadius: scale(12),
    padding: scale(12),
  };
  const menuContainerStyle = { ...styles.menuContainer, paddingHorizontal: scale(14), paddingVertical: scale(10), paddingTop: scale(28) };
  const buttonTitleStyle = { ...styles.buttonTitle, fontSize: moderateScale(14), marginBottom: scale(4) };
  const buttonSubtitleStyle = { ...styles.buttonSubtitle, fontSize: moderateScale(10), lineHeight: scale(14) };
  const iconContainerStyle = { ...styles.iconContainer, width: scale(44), height: scale(44), borderRadius: scale(22) };
  const iconStyle = { ...styles.icon, fontSize: moderateScale(24) };
  const textContainerStyle = { ...styles.textContainer, paddingRight: scale(8) };

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
              <ChevronLeft size={22} color="#FFFFFF" />
              <Text style={styles.backText}>Türkiye Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🌊 Göller</Text>
            <Text style={styles.subtitle}>Göl kategorisini seç</Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={menuContainerStyle}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.row}>
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
          </ScrollView>
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
    paddingTop: 44,
    paddingBottom: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
    paddingVertical: 6,
  },
  backText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexGrow: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 1,
    gap: 8,
  },
  menuButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  buttonTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
});

export default LakeMainMenu;
