# Design

## Context

See proposal.md - Why. Current state: `blockRenderers.jsx` (263 lines) contains 9 block components + 1 shared utility (LinkIcon) + 1 utility function (formatDates) + a registry (RENDERERS). Styles for these blocks are in `src/styles/index.css` (lines ~1372-1821, ~450 lines) mixed with unrelated notebook, UI, and theme styles. Two dependent components (`ProjectButton.jsx`, `Thumbnail.jsx`) import `LinkIcon` from `blockRenderers.jsx`.

## Goals / Non-Goals

**Goals:**
- Extract each block component into its own file under `src/components/notebook-content/blocks/`
- Co-locate CSS modules with each component for scoped styling
- Maintain full backward compatibility via `blockRenderers.jsx` re-exports
- Remove block-specific styles from global `index.css`
- Update import paths in `ProjectButton.jsx` and `Thumbnail.jsx`

**Non-Goals:**
- Change any block component's rendered output or behavior
- Introduce new CSS methodology (continue using CSS modules + CSS custom properties)
- Modify the `BlockRenderer` registry API
- Change how blocks receive data (block prop structure unchanged)

## Decisions

### 1. Directory Structure: `src/components/notebook-content/blocks/`
**Decision:** Create a dedicated `blocks/` subdirectory rather than placing files directly in `notebook-content/`.

**Rationale:**
- Keeps the 9 new component files organized and separate from existing components (`NotebookSection.jsx`, `NotebookLeaf.jsx`, `ProjectButton.jsx`, `Thumbnail.jsx`)
- Clear ownership: `blocks/` = content block components; `notebook-content/` = notebook composition components
- Follows existing pattern where `notebook-content/` contains composition-level components

**Alternative considered:** Flat structure in `notebook-content/`. Rejected - would clutter the directory with 9+ new files.

### 2. CSS Modules over Global CSS
**Decision:** Each block component gets a co-located `.module.css` file (e.g., `BlocksBlock.module.css`).

**Rationale:**
- Scoped styles prevent leakage - critical since global `index.css` uses generic class names like `.page-field`, `.page-list`, `.page-action` that could conflict
- CSS modules are already used elsewhere in the project (e.g., `NotebookLeaf.module.css` if it exists)
- Maintains use of CSS custom properties (`--paper-bg`, `--page-ink`, etc.) for theming
- Enables dead-code elimination: unused block styles don't ship

**Alternative considered:** Keep global CSS but organize with comments. Rejected - doesn't solve leakage or dead-code issues.

### 3. Backward-Compatible Registry in `blockRenderers.jsx`
**Decision:** Keep `blockRenderers.jsx` as a thin re-export file that imports from `blocks/` and re-exports all named exports plus the `BlockRenderer` default.

**Rationale:**
- Zero breaking changes for existing consumers
- Single source of truth for the RENDERERS registry
- Easy to verify: diff of `blockRenderers.jsx` should show only import/export changes

**Alternative considered:** Remove `blockRenderers.jsx` and update all imports. Rejected - unnecessary churn for consumers.

### 4. LinkIcon as Shared Utility in `blocks/`
**Decision:** Place `LinkIcon.jsx` in `blocks/` alongside block components.

**Rationale:**
- Used by multiple blocks (LinksBlock, ProjectDemoBlock) and by `ProjectButton`/`Thumbnail` via re-export
- It's a presentational component tightly coupled to block rendering
- Co-location with blocks makes dependency graph clear

**Alternative considered:** Move to `notebook-content/utils/` or `utils/`. Rejected - adds unnecessary abstraction layer for a component used almost exclusively by blocks.

### 5. formatDates Utility
**Decision:** Move `formatDates` into `PositionsBlock.jsx` as a local function (or a `utils/formatDates.js` if reused elsewhere).

**Rationale:** Currently only used by `PositionsBlock`. Keeping it local avoids exporting a single-use utility.

**Alternative considered:** Create `blocks/utils/formatDates.js`. Rejected - over-engineering for one consumer.

### 6. CSS Extraction Strategy
**Decision:** Extract block-specific styles from `index.css` by searching for class selectors used by block components (`.page-field`, `.page-chip`, `.page-note`, `.page-list`, `.page-marker`, `.page-action`, `.positions-list`, `.position-item`, `.position-title`, `.position-meta`, `.position-company`, `.position-dates`, `.position-desc`, `.social-links-section`, `.social-link-row`, `.social-link-field`, `.social-link`, `.contact-email`, `.contact-actions`, `.contact-btn`, `.project-demo-block`, `.demo-showcase-section`, `.video-demo-entry`, `.project-deploy-btn`, `.project-repo-btn`, `.list-body`, `.list-detail`, `.thumbnail-caption`, `.note-title`).

**Rationale:** These classes are only used by block components (verified by grep across codebase). Moving them to CSS modules eliminates ~450 lines from global CSS.

**Risk mitigation:** After extraction, run visual regression or manual QA on all block types in both themes (dark/light) and both locales (pt/eng).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Visual regression from CSS module scoping | Test all block types in Storybook or manual QA; CSS modules preserve cascade for custom properties |
| Missed global CSS dependencies | Search for each extracted class in entire codebase before removal; only remove if exclusively used by blocks |
| Import path breakage in dependent components | Update `ProjectButton.jsx` and `Thumbnail.jsx` imports in same PR; verify build passes |
| Increased bundle size from duplicate CSS custom property refs | Negligible - custom properties are references, not duplicated values |
| Developer confusion about where to add new blocks | Document pattern in `blocks/README.md` or contribution guide |

## Migration Plan

1. Create `src/components/notebook-content/blocks/` directory
2. For each block component:
   - Create `ComponentName.jsx` with component logic
   - Create `ComponentName.module.css` with extracted styles
   - Export component from `blocks/index.js` (barrel file)
3. Update `blockRenderers.jsx` to import from `blocks/` and re-export
4. Update `ProjectButton.jsx` and `Thumbnail.jsx` to import `LinkIcon` from `blocks/LinkIcon`
5. Remove extracted styles from `src/styles/index.css`
6. Verify: run dev server, navigate all notebook spreads in both themes and locales
7. No rollback needed - changes are additive (new files) + import updates; old `blockRenderers.jsx` preserved until step 3

## Open Questions

None - all technical decisions resolved. Implementation can proceed.