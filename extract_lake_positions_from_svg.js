// turkey.svg dosyasından göl konumlarını çıkar
// SVG'deki şehir path'lerinin koordinatlarını analiz ederek göllerin nerede olduğunu bul

const fs = require('fs');

// Şehirlerin SVG path'lerinden ortalama koordinatları hesapla
function getPathBounds(pathData) {
  // Path'deki tüm sayıları çıkar (M, L, C komutlarından sonraki koordinatlar)
  const numbers = pathData.match(/[\d.]+/g);
  if (!numbers || numbers.length < 2) return null;
  
  const coords = [];
  for (let i = 0; i < numbers.length; i += 2) {
    if (numbers[i] && numbers[i + 1]) {
      coords.push({
        x: parseFloat(numbers[i]),
        y: parseFloat(numbers[i + 1])
      });
    }
  }
  
  if (coords.length === 0) return null;
  
  // Min, max ve ortalama koordinatları hesapla
  const xs = coords.map(c => c.x);
  const ys = coords.map(c => c.y);
  
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    centerX: (Math.min(...xs) + Math.max(...xs)) / 2,
    centerY: (Math.min(...ys) + Math.max(...ys)) / 2
  };
}

// turkeyPaths.js dosyasını oku
const turkeyPathsContent = fs.readFileSync('constants/turkeyPaths.js', 'utf8');

// Şehir verilerini parse et
const citiesMatch = turkeyPathsContent.match(/export const turkeyPaths = (\[[\s\S]*\]);/);
if (!citiesMatch) {
  console.error('turkeyPaths verisi bulunamadı!');
  process.exit(1);
}

const cities = eval(citiesMatch[1]);

// Önemli şehirlerin merkez koordinatlarını hesapla
const cityPositions = {
  'Van': null,
  'Ankara': null,
  'Konya': null,
  'Aksaray': null,
  'Isparta': null,
  'Bursa': null,
  'Sakarya': null,
  'Balıkesir': null,
  'Aydın': null,
  'Muğla': null,
  'Elazığ': null,
  'Ardahan': null,
  'Kars': null,
  'Denizli': null,
  'Manisa': null
};

cities.forEach(city => {
  if (cityPositions.hasOwnProperty(city.name)) {
    const bounds = getPathBounds(city.d);
    if (bounds) {
      cityPositions[city.name] = bounds;
      console.log(`${city.name} (ID: ${city.id}): center=(${Math.round(bounds.centerX)}, ${Math.round(bounds.centerY)})`);
    }
  }
});

console.log('\n' + '='.repeat(60));
console.log('Göl Konumları (Şehir merkezlerine göre):');
console.log('='.repeat(60) + '\n');

// Göllerin konumlarını şehirlere göre hesapla
const lakes = [
  {
    id: 1,
    name: 'Van Gölü',
    calculation: () => {
      const van = cityPositions['Van'];
      if (!van) return null;
      // Van'ın batısında, biraz kuzeyde
      return {
        x: van.centerX - 50,
        y: van.centerY - 30,
        rx: 40,
        ry: 28
      };
    }
  },
  {
    id: 2,
    name: 'Tuz Gölü',
    calculation: () => {
      const ankara = cityPositions['Ankara'];
      const konya = cityPositions['Konya'];
      const aksaray = cityPositions['Aksaray'];
      if (!ankara || !konya || !aksaray) return null;
      // Ankara, Konya, Aksaray üçgeninin ortası
      return {
        x: (ankara.centerX + konya.centerX + aksaray.centerX) / 3,
        y: (ankara.centerY + konya.centerY + aksaray.centerY) / 3,
        rx: 35,
        ry: 22
      };
    }
  },
  {
    id: 3,
    name: 'Beyşehir Gölü',
    calculation: () => {
      const konya = cityPositions['Konya'];
      const isparta = cityPositions['Isparta'];
      if (!konya || !isparta) return null;
      // Konya ile Isparta arasında, Konya'ya daha yakın
      return {
        x: konya.centerX * 0.4 + isparta.centerX * 0.6,
        y: konya.centerY * 0.4 + isparta.centerY * 0.6,
        rx: 22,
        ry: 16
      };
    }
  },
  {
    id: 4,
    name: 'Eğirdir Gölü',
    calculation: () => {
      const isparta = cityPositions['Isparta'];
      if (!isparta) return null;
      // Isparta'nın kuzeyinde
      return {
        x: isparta.centerX,
        y: isparta.centerY - 40,
        rx: 18,
        ry: 14
      };
    }
  },
  {
    id: 5,
    name: 'İznik Gölü',
    calculation: () => {
      const bursa = cityPositions['Bursa'];
      if (!bursa) return null;
      // Bursa'nın doğusunda
      return {
        x: bursa.centerX + 50,
        y: bursa.centerY - 10,
        rx: 16,
        ry: 13
      };
    }
  },
  {
    id: 6,
    name: 'Sapanca Gölü',
    calculation: () => {
      const sakarya = cityPositions['Sakarya'];
      if (!sakarya) return null;
      // Sakarya'nın batısında
      return {
        x: sakarya.centerX - 20,
        y: sakarya.centerY - 10,
        rx: 14,
        ry: 9
      };
    }
  },
  {
    id: 7,
    name: 'Bafa Gölü',
    calculation: () => {
      const aydin = cityPositions['Aydın'];
      const mugla = cityPositions['Muğla'];
      if (!aydin || !mugla) return null;
      // Aydın ile Muğla arasında
      return {
        x: (aydin.centerX + mugla.centerX) / 2 - 20,
        y: (aydin.centerY + mugla.centerY) / 2,
        rx: 13,
        ry: 11
      };
    }
  },
  {
    id: 8,
    name: 'Manyas Gölü',
    calculation: () => {
      const balikesir = cityPositions['Balıkesir'];
      if (!balikesir) return null;
      // Balıkesir'in kuzeyinde
      return {
        x: balikesir.centerX + 10,
        y: balikesir.centerY - 50,
        rx: 15,
        ry: 11
      };
    }
  },
  {
    id: 9,
    name: 'Hazar Gölü',
    calculation: () => {
      const elazig = cityPositions['Elazığ'];
      if (!elazig) return null;
      // Elazığ'ın güneyinde
      return {
        x: elazig.centerX - 10,
        y: elazig.centerY + 30,
        rx: 18,
        ry: 11
      };
    }
  },
  {
    id: 10,
    name: 'Çıldır Gölü',
    calculation: () => {
      const ardahan = cityPositions['Ardahan'];
      const kars = cityPositions['Kars'];
      if (!ardahan || !kars) return null;
      // Ardahan ile Kars arasında, kuzeyde
      return {
        x: (ardahan.centerX + kars.centerX) / 2,
        y: (ardahan.centerY + kars.centerY) / 2 - 50,
        rx: 15,
        ry: 13
      };
    }
  }
];

console.log('const lakes = [');
lakes.forEach(lake => {
  const pos = lake.calculation();
  if (pos) {
    console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${Math.round(pos.x * 10) / 10}, y: ${Math.round(pos.y * 10) / 10}, rx: ${pos.rx}, ry: ${pos.ry} },`);
  } else {
    console.log(`  // ${lake.name}: Şehir koordinatları bulunamadı`);
  }
});
console.log('];');
