import { MusicNote } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";

export function EventPin({ event, index, selected, onSelect }: { event: EventItem; index: number; selected: boolean; onSelect: () => void }) {
  const positions = [[27,31],[64,25],[48,49],[75,59],[31,68],[57,77]];
  const [left,top] = positions[index % positions.length];
  return <button type="button" className={`event-pin ${selected ? "is-selected" : ""} ${index % 2 ? "is-lilac" : ""}`} style={{ left:`${left}%`, top:`${top}%` }} onClick={onSelect} aria-label={`${event.title}, ${event.neighborhood}`}>{event.category.includes("Musica") || event.category === "Elettronica" ? <MusicNote size={17} weight="bold" /> : <span>{event.price === 0 ? "Gratis" : `${event.price}€`}</span>}</button>;
}
