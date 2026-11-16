# Tasks

> Estado: seções 1–8 concluídas e verificadas. O realinhamento feito em
> `fix-narrative-notebook-runtime` está refletido aqui.

## 1. Modelo de spreads, conteúdo e navegação

- [x] 1.1 Criar `buildNotebookPages` retornando spreads `{ id, section, left, right }` e verificar a ordem About → Career → Studies → Projects → Contact com `4 + N` spreads / `8 + 2N` folhas.
- [x] 1.2 Dividir o conteúdo de cada seção entre as folhas esquerda/direita e verificar que nada é duplicado e que cada folha renderiza isoladamente.
- [x] 1.3 Implementar `currentSpread` com transação `from/to/direction/status` e verificar ida, volta, limites e cliques rápidos sem viradas sobrepostas.
- [x] 1.4 Implementar a virada física 3D em `PageTurn` com frente/verso, ~420ms e fallback para `prefers-reduced-motion`.
- [x] 1.5 Conectar navegação por cantos, marcadores de seção e filtro de categoria ao índice de spread; verificar clamp e reseleção de categoria.
- [x] 1.6 Conectar dados reais de `src/data/profile.js`, `src/data/projects.js` e o toggle pt/eng; verificar que nenhuma folha fica vazia.

## 2. Rolagem, roda e acabamento do documento

- [x] 2.1 Configurar `.app-scroll` com `height:100dvh`, `scroll-snap-type:y mandatory`, barras ocultas e `overflow-x: clip`; verificar que não há barra visível nem scroll lateral.
- [x] 2.2 Extrair o scroll do Play para `scrollToSection` e aplicar a mesma movimentação à roda, com acumulação de delta, um movimento por gesto e lock até `scrollend`.
- [x] 2.3 Permitir que uma folha longa role internamente até o limite antes de trocar de seção; verificar para cima e para baixo.
- [x] 2.4 Corrigir assets, favicon e o filtro das nuvens; verificar ausência de 404 e do warning de shader disparado pelo app.

## 3. Verificação base concluída

- [x] 3.1 Rodar `npm run build` e confirmar conclusão sem erros.
- [x] 3.2 Rodar `npm run dev` e validar Play, spreads, cantos, categorias, deploy, tema e idioma.
- [x] 3.3 Rodar `openspec validate fix-narrative-notebook-runtime --json` e confirmar `valid: true`.

## 4. Gate de rolagem até o Play

- [x] 4.1 Adicionar `isUnlocked` no `App.jsx`, iniciar `false`, resetar `scrollTop = 0` no mount e desbloquear ao clicar no Play; verificar que a página não rola antes do clique.
- [x] 4.2 Aplicar `.is-scroll-locked` ao `.app-scroll` (`overflow:hidden`, sem snap, sem toque) e remover a classe após o Play; verificar roda, teclado e toque bloqueados antes e liberados depois.
- [x] 4.3 Passar `{ enabled: isUnlocked }` para `useSectionSnap` e ignorar a roda enquanto bloqueado; verificar que nenhum gesto move o documento antes do Play.
- [x] 4.4 Garantir que o Play atualiza o estado antes de chamar `scrollToSection` (requestAnimationFrame) e que o notebook é alcançado; verificar também com `prefers-reduced-motion`.
- [x] 4.5 Verificar que, após abrir, o usuário sobe até o header e desce novamente quantas vezes quiser sem novo lock; recarregar deve voltar ao estado bloqueado.

## 5. Componente único de abas espelhadas

- [x] 5.1 Criar `NotebookTab.jsx` com props `side`, `icon`, `label`, `active`, `accent` e `onSelect`, renderizando ícone + rótulo inline; verificar as variantes esquerda/direita.
- [x] 5.2 Substituir as abas de seção em `NarrativeNotebook.jsx` por `NotebookTab` com `side="left"`; verificar a ordem Sobre Mim → Carreira → Estudos → Projetos → Contato.
- [x] 5.3 Refatorar `ProjectsSection.jsx` para renderizar as categorias com `NotebookTab` e `side="right"`; verificar IA e Automações, Jogos, WebDev e BackEnd espelhados.
- [x] 5.4 Adicionar o mapa de ícones das quatro categorias e verificar que cada aba mostra o ícone correto.
- [x] 5.5 Remover a contagem de projetos das abas de categoria e verificar que nenhum número/badge aparece.
- [x] 5.6 Verificar que hover, foco, clique, ativo e expansão se comportam igual nas duas laterais, mudando apenas a direção.

## 6. Expansão, contato com o caderno e contraste

- [x] 6.1 Remover `opacity: 0`, `pointer-events: none` e `tabIndex={-1}` do marcador ativo; verificar que ele permanece visível e expande horizontalmente com o nome.
- [x] 6.2 Implementar a expansão por hover e `:focus-visible` com o rótulo dentro da aba; verificar que o ativo já nasce expandido.
- [x] 6.3 Remover `data-tooltip` e o `::after` da tooltip; verificar que nenhum balão flutuante aparece no hover.
- [x] 6.4 Ancorar as duas colunas flush na capa, sem gap, com crescimento para fora; verificar o contato visual nas laterais esquerda e direita.
- [x] 6.5 Remover o `::before` semicircular/entalhe e qualquer dot circular dos marcadores; verificar que a forma é apenas a aba + ícone + rótulo.
- [x] 6.6 Fixar o token de tinta do ícone (`--tab-icon`) fora de `--text-color`; alternar tema claro/escuro e verificar que os ícones permanecem legíveis e com a mesma cor.
- [x] 6.7 Validar desktop e 484×885: abas encostadas, ativo expandido, rótulo acessível e nenhum overflow horizontal.

## 7. Capa em pixel art

- [x] 7.1 Adicionar os tokens `--cover-*` em `:root` (azul) e `.lightmode` (laranja) usando somente valores já existentes; conferir que nenhum hex novo foi introduzido.
- [x] 7.2 Transformar `.notebook-shell` em capa pixel art com blocos escalonados, cantos retos, brilho/sombra em camadas no estilo do botão Play.
- [x] 7.3 Inserir o palco/folhas dentro da capa, mantendo a lombada em 50% e a camada de virada alinhada; verificar a virada frente/verso.
- [x] 7.4 Manter a capa visível no estado fechado antes do Play; verificar tema claro e escuro.
- [x] 7.5 Verificar que as abas continuam encostadas na capa e que a capa não cria scroll horizontal.

## 8. Integração e documentação da revisão

- [x] 8.1 Atualizar `README.md` com o gate de rolagem, o componente único de abas, a expansão ativa/hover, a remoção da tooltip/entalhe, a capa pixel art e a paleta azul/laranja.
- [x] 8.2 Rodar `npm run build` e confirmar conclusão sem erros.
- [x] 8.3 Rodar `npm run dev` e executar o checklist manual: lock antes do Play, unlock permanente, abas espelhadas, ativo expandido, hover com nome, contato com a capa, ícones no tema escuro e capa azul/laranja.
- [x] 8.4 Rodar `openspec validate add-narrative-notebook --json` e confirmar `valid: true` sem issues bloqueantes.

## Workflow follow-up

- Arquivar `fix-narrative-notebook-runtime` somente depois que o realinhamento deste change estiver aplicado.
- Aplicar as tarefas 4–8 no código com `openspec-apply-change add-narrative-notebook`.
- Arquivar `add-narrative-notebook` somente após build, dev e checklist manual verdes.
