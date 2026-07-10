"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Locale, type MessageKey } from "./dictionaries";

const STORAGE_KEY = "rbac-dashboard.locale";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: MessageKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "tr") setLocale(stored);
  }, []);

  const update = useCallback((next: Locale) => {
    setLocale(next);
    window.localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const t = useCallback(
    (key: MessageKey, params?: Record<string, string | number>) => {
      let message: string = dictionaries[locale][key] ?? key;
      if (params) {
        for (const [name, value] of Object.entries(params)) {
          message = message.replaceAll(`{${name}}`, String(value));
        }
      }
      return message;
    },
    [locale],
  );

  return <I18nContext.Provider value={{ locale, setLocale: update, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within a LocaleProvider");
  return ctx;
}
