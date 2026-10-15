# OVIO background and Teen Fiesta correction

## Background source and fix

The unwanted grain came from `body::before` in `src/app/globals.css`: a fixed full-viewport layer at z-index 80, opacity 0.13, containing a data-URL SVG with `feTurbulence type="fractalNoise"`, base frequency `.8`, three octaves and an inner rectangle opacity of `.12`. It overlaid the whole page, including artwork and text.

That pseudo-element was removed at its shared source. No page-specific hiding rules, image filters or replacement noise were added. The near-black base colors, spatial hero radial gradient and warm ambient radial fields are unchanged. `AmbientField` and its animation were not edited. Before/after computed styles confirm identical base colors and gradient definitions on all five inspected routes; project images have computed `filter: none`.

Matching 1440 × 900 browser captures were opened and compared for Home, About, Contact, LANE and Teen Fiesta. The background is visibly cleaner and the warm lighting remains. No obvious harsh gradient transition or new banding was seen in these Chrome captures. `comparison-background-detail.png` shows the same empty case-study background region enlarged 3× with nearest-neighbor sampling, explicitly labeled as a QA comparison. Intrinsic textures inside supplied project artwork were preserved.

## Teen Fiesta correction and authentic assets

The user's correction supersedes the earlier campaign interpretation. The rejected campaign object, descriptions, dates/venue, captions, gallery mappings, index/selection labels and legacy redirect were removed from active application code. The obsolete campaign assets and earlier incorrect cover/texture were removed from this portfolio's public directory. Historical before screenshots and prior QA records are retained as evidence, not current project information.

The public `https://theteenfiesta.vercel.app/` still returns Vercel `404 DEPLOYMENT_NOT_FOUND`. Inspection therefore also used the existing local static export at `D:/projects/teen_fiesta/out`, served read-only on a temporary port. That export contains legacy content that was not accepted as authority for campaign identity. Only a clean website section and visibly Teen Fiesta-branded assets were selected:

| Portfolio asset | Verified origin and use |
| --- | --- |
| `public/work/teen-fiesta-website.png` | Actual browser capture of the existing film section, without changing the source page or its content. Exact 1850 × 951 framing preserves the existing spatial plane's aspect ratio. Caption identifies it as the website film section. |
| `public/work/spatial/teen-fiesta-website.webp` | WebP rendition of that same capture, used by the existing scene. No plane positions, dimensions, rotations, camera code or animation were changed. |
| `public/work/teen-fiesta-event-artwork.jpg` | Unmodified copy of `D:/projects/teen_fiesta/public/media/hero-campaign.jpg`; visibly carries the Teen Fiesta monogram and appears in the website gallery. |
| `public/work/teen-fiesta-announcement.jpg` | Unmodified copy of `D:/projects/teen_fiesta/public/media/coming-soon.jpg`; explicitly branded Teen Fiesta and present in the website gallery. |

The exact requested eyebrow, two-line headline and supporting copy are rendered. Teen Fiesta alone gets controlled headline sizing and readable body text; other case-study introductions are unchanged. The oversized overview paragraph is replaced with “Identity, information and media.” No replacement campaign name, event outcome, ticket feature, date or venue was invented.

Feature descriptions are limited to section navigation, the image gallery and the embedded film. Gallery selection was exercised in the local website. Film playback advanced, readyState reached 4, and native controls became available after pressing Play. These are local-export checks; the unavailable public deployment could not be tested.

## Files changed

| File | Change |
| --- | --- |
| [globals.css](D:/projects/second_pf/src/app/globals.css) | Remove the global SVG noise layer; add Teen Fiesta-only introduction typography; remove obsolete campaign-section styles. |
| [projects.ts](D:/projects/second_pf/src/lib/projects.ts) | Correct shared Teen Fiesta identity, intro, metadata, gallery and asset mapping; remove the incorrect campaign relationship. |
| [case-study page](D:/projects/second_pf/src/app/work/[slug]/page.tsx) | Render the optional controlled introduction; remove the obsolete campaign block. |
| [portal-hero.tsx](D:/projects/second_pf/src/components/portal-hero.tsx) | Use the corrected project type in selected-project and index labels. Animation/scene logic unchanged. |
| [next.config.ts](D:/projects/second_pf/next.config.ts) | Retire the incorrect legacy campaign alias. Canonical case-study routes remain intact. |
| [README.md](D:/projects/second_pf/README.md) | Correct the project description. |
| [asset provenance](D:/projects/second_pf/public/work/README.md) | Replace the withdrawn identity interpretation with current asset provenance and inspection limitations. |

New assets are the four files listed above. Removed obsolete public files: `red-room-poster.jpg`, `red-room-dj.jpg`, `teen-fiesta-desktop.png`, `spatial/teen-fiesta.webp`, `spatial/teen-fiesta-artwork.webp`. Their original supplied/source-project files were not changed.

## Actual verification

| Check | Result |
| --- | --- |
| Before/after visual inspection | Passed: Home, About, Contact, LANE, Teen Fiesta at 1440 × 900; Teen Fiesta at 390 × 844 and 320 × 740. |
| Correct introduction and metadata | Passed: exact requested wording; no rejected name in rendered main content/head metadata on inspected routes. |
| Project index and selection | Passed: four canonical projects, Teen Fiesta labeled Event website, correct case-study href. |
| Gallery | Passed: all three images load, captions/counters agree; Next and keyboard Right work in reduced and normal motion. |
| Responsive introduction | Passed: readable deliberate lines, no document overflow at 390px or 320px. |
| Cinematic scroll | Passed: one normal-motion pin, native wheel advances the camera, about continuation is reachable, reverse wheel restores the opening scene after the existing scrub settles. An initial strict opacity-equals-1 assertion was premature; observed return was scrollY 0 with opacity 0.9932 while settling. No animation code was changed. |
| Console/network | Passed: no errors or warnings during the recorded portfolio sessions. The separate live-URL inspection recorded the actual external 404. |
| User-facing port 3000 | Confirmed in a real browser: corrected headline rendered and `body::before` background is `none`. Listener PID 2040 uses this project's Next server path. No restart of that server was needed. |
| Lint | `npm run lint` passed. |
| TypeScript | `npm run check` passed. |
| Production | `npm run build` passed, 13 generated pages. Browser QA used that build on port 3001. |

Before/after comparisons use reduced motion from initial navigation to hold ambient fields and the scene steady at identical viewport dimensions. A separate normal-motion session verified the existing scroll and gallery behavior. No dependencies or renderer were added. Gallery component code, spatial scene code and ambient field code were preserved.

## Screenshots and evidence

All paths are under `D:/projects/second_pf/qa/background-teen-fiesta-2026-10-15/`. The final screenshots and comparison images were opened for inspection. [SCREENSHOTS.md](D:/projects/second_pf/qa/background-teen-fiesta-2026-10-15/SCREENSHOTS.md) lists exact absolute paths.

- `before-` and `after-` captures: Home, About, Contact, LANE (`case-study`) and Teen Fiesta desktop, plus Teen Fiesta at 390px and 320px.
- `after-home-index.png`, `after-home-scroll.png`, `after-home-reverse-scroll.png`, `after-teen-fiesta-gallery.png` record real interaction states.
- `comparison-*.png` are labeled side-by-side composites of real screenshots; they are not fabricated browser output.
- `source-teen-fiesta-website.png` and `source-teen-fiesta-film-section.png` document the inspected local website section.
- `before-verification.json`, `after-verification.json`, `background-comparison.json`, `scroll-verification.json`, `source-features.json` retain actual observations.

The public Teen Fiesta deployment remains unavailable; it was not repaired or claimed verified. Other browser engines and physical devices were not tested in this focused pass. Temporary QA scripts and the read-only source server are removed/stopped after verification; the existing development server is preserved.
