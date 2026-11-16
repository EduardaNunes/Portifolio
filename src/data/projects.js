/**
 * Project data structure for NarrativeNotebook component
 * Each project has: id, title, description, tech stack tags, repo link,
 * thumbnailUrl, deployUrl, categoryId
 *
 * Descrições seguem: problema -> solução -> resultado.
 * Campos opcionais (repoLink, deployUrl) podem ficar de fora.
 */

export const PROJECT_CATEGORIES = {
  IA_AUTOMACAOES: 'AI & Automations',
  JOGOS: 'Games',
  WEBDEV: 'WebDev',
  BACKEND: 'BackEnd',
}

/**
 * Categories for project filtering (right sidebar in Projects section)
 */
export const CATEGORIES = Object.values(PROJECT_CATEGORIES)

const GITHUB = 'https://github.com/EduardaNunes'

/**
 * All projects with their category assignments
 */
export const projects = [
  // AI & Automations
  {
    id: 'proj-chatbot-whatsapp',
    title: 'Chatbot for WhatsApp',
    description:
      'WhatsApp attendance automation with conversational flows to organize messages and answer recurring questions.',
    techStack: ['JavaScript', 'Node.js', 'WhatsApp API'],
    repoLink: `${GITHUB}/chatbot-whatsapp`,
    thumbnailUrl: '/images/projects/chatbot-whatsapp.svg',
    categoryId: PROJECT_CATEGORIES.IA_AUTOMACAOES,
  },
  {
    id: 'proj-automation-spreadsheet',
    title: 'Spreadsheet Automation',
    description:
      'Spreadsheet automation to transform data, reduce manual work and keep reports updated.',
    techStack: ['Python', 'Pandas', 'Automação'],
    repoLink: `${GITHUB}/automation-spreadsheet`,
    thumbnailUrl: '/images/projects/automation-spreadsheet.svg',
    categoryId: PROJECT_CATEGORIES.IA_AUTOMACAOES,
  },

  // Jogos
  {
    id: 'proj-programadas',
    title: 'ProgramADAs',
    description:
      'Problem: algorithms feel abstract to beginners. Solution: college RPG in Unity (C#) with mini-games that transform logic into mechanics. Result: playable web game (WebGL) led from idea to code.',
    techStack: ['Unity', 'C#', 'WebGL', 'Game Design'],
    repoLink: `${GITHUB}/ProgramADAs-Playtest`,
    thumbnailUrl: '/images/projects/programadas.svg',
    deployUrl: 'https://eduardanunes.github.io/ProgramADAs-Playtest/',
    categoryId: PROJECT_CATEGORIES.JOGOS,
  },
  {
    id: 'proj-esbugalhado',
    title: 'Esbugalhado: o Jogo',
    description:
      'JavaScript game developed for the DCC202 (UFJF) course. Exercised game state, rules and interaction in the browser starting from a base repository from the class.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    repoLink: `${GITHUB}/esbugalhado-o-jogo`,
    thumbnailUrl: '/images/projects/esbugalhado.svg',
    categoryId: PROJECT_CATEGORIES.JOGOS,
  },

  // WebDev
  {
    id: 'proj-productive-tracking',
    title: 'Productive Tracking',
    description:
      "Problem: common to-do lists don't show consistency. Solution: To-Do with real-time database and productivity calendar. Result: single login/form with animation and data automatically synced to Firebase.",
    techStack: ['JavaScript', 'HTML', 'CSS', 'Firebase'],
    repoLink: `${GITHUB}/Productive-Tracking`,
    thumbnailUrl: '/images/projects/productive-tracking.svg',
    deployUrl: 'https://eduardanunes.github.io/Productive-Tracking/',
    categoryId: PROJECT_CATEGORIES.WEBDEV,
  },
  {
    id: 'proj-pixel-paint',
    title: 'Pixel Paint',
    description:
      'Pixel art editor in the browser, made with pure JavaScript to practice DOM manipulation and interface events.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    repoLink: `${GITHUB}/Pixel-Paint`,
    thumbnailUrl: '/images/projects/pixel-paint.svg',
    categoryId: PROJECT_CATEGORIES.WEBDEV,
  },
  {
    id: 'proj-portfolio',
    title: 'Portfólio em Caderno',
    description:
      'React portfolio with light/dark mode, PT/EN, and 3D notebook navigation. Applies accessibility (keyboard, reduced motion) and custom pixel art design system.',
    techStack: ['React', 'Vite', 'CSS', 'Web Animations API'],
    repoLink: `${GITHUB}/Portifolio`,
    thumbnailUrl: '/images/projects/portfolio-web.svg',
    categoryId: PROJECT_CATEGORIES.WEBDEV,
  },

  // BackEnd
  {
    id: 'proj-student-housing',
    title: 'App de Moradia Estudantil',
    description:
      'Problem: students have difficulty finding housing near the university. Solution: mobile app with map and automatic address lookup by CEP. Result: authentication and data in Supabase, integrated with Google Maps and ViaCEP.',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
    thumbnailUrl: '/images/projects/student-housing.svg',
    categoryId: PROJECT_CATEGORIES.BACKEND,
  },
]

/**
 * Helper function to get a single project by ID
 */
export const getProjectById = (id) => {
  return projects.find((p) => p.id === id) || null
}