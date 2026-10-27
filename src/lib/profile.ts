// Public GitHub profile, profile README and repository READMEs, checked 2026-10-27.
// Source URLs and attribution limits: qa/profile-refresh-2026-10-27/README.md.
export const profile = {
  handle: "ojeshfrrr",
  location: "India",
  introduction: "I turn things I get curious about into projects.",
  description: "I mostly build with TypeScript and C#, from web experiences to native Windows tools.",
};

// README purpose + source/manifests verified on GitHub, 2026-10-27.
// Keep this selection small; the case studies remain the primary work showcase.
export const selectedRepositories = [
  {
    name: "ClickForge",
    description: "Windows mouse-click and key-repeat utility with global shortcuts and profiles, built with WPF.",
    language: "C#",
    url: "https://github.com/ojeshfrrr/ClickForge",
  },
  {
    name: "portfolio-2",
    description: "The source for this portfolio, built with Next.js App Router and React.",
    language: "TypeScript",
    url: "https://github.com/ojeshfrrr/portfolio-2",
  },
  {
    name: "teen-fiesta-red-room",
    description: "Next.js event website with local media and a Three.js starburst rendered with React Three Fiber.",
    language: "TypeScript",
    provenance: "Fork of gauravxsuvo/teen-fiesta-red-room",
    url: "https://github.com/ojeshfrrr/teen-fiesta-red-room",
  },
] as const;

export const desktopProjects = [
  {
    name: "ClickForge",
    kind: "Windows utility",
    description:
      "A mouse-click and key-repeat utility with global shortcuts, profiles, and foreground-window checks.",
    technology: "C# / WPF / .NET",
    url: "https://github.com/ojeshfrrr/ClickForge",
    linkLabel: "View repository",
  },
  {
    name: "Project Legion",
    kind: "Independent derivative",
    description:
      "An unofficial customization of Lenovo Legion Toolkit, reusing its existing C# and WPF implementation. Not affiliated with Lenovo or the original maintainers.",
    technology: "C# / WPF / .NET",
    url: "https://github.com/ojeshfrrr/personalized-legion-kit",
    linkLabel: "View repository",
  },
  {
    name: "Sora",
    kind: "Public fork",
    description:
      "A fork of gauravxsuvo/Sora, a Windows hardware hub for supported cooler displays, keyboards, and other devices.",
    technology: "Windows / .NET",
    url: "https://github.com/ojeshfrrr/Sora",
    linkLabel: "View fork",
  },
];
