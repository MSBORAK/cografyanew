import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { getBadgeById } from '../utils/badgeUtils';

export default function BadgeUnlockModal({ badgeIds, onClose }) {
  if (!badgeIds || badgeIds.length === 0) return null;
  const badges = badgeIds.map((id) => getBadgeById(id)).filter(Boolean);

  return (
    <Modal visible={badges.length > 0} transparent animationType="fade">
      <TouchableOpacity style={styles.backdrop} activeOpacity={1} onPress={onClose}>
        <View style={styles.card}>
          <Text style={styles.title}>🎉 Rozet Açıldı!</Text>
          {badges.map((b) => (
            <View key={b.id} style={styles.badgeRow}>
              <Text style={styles.icon}>{b.icon}</Text>
              <View style={styles.badgeText}>
                <Text style={styles.badgeName}>{b.name}</Text>
                <Text style={styles.badgeDesc}>{b.description}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={styles.closeBtnText}>Tamam</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    maxWidth: 340,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FBBF24',
    textAlign: 'center',
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: 'rgba(255,255,255,0.06)',
    padding: 12,
    borderRadius: 12,
  },
  icon: {
    fontSize: 32,
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
  closeBtn: {
    marginTop: 8,
    backgroundColor: '#3B82F6',
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
