# Proposal

## Why

Two issues need to be addressed:

1. **Video autoplay broken**: Videos in project demo thumbnails are not playing automatically. They remain static like images. The `<video>` element in `Thumbnail.jsx` is missing the `autoPlay` attribute, which is required for muted videos to play automatically in modern browsers.

2. **Component structure is disorganized**: After the previous modularization, all block components live in `src/components/notebook-content/blocks/` with co-located CSS modules. This creates a flat list of 18+ files in one directory. The desired structure is to have each component in its own folder directly under `notebook-content/`, with the component's JSX and CSS co-located inside that folder. The `blocks/` directory should be removed. `ProjectButton` and `Thumbnail` (which are also notebook content components) should follow the same pattern.

## What Changes

### Fix Video Autoplay
- Add `autoPlay` attribute to the `<video>` element in `Thumbnail.jsx`
- This enables muted videos to play automatically as intended

### Reorganize Component Structure
- **Remove** `src/components/notebook-content/blocks/` directory entirely
- **Create** individual folders for each component directly under `src/components/notebook-content/`:
  - `LinkIcon/` → `LinkIcon.jsx` (no CSS needed - inline SVG)
  - `BlocksBlock/` → `BlocksBlock.jsx` + `BlocksBlock.module.css`
  - `TextBlock/` → `TextBlock.jsx` + `TextBlock.module.css`
  - `PositionsBlock/` → `PositionsBlock.jsx` + `PositionsBlock.module.css`
  - `EmailBlock/` → `EmailBlock.jsx` + `EmailBlock.module.css`
  - `LinksBlock/` → `LinksBlock.jsx` + `LinksBlock.module.css`
  - `ListBlock/` → `ListBlock.jsx` + `ListBlock.module.css`
  - `ProjectDemoBlock/` → `ProjectDemoBlock.jsx` + `ProjectDemoBlock.module.css`
  - `ProjectRepoBlock/` → `ProjectRepoBlock.jsx` (uses ProjectButton styles)
  - `ProjectButton/` → `ProjectButton.jsx` + `ProjectButton.module.css` (NEW - extract styles from global CSS)
  - `Thumbnail/` → `Thumbnail.jsx` + `Thumbnail.module.css` (NEW - extract styles from global CSS)
- **Update** `src/components/notebook-content/blockRenderers.jsx` to import from new paths
- **Update** all internal imports between block components (e.g., `LinksBlock` imports `LinkIcon`)
- **Extract** `ProjectButton` and `Thumbnail` styles from global `src/styles/index.css` into their respective CSS modules
- **Remove** block component styles from global `src/styles/index.css` (already partially done in previous change)

## Capabilities

### New Capabilities
- `notebook-component-structure`: Defines the standardized folder-per-component organization for notebook content components. Each component owns its folder with co-located JSX and CSS module.

### Modified Capabilities
- `project-multi-video-demo`: Video playback behavior changes - videos SHALL auto-play when muted and in viewport.
- `thumbnail-stepped-border`: Thumbnail component now has its own folder with co-located styles (previously used global CSS).

## Impact

**Affected files:**
- `src/components/notebook-content/Thumbnail.jsx` - add `autoPlay` to video element
- `src/components/notebook-content/blocks/` - entire directory removed (18 files)
- New directories: 11 component folders under `notebook-content/`
- `src/components/notebook-content/blockRenderers.jsx` - updated import paths
- `src/components/notebook-content/ProjectButton.jsx` - moved to own folder, extract styles
- `src/styles/index.css` - remove remaining Thumbnail and ProjectButton styles
- All block components - updated internal import paths (e.g., `LinkIcon`)

**No breaking changes to public API** - `BlockRenderer` and all named exports from `blockRenderers.jsx` remain unchanged.

**Dependencies:** None new.