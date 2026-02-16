// Dünya'nın 5 büyük okyanusunun konumları
// Robinson projection (1000 x 507) koordinat sisteminde
// Koordinatlar manuel olarak ayarlanmıştır

export const oceans = [
  {
    id: 'pacific',
    name: 'Pasifik Okyanusu',
    regions: [
      { x: 928, y: 189 }, // Batı Pasifik
      { x: 100, y: 250 }, // Doğu Pasifik
    ]
  },
  {
    id: 'atlantic',
    name: 'Atlas Okyanusu',
    regions: [
      { x: 401, y: 152 }, // Kuzey Atlas
      { x: 453, y: 328 }, // Güney Atlas
    ]
  },
  {
    id: 'indian',
    name: 'Hint Okyanusu',
    regions: [
      { x: 704, y: 283 },
    ]
  },
  {
    id: 'southern',
    name: 'Güney Okyanusu',
    regions: [
      { x: 200, y: 480 },
      { x: 500, y: 490 },
      { x: 800, y: 480 },
    ]
  },
  {
    id: 'arctic',
    name: 'Kuzey Buz Denizi',
    regions: [
      { x: 232, y: 15 },
    ]
  }
];

// Okyanus renklerini tanımla
export const oceanColors = {
  'pacific': '#3B82F6',      // Mavi
  'atlantic': '#06B6D4',     // Cyan
  'indian': '#8B5CF6',       // Mor
  'southern': '#10B981',     // Yeşil
  'arctic': '#F59E0B',       // Turuncu
};

// Okyanus rengini al
export function getOceanColor(oceanId) {
  return oceanColors[oceanId] || '#3B82F6';
}
