# Spec Delta

## MODIFIED Requirements

### Requirement: Project demo blocks own media and optional actions
A `projectDemo` block SHALL declare an `images` array whose entries require `src` and MAY declare `alt`, `caption`, and `video`. The `video` field MAY be omitted when the `src` ends with a video file extension (`.mp4`, `.webm`, `.ogg`), in which case the renderer SHALL infer `video: true`. It MAY declare `repoLink` and `deployLink`; absent links SHALL not render their actions. An empty image list SHALL render the localized no-thumbnail placeholder.

**Additionally**, a `projectDemo` block MAY declare a `videoDemos` array. Each entry SHALL require `src` and MAY declare `alt`, `caption`, and `deployLink`. The `video` type SHALL be inferred from the `src` file extension (`.mp4`, `.webm`, `.ogg`). When `videoDemos` is present and non-empty, it SHALL take precedence over `images` for rendering on the demo leaf. Each `videoDemos` entry SHALL render in array order, vertically stacked, with its `deployLink` (if present) rendered immediately below its video. Absent `deployLink` SHALL not render a deploy button for that entry. Validation SHALL accept either `images` or `videoDemos` (or both, with `videoDemos` taking precedence).

#### Scenario: Image demo
- **WHEN** an image entry renders
- **THEN** its media appears with its alt text and optional caption

#### Scenario: Video demo
- **WHEN** an entry declares `video`
- **THEN** it renders as a video element

#### Scenario: Video demo inferred from file extension
- **WHEN** an entry's `src` ends with `.mp4`, `.webm`, or `.ogg` and does not declare `video`
- **THEN** it renders as a video element with controls, loop, and muted

#### Scenario: Explicit video flag overrides extension inference
- **WHEN** an entry declares `video: false` but `src` ends with `.mp4`
- **THEN** it renders as an image element (explicit flag takes precedence)

#### Scenario: Optional demo actions
- **WHEN** `repoLink` or `deployLink` is absent
- **THEN** the corresponding action is not rendered

#### Scenario: Empty images show the placeholder
- **WHEN** `images` is empty or omitted
- **THEN** the localized no-thumbnail placeholder appears

#### Scenario: Project with videoDemos array renders multiple videos with deploy links
- **WHEN** a project defines `videoDemos` with two entries each having `src`, `alt`, `caption`, and `deployLink`
- **THEN** validation passes and the demo leaf renders both videos in order with their deploy buttons

#### Scenario: Project with only images array uses legacy rendering
- **WHEN** a project defines only `images` array with `repoLink` and `deployLink`
- **THEN** validation passes and the demo leaf renders single image/video with single deploy button

#### Scenario: Project with both images and videoDemos uses videoDemos
- **WHEN** a project defines both `images` and `videoDemos` arrays
- **THEN** validation passes and the demo leaf renders using `videoDemos` only

#### Scenario: videoDemos entry without deployLink renders video only
- **WHEN** a `videoDemos` entry omits `deployLink`
- **THEN** the video renders without a deploy button

#### Scenario: Missing src in videoDemos fails validation
- **WHEN** a `videoDemos` entry lacks `src`
- **THEN** validation fails with error identifying the project and entry