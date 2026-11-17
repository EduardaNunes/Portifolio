import pt from './pt.json' with { type: 'json' }
import eng from './eng.json' with { type: 'json' }

export const contentByLanguage = { pt, eng }

/** Returns the content document for a language, falling back to Portuguese. */
export function getMarkerContent(language) {
  return contentByLanguage[language] ?? contentByLanguage.pt
}
