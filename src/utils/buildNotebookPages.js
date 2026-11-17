import React from 'react'
import AboutMePage from '../components/narrative-notebook-component/AboutMePage'
import CareerPage from '../components/narrative-notebook-component/CareerPage'
import StudiesPage from '../components/narrative-notebook-component/StudiesPage'
import ProjectLeftPage from '../components/narrative-notebook-component/ProjectLeftPage'
import ProjectRightPage from '../components/narrative-notebook-component/ProjectRightPage'
import ContactPage from '../components/narrative-notebook-component/ContactPage'

const h = React.createElement

const MARKER_META = {
  about: { side: 'left', icon: 'about', accent: '#3f8f92' },
  career: { side: 'left', icon: 'career', accent: '#b8763c' },
  studies: { side: 'left', icon: 'studies', accent: '#7c68b5' },
  projects: { side: 'left', icon: 'projects', accent: '#bc8a2f' },
  'ai-automation': { side: 'right', icon: 'ai', accent: '#3f8f92' },
  games: { side: 'right', icon: 'games', accent: '#7c68b5' },
  webdev: { side: 'right', icon: 'webdev', accent: '#bc8a2f' },
  backend: { side: 'right', icon: 'backend', accent: '#4f8a63' },
  contact: { side: 'left', icon: 'contact', accent: '#4f8a63' },
}

const CATEGORY_MARKERS = {
  'IA e Automações': 'ai-automation',
  Jogos: 'games',
  WebDev: 'webdev',
  BackEnd: 'backend',
}

/**
 * Page-pair slice contract
 *
 * A marker owns one or more page pairs. Each pair receives a bounded slice of the
 * localized content so that every leaf fits its fixed page: leaves never scroll,
 * and anything that does not fit must continue on a later pair of the same marker.
 *
 * Slices are declared here, at build time, from the existing localized data.
 * They are never measured or generated at runtime. When content grows, move a
 * boundary or add a pair; never shrink type below legibility and never
 * reintroduce scrolling.
 *
 * A continuation pair omits `heading` and passes `runningHead` instead, so the
 * page component renders a small running head (existing localized copy) rather
 * than repeating the page title. A pair with no content on one side renders a
 * blank paper leaf (`null`).
 */
const sliceBetween = (items = [], start = 0, end) => items.slice(start, end)
const sliceFrom = (items = [], start = 0) => items.slice(start)

function projectPair(project, labels) {
  return {
    id: project.id,
    left: h(ProjectLeftPage, {
      title: project.title,
      description: project.description,
      techStack: project.techStack,
      repoUrl: project.repoLink,
      sourceCodeLink: project.repoLink,
      labels: labels.project,
    }),
    right: h(ProjectRightPage, {
      thumbnailUrl: project.thumbnailUrl,
      deployUrl: project.deployUrl,
      projectTitle: project.title,
      labels: labels.project,
    }),
  }
}

function overviewPair(content, projects, labels) {
  const categories = ['IA e Automações', 'Jogos', 'WebDev', 'BackEnd']
  return {
    id: 'projects-overview',
    left: h(ProjectLeftPage, {
      title: content.sections.projects,
      description: categories.map((category) => `${category}: ${projects.filter((item) => item.categoryId === category).length} projeto(s)`).join(' · '),
      techStack: categories,
      labels: labels.project,
    }),
    right: h(ProjectRightPage, {
      thumbnailUrl: projects.find((item) => item.thumbnailUrl)?.thumbnailUrl,
      projectTitle: content.sections.projects,
      labels: labels.project,
    }),
  }
}

/**
 * Builds the ordered marker registry and its flattened global page-pair list.
 * `side` is presentation metadata only; the marker array remains navigation order.
 */
export function buildNotebookPages({ content, projects = [] }) {
  const { labels } = content
  const byMarker = (markerId) => projects.filter((project) => CATEGORY_MARKERS[project.categoryId] === markerId)

  const markers = [
    {
      id: 'about', label: content.sections.about, ...MARKER_META.about,
      pagePairs: [
        {
          id: 'about-main',
          left: h(AboutMePage, { side: 'left', heading: content.about.heading, labels: labels.about, skills: content.about.skills }),
          right: h(AboutMePage, { side: 'right', labels: labels.about, results: sliceBetween(content.about.results, 0, 2) }),
        },
        {
          id: 'about-continued',
          left: h(AboutMePage, { side: 'left', runningHead: content.about.heading, labels: labels.about, softSkills: content.about.softSkills }),
          right: h(AboutMePage, { side: 'right', runningHead: content.about.heading, labels: labels.about, results: sliceFrom(content.about.results, 2) }),
        },
      ],
    },
    {
      id: 'career', label: content.sections.career, ...MARKER_META.career,
      pagePairs: [
        {
          id: 'career-main',
          left: h(CareerPage, { side: 'left', heading: content.career.heading, labels: labels.career, currentRole: content.career.currentRole, timeline: sliceBetween(content.career.timeline, 0, 1) }),
          right: h(CareerPage, { side: 'right', labels: labels.career, goals: content.career.goals }),
        },
        {
          id: 'career-timeline',
          left: h(CareerPage, { side: 'left', runningHead: content.career.heading, labels: labels.career, timeline: sliceBetween(content.career.timeline, 1, 2) }),
          right: null,
        },
        {
          id: 'career-timeline-end',
          left: h(CareerPage, { side: 'left', runningHead: content.career.heading, labels: labels.career, timeline: sliceFrom(content.career.timeline, 2) }),
          right: null,
        },
      ],
    },
    {
      id: 'studies', label: content.sections.studies, ...MARKER_META.studies,
      pagePairs: [
        {
          id: 'studies-main',
          left: h(StudiesPage, { side: 'left', heading: content.studies.heading, labels: labels.studies, education: sliceBetween(content.studies.education, 0, 1) }),
          right: h(StudiesPage, { side: 'right', labels: labels.studies, courses: content.studies.courses }),
        },
        {
          id: 'studies-projects',
          left: h(StudiesPage, { side: 'left', runningHead: content.studies.heading, labels: labels.studies, education: sliceFrom(content.studies.education, 1) }),
          right: h(StudiesPage, { side: 'right', runningHead: content.studies.heading, labels: labels.studies, projects: content.studies.projects }),
        },
      ],
    },
    { id: 'projects', label: content.sections.projects, ...MARKER_META.projects, pagePairs: [overviewPair(content, projects, labels)] },
    ...Object.entries(CATEGORY_MARKERS).map(([category, id]) => ({
      id,
      label: content.sections[id],
      ...MARKER_META[id],
      pagePairs: byMarker(id).map((project) => projectPair(project, labels)),
    })),
    {
      id: 'contact', label: content.sections.contact, ...MARKER_META.contact,
      pagePairs: [{
        id: 'contact-main',
        left: h(ContactPage, { side: 'left', heading: content.contact.heading, labels: labels.contact, email: content.contact.email }),
        right: h(ContactPage, { side: 'right', heading: content.contact.heading, labels: labels.contact, linkedinUrl: content.contact.linkedinUrl, githubUrl: content.contact.githubUrl, email: content.contact.email, socialLinks: content.contact.socialLinks }),
      }],
    },
  ]

  // Keep every configured marker navigable, including a domain with no projects.
  markers.forEach((marker) => {
    if (marker.pagePairs.length === 0) {
      marker.pagePairs.push({
        id: `${marker.id}-empty`,
        left: h(ProjectLeftPage, { title: marker.label, description: content.labels.ui.emptyCategory, labels: labels.project }),
        right: h(ProjectRightPage, { projectTitle: marker.label, labels: labels.project }),
      })
    }
  })

  const spreads = markers.flatMap((marker) => marker.pagePairs.map((pair) => ({
    ...pair,
    id: pair.id,
    markerId: marker.id,
    section: marker.id,
  })))

  return { markers, spreads }
}

export function getPageSectionCounts(spreads = []) {
  return spreads.reduce((counts, spread) => {
    counts[spread.markerId] = (counts[spread.markerId] || 0) + 1
    return counts
  }, {})
}
