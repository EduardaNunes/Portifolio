#!/usr/bin/env node
/**
 * Validates the notebook content documents before dev/build.
 *
 * Usage:
 *   node scripts/validate-content.mjs [contentDir]
 *
 * `contentDir` defaults to `src/content`; tests can point it at a temporary
 * copy to prove that broken content fails with a precise path.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { validateNotebookContent } from '../src/content/validateContent.js'
import { markerRegistry } from '../src/content/markers.js'
import { notebookLayout } from '../src/content/layout.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const contentDir = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, 'src', 'content')

function readDocument(fileName) {
  const filePath = path.join(contentDir, fileName)
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch (error) {
    console.error(`Could not read ${filePath}: ${error.message}`)
    process.exit(1)
  }
}

const documents = {
  pt: readDocument('pt.json'),
  eng: readDocument('eng.json'),
}

const errors = validateNotebookContent({ documents, registry: markerRegistry, layout: notebookLayout })

if (errors.length > 0) {
  console.error(`Content validation failed with ${errors.length} error(s):`)
  errors.forEach((error) => console.error(`  - ${error}`))
  process.exit(1)
}

console.log(`Content validation passed (${Object.keys(documents).join(', ')}).`)
