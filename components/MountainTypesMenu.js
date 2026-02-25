import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const MountainTypesMenu = ({ onSelectType, onBackToTurkeyMenu }) => {
  const { scale, moderateScale } = useScreenScale();
  const menuButtonStyle = {
    ...styles.menuButton,
    maxWidth: scale(100),
    marginHorizontal: scale(3),
    borderRadius: scale(12),
    padding: scale(8),
  };
  const rowStyle = {
    ...styles.row,
    marginBottom: scale(8),
    gap: scale(6),
  };
  const iconStyle = { ...styles.icon, fontSize: moderateScale(28), marginBottom: scale(2) };
  const buttonTitleStyle = { ...styles.buttonTitle, fontSize: moderateScale(12) };
  const menuContainerStyle = { ...styles.menuContainer, paddingHorizontal: scale(14), paddingVertical: scale(10), paddingTop: scale(28) };

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
            <Text style={styles.title}>⛰️ Dağlar</Text>
            <Text style={styles.subtitle}>Dağ tipini seç</Text>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={menuContainerStyle}
            showsVerticalScrollIndicator={false}
          >
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
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexGrow: 1,
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
