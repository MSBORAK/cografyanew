import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
} from 'react-native';
import { Home } from 'lucide-react-native';
import { EXAM_PRESETS } from '../constants/examPresets';

const ExamCountdown = ({ onBackToMenu }) => {
  const { width } = useWindowDimensions();
  const isWide = width >= 600;
  const [countdowns, setCountdowns] = useState([]);

  const getDaysLeft = (dateStr) => {
    const target = new Date(dateStr);
    target.setHours(9, 0, 0, 0);
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return { days: 0, isPast: true };
    return { days: Math.floor(diff / (1000 * 60 * 60 * 24)), isPast: false };
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const day = d.getDate().toString().padStart(2, '0');
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${day} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const getMonthLabel = (dateStr) => {
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return months[new Date(dateStr).getMonth()];
  };

  useEffect(() => {
    const update = () => {
      setCountdowns(
        EXAM_PRESETS.map((exam) => ({
          ...exam,
          ...getDaysLeft(exam.date),
        }))
      );
    };
    update();
    const interval = setInterval(update, 60000);
    return () => clearInterval(interval);
  }, []);

  const ExamCard = ({ exam, compact }) => (
    <View style={[styles.examCard, { borderLeftColor: exam.color }, compact && styles.examCardCompact]}>
      <View style={styles.examInfo}>
        <Text style={[styles.examName, compact && styles.examNameCompact]} numberOfLines={1}>{exam.name}</Text>
        <Text style={[styles.examDate, compact && styles.examDateCompact]}>{formatDate(exam.date)}</Text>
      </View>
      <View style={[styles.daysBadge, exam.isPast && styles.daysBadgePast, compact && styles.daysBadgeCompact]}>
        <Text style={[styles.daysNumber, exam.isPast && styles.daysNumberPast, compact && styles.daysNumberCompact]}>
          {exam.isPast ? 'Geçti' : exam.days}
        </Text>
        {!exam.isPast && <Text style={[styles.daysLabel, compact && styles.daysLabelCompact]}>gün</Text>}
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#F59E0B" />
          <Text style={styles.backText}>Ana Menü</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Sınav Sayaç</Text>
        <Text style={styles.subtitle}>ÖSYM sınavlarına kalan gün</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, isWide && styles.scrollContentWide]}
        showsVerticalScrollIndicator={false}
      >
        {isWide ? (
          // Grid: 2 sütun, ay grupları
          (() => {
            const byMonth = {};
            const monthOrder = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
            countdowns.forEach((exam) => {
              const m = getMonthLabel(exam.date);
              if (!byMonth[m]) byMonth[m] = [];
              byMonth[m].push(exam);
            });
            const months = monthOrder.filter((m) => byMonth[m]);
            return (
              <View style={styles.gridContainer}>
                {months.filter((m) => byMonth[m]).map((month) => (
                  <View key={month} style={styles.monthSection}>
                    <View style={styles.monthHeader}>
                      <View style={styles.monthLine} />
                      <Text style={styles.monthLabel}>{month} 2026</Text>
                      <View style={styles.monthLine} />
                    </View>
                    <View style={styles.gridRow}>
                      {byMonth[month].map((exam, i) => (
                        <View key={exam.id} style={styles.gridCard}>
                          <ExamCard exam={exam} compact />
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            );
          })()
        ) : (
          // Timeline: ortada çizgi, kartlar sağ-sol
          <View style={styles.timelineContainer}>
            <View style={styles.timelineLine} />
            {countdowns.map((exam, index) => (
              <View
                key={exam.id}
                style={[
                  styles.timelineRow,
                  index % 2 === 0 ? styles.timelineRowLeft : styles.timelineRowRight,
                ]}
              >
                {index % 2 === 0 ? (
                  <>
                    <View style={styles.timelineCardWrap}>
                      <ExamCard exam={exam} />
                    </View>
                    <View style={[styles.timelineDot, { backgroundColor: exam.color }]} />
                    <View style={styles.timelineSpacer} />
                  </>
                ) : (
                  <>
                    <View style={styles.timelineSpacer} />
                    <View style={[styles.timelineDot, { backgroundColor: exam.color }]} />
                    <View style={styles.timelineCardWrap}>
                      <ExamCard exam={exam} />
                    </View>
                  </>
                )}
              </View>
            ))}
          </View>
        )}

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>📅 Sınav tarihleri ÖSYM takvimine göre değişebilir.</Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  backText: { fontSize: 16, color: '#F59E0B', fontWeight: '600', marginLeft: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#94A3B8' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  scrollContentWide: { paddingHorizontal: 24 },

  // Timeline
  timelineContainer: { position: 'relative', paddingVertical: 8 },
  timelineLine: {
    position: 'absolute',
    left: '50%',
    marginLeft: -2,
    top: 16,
    bottom: 16,
    width: 4,
    backgroundColor: 'rgba(245, 158, 11, 0.4)',
    borderRadius: 2,
  },
  timelineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  timelineRowLeft: { justifyContent: 'flex-start' },
  timelineRowRight: { justifyContent: 'flex-end' },
  timelineSpacer: { width: 24, height: 1 },
  timelineDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  timelineCardWrap: { flex: 1, maxWidth: '48%' },

  // Grid
  gridContainer: { gap: 24 },
  monthSection: { marginBottom: 8 },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  monthLine: { flex: 1, height: 1, backgroundColor: 'rgba(245, 158, 11, 0.4)' },
  monthLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F59E0B',
    letterSpacing: 0.5,
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridCard: { flex: 1, minWidth: '45%' },

  // Card
  examCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  examCardCompact: { padding: 14 },
  examInfo: { flex: 1, marginRight: 12 },
  examName: { fontSize: 17, fontWeight: 'bold', color: '#111827', marginBottom: 2 },
  examNameCompact: { fontSize: 15 },
  examDate: { fontSize: 12, color: '#6B7280' },
  examDateCompact: { fontSize: 11 },
  daysBadge: {
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    minWidth: 56,
  },
  daysBadgeCompact: { paddingVertical: 8, paddingHorizontal: 10, minWidth: 48 },
  daysBadgePast: { backgroundColor: 'rgba(107, 114, 128, 0.2)' },
  daysNumber: { fontSize: 22, fontWeight: 'bold', color: '#B45309' },
  daysNumberCompact: { fontSize: 18 },
  daysNumberPast: { fontSize: 13, color: '#6B7280' },
  daysLabel: { fontSize: 10, color: '#92400E', marginTop: 1 },
  daysLabelCompact: { fontSize: 9 },
  daysLabelPast: { opacity: 0 },

  noteCard: {
    marginTop: 24,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    borderRadius: 12,
    padding: 16,
  },
  noteText: { fontSize: 12, color: '#64748B', textAlign: 'center' },
});

export default ExamCountdown;
