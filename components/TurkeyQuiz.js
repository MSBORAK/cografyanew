import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, Check, X, RotateCcw } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { turkeyQuizQuestions } from '../constants/turkeyQuizQuestions';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const TurkeyQuiz = ({ onBackToMenu }) => {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isCompleted = currentQuestionIndex >= quizQuestions.length;

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  useEffect(() => {
    setQuizQuestions(shuffleArray(turkeyQuizQuestions));
  }, []);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    loadSounds();
    return () => { unloadSounds(); };
  }, []);

  const handleAnswerPress = (option) => {
    if (feedback) return;
    setSelectedAnswer(option);

    if (option === currentQuestion.correctAnswer) {
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
    setQuizQuestions(shuffleArray(turkeyQuizQuestions));
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setFeedback(null);
  };

  if (quizQuestions.length === 0) {
    return <View style={styles.container}><Text style={styles.loadingText}>Yükleniyor...</Text></View>;
  }

  if (isCompleted) {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <Home size={24} color="#F97316" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>Quiz Tamamlandı!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>Skorunuz</Text>
            <Text style={styles.scoreNumber}>{score} / {quizQuestions.length}</Text>
            <Text style={styles.percentageText}>%{percentage}</Text>
          </View>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <RotateCcw size={20} color="#FFFFFF" />
            <Text style={styles.resetButtonText}>Yeniden Başla</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#F97316" />
          <Text style={styles.backText}>Geri</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Soru {currentQuestionIndex + 1} / {quizQuestions.length}</Text>
          <Text style={styles.scoreTextHeader}>Skor: {score}</Text>
        </View>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionCard}>
          <Text style={styles.questionTitle}>{currentQuestion?.question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion?.options.map((option, index) => {
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
              <TouchableOpacity key={index} style={buttonStyle} onPress={() => handleAnswerPress(option)} disabled={!!feedback} activeOpacity={0.8}>
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
  container: { flex: 1 },
  header: { paddingTop: 50, paddingBottom: 16, paddingHorizontal: 20, backgroundColor: 'rgba(255, 255, 255, 0.95)', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  backText: { fontSize: 16, color: '#F97316', fontWeight: '600', marginLeft: 8 },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 14, color: '#6B7280', fontWeight: '600' },
  scoreTextHeader: { fontSize: 14, color: '#10B981', fontWeight: 'bold' },
  content: { flex: 1 },
  contentContainer: { padding: 20 },
  questionCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
  questionTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', textAlign: 'center', lineHeight: 28 },
  optionsContainer: { gap: 12 },
  optionButton: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 2, borderColor: '#E5E7EB', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  correctButton: { backgroundColor: '#10B981', borderColor: '#059669' },
  wrongButton: { backgroundColor: '#EF4444', borderColor: '#DC2626' },
  optionLetter: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3F4F6', color: '#6B7280', fontSize: 16, fontWeight: 'bold', textAlign: 'center', lineHeight: 32, marginRight: 12 },
  optionText: { flex: 1, fontSize: 16, color: '#111827', fontWeight: '600' },
  correctText: { color: '#FFFFFF' },
  wrongText: { color: '#FFFFFF' },
  iconContainer: { marginLeft: 8 },
  completedContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  completedEmoji: { fontSize: 80, marginBottom: 16 },
  completedTitle: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 32 },
  scoreCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 32, alignItems: 'center', width: '100%', maxWidth: 300, marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  scoreText: { fontSize: 18, color: '#6B7280', marginBottom: 8 },
  scoreNumber: { fontSize: 48, fontWeight: 'bold', color: '#F97316', marginVertical: 8 },
  percentageText: { fontSize: 24, fontWeight: '600', color: '#10B981' },
  resetButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F97316', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 16, gap: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
  resetButtonText: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  loadingText: { fontSize: 18, color: '#6B7280', textAlign: 'center', marginTop: 100 },
});

export default TurkeyQuiz;
