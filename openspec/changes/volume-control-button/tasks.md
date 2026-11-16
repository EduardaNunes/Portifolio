# Tasks

## 1. Audio Manager Core

- [ ] 1.1 Create `src/utils/audioManager.js` with `AudioManager` class (singleton) implementing: `registerSound(id, url, category)`, `unregisterSound(id)`, `play(id)`, `setVolume(category, value)`, `getVolume(category)`, `loadSettings()`, `saveSettings()`. Verify by importing in console and testing register/play/volume.
- [ ] 1.2 Create `src/context/AudioManagerContext.jsx` with `AudioManagerProvider` and `useAudioManager` hook. Provider initializes singleton, loads settings from localStorage, exposes manager via context. Verify by wrapping App and calling `useAudioManager()` in a test component.
- [ ] 1.3 Add localStorage persistence: `loadSettings()` reads `'portfolio-audio-settings'`, `saveSettings()` writes on every volume change. Handle try/catch for quota/unavailable. Verify by changing volume, refreshing page, confirming values restored.

## 2. CSS Variables & Base Styles

- [ ] 2.1 Add CSS variables to `src/styles/index.css`:
  - `:root` (dark): `--volume-slider-accent: #5f9ea0; --volume-slider-track: rgba(249,239,228,0.3); --volume-slider-thumb-size: 16px; --icon-color: #f9efe4;`
  - `.lightmode`: `--volume-slider-accent: #d87f0b; --volume-slider-track: rgba(26,25,23,0.3); --icon-color: #1a1917;`
  Verify variables appear in computed styles in DevTools.
- [ ] 2.2 Add base styles for fixed volume button container: `.volume-control-wrapper { position: fixed; top: 1rem; right: 1rem; z-index: 1000; }`. Verify button stays fixed during scroll.
- [ ] 2.3 Add styles for volume sliders panel (hidden by default, absolute/fixed positioning, theme-aware colors using CSS variables). Verify panel appears on click and uses correct colors in both themes.

## 3. Volume Control UI Components

- [ ] 3.1 Create `src/components/VolumeIcons.jsx` with two inline SVG components: `SpeakerIcon` and `SpeakerMutedIcon`, both using `currentColor` for fill/stroke. Verify icons render and inherit color from parent.
- [ ] 3.2 Create `src/components/VolumeSlidersPanel.jsx` with two `<input type="range">` sliders (min=0, max=1, step=0.01):
  - Background Music: disabled, value=0, opacity=0.5
  - Sound Effects: enabled, value from AudioManager
  Both use `--volume-slider-accent` for thumb/track styling. Verify sliders render, are keyboard accessible, and colors match theme.
- [ ] 3.3 Create `src/components/VolumeControlButton.jsx` combining button + panel:
  - Button shows `SpeakerIcon` or `SpeakerMutedIcon` based on `muted` state (both volumes === 0)
  - Click toggles panel visibility
  - Click outside closes panel
  - Passes `onVolumeChange` callbacks to AudioManager
  Verify: icon switches correctly, panel opens/closes, sliders update AudioManager state.

## 4. Integrate Volume Control into App

- [ ] 4.1 Wrap App with `AudioManagerProvider` in `src/main.jsx` (or `App.jsx`). Verify no console errors and context is available.
- [ ] 4.2 Add `VolumeControlButton` to `src/App.jsx` inside the root div but outside `.app-scroll` (so fixed positioning works relative to viewport). Verify button appears top-right on all sections.
- [ ] 4.3 Test theme integration: toggle theme via LightSwitch, verify button icon color changes (black/white), slider colors change (blue/orange), panel updates without reload.

## 5. Refactor Existing Sound Consumers

- [ ] 5.1 Refactor `src/components/narrative-notebook-component/PageTurn.jsx`:
  - Import `useAudioManager` from context
  - In `useEffect`, register sound: `const playPageTurn = useAudioManager().registerSound('page-turn', PAGE_TURN_SOUND_URL, 'sfx')`
  - Replace `new Audio(PAGE_TURN_SOUND_URL).play()` with `playPageTurn()`
  - Cleanup: unregister on unmount
  Verify: page turn sound plays at Sound Effects volume, volume slider changes affect it immediately.
- [ ] 5.2 Refactor `src/hooks/useDraggableSwitch.js`:
  - Import `useAudioManager` (note: this is a hook, can only be used in component; create a wrapper component or use context directly)
  - Option A: Create `LightSwitchSound.jsx` component that uses `useAudioManager` and exposes `playSwitchSound`, then use it in `LightSwitch.jsx`
  - Option B: Pass `playSwitchSound` from parent via props
  - Register `'theme-toggle'` sound with category `'sfx'`
  Verify: theme toggle sound plays at Sound Effects volume, volume slider changes affect it.

## 6. Verification & Polish

- [ ] 6.1 End-to-end verification checklist:
  - [ ] Page load: button visible top-right, speaker icon correct for theme
  - [ ] Click button: panel opens with two sliders
  - [ ] Background Music slider: disabled, 0%, lower opacity
  - [ ] Sound Effects slider: defaults to 100%, adjustable
  - [ ] Adjust SFX slider: page turn and theme toggle sounds respect new volume
  - [ ] Set both sliders to 0: button icon changes to crossed-out speaker
  - [ ] Raise either slider: icon returns to regular speaker
  - [ ] Toggle theme: icon color flips (black↔white), slider colors flip (blue↔orange)
  - [ ] Refresh page: slider positions and volumes persist
  - [ ] Scroll between sections: button stays fixed top-right
  - [ ] Keyboard: Tab to button, Enter/Space opens panel, arrow keys adjust sliders
- [ ] 6.2 Mobile/responsive check: button doesn't overlap notebook corner zones, panel fits viewport, touch interaction works.
- [ ] 6.3 Accessibility check: button has `aria-label`, panel has `role="dialog"` or similar, sliders have labels, focus indicators visible.

## Workflow follow-up

- Archive the change after implementation is complete and verified.
- Verify the archived result.