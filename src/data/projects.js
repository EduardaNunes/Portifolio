/**
 * Project data structure for NarrativeNotebook component
 * Each project has: id, title, description, tech stack tags, repo link,
 * thumbnailUrl, deployUrl, categoryId
 *
 * Descrições seguem: problema -> solução -> resultado.
 * Campos opcionais (repoLink, deployUrl) podem ficar de fora.
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

const GITHUB = 'https://github.com/EduardaNunes'

/**
 * All projects with their category assignments
 */
export const projects = [
  // Jogos
  {
    id: 'proj-programadas',
    title: 'ProgramADAs',
    description:
      'Problema: algoritmos são abstratos para quem começa, e poucas mulheres persistem em computação. Solução: RPG universitário em Unity (C#) com minigames que transformam lógica em mecânicas. Resultado: jogo jogável no navegador (WebGL), liderado por mim da ideia ao código.',
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
      'Jogo em JavaScript desenvolvido para a disciplina DCC202 (UFJF). Exercitei estado de jogo, regras e interação no navegador a partir de um repositório-base da turma.',
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
      'Problema: listas de tarefas comuns não mostram constância. Solução: To-Do com login, banco em tempo real e calendário de produtividade. Resultado: formulário único de cadastro/login com animação e dados sincronizados automaticamente no Firebase.',
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
      'Editor de pixel art no navegador, feito em JavaScript puro para treinar manipulação do DOM e eventos de interface.',
    techStack: ['JavaScript', 'HTML', 'CSS'],
    repoLink: `${GITHUB}/Pixel-Paint`,
    thumbnailUrl: '/images/projects/pixel-paint.svg',
    categoryId: PROJECT_CATEGORIES.WEBDEV,
  },
  {
    id: 'proj-portfolio',
    title: 'Portfólio em Caderno',
    description:
      'Portfólio React com tema claro/escuro, PT/EN e navegação em caderno 3D. Aplico acessibilidade (teclado, reduced motion) e design system pixel art próprio.',
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
      'Problema: estudantes têm dificuldade para achar moradia perto da universidade. Solução: app mobile do GET com mapa e preenchimento automático de endereço por CEP. Resultado: autenticação e dados em Supabase, integrados ao Google Maps e ViaCEP.',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Supabase'],
    thumbnailUrl: '/images/projects/student-housing.svg',
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
    id: category,
    projects: getProjectsByCategory(category),
  }))
}

/**
 * Helper function to get a single project by ID
 */
export const getProjectById = (id) => {
  return projects.find((p) => p.id === id) || null
}