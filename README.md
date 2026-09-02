# HitHappen

HitHappen è un prototipo web mobile-first per scoprire eventi, serate e occasioni sociali a Milano e Monza Brianza.

## Stato del progetto

Questa repository contiene il prototipo interattivo attualmente pubblicato su [hithappen.vercel.app](https://hithappen.vercel.app).

Eventi e distanze sono dimostrativi. Preferiti e avanzamento Match vengono salvati realmente sul dispositivo (localStorage versionato, senza dati personali); non sono sincronizzati online. Partecipazione solo demo; Inbox esplicitamente non attiva. Backend, autenticazione e notifiche non sono collegati.

## Funzioni presenti

- Home essenziale con carosello manuale di tre serate e tre proposte non duplicate;
- dettaglio evento con prezzo, distanza e partecipanti;
- eventi salvati;
- Match personale con swipe, pulsanti equivalenti, dettagli, annulla e riepilogo;
- ricerca e filtri essenziali;
- profilo demo con tutti i preferiti del dispositivo;
- mappa Leaflet/OpenStreetMap, marker geografici, lista e anteprima sincronizzate, zoom e geolocalizzazione con gestione errori;
- tema dark-first coerente con il mondo nightlife;
- navigazione mobile a cinque azioni con Mappa centrale.

## Direzione visiva

Direzione iOS-inspired con palette calda: bordeaux `#780116`, oro `#F7B538`, ambra `#DB7C26`, arancio `#D8572A`, rosso `#C32F27`. Base scura derivata `#1C1013`, pannelli opachi `#342327`, testo `#FAF5F1`, secondario `#C5B4AE`. Oro per le azioni principali, toni rossi per il fondo. Font di sistema: SF su Apple, fallback sugli altri dispositivi. Wordmark conservato, senza pannello decorativo desktop. Vetro limitato a testate e navigazione. Cinque voci: Scopri, Match, Mappa, Inbox, Profilo; Mappa centrale piena oro. Ricerca solo nella testata sticky; il catalogo completo si apre con “Esplora tutti”.

La fiamma AnimateIcons fornita dall’utente è adattata in SVG/CSS come filigrana non interattiva dietro alle pagine. Movimento introduttivo di 4,8 secondi, poi statico; disabilitato con `prefers-reduced-motion`. Nessuna nuova dipendenza. Fotografie e cartografia rimangono prive di filtri cromatici. Attribuzione MIT in `public/THIRD_PARTY_NOTICES.md`.

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
- `lib/events/`: formattazione date, ricerca, filtri, ranking demo e stato persistente;
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
