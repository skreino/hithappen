import { MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";

export function EventPin({ event, index, selected, onSelect }: { event: EventItem; index: number; selected: boolean; onSelect: () => void }) {
  const positions = [[27,31],[64,25],[48,49],[75,59],[31,68],[57,77]];
  const [left,top] = positions[index % positions.length];
  return <button type="button" className={`event-pin ${selected ? "is-selected" : ""}`} style={{ left:`${left}%`, top:`${top}%` }} onClick={onSelect} aria-label={`${event.title}, ${event.neighborhood}`}><MapPin size={18} weight="fill" /><span>{event.price === 0 ? "Free" : `${event.price}€`}</span></button>;
}
