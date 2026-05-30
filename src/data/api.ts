import { Dispatch } from '../types/dispatch';

const API_BASE = import.meta.env.VITE_API_BASE ?? '';
const DEV_CARER = 'bec2e412-c2fa-5dba-812a-ba3671a4bf1c';

export async function fetchDispatches(lineUserId: string | null): Promise<Dispatch[]> {
  const param = lineUserId
    ? `lineUserId=${encodeURIComponent(lineUserId)}`
    : `carer=${encodeURIComponent(DEV_CARER)}`;
  const res = await fetch(`${API_BASE}/api/intermediate/dispatches?${param}`);
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
