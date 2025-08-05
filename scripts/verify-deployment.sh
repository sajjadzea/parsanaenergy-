#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${1:-}"
if [[ -z "$BASE_URL" ]]; then
  echo "Usage: verify-deployment.sh <base-url>"
  exit 1
fi

routes=("" "articles/" "404.html")
for route in "${routes[@]}"; do
  url="$BASE_URL$route"
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  if [[ "$status" != "200" ]]; then
    echo "Route $url returned $status"
    exit 1
  fi
  echo "Verified $url -> $status"
done
