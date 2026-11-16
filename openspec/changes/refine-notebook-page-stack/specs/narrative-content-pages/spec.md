# Spec Delta

## ADDED Requirements

### Requirement: Pixel-art page presentation
Every notebook leaf MUST present its existing localized information in a structured pixel-art composition with clear visual hierarchy. The presentation MUST preserve the existing division of information between left and right leaves and MUST remain legible on supported viewport sizes.

#### Scenario: Section leaf hierarchy
- **WHEN** an About Me, Career, Studies, or Contact leaf is rendered
- **THEN** its heading, section groupings, and individual entries are visually distinguished through the shared pixel-art presentation

#### Scenario: Project leaf hierarchy
- **WHEN** a project leaf is rendered
- **THEN** its existing metadata or demo information is presented with the shared pixel-art treatment without removing the repository, preview, or deploy actions required for that leaf

#### Scenario: Information division is preserved
- **WHEN** any spread is rendered after the presentation refresh
- **THEN** the information remains on the same left or right leaf defined by the content requirements

### Requirement: Page content remains contained and accessible
Page presentation decorations MUST remain inside the displayed leaf and MUST NOT cause horizontal document scrolling, obscure interactive controls, or prevent vertical reading of long leaf content.

#### Scenario: Long content remains readable
- **WHEN** a leaf contains more content than its visible height
- **THEN** the user can read the content through the leaf's existing vertical scrolling behavior without horizontal overflow

#### Scenario: Interactive content remains usable
- **WHEN** a leaf includes a link, contact action, repository action, or deploy action
- **THEN** its control remains visible, keyboard reachable, and operable within the decorated layout

#### Scenario: Narrow screen containment
- **WHEN** the notebook is viewed on a narrow supported viewport
- **THEN** page decorations and text remain within each 50% leaf and the document does not gain horizontal scrolling

### Requirement: Localized content is preserved by the presentation refresh
The visual refresh MUST consume the existing localized content rather than replace it with fixed-language decorative copy.

#### Scenario: Portuguese content
- **WHEN** the active locale is Portuguese
- **THEN** refreshed page headings, labels, and information remain in Portuguese

#### Scenario: English content
- **WHEN** the active locale is English
- **THEN** refreshed page headings, labels, and information remain in English
