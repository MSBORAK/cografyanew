/**
 * Tablet / ekran boyutuna göre ölçeklendirme (11" ve 13" aynı oranda görünsün)
 * Referans: 11" iPad kısa kenar ~834pt (landscape'te yükseklik)
 */
import { Dimensions } from 'react-native';
import { useWindowDimensions } from 'react-native';

const REFERENCE_SHORT = 834;
const REFERENCE_LONG = 1194;

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get('window');
const SHORT_SIDE = Math.min(WINDOW_WIDTH, WINDOW_HEIGHT);
const LONG_SIDE = Math.max(WINDOW_WIDTH, WINDOW_HEIGHT);

export const screenWidth = WINDOW_WIDTH;
export const screenHeight = WINDOW_HEIGHT;
export const shortSide = SHORT_SIDE;
export const longSide = LONG_SIDE;

export const scaleByShort = SHORT_SIDE / REFERENCE_SHORT;
export const scaleByLong = LONG_SIDE / REFERENCE_LONG;

/** Boyutu ekrana göre ölçekle (padding, margin, genişlik) */
export function scale(size) {
  return Math.round(size * scaleByShort);
}

/** Font ve büyük öğeler için yumuşak ölçek. factor 0.5 = yarı yarıya */
export function moderateScale(size, factor = 0.5) {
  return Math.round(size + (size * scaleByShort - size) * factor);
}

export function scaleVertical(size) {
  return Math.round(size * scaleByLong);
}

/**
 * useWindowDimensions ile dinamik ölçek (simülatör/cihaz değişince güncellenir).
 * Kullanım: const { scale, moderateScale, scaleVertical, scaleByShort } = useScreenScale();
 */
export function useScreenScale() {
  const { width, height } = useWindowDimensions();
  const short = Math.min(width, height);
  const long = Math.max(width, height);
  const byShort = short / REFERENCE_SHORT;
  const byLong = long / REFERENCE_LONG;
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
  };
}
