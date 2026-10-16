# Local display fonts

Downloaded 2026-10-16 from Google Fonts. Unmodified Latin WOFF2 files; no font package added. Both families are licensed under the SIL Open Font License 1.1; the complete copyright and license text is included alongside each file.

| File | Family / axes | Size | License |
| --- | --- | --- | --- |
| bricolage-grotesque-latin.woff2 | Bricolage Grotesque, normal, wght 400–700 / opsz 12–96 | 76,888 bytes | bricolagegrotesque-OFL.txt |
| instrument-serif-latin-italic.woff2 | Instrument Serif, italic, 400 | 22,128 bytes | instrumentserif-OFL.txt |

Sources:

- Bricolage: https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..700&display=swap
- Binary: https://fonts.gstatic.com/s/bricolagegrotesque/v9/3y9K6as8bTXq_nANBjzKo3IeZx8z6up5BeSl9D4dj_x9PpZBMlGIInE.woff2
- License: https://raw.githubusercontent.com/google/fonts/main/ofl/bricolagegrotesque/OFL.txt
- Instrument: https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap
- Binary: https://fonts.gstatic.com/s/instrumentserif/v5/jizHRFtNs2ka5fXjeivQ4LroWlx-6zAjjH7M.woff2
- License: https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/OFL.txt

The existing Manrope Latin files remain supplied by the installed `@fontsource/manrope` package under its included OFL license. `next/font/local` self-hosts the two display fonts and generates adjusted system fallbacks; Instrument Serif is not preloaded. No external font service is requested by visitors or during builds.
