"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, MusicNote, SlidersHorizontal } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { MapEventPreview } from "@/components/map/map-event-preview";
import { AppIconButton } from "@/components/ui/app-icon-button";

type MapMode = "all" | "music";
type Location = { latitude: number; longitude: number };

export function MapView({ events, selected, onSelect, onOpen, onFilters }: { events: EventItem[]; selected: EventItem; onSelect: (event: EventItem) => void; onOpen: (event: EventItem) => void; onFilters: () => void }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<MapMode>("all");
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const visibleEvents = useMemo(() => mode === "music" ? events.filter((event) => ["Musica live", "Elettronica", "Club"].includes(event.category)) : events, [events, mode]);
  const activeEvent = visibleEvents.find((event) => event.id === selected.id) ?? visibleEvents[0];

  useEffect(() => {
    if (activeEvent && activeEvent.id !== selected.id) onSelect(activeEvent);
  }, [activeEvent, onSelect, selected.id]);

  useEffect(() => { railRef.current?.querySelector<HTMLElement>("[aria-pressed=\"true\"]")?.scrollIntoView({ block: "nearest", inline: "nearest" }); }, [activeEvent?.id]);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocationMessage("Posizione non disponibile su questo dispositivo.");
      return;
    }
    setLocationMessage("Cerco la tua posizione...");
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      setLocationMessage("Posizione trovata.");
    }, (error) => setLocationMessage(error.code === 1 ? "Posizione negata. Puoi abilitarla nelle impostazioni del browser o usare la lista." : error.code === 3 ? "Ricerca della posizione scaduta. Riprova o usa la lista." : "Posizione non disponibile. Puoi continuare dalla lista."), { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
  };

  if (!activeEvent) return <main className="map-view"><div className="map-empty"><strong>Nessun evento sulla mappa.</strong><button type="button" onClick={onFilters}>Modifica i filtri</button>{mode !== "all" && <button onClick={() => setMode("all")}>Mostra tutte le categorie</button>}</div></main>;

  return <main className="map-view">
    <div className="map-canvas-region"><EventMap events={visibleEvents} selectedId={activeEvent.id} onSelect={onSelect} userLocation={userLocation} />

    <div className="map-toolbar"><button type="button" className={`map-filter ${mode === "all" ? "is-active" : ""}`} onClick={() => setMode("all")}>Tutti</button><button type="button" className={`map-filter ${mode === "music" ? "is-active" : ""}`} onClick={() => setMode("music")}><MusicNote size={17} />Musica</button><button type="button" className="map-filter" onClick={onFilters}><SlidersHorizontal size={17} />Filtri</button></div>
    <AppIconButton icon={Crosshair} label="Centra sulla mia posizione" className="locate-control" onClick={locate} /><p className="location-status" aria-live="polite">{locationMessage}</p></div>
    <div ref={railRef} className="map-event-rail" aria-label={`${visibleEvents.length} eventi sulla mappa`}>{visibleEvents.map((event) => <button type="button" key={event.id} className={event.id === activeEvent.id ? "is-active" : ""} aria-pressed={event.id === activeEvent.id} onClick={() => onSelect(event)}><strong>{event.title}</strong><small>{event.neighborhood}, {event.distanceKm.toLocaleString("it-IT")} km</small></button>)}</div>
    <MapEventPreview event={activeEvent} onOpen={() => onOpen(activeEvent)} />
  </main>;
}
