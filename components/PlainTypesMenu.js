import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const PlainTypesMenu = ({ onSelectType, onBackToTurkeyMenu }) => {
  const { scale, moderateScale } = useScreenScale();
  const menuButtonStyle = {
    ...styles.menuButton,
    maxWidth: scale(180),
    marginHorizontal: scale(8),
    borderRadius: scale(18),
    padding: scale(16),
    aspectRatio: 1.2,
  };
  const rowStyle = { ...styles.row, gap: scale(16), marginBottom: scale(14) };
  const iconStyle = { ...styles.icon, fontSize: moderateScale(42), marginBottom: scale(8) };
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
            <TouchableOpacity style={styles.backButton} onPress={onBackToTurkeyMenu}>
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Türkiye Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🌾 Ovalar</Text>
            <Text style={styles.subtitle}>Ova tipini seç</Text>
          </View>

          <View style={menuContainerStyle}>
            <View style={rowStyle}>
              <TouchableOpacity style={[menuButtonStyle, styles.deltaButton]} onPress={() => onSelectType('delta')} activeOpacity={0.9}>
                <Text style={iconStyle}>🏞️</Text>
                <Text style={buttonTitleStyle}>Delta</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[menuButtonStyle, styles.karsticButton]} onPress={() => onSelectType('karstic')} activeOpacity={0.9}>
                <Text style={iconStyle}>💧</Text>
                <Text style={buttonTitleStyle}>Karstik</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[menuButtonStyle, styles.tectonicButton]} onPress={() => onSelectType('tectonic')} activeOpacity={0.9}>
                <Text style={iconStyle}>🌊</Text>
                <Text style={buttonTitleStyle}>Tektonik</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[menuButtonStyle, styles.piedmontButton]} onPress={() => onSelectType('piedmont')} activeOpacity={0.9}>
                <Text style={iconStyle}>⛰️</Text>
                <Text style={buttonTitleStyle}>Dağ Eteği</Text>
              </TouchableOpacity>
            </View>
            <View style={rowStyle}>
              <TouchableOpacity style={[menuButtonStyle, styles.volcanicButton]} onPress={() => onSelectType('volcanic')} activeOpacity={0.9}>
                <Text style={iconStyle}>🌋</Text>
                <Text style={buttonTitleStyle}>Volkanik</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[menuButtonStyle, styles.lacustrineButton]} onPress={() => onSelectType('lacustrine')} activeOpacity={0.9}>
                <Text style={iconStyle}>🏔️</Text>
                <Text style={buttonTitleStyle}>Göl Tabanı</Text>
              </TouchableOpacity>
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
    padding: 20,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 12,
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
  deltaButton: {
    backgroundColor: '#10B981',
  },
  karsticButton: {
    backgroundColor: '#06B6D4',
  },
  tectonicButton: {
    backgroundColor: '#F97316',
  },
  piedmontButton: {
    backgroundColor: '#8B5CF6',
  },
  volcanicButton: {
    backgroundColor: '#EF4444',
  },
  lacustrineButton: {
    backgroundColor: '#3B82F6',
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

export default PlainTypesMenu;
