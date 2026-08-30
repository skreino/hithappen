/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { BookmarkSimple } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMetadata, formatPrice } from "./event-metadata";

export function EventCard({ event, saved, onSave, onOpen }: { event: EventItem; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className="event-card">
    <div className="event-card__media"><button type="button" onClick={onOpen} aria-label={`Apri ${event.title}`}><img src={event.image} alt="" /></button><button type="button" className="card-save" aria-label={saved ? "Rimuovi dai salvati" : "Salva evento"} aria-pressed={saved} onClick={onSave}><BookmarkSimple size={19} weight={saved ? "fill" : "regular"} /></button></div>
    <button type="button" className="event-card__body" onClick={onOpen}><EventMetadata event={event} compact /><h3>{event.title}</h3><div className="event-card__footer"><span>{formatPrice(event)}</span><span>{event.attendeeCount} interessati</span></div></button>
  </article>;
}
