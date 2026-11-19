# Proposal

## Why

Project thumbnails currently display videos with browser controls and images with a simple border radius. Videos should autoplay, loop, and be muted like animated GIFs for a seamless portfolio browsing experience. Additionally, all thumbnails (images, videos, etc.) should share a consistent border design that matches the paper-like aesthetic of the notebook text components (stepped-corner clip-path borders used in `.page-note`).

## What Changes

- **Video playback behavior**: Remove native `controls` from video thumbnails; add `autoPlay`, `playsInline`, keep `loop` and `muted` for GIF-like autoplay.
- **Thumbnail border radius**: Slightly increase border radius on `.project-thumbnail` for a softer look across all media types.
- **Thumbnail border style**: Replace simple rounded border with a stepped-corner clip-path border matching the `.page-note` design from the notebook text presentation system (3px pixel-stepped corners, thin border, same ink color tokens).

## Capabilities

### New Capabilities
- `media-thumbnail-presentation`: Defines the visual presentation contract for project thumbnails (images, videos, other media) including border style, corner treatment, and video autoplay behavior. This capability owns the reusable thumbnail frame aesthetic shared across project demos.

### Modified Capabilities
- `narrative-content-pages`: The "Project page-pair layout" requirement currently implies media display on the right leaf but does not specify video autoplay or the thumbnail border design. This change adds explicit requirements for GIF-like video playback and the stepped-corner thumbnail frame.

## Impact

- **Components**: `src/components/notebook-content/Thumbnail.jsx` (video props, wrapper structure)
- **Styles**: `src/styles/index.css` (`.project-thumbnail`, `.thumbnail-container`, new clip-path border utility)
- **Specs**: Delta spec for `narrative-content-pages`; new spec for `media-thumbnail-presentation`
- **No breaking changes** to content schema or navigation; purely presentational.