# Tasks

## 1. Marker Registry and Content Model

- [x] 1.1 Define one ordered marker registry for Sobre Mim, Carreira, Estudos, Projetos, IA e Automações, Jogos, WebDev, BackEnd, and Contato, with ID, localized label, `side`, visual metadata, and `pagePairs`; verify it preserves the required order while exposing five `left` and four `right` markers.
- [x] 1.2 Move or adapt localized content in `src/data/profile.js` so every marker owns at least one left/right page pair; verify both PT and EN render all marker labels and page content.
- [x] 1.3 Represent project-domain content as one or more ordered page pairs per marker; verify every project pair provides description/metadata on the left and image/demo/deploy content on the right.
- [x] 1.4 Preserve or adapt project data in `src/data/projects.js` for pair generation without breaking existing project links/assets; verify each referenced project renders from its existing data.

## 2. Page-Pair Generation

- [x] 2.1 Refactor `src/utils/buildNotebookPages.js` to generate page pairs from the marker registry rather than category filtering; verify generated spreads retain owning `markerId`, pair ID, left leaf, and right leaf.
- [x] 2.2 Flatten marker `pagePairs` in registry order for the global notebook sequence; verify a marker with two pairs yields consecutive spreads before the following marker begins.
- [x] 2.3 Update `getPageSectionCounts` or equivalent helpers to count generated pairs by marker ID; verify counts reflect a configurable number of pairs.
- [x] 2.4 Create or adapt page components for marker and project-pair content; verify every configured pair renders without React errors.

## 3. Side-Aware Tabs and Navigation

- [x] 3.1 Refactor `NarrativeNotebook.jsx` to receive the marker registry and derive left/right tab groups from each marker's `side`; verify the default layout renders only Sobre Mim, Carreira, Estudos, Projetos, and Contato on the left and the four project-domain markers on the right.
- [x] 3.2 Keep right-side tabs permanently visible and remove category-filter conditional rendering; verify all four right tabs remain visible while viewing every marker.
- [x] 3.3 Update direct marker selection so either side's tab navigates to its first owned page pair; verify a right-tab click reaches the first pair of its marker without changing global ordering.
- [x] 3.4 Update corner-arrow navigation to move one flattened page pair at a time with valid first/last bounds; verify it traverses every pair within a marker before the next marker.
- [x] 3.5 Derive active state from the current pair's owning marker; verify a current right-side pair activates Projetos plus exactly its matching right tab, and any left-side pair activates only its own tab.
- [x] 3.6 Reconcile pending page-turn/tab anchoring state using marker ownership; verify tab state remains correct during forward, backward, and reduced-motion transitions.

## 4. Component and Application Integration

- [x] 4.1 Update `NotebookTab.jsx` accessibility state so single and dual active tabs expose correct labels and selected/current semantics; verify keyboard focus still expands inactive tabs without changing selection.
- [x] 4.2 Update `App.jsx` to pass the marker registry and generated page pairs; remove `activeCategory`, category filtering callbacks, and duplicate side/order configuration; verify no category-filter props remain.
- [x] 4.3 Remove or repurpose `ProjectsSection.jsx` only after its filtering responsibilities are replaced; verify there are no unused imports or runtime module errors.
- [x] 4.4 Remove obsolete category-filter constants/helpers only when no longer referenced; verify repository search finds no stale `activeCategory` or filter-navigation logic.

## 5. Verification

- [x] 5.5 Run `npm run build`; verify the production build completes without errors.

## Workflow follow-up

- Archive the change after implementation is complete and verified.
- Verify the archived result.