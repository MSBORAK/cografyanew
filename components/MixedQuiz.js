import { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, ChevronLeft, Check, X, RotateCcw } from 'lucide-react-native';
import { getMixedQuizQuestions } from '../utils/mixedQuizPool';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const shuffleArray = (array) => {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const getOptionsForDifficulty = (options, correctAnswer, difficulty) => {
  if (!options || !correctAnswer) return options || [];
  const wrong = options.filter((o) => o !== correctAnswer);
  if (difficulty === 'easy' || difficulty === 'medium') return shuffleArray(options);
  if (difficulty === 'hard') return shuffleArray([correctAnswer, ...shuffleArray(wrong).slice(0, 2)]);
  if (difficulty === 'ultra') return shuffleArray([correctAnswer, ...shuffleArray(wrong).slice(0, 1)]);
  return shuffleArray(options);
};

export default function MixedQuiz({ onBackToMenu, onBackToMain, difficulty = 'medium' }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = questions[currentIndex];
  const isCompleted = currentIndex >= questions.length;

  const displayOptions = useMemo(
    () =>
      currentQuestion
        ? getOptionsForDifficulty(currentQuestion.options, currentQuestion.correctAnswer, difficulty)
        : [],
    [currentQuestion, currentIndex, difficulty]
  );

  useEffect(() => {
    setQuestions(getMixedQuizQuestions(undefined, difficulty));
  }, [difficulty]);

  useEffect(() => {
    loadSounds();
    return () => unloadSounds();
  }, []);

  const handleAnswerPress = (option) => {
    if (feedback) return;
    setSelectedAnswer(option);
    const correct = option === currentQuestion.correctAnswer;
    if (correct) {
      setFeedback('correct');
      setScore((s) => s + 1);
      playCorrectSound();
    } else {
      setFeedback('wrong');
      playWrongSound();
    }
    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      setCurrentIndex((i) => i + 1);
    }, 1500);
  };

  const handleReset = () => {
    setQuestions(getMixedQuizQuestions(undefined, difficulty));
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  if (questions.length === 0) {
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
    const percentage = Math.round((score / questions.length) * 100);
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
                <Home size={24} color="#8B5CF6" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <ChevronLeft size={24} color="#8B5CF6" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>Karışık Quiz Tamamlandı!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>Skorunuz</Text>
            <Text style={styles.scoreNumber}>{score} / {questions.length}</Text>
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

  const isFlag = currentQuestion?.type === 'flag';

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
              <Home size={24} color="#8B5CF6" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#8B5CF6" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>Soru {currentIndex + 1} / {questions.length}</Text>
          <Text style={styles.scoreTextHeader}>Skor: {score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionCard}>
          {isFlag && currentQuestion.displayFlag && (
            <Text style={styles.flagEmoji}>{currentQuestion.displayFlag}</Text>
          )}
          <Text style={styles.questionTitle}>{currentQuestion?.questionText}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {displayOptions.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
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
                <Text style={textStyle}>{option}</Text>
                {iconComponent && <View style={styles.iconWrapper}>{iconComponent}</View>}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    color: '#F8FAFC',
    textAlign: 'center',
    marginTop: 80,
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
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
    marginLeft: 8,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
  scoreTextHeader: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: 'bold',
  },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  questionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  flagEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  optionText: {
    fontSize: 17,
    color: '#F8FAFC',
    fontWeight: '500',
    flex: 1,
  },
  correctButton: {
    backgroundColor: '#059669',
    borderColor: '#10B981',
  },
  correctText: { color: '#FFFFFF' },
  wrongButton: {
    backgroundColor: '#DC2626',
    borderColor: '#EF4444',
  },
  wrongText: { color: '#FFFFFF' },
  iconWrapper: { marginLeft: 8 },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completedEmoji: { fontSize: 64, marginBottom: 16 },
  completedTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    paddingVertical: 24,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  scoreNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  percentageText: {
    fontSize: 18,
    color: '#94A3B8',
    marginTop: 4,
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    gap: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
