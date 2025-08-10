#!/usr/bin/env bash
set -euo pipefail

# Ensure docs/articles/posts.json exists
if [[ ! -f "docs/articles/posts.json" ]]; then
  echo "❌ Missing docs/articles/posts.json" >&2
  exit 1
fi

# Ensure at least one page exists in docs/articles (excluding posts.json and index.html)
if ! find "docs/articles" -mindepth 1 -maxdepth 1 ! -name 'posts.json' ! -name 'index.html' | grep -q .; then
  echo "❌ No article pages found in docs/articles" >&2
  exit 1
fi

# Ensure articles index page exists either in docs/articles or docs/public/articles
if [[ ! -f "docs/articles/index.html" && ! -f "docs/public/articles/index.html" ]]; then
  echo "❌ Missing articles index page (docs/articles/index.html or docs/public/articles/index.html)" >&2
  exit 1
fi

echo "✅ Article guards passed" 
