// Türkiye'nin önemli masif arazileri - 15 Masif

export const massifs = [
  { id: 1, name: 'Uludağ M.', x: 185, y: 145, radius: 20, icon: '🗻' },
  { id: 2, name: 'Menteşe M.', x: 110, y: 315, radius: 22, icon: '🗻' },
  { id: 3, name: 'Saruhan', x: 85, y: 260, radius: 18, icon: '🗻' },
  { id: 4, name: 'Kaz Dağları', x: 70, y: 140, radius: 19, icon: '🗻' },
  { id: 5, name: 'Ilgaz Dağı M. (Daday-Devrekani)', x: 440, y: 65, radius: 24, icon: '🗻' },
  { id: 6, name: 'Sultan Dağları M.', x: 340, y: 280, radius: 21, icon: '🗻' },
  { id: 7, name: 'Kırşehir M.', x: 480, y: 240, radius: 20, icon: '🗻' },
  { id: 8, name: 'Akdağ M.', x: 455, y: 340, radius: 22, icon: '🗻' },
  { id: 9, name: 'Niğde M.', x: 505, y: 300, radius: 21, icon: '🗻' },
  { id: 10, name: 'Alanya-Anamur M.', x: 345, y: 410, radius: 23, icon: '🗻' },
  { id: 11, name: 'Tokat M.', x: 600, y: 130, radius: 20, icon: '🗻' },
  { id: 12, name: 'Akdağlarındeni M.', x: 625, y: 195, radius: 21, icon: '🗻' },
  { id: 13, name: 'Pötürge masifi (Malatya)', x: 685, y: 275, radius: 22, icon: '🗻' },
  { id: 14, name: 'Bitlis masifi', x: 855, y: 265, radius: 23, icon: '🗻' },
  { id: 15, name: 'Yıldız dağları M.', x: 100, y: 20, radius: 19, icon: '🗻' },
];

export const getMassifColor = (index) => {
  const colors = ['#78716C', '#57534E', '#44403C', '#292524', '#1C1917'];
  return colors[index % colors.length];
};
