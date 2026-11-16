# Proposal

## Why

O change `add-narrative-notebook` foi marcado como completo (38/38 tasks), mas em `npm run dev` apenas o header aparece: o notebook fica fora da viewport por causa de `body { overflow: hidden }` e o botão Play navega para `/game.html`, arquivo inexistente, em vez de abrir o notebook. Além disso, a implementação diverge das specs em estrutura, animações, navegação e conexão de dados.

Este change corrige a implementação para que ela **cumpra os requisitos já especificados** em `add-narrative-notebook` e, na Revisão 2, ajusta a apresentação para o formato de caderno aberto pedido.

**Revisão 2 — correção visual:** a implementação entregue ainda abre como uma página única. O notebook deve se comportar como um caderno físico aberto: duas folhas visíveis lado a lado, com o conteúdo dividido entre elas, em papel branco e texto escuro para leitura. Isso supera a convenção de página única / `4 + 2N` da spec original; o realinhamento dessa spec fica registrado como follow-up (ver `tasks.md`).

**Revisão 3 — rolagem e virada física:** a revisão 2 entregou o caderno aberto, mas a experiência ainda destoa de um caderno real: as barras de rolagem aparecem, o documento aceita deslocamento horizontal, os marcadores são círculos em vez de abas de página, a troca de spread é um slide lateral com leve rotação e a roda do mouse não usa a mesma movimentação suave do Play, sendo percebida como um salto. Esta revisão corrige acabamento, gesto e animação sem alterar o modelo de conteúdo/spreads.

## What Changes

- **Destravar a renderização do notebook**: remover o corte de scroll do documento, corrigir a ordem/fluxo de seções e garantir que o notebook seja alcançável.
- **Corrigir o botão Play**: parar de navegar para `/game.html`; apenas rolar suavemente até `#notebook-section`.
- **Alinhar a estrutura do notebook**: spreads em layout horizontal, container centralizado ~80vw × ~80vh, folhas com classe `.notebook-leaf`, estado inicial fechado e abertura no Play.
- **Repaginar como caderno aberto**: cada seção vira um spread com duas folhas lado a lado (esquerda/direita), dividindo o conteúdo sem duplicação; a navegação passa a operar por spread (`4 + N`) e a contagem total por folha é `8 + 2N`.
- **Aplicar papel branco com texto escuro**: variáveis de papel escopadas às folhas (`--paper-bg`, `--paper-text`, `--paper-muted`, `--paper-border`) para leitura confortável nos temas claro e escuro, mantendo a capa e as tabs de categoria no esquema atual; as abas de página usam paleta própria de papel.
- **Implementar interações especificadas**: marcadores laterais com regra "apenas o atual oculto" e tooltip real, tabs de categoria à direita, navegação por cantos que efetivamente vira o spread, contagem `4 + N` spreads / `8 + 2N` folhas.
- **Conectar dados e props**: `AboutMePage`, `CareerPage`, `StudiesPage`, `ProjectsSection` e `ContactPage` recebem dados reais; imports ausentes de `ProjectLeftPage`/`ProjectRightPage` são adicionados.
- **Corrigir assets e higiene**: imagens de projeto ausentes, favicon `.ico`/`.png`, navegação de jogo órfã.
- **Mitigar o warning de shader**: substituir `filter: opacity()` por `opacity` nas nuvens (warning é do Chromium/Skia em software compositing, não do app).
- **Ocultar barras de rolagem**: esconder as barras vertical e horizontal em `.app-scroll` e nas folhas (`.notebook-leaf`), preservando rolagem por roda, teclado e toque.
- **Travar a rolagem horizontal**: impedir overflow horizontal no documento, na seção e nas folhas (`overflow-x: clip`, `touch-action: pan-y pinch-zoom`); a navegação horizontal continua apenas por marcadores, cantos e tabs. O `scroll-snap-type: y mandatory` entre seções permanece intacto.
- **Replicar o scroll do Play na roda do mouse**: extrair a movimentação suave já usada pelo Play para uma função compartilhada e aplicá-la ao wheel, para cima e para baixo, exatamente uma seção por gesto; a roda dentro de uma folha continua rolando a folha até o limite.
- **Transformar marcadores em abas de página**: substituir os pontos circulares por abas físicas presas à borda esquerda do caderno, com ícone, entalhe, sombra, hover e tooltip; manter a regra de apenas o marcador atual oculto.
- **Virar folha de verdade**: substituir o track com `translateX` por uma folha de duas faces que gira 180° em torno da lombada, com perspectiva, frente/verso, sombra móvel e indício de curvatura; direção frente/volta, ~420 ms e fallback para `prefers-reduced-motion`.
- **BREAKING (interno)**: `.notebook-track` e o deslocamento `translateX(-index * 100%)` deixam de existir; `NarrativeNotebook` passa a compor um spread base + camada de folha em virada. CSS, README e testes manuais são atualizados.
- Revalidar `npm run build`, `npm run dev` e `openspec validate`.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

Nenhuma declarada neste change. A maior parte do comportamento desejado já está definida em `narrative-notebook-component`, `narrative-notebook-scroller` e `narrative-content-pages` (change `add-narrative-notebook`). A Revisão 2 introduziu o modelo de spread (`4 + N` / `8 + 2N` folhas) e a Revisão 3 muda a apresentação/interação (abas de página, virada física, barras ocultas, rolagem apenas vertical e roda do mouse replicando o scroll do Play). Esses deltas superam a spec original e serão realinhados em `add-narrative-notebook` antes do archive. Por isso `.openspec.yaml` mantém `skip_specs: true`.

## Impact

Arquivos afetados:
- `src/App.jsx` — composição das seções, props dos componentes e descritores de seção com ícone para as abas.
- `src/components/PlayButton.jsx`, `src/components/HeaderText.jsx` — fluxo do Play e scroll suave compartilhado.
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` — palco de spread, estado de transação, abas, navegação e controle de roda.
- `src/components/narrative-notebook-component/PageTurn.jsx` (novo) — folha de duas faces que gira em torno da lombada.
- `src/hooks/useSectionSnap.js` (novo) — controlador de roda que replica o scroll do Play.
- `src/components/narrative-notebook-component/{AboutMePage,CareerPage,StudiesPage,ContactPage}.jsx` — divisão do conteúdo entre folhas esquerda/direita.
- `src/components/narrative-notebook-component/ProjectsSection.jsx` — props e imports ausentes.
- `src/components/narrative-notebook-component/{ProjectLeftPage,ProjectRightPage}.jsx` — páginas do spread de projeto.
- `src/utils/buildNotebookPages.js` — modelo de spreads.
- `src/styles/index.css` — barras ocultas, overflow, layout do notebook, abas de página, paleta de papel, animações, filtros.
- `src/data/*` — dados de perfil/carreira/estudos/contato, se necessário.
- `public/images/projects/*`, `index.html` — assets e favicon.
- `README.md` — modelo de spread, abas, virada física, barras ocultas e navegação por roda.

Fora de escopo:
- Redesenhar header, nuvens ou paleta global do site.
- Novas funcionalidades não previstas em `add-narrative-notebook`.
- Reescrever o snap nativo de touch/teclado; o controlador de roda apenas replica o destino e a suavidade do Play.
- Adicionar Motion ou outra dependência de animação nesta revisão; usar WebGL/Three.js; redesenhar o conteúdo ou o modelo de spreads.
- Criar delta de spec neste change; o realinhamento para spreads, abas, virada física e rolagem fica em `add-narrative-notebook`.
