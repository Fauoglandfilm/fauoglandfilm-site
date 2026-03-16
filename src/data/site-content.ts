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

export type SocialLink = {
  name: "Facebook" | "LinkedIn" | "Instagram";
  href: string;
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
  locationLabel: "Oslo",
  responseTime: {
    no: "Vi følger opp innen 24 timer.",
    en: "We follow up within 24 hours.",
  },
  bookingHref: "/kontakt",
  bookingLabel: {
    no: "Book et uforpliktende møte",
    en: "Book an introductory call",
  },
  socialLinks: [
    {
      name: "Facebook",
      href: "https://www.facebook.com/Fauoglandfilm",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/fauoglandfilm/",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/fauoglandfilm/",
    },
  ] satisfies SocialLink[],
  coverageArea: "Oslo og hele Norge",
  description:
    "Fau&Land Film lager reklamefilm, profilfilm og innholdsproduksjon for bedrifter og organisasjoner som vil skape mer synlighet, mer tillit og flere henvendelser.",
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
    no: "Vi lager reklamefilm og innholdsproduksjon som gjør det lettere for kunder å velge dere.",
    en: "We create commercial films and content that make it easier for customers to choose your brand.",
  },
  ctaLabel: {
    no: "Book et uforpliktende møte",
    en: "Book an introductory call",
  },
  ctaHref: "/kontakt",
};

export const homeIntroContent = {
  eyebrow: {
    no: "Oslo-basert produksjonsselskap",
    en: "Oslo-based production company",
  },
  title: {
    no: "Reklamefilm og innhold som ser bedre ut og fungerer bedre.",
    en: "Commercial film and content that looks better and performs better.",
  },
  description: {
    no: "Seniorledet produksjon for bedrifter og organisasjoner som vil ha tydelig kvalitet og kort vei fra første møte til ferdig film.",
    en: "Senior-led production for companies and organisations that want clear quality and a short path from first conversation to final film.",
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

// Curated active set from clients/COLOR. Placeholder/uncertain files are excluded from the marquee.
export const clientLogos: ClientLogo[] = [
  {
    name: "Front B Trading",
    src: "/media/logos/clients/COLOR/front-b-trading.png",
    width: 1385,
    height: 958,
    scale: 0.9,
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
];

export const selectedWork: WorkSample[] = [
  {
    slug: "winter-signature",
    client: "Fau&Land Film",
    title: {
      no: "Visuell signaturfilm",
      en: "Signature brand film",
    },
    category: {
      no: "Studiofilm",
      en: "Studio film",
    },
    summary: {
      no: "Et visuelt uttrykk som viser hvordan vi bygger stemning, detaljer og kvalitet i film.",
      en: "A visual signature piece that shows how we work with mood, detail and quality on screen.",
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
      no: "Produktfilm for bilpleie",
      en: "Product film for car care",
    },
    category: {
      no: "Reklamefilm",
      en: "Commercial film",
    },
    summary: {
      no: "Laget for nettside, annonser og sosiale medier der detaljer og finish skal selge.",
      en: "Built for websites, ads and social media where detail and finish need to do the selling.",
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
      no: "Hotellfilm med ro og detaljer",
      en: "Hotel film with detail and atmosphere",
    },
    category: {
      no: "Profilfilm",
      en: "Brand film",
    },
    summary: {
      no: "Et visuelt portrett som løfter opplevelsen av sted, standard og atmosfære.",
      en: "A visual portrait designed to elevate the sense of place, standard and atmosphere.",
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
      no: "Kampanjefilm for digitale flater",
      en: "Campaign film for digital channels",
    },
    category: {
      no: "Kampanjeinnhold",
      en: "Campaign content",
    },
    summary: {
      no: "Kortformat laget for å stoppe scrollen og forklare tilbudet raskt.",
      en: "Short-form content built to stop the scroll and explain the offer quickly.",
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
      no: "Historiedrevet kortfilm",
      en: "Story-led short film",
    },
    category: {
      no: "Brand storytelling",
      en: "Brand storytelling",
    },
    summary: {
      no: "Et kort format som bygger nærhet og gjør budskapet lettere å huske.",
      en: "A short format that builds connection and makes the message easier to remember.",
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
      no: "Studiofilm",
      en: "Showreel",
    },
    category: {
      no: "Studiofilm",
      en: "Studio film",
    },
    summary: {
      no: "Et utvalg klipp som viser bredden i arbeidet vårt på tvers av uttrykk og formater.",
      en: "A selection of clips that shows the range of our work across styles and formats.",
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
      no: "Film som gjør det enklere for kunder å velge dere.",
      en: "Film that makes your brand easier to choose.",
    },
  },
  {
    eyebrow: "02",
    title: {
      no: "Brand storytelling",
      en: "Brand storytelling",
    },
    summary: {
      no: "Filmer som forklarer hvem dere er og hvorfor det betyr noe.",
      en: "Films that explain who you are and why it matters.",
    },
  },
  {
    eyebrow: "03",
    title: {
      no: "Innholdsproduksjon",
      en: "Content production",
    },
    summary: {
      no: "Video til sosiale medier som holder merkevaren synlig uten at dere trenger å produsere alt selv.",
      en: "Video for social media that keeps your brand visible without forcing your team to produce everything in-house.",
    },
  },
];

export const aboutStudioContent = {
  eyebrow: {
    no: "Om Fau&Land Film",
    en: "About Fau&Land Film",
  },
  title: {
    no: "To seniorer. Hvert prosjekt. Alltid.",
    en: "Two senior creatives. Every project. Always.",
  },
  description: {
    no: "Fau&Land Film er et Oslo-basert produksjonsselskap ledet av Gard Ruben Fauske og Tommy R.A. Garland. Vi lager reklamefilm og visuelt innhold for bedrifter og organisasjoner som vil ha arbeid som ser bedre ut og fungerer bedre.",
    en: "Fau&Land Film is an Oslo-based production company led by Gard Ruben Fauske and Tommy R.A. Garland. We create commercial films and visual content for companies and organisations that need work that looks better and performs better.",
  },
  image: "/media/team/tommy-gard.png",
  imageAlt: {
    no: "Tommy Garland og Gard Ruben Fauske",
    en: "Tommy Garland and Gard Ruben Fauske",
  },
  stats: [
    { value: "2", label: { no: "seniorer", en: "seniors" } },
    { value: "Oslo", label: { no: "base", en: "base" } },
    { value: "B2B", label: { no: "fokus", en: "focus" } },
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
      en: "Film that makes your brand easier to choose.",
    },
    eyebrow: { no: "Kampanjer og lanseringer", en: "Campaigns and launches" },
    value: {
      no: "Konsept, opptak og versjoner til nettside, annonser og sosiale medier.",
      en: "Concept, production and cutdowns for websites, ads and social media.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
  {
    slug: "some-innhold",
    title: { no: "Innholdsproduksjon", en: "Content production" },
    summary: {
      no: "Video til sosiale medier som holder merkevaren synlig uten at dere trenger å produsere alt selv.",
      en: "Video for social media that keeps your brand visible without forcing your team to produce everything in-house.",
    },
    eyebrow: { no: "Sosiale medier", en: "Social media" },
    value: {
      no: "Korte filmer og uttak til publisering gjennom måneden.",
      en: "Short films and cutdowns your team can publish throughout the month.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
  {
    slug: "bedriftsfilm-employer-branding",
    title: {
      no: "Brand storytelling",
      en: "Brand storytelling",
    },
    summary: {
      no: "Filmer som forklarer hvem dere er og hvorfor det betyr noe.",
      en: "Films that explain who you are and why it matters.",
    },
    eyebrow: { no: "Profil, tillit og rekruttering", en: "Profile, trust and hiring" },
    value: {
      no: "Profilfilm, intervjuer og fortellinger som gjør det lettere å forstå hva dere står for.",
      en: "Brand films, interviews and stories that make it easier to understand what your company stands for.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
  {
    slug: "event-live",
    title: { no: "Eventfilm og live produksjon", en: "Event film and live production" },
    summary: {
      no: "Dekning og innhold som gjør arrangementet nyttig lenge etter at dagen er over.",
      en: "Coverage and film assets that keep the event useful long after the day is over.",
    },
    eyebrow: { no: "Event og etterbruk", en: "Events and post-event value" },
    value: {
      no: "Opptak, flerkamera og uttak som kan brukes videre i markedsføring og oppfølging.",
      en: "Live capture, multicam and cutdowns that can keep working in marketing and follow-up.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: {
      no: "Høy profesjonalitet og kvalitet gjennom hele prosessen.",
      en: "High professionalism and quality throughout the entire process.",
    },
    name: "Mattis Thørud",
    company: "Ville Gleder",
  },
  {
    quote: {
      no: "Profesjonelle, kreative og engasjerte. De forsto budskapet vårt raskt.",
      en: "Professional, creative and engaged. They understood our message quickly.",
    },
    name: "Alexander Hellenes",
    company: "Vikingmaxtrading",
  },
  {
    quote: {
      no: "Profesjonelle, dyktige og imøtekommende. Oppfølgingen var tett og enkel hele veien.",
      en: "Professional, skilled and approachable. The follow-up was close and easy all the way through.",
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
      no: "For dere som trenger jevnlig video uten å bygge opp et stort apparat internt.",
      en: "For teams that need recurring video without building a large setup in-house.",
    },
    idealFor: {
      no: "Passer for mindre team som vil holde nettside og sosiale medier oppdatert.",
      en: "A good fit for smaller teams that want to keep their website and social channels active.",
    },
    includes: [
      { no: "2 korte videoer per måned", en: "2 short videos per month" },
      { no: "Enkel planlegging og manusstøtte", en: "Planning and script support" },
      { no: "Redigering i avtalte formater", en: "Editing in agreed formats" },
      { no: "Månedlig statusmøte", en: "Monthly status meeting" },
    ],
    ctaLabel: { no: "Få et prisestimat", en: "Get a price estimate" },
    ctaHref: "/kontakt",
  },
  {
    name: { no: "Vekst", en: "Growth" },
    price: { no: "Fra 35 000 kr / mnd", en: "From NOK 35,000 / month" },
    summary: {
      no: "For dere som vil bruke video fast i markedsføring, salg og sosiale medier.",
      en: "For teams that want to use video consistently across marketing, sales and social channels.",
    },
    idealFor: {
      no: "Passer for bedrifter og organisasjoner med tydelige mål og behov for mer kontinuitet.",
      en: "A good fit for companies and organisations with clear goals and a need for more continuity.",
    },
    includes: [
      { no: "4 videoer per måned", en: "4 videos per month" },
      { no: "Innholdsplan og publiseringsprioritering", en: "Content plan and publishing priorities" },
      { no: "Ekstra uttak eller enkel fotopakke", en: "Extra cutdowns or a light photo package" },
      { no: "Prioriterte leveranser", en: "Priority delivery" },
    ],
    featured: true,
    ctaLabel: { no: "Få et prisestimat", en: "Get a price estimate" },
    ctaHref: "/kontakt",
  },
  {
    name: { no: "Partner", en: "Partner" },
    price: { no: "Fra 65 000 kr / mnd", en: "From NOK 65,000 / month" },
    summary: {
      no: "For team som trenger løpende produksjon, rask sparring og kort vei fra idé til publisering.",
      en: "For teams that need ongoing production, rapid sparring and a shorter path from idea to delivery.",
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
    ctaLabel: { no: "Få et prisestimat", en: "Get a price estimate" },
    ctaHref: "/kontakt",
  },
];

export const priceGuides: PriceGuide[] = [
  {
    title: { no: "SoMe-klipp og kortformat", en: "Short-form social edits" },
    range: { no: "Fra 5 000-20 000 kr", en: "From NOK 5,000-20,000" },
    detail: {
      no: "Passer for korte filmer, repurposing og mindre opptak med raske uttak.",
      en: "Typical for short edits, repurposing and smaller shoots with fast turnarounds.",
    },
  },
  {
    title: { no: "Bedriftsfilm / reklamefilm", en: "Brand film / commercial film" },
    range: { no: "Fra 20 000-100 000 kr+", en: "From NOK 20,000-100,000+" },
    detail: {
      no: "Pris avhenger av idé, opptaksdager, crew, lokasjon og hvor mange versjoner dere trenger.",
      en: "Pricing depends on concept, shoot days, crew, locations and how many versions you need.",
    },
  },
  {
    title: { no: "Eventfilm og livestream", en: "Event film and livestream" },
    range: { no: "Fra 15 000-60 000 kr+", en: "From NOK 15,000-60,000+" },
    detail: {
      no: "Typisk for konferanser, høydepunktfilmer, intervjuer og streaming.",
      en: "Typical for conferences, highlight films, interviews and livestreams.",
    },
  },
  {
    title: { no: "Kampanje med flere uttak", en: "Campaign with multiple cutdowns" },
    range: { no: "Fra 100 000 kr+", en: "From NOK 100,000+" },
    detail: {
      no: "Passer når video, foto og flere uttak skal bygges i samme produksjon.",
      en: "Best when film, photography and multiple deliverables are built from one production.",
    },
  },
];

// Bytt ut tall, bilder og sitater her når flere verifiserte kundecaser er klare.
export const caseStudies: CaseStudy[] = [
  {
    slug: "ville-gleder",
    client: "Ville Gleder",
    title: {
      no: "Promofilm som skapte mer interesse",
      en: "Promo film that built more interest",
    },
    category: { no: "Kampanje", en: "Campaign" },
    industry: { no: "Opplevelser og foredrag", en: "Experiences and keynote speaking" },
    summary: {
      no: "Promofilm og korte uttak brukt for å skape oppmerksomhet rundt foredragene.",
      en: "A promo film and short cutdowns used to build attention around the talks.",
    },
    goal: {
      no: "Trengte mer synlighet og innhold som kunne brukes i flere kanaler.",
      en: "Needed more visibility and content that could work across several channels.",
    },
    solution: {
      no: "Vi produserte en promofilm og korte versjoner for nettside og sosiale medier.",
      en: "We produced a promo film and shorter versions for web and social media.",
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
      no: "Kampanjefilm som bidro til medlemsvekst",
      en: "Campaign film that drove membership growth",
    },
    category: { no: "Organisasjon", en: "Organization" },
    industry: { no: "Ideell organisasjon", en: "Non-profit organization" },
    summary: {
      no: "Video som gjorde budskapet tydeligere og senket terskelen for å melde seg inn.",
      en: "Video that made the message clearer and lowered the barrier to joining.",
    },
    goal: {
      no: "Trengte flere nye medlemmer og en tydeligere digital kampanje.",
      en: "Needed more new members and a clearer digital campaign.",
    },
    solution: {
      no: "Vi utviklet kampanjevideo og korte versjoner med tydelig oppfordring til handling.",
      en: "We developed a campaign film and shorter versions with a clear call to action.",
    },
    deliverables: [
      { no: "Kampanjevideo", en: "Campaign video" },
      { no: "Korte digitale uttak", en: "Short digital cutdowns" },
      { no: "Klare oppfordringer til handling", en: "Clear calls to action" },
    ],
    impact: {
      no: "300+ nye medlemmer i løpet av tre måneder.",
      en: "300+ new members over three months.",
    },
    metrics: [
      { value: "300+", label: { no: "nye medlemmer", en: "new members" } },
      { value: "3 mnd", label: { no: "kampanjeperiode", en: "campaign period" } },
      { value: "Klar", label: { no: "handling", en: "action" } },
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
      no: "Eventinnhold som kunne brukes videre",
      en: "Event content built for reuse",
    },
    category: { no: "Event", en: "Event" },
    industry: { no: "Medlemsorganisasjon", en: "Membership organization" },
    summary: {
      no: "Dekning og korte uttak som gjorde arrangementet lettere å vise frem også etterpå.",
      en: "Coverage and short cutdowns that made the event easier to showcase afterwards.",
    },
    goal: {
      no: "Trengte innhold som både dokumenterte arrangementet og ga materiale til videre kommunikasjon.",
      en: "Needed content that documented the event and created material for ongoing communication.",
    },
    solution: {
      no: "Vi leverte eventdekning, korte uttak og materiale til videre publisering.",
      en: "We delivered event coverage, short cutdowns and material for continued publishing.",
    },
    deliverables: [
      { no: "Eventdekning", en: "Event coverage" },
      { no: "Korte uttak", en: "Short cutdowns" },
      { no: "Innhold til videre publisering", en: "Assets for ongoing publishing" },
    ],
    impact: {
      no: "Mer synlighet rundt arrangementet og mer innhold til videre kommunikasjon.",
      en: "More visibility around the event and more content for ongoing communication.",
    },
    metrics: [
      { value: "Event", label: { no: "dokumentert", en: "captured" } },
      { value: "Flere", label: { no: "uttak", en: "edits" } },
      { value: "Videre", label: { no: "bruk", en: "reuse" } },
    ],
    tags: [
      { no: "Event", en: "Event" },
      { no: "Organisasjon", en: "Organization" },
      { no: "Innhold", en: "Content" },
    ],
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
    featured: true,
  },
  {
    slug: "lykseth-gard",
    client: "Lykseth Gård",
    title: {
      no: "Innhold som gjorde tilbudet lettere å forstå",
      en: "Content that made the offer easier to understand",
    },
    category: { no: "Promo", en: "Promo" },
    industry: { no: "Lokalt næringsliv", en: "Local business" },
    summary: {
      no: "Foto og video som gjorde tilbudet tydeligere og lettere å vise frem digitalt.",
      en: "Photo and video that made the offer clearer and easier to present online.",
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
    title: { no: "Avklaring", en: "Alignment" },
    description: {
      no: "Vi avklarer mål, målgruppe og hva filmen skal brukes til.",
      en: "We align on the goal, the audience and where the film will be used.",
    },
  },
  {
    step: "02",
    title: { no: "Produksjon", en: "Production" },
    description: {
      no: "Vi planlegger opptak, crew og gjennomføring ut fra budsjett og behov.",
      en: "We plan the shoot, the crew and the production setup around the budget and the project.",
    },
  },
  {
    step: "03",
    title: { no: "Leveranse", en: "Delivery" },
    description: {
      no: "Dere får ferdige filmer og versjoner til de flatene dere skal bruke.",
      en: "You receive finished films and versions for the channels you need.",
    },
  },
  {
    step: "04",
    title: { no: "Videre bruk", en: "Next step" },
    description: {
      no: "Vi ser på videre bruk, nye uttak og hva som er smartest å gjøre videre.",
      en: "We look at reuse, new cutdowns and what makes sense to do next.",
    },
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Tommy R.A. Garland",
    role: { no: "Partner, strategi og produksjon", en: "Partner, strategy and production" },
    summary: {
      no: "Tommy leder strategi, planlegging og produksjon med fokus på tydelig retning og trygg gjennomføring.",
      en: "Tommy leads strategy, planning and production with a focus on clear direction and reliable delivery.",
    },
  },
  {
    name: "Gard Ruben Fauske",
    role: { no: "Partner, regi og visuell retning", en: "Partner, direction and visual craft" },
    summary: {
      no: "Gard leder regi, visuelt uttrykk og kvaliteten i det som faktisk havner på skjermen.",
      en: "Gard leads direction, visual expression and the quality of what finally ends up on screen.",
    },
  },
];

export const aboutBullets = [
  {
    no: "Oslo-basert produksjonsselskap for bedrifter og organisasjoner.",
    en: "Oslo-based production company for companies and organisations.",
  },
  {
    no: "To seniorer følger prosjektet tett fra første møte til ferdig leveranse.",
    en: "Two senior creatives stay close to the project from first conversation to final delivery.",
  },
  {
    no: "Skalerbart crew når prosjektet trenger foto, lyd, lys, drone eller flere opptaksdager.",
    en: "A scalable crew when the project needs photography, sound, lighting, drone or additional shoot days.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: { no: "Må vi velge en fast pakke?", en: "Do we need to choose a fixed package?" },
    answer: {
      no: "Nei. Pakkene er først og fremst et startpunkt. Mange begynner med ett prosjekt og utvider når de ser hva de trenger mer av.",
      en: "No. The packages are mainly a starting point. Many clients begin with one project and expand when they see what they need more of.",
    },
  },
  {
    question: { no: "Er prisene faste?", en: "Are the prices fixed?" },
    answer: {
      no: "Nei. Prisene er veiledende nivåer. Endelig pris avhenger av mål, opptaksomfang, crew og hvor mange leveranser dere trenger.",
      en: "No. The pricing is indicative. Final cost depends on the goal, shoot scope, crew and how many deliverables you need.",
    },
  },
  {
    question: {
      no: "Kan dere levere både video, foto, drone og livestream?",
      en: "Can you deliver video, photo, drone and livestream in one setup?",
    },
    answer: {
      no: "Ja. Vi setter sammen riktig team rundt prosjektet, slik at dere kan samle mer av leveransen ett sted.",
      en: "Yes. We build the right team around the project so more of the delivery can sit in one place.",
    },
  },
  {
    question: { no: "Hvor raskt kan dere starte?", en: "How quickly can you start?" },
    answer: {
      no: "Vi følger opp innen 24 timer og kan ofte skissere et første oppsett i løpet av samme uke.",
      en: "We follow up within 24 hours and can often outline a first setup within the same week.",
    },
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: { no: "Hva skjer etter at vi tar kontakt?", en: "What happens after we get in touch?" },
    answer: {
      no: "Vi tar en kort prat for å forstå mål, tidslinje og hvor filmen skal brukes. Deretter foreslår vi riktig oppsett.",
      en: "We have a short conversation to understand the goal, the timeline and where the film will be used. Then we recommend the right setup.",
    },
  },
  {
    question: { no: "Tilbyr dere møte i Oslo?", en: "Do you offer meetings in Oslo?" },
    answer: {
      no: "Ja. Vi holder til i Oslo og kan møtes fysisk eller digitalt.",
      en: "Yes. We are based in Oslo and can meet in person or remotely.",
    },
  },
  {
    question: { no: "Kan vi få et prisestimat raskt?", en: "Can we get a price estimate quickly?" },
    answer: {
      no: "Ja. Hvis dere vet litt om omfang, tidslinje og hva filmen skal brukes til, kan vi raskt gi et første estimat.",
      en: "Yes. If you know a little about scope, timeline and where the film will be used, we can quickly provide a first estimate.",
    },
  },
];

export const landingTemplateBullets = [
  {
    no: "Tydelig budskap på få sekunder",
    en: "A clear message within seconds",
  },
  {
    no: "Proof og tillit tidlig på siden",
    en: "Proof and trust early on the page",
  },
  {
    no: "En tydelig handling per side",
    en: "One clear action per page",
  },
];
