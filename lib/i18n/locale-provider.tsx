"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type Language } from "./messages";

const STORAGE_KEY = "hithappen:language:v1";
const LocaleContext = createContext<{ language: Language; setLanguage: (language: Language) => void; t: (text: string) => string; storageError: boolean }>({ language: "it", setLanguage: () => {}, t: (text: string) => text, storageError: false });

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setCurrentLanguage] = useState<Language>("it");
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // Restore only after hydration so the server and first client render agree.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (saved === "en" || saved === "it") setCurrentLanguage(saved);
    } catch { /* Italian remains usable when storage cannot be read. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  const setLanguage = useCallback((next: Language) => {
    setCurrentLanguage(next);
    try { localStorage.setItem(STORAGE_KEY, next); setStorageError(false); }
    catch { setStorageError(true); }
  }, []);
  const t = useCallback((text: string) => translate(text, language), [language]);
  const value = useMemo(() => ({ language, setLanguage, t, storageError }), [language, setLanguage, t, storageError]);
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
export function useLocale() { return useContext(LocaleContext); }
