// turkeyPaths.js dosyasındaki path'lerin koordinat aralığını analiz et
const fs = require('fs');

// turkeyPaths.js dosyasını oku
const pathsContent = fs.readFileSync('constants/turkeyPaths.js', 'utf8');

// Path verilerini parse et (basit regex ile)
const pathMatches = pathsContent.matchAll(/"d":\s*"([^"]+)"/g);

let minX = Infinity, maxX = -Infinity;
let minY = Infinity, maxY = -Infinity;

for (const match of pathMatches) {
  const pathData = match[1];
  
  // Path'deki tüm sayıları çıkar
  const numbers = pathData.match(/[-+]?\d*\.?\d+/g);
  
  if (numbers) {
    for (let i = 0; i < numbers.length; i += 2) {
      const x = parseFloat(numbers[i]);
      const y = parseFloat(numbers[i + 1]);
      
      if (!isNaN(x) && !isNaN(y)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
}

console.log('turkeyPaths.js Koordinat Analizi:');
console.log('='.repeat(60));
console.log(`X aralığı: ${minX.toFixed(2)} - ${maxX.toFixed(2)}`);
console.log(`Y aralığı: ${minY.toFixed(2)} - ${maxY.toFixed(2)}`);
console.log(`Genişlik: ${(maxX - minX).toFixed(2)}`);
console.log(`Yükseklik: ${(maxY - minY).toFixed(2)}`);
console.log('='.repeat(60));

// Şimdi göl koordinatlarını bu sisteme göre ayarlayalım
console.log('\nGöllerin gerçek coğrafi koordinatları:');
console.log('='.repeat(60));

const lakes = [
  { name: 'Van Gölü', lat: 38.6710, lon: 43.0122 },
  { name: 'Tuz Gölü', lat: 38.8158, lon: 33.4457 },
  { name: 'Beyşehir Gölü', lat: 37.7692, lon: 31.5164 },
  { name: 'Eğirdir Gölü', lat: 38.0665, lon: 30.8508 },
  { name: 'İznik Gölü', lat: 40.4333, lon: 29.5167 },
  { name: 'Sapanca Gölü', lat: 40.6833, lon: 30.2667 },
  { name: 'Bafa Gölü', lat: 37.5000, lon: 27.4667 },
  { name: 'Manyas Gölü', lat: 40.1833, lon: 28.0333 },
  { name: 'Hazar Gölü', lat: 38.5000, lon: 39.4333 },
  { name: 'Çıldır Gölü', lat: 41.1333, lon: 43.1333 },
];

// Türkiye coğrafi sınırları
const GEO_BOUNDS = {
  minLat: 35.5,
  maxLat: 42.5,
  minLon: 25.4,
  maxLon: 45.0
};

// turkeyPaths koordinat sistemi
const PATH_BOUNDS = {
  minX: minX,
  maxX: maxX,
  minY: minY,
  maxY: maxY
};

console.log('\nDönüştürülmüş göl koordinatları (turkeyPaths sistemi):');
console.log('='.repeat(60));

lakes.forEach((lake, index) => {
  // Lat/Lon'u turkeyPaths koordinat sistemine çevir
  const x = ((lake.lon - GEO_BOUNDS.minLon) / (GEO_BOUNDS.maxLon - GEO_BOUNDS.minLon)) * (PATH_BOUNDS.maxX - PATH_BOUNDS.minX) + PATH_BOUNDS.minX;
  const y = ((GEO_BOUNDS.maxLat - lake.lat) / (GEO_BOUNDS.maxLat - GEO_BOUNDS.minLat)) * (PATH_BOUNDS.maxY - PATH_BOUNDS.minY) + PATH_BOUNDS.minY;
  
  console.log(`${index + 1}. ${lake.name}`);
  console.log(`   Coğrafi: ${lake.lat.toFixed(4)}°N, ${lake.lon.toFixed(4)}°E`);
  console.log(`   turkeyPaths: x=${x.toFixed(1)}, y=${y.toFixed(1)}`);
});

console.log('\n' + '='.repeat(60));
console.log('SONUÇ: turkeyPaths.js dosyası şu koordinat sistemini kullanıyor:');
console.log(`  X: ${minX.toFixed(2)} - ${maxX.toFixed(2)}`);
console.log(`  Y: ${minY.toFixed(2)} - ${maxY.toFixed(2)}`);
console.log('='.repeat(60));
