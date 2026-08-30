/* eslint-disable @next/next/no-img-element -- Remote editorial photography is intentionally served by the source CDN. */
import { CaretRight } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { EventMetadata, formatPrice } from "./event-metadata";

export function CompactEventRow({ event, onOpen }: { event: EventItem; onOpen: () => void }) {
  return <button type="button" className="compact-event" onClick={onOpen}><img src={event.image} alt="" /><span><strong>{event.title}</strong><EventMetadata event={event} compact /><b>{formatPrice(event)}</b></span><CaretRight size={18} /></button>;
}
