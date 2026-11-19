# Spec Delta

## REMOVED Requirements

### Requirement: Mouse wheel moves one section per gesture

**Reason**: The requirement allowed a notebook leaf to absorb the wheel and scroll internally. `notebook-page-flow` forbids that: notebook leaves are fixed pages, and wheel input must never change a leaf's visible content.

**Migration**: Wheel behavior is now defined by `Wheel gestures move exactly one section`. A leaf never scrolls; overflow content is paginated instead.

## ADDED Requirements

### Requirement: Wheel gestures move exactly one section
When the document is unlocked, a mouse-wheel gesture MUST move to the next or previous section using the same smooth movement as start. A gesture moves exactly one section, and a leaf never absorbs the wheel.

#### Scenario: Wheel down advances one section
- **WHEN** the user performs a downward wheel gesture on the header or on a leaf already at its bottom edge
- **THEN** the document moves to the next section exactly once

#### Scenario: Wheel up returns one section
- **WHEN** the user performs an upward wheel gesture on the notebook section or on a leaf already at its top edge
- **THEN** the document moves to the previous section exactly once

#### Scenario: Wheel over a leaf never scrolls the leaf
- **WHEN** the pointer is over a notebook leaf and the user performs a wheel gesture
- **THEN** the leaf produces no internal scroll offset and the document moves to the next or previous section exactly once

#### Scenario: Wheel is inert before Play
- **WHEN** the document is still locked and the user performs a wheel gesture
- **THEN** neither the document nor the notebook moves
