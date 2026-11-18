# Proposal

## Why

The current "Ver Código Fonte" (View Source Code) link in project spreads uses a visual structure of icon → label → arrow button that doesn't match the unified action button style used elsewhere in the notebook. It should be updated to a full-width button with the GitHub icon and "Ver Repositório" text centered, with theme-appropriate hover colors (orange for dark theme, blue for light theme) and white text/icons on hover, while maintaining the border.

Additionally, the deploy button (currently absolute-positioned at top-right with "→" arrow) should be moved below the thumbnail and styled consistently with the repository button for visual coherence.

The "Ver Demo" text label displayed over project thumbnails should be removed for a cleaner visual presentation.

## What Changes

- **Visual structure (repo button)**: Change from `icon → "Ver Código Fonte:" → arrow button` to a single full-width button containing the GitHub icon and "Ver Repositório" text centered
- **Visual structure (deploy button)**: Move from absolute-positioned top-right to below the thumbnail, as a full-width button with external link icon and "Ver Deploy" text centered
- **Remove "Ver Demo" label**: Remove the demo translation key and its usage as a label for the thumbnail caption field
- **Hover behavior (both buttons)**: 
  - Dark theme: button background becomes orange (`--notebook-highlight-color` / `#d87f0b`), border stays orange
  - Light theme: button background becomes blue (`--paper-accent` / `#145053`), border becomes blue
  - Text and icons become white on hover for both themes
- **Border**: Maintain the existing 2px border around both buttons
- **Text labels**: 
  - Repo button: "Ver Repositório" (new translation key `viewRepository`)
  - Deploy button: "Ver Deploy" (new translation key `viewDeploy`)
- **Full width**: Both buttons should occupy the full horizontal space of their container

## Capabilities

### Modified Capabilities

- `narrative-content-pages`: The "Project spread layout with explicit deploy link" requirement specifies the GitHub repository link display, and the "Pixel-art page presentation" requirement specifies "unified action buttons" for project left leaf. The visual presentation and hover behavior of both buttons needs to change. The "Ver Demo" label is removed from the demo caption field.

## Impact

- **Code affected**: 
  - `src/components/notebook-content/blockRenderers.jsx` - `LinksBlock` component (renders the repo link), `ProjectDemoBlock` component (renders the deploy button, removes demo label)
  - `src/utils/buildNotebookPages.js` - `projectPair` function (creates the links block with `labels.viewRepository`)
  - `src/data/translations.js` - New translation keys for "Ver Repositório" and "Ver Deploy"; remove `demo` key
  - `src/styles/index.css` - Styles for `.project-repo-btn`, `.project-deploy-btn`, and hover states
- **APIs**: None
- **Dependencies**: None
- **Systems**: Notebook project spreads, theming system (dark/light mode)