# narrative-content-pages Specification

## Purpose
Defines the content structure for every notebook spread: single-section spreads (About Me, Career, Studies, Contact), project spreads with metadata on the left leaf and demo on the right leaf, and the category filtering used inside the Projects section.

## Requirements

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

### Requirement: Content localization support
**When** page content renders  
**THEN** all text content MUST respect the current language setting from translations.js or profile data (pt/eng locale switching)

#### Scenario: Portuguese locale by default
- **WHEN** page loads without explicit language preference or with pt locale
- **THEN** headings use "Sobre Mim", "Carreira", etc. as specified

#### Scenario: English locale override
- **WHEN** user switches to eng locale via LightSwitch/translation toggle
- **THEN** same heading positions display "About Me", "Career", etc. in English

### Requirement: Pixel-art page presentation
Every notebook leaf MUST present its existing localized information in a structured pixel-art composition with clear visual hierarchy. The presentation MUST preserve the existing division of information between left and right leaves and MUST remain legible on supported viewport sizes.

#### Scenario: Section leaf hierarchy
- **WHEN** an About Me, Career, Studies, or Contact leaf is rendered
- **THEN** its heading, section groupings, and individual entries are visually distinguished through the shared pixel-art presentation

#### Scenario: Project leaf hierarchy
- **WHEN** a project leaf is rendered
- **THEN** its existing metadata or demo information is presented with the shared pixel-art treatment without removing the repository, preview, or deploy actions required for that leaf

#### Scenario: Project preview has no demo-copy overlay
- **WHEN** a project image or video preview is rendered
- **THEN** no "Ver demo" or equivalent demo-label text is displayed over the media while the media frame, visual overlay treatment, and deploy action remain available

#### Scenario: Information division is preserved
- **WHEN** any spread is rendered after the presentation refresh
- **THEN** the information remains on the same left or right leaf defined by the content requirements

### Requirement: Page content remains contained and accessible
Page presentation decorations MUST remain inside the displayed leaf and MUST NOT cause horizontal document scrolling, obscure interactive controls, or prevent vertical reading of long leaf content.

#### Scenario: Long content remains readable
- **WHEN** a leaf contains more content than its visible height
- **THEN** the user can read the content through the leaf's existing vertical scrolling behavior without horizontal overflow

#### Scenario: Interactive content remains usable
- **WHEN** a leaf includes a link, contact action, repository action, or deploy action
- **THEN** its control remains visible, keyboard reachable, and operable within the decorated layout

#### Scenario: Narrow screen containment
- **WHEN** the notebook is viewed on a narrow supported viewport
- **THEN** page decorations and text remain within each 50% leaf and the document does not gain horizontal scrolling

### Requirement: Localized content is preserved by the presentation refresh
The visual refresh MUST consume the existing localized content rather than replace it with fixed-language decorative copy.

#### Scenario: Portuguese content
- **WHEN** the active locale is Portuguese
- **THEN** refreshed page headings, labels, and information remain in Portuguese

#### Scenario: English content
- **WHEN** the active locale is English
- **THEN** refreshed page headings, labels, and information remain in English

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
