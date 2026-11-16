# Proposal

## Why

The notebook's corner navigation arrows (previous/next page controls) have three usability issues:

1. **Visibility**: Arrows are invisible by default (`opacity: 0`) and only appear on hover/focus. Users cannot discover navigation affordances without interacting.
2. **Color semantics**: Current arrows use black/white theme images that don't relate to the notebook's visual language.
3. **Hover feedback inversion**: The hover color should invert by theme — dark theme gets the warm accent (orange), light theme gets the cool accent (blue) — matching the cover palette. The orange must be dark enough to be visible in dark mode.

## What Changes

- Make corner arrows **always visible** using the **original theme arrow images** (black in dark theme, white in light theme) at 100% opacity
- On hover/focus, arrows gain **theme-inverted accent color**: a **darker orange** (`--corner-hover-color: #e88d00`) in dark theme for visibility, blue (`--corner-hover-color: #99c0c2`) in light theme
- Position arrows **on top of the white leaf** (inside `.notebook-stage`, not `.notebook-frame`) so they never overflow or get clipped
- Use **existing arrow images** from `/Imgs/` folder via CSS `mask-image` (no inline SVG, no new assets)
- Preserve existing navigation behavior, disabled states at boundaries, and accessibility (focus-visible outline)

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `narrative-notebook-component`: Corner navigation arrow visibility, color, and positioning requirements change.

## Impact

- `src/styles/index.css`: Corner zone styles using `mask-image` with existing arrow PNGs, theme variables for hover colors (`--corner-hover-color`)
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx`: Move corner zone buttons inside `.notebook-stage` so they sit on the white leaf; remove inline SVG
- No new dependencies, no API changes, no data model changes