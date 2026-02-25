import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Platform } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useScreenScale } from '../utils/screenScale';

const welcomeImage = require('../assets/welcome-geo.png');

export default function WelcomeScreen({ onStart }) {
  const { scale, moderateScale, isMobile } = useScreenScale();

  const cardStyle = [
    styles.card,
    isMobile && {
      maxWidth: scale(280),
      paddingVertical: scale(16),
      paddingHorizontal: scale(20),
      borderRadius: scale(18),
    },
  ];
  const logoRingStyle = [styles.logoRing, isMobile && { padding: scale(6), marginBottom: scale(10), borderRadius: scale(14) }];
  const welcomeImageStyle = [styles.welcomeImage, isMobile && { width: scale(88), height: scale(88), borderRadius: scale(10) }];
  const titleStyle = [styles.title, isMobile && { fontSize: moderateScale(24), marginBottom: scale(4) }];
  const titleAccentStyle = [styles.titleAccent, isMobile && { fontSize: moderateScale(12), marginBottom: scale(6) }];
  const subtitleStyle = [styles.subtitle, isMobile && { fontSize: moderateScale(13), lineHeight: scale(18), marginBottom: scale(10), paddingHorizontal: scale(4) }];
  const dividerStyle = [styles.divider, isMobile && { marginBottom: scale(12) }];
  const startButtonStyle = [styles.startButton, isMobile && { maxWidth: scale(220), paddingVertical: scale(4), paddingHorizontal: scale(4) }];
  const startButtonInnerStyle = [styles.startButtonInner, isMobile && { paddingVertical: scale(10), paddingHorizontal: scale(22) }];
  const startButtonTextStyle = [styles.startButtonText, isMobile && { fontSize: moderateScale(15) }];
  const overlayStyle = [styles.overlay, isMobile && { padding: scale(14) }];
  const footerStyle = [styles.footer, isMobile && { bottom: scale(12), fontSize: moderateScale(12) }];

  return (
    <View style={styles.wrapper}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200' }}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlayDark} />
        <View style={styles.overlayVignette} />

        <View style={overlayStyle}>
          <View style={cardStyle}>
            <View style={logoRingStyle}>
              <Image source={welcomeImage} style={welcomeImageStyle} resizeMode="contain" />
            </View>

            <Text style={titleStyle}>Coğrafya</Text>
            <Text style={titleAccentStyle}>Keşfet • Öğren • Test Et</Text>
            <Text style={subtitleStyle}>Haritalar, quizler ve daha fazlasıyla dünyayı keşfet.</Text>

            <View style={dividerStyle} />

            <TouchableOpacity style={startButtonStyle} onPress={onStart} activeOpacity={0.88}>
              <View style={startButtonInnerStyle}>
                <Text style={startButtonTextStyle}>Başla</Text>
                <ChevronRight size={20} color="#fff" strokeWidth={2.5} style={styles.buttonIcon} />
              </View>
            </TouchableOpacity>
          </View>

          <Text style={footerStyle}>Eğlenerek öğren</Text>
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
    alignSelf: 'stretch',
    maxWidth: 260,
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: { elevation: 8 },
    }),
  },
  startButtonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
  buttonIcon: {
    marginLeft: 10,
    opacity: 0.95,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 13,
    color: 'rgba(148, 163, 184, 0.7)',
    fontWeight: '500',
  },
});
