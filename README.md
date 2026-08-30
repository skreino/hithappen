# HitHappen

HitHappen è un prototipo web mobile-first per scoprire eventi, serate e occasioni sociali a Milano e Monza Brianza.

## Stato del progetto

Questa repository contiene il prototipo interattivo attualmente pubblicato su [hithappen.vercel.app](https://hithappen.vercel.app).

Le schermate e le interazioni sono reali, mentre eventi, utenti, partecipazioni, salvataggi e chat usano ancora dati dimostrativi. Backend, autenticazione, database e notifiche non sono ancora collegati.

## Funzioni presenti

- feed personalizzato di eventi;
- dettaglio evento con prezzo, distanza e partecipanti;
- eventi salvati;
- partecipazione e gruppi evento dimostrativi;
- ricerca e filtri essenziali;
- profilo utente con interessi e salvati;
- mappa centrale con gli eventi;
- tema automatico chiaro/scuro.

## Direzione visiva

L’interfaccia è costruita come un prodotto consumer mobile contemporaneo: tipografia Inter Tight, superfici essenziali, fotografia urbana e rosso usato solo per azioni e stati importanti. L’influenza editoriale resta nella composizione e nel ritmo, senza texture o decorazioni rétro applicate all’intera UI. La mappa resta l’azione centrale della navigazione.

## Avvio locale

Requisiti:

- Git;
- Node.js 22.13 o superiore;
- npm.

```bash
git clone https://github.com/skreino/hithappen.git
cd hithappen
npm ci
npm run dev
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
- `features/`: viste Discover, Mappa, Dettaglio, Ricerca, Inbox e Profilo;
- `components/events/`: sistema condiviso delle card evento;
- `components/map/`, `components/navigation/`, `components/search/`, `components/ui/`: componenti di prodotto riutilizzabili;
- `data/mock-events.ts`: fixture relative alla data corrente;
- `lib/events/`: formattazione date, ricerca e filtri;
- `app/globals.css`: design token, responsive e temi;
- `docs/PRODUCT_BLUEPRINT.md`: visione, MVP e piano tecnico;
- `AGENTS.md`: contesto e regole operative per Codex.

## Direzione tecnica

Il prototipo attuale usa React, TypeScript e Vinext. La futura applicazione mobile completa è prevista con Expo/React Native e Supabase, dopo la validazione del prodotto.

## Codex

Clona la repository, apri la cartella in Codex e chiedi, ad esempio:

> Leggi AGENTS.md e docs/PRODUCT_BLUEPRINT.md, poi avvia il progetto e spiegami la prossima attività consigliata.

Codex potrà modificare soltanto la cartella aperta e le risorse che autorizzi.
