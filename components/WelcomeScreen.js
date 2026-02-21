import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const welcomeImage = require('../assets/welcome-geo.png');

export default function WelcomeScreen({ onStart }) {
  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200' }}
        style={styles.background}
        resizeMode="cover"
      >
        {/* Koyu gradient benzeri katmanlar - profesyonel derinlik */}
        <View style={styles.overlayDark} />
        <View style={styles.overlayVignette} />

        <View style={styles.overlay}>
          <View style={styles.card}>
            {/* Logo alanı - hafif ışık halkası */}
            <View style={styles.logoRing}>
              <Image source={welcomeImage} style={styles.welcomeImage} resizeMode="contain" />
            </View>

            <Text style={styles.title}>Coğrafya</Text>
            <Text style={styles.titleAccent}>Keşfet • Öğren • Test Et</Text>
            <Text style={styles.subtitle}>Haritalar, quizler ve daha fazlasıyla dünyayı keşfet.</Text>

            <View style={styles.divider} />

            <TouchableOpacity style={styles.startButton} onPress={onStart} activeOpacity={0.85}>
              <Text style={styles.startButtonText}>Başla</Text>
              <ChevronRight size={22} color="#fff" strokeWidth={2.5} style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>Eğlenerek öğren</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlayDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
  },
  overlayVignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    // Kenarları daha koyu hissettirmek için gölge (iOS'ta shadow, Android'de ek overlay gerekebilir)
    ...(Platform.OS === 'ios' && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.35,
      shadowRadius: 120,
    }),
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 28,
  },
  card: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
    paddingVertical: 36,
    paddingHorizontal: 28,
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.18)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 24,
      },
      android: {
        elevation: 12,
      },
    }),
  },
  logoRing: {
    padding: 10,
    marginBottom: 20,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  welcomeImage: {
    width: 180,
    height: 180,
    borderRadius: 14,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: 0.5,
    marginBottom: 6,
    textAlign: 'center',
  },
  titleAccent: {
    fontSize: 13,
    fontWeight: '600',
    color: '#38BDF8',
    letterSpacing: 1.2,
    marginBottom: 12,
    textAlign: 'center',
    opacity: 0.95,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    lineHeight: 22,
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  divider: {
    width: 48,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(56, 189, 248, 0.5)',
    marginBottom: 28,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0EA5E9',
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 16,
    minWidth: 200,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#0EA5E9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  buttonIcon: {
    marginLeft: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    color: 'rgba(148, 163, 184, 0.7)',
    fontWeight: '500',
  },
});
