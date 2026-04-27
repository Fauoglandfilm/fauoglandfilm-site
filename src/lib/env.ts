const isNonEmpty = (value: string | undefined | null): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const appEnv = {
  sanityProjectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  sanityDataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  sanityApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-17",
  sanityReadToken: process.env.SANITY_API_READ_TOKEN,
  resendApiKey: process.env.RESEND_API_KEY,
  resendFromEmail: process.env.RESEND_FROM_EMAIL,
  contactToEmail: process.env.CONTACT_TO_EMAIL,
  sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sentryAuthToken: process.env.SENTRY_AUTH_TOKEN,
  sentryOrg: process.env.SENTRY_ORG,
  sentryProject: process.env.SENTRY_PROJECT,
  frilanserenAdminEmails: process.env.FRILANSEREN_ADMIN_EMAILS,
} as const;

export const resendDefaults = {
  fromEmail: "Fau&Land Film <post@fauoglandfilm.com>",
  toEmail: "post@fauoglandfilm.com",
} as const;

export function hasSanityConfig() {
  return isNonEmpty(appEnv.sanityProjectId) && isNonEmpty(appEnv.sanityDataset);
}

export function hasResendConfig() {
  return isNonEmpty(appEnv.resendApiKey);
}

export function hasSentryConfig() {
  return isNonEmpty(appEnv.sentryDsn);
}

export function missingSupabaseEnvs(options?: { includeAdmin?: boolean }) {
  const missing: string[] = [];

  if (!isNonEmpty(process.env.NEXT_PUBLIC_SUPABASE_URL)) {
    missing.push("NEXT_PUBLIC_SUPABASE_URL");
  }
  if (!isNonEmpty(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)) {
    missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  if (options?.includeAdmin && !isNonEmpty(process.env.SUPABASE_SERVICE_ROLE_KEY)) {
    missing.push("SUPABASE_SERVICE_ROLE_KEY");
  }

  return missing;
}

export function hasSupabaseAuthConfig() {
  return missingSupabaseEnvs().length === 0;
}

export function hasSupabaseAdminConfig() {
  return missingSupabaseEnvs({ includeAdmin: true }).length === 0;
}

export function getFrilanserenAdminEmails() {
  return (appEnv.frilanserenAdminEmails ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export function isFrilanserenAdminEmail(email: string | null | undefined) {
  if (!isNonEmpty(email)) {
    return false;
  }

  return getFrilanserenAdminEmails().includes(email.trim().toLowerCase());
}

export function readRequiredEnv(
  value: string | undefined | null,
  key: string,
) {
  if (!isNonEmpty(value)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}
