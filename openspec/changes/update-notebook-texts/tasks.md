# Tasks

## 1. Update Profile Data

- [x] 1.1 Replace `src/data/profile.js` with new profile data from attached file (verify both pt and eng locales have complete content for all sections: sections, labels, about, career, studies, contact)
- [x] 1.2 Verify profile data structure matches expected exports: `profileData` object with `pt` and `eng` keys, each containing `sections`, `labels`, `about`, `career`, `studies`, `contact`
- [x] 1.3 Start dev server (`npm run dev`) and verify About Me spread renders correctly in both languages (skills categories, soft skills, results)
- [x] 1.4 Verify Career spread renders correctly in both languages (current role, timeline with 4 entries, goals)
- [x] 1.5 Verify Studies spread renders correctly in both languages (education with 2 entries, courses with 4 items, academic projects with 2 items)
- [x] 1.6 Verify Contact spread renders correctly in both languages (LinkedIn, GitHub, email links)

## 2. Update Projects Data

- [x] 2.1 Replace `src/data/projects.js` with new projects data from attached file (verify PROJECT_CATEGORIES unchanged, projects array has 6 items with correct categoryId values)
- [x] 2.2 Verify projects data structure matches expected exports: `PROJECT_CATEGORIES`, `CATEGORIES`, `projects` array, helper functions (`getProjectsByCategory`, `getCategorizedProjects`, `getProjectById`)
- [x] 2.3 Verify each project has required fields: `id`, `title`, `description` (problem→solution→result), `techStack`, `repoLink`, `thumbnailUrl`, `deployUrl`, `categoryId`
- [x] 2.4 Check that all referenced thumbnail SVGs exist in `public/images/projects/` (programadas.svg, esbugalhado.svg, productive-tracking.svg, pixel-paint.svg, portfolio-web.svg, student-housing.svg) - add placeholder SVGs if missing
- [x] 2.5 Start dev server and verify Projects section loads with all 4 category tabs (IA e Automações, Jogos, WebDev, BackEnd)

## 3. Verify Category Filtering and Project Spreads

- [x] 3.1 Select "Jogos" category and verify 2 project spreads render (ProgramADAs, Esbugalhado) with correct metadata and deploy links
- [x] 3.2 Select "WebDev" category and verify 3 project spreads render (Productive Tracking, Pixel Paint, Portfólio em Caderno)
- [x] 3.3 Select "BackEnd" category and verify 1 project spread renders (App de Moradia Estudantil)
- [x] 3.4 Select "IA e Automações" category and verify empty state message "Nenhum projeto nesta categoria" / "No projects in this category" displays
- [x] 3.5 Verify category filter persists when navigating between project spreads within same category
- [x] 3.6 Verify deploy links open in new tab for all projects that have `deployUrl`

## 4. Verify Localization and Navigation

- [x] 4.1 Toggle language switcher (LightSwitch) and verify all section headings, labels, and content switch between Portuguese and English
- [x] 4.2 Verify UI labels update correctly: section tabs, project tech stack label, view source/deploy/demo buttons, navigation arrows, empty category message
- [x] 4.3 Navigate full notebook sequence: About Me → Career → Studies → Projects (each category) → Contact using bottom corner clicks
- [x] 4.4 Verify page turn animation works correctly with new content lengths
- [x] 4.5 Verify reduced motion setting still works (no rotation, short fade only)

## 5. Final Integration Check

- [x] 5.1 Run production build (`npm run build`) and verify no errors
- [x] 5.2 Preview production build (`npm run preview`) and do full smoke test in both languages
- [x] 5.3 Verify all external links (LinkedIn, GitHub, email, project repos, project deploys) are valid URLs

## Workflow follow-up

- Archive the change after implementation is complete and verified.
- Verify the archived result.