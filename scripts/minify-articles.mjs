import { cp, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const articlesSrc = 'docs/js/articles.js';
const mainSrc = 'docs/js/main.min.js';
const destDir = 'docs/public/assets';

await mkdir(destDir, { recursive: true });

if (existsSync(articlesSrc)) {
  await cp(articlesSrc, path.join(destDir, 'articles.min.js'));
}

if (existsSync(mainSrc)) {
  await cp(mainSrc, path.join(destDir, 'main.min.js'));
}

// NEW: copy all article styles into public assets
const cssDir = 'docs/assets';
if (existsSync(cssDir)) {
  const files = await readdir(cssDir);
  const cssList = files.filter(f => /^articles-style.*\.css$/i.test(f));
  for (const f of cssList) {
    await cp(path.join(cssDir, f), path.join(destDir, f));
  }
}
