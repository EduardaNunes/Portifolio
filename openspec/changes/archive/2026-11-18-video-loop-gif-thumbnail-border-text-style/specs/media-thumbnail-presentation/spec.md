# Spec Delta

## Purpose

Defines the visual presentation contract for project thumbnails (images, videos, other media) including the stepped-corner clip-path border matching the notebook text aesthetic, and GIF-like video autoplay behavior (loop, muted, autoPlay, playsInline) for seamless portfolio browsing.

## ADDED Requirements

### Requirement: Thumbnail stepped-corner border
All project thumbnails SHALL render with a thin border using a 3px pixel-stepped corner clip-path (matching the `.page-note` design from the notebook text presentation system), using the `--page-ink` color token for the border. This applies uniformly to images, videos, and any other media type displayed as a project thumbnail.

#### Scenario: Image thumbnail shows stepped-corner border
- **WHEN** a project thumbnail displays an image
- **THEN** the image is framed by a 1px `--page-ink` border with 3px stepped corners via clip-path

#### Scenario: Video thumbnail shows stepped-corner border
- **WHEN** a project thumbnail displays a video
- **THEN** the video element is framed by a 1px `--page-ink` border with 3px stepped corners via clip-path

#### Scenario: Thumbnail border uses correct ink token in both themes
- **WHEN** the theme toggles between dark and light mode
- **THEN** the thumbnail border color updates to match the current `--page-ink` value

### Requirement: Video thumbnails autoplay as GIF-like loops
Video thumbnails SHALL autoplay, loop continuously, play inline, and remain muted without showing native browser controls, behaving like animated GIFs.

#### Scenario: Video autoplays on mount
- **WHEN** a video thumbnail enters the DOM
- **THEN** the video begins playing automatically without user interaction

#### Scenario: Video loops continuously
- **WHEN** a video thumbnail reaches its end
- **THEN** the video restarts from the beginning automatically

#### Scenario: Video remains muted
- **WHEN** a video thumbnail plays
- **THEN** no audio is audible regardless of system volume

#### Scenario: Video plays inline on mobile
- **WHEN** a video thumbnail plays on a mobile device
- **THEN** the video plays within its layout box without entering fullscreen

#### Scenario: No native controls are visible
- **WHEN** a video thumbnail is rendered
- **THEN** the browser's default play/pause/volume controls are not displayed

### Requirement: Thumbnail border radius fallback
For environments where clip-path is not supported, thumbnails SHALL fall back to a slightly rounded border-radius (8px) using the same `--page-ink` border color.

#### Scenario: Fallback border-radius applies when clip-path unavailable
- **WHEN** the browser does not support clip-path on the thumbnail element
- **THEN** the thumbnail displays an 8px border-radius with 1px `--page-ink` border