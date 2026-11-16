import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import audioManager from '../utils/audioManager';

const AudioManagerContext = createContext(null);

/**
 * Provider component that initializes the AudioManager singleton
 * and exposes it via React Context.
 */
export function AudioManagerProvider({ children }) {
  // State that updates when volumes change, triggering re-renders
  const [volumes, setVolumes] = useState(() => audioManager.getAllVolumes());
  const [muted, setMuted] = useState(() => audioManager.isMuted());

  useEffect(() => {
    // Subscribe to volume changes to update state
    const unsubscribe = audioManager.subscribe((newVolumes, newMuted) => {
      setVolumes(newVolumes);
      setMuted(newMuted);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({
    registerSound: (id, url, category) => audioManager.registerSound(id, url, category),
    unregisterSound: (id) => audioManager.unregisterSound(id),
    play: (id) => audioManager.play(id),
    setVolume: (category, value) => audioManager.setVolume(category, value),
    getVolume: (category) => audioManager.getVolume(category),
    getAllVolumes: () => volumes,
    isMuted: () => muted,
  }), [volumes, muted]);

  return (
    <AudioManagerContext.Provider value={value}>
      {children}
    </AudioManagerContext.Provider>
  );
}

/**
 * Hook to access the AudioManager functionality
 * @returns {Object} Audio manager methods
 */
export function useAudioManager() {
  const context = useContext(AudioManagerContext);
  if (!context) {
    throw new Error('useAudioManager must be used within an AudioManagerProvider');
  }
  return context;
}

export default AudioManagerContext;