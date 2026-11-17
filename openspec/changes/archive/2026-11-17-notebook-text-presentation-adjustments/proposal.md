# Proposal

## Why

The current notebook leaf text presentation uses bordered boxes, solid dividers, and left-aligned layouts that create visual heaviness ("caixas dentro de caixas") on narrow leaves (~190px at 484px viewport). The reference designs ("Book Size" and "Details/Quests" from HumblePixel) show a lighter, paper-like aesthetic: centered titles, uppercase section labels with decorative pixel-stepped underlines, dotted ruled lines for data rows and lists, circular check markers, and info boxes with stepped corners — all using a single ink color for hierarchy via size, case, and alignment rather than nested boxes.

Two corrections shape the final scope. First, a notebook page must behave like paper: it never scrolls, vertically or horizontally. Second, the current content already exceeds the visible leaf height (About Me measures ~1179px of content in ~684px of visible page), so a fixed page is only viable when content that does not fit continues on the next page. Markers therefore need as many page pairs as their content requires.

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
- **Right-leaf titles**: Promote existing single group label to `page-title` on About Me ("Resultados"), Career ("Próximos Passos"); Studies keeps two labels (no new copy). No new `profile.js` keys.
- **No-scroll leaves**: `.notebook-leaf` stops scrolling on both axes (`overflow: hidden`, scroll affordances removed); a leaf always shows one fixed page.
- **Curated page continuation**: content is split into explicit slices per leaf in the page-building code; when a section's content exceeds a leaf, the marker declares an additional page pair and the remaining slice renders on the corresponding leaf. No truncation, ellipsis, or runtime measurement.
- **Continuation context**: only a marker side's first leaf renders the full page title; continuation leaves render a running head built from the existing localized heading, plus the continuing group label when the slice starts mid-group. No new copy keys.
- **Page-pair expansion**: a marker may own one or several page pairs; the flattened navigation sequence, marker selection, turn animation, and pair counts include every pair. A continuation pair whose side has no remaining slice renders blank paper rather than invented copy.
- **Accessibility**: Semantic `h2`/`h3` preserved; `text-transform` only visual; markers `aria-hidden`; completed state also conveyed to screen readers; focus-visible outlines retained.
- **No new colors**, no new fonts (Joystix Monospace retained), no horizontal overflow, no scrolling inside leaves; cover/tabs/turn animation/spread dimensions untouched.

## Capabilities

### Modified Capabilities

- `narrative-content-pages`: The "Pixel-art page presentation" requirement (requirement 9) is updated — the visual presentation of leaf content changes from bordered boxes to ruled-paper style with new class vocabulary, while preserving content division per page pair, localization, and containment. "Page content remains contained and accessible" and "Spread ordering and counting convention" are also updated: leaves no longer scroll, overflow continues on additional pairs, and the spread count includes continuation pairs.
- `narrative-notebook-component`: Visual presentation of leaf content changes (requirement 6 "Explicit deploy link on project right page" button style unified; layout structure, spread dimensions, spine, tabs, cover, and turn animation remain identical). Existing navigation requirements already traverse every page pair a marker owns.

### New Capabilities

- `notebook-leaf-text-presentation`: A new capability owning the reusable text presentation system for notebook leaves — tokens, ruled lines, markers, info boxes, unified actions, and chips — so future pages or components can adopt the same paper-like style without re-inventing it. This capability encapsulates the CSS class vocabulary and behavioral rules (no truncation, wrap balance, clamp sizing, reduced-motion safe, containment, fixed-page text behavior).
- `notebook-page-flow`: A new capability owning how content maps onto fixed leaves — leaves never scroll, overflowing content continues on additional page pairs within the same marker, slices are authored deterministically, continuation leaves carry a running head, and every generated pair participates in navigation.

## Impact

- **Files modified**: `src/styles/index.css` (new tokens + `page-*` classes, no-scroll leaf, simplification of `.pixel-art-*`), `src/utils/buildNotebookPages.js` (per-marker page-pair slices, continuation pairs), `AboutMePage.jsx`, `CareerPage.jsx`, `StudiesPage.jsx`, `ContactPage.jsx`, `ProjectLeftPage.jsx`, `ProjectRightPage.jsx` (class/structure changes, slice props, running head), `README.md` (palette aliases documentation).
- **Files NOT modified**: `NarrativeNotebook.jsx`, `PageTurn.jsx`, `NotebookTab.jsx`, `App.jsx`, hooks, audio, `profile.js`, `projects.js`, `translations.js`.
- **Dependencies**: None new. Uses existing CSS custom properties, palette, and the existing flattened `spreads` navigation model.
- **Breaking changes**: None to content or navigation. The base spread count grows only where content overflow requires continuation pairs; semantic HTML (`h2`/`h3`) is unchanged.
- **Testing**: Visual regression on desktop and 484×885 viewport; PT/EN long-text slicing with no scroll offset or scrollbar on any leaf; every continuation pair reachable by corner navigation; `npm run build` passes; no colors outside documented palette.
