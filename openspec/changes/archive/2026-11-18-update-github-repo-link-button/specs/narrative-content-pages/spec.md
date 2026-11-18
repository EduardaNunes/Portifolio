# Spec Delta

## MODIFIED Requirements

### Requirement: Project spread layout with explicit deploy link
**When** a project spread is rendered
**THEN** its left leaf MUST show metadata and its right leaf MUST show the demo with an explicit deploy link

#### Scenario: Project left leaf structure
- **WHEN** navigating to a project spread
- **THEN** the left leaf displays the project title, description, tech stack tags and GitHub repository link as a full-width button with the GitHub icon and "Ver Repositório" text centered

#### Scenario: GitHub repository link hover in dark theme
- **WHEN** user hovers over the GitHub repository link button in dark theme
- **THEN** the button background becomes orange (`--notebook-highlight-color`), text and icon become white, and the border remains orange

#### Scenario: GitHub repository link hover in light theme
- **WHEN** user hovers over the GitHub repository link button in light theme
- **THEN** the button background becomes blue (`--paper-accent`), text and icon become white, and the border becomes blue

#### Scenario: Deploy button position and structure
- **WHEN** navigating to a project spread
- **THEN** the right leaf displays the demo image/video thumbnail with the deploy button positioned below the thumbnail as a full-width button with the external link icon and "Ver Deploy" text centered

#### Scenario: Deploy button hover in dark theme
- **WHEN** user hovers over the deploy button in dark theme
- **THEN** the button background becomes orange (`--notebook-highlight-color`), text and icon become white, and the border remains orange

#### Scenario: Deploy button hover in light theme
- **WHEN** user hovers over the deploy button in light theme
- **THEN** the button background becomes blue (`--paper-accent`), text and icon become white, and the border becomes blue

#### Scenario: No "Ver Demo" label on thumbnail
- **WHEN** a project spread is rendered
- **THEN** the right leaf displays the demo image/video thumbnail with its caption but WITHOUT any "Ver Demo" or equivalent label text

### Requirement: Pixel-art page presentation
Every notebook leaf MUST present its existing localized information in a structured paper-like composition using a reusable text presentation system. On a marker's first page pair the presentation MUST preserve the existing division of information between left and right leaves, and continuation slices MUST keep that same division on their own pair. The presentation MUST remain legible on supported viewport sizes and MUST use a single ink color for visual hierarchy through size, case, alignment, and ruled lines rather than nested boxes.

#### Scenario: Project leaf hierarchy
- **WHEN** a project leaf is rendered
- **THEN** its existing metadata or demo information is presented with the shared paper-like treatment: left leaf shows centered project title, description in a stepped-corner info box with internal ruled lines, tech stack as uppercase label with chips, and unified action buttons including a full-width GitHub repository button with centered icon and text; right leaf shows demo thumbnail with caption (no "Ver Demo" label) and full-width deploy button below it with centered icon and text