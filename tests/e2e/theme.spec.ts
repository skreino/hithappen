import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("hithappen:personal:v2", JSON.stringify({ version: 2, saved: ["biko-live"], history: [], onboarding: { completed: true, step: 3, locationConsent: "unknown" } })));
});

test("dark is the default even with a light OS preference, without ambient motion", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const backdrop = page.locator(".ambient-backdrop");
  await expect(backdrop).toHaveAttribute("aria-hidden", "true");
  await expect(backdrop).toHaveCSS("pointer-events", "none");
  await expect(backdrop).toHaveCSS("animation-name", "none");
  await expect(page.locator(".flame-backdrop")).toHaveCount(0);
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(16, 17, 18)");
  await expect(page.getByRole("button", { name: "Esplora tutti", exact: true })).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Dettagli", exact: true }).click();
  await expect(backdrop).toBeVisible();
});

test("light appearance can be selected in Profile and survives reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(16, 17, 18)");
  await page.getByRole("button", { name: "Profilo", exact: true }).click();
  await page.getByRole("button", { name: "Chiaro", exact: true }).click();
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(245, 245, 243)");
  await page.reload();
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(245, 245, 243)");
  await page.getByRole("button", { name: "Profilo", exact: true }).click();
  await expect(page.getByRole("button", { name: "Chiaro", exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "Scuro", exact: true }).click();
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(16, 17, 18)");
});

test("celebration respects reduced motion and disappears", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".app-shell")).toHaveAttribute("data-ready", "true");
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".celebration__message")).toContainText("Serata salvata");
  await expect(page.locator(".celebration__particles")).toBeHidden();
  await expect(page.locator(".celebration__message")).toHaveCSS("animation-name", "none");
  await expect(page.locator(".celebration")).toHaveCount(0);
});
