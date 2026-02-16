// Türkiye'nin kıyı tipleri

export const coasts = [
  { id: 1, name: 'Karadeniz Kıyıları', x: 600, y: 150, type: 'Yüksek ve Dik', icon: '🏔️' },
  { id: 2, name: 'Marmara Kıyıları', x: 250, y: 210, type: 'Girintili Çıkıntılı', icon: '🏖️' },
  { id: 3, name: 'Ege Kıyıları', x: 260, y: 320, type: 'Girintili Çıkıntılı', icon: '🏖️' },
  { id: 4, name: 'Akdeniz Kıyıları', x: 480, y: 380, type: 'Düz ve Kumlu', icon: '🏝️' },
  { id: 5, name: 'Çukurova Kıyıları', x: 600, y: 370, type: 'Delta Kıyısı', icon: '🌊' },
  { id: 6, name: 'Antalya Körfezi', x: 420, y: 390, type: 'Körfez', icon: '⚓' },
  { id: 7, name: 'İzmir Körfezi', x: 280, y: 310, type: 'Körfez', icon: '⚓' },
  { id: 8, name: 'İzmit Körfezi', x: 320, y: 220, type: 'Körfez', icon: '⚓' },
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
