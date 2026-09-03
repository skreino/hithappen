"use client";
import { useEffect, useState, type CSSProperties } from "react";
import { Check, X } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n/locale-provider";

// Deterministic particles avoid hydration differences and random work per render.
const particles = Array.from({ length: 18 }, (_, index) => ({
  "--x": `${Math.cos(index * Math.PI / 9) * (80 + index % 3 * 30)}px`,
  "--y": `${Math.sin(index * Math.PI / 9) * 90 - 50}px`,
  "--rotation": `${index * 47}deg`,
  "--delay": `${index % 3 * 35}ms`,
}) as CSSProperties);

export function Celebration({ title, participation = false, kind = "like" }: { title: string; participation?: boolean; kind?: "like" | "pass" }) {
  const { t } = useLocale();
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), kind === "pass" ? 1200 : 2200);
    return () => window.clearTimeout(timer);
  }, [kind]);
  if (!visible) return null;
  return <div className={`celebration celebration--${kind}`}>
    {kind === "like" ? <div className="celebration__particles" aria-hidden="true">{particles.map((style, index) => <i key={index} style={style} />)}</div> : null}
    <div className="celebration__message" role="status" aria-live="polite">{kind === "pass" ? <span className="celebration__pass-lines" aria-hidden="true">{[-8, 0, 8].map((offset, index) => <i key={offset} style={{ "--offset": `${offset}px`, "--delay": `${index * 45}ms` } as CSSProperties} />)}</span> : null}<span className="celebration__check">{kind === "pass" ? <X size={22} weight="bold" /> : <Check size={22} weight="bold" />}</span><span><strong>{t(kind === "pass" ? "Serata passata" : participation ? "Ci sei, in modalità demo" : "Serata salvata")}</strong><small>{t(title)}</small></span></div>
  </div>;
}
