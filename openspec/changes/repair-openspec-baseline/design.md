# Design

## Context

See `proposal.md` — Why. The relevant constraint is that four changes were authored weeks apart and their deltas drifted away from the main specs:

- `modularize-block-renderer-components` (earlier) introduced a `blocks/` directory contract.
- `fix-video-autoplay-and-reorganize-components` (later) moved every component into a folder-per-component layout and added `notebook-component-structure`, which forbids `blocks/`.
- `deploy-button-refactor` and `project-marker-zero-pages-deploy-buttons-programada` both touch `deploy-button/positioning`, `programada/deploy-labels` and `project-marker/zero-pages`, but address them with flat folder names that the archiver cannot resolve.
- Both `fix-video` and `deploy-button-refactor` modify `thumbnail-stepped-border` and `project-multi-video-demo`, so the later delta must be reconciled against the spec left behind by the earlier archive.

`openspec validate --all` currently reports `22 passed, 2 failed (24 items)`.

## Goals / Non-Goals

**Goals**

- Every in-flight change validates and archives without losing scenarios.
- The resulting main specs are internally consistent: one owner per concern, no contradictory requirements.
- The archive sequence is reproducible and ends with a green `openspec validate --all`.

**Non-Goals**

- Changing runtime behavior or application code.
- Redesigning capabilities that are already coherent.
- Renaming or reorganizing capabilities beyond the path corrections needed to archive.

## Decisions

**Decision: repair deltas in place instead of rewriting the changes.**
The implementation work described by the four changes is already committed. Rewriting them would discard an accurate record of what was built. Only the delta files are edited.

**Decision: `## Requirements` becomes `## MODIFIED Requirements`, with the capability folders retargeted.**
The `project-marker…` deltas describe requirements that already exist in the main specs. `MODIFIED` is the operation that matches that intent; `ADDED` would duplicate requirements and `REMOVED` would delete them. The flat folder names (`deploy-button-positioning`, `programada-deploy-labels`, `project-marker-zero-pages`) are renamed to the nested paths the main specs actually use, because capability identity is the folder path.
*Alternative rejected:* adding new flat capabilities — it would create near-duplicate specs for requirements that already have an owner.

**Decision: keep `notebook-block-components`, but strip its directory contract.**
Block behavior (chips, checklists, social links, demo fallbacks) is only specified there. Deleting the capability would lose that contract. The folder layout is owned by `notebook-component-structure`, so `notebook-block-components` keeps behavior and drops paths.
*Alternative rejected:* deleting the capability — it would silently un-specify eight block components.

**Decision: drop the redundant `project-multi-video-demo` delta from `fix-video…`.**
Its `MODIFIED` header names a scenario (`Video demo plays as GIF-like animation`), not a requirement. The behavior it asserts (autoplay, loop, muted, no controls) is already normative in `project-multi-video-demo` → `Video demo entries infer video type from file extension`. Keeping a corrected copy would add a third owner for the same rule.
*Alternative rejected:* retargeting it to the real requirement — it would duplicate scenarios that already exist.

**Decision: retire `page-content-alignment`.**
Confirmed with the user. `contentAlign` appears nowhere outside the spec file. Removing it keeps the baseline honest; a future attempt should reintroduce the capability together with the implementation.

**Decision: resolve the scroll conflict in favor of `notebook-page-flow`.**
`notebook-page-flow` is newer and matches the shipped behavior (leaves are fixed pages). `narrative-notebook-scroller` therefore loses the sentence and scenario that let a leaf absorb the wheel, instead of `notebook-page-flow` being weakened.

**Decision: archive last-in, first-out.**
`modularize` → `fix-video` → `project-marker` → `deploy-button-refactor` → this change. `deploy-button-refactor` goes last because it *removes* `deploy-button/positioning`, which `project-marker` still modifies. This change goes last because it edits main specs that the others touch.

## Risks / Trade-offs

- **Archiving rewrites main specs and is hard to undo** → run `openspec validate <change> --type change` before each archive and `git diff openspec/specs` after each one; the working tree is a clean git checkout, so a bad archive is revertible.
- **`deploy-button-refactor`'s `thumbnail-stepped-border` delta is repaired against a spec that `fix-video` changes first** → fix that delta only after `fix-video` is archived, and re-read the main spec from disk before copying scenarios.
- **`project-marker` deltas may not be word-for-word identical to the main specs** → for each requirement, copy the current main-spec block and re-apply only the intended change; do not retype from memory.
- **Retiring `page-content-alignment` may leave an empty spec directory** → check after archive and delete the directory, then re-validate.
- **`npm run build` runs content validation** → it must still pass at the end, proving no application content was disturbed.

## Migration Plan

1. Repair `modularize`, `fix-video`, `project-marker` and the capability paths of `deploy-button-refactor`.
2. Archive `modularize`, then `fix-video`.
3. Reconcile and archive `project-marker`.
4. Reconcile `deploy-button-refactor`'s `thumbnail-stepped-border` delta against the fresh main spec and archive it.
5. Archive this change, remove any leftover `page-content-alignment` directory, then re-run `openspec validate --all`.

Rollback: `git checkout -- openspec/` restores the pre-archive tree.
