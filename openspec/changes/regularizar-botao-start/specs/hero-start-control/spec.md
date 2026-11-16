# Spec Delta

## Purpose

Define o controle inicial do cabeçalho que leva o visitante ao caderno, com rótulo, paleta e transição visual consistentes entre temas e idiomas.

## ADDED Requirements

### Requirement: Start is the named entry control
O cabeçalho SHALL disponibilizar um único controle de entrada denominado `start` para iniciar a experiência do caderno. O rótulo visível e o nome acessível do controle MUST usar `start`, independentemente do idioma ativo.

#### Scenario: Portuguese interface displays start
- **WHEN** a interface em português é exibida
- **THEN** o controle de entrada apresenta o rótulo `start`

#### Scenario: English interface displays start
- **WHEN** a interface em inglês é exibida
- **THEN** o controle de entrada apresenta o rótulo `start`

### Requirement: Start control uses the matching light-theme cover palette
No modo claro, o controle `start` MUST usar os tons equivalentes da paleta laranja da capa do caderno para sua face, bordas, sombra, destaque e brilho, preservando a hierarquia claro/escuro entre suas camadas visuais.

#### Scenario: Light theme start palette
- **WHEN** o tema claro está ativo
- **THEN** a face, a borda, a sombra e os destaques do controle `start` usam os respectivos tons laranja da paleta da capa do caderno

#### Scenario: Dark theme start palette remains intact
- **WHEN** o tema escuro está ativo
- **THEN** o controle `start` mantém a paleta azul já usada pela capa do caderno nesse tema

### Requirement: Start color transition is isolated and rapid
Ao trocar de tema, todas as superfícies coloridas do controle `start` MUST concluir a transição de cor em até 200 ms. Essa duração MUST se aplicar somente ao controle `start` e MUST NOT alterar a duração de transição dos demais elementos da interface.

#### Scenario: Theme changes on start control
- **WHEN** o visitante alterna o tema com o controle `start` visível
- **THEN** todas as suas camadas coloridas alcançam a paleta de destino em até 200 ms sem persistir em uma cor intermediária perceptível

#### Scenario: Other elements retain their transition
- **WHEN** o visitante alterna o tema
- **THEN** os elementos fora do controle `start` mantêm sua duração de transição previamente definida