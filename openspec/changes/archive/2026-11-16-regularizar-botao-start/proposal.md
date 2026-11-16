# Proposal

## Why

O controle de entrada do portfólio foi alterado diretamente de `Play` para `start`, incluindo cor, texto e animação, mas ficou sem um change OpenSpec correspondente e com nomenclatura parcial no código. Essa lacuna torna os requisitos de entrada no caderno inconsistentes com a interface atual e dificulta preservar a paleta e o comportamento de transição aprovados.

## What Changes

- Formalizar o controle de entrada do cabeçalho como botão `start`, com o rótulo literal `start` nos idiomas português e inglês.
- Substituir a nomenclatura de `play` usada exclusivamente pelo controle de entrada por nomenclatura `start` em componentes, propriedades, callbacks, chaves de tradução, classes e tokens CSS.
- Preservar referências a `play` que representam reprodução de áudio, vídeo ou mídia e não o controle de entrada.
- Definir que, no modo claro, todas as camadas cromáticas do botão usem os tons equivalentes da paleta laranja da capa do caderno.
- Definir uma transição de cores mais rápida e completa para o botão `start`, sem mudar a duração global de transição dos demais elementos do site.
- Regularizar a documentação removendo o artefato solto `openspec-proposal.md` e mantendo a decisão neste change estruturado.

## Capabilities

### New Capabilities
- `hero-start-control`: Define o controle de entrada do cabeçalho, seu rótulo independente de idioma, sua nomenclatura semântica, a paleta de tema e a transição de cores.

### Modified Capabilities
- `narrative-notebook-scroller`: Substitui a ativação de entrada denominada Play pela ativação denominada start.
- `narrative-notebook-component`: Substitui a abertura do caderno acionada por Play pela abertura acionada por start.

## Impact

- Código afetado: `src/components/StartButton.jsx`, `src/components/HeaderText.jsx`, `src/data/translations.js` e `src/styles/index.css`.
- Especificações afetadas: `narrative-notebook-scroller` e `narrative-notebook-component`.
- O componente anterior `src/components/PlayButton.jsx` deixa de ser a representação do controle de entrada.
- Não há alterações de APIs externas, dependências ou comportamento de reprodução de áudio e vídeo.