# Spec Delta

## MODIFIED Requirements

### Requirement: Project demo blocks own media and optional actions
A `projectDemo` block SHALL declare an `images` array whose entries require `src` and MAY declare `alt`, `caption`, and `video`. The `video` field MAY be omitted when the `src` ends with a video file extension (`.mp4`, `.webm`, `.ogg`), in which case the renderer SHALL infer `video: true`. It MAY declare `repoLink` and `deployLink`; absent links SHALL not render their actions. An empty image list SHALL render the localized no-thumbnail placeholder.

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