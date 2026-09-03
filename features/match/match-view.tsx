"use client";
import { formatPrice } from "@/components/events/event-metadata";
import { Celebration } from "@/components/ui/celebration";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Demo event photography. */
import { useRef, useState, type PointerEvent } from "react";
import { ArrowCounterClockwise, BookmarkSimple, Heart, MapPin, X } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import type { Choice, DeviceAction } from "@/lib/events/device-state";
import { formatRelativeEventTime } from "@/lib/events/date";
import { CompactEventRow } from "@/components/events/compact-event-row";

export function MatchView({ events, history, saved, ready, onOpen, onAction, onProfile }: { events: EventItem[]; history: Choice[]; saved: Set<string>; ready: boolean; onOpen: (event: EventItem) => void; onAction: (action: DeviceAction) => void; onProfile: () => void }) {
  const { t, language } = useLocale();
  const [celebration, setCelebration] = useState<{ id: string; title: string } | null>(null);
  const event = events.find(item => !history.some(choice => choice.id === item.id));
  const card = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const clearGesture = () => { gesture.current = null; if (card.current) card.current.style.transform = ""; };
  const choose = (kind: Choice["kind"]) => { if (event && ready) { clearGesture(); setCelebration(kind === "like" ? { id: event.id, title: event.title } : null); onAction({ type: "choose", id: event.id, kind }); } };
  const pointerDown = (e: PointerEvent<HTMLElement>) => {
    if (!e.isPrimary || e.button !== 0 || (e.target as HTMLElement).closest("button,a,input")) return;
    gesture.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!gesture.current || gesture.current.id !== e.pointerId || !card.current) return;
    const dx = e.clientX - gesture.current.x;
    if (Math.abs(e.clientY - gesture.current.y) > Math.abs(dx) + 20) { clearGesture(); return; }
    card.current.style.transform = `translateX(${dx}px) rotate(${dx / 30}deg)`;
  };
  const pointerUp = (e: PointerEvent<HTMLElement>) => {
    if (!gesture.current || gesture.current.id !== e.pointerId) return;
    const dx = e.clientX - gesture.current.x;
    clearGesture();
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (Math.abs(dx) >= 80) choose(dx > 0 ? "like" : "pass");
  };
  if (!ready) return <main className="view"><p role="status">{t("Recupero le tue scelte…")}</p></main>;
  if (!event) {
    const liked = events.filter(item => history.some(choice => choice.id === item.id && choice.kind === "like"));
    return <main className="view match-summary">{celebration && <Celebration key={celebration.id} title={celebration.title} />}<div className="match-copy"><p>{t("SELEZIONE COMPLETATA")}</p><h1>{liked.length ? t("Hai trovato le tue serate.") : t("Nessuna scintilla, per ora.")}</h1><span>{liked.length} {t("eventi ti interessano.")} {liked.filter(item => saved.has(item.id)).length} {t("ancora nei salvati.")}</span></div><div className="editorial-list">{liked.map(item => <CompactEventRow key={item.id} event={item} onOpen={() => onOpen(item)} />)}</div><div className="match-summary__actions"><button className="secondary-cta" disabled={!history.length} onClick={() => { setCelebration(null); onAction({ type: "undo" }); }}>{t("Annulla ultima")}</button><button className="primary-cta" onClick={onProfile}>{t("Vedi salvati")}</button><button className="secondary-cta" onClick={() => { setCelebration(null); onAction({ type: "restart" }); }}>{t("Ricomincia")}</button></div><p className="demo-caption">{t("Match personale su eventi demo. Nessun abbinamento con altre persone.")}</p></main>;
  }
  return <main className="view match-view">{celebration && <Celebration key={celebration.id} title={celebration.title} />}<div className="match-copy"><div><p>MATCH · {history.length + 1} / {events.length}</p><h1>{t("Ti va questa serata?")}</h1></div><button className="icon-control" aria-label={t("Annulla ultima scelta")} disabled={!history.length} onClick={() => { setCelebration(null); onAction({ type: "undo" }); }}><ArrowCounterClockwise size={23} /></button><span>{t("Destra per salvare, sinistra per passare.")}</span></div><progress className="match-progress" value={history.length} max={events.length} aria-label={t("Eventi già valutati")} />
    <div className="swipe-stage"><article key={event.id} ref={card} className="swipe-card" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={clearGesture} onLostPointerCapture={clearGesture}>
      <img src={event.image} alt="" draggable={false} /><div className="swipe-card__scrim" />
      <button className="card-save" aria-label={saved.has(event.id) ? t("Rimuovi dai salvati") : t("Salva evento")} aria-pressed={saved.has(event.id)} onClick={() => onAction({ type: "save", id: event.id })}><BookmarkSimple size={22} weight={saved.has(event.id) ? "fill" : "regular"} /></button>
      <div className="swipe-card__copy"><small>{t(event.category)}</small><h2>{t(event.title)}</h2><p><MapPin size={17} />{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</p><footer><strong>{formatRelativeEventTime(event.startAt, undefined, language)}</strong><b>{formatPrice(event, language)}</b></footer></div>
    </article></div>
    <div className="swipe-actions"><button className="swipe-action" onClick={() => choose("pass")}><X size={25} /><span>{t("Passa")}</span></button><button className="swipe-detail" onClick={() => onOpen(event)}>{t("Dettagli")}</button><button className="swipe-action swipe-action--like" onClick={() => choose("like")}><Heart size={25} weight="fill" /><span>{t("Mi interessa")}</span></button></div><p className="demo-caption match-note">{t("Le scelte restano su questo dispositivo · demo")}</p>
  </main>;
}
