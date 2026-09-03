import { useLocale } from "@/lib/i18n/locale-provider";
import { MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { formatRelativeEventTime } from "@/lib/events/date";

export function formatPrice(event: EventItem, language: "it" | "en" = "it") { return event.price === 0 ? (language === "en" ? "Free" : "Gratis") : new Intl.NumberFormat(language === "en" ? "en-IE" : "it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(event.price); }

export function EventMetadata({ event, compact = false }: { event: EventItem; compact?: boolean }) {
  const { t, language } = useLocale();
  return <div className={`event-meta ${compact ? "event-meta--compact" : ""}`}>
    <span>{t(event.category)} · {formatRelativeEventTime(event.startAt, undefined, language)}</span>
    <span><MapPin size={14} weight="fill" />{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</span>
    {!compact && <span className="event-price">{formatPrice(event, language)}</span>}
  </div>;
}
