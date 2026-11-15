import Clouds from './components/Clouds'
import HeaderText from './components/HeaderText'
import LightSwitch from './components/LightSwitch'
import ProfileGroup from './components/ProfileGroup'
import { useLanguage } from './hooks/useLanguage'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { isLightMode, toggleTheme } = useTheme()
  const { texts, toggleLanguage } = useLanguage()

  return (
    <>
      <nav>
        <LightSwitch hint={texts.switchHint} onToggle={toggleTheme} />
      </nav>

      <header className="flex-row">
        <ProfileGroup
          hint={texts.profileHint}
          onClick={toggleLanguage}
          isLightMode={isLightMode}
        />
        <HeaderText texts={texts} />
      </header>

      <Clouds />
    </>
  )
}
