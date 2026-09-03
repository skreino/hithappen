"use client";
import { useLocale } from "@/lib/i18n/locale-provider";

import { useEffect, useRef, useState } from "react";
import type { LayerGroup, Map as LeafletMap } from "leaflet";
import type { EventItem } from "@/data/mock-events";

type Coordinates = { latitude: number; longitude: number };

export function EventMap({ events, selectedId, onSelect, compact = false, userLocation }: { events: EventItem[]; selectedId?: string; onSelect: (event: EventItem) => void; compact?: boolean; userLocation?: Coordinates | null }) {
  const { t } = useLocale();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const eventLayerRef = useRef<LayerGroup | null>(null);
  const userLayerRef = useRef<LayerGroup | null>(null);
  const initialEventRef = useRef(events[0]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let observer: ResizeObserver | undefined;
    const timeout = window.setTimeout(() => { if (!cancelled) setError("La cartografia sta impiegando troppo. Puoi usare la lista eventi."); }, 12000);
    if (!containerRef.current || mapRef.current) return;

    void import("leaflet").then((leaflet) => {
      if (cancelled || !containerRef.current) return;
      const initial = initialEventRef.current ?? { latitude: 45.4642, longitude: 9.19 };
      const map = leaflet.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
        preferCanvas: false,
      }).setView([initial.latitude, initial.longitude], compact ? 14 : 12);

      leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        maxZoom: 19,
      }).on("tileerror", () => { if (!cancelled) setError("Cartografia non disponibile. La lista eventi resta utilizzabile."); })
        .on("load", () => window.clearTimeout(timeout)).addTo(map);
      if (!compact) leaflet.control.zoom({ position: "topright", zoomInTitle: t("Aumenta zoom"), zoomOutTitle: t("Riduci zoom") }).addTo(map);
      mapRef.current = map;
      eventLayerRef.current = leaflet.layerGroup().addTo(map);
      userLayerRef.current = leaflet.layerGroup().addTo(map);
      observer = new ResizeObserver(() => map.invalidateSize());
      observer.observe(containerRef.current);
      setReady(true);
    }).catch(() => { if (!cancelled) setError("Non riesco a caricare la mappa. Usa la lista eventi."); });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      eventLayerRef.current = null;
      userLayerRef.current = null;
    };
  }, [compact, attempt, t]);

  useEffect(() => {
    if (!ready || !mapRef.current || !eventLayerRef.current) return;
    let cancelled = false;
    void import("leaflet").then((leaflet) => {
      if (cancelled || !mapRef.current || !eventLayerRef.current) return;
      eventLayerRef.current.clearLayers();
      const layer = eventLayerRef.current;
      const points: [number, number][] = [];
      events.forEach((event) => {
        points.push([event.latitude, event.longitude]);
        const price = event.price === 0 ? t("Gratis") : `${event.price}€`;
        const marker = leaflet.marker([event.latitude, event.longitude], {
          title: t(event.title),
          alt: `${t(event.title)}, ${event.neighborhood}`,
          icon: leaflet.divIcon({
            className: `leaflet-event-icon ${event.id === selectedId ? "is-selected" : ""}`,
            html: `<span>${price}</span>`,
            iconSize: [54, 48],
            iconAnchor: [27, 38],
          }),
        }).addTo(layer);
        marker.on("click", () => onSelect(event));
        marker.getElement()?.setAttribute("aria-label", `${t(event.title)}, ${price}`);
        marker.getElement()?.setAttribute("aria-pressed", String(event.id === selectedId));
      });

      if (compact && points[0]) mapRef.current.setView(points[0], 14, { animate: false });
      else if (!selectedId && points.length > 1) mapRef.current.fitBounds(points, { padding: [54, 54], maxZoom: 13 });
    });
    return () => { cancelled = true; };
  }, [events, onSelect, ready, selectedId, compact, t]);

  useEffect(() => {
    if (!ready || !selectedId || !mapRef.current) return;
    const selected = events.find((event) => event.id === selectedId);
    if (selected && !compact) mapRef.current.flyTo([selected.latitude, selected.longitude], Math.max(mapRef.current.getZoom(), 13), { duration: .55, animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches });
  }, [compact, events, ready, selectedId]);

  useEffect(() => {
    if (!ready || !mapRef.current || !userLayerRef.current) return;
    let cancelled = false;
    void import("leaflet").then((leaflet) => {
      if (cancelled || !mapRef.current || !userLayerRef.current) return;
      userLayerRef.current.clearLayers();
      if (!userLocation) return;
      const userMarker = leaflet.circleMarker([userLocation.latitude, userLocation.longitude], { radius: 9, weight: 4, color: "#ffffff", fillColor: "#2563eb", fillOpacity: 1, className: "user-location-marker" }).addTo(userLayerRef.current);
      userMarker.getElement()?.setAttribute("role", "img");
      userMarker.getElement()?.setAttribute("aria-label", t("La tua posizione"));
      mapRef.current.flyTo([userLocation.latitude, userLocation.longitude], 14, { duration: .7, animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    });
    return () => { cancelled = true; };
  }, [ready, userLocation, t]);

  return <div className={`event-map ${compact ? "event-map--compact" : ""}`}><div ref={containerRef} className="leaflet-map-canvas" aria-label={t("Mappa interattiva degli eventi")} />{!ready && !error && <div className="map-loading" aria-live="polite">{t("Carico la mappa…")}</div>}{error && <div className="map-error" role="status">{t(error)}<button onClick={() => { setReady(false); setError(""); setAttempt(value => value + 1); }}>{t("Riprova")}</button></div>}</div>;
}
