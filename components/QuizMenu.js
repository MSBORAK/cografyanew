import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';

const QuizMenu = ({ onSelectTurkeyQuiz, onSelectWorldQuiz, onBackToMain }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                console.log('Geri butonu tıklandı');
                onBackToMain();
              }}
            >
              <ChevronLeft size={24} color="#FFFFFF" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
            <Text style={styles.title}>✅ Quiz Modu</Text>
            <Text style={styles.subtitle}>Test formatında sorular</Text>
          </View>

          {/* Menu Buttons */}
          <View style={styles.menuContainer}>
            {/* Türkiye Quiz */}
            <TouchableOpacity
              style={[styles.menuButton, styles.turkeyButton]}
              onPress={() => {
                console.log('Türkiye Quiz butonu tıklandı');
                onSelectTurkeyQuiz();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Türkiye Quiz</Text>
                  <Text style={styles.buttonSubtitle}>Türkiye coğrafyası hakkında sorular</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🇹🇷</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Dünya Quiz */}
            <TouchableOpacity
              style={[styles.menuButton, styles.worldButton]}
              onPress={() => {
                console.log('Dünya Quiz butonu tıklandı');
                onSelectWorldQuiz();
              }}
              activeOpacity={0.9}
            >
              <View style={styles.buttonContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.buttonTitle}>Dünya Quiz</Text>
                  <Text style={styles.buttonSubtitle}>Dünya coğrafyası hakkında sorular</Text>
                </View>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>🌍</Text>
                </View>
              </View>
            </TouchableOpacity>
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
  menuContainer: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  menuButton: {
    flex: 1,
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  buttonTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  buttonSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
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
