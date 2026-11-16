# Design

## Context

See proposal.md for motivation.

Current state (from `refine-notebook-page-stack`):
- `NarrativeNotebook.jsx` has `goToSpread(index)` that early-returns when `clamped === safeSpread`
- Category changes come through `activeCategory` prop → `useEffect` → calls `goToSpread(firstProject)`
- `visualSpreadRef` tracks the visually current spread (updated on turn finish and reduced-motion path)
- `PageTurn.jsx` already plays `book_page_turn.wav` for all animated turns

Problem: When `activeCategory` changes, the parent rebuilds `spreads`. The `totalSpreads` effect clamps `currentSpread` to the new array length. Then the `activeCategory` effect finds `firstProject` in the new array. If `firstProject === safeSpread` (e.g., both are 3), `goToSpread` returns early — no turn, no sound.

## Goals / Non-Goals

**Goals:**
- Category marker selection always triggers the page-turn transaction (animation + sound)
- Behavior identical to section markers and corner navigation
- No breaking changes to existing navigation, filtering, or reduced-motion path
- Follow scalable patterns, not temporary patches

**Non-Goals:**
- Changing the turn animation duration, easing, or visual style
- Modifying `PageTurn.jsx` (already correct)
- Changing the spread model or category filtering logic
- Adding new props to `NarrativeNotebook` from parent

## Decisions

### Decision: Add `force` option to `goToSpread`

**Approach:** Extend `goToSpread` signature to accept an options object `{ force?: boolean, fromSpread?: Spread }`. When `force === true`, bypass the `clamped === safeSpread` early-return.

**Rationale:**
- Minimal, surgical change to the existing navigation primitive
- Keeps the turn-lock (`turningRef`), sound, reduced-motion, and tab anchoring logic intact
- Explicit intent: "force" signals "content changed even if index didn't"
- Reusable if other callers ever need the same guarantee
- Alternative considered: comparing spread content (spread.id or section) — rejected because it couples `goToSpread` to spread structure and adds unnecessary complexity. The caller (`activeCategory` effect) already knows when content changed.

### Decision: `activeCategory` effect passes `force: true`

**Approach:** In the `useEffect` for `activeCategory`, call `goToSpread(firstProject, { force: true, fromSpread: visualSpreadRef.current })`.

**Rationale:**
- Category change by definition means project content changed
- `fromSpread: visualSpreadRef.current` ensures the turn animates from what the user currently sees, not from a stale index in the new `spreads` array
- No other callers need `force` today (section markers and corners always navigate to different indices)

### Decision: Keep `fromSpread` as separate option

**Approach:** `fromSpread` remains a distinct option (already added in prior change). `force` only controls the early-return; `fromSpread` controls the turn origin.

**Rationale:**
- Separation of concerns: "should I turn?" vs "from where?"
- `fromSpread` is needed for category turns; `force` is needed when indices collide
- Both can be used together or independently

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| `force` could be misused to stack turns | `turningRef.current` guard runs before `force` check — a turn in progress still blocks new ones |
| Reduced-motion path with `force` | `prefersReducedMotion()` branch commits directly without animation or sound — `force` has no effect there, which is correct |
| `visualSpreadRef` stale during rapid category clicks | `turningRef` prevents concurrent turns; ref updated synchronously in reduced-motion path and on turn finish |
| Future caller passes `force` incorrectly | Internal function, not exported; only `activeCategory` effect uses it today. Code comment documents intent. |

## Migration Plan

1. Modify `goToSpread` in `NarrativeNotebook.jsx` to accept `options` parameter with `force`
2. Update `activeCategory` effect to pass `{ force: true, fromSpread: visualSpreadRef.current }`
3. Run `npm run build` and `openspec validate`
4. Manual validation: click category markers → verify turn animation + sound in both themes, verify reduced-motion skips both, verify filtering works after turn

## Open Questions

None.