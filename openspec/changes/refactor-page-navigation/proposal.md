# Proposal

## Why

The notebook navigation currently mixes fixed sections with project-category filtering, which causes inconsistent behavior and hard-to-maintain page ordering. A configurable marker model is needed so every notebook group owns its own ordered page pairs while the global arrows navigate them consistently.

## What Changes

**BREAKING** — The notebook navigation model changes from five sections plus a filtered project list to an ordered marker registry.

- Add one ordered, editable marker registry. Each marker declares its stable ID, localized label, visual `side` (`left` or `right`), accent/icon metadata, and one or more two-page page pairs.
- Preserve the initial registry order: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato.
- Render the five current left markers (Sobre Mim, Carreira, Estudos, Projetos, Contato) on the left and the four current project-domain markers (IA e Automações, Jogos, WebDev, BackEnd) on the right. The side is driven by marker metadata and does not change registry order.
- Navigate all page pairs sequentially with the existing global corner arrows: every pair in a marker is traversed before the next marker begins.
- Require each marker to own at least one page pair and allow any marker to add further pairs without changing navigation logic. Project pairs retain the existing layout: descriptive text on the left page and image/demo on the right page.
- Keep right-side markers permanently visible. While a right-side marker is current, activate both its tab and the Projetos tab; otherwise, exactly one tab is active.
- Replace category filtering with direct navigation to the marker's first page pair.

## Capabilities

### New Capabilities
- `narrative-right-sections`: Defines right-side project-domain markers, their permanent visibility, dual active state with Projetos, and support for multiple page pairs.

### Modified Capabilities
- `narrative-notebook-component`: Changes marker rendering and navigation to use ordered, side-aware markers and flattened global page-pair traversal.
- `narrative-content-pages`: Changes content ordering/counting from a fixed number of spreads to configurable markers with one or more page pairs.

## Impact

**Affected areas:**
- `src/App.jsx` marker configuration and notebook inputs
- `src/utils/buildNotebookPages.js` page-pair generation and flattening
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` global navigation and active-tab derivation
- `src/components/narrative-notebook-component/NotebookTab.jsx` active-state accessibility
- Notebook page components and localized profile/project data
- Existing category-filtering UI (`ProjectsSection.jsx`) will be removed or repurposed only if no longer needed

No external dependencies are required.