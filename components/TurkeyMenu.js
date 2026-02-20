import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions, Platform } from 'react-native';
import { ChevronLeft, Home } from 'lucide-react-native';

const menuItems = [
  { id: 'cities', title: '81 İl', icon: '🏙️', style: 'citiesButton', onPress: 'onSelectCities' },
  { id: 'regions', title: '7 Bölge', icon: '🗺️', style: 'regionsButton', onPress: 'onSelectRegions' },
  { id: 'regionsOnly', title: 'Bölgeler', icon: '📍', style: 'regionsOnlyButton', onPress: 'onSelectRegionsOnly' },
  { id: 'mountains', title: 'Dağlar', icon: '⛰️', style: 'mountainsButton', onPress: 'onSelectMountains' },
  { id: 'plains', title: 'Ovalar', icon: '🌾', style: 'plainsButton', onPress: 'onSelectPlains' },
  { id: 'lakes', title: 'Göller', icon: '🌊', style: 'lakesButton', onPress: 'onSelectLakes' },
  { id: 'unesco', title: 'UNESCO', icon: '🏛️', style: 'unescoButton', onPress: 'onSelectUnesco' },
  { id: 'massifs', title: 'Masifler', icon: '🗻', style: 'massifsButton', onPress: 'onSelectMassifs' },
  { id: 'coasts', title: 'Kıyılar', icon: '🏖️', style: 'coastsButton', onPress: 'onSelectCoasts' },
  { id: 'plateaus', title: 'Platolar', icon: '🏔️', style: 'plateausButton', onPress: 'onSelectPlateaus' },
  { id: 'neighbors', title: 'Komşular', icon: '🤝', style: 'neighborsButton', onPress: 'onSelectNeighbors' },
  { id: 'borderGates', title: 'Sınır Kapıları', icon: '🚪', style: 'borderGatesButton', onPress: 'onSelectBorderGates' },
  { id: 'faultLines', title: 'Fay Hatları', icon: '⛰️', style: 'faultLinesButton', onPress: 'onSelectFaultLines' },
];

const TurkeyMenu = ({ 
  onSelectCities, 
  onSelectRegions, 
  onSelectRegionsOnly, 
  onSelectMountains, 
  onSelectPlains, 
  onSelectLakes, 
  onSelectUnesco,
  onSelectMassifs,
  onSelectCoasts,
  onSelectPlateaus,
  onSelectNeighbors,
  onSelectBorderGates,
  onSelectFaultLines,
  onBackToMain 
}) => {
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;
  const isIOSTablet = Platform.OS === 'ios' && !isMobile;
  const handlers = { onSelectCities, onSelectRegions, onSelectRegionsOnly, onSelectMountains, onSelectPlains, onSelectLakes, onSelectUnesco, onSelectMassifs, onSelectCoasts, onSelectPlateaus, onSelectNeighbors, onSelectBorderGates, onSelectFaultLines };

  const boxStyle = isIOSTablet ? styles.menuButtonIOSTablet : (isMobile ? styles.menuButtonMobile : styles.menuButton);
  const iconStyle = isIOSTablet ? styles.iconIOSTablet : (isMobile ? styles.iconMobile : styles.icon);
  const titleStyle = isIOSTablet ? styles.buttonTitleIOSTablet : (isMobile ? styles.buttonTitleMobile : styles.buttonTitle);

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
              <Home size={20} color="#FFFFFF" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <ChevronLeft size={20} color="#FFFFFF" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🇹🇷 Türkiye Haritası</Text>
            <Text style={styles.subtitle}>Öğrenmek istediğin konuyu seç</Text>
          </View>

          <View style={[styles.menuContainer, isMobile && styles.menuContainerMobile, isIOSTablet && styles.menuContainerIOSTablet]}>
            <View style={[styles.row, isMobile && styles.rowMobile, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(0, 4).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.row, isMobile && styles.rowMobile, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(4, 8).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.row, isMobile && styles.rowMobile, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(8, 12).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.row, isMobile && styles.rowMobile, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(12, 14).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
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
    paddingTop: 12,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 6,
    paddingVertical: 4,
  },
  backText: {
    fontSize: 14,
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  menuContainerMobile: {
    padding: 6,
  },
  menuContainerIOSTablet: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 14,
    gap: 14,
  },
  rowMobile: {
    marginBottom: 5,
    gap: 5,
  },
  rowIOSTablet: {
    marginBottom: 18,
    gap: 18,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1.5,
    maxWidth: 180,
    minWidth: 140,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuButtonIOSTablet: {
    flex: 1,
    aspectRatio: 1.5,
    maxWidth: 220,
    minWidth: 170,
    borderRadius: 18,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuButtonMobile: {
    flex: 1,
    aspectRatio: 1.5,
    maxWidth: 52,
    minWidth: 40,
    borderRadius: 8,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  citiesButton: {
    backgroundColor: '#EF4444',
  },
  regionsButton: {
    backgroundColor: '#10B981',
  },
  regionsOnlyButton: {
    backgroundColor: '#8B5CF6',
  },
  mountainsButton: {
    backgroundColor: '#F97316',
  },
  plainsButton: {
    backgroundColor: '#84CC16',
  },
  lakesButton: {
    backgroundColor: '#06B6D4',
  },
  unescoButton: {
    backgroundColor: '#A855F7',
  },
  massifsButton: {
    backgroundColor: '#78716C',
  },
  coastsButton: {
    backgroundColor: '#0EA5E9',
  },
  plateausButton: {
    backgroundColor: '#DC2626',
  },
  neighborsButton: {
    backgroundColor: '#059669',
  },
  borderGatesButton: {
    backgroundColor: '#DC2626',
  },
  faultLinesButton: {
    backgroundColor: '#B45309',
  },
  icon: {
    fontSize: 38,
    marginBottom: 6,
  },
  iconIOSTablet: {
    fontSize: 46,
    marginBottom: 8,
  },
  iconMobile: {
    fontSize: 18,
    marginBottom: 1,
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
  buttonTitleIOSTablet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonTitleMobile: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TurkeyMenu;
