# Spec Delta

## Purpose

Ensures all media assets (images, videos, sounds) referenced in content and components resolve correctly under Vite's base path (`/Portifolio/`) in all environments (dev, preview, production).

## ADDED Requirements

### Requirement: Content asset paths use base-aware resolution
All asset paths in content documents (pt.json, eng.json) SHALL resolve to the correct URL when Vite's base path is `/Portifolio/`. Paths MUST NOT hardcode the base path; instead they SHALL use a base-aware resolution strategy that works in both dev and production.

#### Scenario: Demo image path resolves with base path
- **WHEN** a project demo references an image at `/images/projects/portfolio-web.svg` in content
- **THEN** the rendered `<img src>` is `/Portifolio/images/projects/portfolio-web.svg` in production and dev

#### Scenario: Sound paths resolve with base path
- **WHEN** page-turn or theme-toggle sounds at `/Sounds/book_page_turn.wav` and `/Sounds/Light-Switch.mp3` are registered for playback
- **THEN** their resolved URLs include `/Portifolio/Sounds/` in all environments

#### Scenario: Video path resolves with base path
- **WHEN** a project demo references a video at `/Videos/ProgramADAs_SalaDeAula.mp4`
- **THEN** the rendered `<video src>` is `/Portifolio/Videos/ProgramADAs_SalaDeAula.mp4` in all environments

### Requirement: CSS public asset URLs resolve with the configured base path
CSS references to the font and image assets SHALL use Vite-bundled asset paths so they resolve under the configured `/Portifolio/` base path in both development and production.

#### Scenario: CSS-managed assets resolve with base path
- **WHEN** the application renders either theme from a production build
- **THEN** its font, cloud, profile, switch, indicator-arrow, and corner-mask asset requests resolve under `/Portifolio/`

### Requirement: Asset resolution works without content migration
Existing content SHALL NOT need to be rewritten with the base path prefix. The resolution SHALL happen at build/render time.

#### Scenario: Legacy absolute paths still work
- **WHEN** content contains absolute paths starting with `/images/`, `/Videos/`, or `/Sounds/`
- **THEN** the rendering pipeline prepends the base path automatically without content changes

## REMOVED Requirements

### Requirement: Content authors must manually include base path in asset URLs
**Reason**: Error-prone and not portable across environments
**Migration**: Asset resolution is now automatic at render time