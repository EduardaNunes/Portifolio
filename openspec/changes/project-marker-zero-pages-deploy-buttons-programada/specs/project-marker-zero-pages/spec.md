# project-marker/zero-pages Specification

## Purpose

Defines the projects marker behavior where it contains 0 pages and skips directly to the next marker (Ia and automations) while maintaining the ability to stay active/selected when a right-side marker is active.

## Requirements

### Requirement: Projects marker with zero pages

The system SHALL render the `projects` marker with 0 page pairs, causing navigation to skip directly to the next marker in the sequence (Ia and automations).

#### Scenario: Skip to next marker when projects is current

- **WHEN** the current marker is `projects` with 0 pages
- **THEN** navigation proceeds directly to the next marker (Ia) without displaying any page pairs for projects

### Requirement: Maintain active/selected state with right markers

The system SHALL allow the `projects` marker to remain active/selected simultaneously with a right-side marker being active/selected.

#### Scenario: Projects active alongside right marker

- **WHEN** a right-side marker's page pair is current and `projects` marker is also active
- **THEN** the `projects` left-side tab and the current right-side tab SHALL be active and expanded simultaneously

### Requirement: Global navigation order preservation

The system SHALL preserve the global navigation order, skipping projects pages and proceeding to the next marker's first page pair.

#### Scenario: Navigation order after projects skip

- **WHEN** navigating forward from the projects marker
- **THEN** the system SHALL advance to the first page pair of the next marker (Ia), bypassing any projects content