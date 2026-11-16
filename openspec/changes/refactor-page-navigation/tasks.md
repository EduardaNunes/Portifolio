# Tasks

## 1. Data & Content Updates

- [ ] 1.1 Add right-side section content to `src/data/profile.js` (PT and EN) - verify by checking profileData structure has `aiAutomation`, `games`, `webdev`, `backend` objects with `heading`, `left`, `right` content for each language
- [ ] 1.2 Update `src/data/projects.js` if needed - verify project data can be referenced by new right-side sections (no breaking changes to existing project structure)

## 2. Spread Generation Refactor

- [ ] 2.1 Rewrite `src/utils/buildNotebookPages.js` to generate fixed 9-spread array with section IDs: `about`, `career`, `studies`, `projects`, `ai-automation`, `games`, `webdev`, `backend`, `contact` - verify by console.log output showing 9 spreads with correct section IDs
- [ ] 2.2 Create/import page components for right-side sections in `buildNotebookPages.js` - verify all 9 spreads render without errors
- [ ] 2.3 Update `getPageSectionCounts` if needed - verify it returns counts for all 9 sections

## 3. Page Components for Right-Side Sections

- [ ] 3.1 Create `src/components/narrative-notebook-component/AiAutomationPage.jsx` (left/right variants or single with side prop) - verify component renders with correct content from profileData
- [ ] 3.2 Create `src/components/narrative-notebook-component/GamesPage.jsx` - verify component renders with correct content
- [ ] 3.3 Create `src/components/narrative-notebook-component/WebDevPage.jsx` - verify component renders with correct content
- [ ] 3.4 Create `src/components/narrative-notebook-component/BackEndPage.jsx` - verify component renders with correct content
- [ ] 3.5 Update `src/components/narrative-notebook-component/ProjectsSection.jsx` or create new `ProjectsOverviewPage.jsx` for Projetos spread content - verify Projetos spread shows category overview + featured projects

## 4. Navigation & Tab Logic Refactor (NarrativeNotebook.jsx)

- [ ] 4.1 Replace `currentSpread`/`goToSpread` logic with fixed 0-8 index mapping - verify `goToSpread(index)` clamps to 0-8 and navigation works
- [ ] 4.2 Implement dual active state: track `activeLeftSection` and `activeRightSection` - verify when on right-side spread, both "Projetos" left tab AND right tab are active
- [ ] 4.3 Render right-side tabs permanently (not conditional on `isProjects`) - verify 4 right tabs visible on ALL spreads
- [ ] 4.4 Update `handleMarkerClick` for left tabs (9 sections) - verify clicking any left tab navigates to correct spread
- [ ] 4.5 Add right tab click handlers - verify clicking right tab navigates to correct spread (index 4-7) and sets dual active state
- [ ] 4.6 Update arrow navigation (corner zones) to use fixed 0-8 sequence - verify left/right arrows move through all 9 spreads sequentially
- [ ] 4.7 Remove `activeCategory` prop and related category filtering logic - verify no references to `activeCategory` or `onCategorySelect` remain
- [ ] 4.8 Update `effectiveSection` logic for tab anchoring during turns - verify tabs update correctly during page turns
- [ ] 4.9 Remove `ProjectsSection` component usage from render - verify right tabs render directly in NotebookTab

## 5. NotebookTab Component Updates

- [ ] 5.1 Add `dualActive` prop to `NotebookTab` for right-side tabs - verify right tab shows active styling when `dualActive=true`
- [ ] 5.2 Ensure left "Projetos" tab can be active simultaneously with right tab - verify both show expanded/active state together
- [ ] 5.3 Verify hover/focus behavior still works correctly with dual active state - verify non-active tabs expand on hover/focus

## 6. App.jsx Integration

- [ ] 6.1 Update `sections` array to 9 sections with correct IDs and labels - verify all 9 left tabs render with correct labels
- [ ] 6.2 Remove `categories` array and `activeCategory` state - verify no category filtering code remains
- [ ] 6.3 Remove `onCategorySelect` handler - verify Notebook receives only `sections` and `spreads` props
- [ ] 6.4 Pass new `spreads` from `buildNotebookPages` (no longer needs `activeCategory`) - verify spreads generated correctly

## 7. Cleanup & Verification

- [ ] 7.1 Remove unused `ProjectsSection.jsx` if fully replaced - verify no import errors
- [ ] 7.2 Remove unused category-related constants from `src/data/projects.js` (`CATEGORIES`, `CATEGORY_META` in App.jsx) - verify no dead code
- [ ] 7.3 Test full navigation flow: arrows, left tabs, right tabs, direct spread access - verify all 9 spreads accessible and dual active state works
- [ ] 7.4 Test reduced motion preference - verify page turns work without animation
- [ ] 7.5 Test theme toggle (light/dark) - verify tab icons and cover colors still work
- [ ] 7.6 Test language toggle (PT/EN) - verify all 9 sections show correct localized labels
- [ ] 7.7 Run build (`npm run build`) - verify no TypeScript/ESLint errors and production build succeeds

## Workflow follow-up

- Archive the change after implementation is complete and verified
- Verify the archived result