# Göl Koordinatları Kaynağı

Bu dosya, LakesMap bileşeninde kullanılan göl koordinatlarının nasıl elde edildiğini açıklar.

## Koordinat Dönüşüm Süreci

### 1. Gerçek Coğrafi Koordinatlar
Göllerin gerçek enlem (latitude) ve boylam (longitude) koordinatları Wikipedia ve diğer güvenilir kaynaklardan alınmıştır:

| Göl Adı | Enlem (°N) | Boylam (°E) | Kaynak |
|---------|-----------|-------------|---------|
| Van Gölü | 38.656776 | 42.805481 | Wikipedia |
| Tuz Gölü | 38.733 | 33.383 | Wikipedia |
| Beyşehir Gölü | 37.78333 | 31.55 | Wikipedia |
| Eğirdir Gölü | 38.05667 | 30.86611 | Wikipedia |
| İznik Gölü | 40.43 | 29.51 | Wikipedia |
| Sapanca Gölü | 40.69 | 30.27 | Wikipedia |
| Manyas Gölü | 40.05 | 27.97 | Wikipedia |
| Hazar Gölü | 38.483 | 39.417 | Wikipedia |
| Çıldır Gölü | 41.1 | 42.7 | Wikipedia |
| Bafa Gölü | 37.504 | 27.524 | Wikipedia |

### 2. SVG ViewBox Bilgileri
Türkiye haritası SVG'si şu viewBox'ı kullanır: `0 0 1007.478 527.323`

Türkiye'nin coğrafi sınırları (yaklaşık):
- Enlem: 36°N - 42°N (6 derece)
- Boylam: 26°E - 45°E (19 derece)

### 3. Dönüşüm Formülü

```javascript
function latLonToSVG(lat, lon) {
  const SVG_WIDTH = 1007.478;
  const SVG_HEIGHT = 527.323;
  const MIN_LAT = 36;
  const MAX_LAT = 42;
  const MIN_LON = 26;
  const MAX_LON = 45;
  
  // Y koordinatı (ters çevrilmiş, çünkü SVG'de Y aşağı doğru artar)
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * SVG_HEIGHT;
  
  // X koordinatı
  const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * SVG_WIDTH;
  
  return { x, y };
}
```

### 4. Sonuç Koordinatlar
Dönüştürülmüş SVG koordinatları:

```javascript
const lakes = [
  { id: 1, name: 'Van Gölü', x: 891.1, y: 293.8, rx: 40, ry: 28 },
  { id: 2, name: 'Tuz Gölü', x: 391.5, y: 287.1, rx: 35, ry: 22 },
  { id: 3, name: 'Beyşehir Gölü', x: 294.3, y: 370.6, rx: 22, ry: 16 },
  { id: 4, name: 'Eğirdir Gölü', x: 258, y: 346.6, rx: 18, ry: 14 },
  { id: 5, name: 'İznik Gölü', x: 186.1, y: 138, rx: 16, ry: 13 },
  { id: 6, name: 'Sapanca Gölü', x: 226.4, y: 115.1, rx: 14, ry: 9 },
  { id: 7, name: 'Bafa Gölü', x: 80.8, y: 395.1, rx: 13, ry: 11 },
  { id: 8, name: 'Manyas Gölü', x: 104.5, y: 171.4, rx: 15, ry: 11 },
  { id: 9, name: 'Hazar Gölü', x: 711.4, y: 309.1, rx: 18, ry: 11 },
  { id: 10, name: 'Çıldır Gölü', x: 885.5, y: 79.1, rx: 15, ry: 13 },
];
```

## Doğrulama
Koordinatlar şu şekilde doğrulanabilir:
1. Van Gölü doğuda (x=891.1, yüksek değer ✓)
2. Bafa Gölü batıda (x=80.8, düşük değer ✓)
3. Çıldır Gölü kuzeyde (y=79.1, düşük değer ✓)
4. Bafa Gölü güneyde (y=395.1, yüksek değer ✓)

## Hesaplama Scripti
Koordinatları yeniden hesaplamak için `calculate_lake_coordinates.js` dosyasını kullanabilirsiniz:

```bash
node calculate_lake_coordinates.js
```
