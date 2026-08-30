/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import type { EventItem } from "@/data/mock-events";
import { ChatCircle } from "@phosphor-icons/react";

export function InboxView({ events }: { events: EventItem[] }) {
  const groups = [{event:events[0],message:"Luca: ci vediamo all’ingresso?",time:"18:42",unread:2},{event:events[1],message:"Marta: prendo io i biglietti",time:"17:18",unread:0},{event:events[4],message:"Giulia: siamo già in quattro",time:"Ieri",unread:0}].filter((group) => group.event);
  return <main className="view standard-view"><header className="page-title"><p>I tuoi programmi</p><h1>Inbox</h1></header>{groups.length ? <section className="inbox-list"><h2>Gruppi evento</h2>{groups.map(({event,message,time,unread}) => <button type="button" key={event.id} className="inbox-row"><img src={event.image} alt="" /><span><strong>{event.title}</strong><small>{message}</small></span><em>{time}{unread > 0 && <b>{unread}</b>}</em></button>)}</section> : <div className="empty-copy"><ChatCircle size={32} /><h2>Ancora nessun gruppo</h2><p>Quando partecipi a un evento, le conversazioni collegate compaiono qui.</p></div>}</main>;
}
