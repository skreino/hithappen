/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { BookmarkSimple } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { EventMetadata } from "./event-metadata";

export function FeaturedEventCard({ event, saved, onSave, onOpen }: { event: EventItem; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className="featured-card">
    <button type="button" className="featured-card__media" onClick={onOpen} aria-label={`Apri ${event.title}`}><img src={event.image} alt="" /></button>
    <button type="button" className="card-save" aria-label={saved ? "Rimuovi dai salvati" : "Salva evento"} aria-pressed={saved} onClick={onSave}><BookmarkSimple size={21} weight={saved ? "fill" : "regular"} /></button>
    <button type="button" className="featured-card__body" onClick={onOpen}>
      <h3>{event.title}</h3>
      <EventMetadata event={event} />
      <span className="social-line"><AvatarStack />{event.attendeeCount} persone interessate</span>
    </button>
  </article>;
}
