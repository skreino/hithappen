"use client";
import { useState } from "react";
import { ArrowRight, ChatCircleDots, Check, Compass, MapPin, ShieldCheck, Sparkle } from "@phosphor-icons/react";
import { LanguageSwitch } from "@/components/ui/language-switch";
import { useLocale } from "@/lib/i18n/locale-provider";
import type { City, LocationConsent } from "@/lib/events/device-state";

const interests = ["Musica live", "Aperitivo", "DJ set", "Cultura", "Outdoor", "Food", "Cocktail", "Cinema"];
export function OnboardingFlow({ onComplete }: { onComplete: (city: City, interests: string[], locationConsent: LocationConsent) => void }) {
  const { t } = useLocale();
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<City>("Milano");
  const [selected, setSelected] = useState<string[]>([]);
  const [location, setLocation] = useState<LocationConsent>("unknown");
  const [locating, setLocating] = useState(false);
  const askLocation = () => {
    if (!navigator.geolocation) { setLocation("unavailable"); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(position => {
      setCity(position.coords.latitude > 45.53 ? "Monza" : "Milano"); setLocation("granted"); setLocating(false);
    }, error => { setLocation(error.code === 1 ? "denied" : error.code === 3 ? "timeout" : "unavailable"); setLocating(false); }, { timeout: 8000, maximumAge: 60000 });
  };
  const finish = () => onComplete(city, selected, location);
  return <main className="onboarding" aria-label={t("Benvenuto in HitHappen")}>
    <header><span className="brand-mark" role="img" aria-label="HitHappen" /><LanguageSwitch compact /></header>
    <div className="onboarding-progress" aria-label={`${step + 1} / 4`}>{[0,1,2,3].map(item => <i key={item} className={item <= step ? "is-active" : ""} />)}</div>
    {step === 0 && <section className="onboarding-panel onboarding-intro"><div className="onboarding-art" aria-hidden="true"><Sparkle size={34} weight="fill" /><span>19:30</span><span>1,8 km</span></div><p className="eyebrow">HITHAPPEN</p><h1>{t("La serata giusta, senza perderci la serata.")}</h1><p>{t("Eventi veri, vicini e facili da scegliere a Milano e Monza.")}</p></section>}
    {step === 1 && <section className="onboarding-panel"><div className="onboarding-icons"><Compass size={32} /><ArrowRight size={22} /><Sparkle size={32} weight="fill" /></div><p className="eyebrow">SCOPRI + MATCH</p><h1>{t("Esplora con calma. Decidi in un gesto.")}</h1><p>{t("La Home propone poche idee chiare. Match ti aiuta a scegliere eventi, mai persone.")}</p></section>}
    {step === 2 && <section className="onboarding-panel"><div className="onboarding-icons"><ShieldCheck size={34} /><ChatCircleDots size={34} /></div><p className="eyebrow">SOCIALE, CON CONSENSO</p><h1>{t("Prima partecipi. Poi scegli se entrare nel gruppo.")}</h1><p>{t("Il tuo profilo resta privato finché non aderisci esplicitamente al gruppo dell’evento.")}</p></section>}
    {step === 3 && <section className="onboarding-panel onboarding-choices"><p className="eyebrow">LA TUA CITTÀ</p><h1>{t("Cosa ti fa uscire di casa?")}</h1><p>{t("Scegli da 3 a 5 interessi. Potrai cambiarli dal Profilo.")}</p><div className="interest-picker">{interests.map(item => <button key={item} aria-pressed={selected.includes(item)} onClick={() => setSelected(current => current.includes(item) ? current.filter(value => value !== item) : current.length < 5 ? [...current, item] : current)}>{selected.includes(item) && <Check size={15} />}{t(item)}</button>)}</div><button className="location-choice" onClick={askLocation} disabled={locating}><MapPin size={20} />{locating ? t("Cerco la tua posizione...") : location === "granted" ? t("Posizione trovata.") : t("Usa la mia posizione")}</button><div className="city-choice" aria-label={t("Scegli città manualmente")}>{(["Milano","Monza"] as City[]).map(item => <button key={item} aria-pressed={city === item} onClick={() => setCity(item)}>{item}</button>)}</div>{location !== "unknown" && location !== "granted" && <p className="onboarding-note">{t("Nessun problema: scegli manualmente Milano o Monza.")}</p>}</section>}
    <footer><button className="onboarding-skip" onClick={finish}>{t("Salta")}</button><button className="onboarding-next" disabled={step === 3 && selected.length > 0 && selected.length < 3} onClick={() => step < 3 ? setStep(value => value + 1) : finish()}>{step === 3 ? t("Inizia") : t("Continua")}<ArrowRight size={18} /></button></footer>
  </main>;
}
