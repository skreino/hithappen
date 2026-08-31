import type { Metadata, Viewport } from "next";
import "@fontsource-variable/archivo";
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
    { media: "(prefers-color-scheme: light)", color: "#090B0F" },
    { media: "(prefers-color-scheme: dark)", color: "#090B0F" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
