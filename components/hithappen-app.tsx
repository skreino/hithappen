"use client";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { filterEvents, searchEvents, defaultFilters, type EventFilters } from "@/lib/events/filters";
import { deviceReducer, initialDeviceState, restoreDeviceState, STORAGE_KEY, LEGACY_STORAGE_KEY, type DeviceAction, type City, type LocationConsent } from "@/lib/events/device-state";
import { eventRepository } from "@/lib/repositories/mock-repositories";
import { useLocale } from "@/lib/i18n/locale-provider";
import { BottomNavigation, type AppTab } from "@/components/navigation/bottom-navigation";
import { AppHeader } from "@/components/navigation/app-header";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { FilterSheet } from "@/features/filters/filter-sheet";
import { SearchOverlay } from "@/features/search/search-overlay";
import { OnboardingFlow } from "@/features/onboarding/onboarding-flow";

const DiscoverView = lazy(() => import("@/features/discover/discover-view").then(module => ({ default: module.DiscoverView })));
const MatchView = lazy(() => import("@/features/match/match-view").then(module => ({ default: module.MatchView })));
const MapView = lazy(() => import("@/features/map/map-view").then(module => ({ default: module.MapView })));
const InboxView = lazy(() => import("@/features/inbox/inbox-view").then(module => ({ default: module.InboxView })));
const ProfileView = lazy(() => import("@/features/profile/profile-view").then(module => ({ default: module.ProfileView })));
const EventDetailView = lazy(() => import("@/features/event-detail/event-detail-view").then(module => ({ default: module.EventDetailView })));

function ViewSkeleton() { return <main className="view view-skeleton" aria-label="Caricamento"><i /><i /><i /></main>; }

export function HitHappenApp() {
  const { t, language } = useLocale();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [tab, setTab] = useState<AppTab>("discover");
  const [catalogue, setCatalogue] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [mapSelection, setMapSelection] = useState<EventItem | null>(null);
  const [device, setDevice] = useState(initialDeviceState);
  const [hydrated, setHydrated] = useState(false);
  const [storageMessage, setStorageMessage] = useState("");
  const [filters, setFilters] = useState<EventFilters>(defaultFilters);
  const [overlay, setOverlay] = useState<"search" | "filters" | null>(null);
  const [query, setQuery] = useState("");
  const filteredEvents = useMemo(() => filterEvents(events, filters), [events, filters]);
  const results = useMemo(() => searchEvents(filteredEvents, query, language), [filteredEvents, query, language]);
  const saved = useMemo(() => new Set(device.saved), [device.saved]);
  const dispatch = (action: DeviceAction) => setDevice(current => deviceReducer(current, action));

  useEffect(() => {
    let active = true;
    void eventRepository.list().then(items => {
      if (!active) return;
      setEvents(items); setMapSelection(items[0] ?? null);
      try { setDevice(restoreDeviceState(localStorage.getItem(STORAGE_KEY), items.map(event => event.id), localStorage.getItem(LEGACY_STORAGE_KEY))); }
      catch { setStorageMessage("Salvataggio locale non disponibile: le scelte restano in questa sessione."); }
      setHydrated(true);
    });
    return () => { active = false; };
  }, []);
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(device)); }
    catch { queueMicrotask(() => setStorageMessage("Non riesco a salvare sul dispositivo. Le scelte restano in questa sessione.")); }
  }, [device, hydrated]);

  const openEvent = (event: EventItem) => { window.scrollTo({ top: 0 }); setSelectedEvent(event); setOverlay(null); };
  const switchTab = (next: AppTab) => { setTab(next); setCatalogue(false); setQuery(""); setSelectedEvent(null); setOverlay(null); window.scrollTo({ top: 0 }); };
  const completeOnboarding = (city: City, interests: string[], locationConsent: LocationConsent) => dispatch({ type: "complete-onboarding", profile: { city, interests }, locationConsent });

  if (!hydrated) return <div className="app-shell" data-ready="false"><ViewSkeleton /></div>;
  if (!device.onboarding.completed) return <div className="app-shell" data-ready="true"><OnboardingFlow onComplete={completeOnboarding} /></div>;
  if (selectedEvent) {
    const attending = device.attendance.some(item => item.eventId === selectedEvent.id);
    const inGroup = device.groups.some(item => item.eventId === selectedEvent.id);
    return <Suspense fallback={<ViewSkeleton />}><EventDetailView event={selectedEvent} saved={saved.has(selectedEvent.id)} attending={attending} inGroup={inGroup} onBack={() => setSelectedEvent(null)} onSave={() => dispatch({ type: "save", id: selectedEvent.id })} onAttend={() => dispatch({ type: "attend", eventId: selectedEvent.id })} onJoinGroup={() => inGroup ? dispatch({ type: "leave-group", eventId: selectedEvent.id }) : dispatch({ type: "join-group", eventId: selectedEvent.id, title: selectedEvent.title })} /></Suspense>;
  }
  return <div className="app-shell" data-ready="true"><div className="app-frame" inert={overlay ? true : undefined}>
    <AppHeader fullSearch={tab === "discover"} query={query} city={device.profile.city} onQuery={value => { setQuery(value); if (value) setCatalogue(true); }} onSearch={() => setOverlay("search")} onBack={tab === "discover" && catalogue ? () => { setCatalogue(false); setQuery(""); } : undefined} />
    {storageMessage && <p className="storage-message" role="status">{t(storageMessage)}</p>}
    <Suspense fallback={<ViewSkeleton />}>
      {tab === "discover" && (catalogue ? <main className="view catalogue-view"><div className="section-heading"><h1>{t("Tutti gli eventi")}</h1><button onClick={() => setOverlay("filters")}><SlidersHorizontal size={20} />{t("Filtri")}</button></div><p className="results-count" role="status">{results.length} {t("eventi · dati demo")}</p>{results.length ? <div className="editorial-list">{results.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => openEvent(event)} />)}</div> : <div className="empty-copy"><h2>{t("Nessun evento trovato")}</h2><p>{t("Cambia ricerca o allarga i filtri.")}</p><button className="secondary-cta" onClick={() => { setFilters(defaultFilters); setQuery(""); }}>{t("Azzera ricerca e filtri")}</button></div>}</main> : <DiscoverView events={events} interests={device.profile.interests} saved={saved} onOpen={openEvent} onSave={id => dispatch({ type: "save", id })} onExplore={() => { setCatalogue(true); window.scrollTo({ top: 0 }); }} />)}
      {tab === "match" && <MatchView events={events} history={device.history} saved={saved} ready onOpen={openEvent} onAction={dispatch} onProfile={() => switchTab("profile")} />}
      {tab === "map" && mapSelection && <MapView events={filteredEvents} selected={mapSelection} onSelect={setMapSelection} onOpen={openEvent} onFilters={() => setOverlay("filters")} />}
      {tab === "inbox" && <InboxView events={events} state={device} onAction={dispatch} />}
      {tab === "profile" && <ProfileView events={events} state={device} onAction={dispatch} onOpen={openEvent} />}
    </Suspense>
    <BottomNavigation active={tab} onChange={switchTab} />
  </div>{overlay === "search" && <SearchOverlay events={events} query={query} onQuery={setQuery} onClose={() => setOverlay(null)} onOpen={openEvent} />}{overlay === "filters" && <FilterSheet value={filters} resultCount={filteredEvents.length} onChange={setFilters} onReset={() => setFilters(defaultFilters)} onClose={() => setOverlay(null)} />}</div>;
}
