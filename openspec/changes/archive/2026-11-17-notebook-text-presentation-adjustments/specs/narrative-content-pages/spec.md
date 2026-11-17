# Spec Delta

## MODIFIED Requirements

### Requirement: Pixel-art page presentation
Every notebook leaf MUST present its existing localized information in a structured paper-like composition using a reusable text presentation system. On a marker's first page pair the presentation MUST preserve the existing division of information between left and right leaves, and continuation slices MUST keep that same division on their own pair. The presentation MUST remain legible on supported viewport sizes and MUST use a single ink color for visual hierarchy through size, case, alignment, and ruled lines rather than nested boxes.

#### Scenario: Section leaf hierarchy
- **WHEN** an About Me, Career, Studies, or Contact leaf is rendered
- **THEN** its page title is centered at the top with no box or border, section labels are uppercase and centered with a pixel-stepped decorative underline, data rows and list items rest on dotted ruled lines, and hierarchical grouping is achieved through label alignment and ruled lines rather than bordered containers

#### Scenario: Project leaf hierarchy
- **WHEN** a project leaf is rendered
- **THEN** its existing metadata or demo information is presented with the shared paper-like treatment: left leaf shows centered project title, description in a stepped-corner info box with internal ruled lines, tech stack as uppercase label with chips, and unified action buttons; right leaf retains media frame and absolute-position deploy button with unified button visual (uppercase, 2px border, hover invert)

#### Scenario: Project preview has no demo-copy overlay
- **WHEN** a project image or video preview is rendered
- **THEN** no "Ver demo" or equivalent demo-label text is displayed over the media while the media frame, visual overlay treatment, and deploy action remain available

#### Scenario: Information division is preserved
- **WHEN** any spread is rendered after the presentation refresh
- **THEN** the information remains on the same left or right leaf defined by the content requirements, and any continuation slice keeps the same side it started on

#### Scenario: Right leaf title promotion for single-group leaves
- **WHEN** a right leaf contains only one section group (About Me right leaf "Resultados", Career right leaf "Próximos Passos")
- **THEN** that group's label is promoted to a centered page title (no new copy keys required), while leaves with multiple groups (Studies right leaf) retain only section labels and continuation leaves use the running head instead of the title

#### Scenario: No horizontal overflow on narrow viewport
- **WHEN** the notebook is viewed at 484×885 viewport
- **THEN** all text wraps (overflow-wrap: anywhere), titles use text-wrap: balance where supported, no decoration exceeds leaf width, leaves do not scroll in either direction, and content that exceeds a leaf continues on the next page pair

#### Scenario: Localized content preserved with new presentation
- **WHEN** the active locale is Portuguese or English
- **THEN** refreshed page titles, labels, data rows, list items, info box content, and action buttons remain in the active language with uppercase transformation applied visually only (text-transform) without altering the source strings

### Requirement: Page content remains contained and accessible
Page presentation decorations MUST remain inside the displayed leaf and MUST NOT cause horizontal document scrolling, obscure interactive controls, or require scrolling inside a leaf. Content that exceeds the visible height MUST continue on the next page pair within the same marker instead of becoming a scrollable region, and long content MUST remain readable.

#### Scenario: Long content remains readable
- **WHEN** a leaf's content would exceed its visible height
- **THEN** the excess continues on the next page pair of the same marker, and the leaf itself neither scrolls nor clips content

#### Scenario: Interactive content remains usable
- **WHEN** a leaf includes a link, contact action, repository action, or deploy action
- **THEN** its control remains visible, keyboard reachable, and operable within the decorated layout

#### Scenario: Narrow screen containment
- **WHEN** the notebook is viewed on a narrow supported viewport
- **THEN** page decorations and text remain within each 50% leaf and the document does not gain horizontal scrolling

### Requirement: Spread ordering and counting convention
The notebook MUST order markers as About Me → Career → Studies → Projects → Contact. Each marker contributes at least one base page pair, and a marker whose content exceeds one leaf contributes one additional page pair per continuation required. The total spread count is the number of configured base pairs plus continuation pairs (`B + C`), and that sequence remains the single source used to render and navigate the notebook.

#### Scenario: Page order from left to right
- **WHEN** notebook opens after Play click
- **THEN** spreads appear in this exact sequence: About Me → Career → Studies → [Projects with variable length] → Contact, with each continuation pair immediately after the pair it continues and before the next marker

#### Scenario: First spread is always About Me
- **WHEN** the notebook first opens or navigates from the beginning
- **THEN** the visible spread shows About Me content split across both leaves

#### Scenario: Projects section variable length
- **WHEN** different numbers of projects exist across categories (Jogos: 2, WebDev: 3, BackEnd: 1, IA e Automações: 0)
- **THEN** total project spreads equal the number of active projects in the selected category, and the notebook continues to Contact afterward

#### Scenario: Empty category handling
- **WHEN** a maintainer adds a page pair to WebDev
- **THEN** both WebDev pairs appear consecutively between Jogos and BackEnd during arrow navigation
