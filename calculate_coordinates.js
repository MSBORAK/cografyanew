const { turkeyPaths } = require('./constants/turkeyPaths.js');

// SVG path'inden merkez koordinatı hesapla
const getCenterFromPath = (pathData) => {
  // M, L, C, Z gibi komutları temizle, sadece sayıları al
  const cleanPath = pathData.replace(/[MLCZmlcz]/g, ' ');
  const numbers = cleanPath.match(/-?[\d.]+/g);
  
  if (!numbers || numbers.length < 2) return { x: 500, y: 250 };
  
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
  
  return {
    x: Math.round((minX + maxX) / 2),
    y: Math.round((minY + maxY) / 2)
  };
};

console.log('const cityCoordinates = {');
turkeyPaths.forEach(city => {
  const coords = getCenterFromPath(city.d);
  console.log(`  '${city.id}': { x: ${coords.x}, y: ${coords.y} }, // ${city.name}`);
});
console.log('};');
