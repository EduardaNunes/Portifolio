export const DEFAULT_LANGUAGE = 'pt'

/**
 * Translation keys for marker navigation zones
 */
export const NAVIGATION_ZONES = {
  LEFT_MARKER_BUFFER: 'leftMarkerBuffer',      // Left sidebar tooltip hover zone
  RIGHT_MARKER_BUFFER: 'rightMarkerBuffer',    // Right category tabs hover zone
  CORNER_NAV_LEFT: 'cornerNavLeft',           // Bottom-left corner click zone label
  CORNER_NAV_RIGHT: 'cornerNavRight',         // Bottom-right corner click zone label
}

export const translations = {
  pt: {
    htmlLang: 'pt-BR',
    switchHint: ['Ei! psiu', 'Me puxa aqui ó'],
    profileHint: 'Clique aqui!',
    greeting: 'Opa, bão? Meu nome é ',
    name: 'Eduarda Nunes',
    roleIntro: 'E sou',
    role: 'Engenheira de Software Trainee',
    playTitle: 'Clique no Start',
    playSubtitle: 'Para conhecer mais sobre mim e o meu trabalho :)',
    playButton: 'start',

    // Notebook UI copy (page chrome, actions and generated labels)
    notebook: {
      previous: 'Página anterior',
      next: 'Próxima página',
      sectionsLabel: 'Seções do caderno',
      message: 'Enviar mensagem',
      techStack: 'Tech Stack',
      viewSource: 'Ver código fonte',
      deploy: 'Ver deploy',
      demo: 'Ver demo',
      noThumbnail: 'Nenhum thumbnail disponível',
      emptyCategory: 'Nenhum projeto nesta categoria',
      currentPosition: 'atual',
      projectCountSuffix: 'projeto(s)',
    },

    // Navigation zones labels (bottom corners)
    cornerNavLeft: 'Página anterior',
    cornerNavRight: 'Próxima página',

    // Tooltip messages for markers
    leftMarkerTooltip: '(Clique para ver)',
    rightCategoryTooltip: '(Categoria selecionada)',
  },
  eng: {
    htmlLang: 'en',
    switchHint: ['Hey', 'Grab me!'],
    profileHint: 'Click me!',
    greeting: 'Hey! My Name is ',
    name: 'Eduarda Nunes',
    roleIntro: "I'm a",
    role: 'Software Engineer Trainee',
    playTitle: 'Click on Start',
    playSubtitle: 'To discover more about me and my work :)',
    playButton: 'start',

    // Notebook UI copy (page chrome, actions and generated labels)
    notebook: {
      previous: 'Previous page',
      next: 'Next page',
      sectionsLabel: 'Notebook sections',
      message: 'Send message',
      techStack: 'Tech Stack',
      viewSource: 'View source code',
      deploy: 'View deployment',
      demo: 'View demo',
      noThumbnail: 'No thumbnail available',
      emptyCategory: 'No projects in this category',
      currentPosition: 'present',
      projectCountSuffix: 'project(s)',
    },

    // Navigation zones labels (bottom corners)
    cornerNavLeft: 'Previous page',
    cornerNavRight: 'Next page',

    // Tooltip messages for markers
    leftMarkerTooltip: '(Click to view)',
    rightCategoryTooltip: '(Selected category)',
  },
}
