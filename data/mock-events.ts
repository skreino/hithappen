import { createRelativeDate } from "@/lib/events/date";

export type EventCategory = "Aperitivo" | "Musica live" | "Club" | "Food" | "Outdoor" | "Cultura" | "Bar" | "Elettronica";

export type EventItem = {
  id: string;
  title: string;
  venue: string;
  category: EventCategory;
  description: string;
  image: string;
  startAt: string;
  endAt: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  city: string;
  distanceKm: number;
  price: number;
  currency: "EUR";
  attendeeCount: number;
  isFeatured: boolean;
  tags: string[];
  imageAlt?: string;
  suggestionReason?: "nearby" | "interest" | "popular";
  ticketStatus?: "unavailable-demo" | "external";
};

const localImages = ["/events/rooftop.png", "/events/live.png", "/events/club.png"];
const image = (id: string) => localImages[[...id].reduce((total, char) => total + char.charCodeAt(0), 0) % localImages.length];
const currentDay = new Date().getDay();
const nextWeekendFriday = currentDay === 6 ? 0 : currentDay === 0 ? 5 : 5 - currentDay;

export const mockEvents: EventItem[] = [
  { id:"rooftop-navigli", title:"Rooftop al tramonto", venue:"Terrazza Navigli", category:"Aperitivo", description:"Cocktail, piccoli piatti e un DJ set morbido sopra i tetti dei Navigli. Arriva prima del tramonto per goderti la luce migliore.", image:"/events/rooftop.png", startAt:createRelativeDate(0,19,30), endAt:createRelativeDate(0,23,45), latitude:45.4518, longitude:9.1723, neighborhood:"Navigli", city:"Milano", distanceKm:1.8, price:12, currency:"EUR", attendeeCount:24, isFeatured:true, tags:["Terrazza","Cocktail","DJ set"] },
  { id:"biko-live", title:"Live indie al Biko", venue:"Biko Milano", category:"Musica live", description:"Tre band emergenti, una sala raccolta e musica suonata davvero vicina al pubblico.", image:image("photo-1524368535928-5b5e00ddc76b"), startAt:createRelativeDate(0,21,30), endAt:createRelativeDate(1,0,30), latitude:45.4377, longitude:9.1768, neighborhood:"Barona", city:"Milano", distanceKm:2.4, price:15, currency:"EUR", attendeeCount:18, isFeatured:false, tags:["Indie","Live"] },
  { id:"isola-bar", title:"Vinili e cocktail", venue:"Ceresio 7 Bar", category:"Bar", description:"Selezione soul e funk in vinile, cocktail essenziali e tavoli condivisi.", image:image("photo-1470337458703-46ad1756a187"), startAt:createRelativeDate(0,20,0), endAt:createRelativeDate(0,23,59), latitude:45.4901, longitude:9.1834, neighborhood:"Isola", city:"Milano", distanceKm:3.1, price:0, currency:"EUR", attendeeCount:31, isFeatured:false, tags:["Vinili","Cocktail"] },
  { id:"porta-venezia-club", title:"Notte Panorama", venue:"Apollo Club", category:"Club", description:"House, disco e visual immersivi fino a tardi, in uno degli spazi più vivi della città.", image:image("photo-1527529482837-4698179dc6ce"), startAt:createRelativeDate(0,23,30), endAt:createRelativeDate(1,4,0), latitude:45.4742, longitude:9.2056, neighborhood:"Porta Venezia", city:"Milano", distanceKm:2.2, price:18, currency:"EUR", attendeeCount:68, isFeatured:false, tags:["Disco","House"] },
  { id:"domani-social-dinner", title:"Tavolata senza prenotazioni", venue:"Frangente", category:"Food", description:"Una cena sociale con menu condiviso, posti liberi e nuove persone da conoscere.", image:image("photo-1528605248644-14dd04022da1"), startAt:createRelativeDate(1,20,15), endAt:createRelativeDate(1,23,0), latitude:45.4839, longitude:9.1811, neighborhood:"Monumentale", city:"Milano", distanceKm:2.7, price:28, currency:"EUR", attendeeCount:14, isFeatured:false, tags:["Cena","Sociale"] },
  { id:"domani-elettronica", title:"Signals: live electronics", venue:"Tempio del Futuro Perduto", category:"Elettronica", description:"Live set elettronici e performance audiovisive tra artisti italiani e ospiti europei.", image:image("photo-1506157786151-b8491531f063"), startAt:createRelativeDate(1,22,0), endAt:createRelativeDate(2,3,0), latitude:45.4917, longitude:9.1751, neighborhood:"Monumentale", city:"Milano", distanceKm:3.6, price:20, currency:"EUR", attendeeCount:52, isFeatured:false, tags:["Live set","Visual"] },
  { id:"domani-outdoor", title:"Cinema sotto gli alberi", venue:"Parco Sempione", category:"Outdoor", description:"Un classico italiano proiettato all’aperto. Porta una coperta, le cuffie sono incluse.", image:image("photo-1488841714725-bb4c32d1ac94"), startAt:createRelativeDate(1,21,0), endAt:createRelativeDate(1,23,20), latitude:45.4736, longitude:9.1762, neighborhood:"Sempione", city:"Milano", distanceKm:1.2, price:8, currency:"EUR", attendeeCount:43, isFeatured:false, tags:["Cinema","Parco"] },
  { id:"weekend-gallery", title:"Apertura serale: Forme vive", venue:"Pirelli HangarBicocca", category:"Cultura", description:"La mostra resta aperta fino a tardi con una visita breve curata dal team del museo.", image:image("photo-1561214115-f2f134cc4912"), startAt:createRelativeDate(nextWeekendFriday,18,30), endAt:createRelativeDate(nextWeekendFriday,22,0), latitude:45.5211, longitude:9.2199, neighborhood:"Bicocca", city:"Milano", distanceKm:6.4, price:0, currency:"EUR", attendeeCount:37, isFeatured:false, tags:["Arte","Mostra"] },
  { id:"weekend-jazz", title:"Jazz nel cortile", venue:"Cascina Cuccagna", category:"Musica live", description:"Quartetto contemporaneo, cucina aperta e un cortile tranquillo nel cuore di Porta Romana.", image:image("photo-1511192336575-5a79af67a629"), startAt:createRelativeDate(nextWeekendFriday + 1,20,30), endAt:createRelativeDate(nextWeekendFriday + 1,23,0), latitude:45.4518, longitude:9.2111, neighborhood:"Porta Romana", city:"Milano", distanceKm:2.9, price:10, currency:"EUR", attendeeCount:22, isFeatured:false, tags:["Jazz","Cortile"] },
  { id:"weekend-brunch", title:"Brunch lungo in cascina", venue:"Cascina Nascosta", category:"Food", description:"Piatti di stagione, tavoli nel verde e musica selezionata con calma per tutta la domenica.", image:image("photo-1515003197210-e0cd71810b5f"), startAt:createRelativeDate(nextWeekendFriday + 2,12,0), endAt:createRelativeDate(nextWeekendFriday + 2,16,30), latitude:45.4711, longitude:9.1747, neighborhood:"Sempione", city:"Milano", distanceKm:1.5, price:22, currency:"EUR", attendeeCount:19, isFeatured:false, tags:["Brunch","Giardino"] },
  { id:"weekend-darsena", title:"Darsena al mattino", venue:"Darsena", category:"Outdoor", description:"Camminata urbana guidata lungo l’acqua con una sosta finale per il caffè.", image:image("photo-1500530855697-b586d89ba3ee"), startAt:createRelativeDate(nextWeekendFriday + 2,10,0), endAt:createRelativeDate(nextWeekendFriday + 2,12,0), latitude:45.4521, longitude:9.1752, neighborhood:"Darsena", city:"Milano", distanceKm:1.6, price:0, currency:"EUR", attendeeCount:16, isFeatured:false, tags:["Walk","Città"] },
  { id:"next-week-disco", title:"Disco italiana", venue:"Santeria Toscana 31", category:"Club", description:"Una notte dedicata alla disco italiana, tra classici, nuove produzioni e pista piena.", image:image("photo-1492684223066-81342ee5ff30"), startAt:createRelativeDate(7,22,30), endAt:createRelativeDate(8,3,0), latitude:45.4468, longitude:9.2077, neighborhood:"Ticinese", city:"Milano", distanceKm:2.8, price:16, currency:"EUR", attendeeCount:47, isFeatured:false, tags:["Disco","Italiano"] },
  { id:"monza-corte", title:"Corte sonora", venue:"Arengario di Monza", category:"Musica live", description:"Live acustico serale nel centro di Monza, con piccoli produttori e tavoli condivisi.", image:image("monza-corte"), startAt:createRelativeDate(0,20,30), endAt:createRelativeDate(0,23,30), latitude:45.5845, longitude:9.2745, neighborhood:"Centro", city:"Monza", distanceKm:13.8, price:9, currency:"EUR", attendeeCount:29, isFeatured:false, tags:["Live","Outdoor"] },
  { id:"monza-aperitivo", title:"Aperitivo nel giardino", venue:"Mulino Colombo", category:"Aperitivo", description:"Cocktail stagionali e selezione downtempo in un giardino nascosto lungo il Lambro.", image:image("monza-aperitivo"), startAt:createRelativeDate(1,19,0), endAt:createRelativeDate(1,23,0), latitude:45.5881, longitude:9.2802, neighborhood:"San Gerardo", city:"Monza", distanceKm:14.2, price:14, currency:"EUR", attendeeCount:21, isFeatured:false, tags:["Cocktail","Giardino"] },
  { id:"monza-villa", title:"Cinema alla Villa Reale", venue:"Villa Reale", category:"Cultura", description:"Proiezione all'aperto nel parco con introduzione del curatore e cuffie incluse.", image:image("monza-villa"), startAt:createRelativeDate(nextWeekendFriday + 1,21,0), endAt:createRelativeDate(nextWeekendFriday + 1,23,30), latitude:45.593, longitude:9.2734, neighborhood:"Parco", city:"Monza", distanceKm:14.7, price:7, currency:"EUR", attendeeCount:44, isFeatured:false, tags:["Cinema","Outdoor"] },
  { id:"monza-track", title:"After race social club", venue:"Autodromo Nazionale", category:"Club", description:"DJ set, visual e area social dopo una giornata nel parco di Monza.", image:image("monza-track"), startAt:createRelativeDate(nextWeekendFriday + 2,18,30), endAt:createRelativeDate(nextWeekendFriday + 2,23,0), latitude:45.6206, longitude:9.2811, neighborhood:"Autodromo", city:"Monza", distanceKm:17.1, price:20, currency:"EUR", attendeeCount:56, isFeatured:false, tags:["DJ set","Sociale"] },
];

for (const event of mockEvents) {
  event.imageAlt ??= `${event.title} a ${event.venue}`;
  event.suggestionReason ??= event.distanceKm <= 2 ? "nearby" : event.attendeeCount >= 40 ? "popular" : "interest";
  event.ticketStatus ??= "unavailable-demo";
}
