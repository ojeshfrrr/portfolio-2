# Work image provenance



These are selected, unmodified visual captures from projects already in the user's workspace. No stock imagery is used.



| File | Source | Use |

| --- | --- | --- |

| lane-home.png | D:/projects/lane-studio/qa-screenshots/home-desktop-current.png | LANE site capture |

| lane-archive.png | D:/projects/lane-studio/qa-screenshots/section-sequence-full.png | LANE campaign selector capture |

| arcus-desktop.webp, arcus-mobile.webp | D:/projects/myovio-portfolio site/public/projects/arcus-desktop.webp, arcus-mobile.webp | Public ARCUS dashboard captures from 10 October 2026 |

| teen-fiesta-website.png | Actual browser capture of the local Teen Fiesta static export's film section | Website cover; 1850 × 951 |
| teen-fiesta-event-artwork.jpg | D:/projects/teen_fiesta/public/media/hero-campaign.jpg | Supplied Teen Fiesta-branded event artwork, unmodified |
| teen-fiesta-announcement.jpg | D:/projects/teen_fiesta/public/media/coming-soon.jpg | Supplied Teen Fiesta-branded announcement, unmodified |

| rewatch-desktop.webp, rewatch-mobile.webp | D:/projects/myovio-portfolio site/public/projects/rewatch-desktop.webp, rewatch-mobile.webp | Public Rewatch homepage captures from 10 October 2026 |



The ARCUS capture is an earlier public dashboard state and shows empty example metrics. Rewatch is collaborative work; credit OVIO and Suvo (Gaurav Raj Singh). Screenshots show interface states, not customer outcomes.



## Updated screenshots



- `lane-desktop.png`: user-supplied LANE website screenshot, 2534 × 1409; used as the LANE case-study cover.

- `teen-fiesta-website.png`: real browser capture of the existing film section, 1850 × 951. The frame preserves the existing spatial-plane dimensions. It replaces the incorrect earlier cover.

Each case-study viewer combines its cover with the distinct supporting images
listed in `src/lib/projects.ts`. The cover is the first slide, so it is not
rendered again in a separate static hero block.

The two LANE homepage captures show alternate layouts for the same HEAT
campaign. `lane-home.png` uses AFTER dark as its headline; it is not a separate
campaign. The ARCUS and Rewatch mobile captures
show bottom navigation alongside their desktop sidebar layouts.



## Spatial hero textures

Each top-level project has one explicit `cover.textureSrc` and one hero plane.
The desktop and mobile renderer both map the same four project entries:

| Project | Hero texture | Original screenshot |
| --- | --- | --- |
| LANE | `spatial/lane.webp` | `lane-desktop.png` |
| ARCUS | `spatial/arcus.webp` | `arcus-desktop.webp` |
| TEEN FIESTA | `spatial/teen-fiesta-website.webp` | `teen-fiesta-website.png` |
| Rewatch | `spatial/rewatch.webp` | `rewatch-desktop.webp` |

WebP derivatives preserve full framing and aspect ratio, capped at 1920 pixels
without upscaling. LANE's archive remains case-study gallery material.

## Teen Fiesta correction

The user's latest correction supersedes the prior campaign interpretation.
TEEN FIESTA is presented as an event website with no nested campaign relationship.
Only the inspected film-section capture and visibly Teen Fiesta-branded supplied
artwork are mapped to this project. The public URL currently returns a deployment
404, so feature inspection used the existing local static export. Film playback
and native controls were exercised there. The original supplied media remain
unchanged; no event results, dates, ticket features or unrelated names are claimed
in the portfolio copy. Earlier QA records are historical and superseded by this
correction.

## Current case-study captures / 17 October 2026

These current DOM-homepage covers and case-study sequences supersede the older screenshot mappings above. Older files and optional spatial-scene textures are retained. All new captures were made by Chrome at device pixel ratio 2, with real fonts/images loaded and no browser chrome. Source projects were not visually edited for capture. ARCUS's native cookie prompt was dismissed through its actual Decline button; no workout or account data was seeded.

| Assets under `case-studies/` | Source | Original pixels |
| --- | --- | --- |
| `lane-opening.webp`, `lane-campaign.webp`, `lane-archive.webp` | Current local LANE source, homepage, `/events/heat`, `/events`; captured from a local production build | 2880 × 1800 each |
| `lane-mobile.webp` | Actual local responsive homepage, 390 × 844 viewport | 780 × 1688 |
| `arcus-dashboard.webp`, `arcus-workout.webp`, `arcus-exercises.webp` | Actual local ARCUS source, signed-out dashboard, workout entry and exercise catalogue | 2880 × 1800 each |
| `arcus-mobile.webp` | Actual local signed-out training dashboard | 780 × 1688 |
| `teen-fiesta-film.webp` | Complete verified film section of the existing Teen Fiesta static export, captured at an 1850px viewport | 3670 × 2074 |
| `teen-fiesta-mobile.webp` | Actual responsive film section of the same export | 780 × 1540 |
| `rewatch-opening.webp`, `rewatch-browse.webp` | Actual public `https://rewatch.cc/` and `/browse`, dark system preference, signed out | 2880 × 1800 each |
| `rewatch-mobile.webp` | Actual public responsive opening, dark system preference | 780 × 1688 |

The WebP assets are quality-95 encodes without resizing; raw browser PNGs, viewport settings and exact file metadata are retained under `qa/project-visuals-and-entry-2026-10-17/sources/` and `selected-assets.json`. Runtime large imagery uses Next Image quality 90 and responsive sizes. Rewatch source code was not available locally; its case study distinguishes visible public UI from unverified signed-in/backend behavior. ARCUS local data code was inspected; account sync and offline recovery are not represented as verified by empty-state captures.

### Distinct visual details

- `lane-original-artwork.webp`: unmodified copy of the original supplied HEAT poster from the LANE source assets, 1080 × 1080. It is credited as supplied artwork, not as newly created work.
- `arcus-library-detail.webp`: crop of the real new exercise-library capture, `{ left: 480, top: 420, width: 2200, height: 950 }`. No UI elements were invented or moved.
- `rewatch-catalogue-detail.webp`: crop of the real public browse capture, `{ left: 590, top: 770, width: 2200, height: 920 }`. Visible media metadata belongs to that captured public interface; it is not an OVIO performance claim.
- `teen-fiesta-film.mp4`, `teen-fiesta-film-poster.jpg`: unmodified supplied film and poster from the existing local export (`media/campaign-film-wide.mp4` and `media/film-poster.jpg`). Sampled frames were inspected and actual native-control playback was verified. Video is opt-in (`preload="none"`, no autoplay). No public deployment or ticketing capability is implied.

The Teen Fiesta gallery continues to include its verified supplied event artwork and announcement. The rejected project/campaign identity is not reintroduced. The separate source export contains other, excluded material; only the verified Teen Fiesta film section and branded supplied media are used here.
