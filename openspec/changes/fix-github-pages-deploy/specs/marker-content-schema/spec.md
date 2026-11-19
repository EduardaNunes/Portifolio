# Spec Delta

## ADDED Requirements

### Requirement: Referenced local public assets must exist

Build-time content validation SHALL resolve every `src` in a `projectDemo` block that starts with `/images/`, `/Videos/`, or `/Sounds/` against the `public/` directory and SHALL fail when the file is absent. External URLs MUST NOT be checked against the local filesystem.

#### Scenario: Missing media file fails validation

- **WHEN** a demo references `/images/openspec.jpg` and `public/images/openspec.jpg` does not exist
- **THEN** validation fails with the marker, project, demo index, and `src` field that are responsible

#### Scenario: Existing media file passes

- **WHEN** every local demo media reference has a matching file under `public/`
- **THEN** validation passes

#### Scenario: External URL is not checked locally

- **WHEN** a demo media reference starts with `https://` or `http://`
- **THEN** validation does not look for it in the local filesystem
