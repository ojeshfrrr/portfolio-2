# OVIO Design System

## Overview

OVIO is an independent creative-development practice. The portfolio is an editorial archive built around four real project surfaces in a dark spatial environment. Let the work establish the atmosphere; interface elements should stay quiet, legible, and easy to use.

## Colors

| Token | Value | Use |
| --- | --- | --- |
| Void | `#09090b` | Main page background |
| Carbon | `#111114` | Raised editorial sections |
| Carbon raised | `#19191d` | Hover and selected surfaces |
| Paper | `#e9e5d8` | Main text and light controls |
| Paper dim | `#b7b3aa` | Supporting copy |
| Quiet | `#85828a` | Captions and tertiary metadata |
| Copper | `#c8795b` | Interaction accent and active states |
| Rule | `rgba(233, 229, 216, 0.17)` | Dividers and understated boundaries |

Keep the surrounding interface nearly monochrome. Project imagery supplies the strong color. Do not add new accent colors to the global system for individual screens.

## Typography

- **Space Grotesk**: display headings, project names, and short labels. Use close tracking on large display sizes.
- **Manrope**: body copy, navigation, captions, and controls. Favor calm line lengths and generous leading.
- **Georgia**: a rare editorial contrast only where the content calls for an italic or literary accent.
- Keep utility labels compact and readable; do not reduce essential controls to decorative microtype.

## Layout and spacing

- Use `--gutter: clamp(1.1rem, 4.2vw, 5.5rem)` for page edges.
- Keep the navigation fixed and restrained at `--header-h: 5.5rem` on desktop, with the existing mobile reduction.
- The homepage opens with one full-viewport spatial composition. The four project planes are the only project showcase on that page.
- Follow the scene with the existing about and contact sections in normal document flow.
- Case-study pages use wide editorial margins, large project titles, responsive image frames, and clear captions.
- Use fine rules and small radii for interface panels. Avoid dashboard-like card grids, heavy glass surfaces, and ornamental borders.

## Depth and surfaces

- R3F and Three.js own the four independent, screenshot-textured project planes and their camera framing.
- Preserve the existing diagonal arrangement, aspect ratios, overlap, and depth hierarchy when changing UI around the scene.
- The canvas is progressive enhancement: the existing image fallback and case-study links keep the content available without WebGL.
- Do not add unrelated 3D objects, stock imagery, or generated project screenshots.

## Motion responsibilities

- **GSAP + ScrollTrigger** own the pinned desktop scene transition and scroll progress.
- **Lenis** owns smooth document scrolling and stays synchronized with GSAP's ticker and ScrollTrigger updates.
- **R3F** renders scene state; the existing GSAP scene timeline owns project selection poses, while pointer parallax remains a small independent camera offset.
- **Motion** is for discrete interface state, such as navigation, the project index, and case-study gallery selection.
- **CSS** handles simple hover and focus feedback.
- Never let two animation systems write the same transform or opacity on the same element. Respect reduced motion and retain native scrolling.

## Components and interaction

- Navigation links show the current route and retain visible keyboard focus.
- The project index remains a compact list of the four canonical projects; selecting one updates the active plane and metadata without adding another gallery.
- Case-study links remain available from the hero, index, and each project route.
- Gallery controls are native buttons with descriptive labels and pressed states.
- Use concise metadata, clear captions, and meaningful image alternatives.

## Do and don't

- Do keep the dimensional stack as the first and central portfolio experience.
- Do use the actual local project screenshots and the established project data.
- Do keep camera motion restrained and selection transitions reversible.
- Do test touch, keyboard, reduced-motion, narrow widths, and WebGL fallback.
- Don't add a second animation engine for scroll or scene movement.
- Don't add maps, decorative icons, liquid-glass effects, or generic visual components without a concrete content need.
- Don't duplicate project planes or add a project grid below the homepage scene.
