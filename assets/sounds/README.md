# Ses Dosyaları

Bu klasöre quiz için ses efektleri eklemeniz gerekiyor.

## Gerekli Dosyalar

1. **correct.mp3** - Doğru cevap sesi
   - Kısa, yüksek frekanslı "ding" veya "beep" sesi
   - Önerilen süre: 0.2-0.5 saniye
   - Önerilen frekans: 800-1000 Hz

2. **wrong.mp3** - Yanlış cevap sesi
   - Kısa, düşük frekanslı "buzz" veya "error" sesi
   - Önerilen süre: 0.3-0.5 saniye
   - Önerilen frekans: 200-300 Hz

## Ses Dosyalarını Nereden Bulabilirsiniz?

### Ücretsiz Ses Kütüphaneleri:
1. **Mixkit** - https://mixkit.co/free-sound-effects/
   - "Success" veya "Notification" kategorisine bakın
   - Doğru cevap için: "Positive notification" sesleri
   - Yanlış cevap için: "Error" veya "Negative" sesleri

2. **Freesound** - https://freesound.org/
   - Arama: "correct beep", "wrong buzz"
   - Ücretsiz hesap gerektirir

3. **Zapsplat** - https://www.zapsplat.com/
   - "Game sounds" > "UI" kategorisi
   - Ücretsiz hesap gerektirir

### Online Ses Oluşturucular:
1. **Online Tone Generator** - https://onlinetonegenerator.com/
   - Doğru cevap için: 1000 Hz, 0.2 saniye
   - Yanlış cevap için: 300 Hz, 0.3 saniye
   - "Download" butonuyla MP3 olarak indirin

2. **BeepBox** - https://www.beepbox.co/
   - Basit melodi oluşturup export edebilirsiniz

## Dosyaları Nasıl Eklersiniz?

1. Yukarıdaki sitelerden ses dosyalarını indirin
2. Dosyaları `correct.mp3` ve `wrong.mp3` olarak yeniden adlandırın
3. Bu klasöre (`assets/sounds/`) kopyalayın
4. Uygulamayı yeniden başlatın

## Not

Ses dosyaları yoksa uygulama sadece titreşim ile çalışacaktır. Ses dosyaları eklendiğinde hem ses hem titreşim olacaktır.
