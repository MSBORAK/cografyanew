import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, BookOpen, TrendingUp, RotateCcw } from 'lucide-react-native';
import { getStatistics, clearWrongAnswers } from '../utils/practiceMode';

const PracticeModeMenu = ({ onBackToMenu, onSelectCategory }) => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    setLoading(true);
    const statistics = await getStatistics();
    setStats(statistics);
    setLoading(false);
  };

  const handleClearCategory = async (category) => {
    await clearWrongAnswers(category);
    await loadStatistics();
  };

  const categories = [
    { id: 'turkey_cities', name: 'Türkiye Şehirleri', icon: '🏙️', color: '#F97316' },
    { id: 'world_countries', name: 'Dünya Ülkeleri', icon: '🌍', color: '#3B82F6' },
    { id: 'turkey_mountains', name: 'Türkiye Dağları', icon: '⛰️', color: '#8B5CF6' },
    { id: 'turkey_lakes', name: 'Türkiye Gölleri', icon: '🏞️', color: '#06B6D4' },
    { id: 'world_flags', name: 'Dünya Bayrakları', icon: '🚩', color: '#EC4899' },
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#8B5CF6" />
          <Text style={styles.backText}>Ana Menü</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Pratik Modu</Text>
        <Text style={styles.subtitle}>Yanlış yaptığın soruları tekrar et</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoCard}>
          <BookOpen size={32} color="#8B5CF6" />
          <Text style={styles.infoTitle}>Nasıl Çalışır?</Text>
          <Text style={styles.infoText}>
            Oyunlarda yanlış cevapladığın sorular otomatik olarak kaydedilir. 
            Pratik modunda sadece bu soruları tekrar ederek zayıf konularını güçlendirebilirsin!
          </Text>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => {
            const categoryStats = stats[category.id];
            const hasWrongAnswers = categoryStats && categoryStats.total > 0;

            return (
              <View key={category.id} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <View>
                      <Text style={styles.categoryName}>{category.name}</Text>
                      {hasWrongAnswers ? (
                        <Text style={styles.categoryCount}>
                          {categoryStats.total} soru pratik yapılacak
                        </Text>
                      ) : (
                        <Text style={styles.categoryEmpty}>
                          Henüz yanlış cevap yok 🎉
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                {hasWrongAnswers && (
                  <View style={styles.categoryActions}>
                    <TouchableOpacity
                      style={[styles.practiceButton, { backgroundColor: category.color }]}
                      onPress={() => onSelectCategory(category.id)}
                    >
                      <TrendingUp size={20} color="#FFFFFF" />
                      <Text style={styles.practiceButtonText}>Pratik Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.clearButton}
                      onPress={() => handleClearCategory(category.id)}
                    >
                      <RotateCcw size={18} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                )}

                {hasWrongAnswers && categoryStats.mostDifficult.length > 0 && (
                  <View style={styles.difficultSection}>
                    <Text style={styles.difficultTitle}>En çok zorlandıkların:</Text>
                    {categoryStats.mostDifficult.slice(0, 3).map((item, index) => (
                      <View key={item.id} style={styles.difficultItem}>
                        <Text style={styles.difficultRank}>#{index + 1}</Text>
                        <Text style={styles.difficultName}>{item.name}</Text>
                        <Text style={styles.difficultAttempts}>{item.attempts}x</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipTitle}>İpucu</Text>
          <Text style={styles.tipText}>
            Düzenli pratik yaparak öğrenme hızını artırabilirsin. 
            Her gün 10 dakika pratik yapmak, uzun süreli hafızana katkı sağlar!
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  categoriesContainer: {
    gap: 16,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryHeader: {
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  categoryCount: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
    marginTop: 2,
  },
  categoryEmpty: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 2,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  practiceButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  practiceButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  clearButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  difficultSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 12,
  },
  difficultTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 8,
  },
  difficultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 8,
  },
  difficultRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9CA3AF',
    width: 24,
  },
  difficultName: {
    flex: 1,
    fontSize: 13,
    color: '#111827',
  },
  difficultAttempts: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  tipCard: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FCD34D',
  },
  tipIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#78350F',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PracticeModeMenu;
