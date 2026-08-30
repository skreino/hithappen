# HitHappen — Product Blueprint v0.1

Data: 26 agosto 2026

## 1. Visione

HitHappen aiuta le persone a scoprire eventi locali interessanti, inclusi quelli disponibili la sera stessa, e permette ai partecipanti di conoscersi e organizzarsi nella chat dell'evento.

Il prodotto parte da Milano e Monza Brianza. Il primo lato da conquistare è quello di bar, pub, locali e organizzatori; il secondo è quello degli utenti finali.

## 2. Problemi da risolvere

### Per gli utenti

- Non sapere cosa fare stasera o nel weekend.
- Perdere eventi particolari perché sparsi tra profili social, storie e siti differenti.
- Non avere un luogo semplice in cui vedere chi partecipa e organizzarsi.

### Per i locali

- Promuovere gli eventi in modo frammentato.
- Riempire serate con poca affluenza.
- Raggiungere persone nuove nella propria zona.

## 3. Obiettivi dei primi tre mesi

Priorità:

1. Convincere un primo gruppo di locali verificati a usare HitHappen.
2. Dimostrare che il prodotto viene realmente usato per scoprire, salvare e condividere eventi.

Metriche iniziali proposte:

- 20 locali verificati.
- 80 eventi reali pubblicati nel trimestre.
- 500 utenti registrati nell'area di lancio.
- Almeno il 25% degli utenti registrati salva, condivide o seleziona “Partecipo” su un evento.
- Almeno il 30% degli eventi genera attività nella chat.

Questi numeri sono ipotesi operative, non previsioni.

## 4. Utenti e ruoli

### Utente

Può esplorare il feed, filtrare gli eventi, salvare, condividere, selezionare “Partecipo”, accedere alla chat dell'evento e gestire il proprio profilo.

### Locale verificato

Usa la stessa applicazione con un profilo locale. Può creare e gestire eventi soltanto dopo la verifica.

### Amministratore HitHappen

Approva i locali, gestisce gli eventi inseriti manualmente, modera segnalazioni e può sospendere utenti, locali o contenuti.

## 5. Esperienza utente MVP

### Onboarding

1. Registrazione o accesso.
2. Scelta di generi musicali e interessi.
3. Selezione della zona preferita e del raggio di distanza.
4. Creazione del profilo.
5. Apertura del feed personalizzato.

### Home

La schermata principale è un feed personalizzato. L'ordine degli eventi considera:

- generi musicali e interessi;
- distanza e zona preferita;
- eventi salvati;
- partecipazioni precedenti.

Ogni card mostra subito:

- immagine principale;
- distanza;
- prezzo della serata.

Può inoltre mostrare titolo, luogo, data e orario in forma compatta.

### Direzione visiva consumer

- Esperienza dark-first ispirata alla cultura nightlife e all’editoria fashion contemporanea.
- Fotografia autentica e immersiva come materiale visivo principale.
- Palette nightlife editoriale: burgundy `#780000`, signal red `#C1121F`, cream `#FDF0D5`, midnight blue `#003049` e powder blue `#669BBC`.
- Navigazione a cinque azioni — Scopri, Cerca, Mappa, Inbox e Profilo — con superficie liquid glass e Mappa come controllo centrale più evidente.
- Tipografia neo-grotesk molto decisa per i momenti editoriali, con metadata sempre leggibili.
- Moduli asimmetrici e bordi tagliati usati con disciplina; niente texture rétro globale, glassmorphism o card SaaS generiche.
- Reference implementative conservate in `docs/design-references/nightlife-editorial/`.

### Dettaglio evento

- Copertina e galleria.
- Titolo, descrizione, data, orario e indirizzo.
- Distanza dall'utente.
- Prezzo e modalità d'ingresso, senza vendita diretta.
- Profilo del locale verificato.
- Numero e anteprima dei partecipanti.
- Azioni: salva, condividi, partecipo.

### Partecipazione e chat

- Selezionando “Partecipo”, l'utente entra nella chat dedicata all'evento.
- Rimuovendo la partecipazione, perde l'accesso alla chat.
- La chat resta legata a un singolo evento.
- Sono presenti blocco utente, segnalazione e moderazione automatica.
- La chat viene archiviata dopo l'evento secondo una finestra temporale da definire.

### Profilo utente

- Nome, foto ed età.
- Interessi e generi musicali.
- Eventi futuri a cui parteciperà.
- Link ai social collegati o aggiunti dall'utente.
- Impostazioni di privacy per nascondere singoli dati.

### Profilo locale

- Nome, logo, immagini e descrizione.
- Indirizzo e contatti.
- Badge di verifica.
- Eventi futuri e passati.
- Creazione e modifica degli eventi.

## 6. Gestione iniziale dei contenuti

Durante lo sviluppo useremo eventi, locali e profili demo realistici. I record saranno marcati come dati di sviluppo e generati tramite seed ripetibili.

Per la prima beta reale:

- il team HitHappen inserisce manualmente una base di eventi;
- i locali richiedono la verifica;
- soltanto i locali verificati possono pubblicare direttamente;
- l'amministratore può correggere, nascondere o rimuovere gli eventi.

## 7. Funzioni escluse dall'MVP

- Acquisto di biglietti e prenotazioni.
- Pagamenti e commissioni.
- Messaggi privati tra utenti.
- Sistema follower completo.
- Matching stile dating e mini-giochi.
- Importazione automatica massiva da social o siti.
- Pubblicazione libera da parte di utenti non verificati.
- Motore di raccomandazione basato su machine learning.

Queste funzioni restano candidati per fasi successive, dopo la validazione.

## 8. Stack tecnico consigliato

### Applicazione

- Expo + React Native + Expo Router.
- TypeScript.
- Un solo progetto per Android, iOS e web.
- Prima distribuzione come web beta e build di test; store pubblici dopo la validazione.

### Backend

- Supabase Postgres per utenti, locali, eventi e partecipazioni.
- Supabase Auth per autenticazione.
- Supabase Storage per foto profilo, copertine ed elementi multimediali.
- Supabase Realtime per le chat degli eventi.
- Row Level Security per autorizzare ruoli e accesso alle chat.

### Servizi e workflow

- GitHub per versionamento e backup del codice.
- Codex per pianificazione, implementazione, test e revisione del repository.
- `AGENTS.md` nel repository per mantenere regole, architettura e definizione di “completato”.
- Figma per wireframe e design system prima della rifinitura visiva.
- Supabase Studio come pannello amministrativo temporaneo, evitando di costruire subito una dashboard interna completa.

## 9. Modello dati iniziale

Tabelle principali:

- `profiles`
- `user_interests`
- `venues`
- `venue_members`
- `venue_verification_requests`
- `events`
- `event_media`
- `event_interests`
- `event_saves`
- `event_attendees`
- `chat_messages`
- `user_blocks`
- `reports`
- `moderation_actions`

Regola centrale: soltanto un membro autorizzato di un locale verificato può pubblicare un evento per quel locale. Soltanto un partecipante attivo può leggere e inviare messaggi nella chat dell'evento.

## 10. Ordine di sviluppo

### Fase 1 — Fondamenta e prototipo

- Repository e istruzioni di progetto.
- Design tokens e componenti base.
- Navigazione mobile.
- Dati demo ripetibili.
- Feed, card evento e dettaglio evento.

### Fase 2 — Backend reale

- Schema Supabase e sicurezza.
- Registrazione e profili.
- Salvataggi e partecipazioni.
- Profili locale e verifica.
- Creazione eventi per locali verificati.

### Fase 3 — Componente sociale

- Chat per evento.
- Blocco e segnalazione.
- Moderazione automatica.
- Controlli privacy.

### Fase 4 — Beta locale

- Inserimento eventi reali.
- Test con un piccolo gruppo di locali.
- Analisi di attivazione e utilizzo.
- Correzioni prima della distribuzione pubblica.

## 11. Budget iniziale

Budget dichiarato: 200–1.000 € oltre al tempo personale.

Uso consigliato:

- dominio e identità di base;
- account store soltanto quando la beta è pronta;
- eventuale piano backend a pagamento quando necessario;
- piccoli test promozionali locali;
- riserva per asset, servizi e imprevisti.

Evitare nella prima fase spese per sviluppo esterno generico, campagne ampie o abbonamenti non indispensabili.

## 12. Prossimo deliverable

Il prossimo passaggio è creare l'architettura delle schermate e un prototipo navigabile con dati demo. Le prime schermate saranno:

1. Accesso e onboarding interessi.
2. Feed personalizzato.
3. Dettaglio evento.
4. Partecipanti e chat evento.
5. Profilo utente.
6. Profilo locale.
7. Creazione evento.
8. Richiesta di verifica del locale.

