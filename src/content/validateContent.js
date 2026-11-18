/**
 * Pure content and layout validation for the notebook.
 *
 * The same module is used by the build script (`scripts/validate-content.mjs`)
 * and by the page builder, so a broken locale or an uncovered slice fails with
 * a path such as `pt.career.sections[1].content[0].items[2].position`.
 */

export const BLOCK_TYPES = ['blocks', 'text', 'positions', 'email', 'links', 'list', 'projectDemo']
export const LINK_ICONS = ['linkedin', 'github', 'email', 'external']
export const MARKER_KINDS = ['narrative', 'overview', 'category']
export const VIDEO_FILE_PATTERN = /\.(mp4|webm|ogg)(?:[?#]|$)/i

const REPEATABLE_TYPES = ['positions', 'list', 'links']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)
const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0
const isOptionalString = (value) => value === undefined || isNonEmptyString(value)
const inferredVideo = (image) => image.video ?? (typeof image.src === 'string' && VIDEO_FILE_PATTERN.test(image.src))

function requireString(value, path, errors, label = 'value') {
  if (!isNonEmptyString(value)) errors.push(`${path} must have a non-empty ${label}`)
}

function requireOptionalString(value, path, errors, label) {
  if (!isOptionalString(value)) errors.push(`${path}.${label} must be a non-empty string when present`)
}

// Dates are free-form text; an empty `toDate` is meaningful (current position).
function requireOptionalDate(value, path, errors, label) {
  if (value !== undefined && typeof value !== 'string') {
    errors.push(`${path}.${label} must be a string when present`)
  }
}

function requireStringArray(value, path, errors, label = 'items') {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${path} must have a non-empty ${label}`)
    return
  }
  value.forEach((entry, index) => {
    if (!isNonEmptyString(entry)) errors.push(`${path}[${index}] must be a non-empty string`)
  })
}

function validateBlock(block, path, errors) {
  if (!isObject(block)) {
    errors.push(`${path} must be an object`)
    return
  }
  if (!BLOCK_TYPES.includes(block.type)) {
    errors.push(`${path}.type "${block.type}" is not one of: ${BLOCK_TYPES.join(', ')}`)
    return
  }

  switch (block.type) {
    case 'blocks':
      requireString(block.name, path, errors, 'name')
      requireStringArray(block.items, path, errors)
      break

    case 'text':
      requireString(block.text, path, errors, 'text')
      requireOptionalString(block.title, path, errors, 'title')
      if (block.link !== undefined) {
        if (!isObject(block.link)) {
          errors.push(`${path}.link must be an object with label and url`)
        } else {
          requireString(block.link.label, `${path}.link`, errors, 'label')
          requireString(block.link.url, `${path}.link`, errors, 'url')
        }
      }
      break

    case 'positions':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        errors.push(`${path}.items must be a non-empty array`)
        break
      }
      block.items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`
        if (!isObject(item)) {
          errors.push(`${itemPath} must be an object`)
          return
        }
        requireString(item.position, itemPath, errors, 'position')
        requireString(item.company, itemPath, errors, 'company')
        requireOptionalDate(item.fromDate, itemPath, errors, 'fromDate')
        requireOptionalDate(item.toDate, itemPath, errors, 'toDate')
        requireOptionalString(item.description, itemPath, errors, 'description')
      })
      break

    case 'email':
      if (!isNonEmptyString(block.email)) {
        errors.push(`${path}.email must be a non-empty string`)
      } else if (!EMAIL_PATTERN.test(block.email)) {
        errors.push(`${path}.email "${block.email}" is not a valid address`)
      }
      break

    case 'links':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        errors.push(`${path}.items must be a non-empty array`)
        break
      }
      block.items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`
        if (!isObject(item)) {
          errors.push(`${itemPath} must be an object`)
          return
        }
        if (!LINK_ICONS.includes(item.icon)) {
          errors.push(`${itemPath}.icon "${item.icon}" is not one of: ${LINK_ICONS.join(', ')}`)
        }
        requireString(item.name, itemPath, errors, 'name')
        requireString(item.link, itemPath, errors, 'link')
      })
      break

    case 'list':
      if (!Array.isArray(block.items) || block.items.length === 0) {
        errors.push(`${path}.items must be a non-empty array`)
        break
      }
      block.items.forEach((item, index) => {
        const itemPath = `${path}.items[${index}]`
        if (typeof item === 'string') {
          if (!isNonEmptyString(item)) errors.push(`${itemPath} must be a non-empty string`)
          return
        }
        if (!isObject(item)) {
          errors.push(`${itemPath} must be a string or an object`)
          return
        }
        requireString(item.text, itemPath, errors, 'text')
        requireOptionalString(item.detail, itemPath, errors, 'detail')
        if (item.done !== undefined && typeof item.done !== 'boolean') {
          errors.push(`${itemPath}.done must be a boolean when present`)
        }
      })
      break

    case 'projectDemo':
      if (block.images !== undefined) {
        if (!Array.isArray(block.images)) {
          errors.push(`${path}.images must be an array when present`)
          break
        }
        block.images.forEach((image, index) => {
          const imagePath = `${path}.images[${index}]`
          if (!isObject(image)) {
            errors.push(`${imagePath} must be an object`)
            return
          }
          requireString(image.src, imagePath, errors, 'src')
          requireOptionalString(image.alt, imagePath, errors, 'alt')
          requireOptionalString(image.caption, imagePath, errors, 'caption')
          if (image.video !== undefined && typeof image.video !== 'boolean') {
            errors.push(`${imagePath}.video must be a boolean when present`)
          }
        })
      }
      requireOptionalString(block.repoLink, path, errors, 'repoLink')
      requireOptionalString(block.deployLink, path, errors, 'deployLink')
      break

    default:
      break
  }
}

function validateSections(sections, path, errors) {
  if (!Array.isArray(sections) || sections.length === 0) {
    errors.push(`${path}.sections must be a non-empty array`)
    return
  }
  const ids = new Set()
  sections.forEach((section, index) => {
    const sectionPath = `${path}.sections[${index}]`
    if (!isObject(section)) {
      errors.push(`${sectionPath} must be an object`)
      return
    }
    if (!isNonEmptyString(section.id)) {
      errors.push(`${sectionPath}.id must be a non-empty string`)
    } else if (ids.has(section.id)) {
      errors.push(`${sectionPath}.id "${section.id}" is duplicated in this marker`)
    } else {
      ids.add(section.id)
    }
    requireOptionalString(section.subHeader, sectionPath, errors, 'subHeader')
    if (!Array.isArray(section.content) || section.content.length === 0) {
      errors.push(`${sectionPath}.content must be a non-empty array`)
      return
    }
    section.content.forEach((block, blockIndex) => {
      validateBlock(block, `${sectionPath}.content[${blockIndex}]`, errors)
    })
  })
}

function validateProjects(projects, path, errors, projectIds) {
  if (!Array.isArray(projects)) {
    errors.push(`${path}.projects must be an array`)
    return
  }
  projects.forEach((project, index) => {
    const projectPath = `${path}.projects[${index}]`
    if (!isObject(project)) {
      errors.push(`${projectPath} must be an object`)
      return
    }
    if (!isNonEmptyString(project.id)) {
      errors.push(`${projectPath}.id must be a non-empty string`)
    } else if (projectIds.has(project.id)) {
      errors.push(`${projectPath}.id "${project.id}" is already used by another project`)
    } else {
      projectIds.add(project.id)
    }
    requireString(project.title, projectPath, errors, 'title')
    validateSections(project.sections, projectPath, errors)
    if (!isObject(project.demo)) {
      errors.push(`${projectPath}.demo must be a projectDemo block`)
    } else {
      validateBlock(project.demo, `${projectPath}.demo`, errors)
      if (project.demo.type !== 'projectDemo') {
        errors.push(`${projectPath}.demo.type must be "projectDemo"`)
      }
    }
  })
}

function validateDocument(document, path, errors, registryMap) {
  if (!isObject(document)) {
    errors.push(`${path} must be an object`)
    return
  }

  const projectIds = new Set()

  registryMap.forEach((marker, markerId) => {
    if (document[markerId] === undefined) errors.push(`${path}.${markerId} is missing`)
  })

  Object.keys(document).forEach((markerId) => {
    const markerPath = `${path}.${markerId}`
    const marker = document[markerId]
    const registryEntry = registryMap.get(markerId)

    if (!registryEntry) {
      errors.push(`${markerPath} is not declared in the marker registry`)
      return
    }
    if (!isObject(marker)) {
      errors.push(`${markerPath} must be an object`)
      return
    }
    requireString(marker.label, markerPath, errors, 'label')

    if (registryEntry.kind === 'narrative') {
      if (marker.projects !== undefined) errors.push(`${markerPath} is narrative and must not declare projects`)
      validateSections(marker.sections, markerPath, errors)
    } else if (registryEntry.kind === 'category') {
      if (marker.sections !== undefined) errors.push(`${markerPath} is a category and must not declare sections`)
      validateProjects(marker.projects, markerPath, errors, projectIds)
    } else if (registryEntry.kind === 'overview') {
      if (marker.sections !== undefined || marker.projects !== undefined) {
        errors.push(`${markerPath} is an overview marker and must only declare label`)
      }
    } else {
      errors.push(`${markerPath} has unsupported kind "${registryEntry.kind}"`)
    }
  })
}

function compareSections(left, right, path, errors) {
  if (!Array.isArray(left) || !Array.isArray(right)) return
  if (left.length !== right.length) {
    errors.push(`${path}.sections has ${right.length} entries, expected ${left.length}`)
    return
  }
  left.forEach((leftSection, index) => {
    const rightSection = right[index]
    const sectionPath = `${path}.sections[${index}]`
    if (!isObject(leftSection) || !isObject(rightSection)) return
    if (leftSection.id !== rightSection.id) {
      errors.push(`${sectionPath}.id is "${rightSection.id}", expected "${leftSection.id}"`)
      return
    }
    if ((leftSection.subHeader === undefined) !== (rightSection.subHeader === undefined)) {
      errors.push(`${sectionPath}.subHeader presence differs between locales`)
    }
    if (!Array.isArray(leftSection.content) || !Array.isArray(rightSection.content)) return
    if (leftSection.content.length !== rightSection.content.length) {
      errors.push(`${sectionPath}.content has ${rightSection.content.length} blocks, expected ${leftSection.content.length}`)
      return
    }
    leftSection.content.forEach((leftBlock, blockIndex) => {
      compareBlocks(leftBlock, rightSection.content[blockIndex], `${sectionPath}.content[${blockIndex}]`, errors)
    })
  })
}

function compareBlocks(left, right, path, errors) {
  if (!isObject(left) || !isObject(right)) return
  if (left.type !== right.type) {
    errors.push(`${path}.type is "${right.type}", expected "${left.type}"`)
    return
  }

  const compareItemCount = (leftItems, rightItems) => {
    const leftCount = Array.isArray(leftItems) ? leftItems.length : 0
    const rightCount = Array.isArray(rightItems) ? rightItems.length : 0
    if (leftCount !== rightCount) errors.push(`${path} has ${rightCount} items, expected ${leftCount}`)
  }

  switch (left.type) {
    case 'blocks':
      compareItemCount(left.items, right.items)
      break

    case 'text':
      if ((left.title === undefined) !== (right.title === undefined)) {
        errors.push(`${path}.title presence differs between locales`)
      }
      if ((left.link === undefined) !== (right.link === undefined)) {
        errors.push(`${path}.link presence differs between locales`)
      }
      break

    case 'positions':
      compareItemCount(left.items, right.items)
      if (Array.isArray(left.items) && Array.isArray(right.items)) {
        left.items.forEach((item, index) => {
          const other = right.items[index]
          if (!isObject(item) || !isObject(other)) return
          ;['fromDate', 'toDate', 'description'].forEach((field) => {
            if ((item[field] === undefined) !== (other[field] === undefined)) {
              errors.push(`${path}.items[${index}].${field} presence differs between locales`)
            }
          })
        })
      }
      break

    case 'links':
      compareItemCount(left.items, right.items)
      if (Array.isArray(left.items) && Array.isArray(right.items)) {
        left.items.forEach((item, index) => {
          const other = right.items[index]
          if (!isObject(item) || !isObject(other)) return
          if (item.icon !== other.icon) {
            errors.push(`${path}.items[${index}].icon differs between locales`)
          }
        })
      }
      break

    case 'list':
      compareItemCount(left.items, right.items)
      if (Array.isArray(left.items) && Array.isArray(right.items)) {
        left.items.forEach((item, index) => {
          const other = right.items[index]
          const leftIsObject = isObject(item)
          const rightIsObject = isObject(other)
          if (leftIsObject !== rightIsObject) {
            errors.push(`${path}.items[${index}] shape differs between locales`)
            return
          }
          if (leftIsObject) {
            if ((item.done === undefined) !== (other.done === undefined)) {
              errors.push(`${path}.items[${index}].done presence differs between locales`)
            }
            if ((item.detail === undefined) !== (other.detail === undefined)) {
              errors.push(`${path}.items[${index}].detail presence differs between locales`)
            }
          }
        })
      }
      break

    case 'projectDemo': {
      compareItemCount(left.images, right.images)
      if (Array.isArray(left.images) && Array.isArray(right.images)) {
        left.images.forEach((image, index) => {
          const other = right.images[index]
          if (!isObject(image) || !isObject(other)) return
          if (image.src !== other.src) errors.push(`${path}.images[${index}].src differs between locales`)
          if (inferredVideo(image) !== inferredVideo(other)) {
            errors.push(`${path}.images[${index}].video differs between locales`)
          }
        })
      }
      ;['repoLink', 'deployLink'].forEach((field) => {
        if ((left[field] === undefined) !== (right[field] === undefined)) {
          errors.push(`${path}.${field} presence differs between locales`)
        }
      })
      break
    }

    default:
      break
  }
}

function compareProjects(left, right, path, errors) {
  if (!Array.isArray(left) || !Array.isArray(right)) return
  if (left.length !== right.length) {
    errors.push(`${path}.projects has ${right.length} entries, expected ${left.length}`)
    return
  }
  left.forEach((leftProject, index) => {
    const rightProject = right[index]
    const projectPath = `${path}.projects[${index}]`
    if (!isObject(leftProject) || !isObject(rightProject)) return
    if (leftProject.id !== rightProject.id) {
      errors.push(`${projectPath}.id is "${rightProject.id}", expected "${leftProject.id}"`)
      return
    }
    compareSections(leftProject.sections, rightProject.sections, projectPath, errors)
    compareBlocks(leftProject.demo, rightProject.demo, `${projectPath}.demo`, errors)
  })
}

function compareStructure(left, right, path, errors, registryMap) {
  const leftKeys = Object.keys(left)
  const rightKeys = Object.keys(right)
  if (leftKeys.join('|') !== rightKeys.join('|')) {
    errors.push(`${path} marker ids or order differ from the reference locale`)
    return
  }
  leftKeys.forEach((markerId) => {
    const marker = registryMap.get(markerId)
    if (!marker) return
    if (marker.kind === 'narrative') {
      compareSections(left[markerId].sections, right[markerId].sections, `${path}.${markerId}`, errors)
    } else if (marker.kind === 'category') {
      compareProjects(left[markerId].projects, right[markerId].projects, `${path}.${markerId}`, errors)
    }
  })
}

function parseRange(range, length, path, errors) {
  if (!Array.isArray(range) || range.length < 1 || range.length > 2) {
    errors.push(`${path} must be [start] or [start, end]`)
    return null
  }
  const start = range[0]
  const end = range.length === 2 ? range[1] : length
  if (!Number.isInteger(start) || !Number.isInteger(end)) {
    errors.push(`${path} bounds must be integers`)
    return null
  }
  if (start < 0 || end > length || start >= end) {
    errors.push(`${path} must satisfy 0 <= start < end <= ${length}`)
    return null
  }
  return [start, end]
}

function checkPartition(ranges, length, path, errors) {
  const seen = new Set()
  ranges.forEach(([start, end]) => {
    for (let index = start; index < end; index += 1) {
      if (seen.has(index)) errors.push(`${path}[${index}] is referenced more than once`)
      else seen.add(index)
    }
  })
  for (let index = 0; index < length; index += 1) {
    if (!seen.has(index)) errors.push(`${path}[${index}] is not referenced by the layout`)
  }
}

function newCoverage() {
  return { whole: 0, components: [], items: [] }
}

function validateMarkerLayout(markerId, markerContent, markerLayout, path, errors) {
  if (!isObject(markerLayout)) {
    errors.push(`${path} must be an object with pages`)
    return
  }
  if (!Array.isArray(markerLayout.pages) || markerLayout.pages.length === 0) {
    errors.push(`${path}.pages must be a non-empty array`)
    return
  }

  const sectionsById = new Map(markerContent.sections.map((section) => [section.id, section]))
  const coverage = new Map(markerContent.sections.map((section) => [section.id, newCoverage()]))

  const validateSide = (side, sidePath) => {
    if (side === null) return
    if (!isObject(side)) {
      errors.push(`${sidePath} must be null or an object`)
      return
    }
    if (!Array.isArray(side.sections) || side.sections.length === 0) {
      errors.push(`${sidePath}.sections must be a non-empty array`)
      return
    }

    side.sections.forEach((slice, sliceIndex) => {
      const slicePath = `${sidePath}.sections[${sliceIndex}]`
      if (!isObject(slice)) {
        errors.push(`${slicePath} must be an object`)
        return
      }
      const section = sectionsById.get(slice.section)
      if (!section) {
        errors.push(`${slicePath}.section "${slice.section}" does not exist in ${markerId}`)
        return
      }
      const state = coverage.get(section.id)
      if (slice.components !== undefined && slice.items !== undefined) {
        errors.push(`${slicePath} must not declare both components and items`)
        return
      }
      if (slice.components !== undefined) {
        const range = parseRange(slice.components, section.content.length, `${slicePath}.components`, errors)
        if (range) state.components.push(range)
        return
      }
      if (slice.items !== undefined) {
        const repeatables = section.content.filter((block) => REPEATABLE_TYPES.includes(block.type))
        if (repeatables.length !== 1) {
          errors.push(`${slicePath}.items requires exactly one positions, list or links block in "${section.id}"`)
          return
        }
        const range = parseRange(slice.items, repeatables[0].items.length, `${slicePath}.items`, errors)
        if (range) state.items.push(range)
        return
      }
      state.whole += 1
    })
  }

  markerLayout.pages.forEach((page, pageIndex) => {
    const pagePath = `${path}.pages[${pageIndex}]`
    if (!isObject(page)) {
      errors.push(`${pagePath} must be an object`)
      return
    }
    if (page.left === undefined || page.right === undefined) {
      errors.push(`${pagePath} must declare left and right (use null for a blank leaf)`)
      return
    }
    if (page.left === null && page.right === null) {
      errors.push(`${pagePath} must render at least one side`)
    }
    validateSide(page.left, `${pagePath}.left`)
    validateSide(page.right, `${pagePath}.right`)
  })

  markerContent.sections.forEach((section) => {
    const state = coverage.get(section.id)
    const sectionPath = `${path}.${section.id}`
    if (state.whole === 0 && state.components.length === 0 && state.items.length === 0) {
      errors.push(`${sectionPath} is not referenced by the layout`)
      return
    }
    if (state.whole > 1) errors.push(`${sectionPath} is referenced as a whole more than once`)
    if (state.whole > 0 && (state.components.length > 0 || state.items.length > 0)) {
      errors.push(`${sectionPath} mixes whole-section and sliced references`)
      return
    }
    if (state.whole === 1) return

    if (state.items.length > 0) {
      if (state.components.length > 0) {
        errors.push(`${sectionPath} mixes component and item slices`)
        return
      }
      const repeatable = section.content.find((block) => REPEATABLE_TYPES.includes(block.type))
      if (repeatable) checkPartition(state.items, repeatable.items.length, `${sectionPath}.items`, errors)
      return
    }

    checkPartition(state.components, section.content.length, `${sectionPath}.content`, errors)
  })
}

function validateCategoryLayout(markerId, markerContent, markerLayout, path, errors) {
  if (!isObject(markerLayout)) {
    errors.push(`${path} must be an object with pages`)
    return
  }
  if (!Array.isArray(markerLayout.pages) || markerLayout.pages.length === 0) {
    errors.push(`${path}.pages must be a non-empty array`)
    return
  }

  const projects = markerContent.projects ?? []
  const projectById = Object.fromEntries(projects.map((p) => [p.id, p]))
  const referencedProjectIds = new Set()

  markerLayout.pages.forEach((page, pageIndex) => {
    const pagePath = `${path}.pages[${pageIndex}]`
    if (!isObject(page)) {
      errors.push(`${pagePath} must be an object`)
      return
    }
    if (!isNonEmptyString(page.projectId)) {
      errors.push(`${pagePath}.projectId must be a non-empty string`)
      return
    }
    if (referencedProjectIds.has(page.projectId)) {
      errors.push(`${pagePath}.projectId "${page.projectId}" is referenced more than once`)
      return
    }
    referencedProjectIds.add(page.projectId)

    const project = projectById[page.projectId]
    if (!project) {
      errors.push(`${pagePath}.projectId "${page.projectId}" does not exist in ${markerId}`)
      return
    }

    if (!isObject(page.left)) {
      errors.push(`${pagePath}.left must be an object`)
      return
    }
    if (!Array.isArray(page.left.sections) || page.left.sections.length === 0) {
      errors.push(`${pagePath}.left.sections must be a non-empty array`)
      return
    }

    page.left.sections.forEach((slice, sliceIndex) => {
      const slicePath = `${pagePath}.left.sections[${sliceIndex}]`
      if (!isObject(slice)) {
        errors.push(`${slicePath} must be an object`)
        return
      }
      if (!isNonEmptyString(slice.section)) {
        errors.push(`${slicePath}.section must be a non-empty string`)
        return
      }
      const section = project.sections.find((s) => s.id === slice.section)
      if (!section) {
        errors.push(`${slicePath}.section "${slice.section}" does not exist in project ${page.projectId}`)
        return
      }
    })

    if (page.right !== undefined) {
      if (!isObject(page.right)) {
        errors.push(`${pagePath}.right must be an object`)
        return
      }
      if (page.right.demo !== true) {
        errors.push(`${pagePath}.right.demo must be true`)
        return
      }
    }
  })

  projects.forEach((project) => {
    if (!referencedProjectIds.has(project.id)) {
      errors.push(`${path}: project "${project.id}" is not referenced by the layout`)
    }
  })
}

function validateLayout(layout, document, registryMap, errors) {
  if (!isObject(layout)) {
    errors.push('layout must be an object')
    return
  }

  registryMap.forEach((marker) => {
    if (marker.kind === 'narrative' && layout[marker.id] === undefined) {
      errors.push(`layout.${marker.id} is missing`)
    }
    if (marker.kind === 'category' && layout[marker.id] === undefined) {
      errors.push(`layout.${marker.id} is missing`)
    }
  })

  Object.keys(layout).forEach((markerId) => {
    const marker = registryMap.get(markerId)
    if (!marker) {
      errors.push(`layout.${markerId} does not match a registered marker`)
      return
    }
    const markerContent = document[markerId]
    if (!markerContent) return

    if (marker.kind === 'narrative') {
      validateMarkerLayout(markerId, markerContent, layout[markerId], `layout.${markerId}`, errors)
    } else if (marker.kind === 'category') {
      validateCategoryLayout(markerId, markerContent, layout[markerId], `layout.${markerId}`, errors)
    } else if (marker.kind === 'overview') {
      // Overview marker doesn't need layout validation
    } else {
      errors.push(`layout.${markerId} has unsupported kind "${marker.kind}"`)
    }
  })
}

/**
 * Validates every locale, their structural parity, and layout coverage.
 * Returns an array of human-readable errors; empty means valid.
 */
export function validateNotebookContent({ documents = {}, layout, registry = [] }) {
  const errors = []
  const languages = Object.keys(documents)

  if (languages.length === 0) {
    errors.push('No content documents were provided')
    return errors
  }
  if (!Array.isArray(registry) || registry.length === 0) {
    errors.push('The marker registry must declare at least one marker')
    return errors
  }

  const registryMap = new Map()
  registry.forEach((marker, index) => {
    if (!isObject(marker) || !isNonEmptyString(marker.id)) {
      errors.push(`registry[${index}].id must be a non-empty string`)
      return
    }
    if (registryMap.has(marker.id)) {
      errors.push(`registry[${index}].id "${marker.id}" is duplicated`)
      return
    }
    if (!MARKER_KINDS.includes(marker.kind)) {
      errors.push(`registry[${index}].kind "${marker.kind}" is not one of: ${MARKER_KINDS.join(', ')}`)
      return
    }
    registryMap.set(marker.id, marker)
  })

  languages.forEach((language) => {
    validateDocument(documents[language], language, errors, registryMap)
  })

  const [reference, ...others] = languages
  others.forEach((language) => {
    compareStructure(documents[reference], documents[language], language, errors, registryMap)
  })

  if (layout !== undefined) validateLayout(layout, documents[reference], registryMap, errors)

  return errors
}
