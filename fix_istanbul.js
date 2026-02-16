const fs = require('fs');

const html = fs.readFileSync('turkey_provinces.html', 'utf8');

// İstanbul'un her iki parçasını bul
const istanbulAsyaRegex = /<g id="istanbul-asya"[^>]*>[\s\S]*?<path d="([^"]+)"[\s\S]*?<path d="([^"]+)"/;
const istanbulAvrupaRegex = /<g id="istanbul-avrupa"[^>]*>[\s\S]*?<path d="([^"]+)"/;

const asyaMatch = html.match(istanbulAsyaRegex);
const avrupaMatch = html.match(istanbulAvrupaRegex);

if (asyaMatch && avrupaMatch) {
  console.log('İstanbul Asya - Path 1 uzunluğu:', asyaMatch[1].length);
  console.log('İstanbul Asya - Path 2 uzunluğu:', asyaMatch[2].length);
  console.log('İstanbul Avrupa - Path uzunluğu:', avrupaMatch[1].length);
  
  // Tüm path'leri birleştir
  const combinedPath = asyaMatch[1] + ' ' + asyaMatch[2] + ' ' + avrupaMatch[1];
  console.log('\nBirleştirilmiş path uzunluğu:', combinedPath.length);
  
  // turkeyPaths.js dosyasını oku
  const turkeyPathsContent = fs.readFileSync('constants/turkeyPaths.js', 'utf8');
  
  // İstanbul'un mevcut path'ini bul ve değiştir
  const updatedContent = turkeyPathsContent.replace(
    /"id": "34",\s*"name": "İstanbul",\s*"d": "[^"]+"/,
    `"id": "34",\n    "name": "İstanbul",\n    "d": "${combinedPath}"`
  );
  
  fs.writeFileSync('constants/turkeyPaths.js', updatedContent);
  console.log('\nİstanbul path\'i güncellendi!');
} else {
  console.log('İstanbul path\'leri bulunamadı!');
  console.log('Asya:', !!asyaMatch);
  console.log('Avrupa:', !!avrupaMatch);
}
