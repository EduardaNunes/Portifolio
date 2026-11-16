import { useMemo, useState } from 'react'
import Clouds from './components/Clouds'
import HeaderText from './components/HeaderText'
import LightSwitch from './components/LightSwitch'
import ProfileGroup from './components/ProfileGroup'
import Notebook from './components/narrative-notebook-component/NarrativeNotebook'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'
import { profileData } from './data/profile'
import { CATEGORIES, projects } from './data/projects'
import { buildNotebookPages } from './utils/buildNotebookPages'

export default function App() {
  const { isLightMode, toggleTheme } = useTheme()
  const { texts, language, toggleLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null)

  const content = profileData[language]

  const pages = useMemo(
    () => buildNotebookPages({ content, projects, activeCategory }),
    [content, activeCategory],
  )

  const sections = useMemo(
    () => [
      { id: 'about', label: content.sections.about },
      { id: 'career', label: content.sections.career },
      { id: 'studies', label: content.sections.studies },
      { id: 'projects', label: content.sections.projects },
      { id: 'contact', label: content.sections.contact },
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
      document.getElementById('notebook-section')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="app-scroll">
      <section className="hero-section">
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
        pages={pages}
        sections={sections}
        categories={categories}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
        isOpen={isOpen}
        previousLabel={content.labels.ui.previous}
        nextLabel={content.labels.ui.next}
        emptyCategoryLabel={content.labels.ui.emptyCategory}
      />
    </div>
  )
}
