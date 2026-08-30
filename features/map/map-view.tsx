import { Crosshair, SlidersHorizontal } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMap } from "@/components/map/event-map";
import { MapEventPreview } from "@/components/map/map-event-preview";
import { AppIconButton } from "@/components/ui/app-icon-button";

export function MapView({ events, selected, onSelect, onOpen, onFilters }: { events: EventItem[]; selected: EventItem; onSelect: (event: EventItem) => void; onOpen: (event: EventItem) => void; onFilters: () => void }) {
  return <main className="map-view"><EventMap events={events} selectedId={selected.id} onSelect={onSelect} /><div className="map-toolbar"><button type="button" className="map-filter" onClick={onFilters}><SlidersHorizontal size={18} />Filtri</button><button type="button" className="map-filter">Stasera</button><button type="button" className="map-filter">Entro 5 km</button></div><AppIconButton icon={Crosshair} label="Centra sulla mia posizione" className="locate-control" /><MapEventPreview event={selected} onOpen={() => onOpen(selected)} /></main>;
}
