import { Bell, MapPin, MagnifyingGlass } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { isThisWeekend, isToday } from "@/lib/events/date";
import { EventCard } from "@/components/events/event-card";
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
    <header className="discover-topbar"><button type="button" className="location-select"><MapPin size={17} weight="fill" /><span><small>Sei a</small><strong>Milano</strong></span></button><div><AppIconButton icon={MagnifyingGlass} label="Cerca" onClick={onSearch} /><AppIconButton icon={Bell} label="Notifiche" onClick={onNotifications} /></div></header>
    <section className="discover-intro"><p>Il meglio intorno a te</p><h1>Che si fa stasera?</h1><FilterChips active={quickFilter} onChange={onFilter} /></section>
    {featured && <FeaturedEventCard event={featured} saved={saved.has(featured.id)} onSave={() => onSave(featured.id)} onOpen={() => onOpen(featured)} />}
    <section className="content-section"><SectionHeader title={quickFilter === "tonight" ? "Stasera" : quickFilter === "tomorrow" ? "Domani" : quickFilter === "weekend" ? "Questo weekend" : "Gratis"} /><div className="event-grid">{rows.slice(0,4).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="content-section"><SectionHeader title="Per te" /><div className="event-grid">{events.slice(4,8).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="content-section"><SectionHeader title="Vicino a te" /><div className="event-grid">{nearby.slice(0,4).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="content-section"><SectionHeader title="Questo weekend" /><div className="event-grid">{weekend.slice(0,4).map((event) => <EventCard key={event.id} event={event} saved={saved.has(event.id)} onSave={() => onSave(event.id)} onOpen={() => onOpen(event)} />)}</div></section>
  </main>;
}
