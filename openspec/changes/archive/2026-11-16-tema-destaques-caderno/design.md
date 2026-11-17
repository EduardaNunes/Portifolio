# Design

## Context

The active theme is represented by `lightmode` on `body` and palette values defined as CSS custom properties in `src/styles/index.css`. Notebook leaves intentionally remain white in both themes and currently remap several global tokens locally; their emphasized text relies on fixed or inherited accent styling. See `proposal.md` for motivation.

## Goals / Non-Goals

**Goals:**
- Provide one semantic class for highlighted notebook text.
- Keep the class's color theme-driven through centralized custom properties.
- Apply the class only to content elements that the existing notebook view treats as highlighted.
- Preserve localization, notebook layout, page turns, and existing page-specific semantic styles.

**Non-Goals:**
- Redesigning the notebook, cover, tabs, links, or global typography.
- Changing theme persistence, theme-switch controls, or notebook content data.
- Adding a JavaScript component solely to select colors.

## Decisions

### Use a CSS class backed by a semantic theme token
Define a highlight token in the default (dark) theme with the approved orange value and override it in `.lightmode` with the approved blue value. Define `.notebook-leaf .destaque` to consume that token, so the visual behavior is declared once and responds automatically to the existing body class.

This avoids component state and duplicate inline style logic. A plain semantic class is preferred over a React wrapper because the behavior is presentation-only and can be applied to any suitable text element without adding render abstractions.

### Scope the highlight rule to notebook leaves
The reusable class will be styled in the notebook context to avoid unintentionally altering a same-named element outside the caderno. Theme tokens remain globally available, while the presentation rule preserves the white-paper constraints of the leaf.

### Apply the class to intended emphasis points in page components
Replace current repeated emphasis choices in notebook page JSX with `destaque` alongside each element's existing structural class. Existing structural classes continue to own layout, typography, and non-highlight semantic color rules; `destaque` owns only the shared highlighted color.

## Risks / Trade-offs

- [A notebook-local token could be overridden by leaf token remapping] → Define the highlight token explicitly at the theme level and avoid resetting it on `.notebook-leaf`.
- [The selected blue or orange may have insufficient contrast against white paper] → Reuse the established palette values and verify the rendered notebook in both themes.
- [Future maintainers may apply the class outside a leaf] → Keep the semantic class documented in the CSS near notebook typography and scope its styling to leaf content.

## Migration Plan

1. Add the theme token and the notebook highlight class.
2. Mark existing notebook emphasis elements with the shared class.
3. Build and manually verify an open notebook in both modes, including toggling the theme while a page is displayed.
4. Roll back by removing the class usage and token/rule additions; no data migration or compatibility action is required.
