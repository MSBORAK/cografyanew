import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { Lock, X } from 'lucide-react-native';
import { useState } from 'react';
import { getPremiumPrice, unlockAll } from '../utils/premiumLock';

export default function PaywallModal({ visible, featureId, onUnlock, onClose }) {
  const [loading, setLoading] = useState(false);
  const price = getPremiumPrice();

  const handleUnlock = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Gerçek ödeme: App Store (iOS) / Play Store (Android) In-App Purchase.
      // react-native-iap ile: purchaseUpdatedListener / requestPurchase('premium_id')
      // Ödeme başarılı olunca aşağıdaki unlockAll() ve onUnlock çağrılmalı.
      await unlockAll();
      if (onUnlock) onUnlock(featureId);
      onClose();
    } catch (e) {
      // IAP iptal/hata: setLoading(false), kullanıcıya mesaj
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade" supportedOrientations={['landscape-left', 'landscape-right']}>
      <View style={styles.backdrop}>
        <View style={styles.cardWrap}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose} hitSlop={12}>
            <X size={24} color="#94A3B8" />
          </TouchableOpacity>
          <View style={styles.iconWrap}>
            <Lock size={40} color="#F59E0B" />
          </View>
          <Text style={styles.title}>Premium bölümler kilitli</Text>
          <Text style={styles.desc}>Tek ödeme ile Başkentler Quiz, Quiz Modu, Pratik Modu, Öğrenme Modu, Anahtar Kelimeler ve Uygulama Mantığı'nı aç.</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Tek seferlik</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <TouchableOpacity
            style={[styles.unlockButton, loading && styles.unlockButtonDisabled]}
            onPress={handleUnlock}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.unlockButtonText}>Tümünü Aç (Ödeme yap)</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.note}>Ödeme sonrası tüm premium bölümler kalıcı olarak açılır.</Text>
        </View>
        </View>
      </View>
    </Modal>
  );
}

const CARD_MAX_WIDTH = 320;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardWrap: {
    width: '100%',
    maxWidth: CARD_MAX_WIDTH,
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    textAlign: 'center',
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 14,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 65, 85, 0.6)',
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 13,
    color: '#94A3B8',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  unlockButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  unlockButtonDisabled: {
    opacity: 0.7,
  },
  unlockButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  note: {
    fontSize: 11,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 8,
  },
});
