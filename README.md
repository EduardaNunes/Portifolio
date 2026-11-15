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
├── Imgs/     (CloudBlack.png, ProfileWhite.png, CloudIcon.ico, ...)
├── Fonts/    (joystix monospace.ttf)
└── Sounds/   (Light-Switch.mp3)
```

## Estrutura

```
src/
├── components/   componentes de UI (um por responsabilidade)
├── hooks/        lógica reutilizável (tema, idioma, arrastar o interruptor)
├── data/         textos traduzidos e constantes
├── utils/        funções puras
└── styles/       CSS global
```
