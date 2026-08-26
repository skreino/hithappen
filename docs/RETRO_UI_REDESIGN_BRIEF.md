# HitHappen — Brief redesign UI retro editoriale anni ’70

## Istruzione per Codex

Aggiorna l’interfaccia del prototipo HitHappen seguendo integralmente questo brief. Prima di intervenire, leggi `AGENTS.md`, `README.md`, `docs/PRODUCT_BLUEPRINT.md`, `app/page.tsx` e `app/globals.css`.

L’obiettivo è ottenere un’identità **retro editoriale ispirata agli anni ’70**, calda, sociale e riconoscibile, mantenendo però usabilità, pulizia e comportamenti di un’app contemporanea. Il risultato non deve sembrare né un’app vintage finta né un template generico con un filtro beige.

Non modificare il perimetro funzionale e non rimuovere schermate o interazioni esistenti.

---

## 1. Direzione creativa

### Concetto

**“La guida tascabile delle serate, stampata oggi.”**

HitHappen deve ricordare l’incontro tra:

- riviste musicali e culturali degli anni ’70;
- poster di concerti serigrafati;
- biglietti e programmi di locali;
- fotografie analogiche scattate durante una serata;
- una moderna app mobile per scoprire eventi.

Il linguaggio visivo deve trasmettere calore, spontaneità, movimento e voglia di uscire. L’app non deve sembrare nostalgica o polverosa: il riferimento retro serve a darle personalità, non a peggiorarne la leggibilità.

### Intensità

Applicare lo stile in modo **bilanciato**:

- struttura, navigazione e gerarchia restano moderne;
- tipografia, colori, fotografie e dettagli portano l’identità anni ’70;
- texture e decorazioni rimangono sottili;
- le azioni principali devono essere immediatamente comprensibili.

---

## 2. Elementi irrinunciabili

- Texture leggera di carta e grana.
- Fotografie con trattamento simile alla pellicola.
- Titoli grandi e con forte personalità.
- Palette calda con due o tre accenti vivaci.
- Forme morbide, leggermente irregolari e ispirate alla stampa.
- Contrasto chiaro e accessibile.
- Supporto completo al tema automatico chiaro/scuro.
- Layout mobile-first.

---

## 3. Palette cromatica

Usare token CSS centralizzati, evitando colori inseriti casualmente nei singoli componenti.

### Tema chiaro

| Ruolo | Colore | Hex indicativo |
|---|---|---|
| Sfondo carta | Crema caldo | `#F3E7D3` |
| Superficie | Avorio | `#FFF8EA` |
| Testo principale | Inchiostro bruno | `#241B16` |
| Testo secondario | Marrone grigio | `#74665B` |
| Primario | Arancio bruciato | `#E45B2A` |
| Accento | Giallo senape | `#EAB83E` |
| Accento secondario | Verde oliva | `#66733C` |
| Bordo | Marrone tenue | `#CDBBA5` |

### Tema scuro

| Ruolo | Colore | Hex indicativo |
|---|---|---|
| Sfondo | Espresso profondo | `#17120F` |
| Superficie | Marrone carbone | `#241D18` |
| Testo principale | Crema | `#F5E8D2` |
| Testo secondario | Beige spento | `#BBAE9E` |
| Primario | Arancio acceso | `#F0743E` |
| Accento | Giallo caldo | `#F0BE48` |
| Accento secondario | Verde salvia | `#85945A` |
| Bordo | Marrone medio | `#4A3C32` |

Gli accenti principali devono restare arancio, senape e oliva. Evitare arcobaleni, neon freddi e gradienti viola/blu tipici delle app AI o crypto.

---

## 4. Tipografia

Creare una gerarchia con due famiglie al massimo.

### Display

Per logo testuale, titoli di pagina, titoli evento e numeri importanti usare una serif morbida, corposa e leggermente eccentrica, simile a:

- Fraunces;
- Recoleta;
- Cooper;
- Windsor.

Preferire **Fraunces** se facilmente integrabile e compatibile con il progetto. Usare pesi alti, forme compatte e dimensioni generose. Non usare il carattere display per testi lunghi.

### Interfaccia e corpo

Per pulsanti, metadati, descrizioni e navigazione usare una sans-serif pulita e contemporanea, come:

- DM Sans;
- Inter;
- system sans-serif come fallback.

### Regole

- Titoli principali: grandi, compatti e con interlinea stretta.
- Corpo: leggibile, mai eccessivamente piccolo.
- Etichette: sans-serif, medium o bold.
- Maiuscolo solo per piccoli badge, date e categorie.
- Evitare font script, western caricaturali o decorativi difficili da leggere.

---

## 5. Texture e profondità

La texture deve essere percepibile senza interferire con i contenuti.

- Creare una grana molto sottile tramite pseudo-elemento CSS, SVG leggero o pattern generato.
- Opacità indicativa: tra `0.02` e `0.06`.
- La texture non deve ridurre il contrasto del testo.
- Applicarla allo sfondo generale e, in modo ancora più leggero, alle card principali.
- Usare ombre calde e corte, non grandi glow digitali.
- Introdurre alcuni bordi da 1–2 px con colore “inchiostro” attenuato.
- Si possono usare minime rotazioni decorative, ma mai sulle aree che richiedono lettura o tap preciso.

Non aggiungere immagini pesanti esclusivamente per simulare la carta.

---

## 6. Fotografie degli eventi

Le foto devono sembrare scatti autentici di una serata, non immagini stock lucidissime.

Applicare con moderazione:

- lieve aumento di calore;
- contrasto morbido;
- saturazione leggermente ridotta;
- grana fine;
- piccola vignettatura;
- overlay arancio o senape molto trasparente;
- bordi leggermente morbidi o irregolari.

Le persone e il locale devono restare chiaramente visibili. Non applicare filtri così forti da rendere tutte le immagini marroni.

Valutare una classe CSS condivisa, ad esempio `.event-photo-treatment`, per mantenere coerenza.

---

## 7. Componenti

### Card evento

Trasformare le card in piccoli poster editoriali contemporanei:

- fotografia dominante;
- titolo display grande;
- data presentata come timbro, biglietto o etichetta;
- distanza e prezzo immediatamente visibili;
- categoria in badge compatto;
- angoli morbidi ma non eccessivamente “app standard”;
- bordo caldo e ombra corta;
- gerarchia chiara anche senza decorazioni.

Non sovraccaricare ogni card con texture, sticker e rotazioni contemporaneamente.

### Pulsanti

- Primario: arancio bruciato, testo crema o molto scuro in base al contrasto.
- Secondario: superficie crema con bordo inchiostro.
- Forma: pillola moderata o rettangolo molto arrotondato.
- Stato premuto percepibile con piccola traslazione e ombra ridotta.
- Focus ring ben visibile.
- Nessuna perdita di accessibilità.

### Badge

I badge possono ricordare timbri o etichette stampate:

- testo breve;
- sans-serif bold;
- colore senape, oliva o crema;
- bordi leggermente irregolari solo se ottenibili senza compromettere la pulizia.

### Icone

Mantenere il set di icone esistente. Uniformare dimensioni e spessore. Evitare di mescolare icone cartoon, 3D o riempite casualmente.

---

## 8. Navigazione inferiore

Preservare la struttura funzionale stabilita:

- Scopri;
- Giochi;
- pulsante centrale Mappa;
- Chat;
- Profilo.

Il pulsante **Mappa** deve restare centrale, più grande e chiaramente differenziato. Ridisegnarlo come un elemento ispirato a un timbro, una spilla o un gettone da locale, usando arancio o senape.

- Deve essere riconoscibile come pulsante e non come decorazione.
- Deve mantenere area di tap adeguata.
- Lo stato attivo deve essere evidente.
- I “Salvati” restano nel profilo e non tornano nella barra principale.

---

## 9. Indicazioni per le schermate

### Feed “Scopri”

- Hero/intestazione più editoriale.
- Titolo grande, ad esempio “Cosa succede stasera?”.
- Filtri simili a piccoli tag stampati.
- Card con alternanza controllata, senza rompere la scansionabilità verticale.
- Prezzo e distanza sempre leggibili al primo sguardo.

### Dettaglio evento

- Fotografia hero con trattamento pellicola.
- Data in blocco grafico ispirato a un biglietto.
- Titolo molto evidente.
- CTA “Partecipo” primaria.
- Salva e condividi secondari ma facili da trovare.
- Partecipanti e accesso chat chiari.

### Mappa

- Mantenere la mappa funzionalmente pulita.
- Marker personalizzati in stile spilla/gettone.
- Scheda evento inferiore coerente con le card del feed.
- Non coprire la mappa con texture invasive.

### Giochi

- Presentare la sezione come un modo divertente per scegliere la serata, non come dating.
- Lo swipe degli eventi può ricordare una pila di flyer o fotografie Polaroid.
- Mantenere chiari titolo, luogo, data, prezzo e azioni.
- Evitare cuori e linguaggio romantico se non legati esplicitamente a “mi piace questo evento”.

### Chat

- Priorità assoluta alla leggibilità.
- Texture quasi assente nell’area messaggi.
- Bubble semplici, crema/arancio nel chiaro e marrone/arancio nel dark.
- Informazioni di sicurezza, segnala e blocca facilmente accessibili.

### Profilo

- Testata simile a una pagina editoriale personale.
- Salvati accessibili in alto.
- Interessi e generi come etichette stampate.
- Eventi futuri ben separati dai dati personali.
- Link social riconoscibili e non dominanti.

### Profilo locale

- Atmosfera da locandina ufficiale del locale.
- Badge “Verificato” evidente ma elegante.
- Eventi futuri in primo piano.
- Azioni di gestione distinte dall’esperienza del pubblico.

---

## 10. Movimento e microinterazioni

Le animazioni devono essere brevi e tattili:

- card che si solleva leggermente;
- pulsante che scende di 1–2 px al tap;
- transizioni tra 150 e 250 ms;
- swipe con lieve rotazione da flyer;
- comparsa dei contenuti con fade e traslazione minima.

Rispettare `prefers-reduced-motion`. Evitare glitch, effetti CRT, luci neon e animazioni continue: appartengono ad altri immaginari retro.

---

## 11. Accessibilità e responsive

- Garantire contrasto WCAG AA per testi e controlli.
- Non affidare informazioni soltanto al colore.
- Area interattiva minima consigliata: 44 × 44 px.
- Focus da tastiera sempre visibile.
- Testare almeno larghezze 320, 375, 390 e 430 px.
- Verificare anche desktop senza trasformare l’app in una pagina eccessivamente larga.
- Il tema deve seguire automaticamente la preferenza del dispositivo e restare modificabile se il controllo esiste già.

---

## 12. Cose da evitare

- Neon anni ’80, pixel art, CRT o cyberpunk.
- Effetto western/saloon.
- Tutto beige senza accenti.
- Font decorativi su testi lunghi.
- Grana troppo visibile.
- Elementi volutamente storti ovunque.
- Gradienti viola/blu.
- Glassmorphism freddo.
- Ombre diffuse da template SaaS.
- Aspetto da landing page generata automaticamente.
- Rimozione o semplificazione delle funzioni attuali.
- Modifiche al backend: in questa attività si interviene soltanto sull’esperienza visiva del prototipo.

---

## 13. Strategia di implementazione

1. Analizza la struttura e identifica token e stili ripetuti.
2. Introduci variabili globali per palette, superfici, bordi, ombre e raggi.
3. Configura tipografia display e sans-serif con fallback sicuri.
4. Crea texture globale leggera e trattamento fotografico riutilizzabile.
5. Aggiorna prima navigazione e card evento.
6. Estendi il linguaggio visivo a feed, dettaglio, mappa, giochi, chat e profili.
7. Cura stati attivi, hover, focus, loading e tema scuro.
8. Verifica che tutte le azioni esistenti continuino a funzionare.
9. Esegui lint e test pertinenti.
10. Fornisci un riepilogo con file modificati, decisioni prese e verifiche eseguite.

Non fermarti a cambiare tre colori: il redesign deve creare un sistema coerente. Allo stesso tempo, non riscrivere la logica dell’app se non è necessario per applicare il nuovo design.

---

## 14. Criteri di accettazione

Il lavoro è completato quando:

- l’identità anni ’70 è riconoscibile ma l’app resta moderna;
- palette e tipografia sono coerenti in tutte le schermate;
- carta/grana e filtro pellicola sono sottili;
- feed, prezzo e distanza restano immediatamente leggibili;
- il pulsante centrale Mappa mantiene massima evidenza;
- Salvati rimane nel profilo;
- Giochi appare come scelta divertente degli eventi e non come dating;
- tema chiaro e scuro risultano entrambi curati;
- navigazione e interazioni esistenti continuano a funzionare;
- non sono presenti errori evidenti su mobile;
- controlli automatici pertinenti superano la verifica.

---

## Output richiesto a Codex

Al termine, Codex deve restituire:

1. sintesi del nuovo sistema visivo;
2. elenco dei file modificati;
3. schermate aggiornate;
4. controlli eseguiti e relativo risultato;
5. eventuali compromessi o attività rimaste;
6. istruzioni per avviare e verificare il redesign in locale.
