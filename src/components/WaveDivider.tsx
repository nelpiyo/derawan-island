interface Props {
  /** Color of the wave fill, in HSL like "205 80% 6%" or a CSS color. Default = abyss */
  fill?: string;
  flip?: boolean;
  className?: string;
}

/**
 * Organic, layered wave divider used to softly transition between sections.
 * Designed to be placed at the very bottom (or top, with flip) of a section,
 * with the matching `fill` set to the *next* section's background color.
 */
const WaveDivider = ({ fill = "hsl(var(--abyss))", flip = false, className = "" }: Props) => {
  return (
    <div
      aria-hidden
      className={`pointer-events-none relative w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block w-full h-[80px] md:h-[120px]"
      >
        <path
          d="M0,64 C240,112 480,16 720,48 C960,80 1200,112 1440,64 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.35"
        />
        <path
          d="M0,80 C260,40 520,120 780,72 C1040,32 1240,96 1440,72 L1440,120 L0,120 Z"
          fill={fill}
          opacity="0.6"
        />
        <path
          d="M0,96 C300,56 600,120 900,88 C1140,64 1320,104 1440,88 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default WaveDivider;
