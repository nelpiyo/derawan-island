import { useEffect, useState } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#archipelago", label: "Archipelago" },
  { href: "#ecology", label: "Ecology" },
  { href: "#wisdom", label: "Local Wisdom" },
  { href: "#economy", label: "Economy" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 glass shadow-deep"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#home" className="group flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.4em] text-turquoise">
            Berau · Kaltim
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs uppercase tracking-[0.25em] text-foam/70 hover:text-coral transition-colors duration-300"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#economy"
          className="hidden md:inline-block text-xs uppercase tracking-[0.25em] border border-foam/30 px-5 py-2 hover:bg-coral hover:border-coral hover:text-primary-foreground transition-all duration-300"
        >
          Act Today
        </a>
      </div>
    </header>
  );
};

export default Navigation;
