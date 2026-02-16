// Natural Earth göl path'lerini turkeyPaths koordinat sistemine dönüştür
// Kullanıcının manuel koordinatlarını referans noktası olarak kullan

const fs = require('fs');

// Kullanıcının manuel tıkladığı doğru koordinatlar (turkeyPaths sistemi)
const REFERENCE_POINTS = [
  { name: 'Egridir', ne: { x: 257.65, y: 608.69 }, user: { x: 391, y: 308 } },
  { name: 'Beysehir', ne: { x: 291.07, y: 650.31 }, user: { x: 365, y: 299 } },
  { name: 'Lake Tuz', ne: { x: 387.93, y: 503.78 }, user: { x: 444, y: 252 } },
  { name: 'Lake Van', ne: { x: 868.21, y: 524.06 }, user: { x: 709, y: 242 } }
];

// Ortalama dönüşüm parametrelerini hesapla
let totalScaleX = 0;
let totalScaleY = 0;
let totalOffsetX = 0;
let totalOffsetY = 0;

console.log('Dönüşüm Parametreleri Hesaplanıyor:');
console.log('='.repeat(60));

REFERENCE_POINTS.forEach(point => {
  const scaleX = (point.user.x - point.ne.x) / point.ne.x;
  const scaleY = (point.user.y - point.ne.y) / point.ne.y;
  const offsetX = point.user.x - point.ne.x;
  const offsetY = point.user.y - point.ne.y;
  
  console.log(`\n${point.name}:`);
  console.log(`  NE: (${point.ne.x.toFixed(1)}, ${point.ne.y.toFixed(1)})`);
  console.log(`  User: (${point.user.x}, ${point.user.y})`);
  console.log(`  Offset: (${offsetX.toFixed(1)}, ${offsetY.toFixed(1)})`);
  
  totalOffsetX += offsetX;
  totalOffsetY += offsetY;
});

const avgOffsetX = totalOffsetX / REFERENCE_POINTS.length;
const avgOffsetY = totalOffsetY / REFERENCE_POINTS.length;

console.log('\n' + '='.repeat(60));
console.log(`Ortalama Offset: X=${avgOffsetX.toFixed(1)}, Y=${avgOffsetY.toFixed(1)}`);
console.log('='.repeat(60));

// Natural Earth göl path'lerini oku
const naturalEarthLakes = JSON.parse(fs.readFileSync('lake_paths_natural_earth.json', 'utf8'));

// Path'leri dönüştür
function transformPath(pathData, offsetX, offsetY) {
  // SVG path komutlarını parse et ve koordinatları dönüştür
  return pathData.replace(/([ML])\s*([\d.]+),([\d.]+)/g, (match, cmd, x, y) => {
    const newX = parseFloat(x) + offsetX;
    const newY = parseFloat(y) + offsetY;
    return `${cmd}${newX.toFixed(2)},${newY.toFixed(2)}`;
  }).replace(/([Zz])/g, ' Z');
}

// Dönüştürülmüş gölleri oluştur
const transformedLakes = naturalEarthLakes
  .filter(lake => {
    // Sadece Türkiye'deki gölleri al (Suriye barajlarını çıkar)
    return !lake.name.includes('Assad') && !lake.name.includes('Saksak');
  })
  .map(lake => {
    const newCenterX = parseFloat(lake.centerX) + avgOffsetX;
    const newCenterY = parseFloat(lake.centerY) + avgOffsetY;
    
    return {
      id: lake.id,
      name: lake.name,
      d: transformPath(lake.d, avgOffsetX, avgOffsetY),
      centerX: newCenterX.toFixed(2),
      centerY: newCenterY.toFixed(2)
    };
  });

// Sonuçları kaydet
fs.writeFileSync(
  'lake_paths_transformed.json',
  JSON.stringify(transformedLakes, null, 2),
  'utf8'
);

console.log('\nDönüştürülmüş Göller:');
console.log('='.repeat(60));
transformedLakes.forEach(lake => {
  console.log(`${lake.name}: center=(${lake.centerX}, ${lake.centerY})`);
});

console.log('\n' + '='.repeat(60));
console.log('✓ Dönüştürülmüş göl path\'leri lake_paths_transformed.json dosyasına kaydedildi');
console.log('='.repeat(60));
