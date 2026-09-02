import { expect, test } from "@playwright/test";

test("warm palette and non-interactive flame persist across app pages", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.locator(".app-shell")).toHaveAttribute("data-ready", "true");
  const backdrop = page.locator(".flame-backdrop");
  await expect(backdrop).toHaveAttribute("aria-hidden", "true");
  await expect(backdrop).toHaveCSS("pointer-events", "none");
  await expect(page.locator("html")).toHaveCSS("background-color", "rgb(28, 16, 19)");
  await expect(page.getByRole("button", { name: "Esplora tutti", exact: true })).toHaveCSS("background-color", "rgb(247, 181, 56)");
  const flame = page.locator(".flame-backdrop__shape--upper");
  await expect(flame).toHaveCSS("animation-name", "flame-breathe");
  await expect(flame).toHaveCSS("animation-duration", "4.8s");
  await expect(flame).toHaveCSS("animation-iteration-count", "1");
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await expect(page.getByRole("button", { name: "Mi interessa", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Dettagli", exact: true }).click();
  await expect(backdrop).toBeVisible();
  await expect(page.getByRole("button", { name: "Indietro", exact: true })).toBeVisible();
});

test("flame respects reduced motion without hiding the theme", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".flame-backdrop__shape")).toHaveCount(2);
  for (const flame of await page.locator(".flame-backdrop__shape").all()) {
    await expect(flame).toHaveCSS("animation-name", "none");
    await expect(flame).toBeVisible();
  }
  await expect(page.getByRole("navigation").getByRole("button", { name: "Mappa", exact: true })).toHaveCSS("background-color", "rgb(247, 181, 56)");
});
