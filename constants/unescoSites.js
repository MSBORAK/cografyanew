// Türkiye'deki UNESCO Dünya Mirası Alanları
// Şehir bazlı - Şehirlere tıklanarak oynanır

export const unescoSites = [
  // Batı ve Marmara Bölgesi
  { id: 1, name: 'Selimiye Camii', city: 'Edirne', cityId: 22, icon: '🕌', region: 'Batı ve Marmara' },
  { id: 2, name: 'İstanbul\'un Tarihi Alanları', city: 'İstanbul', cityId: 34, icon: '🕌', region: 'Batı ve Marmara' },
  { id: 3, name: 'Bursa ve Cumalıkızık', city: 'Bursa', cityId: 16, icon: '🏘️', region: 'Batı ve Marmara' },
  { id: 4, name: 'Troya', city: 'Çanakkale', cityId: 17, icon: '🐴', region: 'Batı ve Marmara' },
  
  // Ege ve Akdeniz Bölgesi
  { id: 5, name: 'Efes ve Bergama', city: 'İzmir', cityId: 35, icon: '🏛️', region: 'Ege ve Akdeniz' },
  { id: 6, name: 'Aphrodisias', city: 'Aydın', cityId: 9, icon: '🏛️', region: 'Ege ve Akdeniz' },
  { id: 7, name: 'Hieropolis ve Pamukkale', city: 'Denizli', cityId: 20, icon: '💧', region: 'Ege ve Akdeniz' },
  { id: 8, name: 'Xanthos-Letoon', city: 'Antalya', cityId: 7, icon: '🏛️', region: 'Ege ve Akdeniz' },
  
  // İç Anadolu Bölgesi
  { id: 9, name: 'Sivrihisar Camii', city: 'Eskişehir', cityId: 26, icon: '🕌', region: 'İç Anadolu' },
  { id: 10, name: 'Ulu Camii', city: 'Afyon', cityId: 3, icon: '🕌', region: 'İç Anadolu' },
  { id: 11, name: 'Gordion ve Aslanhane Camii', city: 'Ankara', cityId: 6, icon: '🏛️', region: 'İç Anadolu' },
  { id: 12, name: 'Çatalhöyük ve Eşrefoğlu Camii', city: 'Konya', cityId: 42, icon: '🏛️', region: 'İç Anadolu' },
  { id: 13, name: 'Göreme M.P. ve Kapadokya', city: 'Nevşehir', cityId: 50, icon: '🏔️', region: 'İç Anadolu' },
  { id: 14, name: 'Hattuşa', city: 'Çorum', cityId: 19, icon: '🏛️', region: 'İç Anadolu' },
  
  // Karadeniz ve Doğu Anadolu Bölgesi
  { id: 15, name: 'Safranbolu', city: 'Karabük', cityId: 78, icon: '🏘️', region: 'Karadeniz ve Doğu Anadolu' },
  { id: 16, name: 'Mahmut Bey Camii', city: 'Kastamonu', cityId: 37, icon: '🕌', region: 'Karadeniz ve Doğu Anadolu' },
  { id: 17, name: 'Divriği Ulu Camii', city: 'Sivas', cityId: 58, icon: '🕌', region: 'Karadeniz ve Doğu Anadolu' },
  { id: 18, name: 'Ani Harabeleri', city: 'Kars', cityId: 36, icon: '🏛️', region: 'Karadeniz ve Doğu Anadolu' },
  { id: 19, name: 'Arslantepe', city: 'Malatya', cityId: 44, icon: '🏛️', region: 'Karadeniz ve Doğu Anadolu' },
  { id: 20, name: 'Nemrut Dağı', city: 'Adıyaman', cityId: 2, icon: '⛰️', region: 'Karadeniz ve Doğu Anadolu' },
  
  // Güneydoğu Anadolu Bölgesi
  { id: 21, name: 'Diyarbakır Kalesi ve Hevsel Bahçeleri', city: 'Diyarbakır', cityId: 21, icon: '🏰', region: 'Güneydoğu Anadolu' },
  { id: 22, name: 'Göbeklitepe', city: 'Urfa', cityId: 63, icon: '🗿', region: 'Güneydoğu Anadolu' },
];

// UNESCO alanı rengini al - Bölgelere göre
export function getUnescoColor(region) {
  const regionColors = {
    'Batı ve Marmara': '#F97316', // Turuncu
    'Ege ve Akdeniz': '#FBBF24', // Sarı
    'İç Anadolu': '#06B6D4', // Cyan
    'Karadeniz ve Doğu Anadolu': '#A855F7', // Mor
    'Güneydoğu Anadolu': '#EC4899', // Pembe
  };
  return regionColors[region] || '#6B7280';
}


