# Tasks

## 1. Create New Components

- [x] 1.1 Create `src/components/notebook-content/Thumbnail.jsx` with Thumbnail component accepting `{ src, alt, caption, video }` props, rendering image/video with play overlay and caption, using existing CSS classes. Verify: component renders correctly in isolation with sample props.
- [x] 1.2 Create `src/components/notebook-content/ProjectButton.jsx` with ProjectButton component accepting `{ icon, text, link }` props, rendering styled anchor with icon, text, and proper target/rel for external vs mailto links, using existing `LinkIcon` and `.project-repo-btn` CSS. Verify: component renders GitHub icon, "Ver Repositório" text, and correct href/target for sample props.
- [x] 1.3 Export both components from `src/components/notebook-content/index.js` (or update imports accordingly). Verify: imports work in other files.

## 2. Update ProjectDemoBlock to Use Thumbnail

- [x] 2.1 Import `Thumbnail` in `src/components/notebook-content/blockRenderers.jsx`. Verify: import succeeds.
- [x] 2.2 Refactor `ProjectDemoBlock` to use `<Thumbnail src={image.src} alt={image.alt} caption={image.caption} video={image.video} />` instead of inline image/video rendering. Verify: project demo still displays image, video, caption, and play overlay correctly in notebook.
- [x] 2.3 Remove unused inline rendering code from `ProjectDemoBlock`. Verify: no dead code remains; component still passes existing tests.

## 3. Add ProjectRepoBlock Renderer and Update LinksBlock

- [x] 3.1 Add `ProjectRepoBlock` in `blockRenderers.jsx` that renders `ProjectButton` with props from block data (`icon`, `text` from labels, `link`). Verify: block renders ProjectButton correctly when given test block data.
- [x] 3.2 Register `projectRepo` in `RENDERERS` object in `blockRenderers.jsx`. Verify: BlockRenderer routes `type: 'projectRepo'` to ProjectRepoBlock.
- [x] 3.3 Remove `project-repo` variant handling from `LinksBlock` (lines 112-128). Verify: LinksBlock no longer has special case for project-repo; social links still work.
- [x] 3.4 Update `blockRenderers.jsx` imports to include `ProjectButton`. Verify: no circular dependencies; build succeeds.

## 4. Extend Layout with Category Page Definitions

- [x] 4.1 Add `ai-automation`, `games`, `webdev`, `backend` entries to `notebookLayout` in `src/content/layout.js`, each with `pages` array referencing project ids and left-leaf section ids. Verify: layout structure matches design; all current projects are referenced.
- [x] 4.2 Ensure each category's page order matches the project order in content JSON. Verify: layout page order equals content project order for each category.

## 5. Update buildNotebookPages.js to Use Layout for Categories

- [x] 5.1 Add `resolveCategoryPairs(categoryId, categoryContent, categoryLayout, labels)` function that resolves page pairs from layout (mirrors `resolveNarrativePairs` pattern). Verify: function returns correct page pair objects for a test category.
- [x] 5.2 In `buildNotebookPages`, replace the `meta.kind === 'category'` branch to call `resolveCategoryPairs` instead of auto-generating via `projectPair`/`emptyCategoryPair`. Verify: category markers produce page pairs from layout.
- [x] 5.3 Update `projectPair` (or inline logic) to use `projectRepo` block type for repository links instead of `links` variant `project-repo`. Verify: left leaf renders ProjectButton for repo link.
- [x] 5.4 Remove or deprecate `projectPair`, `overviewPair`, `emptyCategoryPair` if no longer used (overviewPair still used for Projects marker). Verify: no dead code; Projects overview still works.
- [x] 5.5 Ensure `overviewPair` for Projects marker still works unchanged. Verify: Projects overview renders correctly.

## 6. Extend Content Validation

- [x] 6.1 Update `src/scripts/validate-content.mjs` to validate: every category marker has a layout entry in `notebookLayout`. Verify: validation fails when a category layout is missing.
- [x] 6.2 Add validation: every project in category content is referenced by the category's layout. Verify: validation fails when a project is missing from layout.
- [x] 6.3 Add validation: every `projectId` in layout exists in content. Verify: validation fails when layout references unknown project.
- [x] 6.4 Add validation: every `section` id in layout exists in the project's sections. Verify: validation fails when layout references unknown section.
- [x] 6.5 Run validation script (`node src/scripts/validate-content.mjs`) and confirm it passes with current content and layout. Verify: exit code 0, no errors.

## 7. Integration Testing and Verification

- [x] 7.1 Start dev server (`npm run dev`) and manually verify: all narrative markers (About Me, Career, Studies, Contact) still work correctly. Verify: no regressions in narrative content.
- [x] 7.2 Verify: Projects overview renders correctly with category summary and thumbnail. Verify: visual match to current behavior.
- [x] 7.3 Verify: Each category tab (IA e Automações, Jogos, WebDev, BackEnd) navigates to its first project page pair. Verify: tab selection works; correct project content shown.
- [x] 7.4 Verify: Corner navigation traverses all project page pairs in layout order across categories, then continues to Contact. Verify: global navigation sequence correct.
- [x] 7.5 Verify: Dual-active tab state - when a category project is current, both Projects left tab and category right tab are active/expanded. Verify: visual state matches spec.
- [x] 7.6 Verify: Project left leaf shows title, description, tech stack, and ProjectButton (VER REPOSITÓRIO) with GitHub icon. Verify: button renders, links to correct repo, opens in new tab.
- [x] 7.7 Verify: Project right leaf shows Thumbnail (image/video with caption, play overlay for images) and deploy link (if present). Verify: media displays correctly; deploy link works.
- [x] 7.8 Verify: Empty category (if any) shows appropriate empty state. Verify: no crashes; localized empty message shown.
- [x] 7.9 Test both languages (PT/EN) - switch language and verify all project content, button text, and placeholders are localized. Verify: no hardcoded strings; all text from content/translations.
- [x] 7.10 Test both themes (dark/light) - toggle theme and verify Thumbnail, ProjectButton, and all project pages use correct colors. Verify: CSS variables applied correctly; no hardcoded colors.
- [x] 7.11 Run production build (`npm run build`) and verify no errors. Verify: build succeeds; dist folder generated.

## Workflow follow-up

- Archive the change after implementation is complete and verified.
- Verify the archived result.