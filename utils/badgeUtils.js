import * as geoStorage from './geoStorage';

/** Tüm rozet tanımları. condition: (ctx) => boolean */
export const BADGES = [
  {
    id: 'first_daily',
    name: 'İlk Adım',
    description: 'İlk günlük görevini tamamladın.',
    icon: '🌱',
  },
  {
    id: 'perfect_10',
    name: 'Tam Puan',
    description: 'Günlük quizde tüm soruları doğru yanıtladın.',
    icon: '💯',
  },
  {
    id: 'streak_3',
    name: 'Seri Başlangıç',
    description: '3 gün üst üste günlük görevi tamamladın.',
    icon: '🔥',
  },
  {
    id: 'streak_7',
    name: 'Haftalık Kararlılık',
    description: '7 gün üst üste günlük görevi tamamladın.',
    icon: '📅',
  },
  {
    id: 'streak_10',
    name: 'On Gün Serisi',
    description: '10 gün üst üste günlük görevi tamamladın.',
    icon: '⭐',
  },
  {
    id: 'level_2',
    name: 'Yükselen Yıldız',
    description: '2. seviyeye ulaştın.',
    icon: '🌟',
  },
  {
    id: 'level_5',
    name: 'Coğrafya Uzmanı',
    description: '5. seviyeye ulaştın.',
    icon: '🏆',
  },
  {
    id: 'xp_100',
    name: 'Coğrafya Meraklısı',
    description: '100 XP topladın.',
    icon: '📚',
  },
  {
    id: 'xp_500',
    name: 'Bilge',
    description: '500 XP topladın.',
    icon: '🎓',
  },
];

function conditionFirstDaily(ctx) {
  return !!(ctx.dailyCompletedToday && ctx.currentStreak === 1);
}
function conditionPerfect10(ctx) {
  return !!(ctx.dailyCompletedToday && ctx.perfectScore);
}
function conditionStreak3(ctx) {
  return (ctx.currentStreak || 0) >= 3;
}
function conditionStreak7(ctx) {
  return (ctx.currentStreak || 0) >= 7;
}
function conditionStreak10(ctx) {
  return (ctx.currentStreak || 0) >= 10;
}
function conditionLevel2(ctx) {
  return (ctx.level || 1) >= 2;
}
function conditionLevel5(ctx) {
  return (ctx.level || 1) >= 5;
}
function conditionXp100(ctx) {
  return (ctx.totalXP || 0) >= 100;
}
function conditionXp500(ctx) {
  return (ctx.totalXP || 0) >= 500;
}

const CONDITION_MAP = {
  first_daily: conditionFirstDaily,
  perfect_10: conditionPerfect10,
  streak_3: conditionStreak3,
  streak_7: conditionStreak7,
  streak_10: conditionStreak10,
  level_2: conditionLevel2,
  level_5: conditionLevel5,
  xp_100: conditionXp100,
  xp_500: conditionXp500,
};

export function getBadgeById(id) {
  return BADGES.find((b) => b.id === id) || null;
}

export async function getUnlockedBadgeIds() {
  const raw = await geoStorage.getJSON(geoStorage.keys.unlockedBadges(), null);
  if (Array.isArray(raw)) return raw.filter((id) => typeof id === 'string');
  if (typeof raw === 'string') return [raw];
  return [];
}

async function addUnlockedBadgeId(id) {
  if (typeof id !== 'string' || !id) return false;
  const ids = await getUnlockedBadgeIds();
  if (ids.includes(id)) return false;
  const next = [...ids, id];
  await geoStorage.setItem(geoStorage.keys.unlockedBadges(), next);
  return true;
}

/**
 * Mevcut context'e göre rozetleri kontrol eder, yeni açılanları kaydedip döndürür.
 * @param ctx { dailyCompletedToday?, perfectScore?, currentStreak?, bestStreak?, totalXP?, level? }
 * @returns { Promise<string[]> } yeni açılan rozet id'leri
 */
export async function checkAndUnlockBadges(ctx) {
  const unlocked = await getUnlockedBadgeIds();
  const newlyUnlocked = [];
  const safe = {
    dailyCompletedToday: !!ctx.dailyCompletedToday,
    perfectScore: !!ctx.perfectScore,
    currentStreak: typeof ctx.currentStreak === 'number' ? ctx.currentStreak : (ctx.currentStreak | 0),
    bestStreak: typeof ctx.bestStreak === 'number' ? ctx.bestStreak : (ctx.bestStreak | 0),
    totalXP: typeof ctx.totalXP === 'number' && ctx.totalXP >= 0 ? ctx.totalXP : 0,
    level: typeof ctx.level === 'number' && ctx.level >= 1 ? ctx.level : 1,
  };
  for (const badge of BADGES) {
    if (unlocked.includes(badge.id)) continue;
    const fn = CONDITION_MAP[badge.id];
    if (!fn) continue;
    try {
      if (fn(safe)) {
        const added = await addUnlockedBadgeId(badge.id);
        if (added) newlyUnlocked.push(badge.id);
      }
    } catch (e) {
      // Bir rozet hatası diğerlerini etkilemesin
    }
  }
  return newlyUnlocked;
}
