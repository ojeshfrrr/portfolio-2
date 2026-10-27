# OVIO typography and art direction pass — 2026-10-16

## Scope and visual decision

Inspected `DESIGN.md`, font imports and installed font files/licenses, global CSS, the spatial scene poses/materials, hero/index markup, ambient field, case-study template, gallery and scroll ownership before editing. Read the installed Next 16.4 local-font and CSS guides. Applied the frontend-design and Vercel React best-practices skills to the visual and font-loading work.

The baseline used Space Grotesk for display, Manrope for reading/controls and an unused Georgia editorial token. Very tight display tracking and similar display/supporting treatments weakened hierarchy. The change retains the existing composition and introduces three distinct roles:

| Role | Font | Use |
| --- | --- | --- |
| Display | Bricolage Grotesque, normal variable 400–700 / optical size 12–96 | Existing wordmark, page/case headings, selected-project label, index project names |
| Editorial | Instrument Serif 400 italic | Entire short About working-note heading and Contact brief heading; no scattered italic words or project branding changes |
| Interface / reading | Existing Manrope 400/500/600/700 | Body, metadata, navigation, captions, numbers and controls |

Bricolage replaces Space Grotesk's imports; the installed Space Grotesk package remains untouched. Manrope reuses the installed Latin files. The two new fonts are self-hosted WOFF2 via `next/font/local`, with adjusted system fallbacks and `display: swap`. Bricolage is preloaded; Instrument is not. No package, dependency or external runtime font request was added.

Before acquiring the binaries, checked the complete official [Bricolage OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt) and [Instrument Serif OFL](https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt). Both permit embedding/redistribution under SIL OFL 1.1. Unmodified copyright/license files accompany the fonts. Binary sizes: 76,888 and 22,128 bytes. Full source URLs are in `src/app/fonts/README.md` and the source CSS is retained in this QA folder.

The first Bricolage render still looked too tight in sentence headings. Relaxed About/Contact headline tracking from −0.055em to −0.035em before final captures. Case summaries now use readable Manrope with 1.65 leading and a maximum 36ch measure. Main case names retain expressive display scale; Teen Fiesta retains its controlled two-line introduction. Larger body text in case details and on the mobile homepage improves reading.

The only background change is a static CSS radial field behind the foreground region of the hero: warm copper at 6.5% opacity, soft intermediate falloff at 2.5%, transparent edge. Existing neutral radial depth, clean near-black base and warm About/Contact ambient fields remain. Inspected comparisons show restrained separation around the foreground plane without changing screenshot colors. No noise, filtering, new renderer, extra ambient animation or scene geometry adjustment was needed.

### Confirmed defect found during visual QA

The first production interaction run passed the outer pin-bounds check, but its saved scroll screenshot visibly shifted the scene and controls. A focused reproduction measured the actual cause: `.spatial-hero { overflow: hidden }` still allowed internal programmatic scrolling when focus moved into an opening index. Its transformed fallback content produced a 1585×980 overflow extent inside the 1440×900 hero, and focus shifted the internal scrollLeft/scrollTop to 145/80. This was not camera motion or page-level horizontal overflow.

Changed this one clipping boundary to `overflow: clip`. The crop is preserved and the hero can no longer scroll internally. Reproduced the same keyboard-open, four selections, Escape, Overview and wheel-scroll sequence afterward: all ten measured internal offsets remain 0/0, with the normal outer scroll at y=720. See `verification/scroll-probe.json` and the inspected corrected `scroll-probe.png`. Added a dedicated assertion to the production suite, regenerated the final captures/comparisons and reran lint, TypeScript, build and the browser suite. No animation or pose logic changed.

## Exact implementation files

- `D:/projects/second_pf/src/app/layout.tsx` — local font configuration, HTML font variables, Latin-only existing Manrope imports; removed Space Grotesk imports.
- `D:/projects/second_pf/src/app/globals.css` — three font-role tokens; controlled heading scale/leading/tracking; case supporting text and body measure; wordmark/index/selected-project hierarchy; mobile text sizing; static hero radial lighting; non-scrollable hero clipping boundary for the confirmed focus defect.
- `D:/projects/second_pf/src/app/fonts/bricolage-grotesque-latin.woff2` — new local display font.
- `D:/projects/second_pf/src/app/fonts/instrument-serif-latin-italic.woff2` — new local editorial font.
- `D:/projects/second_pf/src/app/fonts/bricolagegrotesque-OFL.txt` — complete license.
- `D:/projects/second_pf/src/app/fonts/instrumentserif-OFL.txt` — complete license.
- `D:/projects/second_pf/src/app/fonts/README.md` — provenance, sizes, roles/loading.
- `D:/projects/second_pf/DESIGN.md` — updated typography and lighting rules.
- Evidence and reproducible QA scripts are confined to `D:/projects/second_pf/qa/art-direction-2026-10-16/`.

`next-env.d.ts` was regenerated normally by Next's dev/build commands. No manual changes were made to it. No source changes to the spatial scene, hero logic, camera poses, scroll timelines, gallery logic, project data/assets, route content, hosting configuration or package manifests. The separate Teen Fiesta public deployment remains deferred.

## Browser verification

Actual installed Google Chrome, automated with the existing bundled Playwright runtime (no dependency installation). WebGL uses ANGLE/SwiftShader in this environment. Normal and reduced-motion contexts are fresh browser sessions. Baseline/final visual captures use identical 1440×900 desktop and 390×844 mobile viewports at DPR 1 against the same development server on port 3000. Production interactions use the completed `next build` served temporarily on port 3001.

All **124 final production assertions passed**, including the internal hero-scroll regression assertion. Full raw evidence: `verification/results.json`.

| Test | Result | Observed evidence |
| --- | --- | --- |
| Font loading | PASS | CDP `CSS.getPlatformFontsForNode` reports custom Bricolage glyphs on About h1, Instrument Serif italic on its working note, Manrope on summary; font requests all local HTTP 200 |
| Visual hierarchy / contrast | PASS, inspected | All nine side-by-side comparisons and required standalone captures opened and inspected; readable supporting copy, sharper index hierarchy, no artwork tint/filter or texture added |
| Layout stability | PASS in captured sessions | No horizontal overflow in all 11 final captures. Recorded initial-home CLS 0.000065, About 0.000749, other page captures 0; home total after scripted selection 0.001545. These are individual local observations, not field metrics |
| Responsive widths | PASS | Homepage, About, Contact and all four cases at 320, 390, 1024, 1440 and 1920px; document-width and heading-range checks |
| Project selection / index | PASS | Four canonical mappings; each selection updates pressed state; four correct case destinations; keyboard Enter opens index; Escape closes and restores trigger focus |
| Scroll / reversal | PASS | Real wheel scroll to y=720 keeps hero at top=0, progress matrix scale 0.5333; scroll releases into document; reversing returns y=0 and note opacity=1 |
| Gallery controls | PASS | All four cases: next button, viewer ArrowLeft reversal, selected image loaded |
| Client route remount | PASS | About navigation removes pin; home remount restores exactly one pin and one canvas |
| Reduced motion from first load | PASS | Explicit Playwright `reducedMotion: 'reduce'`; actual `matchMedia('(prefers-reduced-motion: reduce)').matches === true`; 0 pins including transient insertions, no Lenis class; native wheel scroll works |
| Reduced ambient / galleries | PASS | Ambient animationName/transform both `none`, unchanged after 1.1s; gallery selection opacity 1, transform none immediately; keyboard gallery and project selection/case link work |
| Mobile touch | PASS, emulated | Chrome CDP native touch start/move/end crosses scene and scrolls page to y=369; no mobile pin |
| WebGL initialization failure | PASS | Deliberately return null for WebGL context initialization. Four fallback links visible, no pin, index navigates to ARCUS case |
| Browser errors / assets | PASS | 0 unexpected console/page errors, 0 failed route/asset responses, 0 production warnings. Two renderer errors are intentionally retained in evidence from the deliberate context-failure test; no error suppression added |

The development before/after sessions both record the existing Next LCP advisory about the Teen Fiesta image. Production sessions record no warnings. It was not changed because this pass concerns typography/lighting and the advisory was already present in the baseline.

Physical mobile hardware, Safari/Firefox, GPU timing and field performance are unverified. Touch/mobile checks above are Chrome emulation. No deployment or hosting operation was performed. Existing port-3000 dev server is preserved; the temporary owned production server is stopped after QA.

## Checks

- `npm run lint` — PASS, exit 0 (including final QA scripts).
- `npm run check` — PASS, exit 0.
- `npm run build` — PASS, exit 0; compiled, TypeScript passed, 13 static/SSG pages generated including all four case-study routes.

## Screenshot manifest

Full absolute paths and matched viewport sizes are listed in [SCREENSHOTS.md](./SCREENSHOTS.md). All required baseline/final images and all nine comparisons were opened and inspected. Additional production scroll, reduced-motion, touch and fallback screenshots were also inspected. The normal Next development indicator appears in matching baseline/final development captures; it is absent from production evidence.
