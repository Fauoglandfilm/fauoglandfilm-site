import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import { portfolioProjects } from "@/data/site-content";
import { getFounderProfile } from "@/data/founder-profiles";
import type { LocalizedText } from "@/lib/i18n";

export type GardFocusArea = {
  title: LocalizedText;
  description: LocalizedText;
};

export type GardProjectCompanion = {
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
  companions?: GardProjectCompanion[];
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
};

const gardBaseProfile =
  getFounderProfile("gard-ruben-fauske") ??
  (() => {
    throw new Error("Missing founder profile: gard-ruben-fauske");
  })();

const youtubeAsset = (videoId: string, label: LocalizedText): ExternalVideoAsset => ({
  provider: "youtube",
  videoType: "youtube",
  videoId,
  embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`,
  thumbnailSrc: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
  label,
  sourceUrl: `https://www.youtube.com/watch?v=${videoId}`,
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
  sourceUrl: `https://vimeo.com/${videoId}`,
});

function getPortfolioProject(slug: string) {
  const project = portfolioProjects.find((item) => item.slug === slug);

  if (!project) {
    throw new Error(`Missing portfolio project: ${slug}`);
  }

  return project;
}

const projectGroups: GardProjectGroup[] = [
  {
    slug: "commercial",
    title: {
      no: "Reklame og branded content",
      en: "Commercial and branded content",
    },
    description: {
      no: "Kampanjearbeid der regi, produksjonskontroll og tydelig kundeverdi må sitte samtidig.",
      en: "Campaign-led work where direction, production control and commercial clarity need to hold together at the same time.",
    },
    projects: [
      {
        slug: "continental",
        client: "Continental",
        year: "2023-2024",
        title: {
          no: "Continental - dekkampanjer for vinter og sommer",
          en: "Continental - tyre campaigns for winter and summer",
        },
        format: {
          no: "Kampanjefilm",
          en: "Campaign film",
        },
        role: {
          no: "Prosjektledelse, 1st AD og gjennomføring",
          en: "Project lead, 1st AD and execution",
        },
        summary: {
          no: "Flere reklameproduksjoner for Continental, der Gard holdt tempo, opptaksflyt og leveranse samlet på tvers av VC8, 2023-kampanjen og sommeruttak.",
          en: "A run of Continental productions where Gard kept pace, set flow and delivery aligned across VC8, the 2023 campaign and summer cutdowns.",
        },
        externalVideo: youtubeAsset("Bn6j7bemquc", {
          no: "Continental Dekk VC8",
          en: "Continental Tyres VC8",
        }),
        preview: true,
        companions: [
          {
            slug: "continental-2023",
            title: {
              no: "Continental Dekk 2023",
              en: "Continental Tyres 2023",
            },
            year: "2023",
            format: {
              no: "Kampanjefilm",
              en: "Campaign film",
            },
            externalVideo: youtubeAsset("7RD9f8XBRm4", {
              no: "Continental Dekk 2023",
              en: "Continental Tyres 2023",
            }),
          },
          {
            slug: "continental-sommer",
            title: {
              no: "Continental sommer",
              en: "Continental summer",
            },
            year: "2024",
            format: {
              no: "Produktfilm",
              en: "Product film",
            },
            externalVideo: youtubeAsset("z3JrMUKUz7s", {
              no: "Continental sommer",
              en: "Continental summer",
            }),
          },
        ],
      },
      {
        slug: "vibb",
        client: "Vibb",
        year: "2024",
        title: {
          no: "Vibb - kortformat med tempo og tydelig produktfokus",
          en: "Vibb - fast, product-led short-form work",
        },
        format: {
          no: "Reklamefilm og shorts",
          en: "Commercial film and shorts",
        },
        role: {
          no: "Prosjektleder og set-ledelse",
          en: "Project lead and set leadership",
        },
        summary: {
          no: "Et kommersielt format bygget for rask forståelse, tydelig produktkommunikasjon og effektiv distribusjon i flere uttak.",
          en: "A commercial format built for fast comprehension, clear product messaging and efficient cutdowns across placements.",
        },
        externalVideo: youtubeAsset("OrRcAlTt4a8", {
          no: "Vibb",
          en: "Vibb",
        }),
        preview: true,
        companions: [
          {
            slug: "vibb-short",
            title: {
              no: "Vibb short",
              en: "Vibb short",
            },
            format: {
              no: "Vertikal preview",
              en: "Vertical preview",
            },
            externalVideo: youtubeAsset("SlYuc877-iE", {
              no: "Vibb short",
              en: "Vibb short",
            }),
          },
        ],
      },
      {
        slug: "nor-way-bussekspress",
        client: "NOR-WAY Bussekspress",
        year: "2024",
        title: {
          no: "NOR-WAY Bussekspress - vertikalt kampanjeuttak",
          en: "NOR-WAY Bussekspress - vertical campaign cutdown",
        },
        format: {
          no: "Shorts / kampanjeuttak",
          en: "Shorts / campaign cutdown",
        },
        role: {
          no: "Prosjektledelse og opptaksflyt",
          en: "Project lead and set flow",
        },
        summary: {
          no: "Et raskt reklameuttak laget for mobil flate, der tempo, framing og tydelig avsender måtte sitte på få sekunder.",
          en: "A fast mobile-first ad cutdown where pace, framing and brand clarity had to land in just a few seconds.",
        },
        externalVideo: youtubeAsset("7Cm7pMVp2dY", {
          no: "NOR-WAY Bussekspress",
          en: "NOR-WAY Bussekspress",
        }),
        preview: true,
      },
      {
        slug: "steins-hytte",
        client: "Stein's hytte",
        year: "2023",
        title: {
          no: "Stein's hytte - eiendomsfilm med tydelig salgsfokus",
          en: "Stein's cabin - property film with a clearer sales focus",
        },
        format: {
          no: "Eiendomsfilm og foto",
          en: "Property film and photography",
        },
        role: {
          no: "Produsent",
          en: "Producer",
        },
        summary: {
          no: "Film og foto laget for å løfte presentasjonen av eiendommen og gi salgsprosessen et mer profesjonelt visuelt uttrykk.",
          en: "Film and photography built to elevate the property presentation and give the sales process a stronger visual expression.",
        },
        externalVideo: youtubeAsset("2nE9ut7eb1c", {
          no: "Stein's hytte",
          en: "Stein's cabin",
        }),
        preview: true,
      },
    ],
  },
  {
    slug: "organisation",
    title: {
      no: "Organisasjon og samfunn",
      en: "Organisation and public-interest work",
    },
    description: {
      no: "Prosjekter der dokumentarisk nerve, tydelig budskap og ryddig gjennomføring er like viktige som den visuelle finishen.",
      en: "Projects where documentary energy, message clarity and reliable execution matter just as much as visual finish.",
    },
    projects: [
      {
        slug: "nei-til-atomvapen",
        client: "Nei til Atomvåpen",
        year: "2024-2025",
        title: {
          no: "Nei til Atomvåpen - kampanje, konferanse og 1. mai",
          en: "No to Nuclear Weapons - campaign, conference and Workers' Day",
        },
        format: {
          no: "Kampanje og eventfilm",
          en: "Campaign and event film",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Et lengre samarbeid der Gard har formet både informasjonsfilm, konferansefilm og eventdekning til bruk i verving, dokumentasjon og videre kampanjeuttak.",
          en: "A longer collaboration where Gard has shaped information films, conference coverage and event output for recruitment, documentation and ongoing campaign use.",
        },
        image: "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.png",
        imageAlt: {
          no: "Still fra Nei til Atomvåpen",
          en: "Still from No to Nuclear Weapons",
        },
        externalVideo: youtubeAsset("N4b3Co-hgLE", {
          no: "Nei til Atomvåpen - konferanse",
          en: "No to Nuclear Weapons - conference",
        }),
        preview: true,
        companions: [
          {
            slug: "nta-1-mai",
            title: {
              no: "1. mai - stemningsfilm",
              en: "Workers' Day - event film",
            },
            year: "2025",
            format: {
              no: "Eventfilm",
              en: "Event film",
            },
            image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-poster.png",
            imageAlt: {
              no: "Still fra 1. mai-filmen",
              en: "Still from the Workers' Day film",
            },
            externalVideo: youtubeAsset("STycvvvjsWY", {
              no: "Nei til Atomvåpen - 1. mai",
              en: "No to Nuclear Weapons - Workers' Day",
            }),
          },
          {
            slug: "nta-tale",
            title: {
              no: "Miranda Aaland - tale",
              en: "Miranda Aaland - full speech",
            },
            year: "2025",
            format: {
              no: "Fullt opptak",
              en: "Full recording",
            },
            image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-reel-poster.png",
            imageAlt: {
              no: "Still fra talen på Youngstorget",
              en: "Still from the speech at Youngstorget",
            },
            externalVideo: youtubeAsset("L0bWrEnlvNk", {
              no: "Miranda Aaland - tale",
              en: "Miranda Aaland - full speech",
            }),
          },
        ],
      },
      {
        slug: "foreningen-norden",
        client: "Foreningen Norden",
        year: "2022-2024",
        title: {
          no: "Foreningen Norden - nettsidefilm, debatt og teaseruttak",
          en: "The Nordic Association - website film, debate and teaser work",
        },
        format: {
          no: "Organisasjonsfilm og live-opptak",
          en: "Organisation film and live capture",
        },
        role: {
          no: "Klipp, animasjon, regi og multicam",
          en: "Edit, animation, direction and multicam",
        },
        summary: {
          no: "Arbeid som spenner fra nettsidefilm og animasjon til debattoppsett med flere kameraer og raske teaserleveranser for publisering samme dag.",
          en: "Work spanning website film and animation to multicam debate setups and fast teaser deliveries ready for same-day publishing.",
        },
        image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
        imageAlt: {
          no: "Still fra Foreningen Norden-produksjon",
          en: "Still from a Nordic Association production",
        },
        externalVideo: youtubeAsset("IDd2LByeYU0", {
          no: "Foreningen Norden - debatt",
          en: "The Nordic Association - debate",
        }),
        preview: true,
        companions: [
          {
            slug: "foreningen-norden-teaser",
            title: {
              no: "Debatt-teaser",
              en: "Debate teaser",
            },
            format: {
              no: "Vertikal teaser",
              en: "Vertical teaser",
            },
            externalVideo: youtubeAsset("4ftzsDDxpXw", {
              no: "Foreningen Norden - teaser",
              en: "The Nordic Association - teaser",
            }),
          },
          {
            slug: "foreningen-norden-nettsidefilm",
            title: {
              no: "Nettsidefilm",
              en: "Website film",
            },
            format: {
              no: "Organisasjonsfilm",
              en: "Organisation film",
            },
            image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
            imageAlt: {
              no: "Still fra nettsidefilm for Foreningen Norden",
              en: "Still from the website film for the Nordic Association",
            },
            video: getPortfolioProject("foreningen-norden-nettsideinnhold").video,
          },
        ],
      },
      {
        slug: "ville-gleder",
        client: "Ville Gleder",
        year: "2024",
        title: {
          no: "Ville Gleder - promofilm for foredrag som skal bookes",
          en: "Ville Gleder - promo films built to help talks get booked",
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
          no: "Et foredragskonsept oversatt til tydelige promofilmer med natur, personlighet og en klarere kommersiell vinkel rundt booking.",
          en: "A speaking concept translated into promo films with landscape, personality and a clearer commercial angle around bookings.",
        },
        image: "/assets/portfolio/ville-gleder/posters/villmarksforedrag-poster.jpg",
        imageAlt: {
          no: "Poster fra Ville Gleder - Villmarksforedrag",
          en: "Poster from Ville Gleder wilderness talks",
        },
        video: getPortfolioProject("ville-gleder-villmarksforedrag").video,
        preview: true,
        companions: [
          {
            slug: "ville-gleder-vat-kald-sulten",
            title: {
              no: "Våt, kald og sulten",
              en: "Wet, cold and hungry",
            },
            format: {
              no: "Promofilm",
              en: "Promo film",
            },
            image: "/assets/portfolio/ville-gleder/posters/vat-kald-sulten-poster.png",
            imageAlt: {
              no: "Still fra Våt, kald og sulten",
              en: "Still from Wet, cold and hungry",
            },
            externalVideo: getPortfolioProject("ville-gleder-vat-kald-sulten").externalVideo,
          },
        ],
      },
    ],
  },
  {
    slug: "narrative",
    title: {
      no: "Kortfilm, drama og fortellende arbeid",
      en: "Short film, drama and narrative work",
    },
    description: {
      no: "Prosjekter som viser Gard sitt regigrep, klippeblikk og trygghet i fortellende produksjoner med tydelig stemning.",
      en: "Projects that show Gard's directing instincts, editorial eye and confidence in narrative productions with a strong atmosphere.",
    },
    projects: [
      {
        slug: "the-voice-within",
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
        role: {
          no: "Produsent, co-regi og siste klipp",
          en: "Producer, co-direction and final edit",
        },
        summary: {
          no: "Bachelorfilmen som ble ferdigstilt under krevende COVID-forhold, og som viser Gard sitt arbeid med både form, gjennomføring og siste fortellende presisjon i klipp.",
          en: "A bachelor film completed under difficult COVID conditions, showing Gard's work across form, execution and the final narrative precision in the edit.",
        },
        externalVideo: youtubeAsset("Dl9eVepNacQ", {
          no: "The Voice Within",
          en: "The Voice Within",
        }),
        preview: true,
      },
      {
        slug: "ferie-for-to-midnatts",
        client: "Sentinel Film / Snowfall Cinema",
        year: "2023",
        title: {
          no: "Ferie for to og En Midnatts Vuggesang",
          en: "Holiday for Two and A Midnight Lullaby",
        },
        format: {
          no: "Kortfilm og drama",
          en: "Short film and drama",
        },
        role: {
          no: "Produksjonsledelse, 1st AD og set-ledelse",
          en: "Production management, 1st AD and set leadership",
        },
        summary: {
          no: "To dramaprosjekter som viser Gard sitt arbeid bak kamera når opptaksflyt, logistikk og trygg set-ledelse må løfte fortellingen.",
          en: "Two drama productions that show Gard's work behind the camera when shoot flow, logistics and confident set leadership need to support the story.",
        },
        externalVideo: youtubeAsset("zY4IMJsXNBQ", {
          no: "Ferie for to",
          en: "Holiday for Two",
        }),
        preview: true,
        companions: [
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
            image: "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.jpg",
            imageAlt: {
              no: "Poster for En Midnatts Vuggesang",
              en: "Poster for A Midnight Lullaby",
            },
          },
        ],
      },
      {
        slug: "cork-selfish-day-by-night",
        client: "Independent / Los Angeles",
        year: "2021-2022",
        title: {
          no: "Cork, Selfish og Day By Night",
          en: "Cork, Selfish and Day By Night",
        },
        format: {
          no: "Fortellende kortformat",
          en: "Narrative short-form work",
        },
        role: {
          no: "Regi, klipp og produksjonsarbeid",
          en: "Direction, editing and production work",
        },
        summary: {
          no: "Et mer uavhengig spor som viser Gard sitt arbeid i mindre fortellende formater, med sterkere fokus på stemning, rytme og visuelt uttrykk.",
          en: "A more independent track showing Gard's work in smaller narrative formats, with a stronger focus on atmosphere, rhythm and visual voice.",
        },
        externalVideo: vimeoAsset(
          "563949732",
          {
            no: "Cork",
            en: "Cork",
          },
          "https://i.vimeocdn.com/video/1165845202-810cfc0fae0c0d3405e78aa9cd48584d78bdae83c53eace81e6426292e8cfda9-d_295x166?region=us",
          "693b90049d",
        ),
        preview: true,
        companions: [
          {
            slug: "selfish",
            title: {
              no: "Selfish",
              en: "Selfish",
            },
            externalVideo: youtubeAsset("UB2t19KGPIs", {
              no: "Selfish",
              en: "Selfish",
            }),
          },
          {
            slug: "day-by-night",
            title: {
              no: "Day By Night",
              en: "Day By Night",
            },
            externalVideo: youtubeAsset("b6JUOY8FB20", {
              no: "Day By Night",
              en: "Day By Night",
            }),
          },
        ],
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
          no: "Et tidlig regiarbeid som allerede viser sans for energi, timing og en tydelig fortellende motor i kortformat.",
          en: "An early directing project that already shows a feel for energy, timing and a clear narrative engine in short form.",
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
    slug: "music-entertainment",
    title: {
      no: "Musikk, underholdning og større oppsett",
      en: "Music, entertainment and larger productions",
    },
    description: {
      no: "Arbeid som viser bredde fra musikkvideo og artistfilm til større TV- og underholdningsproduksjoner.",
      en: "Work that shows range across music video, artist-led projects and larger TV or entertainment productions.",
    },
    projects: [
      {
        slug: "kommer-hjem-takk",
        client: "Klaus Perry / Elleville Elfrid",
        year: "2021",
        title: {
          no: "Kommer Hjem og Takk for at du er min venn",
          en: "Kommer Hjem and Thank You for Being My Friend",
        },
        format: {
          no: "Musikkvideo",
          en: "Music video",
        },
        role: {
          no: "Produsent, 1st AD og klipp",
          en: "Producer, 1st AD and edit",
        },
        summary: {
          no: "To ulike musikkvideoprosjekter som viser Gard sin evne til å holde både leken tone, fortelling og gjennomføring samlet.",
          en: "Two different music video productions that show Gard's ability to hold tone, story and execution together.",
        },
        image: "/assets/portfolio/kommer-hjem/posters/kommer-hjem-poster.png",
        imageAlt: {
          no: "Still fra Kommer Hjem",
          en: "Still from Kommer Hjem",
        },
        externalVideo: getPortfolioProject("kommer-hjem-musikkvideo").externalVideo,
        preview: true,
        companions: [
          {
            slug: "takk-for-at-du-er-min-venn",
            title: {
              no: "Takk for at du er min venn",
              en: "Thank You for Being My Friend",
            },
            externalVideo: getPortfolioProject("takk-for-at-du-er-min-venn").externalVideo,
          },
        ],
      },
      {
        slug: "sweathearts-gulltransporten-ramon",
        client: "Monster / 74 Entertainment / Ramón",
        year: "2022-2024",
        title: {
          no: "Sweathearts, Gulltransporten og Så klart det gjør vondt",
          en: "Sweathearts, Gold Run and Of Course It Hurts",
        },
        format: {
          no: "TV, underholdning og performance",
          en: "TV, entertainment and performance-led work",
        },
        role: {
          no: "1st AD, produksjonssekretær og on-set koordinering",
          en: "1st AD, production secretary and on-set coordination",
        },
        summary: {
          no: "Prosjekter som viser Gard sitt arbeid i større oppsett med høyere logistisk kompleksitet, tydelig fremdrift og trygg håndtering av sett og crew.",
          en: "Projects that show Gard's work in larger setups with higher logistical complexity, clear forward motion and confident set-and-crew handling.",
        },
        externalVideo: youtubeAsset("LTU3Uw4Rglc", {
          no: "Sweathearts",
          en: "Sweathearts",
        }),
        preview: true,
        companions: [
          {
            slug: "gulltransporten",
            title: {
              no: "Gulltransporten",
              en: "Gold Run",
            },
            externalVideo: youtubeAsset("4F8Q7Uo0c1k", {
              no: "Gulltransporten",
              en: "Gold Run",
            }),
          },
          {
            slug: "sa-klart-det-gjor-vondt",
            title: {
              no: "Så klart det gjør vondt",
              en: "Of Course It Hurts",
            },
            externalVideo: youtubeAsset("VrSSCWIvCZ0", {
              no: "Of Course It Hurts",
              en: "Of Course It Hurts",
            }),
          },
        ],
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
      no: "Kontakt oss",
      en: "Contact us",
    },
    href: "/kontakt",
  },
];

export const gardProfilePage = {
  baseProfile: gardBaseProfile,
  heroTitle: {
    no: "Regissør, prosjektleder og kreativ produsent",
    en: "Director, project lead and creative producer",
  },
  heroIntro: {
    no: "Gard leder prosjekter der regi, produksjonskontroll og klipp må henge tett sammen, fra reklame og branded content til fortellende kortfilm og større produksjoner.",
    en: "Gard leads projects where direction, production control and editing need to hold tightly together, from commercial and branded work to narrative short film and larger productions.",
  },
  heroCtaPrimary: {
    no: "Snakk med Gard om prosjektet",
    en: "Talk to Gard about the project",
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
    no: "Et kreativt blikk med trygghet for både set, post og fremdrift.",
    en: "A creative perspective with real confidence across set, post and project flow.",
  },
  introBody: {
    no: "Med bakgrunn fra NTNU, Kristiania og California State University Los Angeles har Gard bygget erfaring fra Fau&Land Film, Yellow Banana, Nord DDB, Monster, Fantefilm og flere reklame- og filmproduksjoner i Norge og Los Angeles.",
    en: "With studies from NTNU, Kristiania and California State University Los Angeles, Gard has built experience across Fau&Land Film, Yellow Banana, Nord DDB, Monster, Fantefilm and a broader mix of production work in Norway and Los Angeles.",
  },
  introFacts: [
    "NTNU",
    "Kristiania",
    "California State University Los Angeles",
    "Fau&Land Film",
  ],
  focusEyebrow: {
    no: "Fokusområder",
    en: "Focus areas",
  },
  focusAreas: [
    {
      title: {
        no: "Regi",
        en: "Direction",
      },
      description: {
        no: "Tydelig visuelt blikk og roligere historieføring på sett.",
        en: "A clear visual eye and calm storytelling leadership on set.",
      },
    },
    {
      title: {
        no: "Prosjektledelse",
        en: "Project leadership",
      },
      description: {
        no: "Holder plan, crew og fremdrift samlet gjennom hele produksjonen.",
        en: "Keeps schedule, crew and momentum aligned throughout production.",
      },
    },
    {
      title: {
        no: "Klipp og historiefortelling",
        en: "Edit and storytelling",
      },
      description: {
        no: "Former rytme og struktur når filmen må spisses i etterarbeid.",
        en: "Shapes rhythm and structure when the film needs sharpening in post.",
      },
    },
    {
      title: {
        no: "Reklame og branded content",
        en: "Commercial and branded content",
      },
      description: {
        no: "Sterk på prosjekter som må være både kommersielle og filmatiske.",
        en: "Strong on projects that need to be both commercial and cinematic.",
      },
    },
  ] satisfies GardFocusArea[],
  projectEyebrow: {
    no: "Utvalgte prosjekter",
    en: "Selected projects",
  },
  projectTitle: {
    no: "Et kuratert utvalg arbeid, bygget som case fremfor CV.",
    en: "A curated body of work presented as cases rather than a CV.",
  },
  projectDescription: {
    no: "Store produksjoner, kampanjer og fortellende prosjekter presentert med mer media, mindre tekst og tydeligere roller.",
    en: "Large productions, campaigns and narrative projects presented with more media, less text and clearer roles.",
  },
  projectGroups,
  internalLinks,
  ctaTitle: {
    no: "Vil du jobbe med Gard og Fau&Land på neste produksjon?",
    en: "Would you like to work with Gard and Fau&Land on the next production?",
  },
  ctaDescription: {
    no: "Send en kort brief, så følger vi opp med anbefalt format, riktig team og neste steg.",
    en: "Send a short brief and we'll follow up with the right format, team and next step.",
  },
  ctaPrimaryLabel: {
    no: "Send en kort brief",
    en: "Send a short brief",
  },
  ctaSecondaryLabel: {
    no: "Se porteføljen",
    en: "See the portfolio",
  },
  contactEmail: "gard@fauoglandfilm.com",
  contactPhone: "+47 940 53 050",
};
