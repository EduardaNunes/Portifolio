import { useCallback, useEffect, useState } from 'react'
import { THEME_IMAGES } from '../data/themeAssets'

const LIGHT_MODE_CLASS = 'lightmode'

function preloadImages(urls) {
  urls.forEach((url) => {
    new Image().src = url
  })
}

export function useTheme() {
  const [isLightMode, setIsLightMode] = useState(false)

  useEffect(() => {
    preloadImages(THEME_IMAGES)
  }, [])

  useEffect(() => {
    document.body.classList.toggle(LIGHT_MODE_CLASS, isLightMode)
  }, [isLightMode])

  const toggleTheme = useCallback(() => setIsLightMode((current) => !current), [])

  return { isLightMode, toggleTheme }
}
