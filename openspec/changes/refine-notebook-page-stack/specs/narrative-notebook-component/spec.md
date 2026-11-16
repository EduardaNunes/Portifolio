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

#### Scenario: Page stack is visible behind the spread
- **WHEN** the notebook is open
- **THEN** gray layered page edges are visible between both cover boards and their adjacent white leaf edges

#### Scenario: Top leaf remains prominent
- **WHEN** the page stack is visible
- **THEN** the current white left and right leaves remain fully legible and visually above the gray stack

#### Scenario: Existing notebook interactions are preserved
- **WHEN** the user changes spread through a tab or corner navigation
- **THEN** the current navigation, page-turn animation, category filtering, and reduced-motion behavior continue to work

#### Scenario: Closed notebook keeps the cover
- **WHEN** the notebook is closed before Play
- **THEN** the collapsed notebook still presents the pixel-art cover in the current theme colors

#### Scenario: No new colors
- **WHEN** the cover is inspected in either theme
- **THEN** every color used already exists in the project palette

#### Scenario: Approved palette only
- **WHEN** the cover and page stack are inspected in either theme
- **THEN** every opaque interface color used is listed in the documented approved palette
