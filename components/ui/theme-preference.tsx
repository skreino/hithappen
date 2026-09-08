"use client";
import { ThemeProvider, useTheme } from "next-themes";
import { useEffect, useState, type ReactNode } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";

export function AppearanceProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false} themes={["dark", "light"]} storageKey="hithappen:theme:v1" disableTransitionOnChange>{children}</ThemeProvider>;
}

export function ThemePreference() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { queueMicrotask(() => setMounted(true)); }, []);
  return <section className="language-settings"><h2>{t("Aspetto")}</h2><div className="language-options">{(["dark", "light"] as const).map(value => <button key={value} aria-pressed={mounted && theme === value} onClick={() => setTheme(value)}>{t(value === "dark" ? "Scuro" : "Chiaro")}</button>)}</div></section>;
}
