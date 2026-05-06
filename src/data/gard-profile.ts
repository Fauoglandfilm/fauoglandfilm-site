import type { ExternalVideoAsset, VideoAsset } from "@/data/site-content";
import { portfolioProjects } from "@/data/site-content";
import { getFounderProfile } from "@/data/founder-profiles";
import type { LocalizedText } from "@/lib/i18n";

export type GardFocusArea = {
  title: LocalizedText;
  description: LocalizedText;
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

export type GardProjectDetail = GardProject & {
  group: GardProjectGroup;
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
        slug: "continental-2023",
        client: "Continental",
        year: "2023",
        title: {
          no: "Continental Dekk 2023",
          en: "Continental Tyres 2023",
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
          no: "Et kampanjeuttak for Continental der Gard holdt opptaksflyt, set-ledelse og gjennomføring samlet fra plan til leveranse.",
          en: "A Continental campaign cut where Gard kept set flow, leadership and execution aligned from planning to delivery.",
        },
        externalVideo: youtubeAsset("7RD9f8XBRm4", {
          no: "Continental Dekk 2023",
          en: "Continental Tyres 2023",
        }),
        preview: true,
      },
      {
        slug: "continental-sommer",
        client: "Continental",
        year: "2024",
        title: {
          no: "Continental sommer",
          en: "Continental summer",
        },
        format: {
          no: "Produktfilm",
          en: "Product film",
        },
        role: {
          no: "Prosjektledelse, 1st AD og gjennomføring",
          en: "Project lead, 1st AD and execution",
        },
        summary: {
          no: "Et lettere produktuttak for Continental, bygget rundt tydelig produktfokus, tempo og trygg produksjonsflyt.",
          en: "A lighter Continental product cut built around clear product focus, pace and confident production flow.",
        },
        externalVideo: youtubeAsset("z3JrMUKUz7s", {
          no: "Continental sommer",
          en: "Continental summer",
        }),
        preview: true,
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
      },
      {
        slug: "vibb-short",
        client: "Vibb",
        year: "2024",
        title: {
          no: "Vibb short",
          en: "Vibb short",
        },
        format: {
          no: "Vertikal preview",
          en: "Vertical preview",
        },
        role: {
          no: "Prosjektleder og set-ledelse",
          en: "Project lead and set leadership",
        },
        summary: {
          no: "Et separat vertikalt uttak fra Vibb-produksjonen, laget for rask forståelse og tydelig produktkommunikasjon i mobilformat.",
          en: "A separate vertical cut from the Vibb production, built for fast comprehension and clear product communication in mobile format.",
        },
        externalVideo: youtubeAsset("SlYuc877-iE", {
          no: "Vibb short",
          en: "Vibb short",
        }),
        preview: true,
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
        year: "2024",
        title: {
          no: "Nei til Atomvåpen - konferansefilm",
          en: "No to Nuclear Weapons - conference film",
        },
        format: {
          no: "Konferansefilm",
          en: "Conference film",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "En konferansefilm der Gard formet opptak, regi og klipp til tydelig dokumentasjon og videre kampanjebruk.",
          en: "A conference film where Gard shaped capture, direction and edit into clear documentation and campaign material.",
        },
        image: "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.avif",
        imageAlt: {
          no: "Still fra Nei til Atomvåpen",
          en: "Still from No to Nuclear Weapons",
        },
        externalVideo: youtubeAsset("N4b3Co-hgLE", {
          no: "Nei til Atomvåpen - konferanse",
          en: "No to Nuclear Weapons - conference",
        }),
        preview: true,
      },
      {
        slug: "nta-1-mai",
        client: "Nei til Atomvåpen",
        year: "2025",
        title: {
          no: "1. mai - stemningsfilm",
          en: "Workers' Day - aftermovie",
        },
        format: {
          no: "Aftermovie",
          en: "Aftermovie",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Et eget 1. mai-uttak for Nei til Atomvåpen, klippet for stemning, tilstedeværelse og tydelig kampanjeenergi.",
          en: "A dedicated Workers' Day cut for No to Nuclear Weapons, edited for atmosphere, presence and clear campaign energy.",
        },
        image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-poster.avif",
        imageAlt: {
          no: "Still fra 1. mai-filmen",
          en: "Still from the Workers' Day film",
        },
        externalVideo: youtubeAsset("STycvvvjsWY", {
          no: "Nei til Atomvåpen - 1. mai",
          en: "No to Nuclear Weapons - Workers' Day",
        }),
        preview: true,
      },
      {
        slug: "nta-tale",
        client: "Nei til Atomvåpen",
        year: "2025",
        title: {
          no: "Miranda Aaland - tale",
          en: "Miranda Aaland - full speech",
        },
        format: {
          no: "Fullt opptak",
          en: "Full recording",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Et separat taleopptak fra Youngstorget, levert som tydelig dokumentasjon og publiserbart kampanjemateriale.",
          en: "A separate speech recording from Youngstorget, delivered as clear documentation and publishable campaign material.",
        },
        image: "/assets/portfolio/nei-til-atomvapen/posters/internasjonal-arbeiderdag-reel-poster.avif",
        imageAlt: {
          no: "Still fra talen på Youngstorget",
          en: "Still from the speech at Youngstorget",
        },
        externalVideo: youtubeAsset("L0bWrEnlvNk", {
          no: "Miranda Aaland - tale",
          en: "Miranda Aaland - full speech",
        }),
        preview: true,
      },
      {
        slug: "foreningen-norden",
        client: "Foreningen Norden",
        year: "2024",
        title: {
          no: "Foreningen Norden - debatt",
          en: "The Nordic Association - debate",
        },
        format: {
          no: "Flerkameraopptak",
          en: "Multicam capture",
        },
        role: {
          no: "Klipp, animasjon, regi og multicam",
          en: "Edit, animation, direction and multicam",
        },
        summary: {
          no: "Et eget debattoppsett for Foreningen Norden, med flerkamera, trygg opptaksflyt og klipp til tydelig publisering.",
          en: "A dedicated debate setup for the Nordic Association, with multicam capture, steady production flow and clear publishing edits.",
        },
        image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
        imageAlt: {
          no: "Still fra Foreningen Norden-produksjon",
          en: "Still from a Nordic Association production",
        },
        externalVideo: youtubeAsset("IDd2LByeYU0", {
          no: "Foreningen Norden - debatt",
          en: "The Nordic Association - debate",
        }),
        preview: true,
      },
      {
        slug: "foreningen-norden-teaser",
        client: "Foreningen Norden",
        year: "2024",
        title: {
          no: "Foreningen Norden - debatt-teaser",
          en: "The Nordic Association - debate teaser",
        },
        format: {
          no: "Vertikal teaser",
          en: "Vertical teaser",
        },
        role: {
          no: "Klipp, animasjon, regi og multicam",
          en: "Edit, animation, direction and multicam",
        },
        summary: {
          no: "Et separat teaseruttak fra debatten, laget for rask publisering og tydelig distribusjon i sosiale kanaler.",
          en: "A separate teaser cut from the debate, built for fast publishing and clear distribution across social channels.",
        },
        externalVideo: youtubeAsset("4ftzsDDxpXw", {
          no: "Foreningen Norden - teaser",
          en: "The Nordic Association - teaser",
        }),
        preview: true,
      },
      {
        slug: "foreningen-norden-nettsidefilm",
        client: "Foreningen Norden",
        year: "2022",
        title: {
          no: "Foreningen Norden - nettsidefilm",
          en: "The Nordic Association - website film",
        },
        format: {
          no: "Organisasjonsfilm",
          en: "Organisation film",
        },
        role: {
          no: "Klipp, animasjon og regi",
          en: "Edit, animation and direction",
        },
        summary: {
          no: "En egen nettsidefilm for Foreningen Norden, bygget for å forklare organisasjonen tydelig og løfte avsenderen visuelt.",
          en: "A dedicated website film for the Nordic Association, built to explain the organisation clearly and elevate the brand visually.",
        },
        image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
        imageAlt: {
          no: "Still fra nettsidefilm for Foreningen Norden",
          en: "Still from the website film for the Nordic Association",
        },
        video: getPortfolioProject("foreningen-norden-nettsideinnhold").video,
        preview: true,
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
        image: "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
        imageAlt: {
          no: "Mattis Thørud og Jan Monsen ved vannet under opptak for Ville Gleder",
          en: "Mattis Thorud and Jan Monsen by the lake during the Ville Gleder production",
        },
        video: getPortfolioProject("ville-gleder-villmarksforedrag").video,
        preview: true,
      },
      {
        slug: "ville-gleder-vat-kald-sulten",
        client: "Ville Gleder",
        year: "2024",
        title: {
          no: "Våt, kald og sulten",
          en: "Wet, cold and hungry",
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
          no: "En egen promofilm for Våt, kald og sulten, med tydelig naturfølelse og kommersiell retning rundt booking.",
          en: "A dedicated promo film for Wet, cold and hungry, with a clear outdoor feeling and commercial direction around bookings.",
        },
        image: "/assets/portfolio/ville-gleder/stills/vat-kald-sulten-still010.webp",
        imageAlt: {
          no: "Jan Monsen og Mattis Thørud i promofilm for Våt, kald & sulten",
          en: "Jan Monsen and Mattis Thorud in the Wet, cold and hungry promo film",
        },
        video: getPortfolioProject("ville-gleder-vat-kald-sulten").video,
        preview: true,
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
        slug: "er-det-sa-javlig-vanskelig",
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
        role: {
          no: "Regi og klipp",
          en: "Direction and edit",
        },
        summary: {
          no: "En filmskaperkomedie skrevet og spilt av Morten Hansen, der Gard har regi og klipp i en fortelling om hvor krevende det faktisk er å lage film og hva som skjer når sterke personligheter krasjer i samme produksjon.",
          en: "A filmmaker comedy written and performed by Morten Hansen, with Gard directing and editing a story about how hard filmmaking really is and what happens when strong personalities collide inside the same production.",
        },
        image: "/assets/team/gard/portfolio/narrative/er-det-sa-javlig-vanskelig-poster.jpg",
        imageAlt: {
          no: "Plakat for Er det så jævlig vanskelig?",
          en: "Poster for Is It Really That Damn Hard?",
        },
        mediaFit: "contain",
        preview: true,
      },
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
        slug: "ferie-for-to",
        client: "Sentinel Film / Snowfall Cinema",
        year: "2023",
        title: {
          no: "Ferie for to",
          en: "Holiday for Two",
        },
        format: {
          no: "Kortfilm",
          en: "Short film",
        },
        role: {
          no: "Produksjonsledelse, 1st AD og set-ledelse",
          en: "Production management, 1st AD and set leadership",
        },
        summary: {
          no: "Et kortfilmprosjekt der Gard sitt arbeid bak kamera handlet om opptaksflyt, logistikk og trygg set-ledelse rundt fortellingen.",
          en: "A short film project where Gard's work behind the camera centered on shoot flow, logistics and confident set leadership around the story.",
        },
        externalVideo: youtubeAsset("zY4IMJsXNBQ", {
          no: "Ferie for to",
          en: "Holiday for Two",
        }),
        preview: true,
      },
      {
        slug: "en-midnatts-vuggesang",
        client: "Snowfall Cinema x Fau&Land Film",
        year: "2023",
        title: {
          no: "En Midnatts Vuggesang",
          en: "A Midnight Lullaby",
        },
        format: {
          no: "Dramakortfilm",
          en: "Drama short",
        },
        role: {
          no: "Produksjonsledelse, 1st AD og set-ledelse",
          en: "Production management, 1st AD and set leadership",
        },
        summary: {
          no: "Drama om Li-hua, en alenemor i Oslo som kjemper for å få endene til å møtes, der Gard bidro med trygg produksjonsflyt rundt et nært fortellende univers.",
          en: "A drama about Li-hua, a single mother in Oslo fighting to make ends meet, where Gard helped keep production flow steady around an intimate story world.",
        },
        image: "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.avif",
        imageAlt: {
          no: "Poster for En Midnatts Vuggesang",
          en: "Poster for A Midnight Lullaby",
        },
        preview: true,
      },
      {
        slug: "cork",
        client: "Independent / Los Angeles",
        year: "2021",
        title: {
          no: "Cork",
          en: "Cork",
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
          no: "Et uavhengig kortformat fra Los Angeles-perioden, med fokus på stemning, rytme og et mer presist visuelt uttrykk.",
          en: "An independent short-form project from the Los Angeles period, focused on atmosphere, rhythm and a more precise visual voice.",
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
      },
      {
        slug: "selfish",
        client: "Independent / Los Angeles",
        year: "2022",
        title: {
          no: "Selfish",
          en: "Selfish",
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
          no: "Et selvstendig kortformat som viser Gard sitt arbeid med tone, timing og visuell fortelling i et mindre produksjonsoppsett.",
          en: "A standalone short-form project showing Gard's work with tone, timing and visual storytelling in a smaller production setup.",
        },
        externalVideo: youtubeAsset("UB2t19KGPIs", {
          no: "Selfish",
          en: "Selfish",
        }),
        preview: true,
      },
      {
        slug: "day-by-night",
        client: "Independent / Los Angeles",
        year: "2022",
        title: {
          no: "Day By Night",
          en: "Day By Night",
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
          no: "Et individuelt kortformat fra Gard sitt uavhengige spor, med tydelig fokus på rytme, stemning og visuelt uttrykk.",
          en: "An individual short-form piece from Gard's independent track, with a clear focus on rhythm, atmosphere and visual expression.",
        },
        externalVideo: youtubeAsset("b6JUOY8FB20", {
          no: "Day By Night",
          en: "Day By Night",
        }),
        preview: true,
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
        slug: "kommer-hjem",
        client: "Klaus Perry / Elleville Elfrid",
        year: "2021",
        title: {
          no: "Kommer Hjem",
          en: "Kommer Hjem",
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
          no: "En musikkvideo som viser Gard sin evne til å holde leken tone, fortelling og gjennomføring samlet i et familievennlig univers.",
          en: "A music video showing Gard's ability to hold playful tone, story and execution together in a family-friendly world.",
        },
        image: "/assets/portfolio/kommer-hjem/posters/kommer-hjem-poster.avif",
        imageAlt: {
          no: "Still fra Kommer Hjem",
          en: "Still from Kommer Hjem",
        },
        externalVideo: getPortfolioProject("kommer-hjem-musikkvideo").externalVideo,
        preview: true,
      },
      {
        slug: "takk-for-at-du-er-min-venn",
        client: "Klaus Perry / Elleville Elfrid",
        year: "2021",
        title: {
          no: "Takk for at du er min venn",
          en: "Thank You for Being My Friend",
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
          no: "Et eget musikkvideoprosjekt fra samme lekne univers, med Gard i produksjon, opptaksflyt og klipp.",
          en: "A dedicated music video project from the same playful world, with Gard across production, set flow and edit.",
        },
        externalVideo: getPortfolioProject("takk-for-at-du-er-min-venn").externalVideo,
        preview: true,
      },
      {
        slug: "sweathearts",
        client: "Monster / 74 Entertainment / Ramón",
        year: "2024",
        title: {
          no: "Sweathearts",
          en: "Sweathearts",
        },
        format: {
          no: "TV og underholdning",
          en: "TV and entertainment",
        },
        role: {
          no: "1st AD, produksjonssekretær og on-set koordinering",
          en: "1st AD, production secretary and on-set coordination",
        },
        summary: {
          no: "Et større underholdningsoppsett som viser Gard sitt arbeid med logistikk, fremdrift og trygg håndtering av set og crew.",
          en: "A larger entertainment setup showing Gard's work with logistics, momentum and confident handling of set and crew.",
        },
        externalVideo: youtubeAsset("LTU3Uw4Rglc", {
          no: "Sweathearts",
          en: "Sweathearts",
        }),
        preview: true,
      },
      {
        slug: "gulltransporten",
        client: "Fantefilm / 74 Entertainment",
        year: "2022",
        title: {
          no: "Gulltransporten",
          en: "Gold Run",
        },
        format: {
          no: "Filmproduksjon",
          en: "Film production",
        },
        role: {
          no: "On-set koordinering",
          en: "On-set coordination",
        },
        summary: {
          no: "Et eget større produksjonsspor der Gard bidro med koordinering og trygg flyt rundt et mer komplekst opptaksoppsett.",
          en: "A dedicated larger production track where Gard contributed coordination and steady flow around a more complex shoot setup.",
        },
        externalVideo: youtubeAsset("4F8Q7Uo0c1k", {
          no: "Gulltransporten",
          en: "Gold Run",
        }),
        preview: true,
      },
      {
        slug: "sa-klart-det-gjor-vondt",
        client: "Ramón",
        year: "2024",
        title: {
          no: "Så klart det gjør vondt",
          en: "Of Course It Hurts",
        },
        format: {
          no: "Performancefilm",
          en: "Performance film",
        },
        role: {
          no: "On-set koordinering",
          en: "On-set coordination",
        },
        summary: {
          no: "Et separat performanceprosjekt med Ramón, der Gard bidro til trygg flyt, timing og gjennomføring på set.",
          en: "A separate performance project with Ramón, where Gard contributed to steady flow, timing and execution on set.",
        },
        externalVideo: youtubeAsset("VrSSCWIvCZ0", {
          no: "Of Course It Hurts",
          en: "Of Course It Hurts",
        }),
        preview: true,
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

export function getGardProjectPath(slug: string) {
  return `/team/gard-ruben-fauske/prosjekter/${slug}`;
}

export function getGardProjectIndex(): GardProjectDetail[] {
  return projectGroups.flatMap((group) =>
    group.projects.map((project) => ({
        ...project,
        group,
      })),
  );
}

export function getGardProjectBySlug(slug: string) {
  return getGardProjectIndex().find((project) => project.slug === slug);
}

export function getGardRelatedProjects(slug: string, limit = 4) {
  const currentProject = getGardProjectBySlug(slug);

  if (!currentProject) {
    return [];
  }

  return getGardProjectIndex()
    .filter(
      (project) =>
        project.slug !== slug && project.group.slug === currentProject.group.slug,
    )
    .slice(0, limit);
}
