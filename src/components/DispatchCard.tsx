import { Dispatch } from '../types/dispatch';
import { SHIFT_TYPE_STYLE, STATUS_STYLE } from '../data/constants';

interface Props { dispatch: Dispatch; onClick: () => void; }

export function DispatchCard({ dispatch: d, onClick }: Props) {
  const shiftStyle = d.shiftType ? SHIFT_TYPE_STYLE[d.shiftType] : { bg: '#eee', color: '#666' };
  const statusStyle = STATUS_STYLE[d.status] ?? { label: d.status, color: '#666' };
  return (
    <div onClick={onClick} style={{ background: '#fff', padding: 16, marginBottom: 12, borderRadius: 12, cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ background: shiftStyle.bg, color: shiftStyle.color, padding: '4px 10px', borderRadius: 12, fontSize: 13, fontWeight: 600 }}>{d.shiftType}</span>
        <span style={{ color: statusStyle.color, fontSize: 13, fontWeight: 600 }}>● {statusStyle.label}</span>
      </div>
      <div style={{ fontSize: 15, fontWeight: 600, color: '#1F2937', marginBottom: 4 }}>{d.hospitalName} {d.ward}</div>
      <div style={{ fontSize: 14, color: '#4B5563' }}>{d.patientSnapshot}</div>
      <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{d.startDatetime?.replace('T', ' ').slice(0, 16)}</div>
    </div>
  );
}
