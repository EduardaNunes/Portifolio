/**
 * PageTurn Component
 *
 * Renders the half-page that physically turns around the notebook spine.
 * `front` is the leaf visible before the turn and `back` is the leaf revealed
 * at the end. The rotation is driven by the Web Animations API so the turn can
 * commit its destination exactly when the leaf lands.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.front Leaf content on the front face
 * @param {React.ReactNode} props.back Leaf content on the back face
 * @param {'forward'|'backward'} props.direction
 * @param {number} [props.duration]
 * @param {Function} props.onFinish Called once the turn is complete
 */
import React, { useEffect, useRef } from 'react'
import { PAGE_TURN_SOUND_URL } from '../../data/constants'
import { useAudioManager } from '../../context/AudioManagerContext'

const TURN_EASING = 'cubic-bezier(0.45, 0, 0.15, 1)'

export default function PageTurn({ front, back, direction, duration = 420, onFinish }) {
  const turnRef = useRef(null)
  const onFinishRef = useRef(onFinish)
  const { registerSound, unregisterSound } = useAudioManager()

  // Register page turn sound effect
  const playPageTurn = useRef(null)
  useEffect(() => {
    playPageTurn.current = registerSound('page-turn', PAGE_TURN_SOUND_URL, 'sfx')
    return () => unregisterSound('page-turn')
  }, [registerSound, unregisterSound])

  useEffect(() => {
    onFinishRef.current = onFinish
  }, [onFinish])

  useEffect(() => {
    const node = turnRef.current
    const finish = () => onFinishRef.current?.()

    if (!node) {
      finish()
      return undefined
    }

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reduced motion: a short crossfade, never a rotation.
    if (prefersReducedMotion) {
      const fade = node.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 120,
        easing: 'ease-out',
        fill: 'both',
      })
      fade.onfinish = finish
      return () => fade.cancel()
    }

    const startAngle = direction === 'backward' ? -180 : 0
    const endAngle = direction === 'backward' ? 0 : -180
    const midAngle = (startAngle + endAngle) / 2

    const animation = node.animate(
      [
        { transform: `rotateY(${startAngle}deg)` },
        {
          transform: `rotateY(${midAngle}deg) translateZ(18px) scaleY(0.985)`,
          offset: 0.5,
        },
        { transform: `rotateY(${endAngle}deg)` },
      ],
      { duration, easing: TURN_EASING, fill: 'both' },
    )
    animation.onfinish = finish

    // Play page turn sound at the start of the animated turn via AudioManager
    if (playPageTurn.current) {
      playPageTurn.current()
    }

    return () => animation.cancel()
  }, [direction, duration])

  return (
    <div
      ref={turnRef}
      className="notebook-turn"
      data-direction={direction}
      aria-hidden="true"
      inert=""
      style={{ transform: `rotateY(${direction === 'backward' ? -180 : 0}deg)` }}
    >
      <div className="notebook-turn-face front">{front}</div>
      <div className="notebook-turn-face back">{back}</div>
    </div>
  )
}
