# OVIO — Open the view

## Reference observations

The live Fantik homepage was opened in installed Chrome at 1440×900. Screenshots in `reference/` cover the opening, pointer-position change, ten initial wheel samples, later projects, contact, and the expanded menu. The scroll sequence was followed through the contact state. The DOM reports a viewport-height document: this is a persistent virtual stage, not a conventional long document. Large titles and project media arrive within that same stage. Compact controls stay anchored at the edges; the project title, media, description, action and scene work together. At rest the environment continues moving. A pointer-position screenshot alone does not isolate pointer movement from ambient movement, so no specific pointer physics are claimed.

The opening uses a pixel-like white Fantik wordmark, neutral small interface typography, a dark animated environment, and generous space. Inspected interface text reports InterDisplay-Regular. The rendered wordmark is observed visually; its exact font construction was not established. The menu is a large right-side overlay; contact is also reachable by moving through the same project sequence. Archived landing.love recording metadata and its page screenshot are saved separately. The current live experience is the primary reference; no source, branded assets, terrain, stars, mascots or artwork were copied.

## Why the old OVIO opening changed

The baseline shows four independently arranged screenshots and a largely empty interface frame. The screenshots provide depth, but the identity and project discovery do not participate in that spatial arrangement. A larger font or stronger light would leave that underlying composition unchanged.

## Chosen concept and tokens

“Open the view” turns OVIO into a typographic media instrument. One authentic project image cuts through the large wordmark. Scrolling separates the upper and lower letterforms and opens the image into its complete presentation. Four project selectors and a native modal index operate the same media window; the homepage has no second project gallery.

- Foundation `#08090b`, raised index `#111214`, paper `#e9e5d8`, secondary `#b7b3aa`, restrained copper `#c8795b` for selection/progress.
- Existing local Bricolage Grotesque for the identity/project names, Manrope for interface/body; existing Instrument Serif remains on editorial routes. No fonts or dependencies added.
- Desktop: edge-aligned notes, one central type/media composition, project caption and selection rail below. No decorative environment or second canvas.
- Mobile: readable complete identity and complete image in one compact vertical stage; two-column text selectors, native scrolling, no pin or pointer motion.

The design was checked against the brief before implementation. The typography is the structure of the opening, not an extra headline above the prior floating stack. The previous R3F scene remains in source and is not loaded by this homepage; authentic project data, imagery, routes and galleries are reused. A DOM media window achieves this particular concept without WebGL.

## Animation responsibilities

GSAP owns the initial wordmark clip, a finite desktop ScrollTrigger timeline, cancellable media selection reveals, and subtle pointer translation. Each operates on its own element. Scroll opens the image mask and separates the wordmark halves; selection clips a child media frame; pointer movement translates a nested layer. Lenis keeps its existing GSAP ticker/ScrollTrigger integration. Contexts, matchMedia listeners and pointer listeners are reverted on unmount. Reduced-motion media queries suppress the pin and introduction before creation; CSS presents an already-open image. Mobile retains the single typographic entrance and uses a static composition for scrolling, with no pin or pointer movement.

## Implementation review criteria

1. Opening: OVIO readable; real imagery integrated with type; all four true identities and routes accessible.
2. Motion: forward/backward scroll reversible; selection stable under rapid changes; pointer movement restrained.
3. Discovery: project index, native focus containment, Escape restoration, arrow-key selection and case links work.
4. Resilience: mobile/reduced motion never pin; no WebGL needed; authentic image quality and route galleries retained.
5. Completion: inspect actual same-size before/after captures, run lint, TypeScript and production build; record browser limits honestly.
