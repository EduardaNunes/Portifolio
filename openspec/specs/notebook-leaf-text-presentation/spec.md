# notebook-leaf-text-presentation Specification

## Purpose
Provides a reusable text presentation system for fixed, non-scrolling notebook leaves that implements a paper-like aesthetic: centered titles, uppercase section labels with pixel-stepped underlines, dotted ruled lines for data rows and lists, circular check markers, stepped-corner info boxes with internal ruled lines, unified action buttons, and small chips — all using a single ink color palette with hierarchy through size, case, alignment, and lines rather than nested boxes.

## Requirements

### Requirement: Notebook leaf ink token aliases
The notebook leaf SHALL expose three CSS custom property aliases scoped to `.notebook-leaf` that map to existing approved palette colors: `--page-ink` for titles and borders, `--page-ink-soft` for ruled lines and labels, and `--page-line` for dotted ruled lines (alias of `--page-ink-soft`). No new colors are introduced.

#### Scenario: Token aliases resolve to approved palette
- **WHEN** a notebook leaf is rendered in either light or dark theme
- **THEN** `--page-ink` resolves to `--paper-accent` (#145053), `--page-ink-soft` resolves to `--strong` (#26696d), and `--page-line` resolves to the same as `--page-ink-soft`, all of which are documented in the project palette

#### Scenario: Token aliases documented in README
- **WHEN** the palette documentation is reviewed
- **THEN** the three aliases appear in the "Notebook paper palette" section with their source color references

### Requirement: Page title presentation
Every notebook leaf that serves as a section entry point SHALL display a centered page title at the top of the leaf with no background, border, or box — only the ink-colored text, sized responsively with clamp() and vertically spaced from following content.

#### Scenario: Section spread left leaf shows page title
- **WHEN** About Me, Career, Studies, or Contact left leaf renders
- **THEN** an `h2.page-title` appears centered with font-size clamp(0.95rem, 3vw, 1.45rem), line-height 1.2, ink color, no border/background, margin-bottom 0.9rem

#### Scenario: Section spread right leaf shows page title when single group
- **WHEN** About Me right leaf ("Resultados") or Career right leaf ("Próximos Passos") renders
- **THEN** the single group's label is presented as a centered `h2.page-title` with the same styling as left leaf titles

#### Scenario: Right leaf with multiple groups retains only section labels
- **WHEN** Studies right leaf renders (has "Conquistas e Cursos" and "Projetos Acadêmicos")
- **THEN** no page title appears; only uppercase centered `page-label` section labels are shown

#### Scenario: Project left leaf shows project title centered
- **WHEN** a project spread left leaf renders
- **THEN** the project name appears as centered `h2.page-title` replacing the previous left-aligned boxed header

### Requirement: Section label presentation
Section groupings within a leaf SHALL be introduced by an uppercase centered label with a pixel-stepped decorative underline, using the soft ink color, sized smaller than the page title.

#### Scenario: Section label renders with pixel-stepped underline
- **WHEN** a `page-label` element renders
- **THEN** it displays uppercase text, centered, letter-spacing 0.06em, font-size clamp(0.5rem, 1.3vw, 0.62rem), soft ink color, with a ::after decorative underline consisting of two dotted segments: full width 2px line plus a 50%-width 2px line offset by 25% and 2px down, creating a pixel-stepped appearance

#### Scenario: Section label spacing
- **WHEN** a `page-label` follows a page title or another section's content
- **THEN** it has margin-top 0.9rem and margin-bottom 0.5rem to separate from adjacent content

### Requirement: Data field rows with dotted ruled lines
Key-value data rows SHALL render as a single inline flow where the uppercase label (with trailing colon) and value share the same line and wrap together, with a dotted ruled line always positioned under the last text fragment.

#### Scenario: Data field renders label and value inline with bottom ruled line
- **WHEN** a `page-field` element renders with child `.field-label` and `.field-value`
- **THEN** the label appears in soft ink with a trailing colon, the value in ink color, both inline with overflow-wrap: anywhere so the value wraps to the next line if needed, and a repeating-linear-gradient dotted rule (2px ink, 2px transparent) sits at the bottom of the element covering the full width

#### Scenario: Data field pair renders side-by-side on wide leaves
- **WHEN** a `page-field-pair` container holds two `page-field` children
- **THEN** they display side-by-side via flex-wrap with gap 0.9rem, each flex: 1 1 8.5em, collapsing to stacked on narrow leaves

#### Scenario: No solid borders or background boxes on data fields
- **WHEN** any `page-field` renders
- **THEN** it has no border, no background color, no padding box — only the bottom dotted ruled line

### Requirement: Lists with circular markers
List items SHALL use a circular marker (empty ring for pending, filled with inner-ring "check" for done) aligned to the first line of the item text, with a dotted ruled line under each item, and no bullet characters or checkmark glyphs in the text content.

#### Scenario: List item renders with circular marker and ruled line
- **WHEN** a `page-list-item` renders with a `page-marker` child
- **THEN** the marker is a 0.65rem circle with 2px ink border, border-radius 50%, transparent background for pending; when `.is-done` is present, background becomes ink with an inset 2px paper-color box-shadow creating an inner-ring check appearance; the marker is flex-none with 0.5rem gap to text

#### Scenario: List item text rests on dotted ruled line
- **WHEN** a `page-list-item` renders
- **THEN** it has a bottom dotted ruled line (same 2px/2px pattern as data fields) under the text content, with padding 0.35rem top/bottom

#### Scenario: Completed state conveyed to screen readers
- **WHEN** a list item has `.is-done` marker
- **THEN** the completion state is also available to assistive technology via sr-only text or aria-label on the item, while the visual marker remains aria-hidden

#### Scenario: Course lists and goal lists use circular markers
- **WHEN** Studies right leaf "Conquistas e Cursos" or Career right leaf "Próximos Passos" renders
- **THEN** each item uses `page-list`/`page-list-item` with `page-marker` (`.is-done` for completed courses), replacing previous `✓`/`…` characters and plain lines

### Requirement: Info box with stepped corners and internal ruled lines
Informational content blocks SHALL render in a thin-bordered box with 3px pixel-stepped corners (via clip-path), an uppercase title, body text in paper-text color, and internal horizontal dotted ruled lines that align with the line-height (1.6) so each text line rests on a rule.

#### Scenario: Info box renders with stepped corners
- **WHEN** a `page-note` element renders
- **THEN** it has a 1px solid ink border, clip-path polygon creating 3px stepped corners on all four corners, padding 0.5rem/0.6rem, line-height 1.6, and a repeating-linear-gradient background on content-box producing horizontal dotted rules every 1.6em (matching line-height)

#### Scenario: Info box internal ruled lines match text lines
- **WHEN** a `page-note` contains multiple lines of text
- **THEN** each line of text sits directly on a dotted rule with no forced minimum height or empty filler lines — the rules extend only as far as actual content

#### Scenario: Info box title styling
- **WHEN** a `page-note` has a `.note-title` child
- **THEN** the title displays as block, uppercase, ink color, margin-bottom 0.2rem

#### Scenario: Project description and current role use info boxes
- **WHEN** ProjectLeftPage description or CareerPage currentRole renders
- **THEN** content appears in a `page-note` with stepped corners and internal ruled lines

### Requirement: Unified action buttons
All textual action controls in notebook leaves SHALL share a single visual style: uppercase, rectangular, 2px ink border, square corners, fixed minimum height, paper background, ink text, hover invert, focus-visible outline.

#### Scenario: Action button renders with unified style
- **WHEN** a `page-action` element (anchor or button) renders
- **THEN** it displays as inline-flex, centered, min-height 1.9rem, padding 0.25rem/0.6rem, 2px solid ink border, border-radius 0, paper background, uppercase text, letter-spacing 0.04em, ink color, no text-decoration

#### Scenario: Action button hover and focus states
- **WHEN** a `page-action` receives hover or focus-visible
- **THEN** hover inverts to ink background with paper text; focus-visible shows 2px outline in paper-text color

#### Scenario: Action group layout
- **WHEN** a `page-actions` container holds multiple `page-action` children
- **THEN** they display as flex-wrap row, justify-content flex-end, gap 0.5rem, margin-top 0.7rem

#### Scenario: Deploy button retains absolute position with unified visual
- **WHEN** ProjectRightPage deploy button renders
- **THEN** it keeps its existing absolute top-right positioning but adopts the `page-action` visual style (uppercase, 2px border, hover invert)

### Requirement: Chip tags for skills and technologies
Skill and technology tags SHALL render as small uppercase chips with 1px ink border, square corners, minimal padding, and small font size, replacing comma-separated plain text.

#### Scenario: Chip renders with unified style
- **WHEN** a `page-chip` element renders
- **THEN** it displays uppercase text, 1px solid ink border, border-radius 0, padding 0.16rem/0.35rem, font-size 0.5rem, ink color on paper background

#### Scenario: Skill tags on About Me use chips
- **WHEN** About Me left leaf technical skills render
- **THEN** each skill's tags appear as individual `page-chip` elements in a flex-wrap container instead of a comma-joined string

#### Scenario: Project tech stack uses chips
- **WHEN** ProjectLeftPage tech stack renders
- **THEN** each technology appears as a `page-chip` under a `page-label` "Tech Stack"

### Requirement: Text behavior rules
All text in notebook leaves SHALL follow consistent behavioral rules: no truncation or ellipsis (always wrap), short titles use text-wrap: balance where supported, no decoration requires fixed width exceeding leaf width, sizes use clamp() and relative units, no new animations, focus-visible outlines retained. Leaves are fixed pages: they do not scroll in either direction, and text that exceeds a leaf is continued on the next page pair instead of being scrolled.

#### Scenario: Long text wraps without horizontal overflow
- **WHEN** a notebook leaf contains long localized strings in Portuguese or English
- **THEN** text wraps via overflow-wrap: anywhere (already on leaf), no horizontal scrollbar appears at 484px viewport, the leaf does not scroll in either direction, and excess content continues on the next page pair instead of becoming scrollable

#### Scenario: Titles and labels avoid mid-word breaks on short words
- **WHEN** a `page-title` or `page-label` renders on a narrow leaf
- **THEN** text-wrap: balance is applied where supported to prevent awkward breaks

#### Scenario: Reduced motion respected
- **WHEN** user prefers reduced motion
- **THEN** no new animations are introduced by the text presentation system; existing page turn animation behavior is unchanged

#### Scenario: Focus visible on all interactive elements
- **WHEN** any `page-action`, link, or interactive element in a leaf receives keyboard focus
- **THEN** a 2px outline in `--paper-text` is visible per existing accessibility requirements
