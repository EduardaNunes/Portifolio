# Design

## Context

See proposal.md - Why. The current codebase has narrative markers fully modularized (content in JSON, layout in `notebookLayout`, rendering via `buildNotebookPages.js` and block renderers). Project category markers (ai-automation, games, webdev, backend) auto-generate page pairs in `buildNotebookPages.js` without layout definitions. The "VER REPOSITÓRIO" button is rendered inline in `LinksBlock` (variant `project-repo`), and thumbnail rendering is embedded in `ProjectDemoBlock`.

Key files:
- `src/content/layout.js` — defines `notebookLayout` for narrative markers only
- `src/utils/buildNotebookPages.js` — builds pages; has `projectPair()`, `overviewPair()`, `emptyCategoryPair()` for categories
- `src/components/notebook-content/blockRenderers.jsx` — contains `ProjectDemoBlock` and `LinksBlock`
- `src/components/notebook-content/` — location for new components
- `src/content/pt.json`, `eng.json` — content with projects under each category

## Goals / Non-Goals

**Goals:**
- Move category page-pair definitions into layout (like narrative markers)
- Create reusable `Thumbnail` component for image/video media
- Create reusable `ProjectButton` component for repository links
- Update `buildNotebookPages.js` to use layout resolver for categories
- Update `ProjectDemoBlock` to use `Thumbnail`
- Update repo link rendering to use `ProjectButton`
- Maintain dual-active tab behavior (Projects + active category)
- Extend validation to cover category layout coverage

**Non-Goals:**
- Change the content structure in JSON (projects already have sections and demo)
- Change the marker registry or tab rendering logic
- Change the notebook component's navigation or page-turn logic
- Add new block types or change existing block schemas

## Decisions

### 1. Layout structure for category markers

**Decision:** Extend `notebookLayout` in `src/content/layout.js` to include category markers with page-pair definitions per project.

**Rationale:** Keeps layout in one place, follows existing pattern for narrative markers, avoids new files.

**Alternative considered:** Separate layout file per category or a `categoryLayout` module. Rejected because it fragments layout and adds complexity.

**Structure:**
```javascript
export const notebookLayout = {
  // ... existing narrative markers
  'ai-automation': {
    pages: [
      { projectId: 'proj-portfolio', left: { sections: ['description', 'tech'] }, right: { demo: true } },
      // additional projects...
    ],
  },
  games: {
    pages: [
      { projectId: 'proj-programada', left: { sections: ['description', 'tech'] }, right: { demo: true } },
      { projectId: 'proj-air-sea-battle', left: { sections: ['description', 'tech'] }, right: { demo: true } },
      // ...
    ],
  },
  // webdev, backend similarly
};
```

Each page entry references a project by `projectId` and declares which sections go on the left leaf. The right leaf is always the demo.

### 2. Layout resolution in `buildNotebookPages.js`

**Decision:** Add a `resolveCategoryPairs(categoryId, categoryContent, categoryLayout, labels)` function that mirrors `resolveNarrativePairs` but works with project-based layout.

**Rationale:** Reuses the existing pattern, keeps resolver logic testable and isolated.

**Implementation:**
- Iterate `categoryLayout.pages`
- For each entry, find the project in `categoryContent.projects` by `projectId`
- Build left leaf from project's sections (filter by declared section ids)
- Build right leaf from project's `demo` block
- Return page pair objects with `id: projectId`

### 3. Thumbnail component

**Decision:** New file `src/components/notebook-content/Thumbnail.jsx` exporting a `Thumbnail` component.

**Props:**
```javascript
{
  src: string,           // required
  alt: string,           // required
  caption?: string,      // optional
  video?: boolean,       // optional, defaults to false
}
```

**Behavior:**
- If `video`: render `<video src={src} controls loop muted className="project-thumbnail" />`
- Else: render `<img src={src} alt={alt} className="project-thumbnail" />` with play overlay
- If `caption`: render `<p className="thumbnail-caption">{caption}</p>` below
- If no media: render placeholder with localized "no thumbnail" text (passed via labels prop)

**Styling:** Uses existing CSS classes (`.thumbnail-container`, `.project-thumbnail`, `.play-overlay`, `.thumbnail-caption`) so no new CSS needed.

### 4. ProjectButton component

**Decision:** New file `src/components/notebook-content/ProjectButton.jsx` exporting a `ProjectButton` component.

**Props:**
```javascript
{
  icon: 'github' | 'external' | 'linkedin' | 'email',  // required
  text: string,  // required, e.g., "Ver Repositório"
  link: string,  // required, URL or mailto:
}
```

**Behavior:**
- Renders `<a>` with `href={link}`
- If link is external (http/https): add `target="_blank" rel="noopener noreferrer"`
- If link is `mailto:`: no target/rel
- Renders icon via existing `LinkIcon` component (reused from blockRenderers)
- Renders text in a `<span>`
- Applies CSS class `project-repo-btn` (existing) for unified styling

**Styling:** Uses existing `.project-repo-btn` CSS rules (lines 1500-1557 in index.css) so no new CSS needed.

### 5. Updating `ProjectDemoBlock`

**Decision:** Refactor `ProjectDemoBlock` to use `Thumbnail` component.

**Changes:**
- Import `Thumbnail` from `./Thumbnail`
- Replace inline image/video rendering with `<Thumbnail src={image.src} alt={image.alt} caption={image.caption} video={image.video} />`
- Keep deploy link rendering as-is (already uses unified button style)

### 6. Updating repository link rendering

**Decision:** In `buildNotebookPages.js`, `projectPair()` function currently pushes a `links` block with variant `project-repo`. Change this to render `ProjectButton` directly.

**Implementation:**
- Import `ProjectButton` in `buildNotebookPages.js` (or use `React.createElement`)
- In `projectPair()`, instead of pushing a `links` block, create the left leaf with sections + a custom section that renders `ProjectButton`
- Or: add a new block type `projectRepo` that renders `ProjectButton`, but simpler to just construct the leaf content directly since it's a single button

**Simpler approach:** Keep the `links` block structure but add a new variant `project-button` that renders `ProjectButton`, and update `blockRenderers.jsx` `LinksBlock` to delegate to `ProjectButton` for that variant. This keeps the block renderer pipeline intact.

Actually, the cleanest approach per the spec (full replacement): In `projectPair()`, construct the left leaf content array including a special item that will be rendered as `ProjectButton`. Since `buildNotebookPages.js` already uses `h(NotebookLeaf, ...)`, we can create a custom renderer or just add the button as a raw React element in the sections array.

**Final decision:** Add a new block type `projectRepo` to the content schema (but only used internally in buildNotebookPages, not in JSON). In `blockRenderers.jsx`, add a `ProjectRepoBlock` that renders `ProjectButton`. In `buildNotebookPages.js`, push a `projectRepo` block instead of `links` variant `project-repo`.

### 7. Validation updates

**Decision:** Extend `src/scripts/validate-content.mjs` to validate:
- Every category marker has a layout entry in `notebookLayout`
- Every project in category content is referenced by the layout
- Every `projectId` in layout exists in content
- Every `section` id in layout exists in the project's sections

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Layout drift: content projects added but layout not updated | Validation catches missing layout references at build time |
| Dual-active tab logic breaks | Existing logic in `NarrativeNotebook.jsx` `isMarkerActive` already handles this (line 75: `currentMarker.side === 'right' && marker.id === 'projects'`); verify it still works |
| Thumbnail/ProjectButton theming mismatch | Both reuse existing CSS classes; test in both themes |
| `buildNotebookPages.js` becomes more complex | Keep resolver functions small and focused; add unit tests |
| Migration of existing projects to layout | All current projects already have `id`, `sections`, `demo`; layout entries are straightforward to add |

## Migration Plan

1. Add `Thumbnail.jsx` and `ProjectButton.jsx` components
2. Update `ProjectDemoBlock` to use `Thumbnail`
3. Add `ProjectRepoBlock` renderer and `ProjectButton` import in `blockRenderers.jsx`
4. Extend `notebookLayout` in `layout.js` with category page definitions
5. Add `resolveCategoryPairs` in `buildNotebookPages.js`
6. Update `buildNotebookPages.js` to use layout for categories and `ProjectRepoBlock` for repo links
7. Remove `project-repo` variant handling from `LinksBlock`
8. Extend validation script
9. Test all categories in both languages and themes

## Open Questions

None - all technical decisions are resolved.