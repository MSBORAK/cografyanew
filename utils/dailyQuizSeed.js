import { countryFlags } from '../constants/countryFlags';
import { countryCapitals } from '../constants/countryCapitals';
import { turkeyQuizQuestions } from '../constants/turkeyQuizQuestions';
import { worldQuizQuestions } from '../constants/worldQuizQuestions';

/**
 * Tarih string'inden deterministik seed üretir (sayı).
 */
function dateToSeed(dateStr) {
  let h = 0;
  for (let i = 0; i < dateStr.length; i++) {
    h = (h * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  return h;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

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

const DAILY_QUIZ_TOTAL_MIXED = 20;

function pickSeeded(arr, n, seed) {
  const shuffled = seededShuffle(arr, seed);
  return shuffled.slice(0, n);
}

/** Bayrak sorusu – seed ile aynı gün aynı sorular */
function buildSeededFlagQuestions(count, seed) {
  const items = pickSeeded(countryFlags, count, seed);
  return items.map((item, i) => {
    const wrong = countryFlags.filter((c) => c.id !== item.id);
    const wrongNames = pickSeeded(wrong, 3, seed + 1000 + i).map((c) => c.name);
    const options = seededShuffle([item.name, ...wrongNames], seed + 2000 + i);
    return {
      type: 'flag',
      questionText: 'Bu bayrak hangi ülkeye ait?',
      displayFlag: item.flag,
      options,
      correctAnswer: item.name,
    };
  });
}

/** Başkent sorusu */
function buildSeededCapitalQuestions(count, seed) {
  const items = pickSeeded(countryCapitals, count, seed);
  return items.map((item, i) => {
    const wrong = countryCapitals.filter((c) => c.id !== item.id);
    const wrongCaps = pickSeeded(wrong, 3, seed + 3000 + i).map((c) => c.capital);
    const options = seededShuffle([item.capital, ...wrongCaps], seed + 4000 + i);
    return {
      type: 'capital',
      questionText: `${item.country} başkenti neresidir?`,
      options,
      correctAnswer: item.capital,
    };
  });
}

/** Türkiye / Dünya – zaten 4 şıklı */
function buildSeededTurkeyQuestions(count, seed) {
  const items = pickSeeded(turkeyQuizQuestions, count, seed);
  return items.map((q) => ({
    type: 'turkey',
    questionText: q.question,
    options: seededShuffle([...q.options], seed + 5000 + q.id),
    correctAnswer: q.correctAnswer,
  }));
}

function buildSeededWorldQuestions(count, seed) {
  const items = pickSeeded(worldQuizQuestions, count, seed);
  return items.map((q) => ({
    type: 'world',
    questionText: q.question,
    options: seededShuffle([...q.options], seed + 6000 + q.id),
    correctAnswer: q.correctAnswer,
  }));
}

/**
 * Günlük quiz için karışık havuz: bayrak + başkent + Türkiye + dünya.
 * Aynı tarih = aynı 15 soru (deterministik).
 */
export function getTodaysMixedQuestions(dateStr) {
  const seed = dateToSeed(dateStr);
  const flag = buildSeededFlagQuestions(5, seed);
  const capital = buildSeededCapitalQuestions(5, seed + 100);
  const turkey = buildSeededTurkeyQuestions(5, seed + 200);
  const world = buildSeededWorldQuestions(5, seed + 300);
  const combined = [...flag, ...capital, ...turkey, ...world];
  return seededShuffle(combined, seed + 400);
}

export const DAILY_QUIZ_TOTAL_QUESTIONS = DAILY_QUIZ_TOTAL_MIXED;

/** Eski API: sadece bayrak (geri uyumluluk için, günlük quiz artık getTodaysMixedQuestions kullanıyor) */
const DAILY_QUIZ_TOTAL_LEGACY = 10;
export function getTodaysQuestions(pool, dateStr) {
  if (!pool || pool.length === 0) return [];
  const seed = dateToSeed(dateStr);
  const shuffled = seededShuffle(pool, seed);
  return shuffled.slice(0, DAILY_QUIZ_TOTAL_LEGACY);
}

/** Bayrak sorusu için 4 şık (eski format: { id, name } – sadece getTodaysQuestions kullanılıyorsa gerekir) */
export function getOptionsForQuestion(correctItem, fullPool, questionIndex, dateStr) {
  const seed = dateToSeed(dateStr) + questionIndex;
  const wrong = fullPool.filter((item) => item.id !== correctItem.id);
  const wrongShuffled = seededShuffle(wrong, seed).slice(0, 3);
  const four = [correctItem, ...wrongShuffled];
  return seededShuffle(four, seed + 1);
}
