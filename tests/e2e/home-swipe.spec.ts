import { expect, test } from "@playwright/test";

test("first launch offers HIT and NOPE, persists choices and shares undo with Match", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".home-deck .swipe-card")).toBeVisible();
  const hit = (await page.getByRole("button", { name: "Mi interessa", exact: true }).boundingBox())!;
  const nav = (await page.getByRole("navigation").boundingBox())!;
  expect(hit.y + hit.height).toBeLessThanOrEqual(nav.y);
  const first = await page.locator(".swipe-card h2").innerText();
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".choice-flash--like")).toContainText("HIT");
  await expect(page.locator(".choice-flash--like svg")).toHaveCount(1);
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
  await page.reload();
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
  await page.getByRole("button", { name: "Profilo", exact: true }).click();
  await expect(page.locator(".profile-section").first()).toContainText(first);
  await page.getByRole("button", { name: "Match", exact: true }).click();
  await page.getByRole("button", { name: "Annulla ultima scelta" }).click();
  await page.getByRole("button", { name: "Scopri", exact: true }).click();
  await expect(page.locator(".swipe-card h2")).toHaveText(first);
  await page.getByRole("button", { name: "Passa", exact: true }).click();
  await expect(page.locator(".choice-flash--pass")).toContainText("NOPE");
  await expect(page.locator(".swipe-card h2")).not.toHaveText(first);
  expect(await page.locator(".home-picks .compact-event strong").allTextContents()).not.toContain(first);
});

test("home drag previews HIT, cancellation resets and swipe saves once", async ({ page }) => {
  await page.goto("/");
  const card = page.locator(".swipe-card");
  await expect(card).toBeVisible();
  const first = await card.locator("h2").innerText();
  const box = (await card.boundingBox())!;
  const x = box.x + box.width / 2, y = box.y + 70;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 95, y + 2, { steps: 8 });
  await expect(page.locator(".swipe-stamp--hit")).toHaveCSS("opacity", "1");
  await card.dispatchEvent("pointercancel");
  await page.mouse.up();
  await expect(card).toHaveCSS("transform", "none");
  await expect(card.locator("h2")).toHaveText(first);
  await expect(page.locator(".swipe-stamp--hit")).toHaveCSS("opacity", "0");
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y + 2, { steps: 8 });
  await page.mouse.up();
  await expect(card.locator("h2")).not.toHaveText(first);
  const history = await page.evaluate(() => JSON.parse(localStorage.getItem("hithappen:personal:v2")!).history);
  expect(history).toHaveLength(1);
  expect(history[0].kind).toBe("like");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("home remains usable with reduced motion, light and dark themes", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".swipe-card")).toBeVisible();
  await page.screenshot({ path: `test-results/home-dark-${test.info().project.name}.png`, fullPage: true, animations: "disabled" });
  await page.getByRole("button", { name: "Mi interessa", exact: true }).click();
  await expect(page.locator(".choice-flash")).toBeHidden();
  await expect(page.locator(".celebration__message")).toContainText("Serata salvata");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.getByRole("heading", { name: "Potrebbero piacerti" })).toBeVisible();
  await page.screenshot({ path: `test-results/home-light-${test.info().project.name}.png`, fullPage: true, animations: "disabled" });
});
