# Teen Fiesta deployment investigation — 16 October 2026

## Result

The public deployment is **not fixed**. The confirmed failure is Vercel's platform-level `DEPLOYMENT_NOT_FOUND`, before the website's application routing. No application code, styles, dependencies, domain mappings or deployments were changed.

The intended public URL evidenced by the user's project list and `src/lib/projects.ts` is `https://theteenfiesta.vercel.app/`. No evidence-backed replacement URL was found.

## Public verification

Actual Chrome navigation and independent HTTP requests checked:

| URL | Result |
| --- | --- |
| `https://theteenfiesta.vercel.app/` | HTTP 404; server Vercel; `x-vercel-error: DEPLOYMENT_NOT_FOUND`. |
| `https://theteenfiesta.vercel.app/pricing/` | Same platform-level 404. |
| `https://theteenfiesta.vercel.app/media/hero-campaign.jpg` | Same platform-level 404. |

The homepage screenshot was captured and opened: [public-homepage-404.png](D:/projects/second_pf/qa/deployment-investigation-2026-10-16/public-homepage-404.png). Raw, credential-free browser observations are in [verification.json](D:/projects/second_pf/qa/deployment-investigation-2026-10-16/verification.json).

The matching local export contains `out/index.html`, `out/pricing/index.html` and `out/media/hero-campaign.jpg`; the output is not an empty directory. Editing a Next.js route or adding a rewrite would not repair a hostname for which Vercel cannot resolve a deployment. Vercel documents the error as an incorrect/missing deployment URL or a deleted deployment: [official error documentation](https://vercel.com/docs/errors/deployment_not_found).

## Configuration and hosting evidence

- Local website project: `D:/projects/teen_fiesta`; Next.js 16.4.0, static `output: "export"`, `trailingSlash: true`, output directory `out`. Existing local files were left intact.
- No `.vercel/project.json`, `vercel.json` or project-root environment files exist there. The portfolio has only `.env.example`, with public portfolio-origin/contact keys, not a Teen Fiesta deployment credential or origin.
- The actual tracked hosting record is `D:/projects/teen_fiesta/.openai/hosting.json`, identifying Sites project `appgprj_6acd6b7de5cc8191b403276f66838c01` with static directory `out`.
- The existing Sites connector's `get_site` call returned `Sites project not found`. This establishes that the recorded project cannot be accessed through the current connection; it does not establish whether it was deleted or belongs to another account/workspace.
- The local Git origin is `https://github.com/ojeshfrrr/teen-fiesta-red-room.git`, branch `main`. GitHub reports no repository homepage, zero deployments, zero commit check runs and zero legacy commit statuses. The source implementation report states that no public deployment was performed. No alternate Teen Fiesta repository was found among the matching public repositories for that owner.
- The source still includes the previously rejected campaign identity. The portfolio correction did not rewrite this separate website. This repository cannot be assumed to be the intended publishable source merely from its name. Publishing it blindly would reintroduce content the user explicitly rejected.

## Deployment access checked

The saved Vercel credential initially expired on 13 October 2026, and the API returned `403 Not authorized`. An already-cached Vercel CLI 63.1.2 was used for `whoami`; its normal refresh succeeded. No CLI or application dependency was installed. Its background latest-version worker emitted a timeout warning, but identity lookup succeeded and subsequent account API calls returned HTTP 200.

Authenticated identity: `ojeshjod-6892`. Accessible team: `ovio`, slug `ovio1`.

| Authenticated lookup | Result |
| --- | --- |
| Personal project list, complete page | 0 projects, no next page. |
| `ovio` team project list, complete page | 0 projects, no next page. |
| Exact project lookup `theteenfiesta` in `ovio` | HTTP 404, `Project not found.` |
| Alias list filtered to `theteenfiesta.vercel.app`, personal and team | 0 aliases in both scopes. |
| Other available Vercel teams | None returned. |

Credentials were read only into process memory, sent only to the provider's API/CLI workflow and never printed or copied into the evidence files. Only the provider's existing authentication record was refreshed. No other account resources were modified.

## Diagnosis and limits

There is no accessible Vercel project or domain alias to recover in the configured account/team. The other tracked hosting record is inaccessible. This is a missing deployment/domain association or incorrect account/URL association, not an observed application route failure. The available evidence cannot distinguish a deleted deployment from a URL that was never assigned, nor prove ownership in a different account. No deployment ID or valid alternative hostname was invented.

## Required next action

Provide the existing Teen Fiesta Vercel dashboard/project URL and access through its owning account/team, or restore access to the recorded Sites project. This identifies the actual resource to recover.

If there is no existing deployment and a new one is intended, identify the correct source repository/branch to publish. The only matching local/GitHub source currently contains the rejected campaign content, so it needs to be distinguished from the intended Teen Fiesta website before publication. The existing portfolio's design and content remain unchanged.

After the project and source are identified, the requested repair/deploy can proceed using that confirmed setup, followed by browser verification of its public homepage, assets and routes. No lint/build commands were run in this investigation because no application source was changed.
