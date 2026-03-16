import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import { portfolioProjects, siteConfig } from "@/data/site-content";
import { getFounderProfile } from "@/data/founder-profiles";
import { siteVisuals } from "@/data/visual-assets";
import type { LocalizedText } from "@/lib/i18n";

export type TommyFocusArea = {
  title: LocalizedText;
  description: LocalizedText;
};

export type TommyProjectCompanion = {
  slug: string;
  title: LocalizedText;
  summary?: LocalizedText;
  format?: LocalizedText;
  year?: string;
  image?: string;
  imageAlt?: LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  mediaFit?: "cover" | "contain";
};

export type TommyProject = {
  slug: string;
  client: string;
  title: LocalizedText;
  format: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  year?: string;
  image?: string;
  imageAlt?: LocalizedText;
  video?: VideoAsset;
  externalVideo?: ExternalVideoAsset;
  mediaFit?: "cover" | "contain";
  preview?: boolean;
  companions?: TommyProjectCompanion[];
};

export type TommyProjectGroup = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  projects: TommyProject[];
};

export type TommyLink = {
  label: LocalizedText;
  href: string;
};

const tommyBaseProfile =
  getFounderProfile("tommy-garland") ??
  (() => {
    throw new Error("Missing founder profile: tommy-garland");
  })();

function getPortfolioProject(slug: string) {
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Missing portfolio project: ${slug}`);
  }

  return project;
}

const projectGroups: TommyProjectGroup[] = [
  {
    slug: "producer-leadership",
    title: {
      no: "Produsentledelse og kommersiell gjennomføring",
      en: "Producer leadership and commercial execution",
    },
    description: {
      no: "Arbeid der Tommy holder brief, budsjett, logistikk og kundedialog samlet fra første plan til ferdig leveranse.",
      en: "Work where Tommy keeps the brief, budget, logistics and client communication aligned from the first plan through final delivery.",
    },
    projects: [
      {
        slug: "fau-land-kulturarena",
        client: "Fau&Land Film / Kulturarena",
        year: "2021-",
        title: {
          no: "Prosjekter som krever ro, kontroll og tydelig leveranse",
          en: "Projects that require calm, control and a clear delivery path",
        },
        format: {
          no: "Producer og prosjektledelse",
          en: "Producing and project leadership",
        },
        role: {
          no: "Producer, prosjektleder og linjeprodusent",
          en: "Producer, project lead and line producer",
        },
        summary: {
          no: "Fra Fau&Land og Kulturarena til reklameproduksjoner for Både Og, HeiSjef, Ruter og Jac Skilt: Tommy går tett på brief, budsjett, logistikk og kundedialog for å holde produksjonen ryddig hele veien.",
          en: "From Fau&Land and Kulturarena to commercial work for Både Og, HeiSjef, Ruter and Jac Skilt, Tommy stays close to the brief, budget, logistics and client dialogue to keep production steady all the way through.",
        },
        image: siteVisuals.filmStudioCyclorama.src,
        imageAlt: siteVisuals.filmStudioCyclorama.alt,
        companions: [
          {
            slug: "bade-og",
            title: {
              no: "Både Og",
              en: "Både Og",
            },
          },
          {
            slug: "heisjef-ruter-jac",
            title: {
              no: "HeiSjef, Ruter og Jac Skilt",
              en: "HeiSjef, Ruter and Jac Skilt",
            },
          },
          {
            slug: "norgesexpo-filmskolen",
            title: {
              no: "Norgesexpo og Filmskolen på Innlandet",
              en: "Norgesexpo and the Norwegian Film School",
            },
          },
        ],
      },
      {
        slug: "platform-productions",
        client: "Netflix / NRK / TV 2",
        year: "2020-2024",
        title: {
          no: "Streaming, TV og større sett med høyt tempo",
          en: "Streaming, TV and larger productions at a high tempo",
        },
        format: {
          no: "Koordinering og on-set roller",
          en: "Coordination and on-set roles",
        },
        role: {
          no: "Statist wrangler, koordinator og featured extras",
          en: "Background wrangler, coordinator and featured extras",
        },
        summary: {
          no: "Erfaring fra produksjoner som Christmas Tomorrow, Royal Teen 2, EXIT 3, Maskorama, Hodejegerne og Ølhunden Berit - arbeid som krever presisjon, trygg koordinering og høy leveringstakt under press.",
          en: "Experience from productions such as Christmas Tomorrow, Royal Teen 2, EXIT 3, Maskorama, Headhunters and Ølhunden Berit - work that demands precision, confident coordination and a high delivery tempo under pressure.",
        },
        image: siteVisuals.cameraDarkroom.src,
        imageAlt: siteVisuals.cameraDarkroom.alt,
        companions: [
          {
            slug: "christmas-tomorrow",
            title: {
              no: "Christmas Tomorrow",
              en: "Christmas Tomorrow",
            },
          },
          {
            slug: "royal-teen-2-exit",
            title: {
              no: "Royal Teen 2 / EXIT 3",
              en: "Royal Teen 2 / EXIT 3",
            },
          },
          {
            slug: "maskorama-hodejegerne",
            title: {
              no: "Maskorama / Hodejegerne",
              en: "Maskorama / Headhunters",
            },
          },
        ],
      },
    ],
  },
  {
    slug: "workshops-festival",
    title: {
      no: "Workshops og festivalnære kortfilmer",
      en: "Workshops and festival-facing short films",
    },
    description: {
      no: "Et kuratert spor som viser Tommy sitt arbeid på tvers av internasjonale workshops, produsentansvar og mer fortellende kortfilmproduksjoner.",
      en: "A curated track showing Tommy's work across international workshops, producing and more narrative short-film productions.",
    },
    projects: [
      {
        slug: "north-stars-acting-hub",
        client: "Sentinel Film / North Stars Acting Hub",
        year: "2023-2024",
        title: {
          no: "North Stars Acting Hub og The Actors Hub",
          en: "North Stars Acting Hub and The Actors Hub",
        },
        format: {
          no: "Workshop og showreel-produksjon",
          en: "Workshop and showreel production",
        },
        role: {
          no: "Producer og prosjektkoordinering",
          en: "Producer and project coordination",
        },
        summary: {
          no: "Tommy har produsert prosjekter og workshops med internasjonale profiler som David Nutter, Paul Johansson og Albert Hughes, med ansvar for både produksjonsflyt og trygg gjennomføring rundt deltakerne.",
          en: "Tommy has produced projects and workshops involving international names such as David Nutter, Paul Johansson and Albert Hughes, carrying both production flow and the practical execution around participants and delivery.",
        },
        image: getPortfolioProject("the-actors-hub-dont-act").image,
        imageAlt: getPortfolioProject("the-actors-hub-dont-act").imageAlt,
        companions: [
          {
            slug: "david-nutter",
            title: {
              no: "David Nutter",
              en: "David Nutter",
            },
          },
          {
            slug: "paul-johansson",
            title: {
              no: "Paul Johansson",
              en: "Paul Johansson",
            },
          },
          {
            slug: "albert-hughes",
            title: {
              no: "Albert Hughes",
              en: "Albert Hughes",
            },
          },
        ],
      },
      {
        slug: "festival-shorts",
        client: "Independent / Fau&Land Film",
        year: "2023-2025",
        title: {
          no: "A Message From Martha og utvalgte kortfilmer",
          en: "A Message From Martha and selected short films",
        },
        format: {
          no: "Kortfilm og festivalspor",
          en: "Short film and festival work",
        },
        role: {
          no: "Produsent og linjeprodusent",
          en: "Producer and line producer",
        },
        summary: {
          no: "Et tydelig produsentspor fra A Message From Martha videre til Huldredans, En Midnatts Vuggesang og annet arbeid i kortfilmfeltet, der Tommy holder struktur, økonomi og gjennomføring samlet rundt mer ambisiøse produksjoner.",
          en: "A clear producer-led track from A Message From Martha through to Huldredans, En Midnatts Vuggesang and other short-film work, where Tommy holds structure, budget and execution together around more ambitious productions.",
        },
        image: getPortfolioProject("a-message-from-martha").image,
        imageAlt: getPortfolioProject("a-message-from-martha").imageAlt,
        externalVideo: getPortfolioProject("a-message-from-martha").externalVideo,
        mediaFit: "contain",
        preview: true,
        companions: [
          {
            slug: "huldredans",
            title: {
              no: "Huldredans",
              en: "Huldredans",
            },
            year: "2023",
            format: {
              no: "Kortfilm",
              en: "Short film",
            },
            image: getPortfolioProject("huldredans").image,
            imageAlt: getPortfolioProject("huldredans").imageAlt,
            mediaFit: "contain",
          },
          {
            slug: "en-midnatts-vuggesang",
            title: {
              no: "En Midnatts Vuggesang",
              en: "A Midnight Lullaby",
            },
            year: "2023",
            format: {
              no: "Dramakortfilm",
              en: "Drama short",
            },
            image: getPortfolioProject("en-midnatts-vuggesang").image,
            imageAlt: getPortfolioProject("en-midnatts-vuggesang").imageAlt,
          },
          {
            slug: "maura-mirror-effect",
            title: {
              no: "Maura og Mirror Effect",
              en: "Maura and Mirror Effect",
            },
          },
        ],
      },
    ],
  },
];

const internalLinks: TommyLink[] = [
  {
    label: {
      no: "Se Fau&Land sitt arbeid",
      en: "See Fau&Land's work",
    },
    href: "/case",
  },
  {
    label: {
      no: "Se tjenester",
      en: "See services",
    },
    href: "/tjenester",
  },
  {
    label: {
      no: "Kontakt oss",
      en: "Contact us",
    },
    href: "/kontakt",
  },
];

export const tommyProfilePage = {
  baseProfile: tommyBaseProfile,
  heroTitle: {
    no: "Producer og partner",
    en: "Producer and partner",
  },
  heroIntro: {
    no: "Tommy holder brief, budsjett, gjennomføring og kundedialog samlet fra første møte til ferdig leveranse, med erfaring fra reklame, TV, event og festivalnære kortfilmer.",
    en: "Tommy keeps brief, budget, execution and client dialogue aligned from the first conversation through final delivery, with experience across advertising, TV, events and festival-facing short films.",
  },
  heroCtaPrimary: {
    no: "Snakk med Tommy om prosjektet",
    en: "Talk to Tommy about the project",
  },
  heroCtaSecondary: {
    no: "Se arbeid fra Fau&Land",
    en: "See work from Fau&Land",
  },
  introEyebrow: {
    no: "Kort bio",
    en: "Short bio",
  },
  introTitle: {
    no: "En produsentprofil bygget på kontroll, ro og tydelig fremdrift.",
    en: "A producer profile built around control, calm and clear momentum.",
  },
  introBody: {
    no: "Med bachelor fra Westerdals i Film og TV og produksjonsledelse fra Kristiania kombinerer Tommy kommersiell forståelse med praktisk prosjektstyring. Han trives best når mange detaljer må holdes samlet uten at tempoet eller kvaliteten faller.",
    en: "With a Film and TV bachelor's degree from Westerdals and production management studies from Kristiania, Tommy combines commercial understanding with practical project leadership. He does his best work when many details need to stay aligned without losing pace or quality.",
  },
  introFacts: [
    "Westerdals",
    "Kristiania",
    "Kulturarena",
    "Sentinel Film",
  ],
  focusEyebrow: {
    no: "Styrker",
    en: "Strengths",
  },
  focusAreas: [
    {
      title: {
        no: "Produsentansvar fra start til slutt",
        en: "Producer ownership from start to finish",
      },
      description: {
        no: "Holder brief, budsjett og leveranse samlet i ett tydelig produksjonsspor.",
        en: "Keeps brief, budget and delivery aligned in one clear production track.",
      },
    },
    {
      title: {
        no: "Prosjektflyt og kundedialog",
        en: "Project flow and client dialogue",
      },
      description: {
        no: "Skaper ro i prosessen og gjør det enklere å ta gode beslutninger underveis.",
        en: "Creates calm in the process and makes strong decisions easier along the way.",
      },
    },
    {
      title: {
        no: "Reklame, TV, event og kortfilm",
        en: "Advertising, TV, events and short film",
      },
      description: {
        no: "Bred erfaring på tvers av formater som krever presisjon og høy leveringstakt.",
        en: "Broad experience across formats that demand precision and a high delivery tempo.",
      },
    },
    {
      title: {
        no: "Gjennomføring under press",
        en: "Execution under pressure",
      },
      description: {
        no: "Trygg på logistikk, koordinering og teamledelse når produksjonen strammer seg til.",
        en: "Confident with logistics, coordination and team leadership when productions tighten up.",
      },
    },
  ] satisfies TommyFocusArea[],
  projectEyebrow: {
    no: "Utvalgte prosjekter",
    en: "Selected projects",
  },
  projectTitle: {
    no: "Et kuratert produsentspor med mer media og mindre CV-følelse.",
    en: "A curated producer-led body of work with more media and less CV energy.",
  },
  projectDescription: {
    no: "Kortfilm, workshop-produksjon og kommersielle leveranser presentert som case med større flater, tydeligere roller og mer visuell tyngde.",
    en: "Short film, workshop productions and commercial delivery work presented as cases with bigger surfaces, clearer roles and stronger visual weight.",
  },
  projectGroups,
  internalLinks,
  ctaTitle: {
    no: "Trenger dere en produsent som holder prosjektet rolig, stramt og i bevegelse?",
    en: "Need a producer who keeps the project calm, tight and moving?",
  },
  ctaDescription: {
    no: "Send en kort brief, så følger Tommy og Fau&Land opp med riktig omfang, team og neste steg.",
    en: "Send a short brief and Tommy together with Fau&Land will follow up with the right scope, team and next step.",
  },
  ctaPrimaryLabel: {
    no: "Send en kort brief",
    en: "Send a short brief",
  },
  ctaSecondaryLabel: {
    no: "Se porteføljen",
    en: "See the portfolio",
  },
  contactEmail: siteConfig.email,
  contactPhone: siteConfig.phonePrimary,
};
