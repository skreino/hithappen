# AGENTS.md

## Progetto

HitHappen aiuta le persone a scoprire eventi locali e occasioni sociali, iniziando da Milano e Monza Brianza. Il prodotto deve essere utile sia agli utenti sia a bar, pub, locali e organizzatori verificati.

## Stato corrente

Questa repository contiene un prototipo web mobile-first. I dati e le azioni sociali sono dimostrativi: non presentare salvataggi, partecipazioni, chat, autenticazione o moderazione come funzionalità backend già operative.

Prima di modificare il prodotto, leggi:

1. `README.md`
2. `docs/PRODUCT_BLUEPRINT.md`
3. `app/page.tsx`
4. `app/globals.css`

## Principi di prodotto

- La home principale è il feed personalizzato.
- La mappa è l'azione centrale e visivamente distinta nella navigazione inferiore.
- I salvati sono accessibili dal profilo, non dalla navigazione principale.
- La sezione giochi deve aiutare a scegliere una serata; non deve sembrare un'app di dating.
- Il feed considera interessi, generi musicali, distanza, zona, salvataggi e partecipazioni.
- Solo locali verificati potranno pubblicare eventi reali.
- La chat evento è riservata ai partecipanti e dovrà includere blocco, segnalazione e moderazione.
- Supportare tema automatico chiaro/scuro.
- L'area iniziale è Milano e Monza Brianza.

## Regole tecniche

- Mantieni TypeScript e componenti React.
- Conserva un'esperienza mobile-first e accessibile.
- Non aggiungere dipendenze senza una necessità concreta.
- Non inserire segreti, token o file `.env` nel repository.
- Mantieni dati demo chiaramente separati dal futuro backend.
- Evita modifiche distruttive o riscritture ampie senza una richiesta esplicita.
- Prima di consegnare una modifica, esegui i controlli pertinenti disponibili nel progetto.
- Aggiorna README e blueprint quando una decisione cambia architettura, flusso o perimetro MVP.

## Definizione di completato

Una modifica è completata quando:

- il comportamento richiesto funziona;
- non rompe navigazione e layout mobile;
- stati chiaro e scuro restano leggibili;
- lint/test mirati passano, oppure il limite è documentato;
- la documentazione è aggiornata se necessario;
- il riepilogo finale elenca file modificati e verifiche eseguite.
