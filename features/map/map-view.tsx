"use client";
import { useLocale } from "@/lib/i18n/locale-provider";

import { useEffect, useMemo, useState } from "react";
import { Crosshair, MusicNote, SlidersHorizontal } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { MapEventPreview } from "@/components/map/map-event-preview";
import { AppIconButton } from "@/components/ui/app-icon-button";

type MapMode = "all" | "music";
type Location = { latitude: number; longitude: number };

export function MapView({ events, selected, onSelect, onOpen, onFilters }: { events: EventItem[]; selected: EventItem; onSelect: (event: EventItem) => void; onOpen: (event: EventItem) => void; onFilters: () => void }) {
  const { t, language } = useLocale();
  const [mode, setMode] = useState<MapMode>("all");
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationMessage, setLocationMessage] = useState("");
  const visibleEvents = useMemo(() => mode === "music" ? events.filter((event) => ["Musica live", "Elettronica", "Club"].includes(event.category)) : events, [events, mode]);
  const activeEvent = visibleEvents.find((event) => event.id === selected.id) ?? visibleEvents[0];

  useEffect(() => {
    if (activeEvent && activeEvent.id !== selected.id) onSelect(activeEvent);
  }, [activeEvent, onSelect, selected.id]);


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

  if (!activeEvent) return <main className="map-view"><div className="map-empty"><strong>{t("Nessun evento sulla mappa.")}</strong><button type="button" onClick={onFilters}>{t("Modifica i filtri")}</button>{mode !== "all" && <button onClick={() => setMode("all")}>{t("Mostra tutte le categorie")}</button>}</div></main>;

  return <main className="map-view">
    <div className="map-canvas-region"><EventMap key={language} events={visibleEvents} selectedId={activeEvent.id} onSelect={onSelect} userLocation={userLocation} />

    <div className="map-toolbar"><button type="button" className={`map-filter ${mode === "all" ? "is-active" : ""}`} onClick={() => setMode("all")}>{t("Tutti")}</button><button type="button" className={`map-filter ${mode === "music" ? "is-active" : ""}`} onClick={() => setMode("music")}><MusicNote size={17} />{t("Musica")}</button><button type="button" className="map-filter" onClick={onFilters}><SlidersHorizontal size={17} />{t("Filtri")}</button></div>
    <AppIconButton icon={Crosshair} label={t("Centra sulla mia posizione")} className="locate-control" onClick={locate} /><p className="location-status" aria-live="polite">{t(locationMessage)}</p></div>

    <MapEventPreview event={activeEvent} onOpen={() => onOpen(activeEvent)} />
    <details className="map-event-list"><summary>{t("Lista eventi")} · {visibleEvents.length}</summary><div className="map-event-options" aria-label={t("Lista eventi")}>{visibleEvents.map(event => <button type="button" key={event.id} aria-pressed={event.id === activeEvent.id} onClick={() => onSelect(event)}><strong>{t(event.title)}</strong><small>{event.neighborhood} · {event.distanceKm.toLocaleString(language === "en" ? "en-GB" : "it-IT")} km</small></button>)}</div></details>
  </main>;
}
