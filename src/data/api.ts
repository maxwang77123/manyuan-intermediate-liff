import { Dispatch } from '../types/dispatch';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';
const DEV_CARER = 'bec2e412-c2fa-5dba-812a-ba3671a4bf1c';

export async function fetchDispatches(lineUserId: string | null): Promise<Dispatch[]> {
  const param = lineUserId
    ? `lineUserId=${encodeURIComponent(lineUserId)}`
    : `carer=${encodeURIComponent(DEV_CARER)}`;
  const url = `${API_BASE}/api/intermediate/dispatches?${param}`;
  console.log("fetchDispatches URL: " + url);
  try {
    const res = await fetch(url);
    console.log("fetchDispatches status: " + res.status);
    if (!res.ok) {
      console.warn("fetchDispatches not ok: " + res.status);
      throw new Error(`fetchDispatches failed: ${res.status}`);
    }
    const data = await res.json();
    const arr = (data.dispatches ?? []) as Dispatch[];
    console.log("fetchDispatches got " + arr.length + " dispatches");
    return arr;
  } catch (e) {
    console.warn("fetchDispatches error: " + String(e));
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ assignmentId, action, declineReason }),
  });
  if (!res.ok) throw new Error(`respondDispatch failed: ${res.status}`);
  return res.json();
}
