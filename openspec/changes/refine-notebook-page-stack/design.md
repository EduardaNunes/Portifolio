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

### 3. Use an explicit black icon token

Define a tab-icon ink token using the existing dark ink (`#1a1917`) and apply it directly to the icon wrapper/SVG, independently from tab foreground and theme variables. Labels and accent strips keep their present roles.

**Rationale:** Direct icon ownership prevents dark-theme inheritance from making SVG strokes light on a pale tab surface.

**Alternatives considered:** Reusing the teal tab-icon token was rejected because the requested result is black. Inheriting the global text color was rejected because it caused the reported contrast issue.

### 4. Build a shared pixel-paper vocabulary over existing semantic markup

Refine each page component only where a semantic grouping or label is missing; otherwise attach shared page classes to existing headings, sections, list rows, metadata chips, timelines, action links, and media areas. CSS will provide square pixel borders, compact header bands, small corner/edge ornaments, entry separators, and content-specific accents from the approved palette. The decorations remain clipped by the leaf and must not be fixed-positioned or consume unbounded width.

**Rationale:** Reusing the existing localized data and semantic controls preserves the current content contract while making all page types visually coherent.

**Alternatives considered:** A single decorative background was rejected because it would not improve information hierarchy. A component rewrite around hard-coded card copy was rejected because it risks localization and content loss.

### 5. Document the source palette in the README

Add a color-policy section to the README that enumerates the current CSS colors by semantic groups (dark/light base, text/ink, blue cover family, orange cover family, neutral/paper/tab grays, section accents, white, and allowed alpha effects). The rule will require reuse of this inventory and an explicit documentation update for any new interface color.

**Rationale:** README is the existing project-facing documentation and keeps the approved palette discoverable without introducing a configuration system.

**Alternatives considered:** A new design-tooling file was rejected as unnecessary for this static React project. Listing only CSS token names was rejected because several existing colors are literal accents or alpha treatments and must be auditable too.

## Risks / Trade-offs

- **Page-stack inset reduces usable leaf width** → use responsive `clamp` sizing and validate both desktop and the existing narrow viewport target; retain leaf-local vertical scrolling.
- **Active tab offset plus expanded-tab correction can misplace tabs at narrow widths** → compose transforms through named custom properties and test inactive, active, hover, and focus states on both sides.
- **Expanded visual treatment makes dense localized content taller** → favor compact separators and responsive type/spacing; test long leaves and keep controls in normal document flow.
- **Palette inventory can drift from literals in CSS** → derive the first inventory from the observed current stylesheet and review notebook edits against it during implementation.

## Migration Plan

1. Introduce the documented palette policy before adding notebook colors.
2. Add the page-stack layout and tab anchor styling while retaining current stage, tab, and turn behavior.
3. Apply the shared pixel-paper treatment to page components and styles.
4. Build and manually verify both themes, desktop and narrow layouts, tab keyboard behavior, long-leaf scrolling, project links, category filtering, page turns, and reduced motion.
5. Roll back by reverting the change; no data migrations or persisted-state changes are involved.
