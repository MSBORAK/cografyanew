import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions, Platform, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import { ChevronLeft, Home, Lock } from 'lucide-react-native';
import { getUnlockedPremiumIds, isTurkeyItemLocked } from '../utils/premiumLock';
import { useScreenScale } from '../utils/screenScale';

const COLS = 4;
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
  onBackToMain,
  onRequestUnlock,
  refreshPremiumKey = 0,
}) => {
  const { width, height } = useWindowDimensions();
  const { scale, moderateScale } = useScreenScale();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;
  const isIOSTablet = Platform.OS === 'ios' && !isMobile;
  const handlers = { onSelectCities, onSelectRegions, onSelectRegionsOnly, onSelectMountains, onSelectPlains, onSelectLakes, onSelectUnesco, onSelectMassifs, onSelectCoasts, onSelectPlateaus, onSelectNeighbors, onSelectBorderGates, onSelectFaultLines };

  const [unlockedPremiumIds, setUnlockedPremiumIds] = useState([]);
  useEffect(() => {
    getUnlockedPremiumIds().then((ids) => setUnlockedPremiumIds(Array.isArray(ids) ? ids : [])).catch(() => setUnlockedPremiumIds([]));
  }, [refreshPremiumKey]);

  // Dünya haritası sayfası (WorldMenu) ile aynı kutu stili
  const menuButtonStyle = isMobile
    ? { ...styles.menuButton, maxWidth: scale(92), minWidth: scale(70), marginHorizontal: scale(2), borderRadius: scale(10), padding: scale(6), aspectRatio: 1.5 }
    : { ...styles.menuButton, maxWidth: scale(190), minWidth: scale(150), marginHorizontal: scale(6), borderRadius: scale(18), padding: scale(16) };
  const rowStyle = isMobile ? { ...styles.row, marginBottom: scale(6), gap: scale(6) } : { ...styles.row, marginBottom: scale(14), gap: scale(14) };
  const iconStyle = isMobile ? { ...styles.icon, fontSize: moderateScale(20), marginBottom: scale(2) } : { ...styles.icon, fontSize: moderateScale(38), marginBottom: scale(8) };
  const buttonTitleStyle = isMobile ? { ...styles.buttonTitle, fontSize: moderateScale(10) } : { ...styles.buttonTitle, fontSize: moderateScale(15) };
  const menuContainerStyle = isMobile
    ? { paddingHorizontal: scale(8), paddingTop: scale(20), paddingBottom: 24 }
    : { paddingHorizontal: scale(20), paddingTop: scale(28), paddingBottom: 24 };

  const renderBox = (item) => {
    const locked = isTurkeyItemLocked(item.id, unlockedPremiumIds);
    return (
      <TouchableOpacity
        key={item.id}
        style={[menuButtonStyle, styles[item.style], locked && styles.menuBoxLocked]}
        onPress={locked ? (onRequestUnlock ? () => onRequestUnlock('premium') : handlers[item.onPress]) : handlers[item.onPress]}
        activeOpacity={0.9}
      >
        {locked && (
          <View style={[styles.lockBadge, isMobile && styles.lockBadgeMobile]}>
            <Lock size={isMobile ? 12 : 16} color="#1E293B" strokeWidth={2.5} />
          </View>
        )}
        <Text style={iconStyle}>{item.icon}</Text>
        <Text style={buttonTitleStyle} numberOfLines={2}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const rows = [];
  for (let i = 0; i < menuItems.length; i += COLS) {
    const chunk = menuItems.slice(i, i + COLS);
    const short = chunk.length < COLS;
    const emptyStart = short ? Math.floor((COLS - chunk.length) / 2) : 0;
    const emptyEnd = short ? Math.ceil((COLS - chunk.length) / 2) : 0;
    // Son satır: Fay Hatları kutucuğunu biraz daha sağa almak için sol boşluk daha geniş
    const startFlex = short && emptyStart === 1 ? 2.0 : 1;
    const endFlex = short && emptyEnd === 1 ? 0.15 : 1;
    rows.push(
      <View key={i} style={rowStyle}>
        {emptyStart > 0 && Array.from({ length: emptyStart }).map((_, j) => (
          <View key={`empty-start-${i}-${j}`} style={{ flex: j === 0 ? startFlex : 1 }} />
        ))}
        {chunk.map((item) => renderBox(item))}
        {emptyEnd > 0 && Array.from({ length: emptyEnd }).map((_, j) => (
          <View key={`empty-end-${i}-${j}`} style={{ flex: j === emptyEnd - 1 ? endFlex : 1 }} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <View style={[styles.header, isMobile && styles.headerMobile]}>
            <View style={styles.backButtonsColumn}>
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Home size={20} color="#FFFFFF" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <ChevronLeft size={20} color="#FFFFFF" />
                <Text style={styles.backText}>Geri</Text>
              </TouchableOpacity>
            </View>
            <Text style={[styles.title, isMobile && styles.titleMobile]}>🇹🇷 Türkiye Haritası</Text>
            <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>Öğrenmek istediğin konuyu seç</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[styles.menuScrollContent, menuContainerStyle]}
            showsVerticalScrollIndicator={false}
          >
            {rows}
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
    paddingTop: Platform.OS === 'ios' ? 56 : 48,
    paddingBottom: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  headerMobile: {
    paddingTop: 44,
    paddingBottom: 6,
    paddingHorizontal: 12,
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
    alignSelf: 'flex-start',
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: -50,
    marginBottom: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleMobile: {
    fontSize: 22,
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
  },
  subtitleMobile: {
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
  },
  menuScrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 10,
    gap: 10,
  },
  menuButton: {
    flex: 1,
    aspectRatio: 1.5,
    maxWidth: 160,
    minWidth: 135,
    marginHorizontal: 4,
    borderRadius: 14,
    padding: 11,
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
  menuBoxLocked: {
    opacity: 0.92,
  },
  lockBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  lockBadgeMobile: {
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
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
    fontSize: 32,
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default TurkeyMenu;
