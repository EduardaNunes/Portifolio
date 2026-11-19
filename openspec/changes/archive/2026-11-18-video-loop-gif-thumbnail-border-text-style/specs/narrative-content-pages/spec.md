# Spec Delta

## MODIFIED Requirements

### Requirement: Project page-pair layout
Each project-oriented page pair SHALL display descriptive project content on its left leaf and the project's image or demo on its right leaf. The right-leaf demo SHALL use the media-thumbnail-presentation capability for its visual frame: thumbnails SHALL have a stepped-corner clip-path border matching the notebook text aesthetic, and video demos SHALL autoplay, loop, play inline, and remain muted without native controls (GIF-like behavior).

#### Scenario: Project right leaf shows media with stepped-corner frame
- **WHEN** a project spread renders its right leaf
- **THEN** the demo media (image or video) is framed by the stepped-corner border from media-thumbnail-presentation

#### Scenario: Project video demo autoplays as GIF-like loop
- **WHEN** a project spread's right leaf contains a video demo
- **THEN** the video autoplays, loops, plays inline, stays muted, and shows no native controls

#### Scenario: Project image demo uses same frame as video
- **WHEN** a project spread's right leaf contains an image demo
- **THEN** the image uses the identical stepped-corner frame as video demos