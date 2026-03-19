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
  role: LocalizedText;
  summary: LocalizedText;
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
    en: "Tommy combines award-winning short film, commercial productions and live events with clear production leadership. He steps in as producer, line producer and project manager when projects need to land on time and on budget.",
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
    no: "De viktigste kortfilmprosjektene Tommy har produsert, strukturert med plakat, awards, festivaler og lenker. Hver film kan senere utvides med flere posters, stills og galleriinnhold uten å endre layouten.",
    en: "Tommy's key short-film credits, structured with poster, awards, festivals and links. Each project can later be expanded with more posters, stills and gallery assets without touching the layout.",
  },
  shortFilms: [
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
        "South Film and Arts Academy Festival - Best Poster, Best Female Director (2025)",
        "Five Continents International Film Festival - Award Winner (2025)",
        "FICOCC - Special Mention, Best Lead Actor (2025)",
      ],
      festivals: [
        "MegaFlix Movie Awards - Official Selection",
        "Dare To Imagin9ne Festival - Official Selection",
        "Athens Monthly Art Film Festival - Official Selection",
      ],
      links: [externalLink("FilmFreeway", "https://filmfreeway.com/TitleMirrorEffect")],
      poster: poster(
        "/assets/team/tommy/portfolio/mirror-effect/mirror-effect-poster.jpg",
        "Plakat for Mirror Effect",
        "Poster for Mirror Effect",
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
        "South Film and Arts Academy Festival - Best Horror, Screenplay, Cinematography, Art Direction, Audience Award, Hon. Mention Director",
        "Five Continents International Film Festival - Award Winner (2025)",
        "International Sound & Film Music Festival, Croatia - Nominee, Crystal Pine Award (2025)",
      ],
      festivals: [
        "Anatolia IFF - Official Selection",
        "Athens Monthly Art Film Festival - Official Selection",
        "Sustain Film Festival - Official Selection",
      ],
      links: [externalLink("FilmFreeway", "https://filmfreeway.com/HuldredansSHORT")],
      poster: poster(
        "/assets/portfolio/huldredans/posters/huldredans-poster.jpg",
        "Plakat for Huldredans",
        "Poster for Huldredans",
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
        "Touchstone Independent Film Festival - Best Fantasy Short, Best Original Story (2025)",
        "Five Continents International Film Festival - Best Thriller Short, Audience Award 2nd Place, Female Director, Art Direction, Lighting, Young Actress, Sound Design (2025)",
        "Athens Monthly Art Film Festival - Finalist & Honorable Mention (2026)",
      ],
      festivals: [
        "Nepal Cultural International Film Festival - Official Selection",
        "FICOCC - Live Screening",
      ],
      links: [
        externalLink("FilmFreeway", "https://filmfreeway.com/MauraShort"),
        externalLink("Trailer", "https://www.youtube.com/watch?v=3SA8MLCaGQs&t=1s"),
        externalLink("IMDb", "https://www.imdb.com/title/tt32215748/"),
      ],
      poster: poster(
        "/assets/team/tommy/portfolio/maura/maura-poster.png",
        "Plakat for Maura",
        "Poster for Maura",
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
      festivals: [
        "Norwegian Short Film Festival, Grimstad - Official Selection",
      ],
      links: [
        externalLink("Festival page", "https://kortfilmfestivalen.no/film/en-midnatts-vuggesang/"),
      ],
      poster: poster(
        "/assets/portfolio/midnatts-vuggesang/posters/en-midnatts-vuggesang-poster.jpg",
        "Plakat for En Midnatts Vuggesang",
        "Poster for A Midnight Lullaby",
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
      festivals: [
        "Short to the Point - Official Selection",
        "Amandus Blikkfang - Official Selection",
      ],
      links: [
        externalLink("FilmFreeway", "https://filmfreeway.com/AmessagefromMartha"),
      ],
      poster: poster(
        "/assets/portfolio/a-message-from-martha/posters/a-message-from-martha-poster.jpeg",
        "Plakat for A Message from Martha",
        "Poster for A Message from Martha",
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
    no: "Kommersielle leveranser Tommy kan stå inne for som produsent og prosjektleder - strukturert som cards, så det er lett å fylle på nye kundeprosjekter, videolenker og posters senere.",
    en: "Commercial deliveries Tommy can stand behind as producer and project manager - structured as cards so new client projects, video links and posters can be added later without touching the layout.",
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
        "/assets/portfolio/treningshuset/posters/treningshuset-bred-poster.png",
        "Still fra Treningshuset-kampanje",
        "Still from the Treningshuset campaign",
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
        "/assets/portfolio/foreningen-norden/posters/foreningen-norden-nettsideinnhold-poster.png",
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
        no: "Kortformat og kampanjefilm som støtter synlighet, mobilisering og klar politisk kommunikasjon.",
        en: "Short-form and campaign films that support visibility, mobilisation and clear political communication.",
      },
      summary: {
        no: "Produksjon med flere uttak og distribusjonsflater, tilpasset organisasjonsarbeid og målrettede digitale kampanjer.",
        en: "A production setup with multiple outputs and distribution surfaces, tailored for organisational work and targeted digital campaigns.",
      },
      links: [
        internalLink("Åpne case", "Open case", "/case/nei-til-atomvapen"),
      ],
      poster: poster(
        "/assets/portfolio/nei-til-atomvapen/posters/bli-med-i-kampen-poster.png",
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
    no: "Event & live",
    en: "Events & live",
  },
  eventsDescription: {
    no: "Utvalgte oppdrag der Tommy leder opplevelser, logistikk og gjennomføring i settinger som krever presisjon, trygghet og høy finish.",
    en: "Selected assignments where Tommy leads experience design, logistics and execution in settings that require precision, calm and high finish.",
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
        "/assets/team/tommy/portfolio/event/kulturarena-poster.png",
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
    },
  ] satisfies TommyShowcaseProject[],
  otherRolesEyebrow: {
    no: "Bredde",
    en: "Breadth",
  },
  otherRolesTitle: {
    no: "Andre roller i film & TV",
    en: "Other roles in film & TV",
  },
  otherRolesDescription: {
    no: "Et sideblikk på roller som bygger produksjonsforståelsen, uten å ta fokus fra Tommy sitt hovedspor som produsent.",
    en: "A side view of the roles that strengthen Tommy's production judgement, without stealing focus from his core producer track.",
  },
  otherRoleGroups: [
    {
      slug: "line-producer-and-wrangler",
      title: {
        no: "Line producer & wrangler",
        en: "Line producer & wrangler",
      },
      description: {
        no: "Større produksjoner og settroller som viser evne til logistikk, koordinering og ro under press.",
        en: "Larger productions and on-set roles that show strong logistics, coordination and calm under pressure.",
      },
      items: [
        {
          slug: "skjonnheten-skal-frelse-verden",
          title: sameText("Skjønnheten skal frelse verden"),
          role: sameText("Line Producer"),
          summary: {
            no: "Holdes som en tydelig line producer-credit og ligger bevisst utenfor hovedseksjonen for kortfilm, slik at produsentsporet fortsatt er hovedfokus.",
            en: "Kept as a distinct line producer credit outside the primary short-film section so the producer track remains the main focus.",
          },
        },
        {
          slug: "royalteen",
          title: sameText("Royalteen"),
          role: sameText("Wrangler"),
          summary: {
            no: "Wrangler-rolle i en større Netflix-produksjon med behov for tydelig koordinering og kontroll på statist- og setflyt.",
            en: "Wrangler role on a larger Netflix production that required clear coordination and control across extras and on-set flow.",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/royalteen-poster.png",
            "Poster for Royalteen",
            "Poster for Royalteen",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "royalteen-princesse-margrethe",
          title: sameText("Royalteen: Princess Margrethe"),
          role: sameText("Wrangler"),
          summary: {
            no: "Videre arbeid i Netflix-universet, med ansvar som bygger erfaring fra større sett og krevende produksjonsflyt.",
            en: "Continued work in the Netflix universe, building experience from larger sets and demanding production flow.",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/royalteen-princesse-margrethe-poster.png",
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
          role: sameText("Wrangler"),
          summary: {
            no: "Wrangler-arbeid i en større Netflix-produksjon med høyt tempo og behov for trygg koordinering.",
            en: "Wrangler work on a larger Netflix production with a fast pace and a need for dependable coordination.",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/pa-vill-spor-poster.jpg",
            "Poster for På vill spor",
            "Poster for On the Wrong Track",
            "cover",
            "portrait",
          ),
        },
        {
          slug: "a-storm-for-christmas",
          title: sameText("A Storm for Christmas"),
          role: sameText("Wrangler"),
          summary: {
            no: "Wrangler-rolle i juleproduksjon med mange bevegelige deler og krevende gjennomføring.",
            en: "Wrangler role on a Christmas production with many moving parts and demanding execution.",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/storm-for-christmas-poster.png",
            "Poster for A Storm for Christmas",
            "Poster for A Storm for Christmas",
            "cover",
            "landscape",
          ),
        },
        {
          slug: "affeksjonsverdi",
          title: sameText("Affeksjonsverdi"),
          role: sameText("Wrangler"),
          summary: {
            no: "Settrolle i en større spillefilmproduksjon som understøtter Tommy sin bredde og on-set erfaring.",
            en: "An on-set role in a larger feature-film production that underlines Tommy's breadth and on-set experience.",
          },
        },
        {
          slug: "christmas-tomorrow",
          title: sameText("Christmas Tomorrow"),
          role: sameText("Wrangler"),
          summary: {
            no: "Wrangler-arbeid i Netflix-relatert produksjonsløp med fokus på kontroll og gjennomføring under press.",
            en: "Wrangler work in a Netflix-related production flow focused on control and execution under pressure.",
          },
        },
      ],
    },
    {
      slug: "producer-other-projects",
      title: {
        no: "Producer - andre prosjekter",
        en: "Producer - other projects",
      },
      description: {
        no: "Prosjekter og miljøer der Tommy har produsert workshops, kulturinnhold og andre formater utenfor hovedsporet i kortfilm og reklame.",
        en: "Projects and environments where Tommy has produced workshops, cultural content and other formats outside his main short-film and commercial focus.",
      },
      items: [
        {
          slug: "north-stars-acting-hub",
          title: sameText("North Stars Acting Hub"),
          role: sameText("Producer"),
          summary: {
            no: "Produsent på flere workshops og prosjekter, blant annet med David Nutter, Paul Johansson og Albert Hughes.",
            en: "Producer on multiple workshops and projects, including work connected to David Nutter, Paul Johansson and Albert Hughes.",
          },
        },
        {
          slug: "the-actors-hub-oslo",
          title: sameText("The Actors' Hub Oslo"),
          role: sameText("Producer"),
          summary: {
            no: "Produsentarbeid for acting hub og workshop-format med fokus på trygg gjennomføring og tydelig ramme rundt deltakere og fagpersoner.",
            en: "Producer work for an acting hub and workshop format focused on calm execution and a clear framework for participants and mentors.",
          },
        },
        {
          slug: "mitt-skeive-oslo",
          title: sameText("Mitt skeive Oslo"),
          role: sameText("Producer"),
          summary: {
            no: "Produsentrolle på kultur- og identitetsdrevet prosjekt med tydelig innholdsmessig profil.",
            en: "Producer role on a culturally and identity-driven project with a clear editorial profile.",
          },
          poster: poster(
            "/assets/team/tommy/portfolio/other-roles/mitt-skeive-oslo-poster.png",
            "Still fra Mitt skeive Oslo",
            "Still from Mitt skeive Oslo",
            "cover",
            "landscape",
          ),
        },
      ],
    },
    {
      slug: "photo-first-ad-pa",
      title: {
        no: "Foto / 1st AD / PA",
        en: "Photo / 1st AD / PA",
      },
      description: {
        no: "Produksjonsnære roller som viser praktisk bredde og forståelse for hvordan team og opptaksdager faktisk fungerer.",
        en: "Hands-on production roles that show practical breadth and a strong understanding of how teams and shooting days actually work.",
      },
      items: [
        {
          slug: "norgesexpo",
          title: sameText("Norgesexpo - PlayStation L2R2"),
          role: sameText("Photographer"),
          summary: {
            no: "Fotograf for studioopptak med fokus på kontrollert produksjonsmiljø og tydelig leveranse.",
            en: "Photographer for studio work with focus on a controlled production setup and clear delivery.",
          },
        },
        {
          slug: "norwegian-film-school",
          title: sameText("Norwegian Film School"),
          role: sameText("1st Assistant Director"),
          summary: {
            no: "1st AD-rolle som bygger praktisk erfaring med plan, settflyt og tydelig avvikling av opptaksdager.",
            en: "1st AD work that builds practical experience with planning, on-set flow and clear execution of shooting days.",
          },
        },
        {
          slug: "heisjef-advertising",
          title: sameText("HeiSjef Advertising"),
          role: sameText("Production Assistant"),
          summary: {
            no: "Production assistant på kommersielle produksjoner med fokus på støttefunksjoner og struktur i gjennomføringen.",
            en: "Production assistant work on commercial productions focused on support functions and structure in execution.",
          },
        },
        {
          slug: "ruter-jac-skilt",
          title: sameText("Ruter / Jac Skilt Advertising"),
          role: sameText("Advertising & Coordination"),
          summary: {
            no: "Koordinering og reklamerelatert arbeid som styrker forståelsen for kommersielle leveranser og kundekrav.",
            en: "Coordination and advertising-related work that strengthens Tommy's understanding of commercial delivery and client requirements.",
          },
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
