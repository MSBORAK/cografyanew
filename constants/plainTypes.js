// Türkiye'nin ovaları - Basitleştirilmiş liste

// Delta Ovaları (Kıyı Ovaları)
export const deltaPlains = [
  { id: 1, name: 'Bafra Ovası', x: 500, y: 40, width: 60, height: 40, type: 'delta' },
  { id: 2, name: 'Ergene Ovası', x: 40, y: 30, width: 60, height: 40, type: 'delta' },
  { id: 3, name: 'Çarşamba Ovası', x: 560, y: 50, width: 55, height: 38, type: 'delta' },
  { id: 4, name: 'Çukurova', x: 480, y: 340, width: 80, height: 50, type: 'delta' },
  { id: 5, name: 'Silifke Ovası', x: 380, y: 380, width: 50, height: 35, type: 'delta' },
  { id: 6, name: 'B. Menderes Ovası', x: 70, y: 280, width: 65, height: 42, type: 'delta' },
  { id: 7, name: 'K. Menderes Ovası', x: 70, y: 240, width: 55, height: 38, type: 'delta' },
  { id: 8, name: 'Gediz Ovası', x: 70, y: 200, width: 60, height: 40, type: 'delta' },
];



// Diğer Ovalar
export const otherPlains = [
  // Marmara ve Batı Karadeniz
  { id: 9, name: 'Karacabey Ovası', x: 110, y: 110, width: 50, height: 35, type: 'other' },
  { id: 10, name: 'Adapazarı Ovası', x: 250, y: 70, width: 50, height: 35, type: 'other' },
  
  // Ege Bölgesi
  { id: 11, name: 'Bakırçay Ovası', x: 50, y: 160, width: 50, height: 35, type: 'other' },
  
  // İç Anadolu
  { id: 12, name: 'Eskişehir-Ankara Ovası', x: 340, y: 150, width: 70, height: 45, type: 'other' },
  { id: 13, name: 'Konya Ovası', x: 280, y: 250, width: 90, height: 60, type: 'other' },
  
  // Akdeniz
  { id: 14, name: 'Amik Ovası', x: 530, y: 400, width: 50, height: 35, type: 'other' },
  
  // Doğu ve Güneydoğu Anadolu
  { id: 15, name: 'Erzurum-Kars Ovası', x: 800, y: 140, width: 70, height: 45, type: 'other' },
  { id: 16, name: 'Malatya Ovası', x: 670, y: 270, width: 55, height: 38, type: 'other' },
  { id: 17, name: 'Elazığ Ovası', x: 750, y: 240, width: 50, height: 35, type: 'other' },
  { id: 18, name: 'Harran Ovası', x: 710, y: 350, width: 60, height: 40, type: 'other' },
  { id: 19, name: 'Hakkari Ovası', x: 950, y: 300, width: 45, height: 30, type: 'other' },
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
