# Spec Delta

## Purpose

Renders the open notebook spread with two facing leaves, a physical page turn, flush mirrored page tabs for sections and project categories, and a pixel-art cover whose side colors follow the site theme.

## ADDED Requirements

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
Tabs MUST touch the notebook cover edge with no floating gap. Left tabs expand outward to the left and right tabs expand outward to the right while the side gutter is wide enough. On narrow viewports the expanded tab MUST slide inward over the cover just enough to keep its inline label on screen, staying in contact with the cover. Tabs MUST NOT use a semicircular notch or dot.

#### Scenario: Left tabs touch the cover
- **WHEN** the notebook is open
- **THEN** each left tab's inner edge is in contact with the left cover edge

#### Scenario: Right tabs touch the cover
- **WHEN** Projects is active
- **THEN** each right tab's inner edge is in contact with the right cover edge

#### Scenario: Expansion keeps the anchor
- **WHEN** a tab expands on hover or because it is active and the side gutter fits the expanded width
- **THEN** the edge touching the notebook stays fixed and the tab grows away from the notebook

#### Scenario: Narrow viewport keeps the label on screen
- **WHEN** the side gutter is narrower than the expanded tab
- **THEN** the expanded tab slides inward over the cover by the overflow amount, keeps touching the notebook and shows its full inline label without horizontal scroll

#### Scenario: No semicircular marker
- **WHEN** any tab is rendered
- **THEN** its shape has no semicircular notch, circle or dot

### Requirement: Tab icons keep fixed contrast across themes
Tab icons MUST use a fixed ink color from the existing project palette and MUST NOT inherit the light/dark theme text color. Icons remain legible when the theme changes.

#### Scenario: Dark theme icons
- **WHEN** the site is in dark theme
- **THEN** tab icons remain visible against the tab surface

#### Scenario: Light theme icons
- **WHEN** the site is in light theme
- **THEN** tab icons use the same fixed ink color and remain visible

#### Scenario: Theme toggle does not recolor icons
- **WHEN** the user toggles the theme
- **THEN** the icon color does not change

### Requirement: Pixel-art book cover sides with theme palette
The left and right sides of the notebook MUST act as the book cover, styled as a pixel-art frame with square stepped blocks, layered highlights and shadows similar to the Play button. The cover MUST use only colors already present in the project: blue family in dark theme and orange family in light theme.

#### Scenario: Dark theme cover
- **WHEN** the site is in dark theme
- **THEN** the left and right cover sides use the existing blue palette

#### Scenario: Light theme cover
- **WHEN** the site is in light theme
- **THEN** the left and right cover sides use the existing orange palette

#### Scenario: Cover surrounds the leaves
- **WHEN** the notebook is open
- **THEN** the cover boards remain visible on both sides of the white leaves

#### Scenario: Closed notebook keeps the cover
- **WHEN** the notebook is closed before Play
- **THEN** the collapsed notebook still presents the pixel-art cover in the current theme colors

#### Scenario: No new colors
- **WHEN** the cover is inspected in either theme
- **THEN** every color used already exists in the project palette

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
**THEN** the left and right bottom corners of the entire notebook area MUST remain clickable for sequential navigation  
**WHEN** user clicks bottom-left corner  
**THEN** notebook flips to previous page (if exists), regardless of current section or category filter  
**WHEN** user clicks bottom-right corner  
**THEN** notebook flips to next page (if exists), regardless of current section or category filter

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

## MODIFIED Requirements

## REMOVED Requirements
