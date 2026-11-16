# Design

## Context

Current state (see proposal.md for motivation):
- 5-section notebook: Sobre Mim, Carreira, Estudos, Projetos, Contato
- Projects has category filtering (IA e Automações, Jogos, WebDev, BackEnd) on right side
- Right category tabs only visible in Projects section
- Arrow navigation goes through spreads, but Projects section has variable length based on category filter
- buildNotebookPages.js generates spreads dynamically based on activeCategory

## Goals / Non-Goals

**Goals:**
- Implement 9 fixed sections in order: Sobre Mim, Carreira, Estudos, Projetos, IA e Automações, Jogos, WebDev, BackEnd, Contato
- Each section = exactly 1 spread (2 pages), total 9 spreads / 18 pages
- Right-side tabs (4 sections) permanently visible on right edge
- Dual active tab state: when right-side section active, "Projetos" left tab + right tab both active
- Sequential arrow navigation through all 9 spreads in fixed order
- Remove category filtering within Projects; right-side sections replace it
- Add content for 4 new right-side sections in profile data

**Non-Goals:**
- Changing the page turn animation or visual styling
- Changing the notebook layout (80vw x 80vh, pixel-art cover)
- Adding new dependencies or major architectural changes
- Multi-language content for new sections (can be added later)

## Decisions

### 1. Fixed spread array in buildNotebookPages.js
**Decision**: Replace dynamic spread generation with a fixed array of 9 spreads, each with a fixed `section` id matching the 9 sections.

**Rationale**: 
- Simplifies navigation logic - index directly maps to section
- Eliminates category filter reconciliation complexity
- Makes sequential arrow navigation trivial (index ± 1)

**Alternatives considered**:
- Keep dynamic generation but with fixed section list - rejected because it still requires filter logic
- Hybrid approach with fixed sections + optional extra pages - rejected as overcomplicating MVP

### 2. Section IDs and data structure
**Decision**: Use these section IDs (matching left tab order):
```
0: 'about'          // Sobre Mim
1: 'career'         // Carreira
2: 'studies'        // Estudos
3: 'projects'       // Projetos
4: 'ai-automation'  // IA e Automações
5: 'games'          // Jogos
6: 'webdev'         // WebDev
7: 'backend'        // BackEnd
8: 'contact'        // Contato
```

Right-side section IDs: `['ai-automation', 'games', 'webdev', 'backend']`

**Rationale**: 
- Consistent kebab-case IDs for all sections
- Easy to identify right-side sections via array membership
- Matches existing pattern (`about`, `career`, `studies`, `projects`, `contact`)

### 3. Dual active tab state in NarrativeNotebook.jsx
**Decision**: Track active state with two pieces of state:
- `activeLeftSection` - the active left tab (one of 9)
- `activeRightSection` - the active right tab (one of 4, or null)

When `activeRightSection` is set, both `activeLeftSection === 'projects'` AND `activeRightSection` are visually active.

**Rationale**:
- Clean separation of left/right active state
- Easy to compute: right section active → projects left tab also active
- Matches the requirement exactly

**Alternatives considered**:
- Single `activeSection` with special logic - rejected as harder to reason about
- Derive right active from current spread - rejected because right tabs can be clicked directly

### 4. Right-side tabs always rendered
**Decision**: Move right-side tabs out of `ProjectsSection` component and render them directly in `NarrativeNotebook.jsx` as permanent tabs, similar to left tabs.

**Rationale**:
- Right tabs are now section tabs, not category filters
- They need to be visible on all spreads
- Simplifies component hierarchy

**Impact**: `ProjectsSection.jsx` can be removed or repurposed for Projetos spread content only.

### 5. Arrow navigation logic
**Decision**: `goToSpread(index)` clamps to 0-8. Left arrow = index - 1, right arrow = index + 1. No special section-boundary logic needed since all spreads are equal.

**Rationale**:
- Simplest possible implementation
- Matches requirement: "arrow navigation passes through all pages one by one"
- Eliminates current complex category filter boundary logic

### 6. Right tab click handler
**Decision**: Right tab click calls `goToSpread(rightSectionIndex)` where `rightSectionIndex = 4 + rightTabs.indexOf(clickedTab)`. This sets both the spread index and the dual active state.

**Rationale**:
- Direct navigation to the target spread
- Automatically establishes dual active state via spread index

### 7. Content for right-side sections
**Decision**: Add new content objects in `profileData` for each right-side section:
- `aiAutomation` - left: skills/overview, right: featured projects
- `games` - left: skills/overview, right: featured projects
- `webdev` - left: skills/overview, right: featured projects
- `backend` - left: skills/overview, right: featured projects

Create new page components or reuse existing `ProjectLeftPage`/`ProjectRightPage` with section-specific data.

**Rationale**:
- Consistent with existing pattern (each section has left/right content)
- Reuses existing page components where possible
- Keeps content in profileData for localization support

### 8. Projetos spread content
**Decision**: Projetos spread becomes an overview page:
- Left leaf: Summary of all 4 categories with brief descriptions
- Right leaf: 1-2 featured projects per category with visual cues to right-side tabs

**Rationale**:
- Projetos is now a gateway/overview, not a variable-length project list
- Guides users to explore the 4 right-side sections
- Maintains "Projetos" as a meaningful section

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| **Content for 4 new sections not ready** | Create placeholder components with "Content coming soon" - can be filled incrementally |
| **Dual active state visual confusion** | Ensure clear visual distinction: left tab uses left accent color, right tab uses right accent color; both expanded |
| **Breaking existing project display** | Old project spreads are replaced by 4 fixed right-section spreads; migrate project data to new section content |
| **Localization for new sections** | Add English keys to profileData.eng alongside Portuguese; mark as TODO for translation |
| **Arrow navigation at boundaries** | Clamp index at 0 and 8; disable corner buttons visually at boundaries (already implemented) |
| **Right tab click while on right section** | Clicking active right tab should do nothing (or could reset to Projetos - decide during implementation) |

## Migration Plan

1. **Update profileData** - Add content objects for 4 right-side sections (PT/EN)
2. **Update buildNotebookPages.js** - Generate fixed 9-spread array with new section IDs
3. **Create/Update page components** - Add page components for right-side sections (can reuse ProjectLeftPage/ProjectRightPage)
4. **Refactor NarrativeNotebook.jsx** - New navigation logic, dual active state, permanent right tabs
5. **Update NotebookTab.jsx** - Support dual active state (optional: add `dualActive` prop)
6. **Remove ProjectsSection.jsx** - Replace with permanent right tabs in NarrativeNotebook
7. **Update App.jsx** - New sections array, remove categories/activeCategory state
8. **Test all navigation paths** - Arrows, left tabs, right tabs, direct spread index

## Open Questions

1. **Right tab click behavior when already on that section**: Should clicking the active right tab navigate back to Projetos spread, or do nothing? (Recommendation: do nothing, consistent with left tabs)
2. **Projetos spread content design**: Exact layout of category summaries and featured projects - needs design input
3. **Right-side section content source**: Pull from existing projects data, or create new dedicated content? (Recommendation: create new content objects in profileData, referencing existing projects where relevant)
4. **Accessibility for dual active state**: How to announce "Projetos and Jogos are both active" to screen readers? (Needs ARIA consideration during implementation)