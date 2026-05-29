import React from 'react';
interface Props { label: string; value: React.ReactNode; }
export function InfoRow({ label, value }: Props) {
  return (
    <div style={{ display: 'flex', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ flex: '0 0 90px', color: '#6B7280', fontSize: 14 }}>{label}</div>
      <div style={{ flex: 1, color: '#1F2937', fontSize: 14 }}>{value}</div>
    </div>
  );
}
