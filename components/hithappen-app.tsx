"use client";

import { useEffect, useMemo, useState } from "react";
import { mockEvents, type EventItem } from "@/data/mock-events";
import { filterEvents, defaultFilters, type EventFilters } from "@/lib/events/filters";
import { BottomNavigation, type AppTab } from "@/components/navigation/bottom-navigation";
import { DiscoverView } from "@/features/discover/discover-view";
import { EventDetailView } from "@/features/event-detail/event-detail-view";
import { FilterSheet } from "@/features/filters/filter-sheet";
import { InboxView } from "@/features/inbox/inbox-view";
import { MapView } from "@/features/map/map-view";
import { ProfileView } from "@/features/profile/profile-view";
import { SearchOverlay } from "@/features/search/search-overlay";
import type { QuickFilter } from "@/components/search/filter-chips";

type Overlay = "search" | "filters" | null;

export function HitHappenApp() {
  const [tab, setTab] = useState<AppTab>("discover");
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [mapSelection, setMapSelection] = useState<EventItem>(mockEvents[0]);
  const [saved, setSaved] = useState<Set<string>>(() => new Set(["biko-live"]));
  const [attending, setAttending] = useState<Set<string>>(() => new Set());
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("tonight");
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [query, setQuery] = useState("");
  const filteredEvents = useMemo(() => filterEvents(mockEvents, filters), [filters]);

  useEffect(() => {
    if (selectedEvent) window.scrollTo({ top:0 });
  }, [selectedEvent]);

  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<string>>>, id: string) => setter((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  const openEvent = (event: EventItem) => { window.scrollTo({ top:0 }); setSelectedEvent(event); setOverlay(null); };
  const switchTab = (nextTab: AppTab) => { setTab(nextTab); setSelectedEvent(null); setOverlay(null); };

  if (selectedEvent) return <EventDetailView event={selectedEvent} saved={saved.has(selectedEvent.id)} attending={attending.has(selectedEvent.id)} onBack={() => setSelectedEvent(null)} onSave={() => toggleSet(setSaved, selectedEvent.id)} onAttend={() => toggleSet(setAttending, selectedEvent.id)} />;

  return <div className="app-shell"><div className="app-frame" aria-hidden={overlay ? true : undefined}>
    {tab === "discover" && <DiscoverView events={filteredEvents} saved={saved} quickFilter={quickFilter} onFilter={setQuickFilter} onOpen={openEvent} onSave={(id) => toggleSet(setSaved,id)} onSearch={() => setOverlay("search")} onNotifications={() => switchTab("inbox")} />}
    {tab === "map" && <MapView events={filteredEvents} selected={mapSelection} onSelect={setMapSelection} onOpen={openEvent} onFilters={() => setOverlay("filters")} />}
    {tab === "inbox" && <InboxView events={mockEvents} />}
    {tab === "profile" && <ProfileView events={mockEvents} saved={saved} onOpen={openEvent} />}
    <BottomNavigation active={tab} onChange={switchTab} onSearch={() => setOverlay("search")} />
  </div>
  <aside className="desktop-context"><p>Stasera a Milano</p><h2>La città è già in movimento.</h2><div className="desktop-context__list">{mockEvents.slice(0,4).map((event,index) => <button type="button" key={event.id} onClick={() => openEvent(event)}><span>{String(index + 1).padStart(2,"0")}</span><strong>{event.title}</strong><small>{event.neighborhood} · {event.distanceKm.toLocaleString("it-IT")} km</small></button>)}</div></aside>
  {overlay === "search" && <SearchOverlay events={filteredEvents} query={query} onQuery={setQuery} onClose={() => setOverlay(null)} onOpen={openEvent} />}
  {overlay === "filters" && <FilterSheet value={filters} resultCount={filteredEvents.length} onChange={setFilters} onReset={() => setFilters(defaultFilters)} onClose={() => setOverlay(null)} />}
  </div>;
}
