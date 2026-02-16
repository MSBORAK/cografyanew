const fs = require('fs');

const html = fs.readFileSync('turkey_provinces.html', 'utf8');

// İstanbul için özel regex (2 parça var)
const istanbulRegex = /<g id="istanbul-asya" data-plakakodu="34"[^>]*>\s*<path d="([^"]+)"/;
const istanbulMatch = html.match(istanbulRegex);

// Diğer iller için normal regex
const regex = /<g id="(\w+)" data-plakakodu="(\d+)" data-alankodu="\d+" data-iladi="([^"]+)">\s*<path d="([^"]+)"/g;

let match;
const cities = [];

while ((match = regex.exec(html)) !== null) {
  cities.push({
    id: match[2],
    name: match[3],
    d: match[4]
  });
}

// İstanbul'u ekle (eğer bulunamadıysa)
if (istanbulMatch && !cities.find(c => c.id === '34')) {
  cities.push({
    id: '34',
    name: 'İstanbul',
    d: istanbulMatch[1]
  });
}

// ID'ye göre sırala
cities.sort((a, b) => parseInt(a.id) - parseInt(b.id));

console.log(`Found ${cities.length} cities`);
console.log('Missing cities:', Array.from({length: 81}, (_, i) => String(i + 1).padStart(2, '0')).filter(id => !cities.find(c => c.id === id)));

const jsContent = `// Gerçek Türkiye Haritası - 81 İl SVG Path Verileri
// Kaynak: dnomak/svg-turkiye-haritasi (MIT License)

export const turkeyPaths = ${JSON.stringify(cities, null, 2)};
`;

fs.writeFileSync('constants/turkeyPaths.js', jsContent);
console.log('turkeyPaths.js created successfully!');
