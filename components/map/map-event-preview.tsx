import { formatPrice } from "@/components/events/event-metadata";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { ArrowRight, CalendarBlank, MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { formatRelativeEventTime } from "@/lib/events/date";

export function MapEventPreview({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  const { t, language } = useLocale();
  return <button type="button" className="map-preview" onClick={onOpen}><img src={event.image} alt="" /><span><small>{t(event.category)}</small><strong>{t(event.title)}</strong><em><CalendarBlank size={14} />{formatRelativeEventTime(event.startAt, undefined, language)}</em><em><MapPin size={14} />{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</em><b>{formatPrice(event, language)}</b></span><i><ArrowRight size={22} /></i></button>;
}
