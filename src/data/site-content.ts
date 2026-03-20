import type { LocalizedText } from "@/lib/i18n";

export type MetricItem = {
  value: string;
  label: LocalizedText;
};

export type VideoAsset =
  | {
      videoType: "direct";
      src: string;
      fullSrc?: string;
      poster?: string;
      mobilePoster?: string;
      label: LocalizedText;
      mobileSrc?: string;
      hasEmbeddedText?: boolean;
    }
  | {
      videoType: "request";
      poster?: string;
      label: LocalizedText;
      availabilityNote: LocalizedText;
    };

export type ExternalVideoAsset = {
  provider: "youtube" | "vimeo";
  videoType: "youtube" | "vimeo";
  videoId: string;
  embedUrl: string;
  thumbnailSrc: string;
  label: LocalizedText;
  sourceUrl: string;
};

export type VideoVariant = {
  slug: string;
  label: LocalizedText;
  video: VideoAsset;
  image?: string;
  imageAlt?: LocalizedText;
  mediaFit?: "cover" | "contain";
  frame?: "landscape" | "portrait" | "portrait4x5";
};

export type NavItem = {
  href: string;
  label: LocalizedText;
};

export type ClientLogo = {
  name: string;
  src: string;
  lightSrc?: string;
  darkSrc?: string;
  width: number;
  height: number;
};

export type SocialLink = {
  name: "Facebook" | "LinkedIn" | "Instagram";
  href: string;
};

export type ServiceArea = {
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  eyebrow: LocalizedText;
  value: LocalizedText;
  budget: LocalizedText;
  timeline: LocalizedText;
  deliverables: LocalizedText[];
  ctaLabel: LocalizedText;
  href: string;
  exampleHref?: string;
  exampleLabel?: LocalizedText;
};

export type ServicePillar = {
  title: LocalizedText;
  eyebrow: string;
  summary: LocalizedText;
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
  mediaFit?: "cover" | "contain";
  video?: VideoAsset;
  videoVariants?: VideoVariant[];
  externalVideo?: ExternalVideoAsset;
  palette?: string;
  featured?: boolean;
  verificationNote?: LocalizedText;
};

export type PortfolioGroup = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
};

export type PortfolioProject = {
  slug: string;
  group: string;
  client: string;
  title: LocalizedText;
  format: LocalizedText;
  summary: LocalizedText;
  result?: LocalizedText;
  year?: string;
  detailHref?: string;
  sourceUrl?: string;
  ctaLabel: LocalizedText;
  mediaFit?: "cover" | "contain";
  image?: string;
  imageAlt?: LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  palette?: string;
  featured?: boolean;
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
  image?: string;
  imageAlt?: LocalizedText;
  href?: string;
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
  orgId: "921365454MVA",
  domain: "https://fauoglandfilm.com",
  email: "post@fauoglandfilm.com",
  phonePrimary: "+47 940 53 050",
  phonePrimaryHref: "tel:+4794053050",
  location: "Oslo",
  locationLabel: "Oslo, Norway",
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
    "Fau&Land Film lager reklamefilm, bedriftsfilm og innholdsproduksjon for bedrifter og organisasjoner som vil skape mer synlighet, mer tillit og flere henvendelser.",
  keywords: [
    "videoproduksjon Oslo",
    "reklamefilm Oslo",
    "innholdsproduksjon Oslo",
    "bedriftsfilm Oslo",
    "aftermovie Oslo",
    "employer branding video Oslo",
    "videobyrå Oslo",
  ],
};

export const homeHeroContent = {
  title: {
    no: "Film som faktisk selger!",
    en: "Film that actually sells!",
  },
  description: {
    no: "Mer synlighet, flere henvendelser og bedre konvertering fra film bygget for nettside, annonser og sosiale medier.",
    en: "More visibility, more inquiries and better conversion from films built for websites, ads and social media.",
  },
  ctaLabel: {
    no: "Book møte",
    en: "Book a meeting",
  },
  ctaHref: "/kontakt",
};

export const homeIntroContent = {
  eyebrow: {
    no: "Produksjonspartner i Oslo",
    en: "Production partner in Oslo",
  },
  title: {
    no: "Film til nettside, kampanjer, sosiale medier og arrangementer.",
    en: "Film for websites, campaigns, social channels and events.",
  },
  description: {
    no: "For bedrifter og organisasjoner som trenger tydelig budskap, høy kvalitet og raske beslutninger.",
    en: "For companies and organisations that need a clearer message, stronger quality and faster decisions.",
  },
};

export const portfolioPageContent = {
  eyebrow: {
    no: "Portefølje",
    en: "Portfolio",
  },
  title: {
    no: "Et samlet utvalg av Fau&Land Film sitt arbeid.",
    en: "A curated view of Fau&Land Film's work.",
  },
  description: {
    no: "Et utvalg av arbeid innen reklamefilm, dokumentar, event, musikkvideo og innhold for organisasjoner og merkevarer.",
    en: "Work across commercial film, documentary, events, music video and content for organisations and brands.",
  },
  showreelEyebrow: {
    no: "Showreel",
    en: "Showreel",
  },
  showreelTitle: {
    no: "Start med showreelen.",
    en: "Start with the showreel.",
  },
  showreelDescription: {
    no: "Showreel 2025 samler nyere arbeid fra kampanje, organisasjon, event, musikkvideo og kortfilm i en kort introduksjon.",
    en: "Showreel 2025 brings together recent work across campaigns, organisations, events, music video and short film in one concise introduction.",
  },
  showreelPrimaryCta: {
    no: "Åpne showreel",
    en: "Open showreel",
  },
  showreelSecondaryCta: {
    no: "Send en kort brief",
    en: "Send a short brief",
  },
  browseCta: {
    no: "Se porteføljen",
    en: "Browse the portfolio",
  },
  footerTitle: {
    no: "Trenger dere noe lignende?",
    en: "Need something similar?",
  },
  footerDescription: {
    no: "Fortell oss kort hva dere vil oppnå, så foreslår vi riktig format, omfang og neste steg.",
    en: "Tell us briefly what you need to achieve and we will suggest the right format, scope and next step.",
  },
};

// Hero-media styres her. Resten av siten bruker nå primært tekst, gradienter og placeholders.
export const videoLibrary = {
  hero: {
    videoType: "direct",
    src: "/media/hero/FL-Bakgrunn_2-1-.mp4",
    poster: "/media/hero/hero-clean-preload.jpg",
    label: {
      no: "Naturfilm for Fau&Land Film",
      en: "Nature film for Fau&Land Film",
    },
    hasEmbeddedText: false,
  },
} satisfies Record<string, VideoAsset>;

export const homeServiceVideoLibrary = {
  "01": {
    videoType: "direct",
    src: "/assets/services/videos/reklamefilm.mp4",
    poster: "/assets/services/posters/reklamefilm-poster.png",
    label: {
      no: "Reklamefilm",
      en: "Commercial film",
    },
  },
  "02": {
    videoType: "direct",
    src: "/assets/services/videos/bedriftfilm.mp4",
    poster: "/assets/services/posters/bedriftfilm-poster.png",
    label: {
      no: "Bedriftsfilm",
      en: "Company film",
    },
  },
  "03": {
    videoType: "direct",
    src: "/assets/services/videos/sosiale-medier.mp4",
    poster: "/assets/services/posters/sosiale-medier-poster.png",
    label: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
  },
  "04": {
    videoType: "direct",
    src: "/assets/services/videos/konsert.mp4",
    poster: "/assets/services/posters/konsert-poster.png",
    label: {
      no: "Aftermovie",
      en: "Aftermovie",
    },
  },
} satisfies Record<string, VideoAsset>;

const youtubeWatchUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;

const youtubeAsset = (
  videoId: string,
  label: LocalizedText,
  suffix = "",
): ExternalVideoAsset => ({
  provider: "youtube",
  videoType: "youtube",
  videoId,
  embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${suffix}`,
  thumbnailSrc: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  label,
  sourceUrl: youtubeWatchUrl(videoId),
});

const vimeoAsset = (
  videoId: string,
  label: LocalizedText,
  thumbnailSrc: string,
  hash?: string,
): ExternalVideoAsset => ({
  provider: "vimeo",
  videoType: "vimeo",
  videoId,
  embedUrl: `https://player.vimeo.com/video/${videoId}${hash ? `?h=${hash}` : ""}`,
  thumbnailSrc,
  label,
  sourceUrl: `https://vimeo.com/${videoId}${hash ? `/${hash}` : ""}`,
});

const viewCaseCta = { no: "Se case", en: "View case" } satisfies LocalizedText;
const openFilmCta = { no: "Åpne film", en: "Open film" } satisfies LocalizedText;
const openShowreelCta = { no: "Åpne showreel", en: "Open showreel" } satisfies LocalizedText;
const viewReferenceCta = { no: "Se referanse", en: "View reference" } satisfies LocalizedText;

export const navItems: NavItem[] = [
  { href: "/tjenester", label: { no: "Tjenester", en: "Services" } },
  { href: "/case", label: { no: "Portefølje", en: "Portfolio" } },
  { href: "/om-oss", label: { no: "Om oss", en: "About" } },
  { href: "/faq", label: { no: "FAQ", en: "FAQ" } },
  { href: "/kontakt", label: { no: "Kontakt", en: "Contact" } },
];

// Curated active set from clients/COLOR. The marquee only uses verified brand files.
export const clientLogos: ClientLogo[] = [
  {
    name: "Ville Gleder",
    src: "/media/logos/clients/COLOR/marquee/ville-gleder-marquee.png",
    darkSrc: "/media/logos/clients/COLOR/marquee/ville-gleder-dark-marquee.png",
    width: 1466,
    height: 476,
  },
  {
    name: "Treningshuset",
    src: "/media/logos/clients/COLOR/Treningshuset.png",
    width: 726,
    height: 146,
  },
  {
    name: "STUA",
    src: "/media/logos/clients/COLOR/STUA.png",
    darkSrc: "/media/logos/clients/COLOR/stua-dark.png",
    width: 1563,
    height: 1563,
  },
  {
    name: "Norske Bunader",
    src: "/media/logos/clients/COLOR/Norske%20Bunader.webp",
    darkSrc: "/media/logos/clients/COLOR/norske-bunader-dark.png",
    width: 500,
    height: 200,
  },
  {
    name: "Actors Hub",
    src: "/media/logos/clients/COLOR/actorshub-logo-dark-text.png",
    darkSrc: "/media/logos/clients/COLOR/actorshub_logo_white_NY-kopi.png",
    width: 1500,
    height: 844,
  },
  {
    name: "Gina",
    src: "/media/logos/clients/COLOR/GinaLiggende-01.webp",
    darkSrc: "/media/logos/clients/COLOR/gina-dark.png",
    width: 1500,
    height: 341,
  },
  {
    name: "The International Stunt Academy",
    src: "/media/logos/clients/COLOR/marquee/isa-marquee.png",
    darkSrc: "/media/logos/clients/COLOR/marquee/isa-dark-marquee.png",
    width: 1483,
    height: 660,
  },
  {
    name: "Nei til Atomvåpen",
    src: "/media/logos/clients/COLOR/marquee/ny-nei-til-atomvapen-marquee.png",
    width: 447,
    height: 448,
  },
  {
    name: "Foreningen Norden",
    src: "/media/logos/clients/COLOR/marquee/foreningen-norden-marquee.png",
    darkSrc: "/media/logos/clients/COLOR/marquee/foreningen-norden-dark-marquee.png",
    width: 1282,
    height: 508,
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
      no: "Film som gjør det enklere å velge dere.",
      en: "Film that makes you easier to choose.",
    },
  },
  {
    eyebrow: "02",
    title: {
      no: "Bedriftsfilm",
      en: "Company film",
    },
    summary: {
      no: "Video som bygger tillit og forklarer tilbudet.",
      en: "Video that builds trust and explains the offer.",
    },
  },
  {
    eyebrow: "03",
    title: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
    summary: {
      no: "Video som holder dere synlige mellom kampanjer og lanseringer.",
      en: "Video that keeps you visible between campaigns and launches.",
    },
  },
  {
    eyebrow: "04",
    title: {
      no: "Aftermovie",
      en: "Aftermovie",
    },
    summary: {
      no: "Dekning og uttak som gir arrangementet lengre levetid.",
      en: "Coverage and cutdowns that extend the value of the event.",
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
    no: "Et Oslo-basert produksjonsselskap for reklamefilm, bedriftsfilm, SoMe og event.",
    en: "An Oslo-based production company for commercials, company films, social content and events.",
  },
  stats: [
    { value: "2", label: { no: "seniorer", en: "seniors" } },
    { value: "Oslo", label: { no: "base", en: "base" } },
  ],
} satisfies {
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  stats: MetricItem[];
};

export const serviceAreas: ServiceArea[] = [
  {
    slug: "reklamefilm",
    title: { no: "Reklamefilm", en: "Commercial film" },
    summary: {
      no: "Kampanjefilm og annonseuttak til nettside, annonser og sosiale medier.",
      en: "Campaign films and ad cutdowns for websites, paid media and social channels.",
    },
    eyebrow: { no: "Kampanjer og lanseringer", en: "Campaigns and launches" },
    value: {
      no: "Få flere kunder fra samme markedsbudsjett.",
      en: "Get more customers from the same marketing budget.",
    },
    budget: {
      no: "Typisk 30 000-150 000 kr+",
      en: "Typically NOK 30,000-150,000+",
    },
    timeline: {
      no: "Vanligvis 2-5 uker",
      en: "Usually 2-5 weeks",
    },
    deliverables: [
      { no: "Hovedfilm", en: "Hero film" },
      { no: "Annonseuttak", en: "Ad cutdowns" },
      { no: "Versjoner til nettside og SoMe", en: "Website and social versions" },
    ],
    ctaLabel: { no: "Få et konkret forslag", en: "Get a concrete recommendation" },
    href: "/kontakt",
    exampleHref: "/case/treningshuset",
    exampleLabel: { no: "Se resultat", en: "See results" },
  },
  {
    slug: "bedriftsfilm-intervjuer",
    title: { no: "Bedriftsfilm og intervjuer", en: "Company film and interviews" },
    summary: {
      no: "Bedriftsfilm og intervjuer som bygger tillit og støtter salg.",
      en: "Company films and interviews that build trust and support sales.",
    },
    eyebrow: { no: "Tillit og tydelighet", en: "Trust and clarity" },
    value: {
      no: "Gjør det enklere for kunder å velge dere.",
      en: "Make it easier for customers to choose you.",
    },
    budget: {
      no: "Typisk 20 000-90 000 kr",
      en: "Typically NOK 20,000-90,000",
    },
    timeline: {
      no: "Vanligvis 1-3 uker",
      en: "Usually 1-3 weeks",
    },
    deliverables: [
      { no: "Profilfilm", en: "Brand / company film" },
      { no: "Intervjuklipp", en: "Interview edits" },
      { no: "Salg- og nettsideversjoner", en: "Sales and website versions" },
    ],
    ctaLabel: { no: "Få et konkret forslag", en: "Get a concrete recommendation" },
    href: "/kontakt",
    exampleHref: "/case/foreningen-norden",
    exampleLabel: { no: "Se hva dette gir i praksis", en: "See what this looks like in practice" },
  },
  {
    slug: "some-innhold",
    title: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
    summary: {
      no: "Korte videoer og uttak for kanalene dere faktisk bruker.",
      en: "Short videos and cutdowns for the channels you actually use.",
    },
    eyebrow: { no: "Publisering over tid", en: "Ongoing publishing" },
    value: {
      no: "Hold dere synlige og relevante hele året.",
      en: "Stay visible and relevant all year round.",
    },
    budget: {
      no: "Typisk 5 000-35 000 kr",
      en: "Typically NOK 5,000-35,000",
    },
    timeline: {
      no: "Vanligvis 3-10 dager",
      en: "Usually 3-10 days",
    },
    deliverables: [
      { no: "Reels og short-form", en: "Reels and short-form edits" },
      { no: "Flere formater per opptak", en: "Multiple formats per shoot" },
      { no: "Korte kampanjeuttak", en: "Short campaign cutdowns" },
    ],
    ctaLabel: { no: "Få et konkret forslag", en: "Get a concrete recommendation" },
    href: "/kontakt",
    exampleHref: "/case/treningshuset",
    exampleLabel: { no: "Se resultat", en: "See results" },
  },
  {
    slug: "event-live",
    title: { no: "Aftermovie", en: "Aftermovie" },
    summary: {
      no: "Aftermovies, reels og intervjuer med gjenbruk i fokus.",
      en: "Aftermovies, reels and interviews built for reuse.",
    },
    eyebrow: { no: "Arrangement og etterbruk", en: "Events and reuse" },
    value: {
      no: "Få mer verdi ut av hvert arrangement.",
      en: "Get more value from every event.",
    },
    budget: {
      no: "Typisk 15 000-60 000 kr+",
      en: "Typically NOK 15,000-60,000+",
    },
    timeline: {
      no: "Fra samme dag til 2 uker",
      en: "From same-day to 2 weeks",
    },
    deliverables: [
      { no: "Aftermovie / stemningsfilm", en: "Aftermovie / mood film" },
      { no: "Reels og korte uttak", en: "Reels and short cutdowns" },
      { no: "Flerkameraopptak", en: "Multicam capture" },
    ],
    ctaLabel: { no: "Få et konkret forslag", en: "Get a concrete recommendation" },
    href: "/kontakt",
    exampleHref: "/case/nei-til-atomvapen-arbeiderdagen",
    exampleLabel: { no: "Se hva dette gir i praksis", en: "See what this looks like in practice" },
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: {
      no: "De er trollmenn – fremragende på alle måter. Høy profesjonalitet og kvalitet gjennom hele prosessen.",
      en: "They are magicians, outstanding in every way. High professionalism and quality throughout the entire process.",
    },
    name: "Mattis Thørud",
    company: "Ville Gleder",
  },
  {
    quote: {
      no: "Fau&Land Film leverte langt over forventningene våre. Profesjonelle, kreative og engasjerte – de fanget essensen av budskapet vårt på en måte som virkelig traff.",
      en: "Fau&Land Film delivered far beyond our expectations. Professional, creative and committed, they captured the essence of our message in a way that truly landed.",
    },
    name: "Alexander Hellenes",
    company: "Vikingmaxtrading",
  },
  {
    quote: {
      no: "Vi opplever Fau&Land Film som profesjonelle, dyktige og imøtekommende. Oppfølgingen fra teamet skjer på en måte som føles nær og lavterskel.",
      en: "We experience Fau&Land Film as professional, highly skilled and approachable. The follow-up from the team feels close and easy throughout the process.",
    },
    name: "Gunnar Johnsen",
    company: "Nei til Atomvåpen",
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
    title: { no: "Aftermovie", en: "Aftermovie" },
    range: { no: "Fra 15 000-60 000 kr+", en: "From NOK 15,000-60,000+" },
    detail: {
      no: "Typisk for konferanser, høydepunktfilmer, intervjuer og dokumentasjon.",
      en: "Typical for conferences, highlight films, interviews and event documentation.",
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

export const caseStudies: CaseStudy[] = [
  {
    slug: "nei-til-atomvapen",
    client: "Nei til Atomvåpen",
    title: {
      no: "Vervekampanje for Nei til Atomvåpen",
      en: "Membership campaign for Nei til Atomvåpen",
    },
    category: { no: "Kampanjefilm", en: "Campaign film" },
    industry: { no: "Organisasjon", en: "Organisation" },
    summary: {
      no: "En dokumentarisk informasjonsfilm bygget som del av en større vervekampanje for Nei til Atomvåpen.",
      en: "A documentary-style information film built as part of a wider membership campaign for Nei til Atomvåpen.",
    },
    goal: {
      no: "De trengte en film som gjorde saken tydelig, skapte nærhet og senket terskelen for å bli med.",
      en: "They needed a film that made the cause clear, created closeness and lowered the barrier to getting involved.",
    },
    solution: {
      no: "Vi intervjuet medlemmer, bygget filmen i dokumentarisk stil og brukte arkivmateriale fra tidligere produksjoner for å styrke budskapet.",
      en: "We interviewed members, built the film in a documentary style and reused archive footage from earlier productions to strengthen the message.",
    },
    deliverables: [
      { no: "Informasjonsfilm til nettside", en: "Information film for the website" },
      { no: "Versjoner til sosiale medier", en: "Versions for social media" },
      { no: "Gjenbruk av arkivmateriale", en: "Reuse of archive footage" },
    ],
    impact: {
      no: "Ga organisasjonen en tydelig hovedfilm til nettside, sosiale medier og videre medlemsarbeid som del av et lengre samarbeid over flere produksjoner.",
      en: "Gave the organisation a clear hero film for the website, social channels and ongoing outreach as part of a longer collaboration across several productions.",
    },
    metrics: [
      { value: "3", label: { no: "produksjoner", en: "productions" } },
      { value: "Nettside + SoMe", label: { no: "kanaler", en: "channels" } },
      { value: "Dokumentarisk", label: { no: "uttrykk", en: "tone" } },
    ],
    tags: [
      { no: "Kampanjefilm", en: "Campaign film" },
      { no: "Organisasjon", en: "Organisation" },
      { no: "Vervekampanje", en: "Membership campaign" },
    ],
    externalVideo: youtubeAsset("R-hb11Atssc", {
      no: "Bli med i kampen mot atomvåpen",
      en: "Join the fight against nuclear weapons",
    }),
    palette: "from-[#f1e6db] via-[#d7c5b2] to-[#bb9e84]",
    featured: true,
  },
  {
    slug: "ville-gleder",
    client: "Ville Gleder",
    title: {
      no: "Promofilmer for Ville Gleders foredrag",
      en: "Promo films for Ville Gleders talks",
    },
    category: { no: "Promofilm", en: "Promo film" },
    industry: { no: "Foredrag og opplevelser", en: "Talks and experiences" },
    summary: {
      no: "To promofilmer som skulle bygge interesse rundt foredragene til Mattis Thørud og Jan Monsen.",
      en: "Two promo films designed to build interest around the talks by Mattis Thørud and Jan Monsen.",
    },
    goal: {
      no: "De trengte filmer som gjorde foredragene enklere å promotere og lettere å velge for arrangører og publikum.",
      en: "They needed films that made the talks easier to promote and easier to choose for organisers and audiences.",
    },
    solution: {
      no: "Vi filmet Mattis og Jan i deres naturlige miljø, kombinerte nytt materiale med arkivopptak og laget to filmer for ulike foredrag.",
      en: "We filmed Mattis and Jan in their natural environment, combined new material with archive footage and created two films for different talks.",
    },
    deliverables: [
      { no: "To promofilmer", en: "Two promo films" },
      { no: "Versjoner til Talerlisten og sosiale medier", en: "Versions for Talerlisten and social media" },
      { no: "Nytt opptak og arkivmateriale", en: "New footage and archive material" },
    ],
    impact: {
      no: "Filmene har gitt vel over 60 000 visninger og flere påmeldinger til foredragene.",
      en: "The films have delivered well over 60,000 views and more sign-ups for the talks.",
    },
    metrics: [
      { value: "60 000+", label: { no: "visninger", en: "views" } },
      { value: "2", label: { no: "filmer", en: "films" } },
      { value: "Flere", label: { no: "påmeldinger", en: "sign-ups" } },
    ],
    tags: [
      { no: "Promofilm", en: "Promo film" },
      { no: "Foredrag", en: "Talks" },
      { no: "Sosiale medier", en: "Social media" },
    ],
    image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
    imageAlt: {
      no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
      en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
      label: {
        no: "Ville Gleder - Villmarksforedrag",
        en: "Ville Gleder - wilderness talks",
      },
    },
    videoVariants: [
      {
        slug: "villmarksforedrag",
        label: {
          no: "Villmarksforedrag",
          en: "Wilderness talks",
        },
        image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
        imageAlt: {
          no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
          en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
        },
        video: {
          videoType: "direct",
          src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
          poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
          label: {
            no: "Ville Gleder - Villmarksforedrag",
            en: "Ville Gleder - wilderness talks",
          },
        },
      },
      {
        slug: "vat-kald-sulten",
        label: {
          no: "Våt, kald & sulten",
          en: "Wet, cold and hungry",
        },
        image: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.jpg",
        imageAlt: {
          no: "Jan Monsen og Mattis Thørud i promofilm for Våt, kald & sulten",
          en: "Jan Monsen and Mattis Thorud in the Wet, cold and hungry promo film",
        },
        video: {
          videoType: "direct",
          src: "/assets/portfolio/ville-gleder/videos/ville-gleder-vat-kald-sulten-web.mp4",
          poster: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.jpg",
          label: {
            no: "Ville Gleder - Våt, kald og sulten",
            en: "Ville Gleder - wet, cold and hungry",
          },
        },
      },
    ],
    palette: "from-[#efe6da] via-[#d3c3ae] to-[#bda383]",
  },
  {
    slug: "foreningen-norden",
    client: "Foreningen Norden",
    title: {
      no: "Nettsideinnhold for Foreningen Norden",
      en: "Website content for Foreningen Norden",
    },
    category: { no: "Nettsideinnhold", en: "Website content" },
    industry: { no: "Organisasjon", en: "Organisation" },
    summary: {
      no: "En film som viser Foreningen Norden og arbeidet de gjør. Klippene består av tidligere videoer vi har produsert for dem, samt ekstra materiale de har laget selv. Vi har også stått for animasjonene.",
      en: "A film that presents Foreningen Norden and the work they do. The edit combines earlier videos we produced for them with additional material they created themselves, and we also delivered the animations.",
    },
    goal: {
      no: "De trengte et tydelig introduksjonsinnhold som raskt forklarte hvem de er og hva de jobber for.",
      en: "They needed a clear introduction that quickly explained who they are and what they work for.",
    },
    solution: {
      no: "Vi klippet sammen tidligere produksjoner, supplerte med materiale kunden hadde laget selv og bygget animasjoner som bandt filmen sammen.",
      en: "We edited together earlier productions, added material the client had captured themselves and created animations that tied the film together.",
    },
    deliverables: [
      { no: "Nettsidefilm", en: "Website film" },
      { no: "Animasjoner", en: "Animations" },
      { no: "Redigering av eksisterende og nytt materiale", en: "Editing of existing and new material" },
    ],
    impact: {
      no: "Ga organisasjonen en samlet film som gjør arbeidet deres lettere å forstå på kort tid.",
      en: "Gave the organisation a single film that makes their work easier to understand in a short amount of time.",
    },
    metrics: [
      { value: "59 sek", label: { no: "film", en: "film" } },
      { value: "Nettside", label: { no: "bruk", en: "use" } },
      { value: "Animasjon", label: { no: "leveranse", en: "delivery" } },
      { value: "Samlet", label: { no: "uttrykk", en: "expression" } },
    ],
    tags: [
      { no: "Nettside", en: "Website" },
      { no: "Organisasjon", en: "Organisation" },
      { no: "Animasjon", en: "Animation" },
    ],
    video: {
      videoType: "direct",
      src: "/assets/portfolio/foreningen-norden/videos/foreningen-norden-nettsideinnhold.mp4",
      poster: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
      label: {
        no: "Foreningen Norden - nettsideinnhold",
        en: "Foreningen Norden website content",
      },
    },
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
  },
  {
    slug: "treningshuset",
    client: "Treningshuset",
    title: {
      no: "Treningshuset",
      en: "Treningshuset",
    },
    category: {
      no: "Annonsefilm og sosiale medier",
      en: "Ad films and social media",
    },
    industry: {
      no: "Treningssenter",
      en: "Fitness centre",
    },
    summary: {
      no: "Filmproduksjon for annonser og sosiale medier, bygget for å få flere til å melde seg inn hos Treningshuset.",
      en: "Film production for ads and social media, built to turn attention into more memberships for Treningshuset.",
    },
    goal: {
      no: "Treningshuset trengte flere tydelige portrettfilmer som kunne brukes direkte i annonser og sosiale medier uten ekstra tilpasning.",
      en: "Treningshuset needed multiple clear portrait-led films that could be used directly in ads and social placements without extra adaptation.",
    },
    solution: {
      no: "Vi bygget en portrettbasert serie med tre tydelige uttak som holder tempoet oppe i feeden og fungerer direkte i mobilannonser og sosiale formater.",
      en: "We built a portrait-led set of three focused cutdowns that keep the pace up in-feed and work directly across mobile ads and social formats.",
    },
    deliverables: [
      { no: "3 portrettfilmer for annonser og sosiale medier", en: "3 portrait films for ads and social media" },
      { no: "9:16 og 4:5 uttak til mobilflater", en: "9:16 and 4:5 cutdowns for mobile placements" },
      { no: "Budskap tilpasset ulike kampanjevinkler", en: "Messaging adapted to different campaign angles" },
    ],
    impact: {
      no: "Ga Treningshuset tre tydelige annonsefilmer som kan brukes direkte i mobilflater for å drive flere innmeldinger.",
      en: "Gave Treningshuset three clear ad films that can be used directly in mobile placements to drive more memberships.",
    },
    metrics: [
      { value: "3", label: { no: "filmer", en: "films" } },
      { value: "2", label: { no: "portrettformater", en: "portrait formats" } },
      { value: "Annonser + SoMe", label: { no: "bruk", en: "use" } },
    ],
    tags: [
      { no: "Annonsefilm", en: "Ad film" },
      { no: "Sosiale medier", en: "Social media" },
      { no: "Medlemsvekst", en: "Membership growth" },
    ],
    image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
    imageAlt: {
      no: "Still fra Treningshuset-kampanje i portrettformat",
      en: "Still from the Treningshuset campaign in portrait format",
    },
    mediaFit: "contain",
    video: {
      videoType: "direct",
      src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
      poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
      label: {
        no: "Treningshuset - Musikk 2",
        en: "Treningshuset - Music 2",
      },
    },
    videoVariants: [
      {
        slug: "velkommen-sindre",
        label: {
          no: "Velkommen Sindre",
          en: "Welcome Sindre",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-velkommen-sindre-poster.png",
        imageAlt: {
          no: "Portrettfilm for Treningshuset med Velkommen Sindre",
          en: "Portrait film for Treningshuset with Welcome Sindre",
        },
        mediaFit: "cover",
        frame: "portrait",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-velkommen-sindre-web.mp4",
          fullSrc: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-velkommen-sindre-full.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-velkommen-sindre-poster.png",
          label: {
            no: "Treningshuset - Velkommen Sindre",
            en: "Treningshuset - Welcome Sindre",
          },
        },
      },
      {
        slug: "musikk-1",
        label: {
          no: "Musikk 1",
          en: "Music 1",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-1-poster.png",
        imageAlt: {
          no: "Portrettfilm for Treningshuset med Musikk 1",
          en: "Portrait film for Treningshuset with Music 1",
        },
        mediaFit: "cover",
        frame: "portrait",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-1-web.mp4",
          fullSrc: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-1-full.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-1-poster.png",
          label: {
            no: "Treningshuset - Musikk 1",
            en: "Treningshuset - Music 1",
          },
        },
      },
      {
        slug: "musikk-2-45",
        label: {
          no: "Musikk 2",
          en: "Music 2",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
        imageAlt: {
          no: "4:5-film for Treningshuset med Musikk 2",
          en: "4:5 film for Treningshuset with Music 2",
        },
        mediaFit: "cover",
        frame: "portrait4x5",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
          fullSrc: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-full.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
          label: {
            no: "Treningshuset - Musikk 2",
            en: "Treningshuset - Music 2",
          },
        },
      },
    ],
    palette: "from-[#15171c] via-[#2d3746] to-[#647c9b]",
  },
  {
    slug: "nei-til-atomvapen-konferanse",
    client: "Nei til Atomvåpen",
    title: {
      no: "Konferansefilm for medlemskampanje",
      en: "Conference film for a membership campaign",
    },
    category: { no: "Aftermovie", en: "Aftermovie" },
    industry: { no: "Organisasjon", en: "Organisation" },
    summary: {
      no: "En stemningsfilm fra medlemskonferansen til Nei til Atomvåpen, produsert som del av den løpende rekrutteringskampanjen.",
      en: "A mood film from Nei til Atomvåpen's membership conference, produced as part of the ongoing recruitment campaign.",
    },
    goal: {
      no: "De trengte en film som viste engasjementet i organisasjonen og ga medlemmer og nye støttespillere innblikk i miljøet.",
      en: "They needed a film that showed the engagement inside the organisation and gave members and new supporters a clearer sense of the community.",
    },
    solution: {
      no: "Vi dekket konferansen og klippet en stemningsfilm som kunne brukes både som dokumentasjon og i videre medlemsarbeid.",
      en: "We covered the conference and edited a mood film that could work both as documentation and in future outreach.",
    },
    deliverables: [
      { no: "Stemningsfilm", en: "Mood film" },
      { no: "Innhold til vervekampanje", en: "Content for the membership campaign" },
      { no: "Dokumentasjon fra konferansen", en: "Documentation from the conference" },
    ],
    impact: {
      no: "Ga organisasjonen en film som viser både budskapet og fellesskapet, og som styrker den videre kampanjen.",
      en: "Gave the organisation a film that shows both the message and the community, strengthening the campaign that followed.",
    },
    metrics: [
      { value: "2025", label: { no: "konferanse", en: "conference" } },
      { value: "Stemningsfilm", label: { no: "format", en: "format" } },
      { value: "Vervekampanje", label: { no: "bruk", en: "use" } },
    ],
    tags: [
      { no: "Aftermovie", en: "Aftermovie" },
      { no: "Organisasjon", en: "Organisation" },
      { no: "Medlemsarbeid", en: "Membership outreach" },
    ],
    externalVideo: youtubeAsset("N4b3Co-hgLE", {
      no: "Nei til Atomvåpens medlemskonferanse 2025",
      en: "Nei til Atomvåpen membership conference 2025",
    }),
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
  {
    slug: "nei-til-atomvapen-arbeiderdagen",
    client: "Nei til Atomvåpen",
    title: {
      no: "1. mai-dekning fra Youngstorget",
      en: "1 May coverage from Youngstorget",
    },
    category: { no: "Aftermovie og SoMe", en: "Aftermovie and social content" },
    industry: { no: "Organisasjon", en: "Organisation" },
    summary: {
      no: "Film, foto og vertikale uttak fra Nei til Atomvåpens markering på Youngstorget.",
      en: "Film, stills and vertical cutdowns from Nei til Atomvåpen's 1 May event at Youngstorget.",
    },
    goal: {
      no: "De trengte både dokumentasjon fra dagen og raskt innhold som kunne brukes videre i egne kanaler.",
      en: "They needed both documentation from the day and fast content that could keep working in their own channels.",
    },
    solution: {
      no: "Vi filmet arrangementet, leverte stemningsfilm og fullt opptak av Miranda Aalands tale, og klippet flere vertikale versjoner til sosiale medier.",
      en: "We covered the event, delivered a mood film and a full recording of Miranda Aaland's speech, and edited several vertical versions for social media.",
    },
    deliverables: [
      { no: "Stemningsfilm", en: "Mood film" },
      { no: "Fullt opptak av talen", en: "Full recording of the speech" },
      { no: "Reels og stillbilder", en: "Reels and stills" },
    ],
    impact: {
      no: "Ga organisasjonen materiale som kunne publiseres raskt og leve videre etter arrangementet.",
      en: "Gave the organisation material that could be published quickly and keep working after the event itself.",
    },
    metrics: [
      { value: "Youngstorget", label: { no: "lokasjon", en: "location" } },
      { value: "Video + foto", label: { no: "leveranse", en: "delivery" } },
      { value: "Reels", label: { no: "uttak", en: "cutdowns" } },
    ],
    tags: [
      { no: "Aftermovie", en: "Aftermovie" },
      { no: "Sosiale medier", en: "Social media" },
      { no: "Stillbilder", en: "Stills" },
    ],
    externalVideo: youtubeAsset("STycvvvjsWY", {
      no: "Stemningsfilm fra 1. mai 2025",
      en: "Mood film from 1 May 2025",
    }),
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
];

export const portfolioGroups: PortfolioGroup[] = [
  {
    slug: "showreel",
    title: {
      no: "Showreel",
      en: "Showreel",
    },
    description: {
      no: "En rask inngang til bredden i porteføljen.",
      en: "A quick way into the breadth of the portfolio.",
    },
  },
  {
    slug: "campaign",
    title: {
      no: "Kampanje og organisasjon",
      en: "Campaign and organisation",
    },
    description: {
      no: "Arbeid der budskap, tydelighet og tillit må sitte raskt.",
      en: "Work where message, clarity and trust need to land quickly.",
    },
  },
  {
    slug: "narrative",
    title: {
      no: "Musikkvideo og fortellende film",
      en: "Music video and narrative film",
    },
    description: {
      no: "Prosjekter der karakter, stemning og fortelling får mer plass enn i ren kampanjeproduksjon.",
      en: "Projects where character, mood and story take more space than in a straight campaign brief.",
    },
  },
  {
    slug: "event",
    title: {
      no: "Event og dokumentasjon",
      en: "Events and documentation",
    },
    description: {
      no: "Produksjoner som dokumenterer arrangementer og skaper innhold som kan leve videre etterpå.",
      en: "Productions that document events and create content that keeps working after the day itself.",
    },
  },
  {
    slug: "documentary",
    title: {
      no: "Dokumentar og kortfilm",
      en: "Documentary and short film",
    },
    description: {
      no: "Prosjekter med tyngre fortelling, lengre format og tydelig filmatisk signatur.",
      en: "Projects with heavier storytelling, longer-form thinking and a more distinct cinematic signature.",
    },
  },
  {
    slug: "commercial",
    title: {
      no: "Eiendom, kurs og kommersielt innhold",
      en: "Property, workshops and commercial content",
    },
    description: {
      no: "Arbeid som hjelper konsepter, tilbud og opplevelser å fremstå tydeligere og mer profesjonelt.",
      en: "Work that helps offers, experiences and concepts appear clearer and more professional.",
    },
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "showreel-2025",
    group: "showreel",
    client: "Fau&Land Film",
    title: {
      no: "Showreel 2025",
      en: "Showreel 2025",
    },
    format: {
      no: "Showreel",
      en: "Showreel",
    },
    summary: {
      no: "Et raskt innblikk i arbeid på tvers av reklamefilm, organisasjon, event, musikkvideo og kortfilm.",
      en: "A quick look at work across commercial film, organisations, events, music video and short film.",
    },
    result: {
      no: "Samler bredden i porteføljen i en kort introduksjon.",
      en: "Brings the breadth of the portfolio together in one short introduction.",
    },
    ctaLabel: openShowreelCta,
    externalVideo: vimeoAsset(
      "1049265590",
      {
        no: "Showreel 2025",
        en: "Showreel 2025",
      },
      "https://i.vimeocdn.com/video/1973576802-81881026755638ae5a47531ced8b76034558c75e44220d4d1cb4876180ce8df2-d_295x166?region=us",
    ),
    palette: "from-[#efe6db] via-[#d8cab9] to-[#c0a98d]",
    featured: true,
  },
  {
    slug: "nei-til-atomvapen",
    group: "campaign",
    client: "Nei til Atomvåpen",
    title: {
      no: "Nei til atomvåpen - bli med i kampen mot atomvåpen",
      en: "No to Nuclear Weapons - join the fight",
    },
    format: {
      no: "Kampanjefilm",
      en: "Campaign film",
    },
    summary: {
      no: "Denne kampanjen skal inspirere flere til å slutte seg til Nei til atomvåpen, gjennom en sterk og dokumentarisk film som gjør alvoret tydelig.",
      en: "A documentary-led campaign film designed to inspire more people to join No to Nuclear Weapons and understand why the issue matters now.",
    },
    result: {
      no: "Brukt som hovedfilm i vervekampanje og videre innhold.",
      en: "Used as the hero film across the recruitment campaign and follow-up content.",
    },
    detailHref: "/case/nei-til-atomvapen",
    ctaLabel: viewCaseCta,
    externalVideo: youtubeAsset("R-hb11Atssc", {
      no: "Bli med i kampen mot atomvåpen",
      en: "Join the fight against nuclear weapons",
    }),
    image: "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.png",
    imageAlt: {
      no: "Still fra kampanjefilm for Nei til Atomvåpen",
      en: "Still from campaign film for No to Nuclear Weapons",
    },
    palette: "from-[#f1e6db] via-[#d7c5b2] to-[#bb9e84]",
  },
  {
    slug: "foreningen-norden-nettsideinnhold",
    group: "campaign",
    client: "Foreningen Norden",
    title: {
      no: "Foreningen Norden - nettsideinnhold",
      en: "Foreningen Norden - website content",
    },
    format: {
      no: "Organisasjonsfilm",
      en: "Organisation film",
    },
    summary: {
      no: "En film som viser Foreningen Norden og arbeidet de gjør. Klippene består av tidligere videoer vi har produsert for dem, samt ekstra materiale de har laget selv. Vi har også stått for animasjonene.",
      en: "A film that introduces Foreningen Norden and the work they do. It combines earlier productions we made for them with extra material they created themselves, and we also handled the animations.",
    },
    result: {
      no: "Tidligere videoer, nytt materiale og animasjon samlet i ett tydelig nettsideformat.",
      en: "Earlier productions, new client material and animation brought together in one clear website format.",
    },
    detailHref: "/case/foreningen-norden",
    ctaLabel: viewCaseCta,
    image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
    imageAlt: {
      no: "Still fra Foreningen Norden - nettsideinnhold",
      en: "Still from Foreningen Norden website content",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/foreningen-norden/videos/foreningen-norden-nettsideinnhold.mp4",
      poster: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
      label: {
        no: "Foreningen Norden - nettsideinnhold",
        en: "Foreningen Norden website content",
      },
    },
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
  },
  {
    slug: "kommer-hjem-musikkvideo",
    group: "narrative",
    client: "Klaus Perry",
    title: {
      no: "Kommer Hjem",
      en: "Kommer Hjem",
    },
    format: {
      no: "Musikkvideo",
      en: "Music video",
    },
    summary: {
      no: "Musikkvideo for Klaus Perry om en hjemreise som enten gikk via månen eller bare via stranden og litt for mye whisky.",
      en: "A music video for Klaus Perry about getting back to the one you love, whether the trip went through the moon or just the beach and too much whisky.",
    },
    result: {
      no: "En fortellende video som skildrer en reise mange kan kjenne seg igjen i.",
      en: "A narrative video that captures a journey many people can recognise.",
    },
    ctaLabel: openFilmCta,
    image: "/assets/portfolio/kommer-hjem/posters/kommer-hjem-poster.png",
    imageAlt: {
      no: "Still fra Kommer Hjem",
      en: "Still from Kommer Hjem",
    },
    externalVideo: youtubeAsset("Y3eowK_YMes", {
      no: "Kommer Hjem",
      en: "Kommer Hjem",
    }),
    palette: "from-[#efe4d8] via-[#d5c5b1] to-[#b99e82]",
  },
  {
    slug: "a-message-from-martha",
    group: "narrative",
    client: "DeBlonde Production x Fau&Land Film",
    year: "2025",
    title: {
      no: "A Message From Martha",
      en: "A Message From Martha",
    },
    format: {
      no: "Dramakortfilm",
      en: "Drama short",
    },
    summary: {
      no: "En drama-kortfilm laget i samarbeid mellom DeBlonde Production og Fau&Land Film.",
      en: "A drama short film produced in collaboration between DeBlonde Production and Fau&Land Film.",
    },
    result: {
      no: "Producer: Tommy Garland. Regi: Elia Biondi. Foto: Justin Bellucci.",
      en: "Producer: Tommy Garland. Director: Elia Biondi. DOP: Justin Bellucci.",
    },
    ctaLabel: openFilmCta,
    image: "/assets/portfolio/a-message-from-martha/posters/a-message-from-martha-poster.jpeg",
    imageAlt: {
      no: "Plakat for A Message From Martha",
      en: "Poster for A Message From Martha",
    },
    mediaFit: "contain",
    externalVideo: youtubeAsset("FiT05lgz00o", {
      no: "A Message From Martha",
      en: "A Message From Martha",
    }),
    palette: "from-[#28171a] via-[#5a232d] to-[#b14f54]",
  },
  {
    slug: "takk-for-at-du-er-min-venn",
    group: "narrative",
    client: "Elleville Elfrid",
    title: {
      no: "Takk for at du er min venn",
      en: "Thank You for Being My Friend",
    },
    format: {
      no: "Musikkvideo",
      en: "Music video",
    },
    summary: {
      no: "En musikkvideo for den animerte filmen Elleville Elfrid, med Bjarte Hjelmeland og klipp fra selve filmen.",
      en: "A music video for the animated film Elleville Elfrid, combining Bjarte Hjelmeland with footage from the feature itself.",
    },
    result: {
      no: "Tilgjengelig via NRK og laget for å forsterke lanseringen av filmen.",
      en: "Also available through NRK and built to support the film release.",
    },
    ctaLabel: openFilmCta,
    externalVideo: youtubeAsset("uj-FGvsRVAU", {
      no: "Takk for at du er min venn",
      en: "Thank You for Being My Friend",
    }),
    palette: "from-[#efe4d8] via-[#d5c2af] to-[#b7947d]",
  },
  {
    slug: "foreningen-norden-debatt",
    group: "event",
    client: "Foreningen Norden",
    title: {
      no: "Foreningen Norden - Debatt",
      en: "Foreningen Norden - debate",
    },
    format: {
      no: "Debattdekning",
      en: "Debate coverage",
    },
    summary: {
      no: "Flerkameraproduksjon med totalbilde, nærbilder, egen lydtekniker og lysrigg for en ryddig og publiseringsklar debattleveranse.",
      en: "A multicam production with wide shot, close-ups, dedicated sound and lighting, delivered ready for publication.",
    },
    result: {
      no: "Tre kameraer, egen lydtekniker og rask teaser til Facebook.",
      en: "Three cameras, dedicated sound and a quick teaser edit for Facebook.",
    },
    ctaLabel: viewReferenceCta,
    externalVideo: youtubeAsset("IDd2LByeYU0", {
      no: "Foreningen Norden - Debatt",
      en: "Foreningen Norden debate",
    }),
    palette: "from-[#ece3d8] via-[#d3c3b1] to-[#b89e83]",
  },
  {
    slug: "nei-til-atomvapen-arbeiderdagen",
    group: "event",
    client: "Nei til Atomvåpen",
    year: "2025",
    title: {
      no: "Nei til atomvåpen - Internasjonal arbeiderdag",
      en: "No to Nuclear Weapons - International Workers' Day",
    },
    format: {
      no: "Aftermovie og reels",
      en: "Aftermovie and reels",
    },
    summary: {
      no: "Vi filmet og fotograferte markeringen på Youngstorget og leverte stemningsfilm, fullt opptak av tale og flere reels til sosiale medier.",
      en: "We filmed and photographed the event at Youngstorget and delivered a mood film, a full speech recording and multiple social cutdowns.",
    },
    result: {
      no: "Stemningsfilm, fullt taleopptak og vertikale uttak fra samme dag.",
      en: "Mood film, full speech capture and vertical cutdowns from the same day.",
    },
    detailHref: "/case/nei-til-atomvapen-arbeiderdagen",
    ctaLabel: viewCaseCta,
    image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-poster.png",
    imageAlt: {
      no: "Still fra Internasjonal arbeiderdag for Nei til Atomvåpen",
      en: "Still from International Workers' Day for No to Nuclear Weapons",
    },
    externalVideo: youtubeAsset("STycvvvjsWY", {
      no: "Stemningsfilm fra 1. mai",
      en: "Mood film from 1 May",
    }),
    palette: "from-[#efe5d8] via-[#d6c5b3] to-[#bb9e82]",
  },
  {
    slug: "nei-til-atomvapen-konferanse",
    group: "event",
    client: "Nei til Atomvåpen",
    title: {
      no: "Nei til atomvåpen - Konferanse",
      en: "No to Nuclear Weapons - conference",
    },
    format: {
      no: "Aftermovie",
      en: "Aftermovie",
    },
    summary: {
      no: "Stemningsfilm produsert fra konferansen som en del av organisasjonens løpende rekrutteringskampanje.",
      en: "A mood film produced from the conference as part of the organisation's ongoing recruitment campaign.",
    },
    result: {
      no: "Brukt som en del av videre vervearbeid og synlighet.",
      en: "Used as part of ongoing recruitment and awareness work.",
    },
    detailHref: "/case/nei-til-atomvapen-konferanse",
    ctaLabel: viewCaseCta,
    externalVideo: youtubeAsset("N4b3Co-hgLE", {
      no: "Nei til atomvåpen - konferanse",
      en: "No to Nuclear Weapons conference",
    }),
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
  {
    slug: "sprakprisen-2022-aftermovie",
    group: "event",
    client: "Foreningen Norden",
    year: "2022",
    title: {
      no: "Språkprisen 2022 - Aftermovie",
      en: "Language Prize 2022 - Aftermovie",
    },
    format: {
      no: "Aftermovie",
      en: "Aftermovie",
    },
    summary: {
      no: "Dokumentasjon fra Språkprisen 2022, der Dronning Margrethe II av Danmark mottok prisen.",
      en: "Event coverage from the 2022 Language Prize, where Queen Margrethe II of Denmark received the award.",
    },
    result: {
      no: "Levert som 1,5 time lang aftermovie.",
      en: "Delivered as a 1.5-hour aftermovie.",
    },
    ctaLabel: viewReferenceCta,
    image:
      "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/cfb30bea-aadb-4fb3-a3f7-b6fa41b60ac4/Skjermbilde+2024-12-17+kl.+14.22.29.png",
    imageAlt: {
      no: "Stillbilde fra Språkprisen 2022",
      en: "Still from the 2022 Language Prize",
    },
    palette: "from-[#ebe4d8] via-[#d1c2af] to-[#b69d82]",
  },
  {
    slug: "eventfotografering-kinesiske-ambassaden",
    group: "event",
    client: "Den kinesiske ambassaden",
    title: {
      no: "Eventfotografering - Kinesiske ambassaden",
      en: "Event photography - Chinese Embassy",
    },
    format: {
      no: "Eventfoto",
      en: "Event photography",
    },
    summary: {
      no: "Vi leverte eventfotografering for den kinesiske ambassaden i forbindelse med feiringen av kinesisk nyttår.",
      en: "We delivered event photography for the Chinese Embassy during its Chinese New Year celebration.",
    },
    result: {
      no: "Dokumentasjon laget for rask bruk etter arrangementet.",
      en: "Event coverage delivered for immediate post-event use.",
    },
    ctaLabel: viewReferenceCta,
    image:
      "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/f44b2423-9b05-4a7e-8754-7f67197d00cc/B0020011-2_enhanced+%281%29.jpg",
    imageAlt: {
      no: "Eventfoto fra kinesisk nyttår",
      en: "Event still from Chinese New Year celebration",
    },
    palette: "from-[#1b1413] via-[#49312e] to-[#a05c47]",
  },
  {
    slug: "en-midnatts-vuggesang",
    group: "documentary",
    client: "Snowfall Cinema x Fau&Land Film",
    year: "2023",
    title: {
      no: "En Midnatts Vuggesang",
      en: "En Midnatts Vuggesang",
    },
    format: {
      no: "Dramakortfilm",
      en: "Drama short",
    },
    summary: {
      no: "Drama om Li-hua, en alenemor i Oslo som kjemper for å få endene til å møtes.",
      en: "A drama about Li-hua, a single mother in Oslo fighting to make ends meet.",
    },
    result: {
      no: "Samprodusert med Snowfall Cinema og nominert under Kortfilmfestivalen i Grimstad.",
      en: "Co-produced with Snowfall Cinema and nominated at the Norwegian Short Film Festival in Grimstad.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.jpg",
    imageAlt: {
      no: "Still fra En Midnatts Vuggesang",
      en: "Still from En Midnatts Vuggesang",
    },
    palette: "from-[#181518] via-[#4a3644] to-[#8f6e88]",
  },
  {
    slug: "the-voice-within",
    group: "documentary",
    client: "NTNU BA-film",
    year: "2022",
    title: {
      no: "The Voice Within",
      en: "The Voice Within",
    },
    format: {
      no: "Kortfilm",
      en: "Short film",
    },
    summary: {
      no: "Daniel er hjemsøkt av stemmen i sitt eget hode, som står i veien for romansen med Mari.",
      en: "Daniel is haunted by the voice in his own head, which stands in the way of his romance with Mari.",
    },
    result: {
      no: "Den eneste ferdigstilte filmen i klassen under COVID og mottok Honourable Mention i 2022.",
      en: "The only finished film in its class under COVID restrictions and it received an Honourable Mention in 2022.",
    },
    ctaLabel: openFilmCta,
    externalVideo: youtubeAsset(
      "F_ZGHBwp73o",
      {
        no: "The Voice Within",
        en: "The Voice Within",
      },
      "&start=10",
    ),
    palette: "from-[#211a1f] via-[#4b3645] to-[#8a6478]",
  },
  {
    slug: "huldredans",
    group: "documentary",
    client: "Huldredans",
    year: "2023",
    title: {
      no: "Huldredans",
      en: "Huldredans",
    },
    format: {
      no: "Kortfilm",
      en: "Short film",
    },
    summary: {
      no: "En kortfilm som blander mystikk og drama gjennom historien om Magne og en huldra i et vinterlig norsk landskap.",
      en: "A short film blending mystery and drama through the story of Magne and a huldra in the Norwegian winter landscape.",
    },
    result: {
      no: "Har vunnet priser for blant annet film, regi, skuespiller, foto og originalmusikk.",
      en: "Has won multiple awards for film, directing, acting, cinematography and original score.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/portfolio/huldredans/posters/huldredans-poster.jpg",
    imageAlt: {
      no: "Plakat for Huldredans",
      en: "Poster for Huldredans",
    },
    mediaFit: "contain",
    palette: "from-[#171516] via-[#31423a] to-[#6b8b78]",
  },
  {
    slug: "the-giant-artist",
    group: "documentary",
    client: "The Giant Artist",
    title: {
      no: "The Giant Artist",
      en: "The Giant Artist",
    },
    format: {
      no: "Dokumentar",
      en: "Documentary",
    },
    summary: {
      no: "En dokumentar om Martin, en fremadstormende maler som prøver å finne sin plass i verden.",
      en: "A documentary about Martin, an emerging painter trying to find his place in the world.",
    },
    result: {
      no: "Vist på Minimalen, Nordic Docs og Den norske dokumentarfilmfestivalen.",
      en: "Screened at Minimalen, Nordic Docs and the Norwegian Documentary Film Festival.",
    },
    ctaLabel: openFilmCta,
    externalVideo: youtubeAsset("5S82ZGEBzgk", {
      no: "The Giant Artist",
      en: "The Giant Artist",
    }),
    palette: "from-[#19181a] via-[#44505a] to-[#8ca0af]",
  },
  {
    slug: "treningshuset",
    group: "commercial",
    client: "Treningshuset",
    title: {
      no: "Treningshuset",
      en: "Treningshuset",
    },
    format: {
      no: "Filmer for annonser og sosiale medier",
      en: "Films for ads and social media",
    },
    summary: {
      no: "Tre portrettfilmer bygget for annonser og sosiale medier, med tydelige kampanjevinkler som gjør innholdet raskt å bruke i mobilflater.",
      en: "Three portrait films built for ads and social media, with clear campaign angles that are easy to deploy across mobile placements.",
    },
    result: {
      no: "Et ryddig sett med 9:16- og 4:5-filmer som er klare for mobilannonser og sosiale medier uten ekstra reformattering.",
      en: "A clean set of 9:16 and 4:5 films ready for mobile ads and social media without extra reformatting.",
    },
    detailHref: "/case/treningshuset",
    ctaLabel: viewCaseCta,
    mediaFit: "contain",
    image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
    imageAlt: {
      no: "Still fra Treningshuset-portrettfilm",
      en: "Still from the Treningshuset portrait film",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
      poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.png",
      label: {
        no: "Treningshuset - Musikk 2",
        en: "Treningshuset - Music 2",
      },
    },
    palette: "from-[#15171c] via-[#2d3746] to-[#647c9b]",
  },
  {
    slug: "ville-gleder-villmarksforedrag",
    group: "commercial",
    client: "Ville Gleder",
    title: {
      no: "Ville Gleder - Villmarksforedrag",
      en: "Ville Gleder - wilderness talks",
    },
    format: {
      no: "Promofilm",
      en: "Promo film",
    },
    summary: {
      no: "En promofilm for Ville Gleder og deres villmarksforedrag med Mattis Thørud og Jan Monsen, laget for å inspirere flere ut i naturen.",
      en: "A promo film for Ville Gleder and their wilderness talks with Mattis Thørud and Jan Monsen, built to inspire more time outdoors.",
    },
    result: {
      no: "Skal gjøre foredraget enklere å selge inn og lettere å huske.",
      en: "Designed to make the talk easier to sell and easier to remember.",
    },
    detailHref: "/case/ville-gleder",
    ctaLabel: viewCaseCta,
    image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
    imageAlt: {
      no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
      en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
      label: {
        no: "Ville Gleder - Villmarksforedrag",
        en: "Ville Gleder wilderness talks",
      },
    },
    palette: "from-[#efe6da] via-[#d3c3ae] to-[#bda383]",
  },
  {
    slug: "ville-gleder-vat-kald-sulten",
    group: "commercial",
    client: "Ville Gleder",
    title: {
      no: "Ville Gleder - Våt, kald og sulten",
      en: "Ville Gleder - wet, cold and hungry",
    },
    format: {
      no: "Promofilm",
      en: "Promo film",
    },
    summary: {
      no: "En promovideo for Ville Gleders foredrag «Våt, kald og sulten», som sammenligner en vanlig arbeidshverdag med ekstreme forhold i villmarken.",
      en: "A promo video for Ville Gleder's talk “Wet, cold and hungry”, comparing everyday working life with extreme conditions in the wilderness.",
    },
    result: {
      no: "Bygget for å gjøre konseptet tydelig og enklere å booke.",
      en: "Built to clarify the concept and make the talk easier to book.",
    },
    detailHref: "/case/ville-gleder",
    ctaLabel: viewCaseCta,
    image: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.jpg",
    imageAlt: {
      no: "Jan Monsen og Mattis Thørud i promofilm for Våt, kald & sulten",
      en: "Jan Monsen and Mattis Thorud in the Wet, cold and hungry promo film",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-vat-kald-sulten-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.jpg",
      label: {
        no: "Ville Gleder - Våt, kald og sulten",
        en: "Ville Gleder - Wet, cold and hungry",
      },
    },
    palette: "from-[#ede3d6] via-[#d4c3b0] to-[#baa184]",
  },
  {
    slug: "liten-bedrift",
    group: "commercial",
    client: "Fau&Land Film",
    title: {
      no: "In-house promo: Liten bedrift",
      en: "In-house promo: Small business",
    },
    format: {
      no: "SoMe-reklame",
      en: "Social ad",
    },
    summary: {
      no: "En kort og leken reklamefilm fra Fau&Land, laget rett på sak for sosiale medier.",
      en: "A short and playful ad from Fau&Land, built to get straight to the point on social media.",
    },
    result: {
      no: "Et in-house eksempel på hvordan vi liker kommersielle budskap levert: tydelig, raskt og enkelt.",
      en: "An in-house example of how we like commercial messages delivered: clear, quick and simple.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/portfolio/inhouse/posters/liten-bedrift-poster.png",
    imageAlt: {
      no: "Still fra in-house promoen Liten bedrift",
      en: "Still from the in-house promo Small business",
    },
    video: {
      videoType: "request",
      poster: "/assets/portfolio/inhouse/posters/liten-bedrift-poster.png",
      label: {
        no: "In-house promo: Liten bedrift",
        en: "In-house promo: Small business",
      },
      availabilityNote: {
        no: "Video er tilgjengelig på forespørsel.",
        en: "Video is available on request.",
      },
    },
    palette: "from-[#1d181a] via-[#5a232d] to-[#b14f54]",
  },
  {
    slug: "steins-hytte",
    group: "commercial",
    client: "Stein's hytte",
    title: {
      no: "Stein's hytte",
      en: "Stein's cabin",
    },
    format: {
      no: "Eiendomsfilm og foto",
      en: "Property film and photography",
    },
    summary: {
      no: "Film og foto til eiendomspresentasjon, laget for å gi boligen et tydeligere og mer profesjonelt uttrykk i salgsprosessen.",
      en: "Film and photography for a property presentation, created to give the listing a clearer and more professional sales expression.",
    },
    result: {
      no: "Bidro til et profesjonelt uttrykk som styrket presentasjonen av eiendommen.",
      en: "Helped create a more professional expression for the sales presentation.",
    },
    ctaLabel: openFilmCta,
    externalVideo: youtubeAsset("2nE9ut7eb1c", {
      no: "Stein's hytte",
      en: "Stein's cabin",
    }),
    palette: "from-[#e9e1d7] via-[#ccb79e] to-[#927153]",
  },
  {
    slug: "the-actors-hub-dont-act",
    group: "commercial",
    client: "The Actors Hub",
    title: {
      no: "The Actors Hub: Don't Act",
      en: "The Actors Hub: Don't Act",
    },
    format: {
      no: "Workshop og showreels",
      en: "Workshop and showreels",
    },
    summary: {
      no: "En intensiv workshop med veiledning fra anerkjente lærere fra Los Angeles, der Fau&Land leverte showreels og produksjon.",
      en: "An intensive acting workshop guided by renowned Los Angeles teachers, with Fau&Land delivering showreels and production.",
    },
    result: {
      no: "Executive Producer: David Nutter. Instruktører: Natassia Malthe og David Nutter.",
      en: "Executive Producer: David Nutter. Instructors: Natassia Malthe and David Nutter.",
    },
    ctaLabel: viewReferenceCta,
    image:
      "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/9c30e685-6b5e-4b1d-8c7e-f8f4e68e2bb5/Skjermbilde+2024-12-16+kl.+14.25.30.png",
    imageAlt: {
      no: "Still fra The Actors Hub: Don't Act",
      en: "Still from The Actors Hub: Don't Act",
    },
    palette: "from-[#151414] via-[#3e3e40] to-[#8b6d58]",
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
      no: "Vi gir råd om videre bruk, nye uttak og smart distribusjon.",
      en: "We advise on reuse, new cutdowns and smarter distribution.",
    },
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Tommy R.A. Garland",
    role: { no: "Producer og partner", en: "Producer and partner" },
    summary: {
      no: "Tommy holder produsentsporet samlet gjennom brief, budsjett, kundedialog og leveranse, med erfaring fra reklame, TV, event og kortfilm.",
      en: "Tommy keeps producing, budget, client dialogue and delivery aligned, with experience across advertising, TV, events and short film.",
    },
    image: "/assets/team/tommy/images/tommy-garland-profile.png",
    imageAlt: {
      no: "Portrett av Tommy R.A. Garland",
      en: "Portrait of Tommy R.A. Garland",
    },
    href: "/team/tommy-garland",
  },
  {
    name: "Gard Ruben Fauske",
    role: { no: "Daglig leder, prosjektleder og regissør", en: "Managing director, project lead and director" },
    summary: {
      no: "Gard leder regi, fortelling og klipp med erfaring fra reklameproduksjon, kortfilm og produksjonsledelse i både byrå og filmselskap.",
      en: "Gard leads direction, story and edit with experience from commercial production, short film and production leadership across both agency and film-company work.",
    },
    image: "/assets/team/gard/images/gard-profile.png",
    imageAlt: {
      no: "Portrett av Gard Ruben Fauske",
      en: "Portrait of Gard Ruben Fauske",
    },
    href: "/team/gard-ruben-fauske",
  },
];

export const aboutBullets = [
  {
    no: "Tommy holder produsent- og kundesporet tett, mens Gard leder regi, fortelling og klipp.",
    en: "Tommy keeps the production and client track tight, while Gard leads direction, story and edit.",
  },
  {
    no: "To seniorer betyr korte beslutningslinjer, tydelig ansvar og tett oppfølging.",
    en: "Two senior leads means short decision paths, clear ownership and close follow-up.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: { no: "Hva koster et videoprosjekt?", en: "What does a video project cost?" },
    answer: {
      no: "Pris avhenger av omfang. Typiske nivåer er 5 000-20 000 kr for kort SoMe-innhold, 20 000-100 000 kr+ for reklamefilm og 15 000-60 000 kr+ for aftermovie.",
      en: "Pricing depends on scope. Typical levels are NOK 5,000-20,000 for short-form social content, NOK 20,000-100,000+ for commercials and NOK 15,000-60,000+ for aftermovies.",
    },
  },
  {
    question: { no: "Hvor lang tid tar et prosjekt?", en: "How long does a project take?" },
    answer: {
      no: "Korte SoMe-leveranser tar ofte 3-7 dager. En promofilm ligger gjerne på 1-3 uker, mens større kampanjer kan ta 3-6 uker.",
      en: "Short-form social deliverables often take 3-7 days. A promo film usually takes 1-3 weeks, while larger campaigns can take 3-6 weeks.",
    },
  },
  {
    question: {
      no: "Jobber dere bare i Oslo?",
      en: "Do you only work in Oslo?",
    },
    answer: {
      no: "Nei. Vi holder til i Oslo, men jobber over hele Norge og internasjonalt når prosjektet krever det.",
      en: "No. We are based in Oslo, but work across Norway and internationally when the project calls for it.",
    },
  },
  {
    question: { no: "Hva trenger dere for å gi et estimat?", en: "What do you need to give an estimate?" },
    answer: {
      no: "Send oss kort hva dere vil oppnå, hvor filmen skal brukes og når dere trenger den. Da kan vi raskt foreslå riktig oppsett og prisnivå.",
      en: "Send us a short brief with the goal, where the film will be used and when you need it. That lets us recommend the right setup quickly.",
    },
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: { no: "Hva lager Fau&Land Film?", en: "What does Fau&Land Film create?" },
    answer: {
      no: "Vi lager reklamefilm, bedriftsfilm, innhold for sosiale medier og aftermovie for bedrifter og organisasjoner som trenger tydeligere kommunikasjon.",
      en: "We create commercials, company films, social content and aftermovies for companies and organisations that need clearer communication.",
    },
  },
  {
    question: { no: "Hva skjer etter at vi tar kontakt?", en: "What happens after we get in touch?" },
    answer: {
      no: "Vi avklarer mål, kanal og tidslinje, og foreslår riktig oppsett og neste steg.",
      en: "We align on goal, channel and timing, and recommend the right setup and next step.",
    },
  },
];

export const landingTemplateBullets = [
  {
    no: "Kortere vei fra kampanje til henvendelse",
    en: "A shorter path from campaign to inquiry",
  },
  {
    no: "Tydelig budskap over bretten",
    en: "A clear message above the fold",
  },
  {
    no: "Tillit og handling på samme side",
    en: "Trust and action on the same page",
  },
];
