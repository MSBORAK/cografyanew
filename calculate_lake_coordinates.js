// Real lake coordinates (latitude, longitude)
const lakeCoordinates = {
  'Van Gölü': { lat: 38.656776, lon: 42.805481 },
  'Tuz Gölü': { lat: 38.733, lon: 33.383 },
  'Beyşehir Gölü': { lat: 37.78333, lon: 31.55 },
  'Eğirdir Gölü': { lat: 38.05667, lon: 30.86611 },
  'İznik Gölü': { lat: 40.43, lon: 29.51 },
  'Sapanca Gölü': { lat: 40.69, lon: 30.27 },
  'Manyas Gölü': { lat: 40.05, lon: 27.97 },
  'Hazar Gölü': { lat: 38.483, lon: 39.417 },
  'Çıldır Gölü': { lat: 41.1, lon: 42.7 },
  'Bafa Gölü': { lat: 37.504, lon: 27.524 }
};

// Turkey SVG viewBox: "0 0 1007.478 527.323"
// Turkey geographic bounds (approximate):
// Latitude: 36°N to 42°N (6 degrees)
// Longitude: 26°E to 45°E (19 degrees)

const SVG_WIDTH = 1007.478;
const SVG_HEIGHT = 527.323;
const MIN_LAT = 36;
const MAX_LAT = 42;
const MIN_LON = 26;
const MAX_LON = 45;

function latLonToSVG(lat, lon) {
  // Convert latitude to Y (inverted because SVG Y increases downward)
  const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * SVG_HEIGHT;
  
  // Convert longitude to X
  const x = ((lon - MIN_LON) / (MAX_LON - MIN_LON)) * SVG_WIDTH;
  
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

console.log('Lake coordinates for SVG (viewBox: 0 0 1007.478 527.323):\n');

for (const [name, coords] of Object.entries(lakeCoordinates)) {
  const svgCoords = latLonToSVG(coords.lat, coords.lon);
  console.log(`${name}: x=${svgCoords.x}, y=${svgCoords.y}`);
}

// Generate the lakes array for React Native component
console.log('\n\n// For LakesMap.js:');
console.log('const lakes = [');

const lakeData = [
  { id: 1, name: 'Van Gölü', rx: 40, ry: 28 },
  { id: 2, name: 'Tuz Gölü', rx: 35, ry: 22 },
  { id: 3, name: 'Beyşehir Gölü', rx: 22, ry: 16 },
  { id: 4, name: 'Eğirdir Gölü', rx: 18, ry: 14 },
  { id: 5, name: 'İznik Gölü', rx: 16, ry: 13 },
  { id: 6, name: 'Sapanca Gölü', rx: 14, ry: 9 },
  { id: 7, name: 'Bafa Gölü', rx: 13, ry: 11 },
  { id: 8, name: 'Manyas Gölü', rx: 15, ry: 11 },
  { id: 9, name: 'Hazar Gölü', rx: 18, ry: 11 },
  { id: 10, name: 'Çıldır Gölü', rx: 15, ry: 13 },
];

lakeData.forEach(lake => {
  const coords = lakeCoordinates[lake.name];
  const svgCoords = latLonToSVG(coords.lat, coords.lon);
  console.log(`  { id: ${lake.id}, name: '${lake.name}', x: ${svgCoords.x}, y: ${svgCoords.y}, rx: ${lake.rx}, ry: ${lake.ry} },`);
});

console.log('];');
