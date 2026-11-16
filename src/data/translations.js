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
    playTitle: 'Clique no Play',
    playSubtitle: 'Para conhecer mais sobre mim e o meu trabalho :)',
    playButton: 'Play',

    // Navigation markers and labels (left sidebar)
    navigationMarkers: {
      sobreMim: 'Sobre Mim',
      carreira: 'Carreira',
      estudos: 'Estudos',
      projetos: 'Projetos',
      contato: 'Contato',
    },

    // Navigation markers and labels (right category tabs for Projects section)
    projectCategories: {
      IA_AUTOMACAOES: 'IA e Automações',
      JOGOS: 'Jogos',
      WEBDEV: 'WebDev',
      BACKEND: 'BackEnd',
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
    playTitle: 'Click on Play',
    playSubtitle: 'To discover more about me and my work :)',
    playButton: 'Play',

    // Navigation markers and labels (left sidebar)
    navigationMarkers: {
      sobreMim: 'About Me',
      carreira: 'Career',
      estudos: 'Studies',
      projetos: 'Projects',
      contato: 'Contact',
    },

    // Navigation markers and labels (right category tabs for Projects section)
    projectCategories: {
      IA_AUTOMACAOES: 'IA e Automações',
      JOGOS: 'Jogos',
      WEBDEV: 'WebDev',
      BACKEND: 'BackEnd',
    },

    // Navigation zones labels (bottom corners)
    cornerNavLeft: 'Previous page',
    cornerNavRight: 'Next page',

    // Tooltip messages for markers
    leftMarkerTooltip: '(Click to view)',
    rightCategoryTooltip: '(Selected category)',
  },
}
