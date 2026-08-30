/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { ArrowLeft, BookmarkSimple, CalendarBlank, Check, Clock, MapPin, ShareNetwork, Ticket, UsersThree } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { formatPrice } from "@/components/events/event-metadata";
import { formatEventDate, formatEventTime } from "@/lib/events/date";

export function EventDetailView({ event, saved, attending, onBack, onSave, onAttend }: { event: EventItem; saved: boolean; attending: boolean; onBack: () => void; onSave: () => void; onAttend: () => void }) {
  return <main className="detail-view"><div className="detail-hero"><img src={event.image} alt="" /><AppIconButton icon={ArrowLeft} label="Indietro" onClick={onBack} className="detail-back" /><div className="detail-tools"><AppIconButton icon={ShareNetwork} label="Condividi" /><AppIconButton icon={BookmarkSimple} label={saved ? "Rimuovi dai salvati" : "Salva"} active={saved} onClick={onSave} /></div><div className="detail-hero__copy"><span>{event.category}</span><h1>{event.title}</h1></div></div>
    <article className="detail-body"><div className="detail-facts"><p><CalendarBlank size={21} /><span><strong>{formatEventDate(event.startAt)} · {formatEventTime(event.startAt)}</strong>Fino alle {formatEventTime(event.endAt)}</span></p><p><MapPin size={21} /><span><strong>{event.venue}</strong>{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</span></p><p><Ticket size={21} /><span><strong>{formatPrice(event)}</strong>Ingresso</span></p></div><button type="button" className="participant-line"><AvatarStack /><span><strong>{event.attendeeCount} persone interessate</strong>Scopri chi partecipa</span><UsersThree size={20} /></button><p className="detail-description">{event.description}</p><section><h2>Dove</h2><p className="venue-copy"><strong>{event.venue}</strong><br />{event.neighborhood}, Milano</p><EventMap events={[event]} selectedId={event.id} onSelect={() => undefined} compact /></section><section className="useful-info"><h2>Informazioni utili</h2><ul><li><Clock size={18} />Ingresso consigliato entro le {formatEventTime(event.startAt)}</li><li><Check size={18} />Conferma immediata</li></ul></section></article>
    <div className="sticky-action"><span><small>Ingresso</small><strong>{formatPrice(event)}</strong></span><button type="button" className={attending ? "is-attending" : ""} onClick={onAttend}>{attending ? "Partecipi" : "Partecipo"}</button></div></main>;
}
