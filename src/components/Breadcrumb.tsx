import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useI18n } from "@/i18n";
import type { Dict } from "@/i18n/dictionaries/id";

interface BreadcrumbProps {
  current: string;
  currentKey?: keyof Dict;
}

const Breadcrumb = ({ current, currentKey }: BreadcrumbProps) => {
  const { t } = useI18n();
  return (
    <div className="container pt-32 md:pt-40">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-foam/60"
      >
        <ol className="flex items-center gap-3">
          <li>
            <Link to="/" className="hover:text-coral transition-colors">
              {t("breadcrumb.home")}
            </Link>
          </li>
          <li aria-hidden className="text-foam/30">/</li>
          <li className="text-coral" aria-current="page">
            {currentKey ? t(currentKey) : current}
          </li>
        </ol>
        <Link
          to="/"
          className="group inline-flex items-center gap-2 text-foam/70 hover:text-coral transition-colors"
        >
          <ChevronLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          {t("breadcrumb.back")}
        </Link>
      </nav>
    </div>
  );
};

export default Breadcrumb;
