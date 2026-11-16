# Spec Delta

## Purpose

Provides centralized audio volume management with per-category volume sliders (background music and sound effects), a persistent mute toggle, theme-adaptive UI, and a scalable registration system for new audio assets.

## ADDED Requirements

### Requirement: Volume control button is always visible and fixed at top-right

The system SHALL display a volume control button fixed at the top-right of the viewport that remains visible and in the same position during scroll between sections.

#### Scenario: Button visible on initial load
- **WHEN** the page loads
- **THEN** the volume control button is rendered at top-right of viewport

#### Scenario: Button stays fixed during scroll
- **WHEN** user scrolls between hero section and notebook section
- **THEN** the volume control button remains at top-right of viewport without moving

### Requirement: Volume control button displays theme-appropriate speaker icon

The system SHALL display a speaker icon that is black in light mode and white in dark mode.

#### Scenario: Icon color in dark mode
- **WHEN** theme is dark mode (default)
- **THEN** the speaker icon is white

#### Scenario: Icon color in light mode
- **WHEN** theme is light mode
- **THEN** the speaker icon is black

#### Scenario: Icon updates on theme toggle
- **WHEN** user toggles theme via light switch
- **THEN** the speaker icon color updates immediately to match new theme

### Requirement: Clicking volume button opens panel with two volume sliders

The system SHALL display an expandable panel with two volume sliders when the volume control button is clicked: one for Background Music and one for Sound Effects.

#### Scenario: Panel opens on button click
- **WHEN** user clicks the volume control button
- **THEN** a panel appears showing two sliders labeled "Background Music" and "Sound Effects"

#### Scenario: Panel closes on button click again
- **WHEN** panel is open and user clicks the volume control button again
- **THEN** the panel closes

#### Scenario: Panel closes on outside click
- **WHEN** panel is open and user clicks outside the panel
- **THEN** the panel closes

### Requirement: Background Music slider is disabled at 0% with reduced opacity

The system SHALL display the Background Music slider at 0% volume with reduced opacity (disabled appearance) since no background music exists yet.

#### Scenario: Background Music slider initial state
- **WHEN** page loads
- **THEN** Background Music slider shows 0% volume and has disabled appearance (lower opacity)

#### Scenario: Background Music slider non-interactive
- **WHEN** user attempts to interact with Background Music slider
- **THEN** slider does not respond to input (disabled)

### Requirement: Sound Effects slider controls volume of all registered sound effects

The system SHALL apply the Sound Effects slider volume to all registered sound effects (theme toggle switch, page turn, and any future sound effects).

#### Scenario: Sound Effects slider initial value
- **WHEN** page loads and no saved preference exists
- **THEN** Sound Effects slider defaults to 100% (1.0)

#### Scenario: Sound Effects volume applies to theme toggle sound
- **WHEN** user toggles theme via light switch
- **THEN** the switch sound plays at the current Sound Effects volume level

#### Scenario: Sound Effects volume applies to page turn sound
- **WHEN** user turns a page in the notebook
- **THEN** the page turn sound plays at the current Sound Effects volume level

#### Scenario: Sound Effects volume changes take immediate effect
- **WHEN** user adjusts Sound Effects slider
- **THEN** subsequent sound effects play at the new volume level

### Requirement: Speaker icon changes to crossed-out when both volumes at 0%

The system SHALL change the volume button icon to a crossed-out speaker (mute icon) when both Background Music and Sound Effects volumes are at 0%.

#### Scenario: Mute icon when both volumes zero
- **WHEN** both Background Music and Sound Effects sliders are at 0%
- **THEN** the volume button displays a crossed-out speaker icon

#### Scenario: Speaker icon when any volume above zero
- **WHEN** either Background Music or Sound Effects slider is above 0%
- **THEN** the volume button displays a regular speaker icon

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

### Requirement: Volume settings persist across page loads

The system SHALL save volume settings to localStorage and restore them on page load.

#### Scenario: Settings saved on slider change
- **WHEN** user adjusts either volume slider
- **THEN** the new values are saved to localStorage

#### Scenario: Settings restored on page load
- **WHEN** page loads with saved preferences in localStorage
- **THEN** sliders reflect saved values and audio plays at saved volumes

#### Scenario: Default values when no saved preferences
- **WHEN** page loads with no saved preferences
- **THEN** Sound Effects defaults to 100%, Background Music defaults to 0% (disabled)

### Requirement: Audio Manager provides scalable sound registration

The system SHALL provide a registration API that allows new sounds/music to be added and automatically inherit volume control.

#### Scenario: Register new sound effect
- **WHEN** a component registers a sound with category "sfx"
- **THEN** the sound plays at the current Sound Effects volume level

#### Scenario: Register new background music
- **WHEN** a component registers a sound with category "music"
- **THEN** the sound plays at the current Background Music volume level

#### Scenario: Volume changes affect all registered sounds in category
- **WHEN** user adjusts Sound Effects slider
- **THEN** all currently registered "sfx" sounds play at new volume

#### Scenario: Unregister sound removes it from volume control
- **WHEN** a component unregisters a sound
- **THEN** the sound no longer responds to volume changes

## MODIFIED Requirements

### Requirement: Page turn sound plays at controlled volume

The narrative notebook component SHALL play page turn sounds through the Audio Manager at the current Sound Effects volume level.

#### Scenario: Page turn uses Audio Manager
- **WHEN** user turns a page in the notebook
- **THEN** the page turn sound is played via Audio Manager with "sfx" category at current SFX volume

### Requirement: Theme toggle sound plays at controlled volume

The light switch component SHALL play the toggle sound through the Audio Manager at the current Sound Effects volume level.

#### Scenario: Theme toggle uses Audio Manager
- **WHEN** user toggles theme via light switch
- **THEN** the switch sound is played via Audio Manager with "sfx" category at current SFX volume