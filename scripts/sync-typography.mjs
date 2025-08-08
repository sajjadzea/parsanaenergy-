import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { mkdirSync, copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const src = resolve(__dirname, "../packages/typography/index.css");
const targets = [
  resolve(__dirname, "../docs/assets/css/typography.css")
];

for (const t of targets) {
  mkdirSync(dirname(t), { recursive: true });
  copyFileSync(src, t);
  console.log("Synced:", t);
}
