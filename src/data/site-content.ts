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

export type ExternalVideoAsset = {
  provider: "youtube" | "vimeo";
  embedUrl: string;
  thumbnailSrc: string;
  label: LocalizedText;
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
  href: string;
  hrefExternal?: boolean;
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
    "Fau&Land Film lager reklamefilm, bedriftsfilm og innholdsproduksjon for bedrifter og organisasjoner som vil skape mer synlighet, mer tillit og flere henvendelser.",
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
    no: "Produksjonspartner i Oslo",
    en: "Production partner in Oslo",
  },
  title: {
    no: "Film til nettside, kampanjer, sosiale medier og arrangementer.",
    en: "Film for websites, campaigns, social channels and events.",
  },
  description: {
    no: "Vi jobber tett med bedrifter og organisasjoner som trenger tydelig budskap, høy kvalitet og korte beslutningslinjer.",
    en: "We work closely with companies and organisations that need a clearer message, higher quality and a shorter path to delivery.",
  },
};

export const portfolioPageContent = {
  eyebrow: {
    no: "Portefølje",
    en: "Portfolio",
  },
  title: {
    no: "Arbeid hentet fra dagens live-portefølje, ryddet til en klarere oversikt.",
    en: "Work pulled from the current live portfolio, rebuilt into a cleaner overview.",
  },
  description: {
    no: "Her finner dere reelle produksjoner fra Fau&Land Film, gruppert slik at det er lettere å se hva vi faktisk lager for kunder, organisasjoner og samarbeidspartnere.",
    en: "This page brings together verified Fau&Land Film productions in a clearer structure, so it is easier to see the kind of work we actually produce for clients, organisations and collaborators.",
  },
  showreelEyebrow: {
    no: "Showreel",
    en: "Showreel",
  },
  showreelTitle: {
    no: "En rask inngang til nyere arbeid.",
    en: "A fast way into recent work.",
  },
  showreelDescription: {
    no: "Showreelen samler nyere produksjoner fra kampanje, organisasjon, foredrag, musikkvideo og event i én kort introduksjon.",
    en: "The showreel brings together recent work across campaigns, organisations, talks, music video and events in one short introduction.",
  },
  showreelPrimaryCta: {
    no: "Åpne showreel",
    en: "Open showreel",
  },
  showreelSecondaryCta: {
    no: "Book et møte",
    en: "Book a meeting",
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

const squarespaceVideoUrl = (systemDataId: string, variant: string) =>
  `https://video.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/${systemDataId}/${variant}`;

export const navItems: NavItem[] = [
  { href: "/", label: { no: "Forside", en: "Home" } },
  { href: "/tjenester", label: { no: "Tjenester", en: "Services" } },
  { href: "/case", label: { no: "Portefølje", en: "Portfolio" } },
  { href: "/om-oss", label: { no: "Om oss", en: "About" } },
  { href: "/kontakt", label: { no: "Kontakt", en: "Contact" } },
];

// Curated active set from clients/COLOR. Placeholder/uncertain files are excluded from the marquee.
export const clientLogos: ClientLogo[] = [
  {
    name: "Nei til Atomvåpen",
    src: "/media/logos/clients/COLOR/nei-til-atomvapen.png",
    width: 1154,
    height: 844,
    scale: 0.9,
  },
  {
    name: "Foreningen Norden",
    src: "/media/logos/clients/COLOR/foreningen-norden.png",
    width: 1306,
    height: 532,
    scale: 0.96,
  },
  {
    name: "Ville Gleder",
    src: "/media/logos/clients/COLOR/ville-gleder.png",
    width: 1490,
    height: 500,
    scale: 1,
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
      no: "Bedriftsfilm",
      en: "Company film",
    },
    summary: {
      no: "Video som forklarer hvem dere er, hva dere tilbyr og hvorfor folk skal stole på dere.",
      en: "Video that explains who you are, what you offer and why people should trust your company.",
    },
  },
  {
    eyebrow: "03",
    title: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
    summary: {
      no: "Video til sosiale medier som holder merkevaren synlig uten at dere trenger å produsere alt selv.",
      en: "Video for social media that keeps your brand visible without forcing your team to produce everything in-house.",
    },
  },
  {
    eyebrow: "04",
    title: {
      no: "Eventfilm og live",
      en: "Event film and live",
    },
    summary: {
      no: "Dekning og uttak som gjør at arrangementet fortsetter å jobbe etter at dagen er over.",
      en: "Coverage and cutdowns that keep the event working long after the day itself is over.",
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
    no: "Fau&Land Film er et Oslo-basert produksjonsselskap ledet av Gard Ruben Fauske og Tommy R.A. Garland. Vi lager reklamefilm, bedriftsfilm, innhold for sosiale medier og eventfilm for bedrifter og organisasjoner som vil være tydeligere i markedet.",
    en: "Fau&Land Film is an Oslo-based production company led by Gard Ruben Fauske and Tommy R.A. Garland. We create commercials, company films, social content and event films for companies and organisations that want to show up more clearly in the market.",
  },
  image: "/media/team/tommy-gard.png",
  imageAlt: {
    no: "Tommy Garland og Gard Ruben Fauske",
    en: "Tommy Garland and Gard Ruben Fauske",
  },
  stats: [
    { value: "2", label: { no: "seniorer", en: "seniors" } },
    { value: "Oslo", label: { no: "base", en: "base" } },
    { value: "24 t", label: { no: "første respons", en: "first reply" } },
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
    slug: "bedriftsfilm-intervjuer",
    title: { no: "Bedriftsfilm og intervjuer", en: "Company film and interviews" },
    summary: {
      no: "Film som forklarer hvem dere er, hva dere tilbyr og hvorfor det er trygt å velge dere.",
      en: "Film that explains who you are, what you offer and why your company is a safe choice.",
    },
    eyebrow: { no: "Tillit og tydelighet", en: "Trust and clarity" },
    value: {
      no: "Bedriftsfilm, intervjuer og profilinnhold til nettside, presentasjoner og salg.",
      en: "Company films, interviews and profile content for websites, presentations and sales.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
  {
    slug: "some-innhold",
    title: {
      no: "Innhold for sosiale medier",
      en: "Social media content",
    },
    summary: {
      no: "Innhold som holder dere synlige mellom kampanjer, lanseringer og større produksjoner.",
      en: "Content that keeps your brand visible between campaigns, launches and larger productions.",
    },
    eyebrow: { no: "Publisering over tid", en: "Ongoing publishing" },
    value: {
      no: "Korte videoer, reels og uttak til Facebook, Instagram, LinkedIn og andre flater dere faktisk bruker.",
      en: "Short videos, reels and cutdowns for Facebook, Instagram, LinkedIn and the channels you actually publish on.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
  },
  {
    slug: "event-live",
    title: { no: "Eventfilm og live", en: "Event film and live" },
    summary: {
      no: "Eventfilm og livesendinger som lar innholdet leve videre etter at dagen er over.",
      en: "Event films and live production that keep the content working after the day itself is over.",
    },
    eyebrow: { no: "Arrangement og etterbruk", en: "Events and reuse" },
    value: {
      no: "Stemningsfilmer, aftermovies, intervjuer, flerkamera, streaming og klipp til videre publisering.",
      en: "Mood films, aftermovies, interviews, multicam setups, livestreaming and cutdowns for continued publishing.",
    },
    ctaLabel: { no: "Snakk med oss om prosjektet", en: "Talk to us about your project" },
    href: "/kontakt",
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
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/R-hb11Atssc?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/R-hb11Atssc/hqdefault.jpg",
      label: {
        no: "Bli med i kampen mot atomvåpen",
        en: "Join the fight against nuclear weapons",
      },
    },
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
    video: {
      src: squarespaceVideoUrl("1d79dac6-f46b-48c8-a623-73420ab8b49b", "1920:1080"),
      label: {
        no: "Ville Gleder - Villmarkspromo",
        en: "Ville Gleder wilderness promo",
      },
    },
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
      no: "En kort film som viser Foreningen Norden og arbeidet de gjør, bygget på tidligere opptak, eget materiale og animasjon.",
      en: "A short film that presents Foreningen Norden and the work they do, built from earlier footage, self-shot material and animation.",
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
      src: squarespaceVideoUrl("cf67837a-3fba-462c-9c71-99bb2842bb94", "1920:1080"),
      label: {
        no: "Foreningen Norden - nettsideinnhold",
        en: "Foreningen Norden website content",
      },
    },
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
  },
  {
    slug: "nei-til-atomvapen-konferanse",
    client: "Nei til Atomvåpen",
    title: {
      no: "Konferansefilm for medlemskampanje",
      en: "Conference film for a membership campaign",
    },
    category: { no: "Eventfilm", en: "Event film" },
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
      { no: "Eventfilm", en: "Event film" },
      { no: "Organisasjon", en: "Organisation" },
      { no: "Medlemsarbeid", en: "Membership outreach" },
    ],
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/N4b3Co-hgLE?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/N4b3Co-hgLE/hqdefault.jpg",
      label: {
        no: "Nei til Atomvåpens medlemskonferanse 2025",
        en: "Nei til Atomvåpen membership conference 2025",
      },
    },
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
  {
    slug: "nei-til-atomvapen-arbeiderdagen",
    client: "Nei til Atomvåpen",
    title: {
      no: "1. mai-dekning fra Youngstorget",
      en: "1 May coverage from Youngstorget",
    },
    category: { no: "Eventfilm og SoMe", en: "Event film and social content" },
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
      { no: "Eventfilm", en: "Event film" },
      { no: "Sosiale medier", en: "Social media" },
      { no: "Stillbilder", en: "Stills" },
    ],
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/STycvvvjsWY?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/STycvvvjsWY/hqdefault.jpg",
      label: {
        no: "Stemningsfilm fra 1. mai 2025",
        en: "Mood film from 1 May 2025",
      },
    },
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
];

export const portfolioGroups: PortfolioGroup[] = [
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
    slug: "talks",
    title: {
      no: "Opplevelser og foredrag",
      en: "Talks and experiences",
    },
    description: {
      no: "Promofilmer som gjør det enklere å selge inn foredrag, opplevelser og konsepter.",
      en: "Promo films that make talks, experiences and concepts easier to sell in.",
    },
  },
  {
    slug: "storytelling",
    title: {
      no: "Musikkvideo og narrativt arbeid",
      en: "Music video and narrative work",
    },
    description: {
      no: "Prosjekter der stemning, karakter og fortelling får mer plass.",
      en: "Projects where mood, character and story get more room.",
    },
  },
  {
    slug: "event",
    title: {
      no: "Event og dokumentasjon",
      en: "Events and documentation",
    },
    description: {
      no: "Produksjoner som dokumenterer arrangementer og gir innhold som kan leve videre etterpå.",
      en: "Productions that document events and create content that keeps working afterwards.",
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
      no: "Et raskt innblikk i nyere arbeid innen kampanje, organisasjon, foredrag, musikkvideo og event.",
      en: "A quick look at recent work across campaigns, organisations, talks, music video and events.",
    },
    href: "https://vimeo.com/1049265590",
    hrefExternal: true,
    ctaLabel: {
      no: "Åpne showreel",
      en: "Open showreel",
    },
    externalVideo: {
      provider: "vimeo",
      embedUrl: "https://player.vimeo.com/video/1049265590?app_id=122963",
      thumbnailSrc:
        "https://i.vimeocdn.com/video/1973576802-81881026755638ae5a47531ced8b76034558c75e44220d4d1cb4876180ce8df2-d_295x166?region=us",
      label: {
        no: "Showreel 2025",
        en: "Showreel 2025",
      },
    },
    palette: "from-[#efe6db] via-[#d8cab9] to-[#c0a98d]",
    featured: true,
  },
  {
    slug: "nei-til-atomvapen",
    group: "campaign",
    client: "Nei til Atomvåpen",
    title: {
      no: "Bli med i kampen mot atomvåpen",
      en: "Join the fight against nuclear weapons",
    },
    format: {
      no: "Kampanjefilm",
      en: "Campaign film",
    },
    summary: {
      no: "Dokumentarisk hovedfilm laget for å gjøre saken tydelig og senke terskelen for å bli med.",
      en: "A documentary-style hero film designed to clarify the cause and lower the barrier to getting involved.",
    },
    result: {
      no: "Brukt som hovedfilm i vervekampanje og videre innhold.",
      en: "Used as the hero film across the membership campaign and follow-up content.",
    },
    href: "/case/nei-til-atomvapen",
    ctaLabel: {
      no: "Se case",
      en: "View case",
    },
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/R-hb11Atssc?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/R-hb11Atssc/hqdefault.jpg",
      label: {
        no: "Bli med i kampen mot atomvåpen",
        en: "Join the fight against nuclear weapons",
      },
    },
    palette: "from-[#f1e6db] via-[#d7c5b2] to-[#bb9e84]",
  },
  {
    slug: "ville-gleder-villmarksforedrag",
    group: "talks",
    client: "Ville Gleder",
    title: {
      no: "Villmarksforedrag",
      en: "Wilderness talks",
    },
    format: {
      no: "Promofilm",
      en: "Promo film",
    },
    summary: {
      no: "Promofilm for Ville Gleders villmarksforedrag med Mattis Thørud og Jan Monsen.",
      en: "Promo film for Ville Gleders wilderness talks with Mattis Thørud and Jan Monsen.",
    },
    result: {
      no: "60 000+ visninger og flere påmeldinger.",
      en: "60,000+ views and more sign-ups.",
    },
    href: "/case/ville-gleder",
    ctaLabel: {
      no: "Se case",
      en: "View case",
    },
    video: {
      src: squarespaceVideoUrl("1d79dac6-f46b-48c8-a623-73420ab8b49b", "1920:1080"),
      label: {
        no: "Ville Gleder - Villmarksforedrag",
        en: "Ville Gleder wilderness talks",
      },
    },
    palette: "from-[#efe6da] via-[#d3c3ae] to-[#bda383]",
  },
  {
    slug: "kommer-hjem-musikkvideo",
    group: "storytelling",
    client: "Klaus Perry",
    title: {
      no: "Kommer Hjem",
      en: "Coming Home",
    },
    format: {
      no: "Musikkvideo",
      en: "Music video",
    },
    summary: {
      no: "Fortellende musikkvideo om å finne veien hjem igjen, med en mer leken og filmatisk tone.",
      en: "A narrative music video about finding the way home again, with a playful and cinematic tone.",
    },
    href: "https://www.youtube.com/watch?v=Y3eowK_YMes",
    hrefExternal: true,
    ctaLabel: {
      no: "Åpne film",
      en: "Open film",
    },
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/Y3eowK_YMes?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/Y3eowK_YMes/hqdefault.jpg",
      label: {
        no: "Kommer Hjem",
        en: "Coming Home",
      },
    },
    palette: "from-[#efe4d8] via-[#d5c5b1] to-[#b99e82]",
  },
  {
    slug: "a-message-from-martha",
    group: "storytelling",
    client: "Fau&Land Film",
    title: {
      no: "A Message From Martha",
      en: "A Message From Martha",
    },
    format: {
      no: "Kortfilm",
      en: "Short film",
    },
    summary: {
      no: "Kortfilm med tydelig visuell identitet og en strammere fortellende form.",
      en: "A short film with a distinct visual identity and a tighter narrative form.",
    },
    href: "https://www.youtube.com/watch?v=FiT05lgz00o",
    hrefExternal: true,
    ctaLabel: {
      no: "Åpne film",
      en: "Open film",
    },
    image:
      "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/f06bd374-263e-45b9-9417-35dd398ac22b/A+MESSAGE+FROM+MARTHA.jpg",
    imageAlt: {
      no: "Plakat for A Message From Martha",
      en: "Poster for A Message From Martha",
    },
    mediaFit: "contain",
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/FiT05lgz00o?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/FiT05lgz00o/hqdefault.jpg",
      label: {
        no: "A Message From Martha",
        en: "A Message From Martha",
      },
    },
    palette: "from-[#28171a] via-[#5a232d] to-[#b14f54]",
  },
  {
    slug: "foreningen-norden-nettsideinnhold",
    group: "campaign",
    client: "Foreningen Norden",
    title: {
      no: "Nettsideinnhold",
      en: "Website content",
    },
    format: {
      no: "Organisasjonsfilm",
      en: "Organisation film",
    },
    summary: {
      no: "Film som raskt forklarer hvem Foreningen Norden er og hva de jobber for.",
      en: "A short film that quickly explains who Foreningen Norden are and what they work for.",
    },
    result: {
      no: "Bygget av tidligere produksjoner, kundemateriale og nye animasjoner.",
      en: "Built from earlier productions, client material and new animation.",
    },
    href: "/case/foreningen-norden",
    ctaLabel: {
      no: "Se case",
      en: "View case",
    },
    video: {
      src: squarespaceVideoUrl("cf67837a-3fba-462c-9c71-99bb2842bb94", "1920:1080"),
      label: {
        no: "Foreningen Norden - nettsideinnhold",
        en: "Foreningen Norden website content",
      },
    },
    palette: "from-[#efe9df] via-[#d6cabc] to-[#bfa98c]",
  },
  {
    slug: "nei-til-atomvapen-arbeiderdagen",
    group: "event",
    client: "Nei til Atomvåpen",
    title: {
      no: "Internasjonal arbeiderdag",
      en: "International Workers' Day",
    },
    format: {
      no: "Eventfilm og SoMe",
      en: "Event film and social content",
    },
    summary: {
      no: "Film, foto og reels fra markeringen på Youngstorget, levert som både stemningsfilm og uttak til egne kanaler.",
      en: "Film, stills and reels from the Youngstorget event, delivered as both a mood film and cutdowns for owned channels.",
    },
    result: {
      no: "Stemningsfilm, fullt opptak av tale og vertikale uttak fra samme dag.",
      en: "Mood film, full speech recording and vertical cutdowns from the same day.",
    },
    href: "/case/nei-til-atomvapen-arbeiderdagen",
    ctaLabel: {
      no: "Se case",
      en: "View case",
    },
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/STycvvvjsWY?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/STycvvvjsWY/hqdefault.jpg",
      label: {
        no: "Stemningsfilm fra 1. mai 2025",
        en: "Mood film from 1 May 2025",
      },
    },
    palette: "from-[#efe5d8] via-[#d6c5b3] to-[#bb9e82]",
  },
  {
    slug: "nei-til-atomvapen-konferanse",
    group: "event",
    client: "Nei til Atomvåpen",
    title: {
      no: "Konferanse",
      en: "Conference",
    },
    format: {
      no: "Eventfilm",
      en: "Event film",
    },
    summary: {
      no: "Stemningsfilm produsert fra medlemskonferansen som del av organisasjonens pågående rekrutteringskampanje.",
      en: "A mood film produced from the membership conference as part of the organisation's ongoing recruitment campaign.",
    },
    href: "/case/nei-til-atomvapen-konferanse",
    ctaLabel: {
      no: "Se case",
      en: "View case",
    },
    externalVideo: {
      provider: "youtube",
      embedUrl: "https://www.youtube.com/embed/N4b3Co-hgLE?feature=oembed",
      thumbnailSrc: "https://i.ytimg.com/vi/N4b3Co-hgLE/hqdefault.jpg",
      label: {
        no: "Nei til Atomvåpen - konferanse",
        en: "Nei til Atomvåpen conference",
      },
    },
    palette: "from-[#f0e7dc] via-[#d7c9b7] to-[#bea58c]",
  },
  {
    slug: "ville-gleder-vat-kald-sulten",
    group: "talks",
    client: "Ville Gleder",
    title: {
      no: "Våt, kald og sulten",
      en: "Wet, cold and hungry",
    },
    format: {
      no: "Promofilm",
      en: "Promo film",
    },
    summary: {
      no: "Promovideo for foredraget «Våt, kald og sulten», bygget for å selge inn konseptet med en tydelig idé.",
      en: "Promo video for the talk “Wet, cold and hungry”, built to sell the concept through a clear idea.",
    },
    href: "https://vimeo.com/1026680392/4efd6be7db",
    hrefExternal: true,
    ctaLabel: {
      no: "Åpne film",
      en: "Open film",
    },
    externalVideo: {
      provider: "vimeo",
      embedUrl: "https://player.vimeo.com/video/1026680392?h=4efd6be7db&app_id=122963",
      thumbnailSrc:
        "https://i.vimeocdn.com/video/1946636194-5efaf5b2f1225b48271ed21aaff6dc6af575a583f0e74386b550216b5defb4ff-d_295x166",
      label: {
        no: "Ville Gleder - Våt, kald og sulten",
        en: "Ville Gleder - Wet, cold and hungry",
      },
    },
    palette: "from-[#ede3d6] via-[#d4c3b0] to-[#baa184]",
  },
  {
    slug: "sprakprisen-2022-aftermovie",
    group: "event",
    client: "Foreningen Norden",
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
    href: "https://fauoglandfilm.com/portofolio",
    hrefExternal: true,
    ctaLabel: {
      no: "Se referansen",
      en: "View reference",
    },
    image:
      "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/cfb30bea-aadb-4fb3-a3f7-b6fa41b60ac4/Skjermbilde+2024-12-17+kl.+14.22.29.png",
    imageAlt: {
      no: "Stillbilde fra Språkprisen 2022",
      en: "Still from the 2022 Language Prize",
    },
    palette: "from-[#ebe4d8] via-[#d1c2af] to-[#b69d82]",
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
    role: { no: "Produsent og prosjektleder", en: "Producer and project lead" },
    summary: {
      no: "Tommy holder oversikt over planlegging, gjennomføring og kundedialog, slik at prosjektet beveger seg ryddig fra første møte til ferdig leveranse.",
      en: "Tommy keeps planning, execution and client dialogue moving so the project stays clear from the first call to final delivery.",
    },
  },
  {
    name: "Gard Ruben Fauske",
    role: { no: "Produsent, regissør og klipper", en: "Producer, director and editor" },
    summary: {
      no: "Gard har bakgrunn fra filmstudier i Norge og Los Angeles, freelancearbeid og prosjektledelse i reklamebyrå. Han skriver, regisserer og klipper prosjektene sine.",
      en: "Gard brings experience from film studies in Norway and Los Angeles, freelance work and project management in advertising. He writes, directs and edits his projects.",
    },
  },
];

export const aboutBullets = [
  {
    no: "Fau&Land Film er et Oslo-basert produksjonsselskap ledet av Gard Ruben Fauske og Tommy R.A. Garland.",
    en: "Fau&Land Film is an Oslo-based production company led by Gard Ruben Fauske and Tommy R.A. Garland.",
  },
  {
    no: "Gard har bakgrunn fra filmstudier i Norge og Los Angeles, freelancearbeid og prosjektledelse i reklamebyrå.",
    en: "Gard brings experience from film studies in Norway and Los Angeles, freelance work and project management in advertising.",
  },
  {
    no: "Vi holder prosjektene tett, med kort vei mellom planlegging, opptak og ferdig leveranse.",
    en: "We keep projects close, with a short path between planning, production and delivery.",
  },
];

export const pricingFaq: FaqItem[] = [
  {
    question: { no: "Hva koster et videoprosjekt?", en: "What does a video project cost?" },
    answer: {
      no: "Pris avhenger av omfang, men typiske nivåer er 5 000-20 000 kr for kort SoMe-innhold, 20 000-100 000 kr+ for promofilm eller reklamefilm og 15 000-60 000 kr+ for eventfilm.",
      en: "Pricing depends on scope, but typical levels are NOK 5,000-20,000 for short-form social content, NOK 20,000-100,000+ for promo films or commercials, and NOK 15,000-60,000+ for event films.",
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
    question: {
      no: "Kan dere levere drone og livestream?",
      en: "Can you deliver drone and livestreaming?",
    },
    answer: {
      no: "Ja. Vi setter sammen riktig team rundt prosjektet og kan levere både droneopptak, flerkamera og livestream når det trengs.",
      en: "Yes. We build the right team around the project and can deliver drone footage, multicam production and livestreaming when needed.",
    },
  },
  {
    question: { no: "Hva trenger dere for å gi et estimat?", en: "What do you need to give an estimate?" },
    answer: {
      no: "Send oss kort hva dere vil oppnå, hvor filmen skal brukes og når dere trenger den. Da kan vi raskt foreslå riktig oppsett og prisnivå.",
      en: "Send us a short brief with what you want to achieve, where the film will be used and when you need it. That lets us recommend the right setup and price level quickly.",
    },
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: { no: "Hva lager Fau&Land Film?", en: "What does Fau&Land Film create?" },
    answer: {
      no: "Vi lager reklamefilm, bedriftsfilm, innhold for sosiale medier og eventfilm for bedrifter og organisasjoner som trenger tydeligere kommunikasjon.",
      en: "We create commercials, company films, social content and event films for companies and organisations that need clearer communication.",
    },
  },
  {
    question: { no: "Hvem jobber dere med?", en: "Who do you work with?" },
    answer: {
      no: "Vi jobber med bedrifter, organisasjoner og team som trenger film til nettside, kampanjer, sosiale medier eller arrangementer.",
      en: "We work with companies, organisations and teams that need film for websites, campaigns, social channels or events.",
    },
  },
  {
    question: { no: "Hva skjer etter at vi tar kontakt?", en: "What happens after we get in touch?" },
    answer: {
      no: "Vi følger opp innen 24 timer, tar en kort prat om mål og tidslinje, og foreslår riktig format, omfang og neste steg.",
      en: "We follow up within 24 hours, have a short call about goals and timeline, and recommend the right format, scope and next step.",
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
