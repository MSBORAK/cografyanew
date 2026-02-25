import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const MountainTypesMenu = ({ onSelectType, onBackToTurkeyMenu }) => {
  const { width, height } = useWindowDimensions();
  const { scale, moderateScale } = useScreenScale();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;

  const menuButtonStyle = isMobile
    ? { ...styles.menuButton, maxWidth: scale(100), marginHorizontal: scale(3), borderRadius: scale(12), padding: scale(8) }
    : { ...styles.menuButton, maxWidth: scale(220), marginHorizontal: scale(10), borderRadius: scale(18), padding: scale(18), aspectRatio: 1.2 };
  const rowStyle = isMobile
    ? { ...styles.row, marginBottom: scale(8), gap: scale(6) }
    : { ...styles.row, gap: scale(16) };
  const iconStyle = isMobile
    ? { ...styles.icon, fontSize: moderateScale(28), marginBottom: scale(2) }
    : { ...styles.icon, fontSize: moderateScale(48), marginBottom: scale(10) };
  const buttonTitleStyle = isMobile
    ? { ...styles.buttonTitle, fontSize: moderateScale(12) }
    : { ...styles.buttonTitle, fontSize: moderateScale(17) };
  const menuContainerStyle = isMobile
    ? { ...styles.menuContainer, paddingHorizontal: scale(14), paddingVertical: scale(10), paddingTop: scale(28) }
    : { ...styles.menuContainer, ...styles.menuContainerTablet, padding: scale(24) };

  const content = (
    <View style={rowStyle}>
      <TouchableOpacity style={[menuButtonStyle, styles.volcanicButton]} onPress={() => onSelectType('volcanic')} activeOpacity={0.9}>
        <Text style={iconStyle}>🌋</Text>
        <Text style={buttonTitleStyle}>Volkanik</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[menuButtonStyle, styles.tectonicButton]} onPress={() => onSelectType('tectonic')} activeOpacity={0.9}>
        <Text style={iconStyle}>⛰️</Text>
        <Text style={buttonTitleStyle}>Kıvrımlı</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[menuButtonStyle, styles.faultButton]} onPress={() => onSelectType('fault')} activeOpacity={0.9}>
        <Text style={iconStyle}>🏔️</Text>
        <Text style={buttonTitleStyle}>Kırıklı</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <View style={[styles.header, isMobile && styles.headerMobile, !isMobile && styles.headerTablet]}>
            <TouchableOpacity style={styles.backButton} onPress={onBackToTurkeyMenu}>
              <ChevronLeft size={isMobile ? 22 : 24} color="#FFFFFF" />
              <Text style={styles.backText}>Türkiye Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>⛰️ Dağlar</Text>
            <Text style={styles.subtitle}>Dağ tipini seç</Text>
          </View>

          {isMobile ? (
            <ScrollView style={styles.scroll} contentContainerStyle={menuContainerStyle} showsVerticalScrollIndicator={false}>
              {content}
            </ScrollView>
          ) : (
            <View style={menuContainerStyle}>{content}</View>
          )}
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
  headerMobile: {
    paddingTop: 44,
    paddingBottom: 12,
  },
  headerTablet: {
    paddingTop: 62,
    paddingBottom: 8,
    paddingHorizontal: 20,
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexGrow: 1,
  },
  menuContainerTablet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1,
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
  volcanicButton: {
    backgroundColor: '#EF4444',
  },
  tectonicButton: {
    backgroundColor: '#F97316',
  },
  faultButton: {
    backgroundColor: '#8B5CF6',
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

export default MountainTypesMenu;
