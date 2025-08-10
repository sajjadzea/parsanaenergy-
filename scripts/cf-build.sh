#!/usr/bin/env sh
set -e

npm i -g pnpm@9
pnpm -v

pnpm -w install --no-frozen-lockfile

[ -f docs/package.json ] || { echo "Missing docs/package.json"; exit 1; }
[ -f docs/index.html   ] || { echo "Missing docs/index.html";   exit 1; }
mkdir -p docs/public/articles

[ -f scripts/sync-images.mjs ] && node scripts/sync-images.mjs || echo "skip: sync-images"
node scripts/generate-posts.mjs
node scripts/generate-articles.mjs
node scripts/minify-articles.mjs

pnpm --filter ./docs... run build
