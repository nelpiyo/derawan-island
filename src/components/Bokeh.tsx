/**
 * Soft floating bokeh / light particles, pure CSS.
 * Decorative only — drop inside a relatively positioned parent.
 */
const Bokeh = ({ count = 18, className = "" }: { count?: number; className?: string }) => {
  const dots = Array.from({ length: count });
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((_, i) => {
        const size = 4 + ((i * 7) % 14);
        const left = (i * 53) % 100;
        const top = (i * 37) % 100;
        const delay = (i % 7) * 0.8;
        const duration = 9 + ((i * 3) % 8);
        const opacity = 0.12 + ((i % 5) * 0.05);
        return (
          <span
            key={i}
            className="absolute rounded-full bg-turquoise/70 blur-[2px] animate-drift"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Bokeh;
