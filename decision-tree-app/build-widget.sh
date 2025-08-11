#!/bin/bash
set -e

DEST_DIR="../docs/public/widgets/decision-tree"

rm -rf "$DEST_DIR"
mkdir -p "$DEST_DIR"

cp -R dist/* "$DEST_DIR/"

echo "✅ widget built and copied to $DEST_DIR"
