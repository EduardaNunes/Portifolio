# Tasks

## 1. Content & i18n

- [x] 1.1 Add hover text keys to `src/data/translations.js` (pt notebook section):
  - `previewOnly: "Apenas Visualização :)"` (viewDeploy already exists)
  - Verify: JSON parses, keys present

- [x] 1.2 Add hover text keys to `src/data/translations.js` (eng notebook section):
  - `previewOnly: "Preview Only :)"` (viewDeploy already exists)
  - Verify: JSON parses, keys present

## 2. Thumbnail Component - Core Modifications

- [x] 2.1 Update `Thumbnail.jsx` to accept new props:
  - `deployLink?: string` - URL to navigate on click
  - `deployHoverText?: string` - Text for hover overlay (from i18n)
  - `isPreviewOnly?: boolean` - True when no deploy link
  - Verify: Component accepts props without errors

- [x] 2.2 Wrap frame container in `<a>` tag when `deployLink` provided:
  - `href={deployLink}`, `target="_blank"`, `rel="noopener noreferrer"`
  - Add `aria-label` with hover text
  - When no deployLink, render as current (div)
  - Verify: Clicking thumbnail with deployLink opens in new tab

- [x] 2.3 Add hover overlay element inside frame:
  - Absolute positioned div covering frame
  - Contains `LinkIcon name="external"` + text span
  - Hidden by default, shown on `:hover` and `:focus-visible`
  - Verify: Overlay appears on hover/focus

## 3. Thumbnail Component - Styles

- [x] 3.1 Add CSS custom properties for hover colors in `Thumbnail.module.css`:
  - `--thumbnail-hover-deploy-light`: use `--paper-accent` (blue)
  - `--thumbnail-hover-deploy-dark`: use `--notebook-highlight-color` (orange)
  - `--thumbnail-hover-preview`: use `#1a1917` (project black) at 70% opacity
  - Verify: Colors resolve correctly in both themes

- [x] 3.2 Implement hover overlay styles:
  - Background: `color-mix(in srgb, var(--hover-color) 70%, transparent)` or rgba
  - White text color
  - Centered flex container for icon + text
  - Opacity 0 → 1 transition on hover
  - `pointer-events: none` on overlay
  - Verify: Overlay shows with correct color per theme

- [x] 3.3 Implement scale transform on hover:
  - `transform: scale(1.15)` on frame:hover
  - `transition: transform 0.2s ease, opacity 0.2s ease`
  - `transform-origin: center`
  - Ensure frame container has `overflow: visible` for scale
  - Verify: Thumbnail scales 115% smoothly on hover

- [x] 3.4 Ensure hover overlay respects stepped clip-path:
  - Overlay inside frame container (which has clip-path)
  - Or move clip-path to inner media element
  - Verify: Overlay clipped by stepped corners

- [x] 3.5 Add `:focus-visible` styles matching hover:
  - Show overlay and scale on keyboard focus
  - Verify: Tab navigation shows hover state

- [x] 3.6 Add `:active` state for touch devices:
  - Show overlay on touch/press
  - Verify: Touch shows overlay

## 4. ProjectDemoBlock Integration

- [x] 4.1 Update `ProjectDemoBlock.jsx` to extract deploy info from block content:
  - Read `deployLinks` array from block.content (added by buildNotebookPages)
  - Map each videoDemo/image to its deployLink and buttonLabel
  - Pass `deployLink`, `deployHoverText`, `isPreviewOnly` to each Thumbnail
  - Verify: Thumbnails receive correct deploy props

- [x] 4.2 Handle both `videoDemos` array and legacy `images` + `deployLink`:
  - For videoDemos: each gets its own deployLink/buttonLabel
  - For legacy: single deployLink for the thumbnail
  - Verify: Both data structures work

## 5. buildNotebookPages.js - Data Flow

- [x] 5.1 Modify `resolveCategoryPairs` to attach deploy info to demo block:
  - Remove `projectDeploy` block creation (lines 92-123)
  - Add `deployLinks` array to the demo block content object
  - Each entry: `{ deployLink, buttonLabel, caption }`
  - Verify: No projectDeploy blocks created; demo has deployLinks

- [x] 5.2 Update demo block structure to include deployLinks:
  - In the returned right leaf, include deployLinks in the demo content
  - Format: `{ type: 'projectDemo', ...demo, deployLinks: [...] }`
  - Verify: ProjectDemoBlock receives deployLinks

## 6. Cleanup - Remove ProjectDeployBlock

- [x] 6.1 Delete `src/components/notebook-content/ProjectDeployBlock/` directory
  - Verify: Directory removed

- [x] 6.2 Update `src/components/notebook-content/blockRenderers.jsx`:
  - Remove `ProjectDeployBlock` import
  - Remove from `RENDERERS` object (key `projectDeploy`)
  - Remove from re-exports
  - Verify: No references to ProjectDeployBlock remain

- [x] 6.3 Verify no other files import ProjectDeployBlock:
  - Search codebase for `ProjectDeployBlock`
  - Verify: No imports remain

## 7. Verification & Integration

- [x] 7.1 Test light theme hover:
  - Start app, switch to light mode
  - Hover over thumbnail with deploy link → blue overlay, white text, icon
  - Click thumbnail → opens deploy URL in new tab
  - Verify: All behaviors work in light theme

- [x] 7.2 Test dark theme hover:
  - Switch to dark mode
  - Hover over thumbnail with deploy link → orange overlay, white text, icon
  - Verify: Colors correct in dark theme

- [x] 7.3 Test preview-only (no deploy link):
  - Hover over thumbnail without deploy link → gray overlay, "Apenas Visualização :)"
  - Click does nothing
  - Verify: Preview-only state works

- [x] 7.4 Test ProgramADA custom labels:
  - Navigate to ProgramADA project
  - Hover over first video → "Jogar" in overlay
  - Hover over second video → "Jogar MiniGame" in overlay
  - Verify: Custom labels appear in hover

- [x] 7.5 Test multiple video demos:
  - Navigate to games category (multiple projects with videoDemos)
  - Each thumbnail has independent hover/click
  - Verify: All video demos work independently

- [x] 7.6 Test keyboard navigation:
  - Tab to thumbnail with deploy link
  - Focus shows hover state (overlay + scale)
  - Enter key activates link
  - Verify: Keyboard accessible

- [x] 7.7 Test touch interaction:
  - On touch device or dev tools touch simulation
  - Tap thumbnail → shows overlay briefly, then navigates
  - Verify: Touch works

- [x] 7.8 Verify no deploy buttons appear on left page:
  - Check left leaf of any project
  - No deploy buttons below repository button
  - Verify: ProjectDeployBlock fully removed

- [x] 7.9 Run existing tests/lint:
  - `npm run lint` or equivalent
  - `npm test` if available
  - Verify: No regressions

## Workflow follow-up

- Archive the change after implementation is complete and verified
- Verify the archived result updates main specs correctly