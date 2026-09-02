import { ArrowLeft, MagnifyingGlass, MapPin } from "@phosphor-icons/react";
import { SearchField } from "@/components/search/search-field";
export function AppHeader({ fullSearch, query, onQuery, onSearch, onBack }: { fullSearch: boolean; query: string; onQuery: (value: string) => void; onSearch: () => void; onBack?: () => void }) {
  return <header className="app-header"><div className="app-header__row">{onBack ? <button className="icon-control" aria-label="Torna alla Home" onClick={onBack}><ArrowLeft size={23} /></button> : <span className="brand-mark" role="img" aria-label="HitHappen" />}<span className="header-city"><MapPin size={17} />Milano</span>{!fullSearch && <button className="icon-control" aria-label="Cerca eventi" onClick={onSearch}><MagnifyingGlass size={24} /></button>}</div>{fullSearch && <SearchField value={query} onChange={onQuery} />}</header>;
}
