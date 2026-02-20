import * as geoStorage from './geoStorage';

function todayString() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function yesterdayString() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

export function getTodayString() {
  return todayString();
}

export async function getStreak() {
  const last = await geoStorage.getItem(geoStorage.keys.lastCompletedDate());
  const current = await geoStorage.getJSON(geoStorage.keys.currentStreak(), 0);
  const best = await geoStorage.getJSON(geoStorage.keys.bestStreak(), 0);
  return {
    lastCompletedDate: last || null,
    currentStreak: typeof current === 'number' ? current : 0,
    bestStreak: typeof best === 'number' ? best : 0,
  };
}

/**
 * Günlük quiz tamamlandığında çağrılır.
 * today = YYYY-MM-DD (bugünün tarihi)
 */
export async function updateStreak(today) {
  const last = await geoStorage.getItem(geoStorage.keys.lastCompletedDate());
  let current = await geoStorage.getJSON(geoStorage.keys.currentStreak(), 0);
  let best = await geoStorage.getJSON(geoStorage.keys.bestStreak(), 0);

  if (typeof current !== 'number') current = 0;
  if (typeof best !== 'number') best = 0;

  const yesterday = yesterdayString();

  if (last === today) {
    return { currentStreak: current, bestStreak: best };
  }

  if (last === yesterday) {
    current += 1;
  } else {
    current = 1;
  }

  if (current > best) {
    best = current;
  }

  await geoStorage.setItem(geoStorage.keys.lastCompletedDate(), today);
  await geoStorage.setItem(geoStorage.keys.currentStreak(), current);
  await geoStorage.setItem(geoStorage.keys.bestStreak(), best);

  return { currentStreak: current, bestStreak: best };
}
