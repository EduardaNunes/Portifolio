# Spec Delta

## MODIFIED Requirements

### Requirement: Project spread layout with explicit deploy link

**When** a project spread is rendered  
**THEN** its left leaf MUST show metadata and its right leaf MUST show the demo with an explicit deploy link

#### Scenario: Project left leaf structure

- **WHEN** navigating to a project spread
- **THEN** the left leaf displays the project title, description, tech stack tags and GitHub repository link rendered via the ProjectButton component

#### Scenario: Project right leaf structure

- **WHEN** navigating to a project spread
- **THEN** the right leaf displays the demo image or video thumbnail rendered via the Thumbnail component with a Play overlay for images, and an explicit deploy/preview link near the top-right area

#### Scenario: Deploy link click behavior

- **WHEN** the user clicks the deploy link
- **THEN** the deployed version opens in a new tab

### Requirement: Projects section category tabs

The Projects section SHALL no longer filter notebook content by category. IA e Automações, Jogos, WebDev, and BackEnd SHALL instead be independent right-side markers that navigate directly to their own configured page pairs. Each category marker's page pairs are defined in the layout module.

#### Scenario: Category selection navigates to configured pairs

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

The notebook MUST order markers as About Me → Career → Studies → Projects → Contact. Each marker contributes at least one base page pair, and a marker whose content exceeds one leaf contributes one additional page pair per continuation required. Category markers (ai-automation, games, webdev, backend) contribute one page pair per project as defined in their layout. The total spread count is the number of configured base pairs plus continuation pairs (`B + C`), and that sequence remains the single source used to render and navigate the notebook.

#### Scenario: Page order from left to right

- **WHEN** notebook opens after Play click
- **THEN** spreads appear in this exact sequence: About Me → Career → Studies → [Projects overview] → IA e Automações projects → Jogos projects → WebDev projects → BackEnd projects → Contact, with each continuation pair immediately after the pair it continues and before the next marker

#### Scenario: First spread is always About Me

- **WHEN** the notebook first opens or navigates from the beginning
- **THEN** the visible spread shows About Me content split across both leaves

#### Scenario: Projects section variable length

- **WHEN** different numbers of projects exist across categories (IA e Automações: 1, Jogos: 4, WebDev: 3, BackEnd: 1)
- **THEN** total project spreads equal the sum of projects in each category as defined by their layouts, and the notebook continues to Contact afterward

#### Scenario: Empty category handling

- **WHEN** a category has no projects
- **THEN** it contributes a single empty-state page pair defined in its layout

## ADDED Requirements

### Requirement: Category markers use layout-defined page pairs

Each project category marker (ai-automation, games, webdev, backend) SHALL have its page pairs defined in the layout module. The layout SHALL specify, for each project, which sections appear on the left leaf and that the right leaf shows the demo. This makes category markers consistent with narrative markers.

#### Scenario: Category layout defines left leaf sections

- **WHEN** a category layout is defined for a project
- **THEN** it specifies the section ids (e.g., 'description', 'tech') that render on the left leaf

#### Scenario: Category layout defines right leaf as demo

- **WHEN** a category layout is defined for a project
- **THEN** it specifies that the right leaf renders the projectDemo block via the Thumbnail component

#### Scenario: Category layout order matches project order

- **WHEN** multiple projects exist in a category
- **THEN** the layout declares page pairs in the same order as the projects array in content

### Requirement: Dual active tab state for category selection

When any page pair belonging to a category marker is the current spread, the Projects marker tab on the left side SHALL also be active and expanded, alongside the active category tab on the right side.

#### Scenario: Dual active tabs for category

- **WHEN** the user navigates to a page pair in the Jogos category
- **THEN** both the Projetos left tab and the Jogos right tab are active and expanded

#### Scenario: Only Projects tab active for overview

- **WHEN** the user navigates to the Projects overview page pair
- **THEN** only the Projetos left tab is active; no right-side category tab is active

#### Scenario: Active tab state updates on corner navigation

- **WHEN** the user navigates between project spreads using corner arrows
- **THEN** the active right-side category tab updates to match the current spread's category, and the Projects left tab remains active