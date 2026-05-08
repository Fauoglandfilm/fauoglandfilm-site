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
    slug: "commercial-content",
    title: {
      no: "Reklame og Innhold",
      en: "Commercial and Content",
    },
    description: {
      no: "Reklame, kampanjer og innhold der Gard har ledet brief, opptaksflyt og leveranse tett gjennom produksjonen.",
      en: "Commercials, campaigns and content where Gard has led the brief, shoot flow and delivery closely through production.",
    },
    projects: [
      {
        slug: "continental-vc8",
        client: "Continental / Yellow Banana",
        year: "2024",
        title: {
          no: "Continental VC8",
          en: "Continental VC8",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
        },
        summary: {
          no: "Den store Continental VC8-reklamen, der Gard holdt prosjektledelse og innspillingsflyt samlet for Yellow Banana.",
          en: "The major Continental VC8 commercial, where Gard kept project management and set flow aligned for Yellow Banana.",
        },
        externalVideo: youtubeAsset("Bn6j7bemquc", {
          no: "Continental VC8",
          en: "Continental VC8",
        }),
        preview: true,
      },
      {
        slug: "continental-yellow-banana-heisjef",
        client: "Continental / Yellow Banana / Heisjef",
        year: "2022",
        title: {
          no: "Continental reklame med Yellow Banana og Heisjef",
          en: "Continental commercial with Yellow Banana and Heisjef",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Innspillingsleder",
          en: "1st AD",
        },
        summary: {
          no: "Continental-reklame produsert med Yellow Banana og Heisjef, der Gard hadde rollen som innspillingsleder.",
          en: "Continental commercial produced with Yellow Banana and Heisjef, with Gard working as 1st AD.",
        },
        externalVideo: vimeoAsset(
          "761019587",
          {
            no: "Continental reklame med Yellow Banana og Heisjef",
            en: "Continental commercial with Yellow Banana and Heisjef",
          },
          "https://i.vimeocdn.com/video/2053007281-04e79e51591c465accf1a9556c52addbabd5012aff546ca807daef556c1d3509-d_295x166?region=us",
        ),
        preview: true,
      },
      {
        slug: "continental-rudskogen",
        client: "Continental / Yellow Banana",
        year: "2024",
        title: {
          no: "Continental Rudskogen",
          en: "Continental Rudskogen",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Prosjektleder, Regissør og Klipp",
          en: "Project manager, director and edit",
        },
        summary: {
          no: "Et eget Continental-uttak fra Rudskogen der Gard ledet prosjektet, regisserte og klippet leveransen.",
          en: "A dedicated Continental cut from Rudskogen where Gard led the project, directed and edited the delivery.",
        },
        image:
          "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/49de9a5d-1686-4ce9-bd95-fba5a7815ab5/Continental+BTS-293+%281%29.jpg",
        imageAlt: {
          no: "Behind the scenes fra Continental-produksjon",
          en: "Behind the scenes from a Continental production",
        },
        preview: true,
      },
      {
        slug: "toyota-heisjef",
        client: "Toyota / Heisjef",
        year: "2025",
        title: {
          no: "Toyota-reklame med Heisjef",
          en: "Toyota commercial with Heisjef",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Produksjonsleder og Innspillingsleder",
          en: "Production manager and 1st AD",
        },
        summary: {
          no: "Toyota-reklame med Heisjef der Gard hadde ansvar for produksjonsledelse og innspillingsflyt på set.",
          en: "Toyota commercial with Heisjef where Gard handled production management and set flow as 1st AD.",
        },
        externalVideo: vimeoAsset(
          "1114284109",
          {
            no: "Toyota-reklame med Heisjef",
            en: "Toyota commercial with Heisjef",
          },
          "https://i.vimeocdn.com/video/2052990391-1e1f2c18c2d8699d445128cbd1605e8656a863e0cc4dbaff91c3874a3776fd87-d_295x166?region=us",
        ),
        preview: true,
      },
      {
        slug: "mollers-tran-yellow-banana-heisjef",
        client: "Møllers Tran / Yellow Banana / Heisjef",
        year: "2022",
        title: {
          no: "Møllers Tran",
          en: "Møllers Tran",
        },
        format: {
          no: "Reklamefilm",
          en: "Commercial film",
        },
        role: {
          no: "Produksjonsleder",
          en: "Production manager",
        },
        summary: {
          no: "Møllers Tran-produksjon med Yellow Banana og Heisjef, der Gard hadde rollen som produksjonsleder.",
          en: "Møllers Tran production with Yellow Banana and Heisjef, with Gard working as production manager.",
        },
        externalVideo: vimeoAsset(
          "685504185",
          {
            no: "Møllers Tran",
            en: "Møllers Tran",
          },
          "https://i.vimeocdn.com/video/2053019936-4495efbdb09c9eee3f4e54232a67736b3ce768ee86da3b9d2057502b075c72eb-d_295x166?region=us",
        ),
        preview: true,
      },
      {
        slug: "continental-2023",
        client: "Continental / Yellow Banana",
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
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
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
        client: "Continental / Yellow Banana",
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
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
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
        slug: "efi-the-designer",
        client: "Efi / Yellow Banana",
        year: "2024",
        title: {
          no: "Efi - The Designer",
          en: "Efi - The Designer",
        },
        format: {
          no: "Reklamekonsept og bilder",
          en: "Commercial concept and images",
        },
        role: {
          no: "Kreatør og Prosjektleder",
          en: "Creative and project manager",
        },
        summary: {
          no: "Et visuelt reklameuttak for Efi der Gard designet bildene, formet uttrykket og ledet prosjektet.",
          en: "A visual commercial project for Efi where Gard designed the images, shaped the look and led the project.",
        },
        image:
          "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/62f9aac3-66b4-483a-beac-5ed049609326/Credits+Image.jpg",
        imageAlt: {
          no: "Kampanjebilde fra Efi - The Designer",
          en: "Campaign image from Efi - The Designer",
        },
        preview: true,
      },
      {
        slug: "vibb",
        client: "Vibb / Yellow Banana",
        year: "2024",
        title: {
          no: "Vibb",
          en: "Vibb",
        },
        format: {
          no: "Reklamefilm og shorts",
          en: "Commercial film and shorts",
        },
        role: {
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
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
        slug: "mental-helse-ungdom",
        client: "Mental Helse Ungdom / Yellow Banana",
        year: "2024",
        title: {
          no: "Mental Helse Ungdom",
          en: "Mental Helse Ungdom",
        },
        format: {
          no: "Kampanjeinnhold",
          en: "Campaign content",
        },
        role: {
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
        },
        summary: {
          no: "Kampanjeinnhold for Mental Helse Ungdom der Gard ledet plan, opptaksflyt og gjennomføring for Yellow Banana.",
          en: "Campaign content for Mental Helse Ungdom where Gard led planning, set flow and execution for Yellow Banana.",
        },
        image:
          "https://images.squarespace-cdn.com/content/v1/5f44d95d64e4796dddb229d6/638884f7-9ea7-429e-9626-fd6c0726bcd9/artikkel.yb.mhu.jul.png",
        imageAlt: {
          no: "Kampanjebilde fra Mental Helse Ungdom",
          en: "Campaign image from Mental Helse Ungdom",
        },
        preview: true,
      },
      {
        slug: "nor-way-bussekspress",
        client: "NOR-WAY Bussekspress / Yellow Banana",
        year: "2024",
        title: {
          no: "NOR-WAY Bussekspress",
          en: "NOR-WAY Bussekspress",
        },
        format: {
          no: "Shorts / kampanjeuttak",
          en: "Shorts / campaign cutdown",
        },
        role: {
          no: "Prosjektleder og Innspillingsleder",
          en: "Project manager and 1st AD",
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
        slug: "treningshuset",
        client: "Treningshuset",
        year: "2025",
        title: {
          no: "Treningshuset",
          en: "Treningshuset",
        },
        format: {
          no: "Annonsefilm og sosiale medier",
          en: "Ad films and social media",
        },
        role: {
          no: "Regi, produksjon og klipp",
          en: "Direction, production and edit",
        },
        summary: {
          no: "Filmer for annonser og sosiale medier, laget for å drive flere innmeldinger og gi Treningshuset et tydeligere mobiluttrykk.",
          en: "Films for ads and social media, built to drive more memberships and give Treningshuset a clearer mobile-first expression.",
        },
        image: getPortfolioProject("treningshuset").image,
        imageAlt: getPortfolioProject("treningshuset").imageAlt,
        video: getPortfolioProject("treningshuset").video,
        mediaFit: getPortfolioProject("treningshuset").mediaFit,
        preview: true,
      },
      {
        slug: "nei-til-atomvapen",
        client: "Nei til Atomvåpen",
        year: "2024-2025",
        title: {
          no: "Nei til Atomvåpen",
          en: "No to Nuclear Weapons",
        },
        format: {
          no: "Kampanje, konferanse og eventinnhold",
          en: "Campaign, conference and event content",
        },
        role: {
          no: "Produsent, regi og klipp",
          en: "Producer, direction and edit",
        },
        summary: {
          no: "Et samlet samarbeid der Gard har formet informasjonsfilm, konferansefilm, 1. mai-dekning og taleopptak til bruk i verving, dokumentasjon og kampanje.",
          en: "A collected collaboration where Gard shaped information film, conference work, Workers' Day coverage and speech recordings for recruitment, documentation and campaign use.",
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
        slug: "foreningen-norden",
        client: "Foreningen Norden",
        year: "2022-2024",
        title: {
          no: "Foreningen Norden",
          en: "The Nordic Association",
        },
        format: {
          no: "Nettsidefilm, debatt og teaserinnhold",
          en: "Website film, debate and teaser content",
        },
        role: {
          no: "Klipp, animasjon, regi og multicam",
          en: "Edit, animation, direction and multicam",
        },
        summary: {
          no: "Et samlet Foreningen Norden-spor med nettsidefilm, animasjon, debattopptak og raske teaserleveranser for publisering.",
          en: "A collected Nordic Association track with website film, animation, debate capture and fast teaser deliveries for publishing.",
        },
        image: "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
        imageAlt: {
          no: "Still fra Foreningen Norden-produksjon",
          en: "Still from a Nordic Association production",
        },
        video: getPortfolioProject("foreningen-norden-nettsideinnhold").video,
        preview: true,
      },
      {
        slug: "ville-gleder",
        client: "Ville Gleder",
        year: "2024",
        title: {
          no: "Ville Gleder - Villmarksforedrag",
          en: "Ville Gleder - wilderness talks",
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
        slug: "steins-hytte",
        client: "Stein's hytte",
        year: "2023",
        title: {
          no: "Stein's hytte",
          en: "Stein's cabin",
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
    slug: "film-tv",
    title: {
      no: "Film og TV",
      en: "Film and TV",
    },
    description: {
      no: "Større film-, dokumentar- og TV-produksjoner med tydelige roller på set, logistikk og gjennomføring.",
      en: "Larger film, documentary and TV productions with clear roles across set, logistics and execution.",
    },
    projects: [
      {
        slug: "the-giant-artist",
        client: "The Giant Artist",
        year: "2020",
        title: {
          no: "The Giant Artist",
          en: "The Giant Artist",
        },
        format: {
          no: "Dokumentar",
          en: "Documentary",
        },
        role: {
          no: "Produsent, Regissør og Klipp",
          en: "Producer, director and edit",
        },
        summary: {
          no: "En dokumentar om Martin, en fremadstormende maler som prøver å finne sin plass i verden.",
          en: "A documentary about Martin, an emerging painter trying to find his place in the world.",
        },
        externalVideo: getPortfolioProject("the-giant-artist").externalVideo,
        preview: true,
      },
      {
        slug: "sweathearts",
        client: "Monster",
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
          no: "Innspillingsleder",
          en: "1st AD",
        },
        summary: {
          no: "Et større underholdningsoppsett der Gard hadde rollen som innspillingsleder og holdt flyt, timing og set-rytmikk samlet.",
          en: "A larger entertainment setup where Gard worked as 1st AD and kept flow, timing and set rhythm aligned.",
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
          no: "Produksjonssekretær",
          en: "Production secretary",
        },
        summary: {
          no: "Et større produksjonsspor der Gard bidro som produksjonssekretær rundt et mer komplekst opptaksoppsett.",
          en: "A larger production track where Gard contributed as production secretary around a more complex shoot setup.",
        },
        externalVideo: youtubeAsset("4F8Q7Uo0c1k", {
          no: "Gulltransporten",
          en: "Gold Run",
        }),
        preview: true,
      },
    ],
  },
  {
    slug: "short-film",
    title: {
      no: "Kortfilm",
      en: "Short Film",
    },
    description: {
      no: "Kortfilmer og fortellende prosjekter der Gard sitt arbeid spenner fra regi og klipp til produksjonsledelse og opptakslyd.",
      en: "Short films and narrative projects where Gard's work spans direction, edit, production leadership and location sound.",
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
          no: "En filmskaperkomedie skrevet og spilt av Morten Hansen, der Gard har regi og klipp i en fortelling om hvor krevende det faktisk er å lage film.",
          en: "A filmmaker comedy written and performed by Morten Hansen, with Gard directing and editing a story about how hard filmmaking really is.",
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
          no: "Bachelorfilmen som ble ferdigstilt under krevende COVID-forhold, og som viser Gard sitt arbeid med form, gjennomføring og fortellende presisjon i klipp.",
          en: "A bachelor film completed under difficult COVID conditions, showing Gard's work across form, execution and narrative precision in the edit.",
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
          no: "Kortfilm",
          en: "Short film",
        },
        role: {
          no: "Opptakslyd",
          en: "Location sound",
        },
        summary: {
          no: "Et uavhengig kortformat fra Los Angeles-perioden der Gard hadde opptakslyd.",
          en: "An independent short-form project from the Los Angeles period where Gard handled location sound.",
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
    slug: "music-video",
    title: {
      no: "Musikkvideo",
      en: "Music Video",
    },
    description: {
      no: "Musikkvideoer og performanceprosjekter med tydelige roller innen produksjon, innspillingsledelse, regi, klipp og lyd.",
      en: "Music videos and performance projects with clear roles across production, 1st AD work, direction, edit and sound.",
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
          no: "Produsent og Innspillingsleder",
          en: "Producer and 1st AD",
        },
        summary: {
          no: "En musikkvideo der Gard hadde produsentansvar og innspillingsledelse i et leken familieunivers.",
          en: "A music video where Gard handled producing and 1st AD work in a playful family-friendly world.",
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
          no: "Produsent og Innspillingsleder",
          en: "Producer and 1st AD",
        },
        summary: {
          no: "Et eget musikkvideoprosjekt fra samme lekne univers, med Gard i produsentrollen og som innspillingsleder.",
          en: "A dedicated music video project from the same playful world, with Gard as producer and 1st AD.",
        },
        externalVideo: getPortfolioProject("takk-for-at-du-er-min-venn").externalVideo,
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
          no: "Musikkvideo",
          en: "Music video",
        },
        role: {
          no: "Regi og klipp",
          en: "Direction and edit",
        },
        summary: {
          no: "Et selvstendig musikkvideoprosjekt som viser Gard sitt arbeid med tone, timing og visuell fortelling.",
          en: "A standalone music video project showing Gard's work with tone, timing and visual storytelling.",
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
          no: "Musikkvideo",
          en: "Music video",
        },
        role: {
          no: "Innspillingsleder",
          en: "1st AD",
        },
        summary: {
          no: "Et musikkvideoprosjekt fra Los Angeles-perioden der Gard hadde rollen som innspillingsleder.",
          en: "A music video project from the Los Angeles period where Gard worked as 1st AD.",
        },
        externalVideo: youtubeAsset("b6JUOY8FB20", {
          no: "Day By Night",
          en: "Day By Night",
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
          no: "Musikkvideo / performance",
          en: "Music video / performance",
        },
        role: {
          no: "Set-lyd",
          en: "Set sound",
        },
        summary: {
          no: "Et performanceprosjekt med Ramón der Gard hadde set-lyd og bidro til trygg opptaksflyt.",
          en: "A performance project with Ramón where Gard handled set sound and contributed to steady shoot flow.",
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
    no: "Med utdannelse fra NTNU, Kristiania og California State University Los Angeles og solid erfaring fra en rekke produksjoner innen film, TV og reklame, stiller Gard med et sterkt fundament av kunnskap og erfaring. Før Fau&Land Film var han også prosjektleder i reklamebyrå, der han ledet en rekke store produksjoner.",
    en: "With education from NTNU, Kristiania and California State University Los Angeles, and solid experience across film, TV and advertising productions, Gard brings a strong foundation of knowledge and experience. Before Fau&Land Film, he also worked as a project manager in an advertising agency, where he led a range of large productions.",
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
