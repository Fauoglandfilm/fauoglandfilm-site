import { safeRedirectPath } from "@/lib/safe-redirect";

export const SALGSCOACH_HOME = "/salgscoach";

export function parseSalgscoachAllowedEmails(
  configured: string | null | undefined,
) {
  return new Set(
    String(configured ?? "")
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isAllowedSalgscoachEmail(
  email: string | null | undefined,
  configured: string | null | undefined,
) {
  const normalized = String(email ?? "").trim().toLowerCase();
  return (
    Boolean(normalized) &&
    parseSalgscoachAllowedEmails(configured).has(normalized)
  );
}

export function safeSalgscoachPath(
  value: FormDataEntryValue | string | null | undefined,
) {
  const safePath = safeRedirectPath(value, SALGSCOACH_HOME);
  const pathname = safePath.split(/[?#]/, 1)[0];

  if (
    pathname !== SALGSCOACH_HOME &&
    !pathname.startsWith(`${SALGSCOACH_HOME}/`)
  ) {
    return SALGSCOACH_HOME;
  }

  return safePath;
}
