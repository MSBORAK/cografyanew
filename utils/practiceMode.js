import AsyncStorage from '@react-native-async-storage/async-storage';

const WRONG_ANSWERS_KEY = '@wrong_answers';

// Yanlış cevapları kaydet
export const saveWrongAnswer = async (category, itemId, itemName) => {
  try {
    const existingData = await AsyncStorage.getItem(WRONG_ANSWERS_KEY);
    const wrongAnswers = existingData ? JSON.parse(existingData) : {};
    
    if (!wrongAnswers[category]) {
      wrongAnswers[category] = [];
    }
    
    // Eğer zaten listede yoksa ekle
    const exists = wrongAnswers[category].some(item => item.id === itemId);
    if (!exists) {
      wrongAnswers[category].push({
        id: itemId,
        name: itemName,
        timestamp: new Date().toISOString(),
        attempts: 1
      });
    } else {
      // Varsa attempt sayısını artır
      const index = wrongAnswers[category].findIndex(item => item.id === itemId);
      wrongAnswers[category][index].attempts += 1;
      wrongAnswers[category][index].timestamp = new Date().toISOString();
    }
    
    await AsyncStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(wrongAnswers));
    return true;
  } catch (error) {
    console.error('Yanlış cevap kaydedilemedi:', error);
    return false;
  }
};

// Doğru cevaplandığında yanlış listesinden çıkar
export const removeWrongAnswer = async (category, itemId) => {
  try {
    const existingData = await AsyncStorage.getItem(WRONG_ANSWERS_KEY);
    if (!existingData) return true;
    
    const wrongAnswers = JSON.parse(existingData);
    
    if (wrongAnswers[category]) {
      wrongAnswers[category] = wrongAnswers[category].filter(item => item.id !== itemId);
    }
    
    await AsyncStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(wrongAnswers));
    return true;
  } catch (error) {
    console.error('Yanlış cevap silinemedi:', error);
    return false;
  }
};

// Belirli bir kategorideki yanlış cevapları getir
export const getWrongAnswers = async (category) => {
  try {
    const existingData = await AsyncStorage.getItem(WRONG_ANSWERS_KEY);
    if (!existingData) return [];
    
    const wrongAnswers = JSON.parse(existingData);
    return wrongAnswers[category] || [];
  } catch (error) {
    console.error('Yanlış cevaplar getirilemedi:', error);
    return [];
  }
};

// Tüm yanlış cevapları getir
export const getAllWrongAnswers = async () => {
  try {
    const existingData = await AsyncStorage.getItem(WRONG_ANSWERS_KEY);
    if (!existingData) return {};
    
    return JSON.parse(existingData);
  } catch (error) {
    console.error('Tüm yanlış cevaplar getirilemedi:', error);
    return {};
  }
};

// Belirli bir kategorideki tüm yanlış cevapları temizle
export const clearWrongAnswers = async (category) => {
  try {
    const existingData = await AsyncStorage.getItem(WRONG_ANSWERS_KEY);
    if (!existingData) return true;
    
    const wrongAnswers = JSON.parse(existingData);
    wrongAnswers[category] = [];
    
    await AsyncStorage.setItem(WRONG_ANSWERS_KEY, JSON.stringify(wrongAnswers));
    return true;
  } catch (error) {
    console.error('Yanlış cevaplar temizlenemedi:', error);
    return false;
  }
};

// İstatistikleri getir
export const getStatistics = async () => {
  try {
    const wrongAnswers = await getAllWrongAnswers();
    const stats = {};
    
    Object.keys(wrongAnswers).forEach(category => {
      stats[category] = {
        total: wrongAnswers[category].length,
        mostDifficult: wrongAnswers[category]
          .sort((a, b) => b.attempts - a.attempts)
          .slice(0, 5)
      };
    });
    
    return stats;
  } catch (error) {
    console.error('İstatistikler getirilemedi:', error);
    return {};
  }
};
