import { countryFlags } from '../constants/countryFlags';
import { countryCapitals } from '../constants/countryCapitals';
import { turkeyQuizQuestions } from '../constants/turkeyQuizQuestions';
import { worldQuizQuestions } from '../constants/worldQuizQuestions';
import { getQuestionsForDifficulty } from './quizDifficulty';

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

function buildTurkeyQuestions(count, difficulty = 'medium') {
  const pool = getQuestionsForDifficulty(turkeyQuizQuestions, difficulty, count);
  return pool.map((q) => ({
    ...toUnified(q),
    type: 'turkey',
  }));
}

function buildWorldQuestions(count, difficulty = 'medium') {
  const pool = getQuestionsForDifficulty(worldQuizQuestions, difficulty, count);
  return pool.map((q) => ({
    ...toUnified(q),
    type: 'world',
  }));
}

const DEFAULT_COUNTS = { flag: 5, capital: 5, turkey: 5, world: 5 };
const TOTAL = 20;

/**
 * Karışık quiz için 20 soruluk havuz (bayrak + başkent + Türkiye + dünya).
 * counts: { flag, capital, turkey, world } – varsayılan 5,5,5,5
 * difficulty: Zor/Ultra Zor'da Türkiye ve Dünya soruları zor havuzdan seçilir.
 */
export function getMixedQuizQuestions(counts = DEFAULT_COUNTS, difficulty = 'medium') {
  const flag = buildFlagQuestions(counts.flag ?? 5);
  const capital = buildCapitalQuestions(counts.capital ?? 5);
  const turkey = buildTurkeyQuestions(counts.turkey ?? 5, difficulty);
  const world = buildWorldQuestions(counts.world ?? 5, difficulty);
  return shuffle([...flag, ...capital, ...turkey, ...world]).slice(0, TOTAL);
}

export const MIXED_QUIZ_TOTAL = TOTAL;
