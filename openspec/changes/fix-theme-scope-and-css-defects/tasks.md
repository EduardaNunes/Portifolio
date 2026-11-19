# Tasks

## 1. Fix CSS Module theme scoping

- [ ] 1.1 In `src/components/notebook-content/ProjectButton/ProjectButton.module.css`, change the six `.lightmode .repoBtn…` selectors to start with `:global(.lightmode) .repoBtn`; verify no bare `.lightmode` selector remains with `Get-ChildItem -Recurse src -Filter *.css | Select-String -Pattern '(?<!:global\()\.lightmode'` returning only `src/styles/index.css` matches.
- [ ] 1.2 Apply the same change in `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.module.css`; verify with the same command that no module still scopes `.lightmode` locally.
- [ ] 1.3 Visually confirm the fix: with a project leaf open, toggle the theme and check that the repository button hover uses `--paper-accent` in light mode and the notebook highlight color in dark mode.

## 2. Remove dead CSS Module classes

- [ ] 2.1 In `ProjectDemoBlock.module.css`, delete the now-unused deploy-button rules (`.projectDeployBtn` and its hover descendants) and `.thumbnailCaption`; verify each name is absent from `ProjectDemoBlock.jsx` and from `src/**/*.test.*` first, then confirm `npm run build` succeeds.
- [ ] 2.2 Delete `LinksBlock.module.css` → `.icon` and `ListBlock.module.css` → `.srOnly` after confirming the components use the global `icon` / `srOnly` classes instead; verify no `styles.icon` or `styles.srOnly` reference remains in those components.
- [ ] 2.3 Delete `Thumbnail.module.css` → `.playIcon`, `.playText`, `.videoDemoEntry` and the `.videoDemoEntry .container` rule after confirming the component never applies them; verify `Select-String -Path src/components/notebook-content/Thumbnail/Thumbnail.jsx -Pattern 'playIcon|playText|videoDemoEntry'` returns nothing.

## 3. Remove dead global selectors

- [ ] 3.1 Remove the legacy block-component rules in `src/styles/index.css` that target pre-modularization markup — the `.notebook-leaf .skill-item`, `.notebook-leaf .position-company`, `.video-demo-entry`, `.tech-tags-container`, `.tech-tag`, `.social-links-section`, `.social-link`, `.contact-btn`, `.project-left-page` and `.academic-project-item` groups; before each deletion, verify the class name appears nowhere in `src/**/*.jsx` and `src/**/*.js`.
- [ ] 3.2 Audit the remaining `.notebook-leaf …` descendant selectors, keeping only those whose target class is still emitted by a component; verify the survivors by grepping each class name in `src/components/`.
- [ ] 3.3 Verify `npm run build` and `npm test` pass after the removals, and visually spot-check the notebook leaves in both themes.

## 4. Fix invalid declarations

- [ ] 4.1 Correct the twelve declarations that end in `.` instead of `;` — the `justify-content`, `animation: float`, three `transition`, `box-shadow`, three more `animation`, two `left` and two `opacity` lines in `src/styles/index.css`; re-locate each with `Get-ChildItem src/styles/index.css | Select-String -Pattern '\.\s*$'` rather than trusting the original line numbers, since task 3 shifts them.
- [ ] 4.2 Verify no match remains with `Get-ChildItem src/styles/index.css | Select-String -Pattern '\.\s*$'`, and confirm the affected rules now reach the built stylesheet by grepping the `dist` CSS output for `animation: float` and `justify-content: space-evenly`.

## 5. Consolidate the duplicated media query

- [ ] 5.1 Compare the two `@media (max-width: 600px)` blocks in `src/styles/index.css` (originally around lines 1190–1221 and 1374–1405) and merge them into one, keeping the later declaration whenever both set the same property on the same selector; verify only one `@media (max-width: 600px)` remains.
- [ ] 5.2 Verify the layout at 600px and below is unchanged by checking the notebook leaves, the position meta row and the deploy controls in a narrow viewport.

## 6. Align the documented palette

- [ ] 6.1 Update the `### Color policy` section of `README.md` so every custom property defined in `src/styles/index.css` (`:root` and `.lightmode`) is listed with its current value and semantic role; verify no token defined in the stylesheet is missing from the README, and no README entry points to a value the stylesheet no longer uses.
- [ ] 6.2 Verify the README section still states that new interface colors require an explicit palette update, matching `site-color-palette` → `Documented approved color palette`.

## 7. Integration verification

- [ ] 7.1 Verify `npm run build` and `npm test` pass with no new warnings about invalid CSS.
- [ ] 7.2 Verify both themes at desktop and ≤600px widths: repository buttons, thumbnail deploy overlays, position meta spacing and the notebook leaves match `site-color-palette` and `layout/position-meta`.

## Workflow follow-up

- Archive the change once review is complete, then re-run `openspec validate --all`.
