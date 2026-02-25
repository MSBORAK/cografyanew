/**
 * Tüm cihazlarda orantılı ölçeklendirme:
 * - Mobil (telefon): kısa kenar < 600 → referans 390pt (iPhone 14 yatay yükseklik). SE’den Pro Max’e tüm iPhonelar orantılı.
 * - Tablet: kısa kenar ≥ 600 → referans 834pt (11" iPad yatay yükseklik).
 */
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

const REFERENCE_TABLET = 834;
const REFERENCE_MOBILE = 390;
const MOBILE_THRESHOLD = 600;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const SHORT_SIDE = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT);
const LONG_SIDE = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT);
const refShort = SHORT_SIDE < MOBILE_THRESHOLD ? REFERENCE_MOBILE : REFERENCE_TABLET;

export const screenWidth = WINDOW_WIDTH;
export const screenHeight = WINDOW_HEIGHT;
export const shortSide = SHORT_SIDE;
export const longSide = LONG_SIDE;
export const scaleByShort = SHORT_SIDE / refShort;
export const scaleByLong = LONG_SIDE / (LONG_SIDE < MOBILE_THRESHOLD ? 844 : 1194);

/** Boyutu ekrana göre ölçekle (padding, margin, genişlik) */
export function scale(size) {
  const ref = SHORT_SIDE < MOBILE_THRESHOLD ? REFERENCE_MOBILE : REFERENCE_TABLET;
  return Math.round(size * (Math.min(WINDOW_WIDTH, WINDOW_HEIGHT) / ref));
}

/** Font ve büyük öğeler için yumuşak ölçek. factor 0.5 = yarı yarıya */
export function moderateScale(size, factor = 0.5) {
  const ref = SHORT_SIDE < MOBILE_THRESHOLD ? REFERENCE_MOBILE : REFERENCE_TABLET;
  const byShort = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT) / ref;
  return Math.round(size + (size * byShort - size) * factor);
}

export function scaleVertical(size) {
  const long = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT);
  const refLong = long < MOBILE_THRESHOLD ? 844 : 1194;
  return Math.round(size * (long / refLong));
}

/**
 * useWindowDimensions ile dinamik ölçek (simülatör/cihaz değişince güncellenir).
 * Mobil: referans 390pt → iPhone SE (320) küçük, 14 (390) orta, Pro Max (430) büyük.
 * Tablet: referans 834pt → 11"/13" aynı oran.
 */
export function useScreenScale() {
  const { width, height } = useWindowDimensions();
  const short = Math.min(width, height);
  const long = Math.max(width, height);
  const isMobile = short < MOBILE_THRESHOLD;
  const refShort = isMobile ? REFERENCE_MOBILE : REFERENCE_TABLET;
  const refLong = isMobile ? 844 : 1194;
  const byShort = short / refShort;
  const byLong = long / refLong;
  return {
    scaleByShort: byShort,
    scaleByLong: byLong,
    scale: (size) => Math.round(size * byShort),
    moderateScale: (size, factor = 0.5) => Math.round(size + (size * byShort - size) * factor),
    scaleVertical: (size) => Math.round(size * byLong),
    width,
    height,
    shortSide: short,
    longSide: long,
    isMobile,
  };
}
