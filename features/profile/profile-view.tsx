"use client";
/* eslint-disable @next/next/no-img-element -- Small local profile imagery does not affect LCP. */
import { useState } from "react";
import { Bell, BookmarkSimple, MapPin, PencilSimple, ShieldCheck, Trash, UsersThree } from "@phosphor-icons/react";
import type { EventItem } from "@/data/mock-events";
import type { City, DeviceAction, DeviceState } from "@/lib/events/device-state";
import { CompactEventRow } from "@/components/events/compact-event-row";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { useLocale } from "@/lib/i18n/locale-provider";

const interestOptions = ["Musica live", "Aperitivo", "DJ set", "Cultura", "Outdoor", "Food", "Cocktail", "Cinema"];
export function ProfileView({ events, state, onAction, onOpen }: { events: EventItem[]; state: DeviceState; onAction: (action: DeviceAction) => void; onOpen: (event: EventItem) => void }) {
  const { t } = useLocale();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(state.profile);
  const savedEvents = events.filter(event => state.saved.includes(event.id));
  const pastEvents = events.slice(-2);
  const saveProfile = () => { onAction({ type: "update-profile", profile: draft }); setEditing(false); };
  return <main className="view standard-view profile-view"><header className="profile-header"><div className="profile-avatar"><img src={state.profile.avatar} alt={t("Profilo demo")} /><button aria-label={t("Modifica profilo")} onClick={() => setEditing(value => !value)}><PencilSimple size={17} /></button></div><h1>{state.profile.name}</h1><p><MapPin size={15} />{state.profile.city} · {t("profilo demo")}</p><span>{t(state.profile.bio)}</span></header>
    {editing && <section className="profile-editor"><label>{t("Nome")}<input value={draft.name} onChange={event => setDraft(current => ({ ...current, name: event.target.value }))} /></label><label>{t("Bio")}<textarea value={draft.bio} onChange={event => setDraft(current => ({ ...current, bio: event.target.value }))} /></label><div className="city-choice">{(["Milano","Monza"] as City[]).map(city => <button key={city} aria-pressed={draft.city === city} onClick={() => setDraft(current => ({ ...current, city }))}>{city}</button>)}</div><div className="interest-picker">{interestOptions.map(item => <button key={item} aria-pressed={draft.interests.includes(item)} onClick={() => setDraft(current => ({ ...current, interests: current.interests.includes(item) ? current.interests.filter(value => value !== item) : [...current.interests, item].slice(0,5) }))}>{t(item)}</button>)}</div><button className="primary-cta" onClick={saveProfile}>{t("Salva modifiche")}</button></section>}
    <LanguageSwitch />
    <section className="profile-section"><h2><BookmarkSimple size={21} />{t("I tuoi salvati")} · {savedEvents.length}</h2>{savedEvents.length ? <div className="editorial-list">{savedEvents.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div> : <p className="search-hint">{t("Nessun salvato. Usa il segnalibro su un evento o prova Match.")}</p>}</section>
    <section className="profile-section"><h2><UsersThree size={21} />{t("Eventi passati · demo")}</h2><div className="editorial-list">{pastEvents.map(event => <CompactEventRow key={event.id} event={event} onOpen={() => onOpen(event)} />)}</div></section>
    <section className="settings-section"><h2><ShieldCheck size={21} />{t("Privacy")}</h2><Toggle label={t("Mostra la bio nei gruppi")} checked={state.privacy.showBio} onChange={value => onAction({ type: "update-privacy", value: { showBio: value } })} /><Toggle label={t("Mostra gli interessi condivisi")} checked={state.privacy.showInterests} onChange={value => onAction({ type: "update-privacy", value: { showInterests: value } })} /><Toggle label={t("Consenti richieste di contatto")} checked={state.privacy.allowRequests} onChange={value => onAction({ type: "update-privacy", value: { allowRequests: value } })} /></section>
    <section className="settings-section"><h2><Bell size={21} />{t("Preferenze notifiche")}</h2><p>{t("Solo preferenze locali: nessun permesso browser e nessun invio reale.")}</p><Toggle label={t("Promemoria eventi")} checked={state.notifications.eventReminders} onChange={value => onAction({ type: "update-notifications", value: { eventReminders: value } })} /><Toggle label={t("Messaggi dei gruppi")} checked={state.notifications.groupMessages} onChange={value => onAction({ type: "update-notifications", value: { groupMessages: value } })} /><Toggle label={t("Suggerimenti settimanali")} checked={state.notifications.recommendations} onChange={value => onAction({ type: "update-notifications", value: { recommendations: value } })} /></section>
    <div className="profile-actions"><button className="secondary-cta" onClick={() => onAction({ type: "reopen-onboarding" })}>{t("Rivedi onboarding")}</button><button className="danger-cta" onClick={() => onAction({ type: "reset-demo" })}><Trash size={18} />{t("Reset dati demo")}</button></div>
  </main>;
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (value: boolean) => void }) { return <label className="setting-row"><span>{label}</span><input type="checkbox" role="switch" checked={checked} onChange={event => onChange(event.target.checked)} /></label>; }
