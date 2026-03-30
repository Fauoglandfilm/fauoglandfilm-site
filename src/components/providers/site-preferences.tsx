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

function getSystemTheme(): ThemeMode {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return "light";
}

function readStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {}

  return null;
}

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
  const storedTheme = readStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  if (typeof document !== "undefined") {
    const storedTheme = document.documentElement.dataset.theme;

    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  }

  return getSystemTheme();
}

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.language = language;
    document.documentElement.lang = language === "no" ? "nb" : "en";

    const themeColor = theme === "dark" ? "#111111" : "#ffffff";
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');

    if (themeColorMeta instanceof HTMLMetaElement) {
      themeColorMeta.setAttribute("content", themeColor);
    }

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }, [language, theme]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) {
        return;
      }

      setThemeState(event.matches ? "dark" : "light");
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return;
      }

      if (event.newValue === "light" || event.newValue === "dark") {
        setThemeState(event.newValue);
        return;
      }

      setThemeState(getSystemTheme());
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
