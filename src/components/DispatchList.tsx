import { Dispatch } from '../types/dispatch';
import { DispatchCard } from './DispatchCard';

interface Props { dispatches: Dispatch[]; onSelect: (d: Dispatch) => void; }

export function DispatchList({ dispatches, onSelect }: Props) {
  return (
    <div style={{ padding: 16, background: '#F3F4F6', minHeight: '100vh' }}>
      <h2 style={{ fontSize: 18, margin: '0 0 16px', color: '#1F2937' }}>派給我的案子 ({dispatches.length})</h2>
      {dispatches.length === 0
        ? <div style={{ textAlign: 'center', padding: 40, color: '#9CA3AF' }}>目前沒有派案</div>
        : dispatches.map((d) => <DispatchCard key={d.assignmentId} dispatch={d} onClick={() => onSelect(d)} />)}
    </div>
  );
}
