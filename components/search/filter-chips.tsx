export type QuickFilter = "tonight" | "tomorrow" | "weekend" | "free";

const labels: Array<[QuickFilter,string]> = [["tonight","Stasera"],["tomorrow","Domani"],["weekend","Weekend"],["free","Gratis"]];

export function FilterChips({ active, onChange }: { active: QuickFilter; onChange: (value: QuickFilter) => void }) {
  return <div className="filter-chips" aria-label="Filtri rapidi">{labels.map(([value,label]) => <button type="button" className={active === value ? "is-active" : ""} aria-pressed={active === value} onClick={() => onChange(value)} key={value}>{label}</button>)}</div>;
}
