# HitHappen

HitHappen è un prototipo web mobile-first per scoprire eventi, serate e occasioni sociali a Milano e Monza Brianza.

## Stato del progetto

Questa repository contiene il prototipo interattivo attualmente pubblicato su [hithappen.vercel.app](https://hithappen.vercel.app).

Eventi e distanze sono dimostrativi. Onboarding, profilo, preferiti, avanzamento Match, partecipazioni, gruppi e messaggi demo vengono salvati sul dispositivo in uno storage locale versionato; non sono sincronizzati online. Backend, autenticazione e notifiche reali non sono collegati.

## Funzioni presenti

- onboarding saltatile con interessi, consenso posizione e fallback Milano/Monza;
- Home essenziale con una proposta dominante, carosello manuale e tre alternative non duplicate;
- dettaglio evento con prezzo, distanza e partecipanti;
- eventi salvati;
- Match personale con swipe, pulsanti equivalenti, dettagli, annulla e riepilogo;
- ricerca e filtri essenziali;
- partecipazione separata dall'adesione volontaria al gruppo evento;
- Inbox locale con gruppi evento, una conversazione demo preesistente e messaggi persistenti sul dispositivo;
- profilo demo modificabile con preferiti, privacy e preferenze notifiche locali;
- mappa Leaflet/OpenStreetMap con clustering Milano/Monza, marker, lista e anteprima sincronizzate, zoom e gestione errori;
- PWA installabile con manifest e service worker versionato;
- tema dark-first coerente con il mondo nightlife;
- navigazione mobile a cinque azioni con Mappa centrale.

## Direzione visiva

Direzione iOS-inspired adattata alla preferenza di sistema. Di giorno: bianco caldo `#FFF7F6`, superfici bianche, testo bordeaux e rosso `#C32F27` come unico accento. Di notte resta la palette approvata: base `#1C1013`, pannelli `#342327`, testo `#FAF5F1` e oro `#F7B538` per le azioni. Font di sistema: SF su Apple, fallback sugli altri dispositivi. Wordmark conservato, vetro limitato a testate e navigazione. Cinque voci: Scopri, Match, Mappa, Inbox, Profilo; Mappa centrale piena. Ricerca solo nella testata sticky.

Sfondo ambientale statico adattato a giorno e notte: nessuna fiamma o simbolo dating. Fotografie e cartografia rimangono prive di filtri cromatici. Le scelte positive in Match mostrano coriandoli; gli skip una X con breve scia laterale. Entrambe le conferme non bloccano l’interazione e con `prefers-reduced-motion` rimane solo il testo. Nessuna nuova dipendenza.

Italiano e inglese sono selezionabili dalla testata (EN/IT) e dal Profilo. Interfaccia, eventi demo, ricerca, date e messaggi si adattano alla lingua. La preferenza è validata e salvata in `hithappen:language:v1`, separatamente dai preferiti; se lo storage non è disponibile il cambio funziona per la sessione. La mappa conserva l’anteprima selezionata; la precedente fila di schede è sostituita da una lista richiudibile, utilizzabile anche senza cartografia.

## Avvio locale

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

Il prototipo attuale usa React, TypeScript e Vinext. La futura applicazione mobile completa è prevista con Expo/React Native e Supabase, dopo la validazione del prodotto.

## Codex

Clona la repository, apri la cartella in Codex e chiedi, ad esempio:

> Leggi AGENTS.md e docs/PRODUCT_BLUEPRINT.md, poi avvia il progetto e spiegami la prossima attività consigliata.

Codex potrà modificare soltanto la cartella aperta e le risorse che autorizzi.

I test end-to-end avviano una build Next.js locale sulla porta 4174 e richiedono Chrome (oppure `PW_CHANNEL=msedge`). La posizione nei test è sintetica, senza permessi. Le tile OSM possono essere bloccate per verificare la lista di fallback. L’anteprima Vite resta indipendente sulla porta 5173.
