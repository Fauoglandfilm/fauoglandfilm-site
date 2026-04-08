"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
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

function applyThemeToDocument(theme: ThemeMode) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = theme;

  const themeColor = theme === "dark" ? "#111111" : "#ffffff";
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');

  if (themeColorMeta instanceof HTMLMetaElement) {
    themeColorMeta.setAttribute("content", themeColor);
  }
}

function applyLanguageToDocument(language: LanguageCode) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.language = language;
  document.documentElement.lang = language === "no" ? "nb" : "en";
}

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

  useLayoutEffect(() => {
    applyThemeToDocument(theme);
    applyLanguageToDocument(language);
  }, [language, theme]);

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {}
  }, [language]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

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

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handlePreferenceChange = () => {
      if (!readStoredTheme()) {
        setThemeState(mediaQuery.matches ? "dark" : "light");
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handlePreferenceChange);
    } else {
      mediaQuery.addListener(handlePreferenceChange);
    }

    return () => {
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        mediaQuery.removeListener(handlePreferenceChange);
      }
    };
  }, []);

  const setTheme = useCallback((newTheme: ThemeMode) => {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {}
    setThemeState(newTheme);
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: setLanguageState,
      theme,
      setTheme,
    }),
    [language, theme, setTheme],
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
