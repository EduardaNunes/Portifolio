# Spec Delta

## Purpose

Defines how the portfolio is published to GitHub Pages: production serves only the compiled Vite build artifact, deployment requires GitHub Actions as the Pages source, and build failures leave the last good deployment untouched.

## ADDED Requirements

### Requirement: Production serves only the compiled build artifact

The Pages site SHALL be published from the `dist` artifact produced by `npm run build`; repository source files MUST NOT be served in production. The live entry document SHALL reference the hashed JavaScript and CSS emitted under the configured `/Portifolio/` base path.

#### Scenario: Live entry references the built bundle

- **WHEN** a visitor requests `https://eduardanunes.github.io/Portifolio/`
- **THEN** the returned HTML references `/Portifolio/assets/index-*.js` and its stylesheet

#### Scenario: Development entry is never public

- **WHEN** the production entry document is inspected
- **THEN** it contains no reference to `/src/main.jsx` or any other unbundled source module

### Requirement: Deployment requires GitHub Actions as the Pages source

Before uploading an artifact, the deployment workflow SHALL verify that the Pages site uses `build_type` equal to `workflow`. When it does not, the workflow SHALL fail with an actionable message naming Settings → Pages → Source.

#### Scenario: Branch source blocks the workflow

- **WHEN** the Pages site is configured to deploy from a branch
- **THEN** the workflow fails before uploading and reports that the source must be set to GitHub Actions

#### Scenario: Actions source allows deployment

- **WHEN** the Pages site is configured with GitHub Actions as its source
- **THEN** the workflow uploads the artifact and proceeds to deploy

### Requirement: Build output is verified before upload

The workflow SHALL inspect the generated `dist/index.html` before uploading it, requiring asset references under the configured base path and rejecting any reference to `/src/main.jsx`.

#### Scenario: Verified output is uploaded

- **WHEN** `dist/index.html` references `/Portifolio/assets/` and has no source entry
- **THEN** verification passes and the artifact is uploaded

#### Scenario: Unverified output is rejected

- **WHEN** `dist/index.html` still references `/src/main.jsx`
- **THEN** verification fails and reports the offending reference

### Requirement: Base path matches the Pages site

The workflow SHALL verify that the Vite base path matches the Pages site base path so every emitted asset URL resolves under the project URL.

#### Scenario: Base path matches

- **WHEN** the Pages site base path is `/Portifolio`
- **THEN** the workflow accepts the build and deploys it

#### Scenario: Base path diverges

- **WHEN** the Pages site base path differs from the Vite base path
- **THEN** the workflow fails and reports the expected and actual values

### Requirement: Failed builds preserve the last good deployment

A build, content validation, or output verification failure SHALL prevent artifact upload and deployment, leaving the currently published site unchanged.

#### Scenario: Content validation fails

- **WHEN** `npm run build` exits non-zero because content validation fails
- **THEN** no artifact is uploaded and the live site remains on its previous deployment

#### Scenario: Output verification fails

- **WHEN** the pre-upload output verification rejects `dist/index.html`
- **THEN** no deployment replaces the live site
