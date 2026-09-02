import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({ appType: "custom", configFile: false, root, resolve: { alias: { "@": root } }, server: { middlewareMode: true } });
after(() => vite.close());
const { deviceReducer, initialDeviceState, restoreDeviceState, rankEvents } = await vite.ssrLoadModule("/lib/events/device-state.ts");
const { mockEvents } = await vite.ssrLoadModule("/data/mock-events.ts");
const { filterEvents, searchEvents, defaultFilters } = await vite.ssrLoadModule("/lib/events/filters.ts");
const { isToday } = await vite.ssrLoadModule("/lib/events/date.ts");
const ids = mockEvents.map(event => event.id);
test("like persists to saved and survives serialization with progress", () => {
  const state = deviceReducer(initialDeviceState, { type: "choose", id: ids[0], kind: "like" });
  assert.ok(state.saved.includes(ids[0]));
  assert.equal(state.history.length, 1);
  assert.deepEqual(restoreDeviceState(JSON.stringify(state), ids), state);
});
test("pass does not remove existing saves; undo preserves a pre-existing save", () => {
  const state = deviceReducer(initialDeviceState, { type: "choose", id: "biko-live", kind: "like" });
  assert.deepEqual(deviceReducer(state, { type: "undo" }), initialDeviceState);
  const passed = deviceReducer(initialDeviceState, { type: "choose", id: "biko-live", kind: "pass" });
  assert.ok(passed.saved.includes("biko-live"));
});
test("undo removes only a save introduced by the last choice", () => {
  const state = deviceReducer(initialDeviceState, { type: "choose", id: ids[0], kind: "like" });
  assert.deepEqual(deviceReducer(state, { type: "undo" }), initialDeviceState);
});
test("complete deck is finite, duplicate actions ignored, restart retains favorites", () => {
  let state = initialDeviceState;
  ids.forEach((id, index) => { state = deviceReducer(state, { type: "choose", id, kind: index % 2 ? "pass" : "like" }); });
  assert.equal(state.history.length, ids.length);
  assert.equal(deviceReducer(state, { type: "choose", id: ids[0], kind: "like" }), state);
  const restart = deviceReducer(state, { type: "restart" });
  assert.equal(restart.history.length, 0);
  assert.deepEqual(restart.saved, state.saved);
});
test("corrupt, unknown-version and stale storage is safely normalized", () => {
  assert.deepEqual(restoreDeviceState("oops", ids), initialDeviceState);
  assert.deepEqual(restoreDeviceState('{"version":2}', ids), initialDeviceState);
  const restored = restoreDeviceState(JSON.stringify({version:1,saved:[ids[0],ids[0],"missing",42],history:[null,{id:"missing",kind:"like",addedSave:true}]}), ids);
  assert.deepEqual(restored.saved, [ids[0]]);
  assert.deepEqual(restored.history, []);
});
test("ranking is deterministic and Home recommendations do not duplicate the carousel", () => {
  const original = [...mockEvents];
  const ranked = rankEvents(mockEvents);
  assert.deepEqual(rankEvents(mockEvents), ranked);
  assert.deepEqual(mockEvents, original);
  const featured = ranked.filter(event => isToday(event.startAt)).slice(0,3);
  const remaining = ranked.filter(event => !featured.includes(event)).slice(0,3);
  assert.equal(featured.length, 3);
  assert.equal(remaining.length, 3);
  assert.equal(new Set([...featured,...remaining].map(event => event.id)).size, 6);
});
test("catalog filters combine time, distance, price and category; search narrows the result", () => {
  const results = filterEvents(mockEvents, {...defaultFilters,time:"tonight",maxDistance:3,maxPrice:15});
  assert.ok(results.length > 0);
  assert.ok(results.every(event => isToday(event.startAt) && event.price <= 15 && event.distanceKm <= 3));
  assert.equal(searchEvents(results, "biko")[0].id, "biko-live");
  assert.equal(filterEvents(mockEvents, {...defaultFilters,maxDistance:1}).length,0);
});
