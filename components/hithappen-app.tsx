"use client";
import { useLocale } from "@/lib/i18n/locale-provider";
import { useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";
import { mockEvents, type EventItem } from "@/data/mock-events";
import { filterEvents, searchEvents, defaultFilters, type EventFilters } from "@/lib/events/filters";
import { deviceReducer, initialDeviceState, restoreDeviceState, STORAGE_KEY, type DeviceAction } from "@/lib/events/device-state";
import { BottomNavigation, type AppTab } from "@/components/navigation/bottom-navigation";
import { AppHeader } from "@/components/navigation/app-header";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { DiscoverView } from "@/features/discover/discover-view";
import { EventDetailView } from "@/features/event-detail/event-detail-view";
import { FilterSheet } from "@/features/filters/filter-sheet";
import { InboxView } from "@/features/inbox/inbox-view";
import { MapView } from "@/features/map/map-view";
import { MatchView } from "@/features/match/match-view";
import { ProfileView } from "@/features/profile/profile-view";
import { SearchOverlay } from "@/features/search/search-overlay";

export function HitHappenApp() {
  const { t, language } = useLocale();
  const [tab, setTab] = useState<AppTab>("discover");
  const [catalogue, setCatalogue] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [mapSelection, setMapSelection] = useState<EventItem>(mockEvents[0]);
  const [device, setDevice] = useState(initialDeviceState);
  const [hydrated, setHydrated] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [attending, setAttending] = useState<Set<string>>(() => new Set());
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [overlay, setOverlay] = useState<"search" | "filters" | null>(null);
  const [query, setQuery] = useState("");
  const filteredEvents = useMemo(() => filterEvents(mockEvents, filters), [filters]);
  const results = useMemo(() => searchEvents(filteredEvents, query, language), [filteredEvents, query, language]);
  const saved = useMemo(() => new Set(device.saved), [device.saved]);
  const dispatch = (action: DeviceAction) => setDevice(current => deviceReducer(current, action));
  useEffect(() => {
    // SSR renders the same defaults on both sides; hydrate once from the external device store.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    try { setDevice(restoreDeviceState(localStorage.getItem(STORAGE_KEY), mockEvents.map(event => event.id))); }
    catch { setStorageMessage("Salvataggio locale non disponibile: le scelte restano in questa sessione."); }
    setHydrated(true);
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(device)); }
    // Surface failures from the external storage API instead of claiming persistence succeeded.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    catch { setStorageMessage("Non riesco a salvare sul dispositivo. Le scelte restano in questa sessione."); }
  }, [device, hydrated]);
  const openEvent = (event: EventItem) => { window.scrollTo({ top: 0 }); setSelectedEvent(event); setOverlay(null); };
  const switchTab = (next: AppTab) => { setTab(next); setCatalogue(false); setQuery(""); setSelectedEvent(null); setOverlay(null); window.scrollTo({ top: 0 }); };
  if (selectedEvent) return <EventDetailView event={selectedEvent} saved={saved.has(selectedEvent.id)} attending={attending.has(selectedEvent.id)} onBack={() => setSelectedEvent(null)} onSave={() => dispatch({ type: "save", id: selectedEvent.id })} onAttend={() => setAttending(current => { const next = new Set(current); if (next.has(selectedEvent.id)) next.delete(selectedEvent.id); else next.add(selectedEvent.id); return next; })} />;
  return <div className="app-shell" data-ready={hydrated}><div className="app-frame" inert={overlay ? true : undefined}>
    <AppHeader fullSearch={tab === "discover"} query={query} onQuery={value => { setQuery(value); if (value) setCatalogue(true); }} onSearch={() => setOverlay("search")} onBack={tab === "discover" && catalogue ? () => { setCatalogue(false); setQuery(""); } : undefined} />
    {storageMessage && <p className="storage-message" role="status">{t(storageMessage)}</p>}
    {tab === "discover" && (catalogue ? <main className="view catalogue-view"><div className="section-heading"><h1>{t("Tutti gli eventi")}</h1><button onClick={() => setOverlay("filters")}><SlidersHorizontal size={20} />{t("Filtri")}</button></div><p className="results-count" role="status">{results.length} {t("eventi · dati demo")}</p>{results.length ? <div className="editorial-list">{results.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => openEvent(event)} />)}</div> : <div className="empty-copy"><h2>{t("Nessun evento trovato")}</h2><p>{t("Cambia ricerca o allarga i filtri.")}</p><button className="secondary-cta" onClick={() => { setFilters(defaultFilters); setQuery(""); }}>{t("Azzera ricerca e filtri")}</button></div>}</main> : <DiscoverView events={mockEvents} saved={saved} onOpen={openEvent} onSave={id => dispatch({ type: "save", id })} onExplore={() => { setCatalogue(true); window.scrollTo({ top: 0 }); }} />)}
    {tab === "match" && <MatchView events={mockEvents} history={device.history} saved={saved} ready={hydrated} onOpen={openEvent} onAction={dispatch} onProfile={() => switchTab("profile")} />}
    {tab === "map" && <MapView events={filteredEvents} selected={mapSelection} onSelect={setMapSelection} onOpen={openEvent} onFilters={() => setOverlay("filters")} />}
    {tab === "inbox" && <InboxView />}
    {tab === "profile" && <ProfileView events={mockEvents} saved={saved} onOpen={openEvent} />}
    <BottomNavigation active={tab} onChange={switchTab} />
  </div>{overlay === "search" && <SearchOverlay events={mockEvents} query={query} onQuery={setQuery} onClose={() => setOverlay(null)} onOpen={openEvent} />}{overlay === "filters" && <FilterSheet value={filters} resultCount={filteredEvents.length} onChange={setFilters} onReset={() => setFilters(defaultFilters)} onClose={() => setOverlay(null)} />}</div>;
}
