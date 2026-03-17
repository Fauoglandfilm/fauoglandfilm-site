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

export type TommyFeaturedProject = {
  slug: string;
  title: LocalizedText;
  year?: string;
  role: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  mediaFit?: "cover" | "contain";
  credibility: [LocalizedText, LocalizedText];
};

export type TommySecondaryProjectItem = {
  title: LocalizedText;
  description: LocalizedText;
};

export type TommySecondaryProjectGroup = {
  slug: string;
  title: LocalizedText;
  items: TommySecondaryProjectItem[];
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

export const tommyProfilePage = {
  baseProfile: tommyBaseProfile,
  heroTitle: {
    no: "Produsent & partner i Fau&Land Film",
    en: "Producer & partner at Fau&Land Film",
  },
  heroIntro: {
    no: "Erfaring fra prisvinnende kortfilm, reklame og større produksjoner. Fokus på struktur, budsjett og gjennomføring som sikrer at prosjekter leveres riktig - hver gang.",
    en: "Experience from award-winning short film, advertising and larger productions. Focused on structure, budget and execution that keeps projects delivered right - every time.",
  },
  heroCtaPrimary: {
    no: "Book møte",
    en: "Book a meeting",
  },
  heroCtaSecondary: {
    no: "Se arbeid fra Fau&Land",
    en: "See work from Fau&Land",
  },
  keyRolesEyebrow: {
    no: "Kjerneansvar",
    en: "Core roles",
  },
  keyRolesTitle: {
    no: "Det Tommy typisk tar ansvar for.",
    en: "What Tommy typically takes ownership of.",
  },
  keyRoles: [
    {
      no: "Produsent og linjeprodusent for film, reklame og branded content",
      en: "Producer and line producer across film, advertising and branded content",
    },
    {
      no: "Prosjektledelse med ansvar for budsjett, plan og leveranse",
      en: "Project leadership covering budget, plan and delivery",
    },
    {
      no: "Erfaring fra festivalvinnende produksjoner og internasjonale prosjekter",
      en: "Experience from award-winning productions and international projects",
    },
    {
      no: "Sterk bakgrunn i salg, drift og struktur",
      en: "Strong background in sales, operations and structure",
    },
  ] satisfies LocalizedText[],
  featuredEyebrow: {
    no: "Utvalgte filmprosjekter",
    en: "Featured film projects",
  },
  featuredTitle: {
    no: "Fem produksjoner som raskt viser Tommy sitt produsentspor.",
    en: "Five productions that quickly show Tommy's producer track.",
  },
  featuredProjects: [
    {
      slug: "mirror-effect",
      title: {
        no: "Mirror Effect",
        en: "Mirror Effect",
      },
      year: "2021",
      role: {
        no: "Produsent",
        en: "Producer",
      },
      image: siteVisuals.cameraDarkroom.src,
      imageAlt: {
        no: "Visual for Mirror Effect",
        en: "Visual for Mirror Effect",
      },
      credibility: [
        {
          no: "Del av Tommy sitt festivalnære kortfilmspor.",
          en: "Part of Tommy's festival-facing short-film track.",
        },
        {
          no: "Produsentarbeid med fokus på struktur og gjennomføring.",
          en: "Producer work focused on structure and delivery.",
        },
      ],
    },
    {
      slug: "huldredans",
      title: {
        no: "Huldredans",
        en: "Huldredans",
      },
      year: "2023",
      role: {
        no: "Produsent / linjeprodusent",
        en: "Producer / line producer",
      },
      image: getPortfolioProject("huldredans").image ?? siteVisuals.folkPoster.src,
      imageAlt: getPortfolioProject("huldredans").imageAlt ?? siteVisuals.folkPoster.alt,
      mediaFit: "contain",
      credibility: [
        {
          no: "Prisvinnende kortfilm.",
          en: "Award-winning short film.",
        },
        {
          no: "Priser for film, regi, skuespiller, foto og originalmusikk.",
          en: "Awards for film, directing, acting, cinematography and original score.",
        },
      ],
    },
    {
      slug: "maura",
      title: {
        no: "Maura",
        en: "Maura",
      },
      role: {
        no: "Produsent",
        en: "Producer",
      },
      image: siteVisuals.studioLightBackdrop.src,
      imageAlt: {
        no: "Visual for Maura",
        en: "Visual for Maura",
      },
      credibility: [
        {
          no: "Del av Tommy sitt fortellende kortfilmspor.",
          en: "Part of Tommy's narrative short-film track.",
        },
        {
          no: "Produsentarbeid med fokus på plan, struktur og leveranse.",
          en: "Producer work centred on planning, structure and delivery.",
        },
      ],
    },
    {
      slug: "en-midnatts-vuggesang",
      title: {
        no: "En Midnatts Vuggesang",
        en: "A Midnight's Lullaby",
      },
      year: "2023",
      role: {
        no: "Produsent",
        en: "Producer",
      },
      image: getPortfolioProject("en-midnatts-vuggesang").image ?? siteVisuals.documentaryPoster.src,
      imageAlt:
        getPortfolioProject("en-midnatts-vuggesang").imageAlt ?? siteVisuals.documentaryPoster.alt,
      credibility: [
        {
          no: "Samprodusert med Snowfall Cinema.",
          en: "Co-produced with Snowfall Cinema.",
        },
        {
          no: "Nominert under Kortfilmfestivalen i Grimstad.",
          en: "Nominated at the Norwegian Short Film Festival in Grimstad.",
        },
      ],
    },
    {
      slug: "a-message-from-martha",
      title: {
        no: "A Message From Martha",
        en: "A Message From Martha",
      },
      year: "2025",
      role: {
        no: "Produsent",
        en: "Producer",
      },
      image: getPortfolioProject("a-message-from-martha").image ?? siteVisuals.narrativePoster.src,
      imageAlt:
        getPortfolioProject("a-message-from-martha").imageAlt ?? siteVisuals.narrativePoster.alt,
      mediaFit: "contain",
      credibility: [
        {
          no: "DeBlonde Production x Fau&Land Film.",
          en: "DeBlonde Production x Fau&Land Film.",
        },
        {
          no: "Regi: Elia Biondi. Foto: Justin Bellucci.",
          en: "Director: Elia Biondi. DOP: Justin Bellucci.",
        },
      ],
    },
  ] satisfies TommyFeaturedProject[],
  secondaryEyebrow: {
    no: "Andre prosjekter",
    en: "Other projects",
  },
  secondaryTitle: {
    no: "Erfaring fra større produksjoner, koordinering og kommersiell gjennomføring.",
    en: "Experience from larger productions, coordination and commercial delivery.",
  },
  secondaryGroups: [
    {
      slug: "tv-streaming",
      title: {
        no: "TV / streaming",
        en: "TV / streaming",
      },
      items: [
        {
          title: {
            no: "Royal Teen 2 / EXIT 3",
            en: "Royal Teen 2 / EXIT 3",
          },
          description: {
            no: "Koordinering og produksjonsstøtte i større produksjoner med høyt tempo.",
            en: "Coordination and production support on larger, fast-moving productions.",
          },
        },
        {
          title: {
            no: "Christmas Tomorrow",
            en: "Christmas Tomorrow",
          },
          description: {
            no: "On-set logistikk og gjennomføring i streamingproduksjon.",
            en: "On-set logistics and execution in a streaming production.",
          },
        },
        {
          title: {
            no: "Maskorama / Hodejegerne",
            en: "Maskorama / Headhunters",
          },
          description: {
            no: "Produksjonsflyt og koordinering når mange detaljer må sitte samtidig.",
            en: "Production flow and coordination when many details need to land at once.",
          },
        },
      ],
    },
    {
      slug: "wrangler-coordinator",
      title: {
        no: "Wrangler / coordinator",
        en: "Wrangler / coordinator",
      },
      items: [
        {
          title: {
            no: "Ølhunden Berit",
            en: "Ølhunden Berit",
          },
          description: {
            no: "Praktisk produksjonsstøtte og on-set flyt i et stramt opptaksløp.",
            en: "Hands-on production support and on-set flow in a tight shooting schedule.",
          },
        },
        {
          title: {
            no: "Featured extras og statistarbeid",
            en: "Featured extras and background work",
          },
          description: {
            no: "Ansvar for logistikk, tydelig kommunikasjon og trygg gjennomføring på sett.",
            en: "Responsibility for logistics, clear communication and calm execution on set.",
          },
        },
        {
          title: {
            no: "Større sett med høyt tempo",
            en: "Larger productions at high tempo",
          },
          description: {
            no: "Arbeid som krever presisjon, ro og rask problemløsning under press.",
            en: "Work that demands precision, calm and quick problem-solving under pressure.",
          },
        },
      ],
    },
    {
      slug: "commercial-workshops",
      title: {
        no: "Event / management work",
        en: "Event / management work",
      },
      items: [
        {
          title: {
            no: "Kulturarena",
            en: "Kulturarena",
          },
          description: {
            no: "Prosjektledelse, logistikk og kundedialog i leveranser med høy finish.",
            en: "Project leadership, logistics and client dialogue in high-finish deliveries.",
          },
        },
        {
          title: {
            no: "North Stars Acting Hub",
            en: "North Stars Acting Hub",
          },
          description: {
            no: "Internasjonale workshops med ansvar for trygg produksjonsflyt og gjennomføring.",
            en: "International workshops with responsibility for calm production flow and delivery.",
          },
        },
        {
          title: {
            no: "Både Og / HeiSjef / Ruter / Jac Skilt",
            en: "Både Og / HeiSjef / Ruter / Jac Skilt",
          },
          description: {
            no: "Kommersielle produksjoner der brief, budsjett og leveranse må henge tett sammen.",
            en: "Commercial productions where brief, budget and delivery need to stay tightly aligned.",
          },
        },
      ],
    },
  ] satisfies TommySecondaryProjectGroup[],
  managementEyebrow: {
    no: "Ledelse og drift",
    en: "Management and business",
  },
  managementTitle: {
    no: "Prosjekter med ansvar for struktur, drift og tydelig gjennomføring.",
    en: "Projects centred on structure, operations and clear execution.",
  },
  managementProjects: [
    {
      no: "North Stars Acting Hub",
      en: "North Stars Acting Hub",
    },
    {
      no: "Kulturarena",
      en: "Kulturarena",
    },
    {
      no: "The Key Collection",
      en: "The Key Collection",
    },
    {
      no: "Galleri TM51",
      en: "Galleri TM51",
    },
  ] satisfies LocalizedText[],
  ctaTitle: {
    no: "Book Tommy som produsent til ditt neste prosjekt",
    en: "Book Tommy as producer for your next project",
  },
  ctaDescription: {
    no: "Ta kontakt for omfang, budsjett og neste steg.",
    en: "Get in touch to discuss scope, budget and next steps.",
  },
  ctaPrimaryLabel: {
    no: "Book møte",
    en: "Book a meeting",
  },
  ctaSecondaryLabel: {
    no: "Kontakt",
    en: "Contact",
  },
  contactEmail: "tommy@fauoglandfilm.com",
  contactPhone: siteConfig.phonePrimary,
};
