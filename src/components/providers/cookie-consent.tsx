"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  buildCookieConsentString,
  clearOptionalTrackingCookies,
  createCookieConsentRecord,
  DEFAULT_COOKIE_PREFERENCES,
  parseCookieConsent,
  readCookieValue,
  COOKIE_CONSENT_COOKIE_NAME,
  type CookieConsentPreferences,
  type CookieConsentRecord,
} from "@/lib/cookie-consent";

type CookieConsentContextValue = {
  consent: CookieConsentRecord | null;
  hasMadeChoice: boolean;
  analyticsEnabled: boolean;
  externalMediaEnabled: boolean;
  marketingEnabled: boolean;
  draftPreferences: CookieConsentPreferences;
  setDraftPreferences: (preferences: CookieConsentPreferences) => void;
  isPreferencesOpen: boolean;
  openPreferences: () => void;
  closePreferences: () => void;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: CookieConsentPreferences) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

function getInitialConsent() {
  if (typeof document === "undefined") {
    return null;
  }

  return parseCookieConsent(readCookieValue(COOKIE_CONSENT_COOKIE_NAME));
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsentRecord | null>(getInitialConsent);
  const [draftPreferences, setDraftPreferences] = useState<CookieConsentPreferences>(
    () =>
      getInitialConsent() ?? DEFAULT_COOKIE_PREFERENCES,
  );
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const persistConsent = useCallback(
    (preferences: CookieConsentPreferences) => {
      const nextConsent = createCookieConsentRecord(preferences);
      const hadPreviousChoice = Boolean(consent);
      const hasChanged =
        consent?.analytics !== nextConsent.analytics ||
        consent?.externalMedia !== nextConsent.externalMedia ||
        consent?.marketing !== nextConsent.marketing;

      document.cookie = buildCookieConsentString(nextConsent);

      if (!nextConsent.analytics || !nextConsent.marketing) {
        clearOptionalTrackingCookies(window.location.hostname);
      }

      setConsent(nextConsent);
      setIsPreferencesOpen(false);

      if (hadPreviousChoice && hasChanged) {
        window.setTimeout(() => {
          window.location.reload();
        }, 50);
      }
    },
    [consent],
  );

  const openPreferences = useCallback(() => {
    setDraftPreferences(
      consent
        ? {
            analytics: consent.analytics,
            externalMedia: consent.externalMedia,
            marketing: consent.marketing,
          }
        : DEFAULT_COOKIE_PREFERENCES,
    );
    setIsPreferencesOpen(true);
  }, [consent]);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent({
      analytics: true,
      externalMedia: true,
      marketing: true,
    });
  }, [persistConsent]);

  const rejectAll = useCallback(() => {
    persistConsent({
      analytics: false,
      externalMedia: false,
      marketing: false,
    });
  }, [persistConsent]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      hasMadeChoice: Boolean(consent),
      analyticsEnabled: Boolean(consent?.analytics),
      externalMediaEnabled: Boolean(consent?.externalMedia),
      marketingEnabled: Boolean(consent?.marketing),
      draftPreferences,
      setDraftPreferences,
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      acceptAll,
      rejectAll,
      savePreferences: persistConsent,
    }),
    [
      acceptAll,
      closePreferences,
      consent,
      draftPreferences,
      isPreferencesOpen,
      openPreferences,
      persistConsent,
      rejectAll,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }

  return context;
}
