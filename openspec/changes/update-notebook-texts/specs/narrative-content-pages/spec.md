# Spec Delta

## MODIFIED Requirements

### Requirement: About Me spread content
**When** About Me ("Sobre Mim" / "About Me") spread is rendered  
**THEN** the left leaf MUST display skills and soft skills, and the right leaf MUST display professional results, without duplicating content between leaves

#### Scenario: About Me left leaf - skills
- **WHEN** About Me spread loads (first spread in document order)
- **THEN** the left leaf shows technical skills organized in categories: Linguagens (JavaScript, TypeScript, Python, Java, C++, C#, GDScript), Web e Mobile (React, React Native, Expo, HTML5, CSS3), Dados e APIs (Supabase, Firebase, API REST, Google Maps API, ViaCEP), Games (Unity, Godot), Ferramentas (Git, GitHub)

#### Scenario: About Me left leaf - soft skills
- **WHEN** About Me spread loads
- **THEN** the left leaf shows soft skills: Causa raiz (debug production systems to root cause), Proatividade (anticipate team needs, prioritize user experience), Requisitos em código (translate complex requirements into small, clean, reviewable deliveries), Didática (explain programming logic in mini-courses and mentoring)

#### Scenario: About Me right leaf - results
- **WHEN** About Me spread loads
- **THEN** the right leaf shows professional results: "Do 1º período à liderança técnica" (ProgramADAs RPG in Unity), "1º lugar na Maratona Jr. UFJF" (2023 first semester win), "Software financeiro em escala" (Levty/Livelo features and code reviews), "Excelência acadêmica" (90%+ average in Information Systems)

#### Scenario: Localized About Me content
- **WHEN** the language is pt or eng
- **THEN** both leaves use the active language for headings, skills, soft skills, and result descriptions

### Requirement: Career spread content
**When** Career spread is rendered  
**THEN** the left leaf MUST display the current role and professional trajectory, and the right leaf MUST display future goals

#### Scenario: Career current role
- **WHEN** Career spread loads
- **THEN** the left leaf shows current role: "Engenheira de Software na Levty, atuando em sistema financeiro de alto volume para a Livelo. Foco em código limpo, estabilidade e experiência do usuário." (PT) / "Software Engineer at Levty, working on a high-volume financial system for Livelo. Focused on clean code, stability and user experience." (EN)

#### Scenario: Career timeline
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
- **THEN** the left leaf shows two education entries: (1) Bacharelado em Sistemas de Informação at Universidade Federal de Juiz de Fora (UFJF), 2023 — 2027, média acima de 90%; (2) Ensino Médio Técnico em Informática para Internet at Instituto Federal — Paulo de Frontin, 2019 — 2021

#### Scenario: Courses and achievements render
- **WHEN** Studies spread loads
- **THEN** the right leaf shows courses: "1º lugar, Maratona de Programação Jr." (UFJF, 2023), "Minicursos de lógica de programação (ministrante)" (GET / UFJF), "Inglês avançado" (Fluente na escrita técnica), "100 Days CSS Challenge" (Autodidata)

#### Scenario: Academic projects render
- **WHEN** Studies spread loads
- **THEN** the right leaf shows academic projects: "ProgramADAs" (Jogo educacional em Unity que ensina algoritmos de forma lúdica), "Esbugalhado: o Jogo" (Jogo em JavaScript desenvolvido na disciplina DCC202 (UFJF))

### Requirement: Contact spread content
**When** Contact spread is rendered  
**THEN** the left leaf MUST display the contact call-to-action and the right leaf MUST display LinkedIn, GitHub and email links

#### Scenario: Contact links render
- **WHEN** Contact spread loads
- **THEN** the right leaf shows LinkedIn (https://www.linkedin.com/in/eduardapmn), GitHub (https://github.com/EduardaNunes), and email (eduardapmn@gmail.com) as clickable links with icons

### Requirement: Project spread layout with explicit deploy link
**When** a project spread is rendered  
**THEN** its left leaf MUST show metadata and its right leaf MUST show the demo with an explicit deploy link

#### Scenario: Project left leaf structure
- **WHEN** navigating to a project spread
- **THEN** the left leaf displays the project title, description (following problem → solution → result pattern), tech stack tags, and GitHub repository link

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
- **THEN** only WebDev project spreads render across the notebook (Productive Tracking, Pixel Paint, Portfólio em Caderno)

#### Scenario: Active category remains visible
- **WHEN** a category is selected
- **THEN** its tab expands and shows its name instead of disappearing

#### Scenario: Project navigation preserves category filter
- **WHEN** the user flips between spreads within a selected category
- **THEN** the category filter remains active until another selection or reselection

#### Scenario: Category tabs do not show counts
- **WHEN** category tabs render
- **THEN** no project count badge or number appears

#### Scenario: Empty category handling
- **WHEN** a category has no projects (e.g., IA e Automações) and the user selects it
- **THEN** the category tab remains visible and an empty state message "Nenhum projeto nesta categoria" / "No projects in this category" is shown

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

### Requirement: Content localization support
**When** page content renders  
**THEN** all text content MUST respect the current language setting from translations.js or profile data (pt/eng locale switching)

#### Scenario: Portuguese locale by default
- **WHEN** page loads without explicit language preference or with pt locale
- **THEN** headings use "Sobre Mim", "Carreira", "Estudos", "Projetos", "Contato" and all content uses Portuguese descriptions

#### Scenario: English locale override
- **WHEN** user switches to eng locale via LightSwitch/translation toggle
- **THEN** same heading positions display "About Me", "Career", "Studies", "Projects", "Contact" and all content uses English descriptions