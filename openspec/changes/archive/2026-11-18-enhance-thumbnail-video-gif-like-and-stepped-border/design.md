# Design

## Context

See proposal.md for motivation. Current state:
- `Thumbnail.jsx` renders videos with `controls`, `loop`, `muted` attributes
- `.project-thumbnail` CSS class applies `border-radius: 6px` to both images and videos
- `.page-note` text component uses `clip-path` with 3px stepped corners and `--page-ink` border
- No decorative border exists on thumbnails currently

## Goals / Non-Goals

**Goals:**
- Remove `controls` from video elements for GIF-like autoplay/loop/muted behavior
- Add a wrapper element around media with stepped-corner clip-path border using `--page-ink`
- Ensure inner media (img/video) retains 6px border-radius, visually nested within stepped frame
- Maintain theme compatibility via CSS custom properties (no hardcoded colors)

**Non-Goals:**
- Changing video playback behavior beyond removing controls (autoplay/loop/muted already work)
- Modifying Thumbnail component props or API
- Changing caption, play-overlay, or other Thumbnail features
- Adding animations or transitions to the border

## Decisions

### 1. Wrapper element for stepped border
**Decision**: Add a `<div className="thumbnail-frame">` wrapper around the media element (img/video) in Thumbnail.jsx, applying the clip-path border to this wrapper.

**Rationale**: The clip-path stepped corners must be on a container that wraps the media, since the media itself needs `border-radius: 6px` for its own rounded corners. A wrapper cleanly separates the decorative frame from the media styling.

**Alternatives considered**:
- Apply clip-path directly to media: Would conflict with media's border-radius; clip-path on replaced elements (img/video) has limited browser support.
- Use pseudo-elements (::before): More complex, harder to ensure proper stacking with captions/overlays.

### 2. CSS class naming
**Decision**: Use `.thumbnail-frame` for the wrapper, `.thumbnail-media` for the inner img/video (replacing `.project-thumbnail` for border-radius), and keep `.thumbnail-container` as the outer layout container.

**Rationale**: Clear separation of concerns — frame handles decorative border, media handles content presentation, container handles layout. `.project-thumbnail` is renamed to `.thumbnail-media` since it applies to all thumbnails, not just projects.

### 3. Reusing `--page-ink` token
**Decision**: Use `var(--page-ink)` for the border color, which is already defined in `.notebook-leaf` scope and aliases to the correct theme color (orange in dark, blue in light).

**Rationale**: Leverages existing theming infrastructure; no new CSS custom properties needed. The Thumbnail component is only used within `.notebook-leaf` contexts, so the token is available.

### 4. Clip-path value
**Decision**: Reuse the exact clip-path polygon from `.page-note` (3px step size) for visual consistency.

**Rationale**: Matches the info box design exactly. The 3px step is a design system constant used elsewhere (notebook-shell corners, tabs).

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Clip-path on wrapper may clip caption/play-overlay if they overflow | Caption is outside wrapper (sibling), play-overlay is inside media area but absolutely positioned; test and adjust z-index if needed |
| Video autoplay may be blocked by browser policies | `muted` + `autoplay` + `loop` is the standard pattern for allowed autoplay; `playsinline` attribute added for iOS Safari compatibility |
| Border may not visible on very small thumbnails | Minimum thumbnail sizes in practice exceed clip-path dimensions; clip-path only clips corners, not edges |
| Theme token `--page-ink` not available outside notebook-leaf | Thumbnail is only used inside notebook leaves; if reused elsewhere, add fallback `border-color: currentColor` |