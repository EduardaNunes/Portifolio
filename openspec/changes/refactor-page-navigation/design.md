# Design

## Context

The current notebook builds a variable spread list from five left-side sections and a category filter inside Projetos. See `proposal.md` for the motivation. The revised model replaces separate section/category lists with one editable marker registry that owns both tab metadata and its page-pair content.

## Goals / Non-Goals

**Goals:**
- Use one ordered marker registry as the source of truth for marker order, side, labels, and page pairs.
- Preserve the default order: Sobre Mim → Carreira → Estudos → Projetos → IA e Automações → Jogos → WebDev → BackEnd → Contato.
- Support the current 5-left / 4-right layout while allowing a future marker to change sides or be added/removed through its configuration.
- Flatten page pairs for global arrow navigation while preserving the ownership and relative order of every pair.
- Keep project-oriented pair layout consistent: text on the left, image/demo on the right.
- Derive dual active state from the current pair's marker: Projetos + the current right-side marker.

**Non-Goals:**
- Changing page-turn animation, notebook dimensions, cover styling, or theme palettes.
- Adding external dependencies.
- Introducing arbitrary page-level tab positions; side is a marker-level setting.

## Decisions

### 1. Ordered marker registry is the single source of truth
**Decision:** Define one array of marker descriptors in configuration/data. Each descriptor contains an `id`, localized label, `side`, visual metadata, and an ordered `pagePairs` collection.

Illustrative shape:
```js
{
  id: 'ai-automation',
  label: 'IA e Automações',
  side: 'right',
  icon: 'ai',
  accent: '#3f8f92',
  pagePairs: [
    { id: 'ai-project-a', left: /* text */, right: /* image/demo */ },
    { id: 'ai-project-b', left: /* text */, right: /* image/demo */ },
  ],
}
```

**Rationale:** One collection eliminates duplicated ordering logic and makes the marker count, tab side, and number of pairs editable without structural navigation changes.

**Alternative:** Maintain distinct left/right arrays plus a third navigation array. Rejected because the lists can diverge and require synchronization.

### 2. Side filters rendering only
**Decision:** Render left and right tab groups by filtering the ordered registry by `side`; do not reorder either group independently.

**Rationale:** `side` changes placement only. Keeping the original registry order preserves the required global reading order and makes future side changes declarative.

### 3. Flatten page pairs for navigation, retain marker identity
**Decision:** Build a derived global `spreads` list by flattening every marker's `pagePairs` in registry order. Each derived item carries its owning `markerId` and pair ID.

**Rationale:** Existing page-turn logic can continue to navigate a single numerical list, while marker ownership remains available for active tabs and direct navigation.

**Alternative:** Store separate marker and pair indices. Rejected because boundary transitions and direct tab navigation would add unnecessary state synchronization.

### 4. Tab navigation targets first page pair
**Decision:** A tab click resolves the first flattened pair owned by that marker. The arrow controls always operate on the currently flattened pair index.

**Rationale:** It offers predictable direct navigation while allowing an arbitrary number of page pairs per marker.

### 5. Derive, do not store, active tabs
**Decision:** Derive the active marker from the current pair. If it has `side: right`, mark its tab and Projetos as active; otherwise mark only the owning marker's tab active.

**Rationale:** Avoids separate left/right active state that could become inconsistent during page-turn animation or configuration changes.

### 6. Project pair presentation remains consistent
**Decision:** Reuse the existing project text/image presentation for every project-oriented pair: description/metadata on the left, image/demo/deploy link on the right.

**Rationale:** This is the confirmed orientation for Project A, Project B, and any later project pairs.

## Risks / Trade-offs

| Risk | Mitigation |
| --- | --- |
| A marker has no page pairs | Validate/configure at least one pair per marker; safely reconcile navigation after data changes. |
| A marker is added with an unsupported side | Limit `side` to `left` or `right`; use a known fallback or development warning. |
| Pair count changes while viewing the notebook | Clamp/reconcile the global current index and derive active state from the resulting pair. |
| Large numbers of tabs or page pairs | Preserve responsive tab behavior; global navigation remains linear and requires no new UI control. |
| A domain has no project yet | Provide a valid overview or empty project pair so every marker still owns at least one pair. |

## Migration Plan

1. Define the marker registry and localized/project page-pair data, including one or more pairs per marker.
2. Refactor page generation to flatten marker pairs and retain `markerId` with each derived spread.
3. Render side-specific tab groups from marker metadata and remove category-filter behavior.
4. Derive active tab states and direct tab targets from the current/first owned pair.
5. Verify sequential navigation across marker boundaries and within multi-pair markers, including the 5-left / 4-right default configuration.
6. Build the application and verify theme, localization, reduced-motion, and keyboard behavior.

## Open Questions

None. The project-pair orientation is confirmed as text left and image/demo right.