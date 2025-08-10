#!/usr/bin/env sh
set -e

# --- Force a clean, known pnpm (v9) ---
# Cloudflare activates pnpm@10 globally; remove/override it to avoid EEXIST on pnpx
npm rm -g pnpm || true
npm i -g pnpm@9 --force
pnpm -v

# --- Workspace install (from repo root) ---
pnpm -w install --no-frozen-lockfile

# --- Make sure esbuild's postinstall ran (pnpm@10 earlier may have skipped it) ---
pnpm -w rebuild esbuild || true

# --- Preflight (fail fast if structure is wrong) ---
[ -f docs/package.json ] || { echo "Missing docs/package.json"; exit 1; }
[ -f docs/index.html   ] || { echo "Missing docs/index.html";   exit 1; }
mkdir -p docs/public/articles

# --- Prebuild (robust: optional scripts won't fail the build) ---
[ -f scripts/sync-images.mjs ] && node scripts/sync-images.mjs || echo "skip: sync-images"
node scripts/generate-posts.mjs
node scripts/generate-articles.mjs
node scripts/minify-articles.mjs

# --- Build only the docs app (Vite) ---
pnpm --filter ./docs... run build
