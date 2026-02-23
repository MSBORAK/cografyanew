import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, ChevronLeft, BookOpen, TrendingUp, RotateCcw } from 'lucide-react-native';
import { getStatistics, clearWrongAnswers } from '../utils/practiceMode';
import { useScreenScale } from '../utils/screenScale';

const PracticeModeMenu = ({ onBackToMenu, onBackToMain, onSelectCategory }) => {
  const { scale, moderateScale } = useScreenScale();
  const contentContainerStyle = { ...styles.contentContainer, padding: scale(24) };
  const infoCardStyle = { ...styles.infoCard, borderRadius: scale(18), padding: scale(22), marginBottom: scale(24) };
  const infoTitleStyle = { ...styles.infoTitle, fontSize: moderateScale(20), marginTop: scale(14), marginBottom: scale(10) };
  const infoTextStyle = { ...styles.infoText, fontSize: moderateScale(15), lineHeight: scale(22) };
  const infoHintStyle = { ...styles.infoHint, fontSize: moderateScale(13), lineHeight: scale(20), marginTop: scale(14) };
  const categoriesContainerStyle = { ...styles.categoriesContainer, gap: scale(16) };
  const categoryCardStyle = { ...styles.categoryCard, minWidth: scale(180), borderRadius: scale(18), padding: scale(18) };
  const categoryIconStyle = { ...styles.categoryIcon, fontSize: moderateScale(34) };
  const categoryNameStyle = { ...styles.categoryName, fontSize: moderateScale(17) };
  const categoryCountStyle = { ...styles.categoryCount, fontSize: moderateScale(13), marginTop: scale(4) };
  const categoryEmptyStyle = { ...styles.categoryEmpty, fontSize: moderateScale(13), marginTop: scale(4) };
  const practiceButtonStyle = { ...styles.practiceButton, paddingVertical: scale(14), borderRadius: scale(14), gap: scale(10) };
  const practiceButtonTextStyle = { ...styles.practiceButtonText, fontSize: moderateScale(15) };
  const clearButtonStyle = { ...styles.clearButton, width: scale(48), height: scale(48), borderRadius: scale(14) };
  const tipCardStyle = { ...styles.tipCard, borderRadius: scale(18), padding: scale(22), marginTop: scale(24) };
  const tipIconStyle = { ...styles.tipIcon, fontSize: moderateScale(34), marginBottom: scale(10) };
  const tipTitleStyle = { ...styles.tipTitle, fontSize: moderateScale(17), marginBottom: scale(10) };
  const tipTextStyle = { ...styles.tipText, fontSize: moderateScale(14), lineHeight: scale(20) };

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
        <View style={styles.backButtonsColumn}>
          {onBackToMain && (
            <TouchableOpacity style={styles.backButton} onPress={onBackToMain}>
              <Home size={24} color="#A78BFA" />
              <Text style={styles.backText}>Ana Menü</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
            <ChevronLeft size={24} color="#A78BFA" />
            <Text style={styles.backText}>Geri</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Pratik Modu</Text>
        <Text style={styles.subtitle}>Yanlış yaptığın soruları tekrar et</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={contentContainerStyle}>
        <View style={infoCardStyle}>
          <BookOpen size={32} color="#A78BFA" />
          <Text style={infoTitleStyle}>Nasıl Çalışır?</Text>
          <Text style={infoTextStyle}>
            Oyunlarda yanlış cevapladığın sorular otomatik olarak kaydedilir.
            Pratik modunda sadece bu soruları tekrar ederek zayıf konularını güçlendirebilirsin!
          </Text>
          <Text style={infoHintStyle}>
            Önce 81 İl, Dünya Haritası veya Bayraklar gibi oyunlarda soru çöz; yanlış yaptığın sorular burada listelenir.
          </Text>
        </View>

        <View style={categoriesContainerStyle}>
          {categories.map((category) => {
            const categoryStats = stats[category.id];
            const hasWrongAnswers = categoryStats && categoryStats.total > 0;

            return (
              <View key={category.id} style={categoryCardStyle}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <Text style={categoryIconStyle}>{category.icon}</Text>
                    <View>
                      <Text style={categoryNameStyle}>{category.name}</Text>
                      {hasWrongAnswers ? (
                        <Text style={categoryCountStyle}>
                          {categoryStats.total} soru pratik yapılacak
                        </Text>
                      ) : (
                        <Text style={categoryEmptyStyle}>
                          Henüz yanlış cevap yok
                        </Text>
                      )}
                    </View>
                  </View>
                </View>

                {hasWrongAnswers && (
                  <View style={styles.categoryActions}>
                    <TouchableOpacity
                      style={[practiceButtonStyle, { backgroundColor: category.color }]}
                      onPress={() => onSelectCategory(category.id)}
                    >
                      <TrendingUp size={20} color="#FFFFFF" />
                      <Text style={practiceButtonTextStyle}>Pratik Yap</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={clearButtonStyle}
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

        <View style={tipCardStyle}>
          <Text style={tipIconStyle}>💡</Text>
          <Text style={tipTitleStyle}>İpucu</Text>
          <Text style={tipTextStyle}>
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
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  header: {
    paddingTop: 62,
    paddingBottom: 2,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: '#A78BFA',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 1,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  infoHint: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 12,
    fontStyle: 'italic',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    minWidth: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
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
    color: '#F8FAFC',
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
    backgroundColor: 'rgba(45, 55, 72, 0.9)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  tipIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FCD34D',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default PracticeModeMenu;
