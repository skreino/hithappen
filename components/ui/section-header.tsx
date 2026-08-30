import { CaretRight } from "@phosphor-icons/react";

export function SectionHeader({ title, action = "Vedi tutto", onAction }: { title: string; action?: string; onAction?: () => void }) {
  return <div className="section-heading"><h2>{title}</h2>{onAction && <button type="button" onClick={onAction}>{action}<CaretRight size={16} /></button>}</div>;
}
