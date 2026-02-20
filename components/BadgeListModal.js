import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { BADGES, getUnlockedBadgeIds } from '../utils/badgeUtils';
import { useState, useEffect } from 'react';

export default function BadgeListModal({ visible, onClose }) {
  const [unlockedIds, setUnlockedIds] = useState([]);

  useEffect(() => {
    if (visible) {
      getUnlockedBadgeIds().then(setUnlockedIds);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>🏅 Rozetler</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
              <Text style={styles.closeIconText}>✕</Text>
            </TouchableOpacity>
          </View>
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
  closeIcon: {
    padding: 8,
  },
  closeIconText: {
    fontSize: 20,
    color: '#94A3B8',
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
