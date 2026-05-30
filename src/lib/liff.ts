import liff from '@line/liff';
import { LIFF_ID } from '../data/constants';

let cachedUserId: string | null = null;
let cachedDisplayName: string | null = null;

export async function initLiff(): Promise<void> {
  try {
    await liff.init({ liffId: LIFF_ID });
    console.log('[liff] initialized', { isInClient: liff.isInClient(), isLoggedIn: liff.isLoggedIn() });
    if (!liff.isLoggedIn()) {
      liff.login();
      return;
    }
    const profile = await liff.getProfile();
    cachedUserId = profile.userId;
    cachedDisplayName = profile.displayName;
    console.log('[liff] profile', { userId: cachedUserId, displayName: cachedDisplayName });
  } catch (err) {
    console.warn('[liff] init failed (dev mode)', err);
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}

export function getLineDisplayName(): string | null {
  return cachedDisplayName;
}

export { liff };
