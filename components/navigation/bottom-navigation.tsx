import { ChatCircle, Compass, MagnifyingGlass, MapTrifold, UserCircle } from "@phosphor-icons/react";
export type AppTab = "discover" | "map" | "inbox" | "profile";
const items = [{id:"discover",label:"Scopri",icon:Compass},{id:"search",label:"Cerca",icon:MagnifyingGlass},{id:"map",label:"Mappa",icon:MapTrifold},{id:"inbox",label:"Inbox",icon:ChatCircle},{id:"profile",label:"Profilo",icon:UserCircle}] as const;

export function BottomNavigation({ active, onChange, onSearch }: { active: AppTab; onChange: (tab: AppTab) => void; onSearch: () => void }) {
  return <nav className="bottom-navigation" aria-label="Navigazione principale">{items.map(({id,label,icon:Icon}) => { const isActive = active === id; return <button type="button" key={id} className={`${isActive ? "is-active" : ""} ${id === "map" ? "is-map" : ""}`} aria-current={isActive ? "page" : undefined} onClick={() => id === "search" ? onSearch() : onChange(id as AppTab)}><Icon size={id === "map" ? 25 : 21} weight={isActive || id === "map" ? "fill" : "regular"} /><span>{label}</span></button>; })}</nav>;
}
