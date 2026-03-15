import type { LocalizedText } from "@/lib/i18n";

export type MetricItem = {
  value: string;
  label: LocalizedText;
};

export type VideoAsset = {
  src: string;
  poster?: string;
  label: LocalizedText;
  mobileSrc?: string;
  hasEmbeddedText?: boolean;
};

export type NavItem = {
  href: string;
  label: LocalizedText;
};

export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  scale?: number;
};

export type WorkSample = {
  slug: string;
  client: string;
  title: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  video: VideoAsset;
  accent?: string;
};

export type ServiceArea = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  eyebrow: LocalizedText;
  value: LocalizedText;
  ctaLabel: LocalizedText;
  href: string;
};

export type ServicePillar = {
  title: LocalizedText;
  eyebrow: string;
  summary: LocalizedText;
};

export type OfferPackage = {
  name: LocalizedText;
  price: LocalizedText;
  summary: LocalizedText;
  idealFor: LocalizedText;
  includes: LocalizedText[];
  featured?: boolean;
  ctaLabel: LocalizedText;
  ctaHref: string;
};

export type PriceGuide = {
  title: LocalizedText;
  range: LocalizedText;
  detail: LocalizedText;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: LocalizedText;
  category: LocalizedText;
  industry: LocalizedText;
  summary: LocalizedText;
  goal: LocalizedText;
  solution: LocalizedText;
  deliverables: LocalizedText[];
  impact: LocalizedText;
  metrics: MetricItem[];
  tags: LocalizedText[];
  image?: string;
  imageAlt?: LocalizedText;
  video?: VideoAsset;
  palette?: string;
  featured?: boolean;
  verificationNote?: LocalizedText;
};

export type ProcessStep = {
  step: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type TeamMember = {
  name: string;
  role: LocalizedText;
  summary: LocalizedText;
};

export type FaqItem = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type Testimonial = {
  quote: LocalizedText;
  name: string;
  role?: LocalizedText;
  company: string;
  note?: LocalizedText;
};

export const siteConfig = {
  name: "Fau&Land Film",
  legalName: "Fau&Land Film AS",
  domain: "https://fauoglandfilm.com",
  email: "post@fauoglandfilm.com",
  phonePrimary: "+47 940 53 050",
  phonePrimaryHref: "tel:+4794053050",
  location: "Oslo",
  locationLabel: "Oslo, Norway",
  responseTime: {
    no: "Vi svarer som regel innen 24 timer.",
    en: "We usually respond within 24 hours.",
  },
  bookingHref: "/kontakt",
  bookingLabel: {
    no: "Book et uforpliktende møte",
    en: "Book an introductory call",
  },
  coverageArea: "Oslo og hele Norge",
  description:
    "Fau&Land Film hjelper bedrifter med reklamefilm, innholdsproduksjon, bedriftsfilm, eventfilm og video som bygger synlighet, tillit og flere henvendelser.",
  keywords: [
    "videoproduksjon Oslo",
    "reklamefilm Oslo",
    "innholdsproduksjon Oslo",
    "bedriftsfilm Oslo",
    "eventfilm Oslo",
    "employer branding video Oslo",
    "live streaming Oslo",
    "videobyrå Oslo",
  ],
};

export const homeHeroContent = {
  title: {
    no: "Film som beveger merkevarer.",
    en: "Film that moves brands.",
  },
  description: {
    no: "Reklamefilm og visuell historiefortelling for ambisiøse merkevarer.",
    en: "Commercial film production and visual storytelling for ambitious brands.",
  },
  ctaLabel: {
    no: "Se utvalgt arbeid",
    en: "View selected work",
  },
  ctaHref: "#selected-work",
};

export const homeIntroContent = {
  eyebrow: {
    no: "Oslo-basert produksjonsselskap",
    en: "Oslo-based production company",
  },
  title: {
    no: "Premium filmproduksjon for merkevarer, kampanjer og moderne innholdsflater.",
    en: "Premium motion crafted for brands, campaigns and modern content ecosystems.",
  },
  description: {
    no: "Et senior-led studio for reklamefilm, brand storytelling og innholdsproduksjon med høy kvalitet.",
    en: "A senior-led studio for commercial film, brand storytelling and high-performance content production.",
  },
};

// Hero-media styres her. Resten av siten bruker nå primært tekst, gradienter og placeholders.
export const videoLibrary = {
  hero: {
    src: "/media/hero/hero-nature-desktop.mp4",
    mobileSrc: "/media/hero/hero-nature-mobile.mp4",
    poster: "/media/placeholders/hero-poster.svg",
    label: {
      no: "Naturfilm for Fau&Land Film",
      en: "Nature film for Fau&Land Film",
    },
    hasEmbeddedText: false,
  },
} satisfies Record<string, VideoAsset>;

export const navItems: NavItem[] = [
  { href: "/", label: { no: "Forside", en: "Home" } },
  { href: "/tjenester", label: { no: "Tjenester", en: "Services" } },
  { href: "/case", label: { no: "Case", en: "Work" } },
  { href: "/om-oss", label: { no: "Om oss", en: "About" } },
  { href: "/kontakt", label: { no: "Kontakt", en: "Contact" } },
];

export const clientLogos: ClientLogo[] = [
  {
    name: "Front B Trading",
    src: "/media/logos/clients/COLOR/front-b-trading.png",
    width: 1385,
    height: 958,
    scale: 0.9,
  },
  {
    name: "Client Logo 01",
    src: "/media/logos/clients/COLOR/client-logo-01.png",
    width: 765,
    height: 782,
    scale: 0.84,
  },
  {
    name: "ISA",
    src: "/media/logos/clients/COLOR/isa.png",
    width: 1507,
    height: 684,
    scale: 0.94,
  },
  {
    name: "Nei til Atomvåpen",
    src: "/media/logos/clients/COLOR/nei-til-atomvapen.png",
    width: 1154,
    height: 844,
    scale: 0.88,
  },
  {
    name: "Foreningen Norden",
    src: "/media/logos/clients/COLOR/foreningen-norden.png",
    width: 1306,
    height: 532,
    scale: 0.96,
  },
  {
    name: "Norske Bunader",
    src: "/media/logos/clients/COLOR/norske-bunader.png",
    width: 476,
    height: 200,
    scale: 0.96,
  },
  {
    name: "Kulturarena",
    src: "/media/logos/clients/COLOR/kulturarena.png",
    width: 1429,
    height: 399,
    scale: 1.02,
  },
  {
    name: "STUA",
    src: "/media/logos/clients/COLOR/stua.png",
    width: 1510,
    height: 577,
    scale: 0.98,
  },
  {
    name: "Underoverskrift",
    src: "/media/logos/clients/COLOR/underoverskrift.png",
    width: 746,
    height: 171,
    scale: 1.06,
  },
  {
    name: "Ville Gleder",
    src: "/media/logos/clients/COLOR/ville-gleder.png",
    width: 1490,
    height: 500,
    scale: 1.02,
  },
  {
    name: "Actors Hub",
    src: "/media/logos/clients/COLOR/actors-hub.png",
    width: 1500,
    height: 844,
    scale: 0.88,
  },
  {
    name: "Logo LD",
    src: "/media/logos/clients/COLOR/logo-ld.png",
    width: 903,
    height: 987,
    scale: 0.8,
  },
];

export const selectedWork: WorkSample[] = [
  {
    slug: "winter-signature",
    client: "Fau&Land Film",
    title: {
      no: "Vintersignatur",
      en: "Winter signature reel",
    },
    category: {
      no: "Studio reel",
      en: "Studio reel",
    },
    summary: {
      no: "En filmatisk studiocut bygget for å ramme inn merkevaren med ro, stemning og skala.",
      en: "A cinematic studio cut built to frame the brand with restraint, mood and scale.",
    },
    accent: "from-[#d8d0c3] via-[#c8bea8] to-[#efe9df]",
    video: {
      src: "/media/work/fau-land-winter-english.mp4",
      label: {
        no: "Vintersignatur",
        en: "Winter signature reel",
      },
    },
  },
  {
    slug: "magic-bilpleie",
    client: "Magic Bilpleie",
    title: {
      no: "Kommersiell detaljfilm",
      en: "Commercial detail film",
    },
    category: {
      no: "Reklamefilm",
      en: "Commercial film",
    },
    summary: {
      no: "Skarpe produktfokuserte bilder laget for premium presentasjon og sterk digital effekt.",
      en: "Sharp product-focused visuals designed for premium presentation and digital performance.",
    },
    accent: "from-[#f2ece2] via-[#d5cab8] to-[#b8a487]",
    video: {
      src: "/media/work/magic-bilpleie.mp4",
      label: {
        no: "Magic Bilpleie reklamefilm",
        en: "Magic Bilpleie commercial film",
      },
    },
  },
  {
    slug: "wood-hotel",
    client: "Wood Hotel",
    title: {
      no: "Arkitekturfilm for hospitality",
      en: "Hospitality architecture cut",
    },
    category: {
      no: "Brand storytelling",
      en: "Brand storytelling",
    },
    summary: {
      no: "Romlig historiefortelling for hospitality, arkitektur og destinasjonsdrevet posisjonering.",
      en: "Spatial storytelling for hospitality, architecture and destination-led positioning.",
    },
    accent: "from-[#ece8e1] via-[#d8d1c5] to-[#c1b29b]",
    video: {
      src: "/media/work/wood-hotel.mp4",
      label: {
        no: "Wood Hotel arkitekturfilm",
        en: "Wood Hotel architecture cut",
      },
    },
  },
  {
    slug: "incasso-cruisers",
    client: "Incasso Cruisers",
    title: {
      no: "Kinetisk kampanjevignett",
      en: "Kinetic campaign vignette",
    },
    category: {
      no: "Kampanjeinnhold",
      en: "Campaign content",
    },
    summary: {
      no: "Et kortformat bygget for oppmerksomhet, rytme og minneverdig visuell pacing.",
      en: "A short-form cut built for attention, rhythm and memorable visual pacing.",
    },
    accent: "from-[#efe7db] via-[#d3c7b8] to-[#b7a189]",
    video: {
      src: "/media/work/incasso-cruisers.mp4",
      label: {
        no: "Incasso Cruisers kampanjevignett",
        en: "Incasso Cruisers campaign vignette",
      },
    },
  },
  {
    slug: "to-historier",
    client: "To historier",
    title: {
      no: "Narrativt kortformat",
      en: "Narrative short format",
    },
    category: {
      no: "Historiedrevet produksjon",
      en: "Story-led production",
    },
    summary: {
      no: "Editorial motion med strammere emosjonell kurve og et mer filmatisk blikk.",
      en: "Editorial motion with a tighter emotional arc and a more cinematic point of view.",
    },
    accent: "from-[#f4efe6] via-[#e0d5c7] to-[#c6b39d]",
    video: {
      src: "/media/work/to-historier.mp4",
      label: {
        no: "To historier kortfilm",
        en: "To historier narrative short",
      },
    },
  },
  {
    slug: "promofilm",
    client: "Fau&Land Film",
    title: {
      no: "Studio promo 16:9",
      en: "Studio promo 16:9",
    },
    category: {
      no: "Promofilm",
      en: "Promotional film",
    },
    summary: {
      no: "En bredere studiopromo som balanserer polish, bevegelse og high-end visuell tekstur.",
      en: "A broader studio-facing promo balancing polish, motion and high-end visual texture.",
    },
    accent: "from-[#f0ece6] via-[#ddd4c7] to-[#bda88b]",
    video: {
      src: "/media/work/promofilm-16-9.mp4",
      label: {
        no: "Fau&Land studio promo",
        en: "Fau&Land studio promo",
      },
    },
  },
];

export const servicePillars: ServicePillar[] = [
  {
    eyebrow: "01",
    title: {
      no: "Reklamefilm",
      en: "Commercial film",
    },
    summary: {
      no: "Kampanjefilmer, lanseringer og hero assets som raskt løfter opplevd verdi.",
      en: "Campaign films, launches and hero assets built to raise perceived value fast.",
    },
  },
  {
    eyebrow: "02",
    title: {
      no: "Brand storytelling",
      en: "Brand storytelling",
    },
    summary: {
      no: "Editorial filmer og founder-led historier som gjør komplekse merkevarer lette å forstå.",
      en: "Editorial films and founder-led narratives that make complex brands feel effortless.",
    },
  },
  {
    eyebrow: "03",
    title: {
      no: "Innholdsproduksjon",
      en: "Content production",
    },
    summary: {
      no: "Always-on cuts, vertikale versjoner og store leveransepakker med premium konsistens.",
      en: "Always-on cuts, vertical edits and high-volume deliverables with premium consistency.",
    },
  },
];

export const aboutStudioContent = {
  eyebrow: {
    no: "Om Fau&Land Film",
    en: "About Fau&Land Film",
  },
  title: {
    no: "Senior-led produksjon fra Oslo med et high-end, internasjonalt blikk.",
    en: "Senior-led production from Oslo with a high-end, international point of view.",
  },
  description: {
    no: "Fau&Land Film kombinerer kommersiell strategi, filmatisk håndverk og lean gjennomføring for merkevarer, organisasjoner og ambisiøse team som trenger arbeid som ser world-class ut.",
    en: "Fau&Land Film combines commercial strategy, cinematic craft and lean execution for brands, organizations and ambitious teams that need the work to look world-class.",
  },
  image: "/media/team/tommy-gard.png",
  imageAlt: {
    no: "Tommy Garland og Gard Ruben Fauske",
    en: "Tommy Garland and Gard Ruben Fauske",
  },
  stats: [
    { value: "Oslo", label: { no: "base", en: "base" } },
    { value: "B2B", label: { no: "fokus", en: "focus" } },
    { value: "High-end", label: { no: "produksjon", en: "production" } },
  ],
} satisfies {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  stats: MetricItem[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "reklamefilm",
    title: { no: "Reklamefilm", en: "Commercial film" },
    summary: {
      no: "Film som gjør det enklere å velge dere.",
      en: "Films that make your brand easier to choose.",
    },
    eyebrow: { no: "Kampanje og lansering", en: "Campaigns and launches" },
    value: {
      no: "Konsept, produksjon og uttak til kampanjer, annonser og nettside.",
      en: "Concept, production and campaign cutdowns for launches, ads and web.",
    },
    ctaLabel: { no: "Snakk med oss om reklamefilm", en: "Talk to us about commercial film" },
    href: "/kontakt",
  },
  {
    slug: "some-innhold",
    title: { no: "Innhold for sosiale medier", en: "Social content" },
    summary: {
      no: "Video og uttak som holder merkevaren synlig over tid.",
      en: "Video and cutdowns that keep brands visible over time.",
    },
    eyebrow: { no: "Synlighet over tid", en: "Always-on visibility" },
    value: {
      no: "Korte formater og visuelt innhold som er lett å publisere videre.",
      en: "Short-form edits and visual content built for fast publishing.",
    },
    ctaLabel: { no: "Få forslag til SoMe-innhold", en: "Get a social content direction" },
    href: "/kontakt",
  },
  {
    slug: "bedriftsfilm-employer-branding",
    title: {
      no: "Bedriftsfilm og employer branding",
      en: "Brand film and employer branding",
    },
    summary: {
      no: "Innhold som forklarer hvem dere er og hvorfor folk skal velge dere.",
      en: "Films that explain who you are and why clients and talent should choose you.",
    },
    eyebrow: { no: "Tillit og rekruttering", en: "Trust and recruitment" },
    value: {
      no: "Profilfilm, intervjuer og innhold som bygger troverdighet hos kunder og kandidater.",
      en: "Brand films, interviews and trust-building content for buyers and candidates.",
    },
    ctaLabel: { no: "Få forslag til bedriftsfilm", en: "Get a brand film direction" },
    href: "/kontakt",
  },
  {
    slug: "event-live",
    title: { no: "Eventfilm og live produksjon", en: "Event film and live production" },
    summary: {
      no: "Dekning og innhold som gjør arrangementet verdifullt lenge etterpå.",
      en: "Coverage and film assets that keep the event valuable long after it ends.",
    },
    eyebrow: { no: "Event og etterbruk", en: "Events and post-event value" },
    value: {
      no: "Live, flerkamera og uttak som kan brukes videre i markedsføring og oppfølging.",
      en: "Live, multicam and repurposed edits built for ongoing marketing and follow-up.",
    },
    ctaLabel: { no: "Planlegg eventproduksjon", en: "Plan an event production" },
    href: "/kontakt",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: {
      no: "De er trollmenn. Høy profesjonalitet og kvalitet gjennom hele prosessen.",
      en: "They are magicians. High professionalism and quality throughout the entire process.",
    },
    name: "Mattis Thørud",
    company: "Ville Gleder",
  },
  {
    quote: {
      no: "Profesjonelle, kreative og engasjerte. De fanget essensen av budskapet vårt.",
      en: "Professional, creative and engaged. They captured the essence of our message.",
    },
    name: "Alexander Hellenes",
    company: "Vikingmaxtrading",
  },
  {
    quote: {
      no: "Profesjonelle, dyktige og imøtekommende. Oppfølgingen føles nær og lavterskel.",
      en: "Professional, skilled and approachable. The follow-up feels close and easy.",
    },
    name: "Gunnar Johnsen",
    company: "Nei til Atomvåpen",
  },
];

export const offerPackages: OfferPackage[] = [
  {
    name: { no: "Starter", en: "Starter" },
    price: { no: "Fra 15 000 kr / mnd", en: "From NOK 15,000 / month" },
    summary: {
      no: "Et enkelt startpunkt for dere som trenger fast video uten å gjøre avtalen tung.",
      en: "A simple entry point for teams that need recurring video without unnecessary complexity.",
    },
    idealFor: {
      no: "Mindre selskaper og organisasjoner som vil være synlige jevnlig.",
      en: "Smaller companies and organizations that want to stay visible consistently.",
    },
    includes: [
      { no: "2 korte videoer per måned", en: "2 short videos per month" },
      { no: "Enkel planlegging og manusstøtte", en: "Planning and script support" },
      { no: "Redigering i avtalte formater", en: "Editing in agreed formats" },
      { no: "Månedlig statusmøte", en: "Monthly status meeting" },
    ],
    ctaLabel: { no: "Be om Starter-forslag", en: "Request a Starter proposal" },
    ctaHref: "/kontakt",
  },
  {
    name: { no: "Vekst", en: "Growth" },
    price: { no: "Fra 35 000 kr / mnd", en: "From NOK 35,000 / month" },
    summary: {
      no: "For dere som vil bruke video aktivt i markedsføring, salg og sosiale medier.",
      en: "For teams that want to use video actively across marketing, sales and social channels.",
    },
    idealFor: {
      no: "SMB-er og organisasjoner med tydelige mål og behov for mer kontinuitet.",
      en: "SMBs and organizations with clearer goals and a need for more continuity.",
    },
    includes: [
      { no: "4 videoer per måned", en: "4 videos per month" },
      { no: "Innholdsstrategi og publiseringsprioritering", en: "Content strategy and publishing priorities" },
      { no: "Enkel fotopakke eller ekstra uttak", en: "A light photo package or extra cutdowns" },
      { no: "Prioriterte leveranser", en: "Priority delivery" },
    ],
    featured: true,
    ctaLabel: { no: "Book møte om Vekst", en: "Book a Growth call" },
    ctaHref: "/kontakt",
  },
  {
    name: { no: "Partner", en: "Partner" },
    price: { no: "Fra 65 000 kr / mnd", en: "From NOK 65,000 / month" },
    summary: {
      no: "For team som trenger løpende produksjon, rask sparring og kort vei fra idé til publisering.",
      en: "For teams that need ongoing production, faster sparring and a shorter path from idea to delivery.",
    },
    idealFor: {
      no: "Selskaper med høyt aktivitetsnivå, kampanjer og flere flater i drift samtidig.",
      en: "Companies running at high tempo across campaigns and multiple active channels.",
    },
    includes: [
      { no: "Løpende kampanje- og innholdsproduksjon", en: "Ongoing campaign and content production" },
      { no: "Tettere rådgivning og innholdsplanlegging", en: "Closer advisory support and planning" },
      { no: "Prioritert produksjonstid", en: "Priority production time" },
      { no: "Fast kontaktperson og raskere oppfølging", en: "Dedicated lead producer and faster follow-up" },
    ],
    ctaLabel: { no: "Snakk med oss om Partner", en: "Talk to us about Partner" },
    ctaHref: "/kontakt",
  },
];

export const priceGuides: PriceGuide[] = [
  {
    title: { no: "SoMe-klipp og kortformat", en: "Short-form social edits" },
    range: { no: "Fra 5 000-20 000 kr+", en: "From NOK 5,000-20,000+" },
    detail: {
      no: "Typisk for korte videoer, repurposing eller mindre opptak med raske uttak.",
      en: "Typical for short edits, repurposing or smaller shoots with quick turnarounds.",
    },
  },
  {
    title: { no: "Bedriftsfilm / reklamefilm", en: "Brand film / commercial film" },
    range: { no: "Fra 20 000-100 000 kr+", en: "From NOK 20,000-100,000+" },
    detail: {
      no: "Pris påvirkes av konsept, opptaksdager, crew, lokasjon og antall versjoner.",
      en: "Pricing depends on concept, shoot days, crew, locations and the number of deliverables.",
    },
  },
  {
    title: { no: "Eventfilm og livestream", en: "Event film and livestream" },
    range: { no: "Fra 15 000-60 000 kr+", en: "From NOK 15,000-60,000+" },
    detail: {
      no: "Typisk for konferanser, høydepunktfilmer, intervjuer og streaming-oppsett.",
      en: "Typical for conferences, highlight films, interviews and streaming setups.",
    },
  },
  {
    title: { no: "Kampanje med flere uttak", en: "Campaign with multiple cutdowns" },
    range: { no: "Fra 100 000 kr+", en: "From NOK 100,000+" },
    detail: {
      no: "Passer når video, foto og flere formatuttak skal bygges i samme produksjonsløp.",
      en: "Best when video, photography and multiple deliverables are built from one production system.",
    },
  },
];

// Bytt ut tall, bilder og sitater her når flere verifiserte kundecaser er klare.
export const caseStudies: CaseStudy[] = [
  {
    slug: "ville-gleder",
    client: "Ville Gleder",
    title: {
      no: "Promofilm og innhold som skapte synlighet og respons",
      en: "Promo film and content that created visibility and response",
    },
    category: { no: "Kampanje", en: "Campaign" },
    industry: { no: "Opplevelser og foredrag", en: "Experiences and keynote speaking" },
    summary: {
      no: "Promofilm og korte uttak som gjorde det enklere å bygge interesse rundt foredragene.",
      en: "A promo film and shorter cutdowns that made it easier to build interest around the talks.",
    },
    goal: {
      no: "Trengte synlighet og innhold som kunne brukes på tvers av flere flater.",
      en: "Needed visibility and a set of assets that could travel across multiple channels.",
    },
    solution: {
      no: "Vi leverte promofilm og korte uttak til nettside og sosiale medier.",
      en: "We delivered a promo film and short edits for web and social distribution.",
    },
    deliverables: [
      { no: "Kampanjefilm", en: "Campaign film" },
      { no: "Korte SoMe-uttak", en: "Short social cutdowns" },
      { no: "Klipp til flere flater", en: "Edits for multiple channels" },
    ],
    impact: {
      no: "60 000+ visninger og tydelig respons rundt foredragene.",
      en: "60,000+ views and clear audience response around the talks.",
    },
    metrics: [
      { value: "60 000+", label: { no: "visninger", en: "views" } },
      { value: "Flere", label: { no: "henvendelser", en: "inquiries" } },
      { value: "3+", label: { no: "flater", en: "channels" } },
    ],
    tags: [
      { no: "Kampanje", en: "Campaign" },
      { no: "SoMe", en: "Social" },
      { no: "SMB", en: "SMB" },
    ],
    palette: "from-[#efe6da] via-[#d3c3ae] to-[#bda383]",
    featured: true,
  },
  {
    slug: "nei-til-atomvapen",
    client: "Nei til Atomvåpen",
    title: {
      no: "Videokampanje som bidro til medlemsvekst",
      en: "Video campaign that drove membership growth",
    },
    category: { no: "Organisasjon", en: "Organization" },
    industry: { no: "Ideell organisasjon", en: "Non-profit organization" },
    summary: {
      no: "En kampanje der video skulle gjøre budskapet tydelig og senke terskelen for å melde seg inn.",
      en: "A campaign where video was used to clarify the message and lower the barrier to joining.",
    },
    goal: {
      no: "Skape flere nye medlemmer og mer gjennomslag for kampanjen.",
      en: "Generate more new members and stronger momentum for the campaign.",
    },
    solution: {
      no: "Vi utviklet videoinnhold med tydelig oppfordring til handling for digitale flater.",
      en: "We developed video assets with a clear call to action for digital channels.",
    },
    deliverables: [
      { no: "Kampanjevideo", en: "Campaign video" },
      { no: "Korte digitale uttak", en: "Short digital cutdowns" },
      { no: "Tydelig CTA-struktur", en: "Clear CTA structure" },
    ],
    impact: {
      no: "300+ nye medlemmer i løpet av tre måneder.",
      en: "300+ new members over three months.",
    },
    metrics: [
      { value: "300+", label: { no: "nye medlemmer", en: "new members" } },
      { value: "3 mnd", label: { no: "kampanjeperiode", en: "campaign period" } },
      { value: "1", label: { no: "tydelig hovedhandling", en: "clear primary CTA" } },
    ],
    tags: [
      { no: "Organisasjon", en: "Organization" },
      { no: "Medlemsvekst", en: "Membership growth" },
      { no: "Kampanje", en: "Campaign" },
    ],
    palette: "from-[#f1e6db] via-[#d7c5b2] to-[#bb9e84]",
    featured: true,
  },
  {
    slug: "foreningen-norden",
    client: "Foreningen Norden",
    title: {
      no: "Eventinnhold som styrket synlighet og videre bruk",
      en: "Event content that strengthened visibility and reuse",
    },
    category: { no: "Event", en: "Event" },
    industry: { no: "Medlemsorganisasjon", en: "Membership organization" },
    summary: {
      no: "Dekning og uttak som gjorde arrangement og organisasjonsarbeid lettere å vise frem videre.",
      en: "Coverage and cutdowns that made the event and the broader organization easier to showcase afterwards.",
    },
    goal: {
      no: "Trengte innhold som både dokumenterte arrangementet og kunne brukes etterpå.",
      en: "Needed content that both documented the event and could keep working afterwards.",
    },
    solution: {
      no: "Vi kombinerte eventdekning, korte uttak og innhold til videre publisering.",
      en: "We combined event coverage, short edits and assets for continued publishing.",
    },
    deliverables: [
      { no: "Eventdekning", en: "Event coverage" },
      { no: "Korte uttak", en: "Short cutdowns" },
      { no: "Innhold til videre publisering", en: "Assets for ongoing publishing" },
    ],
    impact: {
      no: "Sterkere synlighet og en tydeligere innholdsflate i videre kommunikasjon.",
      en: "Stronger visibility and a clearer content system for ongoing communication.",
    },
    metrics: [
      { value: "Event", label: { no: "dekning", en: "coverage" } },
      { value: "Flere", label: { no: "uttak", en: "cutdowns" } },
      { value: "Videre", label: { no: "bruk", en: "reuse" } },
    ],
    tags: [
      { no: "Event", en: "Event" },
      { no: "Organisasjon", en: "Organization" },
      { no: "Innhold", en: "Content" },
    ],
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
    featured: true,
    verificationNote: {
      no: "Bytt inn konkret effekt eller kundeuttalelse her når den er verifisert.",
      en: "Replace this with a verified outcome or client quote when approved.",
    },
  },
  {
    slug: "lykseth-gard",
    client: "Lykseth Gård",
    title: {
      no: "Visuelt innhold som gjorde en lokal merkevare tydeligere",
      en: "Visual content that made a local brand more distinctive",
    },
    category: { no: "Promo", en: "Promo" },
    industry: { no: "Lokalt næringsliv", en: "Local business" },
    summary: {
      no: "Foto og video som gjorde tilbudet lettere å forstå og lettere å vise frem digitalt.",
      en: "Photo and video that made the offer easier to understand and stronger to present digitally.",
    },
    goal: {
      no: "Trengte et tydeligere visuelt uttrykk for markedsføring og digitale flater.",
      en: "Needed a clearer visual identity for marketing and digital surfaces.",
    },
    solution: {
      no: "Vi produserte foto og video som viste miljø, stemning og virksomheten i bruk.",
      en: "We produced photo and video that showed the atmosphere, the environment and the brand in action.",
    },
    deliverables: [
      { no: "Promo-innhold", en: "Promo content" },
      { no: "Stills og uttak", en: "Stills and cutdowns" },
      { no: "Korte klipp til markedsføring", en: "Short clips for marketing" },
    ],
    impact: {
      no: "Et tydeligere visuelt uttrykk som gjorde markedsføringen enklere å bygge videre på.",
      en: "A clearer visual identity that made future marketing easier to build on.",
    },
    metrics: [
      { value: "Foto + video", label: { no: "kombinasjon", en: "combination" } },
      { value: "Lokal", label: { no: "forankring", en: "local grounding" } },
      { value: "Brukbart", label: { no: "til flere flater", en: "for multiple channels" } },
    ],
    tags: [
      { no: "Promo", en: "Promo" },
      { no: "Innhold", en: "Content" },
      { no: "SMB", en: "SMB" },
    ],
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: { no: "Strategi", en: "Strategy" },
    description: {
      no: "Vi avklarer mål, budskap og hvor innholdet skal brukes.",
      en: "We align on goals, messaging and where the work will be used.",
    },
  },
  {
    step: "02",
    title: { no: "Produksjon", en: "Production" },
    description: {
      no: "Vi planlegger, filmer og leder produksjonen med riktig nivå på crew.",
      en: "We plan, shoot and lead production with the right crew for the brief.",
    },
  },
  {
    step: "03",
    title: { no: "Leveranse", en: "Delivery" },
    description: {
      no: "Dere får ferdige filmer og uttak i riktige formater.",
      en: "You receive finished films and the right cutdowns for each format.",
    },
  },
  {
    step: "04",
    title: { no: "Optimalisering", en: "Optimization" },
    description: {
      no: "Vi vurderer neste steg, nye uttak og videre bruk når det er relevant.",
      en: "We assess next steps, new edits and additional reuse where it matters.",
    },
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Tommy R.A. Garland",
    role: { no: "Partner, strategi og produksjon", en: "Partner, strategy and production" },
    summary: {
      no: "Tommy leder strategi, produksjon og gjennomføring med fokus på tydelig kommersiell retning og presis leveranse.",
      en: "Tommy leads strategy, production and execution with a focus on commercial clarity and precise delivery.",
    },
  },
  {
    name: "Gard Ruben Fauske",
    role: { no: "Partner, regi og visuell retning", en: "Partner, direction and visual craft" },
    summary: {
      no: "Gard leder den kreative visjonen, regien og den visuelle kvaliteten gjennom hele prosjektet.",
      en: "Gard leads the creative vision, direction and visual quality throughout each production.",
    },
  },
];

export const aboutBullets = [
  {
    no: "Oslo-basert produksjonsselskap med en internasjonal, editorial visuell standard.",
    en: "Oslo-based production company with an international editorial visual standard.",
  },
  {
    no: "Senior-led prosjektflyt fra strategi og regi til produksjon, redigering og uttak.",
    en: "Senior-led project flow from strategy and direction to production, edit and cutdowns.",
  },
  {
    no: "Skalerbart crew for foto, lyd, lys, motion design, drone og flerspors leveranser.",
    en: "Scalable crew for camera, sound, lighting, motion design, drone and multi-output delivery.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: { no: "Må vi velge en fast pakke?", en: "Do we need to choose a fixed package?" },
    answer: {
      no: "Nei. Pakker brukes som et tydelig startpunkt. Mange kunder starter med ett prosjekt og går videre til en løpende avtale når de ser hva som fungerer.",
      en: "No. Packages are a clear starting point. Many clients start with one project and move into an ongoing agreement when they see what works.",
    },
  },
  {
    question: { no: "Er prisene faste?", en: "Are the prices fixed?" },
    answer: {
      no: "Nei. Prisene er veiledende nivåer som gjør det enklere å forstå omfanget. Endelig pris avhenger av mål, antall opptaksdager, crew og hvor mange uttak dere trenger.",
      en: "No. The prices are guiding levels that make the scope easier to understand. Final pricing depends on goals, shoot days, crew and the number of deliverables you need.",
    },
  },
  {
    question: {
      no: "Kan dere levere både video, foto, drone og livestream?",
      en: "Can you deliver video, photo, drone and livestream in one setup?",
    },
    answer: {
      no: "Ja. Vi kombinerer kjerneteam og et utvidet nettverk slik at dere kan samle mer av leveransen ett sted.",
      en: "Yes. We combine our core team with a wider network so more of the production can live under one roof.",
    },
  },
  {
    question: { no: "Hvor raskt kan dere starte?", en: "How quickly can you start?" },
    answer: {
      no: "Vi svarer normalt innen 24 timer og kan ofte skissere et første oppsett i løpet av samme uke hvis briefen er tydelig.",
      en: "We usually respond within 24 hours and can often outline a first setup within the same week if the brief is clear.",
    },
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: { no: "Hva skjer etter at vi tar kontakt?", en: "What happens after we get in touch?" },
    answer: {
      no: "Vi tar en kort prat for å forstå mål, tidslinje og hva innholdet skal brukes til. Deretter foreslår vi riktig oppsett.",
      en: "We have a short conversation to understand goals, timeline and how the content will be used. Then we recommend the right setup.",
    },
  },
  {
    question: { no: "Tilbyr dere møte i Oslo?", en: "Do you offer meetings in Oslo?" },
    answer: {
      no: "Ja. Vi holder til i Oslo og kan møtes fysisk eller digitalt etter avtale.",
      en: "Yes. We are based in Oslo and can meet in person or remotely.",
    },
  },
  {
    question: { no: "Kan vi få et prisestimat raskt?", en: "Can we get a price estimate quickly?" },
    answer: {
      no: "Ja. Hvis dere vet litt om omfang, tidslinje og hva dere trenger, kan vi raskt gi et første estimat eller anbefale riktig nivå.",
      en: "Yes. If you know a bit about scope, timeline and what you need, we can quickly give a first estimate or recommend the right level.",
    },
  },
];

export const landingTemplateBullets = [
  {
    no: "Tydelig budskap over folden",
    en: "A clear message above the fold",
  },
  {
    no: "Relevant sosial proof tidlig",
    en: "Relevant social proof early on",
  },
  {
    no: "Kun én hovedhandling per side",
    en: "Only one primary action per page",
  },
];
