import type { Icon } from "@phosphor-icons/react";

export function AppIconButton({ icon: IconComponent, label, active = false, onClick, className = "" }: { icon: Icon; label: string; active?: boolean; onClick?: () => void; className?: string }) {
  return <button type="button" className={`icon-control ${active ? "is-active" : ""} ${className}`.trim()} aria-label={label} aria-pressed={active || undefined} onClick={onClick}><IconComponent size={22} weight={active ? "fill" : "regular"} /></button>;
}
