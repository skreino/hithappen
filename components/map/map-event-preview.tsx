/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { CaretRight } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { formatRelativeEventTime } from "@/lib/events/date";

export function MapEventPreview({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button type="button" className="map-preview" onClick={onOpen}><img src={event.image} alt="" /><span><small>{event.category} · {formatRelativeEventTime(event.startAt)}</small><strong>{event.title}</strong><em>{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</em></span><CaretRight size={18} /></button>;
}
