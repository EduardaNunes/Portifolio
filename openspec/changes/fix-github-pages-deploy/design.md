# Design

## Context

See `proposal.md` for motivation. Current state observed during investigation:

- `https://eduardanunes.github.io/Portifolio/` returns the repository's `index.html` verbatim, including `<script type="module" src="/src/main.jsx">`. The browser resolves that absolute path to `https://eduardanunes.github.io/src/main.jsx`, which 404s.
- The latest "Deploy to GitHub Pages" run (`89e8c6c`) failed in `npm run build`. `prebuild` runs `validate:content`, which reports five `eng`/`pt` project-demo parity errors: Portfolio (images vs two video demos), Mage Battle (one vs two videos, different first `src`), and Snow Battle (one vs two videos).
- The same push also triggered the legacy "pages build and deployment" (Jekyll) workflow, which succeeded and published repository source. Both legacy branch deployments and artifact deployments can target the same Pages site; the last deployment wins. With the artifact deploy failing, the branch deployment is what visitors see.
- `.github/workflows/deploy.yml` uploads `dist` and runs `deploy-pages`, but does not assert that Pages is configured with GitHub Actions as its source, does not verify the build output, and does not check the live result.
- `index.html` references `/Imgs/CloudIcon.png`, which does not exist under `public/`, so the favicon also resolves at the domain root and 404s.
- `pt.json` references `/images/openspec.jpg`, which does not exist under `public/`; `eng.json` currently does not reference it because its Portfolio demo uses a legacy `images` entry.

## Goals / Non-Goals

**Goals:**

- Make production always serve the compiled Vite bundle under `/Portifolio/`.
- Make the pipeline fail early and clearly when it cannot guarantee that outcome.
- Ensure a failed build or verification leaves the last good deployment live.
- Restore content parity so the build gate passes.

**Non-Goals:**

- Changing notebook behavior, layout, or visual design.
- Replacing GitHub Pages or changing the `/Portifolio/` base path.
- Introducing a `gh-pages` branch or committing build artifacts.

## Decisions

### 1. Use GitHub Actions as the single Pages source

The repository's Pages source will be switched from "Deploy from a branch" to "GitHub Actions", and the workflow will become the only publisher.

- **Why:** The legacy branch build publishes uncompiled source and races the artifact deploy. With Actions as the only source, a failed build leaves the previous deployment intact instead of publishing `index.html`.
- **Alternative considered:** Keep branch deployment and commit `dist` (or deploy to `gh-pages`). Rejected: build artifacts in git, stale output, worktree noise, and the same failure mode remains if a build is skipped.
- **Alternative considered:** Let both deploys coexist and rely on ordering. Rejected: observed behavior shows the branch deploy wins whenever the artifact build fails.

### 2. Fail fast on source mode with the Pages API

The build job will query `GET /repos/{owner}/{repo}/pages` with `gh api` and read `build_type`. If it is not `workflow`, the job fails before `npm ci`/`npm run build` with a message pointing to Settings → Pages → Source.

- **Why:** A green build that silently deploys nothing (or is overwritten) is the core failure mode. An explicit red X with instructions is faster to diagnose.
- **Alternative considered:** `actions/configure-pages` with `enablement: true`. Rejected: enablement requires a PAT or GitHub App token; `GITHUB_TOKEN` cannot enable Pages. A one-time manual setting plus a guard is simpler and uses no extra secrets.
- **Token:** the workflow already grants `pages: write`, which covers reading the Pages site.

### 3. Configure Pages metadata and compare the base path

Add `actions/configure-pages@v5` (without `enablement`) with an `id`, then compare `steps.<id>.outputs.base_path` to `/Portifolio` after trimming a trailing slash.

- **Why:** This turns a silent asset-404 class of bugs into a build failure if the repository is ever renamed, moved to a user site, or given a custom domain.
- **Alternative considered:** Hard-code the base path only in `vite.config.js`. Rejected: a mismatch would only appear after deployment.

### 4. Verify build output and the live entry document

Add `scripts/verify-build.mjs` and an npm script `verify:build` that parses `dist/index.html` and fails when:

- any root-absolute `src`/`href` starts with `/src/` (the reported regression);
- any root-absolute `src`/`href` does not start with the configured base path;
- no built script under `<base>assets/` is present;
- a referenced local file under the base path is missing from `dist/`.

Run it after `npm run build` and before `actions/upload-pages-artifact`. After deployment, the deploy job fetches `steps.deployment.outputs.page_url` with retries and asserts the HTML contains `/Portifolio/assets/` and does not contain `/src/main.jsx`.

- **Why:** The reported failure is an externally visible contract, so the check should test the artifact and, once, the live response. Local checks are deterministic; the live check catches source-mode drift.
- **Alternative considered:** Only check `dist/index.html`. Rejected as the sole guard: it would not catch a branch deployment replacing the artifact.
- **Flakiness:** the live check retries up to 12 times with 5-second delays (~60s) before failing.

### 5. Fix content parity and check public assets at build time

Update `eng.json` to mirror the Portuguese demo structure, not the other way around:

| Project | Fix |
|---|---|
| Portfolio | Replace legacy `images` with the two `videoDemos` used in `pt.json`: `/Videos/Portfolio.mp4` and `/images/openspec.jpg`, with English captions and button labels. |
| Mage Battle | Restore `/Videos/MageBattleAir.mp4` and add `/Videos/MageBattleWater.mp4` with "Air Mode" / "Water Mode" captions. |
| Snow Battle | Add `/Videos/SnowBattleSolo.mp4` alongside `/Videos/SnowBattle.mp4`. |
| ProgramADA | Replace Portuguese deploy button labels with English equivalents ("Play", "Play Minigame"). |

Add `public/images/openspec.jpg` so the Portfolio framework demo resolves. If the screenshot is unavailable, point both locales to the existing `/images/projects/portfolio-web.svg` in the same change.

Extract a browser-safe helper, e.g. `src/content/validatePublicAssets.js`, that receives the documents, a `publicDir`, and an `existsSync` callback. `scripts/validate-content.mjs` calls it after the pure structural validation and fails with paths such as `eng.ai-automation.projects[0].demo.videoDemos[1].src`. The helper only checks `src` values in `projectDemo` blocks that start with `/images/`, `/Videos/`, or `/Sounds/`, strips `?`/`#`, and ignores external URLs.

- **Why:** `openspec.jpg` was already referenced by Portuguese content but absent, so structural validation alone cannot protect deployments.
- **Alternative considered:** Put filesystem checks inside `src/content/validateContent.js`. Rejected: that module is imported by the page builder and must stay browser-safe.

### 6. Make the favicon base-aware

Change the favicon reference in `index.html` from `/Imgs/CloudIcon.png` to the existing source asset path (`/src/assets/Imgs/CloudIcon.png`) so Vite emits a hashed file under `/Portifolio/assets/`. If Vite does not transform that link, add a copy under `public/Imgs/` and reference it through `%BASE_URL%` instead.

- **Why:** The current link bypasses the base path and 404s in production; the new output check rejects root-absolute URLs outside the base.

## Risks / Trade-offs

- **[Workflow fails until the manual setting changes]** → The failure message names the exact setting. Migration order below changes the setting before pushing, so the first run is green.
- **[Pages source can drift back to a branch]** → The guard fails the workflow and the live check would detect source output; the red run is the alert.
- **[`gh api` may lack Pages read access]** → The token already has `pages: write`; if permissions change, the step fails with the API error rather than deploying blindly. A `pages: read` grant is the fallback fix.
- **[Live smoke check can flake during CDN propagation]** → Retries for ~60s; it runs after `deploy-pages` reports success, which already waits for deployment creation.
- **[Vite may not rewrite the favicon link]** → Verify the built `dist/index.html`; documented fallback is a `public/Imgs` copy with `%BASE_URL%`.
- **[Adding the public-asset check can block builds]** → Intended; it forces the missing `openspec.jpg` to be resolved in this change rather than shipping a broken thumbnail.
- **[Windows path handling in the checker]** → Strip leading slashes and normalize before joining with `public/`; covered by unit tests.

## Migration Plan

1. Change the repository setting first: Settings → Pages → Build and deployment → Source = **GitHub Actions**. This stops legacy Jekyll deployments so a failed workflow cannot publish source.
2. Merge the content, script, workflow, asset, and documentation changes to `main`.
3. Let the workflow run (or use **Run workflow** on `main`), then confirm the live URL serves `/Portifolio/assets/index-*.js` and no `/src/main.jsx`.
4. Confirm the "pages build and deployment" (Jekyll) workflow no longer runs on subsequent pushes.
5. **Rollback:** revert the code commit and push again; Pages remains on the last good artifact. If workflow changes must be undone, the previous `deploy.yml` still uploads `dist`, but source mode should stay "GitHub Actions" to avoid republishing source.
