import AsyncStorage from '@react-native-async-storage/async-storage';

const PREFIX = '@geo_';

export const keys = {
  dailyProgress: (date) => `${PREFIX}dailyProgress_${date}`,
  dailyCompleted: (date) => `${PREFIX}dailyCompleted_${date}`,
  lastCompletedDate: () => `${PREFIX}lastCompletedDate`,
  currentStreak: () => `${PREFIX}currentStreak`,
  bestStreak: () => `${PREFIX}bestStreak`,
  totalXP: () => `${PREFIX}totalXP`,
  unlockedBadges: () => `${PREFIX}unlockedBadges`,
};

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
}

export async function getJSON(key, defaultValue = null) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value == null) return defaultValue;
    return JSON.parse(value);
  } catch (e) {
    return defaultValue;
  }
}

export async function setItem(key, value) {
  try {
    if (value === undefined || value === null) {
      await AsyncStorage.removeItem(key);
      return;
    }
    await AsyncStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  } catch (e) {
    console.warn('geoStorage setItem error', key, e);
  }
}

export async function getDailyProgress(date) {
  const data = await getJSON(keys.dailyProgress(date), null);
  if (!data || typeof data.answered !== 'number') {
    return { answered: 0, correct: 0, total: 20 };
  }
  return {
    answered: data.answered,
    correct: data.correct ?? 0,
    total: data.total ?? 20,
  };
}

export async function setDailyProgress(date, progress) {
  await setItem(keys.dailyProgress(date), progress);
}

export async function isDailyCompleted(date) {
  const v = await getItem(keys.dailyCompleted(date));
  return v === 'true' || v === true;
}

export async function setDailyCompleted(date) {
  await setItem(keys.dailyCompleted(date), true);
}
