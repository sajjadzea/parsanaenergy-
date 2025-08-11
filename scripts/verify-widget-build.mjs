import { promises as fs } from 'fs';
import path from 'path';

async function main() {
  const widgetDir = path.join('docs', 'public', 'widgets', 'decision-tree');
  const assetsDir = path.join(widgetDir, 'assets');

  // Check assets directory exists and is not empty
  const assets = await fs.readdir(assetsDir).catch(() => {
    throw new Error(`Missing assets directory: ${assetsDir}`);
  });
  if (assets.length === 0) {
    throw new Error(`No assets found in ${assetsDir}`);
  }

  // Check index.html exists
  const indexPath = path.join(widgetDir, 'index.html');
  const indexHtml = await fs.readFile(indexPath, 'utf8').catch(() => {
    throw new Error(`Missing index.html at ${indexPath}`);
  });

  // Extract asset references and ensure each exists
  const assetRefs = [...indexHtml.matchAll(/\/(assets\/[^"'>]+)/g)].map(m => m[1]);

  if (assetRefs.length === 0) {
    console.warn('No asset references found in index.html');
  } else {
    console.log('Asset references found in index.html:');
    for (const ref of assetRefs) {
      console.log(` - ${ref}`);
    }
  }

  for (const ref of assetRefs) {
    const filePath = path.join(widgetDir, ref);
    try {
      await fs.access(filePath);
    } catch {
      console.error(`Referenced asset not found: ${filePath}`);
      console.error(
        'Possible reasons: file name typo or hash mismatch in index.html, or build configuration failed to generate this asset.'
      );
      throw new Error('Widget build verification failed');
    }
  }

  console.log('Widget build verification passed');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
