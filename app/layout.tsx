import type { Metadata, Viewport } from "next";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import { AppearanceProvider } from "@/components/ui/theme-preference";
import "@fontsource-variable/inter-tight";
import { ServiceWorkerRegistration } from "@/components/pwa/service-worker-registration";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HitHappen - scopri cosa succede vicino a te",
  description: "Eventi, concerti, aperitivi e attività vicino a te. Scopri dove andare e chi partecipa, a Milano e dintorni.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "HitHappen" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#101112",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it" suppressHydrationWarning><body><AppearanceProvider><AmbientBackdrop /><LocaleProvider>{children}<ServiceWorkerRegistration /></LocaleProvider></AppearanceProvider></body></html>;
}
