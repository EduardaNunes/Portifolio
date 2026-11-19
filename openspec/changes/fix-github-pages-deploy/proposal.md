# Proposal

## Why

The production site at `https://eduardanunes.github.io/Portifolio/` currently serves the repository's development `index.html`, so the browser requests `/src/main.jsx` and receives `404` because that JSX entry is never compiled in production. Two conditions combine: the latest "Deploy to GitHub Pages" run fails at `npm run build` (five English/Portuguese project-demo parity errors), and the Pages site is also configured to deploy from a branch, so the legacy Jekyll build publishes raw source when the artifact deploy does not replace it.

## What Changes

- Fix the English project demo content so it matches the Portuguese structure: Portfolio video demos, Mage Battle air/water modes, Snow Battle multiplayer/solo, including localized captions and deploy button labels. This restores a passing `npm run validate:content`.
- Ensure every referenced local media path exists in `public/`; add the missing `public/images/openspec.jpg` (or replace the reference in both locales) so demo thumbnails resolve in production.
- Harden `.github/workflows/deploy.yml`:
  - Configure Pages metadata and fail fast, before uploading, with an actionable message when the Pages site is not set to deploy from GitHub Actions.
  - Verify the build output before upload: `dist/index.html` must reference the hashed bundle under `/Portifolio/assets/` and must not reference `/src/main.jsx`.
  - Keep content validation (through `prebuild`) as a hard gate so a failed build never uploads an artifact or replaces the last good deployment.
- Add a build-output verification script and npm script for these checks, and extend content validation to reject content that references a missing local public asset.
- Make the entry document's favicon base-aware so it resolves under `/Portifolio/` instead of the domain root.
- Document the one-time repository setting (Settings → Pages → Source: GitHub Actions), the expected production URL, and how to diagnose `/src/main.jsx` 404s.

## Capabilities

### New Capabilities

- `github-pages-deployment`: Production publishing of the Vite build artifact to GitHub Pages, including the required source mode, build-output verification, and failure behavior that preserves the last good deployment.

### Modified Capabilities

- `marker-content-schema`: Build-time content validation now also rejects local public media references whose file does not exist.

## Impact

**Affected code and configuration:**

- `.github/workflows/deploy.yml` — Pages source guard, configuration metadata, build-output verification step.
- `package.json` — verification script wired into the build/deploy flow.
- `scripts/validate-content.mjs` — public asset existence checks.
- `scripts/verify-build.mjs` (new) — asserts the built entry document references `/Portifolio/assets/` and never `/src/main.jsx`.
- `src/content/eng.json` — demo parity and localization fixes.
- `index.html` — base-aware favicon reference.
- `public/images/openspec.jpg` — missing asset referenced by both locales.
- `README.md` — deployment and troubleshooting documentation.

**External configuration (manual, one-time):**

- The repository's Pages source must change from "Deploy from a branch" to "GitHub Actions". This stops the legacy Jekyll build from publishing repository source and lets a failed workflow keep the last good deployment live.

**Out of scope:**

- No runtime component, layout, or UI behavior changes.
- No new dependencies.
- No change to the `/Portifolio/` base path or to the content asset resolution strategy.
