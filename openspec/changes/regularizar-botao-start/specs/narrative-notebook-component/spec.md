# Spec Delta

## MODIFIED Requirements

### Requirement: Notebook starts closed, opens on click in second section
**When** the notebook component renders  
**THEN** it MUST start collapsed (not displaying any pages) until the start control triggers auto-scroll  
**WHEN** start is activated and auto-scroll animation completes  
**THEN** notebook MUST open by flipping to first spread ("Sobre Mim" / About Me), displaying its two facing leaves

#### Scenario: Notebook initially closed
- **WHEN** page loads or after header section is visible
- **THEN** notebook area shows collapsed state (no leaves or tabs rendered)

#### Scenario: Notebook opens on first play click
- **WHEN** start is activated and scroll snap completes at second section
- **THEN** notebook flips open to display the "Sobre Mim" spread with left/right content areas after the flip animation completes

### Requirement: Pixel-art book cover sides with theme palette
The left and right sides of the notebook MUST act as pixel-art cover boards using only approved theme colors. When open, a visible gray, stepped page stack MUST sit between each cover board and the outer edge of the white spread, making the displayed leaf read as the top sheet of a larger set of pages. The stack is visual-only and MUST NOT change the spread count, navigation, page-turn behavior, or available content.

#### Scenario: Dark theme cover
- **WHEN** the site is in dark theme
- **THEN** the left and right cover boards use the approved blue palette

#### Scenario: Light theme cover
- **WHEN** the site is in light theme
- **THEN** the left and right cover boards use the approved orange palette

#### Scenario: Cover surrounds the leaves
- **WHEN** the notebook is open
- **THEN** the cover boards and intervening page stacks remain visible on both sides of the white leaves

#### Scenario: Closed notebook keeps the cover
- **WHEN** the notebook is closed before start
- **THEN** the collapsed notebook still presents the pixel-art cover in the current theme colors

#### Scenario: No new colors
- **WHEN** the cover is inspected in either theme
- **THEN** every color used already exists in the project palette

#### Scenario: Page stack is visible behind the spread
- **WHEN** the notebook is open
- **THEN** gray layered page edges are visible between both cover boards and their adjacent white leaf edges

#### Scenario: Top leaf remains prominent
- **WHEN** the page stack is visible
- **THEN** the current white left and right leaves remain fully legible and visually above the gray stack

#### Scenario: Existing notebook interactions are preserved
- **WHEN** the user changes spread through a tab or corner navigation
- **THEN** the current navigation, page-turn animation, category filtering, and reduced-motion behavior continue to work

### Requirement: Corner navigation uses directional arrow affordances
The previous and next corner controls MUST retain their existing navigation behavior, localized accessible names, and first/last-page disabled limits. Their hover treatment MUST use the existing arrow artwork instead of a dark rectangular hover fill. The left affordance MUST point left, the right affordance MUST point right, and each MUST scale up slightly on hover or keyboard focus.

#### Scenario: Directional corner affordances
- **WHEN** an enabled previous or next corner control is visible
- **THEN** it presents the corresponding existing arrow artwork pointing outward from the notebook

#### Scenario: Hover and focus arrow feedback
- **WHEN** a user hovers or keyboard-focuses an enabled corner control
- **THEN** its arrow increases slightly in size without changing the control's navigation target or hit area

#### Scenario: Boundary corner controls remain disabled
- **WHEN** the notebook is at the first or last spread
- **THEN** the unavailable previous or next control remains non-operable and its directional affordance is not presented as available

#### Scenario: Closed notebook keeps the cover
- **WHEN** the notebook is closed before start
- **THEN** the collapsed notebook still presents the pixel-art cover in the current theme colors

#### Scenario: No new colors
- **WHEN** the cover is inspected in either theme
- **THEN** every color used already exists in the project palette

#### Scenario: Approved palette only
- **WHEN** the cover and page stack are inspected in either theme
- **THEN** every opaque interface color used is listed in the documented approved palette

### Requirement: Page turn sound plays at controlled volume
The narrative notebook component SHALL play page turn sounds through the Audio Manager at the current Sound Effects volume level.

#### Scenario: Page turn uses Audio Manager
- **WHEN** user turns a page in the notebook
- **THEN** the page turn sound is played via Audio Manager with "sfx" category at current SFX volume