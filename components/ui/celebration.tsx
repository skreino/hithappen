"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { Check } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n/locale-provider";

// Deterministic particles avoid hydration differences and random work per render.
const particles = Array.from({ length: 18 }, (_, index) => ({
  "--x": `${Math.cos(index * Math.PI / 9) * (80 + index % 3 * 30)}px`,
  "--y": `${Math.sin(index * Math.PI / 9) * 90 - 50}px`,
  "--rotation": `${index * 47}deg`,
  "--delay": `${index % 3 * 35}ms`,
}) as CSSProperties);

export function Celebration({ title, participation = false }: { title: string; participation?: boolean }) {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="celebration">
    <div className="celebration__particles" aria-hidden="true">{particles.map((style, index) => <i key={index} style={style} />)}</div>
    <div className="celebration__message" role="status" aria-live="polite"><span className="celebration__check"><Check size={22} weight="bold" /></span><span><strong>{t(participation ? "Ci sei, in modalità demo" : "Serata salvata")}</strong><small>{t(title)}</small></span></div>
  </div>;
}
