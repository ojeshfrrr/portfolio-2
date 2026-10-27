# Cosmic atmosphere assets

Original background-only artwork generated with the built-in imagegen tool on 2026-10-16 for this portfolio. This is an atmospheric interpretation, not astronomical documentation or an image of a portfolio project. It does not replace, recolor or filter project screenshots.

| Asset | Dimensions | Transfer size | Purpose |
| --- | --- | --- | --- |
| cosmic-nebula.webp | 1536 × 1024 | 55,102 bytes | Smooth irregular copper / indigo cloud plate |
| cosmic-nebula-mobile.webp | 600 × 1000 | 22,044 bytes | Smaller portrait crop for mobile |
| cosmic-distance.svg | 1440 × 1000 viewBox | 2,744 bytes | 42 fixed distant stars and 6 faint soft dust motes |
| cosmic-distance-mobile.svg | 390 × 844 viewBox | 1,017 bytes | 12 fixed stars and 2 faint dust motes |

The two SVGs are locally authored, deterministic and non-repeating. There is no noise filter, twinkle loop, canvas or runtime particle simulation. Asset preparation uses the existing Sharp dependency; no package was installed. Source plate, preparation script and generation prompt are retained under `qa/cosmic-atmosphere-2026-10-16/`.

Only a very slow transform of the diffuse plate animates on desktop, using the existing AmbientField visibility/reduced-motion lifecycle. Stars/dust stay fixed, mobile is static, and the document-wide background is static. CSS fallback lighting remains available if the atmospheric image cannot load; atmosphere does not depend on WebGL.
