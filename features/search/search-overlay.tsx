import { useLocale } from "@/lib/i18n/locale-provider";
import { ArrowLeft } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { searchEvents } from "@/lib/events/filters";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { SearchField } from "@/components/search/search-field";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { useDialogFocus } from "@/lib/use-dialog-focus";
export function SearchOverlay({ events, query, onQuery, onClose, onOpen }: { events: EventItem[]; query: string; onQuery: (value: string) => void; onClose: () => void; onOpen: (event: EventItem) => void }) {
  const { t, language } = useLocale();
  const results = searchEvents(events, query, language);
  const dialog = useDialogFocus(onClose);
  return <div className="overlay-page" ref={dialog} role="dialog" aria-modal="true" aria-label={t("Cerca eventi")}><header className="overlay-header"><AppIconButton icon={ArrowLeft} label={t("Chiudi ricerca")} onClick={onClose} /><SearchField value={query} onChange={onQuery} autoFocus /></header><main><h1>{query ? t("Risultati") : t("Cosa cerchi?")}</h1><p className="results-count" role="status">{results.length} {t("eventi demo · cerca per nome, zona o categoria")}</p>{results.length ? <div className="editorial-list">{results.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <div className="empty-copy"><h2>{t("Nessun evento trovato")}</h2><p>{t("Prova con un quartiere, un locale o una categoria diversa.")}</p></div>}</main></div>;
}
