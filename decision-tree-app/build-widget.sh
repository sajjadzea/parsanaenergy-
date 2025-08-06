#!/bin/bash

# Build the decision-tree-app and copy the output to docs/widget
set -e

# Dependencies are installed via pnpm-workspace at the repo root
pnpm run build

# Replace docs/widget contents with the new build
mkdir -p ../docs/widget/assets
rm -f ../docs/widget/assets/*
cp dist/assets/* ../docs/widget/assets/
cp dist/index.html ../docs/widget/index.html

# Update HTML references with new hashed filenames
node ../scripts/update-html-hashes.js dist ../docs/widget/index.html

echo "✅ build completed and files copied to docs/widget"
