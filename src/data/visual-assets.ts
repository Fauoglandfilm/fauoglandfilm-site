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

export type VisualSet = {
  primary: VisualAsset;
  secondary?: VisualAsset;
  tertiary?: VisualAsset;
};

const internalAssetMeta = {
  creator: "Fau&Land Film portfolio",
  license: "Internal / portfolio-owned",
  sourceName: "Project posters and team assets in workspace",
  sourceUrl: "",
} as const;

export const siteVisuals = {
  introShowcase: {
    filename: "portfolio-ville-gleder-wilderness-poster.jpg",
    src: "/assets/portfolio/ville-gleder/posters/villmarksforedrag-poster.jpg",
    alt: {
      no: "Cinematic still fra Ville Gleder-produksjon",
      en: "Cinematic still from the Ville Gleder production",
    },
    usage: {
      no: "Introseksjon og forsidestøtte",
      en: "Intro section and homepage support",
    },
    subject: {
      no: "Et ekte prosjektstill som gir mer filmfølelse enn generisk stock.",
      en: "A real project still that feels more cinematic than generic stock.",
    },
    ...internalAssetMeta,
  },
  commercialCampaign: {
    filename: "portfolio-atomvapen-campaign-still.png",
    src: "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.png",
    alt: {
      no: "Still fra kampanjefilm for Nei til Atomvåpen",
      en: "Still from the campaign film for No to Nuclear Weapons",
    },
    usage: {
      no: "Reklamefilm og kampanjer",
      en: "Commercial and campaign sections",
    },
    subject: {
      no: "Kampanjedrevet uttrykk brukt som premium erstatning for stock.",
      en: "Campaign-led imagery used as a premium replacement for stock photography.",
    },
    ...internalAssetMeta,
  },
  companyStory: {
    filename: "portfolio-foreningen-norden-film-still.png",
    src: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
    alt: {
      no: "Still fra nettsidefilm for Foreningen Norden",
      en: "Still from website film for Foreningen Norden",
    },
    usage: {
      no: "Bedriftsfilm og organisasjonsfilm",
      en: "Company and organisation film sections",
    },
    subject: {
      no: "Et rolig stillbilde fra faktisk kundearbeid med tydelig filmatisk kvalitet.",
      en: "A calmer still from real client work with a clear cinematic quality.",
    },
    ...internalAssetMeta,
  },
  socialCutdown: {
    filename: "portfolio-inhouse-social-ad-poster.png",
    src: "/assets/portfolio/inhouse/posters/liten-bedrift-poster.png",
    alt: {
      no: "Still fra in-house SoMe-reklame",
      en: "Still from the in-house social ad",
    },
    usage: {
      no: "SoMe-innhold og raske formater",
      en: "Social content and short-form sections",
    },
    subject: {
      no: "Et raskt, grafisk uttrykk som passer innhold til sosiale medier.",
      en: "A fast, graphic still suited to social-first content.",
    },
    ...internalAssetMeta,
  },
  eventCoverage: {
    filename: "portfolio-event-youngstorget-poster.png",
    src: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-poster.png",
    alt: {
      no: "Still fra eventdekning på Youngstorget",
      en: "Still from event coverage at Youngstorget",
    },
    usage: {
      no: "Eventfilm, live og kontaktflater",
      en: "Event film, live and contact surfaces",
    },
    subject: {
      no: "Et levende eventstill som gir energi og menneskelig nærvær.",
      en: "A vivid event still that adds energy and human presence.",
    },
    ...internalAssetMeta,
  },
  narrativePoster: {
    filename: "portfolio-martha-film-poster.jpeg",
    src: "/assets/portfolio/a-message-from-martha/posters/a-message-from-martha-poster.jpeg",
    alt: {
      no: "Poster for A Message From Martha",
      en: "Poster for A Message From Martha",
    },
    usage: {
      no: "Portefølje, hero-paneler og mørke bakflater",
      en: "Portfolio, hero panels and dark surfaces",
    },
    subject: {
      no: "Et mørkt, mer internasjonalt filmstill som gir premium tyngde.",
      en: "A darker, more international film still that adds premium weight.",
    },
    ...internalAssetMeta,
  },
  documentaryPoster: {
    filename: "portfolio-midnatts-vuggesang-poster.jpg",
    src: "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.jpg",
    alt: {
      no: "Still fra En Midnatts Vuggesang",
      en: "Still from En Midnatts Vuggesang",
    },
    usage: {
      no: "Dokumentar og porteføljeintro",
      en: "Documentary and portfolio intro",
    },
    subject: {
      no: "Et fortellende stillbilde brukt for å løfte work-sidene.",
      en: "A narrative still used to elevate the work pages.",
    },
    ...internalAssetMeta,
  },
  folkPoster: {
    filename: "portfolio-huldredans-poster.jpg",
    src: "/assets/portfolio/huldredans/posters/huldredans-poster.jpg",
    alt: {
      no: "Poster for Huldredans",
      en: "Poster for Huldredans",
    },
    usage: {
      no: "Footer, om oss og mørke sekvenser",
      en: "Footer, about and darker sequences",
    },
    subject: {
      no: "Et stemningsfullt kunstfilm-uttrykk som gir siden mer karakter.",
      en: "A moody art-film image that gives the site more character.",
    },
    ...internalAssetMeta,
  },
  teamTommy: {
    filename: "team-tommy-garland-profile.jpeg",
    src: "/assets/team/tommy/images/tommy-garland-profile.jpeg",
    alt: {
      no: "Portrett av Tommy R.A. Garland",
      en: "Portrait of Tommy R.A. Garland",
    },
    usage: {
      no: "Om oss og kontakt",
      en: "About and contact",
    },
    subject: {
      no: "Portrett brukt som del av et mer redaksjonelt produksjonsuttrykk.",
      en: "Portrait used as part of a more editorial production-company expression.",
    },
    ...internalAssetMeta,
  },
  teamGard: {
    filename: "team-gard-fauske-profile.png",
    src: "/assets/team/gard/images/gard-profile.png",
    alt: {
      no: "Portrett av Gard Ruben Fauske",
      en: "Portrait of Gard Ruben Fauske",
    },
    usage: {
      no: "Om oss og kontakt",
      en: "About and contact",
    },
    subject: {
      no: "Portrett brukt sammen med prosjektstills for å gjøre teamet mer tilstede.",
      en: "Portrait paired with project stills to make the team feel more present.",
    },
    ...internalAssetMeta,
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

export const homeShowcaseVisuals: VisualSet = {
  primary: siteVisuals.introShowcase,
  secondary: siteVisuals.commercialCampaign,
  tertiary: siteVisuals.narrativePoster,
};

export const pageHeroVisuals: Record<string, VisualSet> = {
  about: {
    primary: siteVisuals.teamTommy,
    secondary: siteVisuals.teamGard,
    tertiary: siteVisuals.narrativePoster,
  },
  services: {
    primary: siteVisuals.companyStory,
    secondary: siteVisuals.eventCoverage,
    tertiary: siteVisuals.socialCutdown,
  },
  contact: {
    primary: siteVisuals.eventCoverage,
    secondary: siteVisuals.teamTommy,
    tertiary: siteVisuals.companyStory,
  },
  portfolio: {
    primary: siteVisuals.narrativePoster,
    secondary: siteVisuals.documentaryPoster,
    tertiary: siteVisuals.commercialCampaign,
  },
};

export const servicePillarVisuals: Record<string, VisualAsset> = {
  "01": siteVisuals.commercialCampaign,
  "02": siteVisuals.companyStory,
  "03": siteVisuals.socialCutdown,
  "04": siteVisuals.eventCoverage,
};

export const serviceAreaVisuals: Record<string, VisualAsset> = {
  reklamefilm: siteVisuals.commercialCampaign,
  "bedriftsfilm-intervjuer": siteVisuals.companyStory,
  "some-innhold": siteVisuals.socialCutdown,
  "event-live": siteVisuals.eventCoverage,
};

export function getPortfolioFallbackVisual(group: string): VisualAsset {
  switch (group) {
    case "showreel":
      return siteVisuals.narrativePoster;
    case "campaign":
      return siteVisuals.commercialCampaign;
    case "narrative":
      return siteVisuals.narrativePoster;
    case "event":
      return siteVisuals.eventCoverage;
    case "documentary":
      return siteVisuals.documentaryPoster;
    case "commercial":
      return siteVisuals.companyStory;
    default:
      return siteVisuals.folkPoster;
  }
}

export const visualAssetCredits = Object.values(siteVisuals);
