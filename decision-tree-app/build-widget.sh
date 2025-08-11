#!/bin/bash

# Build script to copy decision-tree widget output to docs/public widgets directory
set -e

DEST_DIR="../docs/public/widgets/decision-tree"

# Ensure destination directories exist
mkdir -p "$DEST_DIR/assets"

# Replace existing assets with new build
rm -f "$DEST_DIR/assets"/*
cp dist/assets/* "$DEST_DIR/assets/"
cp dist/index.html "$DEST_DIR/index.html"

# Update HTML references with new hashed filenames
node ../scripts/update-html-hashes.js dist "$DEST_DIR/index.html"

echo "✅ build completed and files copied to $DEST_DIR"

