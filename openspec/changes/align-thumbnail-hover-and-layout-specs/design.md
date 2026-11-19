# Design

## Context

See `proposal.md` — Why.

Current thumbnail structure in `Thumbnail.jsx`:

```
.container
  .clickableFrame [.hasDeployLink]   ← <a> when deployLink, else <div>
    .frame                          ← stepped clip-path, overflow: hidden
      .media                        ← <img> or <video>, border-radius 6px
      .hoverOverlay [.hoverText]    ← opacity 0 → 1 on hover; no icon, no scale
  .caption
```

`.hoverOverlay` is already clipped with the same stepped polygon as `.frame`, and `.frame` sets `overflow: hidden`. Overlay colors and the light/dark swap already work.

## Goals / Non-Goals

**Goals**

- The overlay shows an external-link icon above the text.
- The thumbnail scales to 115% on hover over ~200 ms.
- The scale never causes overflow beyond the leaf or the stepped frame.
- `layout/position-meta` describes the code that exists.

**Non-Goals**

- Changing hover colors, text, or i18n.
- Adding new interactions (keyboard shortcuts, tap targets, analytics).
- Redesigning the position row or changing the 65/35 ratio.

## Decisions

**Decision: scale `.media`, not `.frame`.**
`.frame` has `overflow: hidden` plus a stepped `clip-path`. Scaling the frame by 1.15 would grow the bordered box past its layout slot and risk the overflow that `project-multi-video-demo` forbids ("Hover scale does not cause overflow"). Scaling the inner `img`/`video` grows the picture inside the fixed, clipped frame: the border and stepped corners stay put, the overlay stays aligned, and nothing escapes the leaf. Visually this reads as the thumbnail zooming.
*Alternative rejected:* scaling `.frame` and counter-scaling the overlay — brittle, and the stepped corners would visibly thicken.

**Decision: use `transform` and `transition` only.**
Transforms are compositor-driven, so the hover animation does not trigger layout on a leaf that also renders autoplaying videos.

**Decision: keep the overlay as one clipped layer, add the icon inside it.**
`.hoverOverlay` already mirrors the frame's clip-path. Adding the icon inside that layer keeps the clipping guarantee of `Hover overlay respects stepped frame clipping` with no extra geometry.

**Decision: use `LinkIcon` with the `external` name.**
`thumbnail-deploy-hover` requires "the existing LinkIcon component (Lucide React)". Reusing it avoids a one-off SVG and keeps icon weight/stroke consistent with repository buttons.

**Decision: align `layout/position-meta` to the code, not the reverse.**
Recorded and justified in the proposal's Assumptions. The delta replaces three requirements rather than modifying them because their scenario names encode the 80/20 behavior, and a `MODIFIED` block may not rename or drop scenarios.

## Risks / Trade-offs

- **A 1.15 scale on an image next to the stepped border can look like the border disappears** → verify at both media types and at the maximum constrained demo size; if the border looks thin, the fix is padding inside `.frame`, not scaling the frame.
- **Icon plus text may crowd small thumbnails** → cap the icon size in `rem` and let the overlay keep `padding: 0.5rem`; verify on a two-video project leaf at ≤600px.
- **Hover-only feedback excludes keyboard focus** → keep the `:focus-visible` selectors that already reveal the overlay, and apply the same scale there.
- **Aligned spec may still be “wrong” by product intent** → the assumption is called out in the proposal; reversing it means editing `PositionsBlock.module.css` instead of the spec, which is a one-line change either way.
- **`thumbnail-deploy-hover` is not yet in the main specs** → implementation is still verifiable against the delta in `deploy-button-refactor`; archive `repair-openspec-baseline` first if you want the requirement published before this change lands.

## Migration Plan

1. Add the icon and the column layout to the overlay.
2. Add the scale transition to `.media` plus the hover/focus-visible rule.
3. Verify cursor behavior on clickable and preview-only thumbnails.
4. Apply the `layout/position-meta` delta on archive.
5. Run `npm run build` and `npm test`, then check the project demo leaf in both themes at desktop and ≤600px.

Rollback: `git checkout -- src/components/notebook-content/Thumbnail`.
