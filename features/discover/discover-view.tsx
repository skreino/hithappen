"use client";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Demo photography served from local assets and source CDN. */
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, BookmarkSimple, MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { rankEvents } from "@/lib/events/device-state";
import { formatRelativeEventTime, isToday } from "@/lib/events/date";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { formatPrice } from "@/components/events/event-metadata";
export function DiscoverView({ events, saved, onOpen, onSave, onExplore }: { events: EventItem[]; saved: Set<string>; onOpen: (event: EventItem) => void; onSave: (id: string) => void; onExplore: () => void }) {
  const { t, language } = useLocale();
  const ranked = useMemo(() => rankEvents(events), [events]);
  const featured = useMemo(() => ranked.filter(event => isToday(event.startAt)).slice(0, 3), [ranked]);
  const recommendations = ranked.filter(event => !featured.some(item => item.id === event.id)).slice(0, 3);
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const go = (index: number) => {
    const card = rail.current?.children[index] as HTMLElement | undefined;
    if (card) rail.current?.scrollTo({ left: card.offsetLeft - (rail.current?.offsetLeft ?? 0), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  return <main className="view discover-view"><div className="home-heading"><p>{t("ESCI DALLA SOLITA SERATA")}</p><h1>{t("Il bello è qui vicino.")}</h1></div>
    <section aria-label={t("Serate in evidenza")} aria-roledescription={t("carosello")}><div className="hero-carousel" ref={rail} onScroll={() => { const first = rail.current?.children[0] as HTMLElement; if (first) setActive(Math.round((rail.current?.scrollLeft ?? 0) / (first.offsetWidth + 12))); }}>{featured.map((event, index) => <article className="night-card" key={event.id} aria-roledescription={t("diapositiva")} aria-label={`${index + 1} ${t("di")} ${featured.length}`}><button className="night-card__open" onClick={() => onOpen(event)}><img src={event.image} alt="" fetchPriority={index === 0 ? "high" : "auto"} /><span className="night-card__copy"><small>{formatRelativeEventTime(event.startAt, undefined, language)}</small><strong>{t(event.title)}</strong><span><MapPin size={15} />{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</span><b>{formatPrice(event, language)}</b></span></button><button className="card-save" aria-label={`${saved.has(event.id) ? t("Rimuovi") : t("Salva")} ${t(event.title)}`} aria-pressed={saved.has(event.id)} onClick={() => onSave(event.id)}><BookmarkSimple size={22} weight={saved.has(event.id) ? "fill" : "regular"} /></button></article>)}</div>
    <div className="carousel-controls"><span className="demo-caption">{t("Vicinanza e interesse · demo")}</span><div className="carousel-dots">{featured.map((event, index) => <button key={event.id} aria-label={`${t("Mostra serata")} ${index + 1}`} aria-pressed={active === index} onClick={() => go(index)}><i /></button>)}</div><button className="icon-control carousel-arrow" aria-label={t("Serata precedente")} disabled={active === 0} onClick={() => go(active - 1)}><ArrowLeft size={18} /></button><button className="icon-control carousel-arrow" aria-label={t("Serata successiva")} disabled={active >= featured.length - 1} onClick={() => go(active + 1)}><ArrowRight size={18} /></button></div></section>
    <section className="home-picks"><div className="section-heading"><h2>{t("Altre tre idee")}</h2><span>{t("Per cambiare programma")}</span></div><div className="editorial-list">{recommendations.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div></section>
    <button className="explore-button" onClick={onExplore}>{t("Esplora tutti")}<ArrowRight size={20} /></button>
  </main>;
}
