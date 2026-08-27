"use client";

/* eslint-disable @next/next/no-img-element -- Vinext preview does not expose the Next image optimizer binding. */

import { useState } from "react";
import {
  AppleLogo, ArrowLeft, Bell, BookmarkSimple, CalendarBlank, CaretRight,
  ChatCircle, Check, Clock, Compass, Crosshair, FunnelSimple, GearSix,
  GoogleLogo, Heart, House, Lightning, MapPin, MapTrifold, MagnifyingGlass,
  NavigationArrow, PaperPlaneTilt, Plus, ShareNetwork, SlidersHorizontal,
  Sparkle, Ticket, UserCircle, UsersThree, X,
} from "@phosphor-icons/react";

type Tab = "discover" | "map" | "inbox" | "profile";
type Overlay = "search" | "filters" | "picker" | "onboarding" | "agenda" | "chat" | null;

type EventItem = {
  id: number; title: string; venue: string; area: string; date: string; day: string;
  time: string; distance: string; price: string; category: string;
  attendees: number; image: string; description: string;
};

const events: EventItem[] = [
  { id: 1, title: "Rooftop al tramonto", venue: "Terrazza Ventuno", area: "Navigli", date: "27 Ago", day: "Gio", time: "19:30", distance: "1,8 km", price: "12 €", category: "Aperitivo", attendees: 24, image: "/events/rooftop.png", description: "Aperitivo, musica selezionata e vista sui Navigli. Dress code easy chic, primo drink incluso." },
  { id: 2, title: "Live indie al Biko", venue: "Biko Club", area: "Barona", date: "28 Ago", day: "Ven", time: "21:30", distance: "2,4 km", price: "8 €", category: "Musica", attendees: 18, image: "/events/live.png", description: "Tre band emergenti, palco ravvicinato e aftershow. Una serata piccola per scoprire musica nuova." },
  { id: 3, title: "Pulse / All night long", venue: "District 24", area: "Porta Venezia", date: "29 Ago", day: "Sab", time: "23:30", distance: "3,6 km", price: "18 €", category: "Party", attendees: 37, image: "/events/live.png", description: "House, visual immersivi e guest set fino al mattino. Ingresso riservato ai maggiorenni." },
  { id: 4, title: "Cena lunga in terrazza", venue: "Orto Urbano", area: "Isola", date: "30 Ago", day: "Dom", time: "20:00", distance: "2,9 km", price: "25 €", category: "Food", attendees: 14, image: "/events/rooftop.png", description: "Una tavolata informale, menu stagionale e posti pensati per conoscere persone nuove." },
];

const navItems = [
  { id: "discover" as const, label: "Scopri", icon: House },
  { id: "map" as const, label: "Mappa", icon: MapTrifold },
  { id: "inbox" as const, label: "Inbox", icon: ChatCircle },
  { id: "profile" as const, label: "Profilo", icon: UserCircle },
];

function Wordmark({ large = false }: { large?: boolean }) {
  return <span className={large ? "brand-wordmark large" : "brand-wordmark"} aria-label="hit happen"><b>hit<span>*</span></b><b>happen.</b></span>;
}

function IconButton({ label, children, onClick, active = false, className = "" }: { label: string; children: React.ReactNode; onClick?: () => void; active?: boolean; className?: string }) {
  return <button className={`icon-button ${active ? "active" : ""} ${className}`.trim()} type="button" aria-label={label} onClick={onClick}>{children}</button>;
}

function AvatarStack({ count, inverse = false }: { count: number; inverse?: boolean }) {
  return <span className={`social-proof ${inverse ? "inverse" : ""}`}><span className="avatar-stack" aria-hidden="true"><i>MA</i><i>GI</i><i>LU</i><i>SA</i></span><span>{count} partecipanti</span></span>;
}

function SectionHeader({ title, action = "Vedi tutto" }: { title: string; action?: string }) {
  return <div className="section-heading"><h2>{title}</h2><button type="button">{action}</button></div>;
}

function AppHeader({ onSearch }: { onSearch: () => void }) {
  return <header className="app-header"><button type="button" className="city-button"><MapPin weight="fill" /> Milano</button><div><IconButton label="Cerca" onClick={onSearch}><MagnifyingGlass /></IconButton><IconButton label="Notifiche"><Bell /></IconButton></div></header>;
}

function HeroEventCard({ event, saved, onSave, onOpen }: { event: EventItem; saved: boolean; onSave: () => void; onOpen: () => void }) {
  return <article className="hero-event-card"><button type="button" className="hero-photo" onClick={onOpen}><img src={event.image} alt={`${event.title} — ${event.venue}`} width="960" height="620" /><span className="hero-photo-label">Sta succedendo</span></button><IconButton className="hero-save" label="Salva evento" active={saved} onClick={onSave}><BookmarkSimple weight={saved ? "fill" : "bold"} /></IconButton><button className="round-arrow" type="button" onClick={onOpen} aria-label={`Apri ${event.title}`}><CaretRight weight="bold" /></button></article>;
}

function PosterCard({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button className="poster-card" type="button" onClick={onOpen}><span><img src={event.image} alt="" width="360" height="300" /><i /></span><strong>{event.title}</strong><small>{event.area} · {event.distance}</small></button>;
}

function HorizontalEventCard({ event, onOpen, saved, onSave }: { event: EventItem; onOpen: () => void; saved?: boolean; onSave?: () => void }) {
  return <article className="horizontal-event"><button className="horizontal-main" type="button" onClick={onOpen}><img src={event.image} alt="" width="320" height="220" /><span><small>{event.category}</small><strong>{event.title}</strong><b><MapPin /> {event.area} · {event.distance}</b><b><Clock /> {event.time} · {event.price}</b></span></button>{onSave && <IconButton label="Salva" active={saved} onClick={onSave}><BookmarkSimple weight={saved ? "fill" : "regular"} /></IconButton>}</article>;
}

function DiscoverView({ saved, toggleSaved, openEvent, setOverlay }: { saved: Set<number>; toggleSaved: (id: number) => void; openEvent: (event: EventItem) => void; setOverlay: (overlay: Overlay) => void }) {
  return <div className="view discover-view"><AppHeader onSearch={() => setOverlay("search")} /><h1 className="home-headline">Che si fa<br /><span>stasera?</span></h1><HeroEventCard event={events[0]} saved={saved.has(1)} onSave={() => toggleSaved(1)} onOpen={() => openEvent(events[0])} /><SectionHeader title="Stasera" /><div className="poster-rail">{events.slice(0, 3).map((event) => <PosterCard key={event.id} event={event} onOpen={() => openEvent(event)} />)}</div><SectionHeader title="A 15 minuti da te" /><div className="near-list"><HorizontalEventCard event={events[3]} onOpen={() => openEvent(events[3])} saved={saved.has(4)} onSave={() => toggleSaved(4)} /><HorizontalEventCard event={events[1]} onOpen={() => openEvent(events[1])} saved={saved.has(2)} onSave={() => toggleSaved(2)} /></div><button className="decision-banner" type="button" onClick={() => setOverlay("picker")}><span><Sparkle weight="fill" /></span><b>Indeciso?</b><small>Tre risposte. Una serata.</small><CaretRight /></button><SectionHeader title="Questo weekend" /><div className="editorial-grid"><PosterCard event={events[2]} onOpen={() => openEvent(events[2])} /><HorizontalEventCard event={events[0]} onOpen={() => openEvent(events[0])} /></div></div>;
}

function MapView({ openEvent, setOverlay }: { openEvent: (event: EventItem) => void; setOverlay: (overlay: Overlay) => void }) {
  return <div className="view map-view"><header className="map-header"><div className="map-chips"><button className="active" type="button">Stasera</button><button type="button">Musica</button><button type="button">All’aperto</button><button type="button">+3</button></div><IconButton label="Filtri" onClick={() => setOverlay("filters")}><SlidersHorizontal /></IconButton></header><div className="city-map" aria-label="Mappa dimostrativa degli eventi a Milano"><span className="map-river" /><span className="user-dot" />{events.map((event, index) => <button key={event.id} aria-label={`Apri ${event.title}`} className={`photo-pin pin-${index + 1}`} type="button" onClick={() => openEvent(event)}><img src={event.image} alt="" /><i>{index === 2 ? "5" : ""}</i></button>)}</div><div className="map-preview"><HorizontalEventCard event={events[3]} onOpen={() => openEvent(events[3])} saved /><button className="map-locate" type="button"><Crosshair /> Centra</button></div></div>;
}

function SearchOverlay({ close, openEvent, openFilters }: { close: () => void; openEvent: (event: EventItem) => void; openFilters: () => void }) {
  const [query, setQuery] = useState("");
  const results = events.filter((event) => `${event.title} ${event.category} ${event.area}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="full-overlay search-overlay"><header><IconButton label="Chiudi" onClick={close}><ArrowLeft /></IconButton><label className="search-field"><MagnifyingGlass /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cerca eventi o locali" /></label></header><main><FilterTitle title="Filtri rapidi" /><div className="quick-filter-grid">{[[Clock,"Stasera"],[CalendarBlank,"Domani"],[CalendarBlank,"Weekend"],[Compass,"All’aperto"],[Heart,"Gratis"]].map(([Icon,label]) => { const I = Icon as typeof Clock; return <button type="button" key={label as string}><I /><span>{label as string}</span></button>; })}</div><FilterTitle title="Categorie" /><div className="category-grid">{["Musica","Aperitivo","Party","Cultura","Sport","Altro"].map((label,index)=><button type="button" key={label}><img src={events[index % events.length].image} alt="" /><span>{label}</span></button>)}</div><button className="advanced-filter-link" type="button" onClick={openFilters}><FunnelSimple /> Filtri avanzati <CaretRight /></button>{query && <><FilterTitle title={`${results.length} risultati`} /><div className="search-results">{results.map((event)=><HorizontalEventCard key={event.id} event={event} onOpen={()=>openEvent(event)} />)}</div></>}</main></div>;
}

function FilterTitle({ title }: { title: string }) { return <h2 className="filter-title">{title}</h2>; }

function FilterOverlay({ close }: { close: () => void }) {
  const [distance, setDistance] = useState(5);
  return <div className="sheet-overlay" onClick={close}><section className="filter-sheet" onClick={(e)=>e.stopPropagation()}><header><div><small>Trova il tuo mood</small><h2>Filtri</h2></div><IconButton label="Chiudi" onClick={close}><X /></IconButton></header><div className="filter-group"><strong>Distanza <b>Entro {distance} km</b></strong><input type="range" min="1" max="20" value={distance} onChange={(e)=>setDistance(Number(e.target.value))} /><div className="range-labels"><span>1 km</span><span>20 km</span></div></div><div className="filter-group"><strong>Fascia oraria</strong><div className="choice-grid"><button className="active" type="button">Tutto</button><button type="button">Pomeriggio</button><button type="button">Sera</button><button type="button">Notte</button></div></div><div className="filter-group"><strong>Consigliati</strong><div className="choice-grid"><button className="active" type="button">Consigliati</button><button type="button">Più visti</button><button type="button">Più popolari</button></div></div><footer><button type="button" className="clear-button">Azzera</button><button type="button" className="primary-button" onClick={close}>Mostra 28 eventi</button></footer></section></div>;
}

function EventDetail({ event, saved, attending, back, toggleSaved, toggleAttending, openChat }: { event: EventItem; saved: boolean; attending: boolean; back: () => void; toggleSaved: () => void; toggleAttending: () => void; openChat: () => void }) {
  return <div className="detail-view"><div className="detail-photo"><img src={event.image} alt={`${event.title} — ${event.venue}`} /><IconButton label="Indietro" onClick={back}><ArrowLeft /></IconButton><div><IconButton label="Salva" active={saved} onClick={toggleSaved}><BookmarkSimple weight={saved ? "fill" : "bold"} /></IconButton><IconButton label="Condividi"><ShareNetwork /></IconButton></div></div><article className="detail-content"><span className="event-status">Sta succedendo</span><h1>{event.title}</h1><p className="detail-date">Giovedì 27 Agosto · {event.time} – 01:00</p><p className="detail-place"><MapPin weight="fill" /> {event.venue} · {event.distance}</p><button type="button" className="participant-row" onClick={openChat}><AvatarStack count={event.attendees + (attending ? 1 : 0)} /><CaretRight /></button><p className="detail-lead">{event.description}</p><div className="detail-tags"><span>{event.price}</span><span>{event.category}</span><span>Outdoor</span></div><section className="useful-info"><h2>Per te</h2><p><Check /> Ingresso con drink incluso</p><p><Clock /> 19 € entro le 20 · in cassa</p><p><UsersThree /> Lista amici disponibile</p></section></article><footer className="detail-actions"><button className="ticket-link" type="button"><Ticket /> Biglietti</button><button className={attending ? "attend-button attending" : "attend-button"} type="button" onClick={toggleAttending}>{attending ? <Check /> : null}{attending ? "Partecipo" : "Partecipa"}</button></footer></div>;
}

const groups = [events[0], events[3], events[2], events[1]];
function InboxView({ openChat }: { openChat: (event: EventItem) => void }) {
  return <div className="view inbox-view"><header className="page-header"><div><small>I tuoi gruppi attivi.</small><h1>I tuoi gruppi</h1></div><IconButton label="Nuovo gruppo"><Plus /></IconButton></header><div className="group-list">{groups.map((event,index)=><button type="button" key={event.id} onClick={()=>openChat(event)}><img src={event.image} alt="" /><span><strong>{event.title}</strong><small>{event.attendees} partecipanti · {index ? "Ci vediamo lì?" : "Marco: alle 19 davanti?"}</small></span>{index===0?<i>3</i>:<CaretRight />}</button>)}</div></div>;
}

function ChatOverlay({ event, close }: { event: EventItem; close: () => void }) {
  return <div className="full-overlay chat-view"><header><IconButton label="Indietro" onClick={close}><ArrowLeft /></IconButton><div><strong>{event.title}</strong><small>{event.attendees} partecipanti</small></div><IconButton label="Condividi"><ShareNetwork /></IconButton></header><main><ChatMessage name="Marco" text="Ci vediamo alle 19:00!" time="16:45" /><ChatMessage name="Giulia" text="Io porto un’amica 🙌" time="16:47" /><ChatMessage mine name="Tu" text="Perfetto! Ci vediamo lì ✨" time="16:48" /><ChatMessage name="Luca" text="Qualcuno per taxi dopo?" time="16:50" /><ChatMessage name="Sara" text="Organizziamo pre-drink?" time="16:51" /></main><footer><label><input aria-label="Scrivi un messaggio" placeholder="Scrivi un messaggio…" /><button type="button" aria-label="Invia"><PaperPlaneTilt weight="fill" /></button></label></footer></div>;
}

function ChatMessage({ name, text, time, mine=false }: { name: string; text: string; time: string; mine?: boolean }) {
  return <article className={`chat-message ${mine ? "mine" : ""}`}>{!mine && <span className="chat-avatar">{name.slice(0,2).toUpperCase()}</span>}<div><strong>{name}</strong><p>{text}</p><small>{time}</small></div></article>;
}

function AgendaOverlay({ saved, close, openEvent }: { saved: Set<number>; close: () => void; openEvent: (event: EventItem) => void }) {
  const savedEvents = events.filter((event)=>saved.has(event.id));
  return <div className="full-overlay agenda-view"><header><IconButton label="Indietro" onClick={close}><ArrowLeft /></IconButton><div className="agenda-tabs"><button className="active" type="button">Agenda</button><button type="button">Salvati</button></div></header><main>{savedEvents.length ? <><h2>Agosto</h2>{savedEvents.map(event=><button className="agenda-row" type="button" key={event.id} onClick={()=>openEvent(event)}><span><b>{event.date.split(" ")[0]}</b><small>{event.day}</small></span><span><strong>{event.title}</strong><small>{event.time} · {event.venue}</small><AvatarStack count={event.attendees} /></span><CaretRight /></button>)}</> : <EmptyState close={close} />}</main></div>;
}

function EmptyState({ close }: { close: () => void }) {
  return <section className="empty-state"><span className="lamp"><i /></span><h1>Qui è un po’<br />vuoto.<br /><em>Ma sta per</em><br />succedere<br />qualcosa.</h1><button className="primary-button" type="button" onClick={close}>Esplora eventi</button></section>;
}

function ProfileView({ saved, attending, openAgenda, openOnboarding }: { saved: Set<number>; attending: Set<number>; openAgenda: () => void; openOnboarding: () => void }) {
  return <div className="view profile-view"><header><IconButton label="Impostazioni"><GearSix /></IconButton></header><section className="profile-identity"><img src="/events/rooftop.png" alt="Gabriele" /><h1>Gabriele</h1><p>@gabri.rea</p></section><div className="profile-stats"><span><b>{attending.size + 31}</b><small>Eventi</small></span><span><b>128</b><small>Amici</small></span><span><b>12</b><small>Gruppi</small></span></div><section className="profile-block"><h2>I miei interessi</h2><div className="interest-list">{["Musica","Techno","Aperitivi","Arte","Cinema"].map(x=><span key={x}>{x}</span>)}</div></section><section className="profile-block"><h2>Attività recente</h2><div className="activity-gallery">{events.map(event=><img key={event.id} src={event.image} alt="" />)}</div></section><button className="profile-link" type="button" onClick={openAgenda}><CalendarBlank /><span><strong>Agenda e salvati</strong><small>{saved.size} eventi sotto controllo</small></span><CaretRight /></button><button className="profile-link" type="button" onClick={openOnboarding}><Compass /><span><strong>Preferenze di scoperta</strong><small>Interessi, zona e distanza</small></span><CaretRight /></button></div>;
}

function PickerOverlay({ close, openEvent }: { close: () => void; openEvent: (event: EventItem) => void }) {
  const [step, setStep] = useState(0); const questions=[{t:"Che energia cerchi?",o:["Tranquilla","Sociale","Intensa"]},{t:"Quanto vuoi muoverti?",o:["Qui vicino","Fino a 5 km","Ovunque"]},{t:"Quanto vuoi spendere?",o:["Gratis","Meno di 15 €","Non importa"]}];
  if(step>=questions.length)return <div className="full-overlay picker-result"><header><IconButton label="Chiudi" onClick={close}><X /></IconButton></header><main><small>La scelta per te</small><h1>Live indie<br /><span>al Biko</span></h1><HeroEventCard event={events[1]} saved={false} onSave={()=>{}} onOpen={()=>openEvent(events[1])} /><button className="primary-button" type="button" onClick={()=>openEvent(events[1])}>Scopri l’evento</button></main></div>;
  return <div className="full-overlay picker-flow"><header><IconButton label="Chiudi" onClick={close}><X /></IconButton><span>{step+1} / {questions.length}</span></header><main><Lightning weight="fill" /><small>Scegli per me</small><h1>{questions[step].t}</h1><div>{questions[step].o.map(o=><button type="button" key={o} onClick={()=>setStep(step+1)}>{o}<CaretRight /></button>)}</div></main></div>;
}

function OnboardingOverlay({ close }: { close: () => void }) {
  const [step,setStep]=useState(0);
  return <div className="onboarding-overlay">{step===0&&<section className="onboarding-hero"><button type="button" onClick={close}>Salta</button><h1>Vivi<br />la città.<br /><span>Non farti</span><br />raccontare.</h1><img src="/events/rooftop.png" alt="Amici a un evento" /><p>Scopri eventi veri, persone vere, esperienze vere.</p><div className="onboarding-progress"><i className="active" /><i /><i /><i /></div><button className="onboarding-next" type="button" onClick={()=>setStep(1)}><CaretRight /></button></section>}{step===1&&<section className="onboarding-step"><IconButton label="Indietro" onClick={()=>setStep(0)}><ArrowLeft /></IconButton><small>Il tuo spazio</small><h1>Entra nella città.</h1><div className="auth-buttons"><button type="button" onClick={()=>setStep(2)}><AppleLogo weight="fill" /> Continua con Apple</button><button type="button" onClick={()=>setStep(2)}><GoogleLogo /> Continua con Google</button><button type="button" onClick={()=>setStep(2)}>Continua con email</button></div></section>}{step===2&&<section className="onboarding-step"><small>Personalizziamo il feed</small><h1>Cosa ti fa uscire?</h1><div className="onboarding-interests">{["Live","Club","Aperitivi","Food","Cultura","Sport"].map((x,i)=><button className={i<3?"active":""} type="button" key={x}>{x}</button>)}</div><button className="primary-button" type="button" onClick={()=>setStep(3)}>Continua</button></section>}{step===3&&<section className="onboarding-step location-step"><NavigationArrow weight="fill" /><small>Tutto intorno a te</small><h1>Da dove partiamo?</h1><button className="primary-button" type="button" onClick={close}><Crosshair /> Usa la mia posizione</button><button className="secondary-button" type="button" onClick={close}>Scegli Milano</button></section>}</div>;
}

function Navigation({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) {
  return <nav className="app-navigation" aria-label="Navigazione principale">{navItems.map(({id,label,icon:Icon})=><button className={`${tab===id?"active":""} ${id==="map"?"map-action":""}`} type="button" key={id} onClick={()=>setTab(id)}><span><Icon weight={tab===id?"fill":"regular"} /></span><small>{label}</small></button>)}</nav>;
}

function DesktopRail({ tab, setTab }: { tab: Tab; setTab: (tab: Tab) => void }) { return <aside className="desktop-rail"><Wordmark large /><p>Vivi la città.<br /><span>Non farti raccontare.</span></p><nav>{navItems.map(({id,label,icon:Icon})=><button className={tab===id?"active":""} type="button" key={id} onClick={()=>setTab(id)}><Icon />{label}</button>)}</nav><small>Milano · Monza Brianza</small></aside>; }

function DesktopContext({ openEvent }: { openEvent: (event: EventItem) => void }) { return <aside className="desktop-context"><small>Dal tuo punto</small><h2>Vicino a te</h2><div className="context-map"><span />{events.slice(0,3).map((event,index)=><button className={`context-pin cp-${index+1}`} type="button" key={event.id} onClick={()=>openEvent(event)}>{event.price}</button>)}</div>{events.slice(0,3).map(event=><HorizontalEventCard key={event.id} event={event} onOpen={()=>openEvent(event)} />)}</aside>; }

export function HitHappenApp() {
  const [tab,setTab]=useState<Tab>("discover"); const [overlay,setOverlay]=useState<Overlay>(null); const [selected,setSelected]=useState<EventItem|null>(null); const [chatEvent,setChatEvent]=useState<EventItem>(events[0]); const [saved,setSaved]=useState<Set<number>>(()=>new Set([2,3])); const [attending,setAttending]=useState<Set<number>>(()=>new Set([1]));
  const toggleSet=(setter:React.Dispatch<React.SetStateAction<Set<number>>>,id:number)=>setter(current=>{const next=new Set(current);if(next.has(id))next.delete(id);else next.add(id);return next;});
  const changeTab=(next:Tab)=>{setSelected(null);setOverlay(null);setTab(next);}; const openEvent=(event:EventItem)=>{setOverlay(null);setSelected(event);}; const openChat=(event:EventItem)=>{setChatEvent(event);setOverlay("chat");};
  return <main className="product-shell"><a href="#product-content" className="skip-link">Vai al contenuto</a><DesktopRail tab={tab} setTab={changeTab} /><section className="product-content" id="product-content" tabIndex={-1}>{selected?<EventDetail event={selected} saved={saved.has(selected.id)} attending={attending.has(selected.id)} back={()=>setSelected(null)} toggleSaved={()=>toggleSet(setSaved,selected.id)} toggleAttending={()=>toggleSet(setAttending,selected.id)} openChat={()=>openChat(selected)} />:<>{tab==="discover"&&<DiscoverView saved={saved} toggleSaved={id=>toggleSet(setSaved,id)} openEvent={openEvent} setOverlay={setOverlay} />}{tab==="map"&&<MapView openEvent={openEvent} setOverlay={setOverlay} />}{tab==="inbox"&&<InboxView openChat={openChat} />}{tab==="profile"&&<ProfileView saved={saved} attending={attending} openAgenda={()=>setOverlay("agenda")} openOnboarding={()=>setOverlay("onboarding")} />}<Navigation tab={tab} setTab={changeTab} /></>}</section><DesktopContext openEvent={openEvent} />{overlay==="search"&&<SearchOverlay close={()=>setOverlay(null)} openEvent={openEvent} openFilters={()=>setOverlay("filters")} />}{overlay==="filters"&&<FilterOverlay close={()=>setOverlay(null)} />}{overlay==="picker"&&<PickerOverlay close={()=>setOverlay(null)} openEvent={openEvent} />}{overlay==="onboarding"&&<OnboardingOverlay close={()=>setOverlay(null)} />}{overlay==="agenda"&&<AgendaOverlay saved={saved} close={()=>setOverlay(null)} openEvent={openEvent} />}{overlay==="chat"&&<ChatOverlay event={chatEvent} close={()=>setOverlay(null)} />}</main>;
}
