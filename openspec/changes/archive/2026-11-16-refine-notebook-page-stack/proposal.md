# Proposal

## Why

The open notebook does not currently communicate a physical stack of pages: tabs appear glued to the cover, and icons can lose contrast in dark mode. Additionally, the current content presentation underutilizes the pixel-art visual language and there is no documented rule controlling the site's allowable colors.

## What Changes

- Add a visual stack of gray pages between the cover and the white spread, simulating underlying pages without changing navigation or available content.
- Re-anchor inactive tabs to the gray page stack, keeping only the active tab attached to the visible white leaf, preserving expansion behavior and accessibility.
- Fix tab icons in the approved black ink color, independent of theme, so they remain legible in both light and dark modes.
- Reorganize and style the content on all pages for a richer pixel-art composition that is legible and contained within each leaf's scrolling bounds.
- Document the site color policy and enumerate the colors currently used in the project; implementation must follow this policy.
- Make marker anchoring changes instant so tabs never visibly float while attaching to or detaching from a leaf.
- Play the bundled `book_page_turn.wav` sound whenever an animated notebook page turn starts, and use the same page-turn transaction when changing project categories from the right-side markers.
- Remove the text overlay from project media previews while preserving the image/video, overlay treatment, and available project actions.
- Replace the dark rectangular corner-hover treatment with the existing arrow artwork, mirrored outward per side and subtly enlarged on hover, without changing corner navigation behavior.

## Capabilities

### New Capabilities
- `site-color-palette`: Documented policy for use, reuse, and cataloging of current site colors.

### Modified Capabilities
- `narrative-notebook-component`: Physical composition of the notebook, tab anchoring, and fixed icon color change.
- `narrative-content-pages`: Visual structured presentation of content leaf data changes, preserving information, location, and existing division.

## Impact

- Notebook CSS and tab/spread components in `src/components/narrative-notebook-component/`.
- Global styles in `src/styles/index.css` and possible semantic classes on content pages.
- `README.md` (or equivalent documentation) for the color policy and updated visual description of the notebook.
- No planned API, dependency, or data model changes.