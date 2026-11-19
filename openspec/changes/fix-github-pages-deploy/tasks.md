# Tasks

## 1. Restore content parity and media availability

- [ ] 1.1 Update `src/content/eng.json` Portfolio (`ai-automation.projects[0]`) to replace its legacy `images` entry with the two `videoDemos` from `pt.json` (`/Videos/Portfolio.mp4` and `/images/openspec.jpg`), keeping `repoLink` and using English captions/button labels. Verify `npm run validate:content` no longer reports the two `eng.ai-automation.projects[0].demo` parity errors.
- [ ] 1.2 Update `src/content/eng.json` Mage Battle (`games.projects[1]`) to use `/Videos/MageBattleAir.mp4` as the first demo and add `/Videos/MageBattleWater.mp4` as the second, with "Air Mode"/"Water Mode" captions. Verify validation no longer reports the Mage Battle item-count or `src` mismatch errors.
- [ ] 1.3 Update `src/content/eng.json` Snow Battle (`games.projects[2]`) to add `/Videos/SnowBattleSolo.mp4` alongside `/Videos/SnowBattle.mp4`, and replace ProgramADA's Portuguese `buttonLabel` values with English equivalents. Verify `npm run validate:content` reports no errors.
- [ ] 1.4 Resolve the missing `/images/openspec.jpg` reference: add the OpenSpec screenshot at `public/images/openspec.jpg`, or, if the image is unavailable, point both locales' Portfolio second demo to an existing tracked asset such as `/images/projects/portfolio-web.svg`. Verify the chosen `src` maps to an existing file under `public/` and appears in `dist/` after `npm run build`.

## 2. Validate local public assets at build time

- [ ] 2.1 Add a browser-safe helper (for example `src/content/validatePublicAssets.js`) that receives the locale documents, the `public` directory, and an `existsSync` callback, then reports every `projectDemo` `images[].src` / `videoDemos[].src` under `/images/`, `/Videos/`, or `/Sounds/` whose file is missing; strip `?`/`#` and ignore `http(s)` URLs. Verify the helper contains no Node-only imports and returns precise paths such as `eng.ai-automation.projects[0].demo.videoDemos[1].src`.
- [ ] 2.2 Add `tests/publicAssets.test.mjs` covering a missing local file, an existing local file, an external URL, and a local path with query/hash. Verify `npm test` passes.
- [ ] 2.3 Wire the helper into `scripts/validate-content.mjs` using `node:fs` and the resolved `public` directory, printing each missing asset and exiting non-zero. Verify `npm run validate:content` passes with current content and that a fixture with an absent file fails with the expected path.

## 3. Verify the build output and entry document

- [ ] 3.1 Add `scripts/verify-build.mjs` that reads `dist/index.html` and fails when any root-absolute `src`/`href` starts with `/src/`, when any root-absolute URL does not start with the configured base path, when no built script under `<base>assets/` exists, or when a referenced local file is missing from `dist/`. Verify it exits 0 against the current build.
- [ ] 3.2 Add a `verify:build` script to `package.json` and document that it runs after `npm run build`. Verify `npm run build && npm run verify:build` succeeds locally.
- [ ] 3.3 Make the favicon base-aware in `index.html` by referencing the existing source icon (`/src/assets/Imgs/CloudIcon.png`) so Vite emits it under `/Portifolio/assets/`; if Vite does not rewrite it, copy the icon under `public/Imgs/` and reference it with `%BASE_URL%`. Verify the emitted favicon URL in `dist/index.html` starts with `/Portifolio/`.
- [ ] 3.4 Confirm the built entry document contains `/Portifolio/assets/index-*.js`, contains no `/src/main.jsx`, and has every root-absolute reference under `/Portifolio/`; verify with `npm run verify:build` and a manual read of `dist/index.html`.

## 4. Harden the Pages deployment workflow

- [ ] 4.1 Add a pre-build step to `.github/workflows/deploy.yml` that queries `GET /repos/${GITHUB_REPOSITORY}/pages` with `GH_TOKEN` and fails unless `build_type` is `workflow`, printing a message that names Settings → Pages → Source. Verify the shell logic distinguishes `workflow`, `legacy`, and a missing Pages site.
- [ ] 4.2 Add `actions/configure-pages@v5` with an `id`, then compare its `base_path` output (trailing slash trimmed) to `/Portifolio` and fail with expected/actual values on mismatch. Verify the comparison handles both `/Portifolio` and `/Portifolio/`.
- [ ] 4.3 Run `npm run verify:build` between `npm run build` and `actions/upload-pages-artifact`, and add a post-deploy step that fetches `steps.deployment.outputs.page_url` with up to 12 retries, asserting the response contains `/Portifolio/assets/` and not `/src/main.jsx`. Verify the job order and that every verification precedes the upload or follows the deployment as designed.
- [ ] 4.4 Review the workflow so any guard, build, or verification failure skips upload/deploy and leaves the previous site live. Verify by running the equivalent local commands (`npm run build`, `npm run verify:build`) and confirming the workflow has no `if: always()` on upload or deploy.

## 5. Document deployment and troubleshooting

- [ ] 5.1 Add a deployment section to `README.md` covering the production URL, the required Settings → Pages → Source = GitHub Actions setting, `npm run validate:content`, `npm run build`, and `npm run verify:build`. Verify every command runs as written.
- [ ] 5.2 Add troubleshooting for `GET /src/main.jsx 404`: explain that it means raw source was published, point to the workflow run and the Pages source setting, and state the expected `/Portifolio/assets/index-*.js` entry. Verify the instructions match the workflow's actual error messages.

## 6. Integration verification

- [ ] 6.1 Run `npm test`, `npm run validate:content`, `npm run build`, and `npm run verify:build` in sequence from a clean working tree. Verify all four exit 0.
- [ ] 6.2 Run `npm run preview`, open `http://localhost:4173/Portifolio/`, and inspect the network panel. Verify no request goes to `/src/main.jsx`, the entry chunk, favicon, fonts, videos, and images load, and the notebook renders.

## Workflow follow-up

- Before pushing, change the repository Pages source to GitHub Actions (Settings → Pages → Build and deployment → Source).
- Push or merge to `main` and confirm the "Deploy to GitHub Pages" run passes the source guard, build, `verify:build`, deploy, and live smoke check.
- Confirm the legacy "pages build and deployment" (Jekyll) workflow no longer runs on the following push, and that `https://eduardanunes.github.io/Portifolio/` serves `/Portifolio/assets/index-*.js`.
- Archive the change after review.
