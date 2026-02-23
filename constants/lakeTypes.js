// Türkiye'nin gölleri - il merkezlerine göre (cityCenters viewBox)

// DOĞAL GÖLLER - Tektonik (çöküntü) — cityId = il plaka kodu (göl hangi ilde)
export const tectonicLakes = [
  { id: 1, name: 'Durusu Gölü', x: 179, y: 72, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '34' },
  { id: 2, name: 'Büyük Çekmece Gölü', x: 175, y: 78, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '34' },
  { id: 3, name: 'Küçük Çekmece Gölü', x: 183, y: 76, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '34' },
  { id: 4, name: 'Kuş Gölü', x: 109, y: 162, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '10' },
  { id: 5, name: 'Ulubat Gölü', x: 177, y: 141, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '16' },
  { id: 6, name: 'İznik Gölü', x: 182, y: 155, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '16' },
  { id: 7, name: 'Sapanca Gölü', x: 258, y: 104, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '54' },
  { id: 8, name: 'Sülüklü Gölü', x: 322, y: 128, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '14' },
  { id: 9, name: 'Abant Gölü', x: 335, y: 158, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '14' },
  { id: 10, name: 'Yedigöller', x: 355, y: 138, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '14' },
  { id: 11, name: 'Balık Gölü', x: 521, y: 117, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '05' },
  { id: 12, name: 'Borabay Gölü', x: 508, y: 132, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '05' },
  { id: 13, name: 'Zinav Gölü', x: 563, y: 135, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '60' },
  { id: 14, name: 'Sera Gölü', x: 724, y: 98, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '61' },
  { id: 15, name: 'Uzun Göl', x: 716, y: 110, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '61' },
  { id: 16, name: 'Tortum Gölü', x: 816, y: 156, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '25' },
  { id: 17, name: 'Çıldır Gölü', x: 887, y: 124, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '36' },
  { id: 18, name: 'Aktaş Gölü', x: 865, y: 118, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '75' },
  { id: 19, name: 'Balık Gölü', x: 902, y: 171, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '04' },
  { id: 20, name: 'Erçek Gölü', x: 928, y: 258, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '65' },
  { id: 21, name: 'Van Gölü', x: 940, y: 272, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '65' },
  { id: 22, name: 'Nemrut Gölü', x: 850, y: 258, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '13' },
  { id: 23, name: 'Nazik Gölü', x: 848, y: 268, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '13' },
  { id: 24, name: 'Haçlı Gölü', x: 831, y: 226, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '49' },
  { id: 25, name: 'Hazar Göl', x: 688, y: 253, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '23' },
  { id: 26, name: 'Tuzla Gölü', x: 528, y: 265, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '38' },
  { id: 27, name: 'Seyfe Gölü', x: 426, y: 205, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '40' },
  { id: 28, name: 'Eğmir Gölü', x: 434, y: 216, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '40' },
  { id: 29, name: 'Moğan Gölü', x: 352, y: 168, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '06' },
  { id: 30, name: 'Tuz Gölü', x: 419, y: 282, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '68' },
  { id: 31, name: 'Tersakan Gölü', x: 414, y: 276, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '68' },
  { id: 32, name: 'Yay Gölü', x: 424, y: 288, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '68' },
  { id: 33, name: 'Akyatan Gölü', x: 498, y: 343, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '01' },
  { id: 34, name: 'Acıgöl', x: 465, y: 301, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '51' },
  { id: 35, name: 'Meke Göl', x: 500, y: 280, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '42' },
  { id: 36, name: 'Acıgöl', x: 520, y: 290, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '50' },
  { id: 37, name: 'Suğla Gölü', x: 346, y: 288, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '42' },
  { id: 38, name: 'Beyşehir Gölü', x: 352, y: 294, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '42' },
  { id: 39, name: 'İlgın Gölü', x: 348, y: 276, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '42' },
  { id: 40, name: 'Akşehir Gölü', x: 340, y: 282, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '42' },
  { id: 41, name: 'Eber Gölü', x: 247, y: 244, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '03' },
  { id: 42, name: 'Eğirdir Gölü', x: 262, y: 306, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '32' },
  { id: 43, name: 'Kovada Gölü', x: 270, y: 314, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '32' },
  { id: 44, name: 'Burdur Gölü', x: 217, y: 323, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '15' },
  { id: 45, name: 'Acıgöl', x: 340, y: 340, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '20' },
  { id: 46, name: 'Yarışlı Gölü', x: 177, y: 300, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '20' },
  { id: 47, name: 'Salda Gölü', x: 180, y: 308, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '20' },
  { id: 48, name: 'Köyceğiz Gölü', x: 115, y: 330, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '48' },
  { id: 49, name: 'Bafa (Çamiçi) Gölü', x: 106, y: 295, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '09' },
  { id: 50, name: 'Marmara Gölü', x: 121, y: 221, rx: 10, ry: 8, type: 'tectonic', category: 'natural', cityId: '45' },
];

// Karstik Göller
export const karsticLakes = [
  { id: 51, name: 'Karagöl', x: 199, y: 201, rx: 10, ry: 8, type: 'karstic', category: 'natural', cityId: '43' },
  { id: 52, name: 'Karagöl', x: 424, y: 278, rx: 10, ry: 8, type: 'karstic', category: 'natural', cityId: '68' },
];

// Volkanik Göller (krater)
export const volcanicLakes = [
  { id: 53, name: 'Nemrut Krater Gölü', x: 856, y: 264, rx: 10, ry: 8, type: 'volcanic', category: 'natural', cityId: '13' },
  { id: 54, name: 'Meke Gölü', x: 503, y: 278, rx: 10, ry: 8, type: 'volcanic', category: 'natural', cityId: '42' },
  { id: 55, name: 'Acıgöl', x: 522, y: 292, rx: 10, ry: 8, type: 'volcanic', category: 'natural', cityId: '50' },
];

// Set Göller (heyelan set)
export const damLakes = [
  { id: 56, name: 'Tortum Gölü', x: 819, y: 158, rx: 10, ry: 8, type: 'dam', category: 'natural', cityId: '25' },
  { id: 57, name: 'Abant Gölü', x: 338, y: 160, rx: 10, ry: 8, type: 'dam', category: 'natural', cityId: '14' },
  { id: 58, name: 'Yedigöller', x: 358, y: 142, rx: 10, ry: 8, type: 'dam', category: 'natural', cityId: '14' },
];

// Buzul Gölleri
export const glacialLakes = [
  { id: 59, name: 'Çıldır Gölü', x: 890, y: 128, rx: 10, ry: 8, type: 'glacial', category: 'natural', cityId: '36' },
  { id: 60, name: 'Karagöl (Borçka)', x: 827, y: 75, rx: 10, ry: 8, type: 'glacial', category: 'natural', cityId: '08' },
  { id: 61, name: 'Balıklı Göl (Kaçkar)', x: 778, y: 98, rx: 10, ry: 8, type: 'glacial', category: 'natural', cityId: '53' },
  { id: 62, name: 'Deniz Gölü (Kaçkar)', x: 774, y: 110, rx: 10, ry: 8, type: 'glacial', category: 'natural', cityId: '53' },
];

// YAPAY GÖLLER (Barajlar)
export const artificialLakes = [
  { id: 63, name: 'Atatürk Barajı', x: 688, y: 353, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '63' },
  { id: 64, name: 'Keban Barajı', x: 688, y: 253, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '23' },
  { id: 65, name: 'Karakaya Barajı', x: 632, y: 252, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '44' },
  { id: 66, name: 'Altınkaya Barajı', x: 530, y: 81, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '55' },
  { id: 67, name: 'Hirfanlı Barajı', x: 432, y: 211, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '40' },
  { id: 68, name: 'Sarıyar Barajı', x: 284, y: 168, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '26' },
  { id: 69, name: 'Gökçekaya Barajı', x: 317, y: 120, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '14' },
  { id: 70, name: 'Seyhan Barajı', x: 504, y: 347, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '01' },
  { id: 71, name: 'Çubuk Barajı', x: 358, y: 172, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '06' },
  { id: 72, name: 'Kemer Barajı', x: 108, y: 297, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '09' },
  { id: 73, name: 'Berdan Barajı', x: 416, y: 378, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '33' },
  { id: 74, name: 'Manavgat Barajı', x: 256, y: 352, rx: 10, ry: 8, type: 'artificial', category: 'artificial', cityId: '07' },
];

// Tüm doğal göller
export const allNaturalLakes = [
  ...tectonicLakes,
  ...karsticLakes,
  ...volcanicLakes,
  ...damLakes,
  ...glacialLakes,
];

// Tüm göller
export const allLakes = [
  ...allNaturalLakes,
  ...artificialLakes,
];

// Göl tipine göre gölleri getir
export const getLakesByType = (type) => {
  switch (type) {
    case 'tectonic':
      return tectonicLakes;
    case 'volcanic':
      return volcanicLakes;
    case 'karstic':
      return karsticLakes;
    case 'dam':
      return damLakes;
    case 'glacial':
      return glacialLakes;
    case 'artificial':
      return artificialLakes;
    case 'natural':
      return allNaturalLakes;
    default:
      return allLakes;
  }
};

// Göl tipi adlarını getir
export const getLakeTypeName = (type) => {
  switch (type) {
    case 'tectonic':
      return 'Tektonik Göller';
    case 'volcanic':
      return 'Volkanik Göller';
    case 'karstic':
      return 'Karstik Göller';
    case 'dam':
      return 'Set Göller';
    case 'glacial':
      return 'Buzul Gölleri';
    case 'artificial':
      return 'Baraj Gölleri';
    case 'natural':
      return 'Doğal Göller';
    default:
      return 'Tüm Göller';
  }
};