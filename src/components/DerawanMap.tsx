import { useMemo, useState } from "react";
import { MapContainer, TileLayer, LayersControl, Marker, Popup, CircleMarker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useI18n } from "@/i18n";
import { MAP_LOCATIONS, type MapLayerKey } from "@/data/mapLocations";

// Fix default marker icon paths (Leaflet + bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Real coordinates [lat, lng] for the Derawan archipelago
const COORDS: Record<string, [number, number]> = {
  "derawan-village": [2.2858, 118.2436],
  "derawan-turtle": [2.2812, 118.2475],
  "sangalaki-turtle": [2.0884, 118.3915],
  "sangalaki-manta": [2.0850, 118.3970],
  "kakaban-jellyfish": [2.1428, 118.5260],
  "maratua-manta": [2.2360, 118.5750],
  "maratua-coral": [2.2466, 118.6022],
  "threat-tanjungbatu": [2.2710, 118.0560],
  "threat-derawan-coast": [2.2868, 118.2418],
};

const LAYER_COLORS: Record<MapLayerKey, string> = {
  conservation: "#22d3ee",
  turtle: "#f97316",
  manta: "#a855f7",
  coral: "#ec4899",
  jellyfish: "#facc15",
  threat: "#ef4444",
};

const ALL_LAYERS: MapLayerKey[] = ["conservation", "turtle", "manta", "coral", "jellyfish", "threat"];

const DerawanMap = () => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Set<MapLayerKey>>(new Set(ALL_LAYERS));

  const toggle = (k: MapLayerKey) =>
    setActive((prev) => {
      const next = new Set(prev);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });

  const visible = useMemo(
    () => MAP_LOCATIONS.filter((p) => active.has(p.layer) && COORDS[p.id]),
    [active]
  );

  const layerLabel = (k: MapLayerKey) =>
    t(`map.layer.${k}` as Parameters<typeof t>[0]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* MAP */}
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden rounded-sm border border-foam/10">
        <MapContainer
          center={[2.20, 118.40]}
          zoom={11}
          minZoom={9}
          maxZoom={18}
          scrollWheelZoom
          className="h-full w-full bg-abyss"
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer checked name="Satellite (Esri)">
              <TileLayer
                attribution="Tiles &copy; Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                maxZoom={19}
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Labels & Roads">
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.Overlay checked name="Place labels">
              <TileLayer
                url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                attribution="Labels &copy; Esri"
              />
            </LayersControl.Overlay>
          </LayersControl>

          {visible.map((p) => {
            const pos = COORDS[p.id];
            const color = LAYER_COLORS[p.layer];
            return (
              <CircleMarker
                key={p.id}
                center={pos}
                radius={9}
                pathOptions={{
                  color: "#ffffff",
                  weight: 2,
                  fillColor: color,
                  fillOpacity: 0.9,
                }}
              >
                <Tooltip direction="top" offset={[0, -6]} opacity={1}>
                  <span className="font-medium">{p.emoji} {p.name}</span>
                </Tooltip>
                <Popup>
                  <div className="min-w-[200px]">
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color }}>
                      {layerLabel(p.layer)}
                    </div>
                    <div className="font-semibold mb-1">{p.emoji} {p.name}</div>
                    <p className="text-xs leading-relaxed">
                      {lang === "id" ? p.description_id : p.description_en}
                    </p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>

      {/* LEGEND / LAYER TOGGLES */}
      <aside className="space-y-4">
        <div className="border border-foam/10 p-5 rounded-sm bg-deep-sea/40">
          <p className="text-xs uppercase tracking-[0.3em] text-turquoise mb-4">
            {t("map.legend")}
          </p>
          <ul className="space-y-2">
            {ALL_LAYERS.map((k) => {
              const on = active.has(k);
              return (
                <li key={k}>
                  <button
                    type="button"
                    onClick={() => toggle(k)}
                    aria-pressed={on}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm rounded-sm border transition-colors ${
                      on
                        ? "border-foam/20 bg-foam/5 text-foam"
                        : "border-foam/5 text-foam/40 hover:text-foam/70"
                    }`}
                  >
                    <span
                      className="inline-block h-3 w-3 rounded-full ring-2 ring-white/80"
                      style={{ backgroundColor: LAYER_COLORS[k], opacity: on ? 1 : 0.3 }}
                    />
                    <span className="flex-1">{layerLabel(k)}</span>
                    <span className="text-[10px] uppercase tracking-wider">
                      {on ? "ON" : "OFF"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="text-xs text-foam/50 leading-relaxed px-1">
          {t("map.note")}
        </p>
      </aside>
    </div>
  );
};

export default DerawanMap;
