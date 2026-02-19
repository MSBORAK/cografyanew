// Türkiye'nin gölleri - il merkezlerine göre (cityCenters viewBox)

// DOĞAL GÖLLER - Tektonik (çöküntü)
export const tectonicLakes = [
  { id: 1, name: 'Durusu Gölü', x: 179, y: 72, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // İstanbul
  { id: 2, name: 'Büyük Çekmece Gölü', x: 175, y: 78, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },       // İstanbul batı
  { id: 3, name: 'Küçük Çekmece Gölü', x: 183, y: 76, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },      // İstanbul
  { id: 4, name: 'Kuş Gölü', x: 109, y: 162, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },               // Balıkesir
  { id: 5, name: 'Ulubat Gölü', x: 177, y: 141, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Bursa
  { id: 6, name: 'İznik Gölü', x: 182, y: 155, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Bursa (İznik)
  { id: 7, name: 'Sapanca Gölü', x: 258, y: 104, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Sakarya
  { id: 8, name: 'Sülüklü Gölü', x: 322, y: 128, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Bolu
  { id: 9, name: 'Abant Gölü', x: 335, y: 158, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Bolu
  { id: 10, name: 'Yedigöller', x: 355, y: 138, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Bolu
  { id: 11, name: 'Balık Gölü', x: 521, y: 117, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Amasya (Taşova)
  { id: 12, name: 'Borabay Gölü', x: 508, y: 132, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Amasya
  { id: 13, name: 'Zinav Gölü', x: 563, y: 135, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Tokat
  { id: 14, name: 'Sera Gölü', x: 721, y: 102, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },             // Trabzon
  { id: 15, name: 'Uzun Göl', x: 718, y: 108, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },              // Trabzon
  { id: 16, name: 'Tortum Gölü', x: 816, y: 156, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Erzurum
  { id: 17, name: 'Çıldır Gölü', x: 887, y: 124, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Kars
  { id: 18, name: 'Aktaş Gölü', x: 865, y: 118, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Ardahan/Kars
  { id: 19, name: 'Balık Gölü', x: 902, y: 171, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Ağrı
  { id: 20, name: 'Erçek Gölü', x: 932, y: 262, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Van
  { id: 21, name: 'Van Gölü', x: 938, y: 270, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },              // Van
  { id: 22, name: 'Nemrut Gölü', x: 853, y: 261, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Bitlis
  { id: 23, name: 'Nazik Gölü', x: 848, y: 268, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },              // Bitlis
  { id: 24, name: 'Haçlı Gölü', x: 831, y: 226, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Muş
  { id: 25, name: 'Hazar Göl', x: 688, y: 253, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Elazığ
  { id: 26, name: 'Tuzla Gölü', x: 528, y: 265, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Kayseri
  { id: 27, name: 'Seyfe Gölü', x: 429, y: 208, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Kırşehir
  { id: 28, name: 'Eğmir Gölü', x: 435, y: 215, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Kırşehir
  { id: 29, name: 'Moğan Gölü', x: 356, y: 170, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Ankara
  { id: 30, name: 'Tuz Gölü', x: 419, y: 282, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },              // Aksaray
  { id: 31, name: 'Tersakan Gölü', x: 419, y: 278, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Aksaray
  { id: 32, name: 'Yay Gölü', x: 419, y: 286, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },              // Aksaray
  { id: 33, name: 'Akyatan Gölü', x: 502, y: 345, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Adana
  { id: 34, name: 'Acıgöl', x: 465, y: 301, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },                // Niğde
  { id: 35, name: 'Meke Göl', x: 500, y: 280, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },               // Konya/Karapınar
  { id: 36, name: 'Acıgöl', x: 520, y: 290, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },               // Nevşehir
  { id: 37, name: 'Suğla Gölü', x: 349, y: 286, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Konya
  { id: 38, name: 'Beyşehir Gölü', x: 349, y: 292, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Konya
  { id: 39, name: 'İlgın Gölü', x: 349, y: 278, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },             // Konya
  { id: 40, name: 'Akşehir Gölü', x: 342, y: 282, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Konya
  { id: 41, name: 'Eber Gölü', x: 247, y: 244, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },             // Afyonkarahisar
  { id: 42, name: 'Eğirdir Gölü', x: 264, y: 309, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Isparta
  { id: 43, name: 'Kovada Gölü', x: 268, y: 312, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Isparta
  { id: 44, name: 'Burdur Gölü', x: 217, y: 323, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Burdur
  { id: 45, name: 'Acıgöl', x: 340, y: 340, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },                 // Denizli
  { id: 46, name: 'Yarışlı Gölü', x: 177, y: 300, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },           // Denizli
  { id: 47, name: 'Salda Gölü', x: 180, y: 308, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Denizli
  { id: 48, name: 'Köyceğiz Gölü', x: 115, y: 330, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },          // Muğla
  { id: 49, name: 'Bafa (Çamiçi) Gölü', x: 106, y: 295, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },      // Aydın
  { id: 50, name: 'Marmara Gölü', x: 121, y: 221, rx: 10, ry: 8, type: 'tectonic', category: 'natural' },            // Manisa
];

// Karstik Göller
export const karsticLakes = [
  { id: 51, name: 'Karagöl', x: 199, y: 201, rx: 10, ry: 8, type: 'karstic', category: 'natural' },   // Kütahya (Simav)
  { id: 52, name: 'Karagöl', x: 424, y: 278, rx: 10, ry: 8, type: 'karstic', category: 'natural' },   // Aksaray
];

// Volkanik Göller (krater)
export const volcanicLakes = [
  { id: 53, name: 'Nemrut Krater Gölü', x: 853, y: 261, rx: 10, ry: 8, type: 'volcanic', category: 'natural' },  // Bitlis
  { id: 54, name: 'Meke Gölü', x: 500, y: 280, rx: 10, ry: 8, type: 'volcanic', category: 'natural' },           // Konya (Karapınar)
  { id: 55, name: 'Acıgöl', x: 520, y: 290, rx: 10, ry: 8, type: 'volcanic', category: 'natural' },              // Nevşehir
];

// Set Göller (heyelan set)
export const damLakes = [
  { id: 56, name: 'Tortum Gölü', x: 816, y: 156, rx: 10, ry: 8, type: 'dam', category: 'natural' },   // Erzurum
  { id: 57, name: 'Abant Gölü', x: 335, y: 158, rx: 10, ry: 8, type: 'dam', category: 'natural' },   // Bolu
  { id: 58, name: 'Yedigöller', x: 355, y: 138, rx: 10, ry: 8, type: 'dam', category: 'natural' },    // Bolu
];

// Buzul Gölleri
export const glacialLakes = [
  { id: 59, name: 'Çıldır Gölü', x: 887, y: 124, rx: 10, ry: 8, type: 'glacial', category: 'natural' },   // Kars
  { id: 60, name: 'Karagöl (Borçka)', x: 827, y: 75, rx: 10, ry: 8, type: 'glacial', category: 'natural' },  // Artvin
  { id: 61, name: 'Balıklı Göl (Kaçkar)', x: 780, y: 102, rx: 10, ry: 8, type: 'glacial', category: 'natural' },  // Rize
  { id: 62, name: 'Deniz Gölü (Kaçkar)', x: 775, y: 106, rx: 10, ry: 8, type: 'glacial', category: 'natural' },   // Rize
];

// YAPAY GÖLLER (Barajlar) - il merkezlerine göre
export const artificialLakes = [
  { id: 63, name: 'Atatürk Barajı', x: 688, y: 353, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },   // Şanlıurfa
  { id: 64, name: 'Keban Barajı', x: 688, y: 253, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },     // Elazığ
  { id: 65, name: 'Karakaya Barajı', x: 632, y: 252, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },  // Malatya
  { id: 66, name: 'Altınkaya Barajı', x: 530, y: 81, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },   // Samsun
  { id: 67, name: 'Hirfanlı Barajı', x: 429, y: 208, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },   // Kırşehir
  { id: 68, name: 'Sarıyar Barajı', x: 284, y: 168, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },    // Eskişehir
  { id: 69, name: 'Gökçekaya Barajı', x: 317, y: 120, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },  // Bolu
  { id: 70, name: 'Seyhan Barajı', x: 502, y: 345, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },      // Adana
  { id: 71, name: 'Çubuk Barajı', x: 356, y: 170, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },      // Ankara
  { id: 72, name: 'Kemer Barajı', x: 106, y: 295, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },       // Aydın
  { id: 73, name: 'Berdan Barajı', x: 416, y: 378, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },       // Mersin
  { id: 74, name: 'Manavgat Barajı', x: 256, y: 352, rx: 10, ry: 8, type: 'artificial', category: 'artificial' },    // Antalya
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