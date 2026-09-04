"use client";
/* eslint-disable @next/next/no-img-element -- Small local demo thumbnails do not affect LCP. */
import { useState } from "react";
import { ArrowLeft, CaretRight, Lock, PaperPlaneTilt, UsersThree } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import type { DeviceAction, DeviceState } from "@/lib/events/device-state";
import { useLocale } from "@/lib/i18n/locale-provider";

const people: Record<string, { name: string; image: string; shared: string }> = {
  luca: { name: "Luca", image: "/events/rooftop.png", shared: "Musica live · 2 eventi in comune" },
  sara: { name: "Sara", image: "/events/live.png", shared: "Outdoor · 1 evento in comune" },
};

export function InboxView({ events, state, onAction }: { events: EventItem[]; state: DeviceState; onAction: (action: DeviceAction) => void }) {
  const { t } = useLocale();
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const active = state.conversations.find(item => item.id === activeId);
  if (active) {
    const event = events.find(item => item.id === active.eventId);
    const person = active.participantId ? people[active.participantId] : null;
    return <main className="view inbox-view conversation-view"><header className="conversation-header"><button className="icon-control" aria-label={t("Indietro")} onClick={() => setActiveId(null)}><ArrowLeft size={22} /></button><span><strong>{t(active.title)}</strong><small>{active.kind === "group" ? `${event?.attendeeCount ?? 0} ${t("partecipanti")}` : t("Contatto demo accettato")}</small></span></header>
      {active.kind === "group" && <div className="group-people" aria-label={t("Profili nel gruppo")}><span><img src="/events/rooftop.png" alt="Giulia" /><b>Giulia</b><small>{t("Cocktail · Musica live")}</small></span><span><img src="/events/live.png" alt="Marco" /><b>Marco</b><small>{t("DJ set · Outdoor")}</small></span><span><img src="/events/club.png" alt="Sara" /><b>Sara</b><small>{t("Cinema · Cultura")}</small></span></div>}
      {person && <div className="direct-context"><img src={person.image} alt={person.name} /><span><strong>{person.name}</strong><small>{t(person.shared)}</small></span></div>}
      <div className="message-list">{active.messages.map(message => <div key={message.id} className={`message-bubble ${message.sender === "me" ? "is-me" : ""}`}><p>{t(message.body)}</p><time>{new Date(message.sentAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time></div>)}</div>
      <form className="message-compose" onSubmit={eventSubmit => { eventSubmit.preventDefault(); onAction({ type: "send-message", conversationId: active.id, body: draft }); setDraft(""); }}><label className="sr-only" htmlFor="message-draft">{t("Scrivi un messaggio")}</label><input id="message-draft" value={draft} onChange={event => setDraft(event.target.value)} placeholder={t("Scrivi un messaggio...")} /><button aria-label={t("Invia")} disabled={!draft.trim()}><PaperPlaneTilt size={20} weight="fill" /></button></form><p className="local-note"><Lock size={14} />{t("Messaggi demo salvati solo su questo dispositivo.")}</p>
    </main>;
  }
  const groups = state.conversations.filter(item => item.kind === "group");
  const directs = state.conversations.filter(item => item.kind === "direct");
  return <main className="view inbox-view"><header className="page-title"><p>{t("CONVERSAZIONI LOCALI · DEMO")}</p><h1>Inbox</h1></header>
    <section className="inbox-section"><h2>{t("Gruppi evento")}</h2>{groups.length ? <div className="inbox-list">{groups.map(item => { const event = events.find(candidate => candidate.id === item.eventId); return <button key={item.id} onClick={() => { setActiveId(item.id); onAction({ type: "read-conversation", id: item.id }); }}><img src={event?.image ?? "/events/rooftop.png"} alt="" /><span><strong>{t(item.title)}</strong><small>{event ? `${event.attendeeCount} ${t("partecipanti")}` : t("Gruppo evento")}</small><em>{t(item.messages.at(-1)?.body ?? "")}</em></span>{item.unread > 0 && <b>{item.unread}</b>}<CaretRight size={17} /></button>; })}</div> : <div className="empty-copy empty-copy--compact"><UsersThree size={34} /><h3>{t("Nessun gruppo ancora")}</h3><p>{t("Partecipa a un evento e scegli esplicitamente se entrare nel gruppo.")}</p></div>}</section>
    <section className="inbox-section"><h2>{t("Messaggi")}</h2><div className="inbox-list">{directs.map(item => { const person = people[item.participantId ?? "luca"]; return <button key={item.id} onClick={() => setActiveId(item.id)}><img src={person.image} alt={person.name} /><span><strong>{person.name}</strong><small>{t("Contatto demo accettato")}</small><em>{t(item.messages.at(-1)?.body ?? "")}</em></span><CaretRight size={17} /></button>; })}</div></section>
    <p className="local-note"><Lock size={14} />{t("Messaggi demo salvati solo su questo dispositivo.")}</p>
  </main>;
}
