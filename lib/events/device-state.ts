import type { EventItem } from "@/data/mock-events";

export const STORAGE_KEY = "hithappen:personal:v2";
export const LEGACY_STORAGE_KEY = "hithappen:personal:v1";
export type Choice = { id: string; kind: "like" | "pass"; addedSave: boolean };
export type City = "Milano" | "Monza";
export type LocationConsent = "unknown" | "granted" | "denied" | "unavailable" | "timeout";
export type UserProfile = { name: string; avatar: string; bio: string; city: City; interests: string[] };
export type Attendance = { eventId: string; joinedAt: string };
export type GroupMembership = { eventId: string; joinedAt: string; profileVisible: boolean };
export type ConnectionRequest = { id: string; participantId: string; status: "pending" | "accepted" };
export type Message = { id: string; sender: "me" | "other"; body: string; sentAt: string };
export type Conversation = { id: string; kind: "group" | "direct"; eventId?: string; participantId?: string; title: string; unread: number; acceptedDemo?: boolean; messages: Message[] };
export type NotificationPreferences = { eventReminders: boolean; groupMessages: boolean; recommendations: boolean };
export type PrivacyPreferences = { showBio: boolean; showInterests: boolean; allowRequests: boolean };
export type OnboardingState = { completed: boolean; step: number; locationConsent: LocationConsent };
export type DeviceState = { version: 2; saved: string[]; history: Choice[]; profile: UserProfile; onboarding: OnboardingState; attendance: Attendance[]; groups: GroupMembership[]; connectionRequests: ConnectionRequest[]; conversations: Conversation[]; notifications: NotificationPreferences; privacy: PrivacyPreferences };

const demoTime = "2026-09-03T16:45:00.000Z";
export const initialDeviceState: DeviceState = {
  version: 2,
  saved: ["biko-live"], history: [],
  profile: { name: "Gabriele", avatar: "/events/rooftop.png", bio: "Musica live, posti nuovi e serate senza troppi programmi.", city: "Milano", interests: [] },
  onboarding: { completed: false, step: 0, locationConsent: "unknown" },
  attendance: [], groups: [],
  connectionRequests: [{ id: "request-sara", participantId: "sara", status: "pending" }],
  conversations: [{ id: "dm-luca", kind: "direct", participantId: "luca", title: "Luca", unread: 0, acceptedDemo: true, messages: [{ id: "luca-1", sender: "other", body: "Qualcuno per un taxi dopo?", sentAt: demoTime }] }],
  notifications: { eventReminders: true, groupMessages: true, recommendations: false },
  privacy: { showBio: true, showInterests: true, allowRequests: true },
};

export type DeviceAction =
  | { type: "save"; id: string } | { type: "choose"; id: string; kind: Choice["kind"] } | { type: "undo" } | { type: "restart" }
  | { type: "complete-onboarding"; profile: Pick<UserProfile, "city" | "interests">; locationConsent: LocationConsent } | { type: "reopen-onboarding" }
  | { type: "attend"; eventId: string } | { type: "join-group"; eventId: string; title: string } | { type: "leave-group"; eventId: string }
  | { type: "update-profile"; profile: Partial<UserProfile> } | { type: "update-notifications"; value: Partial<NotificationPreferences> } | { type: "update-privacy"; value: Partial<PrivacyPreferences> }
  | { type: "read-conversation"; id: string } | { type: "send-message"; conversationId: string; body: string } | { type: "reset-demo" };

const isoNow = () => new Date().toISOString();
export function deviceReducer(state: DeviceState, action: DeviceAction): DeviceState {
  if (action.type === "save") return { ...state, saved: state.saved.includes(action.id) ? state.saved.filter(id => id !== action.id) : [...state.saved, action.id] };
  if (action.type === "restart") return { ...state, history: [] };
  if (action.type === "undo") { const last = state.history.at(-1); return last ? { ...state, history: state.history.slice(0, -1), saved: last.addedSave ? state.saved.filter(id => id !== last.id) : state.saved } : state; }
  if (action.type === "choose") { if (state.history.some(choice => choice.id === action.id)) return state; const addedSave = action.kind === "like" && !state.saved.includes(action.id); return { ...state, saved: addedSave ? [...state.saved, action.id] : state.saved, history: [...state.history, { id: action.id, kind: action.kind, addedSave }] }; }
  if (action.type === "complete-onboarding") return { ...state, profile: { ...state.profile, ...action.profile }, onboarding: { completed: true, step: 3, locationConsent: action.locationConsent } };
  if (action.type === "reopen-onboarding") return { ...state, onboarding: { ...state.onboarding, completed: false, step: 0 } };
  if (action.type === "attend") { const active = state.attendance.some(item => item.eventId === action.eventId); return { ...state, attendance: active ? state.attendance.filter(item => item.eventId !== action.eventId) : [...state.attendance, { eventId: action.eventId, joinedAt: isoNow() }], groups: active ? state.groups.filter(item => item.eventId !== action.eventId) : state.groups, conversations: active ? state.conversations.filter(item => item.eventId !== action.eventId) : state.conversations }; }
  if (action.type === "join-group") { if (!state.attendance.some(item => item.eventId === action.eventId) || state.groups.some(item => item.eventId === action.eventId)) return state; return { ...state, groups: [...state.groups, { eventId: action.eventId, joinedAt: isoNow(), profileVisible: true }], conversations: [{ id: `group-${action.eventId}`, kind: "group", eventId: action.eventId, title: action.title, unread: 3, messages: [{ id: `${action.eventId}-1`, sender: "other", body: "Ci vediamo alle 19:00!", sentAt: demoTime }] }, ...state.conversations] }; }
  if (action.type === "leave-group") return { ...state, groups: state.groups.filter(item => item.eventId !== action.eventId), conversations: state.conversations.filter(item => item.eventId !== action.eventId) };
  if (action.type === "update-profile") return { ...state, profile: { ...state.profile, ...action.profile } };
  if (action.type === "update-notifications") return { ...state, notifications: { ...state.notifications, ...action.value } };
  if (action.type === "update-privacy") return { ...state, privacy: { ...state.privacy, ...action.value } };
  if (action.type === "read-conversation") return { ...state, conversations: state.conversations.map(item => item.id === action.id ? { ...item, unread: 0 } : item) };
  if (action.type === "send-message") { const body = action.body.trim(); return body ? { ...state, conversations: state.conversations.map(item => item.id === action.conversationId ? { ...item, messages: [...item.messages, { id: `${item.id}-${Date.now()}`, sender: "me", body, sentAt: isoNow() }] } : item) } : state; }
  return { ...initialDeviceState };
}

function sanitizeChoices(value: unknown, validIds: string[]) {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.filter((choice): choice is Choice => { if (!choice || typeof choice !== "object") return false; const item = choice as Choice; if (!validIds.includes(item.id) || seen.has(item.id) || !["like", "pass"].includes(item.kind) || typeof item.addedSave !== "boolean") return false; seen.add(item.id); return true; });
}
export function restoreDeviceState(raw: string | null, validIds: string[], legacyRaw?: string | null): DeviceState {
  try {
    const parsed = JSON.parse(raw ?? "null");
    if (parsed?.version === 2) {
      if (!Array.isArray(parsed.saved) || !Array.isArray(parsed.history)) return initialDeviceState;
      return { ...initialDeviceState, ...parsed, version: 2, saved: [...new Set<string>(parsed.saved.filter((id: unknown) => typeof id === "string" && validIds.includes(id)))], history: sanitizeChoices(parsed.history, validIds), profile: { ...initialDeviceState.profile, ...(parsed.profile ?? {}) }, onboarding: { ...initialDeviceState.onboarding, ...(parsed.onboarding ?? {}) }, notifications: { ...initialDeviceState.notifications, ...(parsed.notifications ?? {}) }, privacy: { ...initialDeviceState.privacy, ...(parsed.privacy ?? {}) } };
    }
    const legacy = parsed?.version === 1 ? parsed : JSON.parse(legacyRaw ?? "null");
    if (legacy?.version === 1) return { ...initialDeviceState, saved: [...new Set<string>((legacy.saved ?? []).filter((id: unknown) => typeof id === "string" && validIds.includes(id)))], history: sanitizeChoices(legacy.history, validIds), onboarding: { completed: true, step: 3, locationConsent: "unknown" } };
  } catch { /* Use safe defaults. */ }
  return initialDeviceState;
}
export function rankEvents(events: EventItem[], interests: string[] = []) { const score = (event: EventItem) => event.attendeeCount / 20 - event.distanceKm + event.tags.filter(tag => interests.includes(tag)).length * 2; return [...events].sort((a, b) => score(b) - score(a) || a.id.localeCompare(b.id)); }
