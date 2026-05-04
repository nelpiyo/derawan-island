import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Leaf,
  Users,
  BookOpen,
  Gamepad2,
  Map as MapIcon,
  Handshake,
  Menu,
  X,
  type LucideIcon,
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";
import type { Dict } from "@/i18n/dictionaries/id";

const links: { to: string; labelKey: keyof Dict; Icon: LucideIcon }[] = [
  { to: "/", labelKey: "nav.home", Icon: Home },
  { to: "/nature", labelKey: "nav.nature", Icon: Leaf },
  { to: "/culture", labelKey: "nav.culture", Icon: Users },
  { to: "/stories", labelKey: "nav.stories", Icon: BookOpen },
  { to: "/map", labelKey: "nav.map", Icon: MapIcon },
  { to: "/partners", labelKey: "nav.partners", Icon: Handshake },
  { to: "/play", labelKey: "nav.play", Icon: Gamepad2 },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? "py-3 glass shadow-deep" : "py-6 bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-4">
        <Link to="/" className="group flex items-center gap-2 shrink-0">
          <span className="text-xs uppercase tracking-[0.4em] text-turquoise">
            {t("nav.region")}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map(({ to, labelKey, Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                  active ? "text-coral" : "text-foam/70 hover:text-coral"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    active ? "text-coral" : "text-foam/60 group-hover:text-coral"
                  }`}
                  strokeWidth={1.75}
                />
                {t(labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="lg:hidden p-2 text-foam/80 hover:text-coral transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-foam/10 mt-3">
          <nav className="container flex flex-col py-4">
            {links.map(({ to, labelKey, Icon }) => {
              const active = pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 py-3 text-xs uppercase tracking-[0.25em] transition-colors ${
                    active ? "text-coral" : "text-foam/75 hover:text-coral"
                  }`}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                  {t(labelKey)}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
