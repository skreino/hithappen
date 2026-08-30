/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { formatRelativeEventTime } from "@/lib/events/date";

export function MapEventPreview({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button type="button" className="map-preview" onClick={onOpen}><img src={event.image} alt="" /><span><small>{event.category}</small><strong>{event.title}</strong><em><CalendarBlank size={14} />{formatRelativeEventTime(event.startAt)}</em><em><MapPin size={14} />{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</em><b>{event.price === 0 ? "Gratis" : `${event.price} €`}</b></span><i><ArrowRight size={22} /></i></button>;
}
