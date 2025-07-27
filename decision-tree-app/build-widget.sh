#!/bin/bash

# Build the decision-tree-app and copy the output to docs/widget
set -e

npm ci --legacy-peer-deps
npm run build

# Replace docs/widget contents with the new build
mkdir -p ../docs/widget/assets
rm -f ../docs/widget/assets/*
cp dist/assets/* ../docs/widget/assets/
cp dist/index.html ../docs/widget/index.html

echo "✅ build completed and files copied to docs/widget"
