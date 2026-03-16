import type { LocalizedText } from "@/lib/i18n";

export type FounderStrength = {
  title: LocalizedText;
  description: LocalizedText;
};

export type FounderHighlight = {
  title: string;
  eyebrow: LocalizedText;
  description: LocalizedText;
  href?: string;
  ctaLabel?: LocalizedText;
};

export type FounderInfoGroup = {
  title: LocalizedText;
  items: LocalizedText[];
};

export type FounderProfile = {
  slug: string;
  href: string;
  name: string;
  role: LocalizedText;
  tagline: LocalizedText;
  summary: LocalizedText;
  portrait: string;
  portraitAlt: LocalizedText;
  heroBackground: string;
  heroBackgroundAlt: LocalizedText;
  supportingVisual: string;
  supportingVisualAlt: LocalizedText;
  introEyebrow: LocalizedText;
  introTitle: LocalizedText;
  introBody: LocalizedText;
  strengths: FounderStrength[];
  highlightsEyebrow: LocalizedText;
  highlightsTitle: LocalizedText;
  highlightsDescription: LocalizedText;
  highlights: FounderHighlight[];
  backgroundEyebrow: LocalizedText;
  backgroundTitle: LocalizedText;
  backgroundDescription: LocalizedText;
  backgroundGroups: FounderInfoGroup[];
  ctaTitle: LocalizedText;
  ctaDescription: LocalizedText;
  ctaLabel: LocalizedText;
};

export const founderProfiles: FounderProfile[] = [
  {
    slug: "tommy-garland",
    href: "/team/tommy-garland",
    name: "Tommy R.A. Garland",
    role: {
      no: "Producer og partner",
      en: "Producer and partner",
    },
    tagline: {
      no: "Holder brief, budsjett og gjennomføring samlet fra første møte til ferdig leveranse.",
      en: "Keeps brief, budget and execution aligned from the first conversation to final delivery.",
    },
    summary: {
      no: "Tommy kombinerer produsentansvar, kundedialog og prosjektledelse med erfaring fra reklame, event, TV og festivalnære kortfilmer.",
      en: "Tommy combines producing, client dialogue and project leadership with experience across advertising, events, TV and festival-bound short films.",
    },
    portrait: "/assets/team/tommy/images/tommy-garland-profile.jpeg",
    portraitAlt: {
      no: "Portrett av Tommy R.A. Garland",
      en: "Portrait of Tommy R.A. Garland",
    },
    heroBackground: "/assets/visuals/section-images/section-film-studio-cyclorama.jpg",
    heroBackgroundAlt: {
      no: "Filmstudio med lys, crew og produksjonsrigg",
      en: "Film studio with lights, crew and production rigging",
    },
    supportingVisual: "/assets/visuals/section-images/section-film-crew-outdoors.jpg",
    supportingVisualAlt: {
      no: "Filmcrew i arbeid utendørs",
      en: "Film crew working outdoors",
    },
    introEyebrow: {
      no: "Produsentprofil",
      en: "Producer profile",
    },
    introTitle: {
      no: "Et produsentblikk som kombinerer kontroll, tempo og kommersiell forståelse.",
      en: "A producer's perspective that combines control, pace and commercial understanding.",
    },
    introBody: {
      no: "Tommy er producer og partner i Fau&Land Film, med utdanning fra Westerdals i Film & TV og produksjonsledelse fra Kristiania. Han leder produksjoner tett gjennom brief, logistikk, økonomi og kundeoppfølging, og har bygget erfaring på tvers av reklame, TV, event og uavhengig filmarbeid.",
      en: "Tommy is a producer and partner at Fau&Land Film, with film and TV studies from Westerdals and production management training from Kristiania. He stays close to the brief, logistics, budget and client communication, with experience across advertising, TV, events and independent film work.",
    },
    strengths: [
      {
        title: {
          no: "Produsentansvar fra start til slutt",
          en: "Producer ownership from start to finish",
        },
        description: {
          no: "Samler brief, budsjett, fremdrift og leveranse i ett tydelig produksjonsspor for både kunde og team.",
          en: "Keeps the brief, budget, schedule and delivery aligned in one clear production track for both client and crew.",
        },
      },
      {
        title: {
          no: "Sterk på prosjektflyt og kundedialog",
          en: "Strong on project flow and client dialogue",
        },
        description: {
          no: "Bygger ro rundt prosessen og gjør det lettere å ta gode beslutninger underveis i produksjonen.",
          en: "Creates calm around the process and makes it easier to make strong decisions throughout production.",
        },
      },
      {
        title: {
          no: "Erfaring fra reklame, TV, event og kortfilm",
          en: "Experience across advertising, TV, events and short film",
        },
        description: {
          no: "Har jobbet både kommersielt og prosjektbasert i produksjoner som krever presisjon, koordinering og høy leveringstakt.",
          en: "Has worked across commercial and project-based productions that demand precision, coordination and a high delivery tempo.",
        },
      },
    ],
    highlightsEyebrow: {
      no: "Utvalgte høydepunkter",
      en: "Selected highlights",
    },
    highlightsTitle: {
      no: "Kuraterte produksjoner og roller som viser bredden i Tommy sitt arbeid.",
      en: "Curated productions and roles that show the breadth of Tommy's work.",
    },
    highlightsDescription: {
      no: "Et utvalg arbeid som spenner fra high-end events og reklame til workshop-produksjon, TV og festivalrelevant kortfilm.",
      en: "A selection of work spanning high-end events and advertising to workshop productions, TV and festival-facing short films.",
    },
    highlights: [
      {
        title: "Fau&Land Film / Kulturarena",
        eyebrow: {
          no: "Producer / prosjektleder",
          en: "Producer / project lead",
        },
        description: {
          no: "Leder produksjoner og arrangementer med krav til tydelig koordinering, tett kundedialog og høy finish i leveransen.",
          en: "Leads productions and events that demand clear coordination, close client dialogue and a high-finish delivery.",
        },
      },
      {
        title: "North Stars Acting Hub",
        eyebrow: {
          no: "Internasjonale workshops",
          en: "International workshops",
        },
        description: {
          no: "Produsent på prosjekter og workshops med internasjonale profiler som David Nutter, Paul Johansson og Albert Hughes.",
          en: "Produced projects and workshops involving international names such as David Nutter, Paul Johansson and Albert Hughes.",
        },
      },
      {
        title: "Netflix / NRK / TV 2",
        eyebrow: {
          no: "Koordinering og on-set roller",
          en: "Coordination and on-set roles",
        },
        description: {
          no: "Erfaring fra produksjoner som Christmas Tomorrow, Royal Teen 2, EXIT 3, Maskorama og Hodejegerne.",
          en: "Experience from productions such as Christmas Tomorrow, Royal Teen 2, EXIT 3, Maskorama and Headhunters.",
        },
      },
      {
        title: "Festivalnære kortfilmer",
        eyebrow: {
          no: "Produsent / linjeprodusent",
          en: "Producer / line producer",
        },
        description: {
          no: "Arbeid knyttet til titler som Huldredans, Maura, En Midnatts Vuggesang, Mirror Effect og A Message From Martha.",
          en: "Work connected to titles such as Huldredans, Maura, En Midnatts Vuggesang, Mirror Effect and A Message From Martha.",
        },
      },
    ],
    backgroundEyebrow: {
      no: "Bakgrunn",
      en: "Background",
    },
    backgroundTitle: {
      no: "Utdanning og erfaring som bygger produsentroverdighet.",
      en: "Education and experience that underpin strong producer-level judgement.",
    },
    backgroundDescription: {
      no: "Tommy kombinerer produksjonsfaglig utdanning med erfaring fra reklame, TV, event og visuelt prosjektarbeid.",
      en: "Tommy combines formal production training with hands-on experience in advertising, TV, events and visual project work.",
    },
    backgroundGroups: [
      {
        title: {
          no: "Utdanning",
          en: "Education",
        },
        items: [
          {
            no: "Westerdals: Bachelor i Film & TV, produsent- og produksjonsfokus.",
            en: "Westerdals: Bachelor's degree in Film & TV with a producing-focused track.",
          },
          {
            no: "Kristiania: Produksjonsledelse for film og TV.",
            en: "Kristiania: Production management for film and TV.",
          },
        ],
      },
      {
        title: {
          no: "Relevant erfaring",
          en: "Relevant experience",
        },
        items: [
          {
            no: "Både Og, Sentinel Film og Fau&Land Film som produsent, line producer og prosjektleder.",
            en: "Både Og, Sentinel Film and Fau&Land Film in producer, line producer and project management roles.",
          },
          {
            no: "The Key Collection og Galleri TM51 med prosjektledelse, design og visuell koordinering.",
            en: "The Key Collection and Galleri TM51 with project management, design and visual coordination.",
          },
          {
            no: "Norgesexpo, Filmskolen på Innlandet, Heisjef og andre produksjoner på tvers av studio, reklame og kortfilm.",
            en: "Norgesexpo, the Norwegian Film School and Heisjef across studio, advertising and short-film production work.",
          },
        ],
      },
    ],
    ctaTitle: {
      no: "Trenger dere en produsent som holder prosjektet stramt og rolig?",
      en: "Need a producer who keeps the project calm, tight and moving?",
    },
    ctaDescription: {
      no: "Send en kort brief, så følger Fau&Land Film opp med anbefalt format, omfang og neste steg.",
      en: "Send a short brief and Fau&Land Film will follow up with the right format, scope and next step.",
    },
    ctaLabel: {
      no: "Snakk med oss om prosjektet",
      en: "Talk to us about the project",
    },
  },
  {
    slug: "gard-ruben-fauske",
    href: "/team/gard-ruben-fauske",
    name: "Gard Ruben Fauske",
    role: {
      no: "Daglig leder, prosjektleder og regissør",
      en: "Managing director, project lead and director",
    },
    tagline: {
      no: "Kobler historiefortelling, regi, klipp og produksjonsledelse i ett tydelig kreativt spor.",
      en: "Connects story, direction, edit and production leadership into one clear creative track.",
    },
    summary: {
      no: "Gard leder regi, fortelling og klipp med erfaring fra reklameproduksjoner, kortfilm, TV-serier og komplette produksjonsløp.",
      en: "Gard leads direction, story and edit with experience across commercial productions, short film, series work and full production pipelines.",
    },
    portrait: "/assets/team/gard/images/gard-profile.png",
    portraitAlt: {
      no: "Portrett av Gard Ruben Fauske",
      en: "Portrait of Gard Ruben Fauske",
    },
    heroBackground: "/assets/visuals/cinematic/cinematic-camera-darkroom.jpg",
    heroBackgroundAlt: {
      no: "Kamerarigg i mørkt produksjonsmiljø",
      en: "Camera rig in a dark production environment",
    },
    supportingVisual: "/assets/visuals/section-images/section-film-crew-outdoors.jpg",
    supportingVisualAlt: {
      no: "Crew og opptaksrigg i arbeid",
      en: "Crew and production rig working on set",
    },
    introEyebrow: {
      no: "Regi og prosjektledelse",
      en: "Direction and project leadership",
    },
    introTitle: {
      no: "Historiefortelling med kontroll på både opptak, struktur og etterarbeid.",
      en: "Storytelling with control across production, structure and post.",
    },
    introBody: {
      no: "Gard Ruben Fauske er daglig leder, prosjektleder og regissør i Fau&Land Film. Han kombinerer historiefortelling, regi, klipp og innspillingsledelse, med erfaring fra reklameproduksjon, kortfilm og kreative produksjonsmiljøer i både Norge og Los Angeles.",
      en: "Gard Ruben Fauske is the managing director, project lead and director at Fau&Land Film. He combines story, direction, edit and set leadership with experience from commercial production, short film and creative production environments in both Norway and Los Angeles.",
    },
    strengths: [
      {
        title: {
          no: "Sterk på regi og historiefortelling",
          en: "Strong on direction and story",
        },
        description: {
          no: "Oversetter brief og idé til tydelige bilder, rytme og fortelling som gir filmen et klart uttrykk.",
          en: "Translates brief and concept into clear images, rhythm and story with a defined point of view.",
        },
      },
      {
        title: {
          no: "Klipp og form i samme hånd",
          en: "Edit and form in the same hand",
        },
        description: {
          no: "Tar arbeidet videre i etterarbeid og holder retningen tydelig helt frem til ferdig leveranse.",
          en: "Carries the work forward in post and keeps the direction clear through final delivery.",
        },
      },
      {
        title: {
          no: "Trygg på produksjonsledelse",
          en: "Confident in production leadership",
        },
        description: {
          no: "Er vant til å lede produksjoner, planlegge opptak og holde oversikt i både mindre og større oppsett.",
          en: "Used to leading productions, planning shoots and keeping control across both smaller and larger setups.",
        },
      },
    ],
    highlightsEyebrow: {
      no: "Utvalgte høydepunkter",
      en: "Selected highlights",
    },
    highlightsTitle: {
      no: "Arbeid som viser Gard sitt spenn mellom regi, klipp og produksjonsansvar.",
      en: "Work that shows Gard's range across direction, edit and production leadership.",
    },
    highlightsDescription: {
      no: "Fra kampanjeproduksjoner og byråarbeid til mer fortellende filmprosjekter og egne regiarbeid.",
      en: "From campaign work and agency production to more narrative film projects and original directing work.",
    },
    highlights: [
      {
        title: "The Giant Artist",
        eyebrow: {
          no: "Regi og klipp",
          en: "Direction and edit",
        },
        description: {
          no: "Et dokumentarisk prosjekt som viser Gard sitt fortellende blikk og evne til å forme materiale i klipp.",
          en: "A documentary project that shows Gard's narrative eye and ability to shape material in the edit.",
        },
      },
      {
        title: "The Voice Within",
        eyebrow: {
          no: "Regi / produsent",
          en: "Direction / producing",
        },
        description: {
          no: "Kortfilm der han kombinerte regi, produsentansvar og produksjonsledelse i ett og samme prosjekt.",
          en: "A short film where he combined direction, producing and production leadership within one project.",
        },
      },
      {
        title: "Yellow Banana-kampanjer",
        eyebrow: {
          no: "Prosjektledelse",
          en: "Project leadership",
        },
        description: {
          no: "Ledet reklameproduksjoner for blant annet Continental, Efi, Mental Helse Ungdom, Nor-Way Bussekspress og Vibb.",
          en: "Led commercial productions for brands and organisations including Continental, Efi, Mental Helse Ungdom, Nor-Way Bussekspress and Vibb.",
        },
      },
      {
        title: "Heisjef / Nord DDB / Monster / Fantefilm",
        eyebrow: {
          no: "Produksjonsledelse og set-arbeid",
          en: "Production leadership and set work",
        },
        description: {
          no: "Erfaring som produksjonsleder, innspillingsleder, koordinator og produsent på tvers av reklame, serie og kortfilm.",
          en: "Experience as production manager, first AD, coordinator and producer across commercials, series and short films.",
        },
      },
    ],
    backgroundEyebrow: {
      no: "Bakgrunn",
      en: "Background",
    },
    backgroundTitle: {
      no: "Studier og arbeidslinje som gir både kreativ og produksjonsmessig tyngde.",
      en: "Studies and work history that add both creative and production depth.",
    },
    backgroundDescription: {
      no: "Gard kombinerer faglig filmutdanning med praktisk erfaring fra byrå, produksjonsselskap og egne prosjekter.",
      en: "Gard combines formal film studies with hands-on work from agency, production-company and self-initiated projects.",
    },
    backgroundGroups: [
      {
        title: {
          no: "Utdanning",
          en: "Education",
        },
        items: [
          {
            no: "NTNU: Bachelor i film- og videoproduksjon.",
            en: "NTNU: Bachelor's degree in film and video production.",
          },
          {
            no: "Fagskolen Kristiania: Produksjonsledelse for film og TV.",
            en: "Fagskolen Kristiania: Production management for film and TV.",
          },
          {
            no: "California State University Los Angeles: Utveksling i film- og TV-produksjon.",
            en: "California State University Los Angeles: Exchange studies in film and TV production.",
          },
        ],
      },
      {
        title: {
          no: "Relevant erfaring",
          en: "Relevant experience",
        },
        items: [
          {
            no: "Fau&Land Film som daglig leder, prosjektleder og regissør.",
            en: "Fau&Land Film as managing director, project lead and director.",
          },
          {
            no: "Yellow Banana som prosjektleder på reklameproduksjoner og gjennomføringsansvar.",
            en: "Yellow Banana as project manager across commercial productions and execution-heavy campaigns.",
          },
          {
            no: "Freelancearbeid for Nord DDB, Heisjef, Monster, Fantefilm og internasjonale produksjoner i Los Angeles.",
            en: "Freelance work for Nord DDB, Heisjef, Monster, Fantefilm and international productions in Los Angeles.",
          },
        ],
      },
    ],
    ctaTitle: {
      no: "Trenger dere regi og prosjektledelse i samme produksjonspartner?",
      en: "Need direction and project leadership in the same production partner?",
    },
    ctaDescription: {
      no: "Send en kort brief, så følger Fau&Land Film opp med anbefalt format og neste steg.",
      en: "Send a short brief and Fau&Land Film will follow up with the right format and next step.",
    },
    ctaLabel: {
      no: "Send en kort brief",
      en: "Send a short brief",
    },
  },
];

export function getFounderProfile(slug: string) {
  return founderProfiles.find((profile) => profile.slug === slug);
}
