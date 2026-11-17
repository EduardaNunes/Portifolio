# Tasks

## 1. Content documents and marker registry

- [ ] 1.1 Create `src/content/pt.json` with the nine stable marker ids (`about`, `career`, `studies`, `projects`, `ai-automation`, `games`, `webdev`, `backend`, `contact`), migrating every value from `src/data/profile.js` into ordered `sections` and typed blocks (`blocks`, `text`, `positions`, `email`, `links`, `list`, `projectDemo`). Verify with `node -e "const c=require('./src/content/pt.json'); console.log(Object.keys(c))"` that all nine ids load and every narrative section from `profile.js` is present.
- [ ] 1.2 Create `src/content/eng.json` mirroring `pt.json` exactly in marker ids, section ids, block types, item counts, and ordering, with the English copy from `profile.js`. Verify by comparing structure (not text) in a node one-liner that reports no key/order differences between both documents.
- [ ] 1.3 Nest the current `src/data/projects.js` entries under the four category markers as ordered `projects` arrays with `id`, `title`, `sections`, and a `demo` block, preserving category assignment, order, thumbnail, tech stack, repo link, and deploy link. Verify that the count per category matches today's `CATEGORIES` grouping (7 projects total, with `programadas` still under Jogos).
- [ ] 1.4 Create `src/content/markers.js` with the marker registry (`id`, `side`, `icon`, `accent`, navigation order) moved from `MARKER_META` in `src/utils/buildNotebookPages.js`. Verify the registry id order matches the current tab order: about, career, studies, projects, ai-automation, games, webdev, backend, contact.
- [ ] 1.5 Create `src/content/index.js` exporting the two documents and a `getMarkerContent(language)` selector with the same `pt`/`eng` keys used by `useLanguage`. Verify `node --input-type=module -e "import('./src/content/index.js').then(m=>console.log(m.getMarkerContent('pt').about.label))"` prints the localized About label.
- [ ] 1.6 Document the content schema in `README.md` (marker → sections → typed blocks, required/optional fields, current-position rule, project nesting) with examples copied from the real files. Verify each documented field exists in `pt.json` and that no example shows a field the validator rejects once task 2.1 lands.

## 2. Content validation

- [ ] 2.1 Implement `src/content/validateContent.js` as a pure validator covering locale parity, known block types, required/optional field rules, unique marker/section/project ids, `links` icon values, complete `text.link` objects, and project ownership. Verify it returns zero errors for both documents and reports a path-precise error when a temporary copy removes `positions[0].fromDate`, uses `type: "unknown"`, and duplicates a project id.
- [ ] 2.2 Add `scripts/validate-content.mjs` that reads both JSON documents, runs the validator, prints every error with its marker/section/item path, and exits non-zero on failure. Verify it exits 0 for the current content and non-zero with the expected path for an intentionally broken temporary copy.
- [ ] 2.3 Wire validation into `package.json` with a `validate:content` script plus `prebuild` and `predev` hooks. Verify `npm run validate:content` succeeds and that a broken content file blocks `npm run build` before Vite runs.

## 3. Layout module and page builder

- [ ] 3.1 Create `src/content/layout.js` declaring the narrative page pairs for `about`, `career`, `studies`, and `contact` with `title`, `sections`, and `sections[].components`/`items` slices that reproduce the current slices in `buildNotebookPages.js` (About 2 pairs, Career 3 pairs, Studies 2 pairs, Contact 1 pair). Verify every slice references an existing section id and that the builder resolves the same items as today.
- [ ] 3.2 Extend `validateContent.js` with layout coverage checks: unknown section ids, out-of-range component/item indexes, `items` slices on sections without exactly one repeatable block, and any narrative section/component/item not referenced exactly once. Verify a duplicated slice and an omitted item both fail with the offending path, while the real layout passes.
- [ ] 3.3 Rewrite `src/utils/buildNotebookPages.js` to resolve `content` + `markers.js` + `layout.js` into `{ markers, spreads }`, derive running heads and title promotion from the layout, and keep the `{ id, markerId, section, left, right }` spread shape consumed by `NarrativeNotebook.jsx`. Verify with a node script that both locales produce 17 spreads with per-marker counts matching today (2 About, 3 Career, 2 Studies, 1 Projects overview, 7 project pairs, 1 Contact, empty pair only if a category loses all projects).
- [ ] 3.4 Generate the Projects overview pair and one pair per project inside `buildNotebookPages.js`, including the category count summary, category chips, first available thumbnail, repo action on the left, and deploy action on the right. Verify every project appears exactly once, pairs are ordered by category declaration, and an empty category still yields a navigable placeholder pair.
- [ ] 3.5 Add the layout authoring section to `README.md` (page side shape, `title`, `components`/`items` ranges, blank leaf, running-head behavior, project auto-generation). Verify the documented ranges match `layout.js` and that editing one range changes exactly one leaf in the resolved output.

## 4. Generic renderer and UI copy

- [ ] 4.1 Add a `notebook` object to `src/data/translations.js` with `previous`, `next`, `sectionsLabel`, `message`, `techStack`, `viewSource`, `deploy`, `demo`, `noThumbnail`, `emptyCategory`, `currentPosition`, and `projectCountSuffix` in PT and EN, removing the unused `navigationMarkers` and `projectCategories` maps. Verify `grep` finds no remaining references to the removed maps and that both locales expose the same key set.
- [ ] 4.2 Create `src/components/notebook-content/blockRenderers.jsx` with one renderer per type (`BlocksBlock`, `TextBlock`, `PositionsBlock`, `EmailBlock`, `LinksBlock`, `ListBlock`, `ProjectDemoBlock`) reusing the existing `page-field`, `page-field-pair`, `page-note`, `page-list`, `page-list-item`, `page-marker`, `page-chip`, `page-action`, `page-actions`, `pixel-art-container`, and `pixel-art-media-frame` classes. Verify each type renders its required output and that absent optional links produce no button.
- [ ] 4.3 Create `NotebookSection.jsx` (optional `h3.page-label` subheader + block dispatch) and `NotebookLeaf.jsx` (`h2.page-title` or `p.page-label` running head + sections). Verify a leaf with a marker title, a leaf with a promoted section title, a continuation leaf, and a blank leaf produce the expected heading markup.
- [ ] 4.4 Add only the CSS needed for the generic renderer (checklist `is-done` state, image/media sizing, section spacing) in `src/styles/index.css`, reusing existing tokens and colors. Verify `git diff src/styles/index.css` contains no new color values and that PT/EN leaves keep the 684px content budget at 484×885.

## 5. App integration and parity verification

- [ ] 5.1 Update `src/App.jsx` to select content through `src/content/index.js`, pass the registry and layout to `buildNotebookPages`, and feed the three UI labels from `translations.js` instead of `profileData`. Verify `npm run build` succeeds and the dev server renders the notebook with no console errors.
- [ ] 5.2 Verify the full notebook in Portuguese and English at 484×885: all 17 spreads reachable, every leaf within the 684px content budget and arrow-safe bottom, no scrolling or clipped text, continuation running heads correct, and blank leaves rendered where the layout says `null`.
- [ ] 5.3 Verify desktop rendering with the 1100×720 frame (504×680 leaf) in both locales, including long project descriptions and the Projects overview.
- [ ] 5.4 Verify navigation parity: left and right marker tabs open the first pair, global arrows traverse all 17 spreads in order, marker highlight follows the active spread, and switching language preserves the current marker and page.
- [ ] 5.5 Verify content behavior: empty `toDate` shows the localized current wording, optional repo/deploy/links hide their buttons, checklist items expose `done` state, empty category shows a navigable placeholder, and no marker label or content is duplicated between leaves.

## 6. Cleanup and final checks

- [ ] 6.1 Delete `src/data/profile.js`, `src/data/projects.js`, and the six replaced page components (`AboutMePage`, `CareerPage`, `StudiesPage`, `ContactPage`, `ProjectLeftPage`, `ProjectRightPage`), then verify `grep` finds no imports of the removed modules.
- [ ] 6.2 Run `npm run validate:content` and `npm run build`; verify both pass with the new content as the only source of marker text and no dead label maps left in `translations.js`.
- [ ] 6.3 Review `git diff` for accidental visual or behavioral changes outside the content pipeline (colors, geometry, animations, navigation, cover) and verify none are present.

## Workflow follow-up

- Archive the change after implementation and verification are complete.
- Verify the archived specs reflect the final content schema and layout behavior.
