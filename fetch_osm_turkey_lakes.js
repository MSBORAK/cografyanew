// OpenStreetMap Overpass API'den Türkiye'deki büyük gölleri çekme
const https = require('https');
const fs = require('fs');

// SVG viewBox koordinatları
const SVG_VIEWBOX = {
  width: 1007.478,
  height: 527.323,
  minLon: 25.4,
  maxLon: 45.0,
  minLat: 35.5,
  maxLat: 42.5
};

// Lat/Lon'u SVG koordinatlarına çevir
function latLonToSVG(lon, lat) {
  const x = ((lon - SVG_VIEWBOX.minLon) / (SVG_VIEWBOX.maxLon - SVG_VIEWBOX.minLon)) * SVG_VIEWBOX.width;
  const y = ((SVG_VIEWBOX.maxLat - lat) / (SVG_VIEWBOX.maxLat - SVG_VIEWBOX.minLat)) * SVG_VIEWBOX.height;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// Türkiye'nin önemli gölleri (manuel liste - Türkçe isimlerle)
const majorLakes = [
  { name: 'Van Gölü', lat: 38.6710, lon: 43.0122, rx: 40, ry: 28 },
  { name: 'Tuz Gölü', lat: 38.8158, lon: 33.4457, rx: 35, ry: 22 },
  { name: 'Beyşehir Gölü', lat: 37.7692, lon: 31.5164, rx: 22, ry: 16 },
  { name: 'Eğirdir Gölü', lat: 38.0665, lon: 30.8508, rx: 18, ry: 14 },
  { name: 'İznik Gölü', lat: 40.4333, lon: 29.5167, rx: 16, ry: 13 },
  { name: 'Sapanca Gölü', lat: 40.6833, lon: 30.2667, rx: 14, ry: 9 },
  { name: 'Bafa Gölü', lat: 37.5000, lon: 27.4667, rx: 13, ry: 11 },
  { name: 'Manyas Gölü', lat: 40.1833, lon: 28.0333, rx: 15, ry: 11 },
  { name: 'Hazar Gölü', lat: 38.5000, lon: 39.4333, rx: 18, ry: 11 },
  { name: 'Çıldır Gölü', lat: 41.1333, lon: 43.1333, rx: 15, ry: 13 },
  { name: 'Akşehir Gölü', lat: 38.3333, lon: 31.4167, rx: 12, ry: 10 },
  { name: 'Eber Gölü', lat: 38.6333, lon: 31.1833, rx: 11, ry: 9 },
  { name: 'Kovada Gölü', lat: 37.6833, lon: 30.9333, rx: 10, ry: 8 },
  { name: 'Apolyont Gölü', lat: 40.1667, lon: 28.7167, rx: 10, ry: 8 },
  { name: 'Uluabat Gölü', lat: 40.1833, lon: 28.5833, rx: 12, ry: 9 },
];

console.log('Türkiye\'nin önemli gölleri - SVG koordinatları:\n');
console.log('='.repeat(70));

const lakesData = majorLakes.map((lake, index) => {
  const svgCoords = latLonToSVG(lake.lon, lake.lat);
  
  console.log(`\n${index + 1}. ${lake.name}`);
  console.log(`   Konum: ${lake.lat.toFixed(4)}°N, ${lake.lon.toFixed(4)}°E`);
  console.log(`   SVG: x=${svgCoords.x}, y=${svgCoords.y}, rx=${lake.rx}, ry=${lake.ry}`);
  
  return {
    id: index + 1,
    name: lake.name,
    x: svgCoords.x,
    y: svgCoords.y,
    rx: lake.rx,
    ry: lake.ry,
    lat: lake.lat,
    lon: lake.lon
  };
});

console.log('\n' + '='.repeat(70));
console.log('\n=== React Native için kod ===\n');
console.log('const lakes = [');
lakesData.forEach(lake => {
  console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${lake.x}, y: ${lake.y}, rx: ${lake.rx}, ry: ${lake.ry} },`);
});
console.log('];');

// JSON dosyasına kaydet
fs.writeFileSync('turkey_major_lakes_final.json', JSON.stringify(lakesData, null, 2));
console.log('\n✓ Veriler turkey_major_lakes_final.json dosyasına kaydedildi.');
console.log(`✓ Toplam ${lakesData.length} göl işlendi.`);
