import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const blocks = [css.slice(0, css.indexOf(":root[data-theme=")), css.slice(css.indexOf(":root[data-theme="), css.indexOf("* { box-sizing"))];
const palettes = blocks.map(block => Object.fromEntries([...block.matchAll(/--color-([\w-]+):\s*(#[\da-f]{6});/gi)].map(([, key, value]) => [key, value])));
function luminance(hex) {
  const channels = hex.slice(1).match(/../g).map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return channels[0] * .2126 + channels[1] * .7152 + channels[2] * .0722;
}
function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + .05) / (dark + .05);
}
test("approved charcoal and neutral light backgrounds", () => {
  assert.deepEqual(palettes.map(tokens => tokens.bg), ["#101112", "#f5f5f3"]);
});
test("both themes retain AA text and primary control contrast", () => {
  for (const tokens of palettes) {
  for (const surface of ["bg", "surface", "surface-2"]) {
    for (const foreground of ["text", "text-secondary", "accent"]) {
      assert.ok(contrast(tokens[foreground], tokens[surface]) >= 4.5, `${foreground} on ${surface}`);
    }
  }
  assert.ok(contrast(tokens.bg, tokens.accent) >= 4.5, "Primary button label");
  }
});
