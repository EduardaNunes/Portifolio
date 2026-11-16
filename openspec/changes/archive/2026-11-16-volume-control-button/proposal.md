# Proposal

## Why

The portfolio currently includes sound effects (theme toggle switch sound, page turn sound) but provides no way for users to control volume or mute audio. This creates accessibility and UX issues: users cannot lower or disable sounds that may be disruptive in quiet environments, and there's no accommodation for users who prefer a silent browsing experience. As more sounds may be added in the future, a scalable volume control system is needed.

## What Changes

- **New fixed volume control button** positioned at top-right of viewport, always visible during scroll
- **Centralized Audio Manager** to manage all sound instances and apply volume/mute settings consistently
- **Two-volume slider panel** (expandable on button click): Background Music (disabled at 0% opacity for now) and Sound Effects (controls all current sounds)
- **Theme-aware icons**: Speaker icon (black in light mode, white in dark mode); crossed-out speaker when both volumes at 0%
- **Theme-aware slider colors**: Blue sliders in dark mode, orange sliders in light mode
- **Persistence**: Volume settings saved to localStorage and restored on page load
- **Scalable sound registration**: New sounds/music can be registered to the audio manager and automatically inherit volume control

## Capabilities

### New Capabilities

- `audio-volume-control`: Centralized audio volume management, mute toggle, per-category volume sliders (background music, sound effects), theme-adaptive UI, and settings persistence

### Modified Capabilities

- `narrative-notebook-component`: PageTurn component will use the centralized Audio Manager instead of creating raw Audio instances
- `site-color-palette`: Extended with new CSS variables for volume slider colors (blue for dark, orange for light)

## Impact

**Affected code:**
- `src/components/narrative-notebook-component/PageTurn.jsx` - replace direct Audio creation with Audio Manager
- `src/hooks/useDraggableSwitch.js` - replace direct Audio creation with Audio Manager
- `src/App.jsx` - add VolumeControlButton component
- `src/styles/index.css` - add CSS variables for slider colors, styles for volume control UI

**New files:**
- `src/hooks/useAudioManager.js` (or `src/utils/audioManager.js`) - centralized audio management
- `src/components/VolumeControlButton.jsx` - volume control UI component
- `src/components/VolumeSlidersPanel.jsx` - expandable panel with two sliders

**Dependencies:** None (uses existing theme system via useTheme hook and localStorage)