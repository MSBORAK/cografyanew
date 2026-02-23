import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, ChevronLeft, Check, X, RotateCcw } from 'lucide-react-native';
import { countryCapitals } from '../constants/countryCapitals';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const CapitalsQuiz = ({ onBackToMenu, onBackToMain }) => {
  const [quizItems, setQuizItems] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [options, setOptions] = useState([]);

  const currentItem = quizItems[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= quizItems.length;

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const generateOptions = (correctItem) => {
    const wrongOptions = countryCapitals
      .filter(c => c.id !== correctItem.id && c.capital !== correctItem.capital)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.capital);
    
    const allOptions = [correctItem.capital, ...wrongOptions];
    return shuffleArray(allOptions);
  };

  useEffect(() => {
    const shuffled = shuffleArray(countryCapitals);
    setQuizItems(shuffled);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0]));
    }
  }, []);

  useEffect(() => {
    loadSounds();
    return () => unloadSounds();
  }, []);

  useEffect(() => {
    if (currentItem) {
      setOptions(generateOptions(currentItem));
    }
  }, [currentQuestionIndex]);

  const handleAnswerPress = (option) => {
    if (feedback) return;

    setSelectedAnswer(option);

    if (option === currentItem.capital) {
      setFeedback('correct');
      setScore(score + 1);
      playCorrectSound();
    } else {
      setFeedback('wrong');
      playWrongSound();
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }, 1500);
  };

  const handleReset = () => {
    const shuffled = shuffleArray(countryCapitals);
    setQuizItems(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0]));
    }
  };

  if (quizItems.length === 0) {
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.container}
        blurRadius={3}
      >
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </ImageBackground>
    );
  }

  if (isCompleted) {
    const percentage = Math.round((score / quizItems.length) * 100);
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.container}
        blurRadius={3}
      >
        <View style={styles.header}>
          <View style={styles.backButtonsColumn}>
            {onBackToMain && (
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Home size={24} color="#0EA5E9" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <ChevronLeft size={24} color="#0EA5E9" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🏛️</Text>
          <Text style={styles.completedTitle}>Quiz Tamamlandı!</Text>
          <Text style={styles.completedSub}>Başkentler</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.completedScoreLabel}>Skorunuz</Text>
            <Text style={styles.scoreNumber}>{score} / {quizItems.length}</Text>
            <Text style={styles.percentageText}>%{percentage}</Text>
          </View>
          
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.resetButtonText}>Yeniden Başla</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <View style={styles.backButtonsColumn}>
          {onBackToMain && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <Home size={24} color="#0EA5E9" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#0EA5E9" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Soru {currentQuestionIndex + 1} / {quizItems.length}
          </Text>
          <Text style={styles.headerScoreText}>Skor: {score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>{currentItem?.country}</Text>
          <Text style={styles.questionSub}>Başkenti neresidir?</Text>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🏛️</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentItem.capital;
            
            let buttonStyle = styles.optionButton;
            let textStyle = styles.optionText;
            let iconComponent = null;

            if (feedback && isSelected) {
              if (feedback === 'correct') {
                buttonStyle = [styles.optionButton, styles.correctButton];
                textStyle = [styles.optionText, styles.correctText];
                iconComponent = <Check size={24} color="#FFFFFF" strokeWidth={3} />;
              } else {
                buttonStyle = [styles.optionButton, styles.wrongButton];
                textStyle = [styles.optionText, styles.wrongText];
                iconComponent = <X size={24} color="#FFFFFF" strokeWidth={3} />;
              }
            } else if (feedback && isCorrect) {
              buttonStyle = [styles.optionButton, styles.correctButton];
              textStyle = [styles.optionText, styles.correctText];
              iconComponent = <Check size={24} color="#FFFFFF" strokeWidth={3} />;
            }

            return (
              <TouchableOpacity
                key={option + index}
                style={buttonStyle}
                onPress={() => handleAnswerPress(option)}
                disabled={!!feedback}
                activeOpacity={0.8}
              >
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
                <Text style={textStyle}>{option}</Text>
                {iconComponent && <View style={styles.iconWrapper}>{iconComponent}</View>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  header: {
    paddingTop: 62,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backText: {
    fontSize: 16,
    color: '#0EA5E9',
    fontWeight: '600',
    marginLeft: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  headerScoreText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  questionLabel: {
    fontSize: 40,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
    textAlign: 'center',
  },
  questionSub: {
    fontSize: 30,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(14, 165, 233, 0.5)',
  },
  icon: {
    fontSize: 44,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  correctButton: {
    backgroundColor: '#10B981',
    borderColor: '#059669',
  },
  wrongButton: {
    backgroundColor: '#EF4444',
    borderColor: '#DC2626',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(51, 65, 85, 0.8)',
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  correctText: {
    color: '#FFFFFF',
  },
  wrongText: {
    color: '#FFFFFF',
  },
  iconWrapper: {
    marginLeft: 8,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  completedEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  completedSub: {
    fontSize: 16,
    color: '#94A3B8',
    marginBottom: 28,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  completedScoreLabel: {
    fontSize: 14,
    color: '#94A3B8',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#0EA5E9',
    marginVertical: 8,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#10B981',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0EA5E9',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 100,
  },
});

export default CapitalsQuiz;
