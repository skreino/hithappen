# HitHappen

HitHappen è un prototipo web mobile-first per scoprire eventi, serate e occasioni sociali a Milano e Monza Brianza.

## Stato del progetto

Questa repository contiene il prototipo interattivo attualmente pubblicato su [hithappen.vercel.app](https://hithappen.vercel.app).

Eventi e distanze sono dimostrativi. Onboarding, profilo, preferiti, avanzamento Match, partecipazioni, gruppi e messaggi demo vengono salvati sul dispositivo in uno storage locale versionato; non sono sincronizzati online. Backend, autenticazione e notifiche reali non sono collegati.

## Funzioni presenti

- onboarding saltatile con interessi, consenso posizione e fallback Milano/Monza;
- Home editoriale con due schede affiancate, tre proposte nel carosello manuale e sezione “Altre idee”;
- swipe esclusivamente in Match: destra HIT con fuochino animato e salvataggio, sinistra NOPE, dettagli e annulla;
- dettaglio evento con prezzo, distanza e partecipanti;
- eventi salvati;
- Match personale con swipe, pulsanti equivalenti, dettagli, annulla e riepilogo;
- ricerca e filtri essenziali;
- partecipazione separata dall'adesione volontaria al gruppo evento;
- Inbox locale con gruppi evento, una conversazione demo preesistente e messaggi persistenti sul dispositivo;
- profilo demo modificabile con preferiti, privacy e preferenze notifiche locali;
- mappa Leaflet/OpenStreetMap con clustering Milano/Monza, marker, lista e anteprima sincronizzate, zoom e gestione errori;
- PWA installabile: pagine aggiornate dalla rete, cache HTML solo come fallback offline e cache delle risorse statiche separata;
- tema dark-first coerente con il mondo nightlife;
- navigazione mobile a cinque azioni con Mappa centrale.

## Direzione visiva

Design editoriale fotografico: quasi nero `#101112`, bianco caldo, grigi neutri e Inter Tight. Scuro predefinito; variante chiara dal Profilo, persistita in `hithappen:theme:v1`. Wordmark conservato, vetro limitato a testata e navigazione. Scopri, Match, Mappa, Inbox, Profilo: Mappa centrale con piccolo accento rosa–lilla–azzurro. Home senza swipe; Match con metadati sotto la foto, Dettagli discreto e due pulsanti NOPE/HIT. Le altre sezioni conservano struttura e funzionalità.

Sfondo neutro senza animazione ambientale. Il fuochino è riservato all'azione HIT: timbro durante il trascinamento, uscita della carta e conferma animata; NOPE ha un timbro e una breve oscillazione laterale. Le animazioni HIT/NOPE compaiono esclusivamente in Match. Le scelte rimangono personali, non sono abbinamenti tra persone. Con `prefers-reduced-motion` rimane la conferma testuale, senza uscita animata, fuoco o coriandoli. Nessuna nuova dipendenza.

Italiano e inglese sono selezionabili dalla testata (EN/IT) e dal Profilo. Interfaccia, eventi demo, ricerca, date e messaggi si adattano alla lingua. La preferenza è validata e salvata in `hithappen:language:v1`, separatamente dai preferiti; se lo storage non è disponibile il cambio funziona per la sessione. La mappa conserva l’anteprima selezionata; la precedente fila di schede è sostituita da una lista richiudibile, utilizzabile anche senza cartografia.

## Avvio locale

Le foto sono illustrative e non documentano i locali demo. Provenienza, prompt e file ottimizzati: [fotografie editoriali](docs/EDITORIAL_ASSETS.md).

Requisiti:

- Git;
- Node.js 22.13 o superiore;
- npm.

```bash
git clone https://github.com/skreino/hithappen.git
cd hithappen
npm ci
npm run dev:local
```

Apri quindi l'indirizzo mostrato dal terminale, normalmente `http://localhost:5173`.

## Comandi

```bash
npm run dev
npm run lint
npm test
npm run build
```

## Struttura principale

- `components/hithappen-app.tsx`: coordinamento dello stato dell’app;
- `features/`: viste Discover/catalogo, Match, Mappa, Dettaglio, Ricerca, Inbox e Profilo;
- `components/events/`: sistema condiviso delle card evento;
- `components/map/`, `components/navigation/`, `components/search/`, `components/ui/`: componenti di prodotto riutilizzabili;
- `data/mock-events.ts`: fixture relative alla data corrente;
- `lib/events/`: formattazione date, ricerca, filtri, ranking demo e stato persistente v2 con migrazione v1;
- `lib/repositories/`: repository mock asincroni sostituibili;
- `lib/i18n/`: dizionario italiano/inglese e preferenza lingua locale;
- `app/globals.css`: design token, responsive e temi;
- `tests/e2e/`: test browser su 390 × 844, 320 × 568 e 1440 × 900;
- `docs/PRODUCT_BLUEPRINT.md`: visione, MVP e piano tecnico;
- `AGENTS.md`: contesto e regole operative per Codex.

## Direzione tecnica

Il prototipo attuale usa React, TypeScript e Next.js (con anteprima Vinext/Vite separata). La futura applicazione mobile completa è prevista con Expo/React Native e Supabase, dopo la validazione del prodotto.

## Codex

Clona la repository, apri la cartella in Codex e chiedi, ad esempio:

> Leggi AGENTS.md e docs/PRODUCT_BLUEPRINT.md, poi avvia il progetto e spiegami la prossima attività consigliata.

Codex potrà modificare soltanto la cartella aperta e le risorse che autorizzi.

I test end-to-end avviano una build Next.js locale sulla porta 4174 e richiedono Chrome (oppure `PW_CHANNEL=msedge`). La posizione nei test è sintetica, senza permessi. Le tile OSM possono essere bloccate per verificare la lista di fallback. L’anteprima Vite resta indipendente sulla porta 5173.
