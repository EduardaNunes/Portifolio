# narrative-right-sections Specification

## Purpose
Defines right-side project-domain markers as permanent, configurable notebook markers. Each can own multiple page pairs while sharing the global navigation order and dual active state with Projetos.

## Requirements

### Requirement: Side-aware marker configuration
The notebook SHALL define each marker in one ordered configuration with an ID, label, side (`left` or `right`), and one or more page pairs. A marker's side SHALL control only where its tab renders and SHALL NOT alter its position in the ordered configuration.

#### Scenario: Initial right-side markers
- **WHEN** the default marker configuration is rendered
- **THEN** IA e Automações, Jogos, WebDev, and BackEnd have `side: right` and render on the notebook's right edge

#### Scenario: Side does not reorder navigation
- **WHEN** a marker is configured with `side: right`
- **THEN** global navigation retains its configured position between Projetos and Contato

#### Scenario: Editable marker collection
- **WHEN** a maintainer adds, removes, or changes the side of a marker in the configuration
- **THEN** the tabs and global page-pair navigation reflect that configuration without separate ordering logic

### Requirement: Right-side tabs always visible
Right-side markers SHALL remain permanently rendered on the right edge of the notebook, regardless of which marker or page pair is current.

#### Scenario: Right tabs visible outside project domains
- **WHEN** the notebook is open on Sobre Mim, Carreira, Estudos, Projetos, or Contato
- **THEN** all configured right-side tabs remain visible in compact form

#### Scenario: Right tabs use shared behavior
- **WHEN** a right-side tab renders
- **THEN** it uses the same tab interaction and accessibility behavior as a left-side tab, mirrored for the right edge

### Requirement: Dual active state with Projetos
When a page pair belonging to a right-side marker is current, the Projetos left-side tab and exactly that current right-side tab SHALL be active and expanded simultaneously. For all other current markers, exactly one tab SHALL be active.

#### Scenario: Right-side pair activates two tabs
- **WHEN** the current page pair belongs to Jogos
- **THEN** Projetos and Jogos are active simultaneously and every other marker tab is inactive

#### Scenario: Left-side marker activates one tab
- **WHEN** the current page pair belongs to Carreira
- **THEN** only Carreira is active and all right-side tabs are compact

#### Scenario: Projetos marker activates one tab
- **WHEN** the current page pair belongs to Projetos
- **THEN** only Projetos is active and all right-side tabs are compact

### Requirement: Right-side markers support multiple page pairs
Each right-side marker SHALL own at least one two-page pair and MAY own additional pairs. Global navigation SHALL traverse all of a marker's pairs in their configured order before proceeding to the next marker.

#### Scenario: Multiple IA e Automações projects
- **WHEN** IA e Automações has two configured project pairs
- **THEN** the next arrow moves from the first pair to the second pair before moving to Jogos

#### Scenario: Project pair layout
- **WHEN** a project-oriented page pair is displayed
- **THEN** its descriptive text is on the left page and its image or demo is on the right page

### Requirement: Right tab direct navigation
Selecting a right-side marker tab SHALL navigate to the first page pair belonging to that marker and establish its dual active state.

#### Scenario: Right tab selects first pair
- **WHEN** the user selects WebDev while viewing Sobre Mim
- **THEN** the notebook navigates to WebDev's first page pair and activates Projetos plus WebDev
