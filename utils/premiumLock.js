import * as geoStorage from './geoStorage';

/**
 * Tek ödeme: Bir kez öde, tüm kilitli bölümler açılsın.
 * Açık (ücretsiz): Türkiye Haritası (81 il, 7 bölge), Dünya Haritası, Bayrak Quiz.
 * Kilitli: Başkentler Quiz, Quiz Modu, Pratik Modu, Öğrenme Modu, Anahtar Kelimeler, Uygulama Mantığı.
 */
export const PREMIUM_SINGLE_PRICE = '49,99 ₺';

export const PREMIUM_FEATURES = {
  capitals: { name: 'Başkentler Quiz' },
  quiz: { name: 'Quiz Modu' },
  practice: { name: 'Pratik Modu' },
  learning: { name: 'Öğrenme Modu' },
  keywords: { name: 'Anahtar Kelimeler' },
  'app-logic': { name: 'Uygulama Mantığı' },
};

const PREMIUM_IDS = Object.keys(PREMIUM_FEATURES);

/** Türkiye sayfasında ücretsiz olanlar: sadece 81 İl ve 7 Bölge */
export const TURKEY_FREE_IDS = ['cities', 'regions'];

/** Dünya sayfasında ücretsiz olanlar: Tüm Dünya ve Bayrak Quiz */
export const WORLD_FREE_IDS = ['world', 'flags'];

export function isPremiumFeature(featureId) {
  return PREMIUM_IDS.includes(featureId);
}

/** Ödeme yapılmış mı (tüm premium açık)? */
export function hasPremium(unlockedPremiumIds) {
  return Array.isArray(unlockedPremiumIds) && unlockedPremiumIds.length >= PREMIUM_IDS.length;
}

/** Türkiye menüsünde bu öğe kilitli mi? */
export function isTurkeyItemLocked(itemId, unlockedPremiumIds) {
  if (hasPremium(unlockedPremiumIds)) return false;
  return !TURKEY_FREE_IDS.includes(itemId);
}

/** Dünya menüsünde bu öğe kilitli mi? */
export function isWorldItemLocked(itemId, unlockedPremiumIds) {
  if (hasPremium(unlockedPremiumIds)) return false;
  return !WORLD_FREE_IDS.includes(itemId);
}

export function getPremiumPrice() {
  return PREMIUM_SINGLE_PRICE;
}

export async function getUnlockedPremiumIds() {
  const raw = await geoStorage.getJSON(geoStorage.keys.unlockedPremium(), null);
  if (Array.isArray(raw)) return raw.filter((id) => typeof id === 'string' && PREMIUM_IDS.includes(id));
  if (typeof raw === 'string') return PREMIUM_IDS.includes(raw) ? [raw] : [];
  return [];
}

export async function isUnlocked(featureId) {
  if (!isPremiumFeature(featureId)) return true;
  const ids = await getUnlockedPremiumIds();
  return ids.includes(featureId);
}

/** Tek ödeme ile tüm premium bölümleri aç. */
export async function unlockAll() {
  await geoStorage.setItem(geoStorage.keys.unlockedPremium(), [...PREMIUM_IDS]);
  return true;
}

/** Test için: premium kilidini sıfırla (tüm kilitler tekrar görünür). */
export async function resetPremiumForTesting() {
  await geoStorage.setItem(geoStorage.keys.unlockedPremium(), []);
  return true;
}
