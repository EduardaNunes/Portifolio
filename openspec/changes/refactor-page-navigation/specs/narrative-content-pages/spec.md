# Spec Delta

## MODIFIED Requirements

### Requirement: Projects section category tabs
The Projects section SHALL no longer filter notebook content by category. IA e Automações, Jogos, WebDev, and BackEnd SHALL instead be independent right-side markers that navigate directly to their own configured page pairs.

#### Scenario: Category selection filters projects
- **WHEN** the user selects WebDev from the right-side tabs
- **THEN** the notebook navigates to WebDev's first configured page pair without filtering other markers

#### Scenario: Active category remains visible
- **WHEN** a right-side marker is selected
- **THEN** its tab expands and remains visible as the active project-domain marker

#### Scenario: Project navigation preserves category filter
- **WHEN** the user navigates away from a project-domain marker
- **THEN** no category-filter state changes which page pairs are available in other markers

#### Scenario: Category tabs do not show counts
- **WHEN** right-side marker tabs render
- **THEN** no project count badge or number appears

### Requirement: Spread ordering and counting convention
The notebook MUST use one ordered marker collection: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato. Each marker MUST contain at least one two-page pair and MAY contain additional pairs; the global spread count equals the total configured pairs rather than a fixed number.

#### Scenario: Page order from left to right
- **WHEN** the default content configuration is generated
- **THEN** its markers use the stated order regardless of whether a marker's tab is rendered on the left or right

#### Scenario: First spread is always About Me
- **WHEN** the notebook opens
- **THEN** it displays Sobre Mim's first configured page pair

#### Scenario: Projects section variable length
- **WHEN** IA e Automações contains two page pairs and every other initial marker contains one pair
- **THEN** the notebook contains ten global page pairs in the configured traversal order

#### Scenario: Empty category handling
- **WHEN** a maintainer adds a page pair to WebDev
- **THEN** both WebDev pairs appear consecutively between Jogos and BackEnd during arrow navigation

## ADDED Requirements

### Requirement: Configurable marker page-pair content
Each marker SHALL declare one or more page pairs containing a left leaf and a right leaf. The marker registry SHALL be the single content-order source used to render tabs and build the global navigation sequence.

#### Scenario: Marker owns its pair collection
- **WHEN** a marker has page pairs configured
- **THEN** selecting its tab opens its first pair and the global arrows can traverse every pair it owns

#### Scenario: Marker count is editable
- **WHEN** a maintainer adds or removes a configured marker
- **THEN** the notebook renders the resulting marker count and traverses its pairs without requiring a separate navigation-order update

### Requirement: Project page-pair layout
Each project-oriented page pair SHALL display descriptive project content on its left leaf and the project's image or demo on its right leaf.

#### Scenario: First IA e Automações project pair
- **WHEN** IA e Automações renders its first project pair
- **THEN** its description appears on the left leaf and its image or demo appears on the right leaf

#### Scenario: Subsequent project pair
- **WHEN** the user advances to another project pair in the same marker
- **THEN** that pair also uses descriptive text on the left leaf and image or demo on the right leaf

### Requirement: Projetos marker overview content
When the Projetos marker's page pair is rendered, it SHALL provide an overview of the project domains and guide users toward the corresponding right-side markers.

#### Scenario: Projetos overview
- **WHEN** the Projetos marker's first pair is displayed
- **THEN** it summarizes IA e Automações, Jogos, WebDev, and BackEnd and provides visual navigation cues for their right-side tabs