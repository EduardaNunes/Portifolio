import { useDraggableSwitch } from '../hooks/useDraggableSwitch'
import { useAudioManager } from '../context/AudioManagerContext'
import { SWITCH_SOUND_URL } from '../data/constants'
import { useEffect, useRef } from 'react'

export default function LightSwitch({ hint, onToggle }) {
  const { registerSound, unregisterSound } = useAudioManager()
  const playSwitchSoundRef = useRef(null)

  // Register theme toggle sound effect
  useEffect(() => {
    playSwitchSoundRef.current = registerSound('theme-toggle', SWITCH_SOUND_URL, 'sfx')
    return () => unregisterSound('theme-toggle')
  }, [registerSound, unregisterSound])

  const { top, startDragging } = useDraggableSwitch(onToggle, () => {
    if (playSwitchSoundRef.current) {
      playSwitchSoundRef.current()
    }
  })

  return (
    <div className="light-switch-group flex-row">
      <div className="switch-text flex-column">
        {hint.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <img alt="Arrow pointing to light switch" />
      </div>

      <img
        className="light-dark-switch"
        alt="Light Switch"
        style={{ top }}
        draggable={false}
        onPointerDown={startDragging}
      />
    </div>
  )
}
