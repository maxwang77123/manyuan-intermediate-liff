// liff is loaded globally from CDN script in index.html
declare const liff: any;

const LIFF_ID = import.meta.env.VITE_LIFF_ID ?? "2009128968-CvqxUVB8";
let cachedUserId: string | null = null;

export async function initLiff(): Promise<void> {
  try {
    await liff.init({ liffId: LIFF_ID });
  } catch (err) {
    console.warn("liff.init() failed:", err);
    return;
  }
  try {
    const inClient = liff.isInClient();
    const loggedIn = liff.isLoggedIn();
    if (!loggedIn) {
      if (inClient) {
        liff.login();
      }
      return;
    }
    const profile = await liff.getProfile();
    cachedUserId = profile.userId;
  } catch (err) {
    console.warn("liff post-init error:", err);
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}
