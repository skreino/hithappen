# Fotografie editoriali demo

Le fotografie illustrano tipologie di serate: non documentano gli eventi o i locali nominati nelle fixture. Nessun nuovo dato sociale, prezzo o evento è stato aggiunto. Gli originali precedenti sono conservati; le nuove immagini hanno nomi v2 e formato WebP, larghezza massima 900 px.

## Generazione integrata imagegen

File in `public/events/`: `live-v2.webp`, `rooftop-v2.webp`, `cinema-v2.webp`, `jazz-v2.webp`, `walk-v2.webp`, `garden-v2.webp`. Generati con lo strumento integrato, non tramite API/CLI. Ottimizzazione WebP qualità 80, larghezza 900 px.

Prompt comune: “Use case: photorealistic-natural. Asset type: standalone event demo photograph for HitHappen mobile app, not a UI mockup. [Scene] Portrait 4:5 frame, realistic natural detail, refined film color, retain scene readability on small screens. No interface, borders, text, lettering, logos, watermarks or collage.”

Scene specifiche:

- Live: “Intimate Italian live music venue at night, wide view from back of room across seated audience and candlelit tables toward a small indie band stage, warm pendant lamps and blue stage lighting, no close-up face, premium candid editorial photography.”
- Rooftop: “A Milan rooftop terrace at sunset with small groups of adults chatting over aperitivo, warm peach sky, distant tiled roofs, elegant relaxed atmosphere, candid premium editorial travel photography, no prominent close-up people.”
- Cinema: “Outdoor cinema in a leafy Italian city park at blue hour, chairs facing a luminous blank distant screen, warm strings of small bulbs among trees, atmospheric candid editorial photo, no identifiable movie content.”
- Jazz: “An intimate Italian jazz club with a saxophone player and double bassist on a small stage, audience in shadow, amber spotlights, deep velvet black surroundings, candid editorial music photography.”

## Altre fotografie illustrative

Per passeggiata e giardino, prompt comune: “Use case: photorealistic-natural. Standalone illustrative photograph for a fictional HitHappen event, not a UI. [Scene] Portrait 4:5 composition, subtle editorial film colors, natural realistic detail. No lettering, no logos, no watermark, no borders or interface.”

- Passeggiata: “A quiet morning walk along a small canal in the Navigli district of Milan: calm water, simple low-rise ochre apartment facades, cobbled towpath, a few walkers seen from behind. NO Venice, NO domes, NO monumental churches, NO gondolas.”
- Giardino: “A secluded Italian courtyard garden aperitivo: leafy trees and potted plants surround outdoor tables with cocktail glasses, a few adult friends chatting quietly in the distance. Entirely outdoors, warm early evening light, no restaurant interior.”

Le altre dieci immagini provengono da Unsplash, con identificativi e URL riproducibili in `scripts/prepare-editorial-photos.mjs`. Sono salvate localmente: il client non dipende dalla disponibilità del CDN. Una foto distinta per ciascuno dei 16 eventi; nessuna selezione casuale a runtime.
