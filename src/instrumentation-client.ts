import * as Sentry from "@sentry/nextjs";

import { appEnv } from "@/lib/env";

Sentry.init({
  dsn: appEnv.sentryDsn,
  enabled: Boolean(appEnv.sentryDsn),
  tracesSampleRate: 0.1,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: { request: false, response: false },
    httpBodies: [],
    urlQueryParams: false,
    genAI: { inputs: false, outputs: false },
    databaseQueryData: false,
    queues: false,
    graphQL: { document: false, variables: false },
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
