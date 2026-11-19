# Spec Delta

## Purpose

Defines the interactive hover behavior on thumbnails that reveals deploy action with colored overlay, icon, and text.

## ADDED Requirements

### Requirement: Thumbnail shows colored overlay on hover with deploy link
When a thumbnail has a deploy link, hovering SHALL reveal a semi-transparent colored overlay covering the thumbnail with a deploy icon and text.

#### Scenario: Hover shows blue overlay in light theme
- **WHEN** user hovers over a thumbnail with a deploy link in light theme
- **THEN** a blue background overlay with 70% opacity appears over the thumbnail
- **AND** white text with deploy icon appears centered on the overlay

#### Scenario: Hover shows orange overlay in dark theme
- **WHEN** user hovers over a thumbnail with a deploy link in dark theme
- **THEN** an orange background overlay with 70% opacity appears over the thumbnail
- **AND** white text with deploy icon appears centered on the overlay

#### Scenario: Hover text uses i18n with fallback
- **WHEN** user hovers over a thumbnail with a deploy link
- **THEN** the overlay text is the i18n value for "viewDeploy" from current language JSON
- **AND** if i18n value is missing, the text defaults to "Ver Deploy"

### Requirement: Thumbnail shows gray overlay for preview-only (no deploy link)
When a thumbnail has NO deploy link, hovering SHALL reveal a gray overlay indicating preview-only mode.

#### Scenario: Hover shows gray overlay with preview text
- **WHEN** user hovers over a thumbnail without a deploy link
- **THEN** a gray background overlay with 70% opacity appears over the thumbnail
- **AND** white text "Apenas Visualização :)" appears centered on the overlay

### Requirement: Thumbnail scales up on hover
When hovering over any thumbnail (with or without deploy link), the thumbnail SHALL scale to 115% of its original size.

#### Scenario: Thumbnail scales 115% on hover
- **WHEN** user hovers over a thumbnail
- **THEN** the thumbnail transforms to scale(1.15)

#### Scenario: Scale transitions smoothly
- **WHEN** user hovers over a thumbnail
- **THEN** the scale transition animates smoothly over ~200ms

### Requirement: Deploy icon from Lucide React
The hover overlay SHALL display a deploy/external link icon from the existing LinkIcon component (Lucide React).

#### Scenario: Deploy icon appears in hover overlay
- **WHEN** hover overlay is shown for thumbnail with deploy link
- **THEN** the external link icon from LinkIcon appears with the text