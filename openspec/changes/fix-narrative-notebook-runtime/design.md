# Design

## Context

Ver `proposal.md` — Why. Estado atual relevante:

- `body { overflow: hidden }` (`src/styles/index.css:64-67`) corta o documento em 100vh.
- `nav` (10vh) + `header` (min-height 90vh) empurram `#notebook-section` para fora da viewport (`index.css:123-130`, `:174-178`).
- `PlayButton` faz `window.location.assign('/game.html')` e `public/game.html` não existe (`PlayButton.jsx:1-8`, `data/constants.js:1`).
- `NarrativeNotebook` usa coluna vertical, 100vw, scroll interno; só `ProjectsSection` emite `.notebook-page` (`NarrativeNotebook.jsx`, `index.css:401-414`, `ProjectsSection.jsx:65,76`).
- `App.jsx` renderiza páginas sem props e `ProjectsSection` sem dados; `ProjectLeftPage`/`ProjectRightPage` não são importados em `ProjectsSection.jsx`.
- Specs de referência: `openspec/changes/add-narrative-notebook/specs/{narrative-notebook-component,narrative-notebook-scroller,narrative-content-pages}/spec.md`.

Restrição: as specs já descrevem o comportamento desejado. Este change é **implementação**, sem delta de requisito (`skip_specs: true`).

## Goals / Non-Goals

**Goals:**
- Tornar o notebook alcançável e visível no `npm run dev`.
- Fazer a implementação cumprir os requisitos existentes de layout, navegação, marcadores, animação, conteúdo e deploy.
- Conectar dados reais e props, eliminando páginas vazias e links quebrados.
- Deixar build/dev/validate verdes e tarefas rastreáveis.

**Non-Goals:**
- Redesenhar a identidade visual além do que as specs pedem.
- Adicionar dependências de animação (react-transition-group, framer-motion etc.).
- Implementar swipe touch real (spec decide: apenas cliques nos cantos).
- Alterar requisitos/cenários das specs de `add-narrative-notebook`.
- Criar backend ou persistência.

## Decisions

### 1. Scroll documental com snap vertical em duas seções
**Decisão:** remover `body { overflow: hidden }`; transformar `#root` (ou um wrapper `.app-scroll`) no container `height:100dvh; overflow-y:auto; scroll-snap-type:y mandatory`. Envolver header e notebook em seções `min-height:100vh; scroll-snap-align:start`.
**Rationale:** a spec de scroller exige auto-scroll de 100vh e "uma seção por vez". Hoje o snap está dentro do notebook, que está fora da tela.
**Alternativas:** manter o notebook como scroller interno — rejeitado porque o header externo nunca entra no snap e o notebook continua inalcançável.

### 2. Play apenas abre o notebook
**Decisão:** `PlayButton` recebe `onPlay`; remove `window.location.assign('/game.html')` e a constante `GAME_PAGE_URL` se ficar órfã. O handler rola até `#notebook-section` e define o notebook como aberto.
**Rationale:** `/game.html` não existe e a spec diz que Play abre o notebook. Se o jogo for desejado, deve virar um link separado (fora deste change).
**Alternativas:** manter o jogo e adicionar um segundo botão — rejeitado por não existir asset/rota de jogo no repositório.

### 3. Modelo plano de páginas (4 + 2N)
**Decisão:** `App.jsx` (ou um helper `buildNotebookPages`) monta um array plano de descritores:
`[About, Career, Studies, ...projetos.flatMap(p => [Left(p), Right(p)]), Contact]`,
filtrado por `activeCategory`. `NarrativeNotebook` recebe `pages` e renderiza **uma** `.notebook-page` por descritor.
`ProjectsSection` passa a ser a sidebar de categorias (tabs + contagem), recebendo `projects`, `activeCategory`, `onCategorySelect`; não renderiza mais o fluxo de páginas.
**Rationale:** a spec exige contagem `4 + 2N`, navegação sequencial entre projetos e animação por página; tratar `ProjectsSection` como um único child torna tudo isso impossível.
**Alternativas:** manter `ProjectsSection` monolítico e "adivinhar" o número de páginas via contexto/ref — rejeitado por complexidade e acoplamento.

### 4. Layout horizontal centralizado + snap interno
**Decisão:** `.notebook-shell` com `width:min(80vw, calc(80vh * aspect)); height:80vh; margin:auto; position:relative; overflow:hidden`. Dentro, `.notebook-track` horizontal (`display:flex; overflow-x:auto; scroll-snap-type:x mandatory`), cada `.notebook-page { flex:0 0 100%; scroll-snap-align:start; }`.
**Rationale:** atende 80vw × 80vh, mantém proporção, e permite `scrollTo({left: index*width})` + snap nativo sem dependências.
**Alternativas:** `transform: translateX` puro — viável, mas perde o snap nativo descrito nas specs. Coluna vertical atual — rejeitada pela spec ("horizontal flex container").

### 5. Estado único de navegação no Notebook
**Decisão:** `currentPage` é a fonte de verdade; `goToPage` faz clamp (`0..pages.length-1`), atualiza estado e rola o track. Cantos esquerdo/direito chamam `goToPage(current ± 1)`. Ao trocar categoria, recalcular páginas e clampar `currentPage` para a primeira página de projetos (ou manter índice se válido).
**Rationale:** hoje o estado muda apenas a cor do marcador, sem mover conteúdo; `scrollToTop` está morto.
**Alternativas:** derivar página do scroll event — mais complexo e sujeito a jitter; o estado explícito é mais simples.

### 6. Marcadores: um oculto por vez, tooltip real
**Decisão:** mapear `pageIndex -> sectionIndex` (páginas de projeto apontam para "Projetos"). Renderizar 5 marcadores fixos com `hidden`/`opacity:0` apenas no atual e `data-tooltip` com o nome traduzido; tooltip via CSS `:hover` (sem classe `tooltip-show` órfã).
**Rationale:** cumpre "apenas UM marcador invisível" e tooltip no hover; corrige o texto fixo `"Sobre Mim"`.
**Alternativas:** destacar o atual (comportamento atual) — rejeitado pela spec.

### 7. Categorias: `null` inicial, selecionada oculta
**Decisão:** `activeCategory = null` inicialmente (todas visíveis, conforme cenário "all categories visible initially"). Ao selecionar, a categoria escolhida fica oculta e as demais visíveis; clicar de novo pode deselecionar (volta a `null`, todas visíveis).
**Rationale:** resolve a aparente tensão entre "todas visíveis inicialmente" e "selecionada invisível".
**Alternativas:** selecionar a primeira categoria por padrão — rejeitado porque o cenário exige todas visíveis no início.

### 8. Animação de virar página
**Decisão:** aplicar classes `flip-forward`/`flip-backward` no track/página durante 300–400ms (`transition: transform 320ms ease-in-out`), removendo após `transitionend`. Sem dependências.
**Rationale:** o CSS `.flip-*` existe mas nunca é aplicado; a spec exige 300–400ms.
**Alternativas:** Web Animations API — desnecessário para um transform simples.

### 9. Conteúdo localizado via dados
**Decisão:** mover textos de About/Career/Studies/Contact para `src/data/profile.js` com variantes `pt`/`eng` (ou chaves em `translations.js`), e passar strings já localizadas para os componentes. Componentes deixam de renderizar rótulos bilíngues fixos.
**Rationale:** a spec de content pages exige que todo texto respeite o idioma atual. Hoje os componentes mostram "Sobre Mim / About Me" fixo, ignorando o toggle.
**Alternativas:** manter bilíngue fixo — rejeitado por violar o requisito de localização.

### 10. Assets e shader
**Decisão:** criar placeholders reais em `public/images/projects/` (ou apontar para imagens existentes) e corrigir o favicon para `CloudIcon.png`; trocar `filter: opacity(x)` por `opacity: x` em `.cloud`.
**Rationale:** evita 404s e remove o único gatilho de filtro CSS que coincide com o warning de shader do Chromium em software compositing.
**Alternativas:** manter caminhos quebrados — rejeitado; o warning de shader em si é ambiental e não bloqueia renderização.

## Risks / Trade-offs

- [Mudar `overflow` do body afeta nuvens/light switch/header] → Escopar `.clouds` à seção hero e revalidar tema claro/escuro e idioma após a mudança.
- [Modelo plano de páginas quebra premissas de `ProjectsSection`] → Refatorar `ProjectsSection` para sidebar e cobrir troca de categoria, categoria vazia e limites de navegação.
- [Snap horizontal + vertical pode conflitar] → Snap vertical só no wrapper do documento; snap horizontal só dentro do `.notebook-track`; sem `overflow` aninhado ambíguo.
- [Contagem dinâmica de páginas e `currentPage` fora de faixa ao trocar categoria] → Clamp em `goToPage` e `useEffect` de reconciliação.
- [Placeholders de imagem podem não representar os projetos] → Nomear claramente como placeholder e documentar substituição.
- [Localização aumenta o escopo] → Implementar via dados centralizados, sem tocar nas specs; se necessário, fatiar em tarefa própria.

## Migration Plan

1. Destravar fluxo (overflow + Play) e validar que o notebook aparece.
2. Introduzir dados de perfil e modelo plano de páginas; conectar props.
3. Trocar layout vertical por horizontal centralizado com `.notebook-page` em todas as páginas.
4. Implementar marcadores, categorias, navegação por cantos e animação.
5. Corrigir assets/favicon/filtros; rodar `npm run build`, `npm run dev`, `openspec validate`.

Rollback: reverter os commits deste change; o change `add-narrative-notebook` e seus artefatos permanecem intactos.

## Open Questions

Nenhuma bloqueante. A decisão sobre manter ou remover `GAME_PAGE_URL` pode ser resolvida na implementação (remover se não houver outro uso).
