# Spec Delta

## MODIFIED Requirements

### Requirement: Video demo entries infer video type from file extension
When a `videoDemos` entry's `src` ends with `.mp4`, `.webm`, or `.ogg`, the renderer SHALL treat it as a video (auto-play, loop, muted, **without playback controls**) without requiring an explicit `video: true` field.

#### Scenario: MP4 source renders as video element
- **WHEN** a `videoDemos` entry has `src: "/Videos/ProgramADAs_SalaDeAula.mp4"`
- **THEN** the renderer uses a `<video>` tag with autoPlay, playsInline, loop, muted

#### Scenario: Non-video source renders as image
- **WHEN** a `videoDemos` entry has `src: "/images/demo.png"`
- **THEN** the renderer uses an `<img>` tag with play overlay

#### Scenario: Video demo plays as GIF-like animation
- **WHEN** a `videoDemos` entry with an `.mp4` source is rendered
- **THEN** the video element has `autoplay`, `loop`, and `muted` attributes
- **AND** the video element does **not** have a `controls` attribute
- **AND** the video plays automatically, loops continuously, and remains silent

## Purpose
<!-- New capabilities only: one or two sentences (50+ characters) on what this capability is for. Delete this section for an existing capability. -->