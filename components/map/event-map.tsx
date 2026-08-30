import type { EventItem } from "@/data/mock-events";
import { EventPin } from "./event-pin";

export function EventMap({ events, selectedId, onSelect, compact = false }: { events: EventItem[]; selectedId?: string; onSelect: (event: EventItem) => void; compact?: boolean }) {
  return <div className={`event-map ${compact ? "event-map--compact" : ""}`}>
    <iframe title="Mappa eventi di Milano" src="https://www.openstreetmap.org/export/embed.html?bbox=9.135%2C45.425%2C9.245%2C45.515&amp;layer=mapnik" loading="lazy" referrerPolicy="no-referrer" />
    <div className="map-wash" aria-hidden="true" />
    {!compact && events.slice(0,6).map((event,index) => <EventPin key={event.id} event={event} index={index} selected={event.id === selectedId} onSelect={() => onSelect(event)} />)}
  </div>;
}
