# Proposal

## Why

The two files that orchestrate the notebook have accumulated leftovers from the deploy-button and zero-pages refactors:

- `src/utils/buildNotebookPages.js` still exports `getPageSectionCounts` and keeps a private `overviewPair`; nothing in `src/` calls either.
- The same deploy-entry construction is written four times inside one function, differing only in the fallback label, so a change to hover-text resolution must be applied four times or silently diverge.
- `NarrativeNotebook.jsx` hardcodes the marker ids `'projects'` and `'ai-automation'` in three places, and its `shouldSkipProjects()` helper ends with `&& /* projects has 0 pages when */ true` — an editing leftover that hides the real rule ("navigating from the projects marker skips it") behind an always-true expression. The helper is also referenced by `goToSpread` before its declaration.
- `README.md` still documents the pre-thumbnail deploy-button flow.

None of this changes what the site does, but each item makes the next navigation or deploy change harder than it needs to be.

## What Changes

- Delete `overviewPair` and `getPageSectionCounts` from `buildNotebookPages.js`.
- Extract the four duplicated deploy-entry constructions into one small helper, keeping the exact current fallback order (`buttonLabel` → `viewDeploy` → `deploy` → literal).
- Introduce named constants for the `projects` and `ai-automation` marker ids, replace the always-true `shouldSkipProjects()` with an explicit, documented predicate, and remove the read-before-declaration ordering problem.
- Update the README sections that describe the notebook structure and deploy interaction to match the current thumbnail-based flow.
- Explicitly **not** a spec change: every observable behavior stays identical.

## Capabilities

### New Capabilities

<!-- None: no new behavior. -->

### Modified Capabilities

<!-- None: this is a pure refactor, so the change declares skip_specs: true in .openspec.yaml. -->

## Impact

- `src/utils/buildNotebookPages.js`
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx`
- `README.md`

No behavior change, no API change, no dependency change.
