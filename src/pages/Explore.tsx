import { useMemo, useState } from "react";
import {
  Search,
  Utensils,
  Hotel,
  HeartPulse,
  Store,
  LayoutGrid,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation as NavIcon,
  Heart,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Info,
  Wallet,
  Hourglass,
  Sparkles,
  Leaf,
  Award,
  type LucideIcon,
} from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import heroImg from "@/assets/pemandangan-udara-derawan.webp";
import restaurantImg from "@/assets/explore-restaurant.jpg";
import resortImg from "@/assets/explore-resort.jpg";
import clinicImg from "@/assets/explore-clinic.jpg";
import posyanduImg from "@/assets/explore-posyandu.jpg";

type Category = "all" | "restaurant" | "resort" | "health" | "other";

type Service = {
  id: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  owner: string;
  phone: string;
  whatsapp: boolean;
  address: string;
  hours: string;
  price: "$" | "$$" | "$$$" | "$$$$" | "FREE";
  location: string;
  image: string;
  gallery: string[];
  menu?: { name: string; price: string }[];
  cta: "menu" | "details";
  pillColor: string;
};

const services: Service[] = [
  {
    id: "warung-pak-agus",
    category: "restaurant",
    categoryLabel: "Restaurant",
    name: "Warung Pak Agus",
    shortDesc: "Local seafood & Indonesian food. Famous for mie goreng, nasi goreng, and fresh lobster!",
    longDesc:
      "Warung lokal yang dijalankan keluarga Pak Agus. Coba mie goreng, nasi goreng, dan lobster bakar yang melegenda. Pelayanan santai dan ramah—ingat, waktu di pulau berjalan lebih lambat. Tidak menyediakan alkohol.",
    owner: "Pak Agus",
    phone: "+62 812-3456-7890",
    whatsapp: true,
    address: "Kampung Derawan · Sebelah masjid, dekat dermaga",
    hours: "08.00 – 21.00 · Setiap hari",
    price: "$$",
    location: "Kampung Derawan",
    image: restaurantImg,
    gallery: [restaurantImg, restaurantImg, restaurantImg, restaurantImg],
    menu: [
      { name: "Mie Goreng", price: "25.000" },
      { name: "Nasi Goreng", price: "25.000" },
      { name: "Ikan Bakar", price: "35.000" },
      { name: "Lobster Bakar (100gr)", price: "45.000" },
      { name: "Udang Saos Padang", price: "40.000" },
      { name: "Es Kelapa Muda", price: "15.000" },
    ],
    cta: "menu",
    pillColor: "bg-amber-500/90 text-stone-950",
  },
  {
    id: "derawan-dive-resort",
    category: "resort",
    categoryLabel: "Resort",
    name: "Derawan Dive Resort",
    shortDesc: "Comfortable beachfront resort with amazing sunset and friendly service. Perfect for divers!",
    longDesc:
      "Resort tepi pantai dengan bungalow kayu di atas air. Paket menyelam, sunset deck, dan pemandu lokal bersertifikat. Cocok untuk solo traveler maupun keluarga.",
    owner: "Bu Sari",
    phone: "+62 813-2222-1111",
    whatsapp: true,
    address: "Teluk Derawan",
    hours: "Check in 14.00 · Check out 12.00",
    price: "$$$",
    location: "Teluk Derawan",
    image: resortImg,
    gallery: [resortImg, resortImg, resortImg, resortImg],
    cta: "details",
    pillColor: "bg-sky-500/90 text-foam",
  },
  {
    id: "klinik-derawan",
    category: "health",
    categoryLabel: "Clinic",
    name: "Klinik Kesehatan Derawan",
    shortDesc: "Basic medical services for residents and visitors.",
    longDesc:
      "Pelayanan medis dasar: pemeriksaan umum, pertolongan pertama, dan obat-obatan esensial untuk warga dan wisatawan.",
    owner: "dr. Ningsih",
    phone: "+62 811-5555-2233",
    whatsapp: false,
    address: "Kampung Derawan",
    hours: "08.00 – 17.00",
    price: "$",
    location: "Kampung Derawan",
    image: clinicImg,
    gallery: [clinicImg, clinicImg, clinicImg],
    cta: "details",
    pillColor: "bg-emerald-500/90 text-stone-950",
  },
  {
    id: "posyandu-melati",
    category: "health",
    categoryLabel: "Posyandu",
    name: "Posyandu Melati",
    shortDesc: "Maternal & child health services, immunization, and growth monitoring.",
    longDesc:
      "Layanan kesehatan ibu & anak, imunisasi rutin, dan pemantauan tumbuh kembang balita. Dikelola kader kesehatan masyarakat Derawan.",
    owner: "Kader Posyandu",
    phone: "+62 821-9999-7777",
    whatsapp: true,
    address: "Kampung Derawan",
    hours: "08.00 – 12.00",
    price: "FREE",
    location: "Kampung Derawan",
    image: posyanduImg,
    gallery: [posyanduImg, posyanduImg, posyanduImg],
    cta: "details",
    pillColor: "bg-fuchsia-500/90 text-foam",
  },
];

const filters: { key: Category; label: string; sub: string; Icon: LucideIcon }[] = [
  { key: "all", label: "All Services", sub: "All categories", Icon: LayoutGrid },
  { key: "restaurant", label: "Restaurants", sub: "Eat & Drink", Icon: Utensils },
  { key: "resort", label: "Resorts", sub: "Stay & Relax", Icon: Hotel },
  { key: "health", label: "Health & Wellness", sub: "Clinic & Posyandu", Icon: HeartPulse },
  { key: "other", label: "Other Services", sub: "Shops, Rental, & more", Icon: Store },
];

const features = [
  { Icon: ShieldCheck, title: "Local & Trusted", sub: "Run by locals" },
  { Icon: Info, title: "Best Information", sub: "Updated regularly" },
  { Icon: MapPin, title: "Easy to Reach", sub: "Contact & location" },
  { Icon: Sparkles, title: "Support Local", sub: "Keep Derawan thriving" },
];

const infoBar = [
  { Icon: Wallet, title: "Cash is King", body: "Most places only accept cash. No ATM on the island." },
  { Icon: Hourglass, title: "Island Time", body: "Life moves slower here. Please be patient & enjoy!" },
  { Icon: Heart, title: "Respect Local Culture", body: "Be kind, dress modestly, and keep the island clean." },
  { Icon: Leaf, title: "Support Local", body: "Your visit helps our community and keeps Derawan beautiful." },
];

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string>(services[0].id);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [galleryIndex, setGalleryIndex] = useState(0);

  const filtered = useMemo(() => {
    return services.filter((s) => {
      const matchesCat = activeFilter === "all" || s.category === activeFilter;
      const q = query.trim().toLowerCase();
      const matchesQ =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.shortDesc.toLowerCase().includes(q) ||
        s.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQ;
    });
  }, [activeFilter, query]);

  const selected = services.find((s) => s.id === selectedId) ?? services[0];

  const phoneHref = (phone: string) => `tel:${phone.replace(/\s|-/g, "")}`;
  const waHref = (phone: string) =>
    `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
      `Halo, saya ingin bertanya tentang ${selected.name} di Derawan.`,
    )}`;
  const mapsHref = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q + " Derawan")}`;

  return (
    <div className="min-h-dvh bg-deepsea text-foam overflow-x-hidden">
      <SEO
        title="Explore Local — Derawan Island"
        description="Find trusted local services around Derawan Island: restaurants, resorts, clinics, posyandu and more — all run by locals."
      />
      <Navigation />

      {/* HERO */}
      <section className="relative isolate pt-32 sm:pt-36 lg:pt-44 pb-12 lg:pb-16">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImg}
            alt="Aerial view of Derawan overwater bungalows and turquoise sea"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deepsea via-deepsea/85 to-deepsea/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-deepsea/40 via-transparent to-deepsea" />
        </div>

        <div className="container">
          <Reveal>
            <p className="text-[11px] sm:text-xs tracking-[0.4em] uppercase text-turquoise">
              Explore Local
            </p>
            <h1 className="font-serif mt-3 text-4xl sm:text-5xl lg:text-7xl leading-[1.05] max-w-2xl">
              Discover<br />
              <span className="text-turquoise">Derawan</span>
            </h1>
            <p className="mt-6 max-w-xl text-foam/80 text-sm sm:text-base leading-relaxed">
              Find trusted local services around the island — from great food to comfortable stays
              and health care — all run by our wonderful locals.
            </p>

            <ul className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl">
              {features.map(({ Icon, title, sub }) => (
                <li key={title} className="flex items-start gap-3">
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-lg border border-turquoise/30 bg-turquoise/5 text-turquoise">
                    <Icon className="w-4 h-4" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foam">{title}</p>
                    <p className="text-[11px] sm:text-xs text-foam/60">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SEARCH + FILTERS */}
      <section className="container -mt-2 sm:-mt-4">
        <div className="mx-auto max-w-3xl">
          <label htmlFor="explore-search" className="sr-only">Search services</label>
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foam/50" />
            <input
              id="explore-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for restaurants, resorts, clinics..."
              className="w-full rounded-2xl bg-[hsl(205_60%_8%/0.8)] border border-turquoise/20 backdrop-blur-md pl-12 pr-14 py-4 text-sm text-foam placeholder:text-foam/40 focus:outline-none focus:border-turquoise/60 focus:ring-2 focus:ring-turquoise/20 transition shadow-[0_10px_40px_-15px_rgba(0,180,200,0.35)]"
            />
            <button
              type="button"
              aria-label="Submit search"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-xl bg-turquoise text-deepsea hover:bg-turquoise/90 transition"
            >
              <Search className="w-4 h-4" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        <div className="mt-5 mx-auto max-w-5xl">
          <div className="rounded-2xl border border-turquoise/15 bg-[hsl(205_60%_8%/0.6)] backdrop-blur-md p-2 sm:p-3 overflow-x-auto">
            <div className="flex gap-2 min-w-max sm:justify-between">
              {filters.map(({ key, label, sub, Icon }) => {
                const active = activeFilter === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveFilter(key)}
                    aria-pressed={active}
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all flex-1 min-w-[160px] text-left ${
                      active
                        ? "bg-turquoise/15 ring-1 ring-turquoise/40"
                        : "hover:bg-turquoise/5"
                    }`}
                  >
                    <span
                      className={`grid place-items-center w-9 h-9 rounded-full transition ${
                        active ? "bg-turquoise text-deepsea" : "bg-turquoise/10 text-turquoise"
                      }`}
                    >
                      <Icon className="w-4 h-4" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className={`block text-xs sm:text-sm font-semibold truncate ${active ? "text-foam" : "text-foam/85"}`}>
                        {label}
                      </span>
                      <span className="block text-[10px] sm:text-[11px] text-foam/55 truncate">
                        {sub}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR */}
      <section className="container mt-16 sm:mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl">
            Popular Around Derawan <span aria-hidden>🌴</span>
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-turquoise/40 text-turquoise text-xs uppercase tracking-[0.2em] hover:bg-turquoise/10 transition"
          >
            View All Services <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-foam/60 text-sm py-12 text-center">
            Tidak ada hasil. Coba kata kunci lain atau ubah filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((s) => (
              <article
                key={s.id}
                className="group relative rounded-2xl overflow-hidden border border-turquoise/15 bg-[hsl(205_60%_8%/0.7)] flex flex-col transition hover:-translate-y-1 hover:border-turquoise/40 hover:shadow-[0_20px_50px_-20px_rgba(0,180,200,0.45)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deepsea/85 via-deepsea/10 to-transparent" />
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-md text-[10px] uppercase tracking-[0.2em] font-bold ${s.pillColor}`}>
                    {s.categoryLabel}
                  </span>
                  <button
                    type="button"
                    aria-label={`Favorite ${s.name}`}
                    onClick={() => setFavorites((f) => ({ ...f, [s.id]: !f[s.id] }))}
                    className="absolute top-3 right-3 grid place-items-center w-8 h-8 rounded-full bg-deepsea/60 backdrop-blur text-foam hover:bg-deepsea/80 transition"
                  >
                    <Heart
                      className={`w-4 h-4 transition ${favorites[s.id] ? "fill-coral text-coral" : ""}`}
                      strokeWidth={2}
                    />
                  </button>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-serif text-lg leading-tight">{s.name}</h3>
                  <p className="mt-2 text-xs text-foam/65 leading-relaxed flex-1">
                    {s.shortDesc}
                  </p>
                  <div className="mt-4 space-y-1.5 text-[11px] text-foam/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-turquoise" /> {s.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-turquoise" /> {s.hours.split("·")[0].trim()}
                      </span>
                      <span className="text-amber-400 font-semibold">{s.price}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={phoneHref(s.phone)}
                      aria-label={`Call ${s.name}`}
                      className="grid place-items-center w-9 h-9 rounded-lg border border-turquoise/30 text-turquoise hover:bg-turquoise/10 transition"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                    {s.whatsapp && (
                      <a
                        href={waHref(s.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${s.name}`}
                        className="grid place-items-center w-9 h-9 rounded-lg border border-emerald-400/30 text-emerald-400 hover:bg-emerald-400/10 transition"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => { setSelectedId(s.id); setGalleryIndex(0); }}
                      className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-amber-400/40 text-amber-300 text-[11px] uppercase tracking-[0.18em] hover:bg-amber-400/10 transition"
                    >
                      {s.cta === "menu" ? "View Menu" : "View Details"}
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* DETAIL */}
      <section className="container mt-16 sm:mt-20">
        <div className="rounded-3xl border border-turquoise/15 bg-[hsl(205_60%_7%/0.85)] p-4 sm:p-6 lg:p-8 shadow-[0_30px_80px_-30px_rgba(0,180,200,0.35)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Gallery */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-deepsea">
                <img
                  src={selected.gallery[galleryIndex]}
                  alt={`${selected.name} photo ${galleryIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.2em] font-bold bg-amber-500/90 text-stone-950">
                  {selected.categoryLabel}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] bg-deepsea/70 text-foam backdrop-blur">
                  {galleryIndex + 1}/{selected.gallery.length}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setGalleryIndex((i) => (i - 1 + selected.gallery.length) % selected.gallery.length)}
                  className="grid place-items-center w-9 h-9 rounded-lg border border-turquoise/30 text-turquoise hover:bg-turquoise/10"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="flex gap-2 overflow-x-auto flex-1">
                  {selected.gallery.map((g, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setGalleryIndex(i)}
                      aria-label={`View photo ${i + 1}`}
                      className={`shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition ${
                        galleryIndex === i ? "border-turquoise" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={g} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setGalleryIndex((i) => (i + 1) % selected.gallery.length)}
                  className="grid place-items-center w-9 h-9 rounded-lg border border-turquoise/30 text-turquoise hover:bg-turquoise/10"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-4">
              <h3 className="font-serif text-2xl sm:text-3xl">{selected.name}</h3>
              <p className="text-turquoise text-sm mt-1">{selected.categoryLabel}</p>
              <p className="mt-4 text-sm text-foam/75 leading-relaxed">{selected.longDesc}</p>

              <ul className="mt-5 space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foam">{selected.owner}</p>
                    <p className="text-foam/55 text-xs">Owner</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-turquoise mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foam">{selected.phone}</p>
                    <p className="text-foam/55 text-xs">
                      {selected.whatsapp ? "WhatsApp available" : "Phone only"}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-turquoise mt-0.5 shrink-0" />
                  <p className="text-foam">{selected.address}</p>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-turquoise mt-0.5 shrink-0" />
                  <p className="text-foam">{selected.hours}</p>
                </li>
                <li className="flex items-start gap-3">
                  <Wallet className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-foam">Cash Only</p>
                    <p className="text-foam/55 text-xs">No card payment</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Menu / Highlights */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-deepsea/60 border border-turquoise/15 p-4">
                <div className="flex items-baseline justify-between mb-3">
                  <h4 className="font-serif text-lg">
                    {selected.menu ? "Our Menu" : "Highlights"}
                  </h4>
                  {selected.menu && (
                    <span className="text-[10px] text-foam/50">*Price in IDR</span>
                  )}
                </div>
                {selected.menu ? (
                  <ul className="divide-y divide-foam/10">
                    {selected.menu.map((m) => (
                      <li key={m.name} className="flex items-center justify-between py-2.5 text-sm">
                        <span className="text-foam/85">{m.name}</span>
                        <span className="text-amber-300 font-semibold">{m.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-foam/70 leading-relaxed">
                    {selected.shortDesc}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={phoneHref(selected.phone)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-turquoise text-deepsea font-semibold text-sm hover:bg-turquoise/90 transition"
              aria-label={`Call ${selected.name} now`}
            >
              <Phone className="w-4 h-4" /> Call Now
            </a>
            {selected.whatsapp ? (
              <a
                href={waHref(selected.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500 text-deepsea font-semibold text-sm hover:bg-emerald-400 transition"
              >
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            ) : (
              <span className="flex items-center justify-center gap-2 py-3 rounded-xl border border-foam/15 text-foam/40 text-sm">
                WhatsApp unavailable
              </span>
            )}
            <a
              href={mapsHref(selected.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-turquoise/40 text-turquoise font-semibold text-sm hover:bg-turquoise/10 transition"
            >
              <NavIcon className="w-4 h-4" /> Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* INFO BAR */}
      <section className="container mt-16 sm:mt-20 mb-20">
        <div className="rounded-2xl border border-amber-400/15 bg-[hsl(205_60%_7%/0.7)] p-5 sm:p-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infoBar.map(({ Icon, title, body }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="shrink-0 grid place-items-center w-10 h-10 rounded-xl border border-amber-400/30 text-amber-300 bg-amber-400/5">
                  <Icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foam">{title}</p>
                  <p className="text-xs text-foam/60 leading-relaxed mt-0.5">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center text-xs text-foam/55 italic">
            "Travel deeper, connect closer. Let's keep Derawan beautiful, together." 🐢
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Explore;
