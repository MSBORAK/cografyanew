// Natural Earth göl path'lerini turkeyPaths koordinat sistemine dönüştür
// Kullanıcının manuel tıkladığı koordinatları referans alarak

const fs = require('fs');

// Kullanıcının manuel tıkladığı doğru koordinatlar
const USER_COORDS = {
  'Van': { x: 709, y: 242 },
  'Tuz': { x: 444, y: 252 },
  'Beysehir': { x: 365, y: 299 },
  'Egridir': { x: 391, y: 308 },
  'Iznik': { x: 592, y: 222 },  // İznik -> Sapanca olabilir (karışmış)
  'Sapanca': { x: 587, y: 317 }
};

// Natural Earth'den gelen göl path'leri
const naturalEarthLakes = JSON.parse(fs.readFileSync('lake_paths_natural_earth.json', 'utf8'));

console.log('Natural Earth Göl Path Analizi:');
console.log('='.repeat(60));

// Her göl için Natural Earth koordinatlarını analiz et
naturalEarthLakes.forEach(lake => {
  console.log(`\n${lake.name}:`);
  console.log(`  Center (Natural Earth): x=${lake.centerX}, y=${lake.centerY}`);
  
  // İsim eşleştirmesi
  let matchedName = null;
  if (lake.name.includes('Van')) matchedName = 'Van';
  else if (lake.name.includes('Tuz')) matchedName = 'Tuz';
  else if (lake.name.includes('Beysehir')) matchedName = 'Beysehir';
  else if (lake.name.includes('Egridir')) matchedName = 'Egridir';
  
  if (matchedName && USER_COORDS[matchedName]) {
    const userCoord = USER_COORDS[matchedName];
    console.log(`  User clicked: x=${userCoord.x}, y=${userCoord.y}`);
    
    // Farkı hesapla
    const deltaX = userCoord.x - parseFloat(lake.centerX);
    const deltaY = userCoord.y - parseFloat(lake.centerY);
    console.log(`  Delta: dx=${deltaX.toFixed(1)}, dy=${deltaY.toFixed(1)}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log('\nSONUÇ:');
console.log('Natural Earth göl path\'leri farklı bir projeksiyon kullanıyor.');
console.log('Kullanıcının manuel koordinatları ile Natural Earth koordinatları');
console.log('arasında büyük farklar var. İki seçenek:');
console.log('');
console.log('1. Natural Earth path\'lerini kullanıcı koordinatlarına göre ölçeklendir');
console.log('2. Kullanıcının manuel koordinatlarını kullan (ellipse ile)');
console.log('='.repeat(60));
