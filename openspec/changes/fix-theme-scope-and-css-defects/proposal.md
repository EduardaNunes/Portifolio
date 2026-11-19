# Proposal

## Why

Two defects sit in the stylesheet layer and neither breaks the build, so they ship unnoticed:

1. **The light theme silently fails on two notebook components.** `ProjectButton.module.css` and `ProjectDemoBlock.module.css` scope their light-theme overrides as `.lightmode .repoBtn` / `.lightmode .projectDeployBtn`. CSS Modules hashes `.lightmode`, so the selector can never match the global `lightmode` class on the page root. Repository and deploy controls keep their dark-theme colors in light mode. `Thumbnail.module.css` already does this correctly with `:global(.lightmode)`.
2. **`src/styles/index.css` is partly dead code.** Twelve declarations end in a period instead of a semicolon, so the bundler drops them silently along with the declaration that follows. Two identical `@media (max-width: 600px)` blocks overlap, roughly forty selectors match no markup, and four CSS Modules export classes their components never use.

## What Changes

- Fix the theme-scope bug by using `:global(.lightmode)` in `ProjectButton.module.css` and `ProjectDemoBlock.module.css`, matching the pattern already used in `Thumbnail.module.css`.
- Correct the twelve `property: value.` typos in `src/styles/index.css` so the declarations actually apply.
- Merge the duplicate `@media (max-width: 600px)` blocks.
- Delete selectors and module classes that no component references, including the leftover deploy-button styles in `ProjectDemoBlock.module.css`.
- Bring the documented palette in `README.md` back in line with the tokens actually defined in `src/styles/index.css`.

## Capabilities

### New Capabilities

<!-- None. -->

### Modified Capabilities

- `site-color-palette`: ADD a requirement that notebook interactive controls follow the active theme accent. Today the palette is only described as a static allow-list; nothing states that a control must re-color when the theme toggles, which is exactly the behavior the broken selectors violate.

## Impact

- `src/components/notebook-content/ProjectButton/ProjectButton.module.css`
- `src/components/notebook-content/ProjectDemoBlock/ProjectDemoBlock.module.css`
- `src/components/notebook-content/Thumbnail/Thumbnail.module.css` (dead classes only)
- `src/components/notebook-content/LinksBlock/LinksBlock.module.css`
- `src/components/notebook-content/ListBlock/ListBlock.module.css`
- `src/styles/index.css`
- `README.md`

No JavaScript behavior changes. No new dependencies.
