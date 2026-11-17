# Spec Delta

## MODIFIED Requirements

### Requirement: Slices are authored deterministically

Leaf content SHALL be sliced from the active localized content document when notebook pages are built. A layout module separate from content SHALL declare each page pair's bounded slice by stable section id, optional component range, or optional item range; boundaries SHALL be chosen so the longest supported locale fits at the narrowest supported viewport, and the runtime MUST NOT measure rendered height or generate pairs dynamically.

#### Scenario: Pair declares its slice

- **WHEN** the notebook pages are built
- **THEN** each page pair carries the bounded subset of items it renders and each page component receives only that subset

#### Scenario: Slices fit both locales at the narrowest viewport

- **WHEN** the notebook is viewed at 484×885 with Portuguese and with English content
- **THEN** every leaf shows its complete slice without scrolling, without clipped text, and without content overlapping the corner-navigation area

#### Scenario: No runtime pagination

- **WHEN** the notebook renders or changes spread
- **THEN** no layout measurement, reflow loop, or dynamic pair generation occurs

#### Scenario: Layout references content by stable ids

- **WHEN** a page slice names a section, a component range, or an item range
- **THEN** the builder resolves it against the active content document without changing content order

#### Scenario: Layout coverage is validated

- **WHEN** a section or item is missing from the layout or is referenced more than once
- **THEN** page generation fails and identifies the uncovered or duplicated content
