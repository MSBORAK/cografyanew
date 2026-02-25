import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { countryCapitals } from '../constants/countryCapitals';

const BACKGROUND_IMAGE = { uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' };

console.warn('[DEBUG CapitalsQuiz] module loaded, countryCapitals length=', countryCapitals?.length);
const list = Array.isArray(countryCapitals) ? countryCapitals : [];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const CapitalsQuiz = ({ onBackToMenu, onBackToMain }) => {
  console.warn('[DEBUG CapitalsQuiz] component body start');
  const [quizItems, setQuizItems] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [options, setOptions] = useState([]);

  const currentItem = quizItems[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= quizItems.length;

  const generateOptions = useCallback((correctItem) => {
    if (!correctItem || !correctItem.capital) return [];
    const wrongOptions = list
      .filter(c => c && c.id !== correctItem.id && c.capital && c.capital !== correctItem.capital)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(c => c.capital);
    const allOptions = [correctItem.capital, ...wrongOptions].filter(Boolean);
    return shuffleArray(allOptions);
  }, []);

  useEffect(() => {
    console.warn('[DEBUG CapitalsQuiz] useEffect init, list.length=', list.length);
    if (list.length === 0) return;
    const shuffled = shuffleArray(list);
    setQuizItems(shuffled);
    if (shuffled.length > 0) setOptions(generateOptions(shuffled[0]));
  }, [generateOptions]);

  useEffect(() => {
    if (currentItem && currentItem.capital) {
      setOptions(generateOptions(currentItem));
    }
  }, [currentQuestionIndex, currentItem, generateOptions]);

  const handleAnswerPress = (option) => {
    if (feedback || !currentItem) return;
    const correct = option === currentItem.capital;
    setSelectedAnswer(option);
    setFeedback(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    }, 1500);
  };

  const handleReset = () => {
    if (list.length === 0) return;
    const shuffled = shuffleArray(list);
    setQuizItems(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    if (shuffled.length > 0) setOptions(generateOptions(shuffled[0]));
  };

  if (quizItems.length === 0 || !currentItem) {
    return (
      <ImageBackground source={BACKGROUND_IMAGE} style={styles.container} blurRadius={3}>
        <View style={[styles.container, styles.loadingContainer]}>
          <Text style={styles.loadingText}>Yükleniyor...</Text>
        </View>
      </ImageBackground>
    );
  }

  if (isCompleted) {
    const percentage = Math.round((score / quizItems.length) * 100);
    return (
      <ImageBackground source={BACKGROUND_IMAGE} style={styles.container} blurRadius={3}>
        <View style={styles.header}>
          <View style={styles.backButtonsColumn}>
            {onBackToMain && (
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Ionicons name="home" size={20} color="#60A5FA" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <Ionicons name="chevron-back" size={20} color="#60A5FA" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>Quiz Tamamlandı!</Text>
          <Text style={styles.completedSub}>Başkentler</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.completedScoreLabel}>Skorunuz</Text>
            <Text style={styles.scoreNumber}>{score} / {quizItems.length}</Text>
            <Text style={styles.percentageText}>%{percentage}</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Ionicons name="refresh" size={20} color="#FFFFFF" />
            <Text style={styles.resetButtonText}>Yeniden Başla</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={styles.container} blurRadius={3}>
      <View style={styles.header}>
        <View style={styles.backButtonsColumn}>
          {onBackToMain && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <Ionicons name="home" size={20} color="#60A5FA" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <Ionicons name="chevron-back" size={20} color="#60A5FA" />
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

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionCard}>
          <Text style={styles.questionLabel}>
            {currentItem?.country} başkenti neresidir?
          </Text>
          <View style={styles.flagWrapper}>
            <View style={styles.flagContainer}>
              <Text style={styles.flagEmoji}>🏛️</Text>
            </View>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {(currentItem ? options : []).map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = currentItem && option === currentItem.capital;
            
            let buttonStyle = styles.optionButton;
            let textStyle = styles.optionText;
            let iconComponent = null;

            if (feedback && isSelected) {
              if (feedback === 'correct') {
                buttonStyle = [styles.optionButton, styles.correctButton];
                textStyle = [styles.optionText, styles.correctText];
                iconComponent = <Ionicons name="checkmark" size={20} color="#FFFFFF" />;
              } else {
                buttonStyle = [styles.optionButton, styles.wrongButton];
                textStyle = [styles.optionText, styles.wrongText];
                iconComponent = <Ionicons name="close" size={20} color="#FFFFFF" />;
              }
            } else if (feedback && isCorrect) {
              buttonStyle = [styles.optionButton, styles.correctButton];
              textStyle = [styles.optionText, styles.correctText];
              iconComponent = <Ionicons name="checkmark" size={20} color="#FFFFFF" />;
            }

            return (
              <TouchableOpacity
                key={option + index}
                style={buttonStyle}
                onPress={() => setTimeout(() => handleAnswerPress(option), 0)}
                disabled={!!feedback}
                activeOpacity={0.8}
              >
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
                <Text style={textStyle}>{option}</Text>
                {iconComponent && <View style={styles.iconContainer}>{iconComponent}</View>}
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
    marginRight: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginBottom: 4,
  },
  backText: {
    fontSize: 12,
    color: '#60A5FA',
    fontWeight: '600',
    marginLeft: 8,
  },
  progressContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  headerScoreText: {
    fontSize: 12,
    color: '#34D399',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 44,
    paddingVertical: 6,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  questionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    maxWidth: 240,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94A3B8',
    marginBottom: 6,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  flagWrapper: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
  },
  flagContainer: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    overflow: 'hidden',
  },
  flagEmoji: {
    fontSize: 42,
  },
  optionsContainer: {
    flex: 1,
    gap: 4,
    width: '100%',
    minHeight: 0,
    justifyContent: 'flex-start',
  },
  optionButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(51, 65, 85, 0.8)',
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 22,
    marginRight: 6,
  },
  optionText: {
    flex: 1,
    fontSize: 12,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  correctText: {
    color: '#FFFFFF',
  },
  wrongText: {
    color: '#FFFFFF',
  },
  iconContainer: {
    marginLeft: 8,
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  completedEmoji: {
    fontSize: 56,
    marginBottom: 12,
  },
  completedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 2,
    textAlign: 'center',
  },
  completedSub: {
    fontSize: 12,
    color: '#94A3B8',
    marginBottom: 20,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 260,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  completedScoreLabel: {
    fontSize: 12,
    color: '#94A3B8',
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginVertical: 6,
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#10B981',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
});

export default CapitalsQuiz;
