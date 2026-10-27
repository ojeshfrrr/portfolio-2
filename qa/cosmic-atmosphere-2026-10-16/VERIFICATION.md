# Cosmic atmosphere: browser verification

## Method

Actual installed Google Chrome driven through the existing bundled Playwright runtime; no dependencies installed. Matching before/after capture against the existing development server at `http://127.0.0.1:3000`. Final interaction and profiling checks against the built production preview at `http://127.0.0.1:3001`. All requests and route navigation remained local.

Chrome used ANGLE/SwiftShader in headless mode. Mobile used touch-enabled viewport emulation, not physical phones. Safari, physical-device battery/thermal use, and hardware GPU frame rate remain unverified.

## Screenshots inspected

`before/` and `after/` each contain:

- `home-1440x1000.png` / `index-1440x1000.png`
- `home-1920x1080.png` / `index-1920x1080.png`
- `home-390x844.png` / `index-390x844.png`
- `home-320x700.png` / `index-320x700.png`

All eight after screenshots were opened and visually inspected. The existing diagonal project installation remains the main visual element. Warm formations emerge around the lower-left foreground plane, with subdued cool light above/right; the index remains readable at both desktop widths and both mobile widths. No bright area competes with the controls or obscures project artwork.

Additional production screenshots, all opened and inspected:

- `verification/desktop-scroll.png`
- `verification/reduced-home.png`
- `verification/mobile-touch-scroll.png`
- `verification/webgl-fallback.png`

## Preservation checks

`preservation-comparison.json` verifies all 22 captured SHA256 hashes are unchanged: scene source, project data, root layout, local font/license files, project screenshot/texture paths. Font families, weights, sizes, tracking, line heights, text and controls match before/after. UI bounding rectangles match exactly except existing GSAP floating-point settling differences below 0.0001 CSS pixel on the desktop note/scroll cue.

`project-pixel-preservation.json` compares eight 10×10 screenshot patches inside LANE/ARCUS artwork at all four viewport sizes. All eight are pixel-identical, with zero mean/max channel difference.

## Results

**60/60 production assertions passed.** Full evidence is `verification/results.json`.

- Exactly one canvas and one finite desktop pin; one canvas and no mobile pin.
- Four canonical project identities and links; selection, index keyboard opening, Escape focus restoration and route navigation work.
- All four case galleries advance, load authentic images and reverse with keyboard controls.
- Native scrolling scrubs the existing cinematic scene; scrolling back restores the overview.
- Offscreen hero atmosphere reports `data-active=false` with paused CSS animation; it resumes when returned to view.
- Reduced motion was set before the initial browser navigation: media query `true`, zero current/transient pins, no Lenis, ambient animation `none`, stable static transforms, natural scrolling, project keyboard selection and immediate gallery changes.
- Mobile requests only `cosmic-nebula-mobile.webp` and `cosmic-distance-mobile.svg`; desktop variants are not requested in that mobile context.
- Mobile ambient remains static. Actual CDP touch gestures moved the page to scrollY369.
- Zero horizontal overflow at all four requested viewport sizes and both index states.
- Screenshot-sampled contrast for tested identity/contact/selected-project/index labels: 13.95–16.38:1 desktop and 15.10–16.17:1 mobile. This is a focused label check, not a full-site accessibility certification.
- Deliberately returning null from WebGL context initialization preserves the CSS atmosphere, four fallback project links, no pin and working index/case navigation. The two deliberately triggered renderer errors are marked expected.
- No unexpected application console/page errors, no warnings and no failed route/asset HTTP responses.

## Profiling observations

Raw Chrome DevTools Protocol traces are saved under `verification/*.trace.json`. Each idle sample waited approximately 3.2 seconds; scroll samples used eight native wheel steps followed by a settling wait. Event durations may span multiple threads and must not be summed as wall-clock cost.

| Sample | Paint events / total duration | Layout events | DrawFrame events | Main-thread TaskDuration delta |
| --- | --- | --- | --- | --- |
| Desktop idle, atmosphere active | 0 / 0 ms | 0 | 267 | 0.950 s |
| Desktop scroll, atmosphere active | 6 / 0.271 ms | 0 | 161 | 0.288 s |
| Desktop idle, atmosphere disabled in browser only | 0 / 0 ms | 0 | 0 | 0.157 s |
| Mobile idle, static atmosphere | 0 / 0 ms | 0 | 0 | 0.092 s |
| Mobile scroll, static atmosphere | 3 / 0.474 ms | 1 / 0.042 ms | 433 | 0.300 s |

The desktop drift has measurable compositor-frame/style work despite producing no repeat Paint events in the idle sample. The mobile static treatment produced no idle DrawFrame/Paint/Raster/Layout events. These are single local headless traces with profiling overhead and concurrent work, not hardware performance, guaranteed frame-rate or battery benchmarks. `CompositeLayers` events were not emitted by this Chrome trace; layer/frame/Raster/PrePaint events and Performance metrics are retained instead.

No application source was edited by the QA agent. Production build/lint/TypeScript checks were performed separately by the parent agent.
