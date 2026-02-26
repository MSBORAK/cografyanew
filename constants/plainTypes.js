// Türkiye'nin ovaları - bulundukları il merkezi (cityCenters)

// Delta Ovaları (Kıyı Ovaları)
export const deltaPlains = [
  { id: 1, name: 'Bafra Ovası', x: 525, y: 78, type: 'delta' },   // Samsun (batı)
  { id: 2, name: 'Ergene Ovası', x: 98, y: 72, type: 'delta' },   // Tekirdağ
  { id: 3, name: 'Çarşamba Ovası', x: 545, y: 84, type: 'delta' }, // Samsun (doğu)
  { id: 4, name: 'Çukurova', x: 502, y: 345, type: 'delta' },     // Adana
  { id: 5, name: 'Silifke Ovası', x: 416, y: 378, type: 'delta' }, // Mersin
  { id: 6, name: 'B. Menderes Ovası', x: 106, y: 295, type: 'delta' }, // Aydın
  { id: 7, name: 'K. Menderes Ovası', x: 79, y: 261, type: 'delta' },  // İzmir
  { id: 8, name: 'Gediz Ovası', x: 121, y: 221, type: 'delta' },  // Manisa
];

// Diğer Ovalar
export const otherPlains = [
  { id: 9, name: 'Karacabey Ovası', x: 177, y: 141, type: 'other' },   // Bursa
  { id: 10, name: 'Adapazarı Ovası', x: 258, y: 104, type: 'other' },  // Sakarya
  { id: 11, name: 'Bakırçay Ovası', x: 85, y: 195, type: 'other' },    // İzmir (Bergama yöresi)
  { id: 12, name: 'Eskişehir-Ankara Ovası', x: 284, y: 168, type: 'other' }, // Eskişehir
  { id: 13, name: 'Konya Ovası', x: 349, y: 286, type: 'other' },     // Konya
  { id: 14, name: 'Amik Ovası', x: 550, y: 411, type: 'other' },       // Hatay
  { id: 15, name: 'Erzurum-Kars Ovası', x: 816, y: 156, type: 'other' }, // Erzurum
  { id: 16, name: 'Malatya Ovası', x: 632, y: 252, type: 'other' },   // Malatya
  { id: 17, name: 'Elazığ Ovası', x: 688, y: 253, type: 'other' },     // Elazığ
  { id: 18, name: 'Harran Ovası', x: 688, y: 353, type: 'other' },    // Şanlıurfa
  { id: 19, name: 'Hakkari Ovası', x: 959, y: 313, type: 'other' },    // Hakkari
];

// Tüm ovalar
export const allPlains = [
  ...deltaPlains,
  ...otherPlains,
];

// Ova tipine göre ovaları getir
export const getPlainsByType = (type) => {
  return allPlains;
};

// Ova tipi adlarını getir
export const getPlainTypeName = (type) => {
  return 'Tüm Ovalar';
};
