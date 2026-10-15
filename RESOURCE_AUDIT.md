# OVIO 2.0 resource decisions

Reviewed 15 October 2026. Resource examples informed the work; source code, layouts, screenshots, and branded assets were not copied.

## Implemented in the application

- **Project index:** A compact visual index now pairs each existing project selection with a small local screenshot, active state, and case-study link. This adapts the useful preview/selection patterns seen in [21st.dev](https://docs.21st.dev/), [shadcn Dialog](https://ui.shadcn.com/docs/components/radix/dialog), and [MicroKit's spotlight navigation](https://microkit.co/components), using the installed Motion package and the current R3F selection timeline.
- **Case-study gallery:** Native previous/next buttons, left/right keyboard navigation, a live image count, and thumbnail choices make the existing gallery act like a viewer. The interaction follows the clear controls and state feedback in [shadcn's carousel guidance](https://ui.shadcn.com/docs/components/radix/carousel), without adding Embla or another dependency.
- **About/contact atmosphere:** A restrained CSS radial light field adds a low-frequency visual transition around the secondary editorial sections. An IntersectionObserver pauses it outside the viewport; `prefers-reduced-motion` and browsers without IntersectionObserver retain the static treatment. This is an experiment in the existing CSS layer, not a second WebGL canvas.
- **Contact:** The contact route now has a short, accessible project-note composer. Submitting prepares a local `mailto:` link; the site does not transmit the form. Direct email remains available as a fallback.

## Research that informed the design

- [Minimal Gallery](https://minimal.gallery/) and [Kage](https://kage.design/) reinforced using authored imagery, a limited set of strong page states, and explicit spacing/hierarchy rather than adding generic portfolio sections.
- [AppShot Gallery](https://www.appshot.gallery/) is an app-store screenshot reference library, not a source of desktop portfolio imagery. Its mobile comparisons supported checking mobile-specific crop and legibility while keeping OVIO's own screenshots.
- [The Component Gallery](https://component.gallery/) documents established interaction patterns. [Refero Styles](https://styles.refero.design/), [DESIGN.md](https://designmd.ai/), and [getdesign.md](https://getdesign.md/) informed keeping the existing tokenized OVIO design system as the source of truth. [Jiro](https://jiro.build/) is a prompt/template catalog; [VibePrompt](https://vibeprompt.tech/workflow) is a build-and-quality workflow. Neither is an application component.
- [Motion Primitives](https://motion-primitives.com/docs/text-effect), [Kinetics](https://kinetics.colorion.co/), [MicroKit UI](https://microkit.co/components), and [Anime.js](https://animejs.com/documentation/events/onscroll) were reviewed for component and scroll interaction patterns. Existing Motion remains responsible for discrete UI transitions; GSAP + ScrollTrigger remain responsible for scroll choreography. No second animation engine was installed.
- [shadcn/ui](https://ui.shadcn.com/docs/components), [Aceternity UI](https://ui.aceternity.com/components), and [Magic UI](https://magicui.design/docs/components/marquee) were reviewed. Their component concepts were adapted selectively; their themed component packages are not dependencies.

## Evaluated and not added

- **ShaderGradient:** The [official React README](https://github.com/ruucm/shadergradient) installs `@shadergradient/react` with its peer packages and renders through `ShaderGradientCanvas`. Its current compatibility table names Next.js 15 App Router with React 19/R3F 9, not this project's Next.js 16. A second canvas would compete with the dimensional-stack renderer. The secondary-section experiment therefore uses the site's existing CSS renderer, with an observer-controlled animation and a static fallback. `@shadergradient/react` is not installed.
- **mapcn:** A map would add MapLibre, remote basemap tiles, a worker, and extra loading/security considerations without helping this portfolio's contact task; Agra and remote collaboration are already stated in the interface.
- **Liquid Glass:** A refractive layer would add visual noise and additional filter behavior to controls that are already legible. The index keeps its existing restrained translucent surface.
- **Uiverse:** The existing site uses consistent project-specific buttons and links; no community button style was a better fit than adapting the site's underline and arrow feedback.
- **Kitbitz and 3dicons:** Additional illustrations or 3D icons would compete with the authentic project screenshots. No external visual assets were introduced.

## Dependencies

No dependencies were added. The application continues to use its existing Next.js, React, R3F/Three.js, GSAP/ScrollTrigger, Lenis, and Motion stack.
