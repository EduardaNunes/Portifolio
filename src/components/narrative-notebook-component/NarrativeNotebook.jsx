import { useCallback, useEffect, useRef, useState } from 'react'
import NotebookTab from './NotebookTab'
import PageTurn from './PageTurn'

const TURN_DURATION = 420

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

/** Renders marker tabs and a globally navigable sequence of their page pairs. */
export default function NarrativeNotebook({
  spreads = [],
  markers = [],
  isOpen = false,
  onNavigation,
  previousLabel = 'Previous page',
  nextLabel = 'Next page',
  sectionsLabel = 'Notebook sections',
}) {
  const [currentSpread, setCurrentSpread] = useState(0)
  const [turn, setTurn] = useState(null)
  const [pendingMarkerId, setPendingMarkerId] = useState(null)
  const turningRef = useRef(false)
  const totalSpreads = spreads.length
  const safeSpread = totalSpreads ? Math.min(currentSpread, totalSpreads - 1) : 0
  const current = spreads[safeSpread]
  const effectiveMarkerId = pendingMarkerId ?? current?.markerId
  const currentMarker = markers.find((marker) => marker.id === effectiveMarkerId)
  const leftMarkers = markers.filter((marker) => marker.side === 'left')
  const rightMarkers = markers.filter((marker) => marker.side === 'right')
  const currentLabel = currentMarker?.label ?? ''

  const commitSpread = useCallback((index) => {
    setCurrentSpread(index)
    onNavigation?.(index)
  }, [onNavigation])

  const goToSpread = useCallback((index) => {
    if (!totalSpreads || turningRef.current) return
    let target = Math.max(0, Math.min(index, totalSpreads - 1))
    // Skip projects marker (0 pages) when navigating forward/backward
    if (shouldSkipProjects()) {
      // Find next non-projects marker
      const direction = index > safeSpread ? 1 : -1
      let skipTarget = target + direction
      while (skipTarget >= 0 && skipTarget < totalSpreads) {
        const skipMarkerId = spreads[skipTarget]?.markerId
        if (skipMarkerId && skipMarkerId !== 'projects') {
          target = skipTarget
          break
        }
        skipTarget += direction
      }
    }
    if (target === safeSpread) return
    const targetMarkerId = spreads[target]?.markerId
    if (targetMarkerId) setPendingMarkerId(targetMarkerId)

    if (prefersReducedMotion()) {
      commitSpread(target)
      setPendingMarkerId(null)
      return
    }

    turningRef.current = true
    setTurn({ from: safeSpread, to: target, direction: target > safeSpread ? 'forward' : 'backward' })
  }, [commitSpread, safeSpread, spreads, totalSpreads])

  const handleTurnFinish = useCallback(() => {
    if (!turn) return
    turningRef.current = false
    commitSpread(turn.to)
    setTurn(null)
    setPendingMarkerId(null)
  }, [commitSpread, turn])

  useEffect(() => {
    setCurrentSpread((index) => Math.min(index, Math.max(0, totalSpreads - 1)))
  }, [totalSpreads])

  const selectMarker = (markerId) => {
    // Special handling for projects marker (0 pages): navigate to first ai-automation spread
    if (markerId === 'projects') {
      const aiIndex = spreads.findIndex((spread) => spread.markerId === 'ai-automation')
      if (aiIndex >= 0) goToSpread(aiIndex)
      return
    }
    const index = spreads.findIndex((spread) => spread.markerId === markerId)
    if (index >= 0) goToSpread(index)
  }

  // Helper: check if marker is the projects marker
  const isProjectsMarker = (marker) => marker.id === 'projects'

  const isMarkerActive = (marker) => {
    if (!currentMarker) return false
    // Projects marker can be active alongside a right-side marker (0 pages skip behavior)
    if (isProjectsMarker(marker) && currentMarker.side === 'right') return true
    // Normal: marker matches current marker
    return marker.id === currentMarker.id
  }

  // Determine if we should skip projects in navigation (0 pages behavior)
  const shouldSkipProjects = () => {
    if (!currentMarker) return false
    return isProjectsMarker(currentMarker) && /* projects has 0 pages when */ true // skip projects always per this change
  }

  if (!isOpen) {
    return <section id="notebook-section" className="notebook-section" data-snap-section><div className="notebook-frame"><div className="notebook-shell is-closed" aria-hidden="true" /></div></section>
  }

  const turnSpreads = turn && spreads[turn.from] && spreads[turn.to] ? { from: spreads[turn.from], to: spreads[turn.to] } : null
  const isForward = turn?.direction === 'forward'
  const baseLeft = turnSpreads ? (isForward ? turnSpreads.from : turnSpreads.to) : current
  const baseRight = turnSpreads ? (isForward ? turnSpreads.to : turnSpreads.from) : current

  const renderMarker = (marker) => (
    <NotebookTab
      key={marker.id}
      side={marker.side}
      icon={marker.icon}
      label={marker.label}
      active={isMarkerActive(marker)}
      accent={marker.accent}
      onSelect={() => selectMarker(marker.id)}
    />
  )

  return (
    <section id="notebook-section" className="notebook-section" data-snap-section>
      <div className="notebook-frame">
        <div className="notebook-shell">
          <div className="notebook-page-stack left" aria-hidden="true" />
          <div className="notebook-page-stack right" aria-hidden="true" />
          <div className="notebook-stage">
            {baseLeft && baseRight && <div className="notebook-spread">
              <div key={`${baseLeft.id}-left`} className="notebook-leaf left">{baseLeft.left}</div>
              <div key={`${baseRight.id}-right`} className="notebook-leaf right">{baseRight.right}</div>
            </div>}
            {turnSpreads && <PageTurn
              key={`${turn.from}-${turn.to}`}
              direction={turn.direction}
              duration={TURN_DURATION}
              onFinish={handleTurnFinish}
              front={<div className="notebook-leaf right">{turnSpreads.to.right}</div>}
              back={<div className="notebook-leaf left">{turnSpreads.from.left}</div>}
            />}
            <button type="button" className="corner-zone left" onClick={() => goToSpread(safeSpread - 1)} aria-label={previousLabel} disabled={safeSpread === 0 || Boolean(turn)} aria-hidden={safeSpread === 0 || Boolean(turn)} />
            <button type="button" className="corner-zone right" onClick={() => goToSpread(safeSpread + 1)} aria-label={nextLabel} disabled={safeSpread >= totalSpreads - 1 || Boolean(turn)} aria-hidden={safeSpread >= totalSpreads - 1 || Boolean(turn)} />
          </div>
        </div>
        <nav className="page-tabs" aria-label={sectionsLabel}>{leftMarkers.map(renderMarker)}</nav>
        <nav className="category-tabs" aria-label={sectionsLabel}>{rightMarkers.map(renderMarker)}</nav>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{currentLabel}</p>
      </div>
    </section>
  )
}
