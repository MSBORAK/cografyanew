import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useScreenScale } from '../utils/screenScale';

console.warn('[DEBUG LearningModeMenu] module loaded');
const LearningModeMenu = ({ onBackToMenu, onBackToMain, onSelectCategory }) => {
  console.warn('[DEBUG LearningModeMenu] component body start');
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;
  const { scale, moderateScale } = useScreenScale();
  const contentContainerStyle = { ...styles.contentContainer, padding: scale(20), paddingBottom: scale(28) };
  const howItWorksCardStyle = { ...styles.howItWorksCard, borderRadius: scale(22), padding: scale(22), marginBottom: scale(18) };
  const brainIconWrapStyle = { ...styles.brainIconWrap, width: scale(68), height: scale(68), borderRadius: scale(34), marginBottom: scale(6) };
  const infoTitleStyle = { ...styles.infoTitle, fontSize: moderateScale(22), marginTop: scale(6), marginBottom: scale(10) };
  const infoTextStyle = { ...styles.infoText, fontSize: moderateScale(15), lineHeight: scale(22) };
  const categoriesContainerStyle = { ...styles.categoriesContainer, gap: scale(16), marginBottom: scale(20) };
  const categoriesTitleStyle = { ...styles.categoriesTitle, fontSize: moderateScale(20), marginBottom: scale(14) };
  const categoryCardStyle = { ...styles.categoryCard, minWidth: scale(180), borderRadius: scale(20), padding: scale(18), borderLeftWidth: scale(4) };
  const categoryIconContainerStyle = { ...styles.categoryIconContainer, width: scale(60), height: scale(60), borderRadius: scale(30) };
  const categoryIconStyle = { ...styles.categoryIcon, fontSize: moderateScale(30) };
  const categoryNameStyle = { ...styles.categoryName, fontSize: moderateScale(17), marginBottom: scale(4) };
  const categoryDescriptionStyle = { ...styles.categoryDescription, fontSize: moderateScale(13) };
  const startButtonStyle = { ...styles.startButton, paddingHorizontal: scale(16), paddingVertical: scale(12), borderRadius: scale(14), gap: scale(8) };
  const startButtonTextStyle = { ...styles.startButtonText, fontSize: moderateScale(14) };
  const tipCardStyle = { ...styles.tipCard, borderRadius: scale(22), padding: scale(22) };
  const tipIconWrapStyle = { ...styles.tipIconWrap, width: scale(56), height: scale(56), borderRadius: scale(28), marginBottom: scale(12) };
  const tipTitleStyle = { ...styles.tipTitle, fontSize: moderateScale(17), marginBottom: scale(10) };
  const tipTextStyle = { ...styles.tipText, fontSize: moderateScale(14), lineHeight: scale(20) };

  const categories = [
    { 
      id: 'turkey_cities', 
      name: 'Türkiye Şehirleri', 
      icon: '🏙️', 
      color: '#F97316',
      description: 'Haritada il il gezin, ilginç bilgileri oku'
    },
    { 
      id: 'turkey_geography', 
      name: 'Türkiye Coğrafyası', 
      icon: '⛰️', 
      color: '#8B5CF6',
      description: 'Dağlar, göller, ovalar menüsüne git'
    },
    { 
      id: 'world_countries', 
      name: 'Dünya Ülkeleri', 
      icon: '🌍', 
      color: '#3B82F6',
      description: 'Dünya haritasında ülke keşfi'
    },
    { 
      id: 'world_flags', 
      name: 'Dünya Bayrakları', 
      icon: '🚩', 
      color: '#EC4899',
      description: 'Bayrak eşleştirme quizi'
    },
    { 
      id: 'geography_keywords', 
      name: 'Coğrafya Anahtar Kelimeler', 
      icon: '📖', 
      color: '#F59E0B',
      description: 'Kavram kartlarıyla tanımlar'
    },
  ];

  const headerStyle = isMobile ? { ...styles.header, paddingTop: scale(12), paddingBottom: 0, paddingHorizontal: scale(12) } : styles.header;
  const backButtonStyle = isMobile ? { ...styles.backButton, marginBottom: scale(4), paddingVertical: scale(2) } : styles.backButton;
  const backTextStyle = isMobile ? { ...styles.backText, fontSize: 13 } : styles.backText;
  const backIconSize = isMobile ? 18 : 24;
  const titleStyle = isMobile ? { ...styles.title, fontSize: 22, marginBottom: 12, marginTop: -6 } : styles.title;
  const subtitleStyle = isMobile ? { ...styles.subtitle, fontSize: 11 } : styles.subtitle;

  const headerBlock = (
    <View style={headerStyle}>
      <View style={styles.backButtonsColumn}>
        {onBackToMain && (
          <TouchableOpacity style={backButtonStyle} onPress={onBackToMain}>
            <Ionicons name="home" size={backIconSize} color="#10B981" />
            <Text style={backTextStyle}>Ana Menü</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={backButtonStyle} onPress={onBackToMenu}>
          <Ionicons name="chevron-back" size={backIconSize} color="#10B981" />
          <Text style={backTextStyle}>Geri</Text>
        </TouchableOpacity>
      </View>
      <Text style={titleStyle}>Öğrenme Modu</Text>
      <Text style={subtitleStyle}>İlginç bilgilerle öğren!</Text>
    </View>
  );

  const scrollBody = (
    <>
        <View style={howItWorksCardStyle}>
          <View style={brainIconWrapStyle}>
            <Ionicons name="school" size={36} color="#10B981" />
          </View>
          <Text style={infoTitleStyle}>Nasıl Çalışır?</Text>
          <Text style={infoTextStyle}>
            Kategori seçerek haritalar, ilginç bilgiler veya kavram kartlarıyla öğrenirsin. 
            Türkiye Şehirleri ve Anahtar Kelimeler’de bilgi odaklı; diğerlerinde keşfet + test bir arada.
          </Text>
          <View style={styles.featureDivider} />
          <View style={styles.featureRow}>
            <View style={[styles.featureIconWrap, { backgroundColor: 'rgba(252, 211, 77, 0.2)' }]}>
              <Ionicons name="bulb" size={22} color="#FCD34D" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>İlginç Bilgiler</Text>
              <Text style={styles.featureDesc}>81 il için özel bilgiler (Türkiye Şehirleri)</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <View style={[styles.featureIconWrap, { backgroundColor: 'rgba(59, 130, 246, 0.2)' }]}>
              <Ionicons name="book" size={22} color="#3B82F6" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Görsel Öğrenme</Text>
              <Text style={styles.featureDesc}>Harita üzerinde şehir ve coğrafya keşfi</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <View style={[styles.featureIconWrap, { backgroundColor: 'rgba(16, 185, 129, 0.2)' }]}>
              <Ionicons name="globe" size={22} color="#10B981" />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Farklı Kategoriler</Text>
              <Text style={styles.featureDesc}>Şehirler, coğrafya, bayraklar, kavramlar</Text>
            </View>
          </View>
        </View>

        <View style={categoriesContainerStyle}>
          <Text style={categoriesTitleStyle}>Öğrenme Kategorileri</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[categoryCardStyle, { borderLeftColor: category.color }]}
              onPress={() => onSelectCategory(category.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryLeft}>
                <View style={[categoryIconContainerStyle, { backgroundColor: category.color + '20' }]}>
                  <Text style={categoryIconStyle}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={categoryNameStyle}>{category.name}</Text>
                  <Text style={categoryDescriptionStyle}>{category.description}</Text>
                </View>
              </View>
              <View style={[startButtonStyle, { backgroundColor: category.color }]}>
                <Text style={startButtonTextStyle}>Başla</Text>
                <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={tipCardStyle}>
          <View style={tipIconWrapStyle}>
            <Text style={styles.tipIcon}>💡</Text>
          </View>
          <Text style={tipTitleStyle}>Öğrenme İpucu</Text>
          <Text style={tipTextStyle}>
            Türkiye Şehirleri’nde her il için «İlginç Bilgi» butonuna basarak bilgiyi aç. 
            Anahtar Kelimeler’de kartları çevirerek kavramları pekiştir.
          </Text>
        </View>
    </>
  );

  const content = isMobile ? (
    <ScrollView
      style={styles.content}
      contentContainerStyle={[styles.scrollContentMobile, contentContainerStyle]}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled"
    >
      {headerBlock}
      {scrollBody}
    </ScrollView>
  ) : (
    <>
      {headerBlock}
      <ScrollView style={styles.content} contentContainerStyle={contentContainerStyle} showsVerticalScrollIndicator={false}>
        {scrollBody}
      </ScrollView>
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: '#0f172a' }]}>{content}</View>
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
    paddingTop: Platform.OS === 'ios' ? 62 : 44,
    paddingBottom: 2,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  backText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContentMobile: {
    paddingBottom: 24,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  howItWorksCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
    overflow: 'hidden',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    } : { elevation: 6 }),
  },
  brainIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 4,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
  },
  featureDivider: {
    height: 1,
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    width: '100%',
    marginVertical: 14,
  },
  featureIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 4,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 13,
    color: '#94A3B8',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
    width: '100%',
  },
  categoryCard: {
    width: '48%',
    minWidth: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.15)',
    borderLeftWidth: 4,
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    } : { elevation: 4 }),
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  categoryIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIcon: {
    fontSize: 28,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  categoryDescription: {
    fontSize: 12,
    color: '#94A3B8',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.92)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.25)',
    ...(Platform.OS === 'ios' ? {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
    } : { elevation: 4 }),
  },
  tipIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    fontSize: 28,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default LearningModeMenu;
