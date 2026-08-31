import { Bell, CaretDown, MagnifyingGlass } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { isThisWeekend, isToday } from "@/lib/events/date";
import { EventCard } from "@/components/events/event-card";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { FeaturedEventCard } from "@/components/events/featured-event-card";
import { FilterChips, type QuickFilter } from "@/components/search/filter-chips";
import { AppIconButton } from "@/components/ui/app-icon-button";
import { SectionHeader } from "@/components/ui/section-header";

export function DiscoverView({ events, saved, quickFilter, onFilter, onOpen, onSave, onSearch, onNotifications }: { events: EventItem[]; saved: Set<string>; quickFilter: QuickFilter; onFilter: (filter: QuickFilter) => void; onOpen: (event: EventItem) => void; onSave: (id: string) => void; onSearch: () => void; onNotifications: () => void }) {
  const featured = events.find((event) => event.isFeatured && isToday(event.startAt)) ?? events[0];
  const tonight = events.filter((event) => isToday(event.startAt) && event.id !== featured?.id);
  const weekend = events.filter((event) => isThisWeekend(event.startAt) && event.id !== featured?.id);
  const nearby = [...events].filter((event) => event.id !== featured?.id).sort((a,b) => a.distanceKm - b.distanceKm);
  const rows = quickFilter === "free" ? events.filter((event) => event.price === 0) : quickFilter === "weekend" ? weekend : quickFilter === "tomorrow" ? events.filter((event) => !isToday(event.startAt)).slice(0,5) : tonight;

  return <main className="view discover-view">
    <header className="discover-topbar"><span className="brand-mark" aria-label="HitHappen" /><button type="button" className="location-select"><strong>Milano</strong><CaretDown size={16} /></button><div><AppIconButton icon={MagnifyingGlass} label="Cerca" onClick={onSearch} /><AppIconButton icon={Bell} label="Notifiche" onClick={onNotifications} /></div></header>
    <section className="discover-intro"><p>Milano, stasera</p><h1>Esci bene.</h1><span>Posti, persone e notti che vale la pena vivere.</span><FilterChips active={quickFilter} onChange={onFilter} showFree={false} /></section>
    {featured && <FeaturedEventCard event={featured} saved={saved.has(featured.id)} onSave={() => onSave(featured.id)} onOpen={() => onOpen(featured)} />}
    <section className="content-section"><SectionHeader title={quickFilter === "tonight" ? "Stasera" : quickFilter === "tomorrow" ? "Domani" : quickFilter === "weekend" ? "Questo weekend" : "Gratis"} /><div className="event-grid">{rows.slice(0,4).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="content-section recommendations"><SectionHeader title="Per te" /><div className="editorial-list">{nearby.slice(0,4).map((event) => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="content-section"><SectionHeader title="Weekend" /><div className="event-grid">{weekend.slice(0,4).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
  </main>;
}
