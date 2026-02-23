import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions, Platform, ScrollView } from 'react-native';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { Lock } from 'lucide-react-native';
import { getDailyQuote } from '../constants/dailyQuotes';
import { getDateString } from '../utils/dailyQuizSeed';
import * as geoStorage from '../utils/geoStorage';
import { getStreak } from '../utils/streakUtils';
import { getTotalXP, getLevelInfo } from '../utils/xpLevelUtils';
import { checkAndUnlockBadges } from '../utils/badgeUtils';
import { getUnlockedPremiumIds, isPremiumFeature } from '../utils/premiumLock';
import BadgeListModal from './BadgeListModal';

const menuItems = [
  { id: 'turkey', title: 'Türkiye Haritası', subtitle: 'Şehirleri ve bölgeleri tanı', icon: '🇹🇷', color: '#F97316', onPress: 'onSelectTurkey' },
  { id: 'world', title: 'Dünya Haritası', subtitle: 'Kıtalar ve ülkeler', icon: '🌍', color: '#3B82F6', onPress: 'onSelectWorld' },
  { id: 'flags', title: 'Bayrak Quiz', subtitle: 'Dünya bayraklarını test et', icon: '🚩', color: '#8B5CF6', onPress: 'onSelectWorldFlags' },
  { id: 'capitals', title: 'Başkentler Quiz', subtitle: 'Ülke başkentlerini test et', icon: '🏛️', color: '#0EA5E9', onPress: 'onSelectCapitalsQuiz' },
  { id: 'quiz', title: 'Quiz Modu', subtitle: 'Bilgini test et', icon: '✅', color: '#10B981', onPress: 'onSelectQuizMode' },
  { id: 'practice', title: 'Pratik Modu', subtitle: 'Yanlışlarını tekrar et', icon: '📚', color: '#EC4899', onPress: 'onSelectPracticeMode' },
  { id: 'learning', title: 'Öğrenme Modu', subtitle: 'İlginç bilgilerle öğren', icon: '🧠', color: '#059669', onPress: 'onSelectLearningMode' },
  { id: 'keywords', title: 'Anahtar Kelimeler', subtitle: 'Coğrafya kavramları ve tanımlar', icon: '📖', color: '#F59E0B', onPress: 'onSelectGeographyKeywords' },
  { id: 'app-logic', title: 'Uygulama Mantığı', subtitle: 'Nasıl çalışır?', icon: '📋', color: '#64748B', onPress: 'onSelectAppLogic' },
];

const MainMenu = ({ onSelectTurkey, onSelectWorld, onSelectWorldFlags, onSelectCapitalsQuiz, onSelectQuizMode, onSelectPracticeMode, onSelectLearningMode, onSelectGeographyKeywords, onSelectAppLogic, onSelectDidYouKnow, onSelectExamCountdown, onSelectDailyQuiz, onBadgesUnlocked, onRequestUnlock, refreshPremiumKey = 0 }) => {
  const { width, height } = useWindowDimensions();
  const dailyQuote = useMemo(() => getDailyQuote(), []);
  const shortSide = Math.min(width, height);
  const isIOSTablet = Platform.OS === 'ios' && shortSide >= 600;
  const handlers = { onSelectTurkey, onSelectWorld, onSelectWorldFlags, onSelectCapitalsQuiz, onSelectQuizMode, onSelectPracticeMode, onSelectLearningMode, onSelectGeographyKeywords, onSelectAppLogic, onSelectDidYouKnow, onSelectExamCountdown, onSelectDailyQuiz };

  const [dailySummary, setDailySummary] = useState({ answered: 0, correct: 0, total: 20, completed: false });
  const [streak, setStreak] = useState({ currentStreak: 0, bestStreak: 0 });
  const [xpInfo, setXpInfo] = useState({ level: 1, totalXP: 0 });
  const [badgeListVisible, setBadgeListVisible] = useState(false);
  const [unlockedPremiumIds, setUnlockedPremiumIds] = useState([]);

  useEffect(() => {
    getUnlockedPremiumIds()
      .then((ids) => setUnlockedPremiumIds(Array.isArray(ids) ? ids : []))
      .catch(() => setUnlockedPremiumIds([]));
  }, [refreshPremiumKey]);

  const loadDailySummary = useCallback(async () => {
    const today = getDateString();
    const progress = await geoStorage.getDailyProgress(today);
    const completed = await geoStorage.isDailyCompleted(today);
    setDailySummary({
      answered: progress.answered,
      correct: progress.correct,
      total: progress.total,
      completed: completed || progress.answered >= progress.total,
    });
    const s = await getStreak();
    setStreak({ currentStreak: s.currentStreak, bestStreak: s.bestStreak });
    const totalXP = await getTotalXP();
    const info = getLevelInfo(totalXP);
    setXpInfo(info);
    const newBadges = await checkAndUnlockBadges({
      dailyCompletedToday: completed,
      perfectScore: completed && progress.total > 0 && progress.correct === progress.total,
      currentStreak: s.currentStreak,
      bestStreak: s.bestStreak,
      totalXP,
      level: info.level,
    });
    if (newBadges.length > 0 && onBadgesUnlocked) onBadgesUnlocked(newBadges);
  }, [onBadgesUnlocked]);

  useEffect(() => {
    loadDailySummary();
  }, [loadDailySummary]);

  const boxStyle = isIOSTablet ? styles.boxIOSTablet : styles.box;
  const iconStyle = isIOSTablet ? styles.boxIconIOSTablet : styles.boxIcon;
  const titleStyle = isIOSTablet ? styles.boxTitleIOSTablet : styles.boxTitle;
  const subtitleStyle = isIOSTablet ? styles.boxSubtitleIOSTablet : styles.boxSubtitle;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
        style={styles.background}
        blurRadius={3}
      >
        <View style={styles.overlay}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.headerRow, Platform.OS === 'ios' && styles.headerRowIOS]}>
              <View style={styles.headerLeftButtons}>
                <TouchableOpacity
                  style={styles.countdownButton}
                  onPress={() => setBadgeListVisible(true)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.countdownIcon}>🏅</Text>
                  <Text style={styles.countdownLabel}>Rozetler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dailyCardCompact}
                  onPress={handlers.onSelectDailyQuiz}
                  activeOpacity={0.9}
                >
                  <View style={styles.dailyCardCompactRow}>
                    <Text style={styles.dailyCardCompactStat}>🔥 {streak.currentStreak}</Text>
                    <Text style={styles.dailyCardCompactStat}>🏆 {streak.bestStreak}</Text>
                    <Text style={styles.dailyCardCompactStat}>⭐ {xpInfo.level}</Text>
                    <Text style={styles.dailyCardCompactStat}>⚡ {xpInfo.totalXP}</Text>
                  </View>
                  {dailySummary.completed ? (
                    <Text style={styles.dailyCardCompactDone}>Tamamlandı 🎉</Text>
                  ) : (
                    <Text style={styles.dailyCardCompactProgress}>Bugün {dailySummary.answered}/{dailySummary.total}</Text>
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.headerSpacer} />
              <TouchableOpacity
                style={styles.countdownButton}
                onPress={handlers.onSelectExamCountdown}
                activeOpacity={0.8}
              >
                <Text style={styles.countdownIcon}>⏱️</Text>
                <Text style={styles.countdownLabel}>Sayaç</Text>
              </TouchableOpacity>
            </View>
            <BadgeListModal visible={badgeListVisible} onClose={() => setBadgeListVisible(false)} />

            <View style={[styles.grid, isIOSTablet && styles.gridIOSTablet]}>
            <View style={[styles.row, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(0, 4).map((item) => {
                const locked = isPremiumFeature(item.id) && !unlockedPremiumIds.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[boxStyle, { backgroundColor: item.color }, locked && styles.menuBoxLocked]}
                    onPress={locked ? (onRequestUnlock ? () => onRequestUnlock(item.id) : handlers[item.onPress]) : handlers[item.onPress]}
                    activeOpacity={0.9}
                  >
                    {locked && (
                      <View style={styles.lockBadge}>
                        <Lock size={18} color="#1E293B" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text style={iconStyle}>{item.icon}</Text>
                    <Text style={titleStyle}>{item.title}</Text>
                    <Text style={subtitleStyle}>{item.subtitle}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={[styles.row, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(4, 8).map((item) => {
                const locked = isPremiumFeature(item.id) && !unlockedPremiumIds.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[boxStyle, { backgroundColor: item.color }, locked && styles.menuBoxLocked]}
                    onPress={locked ? (onRequestUnlock ? () => onRequestUnlock(item.id) : handlers[item.onPress]) : handlers[item.onPress]}
                    activeOpacity={0.9}
                  >
                    {locked && (
                      <View style={styles.lockBadge}>
                        <Lock size={18} color="#1E293B" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text style={iconStyle}>{item.icon}</Text>
                    <Text style={titleStyle}>{item.title}</Text>
                    <Text style={subtitleStyle}>{item.subtitle}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={[styles.row, isIOSTablet && styles.rowIOSTablet]}>
              {menuItems.slice(8, 9).map((item) => {
                const locked = isPremiumFeature(item.id) && !unlockedPremiumIds.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[boxStyle, { backgroundColor: item.color }, locked && styles.menuBoxLocked]}
                    onPress={locked ? (onRequestUnlock ? () => onRequestUnlock(item.id) : handlers[item.onPress]) : handlers[item.onPress]}
                    activeOpacity={0.9}
                  >
                    {locked && (
                      <View style={styles.lockBadge}>
                        <Lock size={18} color="#1E293B" strokeWidth={2.5} />
                      </View>
                    )}
                    <Text style={iconStyle}>{item.icon}</Text>
                    <Text style={titleStyle}>{item.title}</Text>
                    <Text style={subtitleStyle}>{item.subtitle}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

            <View style={styles.quoteCard}>
            <Text style={styles.quoteLabel}>Günün Sözü</Text>
            <Text style={styles.quoteText}>"{dailyQuote}"</Text>
            </View>

            <TouchableOpacity
            style={styles.triviaCard}
            onPress={handlers.onSelectDidYouKnow}
            activeOpacity={0.85}
          >
            <Text style={styles.triviaLabel}>📍 Nerede Olduğunu Biliyor muydunuz?</Text>
            <Text style={styles.triviaText}>Şehirler hakkında ilginç bilgileri keşfet, tahmin et!</Text>
            </TouchableOpacity>

            <Text style={styles.footer}>Eğlenerek öğren! 🎓</Text>
          </ScrollView>
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
    padding: 16,
    paddingTop: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  headerRowIOS: {
    marginTop: 8,
  },
  headerLeftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerSpacer: { flex: 1 },
  dailyCardCompact: {
    backgroundColor: 'rgba(245, 158, 11, 0.3)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    alignItems: 'flex-end',
  },
  dailyCardCompactRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 4,
  },
  dailyCardCompactStat: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  dailyCardCompactProgress: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FCD34D',
  },
  dailyCardCompactDone: {
    fontSize: 12,
    fontWeight: '600',
    color: '#34D399',
  },
  countdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  countdownIcon: { fontSize: 20 },
  countdownLabel: { fontSize: 13, fontWeight: '600', color: '#FFFFFF' },
  scrollView: { flex: 1 },
  scrollContent: { paddingTop: 40, paddingBottom: 40 },
  grid: {
    paddingHorizontal: 8,
    paddingTop: 54,
    paddingBottom: 8,
  },
  gridIOSTablet: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 12,
  },
  rowIOSTablet: {
    marginBottom: 18,
    gap: 18,
  },
  box: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 140,
    marginHorizontal: 6,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  boxIOSTablet: {
    flex: 1,
    aspectRatio: 1,
    maxWidth: 200,
    minWidth: 160,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuBoxLocked: {
    opacity: 0.95,
  },
  lockBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  boxIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  boxIconIOSTablet: {
    fontSize: 44,
    marginBottom: 10,
  },
  boxTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  boxSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  boxTitleIOSTablet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  boxSubtitleIOSTablet: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  quoteCard: {
    marginTop: 40,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(148, 163, 184, 0.15)',
    borderRadius: 12,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  quoteLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  quoteText: {
    fontSize: 13,
    color: '#E2E8F0',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  triviaCard: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(139, 92, 246, 0.25)',
    borderRadius: 12,
    marginHorizontal: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#8B5CF6',
  },
  triviaLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#C4B5FD',
    marginBottom: 4,
  },
  triviaText: {
    fontSize: 12,
    color: '#E2E8F0',
    lineHeight: 18,
  },
  footer: {
    marginTop: 12,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});

export default MainMenu;
