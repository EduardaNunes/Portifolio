# Proposal

## Why

Two capabilities describe a system that does not exist yet:

1. **`thumbnail-deploy-hover` is only half implemented.** The colored overlay and the hover text already render, but the overlay has no icon and no `scale(1.15)` transform. The specification asks for both, and `project-multi-video-demo` explicitly requires that the hover scale not overflow the leaf. Visitors currently get a colored rectangle with text and no affordance that the thumbnail is an action.
2. **`layout/position-meta` describes selectors that no longer exist.** It mandates an 80/20 split on `.position-company` / `.position-dates`, but the shipped `PositionsBlock.module.css` uses `.positionCompany` / `.positionDates` at 65/35. The capability therefore validates while describing nothing real, and a future contributor following it would "fix" a deliberate layout into a broken one.

## What Changes

- Add the deploy/external icon to the thumbnail hover overlay, using the existing `LinkIcon` component.
- Add the 115% hover scale with a ~200 ms transition, applied so the transform cannot overflow the leaf.
- Verify the cursor affordance required by `thumbnail-clickable-deploy` (the clickable thumbnail is an anchor, so this is a check, not new code).
- Rewrite `layout/position-meta` to describe the current `PositionsBlock.module.css` implementation: module-scoped class names and the 65/35 split, with the 600px stacking rule preserved.

## Capabilities

### New Capabilities

<!-- None. -->

### Modified Capabilities

- `layout/position-meta`: MODIFY the width-split and wrapping requirements to name the module-scoped classes (`.positionCompany`, `.positionDates`) and the 65/35 split actually shipped, replacing the stale 80/20 contract. Three existing requirements are removed and replaced by two consolidated ones because their scenario names are tied to the old 80/20 behavior.

## Impact

- `src/components/notebook-content/Thumbnail/Thumbnail.jsx`
- `src/components/notebook-content/Thumbnail/Thumbnail.module.css`
- `openspec/specs/layout/position-meta/spec.md` (via delta)

No JavaScript behavior changes outside the thumbnail overlay. No new dependencies.

## Assumptions

- The 65/35 split in `PositionsBlock.module.css` is the intended design and the 80/20 spec is the stale side. The spec is aligned to the code rather than the reverse, because 20% of a leaf half-width cannot hold a date range like "Set 2023 — Jul 2027" without wrapping. If the 80/20 split is actually desired, invert this decision before applying.
- Implementing `thumbnail-deploy-hover` needs no new spec delta: `deploy-button-refactor` already specifies the icon and the 115% scale. That change must be archived for the requirement to exist in the main specs, but implementation does not depend on the archive.
