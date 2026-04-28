export const COOKIE_CONSENT_COOKIE_NAME = "fau_cookie_consent";
export const COOKIE_CONSENT_VERSION = "2026-04-28";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type CookieConsentPreferences = {
  analytics: boolean;
  externalMedia: boolean;
  marketing: boolean;
};

export type CookieConsentRecord = CookieConsentPreferences & {
  necessary: true;
  consentedAt: string;
  version: string;
};

export const DEFAULT_COOKIE_PREFERENCES: CookieConsentPreferences = {
  analytics: false,
  externalMedia: false,
  marketing: false,
};

const OPTIONAL_COOKIE_PREFIXES = [
  "_ga",
  "_gid",
  "_gat",
  "_gcl",
  "_gac",
  "_fb",
  "_fbc",
  "_fbp",
  "li_",
  "ln_",
];

const OPTIONAL_COOKIE_NAMES = new Set([
  "_uetvid",
  "_uetsid",
  "bcookie",
  "bscookie",
  "li_gc",
  "lidc",
  "UserMatchHistory",
]);

export function createCookieConsentRecord(
  preferences: CookieConsentPreferences,
): CookieConsentRecord {
  return {
    necessary: true,
    analytics: preferences.analytics,
    externalMedia: preferences.externalMedia,
    marketing: preferences.marketing,
    consentedAt: new Date().toISOString(),
    version: COOKIE_CONSENT_VERSION,
  };
}

export function serializeCookieConsent(record: CookieConsentRecord) {
  return encodeURIComponent(JSON.stringify(record));
}

export function parseCookieConsent(
  value: string | null | undefined,
): CookieConsentRecord | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as Partial<CookieConsentRecord>;

    if (
      typeof parsed?.analytics !== "boolean" ||
      typeof parsed?.externalMedia !== "boolean" ||
      typeof parsed?.marketing !== "boolean" ||
      typeof parsed?.consentedAt !== "string" ||
      typeof parsed?.version !== "string"
    ) {
      return null;
    }

    return {
      necessary: true,
      analytics: parsed.analytics,
      externalMedia: parsed.externalMedia,
      marketing: parsed.marketing,
      consentedAt: parsed.consentedAt,
      version: parsed.version,
    };
  } catch {
    return null;
  }
}

export function readCookieValue(
  cookieName: string,
  cookieSource?: string,
): string | null {
  const source = cookieSource ?? (typeof document !== "undefined" ? document.cookie : "");

  if (!source) {
    return null;
  }

  const cookie = source
    .split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(`${cookieName}=`));

  if (!cookie) {
    return null;
  }

  return cookie.slice(cookieName.length + 1);
}

export function buildCookieConsentString(record: CookieConsentRecord) {
  return `${COOKIE_CONSENT_COOKIE_NAME}=${serializeCookieConsent(record)}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax`;
}

function getCookieDomainCandidates(hostname: string) {
  if (!hostname || hostname === "localhost" || hostname.includes(":")) {
    return [];
  }

  const parts = hostname.split(".").filter(Boolean);

  if (parts.length < 2) {
    return [];
  }

  const rootDomain = parts.slice(-2).join(".");

  return Array.from(
    new Set([hostname, `.${hostname}`, rootDomain, `.${rootDomain}`]),
  );
}

function expireCookie(name: string, hostname?: string) {
  if (typeof document === "undefined") {
    return;
  }

  const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
  const domains = ["", ...getCookieDomainCandidates(hostname ?? window.location.hostname)];

  domains.forEach((domain) => {
    document.cookie = `${name}=; path=/; expires=${expires}; SameSite=Lax${
      domain ? `; domain=${domain}` : ""
    }`;
  });
}

function isOptionalTrackingCookie(cookieName: string) {
  if (OPTIONAL_COOKIE_NAMES.has(cookieName)) {
    return true;
  }

  return OPTIONAL_COOKIE_PREFIXES.some((prefix) => cookieName.startsWith(prefix));
}

export function clearOptionalTrackingCookies(hostname?: string) {
  if (typeof document === "undefined") {
    return;
  }

  const cookieNames = document.cookie
    .split(";")
    .map((entry) => entry.trim().split("=")[0]?.trim())
    .filter(Boolean) as string[];

  cookieNames.forEach((cookieName) => {
    if (isOptionalTrackingCookie(cookieName)) {
      expireCookie(cookieName, hostname);
    }
  });
}
