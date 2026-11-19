# Spec Delta

## MODIFIED Requirements

### Requirement: Project demo supports multiple video demos with individual deploy links
A project's `projectDemo` block SHALL accept an optional `videoDemos` array. Each entry SHALL contain `src` (video path), `alt` (accessibility text), optional `caption`, and optional `deployLink`. When `videoDemos` is present and non-empty, the renderer SHALL display each video demo in array order, vertically stacked. **Each video demo's thumbnail SHALL be clickable and show hover interaction per `thumbnail-clickable-deploy` and `thumbnail-deploy-hover` capabilities instead of rendering a separate deploy button below it.**

#### Scenario: Project with two video demos renders both thumbnails with deploy hover
- **WHEN** a project defines `videoDemos` with two entries: first for "Sala de Aula" with deploy link A, second for "MiniGame Cafe" with deploy link B
- **THEN** the demo leaf displays: Thumbnail 1 (clickable, hover shows deploy) → Thumbnail 2 (clickable, hover shows deploy), in that vertical order

#### Scenario: Project with single video demo uses videoDemos array
- **WHEN** a project defines `videoDemos` with one entry
- **THEN** the demo leaf displays that single video thumbnail with clickable deploy hover

#### Scenario: Project without videoDemos falls back to images array
- **WHEN** a project has no `videoDemos` but has `images` array
- **THEN** the demo leaf renders using the existing single-image/single-deploy behavior with clickable thumbnail hover

#### Scenario: Video demo without deployLink shows preview-only hover
- **WHEN** a `videoDemos` entry omits `deployLink`
- **THEN** the video thumbnail renders with preview-only hover ("Apenas Visualização :)") per `thumbnail-deploy-hover`

#### Scenario: Video demo deployLink opens correct URL on click
- **WHEN** user clicks the thumbnail for a specific video demo with deployLink
- **THEN** the browser navigates to that video demo's `deployLink` in a new tab

### Requirement: Video demo entries infer video type from file extension
When a `videoDemos` entry's `src` ends with `.mp4`, `.webm`, or `.ogg`, the renderer SHALL treat it as a video (auto-play, loop, muted, **without playback controls**) without requiring an explicit `video: true` field. The thumbnail hover behavior applies regardless of media type.

#### Scenario: MP4 source renders as video element with hover
- **WHEN** a `videoDemos` entry has `src: "/Videos/ProgramADAs_SalaDeAula.mp4"`
- **THEN** the renderer uses a `<video>` tag with autoPlay, playsInline, loop, muted
- **AND** the thumbnail frame shows hover overlay with deploy action

#### Scenario: Non-video source renders as image with hover
- **WHEN** a `videoDemos` entry has `src: "/images/demo.png"`
- **THEN** the renderer uses an `<img>` tag with play overlay
- **AND** the thumbnail frame shows hover overlay with deploy action

#### Scenario: Video demo plays as GIF-like animation with hover
- **WHEN** a `videoDemos` entry with an `.mp4` source is rendered
- **THEN** the video element has `autoplay`, `loop`, and `muted` attributes
- **AND** the video element does **not** have a `controls` attribute
- **AND** the video plays automatically, loops continuously, and remains silent
- **AND** the thumbnail frame shows hover overlay with deploy action

### Requirement: Multi-video page content fits within viewport
When a page contains multiple video demos (or a single tall video), the combined content SHALL NOT overflow the leaf viewport vertically. Video heights SHALL be constrained proportionally so that all content (thumbnails + captions) fits within the available viewport height. The hover overlay and scale transform SHALL NOT cause viewport overflow.

#### Scenario: Two videos fit within leaf height
- **WHEN** a project has two video demos on the demo leaf
- **THEN** both thumbnails render fully visible without vertical scrolling or clipping of the leaf content

#### Scenario: Thumbnail height constrained proportionally
- **WHEN** total content height exceeds viewport height
- **THEN** each thumbnail's height is reduced proportionally to fit, maintaining aspect ratio

#### Scenario: Hover scale does not cause overflow
- **WHEN** user hovers over a thumbnail at maximum constrained size
- **THEN** the 115% scale transform does not push content outside the leaf viewport