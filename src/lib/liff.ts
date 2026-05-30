import liff from "@line/liff";

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
    console.log("liff inClient=" + inClient + " loggedIn=" + loggedIn);
    if (!loggedIn) {
      if (inClient) {
        console.log("calling liff.login()");
        liff.login();
      }
      return;
    }
    const profile = await liff.getProfile();
    cachedUserId = profile.userId;
    console.log("got userId=" + cachedUserId);
  } catch (err) {
    console.warn("liff post-init error:", String(err));
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}
