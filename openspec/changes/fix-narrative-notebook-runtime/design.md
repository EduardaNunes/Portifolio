# Design

## Context

Ver `proposal.md` — Why. Estado atual relevante:

- `body { overflow: hidden }` (`src/styles/index.css:64-67`) corta o documento em 100vh.
- `nav` (10vh) + `header` (min-height 90vh) empurram `#notebook-section` para fora da viewport (`index.css:123-130`, `:174-178`).
- `PlayButton` faz `window.location.assign('/game.html')` e `public/game.html` não existe (`PlayButton.jsx:1-8`, `data/constants.js:1`).
- `NarrativeNotebook` usa coluna vertical, 100vw, scroll interno; só `ProjectsSection` emite `.notebook-page` (`NarrativeNotebook.jsx`, `index.css:401-414`, `ProjectsSection.jsx:65,76`).
- `App.jsx` renderiza páginas sem props e `ProjectsSection` sem dados; `ProjectLeftPage`/`ProjectRightPage` não são importados em `ProjectsSection.jsx`.
- Specs de referência: `openspec/changes/add-narrative-notebook/specs/{narrative-notebook-component,narrative-notebook-scroller,narrative-content-pages}/spec.md`.

Restrição: as specs já descrevem a maior parte do comportamento desejado. A Revisão 2 (spread de duas folhas + papel branco) supera a convenção de página única / `4 + 2N` da spec original; este change mantém `skip_specs: true` e o delta será realinhado em `add-narrative-notebook` antes do archive.

## Goals / Non-Goals

**Goals:**
- Tornar o notebook alcançável e visível no `npm run dev`.
- Fazer a implementação cumprir os requisitos existentes de navegação, marcadores, animação, conteúdo e deploy.
- Apresentar o notebook como caderno aberto: duas folhas lado a lado, conteúdo dividido e navegação por spread (`4 + N` / `8 + 2N` folhas).
- Garantir leitura confortável com papel branco e texto escuro em ambos os temas.
- Conectar dados reais e props, eliminando páginas vazias e links quebrados.
- Deixar build/dev/validate verdes e tarefas rastreáveis.

**Non-Goals:**
- Redesenhar header, nuvens ou paleta global do site.
- Adicionar dependências de animação (react-transition-group, framer-motion etc.).
- Implementar swipe touch real (spec decide: apenas cliques nos cantos).
- Criar delta de spec neste change (realinhamento fica para `add-narrative-notebook`).
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

### 3. Modelo de spreads (dupla página)
**Decisão:** `App.jsx` (ou um helper `buildNotebookPages`) monta um array de **spreads**:
`[About, Career, Studies, ...projetos.map(p => ProjectSpread(p)), Contact]`,
filtrado por `activeCategory`. Cada spread tem `{ id, section, left, right }`, onde `left`/`right` são os elementos das duas folhas. Total: **4 spreads de seção + N spreads de projeto** (`4 + N`), ou **8 + 2N folhas**.
`ProjectsSection` continua sendo apenas a sidebar de categorias (tabs + contagem), recebendo `categories`, `activeCategory` e `onCategorySelect`.
**Rationale:** o pedido é que o notebook pareça um caderno físico aberto, com duas folhas visíveis e conteúdo dividido entre elas; tratar cada seção como spread também resolve o pareamento semântico (nunca Sobre Mim ao lado de Carreira).
**Alternativas:** manter `4 + 2N` páginas e exibi-las duas a duas — rejeitado porque parearia seções não relacionadas (ex.: Estudos ao lado do primeiro projeto) e não cumpriria "o texto deve respeitar a divisão". Página única atual — rejeitada pelo pedido.

### 4. Layout de caderno aberto (capa + duas folhas)
**Decisão:** `.notebook-frame` (`width:min(80vw, 1100px); height:80vh`) posiciona o caderno; `.notebook-shell` preenche o frame como capa (`position:relative; overflow:hidden; border`). Dentro, `.notebook-track` horizontal com **um `.notebook-spread` por vez**; cada spread tem `display:flex`, duas `.notebook-leaf` com `flex:1 1 50%; min-width:0; height:100%`, lombada central desenhada com `::after` e sombras internas nas bordas. O track translada `-100%` por spread (`transform: translateX(-index * 100%)`), com `transition` de 320ms.
**Rationale:** duas folhas reais lado a lado, proporção de livro, lombada visível e apenas um spread na viewport. Marcadores ficam no espaço à esquerda do frame; tabs de categoria ficam à direita em telas largas e viram uma linha abaixo do caderno em telas ≤1300px, evitando cobrir a folha direita.
**Alternativas:** `scroll-snap` horizontal nativo — possível, mas o estado explícito + `transform` é mais simples de sincronizar com marcadores/categorias e já está implementado. Empilhar folhas em telas estreitas — rejeitado porque o pedido exige as duas folhas lado a lado. Gutter interno fixo de 24px — rejeitado porque consumiria ~12% da largura de cada folha em 484px e ainda não caberia as tabs.

### 5. Estado único de navegação por spread
**Decisão:** `currentSpread` é a fonte de verdade; `goToSpread` faz clamp (`0..spreads.length-1`), atualiza estado e translada o track. Cantos esquerdo/direito chamam `goToSpread(current ± 1)`. Ao trocar categoria, recalcular spreads e clampar o índice para o primeiro spread de projetos (ou manter se ainda válido).
**Rationale:** como as duas folhas viram juntas, a unidade coerente de navegação é o spread; manter estado por folha faria a segunda folha "pular" sem controle.
**Alternativas:** manter `currentPage` por folha e navegar de 1 em 1 — rejeitado porque o usuário veria meia página trocando e o track sairia do enquadramento do livro.

### 6. Marcadores: um oculto por vez, tooltip real
**Decisão:** mapear `spreadIndex -> sectionId` (todos os spreads de projeto apontam para "Projetos"). Renderizar 5 marcadores fixos com `opacity:0`/`pointer-events:none` apenas no atual e `data-tooltip` com o nome traduzido; tooltip via CSS `:hover` (sem classe `tooltip-show` órfã).
**Rationale:** cumpre "apenas UM marcador invisível" e tooltip no hover; corrige o texto fixo `"Sobre Mim"`.
**Alternativas:** destacar o atual (comportamento atual) — rejeitado pela spec.

### 7. Categorias: `null` inicial, selecionada oculta
**Decisão:** `activeCategory = null` inicialmente (todas visíveis, conforme cenário "all categories visible initially"). Ao selecionar, a categoria escolhida fica oculta e as demais visíveis; clicar de novo pode deselecionar (volta a `null`, todas visíveis).
**Rationale:** resolve a aparente tensão entre "todas visíveis inicialmente" e "selecionada invisível".
**Alternativas:** selecionar a primeira categoria por padrão — rejeitado porque o cenário exige todas visíveis no início.

### 8. Animação de virar página
**Decisão:** animar o spread inteiro por 320ms (`transition: transform 320ms ease-in-out` no track + rotação leve de entrada no spread ativo, `rotateY(±6deg)` → `0`). Direção (`forward`/`backward`) em `data-direction`, limpa após `transitionend`/timeout. Sem dependências.
**Rationale:** o livro vira como um conjunto; animar folhas separadas quebraria a ilusão de caderno físico. A faixa de 300–400ms continua respeitada.
**Alternativas:** animação por folha — rejeitada por dessincronizar as duas metades; Web Animations API — desnecessário para um transform simples.

### 9. Conteúdo localizado via dados
**Decisão:** mover textos de About/Career/Studies/Contact para `src/data/profile.js` com variantes `pt`/`eng` (ou chaves em `translations.js`), e passar strings já localizadas para os componentes. Componentes deixam de renderizar rótulos bilíngues fixos.
**Rationale:** a spec de content pages exige que todo texto respeite o idioma atual. Hoje os componentes mostram "Sobre Mim / About Me" fixo, ignorando o toggle.
**Alternativas:** manter bilíngue fixo — rejeitado por violar o requisito de localização.

### 10. Assets e shader
**Decisão:** criar placeholders reais em `public/images/projects/` (ou apontar para imagens existentes) e corrigir o favicon para `CloudIcon.png`; trocar `filter: opacity(x)` por `opacity: x` em `.cloud`.
**Rationale:** evita 404s e remove o único gatilho de filtro CSS que coincide com o warning de shader do Chromium em software compositing.
**Alternativas:** manter caminhos quebrados — rejeitado; o warning de shader em si é ambiental e não bloqueia renderização.

### 11. Papel branco com texto escuro
**Decisão:** introduzir variáveis de papel e escopá-las às folhas:
`--paper-bg: #ffffff; --paper-text: #1a1917; --paper-muted: #5c564e; --paper-border: #d9d0c4; --paper-accent: #5f9ea0;`
`.notebook-leaf { background: var(--paper-bg); color: var(--paper-text); --bg-color: var(--paper-bg); --text-color: var(--paper-text); --strong: #26696d; --h1-color: #b45309; }`
A capa (`.notebook-shell`) e os controles externos (marcadores, tabs) continuam usando os tokens do tema (`--bg-color`/`--text-color`), que ficam no gutter de 24px.
**Rationale:** os componentes já usam `var(--text-color)`/`var(--bg-color)`/`var(--strong)`; sobrescrever os tokens dentro da folha garante contraste automaticamente em ambos os temas, sem reescrever cada componente. Papel branco é físico: não muda com o tema, enquanto a capa acompanha claro/escuro.
**Alternativas:** cores fixas em cada componente — rejeitado por duplicação e risco de esquecer links/tags. Papel acompanhar o tema (creme no dark) — rejeitado pelo pedido de fundo branco e texto preto.

### 12. Divisão do conteúdo entre as folhas
**Decisão:** cada seção distribui seu conteúdo em duas folhas, sem duplicação:

| Spread | Folha esquerda | Folha direita |
|---|---|---|
| Sobre Mim | habilidades técnicas + interpessoais | resultados profissionais |
| Carreira | cargo atual + trajetória | objetivos futuros |
| Estudos | formação acadêmica | cursos + projetos acadêmicos |
| Projetos | metadados (título, descrição, stack, repo) | demo + deploy |
| Contato | chamada + CTA de e-mail | LinkedIn / GitHub / e-mail |

Os componentes de seção recebem `side` (`'left' | 'right'`) e renderizam apenas o bloco correspondente; `ProjectLeftPage`/`ProjectRightPage` permanecem como estão.
**Rationale:** cumpre "o texto deve respeitar essa divisão" e mantém cada folha com densidade legível, em vez de repetir o conteúdo inteiro dos dois lados.
**Alternativas:** usar `column-count: 2` no conteúdo — rejeitado porque quebra o fluxo em pontos arbitrários e não permite cabeçalhos/âncoras por folha.

## Risks / Trade-offs

- [Mudar `overflow` do body afeta nuvens/light switch/header] → Escopar `.clouds` à seção hero e revalidar tema claro/escuro e idioma após a mudança.
- [Duas folhas em 80vw deixam cada folha com ~40vw (≈170px em 484px)] → Tipografia compacta com `clamp()`, padding reduzido, quebra de tags e `overflow-y:auto` por folha; validar em 484×885 e em tela larga.
- [Papel branco fixo pode conflitar com controles do tema escuro] → Escopar tokens de papel apenas em `.notebook-leaf` e manter marcadores/tabs no gutter da capa; conferir contraste de links, tags e botão de deploy.
- [Spread quebra premissas de `ProjectsSection` e do modelo 4+2N] → Refatorar para spreads `{ left, right }`, atualizar contagens e cobrir troca de categoria, categoria vazia e limites de navegação.
- [Snap horizontal + vertical pode conflitar] → Snap vertical só no wrapper do documento; track horizontal interno sem scroll nativo (transform controlado).
- [Contagem dinâmica de spreads e `currentSpread` fora de faixa ao trocar categoria] → Clamp em `goToSpread` e `useEffect` de reconciliação.
- [Placeholders de imagem podem não representar os projetos] → Nomear claramente como placeholder e documentar substituição.
- [Drift entre a spec original (página única, 4+2N) e o novo modelo] → Registrar no design e realinhar a spec de `add-narrative-notebook` antes do archive; este change mantém `skip_specs: true`.

## Migration Plan

1. Destravar fluxo (overflow + Play) e validar que o notebook aparece.
2. Introduzir dados de perfil e modelo de spreads; dividir o conteúdo entre folhas e conectar props.
3. Trocar a página única pelo spread de duas folhas com lombada e gutter.
4. Implementar marcadores, categorias, navegação por cantos e animação por spread.
5. Aplicar a paleta de papel e ajustar responsividade/overflow das folhas.
6. Corrigir assets/favicon/filtros; rodar `npm run build`, `npm run dev`, `openspec validate`.

Rollback: reverter os commits deste change; o change `add-narrative-notebook` e seus artefatos permanecem intactos.

## Open Questions

Nenhuma bloqueante. A decisão sobre manter ou remover `GAME_PAGE_URL` pode ser resolvida na implementação (remover se não houver outro uso).
