// Günün Sözü - İlham verici sözler

export const DAILY_QUOTES = [
  'Başarı, küçük çabaların günlük tekrarlarıdır.',
  'Öğrenmek bir yolculuktur, varış değil.',
  'Zorluklar, seni daha güçlü yapan fırsatlardır.',
  'Bugün öğrendiğin her şey, yarının temelidir.',
  'Coğrafya, dünyanın dilidir.',
  'Küçük adımlar büyük başarılar getirir.',
  'Bilgi güçtür, öğrenmek özgürlüktür.',
  'Sabır ve azim her kapıyı açar.',
  'Her gün yeni bir başlangıçtır.',
  'Haritalar hayallere yol açar.',
  'Başarı tesadüf değil, tercihtir.',
  'Öğrenmenin yaşı yoktur.',
  'Disiplin, özgürlüğün anahtarıdır.',
  'Dünya, keşfetmeyi bekleyen bir hazinedir.',
  'Her soru, yeni bir öğrenme kapısıdır.',
  'Çalışmak, yeteneği aşar.',
  'Bugün çalış, yarın gurur duy.',
  'Coğrafya bilmek, dünyayı anlamaktır.',
  'Azimle dağlar yerinden oynar.',
  'Öğrenmek, hayat boyu süren bir maceradır.',
];

export const getDailyQuote = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  const index = dayOfYear % DAILY_QUOTES.length;
  return DAILY_QUOTES[index];
};
