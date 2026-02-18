import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions, Platform } from 'react-native';

const menuItems = [
  { id: 'turkey', title: 'Türkiye Haritası', subtitle: 'Şehirleri ve bölgeleri tanı', icon: '🇹🇷', color: '#F97316', onPress: 'onSelectTurkey' },
  { id: 'world', title: 'Dünya Haritası', subtitle: 'Kıtalar ve ülkeler', icon: '🌍', color: '#3B82F6', onPress: 'onSelectWorld' },
  { id: 'flags', title: 'Bayrak Quiz', subtitle: 'Dünya bayraklarını test et', icon: '🚩', color: '#8B5CF6', onPress: 'onSelectWorldFlags' },
  { id: 'quiz', title: 'Quiz Modu', subtitle: 'Bilgini test et', icon: '✅', color: '#10B981', onPress: 'onSelectQuizMode' },
  { id: 'practice', title: 'Pratik Modu', subtitle: 'Yanlışlarını tekrar et', icon: '📚', color: '#EC4899', onPress: 'onSelectPracticeMode' },
  { id: 'learning', title: 'Öğrenme Modu', subtitle: 'İlginç bilgilerle öğren', icon: '🧠', color: '#059669', onPress: 'onSelectLearningMode' },
];

const MainMenu = ({ onSelectTurkey, onSelectWorld, onSelectWorldFlags, onSelectQuizMode, onSelectPracticeMode, onSelectLearningMode }) => {
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isIOSTablet = Platform.OS === 'ios' && shortSide >= 600;
  const handlers = { onSelectTurkey, onSelectWorld, onSelectWorldFlags, onSelectQuizMode, onSelectPracticeMode, onSelectLearningMode };

  const boxStyle = isIOSTablet ? styles.boxIOSTablet : styles.box;
  const iconStyle = isIOSTablet ? styles.boxIconIOSTablet : styles.boxIcon;
  const titleStyle = isIOSTablet ? styles.boxTitleIOSTablet : styles.boxTitle;
  const subtitleStyle = isIOSTablet ? styles.boxSubtitleIOSTablet : styles.boxSubtitle;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>🗺️ Harita Quiz</Text>
          <Text style={styles.subtitle}>Coğrafya bilgini test et!</Text>

          <View style={[styles.grid, isIOSTablet && styles.gridIOSTablet]}>
            <View style={[styles.row, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(0, 3).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, { backgroundColor: item.color }]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
                  <Text style={subtitleStyle}>{item.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={[styles.row, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(3, 6).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[boxStyle, { backgroundColor: item.color }]}
                  onPress={handlers[item.onPress]}
                  activeOpacity={0.9}
                >
                  <Text style={iconStyle}>{item.icon}</Text>
                  <Text style={titleStyle}>{item.title}</Text>
                  <Text style={subtitleStyle}>{item.subtitle}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.footer}>Eğlenerek öğren! 🎯</Text>
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
    padding: 16,
  },
  title: {
    fontSize: 28,
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
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  gridIOSTablet: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  rowIOSTablet: {
    marginBottom: 18,
    gap: 18,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
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
  boxIOSTablet: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 200,
    minWidth: 160,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 16,
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
  boxIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  boxIconIOSTablet: {
    fontSize: 44,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  boxSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  boxTitleIOSTablet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  boxSubtitleIOSTablet: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default MainMenu;
