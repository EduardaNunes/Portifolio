# Design

## Context

See `proposal.md` — Why.

- Vite compiles `*.module.css` with CSS Modules, so every class selector is hashed. A selector that starts with a class which is not defined in the same file can never match, because the emitted hash never equals the literal `lightmode` class the app puts on the document root.
- `Thumbnail.module.css` already demonstrates the correct pattern: `:global(.lightmode) .clickableFrame.hasDeployLink:hover .hoverOverlay`.
- `src/styles/index.css` is a single global stylesheet. Because it is not a CSS Module, invalid declarations are dropped by the CSS parser without failing the build — a trailing `.` costs the declaration and can cost the next one.
- `npm run build` runs the content validation script, so it is a usable smoke check for structural mistakes, but it cannot detect dropped CSS declarations.

## Goals / Non-Goals

**Goals**

- Light theme produces light-theme accent colors on repository and deploy controls.
- Every declaration in `src/styles/index.css` parses and applies.
- The stylesheet and the CSS Modules stop exporting classes nothing references.
- The README palette matches the tokens the stylesheet actually defines.

**Non-Goals**

- Redesigning the palette or introducing new colors. Only existing tokens are used.
- Restructuring the global stylesheet into files. That is `refactor-notebook-orchestration` territory and would make this diff unreviewable.
- Touching component markup or JavaScript.

## Decisions

**Decision: use `:global(.lightmode)`, not a class passed through props.**
The theme is applied once on the document root by the theme toggle. Threading the theme into every component would add prop plumbing for a purely presentational concern. `:global()` targets the existing root class with a one-token change per selector.
*Alternative rejected:* moving the overrides into `src/styles/index.css` — it would re-mix component styling into the global sheet, which `notebook-component-structure` explicitly forbids.

**Decision: delete dead CSS rather than leave it.**
Unused selectors are not harmless: they make future edits appear to work while the change has no effect, and they inflate the bundle. Deletion is gated by a grep per class before removal.

**Decision: delete before fixing syntax, in separate commits/steps.**
Removing dead selectors first shrinks the surface and shifts line numbers; fixing the twelve typos afterwards means each remaining line is reachable and verifiable. Doing it in the other order would mean re-locating typos twice.

**Decision: correct typos individually, not with a bulk regex.**
A regex on `\.\s*$` cannot distinguish `value.` from a decimal point or from a selector fragment on the following line. Each of the twelve lines is inspected and fixed with the intended terminator.

**Decision: document the theme-response requirement in `site-color-palette`.**
The palette capability is the natural owner of "which color applies in which theme". Encoding the hover/theme-toggle behavior there makes the bug a spec violation rather than an undocumented preference, so a regression is caught by review against the spec.

## Risks / Trade-offs

- **Deleting a class that is composed dynamically** (for example via a template string or a `styles[...]` lookup) would break styling silently → grep for the class name in `src/` before deleting, including quoted fragments; build and visually check after each batch.
- **A "dead" class may be a styling hook used only by tests** → check `src/**/*.test.*` and any snapshot before removing.
- **Fixing a typo may reveal a rule that was never intended to apply** → prefer the terminator that matches the surrounding declaration style; if the value looks wrong once active, stop and treat it as a separate defect instead of guessing a new value.
- **Merging the two `600px` blocks may reorder specificity** → compare the two blocks first; if they disagree on a property for the same selector, keep the later declaration (it currently wins) and record the decision in the change.
- **Light-theme verification is visual** → toggle the theme with a project leaf open and compare repository/deploy control hover colors against `--paper-accent`.

## Migration Plan

1. Fix `:global(.lightmode)` in the two modules; verify by toggling the theme.
2. Remove dead module and global selectors, verifying each with a grep.
3. Fix the twelve declarations and consolidate the duplicated media query.
4. Align the README palette with the defined tokens.
5. Run `npm run build` and `npm test`, then visually check both themes at desktop and ≤600px widths.

Rollback: `git checkout -- src/styles src/components README.md`.
