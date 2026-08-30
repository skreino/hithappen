/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { BookmarkSimple, CaretRight, GearSix, Heart, MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { CompactEventRow } from "@/components/events/compact-event-row";

export function ProfileView({ events, saved, onOpen }: { events: EventItem[]; saved: Set<string>; onOpen: (event: EventItem) => void }) {
  const savedEvents = events.filter((event) => saved.has(event.id));
  return <main className="view standard-view profile-view"><header className="profile-header"><button type="button" aria-label="Impostazioni"><GearSix size={23} /></button><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=82" alt="Profilo di Gabriele" /><h1>Gabriele</h1><p><MapPin size={15} />Milano</p></header><section className="profile-section"><h2>Interessi</h2><div className="interest-tags"><span>Musica live</span><span>Aperitivi</span><span>Arte</span><span>Elettronica</span></div></section><section className="profile-menu"><button type="button"><span><Heart size={21} />Prossimi eventi</span><CaretRight size={18} /></button><button type="button"><span><BookmarkSimple size={21} />Salvati</span><em>{savedEvents.length}</em><CaretRight size={18} /></button><button type="button"><span><GearSix size={21} />Impostazioni</span><CaretRight size={18} /></button></section>{savedEvents.length > 0 && <section className="profile-section"><h2>I tuoi salvati</h2>{savedEvents.slice(0,3).map((event) => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</section>}</main>;
}
