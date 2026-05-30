import { useEffect, useState } from 'react';
import { initLiff, getLineUserId } from './lib/liff';
import { Dispatch } from './types/dispatch';
import { fetchDispatches, respondDispatch, getCarerPersonId } from './data/api';
import { DispatchList } from './components/DispatchList';
import { DispatchDetail } from './components/DispatchDetail';

export default function App() {
  const [ready, setReady] = useState(false);
  const [lineUserId, setLineUserId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Dispatch | null>(null);
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDispatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const carer = getCarerPersonId();
      const data = await fetchDispatches(carer);
      setDispatches(data);
    } catch (err) {
      console.error(err);
      setError('載入派案失敗, 請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initLiff().then(() => {
      setLineUserId(getLineUserId());
      setReady(true);
      loadDispatches();
    });
  }, []);

  if (!ready || loading) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#9CA3AF' }}>載入中…</div>;
  }

  const handleAccept = async () => {
    if (!selected) return;
    try {
      await respondDispatch(selected.assignmentId, 'accept');
      setDispatches((prev) => prev.map((d) => d.assignmentId === selected.assignmentId ? { ...d, status: 'ACCEPTED' } : d));
      alert(`已接案 ${selected.hospitalName} ${selected.ward}`);
      setSelected(null);
    } catch {
      alert('接案失敗, 請重試');
    }
  };

  const handleDecline = async () => {
    if (!selected) return;
    try {
      await respondDispatch(selected.assignmentId, 'decline');
      setDispatches((prev) => prev.map((d) => d.assignmentId === selected.assignmentId ? { ...d, status: 'DECLINED' } : d));
      alert('已婉拒');
      setSelected(null);
    } catch {
      alert('婉拒失敗, 請重試');
    }
  };

  if (selected) {
    return <DispatchDetail dispatch={selected} onAccept={handleAccept} onDecline={handleDecline} onBack={() => setSelected(null)} />;
  }

  return (
    <>
      {!lineUserId && <div style={{ background: '#FEF3C7', color: '#92400E', padding: '8px 16px', fontSize: 13 }}>開發模式 (LIFF 未登入, B3 測試 person_id)</div>}
      {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '8px 16px', fontSize: 13 }}>{error} <button onClick={loadDispatches} style={{ marginLeft: 8, textDecoration: 'underline', background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer' }}>重試</button></div>}
      <DispatchList dispatches={dispatches} onSelect={setSelected} />
    </>
  );
}
