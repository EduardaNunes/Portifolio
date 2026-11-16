# Spec Delta

## MODIFIED Requirements

### Requirement: Shared mirrored page tab component
Left section tabs and right section tabs MUST render with the same tab component and behavior. The only difference is the side: left tabs sit on the left edge and mirror the shape and expansion direction of right tabs. Left tabs represent all 9 notebook sections. Right tabs represent the 4 right-side sections (IA e Automações, Jogos, WebDev, BackEnd) and are permanently visible.

#### Scenario: Left section tabs
- **WHEN** the notebook is open
- **THEN** the left side shows section tabs for Sobre Mim, Carreira, Estudos, Projetos, IA e Automações, Jogos, WebDev, BackEnd and Contato in that order from top to bottom

#### Scenario: Right section tabs permanently visible
- **WHEN** the notebook is open on any spread
- **THEN** the right side shows section tabs for IA e Automações, Jogos, WebDev and BackEnd in that order using the same tab component, mirrored

#### Scenario: Same interaction on both sides
- **WHEN** the user hovers, focuses or activates any tab on either side
- **THEN** the expansion and label behavior is identical, only the direction is mirrored

### Requirement: Tabs stay visible and expand to reveal the label
Every tab MUST remain visible. The active tab MUST expand horizontally and reveal its label. Non-active tabs stay compact until hover or keyboard focus, when they also expand and reveal the label. No floating tooltip is used. EXCEPTION: When a right-side section is active, BOTH the "Projetos" left tab AND the active right-side tab are simultaneously active/expanded - this is the only case where two tabs are active.

#### Scenario: Active tab remains visible
- **WHEN** a section becomes active
- **THEN** its tab stays rendered, expands horizontally and shows its name; it is never hidden

#### Scenario: Hover expands a tab
- **WHEN** the user hovers a non-active tab
- **THEN** it expands horizontally and reveals its name inside the tab

#### Scenario: Keyboard focus expands a tab
- **WHEN** a tab receives keyboard focus
- **THEN** it expands horizontally and reveals its name, matching the hover behavior

#### Scenario: Dual active state for right sections
- **WHEN** a right-side section (IA e Automações, Jogos, WebDev, BackEnd) is the active spread
- **THEN** both "Projetos" left tab AND the corresponding right-side tab are active and expanded simultaneously

#### Scenario: Single active state for left-only sections
- **WHEN** a left-only section (Sobre Mim, Carreira, Estudos, Projetos, Contato) is the active spread
- **THEN** only that section's left tab is active; all right tabs are compact; "Projetos" is NOT active unless the active spread is Projetos or a right-side section

#### Scenario: No floating tooltip
- **WHEN** the user hovers any tab
- **THEN** no separate tooltip appears outside the tab body

### Requirement: Page tabs sit flush against the notebook
Tabs MUST touch the notebook cover edge with no floating gap. Left tabs expand outward to the left and right tabs expand outward to the right while the side gutter is wide enough. On narrow viewports the expanded tab MUST slide inward over the cover just enough to keep its inline label on screen, staying in contact with the cover. Tabs MUST NOT use a semicircular notch or dot. Right tabs are now permanently rendered (not only during Projects section).

#### Scenario: Left tabs touch the cover
- **WHEN** the notebook is open
- **THEN** each left tab's inner edge is in contact with the left cover edge

#### Scenario: Right tabs touch the cover permanently
- **WHEN** the notebook is open on any spread
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

### Requirement: Sequential navigation via bottom corners throughout all pages
**When** notebook is in active state (after opening)
**THEN** the left and right bottom corners of the entire notebook area MUST remain clickable for sequential navigation
**WHEN** user clicks bottom-left corner
**THEN** notebook flips to previous spread (if exists), moving through all 9 spreads sequentially
**WHEN** user clicks bottom-right corner
**THEN** notebook flips to next spread (if exists), moving through all 9 spreads sequentially

#### Scenario: Navigation from Sobre Mim forward
- **WHEN** "Sobre Mim" is current and user clicks bottom-right corner
- **THEN** notebook flips to "Carreira" spread with the standard page-turn animation

#### Scenario: Navigation through all sections sequentially
- **WHEN** user repeatedly clicks bottom-right corner
- **THEN** notebook flips through: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato (then stops at last)

#### Scenario: Navigation backward from any page
- **WHEN** on any page except first (Sobre Mim) and user clicks bottom-left corner
- **THEN** notebook flips back one spread in the exact reverse order

#### Scenario: Corner click area dimensions
- **WHEN** detecting bottom-left/right corner clicks
- **THEN** clickable zones are: left 15% of notebook width × bottom 60px height for left corner; right 15% × bottom 60px for right corner

### Requirement: Spread index management
The active spread MUST be tracked by a zero-based `currentSpread` index (0-8 for 9 spreads). Navigation clamps the index to the available spreads. Category filtering is removed - index directly maps to the fixed 9-spread sequence.

#### Scenario: Index recalculates on resize
- **WHEN** window resizes but spread order doesn't change
- **THEN** the active spread index remains valid

#### Scenario: Fixed 9-spread sequence
- **WHEN** navigating via arrows or tabs
- **THEN** the index maps directly to the fixed sequence: 0=Sobre Mim, 1=Carreira, 2=Estudos, 3=Projetos, 4=IA e Automações, 5=Jogos, 6=WebDev, 7=BackEnd, 8=Contato

#### Scenario: First and last spread limits
- **WHEN** the user is on the first or last spread and tries to navigate past it
- **THEN** the index stays within bounds (0-8)

## REMOVED Requirements

### Requirement: Right category tabs filter Project spreads
**Reason**: Replaced by right-side sections as first-class notebook sections. The four categories (IA e Automações, Jogos, WebDev, BackEnd) are now permanent sections with their own spreads, not filters within a Projects section.

**Migration**: Use the new right-side section tabs and sequential navigation to access IA e Automações, Jogos, WebDev, and BackEnd content.