import { useCallback, useEffect, useRef, useState } from 'react'
import { SWITCH_SOUND_URL } from '../data/constants'

const RESTING_TOP = -50 // px, posição de repouso do interruptor
const MAX_PULL = 70 // px, o quanto dá para puxar para baixo
const TOGGLE_PULL = 50 // px, puxão mínimo para acionar

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function playSwitchSound() {
  new Audio(SWITCH_SOUND_URL).play().catch(() => {
    /* o navegador pode bloquear áudio; o tema deve mudar mesmo assim */
  })
}

/**
 * Controla o arrasto vertical do interruptor.
 * Ao soltar após puxar o suficiente, chama `onToggle` e volta ao repouso.
 */
export function useDraggableSwitch(onToggle) {
  const [top, setTop] = useState(RESTING_TOP)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const pull = useRef(0)

  const startDragging = useCallback((event) => {
    startY.current = event.clientY
    pull.current = 0
    setIsDragging(true)
  }, [])

  useEffect(() => {
    if (!isDragging) return undefined

    const handleMove = (event) => {
      pull.current = clamp(event.clientY - startY.current, 0, MAX_PULL)
      setTop(RESTING_TOP + pull.current)
    }

    const handleRelease = () => {
      if (pull.current >= TOGGLE_PULL) {
        onToggle()
        playSwitchSound()
      }
      setIsDragging(false)
      setTop(RESTING_TOP)
    }

    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleRelease)
    document.body.style.cursor = 'grabbing'

    return () => {
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleRelease)
      document.body.style.cursor = ''
    }
  }, [isDragging, onToggle])

  return { top, startDragging }
}
