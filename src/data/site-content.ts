export type MetricItem = {
  value: string;
  label: string;
};

export type VideoAsset = {
  src: string;
  poster?: string;
  label: string;
  mobileSrc?: string;
  hasEmbeddedText?: boolean;
};

export type NavItem = {
  href: string;
  label: string;
};

export type ClientLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
  scale?: number;
};

export type ServiceArea = {
  slug: string;
  title: string;
  summary: string;
  eyebrow: string;
  value: string;
  ctaLabel: string;
  href: string;
};

export type OfferPackage = {
  name: string;
  price: string;
  summary: string;
  idealFor: string;
  includes: string[];
  featured?: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export type PriceGuide = {
  title: string;
  range: string;
  detail: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  category: string;
  industry: string;
  summary: string;
  goal: string;
  solution: string;
  deliverables: string[];
  impact: string;
  metrics: MetricItem[];
  tags: string[];
  image?: string;
  imageAlt?: string;
  video?: VideoAsset;
  palette?: string;
  featured?: boolean;
  verificationNote?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export type TeamMember = {
  name: string;
  role: string;
  summary: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  company: string;
  note?: string;
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
  responseTime: "Vi svarer som regel innen 24 timer.",
  bookingHref: "/kontakt",
  bookingLabel: "Book et uforpliktende møte",
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
  title: "Film som blir sett.",
  description:
    "Vi lager video og visuelt innhold som bygger synlighet, tillit og flere henvendelser.",
  ctaLabel: "Book et uforpliktende møte",
  ctaHref: "/kontakt",
};

export const homeIntroContent = {
  eyebrow: "Oslo-basert produksjonspartner",
  title: "Video som gjør budskapet lettere å forstå og enklere å velge.",
  description:
    "Reklamefilm, SoMe-innhold, bedriftsfilm og eventproduksjon for selskaper som vil bli valgt oftere.",
};

// Hero-media styres her. Resten av siten bruker nå primært tekst, gradienter og placeholders.
export const videoLibrary = {
  hero: {
    src: "/media/hero/home-hero.mp4",
    mobileSrc: "/media/hero/home-hero-mobile.mp4",
    poster: "/media/placeholders/hero-poster.svg",
    label: "Vinterscene for Fau&Land Film",
    hasEmbeddedText: true,
  },
} satisfies Record<string, VideoAsset>;

export const navItems: NavItem[] = [
  { href: "/", label: "Forside" },
  { href: "/tjenester", label: "Tjenester" },
  { href: "/case", label: "Case" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
];

export const clientLogos: ClientLogo[] = [
  {
    name: "Front B Trading",
    src: "/media/logos/clients/front-b-trading.png",
    width: 1385,
    height: 958,
    scale: 0.9,
  },
  {
    name: "Client Logo 01",
    src: "/media/logos/clients/client-logo-01.png",
    width: 765,
    height: 782,
    scale: 0.84,
  },
  {
    name: "ISA",
    src: "/media/logos/clients/isa.png",
    width: 1507,
    height: 684,
    scale: 0.94,
  },
  {
    name: "Nei til Atomvåpen",
    src: "/media/logos/clients/nei-til-atomvapen.png",
    width: 1154,
    height: 844,
    scale: 0.88,
  },
  {
    name: "Foreningen Norden",
    src: "/media/logos/clients/foreningen-norden.png",
    width: 1306,
    height: 532,
    scale: 0.96,
  },
  {
    name: "Norske Bunader",
    src: "/media/logos/clients/norske-bunader.png",
    width: 476,
    height: 200,
    scale: 0.96,
  },
  {
    name: "Kulturarena",
    src: "/media/logos/clients/kulturarena.png",
    width: 1429,
    height: 399,
    scale: 1.02,
  },
  {
    name: "STUA",
    src: "/media/logos/clients/stua.png",
    width: 1510,
    height: 577,
    scale: 0.98,
  },
  {
    name: "Underoverskrift",
    src: "/media/logos/clients/underoverskrift.png",
    width: 746,
    height: 171,
    scale: 1.06,
  },
  {
    name: "Ville Gleder",
    src: "/media/logos/clients/ville-gleder.png",
    width: 1490,
    height: 500,
    scale: 1.02,
  },
  {
    name: "Actors Hub",
    src: "/media/logos/clients/actors-hub.png",
    width: 1500,
    height: 844,
    scale: 0.88,
  },
  {
    name: "Logo LD",
    src: "/media/logos/clients/logo-ld.png",
    width: 903,
    height: 987,
    scale: 0.8,
  },
];

export const serviceAreas: ServiceArea[] = [
  {
    slug: "reklamefilm",
    title: "Reklamefilm",
    summary: "Film som gjør det enklere å velge dere.",
    eyebrow: "Kampanje og lansering",
    value: "Konsept, produksjon og uttak til kampanjer, annonser og nettside.",
    ctaLabel: "Snakk med oss om reklamefilm",
    href: "/kontakt",
  },
  {
    slug: "some-innhold",
    title: "Innhold for sosiale medier",
    summary: "Video og uttak som holder merkevaren synlig over tid.",
    eyebrow: "Synlighet over tid",
    value: "Korte formater og visuelt innhold som er lett å publisere videre.",
    ctaLabel: "Få forslag til SoMe-innhold",
    href: "/kontakt",
  },
  {
    slug: "bedriftsfilm-employer-branding",
    title: "Bedriftsfilm og employer branding",
    summary: "Innhold som forklarer hvem dere er og hvorfor folk skal velge dere.",
    eyebrow: "Tillit og rekruttering",
    value: "Profilfilm, intervjuer og innhold som bygger troverdighet hos kunder og kandidater.",
    ctaLabel: "Få forslag til bedriftsfilm",
    href: "/kontakt",
  },
  {
    slug: "event-live",
    title: "Eventfilm og live produksjon",
    summary: "Dekning og innhold som gjør arrangementet verdifullt lenge etterpå.",
    eyebrow: "Event og etterbruk",
    value: "Live, flerkamera og uttak som kan brukes videre i markedsføring og oppfølging.",
    ctaLabel: "Planlegg eventproduksjon",
    href: "/kontakt",
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: "De er trollmenn. Høy profesjonalitet og kvalitet gjennom hele prosessen.",
    name: "Mattis Thørud",
    company: "Ville Gleder",
  },
  {
    quote: "Profesjonelle, kreative og engasjerte. De fanget essensen av budskapet vårt.",
    name: "Alexander Hellenes",
    company: "Vikingmaxtrading",
  },
  {
    quote: "Profesjonelle, dyktige og imøtekommende. Oppfølgingen føles nær og lavterskel.",
    name: "Gunnar Johnsen",
    company: "Nei til Atomvåpen",
  },
];

export const offerPackages: OfferPackage[] = [
  {
    name: "Starter",
    price: "Fra 15 000 kr / mnd",
    summary: "Et enkelt startpunkt for dere som trenger fast video uten å gjøre avtalen tung.",
    idealFor: "Mindre selskaper og organisasjoner som vil være synlige jevnlig.",
    includes: [
      "2 korte videoer per måned",
      "Enkel planlegging og manusstøtte",
      "Redigering i avtalte formater",
      "Månedlig statusmøte",
    ],
    ctaLabel: "Be om Starter-forslag",
    ctaHref: "/kontakt",
  },
  {
    name: "Vekst",
    price: "Fra 35 000 kr / mnd",
    summary: "For dere som vil bruke video aktivt i markedsføring, salg og sosiale medier.",
    idealFor: "SMB-er og organisasjoner med tydelige mål og behov for mer kontinuitet.",
    includes: [
      "4 videoer per måned",
      "Innholdsstrategi og publiseringsprioritering",
      "Enkel fotopakke eller ekstra uttak",
      "Prioriterte leveranser",
    ],
    featured: true,
    ctaLabel: "Book møte om Vekst",
    ctaHref: "/kontakt",
  },
  {
    name: "Partner",
    price: "Fra 65 000 kr / mnd",
    summary: "For team som trenger løpende produksjon, rask sparring og kort vei fra idé til publisering.",
    idealFor: "Selskaper med høyt aktivitetsnivå, kampanjer og flere flater i drift samtidig.",
    includes: [
      "Løpende kampanje- og innholdsproduksjon",
      "Tettere rådgivning og innholdsplanlegging",
      "Prioritert produksjonstid",
      "Fast kontaktperson og raskere oppfølging",
    ],
    ctaLabel: "Snakk med oss om Partner",
    ctaHref: "/kontakt",
  },
];

export const priceGuides: PriceGuide[] = [
  {
    title: "SoMe-klipp og kortformat",
    range: "Fra 5 000-20 000 kr+",
    detail: "Typisk for korte videoer, repurposing eller mindre opptak med raske uttak.",
  },
  {
    title: "Bedriftsfilm / reklamefilm",
    range: "Fra 20 000-100 000 kr+",
    detail: "Pris påvirkes av konsept, opptaksdager, crew, lokasjon og antall versjoner.",
  },
  {
    title: "Eventfilm og livestream",
    range: "Fra 15 000-60 000 kr+",
    detail: "Typisk for konferanser, høydepunktfilmer, intervjuer og streaming-oppsett.",
  },
  {
    title: "Kampanje med flere uttak",
    range: "Fra 100 000 kr+",
    detail: "Passer når video, foto og flere formatuttak skal bygges i samme produksjonsløp.",
  },
];

// Bytt ut tall, bilder og sitater her når flere verifiserte kundecaser er klare.
export const caseStudies: CaseStudy[] = [
  {
    slug: "ville-gleder",
    client: "Ville Gleder",
    title: "Promofilm og innhold som skapte synlighet og respons",
    category: "Kampanje",
    industry: "Opplevelser og foredrag",
    summary: "Promofilm og korte uttak som gjorde det enklere å bygge interesse rundt foredragene.",
    goal: "Trengte synlighet og innhold som kunne brukes på tvers av flere flater.",
    solution: "Vi leverte promofilm og korte uttak til nettside og sosiale medier.",
    deliverables: ["Kampanjefilm", "Korte SoMe-uttak", "Klipp til flere flater"],
    impact: "60 000+ visninger og tydelig respons rundt foredragene.",
    metrics: [
      { value: "60 000+", label: "visninger" },
      { value: "Flere", label: "henvendelser" },
      { value: "3+", label: "flater" },
    ],
    tags: ["Kampanje", "SoMe", "SMB"],
    palette: "from-[#2b1c16] via-[#101723] to-[#05070c]",
    featured: true,
  },
  {
    slug: "nei-til-atomvapen",
    client: "Nei til Atomvåpen",
    title: "Videokampanje som bidro til medlemsvekst",
    category: "Organisasjon",
    industry: "Ideell organisasjon",
    summary: "En kampanje der video skulle gjøre budskapet tydelig og senke terskelen for å melde seg inn.",
    goal: "Skape flere nye medlemmer og mer gjennomslag for kampanjen.",
    solution: "Vi utviklet videoinnhold med tydelig oppfordring til handling for digitale flater.",
    deliverables: ["Kampanjevideo", "Korte digitale uttak", "Tydelig CTA-struktur"],
    impact: "300+ nye medlemmer i løpet av tre måneder.",
    metrics: [
      { value: "300+", label: "nye medlemmer" },
      { value: "3 mnd", label: "kampanjeperiode" },
      { value: "1", label: "tydelig hovedhandling" },
    ],
    tags: ["Organisasjon", "Medlemsvekst", "Kampanje"],
    palette: "from-[#24120f] via-[#10131b] to-[#05070c]",
    featured: true,
  },
  {
    slug: "foreningen-norden",
    client: "Foreningen Norden",
    title: "Eventinnhold som styrket synlighet og videre bruk",
    category: "Event",
    industry: "Medlemsorganisasjon",
    summary: "Dekning og uttak som gjorde arrangement og organisasjonsarbeid lettere å vise frem videre.",
    goal: "Trengte innhold som både dokumenterte arrangementet og kunne brukes etterpå.",
    solution: "Vi kombinerte eventdekning, korte uttak og innhold til videre publisering.",
    deliverables: ["Eventdekning", "Korte uttak", "Innhold til videre publisering"],
    impact: "Sterkere synlighet og en tydeligere innholdsflate i videre kommunikasjon.",
    metrics: [
      { value: "Event", label: "dekning" },
      { value: "Flere", label: "uttak" },
      { value: "Videre", label: "bruk" },
    ],
    tags: ["Event", "Organisasjon", "Innhold"],
    palette: "from-[#241d18] via-[#101823] to-[#06080d]",
    featured: true,
    verificationNote: "Bytt inn konkret effekt eller kundeuttalelse her når den er verifisert.",
  },
  {
    slug: "lykseth-gard",
    client: "Lykseth Gård",
    title: "Visuelt innhold som gjorde en lokal merkevare tydeligere",
    category: "Promo",
    industry: "Lokalt næringsliv",
    summary: "Foto og video som gjorde tilbudet lettere å forstå og lettere å vise frem digitalt.",
    goal: "Trengte et tydeligere visuelt uttrykk for markedsføring og digitale flater.",
    solution: "Vi produserte foto og video som viste miljø, stemning og virksomheten i bruk.",
    deliverables: ["Promo-innhold", "Stills og uttak", "Korte klipp til markedsføring"],
    impact: "Et tydeligere visuelt uttrykk som gjorde markedsføringen enklere å bygge videre på.",
    metrics: [
      { value: "Foto + video", label: "kombinasjon" },
      { value: "Lokal", label: "forankring" },
      { value: "Brukbart", label: "til flere flater" },
    ],
    tags: ["Promo", "Innhold", "SMB"],
    palette: "from-[#34211a] via-[#121923] to-[#06070b]",
  },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Strategi",
    description: "Vi avklarer mål, budskap og hvor innholdet skal brukes.",
  },
  {
    step: "02",
    title: "Produksjon",
    description: "Vi planlegger, filmer og leder produksjonen med riktig nivå på crew.",
  },
  {
    step: "03",
    title: "Leveranse",
    description: "Dere får ferdige filmer og uttak i riktige formater.",
  },
  {
    step: "04",
    title: "Optimalisering",
    description: "Vi vurderer neste steg, nye uttak og videre bruk når det er relevant.",
  },
];

export const teamMembers: TeamMember[] = [
  {
    name: "Tommy R.A. Garland",
    role: "Partner, strategi og produksjon",
    summary: "Tommy jobber med strategi, produksjon og gjennomføring fra første møte til ferdig leveranse.",
  },
  {
    name: "Gard Ruben Fauske",
    role: "Partner, regi og visuell retning",
    summary: "Gard leder den kreative visjonen, regien og den visuelle kvaliteten gjennom hele prosjektet.",
  },
];

export const aboutBullets = [
  "Vi lager film og visuelt innhold med tydelig budskap og høy produksjonsverdi.",
  "Vi kombinerer kommersiell forståelse med filmfaglig presisjon.",
  "Ved behov setter vi sammen et utvidet crew av faste frilansere innen foto, lyd, animasjon og produksjon.",
];

export const pricingFaq: FaqItem[] = [
  {
    question: "Må vi velge en fast pakke?",
    answer:
      "Nei. Pakker brukes som et tydelig startpunkt. Mange kunder starter med ett prosjekt og går videre til en løpende avtale når de ser hva som fungerer.",
  },
  {
    question: "Er prisene faste?",
    answer:
      "Nei. Prisene er veiledende nivåer som gjør det enklere å forstå omfanget. Endelig pris avhenger av mål, antall opptaksdager, crew og hvor mange uttak dere trenger.",
  },
  {
    question: "Kan dere levere både video, foto, drone og livestream?",
    answer:
      "Ja. Vi kombinerer kjerneteam og et utvidet nettverk slik at dere kan samle mer av leveransen ett sted.",
  },
  {
    question: "Hvor raskt kan dere starte?",
    answer:
      "Vi svarer normalt innen 24 timer og kan ofte skissere et første oppsett i løpet av samme uke hvis briefen er tydelig.",
  },
];

export const contactFaq: FaqItem[] = [
  {
    question: "Hva skjer etter at vi tar kontakt?",
    answer:
      "Vi tar en kort prat for å forstå mål, tidslinje og hva innholdet skal brukes til. Deretter foreslår vi riktig oppsett.",
  },
  {
    question: "Tilbyr dere møte i Oslo?",
    answer:
      "Ja. Vi holder til i Oslo og kan møtes fysisk eller digitalt etter avtale.",
  },
  {
    question: "Kan vi få et prisestimat raskt?",
    answer:
      "Ja. Hvis dere vet litt om omfang, tidslinje og hva dere trenger, kan vi raskt gi et første estimat eller anbefale riktig nivå.",
  },
];

export const landingTemplateBullets = [
  "Tydelig budskap over folden",
  "Relevant sosial proof tidlig",
  "Kun én hovedhandling per side",
];
