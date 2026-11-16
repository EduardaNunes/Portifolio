# narrative-notebook-component Specification

## Purpose
Renders the open notebook spread with two facing leaves, a physical page turn, flush mirrored page tabs for sections and project categories, and a pixel-art cover whose side colors follow the site theme.

## Requirements

### Requirement: Notebook layout structure
The notebook MUST render as an open double-page spread inside a centered container of about 80vw by 80vh. Each spread contains two facing leaves at 50% width with a visible center spine, no gaps or overlaps, and no distortion on wide or narrow screens.

#### Scenario: Spread view
- **WHEN** the notebook is open
- **THEN** exactly one spread is visible, with a left leaf and a right leaf separated by the center spine

#### Scenario: About Me spread
- **WHEN** the notebook opens to the first spread
- **THEN** the left leaf shows skills/soft skills and the right leaf shows professional results

#### Scenario: Multiple spreads
- **WHEN** the user navigates between sections or projects
- **THEN** only the destination spread remains visible after the page turn

#### Scenario: Narrow screen
- **WHEN** the viewport is narrow
- **THEN** both leaves remain visible at 50% each without distortion or horizontal document scroll

### Requirement: Notebook starts closed, opens on click in second section
**When** the notebook component renders  
**THEN** it MUST start collapsed (not displaying any pages) until Play button triggers auto-scroll  
**WHEN** Play is clicked and auto-scroll animation completes  
**THEN** notebook MUST open by flipping to first spread ("Sobre Mim" / About Me), displaying its two facing leaves

#### Scenario: Notebook initially closed
- **WHEN** page loads or after header section is visible
- **THEN** notebook area shows collapsed state (no leaves or tabs rendered)

#### Scenario: Notebook opens on first play click
- **WHEN** Play button clicked and scroll snap completes at second section
- **THEN** notebook flips open to display the "Sobre Mim" spread with left/right content areas after the flip animation completes

### Requirement: Shared mirrored page tab component
Left section tabs and right project category tabs MUST render with the same tab component and behavior. The only difference is the side: left tabs sit on the left edge and mirror the shape and expansion direction of right tabs.

#### Scenario: Left section tabs
- **WHEN** the notebook is open
- **THEN** the left side shows section tabs for Sobre Mim, Carreira, Estudos, Projetos and Contato in that order from top to bottom

#### Scenario: Right category tabs
- **WHEN** the current spread belongs to Projects
- **THEN** the right side shows category tabs for IA e Automações, Jogos, WebDev and BackEnd in that order using the same tab component, mirrored

#### Scenario: Same interaction on both sides
- **WHEN** the user hovers, focuses or activates any tab on either side
- **THEN** the expansion and label behavior is identical, only the direction is mirrored

### Requirement: Tabs stay visible and expand to reveal the label
Every tab MUST remain visible. The active tab MUST expand horizontally and reveal its label. Non-active tabs stay compact until hover or keyboard focus, when they also expand and reveal the label. No floating tooltip is used.

#### Scenario: Active tab remains visible
- **WHEN** a section or category becomes active
- **THEN** its tab stays rendered, expands horizontally and shows its name; it is never hidden

#### Scenario: Hover expands a tab
- **WHEN** the user hovers a non-active tab
- **THEN** it expands horizontally and reveals its name inside the tab

#### Scenario: Keyboard focus expands a tab
- **WHEN** a tab receives keyboard focus
- **THEN** it expands horizontally and reveals its name, matching the hover behavior

#### Scenario: Active category expands
- **WHEN** a project category is selected
- **THEN** that category tab stays visible, expands horizontally and shows its name

#### Scenario: No floating tooltip
- **WHEN** the user hovers any tab
- **THEN** no separate tooltip appears outside the tab body

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

### Requirement: Right category tabs filter Project spreads
In the Projects section, the right side MUST display category tabs using the shared tab component. Selecting a category filters project spreads; the active category stays visible and expanded. Project counts are not displayed on the tabs.

#### Scenario: All categories initially compact
- **WHEN** the first project spread loads or no category is selected
- **THEN** all four category tabs are visible in compact form

#### Scenario: Category selection expands tab
- **WHEN** the user selects WebDev
- **THEN** WebDev stays visible and expanded, the other categories stay visible in compact form, and only WebDev projects render

#### Scenario: Reselecting clears the filter
- **WHEN** the user selects the active category again
- **THEN** the filter is cleared, all categories return to compact form and all project spreads render again

#### Scenario: No project count
- **WHEN** any category tab is rendered
- **THEN** no project count badge or number is displayed

#### Scenario: Empty category
- **WHEN** a category has no projects and the user selects it
- **THEN** the tab stays visible and expanded and an empty-category message is shown

### Requirement: Explicit deploy link on project right page
**When** project right page is rendered (second page of a two-page project layout)  
**THEN** a prominent deploy/preview link button MUST appear, clearly labeled with icon and URL  
**WHEN** user clicks the deploy link  
**THEN** browser navigates to the deployed version or opens in new tab

#### Scenario: Deploy link prominence
- **WHEN** viewing project right page (video/image showcase)
- **THEN** deploy link is positioned prominently, typically near top-right or center-top area with distinct styling

#### Scenario: Deploy link visibility respects viewport
- **WHEN** notebook scrolls/animates to new page
- **THEN** deploy link remains visible and accessible on the right page as part of content layout

### Requirement: Sequential navigation via bottom corners throughout all pages

**When** notebook is in active state (after opening)  
**THEN** the left and right bottom corners of the notebook area MUST remain clickable for sequential navigation  
**WHEN** user clicks bottom-left corner  
**THEN** notebook flips to previous page (if exists), regardless of current section or category filter  
**WHEN** user clicks bottom-right corner  
**THEN** notebook flips to next page (if exists), regardless of current section or category filter  

The corner navigation affordances MUST be visually persistent (always visible) using the **original theme arrow colors** (black in dark theme, white in light theme) at rest, and gain theme-inverted accent color on hover/focus. They MUST sit on top of the white leaf so they are never clipped or overflow outside the notebook.

#### Scenario: Navigation from Sobre Mim forward
- **WHEN** "Sobre Mim" is current and user clicks bottom-right corner
- **THEN** notebook flips to "Carreira" spread with the standard page-turn animation

#### Scenario: Navigation backward from any page
- **WHEN** on any page except first (Sobre Mim) and user clicks bottom-left corner
- **THEN** notebook flips back one spread, maintaining category filter state within Projects section if applicable

#### Scenario: Navigation from projects section across categories
- **WHEN** viewing a project and clicking corner buttons
- **THEN** sequential navigation moves through all spreads (including other projects) while respecting edge-of-section boundaries
- **WHEN** reaches end of current category's projects
- **THEN** further right-clicks may exit Projects section to Contact, maintaining expected page ordering

#### Scenario: Corner click area dimensions
- **WHEN** detecting bottom-left/right corner clicks
- **THEN** clickable zones are: left 15% of notebook width × bottom 60px height for left corner; right 15% × bottom 60px for right corner

#### Scenario: Corner affordances are always visible on the white leaf
- **WHEN** the notebook is open
- **THEN** both corner arrows are visible at the bottom corners of the white leaf, rendered in the original theme arrow colors (black `#1a1917` in dark theme, white `#f9efe4` in light theme) at 100% opacity

#### Scenario: Corner affordances gain theme-inverted accent on hover
- **WHEN** user hovers or focuses a corner arrow in dark theme
- **THEN** the arrow changes to a **darker orange** (`--corner-hover-color: #e88d00`) for visibility
- **WHEN** user hovers or focuses a corner arrow in light theme
- **THEN** the arrow changes to the cool accent color (`--corner-hover-color: #99c0c2`, blue family)

#### Scenario: Corner affordances are never clipped or overflow
- **WHEN** the notebook is open at any viewport size
- **THEN** both corner arrows remain fully visible within the white leaf bounds

#### Scenario: Corner arrows point outward from the notebook
- **WHEN** the notebook is open
- **THEN** the left corner arrow points left (toward the previous page) and the right corner arrow points right (toward the next page)

#### Scenario: Corner arrows have balanced vertical margins
- **WHEN** the notebook is open
- **THEN** both corner arrows have equal 12px margins from the top and bottom of the clickable zone, preventing overlap with page content

### Requirement: Page turning animation
When the user navigates to the next or previous spread, a physical leaf MUST turn around the center spine, showing its front and back faces for about 420ms. With reduced motion, the spread changes directly with a short fade and no rotation.

#### Scenario: Forward page turn
- **WHEN** the user navigates to the next spread
- **THEN** a right-side leaf rotates around the spine and reveals the next spread

#### Scenario: Backward page turn
- **WHEN** the user navigates to the previous spread
- **THEN** a left-side leaf rotates back around the spine and reveals the previous spread

#### Scenario: Animation completion triggers state update
- **WHEN** page turn animation completes
- **THEN** the destination spread is committed and the active tabs update

#### Scenario: Reduced motion
- **WHEN** the user prefers reduced motion
- **THEN** the spread changes without rotation

### Requirement: Corner click navigation

**When** user clicks bottom-left or bottom-right corner of notebook area  
**THEN** if clicking left corner, the notebook MUST flip to previous spread; if clicking right corner, it MUST flip to next spread

#### Scenario: Left corner click navigates backward
- **WHEN** user clicks within 50px height of the bottom and left 20% of notebook width
- **THEN** notebook flips to previous spread with animation

#### Scenario: Right corner click navigates forward
- **WHEN** user clicks within 50px height of the bottom and right 20% of notebook width
- **THEN** notebook flips to next spread with animation

#### Scenario: Swipe gesture not required for desktop
- **WHEN** on desktop/mobile (not touch-only device)
- **THEN** only corner clicks trigger navigation; no touch swipe event listeners are needed

### Requirement: Spread index management
The active spread MUST be tracked by a zero-based `currentSpread` index. Navigation clamps the index to the available spreads, and category filtering reconciles the index without rendering a blank spread.

#### Scenario: Index recalculates on resize
- **WHEN** window resizes but spread order doesn't change
- **THEN** the active spread index remains valid

#### Scenario: Category filter reconciles index
- **WHEN** the active category changes the number of project spreads
- **THEN** the index is clamped or moved to the first project spread without rendering an empty spread

#### Scenario: First and last spread limits
- **WHEN** the user is on the first or last spread and tries to navigate past it
- **THEN** the index stays within bounds

### Requirement: Active tab keyboard and screen reader state
The active tab MUST remain focusable and expose its selected state. Since the active tab is no longer hidden, keyboard users can move focus to it and hear its label.

#### Scenario: Active tab is focusable
- **WHEN** the user tabs through the page tabs
- **THEN** the active tab receives focus and keeps its expanded label visible

#### Scenario: Active state is announced
- **WHEN** a screen reader focuses a section tab
- **THEN** the tab exposes its selected state and name

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
