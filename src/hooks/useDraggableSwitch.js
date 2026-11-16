import { useCallback, useEffect, useRef, useState } from 'react'

const RESTING_TOP = -50 // px, posição de repouso do interruptor
const MAX_PULL = 70 // px, o quanto dá para puxar para baixo
const TOGGLE_PULL = 50 // px, puxão mínimo para acionar

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Controla o arrasto vertical do interruptor.
 * Ao soltar após puxar o suficiente, chama `onToggle` e `onToggleSound` (se fornecido), e volta ao repouso.
 * @param {Function} onToggle - Callback quando o toggle é acionado
 * @param {Function} [onToggleSound] - Callback opcional para tocar som do toggle
 */
export function useDraggableSwitch(onToggle, onToggleSound) {
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
        if (onToggleSound) {
          onToggleSound()
        }
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
  }, [isDragging, onToggle, onToggleSound])

  return { top, startDragging }
}
