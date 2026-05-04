import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { id as idDict, type Dict } from "./dictionaries/id";
import { en as enDict } from "./dictionaries/en";

export type Lang = "id" | "en";

const STORAGE_KEY = "derawan_lang";

const dictionaries: Record<Lang, Dict> = { id: idDict, en: enDict };

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Dict) => string;
}

const Ctx = createContext<I18nCtx | null>(null);

const detectInitial = (): Lang => {
  if (typeof window === "undefined") return "id";
  const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored === "id" || stored === "en") return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("en") ? "en" : "id";
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => detectInitial());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback(
    (key: keyof Dict) => dictionaries[lang][key] ?? dictionaries.id[key] ?? String(key),
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
  return ctx;
};

export const useT = () => useI18n().t;
