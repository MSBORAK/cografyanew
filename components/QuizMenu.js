import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useScreenScale } from '../utils/screenScale';

console.warn('[DEBUG QuizMenu] module loaded');
const QuizMenu = ({ onSelectTurkeyQuiz, onSelectWorldQuiz, onSelectMixedQuiz, onBackToMain }) => {
  console.warn('[DEBUG QuizMenu] component body start');
  const { width, height } = useWindowDimensions();
  const { scale, moderateScale } = useScreenScale();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;

  const menuButtonStyle = isMobile
    ? { ...styles.menuButton, maxWidth: scale(320), borderRadius: scale(14), padding: scale(14) }
    : { ...styles.menuButton, maxWidth: scale(400), borderRadius: scale(22), padding: scale(28) };
  const menuContainerStyle = isMobile
    ? { ...styles.menuContainer, padding: scale(12), paddingTop: scale(12), gap: scale(10) }
    : { ...styles.menuContainer, padding: scale(24), paddingTop: scale(28), gap: scale(20) };
  const buttonTitleStyle = isMobile
    ? { ...styles.buttonTitle, fontSize: 20, marginBottom: scale(4) }
    : { ...styles.buttonTitle, fontSize: moderateScale(30), marginBottom: scale(8) };
  const buttonSubtitleStyle = isMobile
    ? { ...styles.buttonSubtitle, fontSize: 13, lineHeight: 18 }
    : { ...styles.buttonSubtitle, fontSize: moderateScale(16), lineHeight: scale(22) };
  const iconContainerStyle = isMobile
    ? { ...styles.iconContainer, width: scale(44), height: scale(44), borderRadius: scale(22) }
    : { ...styles.iconContainer, width: scale(76), height: scale(76), borderRadius: scale(38) };
  const iconStyle = isMobile
    ? { ...styles.icon, fontSize: moderateScale(26) }
    : { ...styles.icon, fontSize: moderateScale(44) };
  const textContainerStyle = isMobile
    ? { ...styles.textContainer, paddingRight: scale(10), flex: 1, minWidth: 100 }
    : { ...styles.textContainer, paddingRight: scale(18) };
  const headerStyle = isMobile ? { ...styles.header, paddingTop: scale(10), paddingBottom: 0, paddingHorizontal: scale(12) } : styles.header;
  const titleStyle = isMobile ? { ...styles.title, fontSize: moderateScale(22), marginBottom: scale(4) } : styles.title;
  const subtitleStyle = isMobile ? { ...styles.subtitle, fontSize: moderateScale(12) } : styles.subtitle;
  const backButtonStyle = isMobile ? { ...styles.backButton, marginBottom: scale(6), paddingVertical: scale(4) } : styles.backButton;
  const backTextStyle = isMobile ? { ...styles.backText, fontSize: 14 } : styles.backText;
  const backIconSize = isMobile ? 20 : 24;

  const overlayContent = (
    <View style={styles.overlay}>
          <View style={headerStyle}>
            <View style={styles.backButtonsColumn}>
              <TouchableOpacity style={backButtonStyle} onPress={onBackToMain}>
                <Ionicons name="home" size={backIconSize} color="#FFFFFF" />
                <Text style={backTextStyle}>Ana Menü</Text>
              </TouchableOpacity>
              <TouchableOpacity style={backButtonStyle} onPress={onBackToMain}>
                <Ionicons name="chevron-back" size={backIconSize} color="#FFFFFF" />
                <Text style={backTextStyle}>Geri</Text>
              </TouchableOpacity>
            </View>
            <Text style={titleStyle}>✅ Quiz Modu</Text>
            <Text style={subtitleStyle}>Test formatında sorular</Text>
          </View>

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[menuContainerStyle, styles.menuContainerScroll]}>
              <TouchableOpacity style={[menuButtonStyle, styles.turkeyButton]} onPress={() => onSelectTurkeyQuiz()} activeOpacity={0.9}>
                <View style={styles.buttonContent}>
                  <View style={textContainerStyle}>
                    <Text style={buttonTitleStyle}>Türkiye Quiz</Text>
                    <Text style={buttonSubtitleStyle}>Türkiye coğrafyası hakkında sorular</Text>
                  </View>
                  <View style={iconContainerStyle}>
                    <Text style={iconStyle}>🇹🇷</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[menuButtonStyle, styles.worldButton]} onPress={() => onSelectWorldQuiz()} activeOpacity={0.9}>
                <View style={styles.buttonContent}>
                  <View style={textContainerStyle}>
                    <Text style={buttonTitleStyle}>Dünya Quiz</Text>
                    <Text style={buttonSubtitleStyle}>Dünya coğrafyası hakkında sorular</Text>
                  </View>
                  <View style={iconContainerStyle}>
                    <Text style={iconStyle}>🌍</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[menuButtonStyle, styles.mixedButton]} onPress={() => onSelectMixedQuiz?.()} activeOpacity={0.9}>
                <View style={styles.buttonContent}>
                  <View style={textContainerStyle}>
                    <Text style={buttonTitleStyle}>Karışık Quiz</Text>
                    <Text style={buttonSubtitleStyle}>Bayrak, başkent, Türkiye ve dünya soruları</Text>
                  </View>
                  <View style={iconContainerStyle}>
                    <Text style={iconStyle}>🎯</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
  );

  return (
    <View style={[styles.container, styles.background, { backgroundColor: '#0f172a' }]}>
      {overlayContent}
    </View>
  );
}

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
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
    alignSelf: 'flex-start',
  },
  header: {
    paddingTop: 28,
    paddingBottom: 2,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 10,
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
    paddingTop: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 24,
    width: '100%',
  },
  menuContainerScroll: {
    flex: 0,
    width: '100%',
    maxWidth: 400,
  },
  menuButton: {
    width: '100%',
    maxWidth: 360,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  turkeyButton: {
    backgroundColor: '#F97316',
  },
  worldButton: {
    backgroundColor: '#3B82F6',
  },
  mixedButton: {
    backgroundColor: '#8B5CF6',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  textContainer: {
    flex: 1,
    minWidth: 0,
    paddingRight: 16,
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.95)',
    lineHeight: 20,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
  },
});

export default QuizMenu;
