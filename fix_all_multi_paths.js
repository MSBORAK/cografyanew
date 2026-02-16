const fs = require('fs');

const html = fs.readFileSync('turkey_provinces.html', 'utf8');

// Çanakkale'nin 2 path'ini bul
const canakkaleRegex = /<g id="canakkale"[^>]*>([\s\S]*?)<\/g>/;
const canakkaleMatch = html.match(canakkaleRegex);
let canakkalePaths = [];
if (canakkaleMatch) {
  const pathRegex = /<path d="([^"]+)"/g;
  let match;
  while ((match = pathRegex.exec(canakkaleMatch[1])) !== null) {
    canakkalePaths.push(match[1]);
  }
}

// Balıkesir'in 3 path'ini bul
const balikesirRegex = /<g id="balikesir"[^>]*>([\s\S]*?)<\/g>/;
const balikesirMatch = html.match(balikesirRegex);
let balikesirPaths = [];
if (balikesirMatch) {
  const pathRegex = /<path d="([^"]+)"/g;
  let match;
  while ((match = pathRegex.exec(balikesirMatch[1])) !== null) {
    balikesirPaths.push(match[1]);
  }
}

console.log('Çanakkale path sayısı:', canakkalePaths.length);
canakkalePaths.forEach((p, i) => console.log(`  Path ${i+1} uzunluğu:`, p.length));

console.log('\nBalıkesir path sayısı:', balikesirPaths.length);
balikesirPaths.forEach((p, i) => console.log(`  Path ${i+1} uzunluğu:`, p.length));

// turkeyPaths.js dosyasını oku
let turkeyPathsContent = fs.readFileSync('constants/turkeyPaths.js', 'utf8');

// Çanakkale'yi güncelle
if (canakkalePaths.length > 0) {
  const combinedCanakkale = canakkalePaths.join(' ');
  turkeyPathsContent = turkeyPathsContent.replace(
    /"id": "17",\s*"name": "Çanakkale",\s*"d": "[^"]+"/,
    `"id": "17",\n    "name": "Çanakkale",\n    "d": "${combinedCanakkale}"`
  );
  console.log('\n✓ Çanakkale güncellendi (toplam:', combinedCanakkale.length, 'karakter)');
}

// Balıkesir'i güncelle
if (balikesirPaths.length > 0) {
  const combinedBalikesir = balikesirPaths.join(' ');
  turkeyPathsContent = turkeyPathsContent.replace(
    /"id": "10",\s*"name": "Balıkesir",\s*"d": "[^"]+"/,
    `"id": "10",\n    "name": "Balıkesir",\n    "d": "${combinedBalikesir}"`
  );
  console.log('✓ Balıkesir güncellendi (toplam:', combinedBalikesir.length, 'karakter)');
}

fs.writeFileSync('constants/turkeyPaths.js', turkeyPathsContent);
console.log('\n✅ Tüm güncellemeler tamamlandı!');
