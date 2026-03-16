import {
  portfolioProjects,
  siteConfig,
  type ExternalVideoAsset,
  type SocialLink,
  type VideoAsset,
} from "@/data/site-content";
import { getFounderProfile } from "@/data/founder-profiles";
import { siteVisuals } from "@/data/visual-assets";
import type { LocalizedText } from "@/lib/i18n";

export type GardFocusArea = {
  title: LocalizedText;
  description: LocalizedText;
};

export type GardInfoGroup = {
  title: LocalizedText;
  items: LocalizedText[];
};

export type GardProject = {
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
};

export type GardProjectGroup = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  projects: GardProject[];
};

export type GardLink = {
  label: LocalizedText;
  href: string;
  external?: boolean;
};

const gardBaseProfile =
  getFounderProfile("gard-ruben-fauske") ??
  (() => {
    throw new Error("Missing founder profile: gard-ruben-fauske");
  })();

const squarespaceVideoUrl = (systemDataId: string, variant: string) =>
  `https://video.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/${systemDataId}/${variant}`;

const youtubeAsset = (
  videoId: string,
  label: LocalizedText,
  suffix = "",
): ExternalVideoAsset => ({
  provider: "youtube",
  videoType: "youtube",
  videoId,
  embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1${suffix}`,
  thumbnailSrc: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
  label,
  sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
});

function getPortfolioProject(slug: string) {
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Missing portfolio project: ${slug}`);
  }

  return project;
}

function fromPortfolio(
  slug: string,
  overrides: Partial<GardProject> & Pick<GardProject, "role">,
): GardProject {
  const project = getPortfolioProject(slug);

  return {
    slug: project.slug,
    client: project.client,
    title: project.title,
    format: project.format,
    summary: project.summary,
    year: project.year,
    image: project.image,
    imageAlt: project.imageAlt,
    video: project.video,
    externalVideo: project.externalVideo,
    mediaFit: project.mediaFit,
    ...overrides,
  };
}

const continentalBtsImage =
  "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/49de9a5d-1686-4ce9-bd95-fba5a7815ab5/Continental+BTS-293+%281%29.jpg";

const projectGroups: GardProjectGroup[] = [
  {
    slug: "commercial",
    title: {
      no: "Reklame og branded content",
      en: "Commercial and branded content",
    },
    description: {
      no: "Arbeid der Gard holder både struktur, gjennomføring og kreativ retning samlet for kampanjer, produkter og kommersielle leveranser.",
      en: "Work where Gard keeps structure, execution and creative direction aligned across campaigns, products and branded productions.",
    },
    projects: [
      {
        slug: "yellow-banana-campaigns",
        client: "Yellow Banana",
        year: "2023-2024",
        title: {
          no: "Continental, Vibb, NOR-WAY, EFI og Mental Helse Ungdom",
          en: "Continental, Vibb, NOR-WAY, EFI and Mental Health Youth",
        },
        format: {
          no: "Kampanjeledelse",
          en: "Campaign leadership",
        },
        role: {
          no: "Prosjektleder, 1st AD og kreativ planlegging",
          en: "Project lead, 1st AD and creative planning",
        },
        summary: {
          no: "Fra Yellow Banana ledet Gard reklameproduksjoner for Continental, Vibb, NOR-WAY Bussekspress, EFI The Designer og Mental Helse Ungdom. Arbeidet spente fra plan, casting og scouting til budsjettering, set-ledelse, klipp og leveranser i flere formater.",
          en: "At Yellow Banana, Gard led commercial productions for Continental, Vibb, NOR-WAY Bussekspress, EFI The Designer and Mental Helse Ungdom. The work ranged from planning, casting and scouting to budgeting, set leadership, editing and multi-format deliveries.",
        },
        image: continentalBtsImage,
        imageAlt: {
          no: "Behind the scenes fra Continental-kampanje",
          en: "Behind the scenes from a Continental campaign",
        },
      },
      {
        slug: "toyota-el-lading",
        client: "Heisjef",
        year: "2024",
        title: {
          no: "Toyota - el-lading",
          en: "Toyota - EV charging",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Produksjonsleder og 1st AD",
          en: "Production manager and 1st AD",
        },
        summary: {
          no: "Reklamefilm for Toyota der Gard holdt produksjonsflyten stram på sett og sikret fremdrift gjennom hele opptaket.",
          en: "A Toyota commercial where Gard kept the production flow tight on set and protected momentum throughout the shoot.",
        },
        image: siteVisuals.cameraCloseup.src,
        imageAlt: siteVisuals.cameraCloseup.alt,
      },
      fromPortfolio("steins-hytte", {
        year: "2023",
        role: {
          no: "Produsent",
          en: "Producer",
        },
        summary: {
          no: "Film og foto til eiendomspresentasjon for Stein sin hytte, laget for å gi salgsprosessen et mer profesjonelt og visuelt overbevisende uttrykk.",
          en: "Film and photography for Stein's cabin, built to give the sales process a more professional and visually persuasive presentation.",
        },
        preview: true,
      }),
      {
        slug: "frontbtrading",
        client: "Fau&Land Film",
        title: {
          no: "FrontBTrading",
          en: "FrontBTrading",
        },
        format: {
          no: "AI-eksperiment / SoMe",
          en: "AI experiment / social content",
        },
        role: {
          no: "AI-innhold og klipp",
          en: "AI content and edit",
        },
        summary: {
          no: "Et 100 prosent AI-generert eksperiment der hvert klipp ble bygget separat og formet til en kort, leken og tydelig merkevarefilm.",
          en: "A fully AI-generated experiment where each clip was built separately and shaped into a short, playful brand film.",
        },
        image: siteVisuals.cameraDarkroom.src,
        imageAlt: siteVisuals.cameraDarkroom.alt,
      },
      fromPortfolio("liten-bedrift", {
        role: {
          no: "Regi og klipp",
          en: "Direction and edit",
        },
        summary: {
          no: "Et in-house spot som viser Gard sin sans for korte, tydelige og kommersielle formater med lav terskel og høy punch.",
          en: "An in-house spot that shows Gard's feel for short, direct commercial formats with a low barrier and strong punch.",
        },
      }),
    ],
  },
  {
    slug: "organisation",
    title: {
      no: "Organisasjon og samfunn",
      en: "Organisations and public-interest work",
    },
    description: {
      no: "Prosjekter der tydelig fortelling, dokumentarisk nerve og ryddig leveranse er like viktige som den visuelle finishen.",
      en: "Projects where clear storytelling, documentary energy and a reliable delivery are as important as the visual finish.",
    },
    projects: [
      {
        slug: "nei-til-atomvapen-combined",
        client: "Nei til Atomvåpen",
        title: {
          no: "Nei til Atomvåpen",
          en: "No to Nuclear Weapons",
        },
        format: {
          no: "Informasjonsfilm, eventfilm og uttak",
          en: "Campaign film, event film and cutdowns",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Gard har ledet flere produksjoner for Nei til Atomvåpen, fra dokumentarisk informasjonsfilm til konferansefilm, 1. mai-dekning og vertikale uttak til videre kampanje- og vervearbeid.",
          en: "Gard has led multiple productions for No to Nuclear Weapons, from documentary campaign film to conference coverage, Workers' Day output and vertical cutdowns for ongoing recruitment work.",
        },
        image: getPortfolioProject("nei-til-atomvapen").image,
        imageAlt: getPortfolioProject("nei-til-atomvapen").imageAlt,
        externalVideo: getPortfolioProject("nei-til-atomvapen").externalVideo,
        preview: true,
      },
      fromPortfolio("foreningen-norden-nettsideinnhold", {
        role: {
          no: "Klipp og animasjon",
          en: "Edit and animation",
        },
        summary: {
          no: "Samlet tidligere produksjoner, klientmateriale og nye animasjoner i én tydelig nettsidefilm som forklarer hva organisasjonen gjør og hvorfor arbeidet betyr noe.",
          en: "Brought together earlier productions, client material and new animation into one clear website film explaining the organisation's work and why it matters.",
        },
        preview: true,
      }),
      {
        slug: "foreningen-norden-eventer",
        client: "Foreningen Norden",
        year: "2022-2023",
        title: {
          no: "Debatt og Språkprisen",
          en: "Debate and the Language Prize",
        },
        format: {
          no: "Multikamera og aftermovie",
          en: "Multicam and aftermovie",
        },
        role: {
          no: "Produsent, regi, foto og klipp",
          en: "Producer, direction, camera and edit",
        },
        summary: {
          no: "Fra trekameradebatt med egen lydtekniker til en halvannen times aftermovie fra Språkprisen: arbeid som viser Gard sin evne til å holde både live-oppsett og etterarbeid samlet.",
          en: "From a three-camera debate setup with dedicated sound to a 90-minute aftermovie from the Language Prize, this work shows Gard's ability to hold both live execution and post together.",
        },
        image:
          "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/93f6accc-8e6f-4322-b7f7-fd8d792cd292/IMG_7042-Enhanced-NR.jpg",
        imageAlt: {
          no: "Still fra Språkprisen for Foreningen Norden",
          en: "Still from the Language Prize for Foreningen Norden",
        },
        externalVideo: getPortfolioProject("foreningen-norden-debatt").externalVideo,
      },
      {
        slug: "ville-gleder-combined",
        client: "Ville Gleder",
        title: {
          no: "Ville Gleder",
          en: "Ville Gleder",
        },
        format: {
          no: "Promofilm",
          en: "Promo film",
        },
        role: {
          no: "Regi, lyd og klipp",
          en: "Direction, sound and edit",
        },
        summary: {
          no: "Gard har formet promofilmene for både Villmarksforedrag og «Våt, kald og sulten», med mål om å gjøre foredragene enklere å booke og lettere å huske.",
          en: "Gard shaped promo films for both the wilderness talks and “Wet, cold and hungry”, built to make the talks easier to book and easier to remember.",
        },
        image: getPortfolioProject("ville-gleder-villmarksforedrag").image,
        imageAlt: getPortfolioProject("ville-gleder-villmarksforedrag").imageAlt,
        video: {
          videoType: "direct",
          src: squarespaceVideoUrl("1d79dac6-f46b-48c8-a623-73420ab8b49b", "1920:1080"),
          poster: getPortfolioProject("ville-gleder-villmarksforedrag").image,
          label: {
            no: "Ville Gleder - Villmarksforedrag",
            en: "Ville Gleder - wilderness talks",
          },
        },
        preview: true,
      },
    ],
  },
  {
    slug: "narrative",
    title: {
      no: "Kortfilm, dokumentar og drama",
      en: "Short film, documentary and drama",
    },
    description: {
      no: "Et fortellende spor der Gard går tettere inn i regi, klipp, produsentansvar og set-ledelse.",
      en: "A narrative track where Gard moves closer to direction, edit, producing and set leadership.",
    },
    projects: [
      fromPortfolio("the-giant-artist", {
        year: "2018",
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Dokumentaren om Martin Granli viser Gard sitt blikk for karakterdrevet historiefortelling og hans evne til å forme materiale i klipp.",
          en: "The documentary about Martin Granli shows Gard's eye for character-led storytelling and his ability to shape material in the edit.",
        },
        preview: true,
      }),
      fromPortfolio("the-voice-within", {
        role: {
          no: "Produsent, co-regi og siste klipp",
          en: "Producer, co-direction and final edit",
        },
        summary: {
          no: "Bachelorfilmen som ble ferdigstilt under krevende COVID-forhold, der Gard bar både produsentansvar, co-regi og siste klipp.",
          en: "The bachelor film completed under difficult COVID restrictions, with Gard carrying producing, co-direction and the final edit.",
        },
        preview: true,
      }),
      {
        slug: "ferie-for-to-midnatts",
        client: "Sentinel Film / Snowfall Cinema",
        year: "2023",
        title: {
          no: "Ferie for to og En Midnatts Vuggesang",
          en: "Ferie for to and En Midnatts Vuggesang",
        },
        format: {
          no: "Kortfilm og drama",
          en: "Short film and drama",
        },
        role: {
          no: "Produksjonsleder, 1st AD og set-ledelse",
          en: "Production management, 1st AD and set leadership",
        },
        summary: {
          no: "To ulike dramaprosjekter som viser Gard sin styrke i gjennomføring: fra produksjonsledelse og 1st AD på Ferie for to til set-ledelse på En Midnatts Vuggesang.",
          en: "Two different drama projects that show Gard's execution strength, from production management and 1st AD on Ferie for to to set leadership on En Midnatts Vuggesang.",
        },
        image: getPortfolioProject("en-midnatts-vuggesang").image,
        imageAlt: getPortfolioProject("en-midnatts-vuggesang").imageAlt,
      },
      {
        slug: "hvite-penger",
        client: "NTNU",
        year: "2018",
        title: {
          no: "Hvite Penger",
          en: "White Money",
        },
        format: {
          no: "Kortfilm",
          en: "Short film",
        },
        role: {
          no: "Manus og regi",
          en: "Writer and director",
        },
        summary: {
          no: "En uventet actionkomedie om bankranere og Gard sitt tidlige regiarbeid som fortsatt viser sans for energi, timing og karakterdrevet fortelling.",
          en: "An unexpected action comedy about bank robbers and one of Gard's early directing works, already showing a feel for energy, timing and character-led storytelling.",
        },
        externalVideo: youtubeAsset("HivqHgYDhKk", {
          no: "Hvite Penger",
          en: "White Money",
        }),
        preview: true,
      },
    ],
  },
  {
    slug: "music-tv",
    title: {
      no: "Musikkvideo, TV og underholdning",
      en: "Music videos, TV and entertainment",
    },
    description: {
      no: "Arbeid som viser Gard sin bredde på tvers av musikkvideo, reality, større produksjoner og internasjonale sett.",
      en: "Work that shows Gard's range across music video, reality, larger productions and international sets.",
    },
    projects: [
      fromPortfolio("kommer-hjem-musikkvideo", {
        year: "2021",
        role: {
          no: "Produsent og 1st AD",
          en: "Producer and 1st AD",
        },
        preview: true,
      }),
      {
        slug: "takk-for-at-du-er-min-venn-and-falling-in-love",
        client: "Sentinel Film",
        year: "2021",
        title: {
          no: "Takk for at du er min venn og Falling in Love",
          en: "Thank You for Being My Friend and Falling in Love",
        },
        format: {
          no: "Musikkvideo",
          en: "Music video",
        },
        role: {
          no: "Produsent, klipp og 1st AD",
          en: "Producer, editor and 1st AD",
        },
        summary: {
          no: "Musikkvideoprosjekter som spenner fra Elleville Elfrid-lansering med Bjarte Hjelmeland til artistarbeid med Isabelle Eberdean.",
          en: "Music video work ranging from the Elleville Elfrid launch with Bjarte Hjelmeland to artist-led work with Isabelle Eberdean.",
        },
        image: getPortfolioProject("takk-for-at-du-er-min-venn").externalVideo?.thumbnailSrc,
        imageAlt: {
          no: "Still fra Takk for at du er min venn",
          en: "Still from Thank You for Being My Friend",
        },
        externalVideo: getPortfolioProject("takk-for-at-du-er-min-venn").externalVideo,
      },
      {
        slug: "bandwidth-bros-los-angeles",
        client: "Bandwidth Bros / Sentinel Film",
        year: "2019-2020",
        title: {
          no: "Bandwidth Bros / Los Angeles",
          en: "Bandwidth Bros / Los Angeles",
        },
        format: {
          no: "Musikkvideo og internasjonale sett",
          en: "Music videos and international sets",
        },
        role: {
          no: "1st AD, regi, grip og set-arbeid",
          en: "1st AD, direction, grip and set work",
        },
        summary: {
          no: "Under oppholdet i Los Angeles jobbet Gard på musikkvideoer og sett for Bandwidth Bros, med navn som DAX, YBN Cordae, Anderson .Paak, Hollow Visions og Mad Macks.",
          en: "During his time in Los Angeles, Gard worked on music videos and sets with Bandwidth Bros, including work connected to DAX, YBN Cordae, Anderson .Paak, Hollow Visions and Mad Macks.",
        },
        image: siteVisuals.cameraDarkroom.src,
        imageAlt: siteVisuals.cameraDarkroom.alt,
      },
      {
        slug: "sweathearts-gulltransporten",
        client: "Monster / 74 Entertainment",
        year: "2022",
        title: {
          no: "Sweathearts og Gulltransporten",
          en: "Sweathearts and Gold Run",
        },
        format: {
          no: "TV og større gjennomføringer",
          en: "TV and larger productions",
        },
        role: {
          no: "1st AD og produksjonssekretær",
          en: "1st AD and production secretary",
        },
        summary: {
          no: "Fra internasjonal badstue-reality til spillefilm: arbeid som viser Gard sin trygghet i større oppsett, struktur og koordinering under press.",
          en: "From international sauna-reality TV to feature film, this work shows Gard's confidence in larger setups, structure and coordination under pressure.",
        },
        image: siteVisuals.filmCrewOutdoors.src,
        imageAlt: siteVisuals.filmCrewOutdoors.alt,
      },
    ],
  },
];

const internalLinks: GardLink[] = [
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
      no: "Snakk med oss om prosjektet",
      en: "Talk to us about the project",
    },
    href: "/kontakt",
  },
];

const socialLinks: GardLink[] = siteConfig.socialLinks.map((link: SocialLink) => ({
  label: {
    no: link.name,
    en: link.name,
  },
  href: link.href,
  external: true,
}));

export const gardProfilePage = {
  baseProfile: gardBaseProfile,
  heroTitle: {
    no: "Regissør, prosjektleder og kreativ produsent",
    en: "Director, project lead and creative producer",
  },
  heroIntro: {
    no: "Gard Ruben Fauske kombinerer reklameproduksjonens tempo med fortellergrep fra kortfilm, dokumentar og musikkvideo. Han går gjerne tett på både regi, klipp, produksjonsledelse og set-ledelse, og trives best når idé og gjennomføring må henge sømløst sammen.",
    en: "Gard Ruben Fauske combines the tempo of commercial production with storytelling instincts from short film, documentary and music video. He works close to direction, editing, production leadership and set leadership, and does his best work when concept and execution need to stay tightly aligned.",
  },
  heroSummary: {
    no: "Med bakgrunn fra NTNU, Fagskolen Kristiania og California State University Los Angeles har han bygd erfaring fra Fau&Land Film, Yellow Banana, Sentinel Film, Nord DDB, Monster og Fantefilm.",
    en: "With studies from NTNU, Kristiania and California State University Los Angeles, he has built experience across Fau&Land Film, Yellow Banana, Sentinel Film, Nord DDB, Monster and Fantefilm.",
  },
  focusEyebrow: {
    no: "Fokusområder",
    en: "Focus areas",
  },
  focusTitle: {
    no: "Et kreativt blikk som også tåler tempo, struktur og gjennomføring.",
    en: "A creative perspective that also holds up under pace, structure and execution.",
  },
  focusDescription: {
    no: "Gard jobber i skjæringspunktet mellom fortelling og produksjonskontroll. Det gjør ham spesielt sterk i prosjekter som må være både visuelt presise og praktisk godt styrt.",
    en: "Gard works where story and production control meet. That makes him especially strong on projects that need to be both visually precise and operationally well managed.",
  },
  focusAreas: [
    {
      title: {
        no: "Regi",
        en: "Direction",
      },
      description: {
        no: "Oversetter brief og idé til tydelige bilder, rytme og et klart fortellende uttrykk.",
        en: "Translates brief and concept into clear images, rhythm and a defined narrative voice.",
      },
    },
    {
      title: {
        no: "Prosjektledelse",
        en: "Project leadership",
      },
      description: {
        no: "Holder plan, budsjett, casting, scouting og fremdrift samlet gjennom hele produksjonsløpet.",
        en: "Keeps schedule, budget, casting, scouting and momentum aligned throughout the production process.",
      },
    },
    {
      title: {
        no: "Klipp og historiefortelling",
        en: "Edit and storytelling",
      },
      description: {
        no: "Former tempo og struktur i etterarbeid, og sikrer at filmen bærer idéen helt frem til leveranse.",
        en: "Shapes tempo and structure in post, making sure the film carries the idea all the way to delivery.",
      },
    },
    {
      title: {
        no: "Innspillingsledelse",
        en: "Set leadership",
      },
      description: {
        no: "Trygg på sett og vant til å styre større team, skiftende opptaksdager og produksjoner med høyt tempo.",
        en: "Confident on set and used to leading larger crews, changing shoot days and productions with a high tempo.",
      },
    },
    {
      title: {
        no: "Reklame og branded content",
        en: "Commercial and branded content",
      },
      description: {
        no: "Har levert kampanje, produktfilm og branded content for både byrå, organisasjon og egne merkevareprosjekter.",
        en: "Has delivered campaigns, product films and branded content for agencies, organisations and in-house brand projects.",
      },
    },
  ] satisfies GardFocusArea[],
  environmentsEyebrow: {
    no: "Arbeidsmiljøer",
    en: "Production environments",
  },
  environmentsTitle: {
    no: "Fra byråproduksjon og reklamesett til kortfilm, festivalarbeid og internasjonale team.",
    en: "From agency production and commercial sets to short film, festival work and international crews.",
  },
  environmentsDescription: {
    no: "Gard har jobbet i miljøer som krever både kreativt eierskap og trygg operasjonell gjennomføring.",
    en: "Gard has worked in environments that demand both creative ownership and reliable operational execution.",
  },
  environments: [
    "Fau&Land Film",
    "Yellow Banana",
    "Sentinel Film",
    "Heisjef",
    "Nord DDB",
    "Monster",
    "Fantefilm",
    "NTNU",
    "California State University Los Angeles",
  ],
  projectEyebrow: {
    no: "Utvalgte prosjekter",
    en: "Selected projects",
  },
  projectTitle: {
    no: "Et kuratert utvalg som viser Gard sin bredde på tvers av reklame, organisasjon, kortfilm, TV og musikkvideo.",
    en: "A curated selection that shows Gard's range across commercial work, organisations, short film, TV and music video.",
  },
  projectDescription: {
    no: "Noen prosjekter åpner video direkte på siden. Andre er valgt inn fordi de viser rollebredden, gjennomføringskraften og fortellergrepet hans.",
    en: "Some projects open video directly on the page. Others are included because they show the breadth of his roles, execution and story craft.",
  },
  projectGroups,
  backgroundEyebrow: {
    no: "Bakgrunn og retning",
    en: "Background and direction",
  },
  backgroundTitle: {
    no: "Studier, erfaring og roller som bygger troverdighet både kreativt og operativt.",
    en: "Studies, experience and roles that build credibility both creatively and operationally.",
  },
  backgroundDescription: {
    no: "Gard sitt løp kombinerer faglig filmutdanning med praktisk arbeid i reklame, TV, event, kortfilm og branded content.",
    en: "Gard's path combines formal film education with hands-on work in advertising, TV, events, short film and branded content.",
  },
  backgroundGroups: [
    {
      title: {
        no: "Studier",
        en: "Studies",
      },
      items: [
        {
          no: "NTNU: Bachelor i film- og videoproduksjon.",
          en: "NTNU: Bachelor's degree in film and video production.",
        },
        {
          no: "Fagskolen Kristiania: Årsstudium i produksjonsledelse for film og TV.",
          en: "Kristiania: One-year programme in production management for film and TV.",
        },
        {
          no: "California State University Los Angeles: utveksling i Film and TV Production.",
          en: "California State University Los Angeles: exchange studies in Film and TV Production.",
        },
      ],
    },
    {
      title: {
        no: "Arbeidslinje",
        en: "Career path",
      },
      items: [
        {
          no: "Daglig leder, prosjektleder og regissør i Fau&Land Film.",
          en: "Managing director, project lead and director at Fau&Land Film.",
        },
        {
          no: "Prosjektleder i Yellow Banana med reklamearbeid for Continental, Vibb, EFI, NOR-WAY og Mental Helse Ungdom.",
          en: "Project lead at Yellow Banana with commercial work for Continental, Vibb, EFI, NOR-WAY and Mental Helse Ungdom.",
        },
        {
          no: "Freelancearbeid for Heisjef, Nord DDB, Monster, Fantefilm og flere produksjonsselskaper i Norge og Los Angeles.",
          en: "Freelance work for Heisjef, Nord DDB, Monster, Fantefilm and other production companies in Norway and Los Angeles.",
        },
      ],
    },
    {
      title: {
        no: "Det han blir hentet inn for",
        en: "What he is brought in for",
      },
      items: [
        {
          no: "Regi og historiefortelling som må fungere like godt i klipp som på sett.",
          en: "Direction and storytelling that need to work just as well in the edit as they do on set.",
        },
        {
          no: "Prosjektledelse og innspillingsledelse på reklame- og branded content-produksjoner.",
          en: "Project and set leadership on commercial and branded content productions.",
        },
        {
          no: "Etterarbeid og strukturering av materiale når prosjektet trenger et tydeligere narrativt grep.",
          en: "Post-production shaping and structuring when a project needs a clearer narrative through-line.",
        },
      ],
    },
  ] satisfies GardInfoGroup[],
  fauLandEyebrow: {
    no: "Gard i Fau&Land",
    en: "Gard at Fau&Land",
  },
  fauLandTitle: {
    no: "En personlig profil, forankret i et seniorledet produksjonsselskap.",
    en: "A personal profile anchored in a senior-led production company.",
  },
  fauLandDescription: {
    no: "Vil du se mer av hva Gard og Fau&Land bygger sammen, kan du gå videre til arbeid, tjenester eller ta kontakt direkte.",
    en: "If you want to see more of what Gard and Fau&Land build together, continue to the work, services or get in touch directly.",
  },
  internalLinks,
  socialLinks,
  ctaTitle: {
    no: "Vil du jobbe med Gard og Fau&Land på neste prosjekt?",
    en: "Would you like to work with Gard and Fau&Land on the next project?",
  },
  ctaDescription: {
    no: "Fortell kort hva dere vil lage, så følger vi opp med anbefalt format, riktig team og neste steg.",
    en: "Tell us briefly what you need to make and we will follow up with the right format, team and next step.",
  },
  ctaPrimaryLabel: {
    no: "Ta en uforpliktende prat",
    en: "Start a conversation",
  },
  ctaSecondaryLabel: {
    no: "Se hele porteføljen",
    en: "View the full portfolio",
  },
};
