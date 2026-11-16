# Design

## Context

See [proposal.md](./proposal.md) — Why for motivation. The notebook is already implemented as an open double-page spread with a physical page turn, wheel navigation and hidden scrollbars. This design revision aligns the plan with that implementation and adds the requested interaction and visual changes:

- `.app-scroll` is the document scroller (`height: 100dvh; overflow-y: auto; scroll-snap-type: y mandatory`).
- `buildNotebookPages` returns spreads `{ id, section, left, right }` — `4 + N` spreads / `8 + 2N` leaves.
- `PageTurn` rotates a half-page around the center spine using CSS 3D + the Web Animations API.
- The left sections already use `.page-tab`; the right categories still use a separate `.category-tab` component with a dot and a count.
- Tabs currently float away from the notebook (`left: clamp(-58px, -4.4vw, -36px)` and `right: -128px`), use a semicircular notch, hide the active tab and show a floating tooltip.
- The cover (`.notebook-shell`) is a plain themed rectangle with rounded corners.

Constraints:
- Reuse only colors already present in `src/styles/index.css`.
- Keep white paper and dark ink inside the leaves in both themes.
- Preserve the ~80vw × ~80vh frame, the two-leaf spread and the existing content.
- Keep the document horizontal overflow clipped and the scrollbars hidden.
- Validate at desktop and at 484×885.

## Goals / Non-Goals

**Goals:**
- Lock document scrolling until the first Play activation, then unlock it permanently for the session.
- Use one mirrored tab component for left sections and right project categories.
- Keep the active tab visible and expand it horizontally; reveal the label on hover/focus inside the tab.
- Attach tabs flush to the notebook cover and remove the semicircular notch and tooltip.
- Keep tab icons legible in both themes with a fixed ink color.
- Turn the notebook sides into a pixel-art cover using the existing blue/orange palette.
- Align the plan with the implemented spread model, physical page turn, corner navigation, hidden scrollbars and wheel controller.

**Non-Goals:**
- Redesigning the header, clouds, global palette or page content.
- Adding new colors, animation dependencies, WebGL/Three.js or a backend.
- Implementing real touch swipe (corner clicks only).
- Changing the white paper palette or the content split between leaves.
- Rewriting the wheel/snap model; only gating it behind the Play unlock.

## Decisions

### 1. Scroll gate owned by App
**Decision**: Add `isUnlocked` state in `App.jsx`, starting `false`. While locked, apply `.is-scroll-locked` to `.app-scroll` (`overflow: hidden; scroll-snap-type: none; overscroll-behavior: none; touch-action: none`), reset `scrollTop = 0` on mount, and call `useSectionSnap(scrollRef, { enabled: isUnlocked })`. The Play handler sets `isOpen`, sets `isUnlocked`, then scrolls to `#notebook-section` on the next animation frame. Never re-lock during the session.

**Rationale**: The lock must cover wheel, keyboard, touch and browser scroll restoration. CSS alone cannot stop the wheel hook or a restored scroll offset, so the state gates both the container and the hook. Unlocking before scrolling avoids calling `scrollIntoView` on a container that still has `overflow: hidden`.

**Alternatives**: CSS-only lock — rejected because the wheel listener remains active and browser restoration can start the page mid-document. Locking per section — rejected because the requirement is a single first-load gate, then free movement.

### 2. One shared `NotebookTab` component
**Decision**: Create `src/components/narrative-notebook-component/NotebookTab.jsx` with props `{ side, icon, label, active, accent, onSelect }`. It renders a button with the same icon slot and an inline label span. Left sections and right categories both use it; `side="left" | "right"` only mirrors the visual direction. Categories receive an icon path map; the label is the category name. The count is removed.

**Rationale**: The user asked for the same component with mirroring as the only difference. A single component also prevents the left and right interaction models from drifting again.

**Alternatives**: Keep `.page-tab` and `.category-tab` separate — rejected because it already produced different shapes, states and hover behavior.

### 3. Active and hover expansion
**Decision**: Every tab stays rendered. Collapsed width is icon-sized. On hover, keyboard focus or active state, the tab expands to a readable width and the label fades/slides in. The active tab uses the same expanded dimensions permanently. The old `opacity: 0; pointer-events: none` rule, `tabIndex={-1}` for the active tab and the `data-tooltip`/`::after` tooltip are removed. `aria-current`/`aria-pressed` remain for the active state.

**Rationale**: The active marker is now a persistent position indicator instead of disappearing. Reusing the hover expansion for the active state keeps one visual language and removes the floating tooltip.

**Alternatives**: Active marker grows but hides the label — rejected because the requested hover behavior already defines the label; a wider tab with no label would be ambiguous.

### 4. Flush tab placement and mirrored growth
**Decision**: Both tab columns are absolutely positioned against the cover edges with no gap. Left tabs use `inset-inline-start: 0; transform: translateX(-100%)`; right tabs use `inset-inline-end: 0; transform: translateX(100%)`. The inner edge stays anchored and the width transition grows outward. The icon sits on the anchored edge; the label occupies the outer part. The `::before` notch/dot is removed.

**Rationale**: Anchoring with `translate` keeps the contact edge fixed during expansion and guarantees no floating gap, unlike the current negative offsets. Mirrored transforms give the right side the same component without duplicating CSS.

**Alternatives**: Negative left/right offsets — rejected because they create the gap the user reported. Growing inward — rejected because it would cover the page content while the tab is active.

### 5. Pixel-art cover on the notebook sides
**Decision**: Turn `.notebook-shell` into the cover: square corners, a cover board on the left and right, and the leaves inset inside it. Build the pixel-art frame with stepped blocks and layered `box-shadow`/pseudo-elements in the style of `.btn-center`/`.btn-border`, not with soft gradients. Add `--cover-*` tokens:

```css
:root {
  --cover-base: #5f9ea0;
  --cover-dark: #145053;
  --cover-shadow: #26696d;
  --cover-light: #99c0c2;
  --cover-shine: #c6e2e4;
}

.lightmode {
  --cover-base: #d87f0b;
  --cover-dark: #b45309;
  --cover-shadow: #b8763c;
  --cover-light: #f19925;
  --cover-shine: #f9efe4;
}
```

Every value already exists in the project palette (`--btn-play-*`, `--strong`, `--h1-color`, `--paper-h1`, section accents and `--bg-color`). The closed state keeps the same cover. The stage and page-turn layer are inset to the paper area, and the center spine remains at 50% of the stage.

**Rationale**: The Play button already defines the pixel-art language of the site. Reusing its layered-block construction and the blue/orange families keeps the notebook visually consistent without adding colors.

**Alternatives**: A flat colored border — rejected because it does not read as pixel art. Rounded gradients — rejected because they clash with the Play button's hard-edged blocks.

### 6. Fixed tab palette and icon ink
**Decision**: Keep the tab surface on its own paper palette (`--tab-bg: #f6efe3`, `--tab-border: #b7a88e`, `--tab-text: #4a3f30`) and set a fixed `--tab-icon` ink (existing `#4a3f30`/`#145053`) that never resolves through `--text-color`. Section accents from `App.jsx` are reused as an accent strip. Category icons use the same ink; the icon map covers IA/Automações, Jogos, WebDev and BackEnd.

**Rationale**: The previous category tabs used `var(--text-color)`, which flips to a light color in dark theme and can disappear on a light tab surface. A fixed ink token keeps contrast stable in both themes.

**Alternatives**: Letting icons follow the theme — rejected by the requested behavior. Using the cover color for icons — rejected because contrast varies with the cover palette.

### 7. Keep one source of navigation truth
**Decision**: Keep `currentSpread` as the source of truth. Section tabs point to the first spread of their section; every project spread maps to the Projects tab. `goToSpread` clamps and runs the existing transaction (`from`, `to`, `direction`, `status`). Category changes complete/cancel a turn, refilter spreads and move to the first project spread. Corner zones keep calling `goToSpread(current ± 1)`.

**Rationale**: The implemented spread/turn model already works; the tab revision must not reintroduce per-page indices or a translate-based track.

**Alternatives**: Per-leaf index — rejected because it would show half a spread changing during a turn.

### 8. Accessibility of the expanded tabs
**Decision**: The active tab remains focusable and exposes `aria-current="page"` (sections) or `aria-pressed` (categories). Hover and `:focus-visible` share the expansion. The inline label is always present in the accessible name. Width transitions are disabled under `prefers-reduced-motion`; the page turn falls back to a short crossfade.

**Rationale**: Removing the hidden active state makes the current position reachable by keyboard and screen readers. A CSS-only label keeps the accessible name stable.

**Alternatives**: Visually hidden tooltip — rejected because the label is now part of the tab.

### 9. Responsive tab behavior
**Decision**: Keep the compact tab size at ≤600px and cap the expanded width with a viewport-aware `clamp()`. The expanded width is bounded by the side gutter (`calc(10vw - 8px)`) on roomy viewports; when the clamp minimum exceeds that gutter, the expanded tab shifts inward by `--tab-overflow = max(0px, expanded - 10vw)` so the full inline label stays on screen. The tab overlaps the cover instead of detaching from it, and the label wraps instead of being truncated. Verify at 484×885 that expansion does not create document overflow; the document keeps `overflow-x: clip`.

**Rationale**: The cover is 80vw wide, so each side gutter is only 10vw. Capping the expanded width alone would clip the label on mobile, and letting it grow outward would push the label off-screen. Shifting inward by exactly the overflow keeps the label readable and the tab attached.

**Alternatives**: Letting tabs expand without a cap — rejected because `.app-scroll` clips horizontal overflow and the label would become unreachable. Truncating the label — rejected because the expanded tab must show the full section name.

## Risks / Trade-offs

- [Scroll lock hides the only scroller and could trap focus] → Keep the Play button focusable in the header; verify keyboard tab order and that Play remains reachable before unlock.
- [Browser scroll restoration can open the page mid-document] → Force `scrollTop = 0` on mount and keep the lock until Play.
- [Unlock and `scrollIntoView` in the same frame can race] → Update state first and scroll in `requestAnimationFrame`; verify the notebook is reached every time.
- [Flush tabs + expansion can overflow narrow viewports] → Shift the expanded tab inward by its gutter overflow, keep `overflow-x: clip`, and test 484×885.
- [Cover padding reduces the paper area] → Re-check leaf typography, padding and internal scrolling on desktop and mobile.
- [Fixed icon ink could lose contrast on some accent strip] → Keep the icon ink dark on the paper tab surface; accents are only strips, not icon backgrounds.
- [Removing the count may hide useful information] → Accepted per the requested tab design; project spreads remain self-describing.
- [Spec/implementation drift] → This revision realigns the spread model, turn, wheel and scroll polish; run `openspec validate` before archiving.

## Migration Plan

1. Add the unlock state and hook gate; verify that wheel/keyboard/touch cannot scroll before Play and that Play unlocks and reaches the notebook.
2. Extract `NotebookTab`; replace the left section markup and the right category markup with it.
3. Apply the active/hover expansion, remove the tooltip and notch, and anchor both columns flush to the cover.
4. Add the fixed icon ink and category icon map; remove the category count.
5. Add the pixel-art cover tokens and frame; inset the stage and re-check the page turn.
6. Update README with the scroll gate, spread model, tab behavior and cover palette.
7. Run `npm run build`, `npm run dev` and `openspec validate add-narrative-notebook --json`; execute the manual checklist in both themes and at 484×885.

Rollback: revert the tasks of this revision; the spread model, content and scroll-snap base remain intact.

## Open Questions

None.
