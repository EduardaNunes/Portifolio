# Spec Delta

## MODIFIED Requirements

### Requirement: Project spread layout with explicit deploy link
**When** a project spread is rendered  
**THEN** its left leaf MUST show metadata and its right leaf MUST show the demo with an explicit deploy link

#### Scenario: Project left leaf structure
- **WHEN** navigating to a project spread
- **THEN** the left leaf displays the project title, description, tech stack tags and GitHub repository link

#### Scenario: Project right leaf structure
- **WHEN** navigating to a project spread
- **THEN** the right leaf displays the demo image or video thumbnail with a Play overlay and an explicit deploy/preview link near the top-right area

#### Scenario: Deploy link click behavior
- **WHEN** the user clicks the deploy link
- **THEN** the deployed version opens in a new tab

**Updated behavior**: When a project's `projectDemo` block contains a `videoDemos` array, the right leaf SHALL render each video demo in array order, vertically stacked. Each video demo SHALL be followed by its associated deploy button (if `deployLink` is present). When `videoDemos` is absent or empty, the right leaf SHALL render using the existing `images` array with a single `deployLink` (legacy behavior).

#### Scenario: ProgramADA project renders two videos with two deploy buttons
- **WHEN** the ProgramADA project spread is rendered and its `projectDemo` has `videoDemos` with two entries (Sala de Aula and MiniGame Cafe) each with `deployLink`
- **THEN** the right leaf displays: Video 1 (Sala de Aula) → Deploy Button 1 (ProgramADAs-Playtest) → Video 2 (MiniGame Cafe) → Deploy Button 2 (ProgramADA-MiniGame-Cafe-PlayTest)

#### Scenario: Single-video project renders one video with one deploy button
- **WHEN** a project has `videoDemos` with one entry and a `deployLink`
- **THEN** the right leaf displays that video followed by its deploy button

#### Scenario: Legacy project with images array renders single demo with deploy link
- **WHEN** a project has only `images` array with `deployLink`
- **THEN** the right leaf displays the single image/video with one deploy button (existing behavior)

#### Scenario: Video demo without deployLink renders video only
- **WHEN** a `videoDemos` entry lacks `deployLink`
- **THEN** the video renders on the right leaf without a deploy button below it