import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const MainMenu = ({ onSelectTurkey, onSelectWorld, onSelectWorldFlags, onSelectQuizMode, onSelectPracticeMode, onSelectLearningMode }) => {
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

          <View style={styles.menuContainer}>
            {/* Türkiye Haritası Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.turkeyButton]}
              onPress={() => {
                console.log('Türkiye butonu tıklandı');
                onSelectTurkey();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Türkiye Haritası</Text>
                  <Text style={styles.buttonSubtitle}>Şehirleri ve bölgeleri tanı.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🇹🇷</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Dünya Haritası Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.worldButton]}
              onPress={() => {
                console.log('Dünya butonu tıklandı');
                onSelectWorld();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Dünya Haritası</Text>
                  <Text style={styles.buttonSubtitle}>Kıtalar ve ülkeler arası yolculuk.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🌍</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Bayrak Quiz Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.flagsButton]}
              onPress={() => {
                console.log('Bayrak Quiz butonu tıklandı');
                onSelectWorldFlags();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Bayrak Quiz</Text>
                  <Text style={styles.buttonSubtitle}>Dünya bayraklarını test et.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🚩</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Quiz Modu Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.quizButton]}
              onPress={() => {
                console.log('Quiz Modu butonu tıklandı');
                onSelectQuizMode();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Quiz Modu</Text>
                  <Text style={styles.buttonSubtitle}>Coğrafya bilgini test et.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>✅</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Pratik Modu Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.practiceButton]}
              onPress={() => {
                console.log('Pratik Modu butonu tıklandı');
                onSelectPracticeMode();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Pratik Modu</Text>
                  <Text style={styles.buttonSubtitle}>Yanlışlarını tekrar et.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>📚</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Öğrenme Modu Butonu */}
            <TouchableOpacity
              style={[styles.menuButton, styles.learningButton]}
              onPress={() => {
                console.log('Öğrenme Modu butonu tıklandı');
                onSelectLearningMode();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Öğrenme Modu</Text>
                  <Text style={styles.buttonSubtitle}>İlginç bilgilerle öğren.</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🧠</Text>
                </View>
              </View>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 32,
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
    marginBottom: 24,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 500,
    gap: 12,
  },
  menuButton: {
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  turkeyButton: {
    backgroundColor: '#F97316',
  },
  worldButton: {
    backgroundColor: '#3B82F6',
  },
  flagsButton: {
    backgroundColor: '#8B5CF6',
  },
  quizButton: {
    backgroundColor: '#10B981',
  },
  practiceButton: {
    backgroundColor: '#EC4899',
  },
  learningButton: {
    backgroundColor: '#10B981',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 28,
  },
  footer: {
    marginTop: 20,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default MainMenu;
