import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Home, BookOpen, Lightbulb, Brain, Globe } from 'lucide-react-native';

const LearningModeMenu = ({ onBackToMenu, onSelectCategory }) => {
  const categories = [
    { 
      id: 'turkey_cities', 
      name: 'Türkiye Şehirleri', 
      icon: '🏙️', 
      color: '#F97316',
      description: 'İlginç bilgilerle 81 ili öğren'
    },
    { 
      id: 'turkey_geography', 
      name: 'Türkiye Coğrafyası', 
      icon: '⛰️', 
      color: '#8B5CF6',
      description: 'Dağlar, göller, ovalar hakkında bilgi'
    },
    { 
      id: 'world_countries', 
      name: 'Dünya Ülkeleri', 
      icon: '🌍', 
      color: '#3B82F6',
      description: 'Ülkeler ve başkentler hakkında'
    },
    { 
      id: 'world_flags', 
      name: 'Dünya Bayrakları', 
      icon: '🚩', 
      color: '#EC4899',
      description: 'Bayrakların anlamlarını öğren'
    },
  ];

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }}
      style={styles.container}
      blurRadius={3}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBackToMenu}>
          <Home size={24} color="#34D399" />
          <Text style={styles.backText}>Ana Menü</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Öğrenme Modu</Text>
        <Text style={styles.subtitle}>İlginç bilgilerle öğren!</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.infoCard}>
          <Brain size={40} color="#34D399" />
          <Text style={styles.infoTitle}>Nasıl Çalışır?</Text>
          <Text style={styles.infoText}>
            Her doğru cevaptan sonra ilginç bilgiler gösterilir. 
            Eğlenceli kartlarla öğrenirken aynı zamanda bilgini test edersin!
          </Text>
        </View>

        <View style={styles.featuresCard}>
          <View style={styles.featureRow}>
            <Lightbulb size={24} color="#FCD34D" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>İlginç Bilgiler</Text>
              <Text style={styles.featureDesc}>Her şehir/ülke için özel bilgiler</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <BookOpen size={24} color="#3B82F6" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Görsel Öğrenme</Text>
              <Text style={styles.featureDesc}>Harita üzerinde interaktif öğrenme</Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Globe size={24} color="#10B981" />
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>Kapsamlı İçerik</Text>
              <Text style={styles.featureDesc}>250+ ilginç bilgi ve daha fazlası</Text>
            </View>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          <Text style={styles.categoriesTitle}>Öğrenme Kategorileri</Text>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { borderLeftColor: category.color }]}
              onPress={() => onSelectCategory(category.id)}
              activeOpacity={0.8}
            >
              <View style={styles.categoryLeft}>
                <View style={[styles.categoryIconContainer, { backgroundColor: category.color + '20' }]}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryDescription}>{category.description}</Text>
                </View>
              </View>
              <View style={[styles.startButton, { backgroundColor: category.color }]}>
                <Text style={styles.startButtonText}>Başla</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tipCard}>
          <Text style={styles.tipIcon}>💡</Text>
          <Text style={styles.tipTitle}>Öğrenme İpucu</Text>
          <Text style={styles.tipText}>
            Öğrenme modunda acele etme! Her bilgiyi okuyarak ilerle. 
            Tekrar yaparak bilgileri pekiştirebilirsin.
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
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: '#34D399',
    fontWeight: '600',
    marginLeft: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#94A3B8',
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
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  infoTitle: {
    fontSize: 20,
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
  featuresCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    marginBottom: 20,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
    width: '100%',
  },
  categoryCard: {
    width: '48%',
    minWidth: 160,
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    borderLeftWidth: 4,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  startButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tipCard: {
    backgroundColor: 'rgba(45, 55, 72, 0.9)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  tipIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34D399',
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
