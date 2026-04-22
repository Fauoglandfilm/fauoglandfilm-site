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
  provider: "youtube" | "vimeo" | "tiktok" | "instagram";
  videoType: "youtube" | "vimeo" | "tiktok" | "instagram";
  videoId: string;
  embedUrl: string;
  thumbnailSrc: string;
  label: LocalizedText;
  sourceUrl: string;
};

export type PortfolioProjectLink = {
  label: LocalizedText;
  href: string;
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

export type PortfolioProjectCredit = {
  role: string;
  name: string;
};

export type PortfolioProjectQuote = {
  text: LocalizedText;
  attribution?: LocalizedText;
};

export type PortfolioProjectInfo = {
  shortDescription?: LocalizedText;
  extendedDescription?: LocalizedText;
  deliverables?: LocalizedText[];
  result?: LocalizedText;
  quote?: PortfolioProjectQuote;
  awards?: LocalizedText[];
  festivals?: LocalizedText[];
  credits?: PortfolioProjectCredit[];
  links?: PortfolioProjectLink[];
};

export type PortfolioProject = {
  slug: string;
  group: string;
  client: string;
  title: LocalizedText;
  format: LocalizedText;
  summary: LocalizedText;
  shortDescription?: LocalizedText;
  extendedDescription?: LocalizedText;
  deliverables?: LocalizedText[];
  result?: LocalizedText;
  quote?: PortfolioProjectQuote;
  awards?: LocalizedText[];
  festivals?: LocalizedText[];
  credits?: PortfolioProjectCredit[];
  links?: PortfolioProjectLink[];
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
    no: "Film som gir deg kunder.",
    en: "Film that brings you customers.",
  },
  description: {
    no: "Vi lager reklame og innhold som øker synlighet, bygger tillit og gir flere henvendelser.",
    en: "We create commercials and content that increase visibility, build trust and generate more inquiries.",
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
export const APPROVED_HERO_VIDEO_SRC = "/media/hero/fau-land-hero-source-lock-20260329-v1.mp4";
export const APPROVED_HERO_POSTER_SRC = "/media/hero/fau-land-hero-source-lock-20260329-v1-poster.webp";

export const videoLibrary = {
  hero: {
    videoType: "direct",
    src: APPROVED_HERO_VIDEO_SRC,
    poster: APPROVED_HERO_POSTER_SRC,
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
    poster: "/assets/services/posters/reklamefilm-poster.avif",
    label: {
      no: "Reklamefilm",
      en: "Commercial film",
    },
  },
  "02": {
    videoType: "direct",
    src: "/assets/services/videos/bedriftfilm.mp4",
    poster: "/assets/services/posters/bedriftfilm-poster.avif",
    label: {
      no: "Bedriftsfilm",
      en: "Company film",
    },
  },
  "03": {
    videoType: "direct",
    src: "/assets/services/videos/sosiale-medier.mp4",
    poster: "/assets/services/posters/sosiale-medier-poster.webp",
    label: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
  },
  "04": {
    videoType: "direct",
    src: "/assets/services/videos/konsert.mp4",
    poster: "/assets/services/posters/konsert-poster.webp",
    label: {
      no: "Aftermovie",
      en: "Aftermovie",
    },
  },
  "05": {
    videoType: "direct",
    src: "/assets/services/videos/marketing.mp4",
    poster: "/assets/services/posters/marketing-poster.webp",
    label: {
      no: "Marketing og distribusjon",
      en: "Marketing and distribution",
    },
  },
  "06": {
    videoType: "direct",
    src: "/assets/services/videos/drone.mp4",
    poster: "/assets/services/posters/drone-poster.webp",
    label: {
      no: "Dronefilm og luftfoto",
      en: "Drone film and aerial photography",
    },
  },
} satisfies Record<string, VideoAsset>;

const youtubeWatchUrl = (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`;
const tiktokEmbedUrl = (videoId: string) => `https://www.tiktok.com/player/v1/${videoId}`;
const instagramEmbedUrl = (postId: string) =>
  `https://www.instagram.com/p/${postId}/embed/captioned/`;

function sanitizeExternalVideoId(value: string) {
  return value.trim().replace(/^\/+|\/+$/g, "");
}

function extractTikTokVideoId(url: string) {
  const match = url.match(/\/video\/(\d+)/i);
  return match?.[1] ?? null;
}

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

const tiktokAsset = (
  sourceUrl: string,
  label: LocalizedText,
  thumbnailSrc: string,
): ExternalVideoAsset => {
  const videoId = extractTikTokVideoId(sourceUrl);

  if (!videoId) {
    throw new Error(`Could not extract TikTok video id from URL: ${sourceUrl}`);
  }

  return {
    provider: "tiktok",
    videoType: "tiktok",
    videoId: sanitizeExternalVideoId(videoId),
    embedUrl: tiktokEmbedUrl(videoId),
    thumbnailSrc,
    label,
    sourceUrl,
  };
};

const instagramAsset = (
  sourceUrl: string,
  postId: string,
  label: LocalizedText,
  thumbnailSrc: string,
): ExternalVideoAsset => ({
  provider: "instagram",
  videoType: "instagram",
  videoId: sanitizeExternalVideoId(postId),
  embedUrl: instagramEmbedUrl(postId),
  thumbnailSrc,
  label,
  sourceUrl,
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
  { href: "/frilanseren", label: { no: "Logg inn / Plattform", en: "Login / Platform" } },
];

// Curated active set from clients/COLOR. The marquee only uses verified brand files.
export const clientLogos: ClientLogo[] = [
  {
    name: "Ville Gleder",
    src: "/media/logos/clients/COLOR/Ville%20gleder.webp",
    darkSrc: "/media/logos/clients/COLOR/ville-gleder-dark.webp",
    width: 1466,
    height: 476,
  },
  {
    name: "Treningshuset",
    src: "/media/logos/clients/COLOR/Treningshuset.webp",
    darkSrc: "/media/logos/clients/COLOR/Treningshuset.webp",
    width: 726,
    height: 146,
  },
  {
    name: "STUA",
    src: "/media/logos/clients/COLOR/STUA.webp",
    darkSrc: "/media/logos/clients/COLOR/stua-dark.webp",
    width: 1563,
    height: 1563,
  },
  {
    name: "Norske Bunader",
    src: "/media/logos/clients/COLOR/Norske%20Bunader.webp",
    darkSrc: "/media/logos/clients/COLOR/norske-bunader-dark.webp",
    width: 500,
    height: 200,
  },
  {
    name: "Actors Hub",
    src: "/media/logos/clients/COLOR/actorshub-logo-dark-text.webp",
    darkSrc: "/media/logos/clients/COLOR/actorshub_logo_white_NY-kopi.webp",
    width: 1500,
    height: 844,
  },
  {
    name: "Gina",
    src: "/media/logos/clients/COLOR/GinaLiggende-01.webp",
    darkSrc: "/media/logos/clients/COLOR/gina-dark.webp",
    width: 1500,
    height: 341,
  },
  {
    name: "The International Stunt Academy",
    src: "/media/logos/clients/COLOR/ISA.webp",
    darkSrc: "/media/logos/clients/COLOR/isa-dark.webp",
    width: 1483,
    height: 660,
  },
  {
    name: "Nei til Atomvåpen",
    src: "/media/logos/clients/COLOR/ny-nei-til-atomvapen.avif",
    darkSrc: "/media/logos/clients/COLOR/ny-nei-til-atomvapen.avif",
    width: 447,
    height: 448,
  },
  {
    name: "Foreningen Norden",
    src: "/media/logos/clients/COLOR/Foreningen%20norden.webp",
    darkSrc: "/media/logos/clients/COLOR/foreningen-norden-dark.webp",
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
      no: "Reklamefilm og annonseuttak for landingsside, annonser og sosiale medier. Perfekt når dere skal lansere noe nytt eller stramme inn kommunikasjonen rundt et eksisterende tilbud.",
      en: "Commercial films and ad cutdowns for landing pages, paid campaigns and social channels. Ideal when you are launching something new or tightening the message around an existing offer.",
    },
    eyebrow: { no: "Kampanjer og lanseringer", en: "Campaigns and launches" },
    value: {
      no: "Få flere henvendelser ut av samme kampanjebudsjett.",
      en: "Get more leads out of the same campaign budget.",
    },
    budget: {
      no: "40 000–180 000 kr",
      en: "NOK 40,000-180,000",
    },
    timeline: {
      no: "2–5 uker",
      en: "2-5 weeks",
    },
    deliverables: [
      { no: "Hovedfilm", en: "Hero film" },
      { no: "Annonseuttak", en: "Ad cutdowns" },
      { no: "Versjoner til nettside og SoMe", en: "Website and social versions" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case/treningshuset",
    exampleLabel: { no: "Se eksempel", en: "See example" },
  },
  {
    slug: "marketing-distribusjon",
    title: { no: "Marketing og distribusjon", en: "Marketing and distribution" },
    summary: {
      no: "Plan, annonseuttak og publisering som kobler film med betalt annonsering og organisk innhold. Vi setter opp struktur, tester varianter og rapporterer på hva som faktisk fungerer.",
      en: "Planning, ad cutdowns and publishing that connect film with paid distribution and organic content. We set up the structure, test variations and report on what actually performs.",
    },
    eyebrow: { no: "Annonser og distribusjon", en: "Ads and distribution" },
    value: {
      no: "Sørg for at filmen faktisk blir sett, brukt og målt.",
      en: "Make sure the film is actually seen, used and measured.",
    },
    budget: {
      no: "15 000–60 000 kr",
      en: "NOK 15,000-60,000",
    },
    timeline: {
      no: "3–10 dager",
      en: "3-10 days",
    },
    deliverables: [
      { no: "Distribusjonsplan", en: "Distribution plan" },
      { no: "Annonseuttak og kanaltilpasninger", en: "Ad cutdowns and channel adaptations" },
      { no: "Publiseringsløp for SoMe", en: "Social publishing rollout" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case/nei-til-atomvapen",
    exampleLabel: { no: "Se kampanjeeksempel", en: "See campaign example" },
  },
  {
    slug: "bedriftsfilm-intervjuer",
    title: { no: "Bedriftsfilm og intervjuer", en: "Company film and interviews" },
    summary: {
      no: "Bedriftsfilm og intervjuer for nettside, salg og presentasjoner. Vi hjelper dere å forklare hvem dere er og hvorfor dere er et trygt valg – uten at det blir stivt eller internt.",
      en: "Company films and interviews for websites, sales and presentations. We help you explain who you are and why you are a safe choice without making it feel stiff or internal.",
    },
    eyebrow: { no: "Tillit og tydelighet", en: "Trust and clarity" },
    value: {
      no: "Bygg tillit før første møte.",
      en: "Build trust before the first meeting.",
    },
    budget: {
      no: "35 000–120 000 kr",
      en: "NOK 35,000-120,000",
    },
    timeline: {
      no: "1–3 uker",
      en: "1-3 weeks",
    },
    deliverables: [
      { no: "Profilfilm", en: "Brand / company film" },
      { no: "Intervjuklipp", en: "Interview edits" },
      { no: "Salgs- og nettsideversjoner", en: "Sales and website versions" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case/foreningen-norden",
    exampleLabel: { no: "Se eksempel", en: "See example" },
  },
  {
    slug: "some-innhold",
    title: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
    summary: {
      no: "Korte videoer og varianter som holder publiseringen i gang. Vi planlegger én eller flere opptaksdager som gir nok innhold til en hel periode med jevn publisering.",
      en: "Short videos and content variations that keep publishing moving. We plan one or more shoot days that give you enough material for a full period of consistent publishing.",
    },
    eyebrow: { no: "Publisering over tid", en: "Ongoing publishing" },
    value: {
      no: "Hold dere synlige hver uke, uten ekstra mas.",
      en: "Stay visible every week without extra hassle.",
    },
    budget: {
      no: "20 000–80 000 kr",
      en: "NOK 20,000-80,000",
    },
    timeline: {
      no: "3–10 dager",
      en: "3-10 days",
    },
    deliverables: [
      { no: "Reels og short-form", en: "Reels and short-form edits" },
      { no: "Flere formater per opptak", en: "Multiple formats per shoot" },
      { no: "Korte kampanjeuttak", en: "Short campaign cutdowns" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case/treningshuset",
    exampleLabel: { no: "Se innholdseksempler", en: "See content examples" },
  },
  {
    slug: "event-live",
    title: { no: "Aftermovie", en: "Aftermovie" },
    summary: {
      no: "Aftermovies, reels og intervjuer som lever videre etter eventet. Vi kan både levere raskt etter arrangementet og bygge et bibliotek som brukes i rekruttering, salg og neste års kampanjer.",
      en: "Aftermovies, reels and interviews that keep working after the event. We can deliver quickly after the event and build a library you can use in recruitment, sales and next year's campaigns.",
    },
    eyebrow: { no: "Arrangement og etterbruk", en: "Events and reuse" },
    value: {
      no: "La arrangementet leve videre etter at lyset er skrudd av.",
      en: "Let the event keep working after the lights go down.",
    },
    budget: {
      no: "30 000–120 000 kr",
      en: "NOK 30,000-120,000",
    },
    timeline: {
      no: "Samme dag–2 uker",
      en: "Same day-2 weeks",
    },
    deliverables: [
      { no: "Aftermovie / stemningsfilm", en: "Aftermovie / mood film" },
      { no: "Reels og korte uttak", en: "Reels and short cutdowns" },
      { no: "Flerkameraopptak ved behov", en: "Multicam capture when needed" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case/nei-til-atomvapen-arbeiderdagen",
    exampleLabel: { no: "Se eksempel", en: "See example" },
  },
  {
    slug: "dronefilm-luftfoto",
    title: { no: "Dronefilm og luftfoto", en: "Drone film and aerial photography" },
    summary: {
      no: "Droneopptak som kan stå alene eller brukes som del av større produksjoner. Typisk brukt til eiendom, industri, infrastruktur, arrangement og reklame der dere vil vise omfang og kontekst på en måte som ikke er mulig fra bakken.",
      en: "Drone footage that can stand alone or work as part of a larger production. Commonly used for real estate, industry, infrastructure, events and commercials where you need to show scale and context in a way that is not possible from the ground.",
    },
    eyebrow: { no: "Oversikt og omfang", en: "Scale and overview" },
    value: {
      no: "Gi prosjektene oversikt og tyngde fra luften.",
      en: "Give projects scale and weight from the air.",
    },
    budget: {
      no: "10 000–40 000 kr",
      en: "NOK 10,000-40,000",
    },
    timeline: {
      no: "1–7 dager",
      en: "1-7 days",
    },
    deliverables: [
      { no: "Droneklipp til bruk i film", en: "Drone footage for larger films" },
      { no: "Rene dronefilmer", en: "Standalone drone films" },
      { no: "Stillbilder fra drone", en: "Drone stills" },
      { no: "Klargjorte klipp til SoMe og nettside", en: "Prepared cuts for social media and web" },
    ],
    ctaLabel: { no: "Få anbefalt oppsett nå", en: "Get a recommended setup now" },
    href: "/kontakt",
    exampleHref: "/case",
    exampleLabel: { no: "Se eksempel", en: "See example" },
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
      no: "De trengte en film som gjørde saken tydelig, skapte nærhet og senket terskelen for å bli med.",
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
    image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
    imageAlt: {
      no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
      en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
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
        image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
        imageAlt: {
          no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
          en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
        },
        video: {
          videoType: "direct",
          src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
          poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
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
        image: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.webp",
        imageAlt: {
          no: "Jan Monsen og Mattis Thørud i promofilm for Våt, kald & sulten",
          en: "Jan Monsen and Mattis Thorud in the Wet, cold and hungry promo film",
        },
        video: {
          videoType: "direct",
          src: "/assets/portfolio/ville-gleder/videos/ville-gleder-vat-kald-sulten-web.mp4",
          poster: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.webp",
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
      no: "AfterMovie og Nettsideinnhold",
      en: "AfterMovie and Website Content",
    },
    category: { no: "AfterMovie og nettsideinnhold", en: "Aftermovie and website content" },
    industry: { no: "Organisasjon", en: "Organisation" },
    summary: {
      no: "Produksjon som viser både kapasitet på nettsideinnhold og levering fra et 1,5 time langt arrangement i aftermovie-format.",
      en: "A production that shows both website-content capability and delivery from a 1.5-hour event in aftermovie format.",
    },
    goal: {
      no: "De trengte innhold som både forklarte arbeidet deres tydelig på nettsiden og viste at arrangementer kunne dekkes og leveres i stort format.",
      en: "They needed content that both explained their work clearly on the website and showed that events could be covered and delivered at scale.",
    },
    solution: {
      no: "Vi kombinerte tidligere produksjoner, nytt materiale og animasjon til nettsidefilm, og leverte også aftermovie fra et 1,5 time langt arrangement.",
      en: "We combined earlier productions, new material and animation into a website film, and also delivered an aftermovie from a 1.5-hour event.",
    },
    deliverables: [
      { no: "Nettsidefilm", en: "Website film" },
      { no: "AfterMovie fra 1,5 time arrangement", en: "Aftermovie from a 1.5-hour event" },
      { no: "Animasjoner og redigering", en: "Animation and editing" },
    ],
    impact: {
      no: "Viser både tydelig nettsidekommunikasjon og kapasitet til å dekke, klippe og levere større arrangementer raskt.",
      en: "Shows both clear website communication and the capacity to cover, edit and deliver larger events quickly.",
    },
    metrics: [
      { value: "59 sek", label: { no: "nettsidefilm", en: "website film" } },
      { value: "1,5 time", label: { no: "arrangement", en: "event" } },
      { value: "AfterMovie", label: { no: "leveranse", en: "delivery" } },
      { value: "Nettside + event", label: { no: "kapasitet", en: "capacity" } },
    ],
    tags: [
      { no: "AfterMovie", en: "Aftermovie" },
      { no: "Nettside", en: "Website" },
      { no: "Arrangement", en: "Event" },
    ],
    video: {
      videoType: "direct",
      src: "/assets/portfolio/foreningen-norden/videos/foreningen-norden-nettsideinnhold.mp4",
      poster: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
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
      no: "10 filmer for annonser og sosiale medier, laget for å drive flere innmeldinger.",
      en: "10 films for ads and social media, built to drive more memberships.",
    },
    goal: {
      no: "10 filmer klare for annonser og sosiale medier fra dag en.",
      en: "10 films ready for ads and social from day one.",
    },
    solution: {
      no: "Portrettfilmer med rask pacing, tydelig budskap og format tilpasset mobil og feed.",
      en: "Portrait films with fast pacing, clear messaging and formats tailored for mobile and in-feed use.",
    },
    deliverables: [
      { no: "10 filmer levert for annonser og sosiale medier", en: "10 films delivered for ads and social media" },
      { no: "9:16 og 4:5 klare til bruk", en: "9:16 and 4:5 assets ready to launch" },
    ],
    impact: {
      no: "Ga Treningshuset 10 tydelige filmer som gjør det raskt å teste budskap og drive innmeldinger.",
      en: "Gave Treningshuset ten clear films that make it faster to test messaging and drive memberships.",
    },
    metrics: [
      { value: "10", label: { no: "filmer", en: "films" } },
      { value: "2", label: { no: "portrettformater", en: "portrait formats" } },
      { value: "Annonser + SoMe", label: { no: "bruk", en: "use" } },
    ],
    tags: [
      { no: "Annonsefilm", en: "Ad film" },
      { no: "Sosiale medier", en: "Social media" },
      { no: "Medlemsvekst", en: "Membership growth" },
    ],
    image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
    imageAlt: {
      no: "Still fra Treningshuset-kampanje i portrettformat",
      en: "Still from the Treningshuset campaign in portrait format",
    },
    mediaFit: "contain",
    video: {
      videoType: "direct",
      src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
      mobileSrc: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-velkommen-sindre-web.mp4",
      poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
      mobilePoster: "/assets/portfolio/treningshuset/posters/treningshuset-velkommen-sindre-poster.webp",
      label: {
        no: "Treningshuset - Musikk 2",
        en: "Treningshuset - Music 2",
      },
    },
    videoVariants: [
      {
        slug: "velkommen-sindre",
        label: {
          no: "Film 1",
          en: "Film 1",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-velkommen-sindre-poster.webp",
        imageAlt: {
          no: "Portrettfilm for Treningshuset med Velkommen Sindre",
          en: "Portrait film for Treningshuset with Welcome Sindre",
        },
        mediaFit: "cover",
        frame: "portrait",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-velkommen-sindre-web.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-velkommen-sindre-poster.webp",
          label: {
            no: "Film 1",
            en: "Film 1",
          },
        },
      },
      {
        slug: "musikk-1",
        label: {
          no: "Film 2",
          en: "Film 2",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-1-poster.webp",
        imageAlt: {
          no: "Portrettfilm for Treningshuset med Musikk 1",
          en: "Portrait film for Treningshuset with Music 1",
        },
        mediaFit: "cover",
        frame: "portrait",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-1-web.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-1-poster.webp",
          label: {
            no: "Film 2",
            en: "Film 2",
          },
        },
      },
      {
        slug: "musikk-2-45",
        label: {
          no: "Film 3",
          en: "Film 3",
        },
        image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
        imageAlt: {
          no: "4:5-film for Treningshuset med Musikk 2",
          en: "4:5 film for Treningshuset with Music 2",
        },
        mediaFit: "cover",
        frame: "portrait4x5",
        video: {
          videoType: "direct",
          src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
          poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
          label: {
            no: "Film 3",
            en: "Film 3",
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

export const portfolioProjectInfoContent: Partial<Record<string, PortfolioProjectInfo>> = {
  "treningshuset": {
    shortDescription: {
      no: "Vi produserte 10 filmer for annonser og sosiale medier for å øke medlemsvekst.",
      en: "We produced 10 films for ads and social media to drive membership growth.",
    },
    extendedDescription: {
      no: "Filmene ble levert i flere formater og lengder, med ulike budskap tilpasset spesifikke kampanjer.",
      en: "The films were delivered in multiple formats and lengths, with different messages tailored to specific campaigns.",
    },
    deliverables: [
      { no: "10 filmer", en: "10 films" },
      { no: "Flere formater", en: "Multiple formats" },
      { no: "Annonse og SoMe bruk", en: "Ad and social use" },
    ],
    result: {
      no: "Økt synlighet og bedre konvertering mot nye medlemmer.",
      en: "Increased visibility and stronger conversion toward new members.",
    },
  },
  "nei-til-atomvapen": {
    shortDescription: {
      no: "Kampanjefilm for å rekruttere flere medlemmer.",
      en: "Campaign film built to recruit more members.",
    },
    extendedDescription: {
      no: "En dokumentarisk film som skal få publikum til å kjenne alvoret og forstå hvorfor vi må handle nå.",
      en: "A documentary-led film designed to make the audience feel the urgency and understand why we need to act now.",
    },
  },
  "ville-gleder-villmarksforedrag": {
    shortDescription: {
      no: "Promofilm for foredrag med fokus på natur og opplevelser.",
      en: "Promo film for a talk focused on nature and outdoor experiences.",
    },
    extendedDescription: {
      no: "Filmen inspirerer publikum til å tilbringe mer tid ute, med Mattis Thørud og Jan Monsen.",
      en: "The film inspires the audience to spend more time outdoors, featuring Mattis Thørud and Jan Monsen.",
    },
    quote: {
      text: {
        no: "Det er tøff konkurranse i foredragsbransjen... vi opplever økt oppdragsmengde etter Fau&Land.",
        en: "There is tough competition in the speaking market... and we have seen more incoming work after Fau&Land.",
      },
      attribution: {
        no: "Mattis Thørud, Ville Gleder",
        en: "Mattis Thørud, Ville Gleder",
      },
    },
  },
  "ville-gleder-vat-kald-sulten": {
    shortDescription: {
      no: "Promofilm med sterk fortelling.",
      en: "Promo film with a strong narrative concept.",
    },
    extendedDescription: {
      no: "Setter vanlig arbeidshverdag opp mot ekstreme forhold i naturen.",
      en: "Sets ordinary work life against extreme conditions in the wilderness.",
    },
    quote: {
      text: {
        no: "Det er tøff konkurranse i foredragsbransjen... vi opplever økt oppdragsmengde etter Fau&Land.",
        en: "There is tough competition in the speaking market... and we have seen more incoming work after Fau&Land.",
      },
      attribution: {
        no: "Mattis Thørud, Ville Gleder",
        en: "Mattis Thørud, Ville Gleder",
      },
    },
  },
  "a-message-from-martha": {
    shortDescription: {
      no: "Drama kortfilm produsert i samarbeid med DeBlonde Production.",
      en: "Drama short produced in collaboration with DeBlonde Production.",
    },
    extendedDescription: {
      no: "Internasjonalt samarbeid med tydelig visuell stil.",
      en: "An international collaboration with a clearly defined visual style.",
    },
    credits: [
      { role: "Producer", name: "Tommy Garland" },
      { role: "Director", name: "Elia Biondi" },
      { role: "DOP", name: "Justin Bellucci" },
      { role: "Music", name: "Lisa Braathen" },
      { role: "Editor", name: "Svein Olav Sandem" },
      { role: "Production Design", name: "Mille Gran" },
    ],
  },
  "kommer-hjem-musikkvideo": {
    shortDescription: {
      no: "Narrativ musikkvideo for Klaus Perry.",
      en: "Narrative music video for Klaus Perry.",
    },
    extendedDescription: {
      no: "En historie om å finne veien hjem, med en leken og surrealistisk vri.",
      en: "A story about finding the way home, told with a playful and surreal twist.",
    },
  },
  "foreningen-norden-nettsideinnhold": {
    shortDescription: {
      no: "Film for nettside og kommunikasjon.",
      en: "Film made for website and communications.",
    },
    extendedDescription: {
      no: "Kombinasjon av tidligere materiale og nytt innhold, inkludert animasjon levert av oss.",
      en: "A combination of earlier footage and new material, including animation delivered by us.",
    },
    deliverables: [
      { no: "Tidligere opptak", en: "Earlier footage" },
      { no: "Nytt kundemateriale", en: "New client material" },
      { no: "Animasjon fra Fau&Land", en: "Animation by Fau&Land" },
    ],
  },
  "nei-til-atomvapen-arbeiderdagen": {
    shortDescription: {
      no: "Eventfilm og SoMe reels fra Youngstorget.",
      en: "Event film and social reels from Youngstorget.",
    },
    extendedDescription: {
      no: "Leveranse inkluderte stemningsfilm, fullt opptak av tale og flere korte klipp til sosiale medier.",
      en: "The delivery included a mood film, a full speech recording and multiple short clips for social media.",
    },
    deliverables: [
      { no: "Stemningsfilm", en: "Mood film" },
      { no: "Fullt taleopptak", en: "Full speech recording" },
      { no: "SoMe reels", en: "Social reels" },
    ],
  },
  "nei-til-atomvapen-konferanse": {
    shortDescription: {
      no: "Eventfilm for rekrutteringskampanje.",
      en: "Event film for a recruitment campaign.",
    },
    extendedDescription: {
      no: "En stemningsfull film brukt i deres pågående kampanjearbeid.",
      en: "A mood-driven film used in their ongoing campaign work.",
    },
    result: {
      no: "Brukt videre i organisasjonens lopende rekrutterings- og synlighetsarbeid.",
      en: "Used across the organisation's ongoing recruitment and awareness work.",
    },
  },
  "foreningen-norden-debatt": {
    shortDescription: {
      no: "Flerkamera produksjon av debatt.",
      en: "Multi-camera debate production.",
    },
    extendedDescription: {
      no: "3 kameraer, dedikert lydtekniker og rask levering av teaser til SoMe.",
      en: "3 cameras, a dedicated sound technician and a fast teaser delivery for social media.",
    },
    deliverables: [
      { no: "3 kameraer", en: "3 cameras" },
      { no: "Dedikert lydtekniker", en: "Dedicated sound technician" },
      { no: "Rask teaser til SoMe", en: "Fast teaser for social media" },
    ],
  },
  "liten-bedrift": {
    shortDescription: {
      no: "Kort reklamefilm for sosiale medier.",
      en: "Short ad film for social media.",
    },
    extendedDescription: {
      no: "Leken og direkte kommunikasjon, produsert in house.",
      en: "Playful and direct communication, produced in house.",
    },
  },
  "eventfotografering-kinesiske-ambassaden": {
    shortDescription: {
      no: "Eventfotografering for kinesisk nyttår.",
      en: "Event photography for Chinese New Year.",
    },
    extendedDescription: {
      no: "Dokumentasjon av arrangement med fokus på kvalitet og stemning.",
      en: "Event documentation with a focus on quality and atmosphere.",
    },
  },
  "en-midnatts-vuggesang": {
    shortDescription: {
      no: "Drama kortfilm distribuert internasjonalt.",
      en: "Drama short distributed internationally.",
    },
    extendedDescription: {
      no: "Co-produsert med Snowfall Cinema og nominert i Grimstad.",
      en: "Co-produced with Snowfall Cinema and nominated in Grimstad.",
    },
    festivals: [
      { no: "Internasjonal distribusjon", en: "International distribution" },
      { no: "Grimstad", en: "Grimstad" },
    ],
    credits: [{ role: "Producer", name: "Tommy Garland m.fl." }],
  },
  "sprakprisen-2022-aftermovie": {
    shortDescription: {
      no: "Aftermovie fra prisutdeling.",
      en: "Aftermovie from an award ceremony.",
    },
    extendedDescription: {
      no: "1.5 times leveranse med dokumentasjon av arrangement med kongehus.",
      en: "A 1.5-hour delivery documenting an event involving royalty.",
    },
    deliverables: [
      { no: "1,5 time leveranse", en: "1.5-hour delivery" },
      { no: "Foreningen Norden", en: "Foreningen Norden" },
      { no: "Dronning Margrethe II", en: "Queen Margrethe II" },
    ],
  },
  "the-voice-within": {
    shortDescription: {
      no: "BA kortfilm produsert under covid.",
      en: "BA short produced under COVID restrictions.",
    },
    extendedDescription: {
      no: "Eneste ferdigstilte film i klassen, fikk Honourable Mention.",
      en: "The only completed film in its class, and it received an Honourable Mention.",
    },
    deliverables: [
      { no: "NTNU BA-film", en: "NTNU BA film" },
      { no: "Produsert under covid", en: "Produced under COVID restrictions" },
    ],
    awards: [{ no: "Honourable Mention", en: "Honourable Mention" }],
  },
  "steins-hytte": {
    shortDescription: {
      no: "Eiendomsfilm og foto.",
      en: "Property film and photography.",
    },
    extendedDescription: {
      no: "Bidro til sterkere salgsprosess gjennom visuelt uttrykk.",
      en: "Contributed to a stronger sales process through a more visual presentation.",
    },
  },
  "huldredans": {
    shortDescription: {
      no: "Prisvinnende kortfilm.",
      en: "Award-winning short film.",
    },
    extendedDescription: {
      no: "Utforsker sorg og norsk folketro med internasjonale priser.",
      en: "Explores grief and Norwegian folklore, backed by international awards.",
    },
    awards: [{ no: "Internasjonale priser og nominasjoner", en: "International awards and nominations" }],
    credits: [
      { role: "Genre", name: "Mystery / drama" },
      { role: "Theme", name: "Grief and folklore" },
    ],
  },
  "er-det-sa-javlig-vanskelig": {
    shortDescription: {
      no: "Kortfilmkomedie om hvor kaotisk filmproduksjon faktisk kan bli.",
      en: "A short comedy about how chaotic film production can really become.",
    },
    extendedDescription: {
      no: "Skrevet og spilt av Morten Hansen, med regi og klipp av Gard Ruben Fauske. Filmen tar for seg hvor vanskelig det faktisk er å lage film, og hva som skjer når sterke personligheter skal lose samme produksjon i mål. En komedie av filmskapere, for filmskapere.",
      en: "Written and performed by Morten Hansen, with direction and edit by Gard Ruben Fauske. The film looks at how difficult filmmaking really is, and what happens when strong personalities try to carry the same production across the line. A comedy by filmmakers, for filmmakers.",
    },
    credits: [
      { role: "Written and performed by", name: "Morten Hansen" },
      { role: "Direction and edit", name: "Gard Ruben Fauske" },
      { role: "Executive Producer", name: "Tommy Garland" },
      { role: "BTS Photographer", name: "Malky Renate Frank" },
      { role: "Assistant Director", name: "Johan Ferdinand Østereng" },
      { role: "Sound on set", name: "Morten James Willums" },
    ],
  },
  "takk-for-at-du-er-min-venn": {
    shortDescription: {
      no: "Musikkvideo med NRK distribusjon.",
      en: "Music video with NRK distribution.",
    },
    extendedDescription: {
      no: "Kombinerer live action og animasjon.",
      en: "Combines live action and animation.",
    },
    credits: [
      { role: "Featuring", name: "Bjarte Hjelmeland" },
      { role: "Universe", name: "Elleville Elfrid" },
      { role: "Distribution", name: "NRK" },
    ],
  },
  "the-giant-artist": {
    shortDescription: {
      no: "Dokumentar om kunstner.",
      en: "Documentary about an artist.",
    },
    extendedDescription: {
      no: "Vist på flere norske festivaler.",
      en: "Screened at several Norwegian festivals.",
    },
    festivals: [
      { no: "Minimalen", en: "Minimalen" },
      { no: "Nordic Docs", en: "Nordic Docs" },
      { no: "Den norske dokumentarfilmfestivalen", en: "The Norwegian Documentary Film Festival" },
    ],
    credits: [
      { role: "Subject", name: "Martin" },
      { role: "Type", name: "Artist portrait documentary" },
    ],
  },
  "the-actors-hub-dont-act": {
    shortDescription: {
      no: "Showreels og workshop produksjon.",
      en: "Showreels and workshop production.",
    },
    extendedDescription: {
      no: "Samarbeid med internasjonale instruktører fra LA.",
      en: "A collaboration with international instructors from Los Angeles.",
    },
    credits: [
      { role: "Executive Producer", name: "David Nutter" },
      { role: "Instructor", name: "Natassia Malthe" },
      { role: "Instructor", name: "David Nutter" },
    ],
  },
  "galleri-tm51-machines-like-us": {
    shortDescription: {
      no: "Sosialt innhold og promoteringsfilmer for utstillingen Machines Like Us hos Galleri TM51.",
      en: "Social content and promotional films for the Machines Like Us exhibition at Galleri TM51.",
    },
    extendedDescription: {
      no: "Vi klippet, animerte, lydla og bygget grafiske leveranser rundt kunstnerens egne opptak for å gi utstillingen et tydelig, delbart uttrykk på TikTok og Instagram. Filmene løftet frem de kinetiske treskulpturene til Jakob Grosse-Ophoff og gjorde dem lesbare både som kunstformidling og som sosialt innhold.",
      en: "We edited, animated, sound-designed and built the graphic layer around the artist's own footage to give the exhibition a clear, shareable expression across TikTok and Instagram. The films framed Jakob Grosse-Ophoff's kinetic wooden sculptures in a way that worked both as art communication and as social-first content.",
    },
    deliverables: [
      { no: "Klipp til TikTok og Instagram", en: "Edits for TikTok and Instagram" },
      { no: "Animasjon og grafikk", en: "Animation and graphics" },
      { no: "Lyddesign", en: "Sound design" },
      { no: "Promoteringsinnhold for utstilling", en: "Promotional content for the exhibition" },
    ],
    result: {
      no: "Et sosialt innholdsløp som bygget videre på kunstverk som allerede hadde millioner av visninger, og som gjorde Galleri TM51s utstilling tydeligere og mer delbar i egne flater.",
      en: "A social content package built around artworks that had already generated millions of views online, helping Galleri TM51 present the exhibition more clearly and more shareably in its own channels.",
    },
    credits: [
      { role: "Client", name: "Galleri TM51" },
      { role: "Artist", name: "Jakob Grosse-Ophoff" },
      { role: "Footage", name: "Filmed by the artist" },
      { role: "Edit", name: "Fau&Land Film" },
      { role: "Animation", name: "Fau&Land Film" },
      { role: "Graphics", name: "Fau&Land Film" },
      { role: "Sound", name: "Fau&Land Film" },
    ],
    links: [
      {
        label: {
          no: "TikTok: Sculptures at TM51",
          en: "TikTok: Sculptures at TM51",
        },
        href: "https://www.tiktok.com/@galleri_tm51/video/7556321128533200150?lang=en",
      },
      {
        label: {
          no: "TikTok: Painted Happy",
          en: "TikTok: Painted Happy",
        },
        href: "https://www.tiktok.com/@galleri_tm51/video/7556903335287147798?lang=en",
      },
      {
        label: {
          no: "TikTok: Machines Like Us clip 3",
          en: "TikTok: Machines Like Us clip 3",
        },
        href: "https://www.tiktok.com/@galleri_tm51/video/7558383452949597462?lang=en",
      },
      {
        label: {
          no: "TikTok: Machines Like Us clip 4",
          en: "TikTok: Machines Like Us clip 4",
        },
        href: "https://www.tiktok.com/@galleri_tm51/video/7558048309378600214?lang=en",
      },
    ],
  },
  "fau-land-drone-archive": {
    shortDescription: {
      no: "Droneopptak filmet av oss for bruk i kampanjer, nettsider og innholdsbanker.",
      en: "Drone footage filmed by us for campaigns, websites and content libraries.",
    },
    extendedDescription: {
      no: "Et løpende bibliotek med droneopptak produsert av Fau&Land Film for bruk i egne og kunders produksjoner. Materialet er filmet for å fungere som fleksibelt stock-innhold: stemningsbilder, etableringer og natursekvenser som kan løfte filmer, kampanjer og presentasjoner med større romfølelse og bedre geografisk forankring.",
      en: "An ongoing library of drone footage produced by Fau&Land Film for use across our own and our clients' productions. The material is captured as flexible stock content: atmospheric shots, establishing visuals and landscape sequences that add scale, place and cinematic breathing room to films, campaigns and presentations.",
    },
    deliverables: [
      { no: "Droneopptak til innholdsbank", en: "Drone footage for content libraries" },
      { no: "Etableringsbilder og landskap", en: "Establishing shots and landscapes" },
      { no: "Klargjort materiale for film og SoMe", en: "Prepared material for film and social" },
      { no: "Opptak til fremtidige kampanjer og profileringsfilmer", en: "Footage for future campaigns and profile films" },
    ],
    result: {
      no: "Gir oss og kundene tilgang på et stadig voksende bibliotek med egenproduserte dronebilder som kan brukes raskt i nye produksjoner uten å starte fra null hver gang.",
      en: "Provides us and our clients with a growing library of original drone visuals that can be deployed quickly in new productions without starting from scratch every time.",
    },
    credits: [
      { role: "Client", name: "Fau&Land Film" },
      { role: "Drone footage", name: "Fau&Land Film" },
      { role: "Production", name: "Fau&Land Film" },
    ],
    links: [
      {
        label: {
          no: "Dronefilm 02",
          en: "Drone film 02",
        },
        href: "https://www.youtube.com/watch?v=B8S64aB_Y1w&list=PLjd4-w3930IU953iMMe59G-zX83S1E2Oi&index=3",
      },
      {
        label: {
          no: "Dronefilm 03",
          en: "Drone film 03",
        },
        href: "https://www.youtube.com/watch?v=CUPmGfHPvtw&list=PLjd4-w3930IU953iMMe59G-zX83S1E2Oi&index=4",
      },
      {
        label: {
          no: "Dronefilm 04",
          en: "Drone film 04",
        },
        href: "https://www.youtube.com/watch?v=prAWPYpE7Iw&list=PLjd4-w3930IU953iMMe59G-zX83S1E2Oi&index=5",
      },
      {
        label: {
          no: "Dronefilm 05",
          en: "Drone film 05",
        },
        href: "https://www.youtube.com/watch?v=LRy0mLfEn0k&list=PLjd4-w3930IU953iMMe59G-zX83S1E2Oi&index=6",
      },
    ],
  },
};

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

const portfolioProjectsBase: PortfolioProject[] = [
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
    image: "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.avif",
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
    image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
    imageAlt: {
      no: "Still fra Foreningen Norden - nettsideinnhold",
      en: "Still from Foreningen Norden website content",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/foreningen-norden/videos/foreningen-norden-nettsideinnhold.mp4",
      poster: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
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
    image: "/assets/portfolio/kommer-hjem/posters/kommer-hjem-poster.avif",
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
    image: "/assets/portfolio/a-message-from-martha/posters/a-message-from-martha-poster.webp",
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
    slug: "er-det-sa-javlig-vanskelig",
    group: "narrative",
    client: "Fau&Land Film",
    year: "2026",
    title: {
      no: "Er det så jævlig vanskelig?",
      en: "Is It Really That Damn Hard?",
    },
    format: {
      no: "Kortfilmkomedie",
      en: "Short comedy film",
    },
    summary: {
      no: "En kortfilmkomedie om hvor vanskelig det faktisk er å lage film, og hva som skjer når ulike personligheter skal få samme produksjon i mål.",
      en: "A short comedy about how difficult filmmaking really is, and what happens when different personalities try to land the same production together.",
    },
    result: {
      no: "Skrevet og spilt av Morten Hansen. Regi og klipp av Gard Ruben Fauske. Executive producer: Tommy Garland.",
      en: "Written and performed by Morten Hansen. Directed and edited by Gard Ruben Fauske. Executive producer: Tommy Garland.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/portfolio/er-det-sa-javlig-vanskelig/er-det-sa-javlig-vanskelig-poster.jpg",
    imageAlt: {
      no: "Plakat for Er det så jævlig vanskelig?",
      en: "Poster for Is It Really That Damn Hard?",
    },
    mediaFit: "contain",
    palette: "from-[#201813] via-[#8f7757] to-[#d8c09a]",
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
    image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-poster.avif",
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
    image: "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.avif",
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
    image: "/assets/portfolio/huldredans/posters/huldredans-poster.webp",
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
    slug: "galleri-tm51-machines-like-us",
    group: "event",
    client: "Galleri TM51",
    title: {
      no: "Machines Like Us",
      en: "Machines Like Us",
    },
    format: {
      no: "Utstillingsfilmer for TikTok og sosiale medier",
      en: "Exhibition films for TikTok and social media",
    },
    summary: {
      no: "Vi lagde innhold og promoteringsfilmer for Galleri TM51s utstilling Machines Like Us av den tyske kunstneren Jakob Grosse-Ophoff, kjent for kinetiske treskulpturer med hundrevis av millioner visninger i sosiale medier.",
      en: "We created content and promotional films for Galleri TM51's exhibition Machines Like Us by German artist Jakob Grosse-Ophoff, known for kinetic wooden sculptures that have generated hundreds of millions of views across social media.",
    },
    result: {
      no: "Klipp, animasjon, grafikk og lyd levert av oss rundt kunstnerens egne opptak for å gjøre utstillingen tydelig og delbar i TikTok-format.",
      en: "Editing, animation, graphics and sound by us around the artist's original footage, shaped into a clear and shareable TikTok-native format for the exhibition.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/team/tommy/portfolio/event/tm51-film-still.jpg",
    imageAlt: {
      no: "Filmscreenshot fra Machines Like Us hos Galleri TM51",
      en: "Film still from Machines Like Us at Galleri TM51",
    },
    mediaFit: "contain",
    externalVideo: tiktokAsset(
      "https://www.tiktok.com/@galleri_tm51/video/7556321128533200150?lang=en",
      {
        no: "Sculptures at TM51 - Jakob Grosse-Ophoff",
        en: "Sculptures at TM51 - Jakob Grosse-Ophoff",
      },
      "/assets/team/tommy/portfolio/event/tm51-film-still.jpg",
    ),
    palette: "from-[#131313] via-[#4d4034] to-[#a18b72]",
  },
  {
    slug: "fau-land-drone-archive",
    group: "commercial",
    client: "Fau&Land Film",
    title: {
      no: "Droneoppdrag og stock-opptak",
      en: "Drone assignments and stock footage",
    },
    format: {
      no: "Dronefilm og luftfoto",
      en: "Drone film and aerial footage",
    },
    summary: {
      no: "Et utvalg droneopptak filmet av oss i Fau&Land, bygget som et fleksibelt bibliotek for kampanjer, profileringsfilmer og innholdsproduksjon.",
      en: "A curated set of drone footage filmed by us at Fau&Land, built as a flexible library for campaigns, profile films and content production.",
    },
    result: {
      no: "Et eget bibliotek med luftfoto og etableringsbilder som kan brukes videre i nye produksjoner, både som rene dronefilmer og som stock i større prosjekter.",
      en: "An in-house library of aerial footage and establishing shots that can be reused in future productions, both as standalone drone films and as stock within larger projects.",
    },
    ctaLabel: viewReferenceCta,
    image: "/assets/services/posters/drone-poster.webp",
    imageAlt: {
      no: "Still fra Fau&Land sine droneopptak",
      en: "Still from Fau&Land's drone footage",
    },
    externalVideo: youtubeAsset("t5UFNzkM134", {
      no: "Droneoppdrag og stock-opptak",
      en: "Drone assignments and stock footage",
    }),
    palette: "from-[#162028] via-[#385567] to-[#89a7ba]",
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
    image: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
    imageAlt: {
      no: "Still fra Treningshuset-portrettfilm",
      en: "Still from the Treningshuset portrait film",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/treningshuset/videos/portrait/treningshuset-musikk-2-45-web.mp4",
      poster: "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
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
    image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
    imageAlt: {
      no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
      en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-villmarksforedrag-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
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
    image: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.webp",
    imageAlt: {
      no: "Jan Monsen og Mattis Thørud i promofilm for Våt, kald & sulten",
      en: "Jan Monsen and Mattis Thorud in the Wet, cold and hungry promo film",
    },
    video: {
      videoType: "direct",
      src: "/assets/portfolio/ville-gleder/videos/ville-gleder-vat-kald-sulten-web.mp4",
      poster: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.webp",
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
    image: "/assets/portfolio/inhouse/posters/liten-bedrift-poster.avif",
    imageAlt: {
      no: "Still fra in-house promoen Liten bedrift",
      en: "Still from the in-house promo Small business",
    },
    externalVideo: instagramAsset(
      "https://www.instagram.com/p/DILsOCiiT1X/",
      "DILsOCiiT1X",
      {
        no: "In-house promo: Liten bedrift",
        en: "In-house promo: Small business",
      },
      "/assets/portfolio/inhouse/posters/liten-bedrift-poster.avif",
    ),
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

export const portfolioProjects: PortfolioProject[] = portfolioProjectsBase.map((project) => {
  const structuredInfo = portfolioProjectInfoContent[project.slug];

  if (!structuredInfo) {
    return {
      ...project,
      shortDescription: project.shortDescription ?? project.summary,
      extendedDescription: project.extendedDescription ?? project.result ?? project.summary,
    };
  }

  return {
    ...project,
    ...structuredInfo,
    shortDescription: structuredInfo.shortDescription ?? project.shortDescription ?? project.summary,
    extendedDescription:
      structuredInfo.extendedDescription ?? project.extendedDescription ?? project.result ?? project.summary,
    result: structuredInfo.result ?? project.result,
  };
});

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
    image: "/assets/team/tommy/images/tommy-garland-profile.avif",
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
    image: "/assets/team/gard/images/gard-profile.avif",
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
