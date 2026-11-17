/**
 * Notebook marker registry.
 *
 * Content lives in `pt.json` / `eng.json`; this file owns presentation and
 * navigation order only. `kind` tells the builder whether a marker reads
 * narrative sections, generates the Projects overview, or owns a project list.
 */
export const markerRegistry = [
  { id: 'about', kind: 'narrative', side: 'left', icon: 'about', accent: '#3f8f92' },
  { id: 'career', kind: 'narrative', side: 'left', icon: 'career', accent: '#b8763c' },
  { id: 'studies', kind: 'narrative', side: 'left', icon: 'studies', accent: '#7c68b5' },
  { id: 'projects', kind: 'overview', side: 'left', icon: 'projects', accent: '#bc8a2f' },
  { id: 'ai-automation', kind: 'category', side: 'right', icon: 'ai', accent: '#3f8f92' },
  { id: 'games', kind: 'category', side: 'right', icon: 'games', accent: '#7c68b5' },
  { id: 'webdev', kind: 'category', side: 'right', icon: 'webdev', accent: '#bc8a2f' },
  { id: 'backend', kind: 'category', side: 'right', icon: 'backend', accent: '#4f8a63' },
  { id: 'contact', kind: 'narrative', side: 'left', icon: 'contact', accent: '#4f8a63' },
]
