import { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  useWindowDimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GEOGRAPHY_KEYWORDS } from '../constants/geographyKeywords';

console.warn('[DEBUG GeographyKeywords] module loaded');
const GeographyKeywords = ({ onBackToMenu, onBackToMain }) => {
  console.warn('[DEBUG GeographyKeywords] component body start');
  const { width, height } = useWindowDimensions();
  const shortSide = Math.min(width, height);
  const isMobile = shortSide < 600;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const item = GEOGRAPHY_KEYWORDS[currentIndex];
  const total = GEOGRAPHY_KEYWORDS.length;

  const headerStyle = isMobile ? { ...styles.header, paddingTop: 12, paddingBottom: 0, paddingHorizontal: 12 } : styles.header;
  const backButtonStyle = isMobile ? { ...styles.backButton, marginBottom: 4 } : styles.backButton;
  const backTextStyle = isMobile ? { ...styles.backText, fontSize: 13 } : styles.backText;
  const backIconSize = isMobile ? 18 : 24;
  const titleStyle = isMobile ? { ...styles.title, fontSize: 20, marginTop: -6 } : styles.title;
  const subtitleStyle = isMobile ? { ...styles.subtitle, fontSize: 12 } : styles.subtitle;

  const handleNext = () => {
    if (showDefinition) {
      flipAnim.setValue(0);
      setShowDefinition(false);
    }
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (showDefinition) {
      flipAnim.setValue(0);
      setShowDefinition(false);
    }
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleFlip = () => {
    const toValue = showDefinition ? 0 : 180;
    Animated.spring(flipAnim, {
      toValue,
      useNativeDriver: true,
      friction: 9,
      tension: 65,
    }).start(() => {
      setShowDefinition((prev) => !prev);
    });
  };

  const headerBlock = (
    <View style={headerStyle}>
      <View style={styles.backButtonsColumn}>
        {onBackToMain && (
          <TouchableOpacity style={backButtonStyle} onPress={onBackToMain}>
            <Ionicons name="home" size={backIconSize} color="#F59E0B" />
            <Text style={backTextStyle}>Ana Menü</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={backButtonStyle} onPress={onBackToMenu}>
          <Ionicons name="chevron-back" size={backIconSize} color="#F59E0B" />
          <Text style={backTextStyle}>Geri</Text>
        </TouchableOpacity>
      </View>
      <Text style={titleStyle}>Coğrafya Anahtar Kelimeler</Text>
      <Text style={subtitleStyle}>
        {currentIndex + 1} / {total}
      </Text>
    </View>
  );

  const cardBlock = (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleFlip}
        style={styles.flashCardTouchable}
      >
        <View style={styles.flashCardWrapper}>
          <Animated.View
            style={[
              styles.flashCardFace,
              styles.flashCardFront,
              {
                transform: [
                  { perspective: 1200 },
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 180],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
                backfaceVisibility: 'hidden',
              },
            ]}
          >
            <Text style={styles.cardLabel}>Kavram</Text>
            <Text style={styles.cardText}>{item.term}</Text>
            <Text style={styles.hintText}>Dokun = çevir</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.flashCardFace,
              styles.flashCardBack,
              {
                transform: [
                  { perspective: 1200 },
                  {
                    rotateY: flipAnim.interpolate({
                      inputRange: [0, 180],
                      outputRange: ['180deg', '360deg'],
                    }),
                  },
                ],
                backfaceVisibility: 'hidden',
              },
            ]}
          >
            <Text style={styles.cardLabel}>Tanım</Text>
            <Text style={styles.cardText}>{item.definition}</Text>
            <Text style={styles.hintText}>Dokun = çevir</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const navBlock = (
    <View style={styles.navRow}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={handlePrev}
        activeOpacity={0.8}
      >
        <Ionicons name="chevron-back" size={28} color="#F59E0B" />
        <Text style={styles.navText}>Önceki</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navButton}
        onPress={handleNext}
        activeOpacity={0.8}
      >
        <Text style={styles.navText}>Sonraki</Text>
        <Ionicons name="chevron-forward" size={28} color="#F59E0B" />
      </TouchableOpacity>
    </View>
  );

  const listBlock = (
    <View style={styles.listContent}>
      <Text style={styles.listTitle}>Tüm Kavramlar</Text>
      {GEOGRAPHY_KEYWORDS.map((kw, index) => (
        <View key={index} style={styles.listCard}>
          <Text style={styles.listTerm}>{kw.term}</Text>
          <Text style={styles.listDef}>{kw.definition}</Text>
        </View>
      ))}
    </View>
  );

  if (isMobile) {
    return (
      <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
        <ScrollView
          style={styles.mobileScrollView}
          contentContainerStyle={styles.mobileScrollContent}
          showsVerticalScrollIndicator={true}
          keyboardShouldPersistTaps="handled"
        >
          {headerBlock}
          {cardBlock}
          {navBlock}
          {listBlock}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: '#0f172a' }]}>
      {headerBlock}
      {cardBlock}
      {navBlock}
      <ScrollView
        style={styles.listContainer}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.listTitle}>Tüm Kavramlar</Text>
        {GEOGRAPHY_KEYWORDS.map((kw, index) => (
          <View key={index} style={styles.listCard}>
            <Text style={styles.listTerm}>{kw.term}</Text>
            <Text style={styles.listDef}>{kw.definition}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  mobileScrollView: { flex: 1 },
  mobileScrollContent: { paddingBottom: 40 },
  backButtonsColumn: {
    flexDirection: 'column',
    marginRight: 12,
  },
  header: {
    paddingTop: 62,
    paddingBottom: 4,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.92)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.2)',
  },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  backText: { fontSize: 16, color: '#F59E0B', fontWeight: '600', marginLeft: 8 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: { fontSize: 14, color: '#94A3B8', textAlign: 'center' },
  cardContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashCardTouchable: {
    width: '100%',
    maxWidth: 320,
    height: 200,
  },
  flashCardWrapper: {
    width: '100%',
    height: 200,
  },
  flashCardFace: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: 200,
    backgroundColor: 'rgba(30, 41, 59, 0.9)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    justifyContent: 'center',
  },
  flashCardFront: {},
  flashCardBack: {},
  cardLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F8FAFC',
    lineHeight: 26,
    textAlign: 'center',
  },
  hintText: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 12,
    gap: 8,
  },
  navText: { fontSize: 15, fontWeight: '600', color: '#F59E0B' },
  listContainer: { flex: 1 },
  listContent: { padding: 20, paddingBottom: 40 },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 16,
  },
  listCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  listTerm: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FCD34D',
    marginBottom: 6,
  },
  listDef: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
  },
});

export default GeographyKeywords;
