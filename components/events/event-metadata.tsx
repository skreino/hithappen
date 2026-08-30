import { MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { formatRelativeEventTime } from "@/lib/events/date";

export function formatPrice(event: EventItem) { return event.price === 0 ? "Gratis" : `${event.price} €`; }

export function EventMetadata({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  return <div className={`event-meta ${compact ? "event-meta--compact" : ""}`}>
    <span>{event.category} · {formatRelativeEventTime(event.startAt)}</span>
    <span><MapPin size={14} weight="fill" />{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</span>
    {!compact && <span className="event-price">{formatPrice(event)}</span>}
  </div>;
}
