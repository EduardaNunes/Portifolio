# Tasks

## 1. Desbloquear visibilidade e fluxo do Play

- [x] 1.1 Remover `body { overflow: hidden }` e criar um wrapper de scroll documental com `height:100dvh; overflow-y:auto; scroll-snap-type:y mandatory`; verificar em `npm run dev` que o documento rola do header até o notebook.
- [x] 1.2 Envolver header e notebook em seções `min-height:100vh; scroll-snap-align:start` e escopar `.clouds` à seção hero; verificar que nuvens, tema claro/escuro e light switch continuam funcionando.
- [x] 1.3 Ajustar `PlayButton` para receber `onPlay`, remover `window.location.assign('/game.html')` e apenas rolar até `#notebook-section`; verificar que clicar em Play exibe o notebook e não gera 404.
- [x] 1.4 Remover `GAME_PAGE_URL`/`game.html` se não houver outro uso e confirmar com `grep` que não restam referências; verificar que `npm run build` não aponta import morto.

## 2. Dados reais e conexão de props

- [x] 2.1 Criar `src/data/profile.js` com dados de About, Career, Studies e Contact em variantes `pt`/`eng`; verificar importando o módulo e conferindo as chaves esperadas.
- [x] 2.2 Passar props reais de `AboutMePage`, `CareerPage`, `StudiesPage` e `ContactPage` em `App.jsx`; verificar que nenhuma seção renderiza lista vazia nem `href`/`mailto` indefinido.
- [x] 2.3 Adicionar em `ProjectsSection.jsx` os imports de `ProjectLeftPage` e `ProjectRightPage`; verificar que renderizar um projeto não lança `ReferenceError`.
- [x] 2.4 Passar `projects`, categorias e handlers para a sidebar de projetos; verificar que as contagens por categoria correspondem a `src/data/projects.js`.

## 3. Modelo de páginas, layout e localização

- [x] 3.1 Criar helper de páginas planas em `src/App.jsx` ou `src/utils/buildNotebookPages.js`; verificar que o total é `4 + 2N` para 6 projetos (16 páginas) e que o filtro de categoria altera `N`. *(superado por 7.1/7.4: modelo de spreads `4 + N` / `8 + 2N`)*
- [x] 3.2 Implementar `.notebook-shell` (~80vw × ~80vh, centralizado) e track horizontal com `.notebook-page` em **todas** as páginas; verificar que apenas uma página fica visível por vez e sem distorção em janela larga/estreita. *(superado por 7.3: duas folhas por spread)*
- [x] 3.3 Implementar estado `isOpen` no notebook (fechado antes do Play, aberto após) e garantir renderização da primeira página "Sobre Mim"; verificar que antes do Play nenhuma página aparece e depois a primeira aparece.
- [x] 3.4 Refatorar `ProjectsSection` para renderizar apenas a sidebar de categorias; verificar que trocar categoria refiltra os projetos sem quebrar a navegação do notebook.
- [x] 3.5 Mover rótulos/textos das páginas para os dados localizados e consumir o idioma atual; verificar que o toggle pt/eng altera títulos e conteúdos das páginas.

## 4. Interações e animação

- [x] 4.1 Implementar marcadores laterais com mapeamento página→seção, apenas o marcador atual oculto e tooltip real por seção; verificar hover nos não-atuais e invisibilidade do atual.
- [x] 4.2 Implementar categorias com `activeCategory = null` inicial (todas visíveis), categoria selecionada oculta e reseleção voltando a `null`; verificar os três estados na UI.
- [x] 4.3 Implementar navegação por cantos com `goToPage(current ± 1)`, clamp `0..pages.length-1` e rolagem do track; verificar sequência About → Career → Studies → projetos → Contact e limites. *(passa a operar por spread — ver 7.4)*
- [x] 4.4 Sincronizar `currentPage`/`pageIndex` com o track e clampar ao trocar categoria ou redimensionar; verificar que não há índice inválido nem página em branco após filtrar. *(índice por spread — ver 7.4)*
- [x] 4.5 Aplicar animação de virar página de 300–400ms (classes de direção + `transitionend`); verificar visualmente ida e volta dentro da faixa de tempo.

## 5. Assets, filtros e documentação

- [x] 5.1 Criar placeholders reais em `public/images/projects/` para os 6 caminhos de `projects.js` (ou apontar para imagens existentes); verificar na aba Network que não há 404 ao abrir os projetos.
- [x] 5.2 Corrigir o favicon em `index.html` para `CloudIcon.png`; verificar que o ícone carrega sem 404.
- [x] 5.3 Substituir `filter: opacity()` por `opacity` em `.cloud`; verificar no console que o aviso de shader do Chromium não é mais disparado pelo app.
- [x] 5.4 Documentar em `README.md` ou JSDoc a estrutura do notebook, o modelo `4 + 2N` e a substituição dos placeholders; verificar que o texto corresponde ao comportamento implementado. *(modelo atualizado por 7.7)*

## 6. Verificação de integração

- [x] 6.1 Rodar `npm run build` e confirmar conclusão sem erros; verificar o artefato em `dist/`.
- [x] 6.2 Rodar `npm run dev` e executar checklist manual: Play abre o notebook, marcadores, cantos, troca de categoria, deploy abre em nova aba, idioma e tema; verificar cada item no navegador.
- [x] 6.3 Rodar `openspec validate fix-narrative-notebook-runtime --json` e confirmar `valid: true` sem issues bloqueantes.

## 7. Correção visual: dupla página e papel branco

- [x] 7.1 Refatorar `buildNotebookPages` para retornar spreads `{ id, section, left, right }` (4 seções + N projetos) e atualizar o consumo em `App.jsx`; verificar que a ordem Sobre Mim → Carreira → Estudos → Projetos → Contato e o filtro de categoria continuam corretos.
- [x] 7.2 Dividir o conteúdo das seções entre folha esquerda/direita (Sobre Mim: skills/soft × resultados; Carreira: trajetória × objetivos; Estudos: formação × cursos/projetos; Contato: CTA × links) sem duplicar texto; verificar cada folha isoladamente.
- [x] 7.3 Implementar `.notebook-spread` com duas `.notebook-leaf` de 50%, lombada central e track por spread; verificar que apenas um spread fica visível e que não há distorção em janela larga/estreita.
- [x] 7.4 Migrar navegação (cantos, marcadores, clamp, troca de categoria) para índice de spread e ajustar a contagem para `4 + N` spreads / `8 + 2N` folhas; verificar limites e reseleção de categoria.
- [x] 7.5 Aplicar a paleta de papel (`--paper-bg`, `--paper-text`, `--paper-muted`, `--paper-border`) escopada às folhas, com fundo branco e texto escuro em ambos os temas; verificar contraste de links, tags, botão de deploy e textos.
- [x] 7.6 Ajustar tipografia, padding e overflow interno das folhas para viewport estreita (~484px) e garantir scroll por folha quando o conteúdo exceder a altura; verificar em 484×885 e em tela larga.
- [x] 7.7 Atualizar `README.md` com o modelo de spread (`4 + N`, `8 + 2N`) e a divisão de conteúdo; verificar que o texto corresponde ao comportamento.
- [x] 7.8 Rodar `npm run build`, `npm run dev` e `openspec validate fix-narrative-notebook-runtime --json`; verificar Play, spread inicial, marcadores, categorias, deploy, idioma e tema.

## Workflow follow-up

- Após a correção, realinhar o `tasks.md` do change `add-narrative-notebook` com o estado real (itens 4–7 foram marcados sem verificação).
- Realinhar a spec de `add-narrative-notebook` para o modelo de spread (`4 + N` spreads / `8 + 2N` folhas) antes de arquivar qualquer um dos changes.
- Arquivar este change apenas quando build, dev e checklist manual estiverem verdes.
