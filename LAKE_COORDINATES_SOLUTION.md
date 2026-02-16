# Göl Koordinatları Çözümü

## Problem
Türkiye haritasında göllerin doğru konumda gösterilmesi gerekiyordu. Manuel tahminler ve şehir koordinatlarından hesaplamalar yanlış sonuçlar veriyordu.

## Profesyonel Çözüm

### 1. Veri Kaynağı
**Natural Earth Data** kullanıldı:
- Açık kaynak, public domain coğrafi veri seti
- 1:10m, 1:50m ve 1:110m ölçeklerde mevcut
- GeoJSON formatında göl geometrileri içeriyor
- Kaynak: https://github.com/martynafford/natural-earth-geojson

### 2. Koordinat Dönüşümü
Gerçek coğrafi koordinatlar (latitude/longitude) SVG viewBox koordinatlarına dönüştürüldü:

```javascript
// Türkiye sınırları
const TURKEY_BOUNDS = {
  minLat: 35.5,
  maxLat: 42.5,
  minLon: 25.4,
  maxLon: 45.0
};

// SVG viewBox
const SVG_VIEWBOX = {
  width: 1007.478,
  height: 527.323
};

// Dönüşüm formülü
function latLonToSVG(lon, lat) {
  const x = ((lon - minLon) / (maxLon - minLon)) * width;
  const y = ((maxLat - lat) / (maxLat - minLat)) * height;
  return { x, y };
}
```

### 3. Göl Listesi
Türkiye'nin en büyük 10 gölü seçildi:

| # | Göl Adı | Lat | Lon | SVG X | SVG Y |
|---|---------|-----|-----|-------|-------|
| 1 | Van Gölü | 38.6710°N | 43.0122°E | 905.3 | 288.4 |
| 2 | Tuz Gölü | 38.8158°N | 33.4457°E | 413.6 | 277.5 |
| 3 | Beyşehir Gölü | 37.7692°N | 31.5164°E | 314.4 | 356.4 |
| 4 | Eğirdir Gölü | 38.0665°N | 30.8508°E | 280.2 | 334.0 |
| 5 | İznik Gölü | 40.4333°N | 29.5167°E | 211.6 | 155.7 |
| 6 | Sapanca Gölü | 40.6833°N | 30.2667°E | 250.2 | 136.9 |
| 7 | Bafa Gölü | 37.5000°N | 27.4667°E | 106.2 | 376.7 |
| 8 | Manyas Gölü | 40.1833°N | 28.0333°E | 135.4 | 174.5 |
| 9 | Hazar Gölü | 38.5000°N | 39.4333°E | 721.3 | 301.3 |
| 10 | Çıldır Gölü | 41.1333°N | 43.1333°E | 911.5 | 103.0 |

### 4. Kullanılan Scriptler

#### `fetch_natural_earth_lakes.js`
- Natural Earth GeoJSON'dan göl verilerini indirir
- Türkiye sınırları içindeki gölleri filtreler
- Coğrafi koordinatları SVG koordinatlarına dönüştürür
- Göl boyutlarını hesaplar (rx, ry)

#### `fetch_osm_turkey_lakes.js`
- Türkiye'nin önemli göllerinin manuel listesi
- Gerçek coğrafi koordinatlar kullanılır
- SVG koordinatlarına dönüştürülür
- JSON formatında kaydedilir

### 5. Sonuç
Göller artık gerçek coğrafi konumlarında doğru şekilde gösteriliyor:
- ✅ Van Gölü: Doğu Anadolu'da, Van şehrinin yanında
- ✅ Tuz Gölü: İç Anadolu'da, Ankara-Konya arasında
- ✅ Beyşehir Gölü: Konya'nın güneybatısında
- ✅ Eğirdir Gölü: Isparta bölgesinde
- ✅ İznik Gölü: Bursa yakınında
- ✅ Sapanca Gölü: Sakarya bölgesinde
- ✅ Bafa Gölü: Ege kıyısında, Aydın
- ✅ Manyas Gölü: Balıkesir, Marmara'nın güneyinde
- ✅ Hazar Gölü: Elazığ bölgesinde
- ✅ Çıldır Gölü: Kuzeydoğu, Ardahan yakınında

## Avantajlar
1. **Doğruluk**: Gerçek coğrafi verilerden hesaplanmış
2. **Profesyonellik**: Güvenilir kaynaklardan (Natural Earth, OSM)
3. **Ölçeklenebilirlik**: Daha fazla göl kolayca eklenebilir
4. **Bakım Kolaylığı**: Koordinat dönüşüm scriptleri mevcut
5. **Açık Kaynak**: Public domain veriler kullanıldı

## Lisans
- Natural Earth Data: Public Domain
- OpenStreetMap: ODbL (Open Database License)
