"use client";

/* eslint-disable @next/next/no-img-element -- Vinext preview does not expose the Next image optimizer binding. */

import { useMemo, useState } from "react";
import {
  AppleLogo, ArrowLeft, Bell, BookmarkSimple, CalendarBlank, CaretRight,
  ChatCircle, Check, Clock, Compass, Crosshair, FunnelSimple, GearSix,
  GoogleLogo, House, Lightning, MapPin, MapTrifold, MagnifyingGlass,
  NavigationArrow, ShareNetwork, SlidersHorizontal, Sparkle, Ticket,
  UserCircle, UsersThree, X,
} from "@phosphor-icons/react";

type Tab = "discover" | "map" | "inbox" | "profile";
type Overlay = "search" | "filters" | "picker" | "onboarding" | null;
type InboxMode = "activity" | "messages";

type EventItem = {
  id: number; title: string; venue: string; area: string; date: string;
  time: string; distance: string; price: string; category: string;
  attendees: number; image: string; description: string;
};

const events: EventItem[] = [
  { id: 1, title: "Rooftop al tramonto", venue: "Terrazza Ventuno", area: "Navigli", date: "Oggi", time: "19:30", distance: "1,8 km", price: "12 €", category: "Aperitivo · DJ set", attendees: 24, image: "/events/rooftop.png", description: "Un aperitivo sopra i tetti di Milano, selezione nu-disco e tavoli condivisi. Il primo drink è incluso." },
  { id: 2, title: "Live indie al Biko", venue: "Biko Club", area: "Barona", date: "Oggi", time: "21:30", distance: "2,4 km", price: "8 €", category: "Live · Indie", attendees: 18, image: "/events/live.png", description: "Tre band emergenti, palco ravvicinato e aftershow. Una serata piccola per scoprire musica nuova." },
  { id: 3, title: "Pulse / All night long", venue: "District 24", area: "Porta Venezia", date: "Sab 29", time: "23:30", distance: "3,6 km", price: "18 €", category: "Club · Electronic", attendees: 37, image: "/events/club.png", description: "House, visual immersivi e guest set fino al mattino. Ingresso riservato ai maggiorenni." },
  { id: 4, title: "Cena lunga in terrazza", venue: "Orto Urbano", area: "Isola", date: "Dom 30", time: "20:00", distance: "2,9 km", price: "25 €", category: "Food · Social table", attendees: 14, image: "/events/rooftop.png", description: "Una tavolata informale, menu stagionale e posti pensati per conoscere persone nuove." },
];

const people = ["GA", "EL", "NO"];
const navItems = [
  { id: "discover" as const, label: "Scopri", icon: House },
  { id: "map" as const, label: "Mappa", icon: MapTrifold },
  { id: "inbox" as const, label: "Inbox", icon: ChatCircle },
  { id: "profile" as const, label: "Profilo", icon: UserCircle },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return <span className={compact ? "wordmark compact" : "wordmark"} aria-label="hit, happen."><img src="/branding/wordmark.png" alt="" width="2000" height="2000" /></span>;
}

function IconButton({ label, children, onClick, active = false }: { label: string; children: React.ReactNode; onClick?: () => void; active?: boolean }) {
  return <button className={active ? "icon-button active" : "icon-button"} type="button" aria-label={label} onClick={onClick}>{children}</button>;
}

function AvatarStack({ count, light = false }: { count: number; light?: boolean }) {
  return <span className={light ? "social-proof light" : "social-proof"}><span className="avatar-stack" aria-hidden="true">{people.map((person, index) => <i key={person} className={`avatar a${index + 1}`}>{person}</i>)}</span><span>{count} partecipanti</span></span>;
}

function AppHeader({ onSearch, onSaved }: { onSearch: () => void; onSaved: () => void }) {
  return <header className="mobile-header"><Wordmark compact /><button className="location-button" type="button"><MapPin weight="bold" /> Milano <CaretRight /></button><div className="header-tools"><IconButton label="Cerca" onClick={onSearch}><MagnifyingGlass /></IconButton><IconButton label="Eventi salvati" onClick={onSaved}><BookmarkSimple /></IconButton></div></header>;
}

function SpatialStrip({ attendees }: { attendees: number }) {
  return <div className="spatial-strip"><div className="mini-route" aria-hidden="true"><span /><i /><NavigationArrow weight="fill" /></div><AvatarStack count={attendees} /></div>;
}

function ImmersiveCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button className="immersive-card" type="button" onClick={onOpen}><img src={event.image} alt={`${event.title} — ${event.venue}`} width="720" height="420" loading="lazy" /><span className="immersive-scrim" /><span className="immersive-copy"><strong>{event.title}</strong><b>{event.date} · {event.time}</b><small><MapPin weight="fill" /> {event.area} · {event.distance}</small><AvatarStack count={event.attendees} light /></span></button>;
}

function TonightCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button className="tonight-card" type="button" onClick={onOpen}>
    <img src={event.image} alt={`${event.title} — ${event.venue}`} width="520" height="320" loading="lazy" />
    <span className="tonight-copy">
      <strong>{event.title}</strong>
      <small><Clock weight="bold" /> {event.date} · {event.time}</small>
      <small><MapPin weight="bold" /> {event.area} · {event.distance}</small>
      <AvatarStack count={event.attendees} />
    </span>
  </button>;
}

function WeekendGallery({ openEvent }: { openEvent: (event: EventItem) => void }) {
  const weekendEvents = [events[3], events[0], events[1]];
  return <div className="weekend-gallery">{weekendEvents.map((event) => <button key={event.id} type="button" onClick={() => openEvent(event)} aria-label={`Apri ${event.title}`}><img src={event.image} alt={`${event.title} — ${event.venue}`} width="300" height="210" loading="lazy" /></button>)}</div>;
}

function MiniCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button className="mini-event" type="button" onClick={onOpen}><img src={event.image} alt={`${event.title} — ${event.venue}`} width="360" height="250" loading="lazy" /><span><strong>{event.title}</strong><small>{event.date} · {event.area}</small></span></button>;
}

function SectionHeading({ title, action = "Vedi tutto" }: { title: string; action?: string }) {
  return <div className="section-heading"><h2>{title}</h2><button type="button">{action} <CaretRight /></button></div>;
}

function DiscoverView({ saved, toggleSaved, openEvent, setOverlay, showSaved }: { saved: Set<number>; toggleSaved: (id: number) => void; openEvent: (event: EventItem) => void; setOverlay: (overlay: Overlay) => void; showSaved: () => void }) {
  const featured = events[0];
  return <div className="view discover-view">
    <AppHeader onSearch={() => setOverlay("search")} onSaved={showSaved} />
    <div className="time-filters"><button className="selected" type="button">Oggi</button><button type="button">Weekend</button><button type="button" onClick={() => setOverlay("filters")}><SlidersHorizontal /> Filtri</button></div>
    <article className="featured-event">
      <button className="featured-image" type="button" onClick={() => openEvent(featured)}><img src={featured.image} alt="Amici durante un aperitivo al tramonto su una terrazza" width="1024" height="760" /></button>
      <IconButton label="Salva evento" active={saved.has(featured.id)} onClick={() => toggleSaved(featured.id)}><BookmarkSimple weight={saved.has(featured.id) ? "fill" : "regular"} /></IconButton>
      <button className="featured-copy" type="button" onClick={() => openEvent(featured)}><span className="event-title-row"><strong>{featured.title}</strong><CaretRight /></span><span><Clock weight="bold" /> {featured.date} · {featured.time}</span><span><MapPin weight="bold" /> {featured.area} · {featured.distance}</span></button>
      <SpatialStrip attendees={featured.attendees} />
    </article>
    <section className="feed-section tonight-section"><SectionHeading title="Stasera" /><TonightCard event={events[1]} onOpen={() => openEvent(events[1])} /></section>
    <section className="feed-section weekend-section"><SectionHeading title="Questo weekend" /><WeekendGallery openEvent={openEvent} /></section>
    <section className="feed-section nearby-preview"><SectionHeading title="Vicino a te" /><div className="map-strip" aria-hidden="true"><span /><span /><span /></div></section>
    <section className="picker-banner"><span><Sparkle weight="fill" /></span><div><strong>Non sai cosa scegliere?</strong><p>Tre domande, una serata su misura.</p></div><button type="button" onClick={() => setOverlay("picker")}>Scegli per me <CaretRight /></button></section>
  </div>;
}

function MapView({ openEvent }: { openEvent: (event: EventItem) => void }) {
  return <div className="view map-view"><header className="simple-header"><div><span>Esplora</span><h1>Intorno a te</h1></div><IconButton label="Centra posizione"><Crosshair /></IconButton></header><div className="map-searchbar"><MagnifyingGlass /><span>Cerca in questa zona</span><FunnelSimple /></div><div className="city-map" aria-label="Mappa dimostrativa degli eventi a Milano"><span className="map-river" />{events.map((event, index) => <button key={event.id} className={`map-pin pin-${index + 1}`} type="button" onClick={() => openEvent(event)}><span>{event.price}</span><i /></button>)}<span className="district d1">Navigli</span><span className="district d2">Isola</span><span className="district d3">Porta Venezia</span></div><div className="map-event-rail">{events.map((event) => <button key={event.id} type="button" onClick={() => openEvent(event)}><img src={event.image} alt="" width="180" height="150" /><span><small>{event.date} · {event.distance}</small><strong>{event.title}</strong><b>{event.price}</b></span></button>)}</div></div>;
}

function InboxView({ mode, setMode }: { mode: InboxMode; setMode: (mode: InboxMode) => void }) {
  return <div className="view inbox-view"><header className="simple-header"><div><span>La tua rete</span><h1>Inbox</h1></div><IconButton label="Notifiche"><Bell /></IconButton></header><div className="segmented-control"><button className={mode === "activity" ? "active" : ""} onClick={() => setMode("activity")} type="button">Attività</button><button className={mode === "messages" ? "active" : ""} onClick={() => setMode("messages")} type="button">Messaggi</button></div>{mode === "activity" ? <div className="activity-list"><article><span className="activity-icon lime"><CalendarBlank /></span><div><strong>Rooftop al tramonto è domani</strong><p>Il locale ha aggiornato l’orario di ingresso.</p><small>12 min fa</small></div></article><article><span className="activity-icon"><ChatCircle /></span><div><strong>Elisa ha risposto nel gruppo</strong><p>“Ci vediamo direttamente all’ingresso?”</p><small>42 min fa</small></div></article><article><span className="activity-icon"><UsersThree /></span><div><strong>Richiesta messaggio</strong><p>Marco era con te a Neon Hearts Live.</p><small>Ieri</small></div><button type="button">Gestisci</button></article></div> : <div className="conversation-list"><button type="button"><img src="/events/rooftop.png" alt="" /><span><strong>Rooftop al tramonto</strong><p>Elisa: Ci vediamo lì alle 19?</p></span><small>16:08<i>2</i></small></button><button type="button"><span className="person-avatar">MC</span><span><strong>Marco C.</strong><p>Ho visto che vai al Biko</p></span><small>Ieri</small></button><button type="button"><img src="/events/live.png" alt="" /><span><strong>Live indie al Biko</strong><p>Nora: Partiamo da Porta Genova</p></span><small>Lun</small></button></div>}</div>;
}

function ProfileView({ saved, attending, openEvent, openOnboarding }: { saved: Set<number>; attending: Set<number>; openEvent: (event: EventItem) => void; openOnboarding: () => void }) {
  const savedEvents = useMemo(() => events.filter((event) => saved.has(event.id)), [saved]);
  return <div className="view profile-view"><header className="simple-header"><div><span>Profilo</span><h1>Gabriele</h1></div><IconButton label="Impostazioni"><GearSix /></IconButton></header><section className="profile-intro"><span className="profile-avatar">GR</span><div><strong>Gabriele R.</strong><p>Busnago · Milano e dintorni</p></div><button type="button">Modifica</button></section><p className="profile-bio">Concerti piccoli, terrazze al tramonto e posti in cui si parla davvero.</p><div className="interest-list"><span>Live</span><span>Aperitivi</span><span>Electronic</span><span>Food</span></div><section className="profile-section"><div className="section-heading"><h2>Prossimi</h2><span>{attending.size}</span></div>{events.filter((event) => attending.has(event.id)).map((event) => <ImmersiveCard key={event.id} event={event} onOpen={() => openEvent(event)} />)}</section><section className="profile-section"><div className="section-heading"><h2>Salvati</h2><span>{saved.size}</span></div><div className="mini-event-grid">{savedEvents.map((event) => <MiniCard key={event.id} event={event} onOpen={() => openEvent(event)} />)}</div></section><button className="settings-row" type="button" onClick={openOnboarding}><Compass /><span><strong>Preferenze di scoperta</strong><small>Interessi, zona e distanza</small></span><CaretRight /></button></div>;
}

function EventDetail({ event, saved, attending, back, toggleSaved, toggleAttending }: { event: EventItem; saved: boolean; attending: boolean; back: () => void; toggleSaved: () => void; toggleAttending: () => void }) {
  return <div className="detail-view"><div className="detail-photo"><img src={event.image} alt={`${event.title} — ${event.venue}`} width="1200" height="900" /><IconButton label="Indietro" onClick={back}><ArrowLeft /></IconButton><div className="detail-photo-actions"><IconButton label="Condividi"><ShareNetwork /></IconButton><IconButton label="Salva" active={saved} onClick={toggleSaved}><BookmarkSimple weight={saved ? "fill" : "regular"} /></IconButton></div></div><article className="detail-content"><span className="detail-category">{event.category}</span><h1>{event.title}</h1><p className="detail-lead">{event.description}</p><div className="detail-facts"><span><CalendarBlank /><b>{event.date}</b><small>{event.time}</small></span><span><MapPin /><b>{event.venue}</b><small>{event.area} · {event.distance}</small></span><span><Ticket /><b>{event.price}</b><small>Biglietteria esterna</small></span></div><section className="detail-social"><div><h2>Chi partecipa</h2><p>Persone con interessi simili ai tuoi.</p></div><AvatarStack count={event.attendees + (attending ? 1 : 0)} /></section><div className="detail-map"><span /><i /><NavigationArrow weight="fill" /><button type="button">Indicazioni <CaretRight /></button></div></article><footer className="detail-actions"><button className="ticket-link" type="button"><Ticket /> Biglietti</button><button className={attending ? "attend-button attending" : "attend-button"} type="button" onClick={toggleAttending}>{attending ? <Check weight="bold" /> : <UsersThree />} Partecipo</button></footer></div>;
}

function SearchOverlay({ close, openEvent }: { close: () => void; openEvent: (event: EventItem) => void }) {
  const [query, setQuery] = useState("");
  const results = events.filter((event) => `${event.title} ${event.category} ${event.area}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="full-overlay search-overlay"><header><IconButton label="Chiudi" onClick={close}><ArrowLeft /></IconButton><div className="search-field"><MagnifyingGlass /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Eventi, locali o zone" /><button type="button" onClick={() => setQuery("")} aria-label="Cancella"><X /></button></div></header><main><p className="overlay-label">{query ? `${results.length} risultati` : "Ricerche popolari"}</p><div className="search-suggestions">{["Musica live", "Stasera", "Navigli", "Gratis"].map((item) => <button type="button" key={item} onClick={() => setQuery(item)}>{item}</button>)}</div><div className="search-results">{results.map((event) => <MiniCard key={event.id} event={event} onOpen={() => openEvent(event)} />)}</div></main></div>;
}

function FilterOverlay({ close }: { close: () => void }) {
  const [distance, setDistance] = useState(8);
  return <div className="sheet-overlay" onClick={close}><section className="filter-sheet" onClick={(event) => event.stopPropagation()}><header><div><span>Affina la ricerca</span><h2>Filtri</h2></div><IconButton label="Chiudi" onClick={close}><X /></IconButton></header><div className="filter-group"><strong>Categoria</strong><div className="choice-grid">{["Musica live", "Club", "Aperitivo", "Food", "Cultura", "Attività"].map((item, index) => <button className={index < 2 ? "active" : ""} type="button" key={item}>{item}</button>)}</div></div><div className="filter-group"><strong>Distanza <b>{distance} km</b></strong><input type="range" min="1" max="30" value={distance} onChange={(event) => setDistance(Number(event.target.value))} /></div><div className="filter-group"><strong>Prezzo</strong><div className="choice-grid"><button type="button">Gratis</button><button className="active" type="button">Fino a 15 €</button><button type="button">Qualsiasi</button></div></div><footer><button type="button" className="clear-button">Azzera</button><button type="button" className="primary-button" onClick={close}>Mostra 28 eventi</button></footer></section></div>;
}

function PickerOverlay({ close, openEvent }: { close: () => void; openEvent: (event: EventItem) => void }) {
  const [step, setStep] = useState(0);
  const questions = [{ title: "Che energia cerchi?", options: ["Tranquilla", "Sociale", "Intensa"] }, { title: "Quanto vuoi muoverti?", options: ["Qui vicino", "Fino a 5 km", "Ovunque a Milano"] }, { title: "Quanto vuoi spendere?", options: ["Gratis", "Meno di 15 €", "Non importa"] }];
  if (step >= questions.length) return <div className="full-overlay picker-result"><header><IconButton label="Chiudi" onClick={close}><X /></IconButton></header><main><span className="picker-spark"><Sparkle weight="fill" /></span><p>La scelta per te</p><h1>Live indie al Biko</h1><ImmersiveCard event={events[1]} onOpen={() => openEvent(events[1])} /><button className="primary-button" type="button" onClick={() => openEvent(events[1])}>Scopri l’evento</button></main></div>;
  return <div className="full-overlay picker-flow"><header><IconButton label="Chiudi" onClick={close}><X /></IconButton><span>{step + 1} di {questions.length}</span></header><main><span className="picker-spark"><Lightning weight="fill" /></span><p>Scegli per me</p><h1>{questions[step].title}</h1><div className="picker-options">{questions[step].options.map((option) => <button type="button" key={option} onClick={() => setStep((current) => current + 1)}>{option}<CaretRight /></button>)}</div></main></div>;
}

function OnboardingOverlay({ close }: { close: () => void }) {
  const [step, setStep] = useState(0);
  return <div className="onboarding-overlay">{step === 0 && <section className="onboarding-welcome"><Wordmark /><div><span>Milano succede adesso.</span><h1>Trova il posto giusto. E le persone con cui andarci.</h1></div><button className="primary-button" type="button" onClick={() => setStep(1)}>Inizia <CaretRight /></button><button className="text-button" type="button" onClick={close}>Continua come ospite</button></section>}{step === 1 && <section className="onboarding-step"><button className="back-button" type="button" onClick={() => setStep(0)}><ArrowLeft /></button><p>Il tuo spazio</p><h1>Accedi a HitHappen</h1><div className="auth-buttons"><button type="button" onClick={() => setStep(2)}><AppleLogo weight="fill" /> Continua con Apple</button><button type="button" onClick={() => setStep(2)}><GoogleLogo weight="bold" /> Continua con Google</button><button type="button" onClick={() => setStep(2)}>Continua con email</button></div><small>Accedendo accetti Termini e Privacy.</small></section>}{step === 2 && <section className="onboarding-step"><p>Personalizziamo il feed</p><h1>Cosa ti fa uscire di casa?</h1><div className="onboarding-interests">{["Live", "Club", "Aperitivi", "Food", "Cultura", "Sport", "Workshop", "Comedy"].map((item, index) => <button className={index < 4 ? "active" : ""} type="button" key={item}>{item}</button>)}</div><button className="primary-button" type="button" onClick={() => setStep(3)}>Continua</button></section>}{step === 3 && <section className="onboarding-step location-step"><span className="location-orbit"><NavigationArrow weight="fill" /></span><p>Eventi davvero vicini</p><h1>Da dove vuoi partire?</h1><button className="primary-button" type="button" onClick={() => setStep(4)}><Crosshair /> Usa la mia posizione</button><button className="secondary-button" type="button" onClick={() => setStep(4)}>Scegli la città manualmente</button></section>}{step === 4 && <section className="onboarding-step onboarding-done"><span><Check weight="bold" /></span><p>Ci siamo</p><h1>Il tuo feed è pronto.</h1><button className="primary-button" type="button" onClick={close}>Scopri cosa succede</button></section>}</div>;
}

function Navigation({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  return <nav className="app-navigation" aria-label="Navigazione principale">{navItems.map(({ id, label, icon: Icon }) => <button className={tab === id ? "active" : ""} type="button" key={id} onClick={() => setTab(id)}><Icon weight={tab === id ? "fill" : "regular"} /><span>{label}</span></button>)}</nav>;
}

function DesktopRail({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  return <aside className="desktop-rail"><Wordmark /><nav>{navItems.map(({ id, label, icon: Icon }) => <button className={tab === id ? "active" : ""} type="button" key={id} onClick={() => setTab(id)}><Icon weight={tab === id ? "fill" : "regular"} />{label}</button>)}</nav><div className="desktop-profile"><span>GR</span><div><strong>Gabriele</strong><small>Milano</small></div><CaretRight /></div></aside>;
}

function DesktopContext({ openEvent }: { openEvent: (event: EventItem) => void }) {
  return <aside className="desktop-context"><div className="context-heading"><span>Dal tuo punto</span><h2>Vicino a te</h2><button type="button"><Crosshair /> Centra</button></div><div className="context-map"><span className="context-route" />{events.slice(0, 3).map((event, index) => <button className={`context-pin cp-${index + 1}`} type="button" key={event.id} onClick={() => openEvent(event)}>{event.price}</button>)}</div><div className="context-list"><p>Entro 3 km</p>{events.slice(0, 3).map((event) => <button type="button" key={event.id} onClick={() => openEvent(event)}><img src={event.image} alt="" /><span><strong>{event.title}</strong><small>{event.time} · {event.distance}</small></span><CaretRight /></button>)}</div></aside>;
}

export function HitHappenApp() {
  const [tab, setTab] = useState<Tab>("discover");
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [inboxMode, setInboxMode] = useState<InboxMode>("activity");
  const [saved, setSaved] = useState<Set<number>>(() => new Set([2, 3]));
  const [attending, setAttending] = useState<Set<number>>(() => new Set([1]));
  const toggleSet = (setter: React.Dispatch<React.SetStateAction<Set<number>>>, id: number) => setter((current) => { const next = new Set(current); if (next.has(id)) next.delete(id); else next.add(id); return next; });
  function changeTab(next: Tab) { setSelected(null); setOverlay(null); setTab(next); }
  function openEvent(event: EventItem) { setOverlay(null); setSelected(event); }
  return <main className="product-shell"><a href="#product-content" className="skip-link">Vai al contenuto</a><DesktopRail tab={tab} setTab={changeTab} /><section className="product-content" id="product-content" tabIndex={-1} aria-label="HitHappen">{selected ? <EventDetail event={selected} saved={saved.has(selected.id)} attending={attending.has(selected.id)} back={() => setSelected(null)} toggleSaved={() => toggleSet(setSaved, selected.id)} toggleAttending={() => toggleSet(setAttending, selected.id)} /> : <>{tab === "discover" && <DiscoverView saved={saved} toggleSaved={(id) => toggleSet(setSaved, id)} openEvent={openEvent} setOverlay={setOverlay} showSaved={() => changeTab("profile")} />}{tab === "map" && <MapView openEvent={openEvent} />}{tab === "inbox" && <InboxView mode={inboxMode} setMode={setInboxMode} />}{tab === "profile" && <ProfileView saved={saved} attending={attending} openEvent={openEvent} openOnboarding={() => setOverlay("onboarding")} />}<Navigation tab={tab} setTab={changeTab} /></>}</section><DesktopContext openEvent={openEvent} />{overlay === "search" && <SearchOverlay close={() => setOverlay(null)} openEvent={openEvent} />}{overlay === "filters" && <FilterOverlay close={() => setOverlay(null)} />}{overlay === "picker" && <PickerOverlay close={() => setOverlay(null)} openEvent={openEvent} />}{overlay === "onboarding" && <OnboardingOverlay close={() => setOverlay(null)} />}</main>;
}
