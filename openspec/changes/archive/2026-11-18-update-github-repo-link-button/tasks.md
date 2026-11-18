# Tasks

## 1. Translations Update

- [x] 1.1 Add `viewRepository` key to `src/data/translations.js` for both PT ("Ver Repositório") and EN ("View Repository") locales. Verify by checking the file contains the new keys.
- [x] 1.2 Update `src/utils/buildNotebookPages.js` in the `projectPair` function to use `labels.viewRepository` instead of `labels.viewSource` for the GitHub repository link. Verify by checking the file uses the new translation key.
- [x] 1.3 Add `viewDeploy` key to `src/data/translations.js` for both PT ("Ver Deploy") and EN ("View Deploy") locales. Verify by checking the file contains the new keys.
- [x] 1.4 Remove `demo` key from `src/data/translations.js` for both PT ("Ver demo") and EN ("View demo") locales. Verify by checking the file no longer contains the key.

## 2. Component Modification

- [x] 2.1 Modify `LinksBlock` component in `src/components/notebook-content/blockRenderers.jsx` to accept a `variant` prop. When `variant === 'project-repo'`, render a single full-width button with GitHub icon and text centered (instead of the current icon+label + separate arrow link structure). Verify by inspecting the component code.
- [x] 2.2 Update the `projectPair` function in `src/utils/buildNotebookPages.js` to pass `variant: 'project-repo'` to the links block for the repository link. Verify by checking the file passes the variant prop.
- [x] 2.3 Modify `ProjectDemoBlock` component in `src/components/notebook-content/blockRenderers.jsx` to render the deploy button below the thumbnail as a full-width button with external link icon and "Ver Deploy" text centered (instead of absolute-positioned top-right with arrow). Verify by inspecting the component code.
- [x] 2.4 Remove `labels.demo` usage in `ProjectDemoBlock` component (the "Ver Demo" label for the thumbnail caption field). Verify by inspecting the component code.

## 3. Styling Implementation

- [x] 3.1 Add `.project-repo-btn` CSS class in `src/styles/index.css` that extends `.page-action` with:
  - Full width (`width: 100%`)
  - Centered content (`justify-content: center`)
  - Theme-specific hover backgrounds: dark theme uses `--notebook-highlight-color` (orange), light theme uses `--paper-accent` (blue)
  - White text and icons on hover for both themes
  - Maintained 2px border
  Verify by checking the CSS file contains the new styles.
- [x] 3.2 Ensure the `.project-repo-btn` hover styles properly override the base `.page-action:hover` styles for theme-specific colors. Verify by checking CSS specificity and cascade order.
- [x] 3.3 Fix overflow issue: Add `box-sizing: border-box` to `.project-repo-btn` to ensure `width: 100%` includes padding and border. Verify button doesn't overflow horizontally.
- [x] 3.4 Add `.project-deploy-btn` CSS class in `src/styles/index.css` that extends `.page-action` with:
  - Full width (`width: 100%`)
  - Centered content (`justify-content: center`)
  - Theme-specific hover backgrounds: dark theme uses `--notebook-highlight-color` (orange), light theme uses `--paper-accent` (blue)
  - White text and icons on hover for both themes
  - Maintained 2px border
  - Border behavior: dark theme always orange, light theme blue (changes on hover)
  Verify by checking the CSS file contains the new styles.
- [x] 3.5 Ensure the `.project-deploy-btn` hover styles properly override the base `.page-action:hover` styles for theme-specific colors. Verify by checking CSS specificity and cascade order.
- [x] 3.6 Fix overflow issue: Add `box-sizing: border-box` to `.project-deploy-btn` to ensure `width: 100%` includes padding and border. Verify button doesn't overflow horizontally.

## 4. Verification

- [x] 4.1 Test in dark theme: Navigate to a project spread, hover over the "Ver Repositório" button, verify background becomes orange (`#d87f0b`), text and icon become white, border remains visible.
- [x] 4.2 Test in light theme: Switch to light mode, navigate to a project spread, hover over the "View Repository" button, verify background becomes blue (`#145053`), text and icon become white, border remains visible.
- [x] 4.3 Test responsive: Verify button is full-width on different viewport sizes.
- [x] 4.4 Test contact spread unaffected: Verify LinkedIn, GitHub, and email links in Contact spread still render with original style (icon + label + arrow).
- [x] 4.5 Test keyboard accessibility: Verify button is focusable and shows focus outline.
- [x] 4.6 Test link functionality: Click the button, verify it opens the GitHub repository in a new tab.
- [x] 4.7 Test deploy button in dark theme: Navigate to a project spread, hover over the "Ver Deploy" button below thumbnail, verify background becomes orange (`#d87f0b`), text and icon become white, border remains orange.
- [x] 4.8 Test deploy button in light theme: Switch to light mode, navigate to a project spread, hover over the "View Deploy" button below thumbnail, verify background becomes blue (`#145053`), text and icon become white, border becomes blue.
- [x] 4.9 Test deploy button position: Verify deploy button is positioned below the thumbnail (not absolute top-right).
- [x] 4.10 Test deploy button link functionality: Click the button, verify it opens the deployed project in a new tab.
- [x] 4.11 Test "Ver Demo" removal: Navigate to a project spread, verify the thumbnail caption displays without any "Ver Demo" or "View demo" label text.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.