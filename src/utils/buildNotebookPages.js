/**
 * Builds the flat notebook page list.
 *
 * Order is fixed by the spec:
 *   About Me -> Career -> Studies -> [Projects: 2 pages per project] -> Contact
 * Therefore the total is 4 + 2N, where N is the number of projects visible in
 * the active category (all projects when no category is selected).
 */
import React from 'react'
import AboutMePage from '../components/narrative-notebook-component/AboutMePage'
import CareerPage from '../components/narrative-notebook-component/CareerPage'
import StudiesPage from '../components/narrative-notebook-component/StudiesPage'
import ProjectLeftPage from '../components/narrative-notebook-component/ProjectLeftPage'
import ProjectRightPage from '../components/narrative-notebook-component/ProjectRightPage'
import ContactPage from '../components/narrative-notebook-component/ContactPage'

const h = React.createElement

export function buildNotebookPages({ content, projects = [], activeCategory = null }) {
  const filteredProjects = activeCategory
    ? projects.filter((project) => project.categoryId === activeCategory)
    : projects

  const { labels } = content
  const pages = []

  pages.push({
    id: 'about',
    section: 'about',
    element: h(AboutMePage, {
      heading: content.about.heading,
      labels: labels.about,
      skills: content.about.skills,
      softSkills: content.about.softSkills,
      results: content.about.results,
    }),
  })

  pages.push({
    id: 'career',
    section: 'career',
    element: h(CareerPage, {
      heading: content.career.heading,
      labels: labels.career,
      currentRole: content.career.currentRole,
      timeline: content.career.timeline,
      goals: content.career.goals,
    }),
  })

  pages.push({
    id: 'studies',
    section: 'studies',
    element: h(StudiesPage, {
      heading: content.studies.heading,
      labels: labels.studies,
      education: content.studies.education,
      courses: content.studies.courses,
      projects: content.studies.projects,
    }),
  })

  filteredProjects.forEach((project) => {
    pages.push({
      id: `${project.id}-left`,
      section: 'projects',
      element: h(ProjectLeftPage, {
        title: project.title,
        description: project.description,
        techStack: project.techStack,
        repoUrl: project.repoLink,
        sourceCodeLink: project.repoLink,
        labels: labels.project,
      }),
    })

    pages.push({
      id: `${project.id}-right`,
      section: 'projects',
      element: h(ProjectRightPage, {
        thumbnailUrl: project.thumbnailUrl,
        deployUrl: project.deployUrl,
        projectTitle: project.title,
        labels: labels.project,
      }),
    })
  })

  pages.push({
    id: 'contact',
    section: 'contact',
    element: h(ContactPage, {
      heading: content.contact.heading,
      labels: labels.contact,
      linkedinUrl: content.contact.linkedinUrl,
      githubUrl: content.contact.githubUrl,
      email: content.contact.email,
      socialLinks: content.contact.socialLinks,
    }),
  })

  return pages
}

export function getPageSectionCounts(pages = []) {
  return pages.reduce((counts, page) => {
    counts[page.section] = (counts[page.section] || 0) + 1
    return counts
  }, {})
}
