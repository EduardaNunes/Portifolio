# Spec Delta

## MODIFIED Requirements

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