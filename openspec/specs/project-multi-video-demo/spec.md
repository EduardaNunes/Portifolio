# project-multi-video-demo Specification

## Purpose
Enables projects to display multiple videos in vertical sequence on the demo leaf, each with its own deploy link. This supports projects like ProgramADA that have two distinct playable builds (classroom and mini-game café) each requiring a separate deploy button.

## Requirements

### Requirement: Project demo supports multiple video demos with individual deploy links
A project's `projectDemo` block SHALL accept an optional `videoDemos` array. Each entry SHALL contain `src` (video path), `alt` (accessibility text), optional `caption`, and optional `deployLink`. When `videoDemos` is present and non-empty, the renderer SHALL display each video demo in array order, vertically stacked, with its associated deploy link rendered immediately below its video.

#### Scenario: Project with two video demos renders both in order
- **WHEN** a project defines `videoDemos` with two entries: first for "Sala de Aula" with deploy link A, second for "MiniGame Cafe" with deploy link B
- **THEN** the demo leaf displays: Video 1 → Deploy Button 1 → Video 2 → Deploy Button 2, in that vertical order

#### Scenario: Project with single video demo uses videoDemos array
- **WHEN** a project defines `videoDemos` with one entry
- **THEN** the demo leaf displays that single video with its deploy link below it

#### Scenario: Project without videoDemos falls back to images array
- **WHEN** a project has no `videoDemos` but has `images` array
- **THEN** the demo leaf renders using the existing single-image/single-deploy behavior

#### Scenario: Video demo without deployLink shows video only
- **WHEN** a `videoDemos` entry omits `deployLink`
- **THEN** the video renders without a deploy button below it

#### Scenario: Video demo deployLink opens correct URL
- **WHEN** user clicks the deploy button for a specific video demo
- **THEN** the browser navigates to that video demo's `deployLink` in a new tab

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

### Requirement: Multi-video page content fits within viewport
When a page contains multiple video demos (or a single tall video), the combined content SHALL NOT overflow the leaf viewport vertically. Video heights SHALL be constrained proportionally so that all content (videos + deploy buttons + captions) fits within the available viewport height.

#### Scenario: Two videos fit within leaf height
- **WHEN** a project has two video demos on the demo leaf
- **THEN** both videos render fully visible without vertical scrolling or clipping of the leaf content

#### Scenario: Video height constrained proportionally
- **WHEN** total content height exceeds viewport height
- **THEN** each video's height is reduced proportionally to fit, maintaining aspect ratio
