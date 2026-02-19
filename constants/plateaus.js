// Türkiye'nin önemli platoları - il merkezlerine göre (cityCenters viewBox)

export const plateaus = [
  { id: 1, name: 'Anadolu Platosu', x: 356, y: 170, icon: '🏔️' },           // Ankara (İç Anadolu)
  { id: 2, name: 'Doğu Anadolu Platosu', x: 816, y: 156, icon: '🏔️' },     // Erzurum
  { id: 3, name: 'Yıldız Dağları Platosu', x: 78, y: 32, icon: '🏔️' },    // Kırklareli (Trakya)
  { id: 4, name: 'Ayder Yaylası', x: 780, y: 102, icon: '🌿' },            // Rize
  { id: 5, name: 'Gümüşhane Yaylaları', x: 707, y: 140, icon: '🌿' },       // Gümüşhane
  { id: 6, name: 'Uludağ Yaylaları', x: 177, y: 141, icon: '🌿' },         // Bursa
  { id: 7, name: 'Erciyes Yaylaları', x: 520, y: 257, icon: '🌿' },         // Kayseri
  { id: 8, name: 'Kaçkar Yaylaları', x: 782, y: 106, icon: '🌿' },          // Rize (Ayder’e yakın, hafif ofset)
];

export const getPlateauColor = (index) => {
  const colors = ['#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'];
  return colors[index % colors.length];
};
