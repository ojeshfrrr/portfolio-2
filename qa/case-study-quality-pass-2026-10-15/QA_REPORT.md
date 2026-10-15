# OVIO case-study quality pass — 15 October 2026

## Scope and outcome

The existing four-plane homepage, camera choreography, overview/index, about/contact continuation and routes are preserved. No dependencies, binary project assets, scene positions or animation libraries were changed. RED ROOM remains a campaign within TEEN FIESTA.

The final production build passed 52 gallery checks and 54 navigation/reliability checks. Supplementary tests verified actual Tab order, all four fallback links, mobile contact drafts and the absence of transient reduced-motion pin insertion. The external TEEN FIESTA deployment failed independently of the portfolio: its supplied URL returns Vercel `404 DEPLOYMENT_NOT_FOUND`.

## Baseline and confirmed defects

The workspace is `D:/projects/second_pf`. `.git` is still absent; branch/history/diff inspection is unavailable. No repository was initialized and no commits or pushes were made. Baseline lint, TypeScript and production build all passed before editing.

Baseline browser tests used the production build on the dedicated QA port 3001. The existing server on port 3000 was left alone.

- The lead gallery inherited the shared `data-scroll-reveal` clipping animation. At initial 1440 × 900 load it masked 23.61% of LANE, ARCUS and Rewatch, and 67.22% of TEEN FIESTA. This was a scroll mask, not missing screenshot content. Removing that attribute from the gallery leaves the opening image fully visible.
- Controls followed an image whose height changes between landscape and portrait. At 390px, ARCUS's navigation bottom moved from 789.56px to 1111.67px on selecting the mobile image. Controls now precede the image; their bottom remains 557.95px before and after selection in the final test. All four projects passed control-visibility checks at 390px and 320px.
- A blocked supporting image left a blank frame. The gallery now announces loading/failure, offers retry, preserves navigation/focus and avoids a broken thumbnail icon. Deliberate HTTP 503 interception reproduced the failure; removing the interception and activating Retry recovered the image.
- Whitespace-only name/message values passed native `required` validation and prepared an empty contact draft. Trimmed-value validation now rejects these values; edits clear custom validity and stale drafts without discarding the message.

Baseline evidence is retained in `baseline-verification.json` and the explicitly named baseline captures. The two `comparison-*` files juxtapose actual before/after browser screenshots; they are labeled composites, not additional browser captures.

## Case-study decisions

| Route | Three highest-impact findings and changes |
| --- | --- |
| `/work/lane` | Removed the partial opening-image mask. Distinguished the sculptural HEAT homepage, alternate HEAT layout and Teen Soirée archive state through factual captions. Shortened the large overview and explained why the two HEAT screenshots are states of one campaign. |
| `/work/arcus` | Removed the opening-image mask. Stabilized controls and preserved the full 375 × 812 mobile capture when changing aspect ratios. Replaced generic captions with next-session/sidebar/bottom-navigation details and distinguished source-inspected draft/sync code from browser-tested portfolio interactions. |
| `/work/teen-fiesta` | Removed the most severe opening mask. Preserved the website → supplied announcement → promotional-still sequence and clarified the parent/campaign relationship. Used exact poster/still ratios, stable controls and accurate captions without presenting promotional material as a completed event. The additional live-link audit found the missing deployment; the case study now displays an unavailable notice instead of a broken Visit action. |
| `/work/rewatch` | Removed the opening mask. Stabilized landscape/mobile navigation and framing. Clarified search/category/catalog and mobile account/navigation captions, shortened the overview, and preserved collaborative credit and the signed-in-workflow limitation. |

The ARCUS captures document an earlier public dashboard state; the current live URL redirects to `/home` and renders a community feed. The supplied imagery was retained and labeled as earlier material. No signed-in, sync, offline or purchase workflow in the external products was independently exercised. Existing implementation claims were checked against available local source where applicable; screenshots are not presented as feature-test evidence.

## Files changed

| File | Purpose |
| --- | --- |
| [project-gallery.tsx](D:/projects/second_pf/src/components/project-gallery.tsx) | Stable caption/control order; loading, failure and retry states; failed-thumbnail handling; responsive `sizes`; visible viewer focus; live caption/count; modifier-safe local arrow handling. |
| [globals.css](D:/projects/second_pf/src/app/globals.css) | Gallery height bounds, status treatment, readable captions, 44px navigation targets, focus outline and focused mobile spacing. |
| [projects.ts](D:/projects/second_pf/src/lib/projects.ts) | Accurate captions, image ratios, concise narratives and unavailable live-deployment state. |
| [case-study page](D:/projects/second_pf/src/app/work/[slug]/page.tsx) | Render the unavailable live-site notice while retaining local case content. |
| [contact-composer.tsx](D:/projects/second_pf/src/components/contact-composer.tsx) | Reject whitespace-only required values and clear stale validation on edit. |
| [image provenance](D:/projects/second_pf/public/work/README.md) | Clarify alternate HEAT layouts and supplied campaign material. |

The unified cover-plus-supporting-image gallery and its per-project key remain in place. No second cover block or homepage project showcase was introduced.

## Asset audit

All files below are existing assets under `D:/projects/second_pf/public/work/`. None was recompressed or replaced. `performance.json` records exact bytes, dimensions, formats and SHA-256 hashes; the ten source files have distinct hashes.

| Project | Gallery sequence | Dimensions |
| --- | --- | --- |
| LANE | `lane-desktop.png` → `lane-home.png` → `lane-archive.png` | 2534 × 1409; 1536 × 864; 1536 × 1400 |
| ARCUS | `arcus-desktop.webp` → `arcus-mobile.webp` | 1425 × 891; 375 × 812 |
| TEEN FIESTA | `teen-fiesta-desktop.png` → `red-room-poster.jpg` → `red-room-dj.jpg` | 1850 × 951; 1120 × 1408; 640 × 1136 |
| Rewatch | `rewatch-desktop.webp` → `rewatch-mobile.webp` | 1425 × 891; 375 × 812 |

LANE's two homepage captures intentionally show different layouts of the same HEAT campaign. RED ROOM's poster and promotional still are supporting TEEN FIESTA material, not separate top-level projects. The original hero texture mapping remains LANE → `spatial/lane.webp`, ARCUS → `spatial/arcus.webp`, TEEN FIESTA → `spatial/teen-fiesta.webp`, Rewatch → `spatial/rewatch.webp`.

## Gallery and accessibility verification

Passed in actual installed Chrome, controlled by the existing bundled Playwright runtime; no Playwright dependency was added to the application:

- All four correct initial covers, eager loading, meaningful alt text, captions and `01` counters.
- Previous/next, viewer-scoped Left/Right keys, visible focus, thumbnail selection and synchronized counters/images. Eleven rapid consecutive Next clicks preserve modulo state on every project.
- Route switching resets each gallery to its cover; browser Back returns to the preceding case without corrupting gallery state.
- Actual Tab traversal: Next button → viewer → first thumbnail; contact name → email → message. Index opens with Space/Enter, project selection works by keyboard, Escape closes it and restores toggle focus. The selected case-study link is unobstructed after dismissal.
- Controlled missing-image failure, useful fallback, retry recovery and navigation after recovery.
- Initial reduced-motion context explicitly set with `browser.newContext({ reducedMotion: 'reduce' })` before navigation. Actual `matchMedia('(prefers-reduced-motion: reduce)').matches` is **true**.
- Reduced motion: zero pin spacers; an initialization MutationObserver saw **zero pin insertions**; no CSS animation starts; no running Web Animations after load; no Lenis class remains. Both ambient fields have `data-motion="reduced"`, `data-active="false"` and computed pseudo-element `animation-name: none`.
- PageDown scrolls naturally under reduced motion. Project selection and links work. Gallery Right updates to slide 02 immediately; after two animation frames its opacity is 1, transform is identity and running animation count is zero. Previous click returns to slide 01.
- Deliberately returning `null` for WebGL context initialization produces no remaining canvas or pin and leaves all four fallback projects discoverable. Each of the four index links was then activated with Enter and reached its real case-study gallery.

The expected Three.js errors from the injected WebGL failure were retained in the log. They were not hidden or treated as normal-session failures.

## Routes, scrolling and cleanup

Actual browser navigation covered `/`, `/work`, all four case studies, `/about` and `/contact`, using header links, archive links, the index, selected-project CTA and Next project links. About's practice content was scrolled and inspected. The unknown `/work/qa-unknown-project` correctly returned 404 with a working Browse the work recovery link. `/work/red-room` redirected to `/work/teen-fiesta`.

The homepage retains one canvas and one finite desktop cinematic pin. A mid-scroll capture shows the existing camera transition; scrolling past it reaches about/contact. Reverse scrolling restores the opening cues. There are only the spatial hero, about and contact sections on the homepage.

Four client-side homepage/about navigation cycles each created one pin/canvas on the homepage and removed both on departure. Chrome `DOMDebugger.getEventListeners` showed stable window/document listener counts across the later cycles. No growing listener or duplicate pin defect was observed. This is evidence from DOM/listener behavior, not a direct enumeration of GSAP's private timeline registry; that internal enumeration remains unverified.

Normal homepage, selection, gallery and route sessions had no unexpected console warnings, page errors, failed asset requests or Three.js deprecation warnings. The logs intentionally include the unknown-route 404, injected image 503s and injected WebGL errors. `verification.json` and `reliability.json` retain them instead of filtering them away.

## Responsive and contact verification

All four case studies were tested at 1280 × 800, 1440 × 900, 1920 × 1080, 390 × 844 and 320 × 740. No horizontal document overflow was detected. Active images use `object-fit: contain`; portrait imagery keeps its aspect ratio and normal page scrolling. All four mobile narratives were also scrolled and captured at 390px. Focused mobile contact tests passed at 390px and 320px.

Contact tests used synthetic `qa@example.invalid` values. Empty fields, invalid email and whitespace-only name/message were rejected. Valid keyboard submission produced a local `mailto:` draft, preserved fields and disclosed that nothing was sent. Editing removed the stale draft while keeping the message. The direct email href is correct. No mail app was launched and no email was sent; external email-app handling is unverified.

Mobile scrolling was profiled with Chrome CDP Performance metrics at 4× CPU throttle and software WebGL. A dispatched touchStart/Move/End drag across the canvas moved the document to scrollY **561**, with zero pins or horizontal overflow. Node and event-listener counts were stable through that gesture. The environment's `Input.synthesizeScrollGesture` shortcut produced no scrolling; direct touch dispatch confirmed the page behavior. This is emulation, not physical-device evidence, and establishes no FPS claim.

## Image loading and performance evidence

The installed Next.js version is **16.4.0**. Its local Image API documentation was consulted. Supported `loading="eager"` is retained for each first cover and the first `/work` archive image; later archive images and nonactive gallery imagery remain lazy. The active full-size gallery image is mounted alone, alongside small lazy thumbnails. No deprecated priority API or manual duplicate preload was introduced.

Desktop landscape `sizes` previously advertised 78vw for a roughly 91.6vw frame. It now describes the actual viewport/max-width layout; portrait slides use a separate width hint. The measured 1440px cover candidate changed from `w=1200` to `w=1920`. This corrects resolution selection and can increase bytes; it is not claimed as a bandwidth reduction. Containers reserve dimensions, while deliberate image-aspect changes remain user initiated.

`performance.json` contains production PerformanceObserver samples with browser cache disabled and then enabled/primed, at 1440 × 900 and DPR 1. It includes navigation timing, image request initiators/timing/bytes, LCP candidates, layout shifts, long tasks, preloads and cache behavior. React/Next emitted one responsive image preload per sampled route, matching its eager cover. No duplicate request of the same optimized cover URL was observed. Thumbnail widths are separate, small renditions; lazy images near the viewport can still be fetched by the browser.

LANE's original 2,665,195-byte PNG was preserved: its selected optimized cover response body was 42,626 bytes in the recorded production load. ARCUS and Rewatch already use WebP, and the existing spatial textures remain separate reduced-size assets. The remaining large originals are also served through Next's optimizer; no indiscriminate conversion was justified.

These are single localhost samples with the server optimizer potentially warm. Some runs overlapped other QA browser work. Cold/warm differences demonstrate cache behavior, not a controlled before/after performance gain. The observed LCP element was a cover image for LANE/ARCUS/Rewatch, and varied between heading and cover for TEEN FIESTA; `/work` was heading led. No physical-device, Safari, Firefox or real-GPU performance claim is made. See `METRICS.md` for the exact final sample table.

## External destinations actually opened

| URL | Result |
| --- | --- |
| `https://thelane.vercel.app/` | Passed: HTTP 200, LANE homepage, HEAT campaign content rendered. |
| `https://thearcus.vercel.app/` | Passed: redirected to `/home`, HTTP 200, ARCUS community feed rendered. Supplied dashboard captures are earlier material. |
| `https://theteenfiesta.vercel.app/` | Failed: HTTP 404, Vercel `DEPLOYMENT_NOT_FOUND`, reproduced in repeat visits. The local case study remains intact; its Visit action is replaced by an availability notice. Original URL remains in project data for provenance. Restoring that external deployment requires a valid deployment or replacement URL. |
| `https://rewatch.cc/` | Passed: HTTP 200, Rewatch public media-discovery homepage rendered. |

These checks opened public pages only; they did not authenticate, mutate accounts, buy passes or test every external feature.

## Validation and evidence

| Check | Result |
| --- | --- |
| Baseline `npm run lint`, `npm run check`, `npm run build` | Passed before source changes. |
| Final `npm run lint` (`eslint .`) | Passed. |
| Final `npm run check` (`tsc --noEmit`) | Passed. |
| Final `npm run build` (`next build`) | Passed; 13 generated pages. |
| Production browser galleries | 52 checks passed, no failed checks. |
| Production browser routes/reliability | 54 checks passed, no failed checks. |
| Supplementary mobile, Tab, reduced-initial and four fallback links | Passed; recorded in `detail-verification.json`. |
| External TEEN FIESTA deployment | Failed externally; not concealed or represented as repaired. |

Windows sandbox restrictions required elevated execution for the Next production build/server and local Chrome automation. The production server was an owned temporary QA process on port 3001, launched with `npm run start -- --port 3001`. No unrelated process was terminated. The existing development server on port 3000 was not restarted.

All required screenshots were captured from the actual production browser and opened for visual inspection. Exact absolute paths, dimensions, purposes and inspection status are listed in [SCREENSHOTS.md](D:/projects/second_pf/qa/case-study-quality-pass-2026-10-15/SCREENSHOTS.md). It includes all 17 requested files, additional gallery/detail/mobile/contact/fallback captures, retained baseline captures and the two labeled comparison composites.

Temporary browser scripts were kept outside application source and removed after verification. The application contains no added QA globals, instrumentation or debug hooks. Remaining limitations are the external TEEN FIESTA deployment, untested external signed-in/offline/product flows, email-app launching, other browser engines, physical-device performance and direct private GSAP timeline enumeration.
