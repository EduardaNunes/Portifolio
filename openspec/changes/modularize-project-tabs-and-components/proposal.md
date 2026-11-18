# Proposal

## Why

Currently, the narrative markers (About Me, Career, Studies, Contact) are fully modularized: they read their content from JSON, use a layout file to define page pairs, and render through a shared block-rendering pipeline. The project category markers (IA e Automações, Jogos, WebDev, BackEnd) however still auto-generate their page pairs in `buildNotebookPages.js` without layout definitions, making them inconsistent and harder to maintain. Additionally, the project demo thumbnail rendering and "VER REPOSITÓRIO" button are embedded inside `ProjectDemoBlock` and `LinksBlock` respectively, preventing reuse and making the code harder to test and extend.

## What Changes

- **Project category markers adopt layout-driven page pairs**: Each category (ai-automation, games, webdev, backend) gets page-pair definitions in `notebookLayout` (or a new category layout module), exactly like narrative markers. The `projects` marker remains the overview.
- **When a category is selected, the Projects marker also shows as active**: This matches the existing behavior where the Projects left tab highlights alongside the active right-side category tab.
- **New `Thumbnail` component**: Extracts the image/video rendering logic from `ProjectDemoBlock` into a reusable component that accepts a media object (`{ src, alt, caption, video }`).
- **New `ProjectButton` component**: Extracts the "VER REPOSITÓRIO" button rendering from `LinksBlock` (variant `project-repo`) into a reusable component with props `icon`, `text`, `link`. This fully replaces the current inline rendering.
- **Update `ProjectDemoBlock`**: Use the new `Thumbnail` component internally.
- **Update `buildNotebookPages.js`**: Use `ProjectButton` for repository links instead of the `LinksBlock` variant.
- **Add layout entries for each category** in `notebookLayout` (or equivalent) so each project becomes a page pair defined by layout, not auto-generated.

## Capabilities

### New Capabilities

- `project-category-pages`: Defines layout-driven page pairs for project category markers (ai-automation, games, webdev, backend), making them consistent with narrative markers.
- `thumbnail-component`: A reusable component that renders an image or video thumbnail with optional caption and play overlay.
- `project-button-component`: A reusable component that renders the "VER REPOSITÓRIO" action button with configurable icon, text, and link.

### Modified Capabilities

- `marker-content-schema`: Project category markers now reference layout definitions; validation must cover category layout coverage.
- `narrative-content-pages`: Extended to specify project category spread content requirements (left leaf = metadata, right leaf = demo) and the Projects+Category dual-active tab behavior.
- `narrative-notebook-component`: Updated to ensure the new components integrate with the existing notebook rendering pipeline and theming.

## Impact

**Affected code:**
- `src/content/layout.js` — add page-pair definitions for each category marker
- `src/utils/buildNotebookPages.js` — remove auto-generation for categories; use layout resolver; use `ProjectButton` for repo links
- `src/components/notebook-content/blockRenderers.jsx` — remove `project-repo` variant from `LinksBlock`; update `ProjectDemoBlock` to use `Thumbnail`
- `src/components/notebook-content/` — add new `Thumbnail.jsx` and `ProjectButton.jsx` components
- `src/content/pt.json`, `src/content/eng.json` — no structural changes needed (content already has projects with sections and demo)
- Validation script (`src/scripts/validate-content.mjs`) — extend to validate category layout coverage