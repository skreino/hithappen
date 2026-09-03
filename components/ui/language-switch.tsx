"use client";
import { useLocale } from "@/lib/i18n/locale-provider";

export function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage, t, storageError } = useLocale();
  if (compact) return <button type="button" className="language-toggle" lang={language === "it" ? "en" : "it"} aria-label={language === "it" ? "Switch to English" : "Passa a Italiano"} onClick={() => setLanguage(language === "it" ? "en" : "it")}>{language === "it" ? "EN" : "IT"}</button>;
  return <section className="language-settings"><h2>{t("Lingua")}</h2><div role="group" aria-label={t("Lingua")} className="language-options"><button lang="it" aria-pressed={language === "it"} onClick={() => setLanguage("it")}>Italiano</button><button lang="en" aria-pressed={language === "en"} onClick={() => setLanguage("en")}>English</button></div><p role="status">{t(storageError ? "Lingua non salvata. Resterà attiva per questa sessione." : "La lingua resta salvata su questo dispositivo.")}</p></section>;
}
