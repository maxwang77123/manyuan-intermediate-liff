import { Dispatch } from '../types/dispatch';

// Stage 3: LIFF 透過 webapp proxy 呼叫 (webapp server 簽 OIDC token 轉 cf_router)
// 不直接打 cf_router (cf_router IAM 封閉, 瀏覽器無 OIDC token)
const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://manyuan-hr-webapp-7bg5jcyg6q-de.a.run.app';

// B3 階段: 寫死測試 person_id (王至謙). Stage 3.5 改成 LINE Login 取得真實 person_id
const TEST_CARER_PERSON_ID = 'bec2e412-c2fa-5dba-812a-ba3671a4bf1c';

export function getCarerPersonId(): string {
  return TEST_CARER_PERSON_ID;
}

export async function fetchDispatches(carerPersonId: string): Promise<Dispatch[]> {
  const res = await fetch(`${API_BASE}/api/intermediate/dispatches?carer=${encodeURIComponent(carerPersonId)}`);
  if (!res.ok) throw new Error(`fetchDispatches failed: ${res.status}`);
  const data = await res.json();
  return (data.dispatches ?? []) as Dispatch[];
}

export async function respondDispatch(
  assignmentId: string,
  action: 'accept' | 'decline',
  declineReason?: string
): Promise<{ ok: boolean; status: string }> {
  const res = await fetch(`${API_BASE}/api/intermediate/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignmentId, action, declineReason }),
  });
  if (!res.ok) throw new Error(`respondDispatch failed: ${res.status}`);
  return res.json();
}
