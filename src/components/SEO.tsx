import { Helmet } from "react-helmet-async";

const SITE_URL = "https://derawan-island.lovable.app";
const SITE_NAME = "Derawan Island";
const DEFAULT_TITLE = "Derawan Island — The Last Sanctuary of the Celebes Sea";
const DEFAULT_DESCRIPTION =
  "Derawan Island, Berau, Kalimantan Timur — rumah penyu, pari manta, dan terumbu karang. Jelajahi ekosistem, tata kelola laut, kearifan lokal Suku Bajau, dan ekonomi berkelanjutan.";

interface SEOProps {
  title?: string;
  description?: string;
  /** Path relative to site root, e.g. "/" or "/#ecology" */
  path?: string;
  /** Path inside /public, e.g. "/og/og-home.jpg" */
  ogImage?: string;
  type?: "website" | "article";
}

const SEO = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  ogImage = "/og/og-home.jpg",
  type = "website",
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const image = ogImage.startsWith("http") ? ogImage : `${SITE_URL}${ogImage}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    image,
    address: {
      "@type": "PostalAddress",
      addressRegion: "Kalimantan Timur",
      addressCountry: "ID",
      addressLocality: "Berau",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 2.2833,
      longitude: 118.25,
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="id_ID" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SEO;
