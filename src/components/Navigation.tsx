import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/nature", label: "Nature" },
  { to: "/culture", label: "Culture" },
  { to: "/stories", label: "Stories" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3 glass shadow-deep" : "py-6 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.4em] text-turquoise">
            Berau · Kaltim
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-xs uppercase tracking-[0.25em] transition-colors duration-300 ${
                  active ? "text-coral" : "text-foam/70 hover:text-coral"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
