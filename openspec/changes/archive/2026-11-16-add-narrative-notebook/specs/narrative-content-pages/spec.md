# Spec Delta

## Purpose

Defines the content structure for every notebook spread: single-section spreads (About Me, Career, Studies, Contact), project spreads with metadata on the left leaf and demo on the right leaf, and the category filtering used inside the Projects section.

## ADDED Requirements

### Requirement: About Me spread content
**When** About Me ("Sobre Mim" / "About Me") spread is rendered  
**THEN** the left leaf MUST display skills and soft skills, and the right leaf MUST display professional results, without duplicating content between leaves

#### Scenario: About Me left leaf
- **WHEN** About Me spread loads (first spread in document order)
- **THEN** the left leaf shows technical skills (React, Vite, CSS, HTML, JavaScript) and soft skills with brief descriptions

#### Scenario: About Me right leaf
- **WHEN** About Me spread loads
- **THEN** the right leaf shows professional results/outcomes as a developer

#### Scenario: Skills content rendered on About Me
- **WHEN** About Me spread loads
- **THEN** frontend development skills appear with technology tags/icons

#### Scenario: Localized About Me content
- **WHEN** the language is pt or eng
- **THEN** both leaves use the active language for headings, skills and descriptions

### Requirement: Career spread content
**When** Career spread is rendered  
**THEN** the left leaf MUST display the current role and professional trajectory, and the right leaf MUST display future goals

#### Scenario: Career path description renders
- **WHEN** Career spread loads
- **THEN** text describing career progression and current role focus appears on the left leaf

#### Scenario: Work experience timeline
- **WHEN** Career spread loads
- **THEN** a timeline or card list shows past/current positions with duration and key contributions

#### Scenario: Career goals
- **WHEN** Career spread loads
- **THEN** the right leaf shows future goals

### Requirement: Studies spread content
**When** Studies spread is rendered  
**THEN** the left leaf MUST display academic education and the right leaf MUST display courses and academic projects

#### Scenario: Education information renders
- **WHEN** Studies spread loads
- **THEN** current or past educational institutions, courses and certifications appear

#### Scenario: Research and academic projects
- **WHEN** Studies spread loads
- **THEN** any research papers, open-source contributions or academic projects are listed on the right leaf

### Requirement: Contact spread content
**When** Contact spread is rendered  
**THEN** the left leaf MUST display the contact call-to-action and the right leaf MUST display LinkedIn, GitHub and email links

#### Scenario: LinkedIn link renders
- **WHEN** Contact spread loads
- **THEN** a button or clickable link to the LinkedIn profile appears with icon and URL

#### Scenario: GitHub link renders
- **WHEN** Contact spread loads
- **THEN** a button or clickable link to the GitHub profile appears with icon and URL

#### Scenario: Email link renders
- **WHEN** Contact spread loads
- **THEN** the email address appears as a clickable mailto: link or copyable text

### Requirement: Project spread layout with explicit deploy link
**When** a project spread is rendered  
**THEN** its left leaf MUST show metadata and its right leaf MUST show the demo with an explicit deploy link

#### Scenario: Project left leaf structure
- **WHEN** navigating to a project spread
- **THEN** the left leaf displays the project title, description, tech stack tags and GitHub repository link

#### Scenario: Project right leaf structure
- **WHEN** navigating to a project spread
- **THEN** the right leaf displays the demo image or video thumbnail with a Play overlay and an explicit deploy/preview link near the top-right area

#### Scenario: Deploy link click behavior
- **WHEN** the user clicks the deploy link
- **THEN** the deployed version opens in a new tab

### Requirement: Projects section category tabs
**When** the current spread belongs to Projects  
**THEN** the right side MUST display category tabs for IA e Automações, Jogos, WebDev and BackEnd using the shared mirrored tab component. The active category MUST stay visible and expanded, and no project count is rendered on the tabs.

#### Scenario: Category selection filters projects
- **WHEN** the user selects WebDev from the right tabs
- **THEN** only WebDev project spreads render across the notebook

#### Scenario: Active category remains visible
- **WHEN** a category is selected
- **THEN** its tab expands and shows its name instead of disappearing

#### Scenario: Project navigation preserves category filter
- **WHEN** the user flips between spreads within a selected category
- **THEN** the category filter remains active until another selection or reselection

#### Scenario: Category tabs do not show counts
- **WHEN** category tabs render
- **THEN** no project count badge or number appears

### Requirement: Spread ordering and counting convention
The notebook MUST order spreads as About Me → Career → Studies → Projects → Contact. Each section occupies one spread and each visible project occupies one spread, so the total is `4 + N` spreads or `8 + 2N` leaves, where N is the number of visible projects.

#### Scenario: Page order from left to right
- **WHEN** notebook opens after Play click
- **THEN** spreads appear in this exact sequence: About Me → Career → Studies → [Projects with variable length] → Contact

#### Scenario: First spread is always About Me
- **WHEN** the notebook first opens or navigates from the beginning
- **THEN** the visible spread shows About Me content split across both leaves

#### Scenario: Projects section variable length
- **WHEN** different numbers of projects exist across categories
- **THEN** total project spreads equal the number of active projects, and the notebook continues to Contact afterward

#### Scenario: Empty category handling
- **WHEN** a category has no projects and the user selects it
- **THEN** the category tab remains visible and an empty state message is shown

### Requirement: Content localization support
**When** page content renders  
**THEN** all text content MUST respect the current language setting from translations.js or profile data (pt/eng locale switching)

#### Scenario: Portuguese locale by default
- **WHEN** page loads without explicit language preference or with pt locale
- **THEN** headings use "Sobre Mim", "Carreira", etc. as specified

#### Scenario: English locale override
- **WHEN** user switches to eng locale via LightSwitch/translation toggle
- **THEN** same heading positions display "About Me", "Career", etc. in English

## MODIFIED Requirements

## REMOVED Requirements
