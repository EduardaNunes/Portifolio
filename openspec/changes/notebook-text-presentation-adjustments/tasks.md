# Tasks

## 1. CSS Tokens and New Page Classes

- [ ] 1.1 Add `--page-ink`, `--page-ink-soft`, `--page-line` token aliases to `.notebook-leaf` in `src/styles/index.css` (Section 5.1). Verify: tokens resolve to `--paper-accent` (#145053) and `--strong` (#26696d) in browser dev tools on a notebook leaf.
- [ ] 1.2 Implement `.page-title` class with centered alignment, clamp sizing, no border/background, ink color (Section 5.2). Verify: a test `h2.page-title` renders centered, larger than body text, no box.
- [ ] 1.3 Implement `.page-label` class with uppercase, centered, pixel-stepped underline via `::after` (Section 5.2). Verify: label renders uppercase, centered, with two-segment dotted underline (full width + 50% offset).
- [ ] 1.4 Implement `.page-field` with inline label/value, dotted bottom ruled line, uppercase label with trailing colon (Section 5.3). Verify: label and value wrap together, rule stays under last fragment, no solid borders.
- [ ] 1.5 Implement `.page-field-pair` flex container for side-by-side fields with responsive wrap (Section 5.3). Verify: two fields sit side-by-side on wide leaf, stack on narrow (484px).
- [ ] 1.6 Implement `.page-list` / `.page-list-item` with circular `.page-marker` (pending/filled via `.is-done`), dotted bottom rule (Section 5.4). Verify: markers are 0.65rem circles, 2px ink border; `.is-done` shows ink fill with 2px paper inset shadow; rule under each item.
- [ ] 1.7 Implement `.page-note` with 1px ink border, 3px stepped corners via `clip-path`, internal ruled lines matching `line-height: 1.6`, `.note-title` uppercase (Section 5.5). Verify: box has stepped corners, text lines sit on dotted rules, no forced min-height.
- [ ] 1.8 Implement `.page-action` / `.page-actions` unified button style: uppercase, 2px ink border, square corners, min-height 1.9rem, paper bg/ink text, hover invert, focus-visible outline (Section 5.6). Verify: all action buttons share identical visual; hover inverts colors; focus shows 2px `--paper-text` outline.
- [ ] 1.9 Implement `.page-chip` for tags: uppercase, 1px ink border, square corners, 0.5rem font, minimal padding (Section 5.7). Verify: chips render inline, wrap in container, consistent with reference tag style.
- [ ] 1.10 Document the three token aliases in `README.md` "Notebook paper palette" section. Verify: README shows `--page-ink`, `--page-ink-soft`, `--page-line` with source color references.

## 2. CSS Simplifications (Remove Legacy Grouping Boxes)

- [ ] 2.1 Remove border and padding from `.pixel-art-entry-list`, `.pixel-art-media-frame`, `.pixel-art-section` (Section 5.8). Verify: these containers no longer draw boxes; content flow unaffected.
- [ ] 2.2 Ensure `.pixel-art-header` is no longer used on `h2`/`h3` (will be replaced in JSX). Verify: no `h2.pixel-art-header` or `h3.pixel-art-header` selectors remain targeting headings.
- [ ] 2.3 Keep `.pixel-art-container::before` (corner mark) and `.pixel-art-media-frame` as image frame only. Verify: corner mark and media frame still render correctly on project pages.

## 3. AboutMePage.jsx Migration

- [ ] 3.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title` for heading. Verify: title centered, no box.
- [ ] 3.2 Left leaf: Replace skills section `h3.pixel-art-header` with `h3.page-label`; each skill as `.page-field` with `.field-label` (skill name) and `.field-value` containing `.page-chip` per tag (replace `join(', ')`). Verify: skills show as label: chip chip chip on ruled lines.
- [ ] 3.3 Left leaf: Replace soft skills section `h3.pixel-art-header` with `h3.page-label`; each as `.page-field` with label (name) and value (description). Verify: soft skills render as ruled label:value rows.
- [ ] 3.4 Right leaf: Promote `labels.results` to `h2.page-title` (centered). Verify: "Resultados" appears as centered page title.
- [ ] 3.5 Right leaf: Replace results list with `.page-note` per result (`.note-title` = result.title, `<p>` = description), `.page-action` for link at end of note. Verify: each result in stepped-corner box with internal rules, link styled as unified button.

## 4. CareerPage.jsx Migration

- [ ] 4.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Carreira" centered.
- [ ] 4.2 Left leaf: Move `currentRole` into `.page-note` (no title, just `<p>`). Verify: current role in stepped-corner box with internal rules.
- [ ] 4.3 Left leaf: Replace timeline section `h3.pixel-art-header` with `h3.page-label`; each position: `.page-field` for title (prominent), then `.page-field-pair` with company and duration, then description as plain text. Verify: timeline shows title on ruled line, company/duration side-by-side on ruled lines, description below.
- [ ] 4.4 Right leaf: Promote `labels.goals` to `h2.page-title` ("Próximos Passos"). Verify: centered page title.
- [ ] 4.5 Right leaf: Replace goals list with `.page-list` + `.page-list-item` + `.page-marker` (empty, no `.is-done`). Verify: goals show circular empty markers on ruled lines.

## 5. StudiesPage.jsx Migration

- [ ] 5.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Estudos" centered.
- [ ] 5.2 Left leaf: Replace education section `h3.pixel-art-header` with `h3.page-label`; each item: `.page-field` for institution, `.page-field-pair` for degree and dates, description in `.page-note`. Verify: education entries use ruled lines, side-by-side degree/dates, description in stepped box.
- [ ] 5.3 Right leaf: No page title (two groups). Keep `labels.courses` and `labels.projects` as `h3.page-label`. Verify: two section labels with stepped underlines.
- [ ] 5.4 Right leaf courses: Replace with `.page-list` + `.page-marker` (`.is-done` when `course.completion` true). Remove `✓`/`…` characters. Verify: courses show filled/empty circular markers on ruled lines.
- [ ] 5.5 Right leaf academic projects: Replace with `.page-list-item` containing project title and `.page-action` for link. Rename `project-title` class usage to `academic-project-title`. Verify: projects listed with unified action buttons, no class collision with ProjectLeftPage.

## 6. ContactPage.jsx Migration

- [ ] 6.1 Left leaf: Replace `h2.pixel-art-header` with `h2.page-title`. Verify: "Contato" centered.
- [ ] 6.2 Left leaf: Email as `.page-field` (label "E-mail" / value). Verify: email on ruled line.
- [ ] 6.3 Left leaf: Contact button in `.page-actions` + `.page-action` with `labels.message`. Verify: button uses unified style, right-aligned group.
- [ ] 6.4 Right leaf: Replace social links with `.page-list` of `.page-field` (icon + service name as label) + `.page-action` (short "Abrir" or icon-only) per link. Keep existing `aria-label`s. Verify: each social link is a ruled row with unified action button.

## 7. ProjectLeftPage.jsx Migration

- [ ] 7.1 Replace `h2.project-title.pixel-art-header` with `h2.page-title`. Verify: project title centered, no box.
- [ ] 7.2 Replace description `<p>` with `.page-note` (no title, just `<p>` with description). Verify: description in stepped-corner box with internal rules.
- [ ] 7.3 Replace tech stack: `h3.page-label` with `labels.techStack`, tags as `.page-chip` in `.tech-tags-container`. Verify: "Tech Stack" label with stepped underline, chips inline.
- [ ] 7.4 Replace repo link: `.page-actions` + `.page-action` with icon + `labels.viewSource`. Verify: unified button style, right-aligned.

## 8. ProjectRightPage.jsx Migration

- [ ] 8.1 Deploy button: Keep absolute top-right position; replace classes with `.page-action` (visual only). Verify: button at same position, unified uppercase/border/hover style.
- [ ] 8.2 Thumbnail caption: Centered, uppercase, `--page-ink-soft` color. Verify: caption styled per reference.
- [ ] 8.3 Demo label/value: Replace with `.page-field` (label `labels.demo`, value projectTitle). Verify: ruled line under the pair.
- [ ] 8.4 No page title on right leaf (per planning doc). Verify: no `h2.page-title` on project right leaf.

## 9. Verification and Acceptance

- [ ] 9.1 Run `npm run build` — verify zero errors. Verify: build completes successfully.
- [ ] 9.2 Visual regression at 484×885 viewport: open notebook, navigate all spreads (About Me, Career, Studies, Projects, Contact). Verify: no horizontal scroll, vertical scroll works, titles centered, labels with stepped underlines, ruled lines on all data/list items, markers circular, info boxes with stepped corners, buttons unified.
- [ ] 9.3 Visual regression at desktop viewport (e.g., 1440px). Verify: same as above, layout scales via clamp().
- [ ] 9.4 PT/EN locale test: switch language, verify all text renders correctly, no truncation/overlap, uppercase via `text-transform` only. Verify: both locales work, long Portuguese texts wrap.
- [ ] 9.5 Accessibility spot-check: tab through notebook, verify focus-visible outlines on all actions, screen reader announces completed markers (sr-only), semantic h2/h3 hierarchy preserved. Verify: keyboard nav works, focus visible, ARIA correct.
- [ ] 9.6 Reduced motion: enable prefers-reduced-motion, verify page turns still work (fade only), no new animations introduced. Verify: turn animation respects preference.
- [ ] 9.7 Cleanup: Remove unused `.pixel-art-*` classes from `index.css` (entry-list, media-frame, section, header on h2/h3, entry, entry-label/value/action, chip, separator). Verify: no dead CSS, build still passes.
- [ ] 9.8 Confirm all acceptance criteria from planning doc Section 9 are met. Verify: checklist all green.

## Workflow follow-up

- Archive the change after implementation is complete and verified.
- Verify the archived specs appear in `openspec/specs/` with updated requirements.