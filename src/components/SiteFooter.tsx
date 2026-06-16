import VisitorCounter from "./VisitorCounter";
import { useI18n } from "@/i18n";

const SiteFooter = () => {
  const { t } = useI18n();

  return (
    <footer className="bg-gradient-deep py-16 border-t border-foam/10 mt-auto">
      <div className="container max-w-6xl">
        {/* Grid 3 kolom untuk desktop (md:), 1 kolom untuk mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-xs uppercase tracking-[0.2em] text-foam/50 text-center md:text-left">
          
          {/* Kolom 1: About (Deskripsi Kolaborasi) */}
          <div className="leading-relaxed md:pr-6">
            <span className="text-turquoise font-semibold block mb-3 tracking-[0.25em]">About</span>
            {t("footer.location")}
          </div>

          {/* Kolom 2: Connect (Semua Link Sosial Media Kamu) */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-turquoise font-semibold block mb-1 tracking-[0.25em]">Connect</span>
            <a href="https://www.instagram.com/derawanheroes/" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
              Instagram PKM Derawan
            </a>
            <a href="https://www.instagram.com/globalconservation/" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
              Instagram Global Conservation
            </a>
            <a href="https://www.youtube.com/@PKMDerawanHIUnmul" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
              YouTube PKM HI Derawan
            </a>
            <a href="https://www.youtube.com/@globalconservation7140" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
              YouTube Global Conservation
            </a>
          </div>

          {/* Kolom 3: Tagline & Visitor Counter (Sudah Selamat & Rapi) */}
          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
            <div className="text-turquoise font-semibold tracking-[0.25em]">
              {t("footer.tagline")}
            </div>
            <VisitorCounter />
          </div>

        </div>

        {/* Bagian Paling Bawah (Copyright) */}
        <div className="mt-16 pt-6 border-t border-foam/10 text-center text-[10px] text-foam/30 uppercase tracking-widest">
          © {new Date().getFullYear()} Derawan Island Conservation
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
