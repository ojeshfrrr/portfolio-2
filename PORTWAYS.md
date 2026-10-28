# Portways deployment

The [current Portways hosting guide](https://portways.app/docs/host-a-site.md) accepts prebuilt static files, with `index.html` at the repository root, a maximum of 100 MB and 5,000 files, and no customer build step or Node runtime.

This portfolio supports that mode through Next.js static export. All pages and project routes are generated at build time, including explicitly static sitemap and robots routes. Directory-style routes support static hosting; `next/image` serves the existing local assets directly in this mode. The contact composer continues to prepare a message in the visitor's email app.

The build helper also adds normalized navigation-segment filenames on Windows. The installed Next.js 16.4 exporter otherwise creates nested `__next.*` directories where its browser client requests dotted `.txt` filenames. This compatibility step copies the generated payloads to those expected names without modifying the installed package or the payload contents.

## Build and publish

Commit source changes, then run in PowerShell:

```powershell
$env:NEXT_PUBLIC_SITE_URL = 'https://ojesh-portfolio.portways.app'
npm run publish:portways
```

The public address must match the actual Portways project. `build:portways` builds only; `publish:portways` also commits the generated files and pushes `codex/portways-static` to the existing `origin` repository. The deployment branch contains the export at its root, while `master` holds the editable source. Generated Git data is kept under the ignored `build/portways/` directory and export files under ignored `out/`.

The publisher fetches an existing deployment branch before appending its next generated commit and uses a normal push. It does not overwrite another branch or force-push. `deployment.json` records the source commit and public origin so the served version can be checked.

## Dashboard setup

- Repository: `ojeshfrrr/portfolio-2`
- Branch: `codex/portways-static`
- Project name: `ojesh-portfolio`
- Size: Small (0.25 vCPU / 256 MB), within the current workspace allocation
- Deploy on push: enabled for the deployment branch

Import the repository through the existing GitHub connection and choose Create and deploy. A future source update needs another `publish:portways` run; Portways then deploys the generated branch push.

Normal `npm run dev`, `npm run build`, and `npm start` keep the existing Next.js server mode. The static-export environment flag is set only inside the Portways build helper.
