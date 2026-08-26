"use client";
/* eslint-disable @next/next/no-img-element -- Vinext non espone il binding richiesto dall'ottimizzatore next/image in anteprima locale. */

import { useMemo, useState } from "react";
import {
  AtSign, Bell, Bookmark, CalendarDays, Check, ChevronLeft, Gamepad2, Heart,
  Home, Map, MapPin, MessageCircle, MoreHorizontal, Plus, RotateCcw, Search,
  Send, Share2, ShieldCheck, Shuffle, Sparkles, ThumbsDown, Ticket,
  UserRound, UsersRound, X,
} from "lucide-react";
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

type View = "home" | "games" | "map" | "saved" | "chats" | "profile" | "venue";
type EventItem = {
  id: number; title: string; venue: string; date: string; time: string;
  price: string; distance: string; category: string; image: string;
  accent: string; attendees: number; description: string;
};

const events: EventItem[] = [
  {
    id: 1, title: "Sunset Social Club", venue: "Terrazza Ventuno",
    date: "VEN 28 AGO", time: "19:00", price: "12 €", distance: "2,4 km",
    category: "Aperitivo · DJ set", image: "/events/rooftop.png", accent: "coral",
    attendees: 86,
    description: "Aperitivo al tramonto, selezione nu-disco e una terrazza sopra i tetti di Milano. Il biglietto include il primo drink.",
  },
  {
    id: 2, title: "Neon Hearts Live", venue: "Spazio Confine",
    date: "SAB 29 AGO", time: "21:30", price: "8 €", distance: "7,8 km",
    category: "Live · Indie pop", image: "/events/live.png", accent: "aqua",
    attendees: 42,
    description: "Tre band emergenti, palco ravvicinato e aftershow. Una serata piccola, intensa e fatta per scoprire musica nuova.",
  },
  {
    id: 3, title: "Afterdark: Pulse", venue: "District 24",
    date: "SAB 29 AGO", time: "23:30", price: "18 €", distance: "11 km",
    category: "Club · Electronic", image: "/events/club.png", accent: "violet",
    attendees: 128,
    description: "Una notte elettronica tra house, visual immersivi e guest set. Ingresso riservato ai maggiorenni.",
  },
];

const navItems = [
  { id: "home" as const, label: "Scopri", icon: Home },
  { id: "games" as const, label: "Giochi", icon: Gamepad2 },
  { id: "map" as const, label: "Mappa", icon: Map },
  { id: "chats" as const, label: "Chat", icon: MessageCircle },
  { id: "profile" as const, label: "Profilo", icon: UserRound },
];
const avatars = ["GA", "EL", "NO", "MF"];

function BrandMark() {
  return (
    <button type="button" onClick={() => window.location.reload()} className="brand-mark" aria-label="HitHappen — torna alla home">
      <span className="brand-logo-crop" aria-hidden="true">
        <img src="/branding/logo.png" alt="" width="2000" height="2000" decoding="async" />
      </span>
    </button>
  );
}

function AvatarStack({ count }: { count: number }) {
  return (
    <div className="avatar-row" aria-label={`${count} partecipanti`}>
      <div className="avatar-stack">
        {avatars.map((avatar, index) => <span className={`mini-avatar avatar-${index + 1}`} key={avatar}>{avatar}</span>)}
      </div>
      <span>{count} partecipano</span>
    </div>
  );
}

function EventCard({
  event, saved, attending, onOpen, onSave, onAttend,
}: {
  event: EventItem; saved: boolean; attending: boolean; onOpen: () => void;
  onSave: () => void; onAttend: () => void;
}) {
  const dateParts = event.date.split(" ");
  return (
    <article className={`event-card accent-${event.accent}`}>
      <button className="event-visual" onClick={onOpen} aria-label={`Apri ${event.title}`}>
        <img className="event-photo-treatment" src={event.image} alt={`${event.title} presso ${event.venue}`} width="1024" height="800" loading="lazy" decoding="async" /><span className="event-shade" />
        <span className="date-badge">{dateParts[0]}<strong>{dateParts[1]}</strong>{dateParts[2]}</span>
        <span className="price-badge">{event.price}</span>
        <span className="distance-badge"><MapPin size={13} /> {event.distance}</span>
        <div className="event-copy">
          <span className="event-category">{event.category}</span>
          <h3>{event.title}</h3><p>{event.venue} · {event.time}</p>
        </div>
      </button>
      <div className="event-meta">
        <AvatarStack count={event.attendees + (attending ? 1 : 0)} />
        <div className="quick-actions">
          <button className={saved ? "round-action active" : "round-action"} onClick={onSave} aria-label={saved ? "Rimuovi dai salvati" : "Salva evento"}>
            <Bookmark size={18} fill={saved ? "currentColor" : "none"} />
          </button>
          <button className="join-button" onClick={onAttend}>
            {attending ? <Check size={17} /> : <Plus size={17} />}{attending ? "Ci sei" : "Partecipo"}
          </button>
        </div>
      </div>
    </article>
  );
}

function EmptyState({ icon: Icon, title, copy }: { icon: typeof Bookmark; title: string; copy: string }) {
  return <div className="empty-state"><span><Icon size={28} /></span><h2>{title}</h2><p>{copy}</p></div>;
}

export default function HomePage() {
  const [view, setView] = useState<View>("home");
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [savedIds, setSavedIds] = useState<number[]>([2]);
  const [attendingIds, setAttendingIds] = useState<number[]>([1]);
  const [activeChat, setActiveChat] = useState<EventItem | null>(null);
  const [gameIndex, setGameIndex] = useState(0);
  const [gameDecision, setGameDecision] = useState<"like" | "skip" | null>(null);
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("Per te");
  const [messages, setMessages] = useState([
    { author: "Elisa", text: "Qualcuno parte da Monza verso le 18:30?", mine: false },
    { author: "Nora", text: "Io! Possiamo trovarci in stazione 👋", mine: false },
    { author: "Tu", text: "Ci sono anche io, vi scrivo qui quando parto.", mine: true },
  ]);
  const savedEvents = useMemo(() => events.filter((event) => savedIds.includes(event.id)), [savedIds]);
  const attendingEvents = useMemo(() => events.filter((event) => attendingIds.includes(event.id)), [attendingIds]);

  function toggleSaved(id: number) {
    setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  function toggleAttending(id: number) {
    setAttendingIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  function sendMessage() {
    const clean = message.trim();
    if (!clean) return;
    setMessages((current) => [...current, { author: "Tu", text: clean, mine: true }]);
    setMessage("");
  }
  function advanceGame(decision: "like" | "skip") {
    setGameDecision(decision);
    window.setTimeout(() => {
      if (decision === "like") toggleSaved(events[gameIndex].id);
      setGameIndex((current) => (current + 1) % events.length);
      setGameDecision(null);
    }, 220);
  }

  return (
    <main className="prototype-stage">
      <a className="skip-link" href="#app-content">Vai al contenuto</a>
      <aside className="desktop-context" aria-hidden="true">
        <BrandMark />
        <div className="context-copy">
          <span className="eyebrow">MILANO + MONZA BRIANZA</span>
          <h1>La guida<br /><em>delle serate.</em></h1>
          <p>Una guida tascabile contemporanea per trovare concerti, aperitivi e notti da ricordare.</p>
        </div>
        <div className="context-note"><Sparkles size={18} /><span>Prototipo interattivo · dati dimostrativi</span></div>
      </aside>

      <section className="app-shell" aria-label="Anteprima dell’app HitHappen">
        <header className="app-header">
          <BrandMark />
          <div className="header-actions">
            <button className="location-pill"><MapPin size={15} /> Milano <span>⌄</span></button>
            <button className="icon-button" aria-label="Notifiche"><Bell size={19} /></button>
          </div>
        </header>

        <div className="app-scroll" id="app-content" tabIndex={-1}>
          {view === "home" && <>
            <section className="feed-intro">
              <div><span className="kicker">Mercoledì, 26 agosto</span><h2>Cosa succede<br /><em>stasera?</em></h2></div>
              <button className="search-button" aria-label="Cerca"><Search size={21} /></button>
            </section>
            <div className="filter-row scrollbar-none" aria-label="Filtra gli eventi">
              {["Per te", "Stasera", "Live", "Aperitivo", "Gratis"].map((filter) => (
                <button
                  type="button"
                  className={activeFilter === filter ? "filter-chip active" : "filter-chip"}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                  key={filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="section-heading"><div><span>SCELTI PER TE</span><strong>In base ai tuoi gusti</strong></div><button onClick={() => setView("map")}>Vedi mappa</button></div>
            <div className="event-list">
              {events.map((event) => <EventCard key={event.id} event={event} saved={savedIds.includes(event.id)} attending={attendingIds.includes(event.id)} onOpen={() => setSelected(event)} onSave={() => toggleSaved(event.id)} onAttend={() => toggleAttending(event.id)} />)}
            </div>
          </>}

          {view === "games" && <section className="games-view">
            <div className="games-heading">
              <span className="kicker">SCEGLI SENZA PENSARCI TROPPO</span>
              <h2>Gioca la tua<br /><em>prossima serata</em></h2>
              <p>Scorri gli eventi: quelli che ti piacciono finiscono automaticamente nei Salvati.</p>
            </div>

            <div className="swipe-game">
              <div className="game-label"><span><Gamepad2 size={15} /> SERATA SWIPE</span><small>{gameIndex + 1} / {events.length}</small></div>
              <div className={`swipe-card ${gameDecision ? `decision-${gameDecision}` : ""}`}>
                <img className="event-photo-treatment" src={events[gameIndex].image} alt={`${events[gameIndex].title} presso ${events[gameIndex].venue}`} width="1024" height="1124" loading="lazy" decoding="async" />
                <span className="event-shade" />
                {gameDecision === "like" && <strong className="decision-stamp like-stamp">SALVATA</strong>}
                {gameDecision === "skip" && <strong className="decision-stamp skip-stamp">PASSO</strong>}
                <div className="swipe-copy">
                  <span>{events[gameIndex].category}</span>
                  <h3>{events[gameIndex].title}</h3>
                  <p><MapPin size={13} /> {events[gameIndex].venue} · {events[gameIndex].distance}</p>
                  <div><b>{events[gameIndex].date} · {events[gameIndex].time}</b><b>{events[gameIndex].price}</b></div>
                </div>
              </div>
              <div className="swipe-actions">
                <button className="skip-action" onClick={() => advanceGame("skip")} aria-label="Passa"><ThumbsDown size={22} /></button>
                <button className="info-action" onClick={() => setSelected(events[gameIndex])}>Dettagli</button>
                <button className="like-action" onClick={() => advanceGame("like")} aria-label="Mi piace"><Heart size={24} fill="currentColor" /></button>
              </div>
            </div>

            <div className="more-games">
              <div className="section-title"><strong>Altri giochi</strong><span>IN ARRIVO</span></div>
              <button className="mini-game random-game">
                <span><Shuffle size={22} /></span>
                <div><strong>Random Night</strong><p>Una serata scelta per te con un solo tap.</p></div>
                <b>›</b>
              </button>
              <button className="mini-game mood-game">
                <span><Sparkles size={22} /></span>
                <div><strong>Mood Match</strong><p>Dimmi come ti senti, troviamo l’atmosfera.</p></div>
                <b>›</b>
              </button>
            </div>
          </section>}

          {view === "map" && <section className="map-view">
            <div className="map-toolbar">
              <button className="map-search"><Search size={17} /><span>Cerca in questa zona</span></button>
              <button className="map-filter" aria-label="Filtra gli eventi sulla mappa"><Sparkles size={17} /></button>
            </div>
            <div className="map-canvas">
              <svg className="map-lines" viewBox="0 0 520 720" preserveAspectRatio="none" aria-hidden="true">
                <path className="map-water" d="M-20 590 C100 520 150 610 280 540 C390 480 450 500 550 430" />
                <path className="road-major" d="M-30 180 C120 120 210 250 550 150" />
                <path className="road-major" d="M70 -20 C120 130 60 280 170 760" />
                <path className="road-major" d="M420 -20 C350 160 460 360 300 760" />
                <path className="road" d="M-20 340 C130 290 240 420 550 330" />
                <path className="road" d="M-20 490 C140 430 310 610 550 540" />
                <path className="road" d="M230 -20 C260 150 190 280 260 760" />
                <path className="road" d="M-20 70 L550 650" />
                <path className="road" d="M500 -20 L-20 690" />
              </svg>
              <span className="area-label label-milano">MILANO</span>
              <span className="area-label label-monza">MONZA</span>
              <span className="area-label label-sesto">SESTO S.G.</span>
              {events.map((event, index) => (
                <button
                  className={`event-pin pin-${index + 1}`}
                  key={event.id}
                  onClick={() => setSelected(event)}
                  aria-label={`Apri ${event.title}`}
                >
                  <span>{event.price}</span>
                  <i />
                </button>
              ))}
              <button className="my-location" aria-label="La mia posizione"><MapPin size={18} /></button>
            </div>
            <div className="map-results">
              <div><span className="kicker">3 EVENTI NELLA ZONA</span><button><RotateCcw size={13} /> Aggiorna</button></div>
              <div className="map-card-row scrollbar-none">
                {events.map((event) => (
                  <button className="map-event-card" key={event.id} onClick={() => setSelected(event)}>
                    <img className="event-photo-treatment" src={event.image} alt={`${event.title} presso ${event.venue}`} width="176" height="156" loading="lazy" decoding="async" />
                    <span><small>{event.date} · {event.distance}</small><strong>{event.title}</strong><b>{event.price}</b></span>
                  </button>
                ))}
              </div>
            </div>
          </section>}

          {view === "saved" && <section className="subview">
            <div className="profile-topline"><button className="text-back" onClick={() => setView("profile")}><ChevronLeft size={18} /> Profilo</button><span className="kicker">LA TUA SELEZIONE</span></div>
            <h2>Eventi salvati</h2>
            <p className="subview-copy">Tieni qui le serate che vuoi decidere più tardi.</p>
            {savedEvents.length ? <div className="compact-grid">
              {savedEvents.map((event) => <EventCard key={event.id} event={event} saved attending={attendingIds.includes(event.id)} onOpen={() => setSelected(event)} onSave={() => toggleSaved(event.id)} onAttend={() => toggleAttending(event.id)} />)}
            </div> : <EmptyState icon={Bookmark} title="Ancora nessun salvato" copy="Tocca il segnalibro su un evento per ritrovarlo qui." />}
          </section>}

          {view === "chats" && !activeChat && <section className="subview">
            <span className="kicker">ORGANIZZATI PRIMA</span><h2>Le tue chat</h2>
            <p className="subview-copy">Solo chi partecipa può leggere e scrivere.</p>
            {attendingEvents.length ? <div className="chat-list">
              {attendingEvents.map((event) => <button className="chat-preview" key={event.id} onClick={() => setActiveChat(event)}>
                <img className="event-photo-treatment" src={event.image} alt={`${event.title} presso ${event.venue}`} width="128" height="128" loading="lazy" decoding="async" /><div><strong>{event.title}</strong><span>{event.date} · {event.attendees + 1} partecipanti</span><p>Elisa: Qualcuno parte da Monza?</p></div><span className="unread">3</span>
              </button>)}
            </div> : <EmptyState icon={MessageCircle} title="Nessuna chat attiva" copy="Seleziona “Partecipo” per entrare nella chat di un evento." />}
          </section>}

          {view === "chats" && activeChat && <section className="chat-room">
            <div className="chat-room-header">
              <button onClick={() => setActiveChat(null)} aria-label="Indietro"><ChevronLeft /></button><img className="event-photo-treatment" src={activeChat.image} alt={`${activeChat.title} presso ${activeChat.venue}`} width="84" height="84" decoding="async" />
              <div><strong>{activeChat.title}</strong><span>{activeChat.attendees + 1} partecipanti</span></div><button aria-label="Altre opzioni"><MoreHorizontal /></button>
            </div>
            <div className="safety-note"><ShieldCheck size={15} /> Chat protetta · segnala o blocca comportamenti inappropriati</div>
            <div className="messages"><span className="day-separator">OGGI</span>
              {messages.map((item, index) => <div className={item.mine ? "message mine" : "message"} key={`${item.author}-${index}`}>
                {!item.mine && <span>{item.author}</span>}<p>{item.text}</p><small>15:{12 + index}</small>
              </div>)}
            </div>
            <div className="message-composer"><input value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => event.key === "Enter" && sendMessage()} placeholder="Scrivi nel gruppo…" aria-label="Messaggio" /><button onClick={sendMessage} aria-label="Invia"><Send size={18} /></button></div>
          </section>}

          {view === "profile" && <section className="subview profile-view">
            <div className="profile-topline">
              <span className="kicker">IL TUO PROFILO</span>
              <div className="profile-actions">
                <button className="saved-profile-button" onClick={() => setView("saved")} aria-label="Eventi salvati">
                  <Bookmark size={18} fill={savedIds.length ? "currentColor" : "none"} /><i>{savedIds.length}</i>
                </button>
                <button aria-label="Altre opzioni"><MoreHorizontal /></button>
              </div>
            </div>
            <div className="profile-hero"><div className="large-avatar">GR<span className="online-dot" /></div><div><h2>Gabriele, 25</h2><p>Busnago · 24 km da Milano</p></div></div>
            <div className="profile-stats"><div><strong>8</strong><span>Eventi</span></div><div><strong>5</strong><span>Interessi</span></div><div><strong>2</strong><span>Prossimi</span></div></div>
            <div className="profile-section"><div className="section-title"><strong>I tuoi interessi</strong><button>Modifica</button></div><div className="interest-list">{["Live music", "Aperitivo", "House", "Degustazioni", "Stand-up"].map((item) => <span key={item}>{item}</span>)}</div></div>
            <div className="profile-section"><div className="section-title"><strong>Social collegati</strong><button>Gestisci</button></div><div className="social-line"><span><AtSign size={18} /> @gabrielerea</span><Check size={17} /></div></div>
            <div className="privacy-line"><span><strong>Mostra i miei prossimi eventi</strong><small>Visibile sul profilo pubblico</small></span><Switch defaultChecked /></div>
            <button className="venue-switch" onClick={() => setView("venue")}><ShieldCheck size={18} /> Passa al profilo locale</button>
          </section>}

          {view === "venue" && <section className="subview venue-view">
            <div className="profile-topline"><button className="text-back" onClick={() => setView("profile")}><ChevronLeft size={18} /> Profilo personale</button><span className="verified-pill"><ShieldCheck size={14} /> VERIFICATO</span></div>
            <div className="venue-hero"><div className="venue-logo">TV</div><div><span className="kicker">PROFILO LOCALE</span><h2>Terrazza Ventuno</h2><p><MapPin size={14} /> Milano, Porta Nuova</p></div></div>
            <div className="venue-stats"><div><span>VISUALIZZAZIONI</span><strong>4.280</strong><small>+18% questo mese</small></div><div><span>PARTECIPAZIONI</span><strong>326</strong><small>3 eventi attivi</small></div></div>
            <div className="section-title venue-title"><strong>I tuoi eventi</strong>
              <Dialog>
                <DialogTrigger asChild><button className="small-add"><Plus size={16} /> Nuovo</button></DialogTrigger>
                <DialogContent className="create-dialog">
                  <DialogHeader><DialogTitle>Crea un evento</DialogTitle><DialogDescription>Anteprima dimostrativa del flusso per locali verificati.</DialogDescription></DialogHeader>
                  <label>Nome evento<input defaultValue="Sunset Social Club #2" /></label>
                  <div className="form-row"><label>Data<input type="date" defaultValue="2026-09-04" /></label><label>Prezzo<input defaultValue="12 €" /></label></div>
                  <label>Categoria<select defaultValue="aperitivo"><option value="aperitivo">Aperitivo · DJ set</option><option value="live">Musica live</option><option value="club">Club</option></select></label>
                  <DialogClose asChild><button className="primary-wide"><Check size={18} /> Salva bozza</button></DialogClose>
                </DialogContent>
              </Dialog>
            </div>
            <button className="venue-event" onClick={() => setSelected(events[0])}><img className="event-photo-treatment" src={events[0].image} alt={`${events[0].title} presso ${events[0].venue}`} width="144" height="144" loading="lazy" decoding="async" /><div><span>VEN 28 AGO · 19:00</span><strong>Sunset Social Club</strong><p>86 partecipanti · 2.140 visualizzazioni</p></div><MoreHorizontal size={18} /></button>
            <div className="venue-tip"><Sparkles size={18} /><div><strong>Porta più persone all’evento</strong><p>Completa descrizione e foto per migliorare la visibilità nel feed.</p></div></div>
          </section>}
        </div>

        <nav className="bottom-nav" aria-label="Navigazione principale">
          {navItems.map(({ id, label, icon: Icon }) => {
            const isActive = view === id || ((view === "venue" || view === "saved") && id === "profile");
            return <button aria-current={isActive ? "page" : undefined} className={`${isActive ? "active" : ""} ${id === "map" ? "map-nav-item" : ""}`} onClick={() => { setView(id); setActiveChat(null); }} key={id}>
              <span className="nav-icon-wrap"><Icon size={id === "map" ? 25 : 21} fill={isActive && id === "home" ? "currentColor" : "none"} /></span>
              <span>{label}</span>{id === "chats" && attendingEvents.length > 0 && <i />}
            </button>;
          })}
        </nav>
      </section>

      <Sheet open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <SheetContent side="bottom" className="event-sheet" showCloseButton={false}>
          {selected && <>
            <SheetHeader className="sr-only"><SheetTitle>{selected.title}</SheetTitle><SheetDescription>{selected.description}</SheetDescription></SheetHeader>
            <div className="sheet-visual"><img className="event-photo-treatment" src={selected.image} alt={`${selected.title} presso ${selected.venue}`} width="1040" height="560" decoding="async" /><span className="event-shade" />
              <button className="sheet-close" onClick={() => setSelected(null)} aria-label="Chiudi"><X size={19} /></button><button className="sheet-share" aria-label="Condividi"><Share2 size={18} /></button>
              <div><span className="event-category">{selected.category}</span><h2>{selected.title}</h2></div>
            </div>
            <div className="sheet-body">
              <div className="event-facts">
                <div><span><CalendarDays size={18} /></span><p><strong>{selected.date}</strong><small>{selected.time}</small></p></div>
                <div><span><MapPin size={18} /></span><p><strong>{selected.venue}</strong><small>{selected.distance} da te</small></p></div>
                <div><span><Ticket size={18} /></span><p><strong>{selected.price}</strong><small>Ingresso</small></p></div>
              </div>
              <p className="event-description">{selected.description}</p>
              <button className="venue-line"><span className="venue-logo small">TV</span><p><strong>{selected.venue}</strong><small><ShieldCheck size={13} /> Locale verificato</small></p><span>›</span></button>
              <div className="participants-block"><div><strong>Chi ci sarà</strong><AvatarStack count={selected.attendees + (attendingIds.includes(selected.id) ? 1 : 0)} /></div><button>Vedi tutti</button></div>
              <div className="sheet-actions">
                <button aria-label={savedIds.includes(selected.id) ? "Rimuovi dai salvati" : "Salva evento"} className={savedIds.includes(selected.id) ? "round-action active" : "round-action"} onClick={() => toggleSaved(selected.id)}><Bookmark size={19} fill={savedIds.includes(selected.id) ? "currentColor" : "none"} /></button>
                <button className="primary-wide" onClick={() => toggleAttending(selected.id)}>{attendingIds.includes(selected.id) ? <><Check size={18} /> Partecipi · Apri la chat</> : <><UsersRound size={18} /> Partecipo</>}</button>
              </div>
              {attendingIds.includes(selected.id) && <button className="open-chat" onClick={() => { setSelected(null); setView("chats"); setActiveChat(selected); }}><MessageCircle size={18} /> Entra nella chat dell’evento <span>›</span></button>}
            </div>
          </>}
        </SheetContent>
      </Sheet>
    </main>
  );
}
