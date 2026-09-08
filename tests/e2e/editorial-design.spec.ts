import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => {
    if (!localStorage.getItem("hithappen:personal:v2")) localStorage.setItem("hithappen:personal:v2", JSON.stringify({ version: 2, saved: [], history: [], onboarding: { completed: true, step: 3, locationConsent: "unknown" } }));
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "La notte è ancora tua." })).toBeVisible();
});

test("Home shows two complete photos and every carousel position is reachable", async ({ page }, info) => {
  const rail = (await page.locator(".hero-carousel").boundingBox())!;
  for (const card of await page.locator(".night-card").all().then(cards => cards.slice(0, 2))) {
    const box = (await card.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(rail.x);
    expect(box.x + box.width).toBeLessThanOrEqual(rail.x + rail.width + 1);
  }
  const images = await page.locator(".night-card img, .home-picks img").evaluateAll(elements => elements.map(element => (element as HTMLImageElement).src));
  expect(new Set(images).size).toBe(images.length);
  await page.screenshot({ path: info.outputPath("home.png"), fullPage: true, animations: "disabled" });
  for (const dot of await page.locator(".carousel-dots button").all()) {
    await dot.click();
    await expect(dot).toHaveAttribute("aria-pressed", "true");
  }
});

test("all 16 Match events have distinct photos and unobstructed actions", async ({ page }, info) => {
  await page.getByRole("button", { name: "Match", exact: true }).click();
  const sources = new Set<string>();
  for (let index = 0; index < 16; index++) {
    await expect(page.locator(".match-position > span")).toHaveText(`${index + 1} / 16`);
    await expect(page.locator(".swipe-stamp--hit")).toHaveCSS("opacity", "0");
    const photo = page.locator(".match-photo");
    const photoBounds = (await photo.boundingBox())!;
    const infoBounds = (await page.locator(".swipe-card__copy").boundingBox())!;
    expect(infoBounds.y).toBeGreaterThanOrEqual(photoBounds.y + photoBounds.height);
    sources.add((await photo.locator("img").getAttribute("src"))!);
    const nav = (await page.getByRole("navigation").boundingBox())!;
    for (const name of ["Passa", "Mi interessa", "Dettagli"]) {
      const box = (await page.getByRole("button", { name, exact: true }).boundingBox())!;
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
      expect(box.y + box.height).toBeLessThanOrEqual(nav.y - 4);
    }
    if (index === 0) await page.screenshot({ path: info.outputPath("match.png"), animations: "disabled" });
    await page.getByRole("button", { name: "Passa", exact: true }).click();
  }
  expect(sources.size).toBe(16);
  await expect(page.getByRole("heading", { name: "Nessuna scintilla, per ora." })).toBeVisible();
});
