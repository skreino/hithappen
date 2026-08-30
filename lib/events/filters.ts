import type { EventCategory, EventItem } from "@/data/mock-events";
import { isThisWeekend, isToday, isTomorrow, isUpcoming } from "@/lib/events/date";

export type TimeFilter = "all" | "tonight" | "tomorrow" | "weekend";
export type EventFilters = { time: TimeFilter; maxDistance: number; category: EventCategory | "Tutte"; maxPrice: number | null };

export const defaultFilters: EventFilters = { time:"all", maxDistance:20, category:"Tutte", maxPrice:null };

export function filterEvents(events: EventItem[], filters: EventFilters, now = new Date()) {
  return events.filter((event) => {
    if (!isUpcoming(event.endAt, now)) return false;
    if (filters.time === "tonight" && !isToday(event.startAt, now)) return false;
    if (filters.time === "tomorrow" && !isTomorrow(event.startAt, now)) return false;
    if (filters.time === "weekend" && !isThisWeekend(event.startAt, now)) return false;
    if (event.distanceKm > filters.maxDistance) return false;
    if (filters.category !== "Tutte" && event.category !== filters.category) return false;
    if (filters.maxPrice !== null && event.price > filters.maxPrice) return false;
    return true;
  });
}
export function searchEvents(events: EventItem[], query: string) {
  const normalized = query.trim().toLocaleLowerCase("it");
  if (!normalized) return events;
  return events.filter((event) => [event.title,event.venue,event.category,event.neighborhood,...event.tags].some((value) => value.toLocaleLowerCase("it").includes(normalized)));
}
