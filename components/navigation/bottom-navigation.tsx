import { ChatCircle, Compass, MapTrifold, UserCircle } from "@phosphor-icons/react";
export type AppTab = "discover" | "map" | "inbox" | "profile";
const items = [{id:"discover",label:"Scopri",icon:Compass},{id:"map",label:"Mappa",icon:MapTrifold},{id:"inbox",label:"Inbox",icon:ChatCircle},{id:"profile",label:"Profilo",icon:UserCircle}] as const;

export function BottomNavigation({ active, onChange }: { active: AppTab; onChange: (tab: AppTab) => void }) {
  return <nav className="bottom-navigation" aria-label="Navigazione principale">{items.map(({id,label,icon:Icon}) => <button type="button" key={id} className={`${active === id ? "is-active" : ""} ${id === "map" ? "is-map" : ""}`} aria-current={active === id ? "page" : undefined} onClick={() => onChange(id)}><Icon size={22} weight={active === id ? "fill" : "regular"} /><span>{label}</span></button>)}</nav>;
}
