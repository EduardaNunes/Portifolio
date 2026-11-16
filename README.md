# Portfólio – Eduarda Nunes (React)

Migração do portfólio em HTML/CSS/JS puro para React + Vite.

## Como rodar

```bash
npm install
npm run dev
```

## Assets

Copie as pastas do projeto original para `public/`:

```
public/
├── Imgs/            (CloudBlack.png, ProfileWhite.png, CloudIcon.png, ...)
├── Fonts/           (joystix monospace.ttf)
├── Sounds/          (Light-Switch.mp3)
└── images/projects/ (placeholders .svg dos projetos)
```

## Notebook

O conteúdo principal é um notebook em formato de caderno aberto, centralizado
(~80vw × ~80vh), com duas folhas visíveis lado a lado:

- Ordem fixa: Sobre Mim → Carreira → Estudos → Projetos → Contato.
- Cada seção ocupa **um spread** (duas folhas); cada projeto também ocupa um
  spread (metadados + demo). O total é **4 + N spreads** ou **8 + 2N folhas**.
- O conteúdo das seções é dividido entre as folhas, sem duplicação:
  - Sobre Mim: habilidades × resultados;
  - Carreira: trajetória × objetivos;
  - Estudos: formação × cursos/projetos;
  - Projetos: metadados × demo/deploy;
  - Contato: CTA/e-mail × links sociais.
- As folhas usam papel branco e texto escuro em ambos os temas; a capa, as
  abas de página e as tabs seguem o esquema claro/escuro do site.
- Abas de página físicas à esquerda (ícone + entalhe + sombra): apenas a aba da
  seção atual fica oculta; as demais mostram o nome da seção no tooltip.
- A troca de spread usa uma folha 3D de duas faces girando em torno da lombada
  (~420ms, frente/verso, sombra móvel). Cliques rápidos não sobrepõem viradas.
- Tabs de categoria (só em Projetos): filtram por categoria; a categoria
  selecionada tem o marcador oculto e continua clicável para voltar a "todas".
  Em telas estreitas elas ficam em uma linha abaixo do caderno.
- Cantos inferiores esquerdo/direito navegam para o spread anterior/seguinte.
- O botão Play abre o notebook e rola suavemente até ele.
- Rolagem: as barras verticais e horizontais ficam ocultas, o eixo horizontal
  é travado e o snap vertical continua parando em cada seção.
- A roda do mouse reaproveita o mesmo scroll suave do Play e move exatamente
  uma seção por gesto, para cima e para baixo. Dentro de uma folha longa, a
  roda primeiro rola a folha e só então troca de seção no limite.
- Com `prefers-reduced-motion`, a troca de spread é direta (sem rotação) e o
  scroll deixa de ser animado.

### Placeholders de imagem

As imagens em `public/images/projects/*.svg` são placeholders. Substitua-as pelos
screenshots reais mantendo os nomes, ou atualize `thumbnailUrl` em
`src/data/projects.js`.

## Estrutura

```
src/
├── components/   componentes de UI (um por responsabilidade)
├── hooks/        lógica reutilizável (tema, idioma, arrastar o interruptor)
├── data/         textos traduzidos e constantes
├── utils/        funções puras
└── styles/       CSS global
```
