# Spec Delta

## REMOVED Requirements

### Requirement: Width Split for Position Meta

**Reason**: The requirement mandated an 80% / 20% split on `.position-meta`, `.position-company` and `.position-dates` — class names that the modularized renderer no longer emits. The shipped implementation is `PositionsBlock.module.css` with `.positionCompany` / `.positionDates` at 65% / 35%, because a date range does not fit in 20% of a leaf half-width.

**Migration**: The behavior is preserved by `Position meta width split`, which names the module-scoped classes and the shipped 65/35 ratio. No code change is required.

### Requirement: Text Wrapping for Long Institution Names

**Reason**: The requirement describes `.position-company`, a selector that no longer exists; the wrapping rule now lives on `.positionCompany` in `PositionsBlock.module.css`.

**Migration**: Replaced by `Position meta text wrapping`, which keeps the `overflow-wrap: anywhere` behavior on the module-scoped class.

### Requirement: Dates Maintain 20% Width Constraint

**Reason**: The requirement pins the dates column to 20% of the container, which contradicts the shipped 35% allocation and is too narrow for a full date range.

**Migration**: Replaced by `Position meta width split` and `Position meta text wrapping`, which keep the dates column bounded and wrapping at the shipped ratio.

## ADDED Requirements

### Requirement: Position meta width split
The position metadata row SHALL place the institution name and the date range on one line, allocating 65% of the row to the institution name and 35% to the dates, using the module-scoped classes `positionCompany` and `positionDates`.

#### Scenario: Sixty-five/thirty-five width split on wide screens
- **WHEN** the viewport is wider than 600px
- **THEN** the institution name occupies 65% of the row and the date range occupies 35%, displayed on the same line

#### Scenario: Full-width stacking on narrow screens
- **WHEN** the viewport is 600px or narrower
- **THEN** the institution name and the date range each take the full row width, stacked vertically with the institution name first

### Requirement: Position meta text wrapping
The institution name and the date range SHALL each use `overflow-wrap: anywhere` so that long content wraps to a new line instead of overflowing its column or colliding with the other column.

#### Scenario: Long institution name wraps properly
- **WHEN** the institution name exceeds its allocated column
- **THEN** the text wraps to the next line without overflowing or overlapping the date range

#### Scenario: Dates wrap when too long for their column
- **WHEN** the date range cannot fit in its allocated column
- **THEN** the dates wrap within their own column and remain visually separated from the institution name
