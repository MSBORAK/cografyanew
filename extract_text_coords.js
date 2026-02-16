const fs = require('fs');

// HTML dosyasını oku
const html = fs.readFileSync('turkey_provinces.html', 'utf8');

// Her şehir için data-iladi ve path'i bul
const cityRegex = /<g id="([^"]+)" data-plakakodu="(\d+)" data-alankodu="[^"]+" data-iladi="([^"]+)">/g;
const pathRegex = /<path d="([^"]+)"/g;

let match;
const cities = [];

// Tüm şehirleri bul
let tempHtml = html;
while ((match = cityRegex.exec(tempHtml)) !== null) {
  const id = match[2]; // plaka kodu
  const name = match[3]; // şehir adı
  const startIndex = match.index;
  
  // Bu şehrin path'ini bul
  const pathMatch = pathRegex.exec(tempHtml.substring(startIndex, startIndex + 50000));
  if (pathMatch) {
    const pathData = pathMatch[1];
    
    // Path'den koordinatları hesapla
    const cleanPath = pathData.replace(/[MLCZmlcz]/g, ' ');
    const numbers = cleanPath.match(/-?[\d.]+/g);
    
    if (numbers && numbers.length >= 2) {
      let minX = Infinity, maxX = -Infinity;
      let minY = Infinity, maxY = -Infinity;
      
      for (let i = 0; i < numbers.length - 1; i += 2) {
        const x = parseFloat(numbers[i]);
        const y = parseFloat(numbers[i + 1]);
        
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
      
      cities.push({
        id: id.padStart(2, '0'),
        name: name,
        x: Math.round((minX + maxX) / 2),
        y: Math.round((minY + maxY) / 2)
      });
    }
  }
}

// Sırala
cities.sort((a, b) => parseInt(a.id) - parseInt(b.id));

// Çıktı
console.log('const cityCoordinates = {');
cities.forEach(city => {
  console.log(`  '${city.id}': { x: ${city.x}, y: ${city.y} }, // ${city.name}`);
});
console.log('};');
