# Premium ödeme – App Store & Play Store

Kullanıcılar premium’u **App Store (iOS)** ve **Google Play (Android)** üzerinden, uygulama içi satın alma (In-App Purchase) ile ödeyecek.

## Şu anki durum

- Kilitli bölümler ve tek fiyat ekranı hazır.
- “Tümünü Aç” butonu şu an **simülasyon**: ödeme yok, direkt tüm kilitler açılıyor (test için).

## Gerçek ödeme eklemek için

### 1. Mağaza tarafı

**Apple (App Store)**  
- [App Store Connect](https://appstoreconnect.apple.com) → Uygulama → In-App Purchases  
- **Non-Consumable** (tüketilemeyen) ürün ekle, örn. ID: `premium_unlock`  
- Fiyatı belirle (₺ veya $)

**Google (Play Store)**  
- [Play Console](https://play.google.com/console) → Uygulama → Monetize → In-app products  
- **One-time product** ekle, aynı ID kullanılabilir: `premium_unlock`  
- Fiyatı belirle

### 2. Uygulama tarafı (React Native / Expo)

Expo ile native IAP kullanmak için **development build** (expo dev client) gerekir; EAS Build ile oluşturabilirsin.

**Paket:** `react-native-iap`

```bash
npx expo install react-native-iap
```

**Akış (kısaca):**  
1. Uygulama açılışında IAP bağlantısı / ürün bilgisi al.  
2. Kullanıcı “Tümünü Aç (Ödeme yap)”a basınca `requestPurchase({ sku: 'premium_unlock' })` (veya paketin API’sine göre eşdeğeri) çağır.  
3. Mağaza ödeme ekranı açılır; kullanıcı öder veya iptal eder.  
4. **Sadece ödeme başarılı olduğunda** `unlockAll()` ve `onUnlock(featureId)` çağır (şu anki `PaywallModal` mantığı).  
5. Hata/iptal durumunda loading’i kapat, gerekirse kullanıcıya mesaj göster.

Bu akışı `PaywallModal.js` içindeki `handleUnlock` fonksiyonuna entegre edeceksin: gerçek IAP çağrısı burada yapılacak, başarılı yanıt gelince mevcut `unlockAll()` + `onUnlock` + `onClose()` çağrıları aynen kullanılacak.

### 3. Özet

| Platform   | Ödeme yeri      | Ürün tipi        |
|-----------|------------------|-------------------|
| iOS       | App Store        | In-App Purchase   |
| Android   | Google Play      | In-app product    |

Evet, ödemeler App Store ve Play Store üzerinden yapılacak; kullanıcı Apple/Google hesabıyla öder, sen de sadece satın alma başarılı olduğunda `unlockAll()` ile premium’u açacaksın.
