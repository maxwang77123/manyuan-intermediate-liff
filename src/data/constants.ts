export const LIFF_ID = import.meta.env.VITE_LIFF_ID ?? '2009128968-3VXsvrAB';

export const SHIFT_TYPE_STYLE: Record<string, { bg: string; color: string }> = {
  '醫24': { bg: '#FFE4E1', color: '#C0392B' },
  '醫白': { bg: '#FFF3D6', color: '#B7791F' },
  '醫夜': { bg: '#D6E4FF', color: '#1E40AF' },
  '居24': { bg: '#E1F5E7', color: '#15803D' },
  '居白': { bg: '#FFF9D6', color: '#9A7B0A' },
  '居夜': { bg: '#E0D6FF', color: '#5B21B6' },
  '喘息': { bg: '#FFD6E8', color: '#9D174D' },
  '年節': { bg: '#D6FFE8', color: '#047857' },
};

export const STATUS_STYLE: Record<string, { label: string; color: string }> = {
  PENDING:  { label: '待確認', color: '#F59E0B' },
  ACCEPTED: { label: '已接案', color: '#10B981' },
  DECLINED: { label: '已婉拒', color: '#6B7280' },
  EXPIRED:  { label: '已過期', color: '#EF4444' },
};
