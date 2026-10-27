# OVIO cosmic atmosphere pass

## Change summary

Added a restrained, static cosmic field behind the existing project installation, with a very slow desktop nebula drift. The project planes, project data, typography metrics, controls, case-study routes, and scroll scene were preserved. The background uses two CSS pseudo-element layers and responsive raster/SVG assets; it adds no canvas, renderer, package, filter, noise texture, or animation loop. Mobile uses a portrait crop and static atmosphere. Reduced-motion styles disable ambient movement from the initial render.

The root environment is `#060810`. The atmosphere combines a low-opacity generated nebula, a dark edge treatment, and a deterministic sparse star/dust SVG. It stays behind artwork and text. The source image is `nebula-source.png`; prompt and preparation details are in `IMAGE_PROMPT.md` and `prepare-assets.mjs`. Runtime assets are in `../../public/atmosphere/`.

## Browser verification

Actual installed Chrome was controlled through the existing bundled Playwright runtime; no browser package was added. Captures used exact desktop viewports 1440×1000 and 1920×1080 and mobile emulation at 390×844 and 320×700. Both the homepage and open index were captured before and after at all four sizes. The screenshots were inspected; side-by-side comparisons are saved in `comparisons/`.

The production preview passed 60/60 assertions. The checks covered project identities and links, project selection, index keyboard open/close and focus restoration, case-study navigation, all four galleries, native scroll scrub and reverse, offscreen animation pause/resume, reduced motion set before initial navigation, mobile asset selection and touch scrolling, horizontal overflow, a deliberate WebGL initialization failure, and application console/network errors. Evidence is in `verification/results.json` and `VERIFICATION.md`.

The visual preservation audit found all 22 source/data/layout/font/project-asset SHA256 hashes unchanged. UI copy, styles, fonts, and measured boxes were preserved (the existing GSAP settling differences were below 0.0001 CSS pixel). Pixel samples from project artwork have zero channel difference. Detailed records are in `preservation-comparison.json`, `project-pixel-preservation.json`, and `project-pixel-samples.json`.

## Performance observations and limitation

Chrome DevTools Protocol traces used headless Chrome with ANGLE/SwiftShader. Mobile static idle produced no ambient DrawFrame, Paint, Raster, or Layout events in the recorded sample. Desktop ambient drift produced compositor/frame and style work without repeated Paint events. A final matched experiment compared the normal animation against browser-only `steps(220,end)` and `will-change:transform` overrides, then repeated the normal sample. The measurements varied widely between samples: TaskDuration deltas were 0.344 s, 0.361 s, 2.847 s, and 1.481 s over approximately five-second samples. No override showed a repeatable benefit, so no animation optimization was applied. Raw experiment traces and metrics are under `experiment/`; original profiling traces are under `verification/`.

These measurements are local headless traces with instrumentation overhead and concurrent machine load. They do not establish physical GPU frame rate, battery use, or thermal performance. Physical devices, Safari, and hardware-GPU profiling remain unverified. Mobile verification is viewport/touch emulation.

## Validation

- `npm run lint` — passed.
- `npm run check` — passed.
- `npm run build` — passed (Next.js production build, TypeScript phase, and route generation).
- Browser production assertions — 60/60 passed; zero unexpected page/console errors, warnings, or failed HTTP requests.
- No deployment was attempted and no hosting settings were changed.
