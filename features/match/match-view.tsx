"use client";
import { formatPrice } from "@/components/events/event-metadata";
import { Celebration } from "@/components/ui/celebration";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Demo event photography. */
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { ArrowCounterClockwise, BookmarkSimple, Fire, MapPin, X } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import type { Choice, DeviceAction } from "@/lib/events/device-state";
import { formatRelativeEventTime } from "@/lib/events/date";
import { CompactEventRow } from "@/components/events/compact-event-row";

export function MatchView({ events, history, saved, ready, onOpen, onAction, onProfile, embedded = false }: { embedded?: boolean; events: EventItem[]; history: Choice[]; saved: Set<string>; ready: boolean; onOpen: (event: EventItem) => void; onAction: (action: DeviceAction) => void; onProfile: () => void }) {
  const { t, language } = useLocale();
  const [celebration, setCelebration] = useState<{ id: string; title: string; kind: Choice["kind"] } | null>(null);
  const Root = embedded ? "section" : "main";
  const Heading = embedded ? "h2" : "h1";
  const [outgoing, setOutgoing] = useState<EventItem | null>(null);
  const [exiting, setExiting] = useState<Choice["kind"] | null>(null);
  const pending = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const event = outgoing ?? events.find(item => !history.some(choice => choice.id === item.id));
  const card = useRef<HTMLElement>(null);
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const clearGesture = () => {
    gesture.current = null;
    if (card.current) {
      card.current.dataset.dragging = "false";
      card.current.style.transform = "";
      card.current.style.setProperty("--hit-opacity", "0");
      card.current.style.setProperty("--nope-opacity", "0");
    }
  };
  const choose = (kind: Choice["kind"]) => {
    if (!event || !ready || pending.current) return;
    pending.current = true;
    clearGesture();
    setExiting(kind);
    setCelebration({ id: event.id, title: event.title, kind });
    setOutgoing(event);
    onAction({ type: "choose", id: event.id, kind });
    timer.current = setTimeout(() => {
      setOutgoing(null);
      setExiting(null);
      pending.current = false;
    }, window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 320);
  };
  const pointerDown = (e: PointerEvent<HTMLElement>) => {
    if (pending.current || !e.isPrimary || e.button !== 0 || (e.target as HTMLElement).closest("button,a,input")) return;
    gesture.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
    e.currentTarget.dataset.dragging = "true";
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const pointerMove = (e: PointerEvent<HTMLElement>) => {
    if (!gesture.current || gesture.current.id !== e.pointerId || !card.current) return;
    const dx = e.clientX - gesture.current.x;
    if (Math.abs(e.clientY - gesture.current.y) > Math.abs(dx) + 20) { clearGesture(); return; }
    card.current.style.transform = `translateX(${dx}px) rotate(${Math.max(-14, Math.min(14, dx / 22))}deg)`;
    card.current.style.setProperty("--hit-opacity", String(Math.min(1, Math.max(0, dx / 80))));
    card.current.style.setProperty("--nope-opacity", String(Math.min(1, Math.max(0, -dx / 80))));
  };
  const pointerUp = (e: PointerEvent<HTMLElement>) => {
    if (!gesture.current || gesture.current.id !== e.pointerId) return;
    const dx = e.clientX - gesture.current.x;
    clearGesture();
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    if (Math.abs(dx) >= 80) choose(dx > 0 ? "like" : "pass");
  };
  if (!ready) return <Root className={embedded ? "home-deck" : "view"}><p role="status">{t("Recupero le tue scelte…")}</p></Root>;
  if (!event) {
    const liked = events.filter(item => history.some(choice => choice.id === item.id && choice.kind === "like"));
    return <Root className={embedded ? "home-deck match-summary" : "view match-summary"}>{celebration && <Celebration key={`${celebration.id}-${celebration.kind}`} title={celebration.title} kind={celebration.kind} />}<div className="match-copy"><p>{t("SELEZIONE COMPLETATA")}</p><Heading>{liked.length ? t("Hai trovato le tue serate.") : t("Nessuna scintilla, per ora.")}</Heading><span>{liked.length} {t("eventi ti interessano.")} {liked.filter(item => saved.has(item.id)).length} {t("ancora nei salvati.")}</span></div><div className="editorial-list">{liked.map(item => <CompactEventRow key={item.id} event={item} onOpen={() => onOpen(item)} />)}</div><div className="match-summary__actions"><button className="secondary-cta" disabled={!history.length || !!exiting} onClick={() => { setCelebration(null); onAction({ type: "undo" }); }}>{t("Annulla ultima")}</button><button className="primary-cta" onClick={onProfile}>{t("Vedi salvati")}</button><button className="secondary-cta" onClick={() => { setCelebration(null); onAction({ type: "restart" }); }}>{t("Ricomincia")}</button></div><p className="demo-caption">{t("Match personale su eventi demo. Nessun abbinamento con altre persone.")}</p></Root>;
  }
  return <Root className={embedded ? "home-deck match-view" : "view match-view"}>{celebration && <Celebration key={`${celebration.id}-${celebration.kind}`} title={celebration.title} kind={celebration.kind} />}<div className="match-copy"><div><p>{embedded ? t("UNA SERATA ALLA VOLTA") : "MATCH"} · {history.length + (exiting ? 0 : 1)} / {events.length}</p>{!embedded && <h1>{t("Ti va questa serata?")}</h1>}</div><button className="icon-control" aria-label={t("Annulla ultima scelta")} disabled={!history.length || !!exiting} onClick={() => { setCelebration(null); onAction({ type: "undo" }); }}><ArrowCounterClockwise size={23} /></button>{!embedded && <span>{t("Scegli un evento, non una persona.")} · {t("Destra per salvare, sinistra per passare.")}</span>}</div><progress className="match-progress" value={history.length} max={events.length} aria-label={t("Eventi già valutati")} />
    <div className="swipe-stage"><div className="swipe-stack" aria-hidden="true" /><article key={event.id} ref={card} className={`swipe-card${exiting ? ` swipe-card--${exiting}` : ""}`} onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={clearGesture} onLostPointerCapture={clearGesture}>
      <img src={event.image} alt={t(event.imageAlt ?? event.title)} width="900" height="1100" draggable={false} /><div className="swipe-card__scrim" /><span className="swipe-stamp swipe-stamp--hit" aria-hidden="true"><Fire weight="fill" />HIT</span><span className="swipe-stamp swipe-stamp--nope" aria-hidden="true">NOPE</span>
      <button disabled={!!exiting} className="card-save" aria-label={saved.has(event.id) ? t("Rimuovi dai salvati") : t("Salva evento")} aria-pressed={saved.has(event.id)} onClick={() => onAction({ type: "save", id: event.id })}><BookmarkSimple size={22} weight={saved.has(event.id) ? "fill" : "regular"} /></button>
      <div className="swipe-card__copy"><small>{t(event.category)}</small><h2>{t(event.title)}</h2><p><MapPin size={17} />{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</p><div className="match-social">{event.attendeeCount} {t("interessati")} · demo</div><footer><strong>{formatRelativeEventTime(event.startAt, undefined, language)}</strong><b>{formatPrice(event, language)}</b></footer></div>
    </article></div>
    <div className="swipe-actions"><button className="swipe-action" aria-label={t("Passa")} disabled={!!exiting} onClick={() => choose("pass")}><X size={25} /><span>NOPE</span></button><button className="swipe-detail" disabled={!!exiting} onClick={() => onOpen(event)}>{t("Dettagli")}</button><button className="swipe-action swipe-action--like" aria-label={t("Mi interessa")} disabled={!!exiting} onClick={() => choose("like")}><Fire size={25} weight="fill" /><span>HIT</span></button></div><p className="demo-caption match-note">{t("Le scelte restano su questo dispositivo · demo")}</p>
  </Root>;
}
