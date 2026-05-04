import Navigation from "@/components/Navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import DerawanMap from "@/components/DerawanMap";
import { useI18n } from "@/i18n";

const MapPage = () => {
  const { t } = useI18n();
  return (
    <main className="bg-abyss text-foam min-h-screen">
      <SEO
        title="Map — Derawan Island"
        description="Interactive map of the Derawan Archipelago: conservation zones, turtle nesting sites, manta hotspots, and threats."
        path="/map"
      />
      <Navigation />
      <Breadcrumb current="Map" />

      <section className="container pt-12 pb-12 md:pt-16 md:pb-16 max-w-5xl">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.5em] text-turquoise">
            {t("map.eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={150}>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foam">
            {t("map.title.a")}
            <span className="block italic text-gradient-ocean">
              {t("map.title.b")}
            </span>
          </h1>
        </Reveal>
        <Reveal delay={300}>
          <p className="mt-10 text-lg leading-relaxed text-foam/75 max-w-2xl">
            {t("map.intro")}
          </p>
        </Reveal>
      </section>

      <section className="container max-w-7xl pb-24 md:pb-36">
        <Reveal>
          <DerawanMap />
        </Reveal>
      </section>

      <SiteFooter />
    </main>
  );
};

export default MapPage;
