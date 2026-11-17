# Tasks

## 1. CSS Tokens and New Page Classes

- [x] 1.1 Add `--page-ink`, `--page-ink-soft`, `--page-line` token aliases to `.notebook-leaf` in `src/styles/index.css` (Section 5.1). Verify: tokens resolve to `--paper-accent` (#145053) and `--strong` (#26696d) in browser dev tools on a notebook leaf.
- [x] 1.2 Implement `.page-title` class with centered alignment, clamp sizing, no border/background, ink color (Section 5.2). Verify: a test `h2.page-title` renders centered, larger than body text, no box.
- [x] 1.3 Implement `.page-label` class with uppercase, centered, pixel-stepped underline via `::after` (Section 5.2). Verify: label renders uppercase, centered, with two-segment dotted underline (full width + 50% offset).
- [x] 1.4 Implement `.page-field` with inline label/value, dotted bottom ruled line, uppercase label with trailing colon (Section 5.3). Verify: label and value wrap together, rule stays under last fragment, no solid borders.
- [x] 1.5 Implement `.page-field-pair` flex container for side-by-side fields with responsive wrap (Section 5.3). Verify: two fields sit side-by-side on wide leaf, stack on narrow (484px).
- [x] 1.6 Implement `.page-list` / `.page-list-item` with circular `.page-marker` (pending/filled via `.is-done`), dotted bottom rule (Section 5.4). Verify: markers are 0.65rem circles, 2px ink border; `.is-done` shows ink fill with 2px paper inset shadow; rule under each item.
- [x] 1.7 Implement `.page-note` with 1px ink border, 3px stepped corners via `clip-path`, internal ruled lines matching `line-height: 1.6`, `.note-title` uppercase (Section 5.5). Verify: box has stepped corners, text lines sit on dotted rules, no forced min-height.
- [x] 1.8 Implement `.page-action` / `.page-actions` unified button style: uppercase, 2px ink border, square corners, min-height 1.9rem, paper bg/ink text, hover invert, focus-visible outline (Section 5.6). Verify: all action buttons share identical visual; hover inverts colors; focus shows 2px `--paper-text` outline.
- [x] 1.9 Implement `.page-chip` for tags: uppercase, 1px ink border, square corners, 0.5rem font, minimal padding (Section 5.7). Verify: chips render inline, wrap in container, consistent with reference tag style.
- [x] 1.10 Document the three token aliases in `README.md` "Notebook paper palette" section. Verify: README shows `--page-ink`, `--page-ink-soft`, `--page-line` with source color references.

## 2. CSS Simplifications (Remove Legacy Grouping Boxes)

- [x] 2.1 Remove border and padding from `.pixel-art-entry-list`, `.pixel-art-media-frame`, `.pixel-art-section` (Section 5.8). Verify: these containers no longer draw boxes; content flow unaffected.
- [x] 2.2 Ensure `.pixel-art-header` is no longer used on `h2`/`h3` (will be replaced in JSX). Verify: no `h2.pixel-art-header` or `h3.pixel-art-header` selectors remain targeting headings.
- [x] 2.3 Keep `.pixel-art-container::before` (corner mark) and `.pixel-art-media-frame` as image frame only. Verify: corner mark and media frame still render correctly on project pages.

## 3. AboutMePage.jsx Migration

- [x] 3.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title` for heading. Verify: title centered, no box.
- [x] 3.2 Left leaf: Replace skills section `h3.pixel-art-header` with `h3.page-label`; each skill as `.page-field` with `.field-label` (skill name) and `.field-value` containing `.page-chip` per tag (replace `join(', ')`). Verify: skills show as label: chip chip chip on ruled lines.
- [x] 3.3 Left leaf: Replace soft skills section `h3.pixel-art-header` with `h3.page-label`; each as `.page-field` with label (name) and value (description). Verify: soft skills render as ruled label:value rows.
- [x] 3.4 Right leaf: Promote `labels.results` to `h2.page-title` (centered). Verify: "Resultados" appears as centered page title.
- [x] 3.5 Right leaf: Replace results list with `.page-note` per result (`.note-title` = result.title, `<p>` = description), `.page-action` for link at end of note. Verify: each result in stepped-corner box with internal rules, link styled as unified button.

## 4. CareerPage.jsx Migration

- [x] 4.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Carreira" centered.
- [x] 4.2 Left leaf: Move `currentRole` into `.page-note` (no title, just `<p>`). Verify: current role in stepped-corner box with internal rules.
- [x] 4.3 Left leaf: Replace timeline section `h3.pixel-art-header` with `h3.page-label`; each position: `.page-field` for title (prominent), then `.page-field-pair` with company and duration, then description as plain text. Verify: timeline shows title on ruled line, company/duration side-by-side on ruled lines, description below.
- [x] 4.4 Right leaf: Promote `labels.goals` to `h2.page-title` ("Próximos Passos"). Verify: centered page title.
- [x] 4.5 Right leaf: Replace goals list with `.page-list` + `.page-list-item` + `.page-marker` (empty, no `.is-done`). Verify: goals show circular empty markers on ruled lines.

## 5. StudiesPage.jsx Migration

- [x] 5.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Estudos" centered.
- [x] 5.2 Left leaf: Replace education section `h3.pixel-art-header` with `h3.page-label`; each item: `.page-field` for institution, `.page-field-pair` for degree and dates, description in `.page-note`. Verify: education entries use ruled lines, side-by-side degree/dates, description in stepped box.
- [x] 5.3 Right leaf: No page title (two groups). Keep `labels.courses` and `labels.projects` as `h3.page-label`. Verify: two section labels with stepped underlines.
- [x] 5.4 Right leaf courses: Replace with `.page-list` + `.page-marker` (`.is-done` when `course.completion` true). Remove `✓`/`…` characters. Verify: courses show filled/empty circular markers on ruled lines.
- [x] 5.5 Right leaf academic projects: Replace with `.page-list-item` containing project title and `.page-action` for link. Rename `project-title` class usage to `academic-project-title`. Verify: projects listed with unified action buttons, no class collision with ProjectLeftPage.

## 6. ContactPage.jsx Migration

- [x] 6.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Contato" centered.
- [x] 6.2 Left leaf: Email as `.page-field` (value only, no hard-coded label). Verify: email on ruled line.
- [x] 6.3 Left leaf: Contact button in `.page-actions` + `.page-action` with `labels.message`. Verify: button uses unified style, right-aligned group.
- [x] 6.4 Right leaf: Replace social links with `.page-list` of `.page-field` (icon + service name as label) + `.page-action` (short "Abrir" or icon-only) per link. Keep existing `aria-label`s. Verify: each social link is a ruled row with unified action button.

## 7. ProjectLeftPage.jsx Migration

- [x] 7.1 Replace `h2.project-title.pixel-art-header` with `h2.page-title`. Verify: project title centered, no box.
- [x] 7.2 Replace description `<p>` with `.page-note` (no title, just `<p>` with description). Verify: description in stepped-corner box with internal rules.
- [x] 7.3 Replace tech stack: `h3.page-label` with `labels.techStack`, tags as `.page-chip` in `.tech-tags-container`. Verify: "Tech Stack" label with stepped underline, chips inline.
- [x] 7.4 Replace repo link: `.page-actions` + `.page-action` with icon + `labels.viewSource`. Verify: unified button style, right-aligned.

## 8. ProjectRightPage.jsx Migration

- [x] 8.1 Deploy button: Keep absolute top-right position; replace classes with `.page-action` (visual only). Verify: button at same position, unified uppercase/border/hover style.
- [x] 8.2 Thumbnail caption: Centered, uppercase, `--page-ink-soft` color. Verify: caption styled per reference.
- [x] 8.3 Demo label/value: Replace with `.page-field` (label `labels.demo`, value projectTitle). Verify: ruled line under the pair.
- [x] 8.4 No page title on right leaf (per planning doc). Verify: no `h2.page-title` on project right leaf.

## 9. Verification and Acceptance

- [x] 9.1 Run `npm run build` — verify zero errors. Verify: build completes successfully.
- [x] 9.2 Visual regression at 484×885 viewport: open notebook, navigate all spreads and continuation pairs (About Me, Career, Studies, Projects, Contact). Verify: no horizontal scroll, no scroll offset inside any leaf, titles centered, labels with stepped underlines, ruled lines on all data/list items, markers circular, info boxes with stepped corners, buttons unified.
- [x] 9.3 Visual regression at desktop viewport (e.g., 1440px). Verify: same as above, layout scales via clamp(), no leaf clips content.
- [x] 9.4 PT/EN locale test: switch language, verify all text renders correctly, no truncation/overlap/clipping, uppercase via `text-transform` only. Verify: both locales fit their slices, long Portuguese texts wrap without overflow.
- [x] 9.5 Accessibility spot-check: tab through notebook, verify focus-visible outlines on all actions, screen reader announces completed markers (sr-only), semantic h2/h3 hierarchy preserved. Verify: keyboard nav works, focus visible, ARIA correct.
- [x] 9.6 Reduced motion: enable prefers-reduced-motion, verify page turns still work (fade only), no new animations introduced. Verify: turn animation respects preference.
- [x] 9.7 Cleanup: Remove unused `.pixel-art-*` classes from `index.css` (entry-list, media-frame, section, header on h2/h3, entry, entry-label/value/action, chip, separator). Verify: no dead CSS, build still passes.
- [x] 9.8 Confirm all acceptance criteria from planning doc Section 9 are met, including no-scroll leaves and content continuation. Verify: checklist all green.

## 10. No-Scroll Leaves and Content Continuation

- [x] 10.1 Replace `.notebook-leaf` scrolling with a fixed page: `overflow: hidden` and remove `overflow-y: auto`, the hidden `::-webkit-scrollbar` rule, `scrollbar-width`, `-ms-overflow-style`, `overscroll-behavior`, and `touch-action: pan-y`. Verify: wheel, touch drag, PageDown, and arrow keys produce no scroll offset in any leaf.
- [x] 10.2 Add small slicing helpers in `src/utils/buildNotebookPages.js` and document the slice contract next to the page-pair definitions. Verify: each pair receives an explicit bounded subset; no runtime height measurement.
- [x] 10.3 About Me: split into two page pairs — pair 1 left = title + technical skills, pair 1 right = title + first two results; pair 2 left = running head + soft skills, pair 2 right = running head + last two results. Verify: each leaf shows its complete slice at 484×885 and desktop in both locales, with text clear of the corner-arrow area.
- [x] 10.4 Career: split into three page pairs — pair 1 left = title + current role + first timeline entry, pair 1 right = title + goals; pair 2 left = running head + timeline label + second entry, pair 2 right = blank paper; pair 3 left = running head + timeline label + last two entries, pair 3 right = blank paper. Verify: no invented copy on the blank leaves and no clipped or arrow-overlapping text on the left leaves.
- [x] 10.5 Add optional `runningHead` to `AboutMePage`, `CareerPage`, and `StudiesPage` (and `ContactPage` if needed): render it as `p.page-label` instead of `page-title`, and repeat the enclosing group label when a slice starts mid-group. Verify: page title appears only on the first leaf of each side, running head uses existing localized strings.
- [x] 10.6 Studies: split into two page pairs — pair 1 left = title + first education entry, pair 1 right = courses; pair 2 left = running head + second education entry, pair 2 right = running head + academic projects. Verify: content complete and every leaf fits both locales without scrolling.
- [x] 10.7 Project spreads: verify the overview and every project leaf in both locales; if a description or tech stack overflows, add a continuation pair (description continued on the left, right blank) while keeping the repository, deploy, and demo controls visible. Verify: no clipped or truncated project content.
- [x] 10.8 Contact: verify the single pair fits both locales. Verify: no extra pair needed; e-mail and social actions remain visible.
- [x] 10.9 Navigation: confirm continuation pairs follow their marker in `spreads`, corner navigation reaches them before the next marker, marker tabs open the first pair, and the page turn plays once per pair. Verify: no skipped or repeated pair.
- [x] 10.10 Accessibility: running heads use `p.page-label` rather than a heading, continuation leaves keep marker `aria-hidden` plus sr-only state, and focus-visible outlines remain visible. Verify: heading order and keyboard navigation are unchanged.
- [x] 10.11 Final PT/EN pass at 484×885 and desktop: assert every leaf's text is fully visible and clear of the corner-arrow area, no leaf scrolls on either axis, and content order is preserved with no duplicates. Verify: both locales and all continuation pairs pass.

## Workflow follow-up

- Group 10 was added after the first implementation pass because leaves must never scroll. Items 9.1–9.4 and 9.8 were re-opened and must be repeated after group 10 is implemented.
- Re-run `openspec-apply-change` for this change before archiving.
- Archive the change after implementation is complete and verified.
- Verify the archived specs appear in `openspec/specs/` with updated requirements, including the new `notebook-page-flow` capability.