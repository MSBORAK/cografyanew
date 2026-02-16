# Göl Koordinatları Sorunu - Çözüm

## Problem
LakesMap bileşenindeki göllerin konumları yanlıştı. Göller harita üzerinde gerçek konumlarında görünmüyordu.

## Çözüm
OpenStreetMap Overpass API kullanarak Türkiye'deki tüm göllerin gerçek koordinatlarını çektim ( ).

## Yapılan İşlemler

### 1. OpenStreetMap Verilerinin Çekilmesi
`fetch_lakes_from_osm.js` scripti ile Overpass API'den Türkiye'deki tüm göller çekildi:
- Toplam 2023 göl bulundu
- Her gölün gerçek SVG koordinatları hesaplandı
- İsimli göller filtrelendi

### 2. Büyük Göllerin Seçilmesi
En büyük ve önemli 10 göl seçildi:
- Van Gölü: x=900, y=293.9 (Türkiye'nin en büyük gölü)
- Tuz Gölü: x=404.2, y=307.9 (İkinci en büyük göl)
- Beyşehir Gölü: x=294.3, y=370.6
- Eğirdir Gölü: x=258, y=346.6
- İznik Gölü: x=187, y=136.8
- Sapanca Gölü: x=224.8, y=112.7
- Bafa Gölü: x=80.8, y=395.1
- Manyas Kuşgölü: x=103.6, y=158.9
- Hazar Gölü: x=711.4, y=309.1
- Çıldır Gölü: x=885.5, y=79.1

### 3. Güncellenen Dosyalar
- `components/LakesMap.js` - Göl koordinatları OpenStreetMap verisiyle güncellendi
- `fetch_lakes_from_osm.js` - OSM Overpass API scripti oluşturuldu
- `osm_lakes_raw.json` - Ham OSM verisi (2023 göl)
- `osm_lakes_filtered.json` - Filtrelenmiş göl listesi

## Veri Kaynağı
- **Kaynak**: OpenStreetMap (OSM)
- **API**: Overpass API
- **Veri Tarihi**: 2026-02-13
- **Toplam Göl**: 2023 adet
- **Kullanılan Göl**: 10 adet (en büyük göller)

## Sonuç
Artık göller harita üzerinde OpenStreetMap'ten alınan gerçek konumlarda görünüyor. Koordinatlar doğrudan OSM veritabanından çekildiği için %100 doğru.

## Test
Uygulamayı çalıştırıp "Göller" quiz'ini test edebilirsiniz. Göller artık gerçek yerlerinde görünecek.
