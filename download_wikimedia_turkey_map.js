// Wikimedia'dan Türkiye haritasını indir ve göl koordinatlarını çıkar
const https = require('https');
const fs = require('fs');

const SVG_URL = 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Turkey_location_map.svg';

console.log('Wikimedia Turkey location map indiriliyor...\n');

https.get(SVG_URL, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    // SVG dosyasını kaydet
    fs.writeFileSync('turkey_location_map_wikimedia.svg', data);
    console.log('✓ SVG dosyası kaydedildi: turkey_location_map_wikimedia.svg');
    console.log(`✓ Dosya boyutu: ${(data.length / 1024).toFixed(2)} KB\n`);
    
    // ViewBox'u bul
    const viewBoxMatch = data.match(/viewBox="([^"]+)"/);
    if (viewBoxMatch) {
      console.log(`ViewBox: ${viewBoxMatch[1]}\n`);
    }
    
    // Göl path'lerini bul (genellikle mavi renkte ve "lake" veya "water" id'si ile)
    console.log('SVG içeriğinde göl/su elementleri aranıyor...\n');
    
    // Path elementlerini bul
    const pathMatches = data.matchAll(/<path[^>]*>/g);
    let lakeCount = 0;
    
    for (const match of pathMatches) {
      const pathTag = match[0];
      
      // Mavi renk tonlarını ara (göller genellikle mavi)
      if (pathTag.includes('fill') && 
          (pathTag.includes('#a0c8f0') || 
           pathTag.includes('#b0d5f1') || 
           pathTag.includes('blue') ||
           pathTag.includes('water') ||
           pathTag.includes('lake'))) {
        lakeCount++;
        console.log(`Göl ${lakeCount}:`);
        console.log(pathTag.substring(0, 200) + '...\n');
      }
    }
    
    // Ellipse ve circle elementlerini de kontrol et
    const ellipseMatches = data.matchAll(/<ellipse[^>]*>/g);
    const circleMatches = data.matchAll(/<circle[^>]*>/g);
    
    for (const match of ellipseMatches) {
      console.log('Ellipse bulundu:', match[0].substring(0, 150));
    }
    
    for (const match of circleMatches) {
      console.log('Circle bulundu:', match[0].substring(0, 150));
    }
    
    console.log(`\n✓ Toplam ${lakeCount} göl path'i bulundu.`);
    console.log('\nDosyayı manuel olarak incelemek için: turkey_location_map_wikimedia.svg');
  });
  
}).on('error', (error) => {
  console.error('İndirme hatası:', error.message);
});
