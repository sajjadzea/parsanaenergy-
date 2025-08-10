# Parsana Energy Monorepo

This repository hosts several independent front‑end applications. Each
folder under the root is a self‑contained [Vite](https://vitejs.dev/) project
with its own `package.json`.

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
pnpm install
pnpm dev       # start dev server on http://localhost:5173
```

Build for production:

```bash
pnpm build
pnpm preview   # preview the built files
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
pnpm install
pnpm dev            # development server
pnpm build          # build to dist/
pnpm preview        # preview production build
pnpm run build-widget # build and copy into docs/widget
```

Before committing changes to the repository, run `pnpm --filter decision-tree-app run build-widget`
to refresh the files inside `docs/widget`. This keeps the deployed
decision tree up‑to‑date.

**Build and deploy order**
1. `pnpm --filter decision-tree-app run build-widget`
2. `pnpm --filter docs run build`
This sequence ensures the site and widget bundles are generated
separately with unique hashes to avoid conflicts.

## Envoy configuration

The `envoy/envoy.yaml` file configures Envoy to inject common security headers into every response. Start your static site on port `8000` (e.g. `pnpm preview` in `docs`) and launch Envoy:

```bash
docker run --rm -p 8080:8080 \
  -v $(pwd)/envoy/envoy.yaml:/etc/envoy/envoy.yaml \
  envoyproxy/envoy:v1.29-latest
```

Then open `http://localhost:8080`.

## CI/CD Setup

As of 2025-03-16, the repository uses **pnpm** exclusively with `pnpm-workspace.yaml` controlling all workspaces.

- All GitHub Actions jobs rely on [`pnpm/action-setup@v4`](https://github.com/pnpm/action-setup) and run on **Node.js 18** unless a job explicitly requires a newer runtime.
- The change was prompted by a Node.js 20 + pnpm issue involving `URLSearchParams` that caused installs to fail.
  - See [pnpm/pnpm#7420](https://github.com/pnpm/pnpm/issues/7420) and [nodejs/node#41087](https://github.com/nodejs/node/issues/41087) for details.

### Debugging commands
For quick environment checks:

```bash
pnpm -v
node -v
pnpm config get registry
cat .npmrc
```

## Linting

The workspace uses ESLint's [Flat Config](https://eslint.org/docs/latest/use/configure/configuration-files-new) (ESLint v9+) to lint JavaScript sources.

Run linting across all projects with:

```bash
pnpm lint
```

The configuration currently reports issues as warnings so development and deployment are not blocked. The GitHub Actions CI workflow runs this lint step in non-blocking mode, allowing CI to continue even when warnings are present. Once the codebase is cleaned up, warnings can be upgraded to errors.

TypeScript files are not linted. Adding TypeScript support will require `@typescript-eslint` dependencies and corresponding configuration.

