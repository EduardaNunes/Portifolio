# Spec Delta

## Purpose

Handles the four right-side sections (IA e Automações, Jogos, WebDev, BackEnd) as first-class notebook sections with their own spreads, permanent tab visibility on the right side, and dual active state where "Projetos" on the left and exactly one right-side tab are simultaneously active.

## ADDED Requirements

### Requirement: Right-side sections as permanent notebook sections
The notebook SHALL include four right-side sections: "IA e Automações", "Jogos", "WebDev", and "BackEnd", each occupying exactly one spread (two pages) in the fixed navigation order after "Projetos" and before "Contato".

#### Scenario: Right sections exist in spread sequence
- **WHEN** the notebook spreads are generated
- **THEN** the spread order is: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato (9 spreads total)

#### Scenario: Each right section has exactly one spread
- **WHEN** any right-side section is rendered
- **THEN** it occupies exactly one spread with distinct left and right leaf content

### Requirement: Right-side tabs always visible
The four right-side section tabs SHALL remain permanently rendered on the right edge of the notebook, regardless of which section is currently active.

#### Scenario: Right tabs visible on all sections
- **WHEN** the notebook is open on any spread (including Sobre Mim, Carreira, etc.)
- **THEN** all four right-side tabs (IA e Automações, Jogos, WebDev, BackEnd) are visible in compact form

#### Scenario: Right tabs use shared tab component
- **WHEN** right-side tabs render
- **THEN** they use the same NotebookTab component as left tabs, mirrored for the right side

### Requirement: Dual active tab state with Projetos
When any right-side section is the active spread, BOTH the "Projetos" left tab AND the corresponding right-side tab SHALL be in active/expanded state simultaneously. This is the ONLY scenario where two tabs are active at once.

#### Scenario: Right section active shows dual active state
- **WHEN** user navigates to "Jogos" spread (via arrows or right tab click)
- **THEN** "Projetos" left tab is active AND "Jogos" right tab is active simultaneously

#### Scenario: Left-only section shows single active state
- **WHEN** user navigates to "Carreira" spread
- **THEN** only "Carreira" left tab is active; all right tabs are compact; "Projetos" is NOT active

#### Scenario: Projetos section shows single active state
- **WHEN** user navigates to "Projetos" spread
- **THEN** only "Projetos" left tab is active; all right tabs are compact

#### Scenario: Contato section shows single active state
- **WHEN** user navigates to "Contato" spread
- **THEN** only "Contato" left tab is active; all right tabs are compact; "Projetos" is NOT active

### Requirement: Right tab click navigates to corresponding spread
Clicking a right-side tab SHALL navigate directly to that section's spread and establish the dual active state.

#### Scenario: Click right tab navigates and activates dual state
- **WHEN** user clicks "WebDev" right tab while on "Sobre Mim"
- **THEN** notebook navigates to "WebDev" spread with page turn animation AND "Projetos" left tab + "WebDev" right tab become active

### Requirement: Right sections have minimum two pages each
Each right-side section SHALL have at least one spread (two pages: left and right leaf). Additional page pairs may be added if content overflows.

#### Scenario: Right section has left and right leaf content
- **WHEN** "IA e Automações" spread renders
- **THEN** left leaf shows IA/Automações overview and right leaf shows related projects/demos