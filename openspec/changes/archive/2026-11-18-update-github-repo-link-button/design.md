# Design

## Context

Currently, the GitHub repository link in project spreads is rendered by the `LinksBlock` component in `src/components/notebook-content/blockRenderers.jsx`. It creates a list item with:
- A `social-link-field` containing the GitHub icon and "Ver Código Fonte" label
- A separate `social-link` anchor with an arrow (→) character

The deploy button is rendered in `ProjectDemoBlock` component, absolute-positioned at top-right with the `.prominent-deploy-btn` class, using the external link icon and "→" text.

The styling uses `.social-link-row`, `.social-link-field`, and `.social-link` classes. The `.page-action` class (used for deploy button) has a unified button style with hover inversion (background becomes ink color, text becomes paper color).

The project pair creation in `src/utils/buildNotebookPages.js` uses `labels.viewSource` ("Ver Código Fonte") for the link label.

## Goals / Non-Goals

**Goals:**
- Convert the GitHub repository link to a full-width button with centered GitHub icon and "Ver Repositório" text
- Convert the deploy button to a full-width button below the thumbnail with centered external link icon and "Ver Deploy" text
- Implement theme-specific hover colors for both buttons: orange for dark theme, blue for light theme
- Make text and icons white on hover for both themes
- Maintain the 2px border around both buttons
- Reuse existing CSS variables where possible

**Non-Goals:**
- Change the Contact spread social links (LinkedIn, GitHub, email) - only the project spread repository link
- Change translation keys for other languages beyond updating the text

## Decisions

### 1. Component Approach: Modify `LinksBlock` for project repository links only
**Decision**: Add a prop or detect context to render project repository links differently from contact links.

**Rationale**: The `LinksBlock` is reused for both contact spread (LinkedIn, GitHub, email) and project spreads (repository link). We need to distinguish these cases.

**Alternatives considered**:
- Create a new `ProjectRepoLinkBlock` component - more duplication
- Use a prop like `variant="project-repo"` - cleaner, reuses component

**Chosen**: Add a `variant` prop to `LinksBlock` to detect project repository links.

### 2. Deploy Button Approach: Modify `ProjectDemoBlock` for project deploy button
**Decision**: Update `ProjectDemoBlock` to render the deploy button as a full-width button below the thumbnail, instead of absolute-positioned at top-right.

**Rationale**: The user wants visual consistency between the repo button (left leaf) and deploy button (right leaf), both as full-width buttons with centered icon+text.

**Alternatives considered**:
- Create a new component - more duplication
- Modify existing `ProjectDemoBlock` - cleaner, reuses component

**Chosen**: Modify `ProjectDemoBlock` to render deploy button below thumbnail with new styling.

### 3. Styling Approach: New CSS classes for both buttons
**Decision**: Create `.project-repo-btn` and `.project-deploy-btn` classes (extending `.page-action`) for full-width buttons with centered content.

**Rationale**: The `.page-action` class already has the unified button style (2px border, uppercase, hover inversion). We can extend it with full-width and centered content, plus theme-specific hover colors.

**Alternatives considered**:
- Inline styles - not maintainable
- New utility classes - more CSS duplication

**Chosen**: Extend `.page-action` with modifier classes `.project-repo-btn` and `.project-deploy-btn` that add:
- `width: 100%` (full width)
- `box-sizing: border-box` (include padding and border in width calculation to prevent overflow)
- `justify-content: center` (centered content)
- Theme-specific hover background colors using existing CSS variables

### 4. Theme-specific hover colors and borders
**Decision**: Use existing CSS variables:
- Dark theme: `--notebook-highlight-color` (`#d87f0b` - orange) for background and border
- Light theme: `--paper-accent` (`#145053` - blue) for background and border

**Border behavior**:
- Dark theme: Border is always orange (never changes on hover)
- Light theme: Border is blue by default, stays blue on hover

**Rationale**: These variables already exist and represent the accent colors for each theme. The dark theme uses orange as highlight, light theme uses blue as accent.

### 5. Text labels
**Decision**: Add new translation keys in `translations.js`:
- `viewRepository`: PT "Ver Repositório", EN "View Repository"
- `viewDeploy`: PT "Ver Deploy", EN "View Deploy"

**Rationale**: The user explicitly requested "Ver Repositório" text. "Ver Deploy" maintains consistency for the deploy button. This keeps translations centralized.

### 6. Deploy button icon
**Decision**: Use the existing "external" icon (already used in deploy button) for the deploy button.

**Rationale**: The external link icon semantically represents opening a deployed project in a new tab.

### 7. Remove "Ver Demo" label
**Decision**: Remove the `demo` translation key from `translations.js` and remove its usage in `ProjectDemoBlock` where it renders as a label for the thumbnail caption.

**Rationale**: The user wants a cleaner visual presentation without the "Ver Demo" label over the thumbnail caption. The caption itself is sufficient.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `LinksBlock` used in multiple contexts | Add `variant` prop with default to maintain backward compatibility for contact links |
| `ProjectDemoBlock` used for demo rendering | Modify only the deploy button rendering, keep demo/image logic intact |
| CSS specificity conflicts | Use modifier classes `.project-repo-btn` and `.project-deploy-btn` on anchor elements, ensure they override base `.page-action` hover |
| Theme switching during hover | CSS variables update automatically with `.lightmode` class on root, hover will use current theme values |
| Translation key missing in EN | Add both PT and EN keys for both `viewRepository` and `viewDeploy` |

## Migration Plan

1. Add `viewRepository` and `viewDeploy` translation keys to `src/data/translations.js` (PT and EN)
2. Update `buildNotebookPages.js` to use `labels.viewRepository` instead of `labels.viewSource`
3. Modify `LinksBlock` in `blockRenderers.jsx` to accept `variant` prop and render project repo links as full-width buttons
4. Modify `ProjectDemoBlock` in `blockRenderers.jsx` to render deploy button below thumbnail as full-width button
5. Remove `demo` translation key from `src/data/translations.js` (PT and EN)
6. Remove `labels.demo` usage in `ProjectDemoBlock` (the "Ver Demo" label for thumbnail caption)
7. Add `.project-repo-btn` and `.project-deploy-btn` CSS styles in `index.css` with:
   - Theme-specific hover colors (dark: orange, light: blue)
   - White text and icon on hover for both themes
   - `box-sizing: border-box` to prevent overflow with padding/border
   - Border behavior: dark theme always orange, light theme blue
8. Test in both dark and light themes

## Open Questions

None - all decisions are resolved.