import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Platform, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { ChevronLeft, Lock } from 'lucide-react-native';
import { getUnlockedPremiumIds, isWorldItemLocked } from '../utils/premiumLock';
import { useScreenScale } from '../utils/screenScale';

const menuItems = [
  { id: 'world', title: 'Tüm Dünya', icon: '🌐', style: 'worldButton', onPress: 'onSelectWorldMap' },
  { id: 'continents', title: 'Kıtalar', icon: '🌍', style: 'continentsButton', onPress: 'onSelectContinents' },
  { id: 'europe', title: 'Avrupa', icon: '🇪🇺', style: 'europeButton', onPress: 'onSelectEurope' },
  { id: 'asia', title: 'Asya', icon: '🌏', style: 'asiaButton', onPress: 'onSelectAsia' },
  { id: 'africa', title: 'Afrika', icon: '🌍', style: 'africaButton', onPress: 'onSelectAfrica' },
  { id: 'america', title: 'Amerika', icon: '🌎', style: 'americaButton', onPress: 'onSelectAmerica' },
  { id: 'oceania', title: 'Okyanusya', icon: '🏝️', style: 'oceaniaButton', onPress: 'onSelectOceania' },
  { id: 'antarctica', title: 'Antarktika', icon: '🧊', style: 'antarcticaButton', onPress: 'onSelectAntarctica' },
  { id: 'flags', title: 'Bayrak Quiz', icon: '🚩', style: 'flagsButton', onPress: 'onSelectFlags' },
];

const WorldMenu = ({ 
  onSelectWorldMap,
  onSelectContinents,
  onSelectEurope,
  onSelectAsia,
  onSelectAfrica,
  onSelectAmerica,
  onSelectOceania,
  onSelectAntarctica,
  onSelectFlags,
  onBackToMain,
  onRequestUnlock,
  refreshPremiumKey = 0,
}) => {
  const { width, height } = useWindowDimensions();
  const { scale, moderateScale } = useScreenScale();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;
  const handlers = { onSelectWorldMap, onSelectContinents, onSelectEurope, onSelectAsia, onSelectAfrica, onSelectAmerica, onSelectOceania, onSelectAntarctica, onSelectFlags };

  const [unlockedPremiumIds, setUnlockedPremiumIds] = useState([]);
  const menuButtonStyle = isMobile
    ? { ...styles.menuButton, maxWidth: scale(92), minWidth: scale(70), marginHorizontal: scale(2), borderRadius: scale(10), padding: scale(6), aspectRatio: 1.5 }
    : { ...styles.menuButton, maxWidth: scale(190), minWidth: scale(150), marginHorizontal: scale(6), borderRadius: scale(18), padding: scale(16) };
  const rowStyle = isMobile ? { ...styles.row, marginBottom: scale(6), gap: scale(6) } : { ...styles.row, marginBottom: scale(14), gap: scale(14) };
  const iconStyle = isMobile ? { ...styles.icon, fontSize: moderateScale(20), marginBottom: scale(2) } : { ...styles.icon, fontSize: moderateScale(38), marginBottom: scale(8) };
  const buttonTitleStyle = isMobile ? { ...styles.buttonTitle, fontSize: moderateScale(10) } : { ...styles.buttonTitle, fontSize: moderateScale(15) };
  const menuContainerStyle = isMobile ? { ...styles.menuContainer, padding: scale(8), paddingRight: scale(12), justifyContent: 'center' } : { ...styles.menuContainer, padding: scale(20) };
  const headerMobileStyle = isMobile ? { paddingTop: scale(12), paddingBottom: scale(12), paddingHorizontal: scale(12) } : null;
  const titleMobileStyle = isMobile ? { fontSize: moderateScale(24), marginTop: 0, marginBottom: scale(2) } : null;
  const subtitleMobileStyle = isMobile ? { fontSize: moderateScale(11), marginTop: 0, marginBottom: scale(4) } : null;
  const backButtonMobileStyle = isMobile ? { marginLeft: scale(24), alignSelf: 'flex-start' } : null;
  useEffect(() => {
    getUnlockedPremiumIds().then((ids) => setUnlockedPremiumIds(Array.isArray(ids) ? ids : [])).catch(() => setUnlockedPremiumIds([]));
  }, [refreshPremiumKey]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <View style={[styles.header, headerMobileStyle]}>
            <TouchableOpacity style={[styles.backButton, backButtonMobileStyle]} onPress={onBackToMain}>
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <Text style={[styles.title, titleMobileStyle]}>🌍 Dünya Haritası</Text>
            <Text style={[styles.subtitle, subtitleMobileStyle]}>Keşfetmek istediğin bölgeyi seç</Text>
          </View>

          <View style={menuContainerStyle}>
            <View style={rowStyle}>
              {menuItems.slice(0, 5).map((item) => {
                const locked = isWorldItemLocked(item.id, unlockedPremiumIds);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[menuButtonStyle, styles[item.style], locked && styles.menuBoxLocked]}
                    onPress={locked ? (onRequestUnlock ? () => onRequestUnlock('premium') : handlers[item.onPress]) : handlers[item.onPress]}
                    activeOpacity={0.9}
                  >
                    {locked && (
                      <View style={styles.lockBadge}>
                        <Lock size={16} color="#1E293B" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text style={iconStyle}>{item.icon}</Text>
                    <Text style={buttonTitleStyle}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={rowStyle}>
              {menuItems.slice(5, 9).map((item) => {
                const locked = isWorldItemLocked(item.id, unlockedPremiumIds);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[menuButtonStyle, styles[item.style], locked && styles.menuBoxLocked]}
                    onPress={locked ? (onRequestUnlock ? () => onRequestUnlock('premium') : handlers[item.onPress]) : handlers[item.onPress]}
                    activeOpacity={0.9}
                  >
                    {locked && (
                      <View style={styles.lockBadge}>
                        <Lock size={16} color="#1E293B" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text style={iconStyle}>{item.icon}</Text>
                    <Text style={buttonTitleStyle}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
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
    paddingTop: Platform.OS === 'ios' ? 64 : 52,
    paddingBottom: 2,
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
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: -6,
    marginBottom: 0,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
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
  worldButton: {
    backgroundColor: '#3B82F6',
  },
  continentsButton: {
    backgroundColor: '#10B981',
  },
  europeButton: {
    backgroundColor: '#8B5CF6',
  },
  asiaButton: {
    backgroundColor: '#F59E0B',
  },
  africaButton: {
    backgroundColor: '#EF4444',
  },
  americaButton: {
    backgroundColor: '#06B6D4',
  },
  oceaniaButton: {
    backgroundColor: '#14B8A6',
  },
  antarcticaButton: {
    backgroundColor: '#0EA5E9',
  },
  flagsButton: {
    backgroundColor: '#EC4899',
  },
  icon: {
    fontSize: 32,
    marginBottom: 5,
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

export default WorldMenu;
