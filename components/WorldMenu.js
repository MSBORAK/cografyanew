import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

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
  onBackToMain 
}) => {
  const handlers = { onSelectWorldMap, onSelectContinents, onSelectEurope, onSelectAsia, onSelectAfrica, onSelectAmerica, onSelectOceania, onSelectAntarctica, onSelectFlags };

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
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>🌍 Dünya Haritası</Text>
            <Text style={styles.subtitle}>Keşfetmek istediğin bölgeyi seç</Text>
          </View>

          <View style={styles.menuContainer}>
            <View style={styles.row}>
              {menuItems.slice(0, 5).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuButton, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.buttonTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.row}>
              {menuItems.slice(5, 9).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuButton, styles[item.style]]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={styles.icon}>{item.icon}</Text>
                  <Text style={styles.buttonTitle}>{item.title}</Text>
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
  scrollView: {
    flex: 1,
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
    aspectRatio: 1,
    maxWidth: 130,
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

export default WorldMenu;
