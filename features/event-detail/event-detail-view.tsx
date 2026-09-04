"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, BookmarkSimple, CalendarBlank, ChatCircleDots, Check, Clock, MapPin, ShareNetwork, Sun, Ticket, UsersThree, Martini, MusicNotes } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { Celebration } from "@/components/ui/celebration";
import { formatPrice } from "@/components/events/event-metadata";
import { formatEventDate, formatEventTime } from "@/lib/events/date";
import { useLocale } from "@/lib/i18n/locale-provider";

export function EventDetailView({ event, saved, attending, inGroup, onBack, onSave, onAttend, onJoinGroup }: { event: EventItem; saved: boolean; attending: boolean; inGroup: boolean; onBack: () => void; onSave: () => void; onAttend: () => void; onJoinGroup: () => void }) {
  const { t, language } = useLocale();
  const [celebration, setCelebration] = useState(0);
  const attend = () => { if (!attending) setCelebration(value => value + 1); onAttend(); };
  const share = async () => { if (navigator.share) await navigator.share({ title: t(event.title), text: t(event.description), url: location.href }).catch(() => undefined); else await navigator.clipboard?.writeText(location.href).catch(() => undefined); };
  return <main className="detail-view">{celebration > 0 && <Celebration key={celebration} title={event.title} participation />}
    <div className="detail-hero"><Image src={event.image} alt={t(event.imageAlt ?? event.title)} fill sizes="(max-width: 760px) 100vw, 760px" priority /><AppIconButton icon={ArrowLeft} label={t("Indietro")} onClick={onBack} className="detail-back" /><div className="detail-tools"><AppIconButton icon={ShareNetwork} label={t("Condividi")} onClick={share} /><AppIconButton icon={BookmarkSimple} label={saved ? t("Rimuovi dai salvati") : t("Salva")} active={saved} onClick={onSave} /></div></div>
    <article className="detail-body"><p className="detail-reason">{event.suggestionReason === "nearby" ? t("VICINO A TE") : t("SCELTO PER TE · DEMO")}</p><h1>{t(event.title)}</h1><div className="detail-facts detail-facts--flat"><p><CalendarBlank size={21} /><span><strong>{formatEventDate(event.startAt, undefined, language)} · {formatEventTime(event.startAt)}-{formatEventTime(event.endAt)}</strong></span></p><p><MapPin size={21} /><span><strong>{event.venue}</strong>{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</span></p><p><Ticket size={21} /><span><strong>{formatPrice(event, language)}</strong></span></p></div>
      <div className="participant-line"><AvatarStack /><span><strong>{event.attendeeCount} {t("persone interessate")}</strong>{t("Interesse dimostrativo, non presenze confermate")}</span><UsersThree size={20} /></div>
      <p className="detail-description">{t(event.description)}</p>
      <section><h2>{t("Cosa trovi")}</h2><div className="detail-amenities"><span><Martini size={25} />{t("Drink incluso")}</span><span><MusicNotes size={25} />{t("DJ set")}</span><span><Sun size={25} />{t("Outdoor")}</span></div></section>
      <section><h2>{t("Dove")}</h2><p className="venue-copy"><strong>{event.venue}</strong><br />{event.neighborhood}, {event.city}</p><EventMap key={language} events={[event]} selectedId={event.id} onSelect={() => undefined} compact /></section>
      <section className="attendance-consent"><div><UsersThree size={24} /><span><strong>{attending ? t("Stai partecipando") : t("Non stai ancora partecipando")}</strong><small>{attending ? t("La presenza demo è salvata sul dispositivo.") : t("Partecipa per dimostrare interesse.")}</small></span></div><button className="ticket-disabled" disabled><Ticket size={18} />{t("Biglietti · Non disponibile nella demo")}</button></section>
      <section className="useful-info"><h2>{t("Informazioni utili")}</h2><ul><li><Clock size={18} />{t("Ingresso consigliato entro le")} {formatEventTime(event.startAt)}</li><li><Check size={18} />{t("Partecipazione demo: nessuna prenotazione o pagamento")}</li></ul></section>
    </article>
    <div className="sticky-action sticky-action--social"><button type="button" className={attending ? "is-attending" : ""} onClick={attend}>{attending ? t("Non partecipo più") : t("Partecipo")}</button><button type="button" className="group-action" disabled={!attending} onClick={onJoinGroup}><ChatCircleDots size={20} />{inGroup ? t("Esci dal gruppo") : t("Entra nel gruppo")}</button><small>{t("Il gruppo è separato dalla partecipazione · scegli tu cosa mostrare")}</small></div>
  </main>;
}
