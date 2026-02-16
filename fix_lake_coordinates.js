// Şehir koordinatlarına göre göl konumlarını manuel olarak ayarla
// city_coords.txt'deki şehir koordinatları 0-500 aralığında
// SVG viewBox: 0 0 1007.478 527.323
// Ölçekleme faktörü: x2 (yaklaşık)

const cityCoords = {
  'Van': { x: 469, y: 471 },
  'Ankara': { x: 172, y: 171 },
  'Konya': { x: 183, y: 101 },
  'Aksaray': { x: 209, y: 111 },
  'Isparta': { x: 133, y: 131 },
  'Bursa': { x: 102, y: 52 },
  'Sakarya': { x: 120, y: 121 },
  'Balıkesir': { x: 51, y: 52 },
  'Aydın': { x: 59, y: 131 },
  'Muğla': { x: 178, y: 171 },
  'Elazığ': { x: 376, y: 376 },
  'Ardahan': { x: 434, y: 435 },
  'Kars': { x: 451, y: 452 }
};

// Göllerin yakın olduğu şehirler ve tahmini konumlar
const lakes = [
  {
    id: 1,
    name: 'Van Gölü',
    nearCity: 'Van',
    // Van'ın biraz batısında
    x: (469 - 10) * 2,
    y: (471 - 5) * 2,
    rx: 40,
    ry: 28
  },
  {
    id: 2,
    name: 'Tuz Gölü',
    nearCity: 'Ankara-Aksaray-Konya',
    // Ankara, Aksaray, Konya üçgeninin ortasında
    x: ((172 + 209 + 183) / 3) * 2,
    y: ((171 + 111 + 101) / 3) * 2,
    rx: 35,
    ry: 22
  },
  {
    id: 3,
    name: 'Beyşehir Gölü',
    nearCity: 'Konya-Isparta',
    // Konya ile Isparta arasında, Konya'ya daha yakın
    x: ((183 * 0.6 + 133 * 0.4)) * 2,
    y: ((101 * 0.6 + 131 * 0.4)) * 2,
    rx: 22,
    ry: 16
  },
  {
    id: 4,
    name: 'Eğirdir Gölü',
    nearCity: 'Isparta',
    // Isparta'nın hemen kuzeyinde
    x: (133 - 2) * 2,
    y: (131 - 8) * 2,
    rx: 18,
    ry: 14
  },
  {
    id: 5,
    name: 'İznik Gölü',
    nearCity: 'Bursa',
    // Bursa'nın doğusunda
    x: (102 + 8) * 2,
    y: (52 + 3) * 2,
    rx: 16,
    ry: 13
  },
  {
    id: 6,
    name: 'Sapanca Gölü',
    nearCity: 'Sakarya',
    // Sakarya'nın batısında
    x: (120 - 5) * 2,
    y: (121 - 8) * 2,
    rx: 14,
    ry: 9
  },
  {
    id: 7,
    name: 'Bafa Gölü',
    nearCity: 'Aydın-Muğla',
    // Aydın ile Muğla arasında
    x: ((59 + 178) / 2) * 2,
    y: ((131 + 171) / 2) * 2,
    rx: 13,
    ry: 11
  },
  {
    id: 8,
    name: 'Manyas Gölü',
    nearCity: 'Balıkesir',
    // Balıkesir'in kuzeyinde
    x: (51 + 3) * 2,
    y: (52 - 8) * 2,
    rx: 15,
    ry: 11
  },
  {
    id: 9,
    name: 'Hazar Gölü',
    nearCity: 'Elazığ',
    // Elazığ'ın güneyinde
    x: (376 - 2) * 2,
    y: (376 + 8) * 2,
    rx: 18,
    ry: 11
  },
  {
    id: 10,
    name: 'Çıldır Gölü',
    nearCity: 'Ardahan-Kars',
    // Ardahan ile Kars arasında
    x: ((434 + 451) / 2) * 2,
    y: ((435 + 452) / 2 - 15) * 2,
    rx: 15,
    ry: 13
  }
];

console.log('Göl koordinatları (SVG viewBox: 0 0 1007.478 527.323):');
console.log('='.repeat(60));
lakes.forEach(lake => {
  console.log(`{ id: ${lake.id}, name: '${lake.name}', x: ${Math.round(lake.x * 10) / 10}, y: ${Math.round(lake.y * 10) / 10}, rx: ${lake.rx}, ry: ${lake.ry} },`);
});
