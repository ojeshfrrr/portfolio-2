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
  intro?: { eyebrow: string; headline: string[] };
};

export const projects: Project[] = [
  {
    slug: "lane",
    title: "LANE",
    type: "Campaign platform",
    year: "2026",
    summary: "A campaign archive with a different tempo for every night.",
    role: "Creative development, front end, and interaction design",
    cover: {
      src: "/work/lane-desktop.png",
      textureSrc: "/work/spatial/lane.webp",
      alt: "LANE homepage with a metallic sculpture, HEAT campaign artwork and editorial typography.",
      aspect: 2534 / 1409,
      caption: "HEAT / sculptural homepage and campaign poster",
    },
    gallery: [
      {
        src: "/work/lane-home.png",
        alt: "Alternate LANE homepage with AFTER dark typography and the original HEAT poster.",
        aspect: 1536 / 864,
        caption: "HEAT / alternate homepage layout led by the original artwork",
      },
      {
        src: "/work/lane-archive.png",
        alt: "LANE campaign archive with a selector beside a full portrait poster.",
        aspect: 1536 / 1400,
        caption: "The campaign archive / Teen Soirée selected from seven chapters",
      },
    ],
    overview:
      "A campaign archive for independent nights in Agra. One browsing system gives seven distinct event identities room to lead.",
    focus: [
      "A campaign selector that keeps each poster and its details in sync",
      "A locally rendered Three.js sculpture, with a still fallback",
      "Seven event pages built from supplied artwork and confirmed details",
    ],
    approach:
      "The supplied posters set the visual direction. The two HEAT homepage captures show different layouts for the same campaign: one pairs the poster with a sculpture; the other makes the artwork dominant. The archive keeps the selected poster and its event details together.",
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
      src: "/work/arcus-desktop.webp",
      textureSrc: "/work/spatial/arcus.webp",
      alt: "ARCUS Training dashboard with the next-session prompt and weekly training overview.",
      aspect: 1.599,
      caption: "Desktop / next-session action, weekly totals and persistent sidebar",
    },
    gallery: [
      {
        src: "/work/arcus-mobile.webp",
        alt: "ARCUS mobile dashboard with the next-session prompt and training summary.",
        aspect: 375 / 812,
        caption: "Mobile / the same session prompt with bottom navigation",
      },
    ],
    overview:
      "A strength-training interface built around the next session. Desktop and mobile dashboards put workout entry ahead of secondary tools.",
    focus: [
      "Workout entry that stays available without a network connection",
      "Training history, routines, recovery, and progress views",
      "A responsive dashboard built for quick decisions between sessions",
    ],
    approach:
      "The next-session action leads both layouts. Desktop keeps the training tools in a persistent sidebar; mobile moves core navigation to the bottom. The source includes local workout drafts and account sync. These captures show an earlier dashboard with empty example metrics, rather than demonstrating the sync or offline flows.",
    liveUrl: "https://thearcus.vercel.app/",
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
      src: "/work/teen-fiesta-website.png",
      textureSrc: "/work/spatial/teen-fiesta-website.webp",
      alt: "Teen Fiesta website film section with editorial typography and its embedded event film.",
      aspect: 1850 / 951,
      caption: "Website / the film section and embedded player",
    },
    gallery: [
      {
        src: "/work/teen-fiesta-event-artwork.jpg",
        alt: "Supplied Teen Fiesta event artwork with its monogram and a dancer in red light.",
        aspect: 1280 / 1600,
        caption: "Supplied event artwork / Teen Fiesta visual identity",
      },
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
  },
  {
    slug: "rewatch",
    title: "Rewatch",
    type: "Media product",
    year: "2026",
    summary: "A shared home for the films, series, anime, and music people follow.",
    role: "Collaborative work with OVIO and Suvo (Gaurav Raj Singh)",
    cover: {
      src: "/work/rewatch-desktop.webp",
      textureSrc: "/work/spatial/rewatch.webp",
      alt: "Rewatch homepage introducing its film, series, anime, and music catalog.",
      aspect: 1.599,
      caption: "Desktop / search, media categories and a catalog preview",
    },
    gallery: [
      {
        src: "/work/rewatch-mobile.webp",
        alt: "Rewatch homepage adapted to a mobile viewport.",
        aspect: 375 / 812,
        caption: "Mobile / account actions and fixed bottom navigation",
      },
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
