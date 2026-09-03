import { Celebration } from "@/components/ui/celebration";
import { useState } from "react";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { ArrowLeft, BookmarkSimple, CalendarBlank, Check, Clock, MapPin, Ticket, UsersThree } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { AvatarStack } from "@/components/ui/avatar-stack";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { formatPrice } from "@/components/events/event-metadata";
import { formatEventDate, formatEventTime } from "@/lib/events/date";

export function EventDetailView({ event, saved, attending, onBack, onSave, onAttend }: { event: EventItem; saved: boolean; attending: boolean; onBack: () => void; onSave: () => void; onAttend: () => void }) {
  const { t, language } = useLocale();
  const [celebration, setCelebration] = useState(0);
  const attend = () => { if (!attending) setCelebration(value => value + 1); else setCelebration(0); onAttend(); };
  return <main className="detail-view">{celebration > 0 && <Celebration key={celebration} title={event.title} participation />}<div className="detail-hero"><img src={event.image} alt="" /><AppIconButton icon={ArrowLeft} label={t("Indietro")} onClick={onBack} className="detail-back" /><div className="detail-tools"><AppIconButton icon={BookmarkSimple} label={saved ? t("Rimuovi dai salvati") : t("Salva")} active={saved} onClick={onSave} /></div><div className="detail-hero__copy"><span>{t(event.category)}</span><h1>{t(event.title)}</h1></div></div>
    <article className="detail-body"><div className="detail-facts"><p><CalendarBlank size={21} /><span><strong>{formatEventDate(event.startAt, undefined, language)} · {formatEventTime(event.startAt)}</strong>{t("Fino alle")} {formatEventTime(event.endAt)}</span></p><p><MapPin size={21} /><span><strong>{event.venue}</strong>{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</span></p><p><Ticket size={21} /><span><strong>{formatPrice(event, language)}</strong>{t("Ingresso")}</span></p></div><div className="participant-line"><AvatarStack /><span><strong>{event.attendeeCount} {t("persone interessate")}</strong>{t("Interesse dimostrativo, non presenze confermate")}</span><UsersThree size={20} /></div><p className="detail-description">{t(event.description)}</p><section><h2>{t("Dove")}</h2><p className="venue-copy"><strong>{event.venue}</strong><br />{event.neighborhood}, {t("Milano")}</p><EventMap key={language} events={[event]} selectedId={event.id} onSelect={() => undefined} compact /></section><section className="useful-info"><h2>{t("Informazioni utili")}</h2><ul><li><Clock size={18} />{t("Ingresso consigliato entro le")} {formatEventTime(event.startAt)}</li><li><Check size={18} />{t("Partecipazione demo: nessuna prenotazione o pagamento")}</li></ul></section></article>
    <div className="sticky-action"><span><small>{t("Ingresso")}</small><strong>{formatPrice(event, language)}</strong></span><button type="button" className={attending ? "is-attending" : ""} onClick={attend}>{attending ? t("Partecipi") : t("Partecipo")}</button></div></main>;
}
