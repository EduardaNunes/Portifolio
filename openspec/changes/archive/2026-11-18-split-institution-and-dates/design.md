# Design

## Context

The position-meta container in the notebook layout displays the company/institution name and dates on the same line. The current implementation does not properly constrain the widths, causing long institution names like "Universidade Federal de Juiz de Fora - UFJF" to overflow and overlap with the dates.

## Goals / Non-Goals

**Goals:**
- Allocate 65% width to the company name (`.position-company`) and 35% width to the dates (`.position-dates`)
- Ensure text wrapping occurs when content exceeds the allocated width
- Maintain proper visual separation between institution name and dates

**Non-Goals:**
- Changing the HTML structure or content data
- Modifying the position title or description styles
- Implementing responsive behavior beyond the 65/35 split and narrow screen stacking

## Decisions

### Decision 1: Flex width allocation for position-meta

The `.position-meta` flex container SHALL use explicit width percentages on its children rather than relying on `flex-grow` or content-based sizing.

- **Rationale**: Using `width: 65%` and `width: 35%` directly controls the separation between company name and dates, preventing overflow edge cases
- **Alternative considered**: Using `flex-basis` with `flex-grow` - rejected because it does not provide guaranteed fixed proportions and can behave unpredictably with wrapping content

### Note on Vertical Padding:
- The `.position-meta` container now uses `padding: 0` instead of `padding: 0.3rem 0` to eliminate white spaces at the top of dates and bottom of institution name, as reported in issue description

### Decision 2: Overflow wrapping for company name

The `.position-company` SHALL include `overflow-wrap: anywhere` (already present in the current CSS) combined with `min-width: 0` to enable shrinkage and wrapping.

- **Rationale**: `min-width: 0` is required in flex layouts to allow child elements to shrink below their content size, and `overflow-wrap: anywhere` allows breaking at any character boundary
- **Alternative considered**: Using `word-wrap: break-word` - rejected as it's an older non-standard property; `overflow-wrap: anywhere` is the modern standard

### Decision 3: Dates right-alignment on wide screens

The `.position-dates` SHALL have `margin-left: auto` to push it to the right side of the 65/35 split container, ensuring it appears on the right side of the institution name.

- **Rationale**: `margin-left: auto` in a flex container utilizes the available space to push the element to the end, creating the visual separation
- **Alternative considered**: Using `width: 20%` with `text-align: right` - rejected because `margin-left: auto` provides more consistent behavior across different content lengths

### Decision 4: Narrow screen stacking

When the screen width is 600px or less, the `.position-company` and `.position-dates` SHALL each take 100% width and stack vertically.

- **Rationale**: Full-width stacking on mobile devices ensures readability without horizontal scrolling or truncation
- **Alternative considered**: Using `flex-direction: column` on the parent - this would affect all screens; instead, a media query targetting narrow screens provides more granular control
- **Note**: Vertical stacking now occurs without bottom margin gap (`margin-bottom: 0`), ensuring consistent horizontal alignment when stacked

## Risks / Trade-offs

- [Risk] If the institution name is extremely long, it may still overflow on very narrow devices even with wrapping
  - [Mitigation] The `overflow-wrap: anywhere` and `min-width: 0` should handle most cases; extreme cases may require truncation with ellipsis

- [Risk] The 65/35 split may not look balanced on all screen sizes
  - [Mitigation] The narrow screen media query (<=600px) stacks the elements vertically for better mobile readability

- [Risk] Changing CSS may affect other components using `.position-company` or `.position-dates` classes
  - [Mitigation] The styles are scoped to `.notebook-leaf` class, limiting the impact to the notebook layout only

## Migration Plan

No migration required - this is a visual layout change. Existing content will automatically reflow according to the new width constraints. The changes are backward-compatible: on screens wider than 600px, the 65/35 split applies; on narrower screens, elements stack vertically.

## Open Questions

None. All design decisions have been resolved.