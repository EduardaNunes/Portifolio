# Design

## Context

See `proposal.md` for motivation and the two delta specs for the behavior contract. Today, `layout.js` can mark a narrative side as `title: 'marker'` or `title: 'section'`, while unmarked continuation sides receive a smaller `runningHead`. `buildNotebookPages.js` resolves those modes and suppresses a section's `subHeader` after it has been promoted. Consequently, populated narrative leaves do not consistently identify their marker and a component subtitle can receive title-scale presentation.

Narrative leaves are fixed and non-scrolling. The last change established verified page slices at the 484×885 viewport and the 504×680 desktop leaf; adding a title to every populated narrative leaf may require authored rebalancing of slices, never runtime measurement or scrolling.

The current repository also has validation blockers unrelated to title resolution: Portuguese About blocks carry empty optional `title` keys, PT/EN narrative section counts differ, and the Studies layout omits the content section represented by the active documents. These must be repaired first so the validator can again guarantee parity and layout coverage before title-fit work begins.

## Goals / Non-Goals

**Goals:**
- Give every populated narrative leaf exactly one `h2.page-title` containing its marker label.
- Keep every section `subHeader` in the existing medium `h3.page-label` presentation.
- Preserve deterministic layout slices, blank leaves, marker order, tab/navigation behavior, project-page titles, and localization.
- Retain fit at both verified viewport budgets by adjusting only explicit layout slices and existing spacing when necessary.

**Non-Goals:**
- Do not alter content JSON, marker registry order, translations, project-page heading behavior, page-turn animation, or the color palette.
- Do not add new copy keys, dynamic pagination, scrolling, or a new visual heading treatment.

## Decisions

### Restore validation prerequisites before title work

Remove empty optional title fields from the Portuguese About blocks, reconcile the locale documents to the same marker/section/block structure, and update the Studies layout to reference every declared Studies section exactly once.

**Rationale:** These are existing source/layout mismatches that prevent the build-time validator from proving the fixed-page title work safe. The repair is structural only: it neither rewrites localized prose nor changes marker order or project data.

### Use marker title as the sole narrative leaf heading mode

For a populated narrative side, the builder will pass `markerContent.label` as `NotebookLeaf`'s `title`, regardless of pair index, side, or section count. A blank (`null`) side remains unrendered and receives no title.

**Rationale:** This makes the user-facing hierarchy deterministic and removes the current difference between first pages, continuation pages, and one-section pages.

**Alternative considered:** Retain `runningHead` for continuation pages. Rejected because it directly produces the smaller marker label the request rejects.

### Remove section-title promotion from narrative layout

Narrative layout entries will no longer use `title: 'section'`; the builder will not remove a selected section's `subHeader`. The validator and README layout authoring documentation will reflect that narrative `title` metadata is no longer needed for selecting title type.

**Rationale:** The component's `subHeader` already has a semantic and visual home as `h3.page-label`; promotion is the source of the incorrect title hierarchy.

**Alternative considered:** Keep `title: 'section'` but override it at render time. Rejected because obsolete metadata would be misleading and allow invalid layouts to look accidentally correct.

### Rebalance only authored slices if the added titles exceed a fixed leaf budget

The implementation will inspect every PT/EN narrative leaf at 484×885 and 504×680. If the additional `h2` causes overflow, it will move whole components or bounded repeatable-item ranges to existing or additional authored page pairs, keeping every item exactly once and preserving reading order.

**Rationale:** The established notebook contract prohibits runtime measurement and scrolling; explicit layout remains the only pagination authority.

## Risks / Trade-offs

- [A title on every leaf reduces available content height] → Verify both locales at the narrowest target; add or rebalance deterministic slices rather than shrink text below the existing hierarchy or permit clipping.
- [Removing title modes can leave stale documentation/validator rules] → Update `layout.js` comments, validation rules, README authoring guidance, and resolver verification together.
- [Project leaves use titles for a different purpose] → Scope the uniform marker-title rule to narrative markers; preserve generated project pair behavior.

## Migration Plan

1. Simplify the narrative layout declaration and resolver so every non-null narrative side receives its marker label as `title`.
2. Remove the promoted-section/running-head branch and preserve section `subHeader` values.
3. Rebalance explicit narrative slices only if the new titles overflow either tested locale.
4. Run content validation, build, resolver tests, and viewport checks; rollback by restoring the previous layout and resolver behavior if verification fails.
