# Tasks

## 1. Hover overlay icon

- [ ] 1.1 Render the external-link icon inside the hover overlay in `Thumbnail.jsx` using the existing `LinkIcon` with `name="external"`, placed above the hover text and hidden from assistive technology (`aria-hidden`) so the link's `aria-label` stays the only announcement; verify the icon appears when hovering a thumbnail that has a deploy link.
- [ ] 1.2 Restyle `.hoverOverlay` in `Thumbnail.module.css` as a centered column with a small gap and add a scoped `.hoverIcon` rule sized in `rem`; verify the icon and text stay centered and the overlay is still clipped by the stepped `clip-path` at a ≤600px viewport.
- [ ] 1.3 Verify the preview-only case still shows text without a deploy action and that no icon appears for thumbnails without a deploy link.

## 2. Hover scale

- [ ] 2.1 Add `transition: transform 200ms ease` to `.media` and a hover/focus-visible rule that applies `transform: scale(1.15)` to `.media`; verify the transform animates smoothly on both an image and a video thumbnail.
- [ ] 2.2 Verify the scale does not overflow: with a project leaf that holds two video demos at their maximum constrained height, hover each thumbnail and confirm no content moves outside the leaf and the stepped border stays visible.
- [ ] 2.3 Verify the stepped frame, inner `border-radius` and overlay clipping are unchanged while scaled, per `thumbnail-stepped-border` → `Hover overlay respects stepped frame clipping`.

## 3. Cursor affordance

- [ ] 3.1 Verify that a thumbnail with a deploy link shows a pointer cursor and one without keeps the default cursor, per `thumbnail-clickable-deploy`; add an explicit `cursor: pointer` to `.clickableFrame.hasDeployLink` only if the anchor does not already provide it.

## 4. Position meta spec alignment

- [ ] 4.1 Verify `PositionsBlock.module.css` still allocates 65% to `.positionCompany` and 35% to `.positionDates` and stacks both at ≤600px, so the rewritten `layout/position-meta` requirement matches the code; adjust the delta instead of the CSS if they diverge.
- [ ] 4.2 Verify every class named in the delta exists in `PositionsBlock.jsx` and `PositionsBlock.module.css`, and that no removed requirement name is still referenced by another spec.

## 5. Integration verification

- [ ] 5.1 Verify `npm run build` and `npm test` pass.
- [ ] 5.2 Verify the demo leaf in light and dark themes at desktop and ≤600px: icon, text, scale, border and cursor all behave, and the position row in a career leaf still splits 65/35 and stacks correctly when narrow.

## Workflow follow-up

- Archive the change once review is complete, then re-run `openspec validate --all`.
- Archive `repair-openspec-baseline` first if `thumbnail-deploy-hover` must exist in the main specs before this change archives.
