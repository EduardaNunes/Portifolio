# Proposal

## Why

The portfolio currently displays animated clouds only in the header section (hero-section), occupying just one viewport height (100vh). The user wants the cloud background to extend across the entire document, covering both the header and the notebook section, so the visual experience is consistent throughout the page.

## What Changes

- **Expand cloud background**: The `.clouds` CSS layer will be modified to span the full document height (approximately 200vh) instead of just 100vh, so clouds appear behind both the header and the notebook section.
- **Adjust cloud positioning**: The absolute positioning and animation will be updated to work across the extended height, ensuring clouds are visible and animate smoothly as the user scrolls from header to notebook.

## Capabilities

### New Capabilities

- `cloud-background`: Covers the entire document height with animated clouds, extending beyond the initial viewport to include the notebook section. This capability owns the visual behavior of the cloud background layer across all document sections.

### Modified Capabilities

- None

## Impact

- `src/components/Clouds.jsx` - May need adjustment to animation parameters for extended height
- `src/styles/index.css` - `.clouds` class will have height changed from `100vh` to cover full document, and positioning adjusted
- The change is purely visual/refactoring - no behavioral changes to functionality