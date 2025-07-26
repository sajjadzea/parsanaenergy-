#!/bin/bash

# Build the decision-tree-app and copy the output to docs/widget
set -e

npm ci --legacy-peer-deps
npm run build

# Replace docs/widget contents with the new build
rm -rf ../docs/widget/*
mkdir -p ../docs/widget
cp -r dist/* ../docs/widget/

echo "✅ build completed and files copied to docs/widget"
