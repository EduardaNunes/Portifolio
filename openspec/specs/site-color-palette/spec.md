# site-color-palette Specification

## Purpose
Define uma política de cores verificável para preservar a identidade pixel-art do portfólio e impedir a introdução acidental de cores não aprovadas.

## Requirements

### Requirement: Documented approved color palette
The project documentation MUST list the colors currently used by the interface, grouped by their semantic role, and MUST state that new interface colors require an explicit update to that palette definition.

#### Scenario: Palette reference is available
- **WHEN** a contributor consults the project documentation
- **THEN** they find the approved colors and their intended semantic groups, including site themes, notebook paper, tabs, accents, black ink, white, and transparency/shadow treatments

#### Scenario: Reuse of an existing color
- **WHEN** a contributor styles a new or changed interface element
- **THEN** the contributor can select an existing documented palette color rather than introducing an undocumented color literal

### Requirement: Notebook changes comply with the approved palette
Notebook covers, page-stack layers, tabs, icons, page content, and related interaction states MUST use only colors listed in the documented approved palette.

#### Scenario: Visual inspection of the refined notebook
- **WHEN** the refined notebook is viewed in either theme
- **THEN** every opaque interface color in its cover, page stack, tabs, icons, and page-content decorations is present in the documented palette

### Requirement: Volume sliders use theme-appropriate colors

The system SHALL render volume sliders with blue accent color in dark mode and orange accent color in light mode.

#### Scenario: Slider color in dark mode
- **WHEN** theme is dark mode
- **THEN** volume slider tracks and thumbs use blue accent color

#### Scenario: Slider color in light mode
- **WHEN** theme is light mode
- **THEN** volume slider tracks and thumbs use orange accent color

#### Scenario: Slider color updates on theme toggle
- **WHEN** user toggles theme while volume panel is open
- **THEN** slider colors update immediately to match new theme
