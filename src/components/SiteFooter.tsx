import VisitorCounter from "./VisitorCounter";
import { Instagram, Youtube, Mail, Phone } from "lucide-react";

const SiteFooter = () => {
  return (
    <footer className="bg-gradient-deep py-16 border-t border-foam/10 mt-auto">
      <div className="container max-w-4xl">
        {/* Menggunakan Grid 2 kolom agar layout seimbang setelah kolom About dihapus */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-xs uppercase tracking-[0.2em] text-foam/50 text-center md:text-left">
          
          {/* Kolom 1: Connect (Media Sosial dengan Ikon) */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-turquoise font-semibold block mb-1 tracking-[0.25em]">Connect</span>
            <a href="https://www.instagram.com/derawanheroes/" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4 text-turquoise shrink-0" />
              Instagram PKM Derawan
            </a>
            <a href="https://www.instagram.com/globalconservation/" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors flex items-center gap-2">
              <Instagram className="w-4 h-4 text-turquoise shrink-0" />
              Instagram Global Conservation
            </a>
            <a href="https://www.youtube.com/@PKMDerawanHIUnmul" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors flex items-center gap-2">
              <Youtube className="w-4 h-4 text-turquoise shrink-0" />
              YouTube PKM HI Derawan
            </a>
            <a href="https://www.youtube.com/@globalconservation7140" target="_blank" rel="noreferrer" className="hover:text-coral transition-colors flex items-center gap-2">
              <Youtube className="w-4 h-4 text-turquoise shrink-0" />
              YouTube Global Conservation
            </a>
          </div>

          {/* Kolom 2: Contact Us & Visitor Counter (Menggantikan Tagline Lama) */}
          <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
            <span className="text-turquoise font-semibold block mb-1 tracking-[0.25em]">Contact Us</span>
            <a href="mailto:info@globalconservation.org" className="hover:text-coral transition-colors flex items-center gap-2 normal-case">
              <Mail className="w-4 h-4 text-turquoise shrink-0" />
              info@globalconservation.org
            </a>
            <a href="tel:+16508142045" className="hover:text-coral transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4 text-turquoise shrink-0" />
              +1 (650) 814-2045
            </a>
            <div className="mt-4 pt-2 border-t border-foam/5 w-full max-w-[200px] flex justify-center md:justify-end">
              <VisitorCounter />
            </div>
          </div>

        </div>

        {/* Bagian Paling Bawah: Copyright Baru */}
        <div className="mt-16 pt-6 border-t border-foam/10 text-center text-[10px] text-foam/30 uppercase tracking-widest leading-relaxed">
          © {new Date().getFullYear()} Department of International Relations Mulawarman University & Global Conservation
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
