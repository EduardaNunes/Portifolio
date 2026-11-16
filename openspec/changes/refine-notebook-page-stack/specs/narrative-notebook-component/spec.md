# Spec Delta

## MODIFIED Requirements

### Requirement: Page tabs sit flush against the notebook
Tabs MUST touch the notebook's visible page system with no floating gap. Inactive tabs MUST meet the visible gray page stack behind the displayed white leaf. The active tab MUST instead meet the corresponding outer edge of the displayed white leaf, visibly associating it with the current spread. Left tabs expand outward to the left and right tabs expand outward to the right while the side gutter is wide enough. On narrow viewports the expanded tab MUST slide inward over the notebook only enough to keep its inline label on screen, while retaining its assigned page-stack or active-leaf anchor. Tabs MUST NOT use a semicircular notch or dot.

#### Scenario: Inactive tabs touch the page stack
- **WHEN** the notebook is open and a tab is not active
- **THEN** its inner edge is visually flush with the gray page stack rather than the cover board

#### Scenario: Left tabs touch the cover
- **WHEN** the notebook is open
- **THEN** each left tab remains physically integrated with the notebook through its page-stack or active-leaf contact edge, not through a floating gap

#### Scenario: Right tabs touch the cover
- **WHEN** Projects is active
- **THEN** each right tab remains physically integrated with the notebook through its page-stack or active-leaf contact edge, not through a floating gap

#### Scenario: Active left section tab touches the displayed leaf
- **WHEN** a section spread is current
- **THEN** the active left tab is visually flush with the outer edge of the visible left white leaf

#### Scenario: Active right category tab touches the displayed leaf
- **WHEN** a project category is selected on a Projects spread
- **THEN** the active right category tab is visually flush with the outer edge of the visible right white leaf

#### Scenario: Expansion keeps the anchor
- **WHEN** a tab expands on hover or because it is active and the side gutter fits the expanded width
- **THEN** the page-stack or active-leaf edge touching the notebook stays fixed and the tab grows away from the notebook

#### Scenario: Expansion keeps the assigned anchor
- **WHEN** a tab expands on focus or because it is active and the side gutter fits the expanded width
- **THEN** its page-stack or active-leaf contact edge remains fixed and the tab grows away from that edge

#### Scenario: Narrow viewport keeps the label on screen
- **WHEN** the side gutter is narrower than the expanded tab
- **THEN** the expanded tab slides inward by only the needed overflow amount, preserves its assigned contact edge, and shows its full inline label without horizontal scroll

#### Scenario: No semicircular marker
- **WHEN** any tab is rendered
- **THEN** its shape has no semicircular notch, circle, or dot

#### Scenario: Anchor changes do not float
- **WHEN** a tab changes between inactive and active state
- **THEN** its page-stack or top-leaf contact position updates instantly without a visible transform transition or detached floating state

### Requirement: Tab icons keep fixed contrast across themes
Tab icons MUST use the documented black ink color and MUST NOT inherit the light/dark theme text color, tab label color, or tab accent. Icons remain visible when the theme changes.

#### Scenario: Dark theme icons
- **WHEN** the site is in dark theme
- **THEN** tab icons render in the same black ink color and remain visible against the tab surface

#### Scenario: Light theme icons
- **WHEN** the site is in light theme
- **THEN** tab icons render in the same black ink color and remain visible against the tab surface

#### Scenario: Theme toggle does not recolor icons
- **WHEN** the user toggles the theme
- **THEN** the icon color remains black and does not change

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
- **WHEN** the notebook is closed before Play
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

## ADDED Requirements

### Requirement: Page turns provide sound feedback

An animated notebook page turn MUST play `book_page_turn.wav` once when it starts. Navigation MUST remain usable if audio playback is unavailable. When reduced motion is preferred, content changes MUST remain direct and MUST NOT play turn audio.

#### Scenario: Animated spread turn plays sound
- **WHEN** a user starts an animated spread change through a corner or section marker
- **THEN** the page-turn animation starts and `book_page_turn.wav` plays once

#### Scenario: Reduced motion omits turn feedback
- **WHEN** the user prefers reduced motion and changes a spread or category
- **THEN** content changes without a rotational turn and `book_page_turn.wav` is not played

### Requirement: Category navigation uses page-turn transactions

Project-category markers MUST use the same forward/backward page-turn transaction and turn lock as spread navigation when they change project content.

#### Scenario: Category change turns the project spread
- **WHEN** a user selects a different project category through a right-side marker
- **THEN** the project content changes through the same page-turn animation and turn lock used for spread navigation

#### Scenario: Category selection preserves filtering
- **WHEN** a project category turn completes
- **THEN** the selected category remains active and the project spread reflects that category's filtered content

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
- **WHEN** the notebook is closed before Play
- **THEN** the collapsed notebook still presents the pixel-art cover in the current theme colors

#### Scenario: No new colors
- **WHEN** the cover is inspected in either theme
- **THEN** every color used already exists in the project palette

#### Scenario: Approved palette only
- **WHEN** the cover and page stack are inspected in either theme
- **THEN** every opaque interface color used is listed in the documented approved palette
