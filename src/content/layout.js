/**
 * Notebook pagination (presentation), kept separate from content.
 *
 * Each narrative marker declares page pairs. A side is either `null` (blank
 * leaf) or:
 *   {
 *     sections: [
 *       { section: 'skills' },                      // whole section
 *       { section: 'results', components: [0, 2] }, // content[0..1]
 *       { section: 'timeline', items: [2] }         // repeatable items[2..]
 *     ]
 *   }
 *
 * Every non-blank narrative side receives its marker label as the page title.
 * Ranges are `[start, end)`; `[start]` runs to the end. `items` requires the
 * section to contain exactly one `positions`, `list`, or `links` block.
 */
export const notebookLayout = {
  about: {
    pages: [
      {
        left: { sections: [{ section: 'about-me-text' }] },
        right: { sections: [{ section: 'skills' }] },
      },
    ],
  },
  career: {
    pages: [
      {
        left: {
          sections: [
            { section: 'current-role' },
            { section: 'timeline', items: [0, 1] },
          ],
        },
        right: { sections: [{ section: 'goals' }] },
      },
      {
        left: { sections: [{ section: 'timeline', items: [1, 2] }] },
        right: null,
      },
      {
        left: { sections: [{ section: 'timeline', items: [2] }] },
        right: null,
      },
    ],
  },
  studies: {
    pages: [
      {
        left: { sections: [{ section: 'education', items: [0, 1] }] },
        right: { sections: [{ section: 'courses' }] },
      },
      {
        left: { sections: [{ section: 'education', items: [1] }] },
        right: { sections: [{ section: 'projects' }] },
      },
      {
        left: { sections: [{ section: 'achieviments' }] },
        right: null,
      },
    ],
  },
  contact: {
    pages: [
      {
        left: { sections: [{ section: 'email' }] },
        right: { sections: [{ section: 'links' }] },
      },
    ],
  },
}
