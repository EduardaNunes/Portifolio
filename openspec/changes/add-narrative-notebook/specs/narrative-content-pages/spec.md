# Spec Delta

## Purpose

Defines the content structure for all notebook pages including single-page sections (About Me, Career, Studies, Contact) and the special two-page project layout with left metadata page and right demo showcase.

## ADDED Requirements

### Requirement: About Me page content (single page)
**When** About Me ("Sobre Mim" / "About Me") page is rendered  
**THEN** it displays a heading followed by combined sections for skills, soft skills, and professional results in a single page layout  

#### Scenario: About Me page displays all three content areas
- **WHEN** About Me page loads (first page in document order)
- **THEN** the page shows: (1) skills list with frontend technologies (React, Vite, CSS, HTML, JavaScript), (2) soft skills (communication, collaboration, problem-solving, adaptability, continuous learning), and (3) professional results/outcomes as a developer

#### Scenario: Skills content rendered on About Me
- **WHEN** About Me page loads
- **THEN** frontend development skills appear with technology tags/icons

#### Scenario: Soft skills content rendered on About Me
- **WHEN** About Me page loads
- **THEN** soft skills appear with brief descriptions in pt-BR or en locale

#### Scenario: Professional results rendered on About Me
- **WHEN** About Me page loads
- **THEN** projects/achievements display with measurable outcomes (repositories, open-source contributions)

### Requirement: Career page content
**When** Career page is rendered  
**THEN** it displays heading "Carreira" (or "Career") followed by professional trajectory information  

#### Scenario: Career path description renders
- **WHEN** Career page loads
- **THEN** text describing career progression, current role focus, and future goals appears

#### Scenario: Work experience timeline
- **WHEN** Career page loads
- **THEN** timeline or card-based layout shows past/current positions with duration and key contributions

### Requirement: Studies page content
**When** Studies page is rendered  
**THEN** it displays heading "Estudos" (or "Studies") followed by academic/student achievements  

#### Scenario: Education information renders
- **WHEN** Studies page loads
- **THEN** current or past educational institutions, courses, certifications appear

#### Scenario: Research and academic projects
- **WHEN** Studies page loads
- **THEN** any research papers, open-source contributions, or academic projects are listed

### Requirement: Contact page content
**When** Contact page is rendered  
**THEN** it displays heading "Contato" (or "Contact") followed by social/linkedin/github/email links  

#### Scenario: LinkedIn link renders
- **WHEN** Contact page loads
- **THEN** a button or clickable link to LinkedIn profile appears with icon and URL

#### Scenario: GitHub link renders
- **WHEN** Contact page loads
- **THEN** a button or clickable link to GitHub profile appears with icon and URL

#### Scenario: Email link renders
- **WHEN** Contact page loads
- **THEN** email address appears as clickable mailto: link or copyable text

### Requirement: Projects two-page layout with explicit deploy link on right page
**When** Projects section is rendered  
**THEN** each project occupies exactly two pages: left page for metadata, right page for demo showcase WITH EXPLICIT DEPLOY LINK  

#### Scenario: Project left page structure (metadata)
- **WHEN** navigating to a project's left page
- **THEN** left page displays: (1) project title as h2, (2) brief description paragraph explaining objective, (3) tech stack tags list with framework/language names, (4) GitHub repository link button

#### Scenario: Project right page structure (demo showcase + deploy link)
- **WHEN** navigating to a project's right page (from left page or directly via corner navigation)
- **THEN** right page displays: (1) embedded video thumbnail OR static image with "Play" overlay icon, (2) full-width width matching viewport exactly, (3) EXPLICIT DEPLOY/PREVIEW LINK button prominently placed near top-right area with distinct styling and full URL

#### Scenario: Deploy link prominence on project right page
- **WHEN** viewing any project's right page
- **THEN** deploy link appears in one of these prominent positions: (a) top-right corner, (b) centered at top, or (c) bottom-right area - always with clear visual distinction from other content

#### Scenario: Page flip between project pages
- **WHEN** user clicks left page edge to go right, or right page edge to go left
- **THEN** standard 300-400ms flip animation occurs regardless of content type; deploy link remains visible on right page throughout animation

#### Scenario: Deploy link click behavior
- **WHEN** user clicks deploy/preview link button
- **THEN** browser opens new tab or navigates to the deployed version URL (GitHub Pages, Netlify, Vercel, etc.)

### Requirement: Projects section internal navigation
**When** in Projects section (before first project's left page)  
**THEN** right sidebar displays category tabs as specified in narrative-notebook-component spec  

#### Scenario: Category selection filters projects
- **WHEN** user selects "WebDev" category from right sidebar
- **THEN** only WebDev projects render across the two-page sequences, with other categories hidden

#### Scenario: Project page navigation preserves category filter
- **WHEN** user flips pages within a specific project's two-page layout
- **THEN** category filter remains active; switching to another project doesn't change active category until new selection

### Requirement: Page ordering and counting convention
**When** calculating document order for all pages in the notebook  
**THEN** total page count = 1 (About Me) + 1 (Career) + 1 (Studies) + 2×N (Projects, where N projects × 2 pages each) + 1 (Contact) = 4 + 2N pages  

#### Scenario: Page order from left to right
- **WHEN** notebook opens after Play click
- **THEN** pages appear in this exact sequence: About Me → Career → Studies → [Projects section with variable length] → Contact

#### Scenario: First page is always About Me
- **WHEN** notebook first opens or navigates from beginning
- **THEN** leftmost visible page shows "Sobre Mim" / "About Me" content (skills, soft skills, results combined)

#### Scenario: Projects section variable length handling
- **WHEN** different numbers of projects exist across categories (IA e Automações, Jogos, WebDev, BackEnd)
- **THEN** total project pages = 2 × number of active projects in currently selected category
- **WHEN** navigating past all projects in current category
- **THEN** notebook continues to Contact page

#### Scenario: Empty category handling
- **WHEN** a category has no projects assigned (e.g., Jogos empty)
- **THEN** that category marker remains visible on right sidebar but clicking it shows empty state (no project pages render for that category)

### Requirement: Content localization support
**When** page content renders  
**THEN** all text content respects the current language setting from translations.js (pt/eng locale switching)  

#### Scenario: Portuguese locale by default
- **WHEN** page loads without explicit language preference or with pt locale
- **THEN** headings use "Sobre Mim", "Carreira", etc. as specified

#### Scenario: English locale override
- **WHEN** user switches to eng locale via LightSwitch/translation toggle
- **THEN** same heading positions display "About Me", "Career", etc. in English

## MODIFIED Requirements

None

## REMOVED Requirements

None
