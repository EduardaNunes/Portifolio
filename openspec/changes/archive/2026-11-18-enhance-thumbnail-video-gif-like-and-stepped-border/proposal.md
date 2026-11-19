# Proposal

## Why

The current Thumbnail component renders videos with native browser controls (`controls` attribute), which prevents them from behaving like seamless animated GIFs. Users expect project demo videos to play automatically, loop continuously, and remain silent without visible playback controls. Additionally, project thumbnails lack a cohesive visual identity — they currently have simple rounded corners but no decorative border that matches the notebook's paper-like aesthetic (the stepped-corner "info box" style used in `.page-note` text components).

## What Changes

- **Video GIF-like behavior**: Remove the `controls` attribute from video elements in the Thumbnail component so videos autoplay, loop, and stay muted without showing browser playback UI. This applies to all video thumbnails (project demos, videoDemos, etc.).

- **Slightly rounded corners for all thumbnails**: Ensure both images and videos in the Thumbnail component have consistent, slightly rounded corners (maintaining the existing 6px radius or adjusting slightly).

- **Stepped-corner border for thumbnails**: Add a decorative border to the Thumbnail component using the same pixel-stepped corner design (`clip-path` with 3px steps) as the `.page-note` text component, using the `--page-ink` color token for theming consistency across light/dark modes.

## Capabilities

### Modified Capabilities

- `project-multi-video-demo`: The requirement "Video demo entries infer video type from file extension" specifies videos should be "auto-play, loop, muted" but the current implementation includes `controls`. This change removes `controls` to achieve true GIF-like behavior.

### New Capabilities

- `thumbnail-stepped-border`: A new capability covering the visual styling of all thumbnails (images and videos) across the notebook — including the stepped-corner decorative border, consistent rounded corners, and theming via CSS custom properties. This capability owns the Thumbnail component's appearance regardless of where it's used (project demos, videoDemos, academic projects, etc.).

## Impact

- **Components**: `src/components/notebook-content/Thumbnail.jsx` — remove `controls` from video, add border styling class
- **Styles**: `src/styles/index.css` — add `.thumbnail-frame` (or similar) class with stepped-corner clip-path border, ensure `--page-ink` token is used
- **Specs**: Delta spec for `project-multi-video-demo` (video behavior), new spec for `thumbnail-stepped-border`
- **Content**: No content changes required; existing video assets automatically benefit