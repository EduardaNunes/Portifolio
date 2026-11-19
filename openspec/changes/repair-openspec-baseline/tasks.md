# Tasks

## 1. Repair `modularize-block-renderer-components`

- [ ] 1.1 In `openspec/changes/modularize-block-renderer-components/specs/notebook-block-components/spec.md`, rewrite `Block components are independently importable` and `LinkIcon is a shared utility component` to reference `src/components/notebook-content/<Component>/<Component>.jsx` instead of the `blocks/` directory; verify with `Select-String -Path openspec/changes/modularize-block-renderer-components/specs -Pattern 'blocks/' -Recurse` returning no matches and `openspec validate modularize-block-renderer-components --type change` exiting 0.
- [ ] 1.2 Confirm no block behavior contract was lost: the delta still contains requirements for Blocks, Text, Positions, Email, Links, List, ProjectDemo, ProjectRepo and the `BlockRenderer` registry; verify with `Select-String -Path openspec/changes/modularize-block-renderer-components/specs/notebook-block-components/spec.md -Pattern '^### Requirement:'` listing the same requirement count as before the edit.

## 2. Repair `fix-video-autoplay-and-reorganize-components`

- [ ] 2.1 Delete `openspec/changes/fix-video-autoplay-and-reorganize-components/specs/project-multi-video-demo/` (its `MODIFIED` header names a scenario, and the autoplay rule is already normative in the main spec); verify the directory no longer exists and `openspec validate fix-video-autoplay-and-reorganize-components --type change` exits 0.
- [ ] 2.2 Confirm the change still carries its two remaining deltas — `notebook-component-structure` and `thumbnail-stepped-border`; verify both files are listed by `Get-ChildItem -Recurse openspec/changes/fix-video-autoplay-and-reorganize-components/specs -File`.

## 3. Repair `project-marker-zero-pages-deploy-buttons-programada`

- [ ] 3.1 Retarget the capability folders: `specs/deploy-button-positioning` → `specs/deploy-button/positioning`, `specs/programada-deploy-labels` → `specs/programada/deploy-labels`, `specs/project-marker-zero-pages` → `specs/project-marker/zero-pages`; leave `specs/narrative-right-sections` in place. Verify each new path exists and the old flat folders are gone.
- [ ] 3.2 Replace every `## Requirements` header with `## MODIFIED Requirements`, and for each requirement copy the current block verbatim from `openspec/specs/<capability>/spec.md` before applying the intended change; verify no requirement header text differs from the main spec by comparing the `### Requirement:` lines in both files.
- [ ] 3.3 Verify `openspec validate project-marker-zero-pages-deploy-buttons-programada --type change` exits 0 with no "is under `## Requirements`, which is not a delta section" and no "No delta sections found" errors.

## 4. Repair `deploy-button-refactor` capability paths

- [ ] 4.1 Move `openspec/changes/deploy-button-refactor/specs/programada-deploy-labels` to `specs/programada/deploy-labels`; verify the new path exists and the old one is gone.
- [ ] 4.2 Move `openspec/changes/deploy-button-refactor/specs/deploy-button-positioning` to `specs/deploy-button/positioning`; verify the new path exists and the old one is gone.
- [ ] 4.3 Verify `openspec validate deploy-button-refactor --type change` no longer reports "target spec does not exist; only ADDED requirements are allowed for new specs".

## 5. Archive the earlier changes in dependency order

- [ ] 5.1 Run `openspec archive modularize-block-renderer-components -y`, then verify `openspec list` no longer shows it and that `git diff --stat openspec/specs` reports only the expected additions.
- [ ] 5.2 Run `openspec archive fix-video-autoplay-and-reorganize-components -y`, then verify `openspec/specs/notebook-component-structure/spec.md` exists with a `## Purpose` section and `openspec validate --all` reports more passing items than before.
- [ ] 5.3 Run `openspec archive project-marker-zero-pages-deploy-buttons-programada -y`, then verify the four affected main specs (`deploy-button/positioning`, `programada/deploy-labels`, `project-marker/zero-pages`, `narrative-right-sections`) still contain their original scenarios.

## 6. Reconcile and archive `deploy-button-refactor`

- [ ] 6.1 Re-read `openspec/specs/thumbnail-stepped-border/spec.md` from disk after task 5.2, then update both `MODIFIED` blocks in `openspec/changes/deploy-button-refactor/specs/thumbnail-stepped-border/spec.md` so every currently listed scenario appears alongside the new hover scenarios; verify `openspec validate deploy-button-refactor --type change` no longer reports "omits scenario(s) the current spec still has" for this file.
- [ ] 6.2 Update the three `MODIFIED` blocks in `specs/project-multi-video-demo/spec.md` to include every scenario currently in `openspec/specs/project-multi-video-demo/spec.md`, and replace the "rendered immediately below its video" deploy-button wording with thumbnail click/hover wording consistent with `thumbnail-clickable-deploy` and `thumbnail-deploy-hover`; verify the validation error about omitted scenarios for this file disappears.
- [ ] 6.3 Verify `openspec validate deploy-button-refactor --type change` exits 0.
- [ ] 6.4 Run `openspec archive deploy-button-refactor -y`, then verify `openspec/specs/deploy-button/positioning` is gone and both `openspec/specs/thumbnail-deploy-hover/spec.md` and `openspec/specs/thumbnail-clickable-deploy/spec.md` exist.

## 7. Confirm this change's deltas against the post-archive specs

- [ ] 7.1 Re-read `openspec/specs/notebook-leaf-text-presentation/spec.md` and `openspec/specs/narrative-notebook-scroller/spec.md`, and adjust the `MODIFIED` blocks in this change only if an earlier archive changed the requirement text; verify `openspec validate repair-openspec-baseline --type change` exits 0.
- [ ] 7.2 Verify the `REMOVED Requirements` delta still names both `page-content-alignment` requirements exactly as they appear in `openspec/specs/page-content-alignment/spec.md`.

## 8. Archive this change and verify the whole baseline

- [ ] 8.1 Run `openspec archive repair-openspec-baseline -y`; verify it reports success and that `openspec/specs/narrative-notebook-scroller/spec.md` no longer contains "Long leaf keeps the wheel".
- [ ] 8.2 Delete `openspec/specs/page-content-alignment/` if the archive left it behind with no requirements, then verify `openspec list --specs` no longer lists it.
- [ ] 8.3 Verify `openspec validate --all` exits 0 with `0 failed`.
- [ ] 8.4 Verify `openspec list` shows no in-flight changes, and that `npm run build` and `npm test` still pass (no application code was touched).
