# Spec Delta

## Purpose

Extends the animated cloud background from the header section to cover the entire document height, so clouds appear behind both the header and the notebook section.

## ADDED Requirements

### Requirement: Cloud background covers full document height

The system SHALL render the cloud background layer at full document height so that clouds are visible behind all document sections including the header and notebook.

#### Scenario: Clouds visible in header section

- **WHEN** the page loads with only the header section visible
- **THEN** clouds span the full viewport height and are visible behind the hero section

#### Scenario: Clouds visible behind notebook section

- **WHEN** the user scrolls or the notebook section is revealed
- **THEN** clouds continue behind the notebook, maintaining visual continuity

#### Scenario: Cloud animation works across extended height

- **WHEN** the cloud animation runs across the full document height
- **THEN** clouds animate smoothly without clipping or visual artifacts at the boundary between header and notebook