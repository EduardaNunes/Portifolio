# Design

## Context

Ver `proposal.md` — Why. Estado atual relevante:

- `body { overflow: hidden }` (`src/styles/index.css:64-67`) corta o documento em 100vh.
- `nav` (10vh) + `header` (min-height 90vh) empurram `#notebook-section` para fora da viewport (`index.css:123-130`, `:174-178`).
- `PlayButton` faz `window.location.assign('/game.html')` e `public/game.html` não existe (`PlayButton.jsx:1-8`, `data/constants.js:1`).
- `NarrativeNotebook` usa coluna vertical, 100vw, scroll interno; só `ProjectsSection` emite `.notebook-page` (`NarrativeNotebook.jsx`, `index.css:401-414`, `ProjectsSection.jsx:65,76`).
- `.notebook-leaf { overflow-y: auto }` e `.app-scroll` exibem barras nativas; `.sidebar-markers` (`left:-30px`) e `.category-tabs` (`right:-128px`) ficam fora do frame e podem gerar overflow horizontal (`index.css:76-81`, `:513`, `:608-617`, `:669-679`).
- A troca de spread é um `translateX` no `.notebook-track` com rotação de ±6° (`index.css:461-466`, `:575-604`), não uma folha girando em torno da lombada; os marcadores são círculos (`index.css:619-665`).
- O `.app-scroll` depende do snap nativo; o Play usa `scrollIntoView({ behavior: 'smooth' })`, mas a roda não reaproveita essa movimentação e o snap nativo é percebido como salto.
- `App.jsx` renderiza páginas sem props e `ProjectsSection` sem dados; `ProjectLeftPage`/`ProjectRightPage` não são importados em `ProjectsSection.jsx`.
- Specs de referência: `openspec/changes/add-narrative-notebook/specs/{narrative-notebook-component,narrative-notebook-scroller,narrative-content-pages}/spec.md`.

Restrição: as specs já descrevem a maior parte do comportamento desejado. A Revisão 2 (spread de duas folhas + papel branco) supera a convenção de página única / `4 + 2N` da spec original; a Revisão 3 acrescenta abas de página, virada física, barras ocultas e controlador de roda. Este change mantém `skip_specs: true` e o delta será realinhado em `add-narrative-notebook` antes do archive.

## Goals / Non-Goals

**Goals:**
- Tornar o notebook alcançável e visível no `npm run dev`.
- Fazer a implementação cumprir os requisitos existentes de navegação, marcadores, animação, conteúdo e deploy.
- Apresentar o notebook como caderno aberto: duas folhas lado a lado, conteúdo dividido e navegação por spread (`4 + N` / `8 + 2N` folhas).
- Ocultar as barras de rolagem (vertical e horizontal) e impedir rolagem horizontal, mantendo o snap vertical.
- Tornar a virada de spread uma folha física de duas faces e fazer a roda do mouse usar a mesma movimentação suave do Play.
- Manter a roda dentro de folhas longas rolando a folha antes de trocar de seção.
- Substituir os marcadores circulares por abas de página.
- Garantir leitura confortável com papel branco e texto escuro em ambos os temas.
- Conectar dados reais e props, eliminando páginas vazias e links quebrados.
- Deixar build/dev/validate verdes e tarefas rastreáveis.

**Non-Goals:**
- Redesenhar header, nuvens ou paleta global do site.
- Reescrever o modelo `4 + N` / `8 + 2N`, o conteúdo ou o layout de duas folhas.
- Usar WebGL/Three.js ou malhas de curvatura complexas.
- Alterar o snap nativo de touch/teclado; o controlador de roda apenas replica o destino e a suavidade do Play.
- Adicionar Motion ou outra dependência de animação nesta revisão.
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

### 4. Layout do caderno e camadas de virada
**Decisão:** `.notebook-frame` (`width:min(80vw, 1100px); height:80vh`) posiciona o caderno; `.notebook-shell` preenche o frame como capa (`position:relative; overflow:hidden; border`). Dentro, um palco `.notebook-stage` mantém o **spread base** (`display:flex`, duas `.notebook-leaf` com `flex:1 1 50%; min-width:0; height:100%`, lombada central via `::after` e sombras internas). Durante uma transição, uma camada `.notebook-turn` meia-largura é posicionada na metade direita (e, após `rotateY(-180deg)`, sobre a metade esquerda) com `transform-origin:left center`, `transform-style:preserve-3d` e duas faces; o spread base permanece atrás. Não existe `.notebook-track` nem `translateX`.
**Rationale:** duas folhas reais lado a lado, proporção de livro, lombada visível e apenas um spread na viewport; a camada de virada permite animar uma folha sem mover o caderno inteiro. Marcadores ficam no espaço à esquerda do frame; tabs de categoria ficam à direita em telas largas e viram uma linha abaixo do caderno em telas ≤1300px.
**Alternativas:** track com `translateX` (implementação atual) — rejeitado por parecer slide; `react-pageflip`/StPageFlip — rejeitado por assumir o DOM das folhas e dificultar marcadores/tabs externos e conteúdo React; `scroll-snap` horizontal nativo — rejeitado por não produzir frente/verso nem controle de sombra.

### 5. Estado único de navegação por spread e transação de virada
**Decisão:** `currentSpread` é a fonte de verdade. `goToSpread` faz clamp (`0..spreads.length-1`), inicia uma transação `turn = { from, to, direction, status }` e só commita `currentSpread = to` quando a folha completa os 180°; enquanto `status === 'turning'`, novos cliques são ignorados (ou enfileirados apenas o último) para evitar viradas sobrepostas. Cantos esquerdo/direito chamam `goToSpread(current ± 1)`. Ao trocar categoria, qualquer virada em andamento é concluída/cancelada antes de recalcular spreads e clampar o índice.
**Rationale:** como as duas folhas viram juntas, a unidade coerente de navegação é o spread; separar `from`/`to` permite renderizar as faces corretas durante a animação sem duplicar conteúdo.
**Alternativas:** atualizar o índice imediatamente e animar depois — rejeitado porque a base mudaria no meio da virada; manter `currentPage` por folha — rejeitado porque o usuário veria meia página trocando.

### 6. Marcadores como abas de página
**Decisão:** mapear `spreadIndex -> sectionId` (todos os spreads de projeto apontam para "Projetos"). Cada seção vira uma `.page-tab` presa à borda esquerda do caderno: forma de aba (canto externo arredondado e entalhe junto à capa), fundo de papel próprio (`--tab-bg`, `--tab-border`, `--tab-text`) com acento por seção, ícone SVG inline + rótulo no tooltip, sombra e hover deslocando ~4px para fora. A aba da seção atual fica oculta (`opacity:0; pointer-events:none`), as demais são clicáveis. As abas ficam no gutter de 10vw, sem aumentar a largura rolável.
**Rationale:** cumpre "apenas UM marcador invisível", tooltip no hover e a aparência de marcador físico da referência; mantém a posição à esquerda exigida pela spec e evita conflito com as tabs de categoria à direita.
**Alternativas:** pontos circulares atuais — rejeitados pelo pedido; abas à direita como na imagem — rejeitadas por conflitar com as tabs de categoria e com a spec de sidebar esquerda.

### 7. Categorias: `null` inicial, selecionada oculta
**Decisão:** `activeCategory = null` inicialmente (todas visíveis, conforme cenário "all categories visible initially"). Ao selecionar, a categoria escolhida fica oculta e as demais visíveis; clicar de novo pode deselecionar (volta a `null`, todas visíveis).
**Rationale:** resolve a aparente tensão entre "todas visíveis inicialmente" e "selecionada invisível".
**Alternativas:** selecionar a primeira categoria por padrão — rejeitado porque o cenário exige todas visíveis no início.

### 8. Virada de folha em 3D (substitui o slide)
**Decisão:** usar CSS 3D + Web Animations API (`element.animate`) para animar uma folha de duas faces em torno da lombada. Notação: `S_i` é o spread `i`, `L_i`/`R_i` são suas folhas esquerda/direita.
- Avançar (S_i → S_{i+1}): base = `L_i` à esquerda + `R_{i+1}` à direita; `.notebook-turn` começa com frente = `R_i` e verso = `L_{i+1}`, girando de `rotateY(0)` a `rotateY(-180deg)`.
- Voltar (S_i → S_{i-1}): base = `L_{i-1}` à esquerda + `R_i` à direita; a folha começa em `rotateY(-180deg)` (frente = `R_{i-1}`, verso = `L_i`) e gira até `rotateY(0)`.
- Duração ~420 ms com easing `easeInOut`; `perspective(1600px)`, `backface-visibility:hidden`, sombra em gradiente e brilho de borda com keyframes sincronizados ao `rotateY`; leve `scaleY`/`border-radius` no lado externo para sugerir papel. Ao final, commitar o spread de destino e desmontar a camada.
- `prefers-reduced-motion`: troca direta com fade curto, sem rotação.
**Rationale:** reproduz o vídeo de referência (uma folha gira em torno da lombada, com frente/verso e sombra) e mantém o conteúdo de cada folha exatamente uma vez no DOM: a base tem `L_i`/`R_{i+1}` e a folha tem `R_i`/`L_{i+1}`.
**Alternativas:** slide com `translateX` + `rotateY(±6°)` (atual) — rejeitado por não parecer folha; `react-pageflip`/StPageFlip — rejeitado por assumir o DOM e limitar o layout de spreads; `motion/react` — adiado por não ser necessário nesta revisão (CSS 3D/WAAPI cobre o efeito).

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
A capa (`.notebook-shell`) e as tabs de categoria continuam usando os tokens do tema (`--bg-color`/`--text-color`); as abas de página (decisão 6) têm paleta própria de papel (`--tab-*`) para parecerem marcadores físicos.
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

### 13. Barras de rolagem ocultas e eixo horizontal travado
**Decisão:** em `.app-scroll`, manter `height:100dvh; overflow-y:auto; scroll-snap-type:y mandatory`, adicionar `overflow-x:clip`, `scrollbar-width:none`, `-ms-overflow-style:none`, `overscroll-behavior-y:contain` e `touch-action:pan-y pinch-zoom`; em `.notebook-leaf`, manter `overflow-y:auto` e adicionar `overflow-x:hidden`, `overflow-wrap:anywhere`, `scrollbar-width:none` e `overscroll-behavior:contain`. Esconder as barras WebKit com `.app-scroll::-webkit-scrollbar, .notebook-leaf::-webkit-scrollbar { width:0; height:0; display:none }`.
**Rationale:** o scroll continua funcional por roda, teclado, trackpad e toque, mas sem barras visíveis nem deslocamento lateral; o snap vertical permanece nativo.
**Alternativas:** `overflow:hidden` no body — voltaria a cortar o notebook; `display:none` sem manter o scroll — quebraria a leitura das folhas longas; `touch-action:none` — quebraria o gesto vertical.

### 14. Roda do mouse com a mesma movimentação do Play
**Decisão:** extrair o scroll suave do Play para `scrollToSection(target, { behavior })`, mantendo o comportamento atual (`scrollIntoView({ behavior: 'smooth', block: 'start' })`). Adicionar um controlador de roda em `.app-scroll` com listener `{ passive: false }`:
- acumular `deltaY` por gesto (janela curta) e disparar uma única vez quando o acumulado passar de um limiar (~40px);
- mapear a seção atual pelo `scrollTop` e a próxima/anterior pela lista de seções (`hero`, `notebook`); clampar nas pontas;
- chamar a mesma função do Play, com `behavior: 'auto'` quando `prefers-reduced-motion`;
- manter um lock (~600ms ou até `scrollend`) para ignorar eventos da inércia do trackpad;
- não interceptar quando o alvo está dentro de `.notebook-leaf` e a folha ainda pode rolar naquela direção; ao atingir o limite, a roda passa a trocar de seção;
- preservar o `scroll-snap-type: y mandatory` como destino e o comportamento nativo de touch/teclado.
**Rationale:** a roda passa a ter exatamente a movimentação que o Play já entrega, para cima e para baixo, sem dependência nova e sem quebrar a rolagem interna das folhas.
**Alternativas:** Motion/Lenis — adiados por não serem necessários; snap nativo puro (atual) — rejeitado pelo pedido; interceptar toda a roda sem acumulação/limiar — rejeitado porque a inércia do trackpad pularia várias seções.

## Risks / Trade-offs

- [Mudar `overflow` do body afeta nuvens/light switch/header] → Escopar `.clouds` à seção hero e revalidar tema claro/escuro e idioma após a mudança.
- [Duas folhas em 80vw deixam cada folha com ~40vw (≈170px em 484px)] → Tipografia compacta com `clamp()`, padding reduzido, quebra de tags e `overflow-y:auto` por folha; validar em 484×885 e em tela larga.
- [Papel branco fixo pode conflitar com controles do tema escuro] → Escopar tokens de papel às folhas e às abas, manter o restante da UI no tema e conferir contraste de links, tags, botão de deploy e tooltips.
- [Spread quebra premissas de `ProjectsSection` e do modelo 4+2N] → Refatorar para spreads `{ left, right }`, atualizar contagens e cobrir troca de categoria, categoria vazia e limites de navegação.
- [Snap horizontal + vertical pode conflitar] → Snap vertical só no wrapper do documento; a virada horizontal é transform, sem scroll nativo.
- [Contagem dinâmica de spreads e `currentSpread` fora de faixa ao trocar categoria] → Clamp em `goToSpread` e `useEffect` de reconciliação.
- [Conteúdo da folha em movimento some para leitores de tela] → marcar a camada `.notebook-turn` como `aria-hidden` + `inert` durante os ~420 ms; após commitar, o spread de destino já contém todo o conteúdo acessível. Anunciar a seção via `aria-live` se necessário.
- [Roda interceptada pode pular seções ou prender o usuário] → acumular delta, executar um movimento por gesto, travar até `scrollend` (com fallback por timeout) e clampar nas pontas; testar mouse e trackpad.
- [Roda sobre folha longa pode roubar o scroll interno] → só interceptar quando a folha estiver no limite na direção do gesto; testar para cima e para baixo.
- [Abas fora do frame geram overflow horizontal em 484px] → `overflow-x:clip` no `.app-scroll` + offsets com `clamp()`; validar 484×885.
- [Placeholders de imagem podem não representar os projetos] → Nomear claramente como placeholder e documentar substituição.
- [Drift entre a spec original (página única, 4+2N) e o novo modelo] → Registrar no design e realinhar a spec de `add-narrative-notebook` antes do archive; este change mantém `skip_specs: true`.

## Migration Plan

1. Destravar fluxo (overflow + Play) e validar que o notebook aparece.
2. Introduzir dados de perfil e modelo de spreads; dividir o conteúdo entre folhas e conectar props.
3. Trocar a página única pelo spread de duas folhas com lombada e gutter.
4. Implementar marcadores, categorias, navegação por cantos e animação por spread.
5. Aplicar a paleta de papel e ajustar responsividade/overflow das folhas.
6. Corrigir assets/favicon/filtros; rodar `npm run build`, `npm run dev`, `openspec validate`.
7. Ocultar barras e travar o eixo horizontal; validar scroll vertical, snap e folhas longas.
8. Extrair o scroll do Play e aplicar a mesma movimentação à roda; implementar a virada 3D com CSS/WAAPI.
9. Substituir os marcadores por abas de página; atualizar README e rodar build/dev/validate + checklist manual.

Rollback: reverter os commits deste change; o change `add-narrative-notebook` e seus artefatos permanecem intactos.

## Open Questions

Nenhuma bloqueante. Posição das abas decidida à esquerda (não conflita com as tabs de categoria). A roda do mouse replica a movimentação do Play; touch e teclado continuam nativos. Motion fica fora desta revisão. A decisão sobre manter ou remover `GAME_PAGE_URL` pode ser resolvida na implementação (remover se não houver outro uso).
