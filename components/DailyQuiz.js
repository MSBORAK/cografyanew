import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { Home, ChevronLeft, Check, X } from 'lucide-react-native';
import { countryFlags } from '../constants/countryFlags';
import { getDateString, getTodaysQuestions, getOptionsForQuestion, DAILY_QUIZ_TOTAL_QUESTIONS } from '../utils/dailyQuizSeed';
import * as geoStorage from '../utils/geoStorage';
import { updateStreak } from '../utils/streakUtils';
import { addXP, getTotalXP, getLevelInfo, XP_CORRECT, XP_DAILY_COMPLETE } from '../utils/xpLevelUtils';
import { checkAndUnlockBadges } from '../utils/badgeUtils';
import { loadSounds, unloadSounds, playCorrectSound, playWrongSound } from '../utils/soundEffects';

const DailyQuiz = ({ onBackToMenu, onBackToMain, onBadgesUnlocked }) => {
  const [ready, setReady] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [streakResult, setStreakResult] = useState(null);

  const total = DAILY_QUIZ_TOTAL_QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const options = currentQuestion
    ? getOptionsForQuestion(currentQuestion, countryFlags, currentIndex, dateStr)
    : [];

  const loadProgress = useCallback(async () => {
    const today = getDateString();
    setDateStr(today);
    const q = getTodaysQuestions(countryFlags, today);
    setQuestions(q);
    const progress = await geoStorage.getDailyProgress(today);
    const alreadyCompleted = await geoStorage.isDailyCompleted(today);
    if (alreadyCompleted || progress.answered >= total) {
      setCompleted(true);
      const streak = await geoStorage.getJSON(geoStorage.keys.currentStreak(), 0);
      setStreakResult({ currentStreak: streak });
      setAnswered(total);
      setCorrect(progress.correct);
      setReady(true);
      return;
    }
    setAnswered(progress.answered);
    setCorrect(progress.correct);
    setCurrentIndex(progress.answered);
    setReady(true);
  }, [total]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  useEffect(() => {
    loadSounds();
    return () => unloadSounds();
  }, []);

  const handleAnswer = async (option) => {
    if (feedback) return;
    const isCorrect = option.id === currentQuestion.id;
    setSelectedId(option.id);
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) {
      playCorrectSound();
      await addXP(XP_CORRECT);
    } else {
      playWrongSound();
    }

    const newAnswered = answered + 1;
    const newCorrect = correct + (isCorrect ? 1 : 0);

    await geoStorage.setDailyProgress(dateStr, {
      answered: newAnswered,
      correct: newCorrect,
      total,
    });
    setAnswered(newAnswered);
    setCorrect(newCorrect);

    setTimeout(async () => {
      setFeedback(null);
      setSelectedId(null);
      if (newAnswered >= total) {
        await geoStorage.setDailyCompleted(dateStr);
        await addXP(XP_DAILY_COMPLETE);
        const res = await updateStreak(dateStr);
        setStreakResult(res);
        setCompleted(true);
        const totalXP = await getTotalXP();
        const level = getLevelInfo(totalXP).level;
        const newBadges = await checkAndUnlockBadges({
          dailyCompletedToday: true,
          perfectScore: newCorrect === 10,
          currentStreak: res.currentStreak,
          bestStreak: res.bestStreak,
          totalXP,
          level,
        });
        if (newBadges.length > 0 && onBadgesUnlocked) onBadgesUnlocked(newBadges);
      } else {
        setCurrentIndex(newAnswered);
      }
    }, 1200);
  };

  if (!ready) {
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

  if (completed) {
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
    return (
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.container}
        blurRadius={3}
      >
        <View style={styles.header}>
          {onBackToMain && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <Home size={24} color="#F59E0B" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#F59E0B" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.completedContainer}>
          <Text style={styles.completedEmoji}>🎉</Text>
          <Text style={styles.completedTitle}>Bugünün görevini tamamladın!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>Skor</Text>
            <Text style={styles.scoreNumber}>{correct} / {total}</Text>
            <Text style={styles.percentageText}>%{percentage}</Text>
          </View>
          {streakResult && streakResult.currentStreak > 0 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakEmoji}>🔥</Text>
              <Text style={styles.streakText}>{streakResult.currentStreak} günlük seri!</Text>
            </View>
          )}
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
        {onBackToMain && (
          <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
            <Home size={24} color="#F59E0B" />
            <Text style={styles.backText}>Ana Menü</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <ChevronLeft size={24} color="#F59E0B" />
          <Text style={styles.backText}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.progressText}>Günlük Quiz • {answered} / {total}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} style={styles.scroll}>
        <Text style={styles.questionLabel}>Bu bayrak hangi ülkeye ait?</Text>
        <View style={styles.flagContainer}>
          <Text style={styles.flagEmoji}>{currentQuestion?.flag}</Text>
        </View>
        <View style={styles.optionsContainer}>
          {options.map((opt) => {
            let btnStyle = styles.optionButton;
            if (feedback && selectedId === opt.id) {
              btnStyle = feedback === 'correct' ? styles.optionCorrect : styles.optionWrong;
            }
            return (
              <TouchableOpacity
                key={opt.id}
                style={btnStyle}
                onPress={() => handleAnswer(opt)}
                disabled={!!feedback}
                activeOpacity={0.8}
              >
                <Text style={styles.optionText}>{opt.name}</Text>
                {feedback && selectedId === opt.id && (
                  feedback === 'correct' ? <Check size={20} color="#FFF" /> : <X size={20} color="#FFF" />
                )}
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
  loadingText: {
    fontSize: 18,
    color: '#E2E8F0',
    textAlign: 'center',
    marginTop: 80,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginRight: 8,
    gap: 4,
  },
  backText: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
  progressText: {
    flex: 1,
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
  },
  scroll: { flex: 1 },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  questionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 20,
  },
  flagContainer: {
    alignItems: 'center',
    marginVertical: 24,
    padding: 32,
    backgroundColor: 'rgba(30, 41, 59, 0.8)',
    borderRadius: 20,
  },
  flagEmoji: {
    fontSize: 80,
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
    borderWidth: 2,
    borderColor: 'rgba(148, 163, 184, 0.3)',
  },
  optionCorrect: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#059669',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#34D399',
  },
  optionWrong: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#DC2626',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#F87171',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  completedEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  completedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 24,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    paddingVertical: 24,
    paddingHorizontal: 48,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 4,
  },
  scoreNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#F59E0B',
  },
  percentageText: {
    fontSize: 18,
    color: '#34D399',
    marginTop: 4,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(251, 146, 60, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 8,
  },
  streakEmoji: { fontSize: 28 },
  streakText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F59E0B',
  },
});

export default DailyQuiz;
