import { useLocale } from "@/lib/i18n/locale-provider";
import { ChatCircle, Compass, Cards, MapTrifold, UserCircle } from "@phosphor-icons/react";
export type AppTab = "discover" | "match" | "map" | "inbox" | "profile";
const items = [{id:"discover",label:"Scopri",icon:Compass},{id:"match",label:"Match",icon:Cards},{id:"map",label:"Mappa",icon:MapTrifold},{id:"inbox",label:"Inbox",icon:ChatCircle},{id:"profile",label:"Profilo",icon:UserCircle}] as const;
export function BottomNavigation({ active, onChange }: { active: AppTab; onChange: (tab: AppTab) => void }) {
  const { t } = useLocale();
  return <nav className="bottom-navigation" aria-label={t("Navigazione principale")}>{items.map(({id,label,icon:Icon}) => <button type="button" key={id} className={`${active === id ? "is-active" : ""} ${id === "map" ? "is-map" : ""}`} aria-current={active === id ? "page" : undefined} onClick={() => onChange(id)}><Icon size={24} weight={active === id || id === "map" ? "fill" : "regular"} /><span>{t(label)}</span></button>)}</nav>;
}
