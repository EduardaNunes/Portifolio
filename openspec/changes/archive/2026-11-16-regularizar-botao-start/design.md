# Design

## Context

A interface já contém a primeira versão visual do controle `start`: o componente foi renomeado, o modo claro consome os tons da capa laranja e partes visuais do botão recebem transições de 200 ms. Contudo, props, callbacks, chaves de tradução, seletores e tokens ainda usam nomes associados a `play`; os requisitos OpenSpec existentes também referem-se ao acionamento antigo. Veja `proposal.md` para a motivação e as deltas de spec para o comportamento esperado.

## Goals / Non-Goals

**Goals:**
- Consolidar uma única nomenclatura `start` para o controle de entrada e seus elementos de implementação.
- Preservar `play` exclusivamente nos fluxos que executam mídia, como APIs de áudio e sobreposições de prévia de projeto.
- Derivar todos os tons do controle no modo claro a partir dos tokens da capa, sem introduzir uma nova paleta de interface.
- Aplicar uma transição curta de cores a toda camada visual do controle, sem mudar a regra global de transição.

**Non-Goals:**
- Alterar a lógica de rolagem, o momento de abertura do caderno ou a animação de flutuação/hover do controle.
- Renomear métodos, componentes ou estilos destinados à reprodução de áudio e vídeo.
- Redesenhar a paleta do tema escuro, a capa do caderno ou os demais controles da página.

## Decisions

### Migrar o controle por fronteira semântica
A regularização renomeará para `start` o componente do cabeçalho, suas props/callbacks, chaves de tradução, classes e tokens CSS que representem exclusivamente o acionamento da entrada no caderno. Referências a `play` de mídia permanecerão inalteradas.

Isso satisfaz a nova linguagem do produto sem introduzir mudanças de significado em `audio.play()`, sons de interação ou prévias de projetos. Uma substituição textual global foi descartada porque alteraria comportamentos não relacionados.

### Usar tokens da capa como fonte da paleta clara
A face, bordas, sombra, brilho e destaques do controle usarão tokens da capa no modo claro (`cover-base`, `cover-dark`, `cover-shadow`, `cover-light` e `cover-shine`). O tom secundário será derivado de uma cor já aprovada/documentada ou de um token semântico que mantenha a mesma relação tonal.

A decisão evita valores cinza divergentes e mantém a relação de luminosidade já aprovada para a capa. Duplicar os hexadecimais da capa foi descartado, pois aumentaria o risco de descompasso futuro.

### Isolar a transição acelerada no controle
A regra global permanece em 500 ms. O controle `start` terá uma regra local de até 200 ms que cubra propriedades de cor realmente visíveis, incluindo fundo, cor de texto, sombras e bordas ou pseudo-elementos quando aplicável.

A alternativa de reduzir a transição no seletor universal foi descartada porque mudaria animações não relacionadas. A alternativa de acelerar apenas planos de fundo é insuficiente: sombras e texto poderiam continuar atrasados e criar um estado visual misto.

## Risks / Trade-offs

- [Algum seletor relacionado ao controle continuar com nome `play`] → pesquisar referências após a migração e manter uma lista explícita de exclusões de mídia.
- [Uma camada de sombra ou texto terminar a transição depois do fundo] → aplicar a duração local a todas as propriedades de cor visíveis e validar alternâncias de tema repetidas.
- [Alterar a identidade da paleta escura] → limitar o mapeamento de cores à sobreposição do modo claro e comparar os dois temas visualmente.
- [Arquivos já alterados divergirem das tasks registradas] → revisar o diff atual contra as tasks e concluir somente itens cujo comportamento possa ser demonstrado.

## Migration Plan

1. Atualizar a nomenclatura semântica do controle e ajustar seus consumidores diretos.
2. Consolidar os tokens e seletores visuais `start`, preservando as referências de mídia excluídas.
3. Aplicar a transição local de cor a todas as camadas do controle e manter a regra global inalterada.
4. Atualizar as traduções e os requisitos do caderno para o termo `start`.
5. Executar build e validar em ambos os temas, idiomas e na primeira entrada no caderno.
6. Reverter restaurando os nomes e tokens anteriores caso a abertura, a rolagem ou a renderização do cabeçalho sejam afetadas.