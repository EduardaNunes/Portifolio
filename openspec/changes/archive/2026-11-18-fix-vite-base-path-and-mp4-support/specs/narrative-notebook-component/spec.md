# Spec Delta

## ADDED Requirements

### Requirement: Thumbnail auto-detects video from file extension
The Thumbnail component SHALL infer `video: true` when the `src` prop ends with a video file extension (`.mp4`, `.webm`, `.ogg`), unless an explicit `video` prop is provided. This allows content to use video files without requiring a separate `video: true` field.

#### Scenario: MP4 renders as video without explicit flag
- **WHEN** Thumbnail receives `src="/Portifolio/Videos/demo.mp4"` without a `video` prop
- **THEN** it renders a `<video>` element with controls, loop, and muted

#### Scenario: WebM renders as video without explicit flag
- **WHEN** Thumbnail receives `src="/Portifolio/Videos/demo.webm"` without a `video` prop
- **THEN** it renders a `<video>` element

#### Scenario: OGG renders as video without explicit flag
- **WHEN** Thumbnail receives `src="/Portifolio/Videos/demo.ogg"` without a `video` prop
- **THEN** it renders a `<video>` element

#### Scenario: Explicit video false overrides extension
- **WHEN** Thumbnail receives `src="/Portifolio/Videos/demo.mp4"` with `video={false}`
- **THEN** it renders an `<img>` element (explicit prop takes precedence)

#### Scenario: Explicit video true works as before
- **WHEN** Thumbnail receives `src="/Portifolio/images/demo.png"` with `video={true}`
- **THEN** it renders a `<video>` element (explicit prop takes precedence)

#### Scenario: Image extensions render as image
- **WHEN** Thumbnail receives `src` ending with `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp` without `video` prop
- **THEN** it renders an `<img>` element with play overlay