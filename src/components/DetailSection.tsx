import React from 'react';
interface Props { title: string; children: React.ReactNode; }
export function DetailSection({ title, children }: Props) {
  return (
    <section style={{ marginTop: 16, background: '#fff', padding: 16, borderRadius: 8 }}>
      <h3 style={{ margin: '0 0 8px', fontSize: 16, color: '#374151', borderLeft: '3px solid #3B82F6', paddingLeft: 8 }}>{title}</h3>
      {children}
    </section>
  );
}
