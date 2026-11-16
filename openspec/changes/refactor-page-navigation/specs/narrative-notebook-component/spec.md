# Spec Delta

## MODIFIED Requirements

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

## REMOVED Requirements

### Requirement: Right category tabs filter Project spreads
**Reason**: The former categories become side-aware markers with their own page pairs; they no longer filter one Projects section.

**Migration**: Configure each project domain as a marker with `side: right` and one or more page pairs, then use its tab to navigate to its first pair.