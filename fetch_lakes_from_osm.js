// OpenStreetMap Overpass API kullanarak Türkiye'deki gölleri çek
// Bu script büyük gölleri (natural=water + water=lake) çeker

const https = require('https');
const fs = require('fs');

// Overpass API query - Türkiye'deki büyük gölleri çek
const query = `
[out:json][timeout:90];
(
  node["natural"="water"]["name"~"Göl",i](36,26,42,45);
  way["natural"="water"]["name"~"Göl",i](36,26,42,45);
  relation["natural"="water"]["name"~"Göl",i](36,26,42,45);
);
out center;
`;

const url = 'https://overpass-api.de/api/interpreter';

const postData = `data=${encodeURIComponent(query)}`;

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('OpenStreetMap Overpass API\'den Türkiye gölleri çekiliyor...');
console.log('Bu işlem 30-60 saniye sürebilir...\n');

const req = https.request(url, options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      
      if (json.elements && json.elements.length > 0) {
        console.log(`Toplam ${json.elements.length} göl bulundu.\n`);
        
        // Gölleri filtrele ve sırala
        const lakes = json.elements
          .filter(el => el.center || (el.lat && el.lon))
          .map(el => {
            const lat = el.center ? el.center.lat : el.lat;
            const lon = el.center ? el.center.lon : el.lon;
            const name = el.tags?.name || el.tags?.['name:tr'] || 'İsimsiz';
            
            return {
              id: el.id,
              name: name,
              lat: lat,
              lon: lon,
              tags: el.tags
            };
          })
          .filter(lake => lake.name !== 'İsimsiz') // İsimsiz gölleri çıkar
          .sort((a, b) => a.name.localeCompare(b.name, 'tr'));
        
        // Sonuçları kaydet
        fs.writeFileSync('osm_lakes_raw.json', JSON.stringify(json, null, 2));
        fs.writeFileSync('osm_lakes_filtered.json', JSON.stringify(lakes, null, 2));
        
        console.log('İsimli göller:');
        console.log('='.repeat(60));
        lakes.forEach((lake, index) => {
          console.log(`${index + 1}. ${lake.name}`);
          console.log(`   Koordinat: ${lake.lat.toFixed(4)}°N, ${lake.lon.toFixed(4)}°E`);
          console.log(`   OSM ID: ${lake.id}`);
          console.log('');
        });
        
        console.log(`\nToplam ${lakes.length} isimli göl bulundu.`);
        console.log('\nDosyalar kaydedildi:');
        console.log('- osm_lakes_raw.json (ham veri)');
        console.log('- osm_lakes_filtered.json (filtrelenmiş veri)');
        
        // SVG koordinatlarını hesapla
        console.log('\n\nSVG Koordinatları:');
        console.log('='.repeat(60));
        
        const SVG_WIDTH = 1007.478;
        const SVG_HEIGHT = 527.323;
        const MIN_LAT = 36;
        const MAX_LAT = 42;
        const MIN_LON = 26;
        const MAX_LON = 45;
        
        function latLonToSVG(lat, lon) {
          const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * SVG_HEIGHT;
          const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * SVG_WIDTH;
          return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
        }
        
        lakes.forEach((lake, index) => {
          const svg = latLonToSVG(lake.lat, lake.lon);
          console.log(`{ id: ${index + 1}, name: '${lake.name}', x: ${svg.x}, y: ${svg.y}, rx: 15, ry: 10 },`);
        });
        
      } else {
        console.log('Hiç göl bulunamadı.');
        console.log('Yanıt:', JSON.stringify(json, null, 2));
      }
    } catch (error) {
      console.error('JSON parse hatası:', error.message);
      console.log('Ham yanıt:', data.substring(0, 500));
    }
  });
});

req.on('error', (error) => {
  console.error('İstek hatası:', error.message);
});

req.write(postData);
req.end();
