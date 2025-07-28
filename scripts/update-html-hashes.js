#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

function collectHtmlFiles(targets) {
  const htmlFiles = [];
  for (const p of targets) {
    const stat = fs.statSync(p);
    if (stat.isDirectory()) {
      for (const f of fs.readdirSync(p)) {
        if (f.endsWith('.html')) htmlFiles.push(path.join(p, f));
      }
    } else if (p.endsWith('.html')) {
      htmlFiles.push(p);
    }
  }
  return htmlFiles;
}

function updateHtml(distDir, htmlTargets) {
  const assetsDir = path.join(distDir, 'assets');
  if (!fs.existsSync(assetsDir)) return;
  const files = fs.readdirSync(assetsDir);
  const replacements = {};
  for (const file of files) {
    if (!file.endsWith('.js') && !file.endsWith('.css')) continue;
    const ext = path.extname(file);
    const prefix = file.split('-')[0];
    replacements[prefix + ext] = file;
  }

  const htmlFiles = collectHtmlFiles(htmlTargets);
  for (const htmlFile of htmlFiles) {
    let content = fs.readFileSync(htmlFile, 'utf8');
    for (const [key, hashed] of Object.entries(replacements)) {
      const ext = path.extname(key);
      const prefix = key.replace(ext, '');
      const regex = new RegExp(prefix + '-[A-Za-z0-9]+\\' + ext, 'g');
      content = content.replace(regex, hashed);
    }
    fs.writeFileSync(htmlFile, content);
  }
}

const [,, distDir, ...htmlFiles] = process.argv;
if (!distDir || htmlFiles.length === 0) {
  console.error('Usage: update-html-hashes <distDir> <htmlFileOrDir...>');
  process.exit(1);
}
updateHtml(distDir, htmlFiles);
