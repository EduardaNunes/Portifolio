# Tasks

## 1. Create blocks directory and barrel file

- [x] 1.1 Create `src/components/notebook-content/blocks/` directory
- [x] 1.2 Create `src/components/notebook-content/blocks/index.js` barrel file exporting all block components (initially empty)

## 2. Extract LinkIcon component

- [x] 2.1 Create `src/components/notebook-content/blocks/LinkIcon.jsx` with the LinkIcon component and LINK_ICON_PATHS constant
- [x] 2.2 Verify: Component renders correct SVG for github, linkedin, email, external types

## 3. Extract BlocksBlock component

- [x] 3.1 Create `src/components/notebook-content/blocks/BlocksBlock.jsx` with component logic
- [x] 3.2 Create `src/components/notebook-content/blocks/BlocksBlock.module.css` with styles for `.page-field`, `.field-label`, `.field-value`, `.page-chip` (extracted from global index.css)
- [x] 3.3 Verify: Renders label and chips correctly for items array; renders only label for empty items

## 4. Extract TextBlock component

- [x] 4.1 Create `src/components/notebook-content/blocks/TextBlock.jsx` with component logic
- [x] 4.2 Create `src/components/notebook-content/blocks/TextBlock.module.css` with styles for `.page-note`, `.note-title`, `.page-actions`, `.page-action` (extracted from global index.css)
- [x] 4.3 Verify: Renders title, text, and optional link; no action section when link absent

## 5. Extract PositionsBlock component

- [x] 5.1 Create `src/components/notebook-content/blocks/PositionsBlock.jsx` with component logic (including local `formatDates` function)
- [x] 5.2 Create `src/components/notebook-content/blocks/PositionsBlock.module.css` with styles for `.positions-list`, `.position-item`, `.position-title`, `.position-meta`, `.position-company`, `.position-dates`, `.position-desc`, `.field-value` (extracted from global index.css)
- [x] 5.3 Verify: Renders position entries with formatted dates; handles current position (no toDate) with localized label

## 6. Extract EmailBlock component

- [x] 6.1 Create `src/components/notebook-content/blocks/EmailBlock.jsx` with component logic
- [x] 6.2 Create `src/components/notebook-content/blocks/EmailBlock.module.css` with styles for `.email-block`, `.contact-email`, `.contact-actions`, `.contact-btn`, `.page-action` (extracted from global index.css)
- [x] 6.3 Verify: Renders email and mailto button with localized message label

## 7. Extract LinksBlock component

- [x] 7.1 Create `src/components/notebook-content/blocks/LinksBlock.jsx` with component logic (imports LinkIcon)
- [x] 7.2 Create `src/components/notebook-content/blocks/LinksBlock.module.css` with styles for `.social-links-section`, `.social-link-row`, `.social-link-field`, `.social-link`, `.page-field`, `.page-action` (extracted from global index.css)
- [x] 7.3 Verify: Renders social links with correct icons; external links open in new tab; mailto links don't

## 8. Extract ListBlock component

- [x] 8.1 Create `src/components/notebook-content/blocks/ListBlock.jsx` with component logic
- [x] 8.2 Create `src/components/notebook-content/blocks/ListBlock.module.css` with styles for `.page-list`, `.page-list-item`, `.page-marker`, `.is-done`, `.list-body`, `.list-detail`, `.sr-only` (extracted from global index.css)
- [x] 8.3 Verify: Renders simple strings, objects with detail, and checklist items with correct markers

## 9. Extract ProjectDemoBlock component

- [x] 9.1 Create `src/components/notebook-content/blocks/ProjectDemoBlock.jsx` with component logic (imports Thumbnail, LinkIcon, resolveAssetPath)
- [x] 9.2 Create `src/components/notebook-content/blocks/ProjectDemoBlock.module.css` with styles for `.project-demo-block`, `.demo-showcase-section`, `.video-demo-entry`, `.project-deploy-btn`, `.page-action`, `.thumbnail-caption`, `.no-thumbnail-placeholder` (extracted from global index.css)
- [x] 9.3 Verify: Renders video demos vertically with deploy buttons; falls back to legacy images; shows placeholder when no media

## 10. Extract ProjectRepoBlock component

- [x] 10.1 Create `src/components/notebook-content/blocks/ProjectRepoBlock.jsx` with component logic (imports ProjectButton)
- [x] 10.2 Verify: Renders ProjectButton with first item's data; returns null for empty items

## 11. Update barrel file and blockRenderers registry

- [x] 11.1 Update `src/components/notebook-content/blocks/index.js` to export all 9 block components + LinkIcon
- [x] 11.2 Update `src/components/notebook-content/blockRenderers.jsx` to import from `./blocks` and re-export all named exports + default BlockRenderer
- [x] 11.3 Verify: All existing imports from `blockRenderers` still work (build passes)

## 12. Update dependent components

- [x] 12.1 Update `src/components/notebook-content/ProjectButton.jsx` to import `LinkIcon` from `./blocks/LinkIcon`
- [x] 12.2 Update `src/components/notebook-content/Thumbnail.jsx` to import `LinkIcon` from `./blocks/LinkIcon`
- [x] 12.3 Verify: ProjectButton and Thumbnail render correctly with icons

## 13. Remove block styles from global CSS

- [x] 13.1 Identify all block-specific class selectors in `src/styles/index.css` (search for: .page-field, .page-chip, .page-note, .note-title, .page-actions, .page-action, .positions-list, .position-item, .position-title, .position-meta, .position-company, .position-dates, .position-desc, .social-links-section, .social-link-row, .social-link-field, .social-link, .contact-email, .contact-actions, .contact-btn, .project-demo-block, .demo-showcase-section, .video-demo-entry, .project-deploy-btn, .project-repo-btn, .page-list, .page-list-item, .page-marker, .is-done, .list-body, .list-detail, .thumbnail-caption, .no-thumbnail-placeholder)
- [x] 13.2 Verify each class is ONLY used by block components (grep across codebase)
- [x] 13.3 Remove confirmed block-specific styles from `src/styles/index.css` (approximately lines 1372-1821)
- [x] 13.4 Verify: All notebook spreads render correctly in both dark/light themes and pt/eng locales

## 14. Integration verification

- [x] 14.1 Start dev server and navigate through all notebook spreads (About Me, Career, Studies, Projects, Contact)
- [x] 14.2 Verify each block type renders correctly: BlocksBlock, TextBlock, PositionsBlock, EmailBlock, LinksBlock, ListBlock, ProjectDemoBlock, ProjectRepoBlock
- [x] 14.3 Verify dark/light theme switching works
- [x] 14.4 Verify pt/eng locale switching works
- [x] 14.5 Run build command to ensure no compilation errors
- [x] 14.6 Run any existing tests to ensure no regressions

## Workflow follow-up

- Archive the change after implementation is complete and verified.