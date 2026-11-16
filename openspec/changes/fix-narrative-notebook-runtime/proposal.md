# Proposal

## Why

O change `add-narrative-notebook` foi marcado como completo (38/38 tasks), mas em `npm run dev` apenas o header aparece: o notebook fica fora da viewport por causa de `body { overflow: hidden }` e o botão Play navega para `/game.html`, arquivo inexistente, em vez de abrir o notebook. Além disso, a implementação diverge das specs em estrutura, animações, navegação e conexão de dados.

Este change corrige a implementação para que ela **cumpra os requisitos já especificados** em `add-narrative-notebook`. Não há mudança de comportamento desejado — portanto não há delta de spec.

## What Changes

- **Destravar a renderização do notebook**: remover o corte de scroll do documento, corrigir a ordem/fluxo de seções e garantir que o notebook seja alcançável.
- **Corrigir o botão Play**: parar de navegar para `/game.html`; apenas rolar suavemente até `#notebook-section`.
- **Alinhar a estrutura do notebook à spec**: páginas em layout horizontal, container centralizado ~80vw × ~80vh, classe `.notebook-page` em todas as páginas, estado inicial fechado e abertura no Play.
- **Implementar interações especificadas**: marcadores laterais com regra "apenas o atual oculto" e tooltip real, tabs de categoria à direita, navegação por cantos que efetivamente vira/rola a página, contagem `4 + 2N`.
- **Conectar dados e props**: `AboutMePage`, `CareerPage`, `StudiesPage`, `ProjectsSection` e `ContactPage` recebem dados reais; imports ausentes de `ProjectLeftPage`/`ProjectRightPage` são adicionados.
- **Corrigir assets e higiene**: imagens de projeto ausentes, favicon `.ico`/`.png`, navegação de jogo órfã.
- **Mitigar o warning de shader**: substituir `filter: opacity()` por `opacity` nas nuvens (warning é do Chromium/Skia em software compositing, não do app).
- Revalidar `npm run build`, `npm run dev` e `openspec validate`.

## Capabilities

### New Capabilities

Nenhuma.

### Modified Capabilities

Nenhuma. O comportamento desejado já está definido em `narrative-notebook-component`, `narrative-notebook-scroller` e `narrative-content-pages` (change `add-narrative-notebook`). Este change é uma correção de implementação, então `.openspec.yaml` define `skip_specs: true`.

## Impact

Arquivos afetados:
- `src/App.jsx` — composição das seções e props dos componentes.
- `src/components/PlayButton.jsx`, `src/components/HeaderText.jsx` — fluxo do Play.
- `src/components/narrative-notebook-component/NarrativeNotebook.jsx` — layout, estado, marcadores, navegação.
- `src/components/narrative-notebook-component/{AboutMePage,CareerPage,StudiesPage,ContactPage}.jsx` — props/dados.
- `src/components/narrative-notebook-component/ProjectsSection.jsx` — props e imports ausentes.
- `src/styles/index.css` — scroll, layout do notebook, animações, filtros.
- `src/data/*` — dados de perfil/carreira/estudos/contato, se necessário.
- `public/images/projects/*`, `index.html` — assets e favicon.

Fora de escopo:
- Redesenho visual além do que as specs exigem.
- Novas funcionalidades não previstas em `add-narrative-notebook`.
- Alterar requisitos ou cenários das specs existentes.
