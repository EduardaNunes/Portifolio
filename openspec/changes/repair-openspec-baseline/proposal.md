# Proposal

## Why

Four changes are fully implemented but cannot be archived: `openspec validate --all` reports `22 passed, 2 failed` and exits non-zero. Two of those changes carry malformed deltas, and two carry content that contradicts the main specs. Because they stay in flight, the baseline keeps drifting: main specs still describe removed deploy buttons, the scroller spec contradicts the page-flow spec, and `page-content-alignment` specifies a feature that was never built.

## What Changes

- Repair the delta files of the four in-flight changes so `openspec archive` can consume them:
  - `project-marker-zero-pages-deploy-buttons-programada`: move requirements out of the ignored `## Requirements` section into `## MODIFIED Requirements`, and retarget the deltas to the real capability paths (`deploy-button/positioning`, `programada/deploy-labels`, `project-marker/zero-pages`, `narrative-right-sections`).
  - `deploy-button-refactor`: correct the two mistyped capability paths and copy the omitted scenarios into the `MODIFIED` blocks the archiver refuses to shrink.
  - `fix-video-autoplay-and-reorganize-components`: drop its redundant `project-multi-video-demo` delta, whose `MODIFIED` header names a scenario instead of a requirement.
  - `modularize-block-renderer-components`: remove the `blocks/` directory requirement from `notebook-block-components` so it stops contradicting `notebook-component-structure` and the actual code layout.
- **BREAKING (spec-level)**: remove the `page-content-alignment` capability, specified but never implemented.
- Reconcile two stale passages in the main specs that newer capabilities already supersede.
- Archive the repaired changes plus this one in dependency order so `openspec validate --all` is green at the end.

## Capabilities

### New Capabilities

<!-- None: this change only repairs and retires existing capabilities. -->

### Modified Capabilities

- `page-content-alignment`: REMOVE the capability. It specifies a `contentAlign` layout property that no page declares and no component implements.
- `notebook-leaf-text-presentation`: MODIFY `Unified action buttons` to drop the deploy-button scenario; deploy buttons no longer exist.
- `narrative-notebook-scroller`: MODIFY `Mouse wheel moves one section per gesture` to drop the internal leaf scrolling behavior, which `notebook-page-flow` forbids.

## Impact

- `openspec/changes/deploy-button-refactor/specs/**`
- `openspec/changes/fix-video-autoplay-and-reorganize-components/specs/**`
- `openspec/changes/modularize-block-renderer-components/specs/**`
- `openspec/changes/project-marker-zero-pages-deploy-buttons-programada/specs/**`
- `openspec/specs/page-content-alignment/` (retired)
- `openspec/specs/notebook-leaf-text-presentation/spec.md`
- `openspec/specs/narrative-notebook-scroller/spec.md`

No application code changes. No runtime behavior changes.
