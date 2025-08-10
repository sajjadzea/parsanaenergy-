#!/usr/bin/env bash
set -euo pipefail

# Ensure Node 18 from NVM is active
if command -v nvm >/dev/null 2>&1; then
  nvm use default >/dev/null
fi

node_version="$(node -v)"
if [[ ! $node_version =~ ^v18\. ]]; then
  echo "❌ Expected Node 18 but got $node_version"
  exit 1
fi

node_path="$(which node)"
if [[ $node_path != *".nvm/versions/node/v18"* ]]; then
  echo "❌ Node executable is not from NVM v18: $node_path"
  exit 1
fi

# Build docs
(
  cd "$(dirname "$0")/../docs"
  pnpm build
  cp 404.html dist/404.html
)

required_files=(
  "docs/dist/index.html"
  "docs/dist/articles/index.html"
  "docs/dist/404.html"
)

missing=()
for file in "${required_files[@]}"; do
  [[ -f "$file" ]] || missing+=("$file")
done

if [[ ${#missing[@]} -eq 0 ]]; then
  # extra: ensure CSS for articles exists
  shopt -s nullglob
  css=(docs/dist/assets/articles-style*.css)
  if (( ${#css[@]} == 0 )); then
    echo "❌ Missing articles CSS in docs/dist/assets/"
    exit 1
  fi
  echo "✅ All required files exist (including articles CSS)."
else
  echo "❌ Missing files:"
  for f in "${missing[@]}"; do
    echo "$f"
  done
  exit 1
fi
