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
**THEN** it MUST start collapsed (not displaying any pages) until the start control triggers auto-scroll  
**WHEN** start is activated and auto-scroll animation completes  
**THEN** notebook MUST open by flipping to first spread ("Sobre Mim" / About Me), displaying its two facing leaves

#### Scenario: Notebook initially closed
- **WHEN** page loads or after header section is visible
- **THEN** notebook area shows collapsed state (no leaves or tabs rendered)

#### Scenario: Notebook opens on first play click
- **WHEN** start is activated and scroll snap completes at second section
- **THEN** notebook flips open to display the "Sobre Mim" spread with left/right content areas after the flip animation completes

### Requirement: Shared mirrored page tab component
All marker tabs MUST render with the same tab component and interaction behavior. Each marker configuration declares whether its tab is on the left or right; the side controls only its rendered edge, shape mirroring, and expansion direction, not its navigation order.

#### Scenario: Left section tabs
- **WHEN** the default marker configuration is rendered
- **THEN** Sobre Mim, Carreira, Estudos, Projetos, and Contato render as tabs on the left edge

#### Scenario: Right category tabs
- **WHEN** the default marker configuration is rendered
- **THEN** IA e Automações, Jogos, WebDev, and BackEnd render as tabs on the right edge and remain visible

#### Scenario: Same interaction on both sides
- **WHEN** the user hovers, focuses, or activates a tab on either edge
- **THEN** label expansion and keyboard behavior are identical except for the mirrored direction

#### Scenario: Ordered registry drives both sides
- **WHEN** the marker configuration order is Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato
- **THEN** the side-specific tab lists retain that relative order without maintaining a second ordering source

### Requirement: Tabs stay visible and expand to reveal the label
Every configured marker tab MUST remain visible. Active tabs MUST expand horizontally and reveal their labels. Non-active tabs remain compact until hover or keyboard focus, when they also expand without a floating tooltip. When a right-side marker is current, Projetos plus exactly that right-side tab are the only two active tabs.

#### Scenario: Active tab remains visible
- **WHEN** a marker becomes current
- **THEN** its tab stays rendered, expanded, and labeled

#### Scenario: Hover expands a tab
- **WHEN** a non-active tab receives hover
- **THEN** it expands to reveal its inline label without changing the active marker

#### Scenario: Keyboard focus expands a tab
- **WHEN** a non-active tab receives keyboard focus
- **THEN** it expands to reveal its inline label without changing the active marker

#### Scenario: Active category expands
- **WHEN** any page pair in IA e Automações, Jogos, WebDev, or BackEnd is current
- **THEN** Projetos on the left and the matching right-side marker are active and expanded simultaneously

#### Scenario: No floating tooltip
- **WHEN** a page pair in Sobre Mim, Carreira, Estudos, Projetos, or Contato is current
- **THEN** only that marker is active, all other tabs are compact, and no floating tooltip is displayed

### Requirement: Page tabs sit flush against the notebook
Tabs MUST touch the notebook cover edge with no floating gap. Left tabs expand outward to the left and right tabs expand outward to the right while space permits. On narrow viewports an expanded tab MUST remain in contact with the cover, keep its label visible, and avoid horizontal document scrolling. Tabs MUST NOT use a semicircular notch or dot.

#### Scenario: Inactive tabs touch the page stack
- **WHEN** the notebook is open and a tab is not active
- **THEN** its inner edge is visually flush with the notebook's page-stack or leaf edge rather than floating

#### Scenario: Left tabs touch the cover
- **WHEN** the notebook is open
- **THEN** every left tab remains physically integrated with the notebook through its page-stack or active-leaf contact edge

#### Scenario: Right tabs touch the cover
- **WHEN** the notebook is open
- **THEN** every right tab remains physically integrated with the notebook through its page-stack or active-leaf contact edge

#### Scenario: Active left section tab touches the displayed leaf
- **WHEN** a left-side marker is current
- **THEN** its active left tab is visually flush with the outer edge of the visible left leaf

#### Scenario: Active right category tab touches the displayed leaf
- **WHEN** a right-side marker is current
- **THEN** its active right tab is visually flush with the outer edge of the visible right leaf

#### Scenario: Expansion keeps the anchor
- **WHEN** a tab expands on hover or because it is active
- **THEN** its contact edge stays fixed and the tab grows away from the notebook

#### Scenario: Expansion keeps the assigned anchor
- **WHEN** a tab expands on focus or because it is active
- **THEN** its page-stack or active-leaf contact edge remains fixed

#### Scenario: Narrow viewport keeps the label on screen
- **WHEN** a gutter is narrower than an expanded tab
- **THEN** the tab moves inward over the cover only as needed to keep its label visible without document overflow

#### Scenario: No semicircular marker
- **WHEN** any tab is rendered
- **THEN** its shape has no semicircular notch, circle, or dot

#### Scenario: Anchor changes do not float
- **WHEN** a tab changes between inactive and active state
- **THEN** its contact position updates without a detached floating state

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
After the notebook opens, the bottom corners MUST navigate the global sequence of page pairs. The sequence SHALL flatten every marker's page pairs in marker configuration order and preserve the pair order within each marker.

#### Scenario: Navigation from Sobre Mim forward
- **WHEN** the first Sobre Mim pair is current and the user selects the next corner
- **THEN** the notebook shows the next configured pair with the standard page-turn animation

#### Scenario: Navigation backward from any page
- **WHEN** the user selects the previous corner on any pair except the first global pair
- **THEN** the notebook shows the immediately preceding configured page pair

#### Scenario: Navigation from projects section across categories
- **WHEN** the user repeatedly selects the next corner from the first pair
- **THEN** the notebook traverses all Sobre Mim pairs, then Carreira pairs, Estudos pairs, Projetos pairs, IA e Automações pairs, Jogos pairs, WebDev pairs, BackEnd pairs, and Contato pairs

#### Scenario: Corner click area dimensions
- **WHEN** detecting bottom-left or bottom-right corner clicks
- **THEN** each clickable zone retains its existing configured corner hit area

#### Scenario: Corner affordances are always visible on the white leaf
- **WHEN** the notebook is open on any global page pair
- **THEN** enabled previous and next corner affordances remain visible within the white leaves

#### Scenario: Corner affordances gain theme-inverted accent on hover
- **WHEN** the user hovers or focuses an enabled corner affordance
- **THEN** it retains the existing theme-appropriate hover and focus feedback

#### Scenario: Corner affordances are never clipped or overflow
- **WHEN** the notebook is open at any supported viewport size
- **THEN** corner affordances remain fully visible within their white leaf bounds

#### Scenario: Corner arrows point outward from the notebook
- **WHEN** enabled previous or next corner controls render
- **THEN** the previous control points left and the next control points right

#### Scenario: Corner arrows have balanced vertical margins
- **WHEN** the notebook is open
- **THEN** both corner affordances preserve equal vertical spacing within their clickable zones

#### Scenario: Navigation remains within multi-pair marker
- **WHEN** the current pair is not the final pair for IA e Automações
- **THEN** selecting the next corner shows the next IA e Automações pair rather than Jogos

#### Scenario: Corner bounds
- **WHEN** the user is on the first or last global page pair
- **THEN** the unavailable previous or next corner is disabled

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
The active page pair MUST be tracked by a zero-based index within the flattened global page-pair sequence. Navigation SHALL clamp this index to the available sequence bounds and derive the current marker from the pair's ownership.

#### Scenario: Index recalculates on resize
- **WHEN** window size changes while the marker configuration is unchanged
- **THEN** the active global page-pair index remains valid

#### Scenario: Category filter reconciles index
- **WHEN** markers or page pairs are added or removed from configuration
- **THEN** the current index is reconciled to a valid pair without rendering a blank spread

#### Scenario: First and last spread limits
- **WHEN** the user is on the first or last global page pair and tries to navigate past it
- **THEN** the index stays within the flattened sequence bounds

#### Scenario: Marker click selects first pair
- **WHEN** the user selects any marker tab
- **THEN** the notebook navigates to that marker's first configured page pair

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
