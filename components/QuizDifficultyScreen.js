import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { ChevronLeft, Home, TrendingUp } from 'lucide-react-native';

const DIFFICULTIES = [
  { id: 'easy', label: 'Kolay', subtitle: '4 şık', color: '#22C55E', emoji: '🌱' },
  { id: 'medium', label: 'Orta', subtitle: '4 şık', color: '#F59E0B', emoji: '🔥' },
  { id: 'hard', label: 'Zor', subtitle: '3 şık', color: '#EF4444', emoji: '💪' },
  { id: 'ultra', label: 'Ultra Zor', subtitle: '2 şık', color: '#7C3AED', emoji: '⚡' },
];

const QuizDifficultyScreen = ({ quizType, quizTitle, onSelectDifficulty, onBack, onBackToMain }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <View style={styles.backButtonsColumn}>
            {onBackToMain && (
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Home size={24} color="#F8FAFC" />
                <Text style={styles.backText}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={24} color="#F8FAFC" />
              <Text style={styles.backText}>Geri</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Zorluk Seçin</Text>
          <Text style={styles.subtitle}>{quizTitle}</Text>
        </View>

        <View style={styles.difficultyList}>
          {DIFFICULTIES.map((d) => (
            <TouchableOpacity
              key={d.id}
              style={[styles.difficultyButton, { borderColor: d.color }]}
              onPress={() => onSelectDifficulty(d.id)}
              activeOpacity={0.85}
            >
              <View style={[styles.emojiWrap, { backgroundColor: d.color + '25' }]}>
                <Text style={styles.emoji}>{d.emoji}</Text>
              </View>
              <View style={styles.difficultyInfo}>
                <Text style={[styles.difficultyLabel, { color: d.color }]}>{d.label}</Text>
                <Text style={styles.difficultySubtitle}>{d.subtitle}</Text>
              </View>
              <TrendingUp size={22} color={d.color} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 4,
    paddingHorizontal: 20,
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
    marginBottom: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: '#F8FAFC',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
  },
  difficultyList: {
    flex: 1,
    padding: 20,
    gap: 14,
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 4,
    gap: 16,
  },
  emojiWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  difficultyInfo: { flex: 1 },
  difficultyLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  difficultySubtitle: {
    fontSize: 13,
    color: '#94A3B8',
  },
});

export default QuizDifficultyScreen;
