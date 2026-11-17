# Spec Delta

## MODIFIED Requirements

### Requirement: Content localization support

**When** page content renders  
**THEN** all text content MUST respect the current language setting from the active per-language content document and translations.js (pt/eng locale switching)

#### Scenario: Portuguese locale by default

- **WHEN** page loads without explicit language preference or with pt locale
- **THEN** headings use "Sobre Mim", "Carreira", etc. as specified

#### Scenario: English locale override

- **WHEN** user switches to eng locale via LightSwitch/translation toggle
- **THEN** same heading positions display "About Me", "Career", etc. in English

### Requirement: Configurable marker page-pair content

The layout module SHALL declare one or more page pairs per marker, each containing a left leaf and a right leaf, and SHALL resolve them from the marker content by stable section ids. The marker registry SHALL be the single marker-order source used to render tabs and build the global navigation sequence.

#### Scenario: Marker owns its pair collection

- **WHEN** a marker has page pairs configured
- **THEN** selecting its tab opens its first pair and the global arrows can traverse every pair it owns

#### Scenario: Marker count is editable

- **WHEN** a maintainer adds or removes a configured marker
- **THEN** the notebook renders the resulting marker count and traverses its pairs without requiring a separate navigation-order update
