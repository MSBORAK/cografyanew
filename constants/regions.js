// Türkiye'nin 7 Bölgesi ve Şehirleri
export const regions = {
  'marmara': {
    name: 'Marmara Bölgesi',
    cities: ['34', '41', '16', '54', '11', '10', '77', '59', '22', '39', '17'] // İstanbul, Kocaeli, Bursa, Sakarya, Bilecik, Balıkesir, Yalova, Tekirdağ, Edirne, Kırklareli, Çanakkale
  },
  'ege': {
    name: 'Ege Bölgesi',
    cities: ['35', '45', '09', '64', '43', '03', '20', '48'] // İzmir, Manisa, Aydın, Uşak, Kütahya, Afyonkarahisar, Denizli, Muğla
  },
  'akdeniz': {
    name: 'Akdeniz Bölgesi',
    cities: ['07', '01', '33', '31', '46', '80', '32', '15'] // Antalya, Adana, Mersin, Hatay, Kahramanmaraş, Osmaniye, Isparta, Burdur
  },
  'ic-anadolu': {
    name: 'İç Anadolu Bölgesi',
    cities: ['06', '26', '42', '50', '38', '58', '51', '70', '71', '40', '68', '66', '18'] // Ankara, Eskişehir, Konya, Nevşehir, Kayseri, Sivas, Niğde, Karaman, Kırıkkale, Kırşehir, Aksaray, Yozgat, Çankırı
  },
  'karadeniz': {
    name: 'Karadeniz Bölgesi',
    cities: ['05', '08', '14', '19', '28', '29', '37', '52', '53', '55', '57', '60', '61', '67', '69', '74', '78', '81'] // Amasya, Artvin, Bolu, Çorum, Giresun, Gümüşhane, Kastamonu, Ordu, Rize, Samsun, Sinop, Tokat, Trabzon, Zonguldak, Bayburt, Bartın, Karabük, Düzce
  },
  'dogu-anadolu': {
    name: 'Doğu Anadolu Bölgesi',
    cities: ['25', '24', '04', '75', '76', '36', '44', '12', '49', '13', '23', '62', '65', '30'] // Erzurum, Erzincan, Ağrı, Ardahan, Iğdır, Kars, Malatya, Bingöl, Muş, Bitlis, Elazığ, Tunceli, Van, Hakkari
  },
  'guneydogu': {
    name: 'Güneydoğu Anadolu Bölgesi',
    cities: ['02', '72', '21', '27', '79', '47', '56', '63', '73'] // Adıyaman, Batman, Diyarbakır, Gaziantep, Kilis, Mardin, Siirt, Şanlıurfa, Şırnak
  },
  'all': {
    name: 'Tüm Şehirler',
    cities: [] // Boş bırakırsak tüm şehirler gösterilir
  }
};

// Bölge renklerini tanımla
export const regionColors = {
  'marmara': '#3B82F6',
  'ege': '#10B981',
  'akdeniz': '#F59E0B',
  'ic-anadolu': '#EAB308',
  'karadeniz': '#059669',
  'dogu-anadolu': '#8B5CF6',
  'guneydogu': '#DC2626',
  'all': '#2563EB'
};
