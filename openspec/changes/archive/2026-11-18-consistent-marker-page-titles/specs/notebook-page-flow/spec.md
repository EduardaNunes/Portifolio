# Spec Delta

## MODIFIED Requirements

### Requirement: Continuation leaves keep their context
Every non-blank narrative notebook leaf SHALL display its localized marker heading as the full page title. A rendered section's existing group label SHALL remain a section label below that title. The full page title MUST not be limited to a marker's first leaf or be replaced by a promoted section label, and no new copy keys may be introduced.

#### Scenario: First leaf keeps the page title
- **WHEN** the first populated leaf of a narrative marker side renders
- **THEN** it shows the localized marker heading as the full page title and renders any section group label below it

#### Scenario: Continuation leaf shows a running head
- **WHEN** a narrative slice continues onto a later page pair
- **THEN** its populated leaf shows the marker heading as a full page title rather than a smaller running head

#### Scenario: Running head reuses existing strings
- **WHEN** a continuation leaf renders in either locale
- **THEN** its marker title comes from the existing localized marker heading with no new translation or content keys

#### Scenario: Section label is never promoted
- **WHEN** a leaf renders only one labeled section, including a results or goals slice
- **THEN** the section label does not replace or use the visual treatment of the marker page title

#### Scenario: Blank leaf remains untitled
- **WHEN** a continuation pair has no content on one side
- **THEN** that blank leaf remains paper-only without a marker title or section label
