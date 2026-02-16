// Türkiye Şehir Merkez Koordinatları
// viewBox: 0 0 1007.478 527.323
// Kullanıcı tarafından manuel olarak ayarlanmıştır

export const cityCenters = {
  "01": { x: 502, y: 345 },  // Adana
  "02": { x: 638, y: 306 },  // Adıyaman
  "03": { x: 247, y: 244 },  // Afyonkarahisar
  "04": { x: 902, y: 171 },  // Ağrı
  "05": { x: 521, y: 117 },  // Amasya
  "06": { x: 356, y: 170 },  // Ankara
  "07": { x: 256, y: 352 },  // Antalya
  "08": { x: 827, y: 75 },   // Artvin
  "09": { x: 106, y: 295 },  // Aydın
  "10": { x: 109, y: 162 },  // Balıkesir
  "11": { x: 235, y: 149 },  // Bilecik
  "12": { x: 783, y: 220 },  // Bingöl
  "13": { x: 853, y: 261 },  // Bitlis
  "14": { x: 317, y: 120 },  // Bolu
  "15": { x: 217, y: 323 },  // Burdur
  "16": { x: 177, y: 141 },  // Bursa
  "17": { x: 62, y: 137 },   // Çanakkale
  "18": { x: 397, y: 114 },  // Çankırı
  "19": { x: 467, y: 126 },  // Çorum
  "20": { x: 177, y: 300 },  // Denizli
  "21": { x: 763, y: 284 },  // Diyarbakır
  "22": { x: 60, y: 61 },    // Edirne
  "23": { x: 688, y: 253 },  // Elazığ
  "24": { x: 697, y: 178 },  // Erzincan
  "25": { x: 816, y: 156 },  // Erzurum
  "26": { x: 284, y: 168 },  // Eskişehir
  "27": { x: 611, y: 358 },  // Gaziantep
  "28": { x: 662, y: 113 },  // Giresun
  "29": { x: 707, y: 140 },  // Gümüşhane
  "30": { x: 959, y: 313 },  // Hakkari
  "31": { x: 550, y: 411 },  // Hatay
  "32": { x: 264, y: 309 },  // Isparta
  "33": { x: 416, y: 378 },  // Mersin
  "34": { x: 179, y: 72 },   // İstanbul
  "35": { x: 79, y: 261 },   // İzmir
  "36": { x: 887, y: 124 },  // Kars
  "37": { x: 415, y: 59 },   // Kastamonu
  "38": { x: 520, y: 257 },  // Kayseri
  "39": { x: 104, y: 32 },   // Kırklareli
  "40": { x: 429, y: 208 },  // Kırşehir
  "41": { x: 231, y: 84 },   // Kocaeli
  "42": { x: 349, y: 286 },  // Konya
  "43": { x: 199, y: 201 },  // Kütahya
  "44": { x: 632, y: 252 },  // Malatya
  "45": { x: 121, y: 221 },  // Manisa
  "46": { x: 583, y: 303 },  // Kahramanmaraş
  "47": { x: 787, y: 334 },  // Mardin
  "48": { x: 115, y: 330 },  // Muğla
  "49": { x: 831, y: 226 },  // Muş
  "50": { x: 464, y: 248 },  // Nevşehir
  "51": { x: 465, y: 301 },  // Niğde
  "52": { x: 607, y: 108 },  // Ordu
  "53": { x: 780, y: 102 },  // Rize
  "54": { x: 258, y: 104 },  // Sakarya
  "55": { x: 530, y: 81 },   // Samsun
  "56": { x: 858, y: 289 },  // Siirt
  "57": { x: 480, y: 54 },   // Sinop
  "58": { x: 593, y: 201 },  // Sivas
  "59": { x: 98, y: 72 },    // Tekirdağ
  "60": { x: 563, y: 135 },  // Tokat
  "61": { x: 721, y: 102 },  // Trabzon
  "62": { x: 713, y: 211 },  // Tunceli
  "63": { x: 688, y: 353 },  // Şanlıurfa
  "64": { x: 179, y: 240 },  // Uşak
  "65": { x: 938, y: 270 },  // Van
  "66": { x: 500, y: 185 },  // Yozgat
  "67": { x: 316, y: 72 },   // Zonguldak
  "68": { x: 419, y: 282 },  // Aksaray
  "69": { x: 746, y: 137 },  // Bayburt
  "70": { x: 394, y: 349 },  // Karaman
  "71": { x: 414, y: 180 },  // Kırıkkale
  "72": { x: 819, y: 303 },  // Batman
  "73": { x: 876, y: 325 },  // Şırnak
  "74": { x: 352, y: 46 },   // Bartın
  "75": { x: 877, y: 77 },   // Ardahan
  "76": { x: 946, y: 152 },  // Iğdır
  "77": { x: 186, y: 107 },  // Yalova
  "78": { x: 355, y: 81 },   // Karabük
  "79": { x: 591, y: 379 },  // Kilis
  "80": { x: 549, y: 347 },  // Osmaniye
  "81": { x: 290, y: 95 },   // Düzce
};

// Şehir ID'sine göre merkez koordinatı al
export function getCityCenter(cityId) {
  return cityCenters[cityId] || { x: 0, y: 0 };
}
