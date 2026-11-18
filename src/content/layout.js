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
        right: { sections: [{ section: 'skills' }, { section: 'languages' }] },
      },
      {
        left: { sections: [{ section: 'hobbies', items: [0, 1] }] },
        right: { sections: [{ section: 'hobbies', items: [1, 2] }] },
      },
    ],
  },
  career: {
    pages: [
      {
        left: { sections: [{ section: 'timeline', items: [0, 1] }] },
        right: { sections: [{ section: 'timeline', items: [1, 2] }] },
      },
      {
        left: { sections: [{ section: 'timeline', items: [2, 3] }] },
        right: { sections: [{ section: 'timeline', items: [3, 4] }] },
      }
    ],
  },
  studies: {
    pages: [
      {
        left: { sections: [{ section: 'education', items: [0, 1] }] },
        right: { sections: [{ section: 'education', items: [1] }] },
      },
    ],
  },
  contact: {
    pages: [
      {
        left: { sections: [{ section: 'email' }, { section: 'info' }] },
        right: { sections: [{ section: 'links' }] },
      },
    ],
  },
}