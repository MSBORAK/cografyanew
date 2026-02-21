/**
 * Quiz zorluk seviyesine göre soru havuzundan seçim.
 * Kolay/Orta: tüm sorulardan karışık.
 * Zor: ağırlıklı hard sorular.
 * Ultra Zor: sadece hard sorular.
 */

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const DEFAULT_COUNT = 25;

/**
 * @param {Array} pool - Soru listesi (her soruda level: 'easy' | 'medium' | 'hard' olmalı)
 * @param {string} difficulty - 'easy' | 'medium' | 'hard' | 'ultra'
 * @param {number} count - Kaç soru seçilecek
 * @returns {Array} Seçilen sorular
 */
export function getQuestionsForDifficulty(pool, difficulty, count = DEFAULT_COUNT) {
  if (!pool || pool.length === 0) return [];
  const hasLevel = pool.some((q) => q.level);
  if (!hasLevel) return shuffle(pool).slice(0, Math.min(count, pool.length));

  const hard = pool.filter((q) => q.level === 'hard');
  const notHard = pool.filter((q) => q.level !== 'hard');

  if (difficulty === 'easy' || difficulty === 'medium') {
    return shuffle(pool).slice(0, Math.min(count, pool.length));
  }

  if (difficulty === 'hard') {
    const shuffledHard = shuffle(hard);
    const shuffledRest = shuffle(notHard);
    const need = count - shuffledHard.length;
    if (need <= 0) return shuffledHard.slice(0, count);
    return shuffle([...shuffledHard, ...shuffledRest.slice(0, need)]).slice(0, count);
  }

  if (difficulty === 'ultra') {
    if (hard.length === 0) return shuffle(notHard).slice(0, count);
    const shuffledHard = shuffle(hard);
    return shuffledHard.slice(0, Math.min(count, shuffledHard.length));
  }

  return shuffle(pool).slice(0, Math.min(count, pool.length));
}
