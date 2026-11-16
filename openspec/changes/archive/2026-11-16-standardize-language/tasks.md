# Tasks

## 1. Project Audit

- [x] 1.1 Audit all source files (.jsx, .js, .css, .json, .md, .yaml, .yml) for non-English texts and names
- [x] 1.2 Create a list of all files containing Portuguese or other non-English content
- [x] 1.3 Categorize each non-English text as: (a) user-facing text, (b) internal name/identifier, or (c) translation script content

### Audit Findings:

**Files with Portuguese content:**

1. **`src/data/translations.js`** - Translation script (EXEMPT from regularization)
   - Line 18: `greeting: 'Opa, bão? Meu nome é '` (user-facing - exempt)
   - Line 37: `IA_AUTOMACAOES: 'IA e Automações'` (user-facing - exempt)
   - Line 44: `cornerNavLeft: 'Página anterior'` (user-facing - exempt)
   - Line 45: `cornerNavRight: 'Próxima página'` (user-facing - exempt)
   - Line 74: `IA_AUTOMACAOES: 'IA e Automações'` (user-facing - exempt)

2. **`src/data/profile.js`** - Profile data (NON-EXEMPT - translate to English)
   - Line 22: `'ai-automation': 'IA e Automações'` → translate to English
   - Lines 30, 35, 36, 39, 41, 45: labels like 'Habilidades Técnicas', 'Trajetória Profissional', etc.
   - Lines 54-57: 'Página anterior', 'Próxima página', 'Seções do caderno'
   - Lines 72, 76, 79, 80, 83, 84, 89, 91: descriptions and titles
   - Lines 83-91: project entries with Portuguese names/descriptions

3. **`src/data/projects.js`** - Projects data (NON-EXEMPT - translate to English)
   - Line 11: `IA_AUTOMACAOES: 'IA e Automações'`
   - Lines 33, 41, 43: Portuguese descriptions
   - Line 44: techStack includes Portuguese
   - Lines 55, 66, 78: Portuguese descriptions
   - Lines 89, 97, 99, 111: titles and descriptions

4. **`src/utils/buildNotebookPages.js`** - Build utility (NON-EXEMPT - translate to English)
   - Line 24: `'IA e Automações': 'ai-automation'`
   - Line 51: `const categories = ['IA e Automações', 'Jogos', 'WebDev', 'BackEnd']`

5. **`src/components/narrative-notebook-component/NarrativeNotebook.jsx`** - UI component (NON-EXEMPT - translate to English)
   - Line 17: `previousLabel = 'Página anterior'`
   - Line 18: `nextLabel = 'Próxima página'`
   - Line 19: `sectionsLabel = 'Seções do caderno'`

## 2. Identify Translation Script Exception

- [x] 2.1 Locate the script responsible for translating Portuguese content shown to users
- [x] 2.2 Verify its purpose is exclusively Portuguese user-facing translation
- [x] 2.2 Mark the script as exempt from English-only regularization in the audit documentation

## 3. Regularize Non-English Scripts and Files

- [x] 3.1 Translate user-facing texts (excluding the translation script) to English
- [x] 3.2 Regularize internal names and identifiers to English equivalents
- [x] 3.3 Update configuration files and documentation to use English texts/names
- [x] 3.4 For each non-English text found in step 1.3:
    - [x] 3.4.1 If it's user-facing text (not the translation script): translate to English and update the file
    - [x] 3.4.2 If it's an internal name/identifier: rename to English equivalent
    - [x] 3.4.3 If it's in the translation script: document as exempt and do not modify

## 4. Verification and Build

- [x] 4.1 Build the application with `npm run build` and verify it completes successfully
- [x] 4.2 Run any existing tests to ensure no text-related regressions
- [x] 4.3 Verify the translation script still functions correctly and displays Portuguese content as expected
- [x] 4.4 Confirm all user-facing texts are now in English (except the translation script)