import { expect, test } from "@playwright/test";

test("warm ambient background has no flames or continuous motion", async ({ page }) => {
  await page.goto("/");
  const backdrop = page.locator(".ambient-backdrop");
  await expect(backdrop).toHaveAttribute("aria-hidden", "true");
  await expect(backdrop).toHaveCSS("pointer-events", "none");
  await expect(backdrop).toHaveCSS("animation-name", "none");
  await expect(page.locator(".flame-backdrop")).toHaveCount(0);
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(28, 16, 19)");
  await expect(page.getByRole("button", { name: "Esplora tutti", exact: true })).toHaveCSS("background-color", "rgb(247, 181, 56)");
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Dettagli", exact: true }).click();
  await expect(backdrop).toBeVisible();
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
