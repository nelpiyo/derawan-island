import { Handshake, Heart, Sprout, FlaskConical } from "lucide-react";
import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import ContactForm from "@/components/ContactForm";
import { PARTNERS } from "@/data/partners";
import { useI18n } from "@/i18n";

const Partners = () => {
  const { t, lang } = useI18n();

  const strategic = PARTNERS.filter((p) => p.kind === "strategic");
  const supporters = PARTNERS.filter((p) => p.kind === "supporter");

  const ctas = [
    {
      Icon: Handshake,
      titleKey: "partners.cta.partner.title" as const,
      bodyKey: "partners.cta.partner.body" as const,
      href: "#contact",
      tone: "text-turquoise",
    },
    {
      Icon: Heart,
      titleKey: "partners.cta.donate.title" as const,
      bodyKey: "partners.cta.donate.body" as const,
      href: "#contact",
      tone: "text-coral",
      soon: true,
    },
    {
      Icon: Sprout,
      titleKey: "partners.cta.adopt.title" as const,
      bodyKey: "partners.cta.adopt.body" as const,
      href: "#contact",
      tone: "text-sand",
      soon: true,
    },
    {
      Icon: FlaskConical,
      titleKey: "partners.cta.volunteer.title" as const,
      bodyKey: "partners.cta.volunteer.body" as const,
      href: "#contact",
      tone: "text-lagoon",
    },
  ];

  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO
        title="Partners & Get Involved — Derawan Island"
        description="Mitra strategis, sponsor, dan cara berkontribusi pada konservasi Pulau Derawan."
        path="/partners"
      />
      <Navigation />
      <Breadcrumb current="Partners" />

      {/* HERO */}
      <section className="container pt-12 pb-20 md:pt-16 md:pb-28 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("partners.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            {t("partners.title.a")}
            <span className="block italic text-gradient-sunset">
              {t("partners.title.b")}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            {t("partners.intro")}
          </p>
        </Reveal>
      </section>

      {/* PARTNERS GRID */}
      <section className="bg-gradient-deep py-24 md:py-32 border-y border-foam/5">
        <div className="container max-w-6xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-coral mb-3">
              · {t("partners.section.partners")}
            </p>
          </Reveal>

          {/* Strategic */}
          <Reveal delay={120}>
            <h2 className="font-display text-3xl md:text-4xl text-foam mt-6">
              {t("partners.section.strategic")}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-foam/10 sm:grid-cols-2 lg:grid-cols-4">
            {strategic.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="bg-abyss h-full p-8 flex flex-col items-start gap-4 hover:bg-deep-sea transition-colors">
                  <div className="w-14 h-14 rounded-full bg-foam/5 border border-foam/15 flex items-center justify-center text-[11px] tracking-[0.15em] text-foam/85 font-display">
                    {p.initials}
                  </div>
                  <div>
                    <p className="font-display text-lg text-foam leading-tight">
                      {p.name}
                    </p>
                    <p className="mt-2 text-[12px] text-foam/60 leading-relaxed">
                      {lang === "en" ? p.role_en : p.role_id}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Supporters */}
          <Reveal delay={150}>
            <h3 className="font-display text-2xl md:text-3xl text-foam mt-20">
              {t("partners.section.supporters")}
            </h3>
          </Reveal>
          <div className="mt-8 grid gap-px bg-foam/10 sm:grid-cols-2 lg:grid-cols-4">
            {supporters.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <div className="bg-abyss h-full p-7 flex flex-col items-start gap-3 opacity-90 hover:opacity-100 hover:bg-deep-sea transition-all">
                  <div className="w-12 h-12 rounded-full bg-foam/5 border border-dashed border-foam/25 flex items-center justify-center text-[10px] tracking-[0.15em] text-foam/70 font-display">
                    {p.initials}
                  </div>
                  <div>
                    <p className="font-display text-base text-foam leading-tight">
                      {p.name}
                    </p>
                    <p className="mt-1.5 text-[11px] text-foam/55 leading-relaxed italic">
                      {lang === "en" ? p.role_en : p.role_id}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-turquoise mb-3">
              · {t("partners.section.involved")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foam max-w-3xl">
              {t("partners.section.involved.body")}
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ctas.map((c, i) => (
              <Reveal key={c.titleKey} delay={i * 100}>
                <a
                  href={c.href}
                  className="group relative block h-full p-7 border border-foam/10 hover:border-coral/50 transition-colors duration-500 bg-foam/[0.02]"
                >
                  {c.soon && (
                    <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.25em] text-foam/50 border border-foam/20 px-2 py-0.5">
                      {t("partners.cta.comingsoon")}
                    </span>
                  )}
                  <c.Icon className={`w-8 h-8 ${c.tone}`} strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-2xl text-foam leading-tight">
                    {t(c.titleKey)}
                  </h3>
                  <p className="mt-3 text-sm text-foam/65 leading-relaxed">
                    {t(c.bodyKey)}
                  </p>
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-8 bg-coral transition-all duration-500 group-hover:w-16"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-gradient-deep py-24 md:py-32 border-t border-foam/5">
        <div className="container max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-coral mb-3">
              · {t("partners.contact.title")}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-4xl md:text-5xl text-foam">
              {t("partners.contact.title")}
            </h2>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-6 text-foam/70 leading-relaxed">
              {t("partners.contact.body")}
            </p>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
};

export default Partners;
