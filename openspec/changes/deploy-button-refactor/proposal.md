# Proposal

## Why

The current deploy buttons in the notebook are overflowing outside the page boundaries because there isn't enough space in the left leaf to accommodate them alongside the repository button and other content. This creates a layout issue where buttons get clipped or pushed out of view.

The solution is to remove the separate deploy button component entirely and make the thumbnails themselves clickable. When a user hovers over a thumbnail, it will show a colored overlay with a "deploy" icon and text, and clicking the thumbnail will navigate to the deploy link. This keeps the deploy functionality accessible while eliminating the space constraint.

## What Changes

- **REMOVE** `ProjectDeployBlock` component - deploy buttons below repository button
- **MODIFY** `Thumbnail` component to:
  - Accept `deployLink` and `deployHoverText` props
  - Become clickable (wrap in `<a>` when `deployLink` provided)
  - Show hover overlay with:
    - 70% transparency background color (blue in light theme, orange in dark theme)
    - White text with "deploy" icon (from Lucide React via LinkIcon)
    - Scale transform: 115% on hover
  - Handle missing deploy link: show "Apenas Visualização :)" with gray background (project's black color)
  - Use i18n texts from JSON (pt/en) with fallback to "Ver Deploy"
- **MODIFY** `ProjectDemoBlock` to pass deploy link and hover text to Thumbnail
- **MODIFY** `buildNotebookPages.js` to attach deploy info to demo blocks instead of creating separate deploy blocks
- **REMOVE** `deploy-button/positioning` spec (replaced by new behavior)
- **MODIFY** `project-multi-video-demo` spec (deploy links move to thumbnails)
- **MODIFY** `programada/deploy-labels` spec (labels used for hover text)
- **MODIFY** `thumbnail-stepped-border` spec (add hover behavior)

## Capabilities

### New Capabilities

- `thumbnail-clickable-deploy`: Thumbnails become clickable links to deploy URLs when a deploy link is provided
- `thumbnail-deploy-hover`: Thumbnails show interactive hover state with colored overlay, icon, and text indicating deploy action

### Modified Capabilities

- `deploy-button/positioning`: **REMOVED** - Deploy buttons are eliminated entirely; replaced by clickable thumbnails
- `project-multi-video-demo`: Deploy links now rendered as part of thumbnail hover/click instead of separate buttons below each video
- `programada/deploy-labels`: Custom button labels ("Jogar", "Jogar MiniGame") now used as hover text on thumbnails instead of button text
- `thumbnail-stepped-border`: Extended with hover interaction requirements (scale, color overlay, icon/text reveal)

## Impact

**Affected Components:**
- `src/components/notebook-content/Thumbnail/Thumbnail.jsx` - Core modification
- `src/components/notebook-content/Thumbnail/Thumbnail.module.css` - New hover styles
- `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.jsx` - Pass deploy props to Thumbnail
- `src/components/notebook-content/ProjectDeployBlock/` - **DELETE** entire component
- `src/components/notebook-content/blockRenderers.jsx` - Remove ProjectDeployBlock export
- `src/utils/buildNotebookPages.js` - Attach deploy info to demo, remove deploy block creation

**Affected Content:**
- `src/content/pt.json` - Add hover text translations
- `src/content/eng.json` - Add hover text translations

**Affected Specs:**
- `deploy-button/positioning` - Will be archived/removed
- `project-multi-video-demo` - Requirements updated
- `programada/deploy-labels` - Requirements updated
- `thumbnail-stepped-border` - Requirements extended