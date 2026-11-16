# Tasks

## 1. Nomenclatura do controle de entrada

- [ ] 1.1 Renomear para `start` o componente, props, callbacks, chaves de tradução, classes e tokens que representam exclusivamente a entrada no caderno; verificar por busca no código que referências `play` remanescentes estejam relacionadas somente à mídia.
- [ ] 1.2 Atualizar os consumidores diretos do controle no cabeçalho e no fluxo de abertura; verificar que o primeiro acionamento ainda desbloqueia a rolagem, move a viewport para o caderno e abre a primeira dupla de páginas.
- [ ] 1.3 Atualizar os textos auxiliares em português e inglês para referirem-se a `start`, mantendo o rótulo literal `start` nas duas localidades; verificar alternância de idioma no navegador.

## 2. Paleta e transição do botão start

- [ ] 2.1 Consolidar os tokens do botão `start` para que o modo claro derive face, bordas, sombras, destaques e brilho dos tons equivalentes da capa laranja; verificar visualmente que não restam tons cinza no controle em modo claro.
- [ ] 2.2 Aplicar transição de cor local de até 200 ms a todas as camadas visíveis do controle, incluindo texto, sombras e pseudo-elementos quando usados; verificar alternâncias repetidas de tema sem estado azul/laranja intermediário perceptível no botão.
- [ ] 2.3 Preservar a transição global de 500 ms e as demais animações existentes; verificar que um elemento fora do botão continua usando a duração original ao alternar o tema.

## 3. Verificação de integração

- [ ] 3.1 Executar `npm run build` e verificar conclusão sem erros após a regularização de nomes e estilos.
- [ ] 3.2 Validar manualmente o modo claro e escuro, português e inglês, o hover do botão e a primeira entrada no caderno; verificar rótulo `start`, paleta correta, transição rápida isolada e abertura do caderno preservada.

## Workflow follow-up

- Archive the change after the project's review requirements are satisfied.
- Verify the archived result.