import { useEffect, useState } from 'react';
import { initLiff, getLineUserId } from './lib/liff';
import { Dispatch } from './types/dispatch';
import { fetchDispatches, respondDispatch } from './data/api';
import { DispatchList } from './components/DispatchList';
import { DispatchDetail } from './components/DispatchDetail';
import DebugOverlay from './components/DebugOverlay';

export default function App() {
  const [ready, setReady] = useState(false);
  const [lineUserId, setLineUserId] = useState<string | null>(null);

  const [selected, setSelected] = useState<Dispatch | null>(null);
  const [dispatches, setDispatches] = useState<Dispatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDispatches = async (uid: string | null) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDispatches(uid);
      setDispatches(data);
    } catch (err) {
      console.error(err);
      setError('載入派案失敗, 請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initLiff()
      .then(() => {
        const uid = getLineUserId();
        setLineUserId(uid);
        setReady(true);
        loadDispatches(uid);
      })
      .catch((err) => {
        console.error("[App] initLiff error", err);
        setReady(true);
        loadDispatches(null);
      });
  }, []);

  if (!ready || loading) {
    return <><DebugOverlay /><div style={{ padding: 40, textAlign: 'center', color: '#9CA3AF' }}>載入中…</div></>;
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
    return <><DebugOverlay /><DispatchDetail dispatch={selected} onAccept={handleAccept} onDecline={handleDecline} onBack={() => setSelected(null)} /></>;
  }

  return (
    <>
      <DebugOverlay />
      {lineUserId ? (
        <div style={{ background: '#DBEAFE', color: '#1E40AF', padding: '10px 16px', fontSize: 12, wordBreak: 'break-all' }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>LINE userId:</div>
          <div style={{ fontFamily: 'monospace', userSelect: 'all', background: '#fff', padding: 6, borderRadius: 4 }}>{lineUserId}</div>
        </div>
      ) : (
        <div style={{ background: '#FEF3C7', color: '#92400E', padding: '8px 16px', fontSize: 13 }}>開發模式 (LIFF 未登入, 使用測試帳號)</div>
      )}
      {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '8px 16px', fontSize: 13 }}>{error} <button onClick={() => loadDispatches(lineUserId)} style={{ marginLeft: 8, textDecoration: 'underline', background: 'none', border: 'none', color: '#991B1B', cursor: 'pointer' }}>重試</button></div>}
      <DispatchList dispatches={dispatches} onSelect={setSelected} />
    </>
  );
}
