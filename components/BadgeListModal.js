import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { Info } from 'lucide-react-native';
import { BADGES, getUnlockedBadgeIds } from '../utils/badgeUtils';
import { useState, useEffect } from 'react';

const BADGE_LOGIC_TEXT = 'Her rozetin kendi koşulu vardır; sırayla açılması gerekmez. Günlük görevi tamamlamak, üst üste gün serisi yapmak, seviye atlamak veya XP toplamak gibi farklı hedefleri gerçekleştirdiğinde ilgili rozet açılır.';

export default function BadgeListModal({ visible, onClose }) {
  const [unlockedIds, setUnlockedIds] = useState([]);
  const [showLogic, setShowLogic] = useState(false);

  useEffect(() => {
    if (visible) {
      getUnlockedBadgeIds().then(setUnlockedIds);
      setShowLogic(false);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>🏅 Rozetler</Text>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={() => setShowLogic((v) => !v)} style={styles.infoButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <Info size={22} color="#94A3B8" />
                <Text style={styles.infoLabel}>Mantık</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
                <Text style={styles.closeIconText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
          {showLogic && (
            <View style={styles.logicBox}>
              <Text style={styles.logicTitle}>Rozetler nasıl açılır?</Text>
              <Text style={styles.logicText}>{BADGE_LOGIC_TEXT}</Text>
            </View>
          )}
          <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {BADGES.map((b) => {
              const unlocked = unlockedIds.includes(b.id);
              return (
                <View key={b.id} style={[styles.badgeRow, !unlocked && styles.badgeRowLocked]}>
                  <Text style={styles.icon}>{unlocked ? b.icon : '🔒'}</Text>
                  <View style={styles.badgeText}>
                    <Text style={[styles.badgeName, !unlocked && styles.textMuted]}>{b.name}</Text>
                    <Text style={[styles.badgeDesc, !unlocked && styles.textMuted]}>{unlocked ? b.description : 'Henüz açılmadı'}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  card: {
    backgroundColor: '#1E293B',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(148, 163, 184, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 12,
    color: '#94A3B8',
    marginLeft: 4,
    fontWeight: '600',
  },
  closeIcon: {
    padding: 8,
  },
  closeIconText: {
    fontSize: 20,
    color: '#94A3B8',
  },
  logicBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  logicTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#93C5FD',
    marginBottom: 6,
  },
  logicText: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 20,
  },
  scroll: { maxHeight: 400 },
  scrollContent: { paddingBottom: 16 },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 14,
    borderRadius: 12,
  },
  badgeRowLocked: {
    opacity: 0.7,
  },
  icon: {
    fontSize: 28,
    marginRight: 12,
  },
  badgeText: { flex: 1 },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8FAFC',
  },
  badgeDesc: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 2,
  },
  textMuted: {
    color: '#64748B',
  },
  closeBtn: {
    marginTop: 12,
    backgroundColor: '#475569',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
