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
  filmCrewOutdoors: {
    filename: "section-film-crew-outdoors.jpg",
    src: "/assets/visuals/section-images/section-film-crew-outdoors.jpg",
    alt: {
      no: "Filmcrew på opptak utendørs",
      en: "Film crew shooting outdoors",
    },
    usage: {
      no: "Om oss, intro og redaksjonelle støtteflater",
      en: "About, intro and editorial support surfaces",
    },
    subject: {
      no: "Et mer eksklusivt opptaksbilde med faktisk crew-følelse og mer premium energi.",
      en: "A more elevated production still with a real crew feel and more premium energy.",
    },
    creator: "Kyle Loftus",
    license: "Unsplash License",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/Dw681UwPYOY",
  },
  filmStudioCyclorama: {
    filename: "section-film-studio-cyclorama.jpg",
    src: "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
    alt: {
      no: "Stort studioppsett med lys og crew",
      en: "Large studio setup with lights and crew",
    },
    usage: {
      no: "Tjenester, kontakt og luksuriøse bakflater",
      en: "Services, contact and luxe background surfaces",
    },
    subject: {
      no: "Et high-end studiobilde som løfter byrå- og produksjonsfølelsen.",
      en: "A high-end studio image that lifts the agency and production-company feel.",
    },
    creator: "Jakob Owens",
    license: "Unsplash License",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/XvDPxyBIN78",
  },
  cameraDarkroom: {
    filename: "cinematic-camera-darkroom.jpg",
    src: "/assets/visuals/cinematic/cinematic-camera-darkroom.jpg",
    alt: {
      no: "Mørk kamerarigg i et kontrollert produksjonsmiljø",
      en: "Dark camera rig in a controlled production environment",
    },
    usage: {
      no: "Tjenester, work-intro og cinematisk støtte",
      en: "Services, work intros and cinematic support",
    },
    subject: {
      no: "Teknologisk, raffinert kameramiljø som gir mer premium produksjonsfølelse.",
      en: "A refined technical camera environment that adds premium production value.",
    },
    creator: "ShareGrid",
    license: "Unsplash License",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/VZvzaDsrpWI",
  },
  studioLightBackdrop: {
    filename: "bg-studio-light.jpg",
    src: "/assets/visuals/backgrounds/bg-studio-light.jpg",
    alt: {
      no: "Studiolys og produksjonsutstyr i mørk scene",
      en: "Studio lighting and production equipment in a dark scene",
    },
    usage: {
      no: "Footer, mørke bakgrunner og visuell dybde",
      en: "Footer, dark backgrounds and visual depth",
    },
    subject: {
      no: "Et filmatisk bakteppe som gir mer dybde enn flate fargeflater.",
      en: "A cinematic backdrop that gives more depth than flat color surfaces.",
    },
    creator: "KAL VISUALS",
    license: "Unsplash License",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/J4hxSsDZ8Lc",
  },
  cameraCloseup: {
    filename: "cinematic-video-camera-closeup.jpg",
    src: "/assets/visuals/cinematic/cinematic-video-camera-closeup.jpg",
    alt: {
      no: "Nærbilde av profesjonelt videokamera",
      en: "Close-up of a professional video camera",
    },
    usage: {
      no: "Portefølje, work-kort og teknologisk støtte",
      en: "Portfolio, work cards and technical support",
    },
    subject: {
      no: "Et rent og teknologisk stillbilde som passer Apple-inspirert filmestetikk.",
      en: "A clean technical still that suits an Apple-inspired film aesthetic.",
    },
    creator: "Luke Thornton",
    license: "Unsplash License",
    sourceName: "Unsplash",
    sourceUrl: "https://unsplash.com/photos/p4484NzaEII",
  },
  introShowcase: {
    filename: "portfolio-ville-gleder-wilderness-poster.jpg",
    src: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.jpg",
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
  treningshusetWide: {
    filename: "portfolio-treningshuset-bred-poster.png",
    src: "/assets/portfolio/treningshuset/posters/treningshuset-bred-poster.png",
    alt: {
      no: "Still fra annonsefilm for Treningshuset",
      en: "Still from an ad film for Treningshuset",
    },
    usage: {
      no: "Reklamefilm og resultatorienterte tjenestekort",
      en: "Commercial film and result-led service cards",
    },
    subject: {
      no: "Et ekte kampanjestill som viser ferdig annonseoutput i stedet for produksjonsutstyr.",
      en: "A real campaign still that shows finished ad output instead of production gear.",
    },
    ...internalAssetMeta,
  },
  treningshusetMobile: {
    filename: "portfolio-treningshuset-mobil-poster.png",
    src: "/assets/portfolio/treningshuset/posters/treningshuset-mobil-poster.png",
    alt: {
      no: "Vertikal annonsepreview for Treningshuset",
      en: "Vertical ad preview for Treningshuset",
    },
    usage: {
      no: "SoMe-innhold og mobilformat",
      en: "Social content and mobile-first formats",
    },
    subject: {
      no: "Et vertikalt sluttprodukt som passer kortet for SoMe-innhold bedre enn generiske kamerabilder.",
      en: "A vertical final asset that fits the social-content card better than generic camera imagery.",
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
    filename: "team-tommy-garland-profile.png",
    src: "/assets/team/tommy/images/tommy-garland-profile.png",
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
  primary: siteVisuals.filmCrewOutdoors,
  secondary: siteVisuals.cameraDarkroom,
  tertiary: siteVisuals.cameraCloseup,
};

export const pageHeroVisuals: Record<string, VisualSet> = {
  about: {
    primary: siteVisuals.filmCrewOutdoors,
    secondary: siteVisuals.teamTommy,
    tertiary: siteVisuals.teamGard,
  },
  services: {
    primary: siteVisuals.filmStudioCyclorama,
    secondary: siteVisuals.cameraDarkroom,
    tertiary: siteVisuals.cameraCloseup,
  },
  contact: {
    primary: siteVisuals.filmStudioCyclorama,
    secondary: siteVisuals.filmCrewOutdoors,
    tertiary: siteVisuals.teamTommy,
  },
  portfolio: {
    primary: siteVisuals.cameraCloseup,
    secondary: siteVisuals.narrativePoster,
    tertiary: siteVisuals.filmStudioCyclorama,
  },
  faq: {
    primary: siteVisuals.cameraDarkroom,
    secondary: siteVisuals.cameraCloseup,
    tertiary: siteVisuals.filmStudioCyclorama,
  },
};

export const servicePillarVisuals: Record<string, VisualAsset> = {
  "01": siteVisuals.cameraDarkroom,
  "02": siteVisuals.filmStudioCyclorama,
  "03": siteVisuals.cameraCloseup,
  "04": siteVisuals.filmCrewOutdoors,
};

export const serviceAreaVisuals: Record<string, VisualAsset> = {
  reklamefilm: siteVisuals.treningshusetWide,
  "bedriftsfilm-intervjuer": siteVisuals.companyStory,
  "some-innhold": siteVisuals.treningshusetMobile,
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
