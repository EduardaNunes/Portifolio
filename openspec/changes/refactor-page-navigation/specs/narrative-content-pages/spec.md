# Spec Delta

## MODIFIED Requirements

### Requirement: Spread ordering and counting convention
The notebook MUST order spreads as: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato (9 fixed spreads, 18 leaves). Each of the 9 sections occupies exactly one spread (2 pages). The variable project spreads within Projects are removed - the 4 right-side sections replace category filtering.

#### Scenario: Page order from left to right
- **WHEN** notebook opens after Play click
- **THEN** spreads appear in this exact sequence: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato

#### Scenario: First spread is always Sobre Mim
- **WHEN** the notebook first opens or navigates from the beginning
- **THEN** the visible spread shows Sobre Mim content split across both leaves

#### Scenario: Fixed 9-spread structure
- **WHEN** navigating through the notebook
- **THEN** there are exactly 9 spreads (18 pages) in fixed order, no variable-length sections

#### Scenario: Last spread is always Contato
- **WHEN** user reaches the end of sequential navigation
- **THEN** the final spread shows Contato content

### Requirement: Projects section category tabs
**REMOVED** - Replaced by right-side sections as first-class notebook sections. The four categories (IA e Automações, Jogos, WebDev, BackEnd) are now permanent sections with their own spreads at positions 5-8, not filters within a Projects section.

#### Scenario: Category selection filters projects
- **WHEN** the user selects WebDev from the right tabs
- **THEN** only WebDev project spreads render across the notebook
**REMOVED** - Right tabs now navigate to fixed section spreads, not filter projects

#### Scenario: Active category remains visible
- **WHEN** a category is selected
- **THEN** its tab expands and shows its name instead of disappearing
**REMOVED** - Right tabs now have dual active state with Projetos (see narrative-right-sections spec)

#### Scenario: Project navigation preserves category filter
- **WHEN** the user flips between spreads within a selected category
- **THEN** the category filter remains active until another selection or reselection
**REMOVED** - No category filtering; sequential navigation moves through fixed spreads

#### Scenario: Category tabs do not show counts
- **WHEN** category tabs render
- **THEN** no project count badge or number appears
**REMOVED** - Right tabs are now section tabs, not category filters

## ADDED Requirements

### Requirement: Right-side section spread content (IA e Automações)
**When** IA e Automações spread is rendered (5th spread)
**THEN** the left leaf MUST display IA/Automações overview and skills, and the right leaf MUST display featured IA/Automações projects and demos.

#### Scenario: IA e Automações left leaf
- **WHEN** IA e Automações spread loads
- **THEN** the left leaf shows IA/Automações technical skills, tools, and approach

#### Scenario: IA e Automações right leaf
- **WHEN** IA e Automações spread loads
- **THEN** the right leaf shows featured IA/Automações projects with deploy links

### Requirement: Right-side section spread content (Jogos)
**When** Jogos spread is rendered (6th spread)
**THEN** the left leaf MUST display game development overview and skills, and the right leaf MUST display featured game projects and demos.

#### Scenario: Jogos left leaf
- **WHEN** Jogos spread loads
- **THEN** the left leaf shows game development technical skills, engines, and approach

#### Scenario: Jogos right leaf
- **WHEN** Jogos spread loads
- **THEN** the right leaf shows featured game projects with deploy links

### Requirement: Right-side section spread content (WebDev)
**When** WebDev spread is rendered (7th spread)
**THEN** the left leaf MUST display web development overview and skills, and the right leaf MUST display featured web projects and demos.

#### Scenario: WebDev left leaf
- **WHEN** WebDev spread loads
- **THEN** the left leaf shows web development technical skills, frameworks, and approach

#### Scenario: WebDev right leaf
- **WHEN** WebDev spread loads
- **THEN** the right leaf shows featured web projects with deploy links

### Requirement: Right-side section spread content (BackEnd)
**When** BackEnd spread is rendered (8th spread)
**THEN** the left leaf MUST display backend development overview and skills, and the right leaf MUST display featured backend projects and demos.

#### Scenario: BackEnd left leaf
- **WHEN** BackEnd spread loads
- **THEN** the left leaf shows backend development technical skills, databases, APIs, and approach

#### Scenario: BackEnd right leaf
- **WHEN** BackEnd spread loads
- **THEN** the right leaf shows featured backend projects with deploy links

### Requirement: Projetos spread content updated
**When** Projetos spread is rendered (4th spread)
**THEN** the left leaf MUST display an overview of all project categories, and the right leaf MUST display featured/highlighted projects across all categories with navigation hints to the right-side sections.

#### Scenario: Projetos left leaf
- **WHEN** Projetos spread loads
- **THEN** the left leaf shows a summary of all four project categories (IA e Automações, Jogos, WebDev, BackEnd) with brief descriptions

#### Scenario: Projetos right leaf
- **WHEN** Projetos spread loads
- **THEN** the right leaf shows 1-2 featured projects from each category with visual indicators pointing to the right-side section tabs for deeper exploration