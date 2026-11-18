# Spec Delta

## Purpose

A reusable component that renders an image or video thumbnail with optional caption and play overlay for video content. Used by project demos to display media consistently across the notebook.

## ADDED Requirements

### Requirement: Thumbnail renders image media

When provided an image media object, the component SHALL render an `<img>` element with the source, alt text, and optional caption.

#### Scenario: Image thumbnail displays

- **WHEN** the component receives `{ src: '/path/image.svg', alt: 'Project demo', caption: 'Project Name' }`
- **THEN** an `<img>` element renders with the given src and alt, and the caption appears below the image

#### Scenario: Image thumbnail without caption

- **WHEN** the component receives an image media object without a caption
- **THEN** the image renders without a caption element

### Requirement: Thumbnail renders video media

When provided a video media object, the component SHALL render a `<video>` element with controls, loop, and muted attributes.

#### Scenario: Video thumbnail displays

- **WHEN** the component receives `{ src: '/path/demo.mp4', video: true, alt: 'Project demo', caption: 'Project Name' }`
- **THEN** a `<video>` element renders with controls, loop, muted, and the given src

#### Scenario: Video thumbnail without caption

- **WHEN** the component receives a video media object without a caption
- **THEN** the video renders without a caption element

### Requirement: Thumbnail shows play overlay for images

For image media (non-video), the component SHALL render a play overlay icon centered on the image to indicate it can be interacted with.

#### Scenario: Play overlay appears on image

- **WHEN** an image media object renders
- **THEN** a semi-transparent overlay with a play icon appears centered on the image

#### Scenario: No play overlay on video

- **WHEN** a video media object renders
- **THEN** no play overlay appears (native video controls are used)

### Requirement: Thumbnail handles missing media gracefully

When no media object is provided or the media array is empty, the component SHALL render a localized "no thumbnail" placeholder.

#### Scenario: Empty media shows placeholder

- **WHEN** the component receives no media or an empty media array
- **THEN** a placeholder element renders with the localized "no thumbnail" text

### Requirement: Thumbnail integrates with notebook theming

The component SHALL use the existing notebook CSS variables (`--paper-bg`, `--paper-text`, `--page-ink`, etc.) for styling so it appears consistent with the paper-like page presentation.

#### Scenario: Thumbnail respects dark theme

- **WHEN** the site is in dark theme
- **THEN** the thumbnail frame, caption, and overlay use dark theme colors

#### Scenario: Thumbnail respects light theme

- **WHEN** the site is in light theme
- **THEN** the thumbnail frame, caption, and overlay use light theme colors