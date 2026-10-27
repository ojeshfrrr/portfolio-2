# Open the View — typographic image refinement

## What changed

The baseline's 19svh band obscured nearly half of all four letters. The refined identity uses the same local Bricolage Grotesque at weight 600, optical size 96, 28vw display scale, −0.015em tracking and 0.95 line height. The complete wordmark has clear margins. A matching outline continues the letterforms over the image, while the solid version sits behind it. The deeper, shaped media opening intersects the identity instead of erasing a horizontal band through every letter.

The three existing local font roles were rendered as browser specimens before selection: Bricolage Grotesque, Manrope and Instrument Serif Italic. Bricolage was retained for its sculptural O/V shapes and compatible existing identity. No fonts, dependencies, renderers or project assets were added.

Project selection changes the image and framing together: LANE has a cut aligned with the V, ARCUS a more orthogonal interface frame, Teen Fiesta a wider film frame, and Rewatch an opposite-slanted opening. The solid/outline relationship changes with that framing. Actual screenshot pixels, project facts and case-study destinations are unchanged. Scroll expands the selected framing into a complete contain-fit presentation.

One cancellable GSAP selection timeline owns image crossfades, framing state and metadata. ScrollTrigger owns a separate progress value; one renderer combines the two states and writes media geometry. Pointer translation stays on its nested layer. Rapid changes continue from current values without resetting all images to hidden. Mobile keeps its complete unmasked wordmark and natural vertical composition; its desktop clipping entrance is unnecessary and disabled. Reduced motion uses static framing and immediate selection.

## Files changed in this pass

- `src/components/identity-stage.tsx`
- `src/components/identity-stage.module.css`
- `DESIGN.md`
- Evidence/scripts under `qa/type-image-refinement-2026-10-16/`

Homepage sections, other routes, galleries, global styles, project data, image mappings, font loading configuration and package files were not changed by this pass. Earlier uncommitted work existed before this request.

## Actual visual review

Installed Google Chrome, controlled through the existing bundled Playwright runtime, captured the baseline at 1440×900 before source edits. The same viewport was captured after implementation and in the production build. The saved side-by-side comparison was inspected. Opening, all four selected-project states, the open index, middle/open/reversed scroll states, reduced motion and 390px mobile were inspected. The prototype and local font specimens are preserved.

A review-display artifact initially made repeated mobile captures appear to omit unchanged letters. Direct analysis of the original stored RGB images showed the wordmark present in every case (11,591 paper-colored pixels in the compared 390px crop). Re-encoding the same capture for viewing confirmed it. This was not a website paint defect. Experimental compositor promotion and a duplicate mobile type element were removed; no such workaround is shipped. Final tests compare actual stored pixels through repeated index selections and consecutive screenshots.

Original browser screenshots remain PNG files. JPEG viewing copies and the side-by-side are derivatives; they do not replace or alter the originals.

## Production verification

**47/47 checks passed** against the production server on port 3001; full results are in `production/results.json`.

- All four selections update the real image, pressed state, metadata and correct case-study destination; framing differs for each project.
- Rapid consecutive selection: no blank image frames during sampled browser animation frames; final state contains exactly the chosen image.
- Forward/backward scrolling and selection during scrolling restore the intended project framing.
- Desktop/mobile resize removes the pin and recreates exactly one on returning to desktop.
- Keyboard project selection, index opening, Escape focus restoration and modal background scroll lock work.
- All four case-study routes and their gallery next controls work after navigation; the homepage pin is removed on those routes.
- Actual reduced-motion preference is explicitly enabled before navigation. There are no initial or transient pins, the composition remains static, selection is immediate and native scrolling works. Changing the preference during a selection settles metadata and removes the pin; restoring standard motion recreates one pin.
- 390px and 320px touch contexts: no horizontal overflow or pin; complete wordmark pixels persist through repeated index selections and consecutive captures; CDP touch gestures scroll naturally.
- Zero application errors and zero failed local asset/route responses.

Chrome recorded one warning that the responsive LANE `w=1200` image preload was unused within its timing window during the test sequence. The existing preload policy was left unchanged; this is retained in the result JSON and is not counted as an application error. Its exact timing cause was not investigated as part of this visual pass.

## Required checks

- `npm run lint` — passed.
- `npm run check` — passed.
- `npm run build` — passed, including all 13 generated pages and the four case studies.

Physical mobile hardware, Safari, Firefox, assistive-technology sessions and hardware performance profiling remain unverified. Mobile results use Chrome viewport/touch emulation. No deployment or Git push was performed.
