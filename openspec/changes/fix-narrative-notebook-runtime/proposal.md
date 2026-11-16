# Proposal

## Why

O change `add-narrative-notebook` foi marcado como completo (38/38 tasks), mas em `npm run dev` apenas o header aparece: o notebook fica fora da viewport por causa de `body { overflow: hidden }` e o botão Play navega para `/game.html`, arquivo inexistente, em vez de abrir o notebook. Além disso, a implementação diverge das specs em estrutura, animações, navegação e conexão de dados.

Este change corrige a implementação para que ela **cumpra os requisitos já especificados** em `add-narrative-notebook` e, na Revisão 2, ajusta a apresentação para o formato de caderno aberto pedido.

**Revisão 2 — correção visual:** a implementação entregue ainda abre como uma página única. O notebook deve se comportar como um caderno físico aberto: duas folhas visíveis lado a lado, com o conteúdo dividido entre elas, em papel branco e texto escuro para leitura. Isso supera a convenção de página única / `4 + 2N` da spec original; o realinhamento dessa spec fica registrado como follow-up (ver `tasks.md`).

## What Changes

- **Destravar a renderização do notebook**: remover o corte de scroll do documento, corrigir a ordem/fluxo de seções e garantir que o notebook seja alcançável.
- **Corrigir o botão Play**: parar de navegar para `/game.html`; apenas rolar suavemente até `#notebook-section`.
- **Alinhar a estrutura do notebook**: spreads em layout horizontal, container centralizado ~80vw × ~80vh, folhas com classe `.notebook-leaf`, estado inicial fechado e abertura no Play.
- **Repaginar como caderno aberto**: cada seção vira um spread com duas folhas lado a lado (esquerda/direita), dividindo o conteúdo sem duplicação; a navegação passa a operar por spread (`4 + N`) e a contagem total por folha é `8 + 2N`.
- **Aplicar papel branco com texto escuro**: variáveis de papel escopadas às folhas (`--paper-bg`, `--paper-text`, `--paper-muted`, `--paper-border`) para leitura confortável nos temas claro e escuro, mantendo a capa e os controles no esquema atual.
- **Implementar interações especificadas**: marcadores laterais com regra "apenas o atual oculto" e tooltip real, tabs de categoria à direita, navegação por cantos que efetivamente vira o spread, contagem `4 + N` spreads / `8 + 2N` folhas.
- **Conectar dados e props**: `AboutMePage`, `CareerPage`, `StudiesPage`, `ProjectsSection` e `ContactPage` recebem dados reais; imports ausentes de `ProjectLeftPage`/`ProjectRightPage` são adicionados.
- **Corrigir assets e higiene**: imagens de projeto ausentes, favicon `.ico`/`.png`, navegação de jogo órfã.
- **Mitigar o warning de shader**: substituir `filter: opacity()` por `opacity` nas nuvens (warning é do Chromium/Skia em software compositing, não do app).
- Revalidar `npm run build`, `npm run dev` e `openspec validate`.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

Nenhuma declarada neste change. A maior parte do comportamento desejado já está definida em `narrative-notebook-component`, `narrative-notebook-scroller` e `narrative-content-pages` (change `add-narrative-notebook`). A Revisão 2 introduz o modelo de spread (`4 + N` / `8 + 2N`), que supera a convenção de página única da spec original; o delta correspondente será realinhado em `add-narrative-notebook` antes do archive. Por isso `.openspec.yaml` mantém `skip_specs: true`.

## Impact

Arquivos afetados:
- `src/App.jsx` — composição das seções e props dos componentes.
- `src/components/PlayButton.jsx`, `src/components/HeaderText.jsx` — fluxo do Play.
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` — layout de spread, estado, marcadores, navegação.
- `src/components/narrative-notebook-component/{AboutMePage,CareerPage,StudiesPage,ContactPage}.jsx` — divisão do conteúdo entre folhas esquerda/direita.
- `src/components/narrative-notebook-component/ProjectsSection.jsx` — props e imports ausentes.
- `src/components/narrative-notebook-component/{ProjectLeftPage,ProjectRightPage}.jsx` — páginas do spread de projeto.
- `src/utils/buildNotebookPages.js` — modelo de spreads.
- `src/styles/index.css` — scroll, layout do notebook, paleta de papel, animações, filtros.
- `src/data/*` — dados de perfil/carreira/estudos/contato, se necessário.
- `public/images/projects/*`, `index.html` — assets e favicon.
- `README.md` — modelo de spread e placeholders.

Fora de escopo:
- Redesenhar header, nuvens ou paleta global do site.
- Novas funcionalidades não previstas em `add-narrative-notebook`.
- Criar delta de spec neste change; a convenção `4 + 2N` será realinhada no change `add-narrative-notebook` antes do archive.
