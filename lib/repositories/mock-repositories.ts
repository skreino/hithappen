import { mockEvents, type EventItem } from "@/data/mock-events";
import type { Conversation, DeviceState } from "@/lib/events/device-state";

const delay = () => new Promise<void>(resolve => queueMicrotask(resolve));
let eventCache: EventItem[] | null = null;

export const eventRepository = {
  async list(): Promise<EventItem[]> {
    if (eventCache) return eventCache;
    await delay();
    eventCache = mockEvents.map(event => ({ ...event, tags: [...event.tags] }));
    return eventCache;
  },
  async byId(id: string): Promise<EventItem | undefined> {
    return (await this.list()).find(event => event.id === id);
  },
};

export const socialRepository = {
  async conversations(state: DeviceState): Promise<Conversation[]> {
    await delay();
    return state.conversations;
  },
};
