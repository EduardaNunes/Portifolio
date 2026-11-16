# Portfólio – Eduarda Nunes (React)

Migração do portfólio em HTML/CSS/JS puro para React + Vite.

## Como rodar

```bash
npm install
npm run dev
```

## Assets

Copie as pastas do projeto original para `public/`:

```
public/
├── Imgs/            (CloudBlack.png, ProfileWhite.png, CloudIcon.png, ...)
├── Fonts/           (joystix monospace.ttf)
├── Sounds/          (Light-Switch.mp3)
└── images/projects/ (placeholders .svg dos projetos)
```

## Notebook

The main content is an open-notebook-style section, centered (~80vw × ~80vh),
with two visible facing leaves side by side:

- Fixed order: About Me → Career → Studies → Projects → Contact.
- Each section occupies **one spread** (two leaves); each project also occupies
  one spread (metadata + demo). Total is **4 + N spreads** or **8 + 2N leaves**.
- Section content is split between the leaves, without duplication:
  - About Me: skills × results;
  - Career: trajectory × objectives;
  - Studies: education × courses/projects;
  - Projects: metadata × demo/deploy;
  - Contact: CTA/e-mail × social links.
- Leaves use white paper and dark text in both themes.
- Cover/sides follow the site scheme: blue in dark theme and orange in light
  theme, using only colors already present in the project.
- The page starts locked: before the first Play click the document does not
  scroll. Play permanently unlocks scrolling in the session; reloading returns
  to the locked state.
- Physical page tabs sit flush against the cover, with no gap and no circular
  notch. Left (sections) and right (categories) use the same mirrored component.
- The active tab remains visible and expands horizontally with its name; hover/focus
  do the same expansion. No floating tooltip is used.
- Tab icons use a fixed ink color and do not change color with the theme.
- Spread change uses a 3D two-face leaf rotating around the spine (~420ms, front/back,
  movable shadow). Rapid clicks do not stack turns.
- Project category tabs (only in Projects): IA and Automações, Jogos, WebDev and
  BackEnd filter projects; the active category is visible and expanded, without
  count.
- Bottom left/right corners navigate to previous/next spread.
- Play button opens the notebook and smoothly scrolls to it.
- Scrolling: vertical and horizontal bars are hidden, the horizontal axis is
  locked and vertical snap continues to stop at each section.
- With `prefers-reduced-motion`, spread change is direct (no rotation) and scrolling
  stops being animated.

### Color policy

The project maintains a documented, approved color palette. All interface colors
MUST be selected from this inventory. New colors require an explicit update to
this palette definition before being used.

**Dark theme palette** (variables set in `:root`):
- `--bg-color`: #1a1917 (background)
- `--text-color`: #f9efe4 (primary text)
- `--h1-color`: rgb(241, 153, 37) (headings)
- `--strong`: cadetblue (emphasis)
- `--cover-base`: #5f9ea0 (notebook cover base, dark theme)
- `--cover-dark`: #145053 (notebook cover dark accent, dark theme)
- `--cover-shadow`: #26696d (notebook cover shadow, dark theme)
- `--cover-light`: #99c0c2 (notebook cover light accent, dark theme)
- `--cover-shine`: #c6e2e4 (notebook cover shine, dark theme)
- `--tab-bg`: #f6efe3 (tab background)
- `--tab-border`: #b7a88e (tab border)
- `--tab-text`: #4a3f30 (tab label text)
- `--tab-icon-ink`: #1a1917 (fixed black ink for every tab SVG, never theme-driven)
- `--tab-accent`: #3f8f92 (tab accent on active/hover)
- `--page-stack-base`: #b8afa5 (visible gray leaf stack)
- `--page-stack-dark`: #6d6964 (page-stack edge/shadow)
- `--page-stack-light`: #e0d4c7 (page-stack leaf stripe)

**Light theme palette** (variables set in `.lightmode`):
- `--bg-color`: #f9efe4 (background)
- `--text-color`: #1a1917 (primary text)
- `--h1-color`: cadetblue (headings)
- `--strong`: #d87f0b (emphasis)
- `--cover-base`: #d87f0b (notebook cover base, light theme)
- `--cover-dark`: #b45309 (notebook cover dark accent, light theme)
- `--cover-shadow`: #b8763c (notebook cover shadow, light theme)
- `--cover-light`: #f19925 (notebook cover light accent, light theme)
- `--cover-shine`: #f9efe4 (notebook cover shine, light theme)
- `--tab-bg`: #f6efe3 (tab background)
- `--tab-border`: #b7a88e (tab border)
- `--tab-text`: #4a3f30 (tab label text)
- `--tab-icon-ink`: #1a1917 (fixed black ink for every tab SVG, never theme-driven)
- `--tab-accent`: #3f8f92 (tab accent on active/hover)
- `--page-stack-base`: #b8afa5 (visible gray leaf stack)
- `--page-stack-dark`: #6d6964 (page-stack edge/shadow)
- `--page-stack-light`: #e0d4c7 (page-stack leaf stripe)

**Notebook paper palette** (set in `.notebook-leaf`):
- `--paper-bg`: #ffffff (leaf background — always white)
- `--paper-text`: #1a1917 (leaf text — always dark)
- `--paper-muted`: #5c564e (muted text, e.g. descriptions)
- `--paper-border`: #d9d0c4 (borders/dividers)
- `--paper-accent`: #145053 (accent links/items)

**Other referenced colors** (existing, documented for awareness):
- `--h1-selection`: #5f9ea0 / #1a1917 (selection background)
- `--strong-selection`: #f9efe4 / #1a1917 (selection strong)
- `--btn-play`, `--btn-text`, `--btn-play-border`, `--btn-play-shadow`,
  `--btn-play-highlight`, `--btn-play-highlight2`, `--btn-play-shine`
  (Play button — reusable across components)
- `--cloud-img`, `--profile-img`, `--light-switch-img`, `--switch-arrow-img`
  (image references — not paint colors)
- `#f3efe8` (project thumbnail background)
- `rgba(0, 0, 0, 0.02)`, `rgba(0, 0, 0, 0.2)`, `rgba(0, 0, 0, 0.3)`,
  `rgba(0, 0, 0, 0.35)`, `rgba(0, 0, 0, 0.38)`, `rgba(0, 0, 0, 0.42)`,
  and `rgba(0, 0, 0, 0.55)` (page, overlay, and depth shadows)
- `rgba(127, 127, 127, 0.08)` (subtle hover background)
- `rgba(255, 255, 255, 0.55)` (tab highlight)

**Rule**: Any new interface color must be added to this list with a descriptive
variable name and semantic group before use. Colors not in this list are
prohibited in new CSS.

## Assets

Copie as pastas do projeto original para `public/`:

- Ordem fixa: Sobre Mim → Carreira → Estudos → Projetos → Contato.
- Cada seção ocupa **um spread** (duas folhas); cada projeto também ocupa um
  spread (metadados + demo). O total é **4 + N spreads** ou **8 + 2N folhas**.
- O conteúdo das seções é dividido entre as folhas, sem duplicação:
  - Sobre Mim: habilidades × resultados;
  - Carreira: trajetória × objetivos;
  - Estudos: formação × cursos/projetos;
  - Projetos: metadados × demo/deploy;
  - Contato: CTA/e-mail × links sociais.
- As folhas usam papel branco e texto escuro em ambos os temas.
- A capa/laterais seguem o esquema do site: azul no tema escuro e laranja no
  tema claro, usando apenas as cores já existentes no projeto.
- A página abre bloqueada: antes do primeiro clique no Play o documento não
  rola. O Play libera a rolagem permanentemente na sessão; recarregar volta ao
  estado bloqueado.
- As abas de página físicas ficam encostadas na capa, sem gap e sem entalhe
  semicircular. Esquerda (seções) e direita (categorias) usam o mesmo
  componente espelhado. A aba ativa permanece visível e expande horizontalmente
  com o nome; hover/foco fazem a mesma expansão. Não há tooltip flutuante.
- Os ícones das abas usam uma tinta fixa e não mudam de cor com o tema.
- A troca de spread usa uma folha 3D de duas faces girando em torno da lombada
  (~420ms, frente/verso, sombra móvel). Cliques rápidos não sobrepõem viradas.
- Abas de categoria (só em Projetos): IA e Automações, Jogos, WebDev e BackEnd
  filtram os projetos; a categoria ativa fica visível e expandida, sem contagem.
- Cantos inferiores esquerdo/direito navegam para o spread anterior/seguinte.
- O botão Play abre o notebook e rola suavemente até ele.
- Rolagem: as barras verticais e horizontais ficam ocultas, o eixo horizontal
  é travado e o snap vertical continua parando em cada seção.
- A roda do mouse reaproveita o mesmo scroll suave do Play e move exatamente
  uma seção por gesto, para cima e para baixo. Dentro de uma folha longa, a
  roda primeiro rola a folha e só então troca de seção no limite.
- Com `prefers-reduced-motion`, a troca de spread é direta (sem rotação) e o
  scroll deixa de ser animado.

### Placeholders de imagem

As imagens em `public/images/projects/*.svg` são placeholders. Substitua-as pelos
screenshots reais mantendo os nomes, ou atualize `thumbnailUrl` em
`src/data/projects.js`.

## Estrutura

```
src/
├── components/   componentes de UI (um por responsabilidade)
├── hooks/        lógica reutilizável (tema, idioma, arrastar o interruptor)
├── data/         textos traduzidos e constantes
├── utils/        funções puras
└── styles/       CSS global
```
