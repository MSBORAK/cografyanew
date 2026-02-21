import * as geoStorage from './geoStorage';

const XP_PER_CORRECT = 10;
const XP_DAILY_BONUS = 20;

/** Level eşikleri: level 1 = 0-99, level 2 = 100-249, level 3 = 250-499, ... */
const LEVEL_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 4000, 8000, 16000, 32000];

export const XP_CORRECT = XP_PER_CORRECT;
export const XP_DAILY_COMPLETE = XP_DAILY_BONUS;

export function getLevelFromXP(xp) {
  if (typeof xp !== 'number' || xp < 0) return 1;
  let level = 1;
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }
  return level;
}

export function getLevelInfo(xp) {
  const level = getLevelFromXP(xp);
  const currentMin = LEVEL_THRESHOLDS[level - 1] ?? 0;
  const nextMin = LEVEL_THRESHOLDS[level] ?? currentMin + 1000;
  const xpInLevel = xp - currentMin;
  const xpNeededForNext = nextMin - currentMin;
  return {
    level,
    totalXP: xp,
    currentMin,
    nextMin,
    xpInLevel,
    xpNeededForNext,
  };
}

export async function getTotalXP() {
  const v = await geoStorage.getJSON(geoStorage.keys.totalXP(), 0);
  if (typeof v === 'number' && !Number.isNaN(v) && v >= 0) return v;
  if (typeof v === 'string' && /^\d+$/.test(v)) return parseInt(v, 10);
  return 0;
}

export async function addXP(amount) {
  if (typeof amount !== 'number' || amount <= 0) return 0;
  const current = await getTotalXP();
  const next = current + amount;
  await geoStorage.setItem(geoStorage.keys.totalXP(), next);
  return next;
}
