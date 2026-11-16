# Tasks

## 1. Shared theme treatment

- [ ] 1.1 Add a semantic CSS custom property for notebook highlights with the approved orange value in dark mode and approved blue value in light mode; verify the computed value changes when `body.lightmode` is toggled.
- [ ] 1.2 Add the reusable notebook-scoped `.destaque` rule that consumes the semantic token without changing layout or typography; verify a marked leaf element inherits the expected color.

## 2. Notebook content adoption

- [ ] 2.1 Identify and mark existing notebook content intended as visual emphasis with `destaque` while retaining its structural classes; verify highlighted and non-highlighted text retain their expected hierarchy on each affected page.
- [ ] 2.2 Verify localized notebook content continues to render in Portuguese and English after the shared class is applied; verify language switching preserves both text content and highlight treatment.

## 3. Integration verification

- [ ] 3.1 Build the application with `npm run build` and verify it completes successfully.
- [ ] 3.2 Manually verify an open notebook in both themes and while toggling themes: highlighted text is blue in light mode, orange in dark mode, and page navigation, controls, and leaf readability remain intact.
