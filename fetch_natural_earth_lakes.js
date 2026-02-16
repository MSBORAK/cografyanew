// Natural Earth GeoJSON'dan Türkiye göllerini çekme scripti
const https = require('https');
const fs = require('fs');

// Natural Earth 10m lakes GeoJSON URL
const LAKES_URL = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/physical/ne_10m_lakes.json';

// Türkiye sınırları (yaklaşık)
const TURKEY_BOUNDS = {
  minLat: 35.5,
  maxLat: 42.5,
  minLon: 25.4,
  maxLon: 45.0
};

// SVG viewBox koordinatları - turkeyPaths sistemi
const SVG_VIEWBOX = {
  width: 984,
  height: 980,
  minX: -16,
  minY: -12,
  minLon: 25.4,
  maxLon: 45.0,
  minLat: 35.5,
  maxLat: 42.5
};

// Lat/Lon'u turkeyPaths SVG koordinatlarına çevir
function latLonToSVG(lon, lat) {
  const x = ((lon - SVG_VIEWBOX.minLon) / (SVG_VIEWBOX.maxLon - SVG_VIEWBOX.minLon)) * SVG_VIEWBOX.width + SVG_VIEWBOX.minX;
  const y = ((SVG_VIEWBOX.maxLat - lat) / (SVG_VIEWBOX.maxLat - SVG_VIEWBOX.minLat)) * SVG_VIEWBOX.height + SVG_VIEWBOX.minY;
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

// Polygon'un merkez noktasını hesapla
function getPolygonCenter(coordinates) {
  let sumLon = 0, sumLat = 0, count = 0;
  
  // MultiPolygon veya Polygon olabilir
  const coords = Array.isArray(coordinates[0][0][0]) ? coordinates[0][0] : coordinates[0];
  
  coords.forEach(([lon, lat]) => {
    sumLon += lon;
    sumLat += lat;
    count++;
  });
  
  return {
    lon: sumLon / count,
    lat: sumLat / count
  };
}

// Polygon'un boyutlarını hesapla
function getPolygonSize(coordinates) {
  const coords = Array.isArray(coordinates[0][0][0]) ? coordinates[0][0] : coordinates[0];
  
  let minLon = Infinity, maxLon = -Infinity;
  let minLat = Infinity, maxLat = -Infinity;
  
  coords.forEach(([lon, lat]) => {
    minLon = Math.min(minLon, lon);
    maxLon = Math.max(maxLon, lon);
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
  });
  
  return {
    width: maxLon - minLon,
    height: maxLat - minLat
  };
}

console.log('Natural Earth GeoJSON verisi indiriliyor...\n');

https.get(LAKES_URL, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const geojson = JSON.parse(data);
      console.log(`Toplam ${geojson.features.length} göl bulundu.\n`);
      
      // Türkiye sınırları içindeki gölleri filtrele
      const turkeyLakes = geojson.features.filter(feature => {
        const center = getPolygonCenter(feature.geometry.coordinates);
        return center.lon >= TURKEY_BOUNDS.minLon && 
               center.lon <= TURKEY_BOUNDS.maxLon &&
               center.lat >= TURKEY_BOUNDS.minLat && 
               center.lat <= TURKEY_BOUNDS.maxLat;
      });
      
      console.log(`Türkiye sınırları içinde ${turkeyLakes.length} göl bulundu:\n`);
      
      // Gölleri boyutlarına göre sırala (en büyükten küçüğe)
      turkeyLakes.sort((a, b) => {
        const sizeA = getPolygonSize(a.geometry.coordinates);
        const sizeB = getPolygonSize(b.geometry.coordinates);
        return (sizeB.width * sizeB.height) - (sizeA.width * sizeA.height);
      });
      
      // İlk 15 göl için detayları göster
      const lakesData = turkeyLakes.slice(0, 15).map((feature, index) => {
        const name = feature.properties.name || feature.properties.name_en || 'İsimsiz Göl';
        const center = getPolygonCenter(feature.geometry.coordinates);
        const size = getPolygonSize(feature.geometry.coordinates);
        const svgCoords = latLonToSVG(center.lon, center.lat);
        
        // Elips boyutlarını hesapla (coğrafi boyuttan SVG boyutuna)
        const rx = Math.round((size.width / (SVG_VIEWBOX.maxLon - SVG_VIEWBOX.minLon)) * SVG_VIEWBOX.width / 2);
        const ry = Math.round((size.height / (SVG_VIEWBOX.maxLat - SVG_VIEWBOX.minLat)) * SVG_VIEWBOX.height / 2);
        
        console.log(`${index + 1}. ${name}`);
        console.log(`   Konum: ${center.lat.toFixed(4)}°N, ${center.lon.toFixed(4)}°E`);
        console.log(`   SVG: x=${svgCoords.x}, y=${svgCoords.y}, rx=${rx}, ry=${ry}`);
        console.log(`   Boyut: ${size.width.toFixed(4)}° x ${size.height.toFixed(4)}°\n`);
        
        return {
          id: index + 1,
          name: name,
          x: svgCoords.x,
          y: svgCoords.y,
          rx: Math.max(10, rx),
          ry: Math.max(8, ry),
          lat: center.lat,
          lon: center.lon
        };
      });
      
      // JavaScript array formatında kaydet
      console.log('\n=== React Native için kod ===\n');
      console.log('const lakes = [');
      lakesData.forEach(lake => {
        console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${lake.x}, y: ${lake.y}, rx: ${lake.rx}, ry: ${lake.ry} },`);
      });
      console.log('];\n');
      
      // JSON dosyasına kaydet
      fs.writeFileSync('natural_earth_turkey_lakes.json', JSON.stringify(lakesData, null, 2));
      console.log('Veriler natural_earth_turkey_lakes.json dosyasına kaydedildi.');
      
    } catch (error) {
      console.error('Veri işleme hatası:', error.message);
    }
  });
  
}).on('error', (error) => {
  console.error('İndirme hatası:', error.message);
});
