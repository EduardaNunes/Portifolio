import { useState, useRef, useEffect } from 'react';
import { useAudioManager } from '../context/AudioManagerContext';
import { SpeakerIcon, SpeakerMutedIcon } from './VolumeIcons';
import VolumeSlidersPanel from './VolumeSlidersPanel';

/**
 * Volume Control Button - Fixed button that opens volume sliders panel
 * Icon changes based on mute state and theme
 */
export default function VolumeControlButton() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { getAllVolumes, isMuted } = useAudioManager();
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  const volumes = getAllVolumes();
  const muted = isMuted() || (volumes.music === 0 && volumes.sfx === 0);

  // Toggle panel
  const togglePanel = () => {
    setIsPanelOpen(prev => !prev);
  };

  // Close panel
  const closePanel = () => {
    setIsPanelOpen(false);
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        closePanel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePanel();
    } else if (event.key === 'Escape') {
      closePanel();
    }
  };

  return (
    <div className="volume-control-wrapper" ref={buttonRef}>
      <button
        className="volume-control-button"
        onClick={togglePanel}
        onKeyDown={handleKeyDown}
        aria-label={muted ? 'Unmute' : 'Volume controls'}
        aria-expanded={isPanelOpen}
        aria-haspopup="dialog"
        type="button"
      >
        {muted ? <SpeakerMutedIcon /> : <SpeakerIcon />}
      </button>

      <VolumeSlidersPanel
        ref={panelRef}
        isOpen={isPanelOpen}
        onClose={closePanel}
      />
    </div>
  );
}