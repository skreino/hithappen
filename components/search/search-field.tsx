import { useLocale } from "@/lib/i18n/locale-provider";
import { MagnifyingGlass, X } from "@phosphor-icons/react";

export function SearchField({ value, onChange, autoFocus = false }: { value: string; onChange: (value: string) => void; autoFocus?: boolean }) {
  const { t } = useLocale();
  return <label className="search-field"><MagnifyingGlass size={20} /><input type="search" aria-label={t("Cerca eventi, locali e categorie")} value={value} autoFocus={autoFocus} onChange={(event) => onChange(event.target.value)} placeholder={t("Cerca eventi, locali e categorie")} />{value && <button type="button" aria-label={t("Cancella ricerca")} onClick={() => onChange("")}><X size={18} /></button>}</label>;
}
