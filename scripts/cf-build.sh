#!/usr/bin/env bash
set -euo pipefail

# همیشه از ریشه‌ی ریپو اجرا کن
ROOT_DIR="$(cd "$(dirname "$0")/.."; pwd)"
cd "$ROOT_DIR"

echo "==> Using repo root: $ROOT_DIR"

# هم‌نسخه کردن pnpm با ریپو (از packageManager ریشه)
# اگر corepack فعاله، همین کافیه
if command -v corepack >/dev/null 2>&1; then
  corepack enable || true
  corepack prepare pnpm@8.15.8 --activate
fi

echo "==> pnpm version:"
pnpm -v || true

echo "==> Node version:"
node -v || true

# رفع هشدار/ایراد lockfile ناسازگار: اجازه بده نصب انجام بشه حتی اگر نسخه‌ی pnpm فرق داره
echo "==> Installing root deps (if any)"
pnpm install --frozen-lockfile=false || true

echo "==> Running prebuild scripts from repo root"
# از Node ریشه صدا بزن که مسیرها درست باشه
pnpm node scripts/sync-images.mjs
pnpm node scripts/generate-posts.mjs
pnpm node scripts/generate-articles.mjs
pnpm node scripts/minify-articles.mjs

echo "==> Installing docs deps"
pnpm -C docs install --frozen-lockfile=false

echo "==> Building Vite (docs)"
pnpm -C docs run build

echo "==> Build finished. Output at docs/dist"
