import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("hithappen:personal:v2")) localStorage.setItem("hithappen:personal:v2", JSON.stringify({ version: 2, saved: ["biko-live"], history: [], onboarding: { completed: true, step: 3, locationConsent: "unknown" } }));
  });
  await page.goto("/");
});

test("Home stays original; animated HIT and NOPE are exclusive to Match and survive reload", async ({ page }) => {
  await expect(page.locator(".night-card")).toHaveCount(3);
  await expect(page.locator(".swipe-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Match", exact: true }).click();
  const first = await page.locator(".swipe-card h2").innerText();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".choice-flash--like")).toContainText("HIT");
  await expect(page.locator(".choice-flash--like svg")).toHaveCount(1);
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
  await page.reload();
  await expect(page.locator(".night-card")).toHaveCount(3);
  await expect(page.locator(".swipe-card")).toHaveCount(0);
  await page.getByRole("button", { name: "Profilo", exact: true }).click();
  await expect(page.locator(".profile-section").first()).toContainText(first);
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
  await page.getByRole("button", { name: "Annulla ultima scelta" }).click();
  await expect(page.locator(".swipe-card h2")).toHaveText(first);
  await page.getByRole("button", { name: "Passa", exact: true }).click();
  await expect(page.locator(".choice-flash--pass")).toContainText("NOPE");
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
});

test("reload fetches current Home even when the service worker has an obsolete cached document", async ({ page }) => {
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  await page.evaluate(async () => {
    const cache = await caches.open("hithappen-shell-v3");
    await cache.put("/", new Response("<html><body>OLD VERSION</body></html>", { headers: { "Content-Type": "text/html" } }));
  });
  await page.reload();
  await expect(page.locator(".night-card")).toHaveCount(3);
  await expect(page.getByText("OLD VERSION")).toHaveCount(0);
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await expect(page.locator(".swipe-card")).toBeVisible();
});
