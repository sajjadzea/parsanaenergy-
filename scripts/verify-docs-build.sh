#!/usr/bin/env bash
set -euo pipefail

# Build docs
(
  cd "$(dirname "$0")/../docs"
  pnpm build
)

required_files=(
  "docs/dist/index.html"
  "docs/dist/articles/index.html"
  "docs/dist/404.html"
)

missing=()
for file in "${required_files[@]}"; do
  [[ -f "$file" ]] || missing+=("$file")
fi

if [[ ${#missing[@]} -eq 0 ]]; then
  echo "✅ All required files exist."
else
  echo "❌ Missing files:"
  for f in "${missing[@]}"; do
    echo "$f"
  done
  exit 1
fi
