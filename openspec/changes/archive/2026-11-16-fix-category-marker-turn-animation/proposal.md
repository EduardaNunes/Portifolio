# Proposal

## Why

When a user selects a project category via the right-side markers, the notebook should animate a page turn with the same visual feedback (3D rotation, turn lock, sound) used for section markers and corner navigation. Currently, the category change reconstructs the spreads array and clamps the current index; if the clamped index equals the target index, `goToSpread` returns early without triggering the turn animation or playing the page-turn sound. This breaks the physical-book metaphor and leaves category navigation feeling instantaneous and silent compared to other navigation paths.

## What Changes

- Ensure category marker selection always triggers the page-turn transaction (animation + sound) by making the turn origin explicit rather than relying on index equality
- Add a `force` option to `goToSpread` that bypasses the early-return when indices match but the visual content has changed
- Preserve all existing behavior: turn lock, reduced-motion path, sound playback, filtering, and tab anchoring

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `narrative-notebook-component`: Category navigation must use the page-turn transaction and play sound feedback identically to section/corner navigation

## Impact

- `src/components/narrative-notebook-component/NarrativeNotebook.jsx`: Modify `goToSpread` to accept a `force` option; update the `activeCategory` effect to pass it
- `src/components/narrative-notebook-component/PageTurn.jsx`: No changes (already plays sound for all animated turns)
- No API, dependency, or data model changes