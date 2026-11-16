/**
 * Conteúdo localizado das páginas do notebook.
 * Cada idioma expõe as mesmas chaves para que o App possa trocar pt/eng
 * sem alterar os componentes.
 *
 * Fonte: currículo (PT/EN) e repositórios públicos de github.com/EduardaNunes.
 * Padrão das descrições: problema -> ação -> resultado. Nenhum número foi
 * inventado; onde houver métrica real (ex.: tempo economizado), acrescente.
 */
const LINKEDIN_URL = 'https://www.linkedin.com/in/eduardapmn'
const GITHUB_URL = 'https://github.com/EduardaNunes'
const EMAIL = 'eduardapmn@gmail.com'
const PLAYTEST_URL = 'https://eduardanunes.github.io/ProgramADAs-Playtest/'

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
        softSkills: 'Como eu trabalho',
        results: 'Resultados',
      },
      career: {
        timeline: 'Trajetória Profissional',
        goals: 'Próximos Passos',
      },
      studies: {
        education: 'Formação Acadêmica',
        courses: 'Conquistas e Cursos',
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
        sectionsLabel: 'Seções do caderno',
      },
    },
    about: {
      heading: 'Sobre Mim',
      skills: [
        { name: 'Linguagens', tags: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'GDScript'] },
        { name: 'Web e Mobile', tags: ['React', 'React Native', 'Expo', 'HTML5', 'CSS3'] },
        { name: 'Dados e APIs', tags: ['Supabase', 'Firebase', 'API REST', 'Google Maps API', 'ViaCEP'] },
        { name: 'Games', tags: ['Unity', 'Godot'] },
        { name: 'Ferramentas', tags: ['Git', 'GitHub'] },
      ],
      softSkills: [
        {
          name: 'Causa raiz',
          description: 'Depuro sistemas em produção até achar a origem do problema, não só o sintoma.',
        },
        {
          name: 'Proatividade',
          description: 'Antecipo necessidades do time e priorizo a experiência de quem usa o produto.',
        },
        {
          name: 'Requisitos em código',
          description: 'Traduzo requisitos corporativos complexos em entregas pequenas, limpas e revisáveis.',
        },
        {
          name: 'Didática',
          description: 'Explico lógica de programação em minicursos e mentorias para colegas.',
        },
      ],
      results: [
        {
          title: 'Do 1º período à liderança técnica',
          description:
            'Problema: algoritmos são abstratos para iniciantes. Ação: projetei e liderei o RPG universitário ProgramADAs em Unity (C#). Resultado: virei programadora líder e idealizadora do projeto.',
          link: PLAYTEST_URL,
        },
        {
          title: '1º lugar na Maratona Jr. UFJF',
          description:
            'Em 2023, ainda no primeiro período, meu time venceu a Maratona de Programação Júnior da UFJF.',
        },
        {
          title: 'Software financeiro em escala',
          description:
            'Na Levty, entrego features, correções e code reviews em um sistema interno de alto volume usado pela Livelo.',
        },
        {
          title: 'Excelência acadêmica',
          description: 'Média acima de 90% em Sistemas de Informação, conciliando estágio, pesquisa e extensão.',
          link: GITHUB_URL,
        },
      ],
    },
    career: {
      heading: 'Carreira',
      currentRole:
        'Engenheira de Software na Levty, atuando em sistema financeiro de alto volume para a Livelo. Foco em código limpo, estabilidade e experiência do usuário.',
      timeline: [
        {
          title: 'Engenheira de Software',
          company: 'Levty (cliente: Livelo)',
          duration: 'dez 2024 — atual',
          description:
            'Desenvolvo e mantenho features escaláveis, depuro falhas, documento e faço code reviews em ambiente ágil para garantir entregas estáveis.',
        },
        {
          title: 'Desenvolvedora e Pesquisadora',
          company: 'GET — Grupo de Educação Tutorial (UFJF)',
          duration: 'set 2024 — atual',
          description:
            'Crio do zero um app de moradia estudantil (React Native, TypeScript, Expo, Supabase), com Google Maps e ViaCEP para localizar imóveis e preencher endereços sem erro.',
        },
        {
          title: 'Programadora Líder e Idealizadora',
          company: 'ProgramADAs (UFJF)',
          duration: 'set 2023 — dez 2024',
          description:
            'Arquitetei e programei um RPG educacional em Unity para incentivar mulheres em STEM, com minigames que ensinam algoritmos.',
        },
        {
          title: 'Fundadora',
          company: 'Creati Lab — impressão 3D sob medida',
          duration: 'Projeto pessoal',
          description: 'Do modelo 3D à calibração da impressora, entrego peças personalizadas ponta a ponta.',
        },
      ],
      goals: [
        'Construir software escalável, de alta qualidade e com propósito',
        'Aprofundar mobile e back-end (React Native, Supabase, APIs)',
        'Seguir criando jogos e soluções de gamificação educacional',
      ],
    },
    studies: {
      heading: 'Estudos',
      education: [
        {
          institution: 'Universidade Federal de Juiz de Fora (UFJF)',
          degree: 'Bacharelado em Sistemas de Informação',
          dates: '2023 — 2027',
          description:
            'Média acima de 90%. Atuo em extensão e no GET, ministrando minicursos e mentorando colegas em lógica de programação.',
        },
        {
          institution: 'Instituto Federal — Paulo de Frontin',
          degree: 'Ensino Médio Técnico em Informática para Internet',
          dates: '2019 — 2021',
          description: 'Primeiro contato com programação: HTML, CSS e JavaScript.',
        },
      ],
      courses: [
        { name: '1º lugar, Maratona de Programação Jr.', provider: 'UFJF, 2023', completion: true },
        { name: 'Minicursos de lógica de programação (ministrante)', provider: 'GET / UFJF', completion: true },
        { name: 'Inglês avançado', provider: 'Fluente na escrita técnica', completion: true },
        { name: '100 Days CSS Challenge', provider: 'Autodidata', completion: true },
      ],
      projects: [
        {
          title: 'ProgramADAs',
          description: 'Jogo educacional em Unity que ensina algoritmos de forma lúdica.',
          link: PLAYTEST_URL,
        },
        {
          title: 'Esbugalhado: o Jogo',
          description: 'Jogo em JavaScript desenvolvido na disciplina DCC202 (UFJF).',
          link: 'https://github.com/EduardaNunes/esbugalhado-o-jogo',
        },
      ],
    },
    contact: {
      heading: 'Contato',
      linkedinUrl: LINKEDIN_URL,
      githubUrl: GITHUB_URL,
      email: EMAIL,
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
        softSkills: 'How I Work',
        results: 'Results',
      },
      career: {
        timeline: 'Professional Timeline',
        goals: 'Next Steps',
      },
      studies: {
        education: 'Academic Background',
        courses: 'Achievements and Courses',
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
        sectionsLabel: 'Notebook sections',
      },
    },
    about: {
      heading: 'About Me',
      skills: [
        { name: 'Languages', tags: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'GDScript'] },
        { name: 'Web and Mobile', tags: ['React', 'React Native', 'Expo', 'HTML5', 'CSS3'] },
        { name: 'Data and APIs', tags: ['Supabase', 'Firebase', 'REST API', 'Google Maps API', 'ViaCEP'] },
        { name: 'Games', tags: ['Unity', 'Godot'] },
        { name: 'Tools', tags: ['Git', 'GitHub'] },
      ],
      softSkills: [
        {
          name: 'Root cause',
          description: 'I debug production systems down to the origin of the problem, not just the symptom.',
        },
        {
          name: 'Proactivity',
          description: 'I anticipate team needs and put the end-user experience first.',
        },
        {
          name: 'Requirements to code',
          description: 'I turn complex corporate requirements into small, clean, reviewable deliveries.',
        },
        {
          name: 'Teaching',
          description: 'I explain programming logic through mini-courses and peer mentoring.',
        },
      ],
      results: [
        {
          title: 'From freshman to tech lead',
          description:
            'Problem: algorithms feel abstract to beginners. Action: I designed and led ProgramADAs, a college RPG in Unity (C#). Result: I became its lead programmer and idealizer.',
          link: PLAYTEST_URL,
        },
        {
          title: '1st place, UFJF Junior Programming Marathon',
          description: 'In 2023, in my first semester, my team won the university junior programming marathon.',
        },
        {
          title: 'Financial software at scale',
          description:
            'At Levty, I ship features, fixes and code reviews on a high-volume internal system used by Livelo.',
        },
        {
          title: 'Academic excellence',
          description: 'Average above 90% in Information Systems while balancing work, research and outreach.',
          link: GITHUB_URL,
        },
      ],
    },
    career: {
      heading: 'Career',
      currentRole:
        'Software Engineer at Levty, working on a high-volume financial system for Livelo. Focused on clean code, stability and user experience.',
      timeline: [
        {
          title: 'Software Engineer',
          company: 'Levty (client: Livelo)',
          duration: 'Dec 2024 — present',
          description:
            'I build and maintain scalable features, debug failures, write documentation and review code in an agile environment to keep deliveries stable.',
        },
        {
          title: 'Software Developer and Researcher',
          company: 'GET — Tutorial Education Group (UFJF)',
          duration: 'Sep 2024 — present',
          description:
            'Building a student-housing app from scratch (React Native, TypeScript, Expo, Supabase), with Google Maps and ViaCEP to locate listings and autofill addresses.',
        },
        {
          title: 'Lead Programmer and Idealizer',
          company: 'ProgramADAs (UFJF)',
          duration: 'Sep 2023 — Dec 2024',
          description:
            'Designed the architecture and built an educational RPG in Unity to encourage women in STEM, with mini-games that teach algorithms.',
        },
        {
          title: 'Founder',
          company: 'Creati Lab — custom 3D printing',
          duration: 'Personal project',
          description: 'From 3D modeling to printer calibration, I deliver custom pieces end to end.',
        },
      ],
      goals: [
        'Build scalable, high-quality software with purpose',
        'Go deeper into mobile and back-end (React Native, Supabase, APIs)',
        'Keep creating games and educational gamification solutions',
      ],
    },
    studies: {
      heading: 'Studies',
      education: [
        {
          institution: 'Federal University of Juiz de Fora (UFJF)',
          degree: 'B.Sc. in Information Systems',
          dates: '2023 — 2027',
          description:
            'Average above 90%. Active in outreach and in GET, teaching mini-courses and mentoring peers in programming logic.',
        },
        {
          institution: 'Federal Institute — Paulo de Frontin',
          degree: 'Technical High School in Internet Informatics',
          dates: '2019 — 2021',
          description: 'My first contact with programming: HTML, CSS and JavaScript.',
        },
      ],
      courses: [
        { name: '1st place, Junior Programming Marathon', provider: 'UFJF, 2023', completion: true },
        { name: 'Programming logic mini-courses (instructor)', provider: 'GET / UFJF', completion: true },
        { name: 'Advanced English', provider: 'Fluent in technical writing', completion: true },
        { name: '100 Days CSS Challenge', provider: 'Self-taught', completion: true },
      ],
      projects: [
        {
          title: 'ProgramADAs',
          description: 'Educational Unity game that teaches algorithms in a playful way.',
          link: PLAYTEST_URL,
        },
        {
          title: 'Esbugalhado: the Game',
          description: 'JavaScript game built for the DCC202 course (UFJF).',
          link: 'https://github.com/EduardaNunes/esbugalhado-o-jogo',
        },
      ],
    },
    contact: {
      heading: 'Contact',
      linkedinUrl: LINKEDIN_URL,
      githubUrl: GITHUB_URL,
      email: EMAIL,
      socialLinks: [],
    },
  },
}