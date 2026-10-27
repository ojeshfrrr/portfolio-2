export type CaseStudy = {
  theme: "campaign" | "product" | "event" | "media";
  line: string;
  opening: string;
  scope: string;
  decisions: { title: string; text: string }[];
  evidence: string;
};

/** Editorial statements are bounded by inspected source and actual captures.
 * Capture provenance and verification limits live in public/work/README.md. */
export const caseStudies: Record<string, CaseStudy> = {
  lane: {
    theme: "campaign",
    line: "An archive with the energy of the artwork.",
    opening: "One site. Several visual identities. A campaign archive for independent nights in Agra, with the original posters setting the pace.",
    scope: "Website / campaign archive / responsive development",
    decisions: [
      { title: "The poster leads.", text: "The HEAT artwork establishes the red and black palette. The homepage places it beside a rendered sculpture; individual campaign pages give the original artwork a quieter, more readable setting." },
      { title: "One source, several views.", text: "Typed campaign records supply the homepage previews, archive and event routes. Each record carries its own artwork dimensions and source label, distinguishing original posters from frames extracted from supplied footage." },
      { title: "Motion with an exit.", text: "The sculpture is a locally rendered React Three Fiber scene. Its component also provides a still fallback. Event footage uses native controls and waits for the visitor to play it." },
    ],
    evidence: "Captured from the local website. Campaign identities and artwork sources were checked against the project’s campaign records. No attendance, booking or business results are claimed.",
  },
  arcus: {
    theme: "product",
    line: "Start with the next session.",
    opening: "A training interface that makes the next action clear: start a session, find an exercise, then return to the log.",
    scope: "Training interface / local data / responsive product engineering",
    decisions: [
      { title: "The next action, first.", text: "The training dashboard gives session entry priority over secondary tools. The blue action is a consistent reference point in an otherwise restrained dark interface." },
      { title: "A catalogue you can narrow.", text: "The exercise interface exposes search and filters rather than asking the visitor to scan an undifferentiated list. The captures show the actual catalogue interface, separate from personal workout data." },
      { title: "A log on the device.", text: "The source stores workout records and drafts locally and includes account synchronization. Local persistence and remote sync are separate concerns; screenshots of the interface do not establish that the remote service is available." },
    ],
    evidence: "Shown in a fresh, signed-out browser with no fabricated sessions or activity. Local source was inspected; account synchronization, production authentication and offline recovery are not claimed as verified by these screenshots.",
  },
  "teen-fiesta": {
    theme: "event",
    line: "Identity, information and moving image.",
    opening: "A digital experience for Teen Fiesta, bringing its visual identity, event information and available media together in one cohesive website.",
    scope: "Event website / supplied media / local export",
    decisions: [
      { title: "The film has its own space.", text: "The verified film section combines expressive typography, a short introduction and an embedded player. It gives the moving image a clear place in the page rather than starting playback behind the interface." },
      { title: "Use the material that exists.", text: "The supporting sequence contains visibly Teen Fiesta-branded supplied artwork and an announcement. These are presented as supplied media, separate from the website captures and the development work." },
      { title: "Playback stays in the browser.", text: "The local implementation uses a video element with native controls after activation. It includes loading and retry states and pauses playback when the film leaves the viewport." },
    ],
    evidence: "Presented from the existing local website export and verified supplied Teen Fiesta media. The public deployment is unavailable. This is not presented as a live public deployment, a ticketing integration or an account of event results.",
  },
  rewatch: {
    theme: "media",
    line: "A way into the catalogue.",
    opening: "A media discovery interface built around search, category navigation and an editorial introduction. A collaborative project by OVIO and Suvo (Gaurav Raj Singh).",
    scope: "Collaborative product / public discovery interface / responsive web",
    decisions: [
      { title: "An editorial first impression.", text: "A serif introduction and orange action distinguish the public opening from the denser catalogue interface. Media artwork provides the colour; search remains visible above the opening." },
      { title: "Two scales of navigation.", text: "The desktop capture groups discovery tools in a sidebar. The mobile capture uses bottom navigation and keeps account actions close to the introduction. Each layout changes hierarchy rather than shrinking the desktop screen." },
      { title: "Shared authorship, clear limits.", text: "OVIO and Suvo contributed across the product. This study describes the visible public interface; it does not independently verify signed-in recommendations, personal history or backend integrations." },
    ],
    evidence: "The imagery records the actual public interface. Feature descriptions are limited to visible screens and the existing project record. No user counts, recommendation accuracy or commercial outcomes are claimed.",
  },
};
