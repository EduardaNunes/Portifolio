# Spec Delta

## ADDED Requirements

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