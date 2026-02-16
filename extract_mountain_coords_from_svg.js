const fs = require('fs');
const path = require('path');

// SVG dosyasını oku
const svgPath = './Mountain_systems_of_Turkey.svg'; // SVG dosyasının yolu

if (!fs.existsSync(svgPath)) {
  console.log('SVG dosyası bulunamadı!');
  console.log('Lütfen "Mountain systems of Turkey.svg" dosyasını bu klasöre indirin.');
  console.log('İndirme linki: https://commons.wikimedia.org/wiki/File:Mountain_systems_of_Turkey.svg');
  process.exit(1);
}

const svgContent = fs.readFileSync(svgPath, 'utf-8');

// Text elementlerini bul (dağ isimleri)
const textRegex = /<text[^>]*>(.*?)<\/text>/gs;
const texts = [];
let match;

while ((match = textRegex.exec(svgContent)) !== null) {
  const fullMatch = match[0];
  const textContent = match[1].trim();
  
  // x ve y koordinatlarını çıkar
  const xMatch = fullMatch.match(/x="([^"]+)"/);
  const yMatch = fullMatch.match(/y="([^"]+)"/);
  
  if (xMatch && yMatch && textContent) {
    texts.push({
      name: textContent,
      x: parseFloat(xMatch[1]),
      y: parseFloat(yMatch[1])
    });
  }
}

console.log('Bulunan dağ isimleri ve koordinatları:');
console.log('==========================================\n');

// SVG viewBox'ı bul
const viewBoxMatch = svgContent.match(/viewBox="([^"]+)"/);
if (viewBoxMatch) {
  const [minX, minY, width, height] = viewBoxMatch[1].split(' ').map(Number);
  console.log(`SVG ViewBox: ${minX} ${minY} ${width} ${height}`);
  console.log(`Hedef ViewBox: 0 0 1007.478 527.323\n`);
  
  // Koordinatları dönüştür
  const scaleX = 1007.478 / width;
  const scaleY = 527.323 / height;
  
  texts.forEach(item => {
    const newX = Math.round((item.x - minX) * scaleX);
    const newY = Math.round((item.y - minY) * scaleY);
    
    console.log(`{ id: ?, name: '${item.name}', x: ${newX}, y: ${newY}, height: '?m', type: 'tectonic' },`);
  });
}

console.log('\n==========================================');
console.log(`Toplam ${texts.length} dağ bulundu.`);
