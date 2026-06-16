import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Leaf,
  Users,
  BookOpen,
  Gamepad2,
  Award,
  Compass,
  ExternalLink,
  Menu,
  X,
  Shield,
  LogOut,
  type LucideIcon,
} from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useI18n } from "@/i18n";
import type { Dict } from "@/i18n/dictionaries/id";
import { supabase } from "@/integrations/supabase/client";

const links: { to: string; labelKey: keyof Dict; Icon: LucideIcon }[] = [
  { to: "/", labelKey: "nav.home", Icon: Home },
  { to: "/nature", labelKey: "nav.nature", Icon: Leaf },
  { to: "/culture", labelKey: "nav.culture", Icon: Users },
  { to: "/stories", labelKey: "nav.stories", Icon: BookOpen },
  { to: "/explore", labelKey: "nav.explore", Icon: Compass },
  { to: "/play", labelKey: "nav.play", Icon: Gamepad2 },
];

const externalLink = {
  href: "https://derawan-island-adventure-pi.vercel.app/",
  labelKey: "nav.heroes" as keyof Dict,
  Icon: Award,
};

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { pathname } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id;
      setIsLoggedIn(!!userId);
      if (!userId) {
        setIsAdmin(false);
        return;
      }
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      setIsAdmin(!!data);
    };
    checkAuth();
    const { data: sub } = supabase.auth.onAuthStateChange(() => checkAuth());
    return () => sub.subscription.unsubscribe();
  }, []);

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 backdrop-blur-xl border-b ${
        scrolled || open
          ? "py-3 bg-[hsl(205_70%_10%/0.7)] border-turquoise/20 shadow-[0_10px_40px_-15px_rgba(0,180,200,0.35)]"
          : "py-5 bg-[hsl(205_70%_10%/0.35)] border-foam/10"
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
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-turquoise/10 ${
                  active ? "text-turquoise" : "text-foam/75 hover:text-turquoise"
                }`}
              >
                <Icon
                  className={`w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 ${
                    active ? "text-turquoise" : "text-foam/60 group-hover:text-turquoise"
                  }`}
                  strokeWidth={1.75}
                />
                {t(labelKey)}
                <span
                  aria-hidden
                  className={`absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-turquoise to-transparent transition-opacity duration-300 ${
                    active ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                  }`}
                />
              </Link>
            );
          })}
          <a
            href={externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 px-3 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-turquoise/10 text-foam/75 hover:text-turquoise"
          >
            <externalLink.Icon
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-foam/60 group-hover:text-turquoise"
              strokeWidth={1.75}
            />
            {t(externalLink.labelKey)}
            <ExternalLink className="w-2.5 h-2.5 opacity-40 group-hover:opacity-70 transition-opacity" strokeWidth={2} />
            <span
              aria-hidden
              className="absolute left-3 right-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-turquoise to-transparent transition-opacity duration-300 opacity-0 group-hover:opacity-70"
            />
          </a>

          {isAdmin && (
            <Link
              to="/admin"
              className={`group relative flex items-center gap-2 px-3 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-coral/10 ${
                pathname === "/admin" ? "text-coral" : "text-foam/75 hover:text-coral"
              }`}
            >
              <Shield className="w-3.5 h-3.5" strokeWidth={1.75} />
              Admin
            </Link>
          )}

          {isLoggedIn && (
            <button
              onClick={() => supabase.auth.signOut()}
              className="group relative flex items-center gap-2 px-3 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] transition-all duration-300 hover:bg-coral/10 text-foam/75 hover:text-coral"
            >
              <LogOut className="w-3.5 h-3.5" strokeWidth={1.75} />
              Keluar
            </button>
          )}
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
            <a
              href={externalLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 py-3 text-xs uppercase tracking-[0.25em] transition-colors text-foam/75 hover:text-coral"
            >
              <externalLink.Icon className="w-4 h-4" strokeWidth={1.75} />
              {t(externalLink.labelKey)}
              <ExternalLink className="w-3 h-3 opacity-50" strokeWidth={2} />
            </a>

            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center gap-3 py-3 text-xs uppercase tracking-[0.25em] transition-colors ${
                  pathname === "/admin" ? "text-coral" : "text-foam/75 hover:text-coral"
                }`}
              >
                <Shield className="w-4 h-4" strokeWidth={1.75} />
                Admin
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-3 py-3 text-xs uppercase tracking-[0.25em] transition-colors text-foam/75 hover:text-coral"
              >
                <LogOut className="w-4 h-4" strokeWidth={1.75} />
                Keluar
              </button>
            ) : (
              <Link
                to="/auth"
                className={`flex items-center gap-3 py-3 text-xs uppercase tracking-[0.25em] transition-colors ${
                  pathname === "/auth" ? "text-coral" : "text-foam/75 hover:text-coral"
                }`}
              >
                <LogIn className="w-4 h-4" strokeWidth={1.75} />
                Masuk
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navigation;
