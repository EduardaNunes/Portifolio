/**
 * Project data structure for NarrativeNotebook component
 * Each project has: id, title, description, tech stack tags, repo link,
 * thumbnailUrl, deployUrl, categoryId
 */

export const PROJECT_CATEGORIES = {
  IA_AUTOMACAOES: 'IA e Automações',
  JOGOS: 'Jogos',
  WEBDEV: 'WebDev',
  BACKEND: 'BackEnd',
}

/**
 * Categories for project filtering (right sidebar in Projects section)
 */
export const CATEGORIES = Object.values(PROJECT_CATEGORIES)

/**
 * All projects with their category assignments
 */
export const projects = [
  // IA e Automações
  {
    id: 'proj-automation-1',
    title: 'Automatização de Planilhas',
    description: 'Automação de planilhas com Python que gera relatórios mensais automaticamente, economizando horas de trabalho manual.',
    techStack: ['Python', 'OpenPyXL', 'Pandas'],
    repoLink: 'https://github.com/eduardanunes/portfolio-automation',
    thumbnailUrl: '/images/projects/automation-spreadsheet.png',
    deployUrl: 'https://automatizacao-planilhas.vercel.app',
    categoryId: PROJECT_CATEGORIES.IA_AUTOMACAOES,
  },
  {
    id: 'proj-automation-2',
    title: 'Chatbot Atendimento',
    description: 'Chatbot para atendimento ao cliente usando NLP e integração com WhatsApp Business API.',
    techStack: ['Python', 'Chatterbot', 'Twilio'],
    repoLink: 'https://github.com/eduardanunes/portfolio-chatbot',
    thumbnailUrl: '/images/projects/chatbot-whatsapp.png',
    deployUrl: 'https://chatbot-atendimento.vercel.app',
    categoryId: PROJECT_CATEGORIES.IA_AUTOMACAOES,
  },

  // Jogos
  {
    id: 'proj-games-1',
    title: 'Snake Game Clone',
    description: 'Jogo clássico Snake desenvolvido com HTML5 Canvas e JavaScript, com pontuação e livescore.',
    techStack: ['JavaScript', 'HTML5 Canvas', 'CSS3'],
    repoLink: 'https://github.com/eduardanunes/portfolio-snake',
    thumbnailUrl: '/images/projects/snake-game.png',
    deployUrl: 'https://snake-game.vercel.app',
    categoryId: PROJECT_CATEGORIES.JOGOS,
  },
  {
    id: 'proj-games-2',
    title: 'Memory Card Game',
    description: 'Jogo de memória para treinar concentração, com tempo e placar acumulados.',
    techStack: ['JavaScript', 'CSS3'],
    repoLink: 'https://github.com/eduardanunes/portfolio-memory',
    thumbnailUrl: '/images/projects/memory-game.png',
    deployUrl: 'https://memory-game.vercel.app',
    categoryId: PROJECT_CATEGORIES.JOGOS,
  },

  // WebDev
  {
    id: 'proj-web-1',
    title: 'Portfolio Personalizado',
    description: 'Portfólio web com tema escuro/claro e animações de nuvens no header.',
    techStack: ['React', 'Vite', 'CSS'],
    repoLink: 'https://github.com/eduardanunes/portfolio',
    thumbnailUrl: '/images/projects/portfolio-web.png',
    deployUrl: 'https://portfolio-eduarda.vercel.app',
    categoryId: PROJECT_CATEGORIES.WEBDEV,
  },

  // BackEnd
  {
    id: 'proj-backend-1',
    title: 'API Node.js RESTful',
    description: 'API REST com CRUD completo usando Express e MongoDB.',
    techStack: ['Node.js', 'Express', 'MongoDB'],
    repoLink: 'https://github.com/eduardanunes/portfolio-api',
    thumbnailUrl: '/images/projects/api-nodejs.png',
    deployUrl: 'https://api-backend.vercel.app',
    categoryId: PROJECT_CATEGORIES.BACKEND,
  },
]

/**
 * Helper function to get projects by category
 */
export const getProjectsByCategory = (categoryId) => {
  return projects.filter((p) => p.categoryId === categoryId)
}

/**
 * Helper function to get all categories with their project count
 */
export const getCategorizedProjects = () => {
  return CATEGORIES.map((category) => ({
    name: category,
    id: PROJECT_CATEGORIES[category.split(' ')[0]],
    projects: getProjectsByCategory(PROJECT_CATEGORIES[category.split(' ')[0]]),
  }))
}

/**
 * Helper function to get a single project by ID
 */
export const getProjectById = (id) => {
  return projects.find((p) => p.id === id) || null
}
