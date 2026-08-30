import { MagnifyingGlass, X } from "@phosphor-icons/react";

export function SearchField({ value, onChange, autoFocus = false }: { value: string; onChange: (value: string) => void; autoFocus?: boolean }) {
  return <label className="search-field"><MagnifyingGlass size={20} /><input type="search" value={value} autoFocus={autoFocus} onChange={(event) => onChange(event.target.value)} placeholder="Cerca eventi, locali e categorie" />{value && <button type="button" aria-label="Cancella ricerca" onClick={() => onChange("")}><X size={18} /></button>}</label>;
}
