# Spec Delta

## MODIFIED Requirements

### Requirement: Thumbnails render with stepped-corner decorative border
All thumbnails rendered by the Thumbnail component SHALL display a thin border with 3px pixel-stepped corners (via clip-path), matching the `.page-note` info box design. The border SHALL use the `--page-ink` CSS custom property for color, ensuring automatic adaptation to light/dark themes. **The hover overlay per `thumbnail-deploy-hover` SHALL appear inside this frame, respecting the stepped corners.**

#### Scenario: Image thumbnail shows stepped border with hover overlay
- **WHEN** an image thumbnail is rendered in a notebook leaf
- **THEN** the thumbnail container has a 1px solid border in `var(--page-ink)`
- **AND** the container uses clip-path with 3px stepped corners
- **AND** the border is visible in both light and dark themes
- **AND** on hover, the colored overlay appears within the stepped frame

#### Scenario: Video thumbnail shows stepped border with hover overlay
- **WHEN** a video thumbnail is rendered in a notebook leaf
- **THEN** the video element's container has a 1px solid border in `var(--page-ink)`
- **AND** the container uses clip-path with 3px stepped corners
- **AND** the border is visible in both light and dark themes
- **AND** on hover, the colored overlay appears within the stepped frame

### Requirement: Thumbnails have consistent slightly rounded corners
All thumbnails (images and videos) SHALL have slightly rounded corners (approximately 6px border-radius on the inner media element) that are visually contained within the stepped-corner frame, ensuring the media content itself has rounded corners while the decorative frame provides the stepped corners. **The hover overlay SHALL also respect these inner rounded corners.**

#### Scenario: Image thumbnail has rounded media corners with hover
- **WHEN** an image thumbnail is rendered
- **THEN** the `img` element has `border-radius: 6px`
- **AND** the image is fully contained within the stepped-corner frame
- **AND** on hover, the overlay respects the 6px inner border radius

#### Scenario: Video thumbnail has rounded media corners with hover
- **WHEN** a video thumbnail is rendered
- **THEN** the `video` element has `border-radius: 6px`
- **AND** the video is fully contained within the stepped-corner frame
- **AND** on hover, the overlay respects the 6px inner border radius

### Requirement: Thumbnail frame respects notebook leaf ink theming
The thumbnail stepped border SHALL use the `--page-ink` token (aliased to `--notebook-highlight-color` in dark mode, `--paper-accent` in light mode) so the border color automatically matches the notebook leaf's ink color without additional theme-specific CSS. **The hover overlay colors SHALL use the theme-inverted accent colors (blue in light, orange in dark) per `thumbnail-deploy-hover`.**

#### Scenario: Border color adapts to dark theme
- **WHEN** the notebook is in dark mode
- **THEN** the thumbnail border uses the orange highlight color (`#d87f0b`)

#### Scenario: Border color adapts to light theme
- **WHEN** the notebook is in light mode
- **THEN** the thumbnail border uses the blue accent color (`#145053`)

## ADDED Requirements

### Requirement: Hover overlay respects stepped frame clipping
The hover overlay (colored background, icon, and text) SHALL be clipped by the same stepped-corner clip-path as the thumbnail frame, ensuring the overlay never exceeds the decorative border.

#### Scenario: Hover overlay clipped by stepped corners
- **WHEN** user hovers over a thumbnail
- **THEN** the colored overlay is fully contained within the 3px stepped corners
- **AND** no part of the overlay extends beyond the clip-path boundary