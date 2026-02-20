import { countryFlags } from '../constants/countryFlags';
import { countryCapitals } from '../constants/countryCapitals';
import { turkeyQuizQuestions } from '../constants/turkeyQuizQuestions';
import { worldQuizQuestions } from '../constants/worldQuizQuestions';

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const pickRandom = (arr, n) => shuffle(arr).slice(0, n);

/**
 * Bayrak sorusu: "Bu bayrak hangi ülkeye ait?" + 4 şık (ülke adı)
 */
function buildFlagQuestions(count) {
  const items = pickRandom(countryFlags, count);
  return items.map((item) => {
    const wrong = countryFlags.filter((c) => c.id !== item.id);
    const wrongNames = pickRandom(wrong, 3).map((c) => c.name);
    const options = shuffle([item.name, ...wrongNames]);
    return {
      type: 'flag',
      questionText: 'Bu bayrak hangi ülkeye ait?',
      displayFlag: item.flag,
      options,
      correctAnswer: item.name,
    };
  });
}

/**
 * Başkent sorusu: "X'in başkenti neresidir?" + 4 şık (başkent adı)
 */
function buildCapitalQuestions(count) {
  const items = pickRandom(countryCapitals, count);
  return items.map((item) => {
    const wrong = countryCapitals.filter((c) => c.id !== item.id);
    const wrongCapitals = pickRandom(wrong, 3).map((c) => c.capital);
    const options = shuffle([item.capital, ...wrongCapitals]);
    return {
      type: 'capital',
      questionText: `${item.country} başkenti neresidir?`,
      options,
      correctAnswer: item.capital,
    };
  });
}

/**
 * Türkiye ve dünya quiz soruları zaten hazır formatta.
 */
function toUnified(q) {
  return {
    type: q.options ? 'turkey' : 'world',
    questionText: q.question,
    options: q.options,
    correctAnswer: q.correctAnswer,
  };
}

function buildTurkeyQuestions(count) {
  return pickRandom(turkeyQuizQuestions, count).map((q) => ({
    ...toUnified(q),
    type: 'turkey',
  }));
}

function buildWorldQuestions(count) {
  return pickRandom(worldQuizQuestions, count).map((q) => ({
    ...toUnified(q),
    type: 'world',
  }));
}

const DEFAULT_COUNTS = { flag: 3, capital: 3, turkey: 2, world: 2 };
const TOTAL = 10;

/**
 * Karışık quiz için 10 soruluk havuz döndürür (bayrak + başkent + Türkiye + dünya).
 * counts: { flag, capital, turkey, world } – her türden kaç soru (varsayılan 3,3,2,2)
 */
export function getMixedQuizQuestions(counts = DEFAULT_COUNTS) {
  const flag = buildFlagQuestions(counts.flag ?? 3);
  const capital = buildCapitalQuestions(counts.capital ?? 3);
  const turkey = buildTurkeyQuestions(counts.turkey ?? 2);
  const world = buildWorldQuestions(counts.world ?? 2);
  return shuffle([...flag, ...capital, ...turkey, ...world]).slice(0, TOTAL);
}

export const MIXED_QUIZ_TOTAL = TOTAL;
