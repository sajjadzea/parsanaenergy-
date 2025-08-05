#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Checking for pnpm..."
if ! command -v pnpm >/dev/null 2>&1; then
  echo "pnpm is required. Install it: https://pnpm.io/installation"
  exit 1
fi

echo "🧹 Removing node_modules directories..."
find . -name node_modules -type d -prune -print -exec rm -rf {} +

echo "🗑️ Removing non-pnpm lockfiles..."
find . -type f \( -name package-lock.json -o -name yarn.lock -o -name npm-shrinkwrap.json \) -print -delete

echo "🧼 Pruning pnpm store..."
pnpm store prune

echo "📦 Ensuring pnpm-workspace.yaml..."
if [ ! -f pnpm-workspace.yaml ]; then
  cat <<'YAML' > pnpm-workspace.yaml
packages:
  - 'docs'
  - 'decision-tree-app'
YAML
fi

echo "🔧 Removing workspaces field from package.json if present..."
if [ -f package.json ]; then
  node -e "const fs=require('fs');const f='package.json';const p=JSON.parse(fs.readFileSync(f));if(p.workspaces){delete p.workspaces;fs.writeFileSync(f, JSON.stringify(p, null, 2)+'\n');}"
fi

echo "📥 Running pnpm install..."
pnpm install

echo "📥 Ensuring @playwright/test is installed..."
if ! pnpm list @playwright/test >/dev/null 2>&1; then
  pnpm add -D @playwright/test
fi

echo "🎭 Installing Playwright browsers..."
pnpm exec playwright install

echo "🧪 Running tests..."
pnpm test

echo "✅ All done!"
