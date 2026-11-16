# Design

## Context

See proposal.md for motivation.

Current state (from `refine-notebook-page-stack` and earlier):
- Corner zones are `<button class="corner-zone left/right">` rendered inside `.notebook-frame` (z-index 15)
- Arrows use `--corner-arrow-img` CSS variable pointing to `/Imgs/ArrowBlack.png` (dark) and `/Imgs/ArrowWhite.png` (light)
- Arrows are `::after` pseudo-elements with `opacity: 0` by default, `opacity: 1` on hover/focus
- Page stack (gray pages between cover and white leaf) uses `--page-stack-base: #b8afa5`, `--page-stack-dark: #6d6964`, `--page-stack-light: #e0d4c7` on `.notebook-shell`
- Cover theme colors: dark uses blue family (`--cover-light: #99c0c2`), light uses orange family (`--cover-light: #f19925`)
- `.notebook-stage` (z-index 3) contains the white leaves; `.notebook-frame` is the outer container

Problems to solve:
1. Arrows invisible at rest → make them always visible using **original theme arrow colors** (black/white)
2. Hover color should invert by theme with **visible orange in dark mode** → use dedicated `--corner-hover-color` variable
3. Arrows overflow/clip → move corner zones inside `.notebook-stage` so they sit on the white leaf

## Goals / Non-Goals

**Goals:**
- Arrows always visible at rest (original theme colors: black in dark, white in light, 100% opacity)
- Hover/focus shows theme-inverted accent (darker orange `#e88d00` in dark, blue `#99c0c2` in light)
- Arrows positioned on white leaf, never clipped
- Use **existing arrow images** from `/Imgs/` via CSS `mask-image` (no inline SVG, no new assets)
- Preserve all existing navigation behavior, disabled states, accessibility

**Non-Goals:**
- Changing click zone dimensions (15% × 60px) or navigation logic
- Changing page-turn animation or turn lock
- Adding new CSS variables beyond `--corner-hover-color`
- Modifying the page stack or cover visual design

## Decisions

### Decision: Move corner zones inside `.notebook-stage`

**Approach:** In `NarrativeNotebook.jsx`, render the corner zone buttons as children of `.notebook-stage` instead of `.notebook-frame`.

**Rationale:**
- `.notebook-stage` is the white leaf container (z-index 3, `perspective: 1600px`)
- `.notebook-frame` is the outer cover container; corners there sit on the cover, not the page
- Moving inside `.notebook-stage` ensures arrows sit on the white leaf and are clipped by it naturally
- Alternative: `overflow: visible` on parent — rejected because it breaks containment and can cause arrows to float outside the notebook visually

### Decision: Use existing arrow images via CSS `mask-image`

**Approach:** Remove `--corner-arrow-img` CSS variable and `::after` pseudo-element styles. Apply `mask-image` directly on `.corner-zone` buttons using the existing `/Imgs/ArrowBlack.png` and `/Imgs/ArrowWhite.png`. The button's `background-color` (via `color` property) shows through the mask.

**Rationale:**
- Reuses existing arrow assets — no new files, no inline SVG
- `mask-image` with `background-color: currentColor` allows theming via CSS `color` property
- Theme-aware: dark theme uses `ArrowBlack.png` with black color; light theme uses `ArrowWhite.png` with white color
- Hover/focus changes `color` to `--corner-hover-color` (darker orange/blue)
- Alternative: Inline SVG — rejected per user request to use existing images
- Alternative: Keep `::after` with `background-image` — rejected because `mask-image` on the element itself is simpler and avoids pseudo-element complexity

### Decision: Use dedicated `--corner-hover-color` variable for visible theme-inverted colors

**Approach:**
- Rest state: `color: #1a1917` (black) in dark theme via `.corner-zone`; `color: #f9efe4` (white) in light theme via `.lightmode .corner-zone`
- Hover/focus state: `color: var(--corner-hover-color)` where `--corner-hover-color` is `#e88d00` (darker orange) in dark theme and `#99c0c2` (blue) in light theme

**Rationale:**
- Original orange `#f19925` was too light/low contrast in dark mode
- Darker orange `#e88d00` ensures visibility against dark notebook background
- Blue `#99c0c2` (existing `--cover-light` in dark theme) works well in light mode
- Single variable `--corner-hover-color` defined per theme in `:root` and `.lightmode`
- No page stack gray variables used — keeps original brand colors at rest

### Decision: Mirror left arrow to point outward from notebook

**Approach:** Apply `transform: scaleX(-1)` to the left corner zone (`.corner-zone.left`) so the arrow image points left (toward the previous page). The right corner zone uses the image as-is, pointing right (toward the next page). The hover/focus `transform: scale(1.15)` combines with the mirroring via `transform: scaleX(-1) scale(1.15)`.

**Rationale:**
- The existing arrow image (`ArrowBlack.png` / `ArrowWhite.png`) points in one direction (assumed right)
- Left navigation should point left (outward from the notebook spine), right navigation should point right (outward)
- CSS `transform: scaleX(-1)` on the left button mirrors the mask horizontally
- Hover scale combines with mirroring: `scaleX(-1) scale(1.15)`
- No need for separate left/right arrow image assets

### Decision: Full opacity at rest, no opacity transition

**Approach:**
- Rest: `opacity: 1` (fully visible)
- Hover/focus: `opacity: 1` (unchanged) + color change + `transform: scale(1.15)`
- Transition: `color 0.15s ease, transform 0.15s ease` (no opacity transition)

**Rationale:**
- User requested 100% visibility at all times
- Color change + scale provides clear hover feedback without opacity flicker
- Simpler than managing opacity transitions

### Decision: Preserve focus-visible outline for accessibility

**Approach:** Keep existing `.corner-zone:focus-visible { outline: 2px solid var(--h1-color); outline-offset: 3px; }`

**Rationale:**
- `var(--h1-color)` is theme-aware (cadetblue in dark, cadetblue in light)
- Meets WCAG focus visibility requirements
- No change needed

### Decision: Center arrow vertically with equal top/bottom margins

**Approach:** Change `mask-position` from `center bottom 12px` to `center center` on `.corner-zone`. This centers the 24px arrow vertically within the 60px clickable zone, creating equal ~18px margins top and bottom. This prevents the arrow from overlapping with textual content near the bottom of the page while maintaining the 60px touch target.

**Rationale:**
- The original `bottom 12px` placement put the arrow too close to page content
- Centering vertically provides balanced margins without reducing the clickable zone height
- 60px zone height preserved for accessibility/touch targets
- No new CSS variables needed

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Moving corners inside `.notebook-stage` changes z-index stacking | `.notebook-stage` has `z-index: 3`; corners get explicit `z-index: 10` to stay above turning page (`z-index: 10` on `.notebook-turn`) |
| `mask-image` browser support | Supported in all modern browsers; `-webkit-mask-image` prefix included for Safari |
| Hover orange visibility in dark mode | Using darker `#e88d00` instead of `#f19925`; can be adjusted further if needed |
| `currentColor` inheritance with mask | `background-color: currentColor` on `.corner-zone` works reliably with `color` property |

## Migration Plan

1. Update `NarrativeNotebook.jsx`: move corner zone buttons inside `.notebook-stage`; remove inline SVG (buttons become empty, arrows rendered via CSS mask)
2. Update `src/styles/index.css`: remove `--corner-arrow-img`; remove `::after` pseudo-element styles; add `mask-image` rules on `.corner-zone`; add `--corner-hover-color` per theme; update `.corner-zone` color/transition rules
3. Run `npm run build` and `openspec validate`
4. Manual validation: both themes, hover/focus, disabled states, reduced motion, viewport resize

## Open Questions

None.