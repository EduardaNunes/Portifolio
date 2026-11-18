# Tasks

## 1. Utility Functions

- [x] 1.1 Create `src/utils/assetPath.js` with `resolveAssetPath()` and `isVideoFile()` functions; verify the module exports both functions and `resolveAssetPath("/images/test.svg")` returns `/Portifolio/images/test.svg` (uses `import.meta.env.BASE_URL`)
- [x] 1.2 Add unit tests for `isVideoFile()` covering `.mp4`, `.webm`, `.ogg` (case-insensitive), and ensure non-video extensions return false; verify with `npm test` or manual test script

## 2. Thumbnail Component - Video Inference & Asset Resolution

- [x] 2.1 Update `Thumbnail.jsx` to import `isVideoFile` and `resolveAssetPath`; compute `const shouldRenderVideo = video ?? isVideoFile(src)` and `const resolvedSrc = resolveAssetPath(src)`; verify Thumbnail renders `<video>` for `.mp4` src without explicit `video` prop
- [x] 2.2 Verify Thumbnail renders `<img>` for image extensions (`.svg`, `.png`, `.jpg`, `.webp`) without `video` prop; verify explicit `video={false}` overrides `.mp4` extension; verify explicit `video={true}` forces video for image extension

## 3. ProjectDemoBlock - Asset Resolution

- [x] 3.1 Update `ProjectDemoBlock` in `blockRenderers.jsx` to import `resolveAssetPath`; resolve `image.src` before passing to Thumbnail; verify demo images/videos load correctly in dev server at `http://localhost:5175/Portifolio/...`

## 4. NarrativeNotebook - Sound Asset Resolution

- [x] 4.1 Update `PageTurn.jsx` and `LightSwitch.jsx` to resolve `PAGE_TURN_SOUND_URL` and `SWITCH_SOUND_URL` with `resolveAssetPath()` before registering them with the audio manager; verify page-turn and theme-toggle sounds play in dev and production build

## 5. CSS Public Asset Paths

- [x] 5.1 Move CSS-only font and image assets from `public/` to `src/assets/`; update every corresponding URL in `src/styles/index.css` (font, cloud, profile, switch, indicator arrow, and corner-arrow mask) to use a relative bundled asset path; verify dev and production-preview asset requests resolve under `/Portifolio/`

## 6. Content Validation - Video Inference

- [x] 6.1 Update `src/content/validateContent.js` to make `video` field optional when `src` ends with `.mp4`, `.webm`, or `.ogg`; add validation that explicit `video` prop type is boolean when present; verify validation passes for both `pt.json` and `eng.json` with `node scripts/validate-content.mjs`

## 7. Integration Verification

- [x] 7.1 Run `npm run build` and verify production build succeeds with no errors; verify all assets (images, videos, sounds) have correct `/Portifolio/` prefix in built output
- [x] 7.2 Run `npm run preview` and verify all media displays correctly: project demo images/videos, page-turn and theme-toggle sounds, CSS-managed image assets, corner arrows
- [x] 7.3 Run `npm run dev` and verify all media displays correctly in development mode

## Workflow follow-up

- Archive the change after implementation is complete and verified
- Verify the archived result