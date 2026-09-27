import liff from "@line/liff";

const LIFF_ID = import.meta.env.VITE_LIFF_ID ?? "2009128968-CvqxUVB8";
let cachedUserId: string | null = null;
let cachedIdToken: string | null = null;

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

    // INTER-FIX-1（2026-09-28）: 後端不再信任 query 裡的 lineUserId ——
    // 身分一律以 LINE 簽的 ID token 為準, 這裡取出來給 data/api.ts 帶上。
    // 取不到不致命（後端會回 401, App 顯示請重新登入）, 但要留 log 方便排查。
    cachedIdToken = liff.getIDToken();
    console.log("idToken present=" + (cachedIdToken ? "Y" : "N"));
  } catch (err) {
    console.warn("liff post-init error:", String(err));
  }
}

export function getLineUserId(): string | null {
  return cachedUserId;
}

/**
 * LINE 發的 ID token。後端 /api/intermediate/{dispatches,accept} 用它認身分
 * （webapp lib/line-idtoken.ts 會打 LINE 的 /oauth2/v2.1/verify 驗）。
 */
export function getLineIdToken(): string | null {
  return cachedIdToken;
}
