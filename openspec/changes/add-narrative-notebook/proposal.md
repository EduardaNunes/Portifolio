# Proposal

## Why

The portfolio needs a smooth, scroll-snap enabled second section with a notebook-style navigation system. Currently, after the initial header/profile view (complete with theme toggle and animated clouds), clicking play should auto-scroll down to reveal this new content area. The notebook will serve as the primary navigation mechanism for exploring sections like "About Me", "Career", "Studies", "Projects" and "Contact", providing an engaging, page-turning user experience that showcases technical skills more effectively than a traditional single-page scroll.

## What Changes

- **Scroll Snap Navigation**: Auto-scroll from header to content section with viewport-based snap scrolling
- **Notebook Interface**: Implement a book-like notebook component with page-turning animations
- **Left Sidebar Navigation**: Page markers for "Sobre Mim" (About Me), "Carreira" (Career), "Estudos" (Studies), "Projetos" (Projects), and "Contato" (Contact) that toggle invisibility based on selection state
- **Right Category Markers (Projects Only)**: Additional navigation category tabs within the notebook for project types (IA/Automation, Jogos/Games, WebDev, BackEnd)
- **Multi-page Project Display**: Each project spans two pages (left: metadata/description/tools, right: demo video/image)
- **Swipe Navigation**: Allow page flipping by clicking/tapping on bottom-left or bottom-right corners of the notebook
- **Content Sections**:
  - About Me: Skills and soft skills overview
  - Career: Professional trajectory and achievements
  - Studies: Academic/student achievements
  - Contact: LinkedIn, GitHub, and email links

## Capabilities

### New Capabilities

- **narrative-notebook-scroller**: Handles the scroll-snap behavior and auto-scroll transition from header to content section with smooth viewport-based scrolling
- **narrative-notebook-component**: Core notebook component with page-turning animations, left sidebar navigation markers, right category tabs (for projects section), swipe gestures, and multi-page content layout
- **narrative-content-pages**: Defines the content structure for all pages including project-specific two-page layouts, category filtering within projects section, and marker visibility states

### Modified Capabilities

None

## Impact

Affected files:
- `src/components/NarrativeNotebook.jsx` - New notebook component with scroll-snap behavior, page rendering, navigation markers, and swipe gestures
- `src/components/ProjectPageLeft.jsx` - Left page for project detail display (tools, description, repo link)
- `src/components/ProjectPageRight.jsx` - Right page for project demo (video/image with deploy link)
- `src/data/projects.js` or similar - Data structure for projects and categories
- `vite.config.js` - May need scroll-snap styling adjustments if using CSS-in-JS or external styles

The change introduces a new multi-section portfolio structure replacing the current single-section view, enabling an engaging navigation experience centered around the notebook metaphor.
