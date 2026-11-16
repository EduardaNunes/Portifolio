import { useAudioManager } from '../context/AudioManagerContext';

/**
 * Volume Sliders Panel - Expandable panel with two volume sliders
 * Background Music (disabled) and Sound Effects (controllable)
 */
export default function VolumeSlidersPanel({ isOpen, onClose }) {
  const { getAllVolumes, setVolume, isMuted } = useAudioManager();
  const volumes = getAllVolumes();
  const muted = isMuted();

  // Handle click outside to close panel
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle Escape key
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="volume-sliders-panel is-open"
      role="dialog"
      aria-label="Volume controls"
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
    >
      <div className="volume-slider-group">
        <div className="volume-slider-label">
          <span>Background Music</span>
          <span className="volume-slider-value">{Math.round(volumes.music * 100)}%</span>
        </div>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volumes.music}
          onChange={(e) => setVolume('music', parseFloat(e.target.value))}
          disabled
          aria-label="Background Music volume"
          aria-disabled="true"
        />
      </div>

      <div className="volume-slider-group">
        <div className="volume-slider-label">
          <span>Sound Effects</span>
          <span className="volume-slider-value">{Math.round(volumes.sfx * 100)}%</span>
        </div>
        <input
          type="range"
          className="volume-slider"
          min="0"
          max="1"
          step="0.01"
          value={volumes.sfx}
          onChange={(e) => setVolume('sfx', parseFloat(e.target.value))}
          aria-label="Sound Effects volume"
        />
      </div>
    </div>
  );
}