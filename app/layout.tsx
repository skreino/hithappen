import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HitHappen",
  description: "Scopri eventi, serate e persone intorno a te.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="it"><body>{children}</body></html>;
}
