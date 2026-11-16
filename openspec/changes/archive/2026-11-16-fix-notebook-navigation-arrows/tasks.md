# Tasks

## 1. Implementation

- [x] 1.1 Update `src/components/narrative-notebook-component/NarrativeNotebook.jsx`: move corner zone buttons inside `.notebook-stage` (after the spread/turn markup); remove inline SVG arrows (buttons render empty, arrows applied via CSS mask); verify the change compiles.
- [x] 1.2 Update `src/styles/index.css`: remove `--corner-arrow-img` from `:root` and `.lightmode`; remove `.corner-zone::after`, `.corner-zone.left::after`, `.corner-zone.right::after`, and hover/focus `::after` rules; add `mask-image` rules on `.corner-zone` using `/Imgs/ArrowBlack.png` (dark) and `/Imgs/ArrowWhite.png` (light); add `--corner-hover-color` variable (`#e88d00` dark, `#99c0c2` light); add `.corner-zone` color/transition rules using original theme colors (black/white) at rest and `--corner-hover-color` on hover/focus; **mirror left arrow with `transform: scaleX(-1)` on `.corner-zone.left` so it points outward (left); combine with hover scale via `transform: scaleX(-1) scale(1.15)`**; **center arrow vertically with `mask-position: center center` for equal top/bottom margins**; verify the change compiles.
- [x] 1.3 Run `npm run build` and fix any build failures; verify the production build completes successfully.

## 2. Verification

- [x] 2.1 Run `openspec validate fix-notebook-navigation-arrows --strict` and resolve all validation errors and warnings.
- [x] 2.2 Manual validation (dark theme): Start dev server (`npm run dev`). Verify:
  - Both corner arrows visible at bottom of white leaf at rest (black `#1a1917`, 100% opacity)
  - **Left arrow points left (outward), right arrow points right (outward)**
  - **Arrows centered vertically with equal top/bottom margins (no content overlap)**
  - Hover left arrow → color changes to darker orange (`--corner-hover-color: #e88d00`), scales 1.15× (mirrored scale)
  - Hover right arrow → same orange color change, scales 1.15×
  - Focus-visible outline works (Tab to corners)
  - Disabled state (first/last spread) hides arrows completely
  - Navigation still works: click arrows → page turn with animation and sound
- [x] 2.3 Manual validation (light theme): Toggle to light theme. Verify:
  - Arrows at rest: white (`#f9efe4`), 100% opacity
  - **Left arrow points left (outward), right arrow points right (outward)**
  - **Arrows centered vertically with equal top/bottom margins (no content overlap)**
  - Hover/focus: color changes to blue (`--corner-hover-color: #99c0c2`)
  - All other behaviors same as dark theme
- [x] 2.4 Manual validation (edge cases):
  - Reduced motion: arrows still change color on hover, no transform animation
  - Viewport resize: arrows stay on white leaf, never overflow
  - Rapid clicks: turn lock still prevents stacked turns
  - Category change then corner nav: arrows work correctly

## Workflow follow-up

- Archive the change after all tasks are complete and manual validation passes.
- Verify the archived result.