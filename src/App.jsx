import { useEffect, useMemo, useRef, useState } from 'react'
import Clouds from './components/Clouds'
import HeaderText from './components/HeaderText'
import LightSwitch from './components/LightSwitch'
import ProfileGroup from './components/ProfileGroup'
import Notebook from './components/narrative-notebook-component/NarrativeNotebook'
import VolumeControlButton from './components/VolumeControlButton'
import { useLanguage } from './hooks/useLanguage'
import { useSectionSnap } from './hooks/useSectionSnap'
import { useTheme } from './hooks/useTheme'
import { profileData } from './data/profile'
import { projects } from './data/projects'
import { buildNotebookPages } from './utils/buildNotebookPages'
import { scrollToSection } from './utils/scrollToSection'

export default function App() {
  const { isLightMode, toggleTheme } = useTheme()
  const { texts, language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const scrollRef = useRef(null)

  useSectionSnap(scrollRef, { enabled: isUnlocked })

  useEffect(() => {
    const scroller = scrollRef.current
    if (scroller) scroller.scrollTop = 0
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])

  const content = profileData[language]
  const notebook = useMemo(() => buildNotebookPages({ content, projects }), [content])

  const openNotebook = () => {
    setIsOpen(true)
    setIsUnlocked(true)
    requestAnimationFrame(() => scrollToSection(document.getElementById('notebook-section')))
  }

  return (
    <>
      <VolumeControlButton />
      <div className={`app-scroll${isUnlocked ? '' : ' is-scroll-locked'}`} ref={scrollRef}>
        <section className="hero-section" data-snap-section>
          <nav><LightSwitch hint={texts.switchHint} onToggle={toggleTheme} /></nav>
          <header className="flex-row">
            <ProfileGroup hint={texts.profileHint} onClick={toggleLanguage} isLightMode={isLightMode} />
            <HeaderText texts={texts} onPlay={openNotebook} />
          </header>
          <Clouds />
        </section>
        <Notebook
          markers={notebook.markers}
          spreads={notebook.spreads}
          isOpen={isOpen}
          previousLabel={content.labels.ui.previous}
          nextLabel={content.labels.ui.next}
          sectionsLabel={content.labels.ui.sectionsLabel}
        />
      </div>
    </>
  )
}
