# Tasks

## 1. Validation prerequisites

- [ ] 1.1 Repair the current PT/EN content-structure and Studies-layout coverage defects: remove invalid empty optional fields, restore identical locale marker/section/block structure, and cover every declared Studies section exactly once. Verify `npm run validate:content` passes without weakening validator rules or changing localized copy.

## 2. Narrative title resolution

- [ ] 2.1 Simplify `src/content/layout.js` so narrative sides no longer declare title-promotion modes; preserve every existing section/component/item slice and blank (`null`) side. Verify `npm run validate:content` accepts the updated layout.
- [ ] 2.2 Update `src/utils/buildNotebookPages.js` so every populated narrative leaf receives its marker label as `title`, while blank sides remain `null`; remove running-head and promoted-subheader resolution. Verify a resolved About spread gives all four populated leaves `title: 'Sobre Mim'` / `About Me` and preserves each section's `subHeader`.
- [ ] 2.3 Align `src/content/validateContent.js` and the layout authoring section in `README.md` with the removed narrative title modes. Verify validation rejects obsolete title metadata if it remains unsupported and the documented layout example matches the accepted shape.

## 3. Heading hierarchy and fixed-page fit

- [ ] 3.1 Update `NotebookLeaf.jsx` and only the necessary existing CSS so a populated narrative leaf always renders one large `h2.page-title`, while `NotebookSection.jsx` retains every `subHeader` as medium `h3.page-label`; do not change project-title leaves or add colors. Verify the second and third About pages show the marker title large and `Resultados` only as a medium section label.
- [ ] 3.2 Rebalance explicit narrative layout slices or add deterministic continuation pairs only if marker titles cause overflow. Verify all content remains exactly once and in reading order with `npm run validate:content`.
- [ ] 3.3 At 484×885, inspect all Portuguese and English narrative spreads: every populated leaf has the localized marker title, every component subtitle remains medium, blank leaves have neither heading, and no leaf scrolls, clips, or overlaps the arrow-safe bottom.
- [ ] 3.4 At the 504×680 desktop leaf target, inspect both locales including long Career and Studies slices. Verify no overflow and unchanged marker-tab, arrow, page-turn, and language-switch navigation behavior.

## 4. Final checks

- [ ] 4.1 Run `npm run validate:content`, `npm run build`, and `openspec validate consistent-marker-page-titles --strict`; verify all commands succeed and the CSS diff introduces no color values.

## Workflow follow-up

- Archive the change after implementation and review are complete.
