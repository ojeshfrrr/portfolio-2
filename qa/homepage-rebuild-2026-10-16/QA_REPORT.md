# OVIO homepage art-direction rebuild

## Result

The homepage now uses **Open the view**: a large OVIO identity interrupted by authentic project media. Native document scrolling opens the image slit and separates the two wordmark halves, revealing the selected project. A four-project text rail and native modal index operate that same composition. About and Contact continue below it in normal flow; there is no repeated project gallery.

The previous spatial stack is no longer the homepage opening. `portal-hero.tsx` and `spatial-scene.tsx` remain available in source, but the new homepage does not mount them or create a canvas. This concept uses DOM/CSS imagery and coordinated GSAP motion rather than adding WebGL work. Local Bricolage Grotesque, Manrope and the existing editorial font roles are reused. No fonts, dependencies, project assets, project facts or case-study gallery code were added or replaced.

## Reference study

The live [Fantik homepage](https://fantik.studio/) was explored in actual installed Chrome from opening through its project sequence and contact. The opening, changing project/media states and expanded menu were captured and inspected. The persistent stage, restrained edge controls, central typographic hierarchy and coordinated media transitions informed the concept. `ART_DIRECTION.md` distinguishes observations from assumptions. The landing.love page and recording metadata were also inspected; the recording was not watched in full. OVIO does not use Fantik's assets, code, pixel wordmark, terrain or decorative environment.

## Application files changed in this rebuild

- `src/components/identity-stage.tsx` — new identity, media selection, native index and cancellable animation ownership.
- `src/components/identity-stage.module.css` — scoped composition, mobile layout and reduced-motion presentation.
- `src/app/page.tsx` — mounts the new stage; keeps About and Contact, removes homepage atmospheric components.
- `src/app/globals.css` — homepage foundation/header styling and native-dialog document scroll lock.
- `src/components/site-header.tsx` — applies the new homepage header variant.
- `src/components/smooth-scroll.tsx` — pauses Lenis for native dialogs, preserves dialog scrolling, resumes on close/removal and disconnects the observer on cleanup.
- `DESIGN.md` — records the current concept and animation responsibilities.

Earlier uncommitted typography/atmosphere work existed before this request. This list identifies the rebuild's changes, rather than treating the entire dirty working tree as newly authored work. The interrupted Git operation had created one local font commit; this rebuild was not pushed.

## Authentic project mappings

| Project | Existing homepage image | Case study |
| --- | --- | --- |
| LANE | `/work/lane-desktop.png` | `/work/lane` |
| ARCUS | `/work/arcus-desktop.webp` | `/work/arcus` |
| TEEN FIESTA | `/work/teen-fiesta-website.png` | `/work/teen-fiesta` |
| Rewatch | `/work/rewatch-desktop.webp` | `/work/rewatch` |

Teen Fiesta remains an event website. Its verified introduction, imagery and captions were reused without adding a campaign narrative. Its deferred public deployment was not investigated or changed.

## Actual verification

Installed Google Chrome was driven by the existing bundled Playwright runtime. Production preview used `http://127.0.0.1:3001`; the current local application uses port 3000. Mobile tests used touch-enabled viewport emulation and actual Chrome DevTools touch gestures.

**62/62 production checks passed** in `production/results.json`, covering:

- Finite desktop pin, continuously opening media and clean reverse scroll.
- Four project selectors, correct destinations and stable rapid consecutive changes.
- Arrow-key project selection, keyboard index opening, native modal focus/inert background, Escape focus restoration and index preview selection.
- All four project routes; gallery next and keyboard reverse on each; removal of the homepage pin during route changes and one pin after returning home.
- Work, About and Contact navigation; usable homepage contact link.
- Explicit `prefers-reduced-motion: reduce` before navigation: actual media query true, zero initial/transient pins, no Lenis, static typography, immediate project reveals, natural scrolling and usable gallery controls.
- Mobile at 390×844 and 320×700: no pin, no horizontal overflow, index access and selection, successful native touch scrolling and intact Teen Fiesta case layout.
- Deliberately unavailable WebGL: complete homepage project controls and working case navigation. The new composition does not require a WebGL fallback renderer.
- Zero application page/console errors and zero failed local HTTP requests.

**8/8 additional interaction checks passed** in `production/microinteractions.json`: introduction clip changed over real browser frames; pointer motion affected only the nested media layer and returned to neutral; PageDown and Home scrolled correctly; modal backdrop wheel preserved page position; close resumed scrolling; history navigation unmounted an open modal and resumed Lenis.

A real defect was found during these tests: the native modal made the background inert for focus but allowed backdrop wheel scrolling through Lenis. The source now locks document overflow and pauses Lenis while a dialog is open, with cleanup/resume for close and route removal. The failed initial evidence is retained as `production/first-pass-microinteractions.json`. Initial test-harness failures for CSS zero-inset serialization and a two-dialog selector are preserved in `production/first-pass-results.json`; the corrected tests inspect normalized CSS and the open dialog.

Final CSS corrections made the fixed homepage header opaque, kept the index control on one line at narrow widths, and limited the media hover prompt to fine pointers (keyboard focus still reveals it). Fresh responsive captures follow these changes. `production/final-responsive.json` confirms no overflow, an in-bounds index button, and no caption/control overlap at all four sizes. The mobile wordmark occlusion and crowded display tracking found in the first render were also corrected.

## Captures inspected

See `SCREENSHOTS.md` for exact paths. The baseline and after opening share 1440×900 dimensions; their saved side-by-side was inspected. Desktop opening at 1920×1080, index, mid/open scroll states, each project's media presentation, both narrow mobile layouts/indexes, reduced motion, pointer state, About/Contact continuation and the Teen Fiesta mobile case were inspected in saved screenshots.

## Checks and limits

- `npm run lint` — passed.
- `npm run check` — passed.
- `npm run build` — passed, including static route generation. The first sandboxed attempt failed on Windows path access; the authorized retry built successfully without changing application configuration.
- Mobile is emulated; physical devices, Safari, Firefox, screen-reader testing, hardware frame-rate and battery profiling remain unverified.
- Contact destinations and navigation were tested; no email was sent and no external hosting configuration or deployment was changed.
