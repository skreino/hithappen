import { expect, test, type Page } from "@playwright/test";

async function ready(page: Page) {
  await page.addInitScript(() => {
    if (!localStorage.getItem("hithappen:personal:v2")) {
      localStorage.setItem("hithappen:personal:v2", JSON.stringify({ version: 2, saved: ["biko-live"], history: [], onboarding: { completed: true, step: 3, locationConsent: "unknown" } }));
    }
  });
  await page.goto("/");
  await expect(page.locator(".app-shell")).toHaveAttribute("data-ready","true");
}
async function tab(page: Page, name: string) {
  await page.getByRole("navigation").getByRole("button",{name,exact:true}).click();
}
test("Home carousel, unique recommendations, catalogue and sticky search", async ({page}) => {
  await ready(page);
  await expect(page.getByRole("navigation").getByRole("button")).toHaveCount(5);
  await expect(page.locator(".night-card")).toHaveCount(3);
  await expect(page.locator(".home-picks .compact-event")).toHaveCount(3);
  await page.getByRole("button",{name:"Mostra serata 2",exact:true}).click();
  await expect(page.getByRole("button",{name:"Mostra serata 2",exact:true})).toHaveAttribute("aria-pressed","true");
  await expect.poll(() => page.locator(".hero-carousel").evaluate(e=>e.scrollLeft)).toBeGreaterThan(100);
  await page.getByRole("button",{name:"Esplora tutti",exact:true}).click();
  await expect(page.locator(".catalogue-view .compact-event")).toHaveCount(16);
  await page.getByRole("searchbox").fill("biko");
  await expect(page.locator(".catalogue-view .compact-event")).toHaveCount(1);
  await page.getByRole("button",{name:"Cancella ricerca"}).click();
  await page.getByRole("button",{name:"Filtri",exact:true}).click();
  await page.getByRole("button",{name:"Gratis",exact:true}).click();
  await page.getByRole("button",{name:/Mostra \d+ eventi/}).click();
  const prices = await page.locator(".catalogue-view .compact-event b").allTextContents();
  expect(prices.length).toBeGreaterThan(0);
  expect(prices.every(price=>price==="Gratis")).toBeTruthy();
  await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
  const header = await page.locator(".app-header").boundingBox();
  expect(header?.y).toBe(0);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test("Match likes, detail, reload, undo and full deck", async ({page}) => {
  await ready(page);
  await tab(page,"Match");
  await page.getByRole("button",{name:"Mi interessa",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Live indie al Biko",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Dettagli",exact:true}).click();
  await page.getByRole("button",{name:"Indietro",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Live indie al Biko",exact:true})).toBeVisible();
  await page.reload();
  await expect(page.locator(".app-shell")).toHaveAttribute("data-ready","true");
  await tab(page,"Match");
  await expect(page.getByRole("heading",{name:"Live indie al Biko",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Annulla ultima scelta"}).click();
  await expect(page.getByRole("heading",{name:"Rooftop al tramonto",exact:true})).toBeVisible();
  await expect(page.getByRole("button",{name:"Salva evento",exact:true})).toHaveAttribute("aria-pressed","false");
  for(let index=0;index<16;index++) await page.getByRole("button",{name:index===0?"Mi interessa":"Passa",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Hai trovato le tue serate.",exact:true})).toBeVisible();
  await page.getByRole("button",{name:"Vedi salvati",exact:true}).click();
  await expect(page.getByRole("heading",{name:"I tuoi salvati · 2",exact:true})).toBeVisible();
});
test("cancelled gesture and internal bookmark never advance; real drags do", async ({page}) => {
  await ready(page); await tab(page,"Match");
  const card = page.locator(".swipe-card");
  await page.getByRole("button",{name:"Salva evento",exact:true}).click();
  await expect(page.getByRole("heading",{name:"Rooftop al tramonto",exact:true})).toBeVisible();
  const box = (await card.boundingBox())!;
  await page.mouse.move(box.x+40,box.y+100);
  await page.mouse.down();
  await page.mouse.move(box.x+160,box.y+100,{steps:5});
  await card.dispatchEvent("pointercancel",{pointerId:1,isPrimary:true,clientX:box.x+160,clientY:box.y+100});
  await page.mouse.up();
  await expect(page.getByRole("heading",{name:"Rooftop al tramonto",exact:true})).toBeVisible();
  await page.mouse.move(box.x+40,box.y+100); await page.mouse.down();
  await page.mouse.move(box.x+160,box.y+100,{steps:5}); await page.mouse.up();
  await expect(page.getByRole("heading",{name:"Live indie al Biko",exact:true})).toBeVisible();
});
test("map remains usable when tiles fail; selection, filters and empty state", async ({page}) => {
  await page.route("**/*.tile.openstreetmap.org/**",route=>route.abort());
  await ready(page); await tab(page,"Mappa");
  await expect(page.locator(".map-error")).toBeVisible();
  await expect(page.getByRole("link",{name:"OpenStreetMap",exact:true})).toHaveAttribute("href","https://www.openstreetmap.org/copyright");
  await expect(page.locator(".map-event-rail")).toHaveCount(0);
  await page.locator(".map-event-list summary").click();
  await page.getByRole("button",{name:"Live indie al Biko Barona · 2,4 km",exact:true}).click();
  await expect(page.locator(".map-preview")).toContainText("Live indie al Biko");
  await expect(page.getByRole("button",{name:"Live indie al Biko, 15€",exact:true})).toHaveAttribute("aria-pressed","true");
  await page.getByRole("button",{name:"Musica",exact:true}).click();
  await expect(page.locator(".map-event-options button")).toHaveCount(7);
  await page.getByRole("button",{name:"Filtri",exact:true}).click();
  await page.getByRole("slider",{name:"Distanza massima"}).press("Home");
  await page.getByRole("button",{name:"Mostra 0 eventi",exact:true}).click();
  await expect(page.getByText("Nessun evento sulla mappa.",{exact:true})).toBeVisible();
});
test("denied geolocation leaves events available", async ({page}) => {
  await page.addInitScript(()=>Object.defineProperty(navigator,"geolocation",{value:{getCurrentPosition:(_success:unknown,error:(value:{code:number})=>void)=>error({code:1})}}));
  await ready(page); await tab(page,"Mappa");
  await page.getByRole("button",{name:"Centra sulla mia posizione"}).click();
  await expect(page.locator(".location-status")).toContainText("Posizione negata");
  await expect(page.locator(".map-event-options button")).toHaveCount(16);
});
test("synthetic location callback draws the user marker without browser permissions", async ({page}) => {
  await page.addInitScript(()=>Object.defineProperty(navigator,"geolocation",{value:{getCurrentPosition:(success:(value:{coords:{latitude:number;longitude:number}})=>void)=>success({coords:{latitude:45.4642,longitude:9.19}})}}));
  await ready(page); await tab(page,"Mappa");
  await page.getByRole("button",{name:"Centra sulla mia posizione"}).click();
  await expect(page.locator(".location-status")).toHaveText("Posizione trovata.");
  await expect(page.getByRole("img",{name:"La tua posizione",exact:true})).toBeVisible();
});
test("navigation touch targets and page bounds at all sizes", async ({page}, info) => {
  await ready(page);
  for(const name of ["Scopri","Match","Mappa","Inbox","Profilo"]) {
    await tab(page,name);
    const dimensions=await page.getByRole("navigation").getByRole("button").evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
    expect(dimensions.every(d=>d.w>=44 && d.h>=44)).toBeTruthy();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
    if(name==="Match") {
      const actions=(await page.locator(".swipe-actions").boundingBox())!;
      const nav=(await page.getByRole("navigation").boundingBox())!;
      expect(actions.y+actions.height).toBeLessThanOrEqual(nav.y);
    }
    if(name==="Mappa") {
      await page.locator(".map-preview").scrollIntoViewIfNeeded();
      await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
      const preview=(await page.locator(".map-preview").boundingBox())!;
      const nav=(await page.getByRole("navigation").boundingBox())!;
      expect(preview.y+preview.height).toBeLessThanOrEqual(nav.y);
    }
    await page.screenshot({path:info.outputPath(name+".png"),fullPage:true});
  }
});
