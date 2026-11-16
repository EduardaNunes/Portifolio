# Tasks

## 1. Implementation

- [x] 1.1 Modify `goToSpread` in `src/components/narrative-notebook-component/NarrativeNotebook.jsx` to accept an `options` parameter with `force` boolean; bypass the `clamped === safeSpread` early-return when `options.force === true`. Verify the change compiles.
- [x] 1.2 Update the `activeCategory` effect in `NarrativeNotebook.jsx` to call `goToSpread(firstProject, { force: true, fromSpread: visualSpreadRef.current })`. Verify the change compiles.
- [x] 1.3 Run `npm run build` and fix any build failures; verify the production build completes successfully.

## 2. Verification

- [x] 2.1 Run `openspec validate fix-category-marker-turn-animation --strict` and resolve all validation errors and warnings.
- [x] 2.2 Manual validation: Start dev server (`npm run dev`). In both light and dark themes, click each right-side category marker. Verify:
  - Page-turn animation (3D rotation) plays
  - `book_page_turn.wav` sound plays once at turn start
  - Turn lock prevents overlapping turns (rapid clicks)
  - After turn completes, the active category tab is visually anchored to the right leaf
  - Project content reflects the selected category
- [x] 2.3 Manual validation (reduced motion): Enable "Reduce motion" in OS settings, reload. Click category markers. Verify:
  - Content changes instantly without rotation
  - No sound plays
  - Active category tab updates immediately
  - Filtering works correctly
- [x] 2.4 Manual validation (edge cases): 
  - Click same category twice rapidly → second click no-ops (turn lock)
  - Switch category, then immediately click section marker → section navigation still works with animation and sound
  - Navigate to last spread, then change category → turn direction correct (backward if category has fewer projects)

## Workflow follow-up

- Archive the change after all tasks are complete and manual validation passes.
- Verify the archived result.