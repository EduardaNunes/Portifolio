# Spec Delta

## Purpose

Defines the typed, per-language content model that supplies every notebook marker: stable ids, ordered sections, seven block types with required and optional fields, project lists, and validation that keeps locales and layout aligned.

## ADDED Requirements

### Requirement: Marker content is declared per language with identical structure

Each supported language SHALL have one content document whose marker ids, section ids, block types, and ordering match every other language. Missing, extra, or reordered entries SHALL be validation errors instead of silently rendering different content.

#### Scenario: Locale documents match

- **WHEN** the Portuguese and English content documents are compared
- **THEN** they contain the same marker ids, section ids, block types, and ordering, with no missing or extra entries

#### Scenario: Missing locale content fails

- **WHEN** a language omits a marker, section, or required field that another language provides
- **THEN** validation fails instead of falling back to another language

### Requirement: Markers are identified by stable ids

The top-level keys of a content document SHALL be stable marker ids, and each marker SHALL provide its localized `label`. Tab side, icon, accent, and navigation order SHALL NOT be part of content.

#### Scenario: Marker key survives language change

- **WHEN** the active language changes
- **THEN** the marker id remains the same while its `label` changes to the active language

#### Scenario: Presentation metadata stays outside content

- **WHEN** an editor adds or edits content
- **THEN** no tab side, icon, accent, or navigation-order field is required in the content document

### Requirement: Sections group ordered content under an optional subheader

Each marker SHALL declare an ordered `sections` array. Every section SHALL have an `id` unique within its marker and SHALL contain an ordered `content` array of typed blocks. A section MAY declare a localized `subHeader`.

#### Scenario: Section order is preserved

- **WHEN** a marker renders
- **THEN** its sections appear in the order declared in the content document

#### Scenario: Section id is required and unique

- **WHEN** two sections share an id or a section omits its id
- **THEN** validation fails with the marker and section that caused the problem

#### Scenario: Subheader is optional

- **WHEN** a section omits `subHeader`
- **THEN** its blocks render without a section label

### Requirement: Content blocks are typed and closed to unknown types

Each block SHALL declare a `type` from the supported set: `blocks`, `text`, `positions`, `email`, `links`, `list`, or `projectDemo`. A missing or unknown type SHALL fail validation.

#### Scenario: Known type uses its renderer

- **WHEN** a block declares a supported type
- **THEN** the renderer for that type draws the block

#### Scenario: Unknown type fails validation

- **WHEN** a block declares an unsupported type or omits `type`
- **THEN** validation reports the marker, section, and block index

### Requirement: Blocks declare a name and string items

A `blocks` block SHALL require a non-empty localized `name` and a non-empty `items` array of strings. It SHALL render the name as a group label and each item as a chip.

#### Scenario: Blocks render as chips

- **WHEN** a `blocks` block renders
- **THEN** its name appears as the group label and every item appears as a chip

#### Scenario: Empty blocks fail validation

- **WHEN** `name` or `items` is missing or empty
- **THEN** validation fails with the block location

### Requirement: Text blocks allow an optional title and link

A `text` block SHALL require non-empty `text`. It MAY declare `title` and a `link` containing both `label` and `url`. When `link` is absent no action button SHALL render; when present, both link fields are required.

#### Scenario: Text without a link

- **WHEN** a `text` block omits `link`
- **THEN** only its optional title and its text render, with no action button

#### Scenario: Text with a link

- **WHEN** a `text` block declares a complete `link`
- **THEN** an action button with the given label opens the given URL in a new tab

#### Scenario: Partial link fails validation

- **WHEN** a `link` omits `label` or `url`
- **THEN** validation fails instead of rendering a label-less or target-less button

### Requirement: Position blocks describe dated entries

A `positions` block SHALL contain a non-empty `items` array. Each item SHALL require `position`, `company`, and `fromDate`, and MAY declare `toDate` and `description`. An absent or empty `toDate` SHALL render as the localized current-position wording.

#### Scenario: Current position

- **WHEN** a position omits `toDate` or declares it empty
- **THEN** the renderer shows the localized current-position wording instead of an empty date

#### Scenario: Completed position

- **WHEN** a position declares `toDate`
- **THEN** the renderer shows the range from `fromDate` to `toDate`

#### Scenario: Required position fields are enforced

- **WHEN** `position`, `company`, or `fromDate` is missing or empty
- **THEN** validation fails with the position index

### Requirement: List blocks cover bullets and checklists

A `list` block SHALL contain a non-empty `items` array whose entries are either strings or objects with `text` and an optional `done` boolean. String entries SHALL render as bullet items; entries that declare `done` SHALL render as checklist items and expose their state to assistive technology.

#### Scenario: Bullet items

- **WHEN** every list entry is a string
- **THEN** circular bullet markers render without a completed state

#### Scenario: Checklist items

- **WHEN** list entries declare `done`
- **THEN** each entry renders with the matching marker state and its completion is announced to assistive technology

#### Scenario: Empty list fails validation

- **WHEN** `items` is missing or empty
- **THEN** validation fails with the block location

### Requirement: Contact blocks cover email and link lists

An `email` block SHALL require a valid email address. A `links` block SHALL contain a non-empty `items` array where each item requires `icon`, `name`, and `link`, and `icon` is one of `linkedin`, `github`, `email`, or `external`. Button wording SHALL come from translations, not content.

#### Scenario: Email renders a field and action

- **WHEN** an `email` block renders
- **THEN** the address appears as a field and the localized message action is available

#### Scenario: Link list renders action rows

- **WHEN** a `links` block renders
- **THEN** each item shows its icon and name with an action that opens its link

#### Scenario: Unknown icon fails validation

- **WHEN** a link item uses an icon outside the supported set
- **THEN** validation fails with the item index

### Requirement: Project demo blocks own media and optional actions

A `projectDemo` block SHALL declare an `images` array whose entries require `src` and MAY declare `alt`, `caption`, and `video`. It MAY declare `repoLink` and `deployLink`; absent links SHALL not render their actions. An empty image list SHALL render the localized no-thumbnail placeholder.

#### Scenario: Image demo

- **WHEN** an image entry renders
- **THEN** its media appears with its alt text and optional caption

#### Scenario: Video demo

- **WHEN** an entry declares `video`
- **THEN** it renders as a video element

#### Scenario: Optional demo actions

- **WHEN** `repoLink` or `deployLink` is absent
- **THEN** the corresponding action is not rendered

#### Scenario: Empty images show the placeholder

- **WHEN** `images` is empty or omitted
- **THEN** the localized no-thumbnail placeholder appears

### Requirement: Project lists are ordered and category-owned

A category marker SHALL declare an ordered `projects` array. Each project SHALL have a unique `id`, a `title`, a `sections` array, and a `projectDemo` block. Every project SHALL belong to exactly one category marker and keep its declared order.

#### Scenario: Projects render once in order

- **WHEN** a category marker renders
- **THEN** each of its projects appears exactly once in the declared order

#### Scenario: Duplicate project id fails validation

- **WHEN** two projects share an id, including across categories
- **THEN** validation fails and identifies both occurrences

#### Scenario: Incomplete project fails validation

- **WHEN** a project omits its title, sections, or demo block
- **THEN** validation fails with the project id

### Requirement: Content is presentation-free

Content documents SHALL NOT declare CSS classes, colors, page sides, page numbers, running heads, or visual variants. Those decisions SHALL come from the layout and the renderer.

#### Scenario: Content stays portable

- **WHEN** an editor changes only text or media
- **THEN** no presentation field must be updated

#### Scenario: Presentation changes do not touch content

- **WHEN** a page side, slice, title promotion, or running head changes
- **THEN** only the layout or renderer changes

### Requirement: Content validation runs before rendering

The build SHALL validate locale parity, required fields, block types, ids, project ownership, and layout coverage before producing notebook pages. A failure SHALL identify the marker, section, and item responsible.

#### Scenario: Invalid content blocks the build

- **WHEN** validation finds an error
- **THEN** the build exits non-zero with a message locating the invalid entry

#### Scenario: Valid content produces pages

- **WHEN** validation passes
- **THEN** page generation proceeds
