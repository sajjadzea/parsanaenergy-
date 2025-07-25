#!/bin/bash

# Build the decision-tree-app and copy the output to docs/widget
# Uses npmjs.org registry, falling back to npmmirror.com if needed.

set -e

npm config set registry https://registry.npmjs.org/
npm ci --legacy-peer-deps || npm install --legacy-peer-deps
if [ $? -ne 0 ]; then
  npm config set registry https://registry.npmmirror.com/
  npm ci --legacy-peer-deps || npm install --legacy-peer-deps
fi

if [ $? -ne 0 ]; then
  echo "❌ وابستگی‌ها نصب نشدند (حتی با legacy-peer-deps). راه‌حل: نسخه vite یا پلاگین را اصلاح کن."
  exit 1
fi

npm run build
# Copy widget build to docs/widget and also place assets under docs/assets
mkdir -p ../docs/widget ../docs/assets
cp -r dist/* ../docs/widget/
cp -r dist/assets/* ../docs/assets/

# Update index.html paths to use docs/assets relative URLs
sed -i 's|/parsanaenergy/assets/|../assets/|g' ../docs/widget/index.html

echo "✅ نصب و build با موفقیت انجام شد، فایل‌ها به docs/widget منتقل شدند."
