import type { EventItem } from "@/data/mock-events";
export const STORAGE_KEY = "hithappen:personal:v1";
export type Choice = { id: string; kind: "like" | "pass"; addedSave: boolean };
export type DeviceState = { version: 1; saved: string[]; history: Choice[] };
export const initialDeviceState: DeviceState = { version: 1, saved: ["biko-live"], history: [] };
export type DeviceAction = { type: "save"; id: string } | { type: "choose"; id: string; kind: Choice["kind"] } | { type: "undo" } | { type: "restart" };
export function deviceReducer(state: DeviceState, action: DeviceAction): DeviceState {
  if (action.type === "save") return { ...state, saved: state.saved.includes(action.id) ? state.saved.filter(id => id !== action.id) : [...state.saved, action.id] };
  if (action.type === "restart") return { ...state, history: [] };
  if (action.type === "undo") {
    const last = state.history.at(-1);
    return last ? { ...state, history: state.history.slice(0, -1), saved: last.addedSave ? state.saved.filter(id => id !== last.id) : state.saved } : state;
  }
  if (state.history.some(choice => choice.id === action.id)) return state;
  const addedSave = action.kind === "like" && !state.saved.includes(action.id);
  return { ...state, saved: addedSave ? [...state.saved, action.id] : state.saved, history: [...state.history, { id: action.id, kind: action.kind, addedSave }] };
}
export function restoreDeviceState(raw: string | null, validIds: string[]): DeviceState {
  try {
    const parsed = JSON.parse(raw ?? "null");
    if (parsed?.version !== 1 || !Array.isArray(parsed.saved) || !Array.isArray(parsed.history)) return initialDeviceState;
    const saved = [...new Set<string>(parsed.saved.filter((id: unknown) => typeof id === "string" && validIds.includes(id)))];
    const seen = new Set<string>();
    const history: Choice[] = parsed.history.filter((choice: Choice) => {
      if (!choice || !validIds.includes(choice.id) || seen.has(choice.id) || !["like", "pass"].includes(choice.kind) || typeof choice.addedSave !== "boolean") return false;
      seen.add(choice.id); return true;
    });
    return { version: 1, saved, history };
  } catch { return initialDeviceState; }
}
/** Demo ranking balances proximity and reported interest without mutating source data. */
export function rankEvents(events: EventItem[]) {
  return [...events].sort((a, b) => (b.attendeeCount / 20 - b.distanceKm) - (a.attendeeCount / 20 - a.distanceKm) || a.id.localeCompare(b.id));
}
