# Spec Delta

## MODIFIED Requirements

### Requirement: Pixel-art page presentation
Every notebook leaf MUST present its existing localized information in a structured paper-like composition using a reusable text presentation system. The presentation MUST preserve the existing division of information between left and right leaves, MUST remain legible on supported viewport sizes, and MUST use a single ink color for visual hierarchy through size, case, alignment, and ruled lines rather than nested boxes.

#### Scenario: Section leaf hierarchy with ruled paper style
- **WHEN** an About Me, Career, Studies, or Contact leaf is rendered
- **THEN** its page title is centered at the top with no box or border, section labels are uppercase and centered with a pixel-stepped decorative underline, data rows and list items rest on dotted ruled lines, and hierarchical grouping is achieved through label alignment and ruled lines rather than bordered containers

#### Scenario: Project leaf hierarchy with ruled paper style
- **WHEN** a project leaf is rendered
- **THEN** its existing metadata or demo information is presented with the shared paper-like treatment: left leaf shows centered project title, description in a stepped-corner info box with internal ruled lines, tech stack as uppercase label with chips, and unified action buttons; right leaf retains media frame and absolute-position deploy button with unified button visual (uppercase, 2px border, hover invert)

#### Scenario: Information division is preserved
- **WHEN** any spread is rendered after the presentation refresh
- **THEN** the information remains on the same left or right leaf defined by the content requirements

#### Scenario: Right leaf title promotion for single-group leaves
- **WHEN** a right leaf contains only one section group (About Me right leaf "Resultados", Career right leaf "Próximos Passos")
- **THEN** that group's label is promoted to a centered page title (no new copy keys required), while leaves with multiple groups (Studies right leaf) retain only section labels

#### Scenario: No horizontal overflow on narrow viewport
- **WHEN** the notebook is viewed at 484×885 viewport
- **THEN** all text wraps (overflow-wrap: anywhere), titles use text-wrap: balance where supported, no decoration exceeds leaf width, and vertical scrolling remains the only scroll direction

#### Scenario: Localized content preserved with new presentation
- **WHEN** the active locale is Portuguese or English
- **THEN** refreshed page titles, labels, data rows, list items, info box content, and action buttons remain in the active language with uppercase transformation applied visually only (text-transform) without altering the source strings