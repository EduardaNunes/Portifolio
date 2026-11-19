# Proposal

## Why

Currently, all notebook content block components (BlocksBlock, TextBlock, PositionsBlock, EmailBlock, LinksBlock, ListBlock, ProjectDemoBlock, ProjectRepoBlock, LinkIcon) and their shared utility functions (formatDates) are defined in a single file `src/components/notebook-content/blockRenderers.jsx` (263 lines). Their styles are scattered across the global `src/styles/index.css` file (2000+ lines) mixed with unrelated notebook, UI, and theme styles. This monolithic structure makes it difficult to maintain, test, and scale individual block components. As the portfolio grows with more block types, the single file will become unwieldy.

## What Changes

- **Extract each block component into its own file** under `src/components/notebook-content/blocks/` directory:
  - `LinkIcon` → `LinkIcon.jsx` (shared utility component)
  - `BlocksBlock` → `BlocksBlock.jsx`
  - `TextBlock` → `TextBlock.jsx`
  - `PositionsBlock` → `PositionsBlock.jsx`
  - `EmailBlock` → `EmailBlock.jsx`
  - `LinksBlock` → `LinksBlock.jsx`
  - `ListBlock` → `ListBlock.jsx`
  - `ProjectDemoBlock` → `ProjectDemoBlock.jsx`
  - `ProjectRepoBlock` → `ProjectRepoBlock.jsx`
- **Create co-located CSS modules** for each block component (e.g., `BlocksBlock.module.css`, `TextBlock.module.css`, etc.) containing only the styles relevant to that block
- **Update `ProjectButton.jsx` and `Thumbnail.jsx`** to import `LinkIcon` from its new location
- **Update `blockRenderers.jsx`** to become a thin registry that re-exports all block components (backward compatible)
- **Remove block-specific styles from `src/styles/index.css`** (lines ~1372-1821 covering `.page-*`, `.positions-list`, `.social-links-section`, `.project-demo-block`, etc.)

## Capabilities

### New Capabilities
- `notebook-block-components`: Modular, self-contained block components with co-located styles for rendering notebook content blocks. Each block owns its markup, logic, and styling.

### Modified Capabilities
- `narrative-content-pages`: The block rendering behavior is now provided by modular components instead of a monolithic renderer. The capability's requirement for "typed content blocks render with shared paper-page vocabulary" remains satisfied but the implementation shifts to a modular architecture.

## Impact

**Affected files:**
- `src/components/notebook-content/blockRenderers.jsx` - becomes a registry/re-export file
- New directory: `src/components/notebook-content/blocks/` with 9 component files + 9 CSS modules
- `src/components/notebook-content/ProjectButton.jsx` - import path change for LinkIcon
- `src/components/notebook-content/Thumbnail.jsx` - import path change for LinkIcon
- `src/styles/index.css` - removal of ~450 lines of block-specific styles

**No breaking changes to public API** - the `BlockRenderer` default export and all named block component exports remain available from `blockRenderers.jsx`.

**Dependencies:** None new. Uses existing `resolveAssetPath` utility and CSS custom properties.