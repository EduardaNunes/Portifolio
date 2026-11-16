# Tasks

## 1. Palette policy

- [ ] 1.1 Inventory every current interface color literal/token in `src/styles/index.css` and document the approved palette, semantic groups, black icon ink, and rule for adding colors in `README.md`; verify every documented value exists in the stylesheet and the documentation covers theme, paper, tabs, accents, white, grays, and alpha effects.
- [ ] 1.2 Define or consolidate the notebook's reusable palette tokens without adding undocumented opaque colors; verify the page stack, tabs, icons, and page treatments reference approved values only.

## 2. Physical notebook depth and tab anchoring

- [ ] 2.1 Add non-interactive left and right gray page-stack layers between the cover boards and the active spread in `NarrativeNotebook.jsx`/`index.css`; verify the stack is visibly layered in both themes while the white leaves remain on top.
- [ ] 2.2 Inset the spread and page-turn geometry for the page-stack thickness without changing the two-leaf spread, 3D turn, reduced-motion path, or corner navigation; verify forward/backward turns and first/last corner limits work.
- [ ] 2.3 Update the shared tab layout so inactive tabs touch the page stack and only active section/category tabs touch their adjacent top white leaf; verify left/right, hover, focus, active, and narrow-gutter expansion anchors through manual responsive testing.
- [ ] 2.4 Apply the approved black ink directly to tab SVG icons independently of theme inheritance; verify icons remain black and visible after toggling both themes.

## 3. Pixel-art page presentation

- [ ] 3.1 Add reusable, contained pixel-paper styles for page headings, section bands, entry rows, separators, chips, action links, and media frames; verify decorations neither add document horizontal scroll nor expose leaf scrollbars.
- [ ] 3.2 Refine About Me, Career, Studies, and Contact page markup/styles to use the shared pixel-paper hierarchy while retaining localized labels, existing information split, email, and social-link actions; verify both Portuguese and English views remain readable and keyboard-operable.
- [ ] 3.3 Refine project left/right page markup/styles to use the shared pixel-paper hierarchy while retaining metadata, technology tags, repository link, thumbnail/video, overlay, and deploy action; verify all project links remain visible, focusable, and operable.
- [ ] 3.4 Validate long leaf content and narrow layouts retain vertical leaf reading and keep every decoration, text block, and interactive control inside its 50% leaf without horizontal document scroll.

## 4. Integration verification

- [ ] 4.1 Run `npm run build` and fix any build failures; verify the production build completes successfully.
- [ ] 4.2 Manually validate both themes on desktop and the established narrow viewport: approved palette compliance, page-stack depth, active/inactive tab placement, black icons, keyboard focus, category filtering, page turns, reduced motion, long-content reading, and project/contact actions.
- [ ] 4.3 Run `openspec validate refine-notebook-page-stack --strict` and resolve all validation errors and warnings.
