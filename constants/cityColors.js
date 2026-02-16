// Her şehir için benzersiz renkler (81 şehir için 81 renk)
export const cityColors = [
  '#EF4444', '#F97316', '#F59E0B', '#EAB308', '#84CC16',
  '#22C55E', '#10B981', '#14B8A6', '#06B6D4', '#0EA5E9',
  '#3B82F6', '#6366F1', '#8B5CF6', '#A855F7', '#D946EF',
  '#EC4899', '#F43F5E', '#FB7185', '#FDA4AF', '#FCA5A5',
  '#FDBA74', '#FCD34D', '#FDE047', '#BEF264', '#86EFAC',
  '#6EE7B7', '#5EEAD4', '#67E8F9', '#7DD3FC', '#93C5FD',
  '#A5B4FC', '#C4B5FD', '#D8B4FE', '#F0ABFC', '#F9A8D4',
  '#FB923C', '#FBBF24', '#FACC15', '#A3E635', '#4ADE80',
  '#34D399', '#2DD4BF', '#22D3EE', '#38BDF8', '#60A5FA',
  '#818CF8', '#A78BFA', '#C084FC', '#E879F9', '#F472B6',
  '#DC2626', '#EA580C', '#D97706', '#CA8A04', '#65A30D',
  '#16A34A', '#059669', '#0D9488', '#0891B2', '#0284C7',
  '#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#C026D3',
  '#DB2777', '#E11D48', '#FF6B6B', '#4ECDC4', '#45B7D1',
  '#96CEB4', '#FFEAA7', '#DFE6E9', '#74B9FF', '#A29BFE',
  '#FD79A8', '#FDCB6E', '#6C5CE7', '#00B894', '#00CEC9',
  '#0984E3', '#E17055', '#3B82F6', '#55EFC4', '#81ECEC', // Index 72 = #3B82F6 (Mavi - Batman için)
  '#A29BFE' // 81. renk (index 80)
];

// Şehir ID'sine göre renk atama
export const getCityColor = (cityId, index) => {
  // Batman için özel renk
  if (cityId === '72' || cityId === 72) {
    return '#3B82F6'; // Mavi
  }
  
  // cityId'yi sayıya çevir ve renk dizisinden seç
  const numericId = parseInt(cityId, 10);
  // Eğer numericId dizinin boyutundan büyükse, index kullan
  if (numericId >= cityColors.length) {
    return cityColors[index % cityColors.length];
  }
  return cityColors[numericId % cityColors.length];
};
