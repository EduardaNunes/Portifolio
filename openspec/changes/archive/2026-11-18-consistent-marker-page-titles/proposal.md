# Proposal

## Why

The current narrative-page layout gives a large page title only to selected leaves. As a result, the second About Me leaf begins with component content alone and the third promotes the `Resultados` component subtitle to a title-sized heading, which weakens marker context and breaks the intended title hierarchy.

## What Changes

- Make the localized marker label the large page title at the top of every non-blank narrative notebook leaf, including continuation leaves and both sides of a spread.
- Keep each rendered content section's `subHeader` as a medium section label; section subtitles must not be promoted to a page title.
- Simplify narrative layout metadata and page resolution so title behavior no longer depends on `title: 'section'` or per-side continuation counters.
- Repair the existing PT/EN structure and Studies layout-coverage defects that currently block content validation, without changing localized copy or project behavior.
- Preserve blank leaves, deterministic slices, existing page-pair order, localized copy, fixed non-scrolling geometry, and the established title/label visual styles.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- `notebook-page-flow`: Change the heading rule for narrative leaves so every populated leaf uses its marker heading as the page title and retains component labels as section-level headings.
- `notebook-leaf-text-presentation`: Change page-title and section-label scenarios to reflect marker titles on all populated narrative leaves and prohibit subtitle promotion.

## Impact

- Affected presentation metadata: `src/content/layout.js`.
- Affected page resolution and leaf props: `src/utils/buildNotebookPages.js` and `src/components/notebook-content/NotebookLeaf.jsx`.
- Affected fixed-page layout verification and possible spacing adjustments in `src/styles/index.css`.
- No content-document schema, marker order, navigation API, palette, or dependencies change.
