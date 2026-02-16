// Script to convert lake coordinates from SVG viewBox (5025 x 2159) to app viewBox (1007.478 x 527.323)
// The turkey.svg uses viewBox="0 0 5025 2159"
// The app uses viewBox="0 0 1007.478 527.323"

// Conversion factors
const SVG_WIDTH = 5025;
const SVG_HEIGHT = 2159;
const APP_WIDTH = 1007.478;
const APP_HEIGHT = 527.323;

const scaleX = APP_WIDTH / SVG_WIDTH;  // 0.2004
const scaleY = APP_HEIGHT / SVG_HEIGHT; // 0.2442

// Lake positions based on real geographic locations in Turkey
// Using approximate SVG coordinates (5025 x 2159 system) then converting to app coordinates
const lakesInSVGCoords = [
  // Van Gölü - far east, near Van city
  { id: 1, name: 'Van Gölü', svgX: 4400, svgY: 1450, rx: 40, ry: 28 },
  
  // Tuz Gölü - central Turkey, between Ankara-Konya-Aksaray
  { id: 2, name: 'Tuz Gölü', svgX: 2400, svgY: 1100, rx: 35, ry: 22 },
  
  // Beyşehir Gölü - southwest of Konya
  { id: 3, name: 'Beyşehir Gölü', svgX: 2000, svgY: 1200, rx: 22, ry: 16 },
  
  // Eğirdir Gölü - Isparta region, west of Beyşehir
  { id: 4, name: 'Eğirdir Gölü', svgX: 1750, svgY: 1150, rx: 18, ry: 14 },
  
  // İznik Gölü - near Bursa, south of Istanbul
  { id: 5, name: 'İznik Gölü', svgX: 1100, svgY: 500, rx: 16, ry: 13 },
  
  // Sapanca Gölü - between Istanbul and Ankara, near Sakarya
  { id: 6, name: 'Sapanca Gölü', svgX: 1200, svgY: 450, rx: 14, ry: 9 },
  
  // Bafa Gölü - Aydın region, Aegean coast
  { id: 7, name: 'Bafa Gölü', svgX: 900, svgY: 1100, rx: 13, ry: 11 },
  
  // Manyas Gölü - Balıkesir region, south of Marmara Sea
  { id: 8, name: 'Manyas Gölü', svgX: 850, svgY: 550, rx: 15, ry: 11 },
  
  // Hazar Gölü - Elazığ region, eastern Turkey
  { id: 9, name: 'Hazar Gölü', svgX: 3800, svgY: 1300, rx: 18, ry: 11 },
  
  // Çıldır Gölü - far northeast, near Ardahan
  { id: 10, name: 'Çıldır Gölü', svgX: 4600, svgY: 1000, rx: 15, ry: 13 },
];

// Convert to app coordinates
const lakesInAppCoords = lakesInSVGCoords.map(lake => ({
  id: lake.id,
  name: lake.name,
  x: Math.round(lake.svgX * scaleX * 10) / 10,
  y: Math.round(lake.svgY * scaleY * 10) / 10,
  rx: lake.rx,
  ry: lake.ry,
}));

console.log('// Lake coordinates for app (viewBox: 0 0 1007.478 527.323)');
console.log('const lakes = [');
lakesInAppCoords.forEach(lake => {
  console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${lake.x}, y: ${lake.y}, rx: ${lake.rx}, ry: ${lake.ry} },`);
});
console.log('];');

console.log('\n// Conversion info:');
console.log(`// SVG viewBox: ${SVG_WIDTH} x ${SVG_HEIGHT}`);
console.log(`// App viewBox: ${APP_WIDTH} x ${APP_HEIGHT}`);
console.log(`// Scale factors: X=${scaleX.toFixed(4)}, Y=${scaleY.toFixed(4)}`);
