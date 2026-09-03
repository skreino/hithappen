import type { Metadata, Viewport } from "next";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";
import { LocaleProvider } from "@/lib/i18n/locale-provider";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HitHappen - scopri cosa succede vicino a te",
  description: "Eventi, concerti, aperitivi e attività vicino a te. Scopri dove andare e chi partecipa, a Milano e dintorni.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff7f6" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1013" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body><AmbientBackdrop /><LocaleProvider>{children}</LocaleProvider></body></html>;
}
