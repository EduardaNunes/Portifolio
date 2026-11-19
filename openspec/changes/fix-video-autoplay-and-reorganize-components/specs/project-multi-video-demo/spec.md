# Spec Delta

## MODIFIED Requirements

### Requirement: Video demo plays as GIF-like animation
When a `videoDemos` entry with an `.mp4` source is rendered, the video element SHALL have `autoplay`, `loop`, and `muted` attributes, SHALL NOT have a `controls` attribute, and SHALL play automatically, loop continuously, and remain silent.

#### Scenario: MP4 source renders as video element with autoplay
- **WHEN** a `videoDemos` entry has `src: "/Videos/ProgramADAs_SalaDeAula.mp4"`
- **THEN** the renderer uses a `<video>` tag with `autoPlay`, `playsInline`, `loop`, `muted` attributes
- **AND** the video element does **not** have a `controls` attribute
- **AND** the video plays automatically, loops continuously, and remains silent