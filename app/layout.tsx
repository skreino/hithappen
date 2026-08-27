import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter-tight";
import "@fontsource/bebas-neue";
import "./globals.css";

export const metadata: Metadata = {
  title: "HitHappen — scopri cosa succede vicino a te",
  description: "Eventi, concerti, aperitivi e attività vicino a te. Scopri dove andare e chi partecipa, a Milano e dintorni.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  other: { "codex-preview": "development" },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3EFE6" },
    { media: "(prefers-color-scheme: dark)", color: "#211B17" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
