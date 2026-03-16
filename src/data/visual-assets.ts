import type { LocalizedText } from "@/lib/i18n";

export type VisualAsset = {
  filename: string;
  src: string;
  alt: LocalizedText;
  usage: LocalizedText;
  subject: LocalizedText;
  creator: string;
  license: string;
  sourceName: string;
  sourceUrl: string;
};

export const siteVisuals = {
  heroNature: {
    filename: "hero-cinematic-nature.webp",
    src: "/assets/visuals/hero/hero-cinematic-nature.webp",
    alt: {
      no: "Tåkete fjellandskap med stille vann",
      en: "Misty mountain landscape over calm water",
    },
    usage: {
      no: "Forsidehero og porteføljeintro",
      en: "Homepage hero and portfolio intro",
    },
    subject: {
      no: "Et dempet naturmotiv som gir filmisk romfølelse bak video og showreel.",
      en: "A restrained nature still that gives the video and showreel a cinematic sense of space.",
    },
    creator: "Brandon Zhang",
    license: "CC0 1.0",
    sourceName: "Openverse / WordPress Photo Directory",
    sourceUrl:
      "https://pd.w.org/2025/11/60690de04d00e321.99943027-2048x1365.jpg",
  },
  portfolioNature: {
    filename: "bg-cinematic-nature.webp",
    src: "/assets/visuals/backgrounds/bg-cinematic-nature.webp",
    alt: {
      no: "Tåkete naturbakgrunn i blågrå toner",
      en: "Misty nature backdrop in blue-grey tones",
    },
    usage: {
      no: "Bakgrunn i portefølje og som fallback i utvalgte seksjoner",
      en: "Backdrop in the portfolio and as a fallback in selected sections",
    },
    subject: {
      no: "Et rolig landskap som gir dybde uten å konkurrere med innholdet.",
      en: "A calm landscape that adds depth without competing with the content.",
    },
    creator: "Brandon Zhang",
    license: "CC0 1.0",
    sourceName: "Openverse / WordPress Photo Directory",
    sourceUrl:
      "https://pd.w.org/2025/11/60690de04d00e321.99943027-2048x1365.jpg",
  },
  aboutCrew: {
    filename: "section-film-crew-lighting.webp",
    src: "/assets/visuals/section-images/section-film-crew-lighting.webp",
    alt: {
      no: "Filmcrew som rigger lys og kamera innendørs",
      en: "Film crew rigging lights and camera indoors",
    },
    usage: {
      no: "Om oss-seksjonen",
      en: "About section",
    },
    subject: {
      no: "Et oversiktsbilde av crew, lys og kamera i arbeid.",
      en: "A wide still of crew, lighting and camera on set.",
    },
    creator: "ricardodiaz11",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/2792/4065908712_de5982ca96_b.jpg",
  },
  serviceCommercial: {
    filename: "section-commercial-film-set.webp",
    src: "/assets/visuals/section-images/section-commercial-film-set.webp",
    alt: {
      no: "Kamera og lys på et stylisert filmsett",
      en: "Camera and lighting on a stylised film set",
    },
    usage: {
      no: "Tjenestekort for reklamefilm",
      en: "Service card for commercial film",
    },
    subject: {
      no: "Et kontrollert sett med kamera, skygger og farget lys.",
      en: "A controlled set with camera, shadows and coloured light.",
    },
    creator: "Incase.",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/8386/8677772865_c70786205b_b.jpg",
  },
  serviceCompany: {
    filename: "section-company-film-production.webp",
    src: "/assets/visuals/section-images/section-company-film-production.webp",
    alt: {
      no: "Lysrigg og kamera satt opp for intervju eller bedriftsfilm",
      en: "Lighting rig and camera setup for interviews or company film",
    },
    usage: {
      no: "Tjenestekort for bedriftsfilm",
      en: "Service card for company film",
    },
    subject: {
      no: "Et dokumentarisk set-up som signaliserer produksjon, struktur og tillit.",
      en: "A documentary-style setup that signals production craft, structure and trust.",
    },
    creator: "ricardodiaz11",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/2792/4065908712_de5982ca96_b.jpg",
  },
  serviceSocial: {
    filename: "section-social-post-production.webp",
    src: "/assets/visuals/section-images/section-social-post-production.webp",
    alt: {
      no: "Mørk edit-suite med skjerm og tastatur",
      en: "Dark edit suite with screen and keyboard",
    },
    usage: {
      no: "Tjenestekort for innhold til sosiale medier",
      en: "Service card for social content",
    },
    subject: {
      no: "Et tett utsnitt fra postproduksjon som gir en mer teknisk og presis filmfølelse.",
      en: "A tight post-production detail that adds a more technical and precise film feel.",
    },
    creator: "Leon Terra",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/2813/13237194984_3804b47b67_b.jpg",
  },
  serviceEvent: {
    filename: "section-event-film-production.webp",
    src: "/assets/visuals/section-images/section-event-film-production.webp",
    alt: {
      no: "Kameraoperatør som filmer et arrangement",
      en: "Camera operator filming a live event",
    },
    usage: {
      no: "Tjenestekort for eventfilm og live",
      en: "Service card for event film and live coverage",
    },
    subject: {
      no: "Et liveopptak med kameraoperatør midt i hendelsen.",
      en: "A live capture with camera operator in the middle of the event.",
    },
    creator: "Dr. Walter Clement",
    license: "CC0 1.0",
    sourceName: "Openverse / Wikimedia Commons",
    sourceUrl:
      "https://upload.wikimedia.org/wikipedia/commons/7/79/Video_coverage_session_of_a_church_programme.jpg",
  },
  introDrone: {
    filename: "section-drone-cinematography.webp",
    src: "/assets/visuals/section-images/section-drone-cinematography.webp",
    alt: {
      no: "Drone i lufta for filmopptak",
      en: "Drone in the air for cinematic capture",
    },
    usage: {
      no: "Introseksjonen på forsiden",
      en: "Homepage intro section",
    },
    subject: {
      no: "Et teknisk, kommersielt luftopptak som utvider følelsen av produksjonsbredde.",
      en: "A technical aerial still that broadens the feeling of production range.",
    },
    creator: "Nagarjun",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/5700/20781939054_1c17219131_b.jpg",
  },
  footerProjector: {
    filename: "bg-dark-cinema-light.webp",
    src: "/assets/visuals/backgrounds/bg-dark-cinema-light.webp",
    alt: {
      no: "Projektorlys i mørkt rom",
      en: "Projector light in a dark room",
    },
    usage: {
      no: "Footer og mørke bakflater",
      en: "Footer and darker background surfaces",
    },
    subject: {
      no: "Et smalt lysfelt som gir footer og bakflater en kinolignende stemning.",
      en: "A narrow beam of light that gives the footer and darker surfaces a cinema-like mood.",
    },
    creator: "RVWithTito",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/4044/4236716778_554437f3b1_b.jpg",
  },
  cinematicLens: {
    filename: "cinematic-camera-lens-closeup.webp",
    src: "/assets/visuals/cinematic/cinematic-camera-lens-closeup.webp",
    alt: {
      no: "Mørkt nærbilde av et kameralinse",
      en: "Dark close-up of a camera lens",
    },
    usage: {
      no: "PageHero-bakgrunn og fallback i portefølje",
      en: "PageHero background and portfolio fallback",
    },
    subject: {
      no: "Et mørkt detaljbilde som forsterker følelsen av kamerahus, optikk og presisjon.",
      en: "A dark detail shot that reinforces a sense of camera body, optics and precision.",
    },
    creator: "Markus Spiske",
    license: "CC0 1.0",
    sourceName: "Openverse / rawpixel",
    sourceUrl:
      "https://images.rawpixel.com/editor_1024/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA2L2EwMTAtbWFya3Vzc3Bpc2tlLW1hcjE5LTE5MDItNDkxMS5qcGc.jpg",
  },
  cinematicProjector: {
    filename: "cinematic-projector-light.webp",
    src: "/assets/visuals/cinematic/cinematic-projector-light.webp",
    alt: {
      no: "Kjegle av projektorlys i mørket",
      en: "Cone of projector light in darkness",
    },
    usage: {
      no: "Overlay i hero og utvalgte mørke paneler",
      en: "Overlay in the hero and selected dark panels",
    },
    subject: {
      no: "Et projeksjonslys som tilfører et subtilt kinopreg.",
      en: "A projection beam that adds a subtle cinema feel.",
    },
    creator: "RVWithTito",
    license: "CC BY 2.0",
    sourceName: "Openverse / Flickr",
    sourceUrl: "https://live.staticflickr.com/4044/4236716778_554437f3b1_b.jpg",
  },
  grainTexture: {
    filename: "film-grain.png",
    src: "/assets/visuals/textures/film-grain.png",
    alt: {
      no: "Transparent film grain-tekstur",
      en: "Transparent film grain texture",
    },
    usage: {
      no: "Lavopasitets overlay over hele siden",
      en: "Low-opacity overlay across the site",
    },
    subject: {
      no: "Fin, transparent tekstur som bryter opp store flater.",
      en: "Fine transparent texture that breaks up large surfaces.",
    },
    creator: "Local generation",
    license: "Internal",
    sourceName: "Generated in workspace",
    sourceUrl: "",
  },
} satisfies Record<string, VisualAsset>;

export const servicePillarVisuals: Record<string, VisualAsset> = {
  "01": siteVisuals.serviceCommercial,
  "02": siteVisuals.serviceCompany,
  "03": siteVisuals.serviceSocial,
  "04": siteVisuals.serviceEvent,
};

export const serviceAreaVisuals: Record<string, VisualAsset> = {
  reklamefilm: siteVisuals.serviceCommercial,
  "bedriftsfilm-intervjuer": siteVisuals.serviceCompany,
  "some-innhold": siteVisuals.serviceSocial,
  "event-live": siteVisuals.serviceEvent,
};

export function getPortfolioFallbackVisual(group: string): VisualAsset {
  switch (group) {
    case "showreel":
      return siteVisuals.portfolioNature;
    case "campaign":
      return siteVisuals.serviceCommercial;
    case "narrative":
      return siteVisuals.cinematicLens;
    case "event":
      return siteVisuals.serviceEvent;
    case "documentary":
      return siteVisuals.portfolioNature;
    case "commercial":
      return siteVisuals.serviceSocial;
    default:
      return siteVisuals.cinematicLens;
  }
}

export const visualAssetCredits = Object.values(siteVisuals);
