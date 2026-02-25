/**
 * Türkiye haritası (ve aynı viewBox kullanan sayfalar) için mobil/tablet uyumlu boyut.
 * Harita container'a sığar, oran korunur.
 */
import { useState } from 'react';

const MAP_ASPECT_RATIO = 1007.478 / 527.323;

export function useTurkeyMapLayout() {
  const [layout, setLayout] = useState({ w: 0, h: 0 });

  const onLayout = (e) => {
    const { width, height } = e.nativeEvent.layout;
    if (width > 10 && height > 10) setLayout({ w: width, h: height });
  };

  const mapW = layout.w > 0 && layout.h > 0
    ? (layout.w / layout.h > MAP_ASPECT_RATIO ? layout.h * MAP_ASPECT_RATIO : layout.w)
    : 0;
  const mapH = mapW > 0 ? mapW / MAP_ASPECT_RATIO : 0;
  const hasLayout = mapW > 0 && mapH > 0;

  return { mapW, mapH, hasLayout, onLayout };
}

export { MAP_ASPECT_RATIO };
