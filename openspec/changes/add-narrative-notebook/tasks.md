# Tasks

## 1. Setup and Project Structure

- [x] 1.1 Create `src/components/NarrativeNotebook.jsx` with scroll-snap container wrapper for notebook section
- [x] 1.2 Create `src/components/AboutMePage.jsx` component for About Me page content (skills, soft skills, results)
- [x] 1.3 Create `src/components/CareerPage.jsx` component for Career page content
- [x] 1.4 Create `src/components/StudiesPage.jsx` component for Studies page content
- [x] 1.5 Create `src/components/ContactPage.jsx` component with LinkedIn, GitHub, email links
- [x] 1.6 Create `src/components/ProjectLeftPage.jsx` component for project metadata (title, description, tech stack, repo link)
- [x] 1.7 Create `src/components/ProjectRightPage.jsx` component for project demo with video/image thumbnail and EXPLICIT DEPLOY LINK
- [x] 1.8 Create `src/components/ProjectsSection.jsx` container for project section with category filter sidebar

## 2. Data Structure

- [x] 2.1 Create `src/data/projects.js` with project array containing: id, title, description, tech stack tags, repo link, thumbnailUrl, deployUrl, categoryId
- [x] 2.2 Define categories: IA e Automações, Jogos, WebDev, BackEnd with their respective projects
- [x] 2.3 Add translation keys for new content (Sobre Mim, Carreira, Estudos, Projetos, Contato markers and tooltips)

## 3. Styling

- [ ] 3.1 Add CSS for scroll-snap container with `scroll-snap-type: y mandatory` and `overflow-y: auto`
- [ ] 3.2 Style notebook pages as horizontal flex children with 100vw width each
- [ ] 3.3 Implement page flip animation using CSS transforms (rotateX/rotateY) with 300-400ms ease-in-out
- [ ] 3.4 Style left sidebar markers with tooltip buffer zone for hover text display
- [ ] 3.5 Style right category tabs for Projects section in vertical layout
- [ ] 3.6 Style corner click zones (left 15% × bottom 60px, right 15% × bottom 60px) for swipe navigation
- [ ] 3.7 Ensure deploy link on ProjectRightPage has distinct styling and high visibility

## 4. Integration with Main App

- [ ] 4.1 Update `src/App.jsx` to import and render `Notebook` component after `Clouds` section
- [ ] 4.2 Implement play button click handler that triggers scroll to notebook section with auto-scroll animation
- [ ] 4.3 Verify notebook opens to first page ("Sobre Mim" / "About Me") with left/right content areas visible side-by-side after Play click and scroll animation completes

## 5. Marker Visibility Logic

- [ ] 5.1 Implement left marker visibility toggle: only current page marker hidden, all others visible
- [ ] 5.2 Implement right category marker visibility toggle: selected category invisible, previous visible
- [ ] 5.3 Wire up marker click handlers to flip notebook to corresponding page
- [ ] 5.4 Ensure tooltip displays on hover for non-current markers only

## 6. Navigation Handlers

- [ ] 6.1 Implement `handlePreviousPageClick()` that flips to previous page when bottom-left corner clicked
- [ ] 6.2 Implement `handleNextPageClick()` that flips to next page when bottom-right corner clicked
- [ ] 6.3 Ensure navigation respects edge-of-section boundaries (don't jump from last project to Contact incorrectly)
- [ ] 6.4 Handle empty category state when clicking on category with no projects

## 7. Testing

- [ ] 7.1 Test scroll snap behavior: verify one viewport visible at a time, smooth transitions
- [ ] 7.2 Test Play button click: auto-scroll to second section without overlap
- [ ] 7.3 Test left marker clicks: flip notebook to each section (About Me → Career → Studies → Projects → Contact)
- [ ] 7.4 Test right marker clicks within Projects: flip between category tabs and project pages
- [ ] 7.5 Test corner navigation: bottom-left flips backward, bottom-right flips forward throughout all pages
- [ ] 7.6 Test deploy link click on ProjectRightPage: opens deployed version in new tab
- [ ] 7.7 Test localization: verify all text content respects current language (pt-BR/en)

## 8. Documentation

- [ ] 8.1 Add inline JSDoc comments to NarrativeNotebook component describing props and behavior
- [ ] 8.2 Document marker visibility toggle pattern in project README or component docs

## Workflow follow-up

- After all tasks are complete, run `npm run build` to verify no TypeScript/ESLint errors
- Run `npm run dev` to confirm notebook works in development environment
- Create screenshot of completed notebook for documentation/portfolio
