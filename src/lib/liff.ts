import liff from "@line/liff";
const LIFF_ID = import.meta.env.VITE_LIFF_ID ?? "2009128968-CvqxUVB8";
let cachedUserId: string | null = null;
let ready = false;

export async function initLiff(): Promise<void> {
  try {
    await liff.init({ liffId: LIFF_ID });
    if (!liff.isLoggedIn()) {
      liff.login();
      return; // redirect happens, page unloads, this is correct
    }
    const profile = await liff.getProfile();
    cachedUserId = profile.userId;
    ready = true;
  } catch (err) {
    console.warn("LIFF init failed:", err);
    ready = true; // dev mode
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}

export function isLiffReady(): boolean {
  return ready;
}
