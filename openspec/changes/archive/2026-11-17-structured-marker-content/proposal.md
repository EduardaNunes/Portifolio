# Proposal

## Why

Content today is split across `profile.js`, a parallel `labels` tree, `projects.js`, and hardcoded slices in `buildNotebookPages.js`. Each marker has a bespoke shape (`skills`, `timeline`, `courses`, etc.) and its own page component, so adding, reordering, or reusing content requires touching three or four files and can silently break pagination. A uniform, typed content input per marker — with pagination kept in a separate layout module — makes page content predictable to edit and lets markers grow without new page components.

## What Changes

- Replace the content currently in `profile.js` and `projects.js` with one JSON file per language (`src/content/pt.json`, `src/content/eng.json`) using the same marker, section, and component structure.
- Introduce a typed content catalog shared by every marker: `blocks`, `text`, `positions`, `email`, `links`, `list`, and `projectDemo`, each with required and optional fields. Optional links, empty `toDate`, empty image lists, and omitted items control rendering instead of placeholder copy.
- Use stable marker ids as outer content keys and move presentation metadata (tab side, icon, accent, order) into a small marker registry. Content provides the localized marker label.
- Keep pagination out of content: a separate layout module declares the narrative page pairs and slices by section id and item range. Project markers are generated automatically as an overview pair plus one pair per project.
- Add a generic leaf/section/block renderer that replaces the six per-marker page components.
- Validate content at build/dev time: locale parity, required fields, known component types, unique ids, and complete layout coverage with no orphaned or duplicated content.
- Move UI-only copy (button labels, current-date wording, navigation labels) to `translations.js` and remove the unused duplicated marker/category label maps.
- Preserve the fixed-page/no-scroll contract, continuation pairs, running heads, navigation, CSS palette, accessibility, and existing visual presentation.

**BREAKING (internal data shape):** `profileData`, the `projects` export, and the props of the per-marker page components are replaced. There is no public API and the rendered site behavior is intended to stay the same.

## Capabilities

### New Capabilities

- `marker-content-schema`: owns the typed per-marker content model — locale parity, stable marker/section ids, the seven component types and their required/optional fields, project lists, content ordering, and validation.

### Modified Capabilities

- `narrative-content-pages`: marker content is now read from the structured locale files; the layout module, not the marker content, declares page pairs. Content division, localization, project overview, and page containment requirements remain.
- `notebook-page-flow`: deterministic slices are now declared in the layout module by stable section/component references, and content coverage is validated so no slice is missing or duplicated. Fixed pages, running heads, navigation, and blank leaves remain unchanged.

## Impact

- **Content data:** `src/data/profile.js` and `src/data/projects.js` are replaced by `src/content/pt.json`, `src/content/eng.json`, and `src/content/index.js`; `src/data/translations.js` gains UI copy and loses unused duplicate maps.
- **Layout and build:** `src/utils/buildNotebookPages.js` is rewritten around the content schema and a new `src/content/layout.js`; project overview and project pairs are generated there.
- **Components:** `AboutMePage.jsx`, `CareerPage.jsx`, `StudiesPage.jsx`, `ContactPage.jsx`, `ProjectLeftPage.jsx`, and `ProjectRightPage.jsx` are replaced by generic leaf/section/block renderers.
- **Validation and docs:** a content validator script (wired to `npm run build` and an npm script) plus a README authoring section.
- **Out of scope:** runtime height measurement or automatic pagination, visual redesign, new colors or fonts, cover/tabs/page-turn animation, viewport geometry, and navigation behavior.
