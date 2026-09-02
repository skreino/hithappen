import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const tokens = Object.fromEntries([...css.matchAll(/--color-([\w-]+):\s*(#[\da-f]{6});/gi)].map(([, key, value]) => [key, value]));
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + .05) / (dark + .05);
}
test("requested palette is retained exactly", () => {
  assert.deepEqual([tokens.burgundy, tokens.gold, tokens.amber, tokens.orange, tokens.red], ["#780116", "#f7b538", "#db7c26", "#d8572a", "#c32f27"]);
});
test("warm theme text and primary controls retain AA contrast", () => {
  for (const surface of ["bg", "surface", "surface-2"]) {
    for (const foreground of ["text", "text-secondary", "gold"]) {
      assert.ok(contrast(tokens[foreground], tokens[surface]) >= 4.5, `${foreground} on ${surface}`);
    }
  }
  assert.ok(contrast(tokens.bg, tokens.gold) >= 4.5, "Primary button label");
});
