import { ArrowLeft } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { searchEvents } from "@/lib/events/filters";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { SearchField } from "@/components/search/search-field";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { useDialogFocus } from "@/lib/use-dialog-focus";
export function SearchOverlay({ events, query, onQuery, onClose, onOpen }: { events: EventItem[]; query: string; onQuery: (value: string) => void; onClose: () => void; onOpen: (event: EventItem) => void }) {
  const results = searchEvents(events, query);
  const dialog = useDialogFocus(onClose);
  return <div className="overlay-page" ref={dialog} role="dialog" aria-modal="true" aria-label="Cerca eventi"><header className="overlay-header"><AppIconButton icon={ArrowLeft} label="Chiudi ricerca" onClick={onClose} /><SearchField value={query} onChange={onQuery} autoFocus /></header><main><h1>{query ? "Risultati" : "Cosa cerchi?"}</h1><p className="results-count" role="status">{results.length} eventi demo · cerca per nome, zona o categoria</p>{results.length ? <div className="editorial-list">{results.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <div className="empty-copy"><h2>Nessun evento trovato</h2><p>Prova con un quartiere, un locale o una categoria diversa.</p></div>}</main></div>;
}
