# Design

## Context

See `proposal.md` — Why.

- `buildNotebookPages.js` assembles spreads from layout config, content and labels. Its public surface is `buildNotebookPages`; `getPageSectionCounts` is exported but unused, and `overviewPair` is private and unused.
- Deploy entries are built inline inside the per-project mapping: one branch for `videoDemos`, one for a legacy single `deployLink`, one for legacy images without a link. The three branches produce the same `{ deployLink, deployHoverText }` shape with the same two label fallbacks.
- `NarrativeNotebook.jsx` identifies markers by string literal. `shouldSkipProjects()` returns `false` with no current marker and otherwise `isProjectsMarker(currentMarker) && true`. It is called from `goToSpread`, which is declared above it.
- Slicing rules, page counts and marker semantics are owned by `notebook-page-flow`, `narrative-right-sections` and `project-marker/zero-pages`. This change must not alter them.

## Goals / Non-Goals

**Goals**

- Remove code that nothing calls.
- Give the deploy-entry shape and its label fallbacks exactly one definition.
- Make the "projects marker is skipped in navigation" rule readable, and remove the read-before-declaration ordering hazard.
- Bring the README back in line with the shipped interaction.

**Non-Goals**

- Splitting `buildNotebookPages.js` into modules. That is a larger restructuring with its own risk profile; the file keeps its responsibility as the page-assembly entry point.
- Changing pagination, slicing, marker visibility or navigation results.
- Touching `content/` data or `validateContent.js`.

## Decisions

**Decision: extract a `deployEntry` helper instead of a lookup table.**
The four call sites differ only in which demo/legacy object they read and which label they fall back to, so a `(demo, labels) => ({ deployLink, deployHoverText } | null)` helper removes the duplication without introducing indirection that is harder to read than the current branch.
*Alternative rejected:* moving deploy-link resolution into `ProjectDemoBlock` — it would change the component's contract and belongs to a different change.

**Decision: name the marker ids as module constants, keep the predicate local.**
`PROJECTS_MARKER_ID = 'projects'` and `AI_AUTOMATION_MARKER_ID = 'ai-automation'` make the coupling between the navigation code and `layout.js` visible in one place. The predicate becomes `navigatingFromProjectsMarker()` defined above `goToSpread`, so the dependency order matches the reading order.
*Alternative rejected:* a registry-driven marker config — `narrative-right-sections` already owns marker configuration, and duplicating that structure here would create a second source of truth.

**Decision: preserve the exact deploy label fallback chain.**
`buttonLabel ?? viewDeploy ?? deploy ?? 'Deploy'` and `previewOnly ?? 'Apenas Visualização :)'` are current behavior, including the literal Portuguese fallback. The helper reproduces the chain verbatim; consolidating it is not an invitation to re-translate strings.

**Decision: do not delete the skip branch.**
The `while` loop that skips the projects marker is live behavior once the predicate is read correctly. Only the always-true expression is removed, replaced by a boolean that states the rule.

## Risks / Trade-offs

- **A "pure refactor" that quietly changes navigation** → compare spread ids and marker order before/after by logging `spreads.map(s => s.markerId)` in a scratch run, and manually navigate every marker in both directions.
- **Reordering deploy entries** → the helper must be called in the same order and pushed into the same array; verify that the ProgramADA project still shows two thumbnails in the original order.
- **Label fallback collapse changing displayed text** → assert the four fallback cases still produce the same strings for pt and en locale data.
- **README edits drifting into a rewrite** → update only the paragraphs that describe deploy buttons and the component layout; leave the pagination and asset sections alone.

## Migration Plan

1. Remove the two dead functions and re-run the test suite.
2. Extract the deploy helper and verify the rendered demo leaf.
3. Replace the marker literals and the predicate; verify navigation in both directions.
4. Update the README.
5. Run `npm run build` and `npm test`.

Rollback: `git checkout -- src/utils/buildNotebookPages.js src/components/narrative-notebook-component/NarrativeNotebook.jsx README.md`.
