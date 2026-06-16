import { useEffect, useRef, useState } from "react";

interface ParallaxSectionProps {
  image: string;
  children: React.ReactNode;
  height?: string;
  speed?: number;
  overlayClass?: string;
  id?: string;
}

const ParallaxSection = ({
  image,
  children,
  height = "min-h-screen",
  speed = 0.4,
  overlayClass = "bg-gradient-to-b from-abyss/40 via-deep-sea/55 to-abyss/85",
  id,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const handle = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (visible) {
        // distance from viewport center
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        setOffset(-center * speed);
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(handle);
    };
    handle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative w-full overflow-hidden ${height}`}
    >
     <div aria-hidden className="absolute inset-0 -top-10 -bottom-10 will-change-transform" 
  style={{
    transform: `translate3d(0, ${offset}px, 0) scale(1.05)`, // Skala diturunkan!
  }}
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div aria-hidden className={`absolute inset-0 ${overlayClass}`} />
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
};

export default ParallaxSection;
