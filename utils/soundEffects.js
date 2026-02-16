// Ses efektleri yardımcı fonksiyonları
import { Audio } from 'expo-av';
import { Vibration } from 'react-native';

let correctSound = null;
let wrongSound = null;

// Sesleri yükle
export const loadSounds = async () => {
  try {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: false,
    });

    try {
      const { sound: correct } = await Audio.Sound.createAsync(
        require('../assets/sounds/correct.mp3'),
        { shouldPlay: false }
      );
      correctSound = correct;
    } catch (e) {
      console.log('Doğru ses dosyası bulunamadı');
    }

    try {
      const { sound: wrong } = await Audio.Sound.createAsync(
        require('../assets/sounds/wrong.mp3'),
        { shouldPlay: false }
      );
      wrongSound = wrong;
    } catch (e) {
      console.log('Yanlış ses dosyası bulunamadı');
    }
  } catch (error) {
    console.log('Ses yükleme hatası:', error);
  }
};

// Sesleri temizle
export const unloadSounds = async () => {
  try {
    if (correctSound) {
      await correctSound.unloadAsync();
      correctSound = null;
    }
    if (wrongSound) {
      await wrongSound.unloadAsync();
      wrongSound = null;
    }
  } catch (error) {
    console.log('Ses temizleme hatası:', error);
  }
};

// Doğru cevap sesi çal
export const playCorrectSound = async () => {
  try {
    if (correctSound) {
      await correctSound.replayAsync();
    }
  } catch (error) {
    console.log('Ses çalma hatası:', error);
  }
  // Kısa titreşim
  Vibration.vibrate(100);
};

// Yanlış cevap sesi çal
export const playWrongSound = async () => {
  try {
    if (wrongSound) {
      await wrongSound.replayAsync();
    }
  } catch (error) {
    console.log('Ses çalma hatası:', error);
  }
  // Çift titreşim
  Vibration.vibrate([0, 100, 100, 100]);
};
