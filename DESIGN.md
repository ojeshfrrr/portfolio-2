# OVIO Design System

## GitHub selection / 27 October 2026

- A compact text index follows the homepage introduction. Three direct repository links connect native Windows work, this site's source and a featured event website. One muted language tag accompanies each row; forks retain attribution.
- The heading stays smaller than the profile and project titles. Fine dividers, aligned descriptions and whole-row links carry the hierarchy. Mobile stacks the existing content without adding imagery or motion.
- The section reuses the existing static editorial wash. Case studies remain the primary image-led work presentation.

## Shared atmosphere / 27 October 2026

- `Atmosphere` supplies static CSS light, plane and grid layers behind content. Each surface clips its own decoration and uses an isolated stacking context. The decoration is hidden from assistive technology and cannot intercept pointer input.
- The dark foundation remains `#08090b`, with carbon `#111214`, a graphite light tint (`rgb(46 58 77)`), the existing paper `#e9e5d8`, and copper `#c8795b`. Color appears only at low opacity; project media retains the strongest color.
- The opening uses a broad angled graphite plane; profile introductions use warmer light at the upper right. Editorial notes use a low, soft wash. Project sections use sparse vertical detail; repository and contact workbench sections use a faded grid. Closing sections reverse the light direction. Case studies pick up a restrained tint from their existing project accent.
- The system uses no texture downloads, filters, canvas, observers or animation. It remains static for every motion preference. Existing motion keeps its reduced-motion rules. Mobile uses broader forms and lower grid contrast, and forced-colors mode hides the decoration.
- No new portrait, stock imagery, font or dependency is introduced. Existing case-study prose, artwork and source attribution are preserved.

## Profile / 27 October 2026

- The profile uses Ojesh's public GitHub profile and README as its content foundation: India, TypeScript and C#, web experiences and native Windows tools. Source notes and attribution limits are recorded in `qa/profile-refresh-2026-10-27/README.md`.
- About opens with an oversized Bricolage name, an Instrument Serif statement taken from the profile README, and a compact facts rail. Existing project imagery connects the web work to its public repositories; a separate text index presents Windows projects with fork/derivative attribution.
- Profile surfaces use the existing `#08090b`, `#111214`, paper, dim, quiet and rule tokens. Project media supplies color. There are no new fonts, dependencies or portrait assets.
- One short CSS entrance introduces the About identity only when reduced motion is not requested. The homepage retains its existing scroll ownership. Profile content stays server-rendered, with no runtime GitHub requests.
- Mobile reflows the identity, facts, project media and repository rows into readable stacks. Links retain visible focus and comfortable target heights. The page foundation allows the available viewport width, including browser scrollbar space at 320px.

## Overview

OVIO is an independent creative-development practice. The homepage uses the concept “Open the view”: a large typographic identity interrupted by authentic project media. A finite scroll sequence opens that image into a complete project view. Interface elements stay quiet, legible, and easy to use.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Void | `#060810` | Midnight-black page foundation |
| Carbon | `#111114` | Raised editorial sections |
| Carbon raised | `#19191d` | Hover and selected surfaces |
| Paper | `#e9e5d8` | Main text and light controls |
| Paper dim | `#b7b3aa` | Supporting copy |
| Quiet | `#85828a` | Captions and tertiary metadata |
| Copper | `#c8795b` | Interaction accent and active states |
| Rule | `rgba(233, 229, 216, 0.17)` | Dividers and understated boundaries |

Keep the surrounding interface nearly monochrome. Project imagery supplies the strong color. Do not add new accent colors to the global system for individual screens.

## Typography

- **Bricolage Grotesque**: expressive display headings, the identity, project names and selected-project labels. Self-hosted Latin variable WOFF2 (400–700, optical size 12–96), loaded with `next/font/local`. The refined homepage identity uses weight 600, optical size 96, −0.015em tracking and 0.95 leading. Its complete silhouette is visible through a solid background wordmark and a matching outline over the project media. Mobile uses one complete unmasked wordmark. Sentence headings use approximately −0.035em tracking and 0.96–1.08 line height; project names use −0.055em tracking.
- **Manrope**: the existing neutral sans for body copy, metadata, navigation, captions, and controls. Reuse installed Latin 400/500/600/700 assets. Supporting copy uses 1.65–1.8 leading and a readable measure, normally below 60 characters. Index project names use Bricolage; their metadata and numbers remain Manrope.
- **Instrument Serif Italic**: a restrained editorial voice for the complete short working-note heading on About and brief-introduction heading on Contact. Self-hosted Latin 400 italic WOFF2, loaded on demand (`preload: false`), with Georgia as fallback. Do not scatter italic words through display headlines or use it for project brands and metadata.
- These are the only three font roles. Bricolage and Instrument Serif carry their unmodified SIL Open Font License 1.1 notices in `src/app/fonts/`; provenance and download URLs are recorded there. Manrope's existing package includes its OFL notice. No runtime font requests to Google and no new font package dependency.
- Keep utility labels compact and readable; do not reduce essential controls to decorative microtype.

## Layout and spacing

- Use `--gutter: clamp(1.1rem, 4.2vw, 5.5rem)` for page edges.
- Keep the navigation fixed and restrained at `--header-h: 5.5rem` on desktop, with the existing mobile reduction.
- The homepage opens with one full-viewport typographic media stage. Four text selectors change the same media window; a native modal index offers preview and case-study navigation. Do not repeat project cards or galleries below it.
- Follow the scene with the existing about and contact sections in normal document flow.
- Case-study pages use wide editorial margins, large project titles, responsive image frames, and clear captions.
- Use fine rules and small radii for interface panels. Avoid dashboard-like card grids, heavy glass surfaces, and ornamental borders.

## Depth and surfaces

- The current homepage is DOM/CSS media, with no WebGL requirement. The prior R3F spatial-scene and PortalHero remain in source as reusable components; they are not mounted on the homepage.
- Preserve authentic project assets and their aspect ratios. The opening uses project-specific media windows: an angled LANE frame, a more orthogonal ARCUS interface frame, a wider Teen Fiesta film frame and an opposite-slanted Rewatch frame. The wordmark outline keeps the full identity readable across the image. Scroll expands the window into an uncropped contain-fit presentation. Mobile shows complete media in a static vertical composition.
- Navigation and project content remain available when WebGL is unavailable because the current homepage does not create a canvas.
- Do not add unrelated 3D objects, stock imagery, or generated project screenshots.
- The homepage retains its `#08090b` stage and authentic project media. Static CSS atmosphere now gives the opening, profile and contact sections distinct light and plane compositions.
- Secondary routes share the same static CSS system. Earlier cosmic assets and their provenance remain under `public/atmosphere/` and `qa/cosmic-atmosphere-2026-10-16/` for retained optional components; the active page foundation and Contact route use the new system.

## Motion responsibilities

- **GSAP + ScrollTrigger** own the finite pinned desktop wordmark/media opening and scroll progress. Selection animates blend weights and project framing while scroll owns a separate progress value; one composition renderer combines them and writes the final media geometry. Fixed image order and normalized source-over blending preserve an opaque image during interruption. Selection commits only after decoding; metadata stays stable without a bounce. Native media subscriptions are explicitly removed. Pointer translation stays on its nested layer. Reduced motion, mobile and short viewports have no pin; reduced selection applies immediately after readiness. The wordmark has no load-time reveal to replay at breakpoints.
- **Lenis** owns smooth document scrolling and stays synchronized with GSAP's ticker and ScrollTrigger updates.
- **R3F** remains available in the retained optional spatial scene. It is not part of the current homepage render path.
- **Motion** is for discrete interface state, such as navigation, the project index, and case-study gallery selection.
- **CSS** handles simple hover and focus feedback.
- Never let two animation systems write the same transform or opacity on the same element. Respect reduced motion and retain native scrolling.

## Components and interaction

- Navigation links show the current route and retain visible keyboard focus.
- The project index is a native modal with the four canonical projects; selection updates the media and metadata without adding another gallery. Arrow keys move between project selectors; Escape closes the modal and restores focus.
- Case-study links remain available from the hero, index, and each project route.
- Gallery controls are native buttons with descriptive labels and pressed states.
- Native dialogs pause Lenis and lock document overflow; dialog content keeps native scrolling. Closing or unmounting a dialog resumes scrolling. The modal observer is disconnected with the scrolling integration.
- Use concise metadata, clear captions, and meaningful image alternatives.

## Do and don't

- Do keep the typographic media stage as the central homepage project experience.
- Do use the actual local project screenshots and the established project data.
- Do keep camera motion restrained and selection transitions reversible.
- Do test touch, keyboard, reduced-motion, narrow widths, and WebGL fallback.
- Don't add a second animation engine for scroll or scene movement.
- Don't add maps, decorative icons, liquid-glass effects, or generic visual components without a concrete content need.
- Don't duplicate project planes or add a project grid below the homepage scene.

## Project presentation / 17 October 2026

- Canonical covers now use fresh 2× real browser captures under `public/work/case-studies/`. LANE and ARCUS were captured locally; Teen Fiesta uses the verified film section of its existing static export; Rewatch uses its actual public dark interface. No screenshots are synthesized or upscaled. Full provenance is in `public/work/README.md` and the dated QA directory.
- Gallery rendering preserves intrinsic aspect ratios without the old landscape height cap. Portrait screenshots remain readable at a limited width. Primary imagery is eager, supporting full-size images are requested only on selection, and thumbnails remain small/lazy. Quality 90 is explicitly allowed by the installed Next Image configuration. A pending or failed request retains the current image and synchronized caption until a decoded replacement is ready.
- `ProjectEntryProvider` owns a separate temporary surface. The homepage's scroll, selection and pointer properties are unchanged. The chosen image moves from its actual source crop into the decoded case-study cover. The destination stays covered until the surface is aligned, preventing double images. Native user input, resizing, browser history, reduced motion and a bounded timeout clear the handoff. Real links, direct URLs and modified clicks retain browser behavior. Missing imagery uses normal navigation.
- Case-study foundations are shared, with distinct project rhythms: LANE's supplied poster and campaign archive; ARCUS's blue training interface and catalogue detail; Teen Fiesta's film, supplied media and explicit local-export status; Rewatch's reversed editorial heading, serif story accent and real public catalogue.
- Original supplied artwork/media is credited separately from website development. Technical copy is bounded by inspected source or observable public UI. No fabricated activity, results, integrations or business metrics. The Teen Fiesta public deployment remains deferred and unavailable; no hosting setup is changed.
