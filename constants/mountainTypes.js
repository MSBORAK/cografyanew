// Türkiye'nin dağları - Tiplere göre sınıflandırılmış

// Volkanik Dağlar - cityId = göl hangi ilde (soru mantığı: "X dağı hangi ilde?")
export const volcanicMountains = [
  { id: 1, name: 'Ağrı Dağı', x: 902, y: 171, height: '5137m', type: 'volcanic', cityId: '04' },
  { id: 2, name: 'Süphan Dağı', x: 853, y: 261, height: '4058m', type: 'volcanic', cityId: '13' },
  { id: 3, name: 'Erciyes Dağı', x: 520, y: 257, height: '3917m', type: 'volcanic', cityId: '38' },
  { id: 4, name: 'Nemrut Dağı', x: 822, y: 264, height: '2134m', type: 'volcanic', cityId: '13' },
  { id: 5, name: 'Hasan Dağı', x: 419, y: 282, height: '3268m', type: 'volcanic', cityId: '68' },
  { id: 6, name: 'Tendürek Dağı', x: 918, y: 218, height: '3533m', type: 'volcanic', cityId: '04' },
  { id: 7, name: 'Melendiz Dağı', x: 465, y: 301, height: '2963m', type: 'volcanic', cityId: '51' },
  { id: 8, name: 'Karadağ', x: 394, y: 349, height: '1957m', type: 'volcanic', cityId: '70' },
  { id: 9, name: 'Karacadağ (Diyarbakır)', x: 763, y: 284, height: '3896m', type: 'volcanic', cityId: '21' },
  { id: 10, name: 'Karacadağ (Konya)', x: 349, y: 286, height: '750m', type: 'volcanic', cityId: '42' },
  { id: 11, name: 'Kula Tepeleri', x: 121, y: 221, height: '750m', type: 'volcanic', cityId: '45' },
];

// Tektonik Dağlar (Kıvrımlı) - bulundukları il merkezi (cityCenters)
export const tectonicMountains = [
  { id: 12, name: 'Koru Dağları', x: 231, y: 84, height: '1031m', type: 'tectonic', cityId: '41' },
  { id: 13, name: 'Yıldız Dağları', x: 78, y: 32, height: '1031m', type: 'tectonic', cityId: '39' },
  { id: 14, name: 'Samanlı Dağları', x: 258, y: 104, height: '1600m', type: 'tectonic', cityId: '54' },
  { id: 15, name: 'Küre Dağları', x: 415, y: 59, height: '2019m', type: 'tectonic', cityId: '37' },
  { id: 16, name: 'Ilgaz Dağları', x: 397, y: 114, height: '2587m', type: 'tectonic', cityId: '18' },
  { id: 17, name: 'Köroğlu Dağları', x: 317, y: 120, height: '2499m', type: 'tectonic', cityId: '14' },
  { id: 18, name: 'Canik Dağları', x: 530, y: 81, height: '2062m', type: 'tectonic', cityId: '55' },
  { id: 19, name: 'Giresun Dağları', x: 662, y: 113, height: '3331m', type: 'tectonic', cityId: '28' },
  { id: 20, name: 'Rize Dağları', x: 780, y: 102, height: '3100m', type: 'tectonic', cityId: '53' },
  { id: 21, name: 'Kaçkar Dağları', x: 827, y: 75, height: '3937m', type: 'tectonic', cityId: '08' },
  { id: 22, name: 'Yalnızçam Dağları', x: 877, y: 77, height: '3200m', type: 'tectonic', cityId: '75' },
  { id: 23, name: 'Kop Dağları', x: 746, y: 137, height: '3300m', type: 'tectonic', cityId: '69' },
  { id: 24, name: 'Munzur Dağları', x: 713, y: 211, height: '3462m', type: 'tectonic', cityId: '62' },
  { id: 25, name: 'Malatya Dağları', x: 632, y: 252, height: '2800m', type: 'tectonic', cityId: '44' },
  { id: 26, name: 'Mescit Dağları', x: 707, y: 140, height: '3239m', type: 'tectonic', cityId: '29' },
  { id: 27, name: 'Allahüekber Dağları', x: 887, y: 124, height: '3500m', type: 'tectonic', cityId: '36' },
  { id: 28, name: 'Palandöken Dağları', x: 816, y: 156, height: '3271m', type: 'tectonic', cityId: '25' },
  { id: 29, name: 'Şerafettin Dağları', x: 778, y: 215, height: '3200m', type: 'tectonic', cityId: '12' },
  { id: 30, name: 'Bingöl Dağları', x: 783, y: 220, height: '3250m', type: 'tectonic', cityId: '12' },
  { id: 31, name: 'Genç Dağları', x: 788, y: 225, height: '3000m', type: 'tectonic', cityId: '12' },
  { id: 32, name: 'İhtiyarşahap Dağları', x: 938, y: 270, height: '3200m', type: 'tectonic', cityId: '65' },
  { id: 33, name: 'Hakkari Dağları', x: 959, y: 313, height: '3500m', type: 'tectonic', cityId: '30' },
  { id: 34, name: 'Hakkari (Cilo-Buzul) Dağları', x: 952, y: 305, height: '4168m', type: 'tectonic', cityId: '30' },
  { id: 35, name: 'Gölgeli Dağları', x: 638, y: 306, height: '2500m', type: 'tectonic', cityId: '02' },
  { id: 36, name: 'Akdağ', x: 177, y: 300, height: '3016m', type: 'tectonic', cityId: '20' },
  { id: 37, name: 'Bey Dağları', x: 256, y: 352, height: '3086m', type: 'tectonic', cityId: '07' },
  { id: 38, name: 'Tahtalı Dağları', x: 416, y: 378, height: '2366m', type: 'tectonic', cityId: '33' },
  { id: 39, name: 'Binboğa Dağları', x: 583, y: 303, height: '3200m', type: 'tectonic', cityId: '46' },
  { id: 40, name: 'Tecer Dağları', x: 593, y: 201, height: '2800m', type: 'tectonic', cityId: '58' },
  { id: 41, name: 'Geyik Dağları', x: 349, y: 286, height: '2877m', type: 'tectonic', cityId: '42' },
  { id: 42, name: 'Bolkar Dağları', x: 465, y: 301, height: '3524m', type: 'tectonic', cityId: '51' },
  { id: 43, name: 'Aladağlar', x: 490, y: 330, height: '3756m', type: 'tectonic', cityId: '51' },        // Niğde/Adana sınırı (Adana 502,345’e yakın)
  { id: 44, name: 'Sündiken Dağları', x: 284, y: 168, height: '2200m', type: 'tectonic', cityId: '26' },
  { id: 45, name: 'Sultan Dağları', x: 247, y: 244, height: '2528m', type: 'tectonic', cityId: '03' },
];

// Kırık Dağlar (Horst) - cityId = dağ hangi ilde
export const faultMountains = [
  { id: 46, name: 'Kaz Dağları', x: 62, y: 137, height: '1774m', type: 'fault', cityId: '17' },
  { id: 47, name: 'Madra Dağı', x: 109, y: 162, height: '1792m', type: 'fault', cityId: '10' },
  { id: 48, name: 'Yunt Dağı', x: 121, y: 221, height: '1591m', type: 'fault', cityId: '45' },
  { id: 49, name: 'Bozdağlar', x: 79, y: 261, height: '2159m', type: 'fault', cityId: '35' },
  { id: 50, name: 'Aydın Dağları', x: 106, y: 295, height: '2015m', type: 'fault', cityId: '09' },
  { id: 51, name: 'Menteşe Dağları', x: 115, y: 330, height: '1792m', type: 'fault', cityId: '48' },
  { id: 52, name: 'Nur (Amanos) Dağları', x: 550, y: 411, height: '2240m', type: 'fault', cityId: '31' },
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
