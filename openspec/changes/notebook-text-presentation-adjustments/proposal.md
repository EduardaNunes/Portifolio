# Proposal

## Why

The current notebook leaf text presentation uses bordered boxes, solid dividers, and left-aligned layouts that create visual heaviness ("caixas dentro de caixas") on narrow leaves (~190px at 484px viewport). The reference designs ("Book Size" and "Details/Quests" from HumblePixel) show a lighter, paper-like aesthetic: centered titles, uppercase section labels with decorative pixel-stepped underlines, dotted ruled lines for data rows and lists, circular check markers, and info boxes with stepped corners — all using a single ink color for hierarchy via size, case, and alignment rather than nested boxes. This change aligns the implementation with those references while preserving all existing content, localization, navigation, and spread structure.

## What Changes

- **New CSS token aliases** in `.notebook-leaf`: `--page-ink` (ink for titles/borders), `--page-ink-soft` (soft ink for rules/labels), `--page-line` (dotted rule color) — all mapped to existing palette colors, documented in README.md.
- **New page-level CSS classes** for leaf content: `page-title`, `page-label`, `page-field`, `page-field-pair`, `page-list`/`page-list-item`, `page-marker` (+ `is-done`), `page-note`, `page-actions`/`page-action`, `page-chip`.
- **Typography & alignment**: Titles centered, larger, no box; section labels uppercase, centered, with pixel-stepped underline; data rows and list items on dotted ruled lines (repeating-linear-gradient); labels uppercase, values inline so wrapping keeps rule under last fragment.
- **Lists**: Circular markers (empty/filled via `is-done` with inner-ring "check"), replacing `✓`/`…` characters and plain lines.
- **Info boxes** (`page-note`): Thin green border, 3px stepped corners via `clip-path`, internal dotted ruled lines matching `line-height: 1.6`, no forced minimum height.
- **Actions/buttons** (`.page-action`): Unified style — uppercase, 2px border, fixed min-height, hover invert; replaces `.pixel-art-entry-action`, `.repo-link-button`, `.contact-btn`, `.prominent-deploy-btn` visuals (deploy button keeps its absolute position).
- **Tags** (`.page-chip`): Uppercase, 1px border, square corners, small padding/font, replacing comma-joined skill tags.
- **Removals/simplifications**: `.pixel-art-entry-list`, `.pixel-art-media-frame`, `.pixel-art-section` lose grouping borders/padding; `.pixel-art-header` retired from `h2/h3`; `.pixel-art-entry` replaced by new classes; `.pixel-art-container::before` (corner mark) and image frame kept.
- **JSX markup updates** across `AboutMePage`, `CareerPage`, `StudiesPage`, `ContactPage`, `ProjectLeftPage`, `ProjectRightPage` to use new class structure: `page-title` → `page-label` groups → `page-field`/`page-list`/`page-note`/`page-actions`.
- **Right-leaf titles**: Promote existing single group label to `page-title` on About Me ("Resultados"), Career ("Próximos Passos"); Studies keeps two labels (no new copy). No new `profile.js` keys unless option B is chosen later.
- **Accessibility**: Semantic `h2`/`h3` preserved; `text-transform` only visual; markers `aria-hidden`; completed state also conveyed to screen readers; focus-visible outlines retained.
- **No new colors**, no new fonts (Joystix Monospace retained), no horizontal overflow, vertical scrolling unchanged, cover/tabs/turn animation/spread dimensions untouched.

## Capabilities

### Modified Capabilities

- `narrative-content-pages`: The "Pixel-art page presentation" requirement (requirement 9) is updated — the visual presentation of leaf content changes from bordered boxes to ruled-paper style with new class vocabulary, while preserving content division between leaves, localization, and containment.
- `narrative-notebook-component`: Visual presentation of leaf content changes (requirement 6 "Explicit deploy link on project right page" button style unified; requirement 1 "Notebook layout structure" unaffected as spread dimensions, spine, tabs, cover, turn animation remain identical).

### New Capabilities

- `notebook-leaf-text-presentation`: A new capability owning the reusable text presentation system for notebook leaves — tokens, ruled lines, markers, info boxes, unified actions, and chips — so future pages or components can adopt the same paper-like style without re-inventing it. This capability encapsulates the CSS class vocabulary and behavioral rules (no truncation, wrap balance, clamp sizing, reduced-motion safe, containment).

## Impact

- **Files modified**: `src/styles/index.css` (new tokens + `page-*` classes, simplification of `.pixel-art-*`), `AboutMePage.jsx`, `CareerPage.jsx`, `StudiesPage.jsx`, `ContactPage.jsx`, `ProjectLeftPage.jsx`, `ProjectRightPage.jsx` (class/structure changes), `README.md` (palette aliases documentation).
- **Files NOT modified**: `NarrativeNotebook.jsx`, `PageTurn.jsx`, `NotebookTab.jsx`, `buildNotebookPages.js`, `App.jsx`, hooks, audio, `profile.js` (unless option B for right-leaf titles is approved), `projects.js`.
- **Dependencies**: None new. Uses existing CSS custom properties and palette.
- **Breaking changes**: None — semantic HTML (`h2`/`h3`) unchanged, only CSS classes and visual rendering change. Existing selectors on `.pixel-art-*` may need cleanup but are not relied on by external systems.
- **Testing**: Visual regression on desktop and 484×885 viewport; PT/EN long-text wrapping; vertical scroll only; `npm run build` passes; no colors outside documented palette.