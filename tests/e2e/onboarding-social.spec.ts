import { expect, test } from "@playwright/test";

test("onboarding supports manual city and interest selection", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "La serata giusta, senza perderci la serata." })).toBeVisible();
  await page.getByRole("button", { name: "Continua" }).click();
  await page.getByRole("button", { name: "Continua" }).click();
  await page.getByRole("button", { name: "Continua" }).click();
  await page.getByRole("button", { name: "Monza", exact: true }).click();
  for (const interest of ["Musica live", "Aperitivo", "Outdoor"]) await page.getByRole("button", { name: interest, exact: true }).click();
  await page.getByRole("button", { name: "Inizia" }).click();
  await expect(page.getByText("Monza", { exact: true })).toBeVisible();
});

test("attendance and group consent are separate and local chat persists", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("hithappen:personal:v2", JSON.stringify({ version: 2, saved: ["biko-live"], history: [], onboarding: { completed: true, step: 3, locationConsent: "unknown" } })));
  await page.goto("/");
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Dettagli", exact: true }).click();
  await expect(page.getByRole("button", { name: "Entra nel gruppo", exact: true })).toBeDisabled();
  await page.getByRole("button", { name: "Partecipo", exact: true }).click();
  await expect(page.getByRole("button", { name: "Entra nel gruppo", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "Entra nel gruppo", exact: true }).click();
  await page.getByRole("button", { name: "Indietro", exact: true }).click();
  await page.getByRole("button", { name: "Inbox", exact: true }).click();
  await page.getByRole("button", { name: /Rooftop al tramonto/ }).click();
  await page.getByPlaceholder("Scrivi un messaggio...").fill("Arrivo alle 19:15");
  await page.getByRole("button", { name: "Invia" }).click();
  await expect(page.getByText("Arrivo alle 19:15", { exact: true })).toBeVisible();
});
