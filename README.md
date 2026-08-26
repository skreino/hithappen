# HitHappen

HitHappen è un prototipo web mobile-first per scoprire eventi, serate e occasioni sociali a Milano e Monza Brianza.

## Stato del progetto

Questa repository contiene il prototipo interattivo attualmente pubblicato su [hithappen.skrea.chatgpt.site](https://hithappen.skrea.chatgpt.site).

Le schermate e le interazioni sono reali, mentre eventi, utenti, partecipazioni, salvataggi e chat usano ancora dati dimostrativi. Backend, autenticazione, database e notifiche non sono ancora collegati.

## Funzioni presenti

- feed personalizzato di eventi;
- dettaglio evento con prezzo, distanza e partecipanti;
- eventi salvati;
- partecipazione e chat evento dimostrativa;
- profilo utente e profilo locale;
- mappa centrale con gli eventi;
- sezione giochi, incluso lo swipe delle serate;
- tema automatico chiaro/scuro.

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

- `app/page.tsx`: interfaccia e flussi del prototipo;
- `app/globals.css`: stile, responsive e temi;
- `components/ui/`: componenti riutilizzabili;
- `public/events/`: immagini dimostrative;
- `docs/PRODUCT_BLUEPRINT.md`: visione, MVP e piano tecnico;
- `AGENTS.md`: contesto e regole operative per Codex.

## Direzione tecnica

Il prototipo attuale usa React, TypeScript e Vinext. La futura applicazione mobile completa è prevista con Expo/React Native e Supabase, dopo la validazione del prodotto.

## Codex

Clona la repository, apri la cartella in Codex e chiedi, ad esempio:

> Leggi AGENTS.md e docs/PRODUCT_BLUEPRINT.md, poi avvia il progetto e spiegami la prossima attività consigliata.

Codex potrà modificare soltanto la cartella aperta e le risorse che autorizzi.
