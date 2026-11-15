# Spec Delta

## Purpose

Renders the notebook component with page-turning animations, left sidebar navigation markers that toggle invisibility on selection, right category tabs for project filtering, and swipe gesture support for page flipping. Each page occupies exactly 100% viewport width (100vw) in a horizontal flex container, with the About Me initial page showing its content areas side-by-side within the single viewport after opening.

## ADDED Requirements

### Requirement: Notebook layout structure
**When** the notebook component renders  
**THEN** it displays pages in a horizontal flex container where each page occupies exactly 100% of viewport width (100vw) and the content height (minus header space)  

#### Scenario: Single page view
- **WHEN** only one page exists or current page is first/last in navigation order
- **THEN** notebook displays single centered page with no side pages visible

#### Scenario: Multiple adjacent pages
- **WHEN** current page has both previous and next siblings
- **THEN** each page is sized exactly to fill viewport width with no gaps or overlaps

#### Scenario: About Me page layout after opening
- **WHEN** notebook opens to first page ("Sobre Mim" / "About Me")
- **THEN** the page displays with left and right content areas visible side-by-side within the single 100vw page, showing combined skills/soft-skills/results content across both visual regions

### Requirement: Notebook starts closed, opens on click in second section
**When** the notebook component renders  
**THEN** it starts collapsed (not displaying any pages) until Play button triggers auto-scroll  
**WHEN** Play is clicked and auto-scroll animation completes  
**THEN** notebook opens by flipping to first page ("Sobre Mim" / About Me), displaying the page with its two content areas (left metadata and right demo) visible side-by-side after flip animation completes

#### Scenario: Notebook initially closed
- **WHEN** page loads or after header section is visible
- **THEN** notebook area shows collapsed state (no pages rendered)

#### Scenario: Notebook opens on first play click
- **WHEN** Play button clicked and scroll snap completes at second section
- **THEN** notebook flips open to display the "Sobre Mim" page with its left/right content areas (skills/soft-skills/results) shown side-by-side within a single viewport after the flip animation completes

### Requirement: Left sidebar marker visibility toggle rule
**When** current page is rendered  
**THEN** only ONE left sidebar marker is invisible - the one matching current page  
**WHEN** user hovers over a left sidebar page marker (not current page)  
**THEN** the marker text tooltip appears showing the section name  
**WHEN** user clicks a non-current marker  
**THEN** notebook flips to that page, triggering visibility update where only new current page marker becomes invisible  

#### Scenario: First page marker invisibility (About Me active)
- **WHEN** "Sobre Mim" / About Me page is active (initial state after opening)
- **THEN** ONLY "Sobre Mim" marker is invisible; all other markers (Carreira, Estudos, Projetos, Contato) are visible

#### Scenario: Marker visibility after flip forward
- **WHEN** user flips from "Sobre Mim" to "Carreira" via any method
- **THEN** ONLY "Carreira" marker becomes invisible, and "Sobre Mim" marker becomes visible again (one invisible marker always)

#### Scenario: Marker visibility after flip backward
- **WHEN** user navigates from page N back to page N-1
- **THEN** only page N-1 marker becomes invisible, previous markers all become visible except new current one

### Requirement: Right category tabs visibility toggle rule (Projects section only)
**When** notebook is in Projects section and rendering project pages  
**THEN** right sidebar displays category filter buttons vertically with categories: IA e Automações, Jogos, WebDev, BackEnd  
**WHEN** user clicks a category filter button  
**THEN** that category marker becomes invisible (selected), all other markers become visible (previous selection reappears)  

#### Scenario: Category markers toggle on selection
- **WHEN** user selects "WebDev" category from right sidebar in Projects section
- **THEN** WebDev category marker becomes invisible, previous category (e.g., IA/Automation) marker becomes visible again

#### Scenario: All categories visible initially in Projects section
- **WHEN** first project page loads or category selection resets
- **THEN** all four category markers (IA e Automações, Jogos, WebDev, BackEnd) are visible

#### Scenario: Category switch preserves navigation state
- **WHEN** user switches from one category to another within Projects section
- **THEN** category toggle happens immediately; left page metadata and right page demo may update based on filtered projects

### Requirement: Explicit deploy link on project right page
**When** project right page is rendered (second page of a two-page project layout)  
**THEN** a prominent deploy/preview link button appears, clearly labeled with icon and URL  
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
**THEN** left and right bottom corners of entire notebook area are always clickable for sequential navigation  
**WHEN** user clicks bottom-left corner  
**THEN** notebook flips to previous page (if exists), regardless of current section or category filter  
**WHEN** user clicks bottom-right corner  
**THEN** notebook flips to next page (if exists), regardless of current section or category filter  

#### Scenario: Navigation from Sobre Mim forward
- **WHEN** "Sobre Mim" is current and user clicks bottom-right corner
- **THEN** notebook flips to "Carreira" page with standard 300-400ms flip animation

#### Scenario: Navigation backward from any page
- **WHEN** on any page except first (Sobre Mim) and user clicks bottom-left corner
- **THEN** notebook flips back one page, maintaining category filter state within Projects section if applicable

#### Scenario: Navigation from projects section across categories
- **WHEN** viewing a project and clicking corner buttons
- **THEN** sequential navigation moves through all pages (including other projects) while respecting edge-of-section boundaries
- **WHEN** reaches end of current category's projects
- **THEN** further right-clicks may exit Projects section to Contact, maintaining expected page ordering

#### Scenario: Corner click area dimensions
- **WHEN** detecting bottom-left/right corner clicks
- **THEN** clickable zones are: left 15% of notebook width × bottom 60px height for left corner; right 15% × bottom 60px for right corner

### Requirement: Page turning animation
**When** user navigates to next/previous page (via marker click or swipe)  
**THEN** target page performs a CSS transform rotation flip animation (300-400ms ease-in-out)  

#### Scenario: Forward page turn
- **WHEN** user flips to right page (next in order)
- **THEN** current page rotates clockwise while target page rotates counter-clockwise into view

#### Scenario: Backward page turn
- **WHEN** user flips to left page (previous in order)
- **THEN** current page rotates counter-clockwise while target page rotates clockwise into view

#### Scenario: Animation completion triggers state update
- **WHEN** page turn animation completes (animation event fires)
- **THEN** scroll snap is enabled on the new page and markers are updated for visibility

### Requirement: Swipe navigation via corner clicks
**When** user clicks bottom-left or bottom-right corner of notebook area  
**THEN** if clicking left corner, flip to previous page; if clicking right corner, flip to next page  

#### Scenario: Left corner click navigates backward
- **WHEN** user clicks within 50px height of the bottom and left 20% of notebook width
- **THEN** notebook flips to previous page with animation

#### Scenario: Right corner click navigates forward
- **WHEN** user clicks within 50px height of the bottom and right 20% of notebook width
- **THEN** notebook flips to next page with animation

#### Scenario: Swipe gesture not required for desktop
- **WHEN** on desktop/mobile (not touch-only device)
- **THEN** only corner clicks trigger navigation; no touch swipe event listeners needed

### Requirement: Left sidebar marker positioning
**When** notebook renders left sidebar  
**THEN** markers are arranged vertically in a fixed-width column with equal spacing  

#### Scenario: Marker order matches page sequence
- **WHEN** pages are rendered in order: About Me → Career → Studies → Projects → Contact
- **THEN** markers appear from top to bottom in that exact sequence

#### Scenario: Tooltip appears on hover
- **WHEN** mouse enters marker's 50px buffer zone (above/below the dot)
- **THEN** a tooltip displays the full section name at position matching the page it references

### Requirement: Page index management
**When** component initializes or pages are added/removed  
**THEN** each page has an internal `pageIndex` (0-based from leftmost in viewport)  
**WHEN** currentPage changes  
**THEN** pageIndex updates for all pages and scroll position centers the new currentPage  

#### Scenario: Index recalculates on resize
- **WHEN** window resizes but page order doesn't change
- **THEN** pageIndex values remain valid (they're ordinal positions, not absolute coordinates)

## MODIFIED Requirements

None

## REMOVED Requirements

None
