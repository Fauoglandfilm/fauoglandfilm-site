import { getFounderProfile } from "@/data/founder-profiles";
import { siteConfig } from "@/data/site-content";
import type { LocalizedText } from "@/lib/i18n";

export type TommyPortfolioImage = {
  src: string;
  alt: LocalizedText;
  fit?: "cover" | "contain";
  aspect?: "portrait" | "landscape" | "wide" | "square";
};

export type TommyPortfolioLink = {
  label: LocalizedText;
  href: string;
  external?: boolean;
};

export type TommyShortFilmProject = {
  slug: string;
  type: "shortfilm";
  title: LocalizedText;
  year: string;
  role: LocalizedText;
  logline: LocalizedText;
  awards: string[];
  credits?: string[];
  festivals: string[];
  links: TommyPortfolioLink[];
  poster: TommyPortfolioImage;
  gallery: TommyPortfolioImage[];
};

export type TommyShowcaseProject = {
  slug: string;
  type: "commercial" | "event";
  client: string;
  title: LocalizedText;
  role: LocalizedText;
  impact: LocalizedText;
  summary: LocalizedText;
  links: TommyPortfolioLink[];
  poster?: TommyPortfolioImage;
  gallery?: TommyPortfolioImage[];
};

export type TommyRoleItem = {
  slug: string;
  title: LocalizedText;
  summary?: LocalizedText;
  poster?: TommyPortfolioImage;
  links?: TommyPortfolioLink[];
};

export type TommyRoleGroup = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  items: TommyRoleItem[];
};

export type TommyInfoGroup = {
  title: LocalizedText;
  items: LocalizedText[];
};

const tommyBaseProfile =
  getFounderProfile("tommy-garland") ??
  (() => {
    throw new Error("Missing founder profile: tommy-garland");
  })();

const sameText = (value: string): LocalizedText => ({ no: value, en: value });

const externalLink = (label: string, href: string): TommyPortfolioLink => ({
  label: sameText(label),
  href,
  external: true,
});

const internalLink = (labelNo: string, labelEn: string, href: string): TommyPortfolioLink => ({
  label: {
    no: labelNo,
    en: labelEn,
  },
  href,
});

const poster = (
  src: string,
  altNo: string,
  altEn: string,
  fit: "cover" | "contain" = "contain",
  aspect: "portrait" | "landscape" | "wide" | "square" = "portrait",
): TommyPortfolioImage => ({
  src,
  alt: {
    no: altNo,
    en: altEn,
  },
  fit,
  aspect,
});

export const tommyPortfolioPage = {
  baseProfile: tommyBaseProfile,
  heroEyebrow: {
    no: "Tommy R.A. Garland",
    en: "Tommy R.A. Garland",
  },
  heroTitle: {
    no: "Producer med kontroll på prosjekt, budsjett og leveranse.",
    en: "A producer who keeps project, budget and delivery under control.",
  },
  heroDescription: {
    no: "Tommy kombinerer prisvinnende kortfilm, kommersielle produksjoner og eventer med tydelig produksjonsledelse. Han går inn som produsent, line producer og prosjektleder når prosjekter må lande på tid og budsjett.",
    en: "Tommy combines award-winning short film, commercial productions and events with clear production leadership. He steps in as producer, line producer and project manager when projects need to land on time and on budget.",
  },
  heroRoles: [
    sameText("Producer"),
    sameText("Line Producer"),
    sameText("Project Manager"),
  ],
  heroPrimaryCta: {
    no: "Book møte",
    en: "Book a meeting",
  },
  heroSecondaryCta: {
    no: "Se kortfilm & festivaler",
    en: "View short films & festivals",
  },
  shortFilmsEyebrow: {
    no: "Hovedspor",
    en: "Primary focus",
  },
  shortFilmsTitle: {
    no: "Kortfilm & festivaler",
    en: "Short films & festivals",
  },
  shortFilmsDescription: {
    no: "Prisvinnende kortfilmer og festivalprosjekter, sortert kronologisk og bygget for rask oversikt.",
    en: "Award-winning short films and festival projects, ordered chronologically for a faster overview.",
  },
  shortFilms: [
    {
      slug: "er-det-sa-javlig-vanskelig",
      type: "shortfilm",
      title: sameText("Er det så jævlig vanskelig?"),
      year: "2026",
      role: sameText("Executive Producer"),
      logline: {
        no: "En kortfilmkomedie skrevet og spilt av Morten Hansen, regissert og klippet av Gard Ruben Fauske, om hvor vanskelig det faktisk er å lage film og hva som skjer når ulike personligheter krasjer i samme produksjon.",
        en: "A short comedy written and performed by Morten Hansen, directed and edited by Gard Ruben Fauske, about how difficult filmmaking actually is and what happens when different personalities collide inside the same production.",
      },
      awards: [],
      credits: [
        "Skrevet og spilt av: Morten Hansen",
        "Regi og klipp: Gard Ruben Fauske",
        "Executive produsent: Tommy Garland",
        "BTS-fotograf: Malky Renate Frank",
        "Regiassistent: Johan Ferdinand Ostereng",
        "Lyd på sett: Morten James Willums",
        "Produksjonsassistenter: Emmeline Jansen, Kaja Meloy, Victoria Minos, Vincent Ekeli",
        "Cast: Morten Hansen, Victoria Minos, Johan Ferdinand Ostereng, Kaja Meloy, Emmeline Jansen, Gard Ruben Fauske, Morten James Willums",
      ],
      festivals: [],
      links: [],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/er-det-sa-javlig-vanskelig-poster.jpg",
        "Plakat for Er det så jævlig vanskelig?",
        "Poster for Is It Really That Damn Hard?",
        "cover",
        "portrait",
      ),
      gallery: [],
    },
    {
      slug: "a-message-from-martha",
      type: "shortfilm",
      title: sameText("A Message from Martha"),
      year: "2025",
      role: sameText("Producer"),
      logline: {
        no: "Kort dramafilm regissert av Elia Biondi, produsert av Tommy gjennom Fau&Land i samarbeid med DeBlonde, med fokus på presis gjennomføring og et tydelig internasjonalt uttrykk.",
        en: "A short drama directed by Elia Biondi and produced by Tommy through Fau&Land in collaboration with DeBlonde, built around precise execution and a clear international tone.",
      },
      awards: [
        "Short to the Point - Official Selection (Producer)",
        "Amandus Blikkfang - Official Selection (Producer)",
      ],
      credits: [
        "Regi, manus og executive producer: Elia Biondi",
        "Produsent: Tommy Garland",
        "Foto: Justin Bellucci",
        "Klipp: Svein Olav Sandem",
        "Komponist: Lisa Braathen",
        "Scenografi: Mille Gran",
        "Lyddesign: Simon Skjong",
        "Med: Turid Rachel Bråthen, Celina Skailand, Thor Normann",
      ],
      festivals: [
        "Short to the Point - Official Selection",
        "Amandus Blikkfang - Official Selection",
      ],
      links: [
        externalLink("FilmFreeway", "https://filmfreeway.com/AmessagefromMartha"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/a-message-from-martha-poster.webp",
        "Plakat for A Message from Martha",
        "Poster for A Message from Martha",
      ),
      gallery: [],
    },
    {
      slug: "skjonnheten-skal-frelse-verden",
      type: "shortfilm",
      title: sameText("Skjønnheten skal frelse verden"),
      year: "2024",
      role: sameText("Line producer"),
      logline: {
        no: "Norsk kortfilm regissert og skrevet av Andres Heger-Bratterud, produsert av Alexander Balchen for Både Og, der Tommy gikk inn som line producer på en ensembledrevet festivalfilm med tydelig auteurpreg.",
        en: "A Norwegian short film directed and written by Andres Heger-Bratterud, produced by Alexander Balchen for Både Og, with Tommy serving as line producer on an ensemble-driven festival film with a clear auteur sensibility.",
      },
      awards: [],
      credits: [
        "Regi og manus: Andres Heger-Bratterud",
        "Foto: Morten Forsberg",
        "Produsent: Alexander Balchen",
        "Produksjonsselskap: Både Og",
        "Med: Fredrik Høyer, Kyrre Hellum, Nader Khademi, Evelyn Rasmussen Osazuwa, Christian Waaler, Peder Ulven, Hege Jeanette Eriksen",
      ],
      festivals: [
        "Oslo Pix - 2024",
      ],
      links: [
        externalLink("Oslo Pix", "https://www.oslopix.no/no/film/2024/skj%C3%B8nnheten-skal-frelse-verden"),
        externalLink("Trailer", "https://www.facebook.com/watch/?v=1565485000933742"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/other-roles/skjonnheten-skal-frelse-verden-poster.webp",
        "Poster for Skjønnheten skal frelse verden",
        "Poster for Skjønnheten skal frelse verden",
        "cover",
        "portrait",
      ),
      gallery: [],
    },
    {
      slug: "en-midnatts-vuggesang",
      type: "shortfilm",
      title: {
        no: "En Midnatts Vuggesang / A Midnight Lullaby",
        en: "En Midnatts Vuggesang / A Midnight Lullaby",
      },
      year: "2023",
      role: sameText("Producer"),
      logline: {
        no: "Kort drama om Li-hua, en alenemor i Oslo som forsøker å holde hverdagen sammen mens presset rundt henne øker.",
        en: "A short drama about Li-hua, a single mother in Oslo trying to keep everyday life together as the pressure around her grows.",
      },
      awards: [
        "Golden Chair Award - Nominee, Best Norwegian Short Film (Norwegian Short Film Festival, 2023)",
      ],
      credits: [
        "Språk: Kinesisk, norsk",
        "Regi og manus: Victor Quach",
        "Foto: Mikolaj Kepinski",
        "Musikk: Herman Granlund",
        "Produksjonsdesign: Marie Bøe",
        "Produsenter: Tommy Garland, Victor Quach, Hisham Zaman",
        "Med: Li Xing, Isabella Xing",
      ],
      festivals: [
        "Norwegian Short Film Festival, Grimstad - Official Selection",
      ],
      links: [
        externalLink("Festival page", "https://kortfilmfestivalen.no/film/en-midnatts-vuggesang/"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/a-midnight-lullaby-poster.webp",
        "Plakat for En Midnatts Vuggesang",
        "Poster for A Midnight Lullaby",
      ),
      gallery: [],
    },
    {
      slug: "maura",
      type: "shortfilm",
      title: sameText("Maura"),
      year: "2023",
      role: sameText("Producer"),
      logline: {
        no: "Et gotisk thrillerportrett om ei ung kvinne som konfronterer en mørk familiearv, bygget som en visuelt presis festivalfilm med tydelig sjangeridentitet.",
        en: "A gothic thriller portrait about a young woman confronting a dark family inheritance, built as a visually precise festival film with a strong genre identity.",
      },
      awards: [
        "Audience Award - 2nd Place",
        "Best Thriller Short Film",
        "Best Female Director Short Film - Natassia Malthe",
        "Best Lead Actress Short Film (Special Mention) - Ellen Aabol",
        "Best Lighting Short Film - Rebekka Grendal",
        "Best Art Direction Short Film - Natassia Malthe",
        "Best Sound Design Short Film (Special Mention) - Simon S. Skjong",
      ],
      credits: [
        "Regi: Natassia Linn Malthe",
        "Manus: Philip C Geertsen",
        "Produsent: Tommy Garland",
        "Foto: Julien Oscar Robert Vigneau",
        "Klipp: Martine Sørensen",
        "Lyd: Simon Skjong",
        "Lyddesign: Etienne Streeton",
        "Mix: Hans-Kristian Haugseggen",
        "Med: Ellen M. Aabol, Mari Baade, Odin Vang",
      ],
      festivals: [
        "Official Selection",
        "Live Screening",
        "Nepal Cultural International Film Festival - Official Selection",
        "FICOCC - Screening",
      ],
      links: [
        externalLink("FilmFreeway", "https://filmfreeway.com/MauraShort"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/maura-poster.avif",
        "Plakat for Maura",
        "Poster for Maura",
      ),
      gallery: [],
    },
    {
      slug: "huldredans",
      type: "shortfilm",
      title: sameText("Huldredans"),
      year: "2022",
      role: sameText("Producer"),
      logline: {
        no: "Et mørkt folkeeventyr om et vinterlig møte mellom Magne og en huldra, bygget som en stemningsdrevet kortfilm med sterk visuell identitet og tydelig festivalprofil.",
        en: "A dark folk tale about a winter encounter between Magne and a huldra, built as an atmosphere-driven short with a strong visual identity and clear festival profile.",
      },
      awards: [
        "Best Short Film of the Month",
        "Best Horror Short Film",
        "Best Director (Short Film) - Eskil Hoel Abrahamsen",
        "Special Mention - Screenplay (Short Film) - Eskil Hoel Abrahamsen",
        "Best Lead Actor (Short Film) - Tarjei Sandvik Moe",
        "Best Cinematography (Short Film) - Thomas Husebo",
        "Best Lighting (Short Film)",
      ],
      credits: [
        "Regi: Eskil Hoel Abrahamsen",
        "Manus: Marie Randmæl, Eskil Hoel Abrahamsen, Thomas Husebø, Tarjei Sandvik Moe",
        "Produsent: Tommy Garland",
        "Foto: Thomas Husebø",
        "Klipp: Jesper Widnes",
        "Lyddesign: Etienne Streeton, Joel Kolltveit",
        "Med: Tarjei Sandvik Moe, Amund Harboe, Ylva Bjørkaas Thedin",
      ],
      festivals: [
        "Anatolia IFF - Official Selection",
        "Athens Monthly Art Film Festival - Official Selection",
        "International Sound & Film Music Festival, Croatia - Nominee, Crystal Pine Award (2025)",
        "Sustain Film Festival - Official Selection",
      ],
      links: [
        externalLink("FilmFreeway", "https://filmfreeway.com/HuldredansSHORT"),
        externalLink("IMDb", "https://www.imdb.com/title/tt32215748/"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/huldredans-poster.avif",
        "Plakat for Huldredans",
        "Poster for Huldredans",
      ),
      gallery: [],
    },
    {
      slug: "mirror-effect",
      type: "shortfilm",
      title: sameText("Mirror Effect"),
      year: "2021",
      role: sameText("Producer"),
      logline: {
        no: "Et psykologisk kortdrama om Markus og Mona, et kjærestepar som møter den perfekte familien og gradvis trekkes inn i en urovekkende spiral av sammenligning, begjær og kontroll.",
        en: "A psychological short drama about Markus and Mona, a young couple who meet the perfect family and are slowly pulled into an unsettling spiral of comparison, desire and control.",
      },
      awards: [
        "Best Female Director In A Short Film - Natassia Linn Malthe",
        "Best Poster - Mirror Effect, By Natassia Linn Malthe",
      ],
      credits: [
        "Regi og manus: Natassia Linn Malthe",
        "Produsent: Tommy Garland",
        "Foto: Jakob Lundberg",
        "Klipp: Marie Sørlie",
        "Lyd: Joel Kolltveit, Edvin Skår",
        "Med: Simon Wroldsen, Amalie Njaastad, Siv Vatne Renning",
      ],
      festivals: [
        "Official Selection - Mirror Effect, By Natassia Linn Malthe",
        "Live Screening - Mirror Effect, By Natassia Linn Malthe",
        "MegaFlix Movie Awards - Official Selection",
        "Dare To Imagin9ne Festival - Official Selection",
        "Athens Monthly Art Film Festival - Official Selection",
      ],
      links: [externalLink("FilmFreeway", "https://filmfreeway.com/TitleMirrorEffect")],
      poster: poster(
        "/assets/team/tommy/portfolio/shortfilms/mirror-effect-poster.webp",
        "Plakat for Mirror Effect",
        "Poster for Mirror Effect",
      ),
      gallery: [],
    },
  ] satisfies TommyShortFilmProject[],
  commercialEyebrow: {
    no: "Kommersielt arbeid",
    en: "Commercial work",
  },
  commercialTitle: {
    no: "Reklame & innhold",
    en: "Commercial & content",
  },
  commercialDescription: {
    no: "Utvalgte kommersielle produksjoner der Tommy har holdt struktur, fremdrift og leveranse samlet.",
    en: "Selected commercial productions where Tommy has held structure, momentum and delivery together.",
  },
  commercialProjects: [
    {
      slug: "treningshuset",
      type: "commercial",
      client: "Treningshuset",
      title: sameText("Performance-kampanjer i flere formater"),
      role: sameText("Producer / Project Manager"),
      impact: {
        no: "Filmer bygget for lead-gen, annonser og sosial distribusjon med tydelig medlemsvekst som mål.",
        en: "Films built for lead generation, ads and social distribution with membership growth as the core goal.",
      },
      summary: {
        no: "Produksjonsoppsett med flere kampanjevarianter og formater for web, annonser og SoMe - strukturert så materialet faktisk blir brukt i hele løypa.",
        en: "A production setup with multiple campaign cutdowns and formats for web, ads and social - structured so the material actually gets used across the full rollout.",
      },
      links: [
        internalLink("Åpne case", "Open case", "/case/treningshuset"),
      ],
      poster: poster(
        "/assets/portfolio/treningshuset/posters/treningshuset-musikk-2-45-poster.webp",
        "Still fra Treningshuset-kampanje i portrettformat",
        "Still from the Treningshuset campaign in portrait format",
        "cover",
        "portrait",
      ),
      gallery: [],
    },
    {
      slug: "continental-yellow-banana-heisjef",
      type: "commercial",
      client: "Continental / Yellow Banana / Heisjef",
      title: sameText("Continental reklame med Yellow Banana og Heisjef"),
      role: sameText("PA"),
      impact: {
        no: "Reklameproduksjon for Continental der Tommy bidro som PA i gjennomføringen på set.",
        en: "Commercial production for Continental where Tommy contributed as PA during the shoot.",
      },
      summary: {
        no: "Et Heisjef- og Yellow Banana-prosjekt for Continental, med Tommy som PA i produksjonsapparatet.",
        en: "A Heisjef and Yellow Banana project for Continental, with Tommy as PA in the production team.",
      },
      links: [
        externalLink("Se film", "https://vimeo.com/761019587"),
      ],
      poster: poster(
        "https://i.vimeocdn.com/video/2053007281-04e79e51591c465accf1a9556c52addbabd5012aff546ca807daef556c1d3509-d_295x166?region=us",
        "Still fra Continental-reklame med Yellow Banana og Heisjef",
        "Still from Continental commercial with Yellow Banana and Heisjef",
        "cover",
        "landscape",
      ),
      gallery: [],
    },
    {
      slug: "fix-drive-badeog",
      type: "commercial",
      client: "Fix & Drive / BådeOg",
      title: sameText("Fix & Drive"),
      role: sameText("Linjeprodusent"),
      impact: {
        no: "Reklamefilm for Fix & Drive der Tommy holdt linjeproduksjon og produksjonsflyt samlet.",
        en: "Commercial film for Fix & Drive where Tommy kept line production and production flow aligned.",
      },
      summary: {
        no: "Produksjon for BådeOg og Fix & Drive, med Tommy som linjeprodusent gjennom opptak og leveranse.",
        en: "Production for BådeOg and Fix & Drive, with Tommy as line producer through shoot and delivery.",
      },
      links: [
        externalLink(
          "Se film",
          "https://www.fixdrive.no/app/uploads/2023/09/FixDrive-Snobben-Lyskryss-30sek-Gratis-og-uforpliktende-16x9-1.mp4?_=1",
        ),
        externalLink(
          "Les hos Fix & Drive",
          "https://www.fixdrive.no/om-fix-drive/fix-drive-et-annerledes-bilverksted/",
        ),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/commercial/fix-drive-hovedfilm.jpg",
        "Still fra Fix & Drive-reklame",
        "Still from the Fix & Drive commercial",
        "cover",
        "landscape",
      ),
      gallery: [],
    },
    {
      slug: "ville-gleder",
      type: "commercial",
      client: "Ville Gleder",
      title: sameText("Promofilm og innhold for foredrag"),
      role: sameText("Producer / Project Manager"),
      impact: {
        no: "Innhold laget for booking, synlighet og tydeligere profil på tvers av web og sosiale flater.",
        en: "Content built for bookings, visibility and a clearer profile across web and social channels.",
      },
      summary: {
        no: "Et kommersielt oppsett med flere filmer og uttak som gjør det enklere å selge foredragene videre over tid.",
        en: "A commercial setup with multiple films and cutdowns that makes the talks easier to sell over time.",
      },
      links: [
        internalLink("Åpne case", "Open case", "/case/ville-gleder"),
      ],
      poster: poster(
        "/assets/portfolio/ville-gleder/stills/villmarksforedrag-photo.avif",
        "Still fra Ville Gleder",
        "Still from Ville Gleder",
        "cover",
        "landscape",
      ),
      gallery: [],
    },
    {
      slug: "foreningen-norden",
      type: "commercial",
      client: "Foreningen Norden",
      title: sameText("Innhold for nettside og forklarende kommunikasjon"),
      role: sameText("Producer / Project Manager"),
      impact: {
        no: "Innhold laget for tydeligere posisjonering, bedre forståelse av tilbudet og sterkere digital troverdighet.",
        en: "Content designed for clearer positioning, better audience understanding and stronger digital credibility.",
      },
      summary: {
        no: "Rolig, forklarende produksjon som gjør det enklere å forstå tjenesten og gir kunden en mer helhetlig visuell pakke til nettside og kanaler.",
        en: "A calm explanatory production that makes the offer easier to understand and gives the client a more complete visual package for site and channels.",
      },
      links: [
        internalLink("Åpne case", "Open case", "/case/foreningen-norden"),
      ],
      poster: poster(
        "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.avif",
        "Still fra Foreningen Norden",
        "Still from Foreningen Norden",
        "cover",
        "landscape",
      ),
      gallery: [],
    },
    {
      slug: "nei-til-atomvapen",
      type: "commercial",
      client: "Nei til Atomvåpen",
      title: sameText("Kampanjefilm for mobilisering og synlighet"),
      role: sameText("Producer / Project Manager"),
      impact: {
        no: "Film og uttak som støtter synlighet, mobilisering og tydelig kampanjekommunikasjon på tvers av flere produksjoner.",
        en: "Film and cutdowns that support visibility, mobilisation and clear campaign communication across multiple productions.",
      },
      summary: {
        no: "Samlet produksjonsarbeid for kampanjefilm, konferanse og 1. mai-innhold - bygget for bruk i organisasjonsarbeid og digitale flater.",
        en: "Combined production work across campaign film, conference coverage and 1 May content - built for organisational work and digital distribution.",
      },
      links: [
        internalLink("Åpne case", "Open case", "/case/nei-til-atomvapen"),
      ],
      poster: poster(
        "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.avif",
        "Still fra kampanje for Nei til Atomvåpen",
        "Still from campaign film for No to Nuclear Weapons",
        "cover",
        "landscape",
      ),
      gallery: [],
    },
  ] satisfies TommyShowcaseProject[],
  eventsEyebrow: {
    no: "Prosjektledelse",
    en: "Project leadership",
  },
  eventsTitle: {
    no: "Event",
    en: "Events",
  },
  eventsDescription: {
    no: "Prosjekter der Tommy holder konsept, logistikk og gjennomføring samlet i eventformat.",
    en: "Projects where Tommy keeps concept, logistics and execution aligned in event settings.",
  },
  eventProjects: [
    {
      slug: "kulturarena",
      type: "event",
      client: "Kulturarena AS",
      title: sameText("High-end events og produksjonsflyt"),
      role: sameText("Project Manager"),
      impact: {
        no: "Prosjektledelse for eventer der gjesteopplevelse, logistikk og leveransekvalitet må sitte samtidig.",
        en: "Project management for events where guest experience, logistics and delivery quality all need to land at the same time.",
      },
      summary: {
        no: "Arbeid på tvers av konsept, koordinering og gjennomføring for premium arrangementer med mange bevegelige deler.",
        en: "Work across concept, coordination and execution for premium events with many moving parts.",
      },
      links: [],
      poster: poster(
        "/assets/team/tommy/portfolio/event/kulturarena-poster.webp",
        "Logo for Kulturarena",
        "Kulturarena logotype",
        "contain",
        "wide",
      ),
      gallery: [],
    },
    {
      slug: "the-key-collection",
      type: "event",
      client: "The Key Collection",
      title: sameText("Luxury property rentals & management"),
      role: sameText("Project Manager / Designer"),
      impact: {
        no: "Tydelig prosjektledelse og visuell kontroll i et premium produkt med høye forventninger til detaljnivå og service.",
        en: "Clear project leadership and visual control in a premium offer with high expectations for detail and service.",
      },
      summary: {
        no: "Ansvar for koordinering, design og leveranse i arbeidet med high-end utleie og eiendomsrelatert kundeopplevelse.",
        en: "Responsible for coordination, design and delivery across luxury rentals and property-related guest experiences.",
      },
      links: [],
      poster: poster(
        "/assets/team/tommy/portfolio/event/the-key-collection-poster.webp",
        "Visual for The Key Collection",
        "Visual for The Key Collection",
        "contain",
        "wide",
      ),
    },
    {
      slug: "galleri-tm51",
      type: "event",
      client: "Galleri TM51",
      title: sameText("Utstillinger, kommunikasjon og visuelle konsepter"),
      role: sameText("Project Manager / Designer"),
      impact: {
        no: "Prosjektledelse for utstillinger og kulturflater der konsept, kommunikasjon og visuelt uttrykk må henge tett sammen.",
        en: "Project management for exhibitions and cultural surfaces where concept, communication and visual expression need to stay closely aligned.",
      },
      summary: {
        no: "Arbeid med utstillinger, kommunikasjon og visuelle konsepter i et format som krever både struktur og kuratorisk forståelse.",
        en: "Work spanning exhibitions, communication and visual concepts in a format that requires both structure and curatorial sensitivity.",
      },
      links: [],
      poster: poster(
        "/assets/team/tommy/portfolio/event/tm51-poster.webp",
        "Visual for TM51",
        "Visual for TM51",
        "contain",
        "wide",
      ),
    },
  ] satisfies TommyShowcaseProject[],
  otherRolesEyebrow: {
    no: "Produksjonsbredde",
    en: "Production breadth",
  },
  otherRolesTitle: {
    no: "Film & TV",
    en: "Film & TV",
  },
  otherRolesDescription: {
    no: "",
    en: "",
  },
  otherRoleGroups: [
    {
      slug: "film-and-tv",
      title: {
        no: "",
        en: "",
      },
      description: {
        no: "",
        en: "",
      },
      items: [
        {
          slug: "royalteen",
          title: sameText("Royalteen"),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/royalteen-poster.webp",
            "Poster for Royalteen",
            "Poster for Royalteen",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "royalteen-princesse-margrethe",
          title: sameText("Royalteen: Princess Margrethe"),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/royalteen-princesse-margrethe-poster.webp",
            "Poster for Royalteen: Princess Margrethe",
            "Poster for Royalteen: Princess Margrethe",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "pa-vill-spor",
          title: {
            no: "På vill spor",
            en: "On the Wrong Track",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/pa-vill-spor-poster.webp",
            "Poster for På vill spor",
            "Poster for On the Wrong Track",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "a-storm-for-christmas",
          title: sameText("A Storm for Christmas"),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/storm-for-christmas-poster.webp",
            "Poster for A Storm for Christmas",
            "Poster for A Storm for Christmas",
            "cover",
            "landscape",
          ),
        },
        {
          slug: "affeksjonsverdi",
          title: sameText("Affeksjonsverdi"),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/affeksjonsverdi-poster.webp",
            "Poster for Affeksjonsverdi",
            "Poster for Affeksjonsverdi",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "christmas-tomorrow",
          title: sameText("Christmas Tomorrow"),
        },
        {
          slug: "the-actors-hub-oslo",
          title: sameText("THE ACTORS HUB: \"DON'T ACT\""),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/the-actors-hub-dont-act-poster.webp",
            "Poster for The Actors Hub: Don't Act",
            "Poster for The Actors Hub: Don't Act",
            "cover",
            "landscape",
          ),
        },
        {
          slug: "mitt-skeive-oslo",
          title: sameText("Mitt skeive Oslo"),
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/mitt-skeive-oslo-poster.webp",
            "Still fra Mitt skeive Oslo",
            "Still from Mitt skeive Oslo",
            "cover",
            "landscape",
          ),
        },
      ],
    },
  ] satisfies TommyRoleGroup[],
  aboutEyebrow: {
    no: "Kort om Tommy",
    en: "About Tommy",
  },
  aboutTitle: {
    no: "En lojal, fleksibel og leveringssterk produsent.",
    en: "A loyal, flexible and delivery-focused producer.",
  },
  aboutDescription: {
    no: "Tommy jobber best i prosjekter der noen må holde trådene samlet. Han er sterk på produksjonsledelse, logistikk, budsjettkontroll og leveranser under press - og trives i rollen som den som sikrer at prosjektet faktisk lander.",
    en: "Tommy works best in projects where someone needs to keep all the threads aligned. He is strong on production management, logistics, budget control and delivery under pressure - and thrives in the role of making sure the project actually lands.",
  },
  aboutHighlights: [
    {
      no: "Holder prosjekt, budsjett og fremdrift samlet fra brief til levering.",
      en: "Keeps project, budget and timeline aligned from brief to delivery.",
    },
    {
      no: "Komfortabel i krysningspunktet mellom kreativt arbeid, logistikk og kundedialog.",
      en: "Comfortable at the intersection of creative work, logistics and client dialogue.",
    },
    {
      no: "Erfaring fra film, TV, reklame, event og kulturproduksjon.",
      en: "Experience across film, TV, advertising, events and cultural production.",
    },
  ] satisfies LocalizedText[],
  aboutInfoGroups: [
    {
      title: {
        no: "Utdanning",
        en: "Education",
      },
      items: [
        {
          no: "HK - Westerdals - Bachelor in Film & TV, Producing",
          en: "HK - Westerdals - Bachelor's degree in Film & TV, Producing",
        },
        {
          no: "Kristiania University College - Production Management",
          en: "Kristiania University College - Production Management",
        },
      ],
    },
    {
      title: {
        no: "Tidligere erfaring",
        en: "Previous experience",
      },
      items: [
        {
          no: "Hotel Manager / Sales & Marketing Manager - Verdandi Hotel",
          en: "Hotel Manager / Sales & Marketing Manager - Verdandi Hotel",
        },
      ],
    },
  ] satisfies TommyInfoGroup[],
  ctaTitle: {
    no: "Trenger du en producer som får prosjektet helt i mål?",
    en: "Need a producer who gets the project all the way over the line?",
  },
  ctaDescription: {
    no: "Send en kort brief om mål, timing og omfang. Tommy og Fau&Land følger opp med anbefalt oppsett og neste steg.",
    en: "Send a short brief about your goal, timing and scope. Tommy and Fau&Land will follow up with the recommended setup and next step.",
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
} as const;

export const tommyProfilePage = tommyPortfolioPage;
