import * as Sentry from '@sentry/react';

export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) { console.warn('[sentry] DSN 未設定 (Stage 3 才建)'); return; }
  Sentry.init({
    dsn,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 0.1,
    beforeSend(event) {
      if (event.user) { delete event.user.email; delete event.user.ip_address; }
      return event;
    },
  });
}

export { Sentry };
