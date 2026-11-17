# Design

## Context

The current notebook leaf presentation uses `.pixel-art-*` CSS classes that create bordered boxes (`pixel-art-entry-list`, `pixel-art-section`, `pixel-art-media-frame`), solid-bottom-border data rows (`.pixel-art-entry`), left-aligned boxed headers (`.pixel-art-header`), and varied button styles (`.pixel-art-entry-action`, `.repo-link-button`, `.contact-btn`, `.prominent-deploy-btn`). The global `.notebook-leaf * { text-align: left }` forces all content left, requiring specific overrides to center anything. The reference designs ("Book Size" and "Details/Quests" from HumblePixel) show a lighter paper-like aesthetic: centered titles, uppercase section labels with pixel-stepped underlines, dotted ruled lines for data/list items, circular check markers, stepped-corner info boxes with internal ruled lines, and unified uppercase buttons — all using a single ink color for hierarchy through size, case, and alignment.

See `proposal.md` for motivation and `specs/*/spec.md` for behavioral requirements.

## Goals / Non-Goals

**Goals:**
- Introduce a reusable `page-*` CSS class vocabulary scoped to `.notebook-leaf` for paper-like text presentation
- Replace all `.pixel-art-*` grouping boxes with ruled lines and label-based hierarchy (R8: "menos molduras, mais linhas")
- Unify button styles under `.page-action` while preserving deploy button's absolute position
- Replace comma-joined skill tags with `.page-chip` elements
- Replace `✓`/`…` characters and plain goal lines with `.page-marker` circular markers
- Move project description and current role into `.page-note` info boxes with stepped corners and internal ruled lines
- Promote right-leaf single-group labels to centered `page-title` (About Me "Resultados", Career "Próximos Passos") without new copy keys
- Preserve all existing content, localization, navigation, spread structure, cover, tabs, page-turn animation, and viewport containment

**Non-Goals:**
- Changing spread dimensions, spine, cover, tabs, page-turn animation, or scroll behavior
- Adding new colors or fonts (Joystix Monospace retained)
- Modifying `profile.js`, `projects.js`, `translations.js`, or data structures (unless right-leaf title option B is chosen later)
- Changing `NarrativeNotebook.jsx`, `PageTurn.jsx`, `NotebookTab.jsx`, `buildNotebookPages.js`, `App.jsx`, hooks, or audio
- Reproducing the reference's visible scrollbar inside info boxes (requirement: bars remain hidden)

## Decisions

### 1. CSS Token Aliases in `.notebook-leaf`
**Decision:** Define three aliases (`--page-ink`, `--page-ink-soft`, `--page-line`) scoped to `.notebook-leaf` mapping to existing palette colors (`--paper-accent`, `--strong`, `--strong`).
**Rationale:** Keeps the new presentation system self-contained, uses only approved colors, and allows easy theming if palette changes. No new colors introduced.
**Alternatives considered:** Using raw palette variables directly in each rule — rejected because aliases clarify intent and simplify future maintenance.

### 2. New `page-*` Class Vocabulary (vs. Extending `.pixel-art-*`)
**Decision:** Introduce a new parallel class set (`page-title`, `page-label`, `page-field`, `page-field-pair`, `page-list`/`page-list-item`, `page-marker`, `page-note`, `page-actions`/`page-action`, `page-chip`) rather than refactoring `.pixel-art-*` in place.
**Rationale:**
- Zero risk of breaking existing selectors that may still depend on `.pixel-art-*` during migration
- Clear semantic separation: `page-*` = paper-like ruled system; `pixel-art-*` = legacy boxed system
- Allows incremental migration per page component
- `.pixel-art-container::before` (corner mark) and `.pixel-art-media-frame` (image frame) are kept as they are ornamental/media, not text presentation
**Alternatives considered:** Overwriting `.pixel-art-*` classes — rejected due to risk of visual regressions during transition and loss of ability to compare old/new side-by-side.

### 3. Dotted Ruled Lines via `repeating-linear-gradient`
**Decision:** Use `background: repeating-linear-gradient(to right, var(--page-line) 0 2px, transparent 2px 4px) left bottom / 100% 1px no-repeat` on `.page-field` and `.page-list-item` for horizontal dotted rules; `repeating-linear-gradient(to bottom, transparent 0 calc(1.6em - 1px), var(--page-line) calc(1.6em - 1px) 1.6em)` on `.page-note` for internal vertical rules matching `line-height: 1.6`.
**Rationale:** Pure CSS, no extra DOM elements, scales with font size, works with text wrapping (rule always under last fragment because it's on the block container's bottom).
**Alternatives considered:** `<hr>` elements or `::after` pseudo-elements — rejected because they don't naturally stay under wrapped text fragments without extra layout complexity.

### 4. Section Label Pixel-Stepped Underline
**Decision:** Implement via `::after` with two overlapping linear-gradients: full-width 2px line + 50%-width 2px line at 25% offset and 2px down.
**Rationale:** Pure CSS, no images, matches reference's "passos de pixel" aesthetic, scales with `em` units.
**Alternatives considered:** Background image or multiple `::before`/`::after` boxes — rejected as less maintainable and not scalable.

### 5. Circular Markers with Inner-Ring "Check"
**Decision:** `.page-marker` = 0.65rem circle, 2px ink border, transparent background; `.is-done` adds ink background + `inset 0 0 0 2px var(--paper-bg)` box-shadow for inner-ring check appearance.
**Rationale:** No new colors, no checkmark glyph/font dependency, purely CSS, accessible via separate sr-only text.
**Alternatives considered:** Unicode checkmark (✓) or SVG — rejected because reference shows filled circle with inner ring, not a glyph.

### 6. Info Box Stepped Corners via `clip-path`
**Decision:** Use `clip-path: polygon(...)` with 3px step offsets on all four corners.
**Rationale:** Pure CSS, no images, matches reference's "cantos escalonados (pixel)". Fallback: if visual weight is insufficient, switch to four 3px `::before`/`::after` corner elements.
**Alternatives considered:** `border-radius` with background trickery — rejected because true stepped/pixel corners require `clip-path` or multiple elements.

### 7. Unified Action Button Style
**Decision:** Single `.page-action` class for all textual actions (repo link, contact, deploy, accept/deny). Deploy button keeps absolute positioning via separate wrapper class; only visual style unified.
**Rationale:** Reduces CSS surface area, ensures consistent hit targets (min-height 1.9rem), matches reference's "botões pequenos, retangulares, bordados, texto em caixa-alta".
**Alternatives considered:** Keeping separate button classes with shared mixin — rejected because the visual unification is a core requirement and separate classes create drift risk.

### 8. Right-Leaf Title Promotion (Option A)
**Decision:** Promote existing single-group label to `page-title` on About Me right ("Resultados") and Career right ("Próximos Passos") without new `profile.js` keys. Studies right keeps two `page-label`s.
**Rationale:** No new copy, no i18n work, matches reference showing titles on both leaves for single-group spreads. Option B (new keys) deferred as explicit confirmation point.
**Alternatives considered:** Option B (new keys in `profile.js`) — deferred per proposal's "Pontos a confirmar #1".

### 9. `text-transform: uppercase` for Labels/Buttons
**Decision:** Apply uppercase via CSS `text-transform`, never by changing source strings.
**Rationale:** Preserves i18n integrity (screen readers read original case), single source of truth for copy, easy to toggle if design changes.
**Alternatives considered:** Uppercasing in JSX or data — rejected because it breaks screen reader experience and localization workflow.

### 10. Accessibility for Markers
**Decision:** `.page-marker` gets `aria-hidden="true"`; completed state conveyed via `sr-only` span or `aria-label` on the `page-list-item`.
**Rationale:** Markers are decorative; state must be announced. `text-transform` doesn't affect screen reader output.
**Alternatives considered:** Using `role="img"` with `aria-label` on marker — rejected as over-engineering; sr-only on item is simpler and more robust.

### 11. Migration Strategy: Per-Page Component
**Decision:** Update JSX components one at a time (`AboutMePage`, `CareerPage`, `StudiesPage`, `ContactPage`, `ProjectLeftPage`, `ProjectRightPage`), replacing class names and structure per Section 6 of the planning doc. Keep `.pixel-art-*` classes in CSS until all pages migrated, then remove unused ones.
**Rationale:** Isolates risk, allows visual verification per page, no big-bang cutoff.
**Alternatives considered:** Single commit changing all pages — rejected due to review/debugging difficulty.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `clip-path` stepped corners may render inconsistently across browsers or at low zoom | Test in Chrome/Firefox/Safari at 484px viewport; fallback to four `::before`/`::after` 3px corner elements if needed |
| Dotted ruled line alignment with `line-height` in `.page-note` may drift if font metrics change | Lock `line-height: 1.6` and gradient stop at `1.6em` together; add comment warning they must stay in sync |
| `text-wrap: balance` not supported in all browsers (Safari < 17) | Use as progressive enhancement; titles already `clamp()` sized and centered, so worst case is normal wrapping |
| Removing `.pixel-art-entry-list` borders may reduce visual grouping on very long leaves | Section labels (`page-label`) with underlines + ruled lines on each item provide sufficient grouping per reference |
| Deploy button absolute position + unified style may need z-index adjustment | Keep existing `z-index: 10` on deploy link wrapper; `.page-action` has no positioning, so no conflict |
| Skill tags migration from `join(', ')` to individual chips requires data iteration change in JSX | Simple map change in `AboutMePage.jsx`; no data structure change needed |
| `project-title` class collision between `ProjectLeftPage` and `StudiesPage` academic projects | Rename StudiesPage academic project title class to `academic-project-title` per planning doc Section 6.3 |

## Migration Plan

1. **CSS Phase 1 (tokens + new classes):** Add `--page-ink`, `--page-ink-soft`, `--page-line` to `.notebook-leaf` in `index.css`. Add all `page-*` classes (Sections 5.1–5.7 of planning doc). Keep all `.pixel-art-*` classes intact.
2. **CSS Phase 2 (simplifications):** Remove borders/padding from `.pixel-art-entry-list`, `.pixel-art-media-frame`, `.pixel-art-section` (Section 5.8). Retire `.pixel-art-header` from `h2/h3` usage. Replace `.pixel-art-entry` usages with new classes in JSX.
3. **JSX Migration (per page):** Update each page component to use new structure:
   - `AboutMePage.jsx` → `page-title`, `page-label`, `page-field` with `page-chip`, `page-note` for results, `page-action` for links
   - `CareerPage.jsx` → `page-title`, `page-note` for currentRole, `page-label`, `page-field` + `page-field-pair` for timeline, `page-list` with `page-marker` for goals
   - `StudiesPage.jsx` → `page-title`, `page-label`, `page-field` + `page-field-pair` for education, `page-list` with `page-marker` for courses, `page-list-item` with `page-action` for academic projects, rename `project-title` → `academic-project-title`
   - `ContactPage.jsx` → `page-title`, `page-field` for email, `page-actions` for contact button, `page-list` of `page-field`+`page-action` for social links
   - `ProjectLeftPage.jsx` → `page-title`, `page-note` for description, `page-label` + `page-chip` for tech stack, `page-actions` + `page-action` for repo link
   - `ProjectRightPage.jsx` → deploy button keeps position, adopts `page-action` visual; caption uppercase soft ink; `page-field` for demo label/value
4. **Cleanup:** Remove unused `.pixel-art-*` classes from `index.css` after verifying all pages migrated. Document token aliases in `README.md` palette section.
5. **Validation:** Build (`npm run build`), visual check at 484×885 and desktop, PT/EN long-text wrapping, vertical scroll only, no horizontal overflow, all acceptance criteria from planning doc Section 9.

## Open Questions

1. **Right-leaf title Option B confirmation:** If stakeholder prefers explicit title keys in `profile.js` for all right leaves (including Studies, Contact, Projects), the JSX changes for right leaves would need to consume those new keys. Current design uses Option A (no new keys).
2. **Stepped-corner fallback:** If `clip-path` polygon renders poorly at certain zoom levels, the fallback to four `::before`/`::after` corner elements needs a decision on exact implementation. Current design proceeds with `clip-path` first.
3. **Academic project link style:** Planning doc says "page-action" for academic project links. Confirm whether these should be inline in the list item or a separate action group.