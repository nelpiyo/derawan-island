import VisitorCounter from "./VisitorCounter";
import { useI18n } from "@/i18n";

const SiteFooter = () => {
  const { t } = useI18n();
  
  return (
    <footer className="bg-gradient-deep py-16 border-t border-foam/10 mt-auto">
      <div className="container max-w-6xl">
        {/* Menggunakan Grid 3 kolom untuk desktop, 1 kolom untuk mobile */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-xs uppercase tracking-[0.2em] text-foam/50 text-center md:text-left">
          
          {/* Kolom 1: Location / Deskripsi Kolaborasi */}
          <div className="leading-relaxed md:pr-6">
            <span className="text-turquoise font-semibold block mb-3 tracking-[0.25em]">About</span>
            {t("footer.location")}
          </div>

          {/* Kolom 2: Sosial Media & Links (Tambahan Baru) */}
          <div className="flex flex-col items-center md:items-start gap-4">
             <span className="text-turquoise font-semibold block mb-1 tracking-[0.25em]">Connect</span>
             <a href="https://https://www.instagram.com/derawanheroes" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
              {/* Kolom 2: Sosial Media & Links (Sudah Diperbaiki) */}
<div className="flex flex-col items-center md:items-start gap-4">
    <span className="text-turquoise font-semibold block mb-1 tracking-[0.25em]">Connect</span>
    <a href="https://www.instagram.com/derawanheroes" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
        Instagram
    </a>
    <a href="https://www.youtube.com/@PKMDerawanHIUnmul" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
        YouTube
    </a>
    <a href="https://globalconservation.org" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors">
        About Global Conservation
    </a>
</div>
              {t("footer.tagline")}
            </div>
            {/* Komponen visitor counter bawaanmu tetap aman di sini */}
            <VisitorCounter /> 
          </div>

        </div>
        
        {/* Copyright opsional di paling bawah biar manis */}
        <div className="mt-16 pt-6 border-t border-foam/10 text-center text-[10px] text-foam/30 uppercase tracking-widest">
          © {new Date().getFullYear()} Derawan Island Conservation
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
