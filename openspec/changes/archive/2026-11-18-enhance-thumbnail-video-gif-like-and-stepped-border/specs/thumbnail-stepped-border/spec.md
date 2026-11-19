# Spec Delta

## Purpose

Provides a cohesive visual frame for all media thumbnails (images and videos) across notebook leaves, using the same pixel-stepped corner border design as the `.page-note` text component to unify the paper-like aesthetic.

## ADDED Requirements

### Requirement: Thumbnails render with stepped-corner decorative border
All thumbnails rendered by the Thumbnail component SHALL display a thin border with 3px pixel-stepped corners (via clip-path), matching the `.page-note` info box design. The border SHALL use the `--page-ink` CSS custom property for color, ensuring automatic adaptation to light/dark themes.

#### Scenario: Image thumbnail shows stepped border
- **WHEN** an image thumbnail is rendered in a notebook leaf
- **THEN** the thumbnail container has a 1px solid border in `var(--page-ink)`
- **AND** the container uses clip-path with 3px stepped corners
- **AND** the border is visible in both light and dark themes

#### Scenario: Video thumbnail shows stepped border
- **WHEN** a video thumbnail is rendered in a notebook leaf
- **THEN** the video element's container has a 1px solid border in `var(--page-ink)`
- **AND** the container uses clip-path with 3px stepped corners
- **AND** the border is visible in both light and dark themes

### Requirement: Thumbnails have consistent slightly rounded corners
All thumbnails (images and videos) SHALL have slightly rounded corners (approximately 6px border-radius on the inner media element) that are visually contained within the stepped-corner frame, ensuring the media content itself has rounded corners while the decorative frame provides the stepped corners.

#### Scenario: Image thumbnail has rounded media corners
- **WHEN** an image thumbnail is rendered
- **THEN** the `img` element has `border-radius: 6px`
- **AND** the image is fully contained within the stepped-corner frame

#### Scenario: Video thumbnail has rounded media corners
- **WHEN** a video thumbnail is rendered
- **THEN** the `video` element has `border-radius: 6px`
- **AND** the video is fully contained within the stepped-corner frame

### Requirement: Thumbnail frame respects notebook leaf ink theming
The thumbnail stepped border SHALL use the `--page-ink` token (aliased to `--notebook-highlight-color` in dark mode, `--paper-accent` in light mode) so the border color automatically matches the notebook leaf's ink color without additional theme-specific CSS.

#### Scenario: Border color adapts to dark theme
- **WHEN** the notebook is in dark mode
- **THEN** the thumbnail border uses the orange highlight color (`#d87f0b`)

#### Scenario: Border color adapts to light theme
- **WHEN** the notebook is in light mode
- **THEN** the thumbnail border uses the blue accent color (`#145053`)