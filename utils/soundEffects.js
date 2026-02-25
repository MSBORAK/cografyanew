// Ses efektleri – expo-audio (SDK 54, expo-av yerine)
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { Vibration } from 'react-native';

let correctPlayer = null;
let wrongPlayer = null;

export const loadSounds = async () => {
  try {
    await setAudioModeAsync({
      playsInSilentMode: true,
      staysActiveInBackground: false,
    });

    try {
      correctPlayer = createAudioPlayer(require('../assets/sounds/correct.mp3'));
    } catch (e) {
      console.log('Doğru ses dosyası bulunamadı');
    }

    try {
      wrongPlayer = createAudioPlayer(require('../assets/sounds/wrong.mp3'));
    } catch (e) {
      console.log('Yanlış ses dosyası bulunamadı');
    }
  } catch (error) {
    console.log('Ses yükleme hatası:', error);
  }
};

export const unloadSounds = async () => {
  try {
    if (correctPlayer) {
      correctPlayer.release();
      correctPlayer = null;
    }
    if (wrongPlayer) {
      wrongPlayer.release();
      wrongPlayer = null;
    }
  } catch (error) {
    console.log('Ses temizleme hatası:', error);
  }
};

export const playCorrectSound = async () => {
  try {
    if (correctPlayer) {
      correctPlayer.seekTo(0);
      correctPlayer.play();
    }
  } catch (error) {
    console.log('Ses çalma hatası:', error);
  }
  try {
    Vibration.vibrate(100);
  } catch (_) {}
};

export const playWrongSound = async () => {
  try {
    if (wrongPlayer) {
      wrongPlayer.seekTo(0);
      wrongPlayer.play();
    }
  } catch (error) {
    console.log('Ses çalma hatası:', error);
  }
  try {
    Vibration.vibrate([0, 100, 100, 100]);
  } catch (_) {}
};
