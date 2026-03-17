import * as Sentry from "@sentry/nextjs";

import { appEnv } from "./src/lib/env";

Sentry.init({
  dsn: appEnv.sentryDsn,
  enabled: Boolean(appEnv.sentryDsn),
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});
