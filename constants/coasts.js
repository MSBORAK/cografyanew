// Türkiye'nin kıyı tipleri - il merkezlerine göre (cityCenters viewBox)

export const coasts = [
  { id: 1, name: 'Karadeniz Kıyıları', x: 530, y: 81, type: 'Yüksek ve Dik', icon: '🏔️' },     // Samsun (Karadeniz orta)
  { id: 2, name: 'Marmara Kıyıları', x: 177, y: 141, type: 'Girintili Çıkıntılı', icon: '🏖️' },  // Bursa (Marmara)
  { id: 3, name: 'Ege Kıyıları', x: 79, y: 261, type: 'Girintili Çıkıntılı', icon: '🏖️' },       // İzmir
  { id: 4, name: 'Akdeniz Kıyıları', x: 256, y: 352, type: 'Düz ve Kumlu', icon: '🏝️' },        // Antalya
  { id: 5, name: 'Çukurova Kıyıları', x: 502, y: 345, type: 'Delta Kıyısı', icon: '🌊' },       // Adana
  { id: 6, name: 'Antalya Körfezi', x: 248, y: 362, type: 'Körfez', icon: '⚓' },               // Antalya körfezi (güneye kaydırıldı – net ayrı)
  { id: 7, name: 'İzmir Körfezi', x: 66, y: 252, type: 'Körfez', icon: '⚓' },                   // İzmir körfezi (batıya kaydırıldı – net ayrı)
  { id: 8, name: 'İzmit Körfezi', x: 231, y: 84, type: 'Körfez', icon: '⚓' },                  // Kocaeli (İzmit)
];

export const getCoastColor = (type) => {
  switch (type) {
    case 'Yüksek ve Dik':
      return '#64748B';
    case 'Girintili Çıkıntılı':
      return '#0EA5E9';
    case 'Düz ve Kumlu':
      return '#F59E0B';
    case 'Delta Kıyısı':
      return '#10B981';
    case 'Körfez':
      return '#3B82F6';
    default:
      return '#06B6D4';
  }
};
