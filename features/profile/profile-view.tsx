import { LanguageSwitch } from "@/components/ui/language-switch";
import { useLocale } from "@/lib/i18n/locale-provider";
/* eslint-disable @next/next/no-img-element -- Demo profile photography. */
import { MapPin } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import { CompactEventRow } from "@/components/events/compact-event-row";
export function ProfileView({ events, saved, onOpen }: { events: EventItem[]; saved: Set<string>; onOpen: (event: EventItem) => void }) {
  const { t } = useLocale();
  const savedEvents = events.filter(event => saved.has(event.id));
  return <main className="view standard-view profile-view"><header className="profile-header"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=82" alt={t("Profilo demo")} /><h1>{t("Il tuo spazio")}</h1><p><MapPin size={15} />{t("Milano · profilo demo")}</p></header><LanguageSwitch /><section className="profile-section"><h2>{t("I tuoi salvati")} · {savedEvents.length}</h2><p className="search-hint">{t("Qui trovi anche i “Mi interessa” di Match. Restano su questo dispositivo.")}</p>{savedEvents.length ? <div className="editorial-list">{savedEvents.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <p className="search-hint">{t("Nessun salvato. Usa il segnalibro su un evento o prova Match.")}</p>}</section></main>;
}
