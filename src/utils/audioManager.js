/**
 * AudioManager - Centralized audio volume management
 * Singleton class that manages sound registration, playback, and volume control
 * per category (music, sfx) with localStorage persistence.
 */

const STORAGE_KEY = 'portfolio-audio-settings';
const DEFAULT_VOLUME = { music: 0, sfx: 1 };

class AudioManager {
  constructor() {
    if (AudioManager.instance) {
      return AudioManager.instance;
    }

    this.sounds = new Map(); // id -> { url, category, audioCache }
    this.volumes = { ...DEFAULT_VOLUME };
    this.listeners = new Set(); // callbacks for volume/mute changes

    this.loadSettings();
    AudioManager.instance = this;
  }

  /**
   * Register a sound with the manager
   * @param {string} id - Unique identifier for the sound
   * @param {string} url - Sound file URL
   * @param {'music'|'sfx'} category - Volume category
   * @returns {Function} play function that creates/clones Audio and plays at current volume
   */
  registerSound(id, url, category) {
    if (this.sounds.has(id)) {
      console.warn(`Sound "${id}" already registered, overwriting`);
    }

    this.sounds.set(id, { url, category, audioCache: null });

    // Return a stable play function bound to this sound
    const play = () => this.play(id);
    return play;
  }

  /**
   * Unregister a sound
   * @param {string} id - Sound identifier
   */
  unregisterSound(id) {
    const sound = this.sounds.get(id);
    if (sound?.audioCache) {
      sound.audioCache.pause();
      sound.audioCache.src = '';
    }
    this.sounds.delete(id);
  }

  /**
   * Play a registered sound
   * @param {string} id - Sound identifier
   * @returns {Promise<void>} Resolves when playback starts
   */
  async play(id) {
    const sound = this.sounds.get(id);
    if (!sound) {
      console.warn(`Sound "${id}" not registered`);
      return;
    }

    try {
      // Clone the audio element to allow overlapping playback
      const audio = new Audio(sound.url);
      audio.volume = this.volumes[sound.category] ?? 1;
      await audio.play();
    } catch (error) {
      // Ignore autoplay/permission errors - browser may block audio until user interaction
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') {
        console.warn(`Failed to play sound "${id}":`, error);
      }
    }
  }

  /**
   * Set volume for a category
   * @param {'music'|'sfx'} category - Volume category
   * @param {number} value - Volume value 0-1
   */
  setVolume(category, value) {
    const clamped = Math.max(0, Math.min(1, value));
    if (this.volumes[category] !== clamped) {
      this.volumes[category] = clamped;
      this.saveSettings();
      this.notifyListeners();
    }
  }

  /**
   * Get volume for a category
   * @param {'music'|'sfx'} category - Volume category
   * @returns {number} Volume value 0-1
   */
  getVolume(category) {
    return this.volumes[category] ?? DEFAULT_VOLUME[category];
  }

  /**
   * Check if effectively muted (both volumes at 0)
   * @returns {boolean}
   */
  isMuted() {
    return this.volumes.music === 0 && this.volumes.sfx === 0;
  }

  /**
   * Get all volumes
   * @returns {{music: number, sfx: number}}
   */
  getAllVolumes() {
    return { ...this.volumes };
  }

  /**
   * Subscribe to volume changes
   * @param {Function} callback - Called when volumes change
   * @returns {Function} Unsubscribe function
   */
  subscribe(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners of volume change
   */
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.getAllVolumes(), this.isMuted());
      } catch (error) {
        console.error('AudioManager listener error:', error);
      }
    });
  }

  /**
   * Load settings from localStorage
   */
  loadSettings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        this.volumes = {
          music: typeof parsed.music === 'number' ? parsed.music : DEFAULT_VOLUME.music,
          sfx: typeof parsed.sfx === 'number' ? parsed.sfx : DEFAULT_VOLUME.sfx,
        };
      }
    } catch (error) {
      console.warn('Failed to load audio settings:', error);
      this.volumes = { ...DEFAULT_VOLUME };
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.volumes));
    } catch (error) {
      console.warn('Failed to save audio settings:', error);
    }
  }

  /**
   * Reset to default volumes
   */
  reset() {
    this.volumes = { ...DEFAULT_VOLUME };
    this.saveSettings();
    this.notifyListeners();
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
export default audioManager;