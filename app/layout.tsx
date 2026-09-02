import type { Metadata, Viewport } from "next";
import "leaflet/dist/leaflet.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "HitHappen - scopri cosa succede vicino a te",
  description: "Eventi, concerti, aperitivi e attività vicino a te. Scopri dove andare e chi partecipa, a Milano e dintorni.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#131419" },
    { media: "(prefers-color-scheme: dark)", color: "#131419" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
