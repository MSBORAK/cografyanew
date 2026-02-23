# Veri Kaynakları ve Bilgi Doğruluğu

Bu belge uygulamadaki coğrafi verilerin kaynaklarını ve olası hata kaynaklarını özetler. **Bilgi hatası olmaması** için eklediğin veya güncellediğin verileri güvenilir kaynaklarla (resmi istatistik, MEB, Vikipedi vb.) karşılaştırman önerilir.

## Ana veri dosyaları

| Dosya | İçerik | Kaynak / Not |
|-------|--------|----------------|
| `constants/worldPaths.js` | Dünya ülkeleri SVG path + ISO 3 harf kod + `countryNames` (Türkçe isim) | Guardian world-map, Natural Earth. Ülke isimleri Türkçe; kod–isim eşleşmesi tutarlı olmalı. |
| `constants/turkeyPaths.js` | 81 il SVG path + id (plaka) + `name` (il adı) | dnomak/svg-turkiye-haritasi. İl isimleri resmi (Türkiye İstatistik Kurumu / MEB). |
| `constants/regions.js` | 7 coğrafi bölge ve il plaka listeleri | Marmara, Ege, Akdeniz, İç Anadolu, Karadeniz, Doğu Anadolu, Güneydoğu Anadolu – plaka kodları `turkeyPaths` ile uyumlu olmalı. |
| `constants/countryCapitals.js` | Ülke–başkent eşleştirmesi (Başkentler Quiz) | Başkentler güncel resmi isimlerle (örn. Ankara, Washington, Pekin) kontrol edilmeli. |
| `constants/worldQuizQuestions.js` | Çoktan seçmeli dünya coğrafyası soruları | Cevap ve şıklar (en büyük kıta, en kalabalık ülke, dağ yükseklikleri vb.) zamanla değişebilir; periyodik gözden geçirme önerilir. |
| `constants/turkeyQuizQuestions.js` | Türkiye coğrafyası quiz soruları | Türkiye’ye özel; MEB müfredatı veya güncel istatistiklerle uyumlu tutulmalı. |
| `constants/countryFlags.js` | Bayrak quizi ülke–bayrak eşleşmesi | Ülke listesi ve bayraklar `countryNames` / `worldPaths` ile tutarlı olmalı. |

## Kontrol listesi (bilgi hatası önleme)

- [ ] **worldPaths:** Her `id` (örn. VNM, TUR) için `countryNames` içinde Türkçe isim var mı? (Eksikse uygulama kod gösterebilir.)
- [ ] **Quiz soruları:** `correctAnswer` mutlaka `options` içinde mi? Cevap metni (büyük/küçük harf, şehir adı) doğru mu?
- [ ] **Başkentler:** Resmi adlar kullanılıyor mu? (Örn. “Pekin” / “Beijing”, “Kiev” / “Kyiv” – uygulama diline göre karar ver.)
- [ ] **Türkiye bölgeleri:** `regions.js` içindeki plaka kodları (’34’, ’06’ vb.) `turkeyPaths` ile bire bir eşleşiyor mu?
- [ ] **Sayısal bilgiler:** Nüfus, yükseklik, yüzölçümü gibi sorular güncel mi? (Yılda bir gözden geçirilebilir.)

## Doğrulama scripti

Proje kökünde veri tutarlılığını kontrol etmek için:

```bash
npm run validate-data
```

veya `node utils/validateData.js`

Bu script:
- `worldPaths` içindeki her ülke `id`’sinin `countryNames`’te karşılığı olduğunu,
- İsteğe bağlı: quiz sorularında `correctAnswer`’ın `options` içinde olduğunu kontrol eder.

## Yeni veri eklerken

1. Mümkünse resmi veya güvenilir bir kaynak kullan (TÜİK, MEB, UN, CIA World Factbook vb.).
2. Quiz cevaplarını ekledikten sonra bir kez uygulama içinden test et.
3. Türkçe karakterleri (ı, ğ, ü, ş, ö, ç) doğru yaz; arayüzde yanlış görünmesine neden olabilir.
