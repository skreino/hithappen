import { ArrowLeft } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { searchEvents } from "@/lib/events/filters";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { FilterChips, type QuickFilter } from "@/components/search/filter-chips";
import { SearchField } from "@/components/search/search-field";
import { AppIconButton } from "@/components/ui/app-icon-button";

export function SearchOverlay({ events, query, onQuery, onClose, onOpen }: { events: EventItem[]; query: string; onQuery: (value: string) => void; onClose: () => void; onOpen: (event: EventItem) => void }) {
  const results = searchEvents(events, query);
  return <div className="overlay-page"><header className="overlay-header"><AppIconButton icon={ArrowLeft} label="Chiudi ricerca" onClick={onClose} /><SearchField value={query} onChange={onQuery} autoFocus /></header><main>{!query ? <><h1>Cosa cerchi?</h1><p className="search-hint">Parti da un momento o scrivi il nome di un evento, locale o categoria.</p><FilterChips active="tonight" onChange={(filter: QuickFilter) => onQuery(filter === "free" ? "Gratis" : filter === "weekend" ? "Weekend" : filter === "tomorrow" ? "Domani" : "Stasera")} /><h2>Recenti</h2>{events.slice(0,3).map((event) => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</> : <><p className="results-count">{results.length} {results.length === 1 ? "risultato" : "risultati"}</p>{results.length ? results.map((event) => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />) : <div className="empty-copy"><h2>Nessun evento trovato</h2><p>Prova con un quartiere, un locale o una categoria diversa.</p></div>}</>}</main></div>;
}
