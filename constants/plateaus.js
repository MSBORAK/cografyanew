// Türkiye'nin önemli platoları

export const plateaus = [
  { id: 1, name: 'Anadolu Platosu', x: 500, y: 270, width: 200, height: 120, icon: '🏔️' },
  { id: 2, name: 'Doğu Anadolu Platosu', x: 780, y: 250, width: 140, height: 100, icon: '🏔️' },
  { id: 3, name: 'Yıldız Dağları Platosu', x: 180, y: 200, width: 60, height: 45, icon: '🏔️' },
  { id: 4, name: 'Ayder Yaylası', x: 760, y: 145, width: 40, height: 30, icon: '🌿' },
  { id: 5, name: 'Gümüşhane Yaylaları', x: 700, y: 180, width: 45, height: 35, icon: '🌿' },
  { id: 6, name: 'Uludağ Yaylaları', x: 280, y: 220, width: 35, height: 28, icon: '🌿' },
  { id: 7, name: 'Erciyes Yaylaları', x: 580, y: 280, width: 38, height: 30, icon: '🌿' },
  { id: 8, name: 'Kaçkar Yaylaları', x: 750, y: 140, width: 42, height: 32, icon: '🌿' },
];

export const getPlateauColor = (index) => {
  const colors = ['#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'];
  return colors[index % colors.length];
};
