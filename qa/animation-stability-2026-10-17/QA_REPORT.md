# OVIO animation stability — 17 October 2026

## Reproduced causes and fixes

| Cause, with baseline evidence | Fix |
| --- | --- |
| Selection faded LANE out before a delayed ARCUS image decoded: ARCUS opacity 1, `ready: false`, blank media. | Decode before committing image, metadata and destination. A request counter rejects obsolete completions and completions after unmount. The existing working project remains visible during loading. |
| All layers faded out/in together with z-index swaps. Actual source-over image coverage fell to **0.7177** during interrupted selections. The caption's `fromTo` also reset its opacity by **0.35** on each click. | Fixed layer order and normalized blend weights maintain opaque source-over coverage, continuing from current values on interruption. Removed the caption bounce entirely. |
| Separate media contexts could revert geometry snapshots after mobile cleanup. At 390px the baseline retained `left:61%; width:52%; height:38svh` and the desktop polygon. Crossing back also replayed the wordmark's near-50% entrance mask. Pointer subscriptions did not follow viewport changes. | One scoped scroll context; geometry is written directly by one renderer, cleared after context reversal. Pointer context follows the actual viewport/preference. Removed the load-time wordmark reveal: scrolling alone opens/closes the lettering. |
| GSAP **3.15.0** `MatchMedia.add` registers `_onMediaChange` on new MediaQueryLists; `MatchMedia.kill` removes contexts but does not unregister those listeners. Dev route returns increased listener counts by six each (Strict Mode). Instrumentation found **36 registrations, zero removals** across the three homepage queries after five cycles. | Native media-query subscriptions with explicit removal, while retaining scoped GSAP animation contexts. The same trace then showed 12 registrations and 11 removals for each query: exactly one active registration for the mounted homepage. No library patch. |

Baseline artifacts: `before/results.json`, `before/delayed-selection.png`, `before/resize-replay.png`, `listeners-before.json`. Same defect reproduction after the first fixes: `after-reproduction/results.json`; listener cleanup proof: `listeners-after.json`.

## Ownership after the fix

- Selection timeline: blend weights and selected-project framing state only. Prior timeline is killed without reverting current values.
- Scroll context: progress state, letter-half transforms/opacity, opening notes and progress line. Its ScrollTrigger/context is reverted on breakpoint changes and unmount.
- One renderer combines framing + scroll progress into the media window geometry. No CSS transitions target those properties.
- Pointer context: nested pointer-layer translation only, removed/reset at mobile/reduced motion/unmount.
- React: project identity, accessible label, pressed state and destinations. Stable keyed image elements remain mounted. Captions have no animation.

## Verification actually performed

**Production: 65/65 main checks + 19/19 interruption/keyboard checks passed.** Read `production/results.json` and `production/interruptions.json` for individual assertions and measured states.

- Every project: real image/link/label, complete forward scroll and reverse to original framing.
- **60 rapid real selections**, including ten index-preview interruptions: 757 sampled browser frames, coverage **1**, zero visible undecoded layers, caption opacity **1**, correct final Rewatch state.
- Stop midway, reverse, change selection; ten small wheel reversals; no continuing drift after settling.
- Ten real homepage → case study → homepage cycles, exercising all four routes and gallery-next controls. One homepage pin, none on case studies. Listener count **419 on all ten returns**, DOM node count **348 on all ten**. GC heap warmed from 6.69 to 7.69MB; this finite run is not a claim of an exhaustive memory audit.
- Desktop widths **1280/1440/1920**, mobile **390/320**. No horizontal overflow. Twelve index selections at each mobile width and actual CDP touch gestures.
- Six additional breakpoint changes **during active selection/scroll**, including short desktop viewports. Mobile receives no inline desktop mask, returning desktop restores selected pose without a replayed entrance.
- Explicit `reducedMotion: 'reduce'` **before navigation**: media preference true, zero transient/persistent pins, static geometry, immediate selection, natural scrolling, gallery operation. Keyboard rail arrows, Enter/index, Escape/focus restoration, PageDown verified. Mid-transition preference toggle also verified.
- Production application console errors **0**, warnings **0**, failed local asset/route requests **0** in the main sequence. No noise/error suppression was added.
- Font Loading API confirmed the existing local variable display face loaded. Existing font configuration/assets unchanged.
- Current homepage has **no WebGL canvas**; WebGL initialization fallback is not applicable to this rendering path.

The first development main run was **64/65**, with listener growth detected. It was investigated and fixed, then the production suite passed in full. Recording setup initially lacked Playwright's FFmpeg; the installed system FFmpeg encoded Chrome CDP frames instead. No dependency was installed.

## Measurements and visual evidence

Separate production profiling (`profile/results.json`, Chrome trace JSONs) ran **without recording/screenshots during measurement**. Desktop/mobile/reduced runs each recorded **zero interaction long tasks**, zero interaction layout-shift entries, zero idle geometry style mutations and zero idle layout duration over 2s. RAF p95 gap was 6.2ms in this unthrottled headless environment; maxima were 30.2/12.2/12.2ms. Tiny initial layout shift: 0.0000354 desktop/reduced, zero mobile. These are observations, not a cross-device frame-rate guarantee or a before/after performance improvement claim.

Saved and inspected the baseline, blank-image reproduction, resized entrance, same-size before/after, all four selected states, index, middle/open/reversed scroll, mobile initial/transition/index, and reduced-motion state. `production/interaction.mp4` is the timestamped CDP recording; `production/recording-filmstrip.jpg` contains the 16 sampled recording frames inspected for discontinuities alongside per-frame measurements. A JPEG detail of the original mobile wordmark confirms all four letters; repeated PNG display can omit unchanged regions in the review interface, so no browser-paint workaround was introduced.

## Changed files and checks

Application files changed only:

- `src/components/identity-stage.tsx`
- `src/components/identity-stage.module.css` (opaque existing near-black image-layer backing for correct blending)

Evidence/scripts under this QA directory. Existing dirty work predates this pass. No project data, artwork, typography, layouts, routes, galleries, global styles, Lenis implementation or package files changed.

`npm run lint`, `npm run check`, **`npm run build` (13 pages)**: passed. All production browser tests used that build on `127.0.0.1:3001`.

Limitations: installed Chrome, headless browser, mobile viewport/touch emulation. Physical devices, Safari/Firefox, assistive technology, GPU/compositor tearing on real displays and a prolonged heap audit remain unverified. Recording reviewed through extracted frames plus frame-state sampling; no claim of watching playback on a physical screen. No deploy or Git push.
