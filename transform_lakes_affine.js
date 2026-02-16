// Natural Earth göl path'lerini turkeyPaths koordinat sistemine dönüştür
// Affine transformation kullanarak (scale + translate + flip)

const fs = require('fs');

// Kullanıcının manuel tıkladığı doğru koordinatlar
const REFERENCE_POINTS = [
  { name: 'Egridir', ne: { x: 257.65, y: 608.69 }, user: { x: 391, y: 308 } },
  { name: 'Beysehir', ne: { x: 291.07, y: 650.31 }, user: { x: 365, y: 299 } },
  { name: 'Lake Tuz', ne: { x: 387.93, y: 503.78 }, user: { x: 444, y: 252 } },
  { name: 'Lake Van', ne: { x: 868.21, y: 524.06 }, user: { x: 709, y: 242 } }
];

// Natural Earth koordinat sisteminin sınırlarını bul
const naturalEarthLakes = JSON.parse(fs.readFileSync('lake_paths_natural_earth.json', 'utf8'));

let neMinX = Infinity, neMaxX = -Infinity;
let neMinY = Infinity, neMaxY = -Infinity;

REFERENCE_POINTS.forEach(p => {
  neMinX = Math.min(neMinX, p.ne.x);
  neMaxX = Math.max(neMaxX, p.ne.x);
  neMinY = Math.min(neMinY, p.ne.y);
  neMaxY = Math.max(neMaxY, p.ne.y);
});

// User koordinat sisteminin sınırlarını bul
let userMinX = Infinity, userMaxX = -Infinity;
let userMinY = Infinity, userMaxY = -Infinity;

REFERENCE_POINTS.forEach(p => {
  userMinX = Math.min(userMinX, p.user.x);
  userMaxX = Math.max(userMaxX, p.user.x);
  userMinY = Math.min(userMinY, p.user.y);
  userMaxY = Math.max(userMaxY, p.user.y);
});

console.log('Koordinat Sistemi Analizi:');
console.log('='.repeat(60));
console.log('Natural Earth:');
console.log(`  X: ${neMinX.toFixed(1)} - ${neMaxX.toFixed(1)} (range: ${(neMaxX - neMinX).toFixed(1)})`);
console.log(`  Y: ${neMinY.toFixed(1)} - ${neMaxY.toFixed(1)} (range: ${(neMaxY - neMinY).toFixed(1)})`);
console.log('\nUser (turkeyPaths):');
console.log(`  X: ${userMinX} - ${userMaxX} (range: ${userMaxX - userMinX})`);
console.log(`  Y: ${userMinY} - ${userMaxY} (range: ${userMaxY - userMinY})`);

// Dönüşüm parametrelerini hesapla
// Y ekseni ters çevrilmiş (Natural Earth'de yukarı = büyük Y, turkeyPaths'de yukarı = küçük Y)
const scaleX = (userMaxX - userMinX) / (neMaxX - neMinX);
const scaleY = -(userMaxY - userMinY) / (neMaxY - neMinY); // Negatif çünkü Y ters

console.log('\nDönüşüm Parametreleri:');
console.log(`  Scale X: ${scaleX.toFixed(3)}`);
console.log(`  Scale Y: ${scaleY.toFixed(3)}`);

// Her referans noktası için offset hesapla
console.log('\nReferans Noktaları Test:');
console.log('='.repeat(60));

let totalOffsetX = 0;
let totalOffsetY = 0;

REFERENCE_POINTS.forEach(point => {
  // Önce scale uygula
  const scaledX = (point.ne.x - neMinX) * scaleX + userMinX;
  const scaledY = (point.ne.y - neMinY) * scaleY + userMaxY; // Y ters olduğu için maxY'den başla
  
  const errorX = point.user.x - scaledX;
  const errorY = point.user.y - scaledY;
  
  console.log(`\n${point.name}:`);
  console.log(`  NE: (${point.ne.x.toFixed(1)}, ${point.ne.y.toFixed(1)})`);
  console.log(`  Scaled: (${scaledX.toFixed(1)}, ${scaledY.toFixed(1)})`);
  console.log(`  User: (${point.user.x}, ${point.user.y})`);
  console.log(`  Error: (${errorX.toFixed(1)}, ${errorY.toFixed(1)})`);
  
  totalOffsetX += errorX;
  totalOffsetY += errorY;
});

const avgOffsetX = totalOffsetX / REFERENCE_POINTS.length;
const avgOffsetY = totalOffsetY / REFERENCE_POINTS.length;

console.log('\n' + '='.repeat(60));
console.log(`Ortalama Hata (Offset): X=${avgOffsetX.toFixed(1)}, Y=${avgOffsetY.toFixed(1)}`);
console.log('='.repeat(60));

// Dönüşüm fonksiyonu
function transformCoord(x, y) {
  const scaledX = (x - neMinX) * scaleX + userMinX + avgOffsetX;
  const scaledY = (y - neMinY) * scaleY + userMaxY + avgOffsetY;
  return { x: scaledX, y: scaledY };
}

// Path'leri dönüştür
function transformPath(pathData) {
  return pathData.replace(/([ML])\s*([\d.]+),([\d.]+)/g, (match, cmd, x, y) => {
    const transformed = transformCoord(parseFloat(x), parseFloat(y));
    return `${cmd}${transformed.x.toFixed(2)},${transformed.y.toFixed(2)}`;
  }).replace(/([Zz])/g, ' Z');
}

// Dönüştürülmüş gölleri oluştur
const transformedLakes = naturalEarthLakes
  .filter(lake => {
    // Sadece Türkiye'deki gölleri al
    return !lake.name.includes('Assad') && !lake.name.includes('Saksak');
  })
  .map(lake => {
    const center = transformCoord(parseFloat(lake.centerX), parseFloat(lake.centerY));
    
    // İsim düzeltmeleri
    let displayName = lake.name;
    if (lake.name === 'Egridir') displayName = 'Eğirdir Gölü';
    else if (lake.name === 'Beysehir') displayName = 'Beyşehir Gölü';
    else if (lake.name === 'Lake Tuz') displayName = 'Tuz Gölü';
    else if (lake.name === 'Lake Van') displayName = 'Van Gölü';
    else if (lake.name === 'Ataturk Barajt') displayName = 'Atatürk Barajı';
    else if (lake.name === 'Keban Baraji') displayName = 'Keban Barajı';
    
    return {
      id: lake.id,
      name: displayName,
      d: transformPath(lake.d),
      centerX: center.x.toFixed(2),
      centerY: center.y.toFixed(2)
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
  
  // Referans noktalarıyla karşılaştır
  const ref = REFERENCE_POINTS.find(r => lake.name.includes(r.name) || r.name.includes(lake.name.split(' ')[0]));
  if (ref) {
    const errorX = Math.abs(parseFloat(lake.centerX) - ref.user.x);
    const errorY = Math.abs(parseFloat(lake.centerY) - ref.user.y);
    console.log(`  → User: (${ref.user.x}, ${ref.user.y}) | Error: (${errorX.toFixed(1)}, ${errorY.toFixed(1)})`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('✓ Dönüştürülmüş göl path\'leri lake_paths_transformed.json dosyasına kaydedildi');
console.log('='.repeat(60));
