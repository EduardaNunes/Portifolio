/**
 * Conteúdo localizado das páginas do notebook.
 * Cada idioma expõe as mesmas chaves para que o App possa trocar pt/eng
 * sem alterar os componentes.
 */
export const profileData = {
  pt: {
    sections: {
      about: 'Sobre Mim',
      career: 'Carreira',
      studies: 'Estudos',
      projects: 'Projetos',
      contact: 'Contato',
    },
    labels: {
      about: {
        skills: 'Habilidades Técnicas',
        softSkills: 'Habilidades Interpessoais',
        results: 'Resultados Profissionais',
      },
      career: {
        timeline: 'Trajetória Profissional',
        goals: 'Objetivos Futuros',
      },
      studies: {
        education: 'Formação Acadêmica',
        courses: 'Cursos',
        projects: 'Projetos Acadêmicos',
      },
      project: {
        techStack: 'Tech Stack',
        viewSource: 'Ver código fonte',
        deploy: 'Ver deploy',
        demo: 'Ver demo',
        noThumbnail: 'Nenhum thumbnail disponível',
      },
      contact: {
        message: 'Enviar mensagem',
      },
      ui: {
        previous: 'Página anterior',
        next: 'Próxima página',
        emptyCategory: 'Nenhum projeto nesta categoria',
      },
    },
    about: {
      heading: 'Sobre Mim',
      skills: [
        { name: 'Frontend', tags: ['React', 'Vite', 'CSS', 'HTML', 'JavaScript'] },
        { name: 'Ferramentas', tags: ['Git', 'GitHub', 'Figma'] },
      ],
      softSkills: [
        { name: 'Comunicação', description: 'Clareza para explicar decisões técnicas e trocar feedback.' },
        { name: 'Colaboração', description: 'Trabalho em equipe com revisão de código e pair programming.' },
        { name: 'Resolução de problemas', description: 'Investigação de bugs com foco em causa raiz.' },
        { name: 'Aprendizado contínuo', description: 'Estudo constante de novas ferramentas e padrões.' },
      ],
      results: [
        {
          title: 'Portfólio publicado',
          description: 'Aplicação React com tema claro/escuro, internacionalização e navegação em notebook.',
          link: 'https://github.com/eduardanunes/portfolio',
        },
        {
          title: 'Projetos open source',
          description: 'Repositórios de automação, jogos e APIs disponíveis no GitHub.',
          link: 'https://github.com/eduardanunes',
        },
      ],
    },
    career: {
      heading: 'Carreira',
      currentRole: 'Engenheira de Software Trainee, com foco em frontend e automações.',
      timeline: [
        {
          title: 'Engenheira de Software Trainee',
          company: 'Projeto pessoal / Transição de carreira',
          duration: '2024 — atual',
          description: 'Desenvolvimento de interfaces React, automações em Python e APIs Node.js.',
        },
        {
          title: 'Estagiária de Desenvolvimento',
          company: 'Projetos acadêmicos',
          duration: '2023 — 2024',
          description: 'Implementação de jogos em Canvas e aplicações web com foco em acessibilidade.',
        },
      ],
      goals: [
        'Concluir mestrado em Engenharia de Software',
        'Obter certificações avançadas em Cloud Computing',
        'Liderar projetos de automação de ponta a ponta',
      ],
    },
    studies: {
      heading: 'Estudos',
      education: [
        {
          institution: 'Universidade',
          degree: 'Engenharia de Software',
          dates: '2022 — atual',
          description: 'Foco em desenvolvimento web, algoritmos e engenharia de requisitos.',
        },
      ],
      courses: [
        { name: 'React Developer', provider: 'Coursera', completion: true },
        { name: 'Node.js Fundamentals', provider: 'Udemy', completion: true },
        { name: 'AWS Solutions Architect', provider: 'AWS', completion: false },
      ],
      projects: [
        {
          title: 'Pesquisa em acessibilidade web',
          description: 'Estudo de boas práticas de navegação por teclado em aplicações React.',
          link: 'https://github.com/eduardanunes',
        },
      ],
    },
    contact: {
      heading: 'Contato',
      linkedinUrl: 'https://www.linkedin.com/in/eduardanunes',
      githubUrl: 'https://github.com/eduardanunes',
      email: 'contato@eduardanunes.dev',
      socialLinks: [],
    },
  },
  eng: {
    sections: {
      about: 'About Me',
      career: 'Career',
      studies: 'Studies',
      projects: 'Projects',
      contact: 'Contact',
    },
    labels: {
      about: {
        skills: 'Technical Skills',
        softSkills: 'Soft Skills',
        results: 'Professional Results',
      },
      career: {
        timeline: 'Professional Timeline',
        goals: 'Future Goals',
      },
      studies: {
        education: 'Academic Background',
        courses: 'Courses',
        projects: 'Academic Projects',
      },
      project: {
        techStack: 'Tech Stack',
        viewSource: 'View source code',
        deploy: 'View deployment',
        demo: 'View demo',
        noThumbnail: 'No thumbnail available',
      },
      contact: {
        message: 'Send message',
      },
      ui: {
        previous: 'Previous page',
        next: 'Next page',
        emptyCategory: 'No projects in this category',
      },
    },
    about: {
      heading: 'About Me',
      skills: [
        { name: 'Frontend', tags: ['React', 'Vite', 'CSS', 'HTML', 'JavaScript'] },
        { name: 'Tools', tags: ['Git', 'GitHub', 'Figma'] },
      ],
      softSkills: [
        { name: 'Communication', description: 'Clear explanations of technical decisions and feedback.' },
        { name: 'Collaboration', description: 'Teamwork with code review and pair programming.' },
        { name: 'Problem solving', description: 'Bug investigation focused on root cause.' },
        { name: 'Continuous learning', description: 'Constant study of new tools and patterns.' },
      ],
      results: [
        {
          title: 'Published portfolio',
          description: 'React app with light/dark theme, internationalization and notebook navigation.',
          link: 'https://github.com/eduardanunes/portfolio',
        },
        {
          title: 'Open source projects',
          description: 'Automation, games and API repositories available on GitHub.',
          link: 'https://github.com/eduardanunes',
        },
      ],
    },
    career: {
      heading: 'Career',
      currentRole: 'Software Engineer Trainee focused on frontend and automation.',
      timeline: [
        {
          title: 'Software Engineer Trainee',
          company: 'Personal project / Career transition',
          duration: '2024 — present',
          description: 'Building React interfaces, Python automations and Node.js APIs.',
        },
        {
          title: 'Development Intern',
          company: 'Academic projects',
          duration: '2023 — 2024',
          description: 'Implemented Canvas games and accessible web applications.',
        },
      ],
      goals: [
        'Complete a master’s degree in Software Engineering',
        'Earn advanced Cloud Computing certifications',
        'Lead end-to-end automation projects',
      ],
    },
    studies: {
      heading: 'Studies',
      education: [
        {
          institution: 'University',
          degree: 'Software Engineering',
          dates: '2022 — present',
          description: 'Focus on web development, algorithms and requirements engineering.',
        },
      ],
      courses: [
        { name: 'React Developer', provider: 'Coursera', completion: true },
        { name: 'Node.js Fundamentals', provider: 'Udemy', completion: true },
        { name: 'AWS Solutions Architect', provider: 'AWS', completion: false },
      ],
      projects: [
        {
          title: 'Web accessibility research',
          description: 'Study of keyboard navigation best practices in React applications.',
          link: 'https://github.com/eduardanunes',
        },
      ],
    },
    contact: {
      heading: 'Contact',
      linkedinUrl: 'https://www.linkedin.com/in/eduardanunes',
      githubUrl: 'https://github.com/eduardanunes',
      email: 'contato@eduardanunes.dev',
      socialLinks: [],
    },
  },
}
