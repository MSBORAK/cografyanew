// Wikimedia Commons'tan dünya haritası SVG'sini indir
const https = require('https');
const fs = require('fs');

// Wikimedia Commons'daki okyanus işaretli dünya haritası
const SVG_URL = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/A_large_blank_world_map_with_oceans_marked_in_blue.svg';

console.log('Wikimedia Commons dünya haritası indiriliyor...');
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
    
    // Path'leri parse et - Wikimedia SVG formatı
    const pathMatches = data.matchAll(/<path[^>]*d="([^"]*)"[^>]*id="([^"]*)"[^>]*\/>/g);
    const countries = [];
    
    let count = 0;
    for (const match of pathMatches) {
      const d = match[1];
      const id = match[2];
      
      if (d && d.length > 10) { // Sadece anlamlı path'leri al
        countries.push({
          id: id || `country_${count}`,
          name: id || `Country ${count}`,
          d: d
        });
        count++;
      }
    }
    
    // Alternatif format dene
    if (countries.length === 0) {
      const altMatches = data.matchAll(/<path[^>]*id="([^"]*)"[^>]*d="([^"]*)"[^>]*>/g);
      for (const match of altMatches) {
        const id = match[1];
        const d = match[2];
        
        if (d && d.length > 10) {
          countries.push({
            id: id || `country_${count}`,
            name: id || `Country ${count}`,
            d: d
          });
          count++;
        }
      }
    }
    
    console.log(`\n✓ ${countries.length} path bulundu`);
    
    if (countries.length > 0) {
      // İlk birkaç örnek göster
      console.log('\nİlk 3 path örneği:');
      countries.slice(0, 3).forEach((c, i) => {
        console.log(`${i + 1}. ID: ${c.id}, Path uzunluğu: ${c.d.length} karakter`);
      });
    }
    
    // JavaScript dosyası olarak kaydet
    const jsContent = `// Dünya Haritası - Tüm Ülkeler SVG Path Verileri
// Kaynak: Wikimedia Commons (Public Domain)
// https://commons.wikimedia.org/wiki/File:A_large_blank_world_map_with_oceans_marked_in_blue.svg

export const worldPaths = ${JSON.stringify(countries, null, 2)};
`;
    
    fs.writeFileSync('constants/worldPaths.js', jsContent, 'utf8');
    console.log('\n✓ constants/worldPaths.js dosyasına kaydedildi');
    
    console.log('\n' + '='.repeat(60));
    console.log('İşlem tamamlandı!');
    console.log('='.repeat(60));
  });
}).on('error', (err) => {
  console.error('Hata:', err.message);
});
