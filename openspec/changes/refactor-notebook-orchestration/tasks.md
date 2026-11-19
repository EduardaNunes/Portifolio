# Tasks

## 1. Remove dead code

- [ ] 1.1 Delete the unused `overviewPair` function and the unused `getPageSectionCounts` export from `src/utils/buildNotebookPages.js`; verify with a project-wide search that neither name is referenced anywhere and that `npm test` passes.

## 2. Consolidate deploy-entry construction

- [ ] 2.1 Extract a single helper in `src/utils/buildNotebookPages.js` that returns `{ deployLink, deployHoverText }` (or `null`) and apply it to all four current call sites, preserving the label chain `buttonLabel ?? viewDeploy ?? deploy ?? 'Deploy'` and `previewOnly ?? 'Apenas Visualização :)'`; verify the ProgramADA demo leaf still renders both thumbnails in the same order with the same hover texts in both locales.
- [ ] 2.2 Verify the build entries for a project with `videoDemos`, a project with a legacy `deployLink`, and a project with images but no link each produce the same objects as before the refactor (compare by logging the built demo blocks once before and once after).

## 3. Make the projects-marker rule explicit

- [ ] 3.1 In `src/components/narrative-notebook-component/NarrativeNotebook.jsx`, replace the string literals `'projects'` and `'ai-automation'` with named module constants used by every comparison; verify no raw literal for those ids remains in the file.
- [ ] 3.2 Replace `shouldSkipProjects()` — whose body ends in an always-true expression — with an explicitly named predicate declared above `goToSpread`, and document in one line that navigating away from the projects marker skips it; verify the file has no read-before-declaration reference and that `npm test` passes.
- [ ] 3.3 Verify navigation behavior is unchanged: from every marker, move forward and backward through the whole notebook and confirm the projects marker is still skipped and that selecting it still lands on the first `ai-automation` spread.

## 4. Update documentation

- [ ] 4.1 Update `README.md` so the project and notebook sections describe the current interaction — thumbnails are clickable and show a hover overlay with the deploy action, and there is no separate deploy button; verify no README paragraph still describes deploy buttons or a `blocks/` directory.
- [ ] 4.2 Verify the README's described component layout matches the folders actually present under `src/components/notebook-content/`.

## 5. Integration verification

- [ ] 5.1 Verify `npm run build` and `npm test` pass.
- [ ] 5.2 Verify the notebook renders identical content before and after by comparing the generated spread ids and marker order against the pre-refactor build, and by walking every marker in both themes.

## Workflow follow-up

- Archive the change once review is complete (it declares `skip_specs: true`, so no main spec changes).
