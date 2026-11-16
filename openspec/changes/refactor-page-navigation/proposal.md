# Proposal

## Why

The current page navigation has inconsistent behavior and structural limitations. The notebook currently has 5 main sections (About Me, Career, Studies, Projects, Contact) with Projects being the only section that has category filtering on the right side. The user wants to restructure this into 9 sections total - 5 on the left side and 4 on the right side - where ALL sections behave consistently with arrow navigation passing through every page sequentially, and the right-side sections (IA e Automações, Jogos, WebDev, BackEnd) are always visible and can have dual active state with "Projetos" on the left.

## What Changes

**BREAKING** - Navigation structure fundamentally changes:
- **New section order**: 9 sections instead of 5: "Sobre Mim", "Carreira", "Estudos", "Projetos", "IA e Automações", "Jogos", "WebDev", "BackEnd", "Contato"
- **Right-side sections**: The 4 project categories become full sections on the right side (not just category filters), each with at least 2 pages (1 spread)
- **Sequential arrow navigation**: Bottom corner arrows navigate through ALL 9 spreads (18 pages) sequentially, one by one, regardless of side
- **Right-side tabs always visible**: The 4 right-side section tabs are permanently rendered, not just when in Projects section
- **Dual active tab state**: When a right-side section is active, BOTH "Projetos" (left tab) AND the active right-side tab are highlighted simultaneously - this is the ONLY case where two tabs can be active
- **Each section = 1 spread (2 pages)**: Minimum 2 pages per section, with ability to add more page pairs if content overflows
- **Category filtering removed from Projects**: The old category filtering within Projects is replaced by the new right-side sections structure

**Implementation changes needed**:
- `buildNotebookPages.js` - rebuild spread generation for 9 fixed sections
- `NarrativeNotebook.jsx` - new navigation logic, dual active tab state, right-side tabs always visible
- `NotebookTab.jsx` - support dual active state for right-side tabs
- `ProjectsSection.jsx` - likely replaced/removed since right-side tabs become permanent section tabs
- `App.jsx` - new sections and categories data structure
- Profile data - add content for the 4 new right-side sections

## Capabilities

### New Capabilities
- `narrative-right-sections`: Handles the 4 right-side sections (IA e Automações, Jogos, WebDev, BackEnd) as first-class notebook sections with their own spreads, permanent tab visibility, and dual active state with "Projetos"

### Modified Capabilities
- `narrative-notebook-component`: Navigation logic completely refactored - sequential arrow navigation through all 9 spreads, dual active tab state for right-side sections, right-side tabs always visible
- `narrative-content-pages`: Spread ordering changed from 5 to 9 sections, each section gets exactly 1 spread (2 pages), Projects category filtering removed and replaced by right-side sections

## Impact

**Affected files**:
- `src/utils/buildNotebookPages.js` - spread generation logic
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` - navigation, tabs, active state
- `src/components/narrative-notebook-component/NotebookTab.jsx` - dual active state support
- `src/components/narrative-notebook-component/ProjectsSection.jsx` - likely removed/replaced
- `src/App.jsx` - sections and categories data
- `src/data/profile.js` - content for 4 new right-side sections
- `src/data/projects.js` - may need adjustments for new structure

**Dependencies**: None new - pure refactoring within existing React/Vite stack