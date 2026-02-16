const fs = require('fs');

const html = fs.readFileSync('turkey_provinces.html', 'utf8');

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

console.log(`Found ${cities.length} cities`);

const jsContent = `// Gerçek Türkiye Haritası - 81 İl SVG Path Verileri
// Kaynak: dnomak/svg-turkiye-haritasi (MIT License)

export const turkeyPaths = ${JSON.stringify(cities, null, 2)};
`;

fs.writeFileSync('constants/turkeyPaths.js', jsContent);
console.log('turkeyPaths.js created successfully!');
