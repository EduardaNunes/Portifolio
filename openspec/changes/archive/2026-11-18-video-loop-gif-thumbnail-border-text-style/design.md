# Design

## Context

See proposal.md - Why. Current state:
- `Thumbnail.jsx` renders `<video controls loop muted>` for videos and `<img>` with a play overlay for images
- `.project-thumbnail` in `index.css` has `border-radius: 6px` and no border
- `.page-note` in `index.css` uses a `clip-path` with 3px pixel-stepped corners and `border: 1px solid var(--page-ink)`
- The notebook leaf text presentation system defines `--page-ink`, `--page-ink-soft`, `--page-line` tokens scoped to `.notebook-leaf`

## Goals / Non-Goals

**Goals:**
- Make video thumbnails autoplay, loop, play inline, and stay muted without native controls
- Apply a consistent stepped-corner clip-path border to all thumbnails (images, videos) using `--page-ink`
- Slightly increase corner rounding (fallback: 8px border-radius) for a softer look
- Reuse existing ink color tokens; no new colors

**Non-Goals:**
- Change the Thumbnail component's public API (props remain the same)
- Modify content schema or project data structure
- Add new dependencies or build steps
- Change the notebook leaf text presentation system itself

## Decisions

### 1. Video autoplay attributes
**Decision**: Add `autoPlay`, `playsInline`, remove `controls` from the `<video>` element in `Thumbnail.jsx`. Keep `loop` and `muted`.

**Rationale**: `autoPlay` + `muted` + `playsInline` is the standard pattern for GIF-like autoplay that browsers allow without user gesture. Removing `controls` hides the native UI. `playsInline` prevents fullscreen on iOS.

**Alternatives considered**:
- Keep `controls` but hide via CSS: rejected — still exposes controls to accessibility tree and allows user interaction that breaks the GIF illusion.
- Use a custom play/pause overlay: rejected — adds complexity; the requirement is passive looping.

### 2. Stepped-corner border via clip-path
**Decision**: Create a reusable CSS utility class `.thumbnail-frame` (or apply directly to `.project-thumbnail`) that uses the same `clip-path` polygon as `.page-note` (3px step) with `border: 1px solid var(--page-ink)`. Apply to both `<video>` and `<img>` via the shared `.project-thumbnail` class.

**Rationale**: Reusing the exact clip-path from `.page-note` ensures visual consistency with the notebook text aesthetic. The `--page-ink` token is already available in `.notebook-leaf` scope; thumbnails live inside `.notebook-leaf` (right leaf of project spreads), so the token resolves correctly.

**Alternatives considered**:
- Box-shadow hack for stepped corners: rejected — clip-path is cleaner and matches `.page-note` exactly.
- SVG border: rejected — over-engineering for a static decorative border.
- New CSS custom property for step size: rejected — hardcode 3px to match `.page-note` exactly; no configuration needed.

### 3. Fallback border-radius
**Decision**: Keep `border-radius: 8px` (slightly increased from current 6px) as a fallback for browsers without clip-path support, applied via `@supports not (clip-path: polygon(...))` or simply as a base style that clip-path overrides.

**Rationale**: Clip-path has excellent modern browser support. The fallback ensures a reasonable appearance in edge cases. 8px is a subtle increase from 6px for a softer look per the proposal.

### 4. Token scope
**Decision**: Thumbnails already render inside `.notebook-leaf` (project right leaf), so `--page-ink` is available. No additional token wiring needed.

**Rationale**: The component tree places `Thumbnail` inside the project demo block which is inside `.notebook-leaf.right`. The CSS custom properties cascade correctly.

### 5. Wrapper structure
**Decision**: Keep the existing `.thumbnail-container` wrapper. Apply the clip-path border to the media element itself (`.project-thumbnail`) rather than the wrapper, so the border hugs the content exactly like `.page-note` hugs its text.

**Rationale**: The wrapper handles caption layout; the media element is the visual frame. This matches `.page-note` where the border is on the content box itself.

## Risks / Trade-offs

- **[Risk] Autoplay policy changes** → Mitigation: `muted` + `playsInline` is the most durable pattern; monitor browser policy changes.
- **[Risk] Clip-path on replaced elements (video/img)** → Mitigation: Test in all target browsers; clip-path on replaced elements is supported in all modern browsers. If issues arise, apply clip-path to a wrapper `div` with `overflow: hidden` instead.
- **[Risk] `--page-ink` not available if Thumbnail used outside notebook leaf** → Mitigation: Current usage is only inside project spreads. If reused elsewhere, provide a fallback `--thumbnail-border-color` token with `--page-ink` as default.
- **[Trade-off] No user control over video playback** → Accepted: Requirement is GIF-like passive loops. Users can pause via browser context menu if needed.