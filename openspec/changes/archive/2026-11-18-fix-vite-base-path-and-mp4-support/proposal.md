# Proposal

## Why

The portfolio has two pre-existing issues affecting media display:

1. **Vite base path misconfiguration**: The project uses `base: '/Portifolio/'` in `vite.config.js`, but content files reference assets with absolute paths like `/images/projects/portfolio-web.svg` and `/Sounds/book_page_turn.wav`. These resolve to `http://localhost:5175/images/...` instead of `http://localhost:5175/Portifolio/images/...`, causing 404 errors for all images and sounds.

2. **Missing MP4 auto-detection in demo images**: The `images[]` array in project demo content supports a `video: true` property to render `<video>` elements, but existing content uses `.mp4` files in the `src` field without setting `video: true`. The Thumbnail component only checks the explicit `video` boolean, not the file extension, so MP4 files render as broken images.

Both issues are blocking proper media display in the notebook component.

## What Changes

1. **Fix Vite base path asset references**:
   - Update all content files (pt.json, eng.json) to use relative paths or base-aware paths for images and sounds
   - Or update asset loading to prepend the base path automatically
   - Update `vite.config.js` if needed for proper public asset handling

2. **Add MP4 auto-detection to Thumbnail component**:
   - Modify `Thumbnail` to infer `video: true` from `.mp4`, `.webm`, `.ogg` file extensions in `src`
   - Keep explicit `video` prop for backward compatibility and override capability
   - Update content validation to allow/validate video inference

3. **Update existing demo content**:
   - Add `video: true` to existing MP4 entries in pt.json and eng.json (as immediate fix)
   - Or rely on auto-detection once implemented

## Capabilities

### New Capabilities

- `media/asset-path-resolution`: Handles correct asset path resolution with Vite base path for images, videos, and sounds across all environments (dev, preview, production)

### Modified Capabilities

- `marker-content-schema`: The demo block's `images[]` schema now infers video type from file extension instead of requiring explicit `video` boolean
- `narrative-notebook-component`: Notebook media display (Thumbnail) now auto-detects video files by extension

## Impact

**Affected code:**
- `vite.config.js` - base path configuration
- `src/content/pt.json`, `src/content/eng.json` - demo content with image/video paths
- `src/components/notebook-content/Thumbnail.jsx` - video auto-detection logic
- `src/content/validateContent.js` - validation for demo images with video inference
- `src/utils/buildNotebookPages.js` - may need base path awareness for asset URLs
- Public asset references in components (e.g., corner zone arrow images, profile images)

**Dependencies:** None new - uses existing Vite, React, and content structure.