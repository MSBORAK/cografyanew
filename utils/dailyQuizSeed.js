/**
 * Tarih string'inden deterministik seed üretir (sayı).
 * YYYY-MM-DD -> hash benzeri sayı
 */
function dateToSeed(dateStr) {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return h;
}

/**
 * Seeded random: 0..1 arası, aynı seed ile aynı sıra.
 */
function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Fisher-Yates shuffle, seed ile. Aynı array + aynı seed = aynı sıra.
 */
export function seededShuffle(array, seed) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const r = seededRandom(seed + i) * (i + 1);
    const j = Math.floor(r);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function getDateString() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

const DAILY_QUIZ_TOTAL = 10;

/**
 * Bugünün 10 sorusunu döndürür. pool = countryFlags veya benzeri array.
 * Her gün aynı tarih için aynı 10 soru gelir.
 */
export function getTodaysQuestions(pool, dateStr) {
  if (!pool || pool.length === 0) return [];
  const seed = dateToSeed(dateStr);
  const shuffled = seededShuffle(pool, seed);
  return shuffled.slice(0, DAILY_QUIZ_TOTAL);
}

export const DAILY_QUIZ_TOTAL_QUESTIONS = DAILY_QUIZ_TOTAL;

/**
 * Bir soru için 4 şık (1 doğru + 3 yanlış) deterministik döndürür.
 */
export function getOptionsForQuestion(correctItem, fullPool, questionIndex, dateStr) {
  const seed = dateToSeed(dateStr) + questionIndex;
  const wrong = fullPool.filter((item) => item.id !== correctItem.id);
  const wrongShuffled = seededShuffle(wrong, seed).slice(0, 3);
  const four = [correctItem, ...wrongShuffled];
  return seededShuffle(four, seed + 1);
}
