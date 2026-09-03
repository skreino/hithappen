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

- Home: carosello manuale, tre proposte non duplicate e accesso al catalogo. Ricerca sticky in alto, mai nella tab bar.
- La mappa è l'azione centrale e visivamente distinta nella navigazione inferiore.
- La navigazione inferiore contiene cinque azioni: Scopri, Match, Mappa, Inbox e Profilo; Mappa occupa la posizione centrale.
- I salvati sono accessibili dal profilo, non dalla navigazione principale.
- La sezione giochi deve aiutare a scegliere una serata; non deve sembrare un'app di dating.
- La selezione corrente usa vicinanza e interesse ricevuto demo; non dichiarare un algoritmo personalizzato reale.
- Tema automatico di sistema: giorno bianco caldo/rosso, notte con la palette bordeaux/oro approvata. Luce ambientale statica, senza fiamme. Festa sulle scelte positive e feedback X sugli skip, rispettando reduced-motion. Match personale, preferiti e lingua persistono sul dispositivo; non creare chat o abbinamenti simulati.
- Solo locali verificati potranno pubblicare eventi reali.
- La chat evento è riservata ai partecipanti e dovrà includere blocco, segnalazione e moderazione.
- Mantenere il tema dark-first approvato; un eventuale tema chiaro è una fase successiva e non deve diluire la direzione nightlife.
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
- contrasto, leggibilità e safe area del tema dark restano corretti;
- lint/test mirati passano, oppure il limite è documentato;
- la documentazione è aggiornata se necessario;
- il riepilogo finale elenca file modificati e verifiche eseguite.

## Pubblicazione

Salvo indicazione contraria dell’utente, al termine di ogni modifica completata e verificata:

1. crea un commit Git descrittivo;
2. esegui il push del branch corrente su GitHub;
3. pubblica la versione aggiornata su Vercel in produzione;
4. riporta hash del commit e URL della distribuzione.

Se push o deploy sono bloccati da autenticazione, configurazione o controlli falliti, non ignorare il problema: descrivi con precisione cosa manca.
