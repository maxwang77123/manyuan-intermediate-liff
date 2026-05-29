import { useEffect, useState } from 'react';
import { initLiff, getLineUserId } from './lib/liff';
import { Dispatch } from './types/dispatch';
import { PLACEHOLDER_DISPATCHES } from './data/placeholderDispatches';
import { DispatchList } from './components/DispatchList';
import { DispatchDetail } from './components/DispatchDetail';

export default function App() {
  const [ready, setReady] = useState(false);
  const [lineUserId, setLineUserId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Dispatch | null>(null);
  const [dispatches, setDispatches] = useState<Dispatch[]>(PLACEHOLDER_DISPATCHES);

  useEffect(() => {
    initLiff().then(() => { setLineUserId(getLineUserId()); setReady(true); });
  }, []);

  if (!ready) return <div style={{ padding: 40, textAlign: 'center', color: '#9CA3AF' }}>載入中…</div>;

  const handleAccept = () => {
    if (!selected) return;
    setDispatches((prev) => prev.map((d) => d.assignmentId === selected.assignmentId ? { ...d, status: 'ACCEPTED' } : d));
    alert(`已接案 ${selected.hospitalName} ${selected.ward}\n(Stage 3 才會寫 BQ)`);
    setSelected(null);
  };
  const handleDecline = () => {
    if (!selected) return;
    setDispatches((prev) => prev.map((d) => d.assignmentId === selected.assignmentId ? { ...d, status: 'DECLINED' } : d));
    alert('已婉拒');
    setSelected(null);
  };

  if (selected) return <DispatchDetail dispatch={selected} onAccept={handleAccept} onDecline={handleDecline} onBack={() => setSelected(null)} />;

  return (
    <>
      {!lineUserId && <div style={{ background: '#FEF3C7', color: '#92400E', padding: '8px 16px', fontSize: 13 }}>開發模式 (LIFF 未登入, 本地測試正常)</div>}
      <DispatchList dispatches={dispatches} onSelect={setSelected} />
    </>
  );
}
