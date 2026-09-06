"use client";
import { useMemo } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { EventItem } from "@/data/mock-events";
import { rankEvents, type Choice, type DeviceAction } from "@/lib/events/device-state";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { MatchView } from "@/features/match/match-view";

export function DiscoverView({ events, interests, history, saved, onOpen, onAction, onProfile, onExplore, onPersonalize }: {
  events: EventItem[]; interests: string[]; history: Choice[]; saved: Set<string>;
  onOpen: (event: EventItem) => void; onAction: (action: DeviceAction) => void;
  onProfile: () => void; onExplore: () => void; onPersonalize: () => void;
}) {
  const { t } = useLocale();
  const ranked = useMemo(() => rankEvents(events, interests), [events, interests]);
  const current = ranked.find(event => !history.some(choice => choice.id === event.id));
  const recommendations = ranked.filter(event => event.id !== current?.id && !history.some(choice => choice.id === event.id)).slice(0, 3);
  return <main className="view discover-view">
    <div className="home-heading"><p>{t("ESPLORA LE SERATE")}</p><h1>{t("Il bello è qui vicino.")}</h1><span>{t("Destra è HIT. Sinistra è NOPE. La serata la scegli tu.")}</span></div>
    <MatchView embedded events={ranked} history={history} saved={saved} ready onOpen={onOpen} onAction={onAction} onProfile={onProfile} />
    <section className="home-picks" aria-labelledby="recommendations-heading">
      <div className="section-heading"><h2 id="recommendations-heading">{t("Potrebbero piacerti")}</h2><span>{t("Scelte per te · demo")}</span></div>
      <p className="recommendation-note">{t(interests.length ? "Dai tuoi interessi, con qualche nuova idea." : "Vicinanza e popolarità demo. Aggiungi i tuoi interessi per affinare le proposte.")}</p>
      {recommendations.length ? <div className="editorial-list">{recommendations.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <p className="search-hint">{t("Hai esplorato tutte le proposte. Ritrova i tuoi HIT nei salvati o riapri il catalogo.")}</p>}
      <button className="personalize-link" onClick={onPersonalize}>{t("Personalizza i tuoi interessi")}<ArrowRight size={16} /></button>
    </section>
    <button className="explore-button" onClick={onExplore}>{t("Esplora tutti")}<ArrowRight size={20} /></button>
  </main>;
}
