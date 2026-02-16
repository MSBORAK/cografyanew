// SimpleMaps'ten dünya haritası SVG'sini indir ve parse et
const https = require('https');
const fs = require('fs');

const SVG_URL = 'https://simplemaps.com/static/svg/world/world.svg';

console.log('Dünya haritası SVG indiriliyor...');
console.log('URL:', SVG_URL);
console.log('='.repeat(60));

https.get(SVG_URL, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk;
  });

  response.on('end', () => {
    console.log('✓ SVG dosyası indirildi');
    console.log(`Boyut: ${(data.length / 1024).toFixed(2)} KB`);
    
    // SVG dosyasını kaydet
    fs.writeFileSync('world_map_raw.svg', data, 'utf8');
    console.log('✓ world_map_raw.svg dosyasına kaydedildi');
    
    // Path'leri parse et
    const pathMatches = data.matchAll(/<path[^>]*id="([^"]*)"[^>]*d="([^"]*)"[^>]*\/>/g);
    const countries = [];
    
    for (const match of pathMatches) {
      const id = match[1];
      const d = match[2];
      
      // ISO kodu ve ülke adını bul
      const nameMatch = data.match(new RegExp(`<title[^>]*>${id}[^<]*</title>`));
      
      countries.push({
        id: id,
        name: id,
        d: d
      });
    }
    
    console.log(`\n✓ ${countries.length} ülke path'i bulundu`);
    
    // JavaScript dosyası olarak kaydet
    const jsContent = `// Dünya Haritası - Tüm Ülkeler SVG Path Verileri
// Kaynak: SimpleMaps (Free for Commercial and Personal Use)

export const worldPaths = ${JSON.stringify(countries, null, 2)};
`;
    
    fs.writeFileSync('constants/worldPaths.js', jsContent, 'utf8');
    console.log('✓ constants/worldPaths.js dosyasına kaydedildi');
    
    console.log('\n' + '='.repeat(60));
    console.log('İşlem tamamlandı!');
    console.log('='.repeat(60));
  });
}).on('error', (err) => {
  console.error('Hata:', err.message);
});
