# Spec Delta

## MODIFIED Requirements

### Requirement: About Me spread content

**When** About Me ("Sobre Mim" / "About Me") spread is rendered  
**THEN** the left leaf MUST display skills and soft skills, and the right leaf MUST display professional results, without duplicating content between leaves

#### Scenario: About Me left leaf
- **WHEN** About Me spread loads (first spread in document order)
- **THEN** the left leaf shows technical skills organized in categories: Linguagens (JavaScript, TypeScript, Python, Java, C++, C#, GDScript), Web e Mobile (React, React Native, Expo, HTML5, CSS3), Dados e APIs (Supabase, Firebase, API REST, Google Maps API, ViaCEP), Games (Unity, Godot), Ferramentas (Git, GitHub)

#### Scenario: About Me right leaf
- **WHEN** About Me spread loads
- **THEN** the right leaf shows professional results/outcomes as a developer

#### Scenario: Skills content rendered on About Me
- **WHEN** About Me spread loads
- **THEN** frontend development skills appear with technology tags/icons

#### Scenario: Localized About Me content
- **WHEN** the language is pt or eng
- **THEN** both leaves use the active language for headings, skills, soft skills, and result descriptions

### Requirement: Career spread content

**When** Career spread is rendered  
**THEN** the left leaf MUST display the current role and professional trajectory, and the right leaf MUST display future goals

#### Scenario: Career path description renders
- **WHEN** Career spread loads
- **THEN** text describing career progression and current role focus appears on the left leaf

#### Scenario: Work experience timeline
- **WHEN** Career spread loads
- **THEN** the left leaf shows timeline with four entries: (1) Engenheira de Software at Levty (client: Livelo), dez 2024 — atual; (2) Desenvolvedora e Pesquisadora at GET — Grupo de Educação Tutorial (UFJF), set 2024 — atual; (3) Programadora Líder e Idealizadora at ProgramADAs (UFJF), set 2023 — dez 2024; (4) Fundadora at Creati Lab — impressão 3D sob medida, Projeto pessoal

#### Scenario: Career goals
- **WHEN** Career spread loads
- **THEN** the right leaf shows future goals: "Construir software escalável, de alta qualidade e com propósito", "Aprofundar mobile e back-end (React Native, Supabase, APIs)", "Seguir criando jogos e soluções de gamificação educacional" (PT) / "Build scalable, high-quality software with purpose", "Go deeper into mobile and back-end (React Native, Supabase, APIs)", "Keep creating games and educational gamification solutions" (EN)

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

### Requirement: Spread ordering and counting convention

The notebook MUST order spreads as About Me → Career → Studies → Projects → Contact. Each section occupies one spread and each visible project occupies one spread, so the total is `4 + N` spreads or `8 + 2N` leaves, where N is the number of visible projects.

#### Scenario: Page order from left to right
- **WHEN** notebook opens after Play click
- **THEN** spreads appear in this exact sequence: About Me → Career → Studies → [Projects with variable length] → Contact

#### Scenario: First spread is always About Me
- **WHEN** the notebook first opens or navigates from the beginning
- **THEN** the visible spread shows About Me content split across both leaves

#### Scenario: Projects section variable length
- **WHEN** different numbers of projects exist across categories (Jogos: 2, WebDev: 3, BackEnd: 1, IA e Automações: 0)
- **THEN** total project spreads equal the number of active projects in the selected category, and the notebook continues to Contact afterward

#### Scenario: Empty category handling
- **WHEN** a maintainer adds a page pair to WebDev
- **THEN** both WebDev pairs appear consecutively between Jogos and BackEnd during arrow navigation