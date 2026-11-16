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

O conteúdo principal é um notebook horizontal centralizado (~80vw × ~80vh):

- Ordem fixa: Sobre Mim → Carreira → Estudos → Projetos → Contato.
- Cada projeto ocupa duas páginas (metadados + demo), então o total é **4 + 2N**.
- Marcadores à esquerda: apenas o marcador da seção atual fica oculto.
- Tabs à direita (só em Projetos): filtram por categoria; a categoria selecionada tem o marcador oculto e continua clicável para voltar a "todas".
- Cantos inferiores esquerdo/direito navegam para a página anterior/seguinte.
- O botão Play abre o notebook e rola suavemente até ele.

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
