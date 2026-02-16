// Şehir konumlarına göre gölleri manuel olarak yerleştir
// turkeyPaths.js koordinat sistemi: -16 ile 968 arası

// Önce şehirlerin path'lerinden merkez koordinatlarını çıkaralım
const fs = require('fs');

// Şehir ID'lerine göre yaklaşık konumlar (turkeyPaths koordinat sisteminde)
const cityLocations = {
  '65': { name: 'Van', x: 850, y: 350 },        // Van - en doğu
  '06': { name: 'Ankara', x: 350, y: 250 },     // Ankara - merkez
  '42': { name: 'Konya', x: 350, y: 400 },      // Konya - güney merkez
  '32': { name: 'Isparta', x: 280, y: 380 },    // Isparta
  '16': { name: 'Bursa', x: 180, y: 200 },      // Bursa - kuzeybatı
  '54': { name: 'Sakarya', x: 200, y: 180 },    // Sakarya
  '09': { name: 'Aydın', x: 100, y: 400 },      // Aydın - batı güney
  '10': { name: 'Balıkesir', x: 120, y: 250 },  // Balıkesir
  '23': { name: 'Elazığ', x: 700, y: 350 },     // Elazığ - doğu
  '75': { name: 'Ardahan', x: 850, y: 100 },    // Ardahan - kuzeydoğu
};

// Gölleri şehirlere göre yerleştir
const lakes = [
  // Van Gölü - Van şehrinin hemen yanında (batısında)
  { 
    id: 1, 
    name: 'Van Gölü', 
    referenceCity: 'Van',
    offsetX: -50,  // Van'ın 50 birim batısında
    offsetY: 20,   // Biraz güneyinde
    rx: 40, 
    ry: 28 
  },
  
  // Tuz Gölü - Ankara ile Konya arasında
  { 
    id: 2, 
    name: 'Tuz Gölü', 
    referenceCity: 'Ankara',
    offsetX: 50,   // Ankara'nın doğusunda
    offsetY: 100,  // Güneyinde
    rx: 35, 
    ry: 22 
  },
  
  // Beyşehir Gölü - Konya'nın batısında
  { 
    id: 3, 
    name: 'Beyşehir Gölü', 
    referenceCity: 'Konya',
    offsetX: -80,  // Konya'nın batısında
    offsetY: -30,  // Biraz kuzeyinde
    rx: 22, 
    ry: 16 
  },
  
  // Eğirdir Gölü - Isparta yakınında
  { 
    id: 4, 
    name: 'Eğirdir Gölü', 
    referenceCity: 'Isparta',
    offsetX: 0,    // Isparta'nın tam yanında
    offsetY: -20,  // Kuzeyinde
    rx: 18, 
    ry: 14 
  },
  
  // İznik Gölü - Bursa'nın doğusunda
  { 
    id: 5, 
    name: 'İznik Gölü', 
    referenceCity: 'Bursa',
    offsetX: 30,   // Bursa'nın doğusunda
    offsetY: -10,  // Biraz kuzeyinde
    rx: 16, 
    ry: 13 
  },
  
  // Sapanca Gölü - Sakarya yakınında
  { 
    id: 6, 
    name: 'Sapanca Gölü', 
    referenceCity: 'Sakarya',
    offsetX: -20,  // Sakarya'nın batısında
    offsetY: 10,   // Biraz güneyinde
    rx: 14, 
    ry: 9 
  },
  
  // Bafa Gölü - Aydın yakınında
  { 
    id: 7, 
    name: 'Bafa Gölü', 
    referenceCity: 'Aydın',
    offsetX: 20,   // Aydın'ın doğusunda
    offsetY: -30,  // Kuzeyinde
    rx: 13, 
    ry: 11 
  },
  
  // Manyas Gölü - Balıkesir yakınında
  { 
    id: 8, 
    name: 'Manyas Gölü', 
    referenceCity: 'Balıkesir',
    offsetX: 10,   // Balıkesir'in doğusunda
    offsetY: -30,  // Kuzeyinde
    rx: 15, 
    ry: 11 
  },
  
  // Hazar Gölü - Elazığ yakınında
  { 
    id: 9, 
    name: 'Hazar Gölü', 
    referenceCity: 'Elazığ',
    offsetX: 0,    // Elazığ'ın tam yanında
    offsetY: 30,   // Güneyinde
    rx: 18, 
    ry: 11 
  },
  
  // Çıldır Gölü - Ardahan yakınında
  { 
    id: 10, 
    name: 'Çıldır Gölü', 
    referenceCity: 'Ardahan',
    offsetX: 20,   // Ardahan'ın doğusunda
    offsetY: 20,   // Güneyinde
    rx: 15, 
    ry: 13 
  },
];

console.log('Göller şehir konumlarına göre yerleştiriliyor...\n');
console.log('='.repeat(70));

const finalLakes = lakes.map(lake => {
  const city = cityLocations[Object.keys(cityLocations).find(
    id => cityLocations[id].name === lake.referenceCity
  )];
  
  const x = city.x + lake.offsetX;
  const y = city.y + lake.offsetY;
  
  console.log(`\n${lake.id}. ${lake.name}`);
  console.log(`   Referans: ${lake.referenceCity} (${city.x}, ${city.y})`);
  console.log(`   Offset: (${lake.offsetX}, ${lake.offsetY})`);
  console.log(`   Final: x=${x}, y=${y}`);
  
  return {
    id: lake.id,
    name: lake.name,
    x: x,
    y: y,
    rx: lake.rx,
    ry: lake.ry
  };
});

console.log('\n' + '='.repeat(70));
console.log('\n=== React Native için kod ===\n');
console.log('const lakes = [');
finalLakes.forEach(lake => {
  console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${lake.x}, y: ${lake.y}, rx: ${lake.rx}, ry: ${lake.ry} },`);
});
console.log('];');

// JSON dosyasına kaydet
fs.writeFileSync('lakes_by_cities.json', JSON.stringify(finalLakes, null, 2));
console.log('\n✓ Veriler lakes_by_cities.json dosyasına kaydedildi.');
