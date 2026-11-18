const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(?:[?#]|$)/i

/**
 * Resolves a public asset path against Vite's configured base URL.
 *
 * Absolute external URLs and paths already rooted at the base URL are returned
 * unchanged so callers can safely apply this at more than one render boundary.
 */
export function resolveAssetPath(path, baseUrl = import.meta.env?.BASE_URL ?? '/') {
  if (typeof path !== 'string' || !path.startsWith('/')) return path

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  if (path.startsWith(normalizedBase)) return path

  return `${normalizedBase}${path.slice(1)}`
}

/** Returns whether a path ends in a supported video extension. */
export function isVideoFile(path) {
  return typeof path === 'string' && VIDEO_FILE_PATTERN.test(path)
}
