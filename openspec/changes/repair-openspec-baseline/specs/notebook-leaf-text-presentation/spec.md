# Spec Delta

## REMOVED Requirements

### Requirement: Unified action buttons

**Reason**: The requirement carried a `Deploy button retains absolute position with unified visual` scenario for a deploy button that no longer exists; deploy access moved to clickable thumbnails with hover feedback.

**Migration**: Deploy actions are performed by clicking the project thumbnail — see `thumbnail-clickable-deploy` and `thumbnail-deploy-hover`. The remaining action-button visual and layout rules are preserved unchanged by `Unified action button styling`.

## ADDED Requirements

### Requirement: Unified action button styling
All textual action controls in notebook leaves SHALL share a single visual style: uppercase, rectangular, 2px ink border, square corners, fixed minimum height, paper background, ink text, hover invert, focus-visible outline.

#### Scenario: Action button renders with unified style
- **WHEN** a `page-action` element (anchor or button) renders
- **THEN** it displays as inline-flex, centered, min-height 1.9rem, padding 0.25rem/0.6rem, 2px solid ink border, border-radius 0, paper background, uppercase text, letter-spacing 0.04em, ink color, no text-decoration

#### Scenario: Action button hover and focus states
- **WHEN** a `page-action` receives hover or focus-visible
- **THEN** hover inverts to ink background with paper text; focus-visible shows 2px outline in paper-text color

#### Scenario: Action group layout
- **WHEN** a `page-actions` container holds multiple `page-action` children
- **THEN** they display as flex-wrap row, justify-content flex-end, gap 0.5rem, margin-top 0.7rem
