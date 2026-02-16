// Natural Earth'ten göl geometrilerini çek ve SVG path'lere dönüştür
const https = require('https');
const fs = require('fs');

const LAKES_URL = 'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/master/10m/physical/ne_10m_lakes.json';

// Türkiye sınırları
const TURKEY_BOUNDS = {
  minLat: 35.5,
  maxLat: 42.5,
  minLon: 25.4,
  maxLon: 45.0
};

// turkeyPaths koordinat sistemi
const SVG_BOUNDS = {
  width: 984,
  height: 980,
  minX: -16,
  minY: -12
};

// Lat/Lon'u SVG koordinatlarına çevir
function latLonToSVG(lon, lat) {
  const x = ((lon - TURKEY_BOUNDS.minLon) / (TURKEY_BOUNDS.maxLon - TURKEY_BOUNDS.minLon)) * SVG_BOUNDS.width + SVG_BOUNDS.minX;
  const y = ((TURKEY_BOUNDS.maxLat - lat) / (TURKEY_BOUNDS.maxLat - TURKEY_BOUNDS.minLat)) * SVG_BOUNDS.height + SVG_BOUNDS.minY;
  return { x: x.toFixed(2), y: y.toFixed(2) };
}

// Polygon koordinatlarını SVG path'e çevir
function polygonToPath(coordinates) {
  const coords = Array.isArray(coordinates[0][0][0]) ? coordinates[0][0] : coordinates[0];
  
  let path = '';
  coords.forEach(([lon, lat], index) => {
    const { x, y } = latLonToSVG(lon, lat);
    if (index === 0) {
      path += `M${x},${y}`;
    } else {
      path += ` L${x},${y}`;
    }
  });
  path += ' Z';
  
  return path;
}

// Polygon'un merkez noktasını hesapla
function getPolygonCenter(coordinates) {
  const coords = Array.isArray(coordinates[0][0][0]) ? coordinates[0][0] : coordinates[0];
  
  let sumLon = 0, sumLat = 0, count = 0;
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

console.log('Natural Earth göl verileri indiriliyor...\n');

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
      
      console.log(`Türkiye sınırları içinde ${turkeyLakes.length} göl bulundu.\n`);
      
      // Göl path'lerini oluştur
      const lakePaths = turkeyLakes.map((feature, index) => {
        const name = feature.properties.name || feature.properties.name_en || `Lake ${index + 1}`;
        const path = polygonToPath(feature.geometry.coordinates);
        const center = getPolygonCenter(feature.geometry.coordinates);
        const svgCenter = latLonToSVG(center.lon, center.lat);
        
        return {
          id: `lake_${index + 1}`,
          name: name,
          d: path,
          centerX: svgCenter.x,
          centerY: svgCenter.y
        };
      });
      
      console.log('=== React Native için göl path\'leri ===\n');
      console.log('export const lakePaths = [');
      lakePaths.forEach(lake => {
        console.log(`  {`);
        console.log(`    id: '${lake.id}',`);
        console.log(`    name: '${lake.name}',`);
        console.log(`    d: '${lake.d.substring(0, 100)}...',`);
        console.log(`    centerX: ${lake.centerX},`);
        console.log(`    centerY: ${lake.centerY}`);
        console.log(`  },`);
      });
      console.log('];');
      
      // JSON dosyasına kaydet
      fs.writeFileSync('lake_paths_natural_earth.json', JSON.stringify(lakePaths, null, 2));
      console.log('\n✓ Göl path\'leri lake_paths_natural_earth.json dosyasına kaydedildi.');
      
    } catch (error) {
      console.error('Veri işleme hatası:', error.message);
    }
  });
  
}).on('error', (error) => {
  console.error('İndirme hatası:', error.message);
});
