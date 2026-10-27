# Ojesh — Creative Developer

A personal portfolio built with Next.js App Router and TypeScript. The homepage uses a typographic media stage with authentic project captures. The profile uses verified public GitHub information, and a shared static CSS atmosphere gives each section depth. Profile sources and review notes are in `qa/profile-refresh-2026-10-27/README.md`.

## Run locally

    npm install
    npm run dev

Open http://127.0.0.1:3000.

## Checks

    npm run lint
    npm run check
    npm run build

## Three.js timing compatibility

Fiber 9.8.1 constructs the deprecated Three.js `Clock` internally. The version-checked
`postinstall` script replaces that construction in Fiber's ESM and CJS builds with
a `Timer` adapter implementing the lifecycle Fiber expects. No warnings are filtered.
Run `node --test scripts/fiber-timer-clock.test.mjs` to check the adapter.
Review/remove this patch when upgrading Fiber; it deliberately rejects other versions.

Set NEXT_PUBLIC_SITE_URL to the deployed origin before publishing. Contact email is public and can be changed with NEXT_PUBLIC_CONTACT_EMAIL.

## Project media

public/work contains selected local captures and supplied media from the adjacent LANE, ARCUS, Teen Fiesta, and OVIO project folders. The files are visual evidence from those projects; the case study copy avoids outcome metrics. Rewatch is credited as collaborative work with Suvo (Gaurav Raj Singh). See public/work/README.md for file provenance.
