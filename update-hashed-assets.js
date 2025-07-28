#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const docsDir = new URL('./docs/', import.meta.url);

const assets = [];

async function collectAssets(rel = '.') {
  const dir = path.join(docsDir.pathname, rel);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryRel = path.posix.join(rel, entry.name);
    if (entry.isDirectory()) {
      await collectAssets(entryRel);
    } else {
      const m = entry.name.match(/^(.+)-[A-Za-z0-9_-]+\.(css|js)$/);
      if (m) {
        assets.push({
          dir: rel === '.' ? '' : rel,
          base: m[1],
          ext: m[2],
          file: entry.name,
        });
      }
    }
  }
}

const htmlFiles = [];

async function collectHtml(rel = '.') {
  const dir = path.join(docsDir.pathname, rel);
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const entryRel = path.posix.join(rel, entry.name);
    if (entry.isDirectory()) {
      await collectHtml(entryRel);
    } else if (entry.name.endsWith('.html')) {
      htmlFiles.push(entryRel);
    }
  }
}

function escape(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replacePaths(content, dir, base, ext, file) {
  const hashedPart = file.slice(base.length + 1); // portion after base-
  const lookbehind = dir === 'assets' ? '(?<!widget\\/)' : '';
  const dirRegex = dir ? `${lookbehind}${escape(dir)}` : lookbehind;
  const pattern = `(["'])([^"']*${dirRegex ? dirRegex + '/' : ''}${base})-[A-Za-z0-9_-]+\\.${ext}(["'])`;
  const regex = new RegExp(pattern, 'g');
  return content.replace(regex, `$1$2-${hashedPart}$3`);
}

async function processHtml(rel) {
  const filePath = path.join(docsDir.pathname, rel);
  let content = await fs.readFile(filePath, 'utf8');
  let updated = content;
  // sort assets by dir length descending to handle nested dirs first
  const sorted = assets.slice().sort((a,b) => b.dir.length - a.dir.length);
  for (const a of sorted) {
    updated = replacePaths(updated, a.dir, a.base, a.ext, a.file);
  }
  if (updated !== content) {
    await fs.writeFile(filePath, updated);
    console.log(`Updated ${rel}`);
  }
}

async function main() {
  await collectAssets('.');
  await collectHtml('.');
  for (const file of htmlFiles) {
    await processHtml(file);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
