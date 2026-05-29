import liff from '@line/liff';
import { LIFF_ID } from '../data/constants';

let initialized = false;

export async function initLiff(): Promise<void> {
  if (initialized) return;
  try {
    await liff.init({ liffId: LIFF_ID });
    initialized = true;
    console.log('[liff] initialized', { isInClient: liff.isInClient() });
  } catch (err) {
    console.warn('[liff] init failed (本地開發正常)', err);
  }
}

export function getLineUserId(): string | null {
  if (!initialized || !liff.isLoggedIn()) return null;
  try {
    return liff.getContext()?.userId ?? null;
  } catch { return null; }
}

export { liff };
