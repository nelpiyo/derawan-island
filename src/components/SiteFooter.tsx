import VisitorCounter from "./VisitorCounter";
import { useI18n } from "@/i18n";

const SiteFooter = () => {
  const { t } = useI18n();
  return (
    <footer className="bg-gradient-deep py-16 border-t border-foam/10">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs uppercase tracking-[0.25em] text-foam/50">
          <div>{t("footer.location")}</div>
          <VisitorCounter />
          <div>{t("footer.tagline")}</div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
