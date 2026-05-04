import { useState } from "react";
import { useI18n } from "@/i18n";
import {
  CONSERVATION_PATH,
  ISLAND_SHAPES,
  MAP_LOCATIONS,
  type MapLayerKey,
  type MapLocation,
} from "@/data/mapLocations";

const LAYER_COLORS: Record<MapLayerKey, string> = {
  conservation: "hsl(var(--turquoise))",
  turtle: "hsl(var(--sand))",
  manta: "hsl(var(--lagoon))",
  coral: "hsl(var(--coral))",
  jellyfish: "hsl(var(--coral-glow))",
  threat: "hsl(0 80% 60%)",
};

const ALL_LAYERS: MapLayerKey[] = [
  "conservation",
  "turtle",
  "manta",
  "coral",
  "jellyfish",
  "threat",
];

const DerawanMap = () => {
  const { t, lang } = useI18n();
  const [active, setActive] = useState<Record<MapLayerKey, boolean>>({
    conservation: true,
    turtle: true,
    manta: true,
    coral: true,
    jellyfish: true,
    threat: true,
  });
  const [selected, setSelected] = useState<MapLocation | null>(null);

  const toggle = (k: MapLayerKey) =>
    setActive((p) => ({ ...p, [k]: !p[k] }));

  const layerLabel = (k: MapLayerKey) => t(`map.layer.${k}` as const);

  const visiblePins = MAP_LOCATIONS.filter((p) => active[p.layer]);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-6 lg:gap-10">
      {/* MAP CANVAS */}
      <div className="relative aspect-[10/7] w-full overflow-hidden border border-foam/10 bg-gradient-to-br from-deep-sea via-abyss to-deep-sea shadow-deep">
        {/* ocean texture */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 30%, hsl(var(--turquoise) / 0.18), transparent 50%), radial-gradient(circle at 75% 70%, hsl(var(--lagoon) / 0.15), transparent 55%)",
          }}
        />
        {/* subtle wave lines */}
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          viewBox="0 0 1000 700"
          preserveAspectRatio="none"
        >
          {[120, 220, 320, 420, 520, 620].map((y) => (
            <path
              key={y}
              d={`M0,${y} Q250,${y - 14} 500,${y} T1000,${y}`}
              stroke="hsl(var(--foam))"
              strokeWidth="1"
              fill="none"
            />
          ))}
        </svg>

        <svg
          viewBox="0 0 1000 700"
          className="relative w-full h-full"
          aria-label="Map of Derawan Archipelago"
        >
          {/* Conservation zone */}
          {active.conservation && (
            <g>
              <path
                d={CONSERVATION_PATH}
                fill={LAYER_COLORS.conservation}
                fillOpacity="0.08"
                stroke={LAYER_COLORS.conservation}
                strokeOpacity="0.55"
                strokeWidth="1.5"
                strokeDasharray="6 6"
              />
              <text
                x="500"
                y="100"
                textAnchor="middle"
                fontSize="12"
                fill={LAYER_COLORS.conservation}
                opacity="0.8"
                style={{ letterSpacing: "0.3em", textTransform: "uppercase" }}
              >
                {layerLabel("conservation")}
              </text>
            </g>
          )}

          {/* Islands */}
          {ISLAND_SHAPES.map((isl) => (
            <g key={isl.id}>
              <path
                d={isl.d}
                fill="hsl(var(--sand) / 0.85)"
                stroke="hsl(var(--foam) / 0.4)"
                strokeWidth="1"
              />
              <text
                x={isl.labelX}
                y={isl.labelY}
                textAnchor="middle"
                fontSize="11"
                fill="hsl(var(--abyss))"
                opacity="0.75"
                style={{ letterSpacing: "0.15em", fontWeight: 600 }}
              >
                {isl.label}
              </text>
            </g>
          ))}

          {/* Pins */}
          {visiblePins.map((pin) => {
            const color = LAYER_COLORS[pin.layer];
            const isSelected = selected?.id === pin.id;
            return (
              <g
                key={pin.id}
                transform={`translate(${pin.x}, ${pin.y})`}
                className="cursor-pointer"
                onClick={() => setSelected(pin)}
              >
                {isSelected && (
                  <circle r="22" fill={color} fillOpacity="0.18">
                    <animate
                      attributeName="r"
                      values="18;26;18"
                      dur="1.6s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
                <circle
                  r="11"
                  fill={color}
                  fillOpacity="0.9"
                  stroke="hsl(var(--abyss))"
                  strokeWidth="1.5"
                />
                <text
                  textAnchor="middle"
                  y="4"
                  fontSize="11"
                >
                  {pin.emoji}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Popup */}
        {selected && (
          <div
            className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xs glass-light p-5 shadow-deep animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block w-2.5 h-2.5 rounded-full"
                  style={{ background: LAYER_COLORS[selected.layer] }}
                />
                <p className="text-[10px] uppercase tracking-[0.3em] text-foam/60">
                  {layerLabel(selected.layer)}
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="text-foam/60 hover:text-coral transition-colors text-lg leading-none"
              >
                ×
              </button>
            </div>
            <h4 className="font-display text-xl text-foam mt-2 leading-tight">
              {selected.emoji} {selected.name}
            </h4>
            <p className="mt-2 text-sm text-foam/75 leading-relaxed">
              {lang === "en" ? selected.description_en : selected.description_id}
            </p>
          </div>
        )}
      </div>

      {/* LEGEND */}
      <aside className="lg:sticky lg:top-28 self-start">
        <p className="text-xs uppercase tracking-[0.4em] text-coral mb-5">
          {t("map.legend")}
        </p>
        <ul className="space-y-2">
          {ALL_LAYERS.map((k) => (
            <li key={k}>
              <button
                type="button"
                onClick={() => toggle(k)}
                aria-pressed={active[k]}
                className={`w-full flex items-center gap-3 px-4 py-3 border text-left transition-all duration-300 ${
                  active[k]
                    ? "border-foam/30 bg-foam/5"
                    : "border-foam/10 bg-transparent opacity-50"
                } hover:border-coral/60`}
              >
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{ background: LAYER_COLORS[k] }}
                />
                <span className="text-sm text-foam/85">{layerLabel(k)}</span>
                <span
                  className={`ml-auto text-[10px] uppercase tracking-[0.2em] ${
                    active[k] ? "text-coral" : "text-foam/40"
                  }`}
                >
                  {active[k] ? "On" : "Off"}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[11px] leading-relaxed text-foam/50 italic">
          {t("map.note")}
        </p>
      </aside>
    </div>
  );
};

export default DerawanMap;
