# Spec Delta

## MODIFIED Requirements

### Requirement: Shared mirrored page tab component

All marker tabs MUST render with the same tab component and interaction behavior. Each marker configuration declares whether its tab is on the left or right; the side controls only its rendered edge, shape mirroring, and expansion direction, not its navigation order. Category markers (ai-automation, games, webdev, backend) are right-side markers with layout-defined page pairs.

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

Every configured marker tab MUST remain visible. Active tabs MUST expand horizontally and reveal their labels. Non-active tabs remain compact until hover or keyboard focus, when they also expand without a floating tooltip. When a right-side category marker is current, Projetos plus exactly that right-side tab are the only two active tabs.

#### Scenario: Active tab remains visible

- **WHEN** a marker becomes current
- **THEN** its tab stays rendered, expanded, and labeled

#### Scenario: Hover expands a tab

- **WHEN** a non-active tab receives hover
- **THEN** it expands to reveal its inline label without changing the active marker

#### Scenario: Keyboard focus expands a tab

- **WHEN** a non-active tab receives keyboard focus
- **THEN** it expands to reveal its inline label without changing the active marker

#### Scenario: Active category expands with Projects tab

- **WHEN** any page pair in IA e Automações, Jogos, WebDev, or BackEnd is current
- **THEN** Projetos on the left and the matching right-side marker are active and expanded simultaneously

#### Scenario: No floating tooltip

- **WHEN** a page pair in Sobre Mim, Carreira, Estudos, Projetos, or Contato is current
- **THEN** only that marker is active, all other tabs are compact, and no floating tooltip is displayed

#### Scenario: Projects overview activates only Projects tab

- **WHEN** the Projects overview page pair is current
- **THEN** only the Projetos left tab is active and expanded

### Requirement: Category navigation uses page-turn transactions

Project-category markers MUST use the same forward/backward page-turn transaction and turn lock as spread navigation when they change project content. Navigation between category page pairs (including across categories) uses the global page-turn animation.

#### Scenario: Category change turns the project spread

- **WHEN** a user selects a different project category through a right-side marker
- **THEN** the project content changes through the same page-turn animation and turn lock used for spread navigation

#### Scenario: Category selection preserves active tab state

- **WHEN** a project category turn completes
- **THEN** the selected category remains active and the Projects left tab remains active

#### Scenario: Corner navigation traverses category pairs

- **WHEN** the user repeatedly selects the next corner from the first project pair
- **THEN** the notebook traverses all category page pairs in layout order before continuing to Contact

## ADDED Requirements

### Requirement: Notebook renders Thumbnail component for project demos

When a project spread's right leaf is rendered, the demo media SHALL be displayed using the Thumbnail component, which handles images, videos, captions, and play overlays consistently.

#### Scenario: Thumbnail renders on project right leaf

- **WHEN** a project spread's right leaf renders
- **THEN** the Thumbnail component displays the project's demo media

#### Scenario: Thumbnail integrates with page theming

- **WHEN** the Thumbnail component renders inside a notebook leaf
- **THEN** it uses the leaf's CSS variables for consistent paper-like appearance

### Requirement: Notebook renders ProjectButton for repository links

When a project spread's left leaf includes a repository link, it SHALL be rendered using the ProjectButton component with the GitHub icon, localized "Ver Repositório" text, and the repository URL.

#### Scenario: ProjectButton renders on project left leaf

- **WHEN** a project spread's left leaf renders and the project has a repoLink
- **THEN** the ProjectButton component displays the repository action

#### Scenario: ProjectButton integrates with page theming

- **WHEN** the ProjectButton component renders inside a notebook leaf
- **THEN** it uses the leaf's CSS variables for consistent action button appearance