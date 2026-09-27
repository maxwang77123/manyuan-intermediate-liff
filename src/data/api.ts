import { Dispatch } from '../types/dispatch';
import { getLineIdToken } from '../lib/liff';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';

/**
 * INTER-FIX-1（sec-path 2026-09-28）—— 憑證由「無」改成 LINE ID token。
 *
 * 之前:
 *   - `?lineUserId=<U...>` 是【未驗證】的 query 參數, 後端直接照信 ⇒ 換個 uid
 *     就能看別人的派工單。
 *   - `?carer=<DEV_CARER>` 是寫死在前端 bundle 裡的真實 person_id fallback,
 *     等於任何人打這支 API 都能讀到那位看護的資料。這個常數已整個移除。
 * 現在:
 *   身分只由 `x-line-id-token` 決定（後端向 LINE 的 /oauth2/v2.1/verify 驗簽後取 sub）。
 *   lineUserId / carer 參數都不再送 —— 送了後端也不採用。
 */
const ID_TOKEN_HEADER = 'x-line-id-token';

function authHeaders(): Record<string, string> {
  const token = getLineIdToken();
  return token ? { [ID_TOKEN_HEADER]: token } : {};
}

/**
 * @param _lineUserId 保留參數只為不動 App.tsx 的呼叫端形狀；已【不】用於認身分。
 */
export async function fetchDispatches(_lineUserId: string | null): Promise<Dispatch[]> {
  const url = `${API_BASE}/api/intermediate/dispatches`;
  const headers = authHeaders();
  if (!headers[ID_TOKEN_HEADER]) {
    // 沒有 ID token 就沒有身分, 後端一定回 401 —— 早點講清楚, 別讓它變成神秘 401。
    console.warn('fetchDispatches: 沒有 LINE ID token（尚未登入或 liff.init 失敗）');
  }
  console.log('fetchDispatches URL: ' + url);
  try {
    const res = await fetch(url, { headers });
    console.log('fetchDispatches status: ' + res.status);
    if (!res.ok) {
      console.warn('fetchDispatches not ok: ' + res.status);
      throw new Error(`fetchDispatches failed: ${res.status}`);
    }
    const data = await res.json();
    const arr = (data.dispatches ?? []) as Dispatch[];
    console.log('fetchDispatches got ' + arr.length + ' dispatches');
    return arr;
  } catch (e) {
    console.warn('fetchDispatches error: ' + String(e));
    throw e;
  }
}

export async function respondDispatch(
  assignmentId: string,
  action: 'accept' | 'decline',
  declineReason?: string
): Promise<{ ok: boolean; status: string }> {
  const res = await fetch(`${API_BASE}/api/intermediate/accept`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ assignmentId, action, declineReason }),
  });
  if (!res.ok) throw new Error(`respondDispatch failed: ${res.status}`);
  return res.json();
}
