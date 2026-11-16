import { useMemo, useRef, useState } from 'react'
import Clouds from './components/Clouds'
import HeaderText from './components/HeaderText'
import LightSwitch from './components/LightSwitch'
import ProfileGroup from './components/ProfileGroup'
import Notebook from './components/narrative-notebook-component/NarrativeNotebook'
import { useLanguage } from './hooks/useLanguage'
import { useSectionSnap } from './hooks/useSectionSnap'
import { useTheme } from './hooks/useTheme'
import { profileData } from './data/profile'
import { CATEGORIES, projects } from './data/projects'
import { buildNotebookPages } from './utils/buildNotebookPages'
import { scrollToSection } from './utils/scrollToSection'

export default function App() {
  const { isLightMode, toggleTheme } = useTheme()
  const { texts, language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)
  const scrollRef = useRef(null)

  useSectionSnap(scrollRef)

  const content = profileData[language]

  const spreads = useMemo(
    () => buildNotebookPages({ content, projects, activeCategory }),
    [content, activeCategory],
  )

  const sections = useMemo(
    () => [
      { id: 'about', label: content.sections.about, accent: '#3f8f92' },
      { id: 'career', label: content.sections.career, accent: '#b8763c' },
      { id: 'studies', label: content.sections.studies, accent: '#7c68b5' },
      { id: 'projects', label: content.sections.projects, accent: '#bc8a2f' },
      { id: 'contact', label: content.sections.contact, accent: '#4f8a63' },
    ],
    [content],
  )

  const categories = useMemo(
    () =>
      CATEGORIES.map((categoryId) => ({
        id: categoryId,
        label: categoryId,
        count: projects.filter((project) => project.categoryId === categoryId).length,
      })),
    [],
  )

  const openNotebook = () => {
    setIsOpen(true)
    requestAnimationFrame(() => {
      scrollToSection(document.getElementById('notebook-section'))
    })
  }

  return (
    <div className="app-scroll" ref={scrollRef}>
      <section className="hero-section" data-snap-section>
        <nav>
          <LightSwitch hint={texts.switchHint} onToggle={toggleTheme} />
        </nav>

        <header className="flex-row">
          <ProfileGroup
            hint={texts.profileHint}
            onClick={toggleLanguage}
            isLightMode={isLightMode}
          />
          <HeaderText texts={texts} onPlay={openNotebook} />
        </header>

        <Clouds />
      </section>

      <Notebook
        spreads={spreads}
        sections={sections}
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        isOpen={isOpen}
        previousLabel={content.labels.ui.previous}
        nextLabel={content.labels.ui.next}
        sectionsLabel={content.labels.ui.sectionsLabel}
        emptyCategoryLabel={content.labels.ui.emptyCategory}
      />
    </div>
  )
}
