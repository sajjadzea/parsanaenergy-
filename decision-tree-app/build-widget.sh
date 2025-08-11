#!/bin/bash
set -e

DEST="../docs/public/widgets/decision-tree"
rm -rf "$DEST"
mkdir -p "$DEST"
cp -R ./dist/* "$DEST"/

echo "✅ widget built and copied to $DEST"
