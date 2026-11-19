# Tasks

## 1. Fix Video Autoplay (Independent Quick Fix)

- [x] 1.1 Add `autoPlay` attribute to `<video>` element in `src/components/notebook-content/Thumbnail.jsx`
- [x] 1.2 Verify: Videos in project demos play automatically (muted, looping) in browser

## 2. Create New Folder Structure

- [x] 2.1 Create 11 component directories under `src/components/notebook-content/`:
  - `LinkIcon/`, `BlocksBlock/`, `TextBlock/`, `PositionsBlock/`, `EmailBlock/`, `LinksBlock/`, `ListBlock/`, `ProjectDemoBlock/`, `ProjectRepoBlock/`, `ProjectButton/`, `Thumbnail/`
- [x] 2.2 Move `src/components/notebook-content/blocks/LinkIcon.jsx` → `src/components/notebook-content/LinkIcon/LinkIcon.jsx`
- [x] 2.3 Move `src/components/notebook-content/blocks/BlocksBlock.jsx` + `BlocksBlock.module.css` → `src/components/notebook-content/BlocksBlock/`
- [x] 2.4 Move `src/components/notebook-content/blocks/TextBlock.jsx` + `TextBlock.module.css` → `src/components/notebook-content/TextBlock/`
- [x] 2.5 Move `src/components/notebook-content/blocks/PositionsBlock.jsx` + `PositionsBlock.module.css` → `src/components/notebook-content/PositionsBlock/`
- [x] 2.6 Move `src/components/notebook-content/blocks/EmailBlock.jsx` + `EmailBlock.module.css` → `src/components/notebook-content/EmailBlock/`
- [x] 2.7 Move `src/components/notebook-content/blocks/LinksBlock.jsx` + `LinksBlock.module.css` → `src/components/notebook-content/LinksBlock/`
- [x] 2.8 Move `src/components/notebook-content/blocks/ListBlock.jsx` + `ListBlock.module.css` → `src/components/notebook-content/ListBlock/`
- [x] 2.9 Move `src/components/notebook-content/blocks/ProjectDemoBlock.jsx` + `ProjectDemoBlock.module.css` → `src/components/notebook-content/ProjectDemoBlock/`
- [x] 2.10 Move `src/components/notebook-content/blocks/ProjectRepoBlock.jsx` → `src/components/notebook-content/ProjectRepoBlock/ProjectRepoBlock.jsx`
- [x] 2.11 Move `src/components/notebook-content/ProjectButton.jsx` → `src/components/notebook-content/ProjectButton/ProjectButton.jsx`
- [x] 2.12 Move `src/components/notebook-content/Thumbnail.jsx` → `src/components/notebook-content/Thumbnail/Thumbnail.jsx`

## 3. Create CSS Modules for ProjectButton and Thumbnail

- [x] 3.1 Create `src/components/notebook-content/ProjectButton/ProjectButton.module.css` with styles extracted from global `index.css` (`.project-repo-btn` base, hover, focus, lightmode overrides)
- [x] 3.2 Create `src/components/notebook-content/Thumbnail/Thumbnail.module.css` with styles extracted from global `index.css` (`.thumbnail-container`, `.thumbnail-frame`, `.thumbnail-media`, `.play-overlay`, `.play-icon`, `.play-text`, `.thumbnail-caption`)
- [x] 3.3 Update `ProjectButton.jsx` to import styles from `./ProjectButton.module.css` and use CSS module class names
- [x] 3.4 Update `Thumbnail.jsx` to import styles from `./Thumbnail.module.css` and use CSS module class names

## 4. Update Import Paths

- [x] 4.1 Update `src/components/notebook-content/blockRenderers.jsx` to import all components from new paths (e.g., `'./BlocksBlock/BlocksBlock'`, `'./LinkIcon/LinkIcon'`, etc.)
- [x] 4.2 Update `src/components/notebook-content/LinksBlock/LinksBlock.jsx` to import `LinkIcon` from `'../LinkIcon/LinkIcon'`
- [x] 4.3 Update `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.jsx` to import `Thumbnail` from `'../Thumbnail/Thumbnail'` and `LinkIcon` from `'../LinkIcon/LinkIcon'`
- [x] 4.4 Update `src/components/notebook-content/ProjectRepoBlock/ProjectRepoBlock.jsx` to import `ProjectButton` from `'../ProjectButton/ProjectButton'`

## 5. Remove Styles from Global CSS

- [x] 5.1 Identify and verify Thumbnail styles in `src/styles/index.css` (search for: `.thumbnail-container`, `.thumbnail-frame`, `.thumbnail-media`, `.play-overlay`, `.play-icon`, `.play-text`, `.thumbnail-caption`)
- [x] 5.2 Identify and verify ProjectButton styles in `src/styles/index.css` (search for: `.project-repo-btn` - base, hover, focus, lightmode overrides)
- [x] 5.3 Confirm each class is ONLY used by Thumbnail or ProjectButton (grep across codebase)
- [x] 5.4 Remove confirmed Thumbnail and ProjectButton styles from `src/styles/index.css`

## 6. Clean Up Old Structure

- [x] 6.1 Delete `src/components/notebook-content/blocks/` directory (now empty)
- [x] 6.2 Verify no remaining references to old `blocks/` paths in codebase

## 7. Integration Verification

- [x] 7.1 Run `npm run build` - verify no compilation errors
- [x] 7.2 Start dev server and navigate through all notebook spreads (About Me, Career, Studies, Projects, Contact)
- [x] 7.3 Verify each block type renders correctly: BlocksBlock, TextBlock, PositionsBlock, EmailBlock, LinksBlock, ListBlock, ProjectDemoBlock, ProjectRepoBlock
- [x] 7.4 Verify video demos play automatically (muted, looping) in project spreads
- [x] 7.5 Verify dark/light theme switching works for all components
- [x] 7.6 Verify pt/eng locale switching works
- [x] 7.7 Run any existing tests to ensure no regressions

## Workflow follow-up

- Archive the change after implementation is complete and verified.