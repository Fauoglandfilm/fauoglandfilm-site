import * as Sentry from "@sentry/nextjs";

import { appEnv } from "@/lib/env";

Sentry.init({
  dsn: appEnv.sentryDsn,
  enabled: Boolean(appEnv.sentryDsn),
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
