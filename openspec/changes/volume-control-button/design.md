# Design

## Context

The project is a React + Vite portfolio with a notebook-style navigation. Current sounds:
- `/Sounds/Light-Switch.mp3` - played when toggling theme via LightSwitch (in `useDraggableSwitch.js`)
- `/Sounds/book_page_turn.wav` - played when turning notebook pages (in `PageTurn.jsx`)
- `/Sounds/book_page_close.wav` - available but not currently used

Theming is handled via CSS custom properties on `:root` (dark) and `.lightmode` class (light), toggled by `useTheme` hook which adds/removes `lightmode` class on `document.body`.

Components that play sounds currently create `new Audio(url).play()` directly. No centralized audio management exists.

## Goals / Non-Goals

**Goals:**
- Create a centralized Audio Manager (React Context + hook) that manages volume per category (music, sfx)
- Build a fixed-position VolumeControlButton component with expandable VolumeSlidersPanel
- Use SVG inline icons with `currentColor` for theme-adaptive colors
- Persist volume settings to localStorage
- Refactor existing sound-playing components to use Audio Manager
- Add CSS variables for slider colors (blue dark, orange light)

**Non-Goals:**
- Background music playback implementation (slider stays disabled at 0%)
- Audio spatialization, fade effects, or advanced audio features
- Keyboard shortcuts for volume control (can be added later)
- Server-side persistence (localStorage only)

## Decisions

### 1. Audio Manager Architecture: React Context + Singleton Pattern

**Decision:** Use a React Context (`AudioManagerContext`) with a singleton `AudioManager` class instance. The context provides a `useAudioManager` hook.

**Rationale:**
- Singleton ensures single source of truth for volume state and registered sounds
- Context allows any component to access the manager without prop drilling
- Class-based manager encapsulates Audio element lifecycle, registration, and volume application
- Easy to test and extend

**Alternatives considered:**
- Pure hook with useRef: Harder to share across components without Context
- Global variable/module: Not React-idiomatic, harder to test
- Zustand/Redux: Overkill for this scope

### 2. Sound Registration API

**Decision:** Audio Manager exposes `registerSound(id, url, category)` and `unregisterSound(id)`. Categories: `'music'` | `'sfx'`. Returns a `play()` function that creates/clones Audio element and applies current category volume.

**Rationale:**
- Components register sounds once (e.g., in useEffect), get back a stable `play` function
- Category determines which volume slider controls it
- Cloning Audio elements allows overlapping sounds (e.g., rapid page turns)
- Cleanup on unmount via `unregisterSound`

**Alternatives considered:**
- Pre-load all sounds: Unnecessary memory for rarely-played sounds
- Pass volume to each play(): More verbose, less scalable

### 3. Volume State Structure

**Decision:** State object: `{ music: number (0-1), sfx: number (0-1), muted: boolean }`. `muted` is derived (both at 0) but stored for quick icon logic. Persisted to localStorage key `'portfolio-audio-settings'`.

**Rationale:**
- Simple, serializable, covers all requirements
- Derived `muted` avoids sync issues

### 4. VolumeControlButton Positioning

**Decision:** Fixed position (`position: fixed; top: 1rem; right: 1rem; z-index: 1000;`) outside the scroll container, not inside `<nav>`.

**Rationale:**
- Requirement: "always present on screen, fixed top-right, following scroll between sections always static"
- The `.app-scroll` container has `overflow-y: auto` and `height: 100dvh`; fixed positioning relative to viewport ensures it stays visible

### 5. Icon Implementation: Inline SVG with currentColor

**Decision:** Two inline SVG components: `SpeakerIcon` and `SpeakerMutedIcon`. Both use `currentColor` for fill/stroke. Color controlled via CSS: `.volume-button { color: var(--icon-color); }` where `--icon-color` is set by theme (black/white).

**Rationale:**
- User preference: "SVG inline (Recomendado)"
- Single SVG scales perfectly, no rasterization artifacts
- `currentColor` inherits from CSS, enabling theme switching without JS
- No additional asset files needed

### 6. Slider Styling: Native `<input type="range">` with CSS Custom Properties

**Decision:** Use native `<input type="range">` styled via CSS custom properties for thumb/track colors. CSS variables: `--slider-accent` (blue `#5f9ea0` dark, orange `#d87f0b` light), `--slider-track-bg`.

**Rationale:**
- Native accessibility (keyboard, screen readers)
- CSS variables integrate with existing theme system
- Minimal JS needed for visual updates

### 7. Theme Integration for Slider Colors

**Decision:** Add to `:root` (dark): `--volume-slider-accent: #5f9ea0;` (cadetblue, matches existing `--btn-play`). Add to `.lightmode`: `--volume-slider-accent: #d87f0b;` (orange, matches existing `--strong` in light mode).

**Rationale:**
- Reuses existing palette colors for consistency
- Single CSS variable drives both track and thumb accent
- No JS theme detection needed for sliders

### 8. localStorage Persistence

**Decision:** Audio Manager loads from localStorage on initialization (in Context Provider), saves on every volume change. Key: `'portfolio-audio-settings'`. Schema: `{ music: number, sfx: number }`.

**Rationale:**
- Simple, no dependencies
- Survives page reloads
- Graceful degradation if localStorage unavailable

### 9. Refactoring PageTurn and useDraggableSwitch

**Decision:**
- `PageTurn.jsx`: Import `useAudioManager`, call `registerSound('page-turn', PAGE_TURN_SOUND_URL, 'sfx')` in useEffect, use returned `play()` in animation effect
- `useDraggableSwitch.js`: Import `useAudioManager` (or access via context), register `'theme-toggle'` sound, use returned `play()` on toggle

**Rationale:**
- Minimal changes to existing components
- Sounds automatically respect volume settings
- Registration cleanup on unmount prevents memory leaks

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| AudioContext autoplay policy may block sounds on first interaction | Audio Manager defers Audio creation until first user gesture; `play()` returns Promise, catch and ignore errors (existing pattern) |
| Multiple rapid sounds (e.g., fast page turns) may overlap awkwardly | Audio Manager clones Audio element per `play()` call, allowing overlap; acceptable for UI sounds |
| localStorage quota exceeded or unavailable | Wrap localStorage access in try/catch; fall back to in-memory defaults |
| Fixed button may overlap with notebook corner zones on mobile | Use `z-index: 1000` (above notebook shell's z-index 3); test responsive positioning; add media query to reduce size on small screens |
| Theme toggle during sound playback doesn't update currently-playing sound | Volume changes only affect *future* `play()` calls; acceptable for short UI sounds |

## Migration Plan

1. Create `AudioManager` class and `AudioManagerContext` + `useAudioManager` hook
2. Add CSS variables for slider colors and volume button styles to `index.css`
3. Create `VolumeControlButton.jsx` and `VolumeSlidersPanel.jsx` components with inline SVGs
4. Wrap App with `AudioManagerProvider` in `main.jsx` or `App.jsx`
5. Refactor `PageTurn.jsx` to use `useAudioManager`
6. Refactor `useDraggableSwitch.js` to use `useAudioManager`
7. Add `VolumeControlButton` to `App.jsx` (fixed position, outside scroll container)
8. Test: volume persistence, theme switching, sound registration, slider interaction
9. Deploy

## Open Questions

- Should the volume panel close on Escape key? (Accessibility enhancement, can add later)
- Should there be a visual tooltip on hover for the volume button? (Nice-to-have, can add later)
- Exact SVG paths for speaker/muted icons? (Will use standard Material Design / Lucide-style icons during implementation)