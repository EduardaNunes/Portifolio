import React from 'react'
import NotebookLeaf from '../components/notebook-content/NotebookLeaf'
import { markerRegistry } from '../content/markers'
import { notebookLayout } from '../content/layout'

const h = React.createElement
const REPEATABLE_TYPES = ['positions', 'list', 'links']

function sliceRange(items, range) {
  const [start, end = items.length] = range
  return items.slice(start, end)
}

function resolveSlice(markerContent, slice) {
  const section = markerContent.sections.find((candidate) => candidate.id === slice.section)
  if (!section) {
    throw new Error(`Layout references missing section "${slice.section}" in ${markerContent.label}`)
  }

  if (Array.isArray(slice.components)) {
    return { ...section, content: sliceRange(section.content, slice.components) }
  }

  if (Array.isArray(slice.items)) {
    const repeatable = section.content.find((block) => REPEATABLE_TYPES.includes(block.type))
    if (!repeatable) {
      throw new Error(`Layout slices items in "${slice.section}", which has no repeatable block`)
    }
    return {
      ...section,
      content: section.content.map((block) =>
        block === repeatable ? { ...block, items: sliceRange(block.items, slice.items) } : block,
      ),
    }
  }

  return { ...section, content: section.content }
}

function resolveSide(markerContent, side, sideIndex, labels) {
  if (!side) return null

  const resolved = side.sections.map((slice) => resolveSlice(markerContent, slice))

  const title = markerContent.label
  const sections = resolved

  return h(NotebookLeaf, { title, sections, labels })
}

function resolveNarrativePairs(markerId, markerContent, markerLayout, labels) {
  let leftIndex = 0
  let rightIndex = 0

  return markerLayout.pages.map((page, pageIndex) => {
    const left = resolveSide(markerContent, page.left, leftIndex, labels)
    if (page.left) leftIndex += 1

    const right = resolveSide(markerContent, page.right, rightIndex, labels)
    if (page.right) rightIndex += 1

    return { id: `${markerId}-${pageIndex + 1}`, left, right }
  })
}

function resolveCategoryPairs(categoryId, categoryContent, categoryLayout, labels) {
  const projects = categoryContent.projects ?? []
  const projectById = Object.fromEntries(projects.map((p) => [p.id, p]))

  return categoryLayout.pages.map((page) => {
    const project = projectById[page.projectId]
    if (!project) {
      throw new Error(`Category layout references unknown projectId "${page.projectId}" in ${categoryId}`)
    }

    const sections = project.sections
      .filter((section) => page.left.sections.some((s) => s.section === section.id))
      .map((section) => ({ ...section }))

    if (project.demo?.repoLink) {
      sections.push({
        id: 'source',
        content: [
          {
            type: 'projectRepo',
            items: [{ icon: 'github', name: labels.viewRepository, link: project.demo.repoLink }],
          },
        ],
      })
    }

    return {
      id: project.id,
      left: h(NotebookLeaf, { title: project.title, sections, labels }),
      right: h(NotebookLeaf, {
        sections: [{ id: 'demo', content: [project.demo] }],
        labels,
      }),
    }
  })
}

function overviewPair(content, registry, labels) {
  const categories = registry.filter((marker) => marker.kind === 'category')
  const counts = categories
    .map((marker) => {
      const category = content[marker.id]
      return `${category.label}: ${category.projects.length} ${labels.projectCountSuffix}`
    })
    .join(' · ')
  const firstImage = categories
    .flatMap((marker) => content[marker.id].projects)
    .flatMap((project) => project.demo?.images ?? [])
    .find((image) => image?.src)
  const overviewImage = firstImage ? { ...firstImage, caption: content.projects.label } : undefined

  return {
    id: 'projects-overview',
    left: h(NotebookLeaf, {
      title: content.projects.label,
      sections: [
        { id: 'summary', content: [{ type: 'text', text: counts }] },
        {
          id: 'categories',
          content: [
            {
              type: 'blocks',
              name: labels.techStack,
              items: categories.map((marker) => content[marker.id].label),
            },
          ],
        },
      ],
      labels,
    }),
    right: h(NotebookLeaf, {
      sections: [
        {
          id: 'demo',
          content: [{ type: 'projectDemo', images: overviewImage ? [overviewImage] : [] }],
        },
      ],
      labels,
    }),
  }
}

function emptyCategoryPair(markerId, label, labels) {
  return {
    id: `${markerId}-empty`,
    left: h(NotebookLeaf, {
      title: label,
      sections: [{ id: 'empty', content: [{ type: 'text', text: labels.emptyCategory }] }],
      labels,
    }),
    right: h(NotebookLeaf, {
      sections: [{ id: 'demo', content: [{ type: 'projectDemo', images: [] }] }],
      labels,
    }),
  }
}

/**
 * Builds the ordered marker registry and its flattened global page-pair list.
 * Content supplies text only; this module resolves layout slices and generates
 * project pairs. `side` is presentation metadata used by the notebook tabs.
 */
export function buildNotebookPages({
  content,
  registry = markerRegistry,
  layout = notebookLayout,
  labels = {},
}) {
  const markers = registry.map((meta) => {
    const markerContent = content[meta.id]
    if (!markerContent) throw new Error(`Content is missing marker "${meta.id}"`)

    const marker = {
      id: meta.id,
      label: markerContent.label,
      side: meta.side,
      icon: meta.icon,
      accent: meta.accent,
      pagePairs: [],
    }

    if (meta.kind === 'overview') {
      marker.pagePairs = [overviewPair(content, registry, labels)]
    } else if (meta.kind === 'category') {
      const markerLayout = layout[meta.id]
      if (!markerLayout) throw new Error(`Layout is missing category marker "${meta.id}"`)
      const projects = markerContent.projects ?? []
      marker.pagePairs = projects.length > 0
        ? resolveCategoryPairs(meta.id, markerContent, markerLayout, labels)
        : [emptyCategoryPair(meta.id, markerContent.label, labels)]
    } else {
      const markerLayout = layout[meta.id]
      if (!markerLayout) throw new Error(`Layout is missing narrative marker "${meta.id}"`)
      marker.pagePairs = resolveNarrativePairs(meta.id, markerContent, markerLayout, labels)
    }

    return marker
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
