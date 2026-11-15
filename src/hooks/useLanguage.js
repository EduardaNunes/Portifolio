import { useEffect, useState } from 'react'
import { DEFAULT_LANGUAGE, translations } from '../data/translations'

export function useLanguage() {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE)
  const texts = translations[language]

  useEffect(() => {
    document.documentElement.lang = texts.htmlLang
  }, [texts])

  const toggleLanguage = () =>
    setLanguage((current) => (current === 'pt' ? 'eng' : 'pt'))

  return { language, texts, toggleLanguage }
}
