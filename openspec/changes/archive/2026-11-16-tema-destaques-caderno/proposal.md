# Proposal

## Why

Os textos de destaque do caderno usam hoje uma cor azul fixa, portanto não comunicam visualmente o tema ativo do portfólio. Uma convenção reutilizável é necessária para que novos destaques tenham comportamento consistente sem regras de cor duplicadas.

## What Changes

- Introduzir uma classe semântica reutilizável `destaque` para textos destacados nas páginas do caderno.
- Fazer a cor de `destaque` responder imediatamente ao tema ativo: azul no modo claro e laranja no modo escuro.
- Aplicar a classe aos elementos de conteúdo do caderno que representam texto em destaque, substituindo a dependência de estilos de destaque fixos.
- Centralizar a escolha de cor em tokens CSS de tema, preservando a legibilidade da folha do caderno e a paleta aprovada.

## Capabilities

### New Capabilities
- `notebook-highlight-theming`: Define a semantic, reusable highlight treatment for notebook content that changes color with the active site theme.

### Modified Capabilities
- `narrative-content-pages`: Notebook content gains a consistent semantic distinction for highlighted text.

## Impact

- Affected code: `src/styles/index.css` and notebook page components under `src/components/narrative-notebook-component/`.
- Theme integration: existing `lightmode` body class and CSS custom-property palette.
- No API, dependency, navigation, localization, or content-model changes are expected.
