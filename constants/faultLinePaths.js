/**
 * Türkiye haritası üzerinde fay hatları – SVG path (viewBox: 0 0 1007.478 527.323).
 * Şehir merkezleri (cityCenters) ve coğrafi konumlara göre çizilmiştir.
 */
export const FAULT_LINE_PATHS = [
  {
    id: 'kaf',
    name: 'Kuzey Anadolu Fay Hattı (KAF)',
    d: 'M 780 102 L 721 102 L 662 113 L 607 108 L 530 81 L 450 95 L 397 114 L 317 120 L 258 104 L 179 72',
    color: '#DC2626',
  },
  {
    id: 'daf',
    name: 'Doğu Anadolu Fay Hattı (DAF)',
    d: 'M 730 200 L 688 253 L 632 252 L 638 306 L 583 303 L 550 411',
    color: '#EA580C',
  },
  {
    id: 'baf',
    name: 'Batı Anadolu / Ege Grabenleri',
    d: 'M 75 225 L 121 221 L 180 218 M 80 298 L 106 295 L 177 300 M 85 260 L 130 258 L 175 255',
    color: '#CA8A04',
  },
  {
    id: 'odf',
    name: 'Ölüdeniz Fayı',
    d: 'M 115 330 L 165 342 L 210 348 L 256 352',
    color: '#16A34A',
  },
  {
    id: 'eaf',
    name: 'Ege Graben Sistemi',
    d: 'M 75 225 L 121 221 L 180 218',
    color: '#F59E0B',
  },
  {
    id: 'tuzgolu',
    name: 'Tuz Gölü Fayı',
    d: 'M 365 188 L 397 198 L 429 208 L 455 215',
    color: '#7C3AED',
  },
  {
    id: 'sultandagi',
    name: 'Sultan Dağı – Akşehir Fay Zonu',
    d: 'M 247 244 L 280 258 L 320 272 L 349 286',
    color: '#0891B2',
  },
];

export const TURKEY_VIEWBOX = '0 0 1007.478 527.323';
