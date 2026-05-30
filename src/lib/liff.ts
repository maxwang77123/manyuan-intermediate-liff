import liff from '@line/liff';
import { LIFF_ID } from '../data/constants';

let initialized = false;
let cachedUserId: string | null = null;
let cachedDisplayName: string | null = null;

export async function initLiff(): Promise<void> {
  if (initialized) return;
  try {
    await liff.init({ liffId: LIFF_ID });
    initialized = true;
    console.log('[liff] initialized', { isInClient: liff.isInClient(), isLoggedIn: liff.isLoggedIn() });

    // Stage 3.5: 在 LINE 環境且未登入 → 觸發 login
    if (liff.isInClient() && !liff.isLoggedIn()) {
      liff.login();
      return;
    }
    // 已登入 → 拿 profile
    if (liff.isLoggedIn()) {
      try {
        const profile = await liff.getProfile();
        cachedUserId = profile.userId;
        cachedDisplayName = profile.displayName;
        console.log('[liff] profile', { userId: cachedUserId, displayName: cachedDisplayName });
      } catch (e) {
        console.warn('[liff] getProfile failed', e);
      }
    }
  } catch (err) {
    console.warn('[liff] init failed (本地開發正常)', err);
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}

export function getLineDisplayName(): string | null {
  return cachedDisplayName;
}

export { liff };
