// Türkiye'nin dağları - Tiplere göre sınıflandırılmış

// Volkanik Dağlar - bulundukları il merkezi koordinatları (cityCenters ile aynı)
export const volcanicMountains = [
  { id: 1, name: 'Ağrı Dağı', x: 902, y: 171, height: '5137m', type: 'volcanic' },             // Ağrı
  { id: 2, name: 'Süphan Dağı', x: 853, y: 261, height: '4058m', type: 'volcanic' },         // Bitlis
  { id: 3, name: 'Erciyes Dağı', x: 520, y: 257, height: '3917m', type: 'volcanic' },        // Kayseri
  { id: 4, name: 'Nemrut Dağı', x: 822, y: 264, height: '2134m', type: 'volcanic' },         // Bitlis (Tatvan, batı)
  { id: 5, name: 'Hasan Dağı', x: 419, y: 282, height: '3268m', type: 'volcanic' },         // Aksaray
  { id: 6, name: 'Tendürek Dağı', x: 918, y: 218, height: '3533m', type: 'volcanic' },       // Van-Ağrı sınırı
  { id: 7, name: 'Melendiz Dağı', x: 465, y: 301, height: '2963m', type: 'volcanic' },       // Niğde
  { id: 8, name: 'Karadağ', x: 394, y: 349, height: '1957m', type: 'volcanic' },             // Karaman
  { id: 9, name: 'Karacadağ (Diyarbakır)', x: 763, y: 284, height: '3896m', type: 'volcanic' }, // Diyarbakır
  { id: 10, name: 'Karacadağ (Konya)', x: 349, y: 286, height: '750m', type: 'volcanic' },    // Konya
  { id: 11, name: 'Kula Tepeleri', x: 121, y: 221, height: '750m', type: 'volcanic' },        // Manisa
];

// Tektonik Dağlar (Kıvrımlı) - bulundukları il merkezi (cityCenters)
export const tectonicMountains = [
  { id: 12, name: 'Koru Dağları', x: 231, y: 84, height: '1031m', type: 'tectonic' },        // Kocaeli
  { id: 13, name: 'Yıldız Dağları', x: 78, y: 32, height: '1031m', type: 'tectonic' },      // Kırklareli
  { id: 14, name: 'Samanlı Dağları', x: 258, y: 104, height: '1600m', type: 'tectonic' },   // Sakarya
  { id: 15, name: 'Küre Dağları', x: 415, y: 59, height: '2019m', type: 'tectonic' },       // Kastamonu
  { id: 16, name: 'Ilgaz Dağları', x: 397, y: 114, height: '2587m', type: 'tectonic' },    // Çankırı
  { id: 17, name: 'Köroğlu Dağları', x: 317, y: 120, height: '2499m', type: 'tectonic' },   // Bolu
  { id: 18, name: 'Canik Dağları', x: 530, y: 81, height: '2062m', type: 'tectonic' },     // Samsun
  { id: 19, name: 'Giresun Dağları', x: 662, y: 113, height: '3331m', type: 'tectonic' },   // Giresun
  { id: 20, name: 'Rize Dağları', x: 780, y: 102, height: '3100m', type: 'tectonic' },      // Rize
  { id: 21, name: 'Kaçkar Dağları', x: 827, y: 75, height: '3937m', type: 'tectonic' },     // Artvin
  { id: 22, name: 'Yalnızçam Dağları', x: 877, y: 77, height: '3200m', type: 'tectonic' },  // Ardahan
  { id: 23, name: 'Kop Dağları', x: 746, y: 137, height: '3300m', type: 'tectonic' },       // Bayburt
  { id: 24, name: 'Munzur Dağları', x: 713, y: 211, height: '3462m', type: 'tectonic' },    // Tunceli
  { id: 25, name: 'Malatya Dağları', x: 632, y: 252, height: '2800m', type: 'tectonic' },  // Malatya
  { id: 26, name: 'Mescit Dağları', x: 707, y: 140, height: '3239m', type: 'tectonic' },     // Gümüşhane
  { id: 27, name: 'Allahüekber Dağları', x: 887, y: 124, height: '3500m', type: 'tectonic' }, // Kars
  { id: 28, name: 'Palandöken Dağları', x: 816, y: 156, height: '3271m', type: 'tectonic' }, // Erzurum
  { id: 29, name: 'Şerafettin Dağları', x: 778, y: 215, height: '3200m', type: 'tectonic' }, // Bingöl (ofset)
  { id: 30, name: 'Bingöl Dağları', x: 783, y: 220, height: '3250m', type: 'tectonic' },      // Bingöl
  { id: 31, name: 'Genç Dağları', x: 788, y: 225, height: '3000m', type: 'tectonic' },     // Bingöl (ofset)
  { id: 32, name: 'İhtiyarşahap Dağları', x: 938, y: 270, height: '3200m', type: 'tectonic' }, // Van
  { id: 33, name: 'Hakkari Dağları', x: 959, y: 313, height: '3500m', type: 'tectonic' },    // Hakkari
  { id: 34, name: 'Hakkari (Cilo-Buzul) Dağları', x: 952, y: 305, height: '4168m', type: 'tectonic' }, // Hakkari (ofset)
  { id: 35, name: 'Gölgeli Dağları', x: 638, y: 306, height: '2500m', type: 'tectonic' },   // Adıyaman
  { id: 36, name: 'Akdağ', x: 177, y: 300, height: '3016m', type: 'tectonic' },              // Denizli
  { id: 37, name: 'Bey Dağları', x: 256, y: 352, height: '3086m', type: 'tectonic' },       // Antalya
  { id: 38, name: 'Tahtalı Dağları', x: 416, y: 378, height: '2366m', type: 'tectonic' },    // Mersin
  { id: 39, name: 'Binboğa Dağları', x: 583, y: 303, height: '3200m', type: 'tectonic' },   // Kahramanmaraş
  { id: 40, name: 'Tecer Dağları', x: 593, y: 201, height: '2800m', type: 'tectonic' },      // Sivas
  { id: 41, name: 'Geyik Dağları', x: 349, y: 286, height: '2877m', type: 'tectonic' },     // Konya
  { id: 42, name: 'Bolkar Dağları', x: 465, y: 301, height: '3524m', type: 'tectonic' },    // Niğde
  { id: 43, name: 'Aladağlar', x: 490, y: 330, height: '3756m', type: 'tectonic' },        // Niğde/Adana sınırı (Adana 502,345’e yakın)
  { id: 44, name: 'Sündiken Dağları', x: 284, y: 168, height: '2200m', type: 'tectonic' },   // Eskişehir
  { id: 45, name: 'Sultan Dağları', x: 247, y: 244, height: '2528m', type: 'tectonic' },     // Afyonkarahisar
];

// Kırık Dağlar (Horst) - bulundukları il merkezi (cityCenters)
export const faultMountains = [
  { id: 46, name: 'Kaz Dağları', x: 62, y: 137, height: '1774m', type: 'fault' },           // Çanakkale
  { id: 47, name: 'Madra Dağı', x: 109, y: 162, height: '1792m', type: 'fault' },          // Balıkesir
  { id: 48, name: 'Yunt Dağı', x: 121, y: 221, height: '1591m', type: 'fault' },           // Manisa
  { id: 49, name: 'Bozdağlar', x: 79, y: 261, height: '2159m', type: 'fault' },            // İzmir
  { id: 50, name: 'Aydın Dağları', x: 106, y: 295, height: '2015m', type: 'fault' },        // Aydın
  { id: 51, name: 'Menteşe Dağları', x: 115, y: 330, height: '1792m', type: 'fault' },      // Muğla
  { id: 52, name: 'Nur (Amanos) Dağları', x: 550, y: 411, height: '2240m', type: 'fault' },  // Hatay
];

// Tüm dağlar
export const allMountains = [
  ...volcanicMountains,
  ...tectonicMountains,
  ...faultMountains,
];

// Dağ tipine göre dağları getir
export const getMountainsByType = (type) => {
  switch (type) {
    case 'volcanic':
      return volcanicMountains;
    case 'tectonic':
      return tectonicMountains;
    case 'fault':
      return faultMountains;
    default:
      return allMountains;
  }
};

// Dağ tipi adlarını getir
export const getMountainTypeName = (type) => {
  switch (type) {
    case 'volcanic':
      return 'Volkanik Dağlar';
    case 'tectonic':
      return 'Kıvrımlı Dağlar';
    case 'fault':
      return 'Kırıklı Dağlar';
    default:
      return 'Tüm Dağlar';
  }
};
