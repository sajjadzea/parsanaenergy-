# Parsana Energy Monorepo

This repository hosts several independent front‑end applications. Each
folder under the root is a self‑contained [Vite](https://vitejs.dev/) project
with its own `package.json`.

## Modules

### `landing`
Marketing landing page with basic HTML/CSS and a small React entry point.

```
landing/
├─ index.html           # main static page
├─ src/                 # React widget source
│  └─ main.jsx          # entry point
└─ vite.config.js
```

Run the site locally:

```bash
cd landing
npm install
npm run dev       # start dev server on http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview   # preview the built files
```

### `decision-tree-app`
Interactive decision tree widget built with React and Vite.

```
decision-tree-app/
├─ index.html
├─ src/
│  └─ main.jsx       # entry point
└─ vite.config.js
```

Use the following commands:

```bash
cd decision-tree-app
npm install
npm run dev        # development server
npm run build      # build to dist/
npm run preview    # preview production build
```

## Repository layout

```
.
├── README.md
├── decision-tree-app
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   └── vite.config.js
└── landing
    ├── README.md
    ├── assets
    ├── css
    ├── images
    ├── index.html
    ├── js
    ├── package-lock.json
    ├── package.json
    ├── src
    └── vite.config.js
```
