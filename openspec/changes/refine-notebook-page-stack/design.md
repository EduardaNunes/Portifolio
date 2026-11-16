# Design

## Context

See `proposal.md` for motivation and the accompanying deltas for behavioral requirements. The current open notebook is composed of a shell/cover, a full-size stage that renders two white leaves, an absolute page-turn overlay, and tab navigation positioned outside the shell. Its current layout makes tabs meet the cover boundary. Content pages already provide semantic wrappers, lists, links, localized text, and leaf-local vertical scrolling, but the shared styling is mostly typographic and visually sparse.

The project has no palette policy in its documentation. Current CSS contains theme, cover, paper, tab, category-accent, white, black/ink, gray, and alpha-shadow colors; the requested notebook refinements must not add arbitrary colors.

## Goals / Non-Goals

**Goals:**
- Add a layered, gray visual page stack behind the top spread without changing the spread model or turn transaction.
- Give tabs two stable physical anchors: the page stack when inactive and the adjacent top white leaf when active.
- Make tab icon stroke color an explicit, palette-approved black ink token.
- Introduce reusable pixel-art page primitives that style the existing localized page data and links while preserving leaf containment.
- Establish a documented color inventory and rule for future interface color choices.

**Non-Goals:**
- Altering navigation order, page count, category filtering semantics, translations, or project data.
- Replacing the existing 3D turn implementation, adding new visual dependencies, or redesigning the hero section.
- Adding decorative fixed-language copy or exposing scrollbars.

## Decisions

### 1. Model page depth as a non-interactive layout layer

Add paired page-stack elements inside the notebook shell, behind the stage and above the cover boards. Their stepped edge and repeated inset shadows/stripes will use existing gray/ink/white palette values and create a bounded gutter between cover and white leaves. The stage will be inset horizontally by the stack thickness so the stack remains visible, while the turn layer continues to use the stage's dimensions and spine.

**Rationale:** This preserves the existing spread DOM and animation geometry, so page turns and reduced-motion behavior do not need new state or a separate page model.

**Alternatives considered:** Rendering multiple real leaves was rejected because it would complicate stacking, clipping, accessibility, and the turn animation for a purely visual effect. Painting the stack on the shell background was rejected because it cannot establish reliable tab anchors.

### 2. Compute tab anchoring from active state with layout custom properties

Tabs retain their shared component and active state. The tab container will align to the page-stack outer edge by default. An active-tab modifier will offset only that tab by the stack thickness toward the top leaf. Side-specific transforms keep outward expansion and only add the existing responsive inward correction after the physical anchor offset.

**Rationale:** The state already exists and produces no new interaction behavior. CSS custom properties keep left/right geometry mirrored and avoid duplicate tab components.

**Alternatives considered:** Moving the entire tab list for the active state was rejected because it incorrectly moves inactive tabs. Conditional rendering of duplicate active tabs was rejected because it harms keyboard order and risks visual duplication during changes.

### 3. Make marker attachment instantaneous

The active-state offset that moves a marker between the page stack and top leaf will not be included in the tab transition. Width, label, shadow, and focus/hover presentation may retain their existing short transitions, but the contact-edge position changes immediately when the active section or category changes.

**Rationale:** A delayed transform leaves the marker visibly floating between its physical anchors during page changes.

**Alternatives considered:** Reducing the transform duration was rejected because it still permits a visible detached state and is less deterministic than removing the anchor transition.

### 4. Synchronize page-turn feedback across navigation sources

A single notebook turn transaction will serve corner navigation, left section markers, and right project-category markers. When an animated turn begins, it will play `public/Sounds/book_page_turn.wav` once. Reduced-motion navigation remains direct and does not start a rotational turn or its associated sound. Category selection continues to filter the project spread model, but its visual transition uses the same forward/backward turn direction and turn lock that prevents overlapping page turns.

**Rationale:** The same navigational metaphor and feedback should apply regardless of whether a spread or a project category initiated the change.

**Alternatives considered:** A separate category-only fade was rejected because it weakens the physical-book metaphor. Playing the sound for direct reduced-motion changes was rejected because no page turn occurs.

### 5. Use an explicit black icon token

Define a tab-icon ink token using the existing dark ink (`#1a1917`) and apply it directly to the icon wrapper/SVG, independently from tab foreground and theme variables. Labels and accent strips keep their present roles.

**Rationale:** Direct icon ownership prevents dark-theme inheritance from making SVG strokes light on a pale tab surface.

**Alternatives considered:** Reusing the teal tab-icon token was rejected because the requested result is black. Inheriting the global text color was rejected because it caused the reported contrast issue.

### 6. Build a shared pixel-paper vocabulary over existing semantic markup

Refine each page component only where a semantic grouping or label is missing; otherwise attach shared page classes to existing headings, sections, list rows, metadata chips, timelines, action links, and media areas. CSS will provide square pixel borders, compact header bands, small corner/edge ornaments, entry separators, and content-specific accents from the approved palette. The decorations remain clipped by the leaf and must not be fixed-positioned or consume unbounded width.

**Rationale:** Reusing the existing localized data and semantic controls preserves the current content contract while making all page types visually coherent.

**Alternatives considered:** A single decorative background was rejected because it would not improve information hierarchy. A component rewrite around hard-coded card copy was rejected because it risks localization and content loss.

### 7. Replace corner hover shading with directional arrow affordances

The existing corner buttons retain their semantics, hit areas, disabled limits, and navigation handlers. Their hover-only rectangular shading is replaced by the existing arrow image asset. The left arrow is mirrored to point left, the right arrow points right, and either arrow receives a small scale increase on hover or keyboard focus. The artwork remains decorative because the buttons already expose localized accessible names.

**Rationale:** Directional arrows make the available turn direction explicit without changing the established corner interaction.

**Alternatives considered:** Replacing the buttons with image links was rejected because it would duplicate controls and weaken the existing accessible button behavior.

### 8. Document the source palette in the README

Add a color-policy section to the README that enumerates the current CSS colors by semantic groups (dark/light base, text/ink, blue cover family, orange cover family, neutral/paper/tab grays, section accents, white, and allowed alpha effects). The rule will require reuse of this inventory and an explicit documentation update for any new interface color.

**Rationale:** README is the existing project-facing documentation and keeps the approved palette discoverable without introducing a configuration system.

**Alternatives considered:** A new design-tooling file was rejected as unnecessary for this static React project. Listing only CSS token names was rejected because several existing colors are literal accents or alpha treatments and must be auditable too.

## Risks / Trade-offs

- **Page-stack inset reduces usable leaf width** → use responsive `clamp` sizing and validate both desktop and the existing narrow viewport target; retain leaf-local vertical scrolling.
- **Active tab offset plus expanded-tab correction can misplace tabs at narrow widths** → compose transforms through named custom properties, make anchor changes immediate, and test inactive, active, hover, and focus states on both sides.
- **Category turns can overlap with section turns** → route all animated changes through the existing turn lock and play the sound only at transaction start.
- **Audio playback can be blocked or the asset can fail to load** → invoke playback from the user-initiated navigation path, handle rejected playback promises silently, and keep navigation functional without sound.
- **Expanded visual treatment makes dense localized content taller** → favor compact separators and responsive type/spacing; test long leaves and keep controls in normal document flow.
- **Palette inventory can drift from literals in CSS** → derive the first inventory from the observed current stylesheet and review notebook edits against it during implementation.

## Migration Plan

1. Introduce the documented palette policy before adding notebook colors.
2. Add the page-stack layout and instant tab-anchor styling while retaining the current stage and navigation behavior.
3. Route section, corner, and category changes through the turn transaction; add the bundled page-turn audio at animated-turn start.
4. Apply the shared pixel-paper treatment, remove preview overlay copy, and add directional corner-arrow affordances.
5. Build and manually verify both themes, desktop and narrow layouts, tab keyboard behavior, long-leaf scrolling, project links, category filtering, page turns with audio, directional arrows, and reduced motion.
6. Roll back by reverting the change; no data migrations or persisted-state changes are involved.
