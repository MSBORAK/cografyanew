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
import * as ScreenOrientation from 'expo-screen-orientation';
import { countryFlags } from '../constants/countryFlags';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';
import { saveWrongAnswer, removeWrongAnswer } from '../utils/practiceMode';

const WorldFlagsQuiz = ({ onBackToMenu, onBackToMain, practiceIds = null }) => {
  const [quizFlags, setQuizFlags] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [options, setOptions] = useState([]);

  const currentFlag = quizFlags[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= quizFlags.length;

  // Shuffle array function
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Generate 4 options (1 correct + 3 wrong)
  const generateOptions = (correctFlag) => {
    const wrongOptions = countryFlags
      .filter(f => f.id !== correctFlag.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [correctFlag, ...wrongOptions];
    return shuffleArray(allOptions);
  };

  // Initialize quiz: pratik modundaysa sadece pratik bayrakları, değilse tümü
  useEffect(() => {
    const source = practiceIds && practiceIds.length > 0
      ? countryFlags.filter((f) => practiceIds.includes(f.id))
      : countryFlags;
    const shuffled = shuffleArray(source);
    setQuizFlags(shuffled);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0]));
    }
  }, [practiceIds]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    loadSounds();
    
    return () => {
      unloadSounds();
    };
  }, []);

  // Update options when question changes
  useEffect(() => {
    if (currentFlag) {
      setOptions(generateOptions(currentFlag));
    }
  }, [currentQuestionIndex]);

  const handleAnswerPress = (option) => {
    if (feedback) return; // Prevent multiple clicks

    setSelectedAnswer(option.id);

    if (option.id === currentFlag.id) {
      removeWrongAnswer('world_flags', currentFlag.id);
      setFeedback('correct');
      setScore(score + 1);
      playCorrectSound();
    } else {
      saveWrongAnswer('world_flags', currentFlag.id, currentFlag.name || currentFlag.id);
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
    const shuffled = shuffleArray(countryFlags);
    setQuizFlags(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0]));
    }
  };

  if (quizFlags.length === 0) {
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
    const percentage = Math.round((score / quizFlags.length) * 100);
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
                <Home size={24} color="#60A5FA" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
              <ChevronLeft size={24} color="#60A5FA" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>Quiz Tamamlandı!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.completedScoreLabel}>Skorunuz</Text>
            <Text style={styles.scoreNumber}>{score} / {quizFlags.length}</Text>
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
              <Home size={24} color="#60A5FA" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#60A5FA" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Soru {currentQuestionIndex + 1} / {quizFlags.length}
          </Text>
          <Text style={styles.scoreText}>Skor: {score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>Bu bayrak hangi ülkeye ait?</Text>
          <View style={styles.flagContainer}>
            <Text style={styles.flagEmoji}>{currentFlag?.flag}</Text>
          </View>
        </View>

        <View style={styles.optionsContainer}>
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option.id;
            const isCorrect = option.id === currentFlag.id;
            
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
                key={option.id}
                style={buttonStyle}
                onPress={() => handleAnswerPress(option)}
                disabled={!!feedback}
                activeOpacity={0.8}
              >
                <Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text>
                <Text style={textStyle}>{option.name}</Text>
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
    color: '#60A5FA',
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
  scoreText: {
    fontSize: 14,
    color: '#34D399',
    fontWeight: 'bold',
  },
  completedScoreLabel: {
    fontSize: 18,
    color: '#94A3B8',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  questionCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  flagContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(51, 65, 85, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  flagEmoji: {
    fontSize: 80,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
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
  iconContainer: {
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 32,
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
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#3B82F6',
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
    backgroundColor: '#3B82F6',
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

export default WorldFlagsQuiz;
