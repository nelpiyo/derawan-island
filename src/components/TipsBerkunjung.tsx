import { Check, X, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useI18n } from "@/i18n";
import tipsImg from "@/assets/tips-snorkeler.jpg";

const TipsBerkunjung = () => {
  const { lang } = useI18n();

  const dos = lang === "en"
    ? [
        "Float on your back or hold a buoy when tired — never stand on the reef.",
        "Observe wildlife from a respectful distance, calmly and quietly.",
        "Use reef-friendly sunscreen and wear UV protective clothing.",
        "Carry all your trash back to land — there are no bins in the sea.",
        "Follow local rules and area closures (e.g. Kakaban Jellyfish Lake).",
        "Support local economy — local guides, homestays, and crafts.",
      ]
    : [
        "Mengapung di punggung atau berpegangan pelampung saat lelah — jangan injak karang.",
        "Amati satwa liar dari jarak aman, dengan tenang dan tidak mengganggu.",
        "Gunakan sunscreen reef-friendly dan pakaian pelindung UV.",
        "Bawa pulang semua sampahmu — tidak ada tempat sampah di laut.",
        "Patuhi aturan lokal dan penutupan kawasan (mis. Danau Ubur-ubur Kakaban).",
        "Dukung ekonomi lokal — pemandu, penginapan, dan kerajinan warga.",
      ];

  const donts = lang === "en"
    ? [
        "Don't touch or step on coral — it is fragile living animal.",
        "Don't chase, grab, or take selfies with turtles, manta, or jellyfish.",
        "Don't feed fish or any marine wildlife.",
        "Don't use chemical sunblocks that harm coral reefs.",
        "Don't leave plastic, bottles, or food wrappers behind.",
        "Don't force entry into closed conservation zones.",
      ]
    : [
        "Jangan sentuh atau injak karang — ia makhluk hidup yang rapuh.",
        "Jangan mengejar, memegang, atau ber-selfie dengan penyu, manta, atau ubur-ubur.",
        "Jangan memberi makan ikan maupun satwa laut lainnya.",
        "Jangan pakai sunblock kimia yang merusak terumbu karang.",
        "Jangan tinggalkan plastik, botol, atau bungkus makanan.",
        "Jangan memaksa masuk ke kawasan konservasi yang ditutup.",
      ];

  return (
    <section
      id="tips"
      className="relative bg-gradient-to-b from-abyss via-deep-sea to-abyss py-28 md:py-40 overflow-hidden"
    >
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-turquoise/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-deep-sea/40 blur-3xl pointer-events-none" />

      <div className="container max-w-6xl relative">
        <div className="max-w-3xl mb-14 md:mb-20">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.5em] text-turquoise mb-6">
              {lang === "en" ? "Responsible Visitor Guide" : "Panduan Bertanggung Jawab"}
            </p>
          </Reveal>
          <Reveal delay={150}>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-foam leading-[1.02]">
              {lang === "en" ? "Tips for visiting" : "Tips berkunjung ke"}
              <span className="block italic text-gradient-ocean">
                {lang === "en" ? "Derawan Island" : "Pulau Derawan"}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-6 text-base md:text-lg text-foam/75 max-w-2xl leading-relaxed">
              {lang === "en"
                ? "Small habits make a huge difference. Travel with care so that Derawan remains beautiful — for the reef, the wildlife, and the people who call it home."
                : "Kebiasaan kecil membawa dampak besar. Berkunjunglah dengan penuh kepedulian agar Derawan tetap lestari — untuk karang, satwa, dan warga yang tinggal di sana."}
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT — Illustration */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-foam/15 shadow-2xl aspect-square lg:aspect-[4/5]">
              <img
                src={tipsImg}
                alt={lang === "en" ? "Snorkeler swimming near a sea turtle above a healthy coral reef" : "Penyelam berenang dekat penyu di atas terumbu karang yang sehat"}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* RIGHT — Do's & Don'ts cards */}
          <div className="grid gap-6">
            <Reveal delay={150}>
              <article className="rounded-2xl border border-turquoise/30 bg-foam/[0.04] backdrop-blur-xl p-7 md:p-8 shadow-[0_10px_40px_-15px_rgba(0,180,200,0.4)] hover:border-turquoise/60 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise/20 text-turquoise border border-turquoise/40">
                    <Check className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-turquoise tracking-wide">
                    Do's
                  </h3>
                </div>
                <ul className="space-y-3">
                  {dos.map((item) => (
                    <li key={item} className="flex gap-3 text-sm md:text-[15px] text-foam/85 leading-relaxed">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-turquoise" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={300}>
              <article className="rounded-2xl border border-coral/30 bg-foam/[0.04] backdrop-blur-xl p-7 md:p-8 shadow-[0_10px_40px_-15px_rgba(255,90,90,0.3)] hover:border-coral/60 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-coral/20 text-coral border border-coral/40">
                    <X className="h-5 w-5" strokeWidth={2.5} />
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl text-coral tracking-wide">
                    Don'ts
                  </h3>
                </div>
                <ul className="space-y-3">
                  {donts.map((item) => (
                    <li key={item} className="flex gap-3 text-sm md:text-[15px] text-foam/85 leading-relaxed">
                      <X className="mt-1 h-4 w-4 shrink-0 text-coral" strokeWidth={2.5} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>

            <Reveal delay={450}>
              <a
                href="/nature"
                className="group inline-flex items-center gap-2 self-start text-xs uppercase tracking-[0.3em] text-turquoise hover:text-foam transition-colors"
              >
                {lang === "en" ? "Learn more" : "Pelajari selengkapnya"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TipsBerkunjung;
