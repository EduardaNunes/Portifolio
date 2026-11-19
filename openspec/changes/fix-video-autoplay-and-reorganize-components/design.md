# Design

## Context

See proposal.md - Why. Current state after previous modularization:
- `src/components/notebook-content/blocks/` contains 9 block components + 9 CSS modules (18 files)
- `Thumbnail.jsx` and `ProjectButton.jsx` are at the root of `notebook-content/`
- `Thumbnail.jsx` missing `autoPlay` on video element (videos don't play)
- Global `src/styles/index.css` still contains some Thumbnail and ProjectButton styles
- `blockRenderers.jsx` imports from `./blocks/` and re-exports

## Goals / Non-Goals

**Goals:**
- Fix video autoplay by adding `autoPlay` attribute to `<video>` in Thumbnail
- Reorganize to folder-per-component structure under `notebook-content/`
- Remove `blocks/` directory entirely
- Extract ProjectButton and Thumbnail styles from global CSS into co-located CSS modules
- Maintain full backward compatibility via `blockRenderers.jsx` re-exports

**Non-Goals:**
- Change any component's rendered output or behavior (except video autoplay fix)
- Modify the `BlockRenderer` registry API
- Change how components receive props
- Add new dependencies

## Decisions

### 1. Video Autoplay Fix: Add `autoPlay` attribute
**Decision:** Add `autoPlay` to the `<video>` element in `Thumbnail.jsx` alongside existing `loop`, `muted`, `playsInline`.

**Rationale:** Modern browsers require `autoPlay` for muted videos to play automatically. The existing attributes (`loop`, `muted`, `playsInline`) are correct for GIF-like behavior; only `autoPlay` was missing.

**Alternative considered:** Use JavaScript to call `video.play()` on mount. Rejected - `autoPlay` is declarative, simpler, and works without JS execution timing issues.

### 2. Folder Structure: One folder per component
**Decision:** Each component gets `notebook-content/ComponentName/ComponentName.jsx` + `ComponentName.module.css`.

**Rationale:**
- Clear ownership: component + styles together
- Easy to find: no hunting through flat `blocks/` directory
- Scales: adding new components doesn't clutter a single directory
- Consistent: all notebook content components follow same pattern

**Alternative considered:** Keep `blocks/` but add subdirectories. Rejected - adds unnecessary nesting level.

### 3. Component List (11 folders)
The following folders will be created directly under `notebook-content/`:
| Folder | Files | Notes |
|--------|-------|-------|
| `LinkIcon/` | `LinkIcon.jsx` | No CSS (inline SVG) |
| `BlocksBlock/` | `BlocksBlock.jsx`, `BlocksBlock.module.css` | |
| `TextBlock/` | `TextBlock.jsx`, `TextBlock.module.css` | |
| `PositionsBlock/` | `PositionsBlock.jsx`, `PositionsBlock.module.css` | |
| `EmailBlock/` | `EmailBlock.jsx`, `EmailBlock.module.css` | |
| `LinksBlock/` | `LinksBlock.jsx`, `LinksBlock.module.css` | |
| `ListBlock/` | `ListBlock.jsx`, `ListBlock.module.css` | |
| `ProjectDemoBlock/` | `ProjectDemoBlock.jsx`, `ProjectDemoBlock.module.css` | |
| `ProjectRepoBlock/` | `ProjectRepoBlock.jsx` | Uses ProjectButton styles |
| `ProjectButton/` | `ProjectButton.jsx`, `ProjectButton.module.css` | **NEW** - extract from global CSS |
| `Thumbnail/` | `Thumbnail.jsx`, `Thumbnail.module.css` | **NEW** - extract from global CSS |

### 4. Import Path Updates
**Decision:** Update all imports to use new paths:
- `blockRenderers.jsx` → imports from `'./ComponentName/ComponentName'`
- Inter-component imports (e.g., `LinksBlock` → `LinkIcon`) → relative paths like `'../LinkIcon/LinkIcon'`
- `ProjectDemoBlock` → imports `Thumbnail` from `'../Thumbnail/Thumbnail'`

### 5. CSS Extraction from Global Styles
**Decision:** Move Thumbnail and ProjectButton styles from `src/styles/index.css` to their respective CSS modules.

**Thumbnail styles to extract:**
- `.thumbnail-container`
- `.thumbnail-frame`
- `.thumbnail-media` (img/video)
- `.play-overlay`
- `.play-icon`
- `.play-text`
- `.thumbnail-caption`

**ProjectButton styles to extract:**
- `.project-repo-btn` (base + hover + focus + lightmode overrides)
- Note: `.page-action` base styles stay in global CSS (used by other components)

### 6. Migration Order (Atomic Steps)
1. Fix `Thumbnail.jsx` video autoplay (independent, can be done first)
2. Create new folder structure with all component files
3. Update `blockRenderers.jsx` imports
4. Update inter-component imports
5. Extract Thumbnail styles to `Thumbnail.module.css`
6. Extract ProjectButton styles to `ProjectButton.module.css`
7. Remove Thumbnail/ProjectButton styles from global CSS
8. Delete `blocks/` directory
9. Verify build and dev server

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Import path errors during migration | Do all imports update in single commit; verify build after each step |
| CSS module class name collisions | CSS modules scope automatically; use same class names as before |
| Missing global CSS styles | Grep for each extracted class in codebase before removing from global CSS |
| Video still not playing | Test in browser; check browser console for autoplay policy errors |
| Breaking changes to consumers | `blockRenderers.jsx` maintains exact same exports; verify with build |

## Migration Plan

1. **Fix video autoplay first** - Edit `Thumbnail.jsx`, add `autoPlay`, verify videos play
2. **Create new folders** - Create 11 directories, move JSX and CSS files
3. **Update imports** - Fix all import paths in blockRenderers and components
4. **Extract CSS** - Move Thumbnail and ProjectButton styles to new modules
5. **Clean global CSS** - Remove extracted styles from `index.css`
6. **Delete blocks/** - Remove old directory
7. **Full verification** - Build, dev server, navigate all spreads, theme/locale switching

**Rollback:** Git revert - all changes are in tracked files.

## Open Questions

None - all technical decisions resolved.