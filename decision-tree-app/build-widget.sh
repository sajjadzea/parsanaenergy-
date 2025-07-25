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

# Copy the entire dist folder to docs/widget so that index.html and
# its hashed assets live together under docs/widget/assets
mkdir -p ../docs/widget
cp -r dist/* ../docs/widget/

# Update index.html asset paths to use the local assets folder
sed -i 's|/parsanaenergy/assets/|assets/|g' ../docs/widget/index.html

echo "✅ نصب و build با موفقیت انجام شد، فایل‌ها به docs/widget منتقل شدند."
