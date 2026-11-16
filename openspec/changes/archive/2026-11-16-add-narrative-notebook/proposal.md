# Proposal

## Why

The portfolio needs a smooth, scroll-snap enabled second section with a notebook-style navigation system. Currently, after the initial header/profile view (complete with theme toggle and animated clouds), the page can be scrolled before the user intentionally opens the notebook. Clicking Play should be the deliberate entry point: the document stays locked until Play is pressed, then scrolling is unlocked for the rest of the session. The notebook also needs one coherent page-tab system on both sides of an open book and a cover that matches the site's existing pixel-art identity.

## What Changes

- **Initial scroll gate**: before the first Play click the document MUST NOT scroll; Play unlocks scrolling and moves to the notebook. After that, the page scrolls up and down freely for the rest of the session. Reloading returns to the locked state.
- **Scroll Snap Navigation**: auto-scroll from header to content section with viewport-based snap scrolling.
- **Notebook Interface**: open double-page spread with two facing leaves, a physical page-turn animation, and a notebook container centered at ~80vw × ~80vh. Content is split between the two leaves; the model is `4 + N` spreads / `8 + 2N` leaves.
- **Shared page tabs**: left section markers and right project category markers use the same mirrored tab component. The active tab stays visible and expands horizontally; hovering or focusing a tab expands it and reveals its label inside the tab.
- **No floating tooltip**: the old hover tooltip is removed in favor of the expanding label.
- **Tabs attached to the notebook**: tabs sit flush against the notebook cover, with no floating gap and no semicircular notch/dot. Left tabs expand outward to the left; right tabs expand outward to the right.
- **Theme-independent tab icons**: marker icons keep a fixed ink color and stay visible in both light and dark themes.
- **Pixel-art book cover**: the notebook sides become cover boards styled like the Play button's stepped pixel-art frame. The cover uses the existing palette only: blue family in the dark theme and orange family in the light theme.
- **Right project category tabs**: IA e Automações, Jogos, WebDev and BackEnd are mirrored page tabs that filter project spreads. The active category stays visible and expanded; the project count is not displayed on the tabs.
- **Multi-spread project display**: each project occupies one spread (left leaf: metadata/description/tools/repo; right leaf: demo video/image and deploy link).
- **Corner navigation**: flip to the previous/next spread by clicking the bottom-left or bottom-right corner.
- **Wheel and scroll polish**: hidden scrollbars, vertical-only document scroll, and mouse-wheel navigation that reuses the same smooth movement as Play.
- **Content sections**: About Me, Career, Studies, Projects and Contact, divided across the two leaves of each spread.

## Capabilities

### New Capabilities

- **narrative-notebook-scroller**: handles the initial scroll lock, Play unlock, scroll-snap behavior, and the smooth wheel/section transition from header to content.
- **narrative-notebook-component**: open-spread notebook with physical page turns, shared mirrored page tabs for sections and project categories, theme-stable tab icons, and a pixel-art cover whose side colors follow the theme.
- **narrative-content-pages**: defines the content structure for all spreads, project-specific layouts, category filtering, and marker states.

### Modified Capabilities

None

## Impact

Affected files:
- `src/App.jsx` — scroll-unlock state, section/category descriptors, spread composition.
- `src/hooks/useSectionSnap.js` — wheel controller enabled only after Play.
- `src/components/PlayButton.jsx`, `src/components/HeaderText.jsx` — Play unlock flow.
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` — spread stage, page-turn layer, tab composition, corner navigation.
- `src/components/narrative-notebook-component/NotebookTab.jsx` (new) — shared mirrored section/category tab.
- `src/components/narrative-notebook-component/ProjectsSection.jsx` — right category tabs rendered with `NotebookTab`; no project count.
- `src/components/narrative-notebook-component/PageTurn.jsx` — physical two-faced page turn.
- `src/utils/buildNotebookPages.js` — spread model (`4 + N` / `8 + 2N`).
- `src/utils/scrollToSection.js` — shared smooth section movement.
- `src/styles/index.css` — scroll lock, flush/expandable tabs, fixed icon ink, pixel-art cover tokens, removed tooltip/notch, hidden scrollbars.
- `src/data/projects.js` — category identity only; project count is no longer rendered on tabs.
- `README.md` — scroll gate, spread model, tab behavior, cover palette.

Out of scope:
- Redesigning the header, clouds or global site palette.
- Adding new colors outside the palette already present in `src/styles/index.css`.
- Adding animation dependencies, WebGL/Three.js or a backend.
- Reworking the content itself beyond splitting it across the facing leaves.
