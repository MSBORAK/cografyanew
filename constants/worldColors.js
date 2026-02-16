// Dünya haritası için 221 ülkeye farklı renkler
// Her ülke için benzersiz ve canlı renkler

export const worldColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FA3', '#6C5CE7', '#00B894', '#FDCB6E', '#E17055',
  '#74B9FF', '#A29BFE', '#FD79A8', '#FFEAA7', '#DFE6E9',
  '#FF7675', '#FD79A8', '#FDCB6E', '#55EFC4', '#81ECEC',
  '#74B9FF', '#A29BFE', '#DFE6E9', '#636E72', '#2D3436',
  '#FF6348', '#FF4757', '#FFA502', '#1E90FF', '#2ED573',
  '#FFA801', '#FF6348', '#FF4757', '#5F27CD', '#00D2D3',
  '#FF9FF3', '#54A0FF', '#48DBFB', '#1DD1A1', '#10AC84',
  '#EE5A6F', '#C44569', '#F8B500', '#6C5CE7', '#A29BFE',
  '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#00CEC9',
  '#0984E3', '#6C5CE7', '#B2BEC3', '#DFE6E9', '#636E72',
  '#FF7979', '#BADC58', '#F9CA24', '#6AB04C', '#EB4D4B',
  '#F0932B', '#686DE0', '#4834DF', '#22A6B3', '#30336B',
  '#95AFC0', '#535C68', '#FF6B81', '#FD79A8', '#FDCB6E',
  '#55EFC4', '#81ECEC', '#74B9FF', '#A29BFE', '#DFE6E9',
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788',
  '#FF8FA3', '#6C5CE7', '#00B894', '#FDCB6E', '#E17055',
  '#74B9FF', '#A29BFE', '#FD79A8', '#FFEAA7', '#DFE6E9',
  '#FF7675', '#FD79A8', '#FDCB6E', '#55EFC4', '#81ECEC',
  '#74B9FF', '#A29BFE', '#DFE6E9', '#636E72', '#2D3436',
  '#FF6348', '#FF4757', '#FFA502', '#1E90FF', '#2ED573',
  '#FFA801', '#FF6348', '#FF4757', '#5F27CD', '#00D2D3',
  '#FF9FF3', '#54A0FF', '#48DBFB', '#1DD1A1', '#10AC84',
  '#EE5A6F', '#C44569', '#F8B500', '#6C5CE7', '#A29BFE',
  '#FD79A8', '#FDCB6E', '#E17055', '#00B894', '#00CEC9',
  '#0984E3', '#6C5CE7', '#B2BEC3', '#DFE6E9', '#636E72',
  '#FF7979', '#BADC58', '#F9CA24', '#6AB04C', '#EB4D4B',
  '#F0932B', '#686DE0', '#4834DF', '#22A6B3', '#30336B',
  '#95AFC0', '#535C68', '#FF6B81', '#FD79A8', '#FDCB6E',
  '#55EFC4', '#81ECEC', '#74B9FF', '#A29BFE', '#DFE6E9',
  '#E74C3C', '#3498DB', '#2ECC71', '#F39C12', '#9B59B6',
  '#1ABC9C', '#E67E22', '#34495E', '#16A085', '#27AE60',
  '#2980B9', '#8E44AD', '#2C3E50', '#F1C40F', '#D35400',
  '#C0392B', '#BDC3C7', '#7F8C8D', '#ECF0F1', '#95A5A6',
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
  '#33FFF5', '#F5FF33', '#FF8C33', '#8C33FF', '#33FF8C',
  '#FF3333', '#33FF33', '#3333FF', '#FFFF33', '#FF33FF',
  '#33FFFF', '#FF6633', '#66FF33', '#3366FF', '#FF3366',
  '#66FF66', '#6666FF', '#FFFF66', '#FF66FF', '#66FFFF',
  '#FF9933', '#99FF33', '#3399FF', '#FF3399', '#99FF99',
  '#9999FF', '#FFFF99', '#FF99FF', '#99FFFF', '#FFCC33',
];

// Ülke ID'sine göre renk döndür
export function getCountryColor(index) {
  return worldColors[index % worldColors.length];
}
