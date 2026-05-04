import { useI18n } from "@/i18n";

const LanguageToggle = () => {
  const { lang, setLang } = useI18n();

  const baseBtn =
    "px-2 py-1 text-[10px] uppercase tracking-[0.3em] transition-colors duration-300";

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="flex items-center border border-foam/15 rounded-sm overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
        className={`${baseBtn} ${
          lang === "id" ? "bg-coral text-primary-foreground" : "text-foam/60 hover:text-coral"
        }`}
      >
        ID
      </button>
      <button
        type="button"
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        className={`${baseBtn} border-l border-foam/15 ${
          lang === "en" ? "bg-coral text-primary-foreground" : "text-foam/60 hover:text-coral"
        }`}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
