# Parsana Energy Monorepo

This repository hosts several independent front‑end applications. Each
folder under the root is a self‑contained [Vite](https://vitejs.dev/) project
with its own `package.json`.

## CI/CD

The repository uses a single GitHub Actions workflow (`build-and-deploy.yml`) to
build and publish the site to GitHub Pages. The workflow installs dependencies
with `pnpm`, builds the `docs` site, copies required static assets (`404.html`,
`CNAME`, `articles/`, `.nojekyll`), and verifies that they exist in the output
before deployment. After the site is deployed, the helper script
`scripts/verify-deployment.sh` checks that `/`, `/articles/`, and `/404.html`
return HTTP 200. Update the workflow and these checks whenever new pages or
features are introduced.

## Modules

### `docs`
Marketing landing page with basic HTML/CSS and a small React entry point.

```
docs/
├─ index.html           # main static page
├─ src/                 # React widget source
│  └─ main.jsx          # entry point
└─ vite.config.js
```

Run the site locally:

```bash
cd docs
npm install
npm run dev       # start dev server on http://localhost:5173
```

Build for production:

```bash
npm run build
npm run preview   # preview the built files
```

The Vite configuration sets `base: '/parsanaenergy/'` so that assets load
correctly when deploying the site under `https://<user>.github.io/parsanaenergy/`.

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
npm run build-widget # build and copy into docs/widget
```

This app also uses `base: '/parsanaenergy/'` in `vite.config.js` so the widget
works correctly when served from the GitHub Pages subdirectory.

Before committing changes to the repository, run `npm run build-widget`
to refresh the files inside `docs/widget`. This keeps the deployed
decision tree up‑to‑date.

**Build and deploy order**
1. `cd decision-tree-app && npm run build-widget`
2. `cd docs && npm run build`
This sequence ensures the site and widget bundles are generated
separately with unique hashes to avoid conflicts.

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
└── docs
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

## Envoy configuration

The `envoy/envoy.yaml` file configures Envoy to inject common security headers into every response. Start your static site on port `8000` (e.g. `npm run preview` in `docs`) and launch Envoy:

```bash
docker run --rm -p 8080:8080 \
  -v $(pwd)/envoy/envoy.yaml:/etc/envoy/envoy.yaml \
  envoyproxy/envoy:v1.29-latest
```

Then open `http://localhost:8080`.
