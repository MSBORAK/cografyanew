// Dünya haritası – her ülke için benzersiz renk (aynı renk farklı kıtalarda tekrarlanmaz)
// 222 ülke: indekse göre HSL ile tek tek üretilir, böylece Afrika ve Güney Amerika aynı renge düşmez

function hslToHex(h, s, l) {
  h = h / 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

// Altın oran açısı (~137.5°) – ardışık indeksler birbirine çok benzemez
const GOLDEN_ANGLE = 360 * 0.38196601125;

// 222 ülke için önceden hesaplanmış benzersiz renkler (indeks sabit kalır)
const NUM_COUNTRIES = 222;
export const worldColors = Array.from({ length: NUM_COUNTRIES }, (_, i) => {
  const hue = (i * GOLDEN_ANGLE) % 360;
  const saturation = 0.62 + (i % 5) * 0.04;  // 0.62–0.78 arası
  const lightness = 0.52 + (i % 7) * 0.03;  // 0.52–0.73 arası
  return hslToHex(hue, saturation, lightness);
});

export function getCountryColor(index) {
  return worldColors[index % worldColors.length];
}
