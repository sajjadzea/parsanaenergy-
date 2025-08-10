#!/usr/bin/env sh
# Cloudflare Pages build script (monorepo + pnpm)
# Build command in CF:  sh scripts/cf-build.sh
# Output directory:     docs/dist

set -e

echo "Node: $(node -v)"
echo "npm:  $(npm -v)"
echo "NODE_ENV=${NODE_ENV:-unset}"

# 1) Force a clean, known pnpm (v9) because CF pre-activates pnpm@10
npm rm -g pnpm >/dev/null 2>&1 || true
npm i -g pnpm@9 --force
echo "pnpm: $(pnpm -v)"

# 2) Install workspaces WITH devDependencies (critical for vite)
# If CF sets NODE_ENV=production, ensure dev deps still install:
#   - either NODE_ENV=development (via CF env)
#   - or pass --include=dev explicitly:
pnpm -w install --no-frozen-lockfile --include=dev

# ensure native bins like esbuild are ready (pnpm@10 earlier may have skipped)
pnpm -w rebuild esbuild || true

# 3) Preflight & folders
mkdir -p docs/public/articles
[ -f docs/package.json ] || { echo "Missing docs/package.json"; exit 1; }
[ -f docs/index.html   ] || { echo "Missing docs/index.html";   exit 1; }

# 4) Prebuild content (robust)
[ -f scripts/sync-images.mjs ] && node scripts/sync-images.mjs || echo "skip: sync-images"
node scripts/generate-posts.mjs
node scripts/generate-articles.mjs
node scripts/minify-articles.mjs

# 5) Build docs (prefer docs-local vite; fallback to workspace; finally dlx)
if pnpm -C docs exec vite --version >/dev/null 2>&1; then
  echo "✓ vite found in docs. Building..."
  pnpm -C docs exec vite build
elif pnpm -w exec vite --version >/dev/null 2>&1; then
  echo "✓ vite found in workspace. Building from docs cwd..."
  (cd docs && pnpm -w exec vite build)
else
  echo "⚠ vite not found in docs/workspace. Using dlx fallback..."
  (cd docs && pnpm dlx vite@5 build)
fi

# 6) Verify output
[ -f docs/dist/index.html ] || { echo "❌ Build output missing: docs/dist/index.html"; exit 1; }
echo "✅ Build OK: docs/dist"
