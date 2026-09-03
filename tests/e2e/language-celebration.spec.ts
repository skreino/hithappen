import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".app-shell")).toHaveAttribute("data-ready", "true");
});

test("English covers search, filters and profile, persists, and keeps Match choices", async ({ page }) => {
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Indie live at Biko", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Discover", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Good times, close by." })).toBeVisible();
  await page.getByRole("button", { name: "Explore all", exact: true }).click();
  await page.getByRole("searchbox").fill("vinyl");
  await expect(page.locator(".catalogue-view .compact-event")).toHaveCount(1);
  await expect(page.locator(".catalogue-view")).toContainText("Vinyl & cocktails");
  await page.getByRole("button", { name: "Clear search" }).click();
  await page.getByRole("button", { name: "Filters", exact: true }).click();
  await page.getByRole("button", { name: "Free", exact: true }).click();
  await page.getByRole("button", { name: /Show \d+ events/ }).click();
  const prices = await page.locator(".catalogue-view .compact-event b").allTextContents();
  expect(prices.length).toBeGreaterThan(0);
  expect(prices.every(price => price === "Free")).toBeTruthy();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page.getByRole("button", { name: "Profile", exact: true }).click();
  await expect(page.getByRole("heading", { name: /Your saved events/ })).toBeVisible();
  await expect(page.locator(".profile-view")).toContainText("Rooftop at sunset");
  await page.getByRole("button", { name: "Italiano", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "it");
  await expect(page.getByRole("button", { name: "Italiano", exact: true })).toHaveAttribute("aria-pressed", "true");
});

test("map markers survive language changes and music filtering", async ({ page }) => {
  await page.getByRole("button", { name: "Mappa", exact: true }).click();
  await expect(page.locator(".leaflet-event-icon")).toHaveCount(12);
  await expect(page.locator(".map-event-list")).not.toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator(".leaflet-event-icon")).toHaveCount(12);
  await page.getByRole("button", { name: "Music", exact: true }).click();
  await expect(page.locator(".leaflet-event-icon")).toHaveCount(5);
  await expect(page.locator(".map-preview")).toContainText("Indie live at Biko");
  await page.locator(".map-event-list summary").click();
  await expect(page.locator(".map-event-options button")).toHaveCount(5);
  await page.getByRole("button", { name: "Passa a Italiano" }).click();
  await expect(page.locator(".leaflet-event-icon")).toHaveCount(5);
  await expect(page.locator(".map-preview")).toContainText("Live indie al Biko");
});

test("Match gives distinct animations for interested and skipped choices", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".celebration__message")).toContainText("Rooftop al tramonto");
  await expect(page.locator(".celebration__particles i")).toHaveCount(18);
  await expect(page.locator(".celebration")).toHaveCSS("pointer-events", "none");
  await page.getByRole("button", { name: "Annulla ultima scelta" }).click();
  await expect(page.locator(".celebration")).toHaveCount(0);
  await page.getByRole("button", { name: "Passa", exact: true }).click();
  await expect(page.locator(".celebration--pass .celebration__message")).toContainText("Serata passata");
  await expect(page.locator(".celebration__pass-lines i")).toHaveCount(3);
  await expect(page.locator(".celebration__particles")).toHaveCount(0);
  for (let i = 0; i < 10; i++) await page.getByRole("button", { name: "Passa", exact: true }).click();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".match-summary .celebration__message")).toContainText("Serata salvata");
  await page.getByRole("button", { name: "Annulla ultima", exact: true }).click();
  await expect(page.locator(".celebration")).toHaveCount(0);
});

test("detail participation celebrates without pretending to book", async ({ page }) => {
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Dettagli", exact: true }).click();
  await page.getByRole("button", { name: "Partecipo", exact: true }).click();
  await expect(page.locator(".celebration__message")).toContainText("Ci sei, in modalità demo");
  await page.getByRole("button", { name: "Partecipi", exact: true }).click();
  await expect(page.locator(".celebration")).toHaveCount(0);
});
