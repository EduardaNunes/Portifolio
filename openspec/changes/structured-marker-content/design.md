# Design

## Context

See `proposal.md` for motivation. Today `src/data/profile.js` exposes a different shape per marker (`skills`, `softSkills`, `results`, `timeline`, `goals`, `education`, `courses`, `projects`, `contact`), `src/data/projects.js` is a separate flat list with a `categoryId`, and `src/utils/buildNotebookPages.js` hardcodes every slice and page pair. Six page components render those bespoke props.

The notebook already requires fixed, non-scrolling leaves, deterministic authored slices, continuation pairs, running heads, and PT/EN parity (`openspec/specs/notebook-page-flow/spec.md`). `NarrativeNotebook.jsx` consumes only `{ markers, spreads }`, where `spreads` is a flat ordered list of `{ id, markerId, left, right }`. That contract must stay intact so navigation, tabs, page turns, and reduced motion do not change.

There is no test framework in the project. Validation will be a small shared module plus a Node script wired into `npm run build`.

## Goals / Non-Goals

**Goals:**

- One content document per language with identical structure and stable marker/section ids.
- Seven typed blocks with explicit required and optional fields.
- Content free of presentation decisions; a separate layout module owns page pairs, sides, titles, and slices.
- A generic leaf/section/block renderer replacing the six per-marker page components.
- Fail-fast validation for locale parity, block fields, ids, project ownership, and layout coverage.
- Preserve the current rendered content, page count (17 spreads), CSS vocabulary, accessibility, and navigation behavior.

**Non-Goals:**

- Runtime height measurement, automatic pagination, or dynamic pair generation.
- A CMS, authoring UI, Markdown/rich text, or content editing outside the repository.
- Visual redesign, new colors/fonts, new CSS presentation classes, cover/tabs/page-turn changes, or navigation changes.
- Splitting a single project across multiple pairs in this change (the layout can gain that later without changing content).

## Decisions

### 1. Two JSON content documents, one per language

**Decision:** `src/content/pt.json` and `src/content/eng.json` hold the complete marker content. `src/content/index.js` imports both and selects one by language. JSON is data-only: no comments, functions, or imports.

**Rationale:** The editor sees the entire content of one language in one place, and locale parity can be checked structurally. JSON avoids accidental logic in content and works with any editor.

**Alternatives considered:** JavaScript modules (comments allowed, but executable content and import coupling); one file with `{ pt, eng }` per marker (harder to scan a full language); inline `{ pt, eng }` per string (verbose and error-prone).

### 2. Stable marker ids with a separate presentation registry

**Decision:** Top-level content keys are ids: `about`, `career`, `studies`, `projects`, `ai-automation`, `games`, `webdev`, `backend`, `contact`. Each marker provides a localized `label`. `src/content/markers.js` declares tab side, icon, accent, and navigation order:

```js
export const markerRegistry = [
  { id: 'about', side: 'left', icon: 'about', accent: '#3f8f92' },
  // ...
]
```

**Rationale:** Content keys must not change with language, and side/icon/accent/order are presentation. The registry remains the single marker-order source for tabs and the flattened sequence.

**Alternatives considered:** Localized labels as keys (breaks on translation changes); presentation fields inside each marker (duplicated and not editorial).

### 3. Sections and the typed block catalog

**Decision:** Each marker has ordered `sections`, and each section has a required unique `id`, an optional localized `subHeader`, and an ordered `content` array of blocks. The supported types and fields are:

| Type | Required | Optional | Current content mapped |
|---|---|---|---|
| `blocks` | `name`, `items: string[]` | — | About technical skills |
| `text` | `text` | `title`, `link: { label, url }` | About results/soft skills, current role, education descriptions |
| `positions` | `items: [{ position, company, fromDate }]` | per item `toDate`, `description` | Career timeline, education entries |
| `email` | `email` | — | Contact address |
| `links` | `items: [{ icon, name, link }]` | — | Contact LinkedIn/GitHub/email rows |
| `list` | `items: string[] \| [{ text, done? }]` | — | Career goals, Studies courses |
| `projectDemo` | — | `images: [{ src, alt?, caption?, video? }]`, `repoLink`, `deployLink` | Project right leaf |

An absent or empty `toDate` renders the localized current-position wording. `list` entries that are strings render bullets; entries that declare `done` render checklist items. `text.link` is all-or-nothing: a partial link fails validation, and an absent link renders no button.

**Rationale:** These seven types cover every existing content unit. Keeping `items` as the repeated field makes slicing uniform. Content stores natural case; CSS keeps `text-transform: uppercase`.

**Alternatives considered:** One generic `content` type with free-form arrays (no validation or renderer mapping); Markdown (needs a parser and loses the structured page vocabulary); a distinct `education` type (duplicates `positions`; degree is the position and institution is the company).

### 4. Generic renderer replaces per-marker pages

**Decision:** New components live under `src/components/notebook-content/`:

- `NotebookLeaf.jsx` — receives resolved `title`, `runningHead`, and `sections`; renders `h2.page-title` or `p.page-label`, then one `NotebookSection` per section.
- `NotebookSection.jsx` — renders the optional `h3.page-label` subheader and dispatches each block.
- `blockRenderers.jsx` — maps `type` to `BlocksBlock`, `TextBlock`, `PositionsBlock`, `EmailBlock`, `LinksBlock`, `ListBlock`, `ProjectDemoBlock`.

The blocks reuse the existing classes (`page-field`, `page-field-pair`, `page-note`, `page-list`, `page-list-item`, `page-marker`, `page-chip`, `page-action`, `page-actions`, `pixel-art-container`, `pixel-art-media-frame`). No visual variant fields exist in content; each block type owns its presentation.

**Rationale:** Adding content no longer needs a new page component. The renderer is the single place where content becomes DOM, which keeps classes and accessibility consistent.

**Alternatives considered:** Keeping per-marker pages and adapting props (the current duplication remains); a generic schema-driven renderer with class names in JSON (leaks presentation into content).

### 5. Layout module separate from content

**Decision:** `src/content/layout.js` declares narrative page pairs and slices. A page side is either `null` (blank paper) or:

```js
{
  title: 'marker' | 'section',       // optional
  sections: [
    { section: 'skills' },                       // whole section
    { section: 'results', components: [0, 2] },  // first two text cards
    { section: 'timeline', items: [1, 2] }       // second position only
  ]
}
```

- `section` is a section id from content.
- `components` slices the section's `content` array.
- `items` slices the only repeatable block in the section (`positions`, `list`, or `links`); validation rejects it if the section has zero or multiple repeatable blocks.
- Omitting both renders the whole section.
- `title: 'marker'` uses the marker `label`; `title: 'section'` promotes the first slice's `subHeader` and suppresses that label in the body.
- `null` side = blank leaf.

Example:

```js
about: {
  pages: [
    {
      left: { title: 'marker', sections: [{ section: 'skills' }] },
      right: { title: 'section', sections: [{ section: 'results', components: [0, 2] }] }
    },
    {
      left: { sections: [{ section: 'soft-skills' }] },
      right: { sections: [{ section: 'results', components: [2] }] }
    }
  ]
}
```

Running heads are derived: any non-blank side after the first page of that side gets the marker `label` as `p.page-label`. Section subheaders repeat automatically because slices re-render their section. This reproduces the current 17-spread output.

**Rationale:** The user asked for content to stay pure and pagination to live elsewhere. Explicit slices preserve the fixed-page contract and avoid splitting meaningful groups by item count. The layout is small (four narrative markers); project pairs are automatic.

**Alternatives considered:** Flat sections plus a page index config (indirect and harder to validate); automatic distribution by item count (height varies too much and could split groups); build-time measurement (complex, outside the established no-measurement constraint).

### 6. Resolution and coverage validation

**Decision:** `resolveNotebookLayout(content, layout, registry)` returns page pairs without mutating content. It resolves slices into cloned sections, computes `title` and `runningHead`, and produces the same `{ markers, spreads }` shape as today.

Before rendering, validation checks:

1. Locale parity: same marker ids, section ids, block types, and ordering; required fields present in both.
2. Block fields: known type; non-empty required fields; complete links; valid icons; valid project ids.
3. Layout references: every referenced marker/section/block index exists.
4. Layout coverage: every narrative section, component, and item is referenced exactly once. Project markers are covered by the generator instead.
5. Project ownership: every project belongs to one category marker and ids are unique across the document.

Errors include a path such as `pt.career.sections[1].content[0].items[2].toDate`. The same pure validator is used by `scripts/validate-content.mjs` and by the builder in development.

**Rationale:** Content and layout can drift independently; structural checks turn a silent missing page into a build failure. Coverage validation is what makes “content only in JSON” safe.

**Alternatives considered:** No validation (typos render as empty pages); runtime checks only (build can ship broken content); TypeScript (adds tooling and a migration not requested here).

### 7. Project markers are generated

**Decision:** Category marker content has `label` and an ordered `projects` array:

```json
{
  "label": "Jogos",
  "projects": [
    {
      "id": "programadas",
      "title": "ProgramADAs",
      "sections": [
        { "id": "description", "content": [{ "type": "text", "text": "..." }] },
        { "id": "tech", "content": [{ "type": "blocks", "name": "Tech Stack", "items": ["Unity", "C#"] }] }
      ],
      "demo": { "type": "projectDemo", "images": [{ "src": "/images/projects/programadas.svg", "alt": "..." }], "repoLink": "...", "deployLink": "..." }
    }
  ]
}
```

The generator creates one pair per project: left = project title + declared sections, right = demo. `repoLink` is owned by `demo` but shown as the source action on the left (preserving the current layout); `deployLink` is shown on the right. Missing links render no action. The `projects` marker itself gets a generated overview pair: title + category counts and category chips on the left, first available thumbnail on the right. Empty categories still receive a navigable placeholder pair.

**Rationale:** Projects share one uniform structure, so an explicit layout entry per project adds no value. Category ownership is expressed by nesting instead of a `categoryId` that could disagree with the marker key.

**Alternatives considered:** Explicit layout entries for every project (verbose, easy to forget); keeping `projects.js` (two content systems remain); a `project` block that renders both leaves (couples content to page sides).

### 8. UI copy lives in translations, content stays editorial

**Decision:** Move `labels.contact.message`, `labels.project.*`, and `labels.ui.*` into `src/data/translations.js` under a `notebook` object. Add localized `currentPosition` (`atual` / `present`) for empty `toDate`, and `projectCountSuffix` (`projeto(s)` / `project(s)`) for the generated overview. Remove the unused `navigationMarkers` and `projectCategories` maps.

**Rationale:** Button wording, navigation labels, and date connectors are UI copy, not marker content. Keeping them in translations avoids duplicating them per marker and keeps content focused on editorial text.

**Alternatives considered:** UI labels inside each content file (duplicated per marker); leaving labels in `profile.js` (the file is being retired).

### 9. App wiring and the `{ markers, spreads }` contract

**Decision:** `App.jsx` selects `content` from `src/content/index.js` and passes it with the registry and layout to `buildNotebookPages`. `NarrativeNotebook` keeps receiving `markers`, `spreads`, and the three UI labels. `buildNotebookPages` is the only module that knows about layout resolution and project generation.

**Rationale:** Keeps navigation, page turn, tabs, audio, and reduced motion untouched.

**Alternatives considered:** Passing content down to `NarrativeNotebook` and rendering inside it (couples navigation to content schema).

### 10. Migration and rollback

**Decision:** Build the new content files, registry, layout, validator, and renderers alongside the current implementation. Wire `App.jsx` only after validation passes. Verify visual and navigation parity in both locales at 484×885 and desktop. Then remove `profile.js`, `projects.js`, the six page components, and dead label maps. Each phase keeps the old files until its replacement is verified, so reverting one commit restores the previous content source.

**Rationale:** The change is broad but can be staged without a flag or dual runtime paths.

**Alternatives considered:** Big-bang replacement (harder to isolate visual regressions); a feature flag (unnecessary for a static portfolio).

## Risks / Trade-offs

| Risk | Mitigation |
|---|---|
| Content and layout drift after edits | Coverage validation fails the build; errors name the exact section/item; README documents the workflow |
| Manual narrative layout becomes stale when text grows | Explicit slices are one-line edits; verification runs PT/EN at 484×885 and desktop, the strictest geometry |
| Generic renderer loses bespoke styling | Reuse the existing `page-*` and `pixel-art-*` classes; verify every spread visually before deleting old components |
| JSON cannot hold comments | README schema examples and precise validator messages; content is self-descriptive |
| Locale parity check is too strict or too loose | Compare structure (ids, types, order) and required fields, not exact text; report path-aware errors |
| A project description overflows its pair | Verify every project in both locales; if needed, add an explicit project layout override later without changing content |
| New UI keys are only added in one language | Locale parity validation covers UI labels; visual PT/EN pass |
| Both locale JSON files increase bundle size | Small portfolio; static import keeps the change simple |
| Removing `profileData` breaks an unknown import | Grep imports, run build, and remove old files only after the new path is wired |

## Open Questions

None. The overview-count suffix and current-position label are resolved as translation keys in Decision 8; multi-image galleries are out of scope, and `projectDemo` renders the first image while accepting an array for future use.
