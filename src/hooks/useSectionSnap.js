/**
 * useSectionSnap
 *
 * Reuses the Play button's smooth section scroll for the mouse wheel. A gesture
 * moves exactly one section up or down; trackpad inertia is absorbed by a lock.
 * When the pointer is over a notebook leaf that can still scroll in the wheel
 * direction, the leaf keeps the native scroll and the section only changes once
 * the leaf reaches its edge.
 *
 * @param {React.RefObject<HTMLElement>} containerRef Scroll container (.app-scroll)
 */
import { useEffect, useRef } from 'react'
import { scrollToSection } from '../utils/scrollToSection'

const WHEEL_THRESHOLD = 40
const GESTURE_IDLE_MS = 140
const UNLOCK_FALLBACK_MS = 900

function normalizeWheelDelta(event) {
  const factor =
    event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1
  return event.deltaY * factor
}

function getSections(scroller) {
  return Array.from(scroller.querySelectorAll('[data-snap-section]'))
}

function getCurrentSectionIndex(scroller, sections) {
  if (sections.length === 0) return -1

  return sections.reduce((closest, section, index) => {
    const distance = Math.abs(section.offsetTop - scroller.scrollTop)
    const closestDistance = Math.abs(sections[closest].offsetTop - scroller.scrollTop)
    return distance < closestDistance ? index : closest
  }, 0)
}

function leafCanScroll(leaf, delta) {
  if (!leaf) return false
  if (delta > 0) return leaf.scrollTop + leaf.clientHeight < leaf.scrollHeight - 1
  return leaf.scrollTop > 1
}

export function useSectionSnap(containerRef) {
  const lockedRef = useRef(false)

  useEffect(() => {
    const scroller = containerRef.current
    if (!scroller) return undefined

    const gesture = { delta: 0, timer: null }
    let unlockTimer = null
    let scrollEndHandler = null

    const clearGesture = () => {
      gesture.delta = 0
      if (gesture.timer) {
        window.clearTimeout(gesture.timer)
        gesture.timer = null
      }
    }

    const unlock = () => {
      lockedRef.current = false
      if (unlockTimer) {
        window.clearTimeout(unlockTimer)
        unlockTimer = null
      }
      if (scrollEndHandler) {
        scroller.removeEventListener('scrollend', scrollEndHandler)
        scrollEndHandler = null
      }
    }

    const scheduleUnlock = () => {
      unlock()
      lockedRef.current = true

      if ('onscrollend' in scroller) {
        scrollEndHandler = () => {
          scrollEndHandler = null
          unlock()
        }
        scroller.addEventListener('scrollend', scrollEndHandler, { once: true })
      }

      unlockTimer = window.setTimeout(unlock, UNLOCK_FALLBACK_MS)
    }

    const handleWheel = (event) => {
      if (event.ctrlKey || event.defaultPrevented) return

      const delta = normalizeWheelDelta(event)
      if (delta === 0) return

      // Ignore wheel events produced while a section transition is running.
      if (lockedRef.current) {
        event.preventDefault()
        return
      }

      const target = event.target instanceof Element ? event.target : null
      const leaf = target?.closest('.notebook-leaf')

      // Let a long leaf scroll natively until it reaches its edge.
      if (leaf && leafCanScroll(leaf, delta)) {
        clearGesture()
        return
      }

      const sections = getSections(scroller)
      const currentIndex = getCurrentSectionIndex(scroller, sections)
      if (currentIndex < 0) return

      const targetIndex = currentIndex + (delta > 0 ? 1 : -1)
      if (targetIndex < 0 || targetIndex >= sections.length) return

      if (Math.sign(gesture.delta) !== Math.sign(delta)) gesture.delta = 0
      gesture.delta += delta

      if (gesture.timer) window.clearTimeout(gesture.timer)
      gesture.timer = window.setTimeout(() => {
        gesture.delta = 0
        gesture.timer = null
      }, GESTURE_IDLE_MS)

      // Do not let the native wheel move the page before the gesture is clear.
      event.preventDefault()

      if (Math.abs(gesture.delta) < WHEEL_THRESHOLD) return

      clearGesture()
      scheduleUnlock()
      scrollToSection(sections[targetIndex])
    }

    scroller.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      scroller.removeEventListener('wheel', handleWheel)
      clearGesture()
      unlock()
    }
  }, [containerRef])
}
