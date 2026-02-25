import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, useWindowDimensions, ScrollView } from 'react-native';
import { ChevronLeft, Home, TrendingUp } from 'lucide-react-native';

const DIFFICULTIES = [
  { id: 'easy', label: 'Kolay', subtitle: '4 şık', color: '#22C55E', emoji: '🌱' },
  { id: 'medium', label: 'Orta', subtitle: '4 şık', color: '#F59E0B', emoji: '🔥' },
  { id: 'hard', label: 'Zor', subtitle: '3 şık', color: '#EF4444', emoji: '💪' },
  { id: 'ultra', label: 'Ultra Zor', subtitle: '2 şık', color: '#7C3AED', emoji: '⚡' },
];

const QuizDifficultyScreen = ({ quizType, quizTitle, onSelectDifficulty, onBack, onBackToMain }) => {
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;

  const headerStyle = isMobile ? { ...styles.header, paddingTop: 36, paddingHorizontal: 16 } : styles.header;
  const titleStyle = isMobile ? { ...styles.title, fontSize: 20 } : styles.title;
  const subtitleStyle = isMobile ? { ...styles.subtitle, fontSize: 13 } : styles.subtitle;
  const listStyle = isMobile ? { ...styles.difficultyList, padding: 12, gap: 10 } : styles.difficultyList;
  const buttonStyle = isMobile ? { ...styles.difficultyButton, padding: 12, gap: 12, borderRadius: 12, borderLeftWidth: 4 } : styles.difficultyButton;
  const emojiWrapStyle = isMobile ? { ...styles.emojiWrap, width: 40, height: 40, borderRadius: 20 } : styles.emojiWrap;
  const emojiStyle = isMobile ? { ...styles.emoji, fontSize: 22 } : styles.emoji;
  const labelStyle = isMobile ? { ...styles.difficultyLabel, fontSize: 16 } : styles.difficultyLabel;
  const subtitleTextStyle = isMobile ? { ...styles.difficultySubtitle, fontSize: 12 } : styles.difficultySubtitle;
  const trendIconSize = isMobile ? 18 : 22;
  const backIconSize = isMobile ? 20 : 24;
  const backTextStyle = isMobile ? { ...styles.backText, fontSize: 14 } : styles.backText;
  const listMaxWidth = isMobile ? width - 24 : 420;

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.overlay}>
        <View style={headerStyle}>
          <View style={styles.backButtonsColumn}>
            {onBackToMain && (
              <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
                <Home size={backIconSize} color="#F8FAFC" />
                <Text style={backTextStyle}>Ana Menü</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeft size={backIconSize} color="#F8FAFC" />
              <Text style={backTextStyle}>Geri</Text>
            </TouchableOpacity>
          </View>
          <Text style={titleStyle}>Zorluk Seçin</Text>
          <Text style={subtitleStyle}>{quizTitle}</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.difficultyListWrap, { maxWidth: listMaxWidth }]}>
            <View style={listStyle}>
              {DIFFICULTIES.map((d) => (
                <TouchableOpacity
                  key={d.id}
                  style={[buttonStyle, { borderColor: d.color }]}
                  onPress={() => onSelectDifficulty(d.id)}
                  activeOpacity={0.85}
                >
                  <View style={[emojiWrapStyle, { backgroundColor: d.color + '25' }]}>
                    <Text style={emojiStyle}>{d.emoji}</Text>
                  </View>
                  <View style={styles.difficultyInfo}>
                    <Text style={[labelStyle, { color: d.color }]}>{d.label}</Text>
                    <Text style={subtitleTextStyle}>{d.subtitle}</Text>
                  </View>
                  <TrendingUp size={trendIconSize} color={d.color} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 4,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
    marginBottom: 12,
    alignSelf: 'flex-start',
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 24,
  },
  difficultyListWrap: {
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 12,
  },
  difficultyList: {
    padding: 20,
    gap: 14,
    width: '100%',
  },
  difficultyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 4,
    gap: 16,
    width: '100%',
    maxWidth: '100%',
  },
  emojiWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 26 },
  difficultyInfo: { flex: 1, minWidth: 0 },
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
