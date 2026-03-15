"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  resolveLocalizedValue,
  type LanguageCode,
  type LocalizedValue,
} from "@/lib/i18n";

type ThemeMode = "light" | "dark";

type SitePreferencesContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const LANGUAGE_STORAGE_KEY = "fauoglandfilm-language";
const THEME_STORAGE_KEY = "fauoglandfilm-theme";

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

function getInitialLanguage(): LanguageCode {
  if (typeof document !== "undefined") {
    const storedLanguage = document.documentElement.dataset.language;

    if (storedLanguage === "no" || storedLanguage === "en") {
      return storedLanguage;
    }
  }

  return "no";
}

function getInitialTheme(): ThemeMode {
  if (typeof document !== "undefined") {
    const storedTheme = document.documentElement.dataset.theme;

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  }

  return "light";
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "no" ? "nb" : "en";

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {}
  }, [language, theme]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      theme,
      setTheme: setThemeState,
    }),
    [language, theme],
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);

  if (!context) {
    throw new Error("useSitePreferences must be used within SitePreferencesProvider");
  }

  return context;
}

export function useLocalizedValue<T>(value: T | LocalizedValue<T>) {
  const { language } = useSitePreferences();

  return resolveLocalizedValue(value, language);
}

export type { ThemeMode };
