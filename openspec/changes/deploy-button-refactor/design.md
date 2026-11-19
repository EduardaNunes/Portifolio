# Design

## Context

See proposal.md for motivation. Current state:
- `ProjectDeployBlock` renders deploy buttons below repository button on left leaf
- `ProjectDemoBlock` renders thumbnails on right leaf via `Thumbnail` component
- `buildNotebookPages.js` creates deploy blocks from project demo data
- Theme handled via `.lightmode` class on root with CSS custom properties
- Icons via `LinkIcon` component (Lucide React paths)
- i18n texts in `src/content/pt.json` and `src/content/eng.json`

## Goals / Non-Goals

**Goals:**
- Remove `ProjectDeployBlock` component entirely
- Make `Thumbnail` clickable when `deployLink` provided
- Add hover overlay with theme-aware colors, icon, and text
- Scale thumbnail 115% on hover
- Use i18n for hover text with fallback
- Show preview-only state when no deploy link
- Pass deploy data through existing demo block structure

**Non-Goals:**
- Change thumbnail frame/border design (handled by existing `thumbnail-stepped-border` spec)
- Change video playback behavior
- Modify notebook layout or pagination
- Add new dependencies

## Decisions

### 1. Thumbnail becomes a link wrapper when deployLink exists
**Decision**: Wrap thumbnail frame in `<a>` tag when `deployLink` prop provided, otherwise render as-is.

**Rationale**: Semantic HTML - clickable areas should be links. Preserves accessibility.

**Alternative considered**: Add onClick handler to div. Rejected - breaks keyboard navigation, screen readers.

### 2. Hover overlay implemented via CSS pseudo-element or absolute child
**Decision**: Add an absolute-positioned overlay div inside the frame container that appears on hover via CSS `:hover` on the container.

**Rationale**: Pure CSS hover avoids React state for hover, better performance, smoother animation. The overlay contains the icon and text.

**Alternative considered**: React state with onMouseEnter/onMouseLeave. Rejected - adds re-renders, less smooth.

### 3. Theme-aware colors via CSS custom properties
**Decision**: Define new CSS custom properties for hover colors:
- `--thumbnail-hover-deploy-light`: blue (e.g., `#145053` or `--paper-accent`)
- `--thumbnail-hover-deploy-dark`: orange (e.g., `#d87f0b` or `--notebook-highlight-color`)
- `--thumbnail-hover-preview`: gray (project's black `#1a1917`)

These use 70% opacity via `color-mix()` or rgba.

**Rationale**: Leverages existing theme system (`.lightmode` class). No JS theme detection needed.

**Alternative considered**: Inline styles with theme context. Rejected - more complex, less maintainable.

### 4. Hover text from i18n with fallback
**Decision**: Pass `deployHoverText` prop to Thumbnail from `ProjectDemoBlock`. The text comes from labels object (i18n). In `buildNotebookPages.js`, extract `buttonLabel` from videoDemos or use labels.viewDeploy fallback.

**Rationale**: Keeps i18n in JSON files. Thumbnail stays dumb presentational component.

### 5. Scale transform on hover
**Decision**: Apply `transform: scale(1.15)` to the frame container on hover. Use `transform-origin: center` for centered scaling.

**Rationale**: CSS transform is GPU-accelerated, smooth. 115% is subtle but noticeable.

### 6. Deploy icon from existing LinkIcon
**Decision**: Use `LinkIcon name="external"` for the deploy icon in hover overlay.

**Rationale**: Reuses existing icon system. Consistent with current deploy buttons.

### 7. Data flow: buildNotebookPages attaches deploy info to demo block
**Decision**: In `resolveCategoryPairs`, instead of creating `projectDeploy` block, attach `deployLinks` array to the demo block content. `ProjectDemoBlock` reads this and passes to each `Thumbnail`.

**Rationale**: Minimal change to data flow. Demo block already receives project demo data.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Hover overlay clipped by frame's clip-path | Test overlay positioning; may need overlay on frame not media element |
| Scale transform causes layout shift | Use transform (not width/height); ensure container has overflow:visible |
| Touch devices don't have hover | Add `:active` state for touch; consider focus-visible for keyboard |
| Multiple video demos - each needs own deploy link | Pass deployLink per videoDemo entry to each Thumbnail |
| i18n keys missing in JSON | Default fallback "Ver Deploy" handled in component |
| Preview-only gray color matches project black | Use `--bg-color` (which is `#1a1917` in dark, `#f9efe4` in light) - but need dark gray. Use specific CSS var. |

## Migration Plan

1. Add i18n keys to pt.json and eng.json
2. Modify `Thumbnail` component with new props and hover overlay
3. Modify `Thumbnail.module.css` with hover styles
4. Modify `ProjectDemoBlock` to pass deploy props
5. Modify `buildNotebookPages.js` to attach deploy info to demo block
6. Remove `ProjectDeployBlock` component and exports
7. Update specs (handled by this change's spec deltas)

## Open Questions

1. **Exact hover color values**: Should use existing CSS vars (`--paper-accent` for light blue, `--notebook-highlight-color` for dark orange) or define new ones? Current design uses existing.

2. **Preview-only gray color**: The "project's black" is `#1a1917` (dark theme bg). In light theme, should it be dark gray or light gray? Design assumes dark gray `#1a1917` with 70% opacity works in both.

3. **Thumbnail container overflow**: The frame has `overflow: hidden` for clip-path. The scale(1.15) may be clipped. May need to move clip-path to inner element or use wrapper.

4. **Focus state for keyboard navigation**: When tabbing to clickable thumbnail, should show hover state? Need `:focus-visible` styles matching hover.

5. **Video demo caption positioning**: Current caption is below frame. With clickable thumbnail, caption stays below - no change needed.