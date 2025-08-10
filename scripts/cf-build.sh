#!/usr/bin/env sh
# Cloudflare Pages build script for parsanaenergy (monorepo, Vite, pnpm)
# هدف: بیلد بدون خطا، مستقل از corepack و pnpm داخلی کلودفلر
# اجرا: Build command = `sh scripts/cf-build.sh`
# خروجی: Output directory = docs/dist

set -e

# --- چاپ نسخه‌ها برای دیباگ ---
node -v
npm -v

# --- پاک‌سازی pnpm گلوبال که Cloudflare قبلاً فعال کرده (pnpm@10) و نصب نسخهٔ پایدار ما (v9) ---
npm rm -g pnpm || true
npm i -g pnpm@9 --force
pnpm -v

# --- نصب وابستگی‌های ورک‌اسپیس از ریشه ---
pnpm -w install --no-frozen-lockfile

# --- اطمینان از build شدن باینری‌های لازم (esbuild) که توسط pnpm@10 نادیده گرفته شده بودند ---
pnpm -w rebuild esbuild || true

# --- Preflight و ساخت مسیرها (هر دو مسیر ممکن، بسته به cwd اسکریپت‌های داخل docs) ---
mkdir -p docs/public/articles
mkdir -p docs/docs/public/articles

# --- تولید محتوا از ریشه (robust) ---
[ -f scripts/sync-images.mjs ] && node scripts/sync-images.mjs || echo "skip: sync-images"
node scripts/generate-posts.mjs
node scripts/generate-articles.mjs
node scripts/minify-articles.mjs

# --- بیلد فقط ماژول docs بدون اجرای lifecycle prebuild در package.json ---
# با exec مستقیمِ vite، اسکریپت prebuild پکیج اجرا نمی‌شود و باگِ مسیرها (cwd=docs) رخ نمی‌دهد.
pnpm --filter ./docs... exec vite build

# --- تأیید خروجی ---
[ -f docs/dist/index.html ] || { echo "❌ Build output missing: docs/dist/index.html"; exit 1; }
echo "✅ Build OK: docs/dist"
