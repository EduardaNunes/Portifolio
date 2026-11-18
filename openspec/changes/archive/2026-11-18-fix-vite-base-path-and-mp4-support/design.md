# Design

## Context

See proposal.md for motivation. Current state:
- Vite config has `base: '/Portifolio/'` 
- Content files (pt.json, eng.json) use absolute paths like `/images/projects/...`, `/Videos/...`, `/Sounds/...`
- These resolve incorrectly in dev (`http://localhost:5175/images/...` instead of `http://localhost:5175/Portifolio/images/...`)
- Thumbnail component only renders video when explicit `video={true}` prop is passed
- Existing demo content has `.mp4` files in `src` without `video: true`

## Goals / Non-Goals

**Goals:**
1. Fix all asset paths to resolve correctly with Vite base path
2. Add video auto-detection to Thumbnail component from file extension
3. Zero content migration required for existing demo entries
4. Validation passes for both locales

**Non-Goals:**
- Changing Vite base path configuration
- Supporting new video formats beyond .mp4, .webm, .ogg

## Decisions

### Decision 1: Use import.meta.env.BASE_URL for runtime base path resolution
**Rationale:** Vite injects `import.meta.env.BASE_URL` at build time with the correct base path. This works in both dev and production without manual configuration.

**Implementation:** Create a utility `resolveAssetPath(path)` that prepends `import.meta.env.BASE_URL` to absolute paths starting with `/images/`, `/Videos/`, `/Sounds/`, or any path starting with `/`.

**Alternatives considered:**
- Rewrite all content paths to include `/Portifolio/` prefix → Requires content migration, error-prone
- Use relative paths in content → Breaks when content is consumed from different contexts
- Modify Vite config to use empty base → Breaks GitHub Pages deployment

### Decision 2: Apply base path resolution in Thumbnail and ProjectDemoBlock
**Rationale:** These are the primary consumers of demo image/video paths. Centralizing resolution here ensures all demo media works.

**Implementation:**
- In `ProjectDemoBlock`, resolve `image.src` before passing to Thumbnail
- In `Thumbnail`, also resolve `src` as defense-in-depth
- Use the same utility for sound paths when `PageTurn.jsx` and `LightSwitch.jsx` register their page-turn and theme-toggle sounds

### Decision 3: Video auto-detection in Thumbnail via file extension
**Rationale:** Zero content migration - existing `.mp4` entries work immediately.

**Implementation:** Add helper function `isVideoFile(src)` that checks for `.mp4`, `.webm`, `.ogg` extensions (case-insensitive). In Thumbnail, compute `const shouldRenderVideo = video ?? isVideoFile(src)`.

**Alternatives considered:**
- Add `video: true` to all existing content entries → Requires content migration, duplicated info
- Sniff MIME type at runtime → Overkill, not reliable for local files

### Decision 4: Content validation updated for video inference
**Rationale:** Validation should not require `video` field when extension implies video.

**Implementation:** In `validateContent.js`, make `video` field optional when `src` ends with video extension. Add test for inference behavior.

### Decision 5: CSS-managed public assets use Vite-managed root-relative URLs
**Rationale:** Profile images, cloud sprites, switches, indicator arrows, corner-arrow masks, and the custom font are supplied through absolute `url(/...)` references in CSS. `ProfileGroup` does not own image `src` values, so JavaScript resolution there would not fix these paths.

**Implementation:** Move the CSS-only font and image assets from `public/` to `src/assets/`. Reference them with CSS paths relative to `src/styles/index.css` so Vite's asset pipeline resolves, fingerprints, and prefixes URLs with the configured base in both dev and production.

**Alternatives considered:**
1. Keep root-relative public URLs and rely on Vite to rewrite them
2. Set a runtime CSS variable with the base path
3. Hardcode `/Portifolio/` in CSS for these stable GitHub Pages public assets

**Chosen:** Option 1. Production CSS rewrites root-relative URLs but the development server still requests root-level asset paths. Bundled asset references are the reliable cross-environment solution. Content and JavaScript consumers continue to use `resolveAssetPath()`.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `import.meta.env.BASE_URL` differs between dev/prod | Test both `npm run dev` and `npm run build` + preview |
| CSS URL transformation could bypass the configured base | Reference migrated assets relatively from CSS and verify dev and preview network requests |
| Video inference false positives for non-video files with .mp4 in name | Only check extension at end of path (after last `.`, before `?` or `#`) |
| Existing content with `video: false` and `.mp4` src now renders as video | Explicit `video` prop always wins over inference (see Decision 3) |
| Sound path resolution missed in some component | Audit all `new Audio()` and `<audio>` usages; resolve paths at the `PageTurn` and `LightSwitch` sound registrations |

## Migration Plan

1. Create `src/utils/assetPath.js` with `resolveAssetPath()` and `isVideoFile()`
2. Update `Thumbnail.jsx` to use video inference and asset resolution
3. Update `ProjectDemoBlock` to resolve asset paths before passing to Thumbnail
4. Update `PageTurn.jsx` and `LightSwitch.jsx` to resolve page-turn and theme-toggle sound URLs with `resolveAssetPath()` before registration
5. Move CSS-only assets to `src/assets/` and update font, cloud, profile, switch, indicator-arrow, and corner-mask URLs to use relative bundled asset paths
6. Update `validateContent.js` to allow optional `video` when extension implies video
7. Run validation and build to verify

## Open Questions

None - all decisions resolved above.