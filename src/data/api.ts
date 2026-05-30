import { Dispatch } from '../types/dispatch';

const API_BASE = import.meta.env.VITE_API_BASE ?? 'https://manyuan-hr-webapp-7bg5jcyg6q-de.a.run.app';

// B3 fallback: 本地開發 / LIFF 未登入時用 (王至謙). Stage 3.5 在 LINE 環境改用 line_user_id
const FALLBACK_CARER_PERSON_ID = 'bec2e412-c2fa-5dba-812a-ba3671a4bf1c';

export function getCarerPersonId(): string {
  return FALLBACK_CARER_PERSON_ID;
}

// Stage 3.5: 優先用 lineUserId 查 (webapp 對應 person_id); 拿不到才用寫死 person_id
export async function fetchDispatches(lineUserId: string | null): Promise<Dispatch[]> {
  let url: string;
  if (lineUserId) {
    url = `${API_BASE}/api/intermediate/dispatches?lineUserId=${encodeURIComponent(lineUserId)}`;
  } else {
    // 本地開發 fallback: 用寫死 person_id
    url = `${API_BASE}/api/intermediate/dispatches?carer=${encodeURIComponent(FALLBACK_CARER_PERSON_ID)}`;
  }
  const res = await fetch(url);
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
