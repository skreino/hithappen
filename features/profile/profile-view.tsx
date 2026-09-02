/* eslint-disable @next/next/no-img-element -- Demo profile photography. */
import { MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { CompactEventRow } from "@/components/events/compact-event-row";
export function ProfileView({ events, saved, onOpen }: { events: EventItem[]; saved: Set<string>; onOpen: (event: EventItem) => void }) {
  const savedEvents = events.filter(event => saved.has(event.id));
  return <main className="view standard-view profile-view"><header className="profile-header"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=82" alt="Profilo demo" /><h1>Il tuo spazio</h1><p><MapPin size={15} />Milano · profilo demo</p></header><section className="profile-section"><h2>I tuoi salvati · {savedEvents.length}</h2><p className="search-hint">Qui trovi anche i “Mi interessa” di Match. Restano su questo dispositivo.</p>{savedEvents.length ? <div className="editorial-list">{savedEvents.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <p className="search-hint">Nessun salvato. Usa il segnalibro su un evento o prova Match.</p>}</section></main>;
}
