# Spec Delta

## ADDED Requirements

### Requirement: Notebook interactive controls follow the active theme accent
Repository controls and thumbnail deploy overlays inside the notebook SHALL render with the light-theme accent while the light theme is active and the dark-theme accent while the dark theme is active, including in their hover and focus-visible states.

#### Scenario: Repository button in light theme
- **WHEN** the light theme is active and the visitor hovers a project repository button
- **THEN** the button uses the light-theme accent color rather than the dark-theme highlight color

#### Scenario: Repository button in dark theme
- **WHEN** the dark theme is active and the visitor hovers a project repository button
- **THEN** the button uses the dark-theme highlight color

#### Scenario: Deploy control in light theme
- **WHEN** the light theme is active and a project demo control renders its hover state
- **THEN** the control uses the light-theme accent color rather than the dark-theme highlight color

#### Scenario: Theme toggle while a control is visible
- **WHEN** the visitor switches themes while a repository or deploy control is visible
- **THEN** the control adopts the accent color of the newly active theme without a reload
