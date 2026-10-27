export type ProjectImage = {
  src: string;
  alt: string;
  aspect: number;
  caption: string;
  textureSrc?: string;
};

export type Project = {
  slug: string;
  title: string;
  type: string;
  year: string;
  summary: string;
  role: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  overview: string;
  focus: string[];
  approach: string;
  credit?: string;
  liveUrl?: string;
  liveUnavailable?: boolean;
  repository?: { url: string; description: string; note: string };
  intro?: { eyebrow: string; headline: string[] };
};

const capture = (name: string, alt: string, caption: string, aspect = 1.6): ProjectImage => ({
  src: `/work/case-studies/${name}.webp`, alt, caption, aspect,
});

export const projects: Project[] = [
  {
    slug: "lane",
    title: "LANE",
    type: "Campaign platform",
    year: "2026",
    summary: "A campaign archive with a different tempo for every night.",
    role: "Creative development, front end, and interaction design",
    cover: {
      src: "/work/case-studies/lane-opening.webp",
      textureSrc: "/work/spatial/lane.webp",
      alt: "LANE homepage with a metallic sculpture, HEAT campaign artwork and editorial typography.",
      aspect: 1.6,
      caption: "Opening / HEAT artwork within the LANE homepage",
    },
    gallery: [
      capture("lane-campaign", "LANE HEAT campaign page presenting the original square poster beside its introduction.", "Campaign / original artwork given its own page"),
      capture("lane-archive", "LANE campaign archive with artwork filters and distinct event posters.", "Archive / original artwork and footage-derived identities"),
      capture("lane-mobile", "The actual LANE mobile homepage with typography, sculpture and HEAT artwork.", "Responsive / a deliberate vertical campaign composition", 780 / 1688),
    ],
    overview:
      "A campaign archive for independent nights in Agra. One browsing system gives seven distinct event identities room to lead.",
    focus: [
      "A campaign selector that keeps each poster and its details in sync",
      "A locally rendered Three.js sculpture, with a still fallback",
      "Seven event pages built from supplied artwork and confirmed details",
    ],
    approach:
      "The supplied posters set the visual direction. Campaign records supply the homepage, archive filters and individual routes. The sequence shows the homepage, HEAT detail, archive and responsive composition from the actual local implementation.",
    liveUrl: "https://thelane.vercel.app/",
  },
  {
    slug: "arcus",
    title: "ARCUS",
    type: "Training product",
    year: "2026",
    summary: "A training log designed around the next session, online or off.",
    role: "Product engineering and interface development",
    cover: {
      src: "/work/case-studies/arcus-dashboard.webp",
      textureSrc: "/work/spatial/arcus.webp",
      alt: "ARCUS Training dashboard with the next-session prompt and weekly training overview.",
      aspect: 1.6,
      caption: "Training / the actual signed-out dashboard in its empty state",
    },
    gallery: [
      capture("arcus-workout", "ARCUS workout start screen before a session has been created.", "Session entry / the workout start screen, with no invented activity"),
      capture("arcus-exercises", "ARCUS exercise catalogue with search and muscle filters.", "Exercise library / search, filters and movement details"),
      capture("arcus-mobile", "Actual ARCUS responsive training dashboard in a signed-out browser.", "Responsive / session entry and sign-in boundaries", 780 / 1688),
    ],
    overview:
      "A strength-training interface built around the next session. Desktop and mobile dashboards put workout entry ahead of secondary tools.",
    focus: [
      "Workout entry that stays available without a network connection",
      "Training history, routines, recovery, and progress views",
      "A responsive dashboard built for quick decisions between sessions",
    ],
    approach:
      "The next-session action leads the training dashboard. The source includes IndexedDB workout records, local draft backup and account sync. These fresh, signed-out captures show actual empty states and catalogue interfaces; they do not demonstrate remote synchronization or completed workouts.",
    liveUrl: "https://thearcus.vercel.app/",
    repository: {
      url: "https://github.com/ojeshfrrr/arcus",
      description: "A training log with an IndexedDB-backed workout logger, exercise search, and an offline shell.",
      note: "Public fork of gauravxsuvo/arcus. The repository README documents the project as Forge Training.",
    },
  },
  {
    slug: "teen-fiesta",
    title: "TEEN FIESTA",
    type: "Event website",
    year: "2026",
    summary: "A digital experience for Teen Fiesta, bringing its visual identity, event information and available media together in one cohesive website.",
    intro: {
      eyebrow: "TEEN FIESTA / EVENT WEBSITE",
      headline: ["A website built", "for the event."],
    },
    role: "Creative development and front-end engineering",
    cover: {
      src: "/work/case-studies/teen-fiesta-film.webp",
      textureSrc: "/work/spatial/teen-fiesta-website.webp",
      alt: "Teen Fiesta website film section with editorial typography and its embedded event film.",
      aspect: 3670 / 2074,
      caption: "Local export / the complete film section and embedded player",
    },
    gallery: [
      {
        src: "/work/teen-fiesta-event-artwork.jpg",
        alt: "Supplied Teen Fiesta event artwork with its monogram and a dancer in red light.",
        aspect: 1280 / 1600,
        caption: "Supplied event artwork / Teen Fiesta visual identity",
      },
      capture("teen-fiesta-mobile", "Teen Fiesta local export's film section adapted to a narrow viewport.", "Responsive / the local film section in a mobile browser", 780 / 1540),
      {
        src: "/work/teen-fiesta-announcement.jpg",
        alt: "Teen Fiesta coming-soon announcement printed on a coaster beside drinks.",
        aspect: 640 / 1136,
        caption: "Supplied announcement / Teen Fiesta coming soon",
      },
    ],
    overview:
      "Identity, information and media.",
    focus: [
      "Section navigation for the event information, gallery and film",
      "A navigable image gallery for supplied event artwork",
      "An embedded event film with playback controls",
    ],
    approach:
      "The website brings event information, supplied artwork and film into one visual sequence. The gallery keeps the available imagery together, while the film section provides a clear entry into the video. The case-study images show the website and the supplied media as distinct parts of the project.",
    liveUrl: "https://theteenfiesta.vercel.app/",
    liveUnavailable: true,
    repository: {
      url: "https://github.com/ojeshfrrr/teen-fiesta-red-room",
      description: "An event website bringing local media and a Three.js starburst into a cinematic Next.js page.",
      note: "Public fork of gauravxsuvo/teen-fiesta-red-room, documented as Teen Fiesta — Red Room.",
    },
  },
  {
    slug: "rewatch",
    title: "Rewatch",
    type: "Media product",
    year: "2026",
    summary: "A shared home for the films, series, anime, and music people follow.",
    role: "Collaborative work with OVIO and Suvo (Gaurav Raj Singh)",
    cover: {
      src: "/work/case-studies/rewatch-opening.webp",
      textureSrc: "/work/spatial/rewatch.webp",
      alt: "Rewatch homepage introducing its film, series, anime, and music catalog.",
      aspect: 1.6,
      caption: "Public opening / search, editorial type and the catalogue preview",
    },
    gallery: [
      capture("rewatch-browse", "Actual Rewatch public browse interface with category tabs, filters and media artwork.", "Browse / visible category, ordering and filtering controls"),
      capture("rewatch-mobile", "Actual Rewatch public homepage in a mobile browser using its dark theme.", "Responsive / editorial opening and account navigation", 780 / 1688),
    ],
    overview:
      "A media discovery product with an editorial opening. Search, category navigation and a catalog preview give desktop and mobile users a clear starting point.",
    focus: [
      "A shared discovery surface across several media types",
      "Navigation designed around both browsing and personal history",
      "A collaborative build with shared contributions across the product",
    ],
    approach:
      "The public homepage pairs direct search and category navigation with a media-led editorial introduction. Feature descriptions in this case reflect the public product description; signed-in workflows are not presented as independently verified.",
    credit:
      "Built collaboratively by OVIO and Suvo (Gaurav Raj Singh), with both contributing across all areas.",
    liveUrl: "https://rewatch.cc/",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
