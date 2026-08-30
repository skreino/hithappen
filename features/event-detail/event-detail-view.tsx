/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { ArrowLeft, BookmarkSimple, CalendarBlank, Check, Clock, MapPin, ShareNetwork, Ticket, UsersThree } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { formatPrice } from "@/components/events/event-metadata";
import { formatEventDate, formatEventTime } from "@/lib/events/date";

export function EventDetailView({ event, saved, attending, onBack, onSave, onAttend }: { event: EventItem; saved: boolean; attending: boolean; onBack: () => void; onSave: () => void; onAttend: () => void }) {
  return <main className="detail-view"><div className="detail-hero"><img src={event.image} alt="" /><AppIconButton icon={ArrowLeft} label="Indietro" onClick={onBack} className="detail-back" /><div className="detail-tools"><AppIconButton icon={ShareNetwork} label="Condividi" /><AppIconButton icon={BookmarkSimple} label={saved ? "Rimuovi dai salvati" : "Salva"} active={saved} onClick={onSave} /></div></div>
    <article className="detail-body"><p className="detail-eyebrow">{event.category}</p><h1>{event.title}</h1><div className="detail-facts"><p><CalendarBlank size={20} /><span><strong>{formatEventDate(event.startAt)}</strong>{formatEventTime(event.startAt)}–{formatEventTime(event.endAt)}</span></p><p><MapPin size={20} /><span><strong>{event.venue}</strong>{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</span></p><p><Ticket size={20} /><span><strong>{formatPrice(event)}</strong>Biglietto o ingresso</span></p></div><button type="button" className="participant-line"><AvatarStack /><span><strong>{event.attendeeCount} persone interessate</strong>Vedi chi sta pensando di andarci</span><UsersThree size={20} /></button><section><h2>Cosa aspettarti</h2><p>{event.description}</p></section><section><h2>Informazioni utili</h2><ul><li><Clock size={18} />Ingresso consigliato entro le {formatEventTime(event.startAt)}</li><li><Check size={18} />Conferma immediata</li></ul></section><section><h2>Dove</h2><p className="venue-copy"><strong>{event.venue}</strong><br />{event.neighborhood}, Milano</p><EventMap events={[event]} selectedId={event.id} onSelect={() => undefined} compact /></section></article>
    <div className="sticky-action"><span><small>Ingresso</small><strong>{formatPrice(event)}</strong></span><button type="button" className={attending ? "is-attending" : ""} onClick={onAttend}>{attending ? "Partecipi" : "Partecipo"}</button></div></main>;
}
