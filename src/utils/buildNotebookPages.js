/**
 * Builds the notebook spread list.
 *
 * A spread is an open book unit with two facing leaves:
 *   { id, section, left, right }
 *
 * Order is fixed:
 *   About Me -> Career -> Studies -> [Projects: 1 spread per project] -> Contact
 * Therefore the total is 4 + N spreads, or 8 + 2N leaves, where N is the
 * number of projects visible in the active category (all projects when no
 * category is selected).
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
  const spreads = []

  spreads.push({
    id: 'about',
    section: 'about',
    left: h(AboutMePage, {
      side: 'left',
      heading: content.about.heading,
      labels: labels.about,
      skills: content.about.skills,
      softSkills: content.about.softSkills,
    }),
    right: h(AboutMePage, {
      side: 'right',
      heading: content.about.heading,
      labels: labels.about,
      results: content.about.results,
    }),
  })

  spreads.push({
    id: 'career',
    section: 'career',
    left: h(CareerPage, {
      side: 'left',
      heading: content.career.heading,
      labels: labels.career,
      currentRole: content.career.currentRole,
      timeline: content.career.timeline,
    }),
    right: h(CareerPage, {
      side: 'right',
      heading: content.career.heading,
      labels: labels.career,
      goals: content.career.goals,
    }),
  })

  spreads.push({
    id: 'studies',
    section: 'studies',
    left: h(StudiesPage, {
      side: 'left',
      heading: content.studies.heading,
      labels: labels.studies,
      education: content.studies.education,
    }),
    right: h(StudiesPage, {
      side: 'right',
      heading: content.studies.heading,
      labels: labels.studies,
      courses: content.studies.courses,
      projects: content.studies.projects,
    }),
  })

  filteredProjects.forEach((project) => {
    spreads.push({
      id: project.id,
      section: 'projects',
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
    })
  })

  spreads.push({
    id: 'contact',
    section: 'contact',
    left: h(ContactPage, {
      side: 'left',
      heading: content.contact.heading,
      labels: labels.contact,
      email: content.contact.email,
    }),
    right: h(ContactPage, {
      side: 'right',
      heading: content.contact.heading,
      labels: labels.contact,
      linkedinUrl: content.contact.linkedinUrl,
      githubUrl: content.contact.githubUrl,
      email: content.contact.email,
      socialLinks: content.contact.socialLinks,
    }),
  })

  return spreads
}

export function getPageSectionCounts(spreads = []) {
  return spreads.reduce((counts, spread) => {
    counts[spread.section] = (counts[spread.section] || 0) + 1
    return counts
  }, {})
}
